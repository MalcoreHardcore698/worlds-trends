// Theme initialization - runs immediately to prevent theme flicker
(function() {
    'use strict';
    
    // Get stored theme preference
    const storedTheme = localStorage.getItem('preferred-theme');
    const root = document.documentElement;
    
    if (storedTheme) {
        // User has explicitly set a theme preference
        if (storedTheme === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else if (storedTheme === 'light') {
            root.setAttribute('data-theme', 'light');
        }
        
        // Theme applied successfully
    } else {
        // No stored preference - follow system
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Don't set data-theme attribute - let CSS handle system preference
    }
})(); 