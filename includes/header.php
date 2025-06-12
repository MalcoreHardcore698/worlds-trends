<?php
  require_once __DIR__ . '/cache-helpers.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">

    <title><?= $pageTitle ?? 'WorldTrends' ?></title>

    <!-- Theme initialization script (must run before CSS) -->
    <script src="<?= getVersionedUrl('/assets/js/theme-init.js') ?>"></script>

    <!-- Prevent FOUC with inline critical styles -->
    <style>
        .header, .main {
            opacity: 0;
            transition: opacity 1ms ease;
        }

        body.styles-loaded .header,
        body.styles-loaded .main {
            opacity: 1;
        }
    </style>

    <!-- Styles -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/modern-normalize@2.0.0/modern-normalize.css">
    <link rel="preload" href="<?= getVersionedUrl('/assets/css/main.css') ?>" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="<?= getVersionedUrl('/assets/css/main.css') ?>"></noscript>

    <!-- Script to show content when styles are loaded -->
    <script>
        // Show content when all stylesheets are loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Wait a bit for styles to be applied
            setTimeout(function() {
                document.body.classList.add('styles-loaded');
            }, 0);
        });

        // Fallback - show content after a maximum delay
        window.addEventListener('load', function() {
            document.body.classList.add('styles-loaded');
        });
    </script>
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                <img src="<?= getVersionedUrl('/assets/images/logotype.svg') ?>" alt="WorldTrends" style="width: 100px;;">
                </div>
                <div class="header-actions">
                    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
                        <span class="theme-toggle-sun">☀️</span>
                        <span class="theme-toggle-moon">🌙</span>
                    </button>
                    <nav class="nav">
                        <a href="/charts" class="nav-link <?= ($currentPage ?? '') === 'charts' ? 'active' : '' ?>">Charts</a>
                        <a href="/news" class="nav-link <?= ($currentPage ?? '') === 'news' ? 'active' : '' ?>">News</a>
                    </nav>
                </div>
            </div>
        </div>
    </header>

    <main class="main">
        <div class="container">