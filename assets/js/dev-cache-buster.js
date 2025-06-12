// Development cache busting - forces resource reloads
class DevCacheBuster {
    constructor() {
        this.isDev = this.isDevelopment();
        if (this.isDev) {
            this.init();
        }
    }

    isDevelopment() {
        return location.hostname === 'localhost' || 
               location.hostname === '127.0.0.1' || 
               location.hostname.includes('local') ||
               location.port === '8000';
    }

    init() {
        console.log('[DevCacheBuster] Development mode detected - enabling aggressive cache busting');
        
        // Force reload all stylesheets
        this.reloadStylesheets();
        
        // Add timestamp to all future requests
        this.interceptFetches();
        
        // Force browser to not use cached resources
        this.disableBrowserCache();
    }

    reloadStylesheets() {
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        stylesheets.forEach(link => {
            if (!link.href.includes('cdn.')) { // Don't modify external CDN links
                const url = new URL(link.href);
                url.searchParams.set('_dev_bust', Date.now());
                url.searchParams.set('_random', Math.random().toString(36));
                link.href = url.toString();
            }
        });
    }

    interceptFetches() {
        const originalFetch = window.fetch;
        window.fetch = (input, init) => {
            if (typeof input === 'string' && !input.includes('://')) {
                // Local request - add cache busting
                const url = new URL(input, window.location.origin);
                url.searchParams.set('_dev_bust', Date.now());
                url.searchParams.set('_random', Math.random().toString(36));
                input = url.toString();
            }
            return originalFetch(input, init);
        };
    }

    disableBrowserCache() {
        // Add no-cache headers to XHR requests
        const originalOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url, ...args) {
            originalOpen.apply(this, [method, url, ...args]);
            this.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            this.setRequestHeader('Pragma', 'no-cache');
            this.setRequestHeader('Expires', '0');
        };

        // Force page reload on focus (when switching tabs)
        let wasHidden = false;
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                wasHidden = true;
            } else if (wasHidden) {
                // Page became visible again - check for updates
                setTimeout(() => {
                    console.log('[DevCacheBuster] Tab focused - checking for updates...');
                    // Could add automatic refresh logic here if needed
                }, 1000);
                wasHidden = false;
            }
        });
    }

    // Public method to force reload everything
    forceReload() {
        console.log('[DevCacheBuster] Force reloading all resources...');
        window.location.reload(true); // Hard reload
    }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    window.devCacheBuster = new DevCacheBuster();
});

// Global shortcut for debugging (Ctrl+Shift+R)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        if (window.devCacheBuster) {
            window.devCacheBuster.forceReload();
        }
    }
});

// Expose globally for console access
window.DevCacheBuster = DevCacheBuster; 