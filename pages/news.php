<?php
  require_once __DIR__ . '/../includes/constants.php';

  $pageTitle = PAGE_TITLE_NEWS;
  $currentPage = PAGE_NEWS;
  $pageScript = JS_NEWS;

  include INCLUDES_PARTS . '/header.php';
?>

<div class="container">
  <section class="hero">
    <div class="hero__content">
      <div class="hero__image">
        <img id="<?= ID_FEATURED_IMAGE ?>" src="" alt="Featured news">
        <div class="hero__overlay">
          <h1 id="<?= ID_FEATURED_TITLE ?>" class="hero__title"><?= MSG_LOADING ?></h1>
          <button class="btn btn--explore">Explore <span>→</span></button>
        </div>
      </div>
      <button class="btn btn--read-more only-mobile">Explore <span>→</span></button>
      <div class="sidebar">
        <div id="<?= ID_TRENDING_NEWS ?>" class="sidebar__content">
          <div class="<?= CSS_LOADING ?>"><?= MSG_LOADING_TRENDING ?></div>
        </div>
      </div>
    </div>
  </section>

  <section class="news-section">
    <h2 class="news-section__title">Latest News</h2>
    <div id="<?= ID_LATEST_NEWS_GRID ?>" class="news-section__grid">
      <div class="<?= CSS_LOADING ?>"><?= MSG_LOADING_LATEST ?></div>
    </div>

    <footer class="news-section__footer">
      <button class="btn btn--read-more btn--ripple-hover">Read more</button>
    </footer>
  </section>
</div>

<?php include INCLUDES_PARTS . '/footer.php'; ?>