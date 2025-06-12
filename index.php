<?php
  // Include constants and cache helpers
  require_once __DIR__ . '/includes/constants.php';
  require_once __DIR__ . '/includes/helpers/cache-helpers.php';

  // Get the request URI and remove query string
  $requestUri = strtok($_SERVER['REQUEST_URI'], '?');
  $requestUri = rtrim($requestUri, '/');

  // Simple routing
  switch ($requestUri) {
    case ROUTE_HOME:
    case ROUTE_NEWS:
      include 'pages/news.php';
      break;
    case ROUTE_CHARTS:
      include 'pages/charts.php';
      break;
    case API_NEWS:
      include 'api/news.php';
      break;
    case API_CHARTS:
      include 'api/charts.php';
      break;
    default:
      // Check for news article route
      if (preg_match('/^' . str_replace('%d', '(\d+)', preg_quote(ROUTE_NEWS_ARTICLE, '/')) . '$/', $requestUri, $matches)) {
        $_GET['id'] = $matches[1];
        include 'pages/article.php';
      } else if (preg_match('/^' . str_replace('%d', '(\d+)', preg_quote(API_NEWS_SINGLE, '/')) . '$/', $requestUri, $matches)) {
        $_GET['id'] = $matches[1];
        include 'api/news-single.php';
      } else {
        http_response_code(404);
        echo "<h1>404 Not Found</h1>";
      }
      break;
  }
?>