// Page loader - manages FOUC and smooth content reveal
class PageLoader {
    constructor() {
        this.loadingOverlay = document.getElementById('loading-overlay');
        this.body = document.body;
        this.cssLoaded = false;
        this.domReady = false;
        
        this.init();
    }

    init() {
        // Check if CSS is already loaded (for cached cases)
        this.checkCSSLoaded();
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.domReady = true;
                this.checkReadyToShow();
            });
        } else {
            this.domReady = true;
            this.checkReadyToShow();
        }

        // Listen for CSS load events
        this.listenForCSSLoad();
        
        // Fallback timeout
        setTimeout(() => {
            if (!this.cssLoaded) {
                console.log('[PageLoader] CSS load timeout - showing content anyway');
                this.showContent();
            }
        }, 3000); // 3 second fallback
    }

    checkCSSLoaded() {
        // Check if our main CSS classes are applied
        const testElement = document.createElement('div');
        testElement.className = 'container';
        testElement.style.visibility = 'hidden';
        testElement.style.position = 'absolute';
        document.body.appendChild(testElement);
        
        const styles = window.getComputedStyle(testElement);
        if (styles.maxWidth && styles.maxWidth !== 'none') {
            this.cssLoaded = true;
            console.log('[PageLoader] CSS already loaded');
        }
        
        document.body.removeChild(testElement);
    }

    listenForCSSLoad() {
        // Listen for link load events
        const cssLinks = document.querySelectorAll('link[rel="stylesheet"], link[rel="preload"][as="style"]');
        let loadedCount = 0;
        const totalCount = cssLinks.length;

        cssLinks.forEach(link => {
            if (link.href.includes('modern-normalize')) {
                // Skip external CSS
                loadedCount++;
                return;
            }

            const checkLoaded = () => {
                loadedCount++;
                console.log(`[PageLoader] CSS loaded: ${loadedCount}/${totalCount}`);
                
                if (loadedCount >= totalCount) {
                    this.cssLoaded = true;
                    this.checkReadyToShow();
                }
            };

            if (link.sheet || link.readyState === 'complete') {
                checkLoaded();
            } else {
                link.addEventListener('load', checkLoaded);
                link.addEventListener('error', checkLoaded); // Count errors as loaded to prevent hanging
            }
        });

        // Also check periodically
        const checkInterval = setInterval(() => {
            if (this.cssLoaded) {
                clearInterval(checkInterval);
                return;
            }

            // Check if styles are actually applied
            this.checkCSSLoaded();
            if (this.cssLoaded) {
                clearInterval(checkInterval);
                this.checkReadyToShow();
            }
        }, 100);
    }

    checkReadyToShow() {
        if (this.domReady && this.cssLoaded) {
            // Small delay to ensure everything is painted
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.showContent();
                });
            });
        }
    }

    showContent() {
        console.log('[PageLoader] Showing content');
        
        // Add content-loaded class to enable opacity animations
        this.body.classList.add('content-loaded');
        this.body.classList.remove('loading');
        
        // Hide loading overlay
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.add('loaded');
            
            // Remove overlay after animation
            setTimeout(() => {
                if (this.loadingOverlay && this.loadingOverlay.parentNode) {
                    this.loadingOverlay.remove();
                }
            }, 300);
        }
        
        // Trigger custom event for other components
        window.dispatchEvent(new CustomEvent('pageContentReady'));
    }

    // Public method to force show (for debugging)
    forceShow() {
        this.showContent();
    }
}

// Initialize immediately (don't wait for DOMContentLoaded)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.pageLoader = new PageLoader();
    });
} else {
    window.pageLoader = new PageLoader();
}

// Global access for debugging
window.PageLoader = PageLoader; 