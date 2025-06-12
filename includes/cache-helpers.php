<?php
// Cache busting helpers for development

function getCacheBuster($filePath) {
    $fullPath = __DIR__ . '/../' . ltrim($filePath, '/');
    
    // Use both file modification time and current timestamp for maximum cache busting
    if (file_exists($fullPath)) {
        $filemtime = filemtime($fullPath);
        $timestamp = time();
        return $filemtime . '.' . $timestamp;
    }
    
    // Fallback to current timestamp
    return time();
}

function getVersionedUrl($url) {
    $separator = strpos($url, '?') !== false ? '&' : '?';
    return $url . $separator . 'v=' . getCacheBuster($url) . '&_cb=' . uniqid();
}

// Force no-cache headers for all PHP responses
function setNoCacheHeaders() {
    header('Cache-Control: no-cache, no-store, must-revalidate, max-age=0');
    header('Pragma: no-cache'); 
    header('Expires: Thu, 01 Jan 1970 00:00:00 GMT');
    header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
    header('ETag: "' . uniqid() . '"'); // Always different ETag
}

// Development mode detector
function isDevelopment() {
    return in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost:8000', '127.0.0.1:8000', 'localhost', '127.0.0.1']) ||
           strpos($_SERVER['HTTP_HOST'] ?? '', 'local') !== false;
}

// Only apply aggressive cache busting in development
if (isDevelopment()) {
    setNoCacheHeaders();
}
?> 