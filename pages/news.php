<?php
$pageTitle = 'WorldTrends - News';
$currentPage = 'news';
$pageScript = '/assets/js/main.js';
include 'includes/header.php';
?>

<section class="hero">
    <div class="hero-content">
        <div class="hero-image">
            <img id="featured-image" src="" alt="Featured news">
            <div class="hero-overlay">
                <h1 id="featured-title">Loading...</h1>
                <button class="explore-btn">Explore <span>→</span></button>
            </div>
        </div>
        <div class="sidebar">
            <div id="trending-news" class="trending-news">
                <div class="loading">Loading trending news...</div>
            </div>
        </div>
    </div>
</section>

<section class="latest-news">
    <h2>Latest News</h2>
    <div id="latest-news-grid" class="news-grid">
        <div class="loading">Loading latest news...</div>
    </div>
    <button class="read-more-btn">Read more</button>
</section>

<?php include 'includes/footer.php'; ?> 