<?php
  /**
   * Application Constants
   */

  // Application Info
  define('APP_NAME', 'WorldTrends');
  define('APP_VERSION', '1.0.0');

  // Routes
  define('ROUTE_HOME', '/');
  define('ROUTE_NEWS', '/news');
  define('ROUTE_CHARTS', '/charts');
  define('ROUTE_NEWS_ARTICLE', '/news/%d');

  // API Routes
  define('API_BASE', '/api');
  define('API_NEWS', '/api/news');
  define('API_CHARTS', '/api/charts');
  define('API_NEWS_SINGLE', '/api/news/%d');

  // Asset Paths
  define('ASSETS_CSS', '/assets/css');
  define('ASSETS_JS', '/assets/js');
  define('ASSETS_IMAGES', '/assets/images');

  // JavaScript Files
  define('JS_THEME_INIT', '/assets/js/theme/theme-init.js');
  define('JS_THEME_TOGGLE', '/assets/js/theme/theme-toggle.js');
  define('JS_DEV_CACHE_BUSTER', '/assets/js/helpers/dev-cache-buster.js');
  define('JS_CHARTS', '/assets/js/pages/charts.js');
  define('JS_NEWS', '/assets/js/pages/news.js');
  define('JS_ARTICLE', '/assets/js/pages/article.js');

  // CSS Files
  define('CSS_MAIN', '/assets/css/main.css');

  // Image Files
  define('IMG_LOGOTYPE', '/assets/images/logotype.svg');
  define('IMG_LOGOTYPE_INVERSE', '/assets/images/logotype-inverse.svg');

  // Page Titles
  define('PAGE_TITLE_HOME', APP_NAME);
  define('PAGE_TITLE_NEWS', APP_NAME . ' - News');
  define('PAGE_TITLE_CHARTS', APP_NAME . ' - Charts');
  define('PAGE_TITLE_ARTICLE', APP_NAME . ' - Article');

  // Page Names
  define('PAGE_NEWS', 'news');
  define('PAGE_CHARTS', 'charts');

  // Include Paths
  define('INCLUDES_PARTS', 'includes/parts');
  define('INCLUDES_HELPERS', 'includes/helpers');

  // Default Settings
  define('DEFAULT_YEAR', 2024);
  define('DEFAULT_MONTH', 9);

  // Chart Settings
  define('CHART_HEIGHT', '400px');
  define('CHART_ANIMATION_DURATION', 800);
  define('CHART_ANIMATION_EASING', 'easeOutQuart');

  // Animation Settings
  define('HOVER_ANIMATION_DURATION', 150);
  define('TOAST_DURATION', 3000);
  define('FADE_ANIMATION_DELAY', 100);

  // UI Constants
  define('THEME_STORAGE_KEY', 'preferred-theme');
  define('CHART_CONTAINER_ID', 'chart-container');
  define('CHART_CANVAS_ID', 'chart-canvas');

  // CSS Class Names
  define('CSS_MONTH_BTN', 'month-btn');
  define('CSS_MONTH_BTN_ACTIVE', 'month-btn--active');
  define('CSS_NEWS_CARD', 'news-card');
  define('CSS_NEWS_ITEM', 'news-item');
  define('CSS_LOADING', 'loading');
  define('CSS_HOVERED', 'hovered');

  // Element IDs
  define('ID_FEATURED_IMAGE', 'featured-image');
  define('ID_FEATURED_TITLE', 'featured-title');
  define('ID_TRENDING_NEWS', 'trending-news');
  define('ID_LATEST_NEWS_GRID', 'latest-news-grid');
  define('ID_CHART1_VALUE', 'chart1-value');
  define('ID_CHART2_VALUE', 'chart2-value');
  define('ID_CAROUSEL_PREV', 'carousel-prev');
  define('ID_CAROUSEL_NEXT', 'carousel-next');
  define('ID_THEME_TOGGLE', 'theme-toggle');

  // Messages
  define('MSG_LOADING', 'Loading...');
  define('MSG_LOADING_NEWS', 'Loading news...');
  define('MSG_LOADING_TRENDING', 'Loading trending news...');
  define('MSG_LOADING_LATEST', 'Loading latest news...');
  define('MSG_LOADING_ARTICLE', 'Loading article...');
  define('MSG_FAILED_LOAD_NEWS', 'Failed to load news. Please try again later.');
  define('MSG_FAILED_LOAD_ARTICLE', 'Failed to load article');
  define('MSG_FAILED_LOAD_DATA', 'Не удалось загрузить данные');
  define('MSG_TRY_REFRESH', 'Попробуйте обновить страницу');
  define('MSG_NEWS_NOT_FOUND', 'News not found');
  define('MSG_ARTICLE_NOT_FOUND', 'Article not found');
  define('MSG_MORE_NEWS_LOADED', 'More news loaded successfully!');

  // External CDN URLs
  define('CDN_MODERN_NORMALIZE', 'https://cdn.jsdelivr.net/npm/modern-normalize@2.0.0/modern-normalize.css');
  define('CDN_JQUERY', 'https://esm.sh/jquery@3.7.1');
  define('CDN_CHARTJS', 'https://esm.sh/chart.js@4.4.0');

  // Helper Functions for URL Generation
  function getRouteNewsArticle($id) {
    return sprintf(ROUTE_NEWS_ARTICLE, $id);
  }

  function getApiNewsArticle($id) {
    return sprintf(API_NEWS_SINGLE, $id);
  }

  function getPageTitle($pageName) {
    switch ($pageName) {
      case PAGE_NEWS:
        return PAGE_TITLE_NEWS;
      case PAGE_CHARTS:
        return PAGE_TITLE_CHARTS;
      default:
        return PAGE_TITLE_HOME;
    }
  }

  function getPageScript($pageName) {
    switch ($pageName) {
      case PAGE_NEWS:
        return JS_NEWS;
      case PAGE_CHARTS:
        return JS_CHARTS;
      case 'article':
        return JS_ARTICLE;
      default:
        return null;
    }
  }
