<?php
// Include cache helpers (sets headers automatically in development)
require_once __DIR__ . '/includes/cache-helpers.php';

// Get the request URI and remove query string
$requestUri = strtok($_SERVER['REQUEST_URI'], '?');
$requestUri = rtrim($requestUri, '/');

// Simple routing
switch ($requestUri) {
    case '':
    case '/news':
        include 'pages/news.php';
        break;
    case '/charts':
        include 'pages/charts.php';
        break;
    case '/api/news':
        include 'api/news.php';
        break;
    case '/api/charts':
        include 'api/charts.php';
        break;
    default:
        http_response_code(404);
        echo "<h1>404 Not Found</h1>";
        break;
}
?>