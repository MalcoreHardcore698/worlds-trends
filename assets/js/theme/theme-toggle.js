// Theme toggle functionality
import { THEME, IDS } from '../constants.js';

class ThemeToggle {
  constructor() {
    this.storageKey = THEME.STORAGE_KEY;
    this.init();
  }

  init() {
    // Set initial theme
    this.setInitialTheme();

    // Bind toggle button
    this.bindToggleButton();

    // Listen for system theme changes
    this.listenForSystemThemeChanges();
  }

  setInitialTheme() {
    const stored = localStorage.getItem(this.storageKey);
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? THEME.DARK
      : THEME.LIGHT;
    const theme = stored || system;

    this.setTheme(theme);
  }

  setTheme(theme) {
    const root = document.documentElement;

    if (theme === THEME.DARK) {
      root.setAttribute('data-theme', THEME.DARK);
    } else if (theme === THEME.LIGHT) {
      root.setAttribute('data-theme', THEME.LIGHT);
    } else {
      root.removeAttribute('data-theme');
    }

    // Store preference (null for system)
    if (theme === THEME.SYSTEM) {
      localStorage.removeItem(this.storageKey);
    } else {
      localStorage.setItem(this.storageKey, theme);
    }

    // Dispatch custom event for other components
    window.dispatchEvent(
      new CustomEvent('themeChange', {
        detail: { theme, isSystem: theme === 'system' },
      })
    );
  }

  getCurrentTheme() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) return stored;

    const root = document.documentElement;
    const dataTheme = root.getAttribute('data-theme');
    if (dataTheme) return dataTheme;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  toggleTheme() {
    const current = this.getCurrentTheme();

    // Simplified toggle: just switch between light and dark
    if (current === 'light') {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }

  bindToggleButton() {
    const button = document.getElementById(IDS.THEME_TOGGLE);

    if (button) {
      button.addEventListener('click', () => {
        this.toggleTheme();

        // Add a small animation feedback
        button.style.transform = 'scale(0.9)';
        setTimeout(() => {
          button.style.transform = '';
        }, 150);
      });

      // Add keyboard support
      button.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleTheme();
        }
      });
    }
  }

  listenForSystemThemeChanges() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', e => {
      // Only update if user hasn't set a preference
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) {
        const root = document.documentElement;
        root.removeAttribute('data-theme');

        // Dispatch event for system theme change
        window.dispatchEvent(
          new CustomEvent('themeChange', {
            detail: {
              theme: e.matches ? 'dark' : 'light',
              isSystem: true,
            },
          })
        );
      }
    });
  }

  // Public API for other components
  isDark() {
    const current = this.getCurrentTheme();
    if (current === 'dark') return true;
    if (current === 'light') return false;

    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Force a specific theme (useful for testing)
  forceTheme(theme) {
    this.setTheme(theme);
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.themeToggle = new ThemeToggle();
});

// Show theme transition for smooth UX
const style = document.createElement('style');
style.textContent = `
  /* Smooth theme transitions */
  :root {
    transition:
      color-scheme 0.3s ease,
      background-color 0.3s ease;
  }

  /* Preserve animations */
  *:where([class*="animate"], [class*="motion"]) {
    transition: unset;
  }

  /* Disable transitions during theme switch for instant feedback */
  .theme-switching * {
    transition: none !important;
  }
`;

// Add styles to head
if (document.head) {
  document.head.appendChild(style);
} else {
  document.addEventListener('DOMContentLoaded', () => {
    document.head.appendChild(style);
  });
}
