// Article page JavaScript
import $ from 'jquery';
import { addCacheBuster, isDevelopment } from '../helpers/cache-buster.js';
import { API, MESSAGES } from '../constants.js';

class ArticleApp {
  constructor() {
    this.apiBase = API.BASE;
    this.init();
  }

  async init() {
    try {
      const articleId = this.getArticleIdFromUrl();
      if (articleId) {
        await this.loadArticle(articleId);
      } else {
        this.showError(MESSAGES.NEWS_NOT_FOUND);
      }
    } catch (error) {
      console.error('Failed to initialize article app:', error);
      this.showError(MESSAGES.FAILED_LOAD_ARTICLE);
    }
  }

  getArticleIdFromUrl() {
    const path = window.location.pathname;
    const match = path.match(/\/news\/(\d+)$/);
    return match ? match[1] : null;
  }

  async loadArticle(articleId) {
    try {
      const url = isDevelopment()
        ? addCacheBuster(`${this.apiBase}/news/${articleId}`)
        : `${this.apiBase}/news/${articleId}`;

      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          this.showError('Article not found');
          return;
        }
        throw new Error('Failed to load article');
      }

      const article = await response.json();
      this.renderArticle(article);
    } catch (error) {
      console.error('Failed to load article:', error);
      this.showError('Failed to load article');
    }
  }

  renderArticle(article) {
    // Hide loading indicator
    $('#article-loading').hide();

    // Show article content
    $('#article-content').show();
    $('#article-wrapper').show();

    // Populate article data
    $('#article-title').text(article.title);
    $('#article-category').text(article.category);
    $('#article-time').text(article.timeAgo);
    $('#article-author').text(article.author);
    $('#article-image').attr('src', article.image).attr('alt', article.title);
    $('#article-body').html(article.content);

    // Render tags
    this.renderTags(article.tags);

    // Render related articles
    this.renderRelatedArticles(article.relatedArticles || []);

    // Update page title
    document.title = `${article.title} - WorldTrends`;

    // Add smooth scrolling animations
    this.addAnimations();
  }

  renderTags(tags) {
    const $tagsContainer = $('#article-tags');
    $tagsContainer.empty();

    tags.forEach(tag => {
      const $tag = $(`<span class="article-tag">${tag}</span>`);
      $tagsContainer.append($tag);
    });
  }

  renderRelatedArticles(relatedArticles) {
    const $container = $('.article-related__grid');
    $container.empty();

    if (relatedArticles.length === 0) {
      // If no related articles, hide the section
      $('.article-related').hide();
      return;
    }

    relatedArticles.forEach(article => {
      const $newsCard = $(`
        <div class="news-card" data-news-id="${article.id}" style="cursor: pointer;">
          <img src="${article.image}" alt="${article.title}" class="news-card__image" loading="lazy">
          <div class="news-card__content">
            <h3 class="news-card__title">${article.title}</h3>
            <p class="news-card__description">${article.content}</p>
            <div class="news-meta">
              <span>${article.timeAgo}</span>
              <span>${article.category}</span>
            </div>
          </div>
        </div>
      `);

      // Add click handler for related articles
      $newsCard.on('click', () => {
        window.location.href = `/news/${article.id}`;
      });

      $container.append($newsCard);
    });
  }

  addAnimations() {
    // Animate article sections
    $('.article-hero__main').addClass('animate-fade-in');
    $('.article-content__wrapper').addClass('animate-slide-up');
    $('.article-related').addClass('animate-fade-in-delayed');

    // Add hover effects to all news cards (including related articles) using event delegation
    $(document).on('mouseenter', '.news-card', function () {
      $(this).addClass('hovered');
    });

    $(document).on('mouseleave', '.news-card', function () {
      $(this).removeClass('hovered');
    });
  }

  showError(message) {
    $('#article-loading')
      .html(
        `
      <div class="error-message">
        <h2>Error</h2>
        <p>${message}</p>
        <a href="/news" class="btn btn--read-more btn--ripple-hover">Back to news</a>
      </div>
    `
      )
      .removeClass('loading');
  }

  showToast(message) {
    const $toast = $(`
      <div class="toast" style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
      ">
        ${message}
      </div>
    `);

    $('body').append($toast);

    setTimeout(() => {
      $toast.fadeOut(() => $toast.remove());
    }, 3000);
  }
}

// Initialize app when DOM is ready
$(document).ready(() => {
  new ArticleApp();
});
