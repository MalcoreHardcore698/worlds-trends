/**
 * JavaScript Constants
 */

// API Configuration
export const API = {
  BASE: '/api',
  NEWS: '/api/news',
  CHARTS: '/api/charts',
  NEWS_SINGLE: '/api/news',
};

// Routes
export const ROUTES = {
  HOME: '/',
  NEWS: '/news',
  CHARTS: '/charts',
};

// Default Settings
export const DEFAULTS = {
  YEAR: 2024,
  MONTH: 9,
};

// Chart Configuration
export const CHART = {
  HEIGHT: '400px',
  ANIMATION_DURATION: 800,
  ANIMATION_EASING: 'easeOutQuart',
  HOVER_ANIMATION_DURATION: 150,
};

// Element IDs
export const IDS = {
  // Chart elements
  CHART_CONTAINER: 'chart-container',
  CHART_CANVAS: 'chart-canvas',
  CHART1_VALUE: 'chart1-value',
  CHART2_VALUE: 'chart2-value',
  CAROUSEL_PREV: 'carousel-prev',
  CAROUSEL_NEXT: 'carousel-next',

  // News elements
  FEATURED_IMAGE: 'featured-image',
  FEATURED_TITLE: 'featured-title',
  TRENDING_NEWS: 'trending-news',
  LATEST_NEWS_GRID: 'latest-news-grid',

  // Theme elements
  THEME_TOGGLE: 'theme-toggle',
};

// CSS Classes
export const CSS_CLASSES = {
  MONTH_BTN: 'month-btn',
  MONTH_BTN_ACTIVE: 'month-btn--active',
  NEWS_CARD: 'news-card',
  NEWS_ITEM: 'news-item',
  LOADING: 'loading',
  HOVERED: 'hovered',
  CHART_TOOLTIP: 'chart-tooltip',
};

// CSS Selectors
export const SELECTORS = {
  MONTH_BTN: '.month-btn',
  MONTH_BTN_ACTIVE: '.month-btn--active',
  NEWS_CARD: '.news-card',
  NEWS_ITEM: '.news-item',
  LOADING: '.loading',
  BTN_EXPLORE: '.btn--explore',
  BTN_READ_MORE: '.btn--read-more',
  NAV_LINK: '.nav__link',
  NEWS_SECTION: '.news-section',
  HERO_IMAGE: '.hero__image',
  MONTH_TIMELINE: '.month-timeline',
  MONTH_TIMELINE_CONTAINER: '.month-timeline__container',
};

// Messages
export const MESSAGES = {
  LOADING: 'Loading...',
  LOADING_NEWS: 'Loading news...',
  LOADING_TRENDING: 'Loading trending news...',
  LOADING_LATEST: 'Loading latest news...',
  LOADING_ARTICLE: 'Loading article...',
  FAILED_LOAD_NEWS: 'Failed to load news. Please try again later.',
  FAILED_LOAD_ARTICLE: 'Failed to load article',
  FAILED_LOAD_DATA: 'Не удалось загрузить данные',
  TRY_REFRESH: 'Попробуйте обновить страницу',
  NEWS_NOT_FOUND: 'News not found',
  ARTICLE_NOT_FOUND: 'Article not found',
  MORE_NEWS_LOADED: 'More news loaded successfully!',
  CHART_CONTAINER_NOT_FOUND: 'Chart container not found',
  NO_DATA_AVAILABLE: 'No data available for chart rendering',
  INVALID_DATA_RECEIVED: 'Invalid data received:',
};

// Animation Durations
export const ANIMATIONS = {
  FADE_DELAY: 100,
  TOAST_DURATION: 3000,
  RESIZE_DEBOUNCE: 250,
  SCROLL_ANIMATION: 800,
  BUTTON_FEEDBACK: 150,
  TOOLTIP_FADE: 150,
  STAT_ANIMATION: 200,
};

// Theme Configuration
export const THEME = {
  STORAGE_KEY: 'preferred-theme',
  DARK: 'dark',
  LIGHT: 'light',
  SYSTEM: 'system',
};

// Chart View Types
export const CHART_VIEWS = {
  DAYS: 'days',
  MONTHS: 'months',
};

// Month Names
export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Helper Functions
export function getNewsUrl(id) {
  return `${ROUTES.NEWS}/${id}`;
}

export function getApiNewsUrl(id) {
  return `${API.NEWS_SINGLE}/${id}`;
}

export function getShortMonthName(monthName) {
  return monthName && monthName.length > 3 ? monthName.substring(0, 3) : monthName;
}

export function formatDataValue(value, multiplier = 1000, unit = 'GB') {
  return `${Math.round(value * multiplier)} ${unit}`;
}
