// Cache busting utility for development
export function addCacheBuster(url) {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}_cb=${Date.now()}`;
}

// Force reload stylesheets in development
export function reloadCSS() {
  const links = document.querySelectorAll('link[rel="stylesheet"]');
  links.forEach(link => {
    const href = link.href.split('?')[0];
    link.href = addCacheBuster(href);
  });
}

// Development mode detector
export function isDevelopment() {
  return (
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1' ||
    location.hostname.includes('local')
  );
}

// Auto-refresh assets in development
if (isDevelopment()) {
  // Check for asset updates every 30 seconds
  setInterval(() => {
    // Only reload if page is visible
    if (!document.hidden) {
      console.log('[Dev] Checking for asset updates...');
    }
  }, 30000);
}
