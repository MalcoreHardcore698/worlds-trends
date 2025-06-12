<?php
	require_once __DIR__ . '/../helpers/cache-helpers.php';
	require_once __DIR__ . '/../helpers/icon-helper.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Expires" content="0">

	<title><?= $pageTitle ?? APP_NAME ?></title>

	<!-- Theme initialization script (must run before CSS) -->
	<script src="<?= getVersionedUrl(JS_THEME_INIT) ?>"></script>

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
	<link rel="stylesheet" href="<?= CDN_MODERN_NORMALIZE ?>">
	<link rel="preload" href="<?= getVersionedUrl(CSS_MAIN) ?>" as="style" onload="this.onload=null;this.rel='stylesheet'">
	<noscript><link rel="stylesheet" href="<?= getVersionedUrl(CSS_MAIN) ?>"></noscript>

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
			<div class="header__content">
				<a href="<?= ROUTE_NEWS ?>" class="logo">
					<img src="<?= getVersionedUrl(IMG_LOGOTYPE) ?>" alt="<?= APP_NAME ?>" class="logo__image-light">
          <img src="<?= getVersionedUrl(IMG_LOGOTYPE_INVERSE) ?>" alt="<?= APP_NAME ?>" class="logo__image-dark">
				</a>

				<div class="header__actions">
					<button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
						<span class="theme-toggle__icon theme-toggle__icon--sun">☀️</span>
						<span class="theme-toggle__icon theme-toggle__icon--moon">🌙</span>
					</button>
					<nav class="nav">
						<a href="<?= ROUTE_CHARTS ?>" class="nav__link <?= ($currentPage ?? '') === PAGE_CHARTS ? 'nav__link--active' : '' ?>">Charts</a>
						<a href="<?= ROUTE_NEWS ?>" class="nav__link <?= ($currentPage ?? '') === PAGE_NEWS ? 'nav__link--active' : '' ?>">News</a>
					</nav>
				</div>
			</div>
		</div>
	</header>

	<main class="main">