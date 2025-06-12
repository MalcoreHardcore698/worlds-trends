import $ from 'jquery';

import { addCacheBuster, isDevelopment } from '../helpers/cache-buster.js';
import { API, IDS, SELECTORS, getNewsUrl } from '../constants.js';

class NewsApp {
  constructor() {
    this.apiBase = API.BASE;
    this.init();
  }

  async init() {
    try {
      await this.loadNews();
      this.bindEvents();
    } catch (error) {
      console.error('Failed to initialize news app:', error);
    }
  }

  async loadNews() {
    try {
      const url = isDevelopment() ? addCacheBuster(API.NEWS) : API.NEWS;
      const response = await fetch(url);
      const data = await response.json();

      this.renderFeaturedNews(data.featured);
      this.renderTrendingNews(data.trending);
      this.renderLatestNews(data.latest);
    } catch (error) {
      console.error('Failed to load news:', error);
      this.showError();
    }
  }

  renderFeaturedNews(featured) {
    const $featuredImage = $(`#${IDS.FEATURED_IMAGE}`);
    const $featuredTitle = $(`#${IDS.FEATURED_TITLE}`);

    $featuredImage.attr('src', featured.image);
    $featuredTitle.text(featured.title);

    // Add click handler for featured news
    $(SELECTORS.HERO_IMAGE)
      .off('click')
      .on('click', () => {
        window.location.href = getNewsUrl(featured.id);
      });
  }

  renderTrendingNews(trending) {
    const $container = $('#trending-news');
    $container.empty();

    trending.forEach(item => {
      const $newsItem = $(`
                <div class="news-item" data-news-id="${item.id}" style="cursor: pointer;">
                    <h3 class="news-item__title">${item.title}</h3>
                    <p class="news-item__description">${item.description}</p>
                    <div class="news-meta">
                        <span>${item.timeAgo}</span>
                        <span>${item.category}</span>
                    </div>
                </div>
            `);

      // Add click handler for trending news
      $newsItem.on('click', () => {
        window.location.href = `/news/${item.id}`;
      });

      $container.append($newsItem);
    });
  }

  renderLatestNews(latest) {
    const $container = $('#latest-news-grid');
    $container.empty();

    latest.forEach((item, index) => {
      const $newsCard = $(`
                <div class="news-card" data-aos="fade-up" data-aos-delay="${
                  index * 100
                }" data-news-id="${item.id}" style="cursor: pointer;">
                    <img src="${item.image}" alt="${
        item.title
      }" class="news-card__image" loading="lazy">
                    <div class="news-card__content">
                        <h3 class="news-card__title">${item.title}</h3>
                        <p class="news-card__description">${item.description}</p>
                        <div class="news-meta">
                            <span>${item.timeAgo}</span>
                            <span>${item.category}</span>
                        </div>
                    </div>
                </div>
            `);

      // Add click handler for latest news cards
      $newsCard.on('click', () => {
        window.location.href = `/news/${item.id}`;
      });

      $container.append($newsCard);
    });

    // Add hover effects with jQuery
    $('.news-card').hover(
      function () {
        $(this).addClass('hovered');
      },
      function () {
        $(this).removeClass('hovered');
      }
    );
  }

  bindEvents() {
    // Explore button click
    $('.btn--explore').on('click', () => {
      $('html, body').animate(
        {
          scrollTop: $('.news-section').offset().top - 100,
        },
        800
      );
    });

    // Read more button
    $('.btn--read-more').on('click', async () => {
      await this.loadMoreNews();
    });

    // Navigation
    $('.nav__link').on('click', e => {
      const href = $(e.target).attr('href');
      if (href && !href.startsWith('http')) {
        e.preventDefault();
        window.location.href = href;
      }
    });
  }

  async loadMoreNews() {
    const $button = $('.btn--read-more');
    const originalText = $button.text();

    $button.text('Loading...').prop('disabled', true);

    // Simulate loading more news
    setTimeout(() => {
      $button.text(originalText).prop('disabled', false);
      this.showToast('More news loaded successfully!');
    }, 1000);
  }

  showError() {
    $('.loading').text('Failed to load news. Please try again later.');
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
  new NewsApp();
});
