<?php
  require_once __DIR__ . '/../includes/constants.php';

  $pageTitle = PAGE_TITLE_ARTICLE;
  $currentPage = PAGE_NEWS;
  $pageScript = JS_ARTICLE;

  include INCLUDES_PARTS . '/header.php';
?>

<div class="container">
  <section class="article-hero">
    <div class="article-hero__content">
      <div class="<?= CSS_LOADING ?>" id="article-loading"><?= MSG_LOADING_ARTICLE ?></div>
      <div class="article-hero__main" id="article-content" style="display: none;">
        <div class="article-hero__meta">
          <div class="article-hero__breadcrumb">
            <a href="<?= ROUTE_NEWS ?>" class="breadcrumb__link">← Back to news</a>
          </div>
          <div class="article-hero__category" id="article-category"></div>
          <div class="article-hero__time" id="article-time"></div>
        </div>
        <h1 class="article-hero__title" id="article-title"></h1>
        <div class="article-hero__author">
          <span>Author: <strong id="article-author"></strong></span>
        </div>
      </div>
    </div>
  </section>

  <section class="article-content">
    <div class="article-content__wrapper" id="article-wrapper" style="display: none;">
      <div class="article-content__image">
        <img id="article-image" src="" alt="" class="article-content__img">
      </div>
      <div class="article-content__body">
        <div id="article-body" class="article-body"></div>
        <div class="article-tags">
          <div class="article-tags__title">Tags:</div>
          <div id="article-tags" class="article-tags__list"></div>
        </div>
      </div>
    </div>
  </section>
</div>

<section class="article-related">
    <div class="article-related__content">
        <h2 class="article-related__title">You may also be interested in</h2>
        <div class="article-related__grid">
            <div class="news-card">
                <img src="https://picsum.photos/400/300?random=20" alt="Related article" class="news-card__image">
                <div class="news-card__content">
                    <h3 class="news-card__title">Other news from the world of politics</h3>
                    <p class="news-card__description">Short description of the related news...</p>
                    <div class="news-meta">
                        <span>3 hours ago</span>
                        <span>Politics</span>
                    </div>
                </div>
            </div>
            <div class="news-card">
                <img src="https://picsum.photos/400/300?random=21" alt="Related article" class="news-card__image">
                <div class="news-card__content">
                    <h3 class="news-card__title">Latest events in the world</h3>
                    <p class="news-card__description">Overview of important events of the week...</p>
                    <div class="news-meta">
                        <span>5 hours ago</span>
                        <span>World</span>
                    </div>
                </div>
            </div>
            <div class="news-card">
                <img src="https://picsum.photos/400/300?random=22" alt="Related article" class="news-card__image">
                <div class="news-card__content">
                    <h3 class="news-card__title">Analysis
                    <div class="news-meta">
                        <span>1 day ago</span>
                        <span>Analysis</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="article-related__footer">
            <a href="<?= ROUTE_NEWS ?>" class="btn btn--read-more btn--ripple-hover">All news <span>→</span></a>
        </div>
    </div>
</section>

<?php include INCLUDES_PARTS . '/footer.php'; ?>