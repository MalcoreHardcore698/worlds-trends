import $ from 'jquery';
import { Chart, registerables } from 'chart.js';

import { addCacheBuster, isDevelopment } from '../helpers/cache-buster.js';
import { API, DEFAULTS, CHART, IDS, MESSAGES } from '../constants.js';

Chart.register(...registerables);

class ChartsApp {
  constructor() {
    this.apiBase = API.BASE;
    this.currentYear = DEFAULTS.YEAR;
    this.selectedMonth = DEFAULTS.MONTH;
    this.data = null;
    this.monthlyData = null;
    this.chart = null;
    this.currentHoverDay = null;

    this.init();
  }

  async init() {
    try {
      await this.waitForLayout();
      this.setupChart();
      await this.loadMonthlyDataForTimeline();
      this.setupTimeline();
      await this.loadDailyData(this.selectedMonth);
      this.bindEvents();
    } catch (error) {
      console.error('Failed to initialize Chart.js charts app:', error);
      this.showError();
    }
  }

  async waitForLayout() {
    return new Promise(resolve => {
      const checkLayout = () => {
        const container = document.getElementById(IDS.CHART_CONTAINER);
        if (container && container.getBoundingClientRect().width > 0) {
          resolve();
        } else {
          requestAnimationFrame(checkLayout);
        }
      };
      checkLayout();
    });
  }

  setupChart() {
    const container = document.getElementById(IDS.CHART_CONTAINER);
    if (!container) {
      console.warn(MESSAGES.CHART_CONTAINER_NOT_FOUND);
      return;
    }

    container.innerHTML = '';

    const canvas = document.createElement('canvas');
    canvas.id = IDS.CHART_CANVAS;
    canvas.style.width = '100%';
    canvas.style.height = CHART.HEIGHT;
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [],
      },
      plugins: [
        {
          id: 'pointController',
          beforeUpdate: chart => {
            chart.data.datasets.forEach(dataset => {
              if (dataset.pointRadius && Array.isArray(dataset.pointRadius)) {
                dataset.pointRadius = dataset.pointRadius.map(() => 0);
              } else {
                dataset.pointRadius = 0;
              }
            });
          },
        },
        {
          id: 'hoverVerticalLine',
          afterDraw: chart => {
            if (chart.tooltip._active && chart.tooltip._active.length) {
              const activePoint = chart.tooltip._active[0];
              const ctx = chart.ctx;
              const x = activePoint.element.x;
              const topY = chart.scales.y.top;
              const bottomY = chart.scales.y.bottom;

              ctx.save();
              ctx.beginPath();
              ctx.moveTo(x, topY);
              ctx.lineTo(x, bottomY);
              ctx.lineWidth = 2;
              const textColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--color-text-secondary')
                .trim();
              ctx.strokeStyle = textColor + '40';
              ctx.setLineDash([5, 5]);
              ctx.stroke();
              ctx.restore();
            }
          },
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 800,
          easing: 'easeOutQuart',
        },
        interaction: {
          mode: 'nearest',
          intersect: false,
          axis: 'x',
        },
        hover: {
          mode: 'nearest',
          intersect: false,
          animationDuration: 150,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
            external: context => {
              this.handleTooltip(context);
            },
          },
        },
        scales: {
          x: {
            display: true,
            grid: {
              display: false,
            },
            ticks: {
              color: () => {
                return getComputedStyle(document.documentElement)
                  .getPropertyValue('--color-text-secondary')
                  .trim();
              },
              font: {
                family: 'var(--font-family-sans)',
                size: 12,
              },
              maxRotation: 55,
              minRotation: 55,
            },
          },
          y: {
            display: true,
            grid: {
              display: false,
            },
            ticks: {
              color: () => {
                return getComputedStyle(document.documentElement)
                  .getPropertyValue('--color-text-secondary')
                  .trim();
              },
              font: {
                family: 'var(--font-family-sans)',
                size: 12,
              },
              callback: function (value) {
                return value.toFixed(1);
              },
            },
            title: {
              display: true,
              text: 'TB',
              color: () => {
                return getComputedStyle(document.documentElement)
                  .getPropertyValue('--color-text-secondary')
                  .trim();
              },
              font: {
                family: 'var(--font-family-sans)',
                size: 12,
                weight: '600',
              },
              position: 'top',
              align: 'end',
            },
          },
        },
        onHover: (event, activeElements) => {
          this.handleChartHover(event, activeElements);
        },
        events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
      },
    });
  }

  async loadDailyData(month) {
    try {
      const url = this.buildApiUrl('days', month);
      const response = await fetch(url);
      this.data = await response.json();

      if (
        !this.data ||
        !this.data.data ||
        !Array.isArray(this.data.data) ||
        this.data.data.length === 0
      ) {
        console.warn('Invalid data received:', this.data);
        this.showError();
        return;
      }

      this.selectedMonth = month;
      this.updateActiveMonth();
      this.drawDailyChart();
      this.updateStats();
    } catch (error) {
      console.error('Failed to load daily data:', error);
      this.showError();
    }
  }

  async loadMonthlyDataForTimeline() {
    try {
      const url = this.buildApiUrl('months');
      const response = await fetch(url);
      this.monthlyData = await response.json();
      return this.monthlyData;
    } catch (error) {
      console.error('Failed to load monthly data for timeline:', error);
      this.monthlyData = { data: [] };
      return this.monthlyData;
    }
  }

  buildApiUrl(view, month = null) {
    let url = `${this.apiBase}/charts?view=${view}&year=${this.currentYear}`;

    if (month) {
      url += `&month=${month}`;
    }

    return isDevelopment() ? addCacheBuster(url) : url;
  }

  setupTimeline() {
    if (!this.monthlyData || !this.monthlyData.data) return;

    const $timeline = $('.month-timeline');
    $timeline.empty();

    this.monthlyData.data.forEach(monthData => {
      const isActive = this.selectedMonth === monthData.month;
      const $btn = $(`
                <button class="month-btn ${isActive ? 'month-btn--active' : ''}" 
                        data-month="${monthData.month}">
                    ${monthData.monthName} '${monthData.year.toString().slice(-2)}
                </button>
            `);
      $timeline.append($btn);
    });

    setTimeout(() => {
      this.scrollToActiveMonth();
      this.updateScrollFadeGradients();
    }, 100);
  }

  updateActiveMonth() {
    $('.month-btn').removeClass('month-btn--active');
    $(`.month-btn[data-month="${this.selectedMonth}"]`).addClass('month-btn--active');
    this.scrollToActiveMonth();
  }

  scrollToActiveMonth() {
    const timeline = $('.month-timeline')[0];
    const button = $(`.month-btn[data-month="${this.selectedMonth}"]`)[0];

    if (button && timeline) {
      const timelineWidth = timeline.offsetWidth;
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;

      const targetScroll = buttonLeft - timelineWidth / 2 + buttonWidth / 2;

      timeline.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth',
      });

      setTimeout(() => this.updateScrollFadeGradients(), 100);
    }
  }

  updateScrollFadeGradients() {
    const timeline = $('.month-timeline')[0];
    const $container = $('.month-timeline__container');

    if (!timeline) return;

    const scrollLeft = timeline.scrollLeft;
    const scrollWidth = timeline.scrollWidth;
    const clientWidth = timeline.clientWidth;
    const maxScrollLeft = scrollWidth - clientWidth;

    if (scrollLeft > 0) {
      $container.addClass('month-timeline__container--fade-left');
    } else {
      $container.removeClass('month-timeline__container--fade-left');
    }

    if (scrollLeft < maxScrollLeft && maxScrollLeft > 0) {
      $container.addClass('month-timeline__container--fade-right');
    } else {
      $container.removeClass('month-timeline__container--fade-right');
    }
  }

  moveCarousel(direction) {
    if (!this.monthlyData || !this.monthlyData.data || this.monthlyData.data.length === 0) {
      return;
    }

    const months = this.monthlyData.data;
    const currentIndex = months.findIndex(m => m.month === this.selectedMonth);

    if (currentIndex === -1) return;

    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % months.length;
    } else {
      newIndex = currentIndex === 0 ? months.length - 1 : currentIndex - 1;
    }

    const newMonth = months[newIndex].month;
    this.loadDailyData(newMonth);
  }

  drawDailyChart() {
    if (!this.chart || !this.data || !this.data.data || this.data.data.length === 0) {
      console.warn('No data available for chart rendering');
      return;
    }

    this.updateTextColors();

    const labels = this.data.data.map((d, index) => {
      let monthName = d.monthName || '';

      if (!monthName && this.selectedMonth) {
        const monthNames = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        monthName = monthNames[this.selectedMonth - 1] || '';
      }

      const shortMonthName = monthName.length > 3 ? monthName.substring(0, 3) : monthName;
      return `${d.day} ${shortMonthName}`;
    });
    const chart1Data = this.data.data.map(d => d.chart1);
    const chart2Data = this.data.data.map(d => d.chart2);

    this.chart.data = {
      labels: labels,
      datasets: [
        {
          label: this.data.chart1.name,
          data: chart1Data,
          borderColor: this.data.chart1.color,
          backgroundColor: this.data.chart1.color + '20',
          borderWidth: 3,
          tension: 0.1,
          pointRadius: 0,
          pointHoverRadius: 8,
          pointBackgroundColor: this.data.chart1.color,
          pointBorderColor: '#ffffff',
          pointBorderWidth: 0,
          pointHoverBorderWidth: 3,
          hoverBorderWidth: 5,
          fill: false,
        },
        {
          label: this.data.chart2.name,
          data: chart2Data,
          borderColor: this.data.chart2.color,
          backgroundColor: this.data.chart2.color + '20',
          borderWidth: 3,
          tension: 0.1,
          pointRadius: 0,
          pointHoverRadius: 8,
          pointBackgroundColor: this.data.chart2.color,
          pointBorderColor: '#ffffff',
          pointBorderWidth: 0,
          pointHoverBorderWidth: 3,
          hoverBorderWidth: 5,
          fill: false,
        },
      ],
    };

    const maxValue = Math.max(...chart1Data, ...chart2Data);
    this.chart.options.scales.y.max = Math.max(1.0, Math.ceil(maxValue * 10) / 10);

    this.chart.data.datasets.forEach(dataset => {
      dataset.pointRadius = 0;
      dataset.pointBorderWidth = 0;
    });

    this.chart.update('none');
  }

  updateTextColors() {
    if (!this.chart) return;

    const textSecondaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-text-secondary')
      .trim();

    this.chart.options.scales.x.ticks.color = textSecondaryColor;
    this.chart.options.scales.y.ticks.color = textSecondaryColor;
    this.chart.options.scales.y.title.color = textSecondaryColor;

    this.chart.update('none');
  }

  handleTooltip(context) {
    const { chart, tooltip } = context;

    if (tooltip.opacity === 0) {
      this.hideTooltips();
      return;
    }

    const dataPoints = tooltip.dataPoints;
    if (!dataPoints || dataPoints.length === 0) return;

    const dataIndex = dataPoints[0].dataIndex;
    const data = this.data.data[dataIndex];

    if (!data) return;

    this.showCustomTooltips(data, tooltip.caretX, tooltip.caretY);
  }

  handleChartHover(event, activeElements) {
    if (activeElements.length === 0) {
      this.hideTooltips();
      this.currentHoverDay = null;
      this.chart.update('none');
      return;
    }

    const dataIndex = activeElements[0].index;
    const data = this.data.data[dataIndex];

    if (data && data.day !== this.currentHoverDay) {
      this.currentHoverDay = data.day;
      this.chart.update('none');
    }
  }

  showCustomTooltips(data, x, y) {
    this.hideTooltips();

    const canvas = document.getElementById('chart-canvas');
    const rect = canvas.getBoundingClientRect();

    const chart1Value = data.chart1;
    const chart2Value = data.chart2;

    const chart1Y = this.getYPositionForValue(chart1Value);
    const chart2Y = this.getYPositionForValue(chart2Value);

    const pageX = rect.left + x + window.scrollX;
    const chart1PageY = rect.top + chart1Y + window.scrollY;
    const chart2PageY = rect.top + chart2Y + window.scrollY;

    const chart1IsHigher = chart1Y < chart2Y;

    this.createSmartTooltip(data, 'chart1', pageX, chart1PageY, chart1IsHigher);
    this.createSmartTooltip(data, 'chart2', pageX, chart2PageY, !chart1IsHigher);
  }

  getYPositionForValue(value) {
    if (!this.chart || !this.chart.scales || !this.chart.scales.y) return 0;

    const yScale = this.chart.scales.y;
    return yScale.getPixelForValue(value);
  }

  createSmartTooltip(data, metric, x, y, isTopPoint = false) {
    const chartData = metric === 'chart1' ? this.data.chart1 : this.data.chart2;
    const value = data[metric];

    const tooltip = document.createElement('div');
    tooltip.className = `chart-tooltip chart-tooltip-${metric}`;

    let finalX = x;
    let finalY = y;
    let transform = 'translateX(-50%)';

    if (isTopPoint) {
      finalY = y - 86;
      tooltip.classList.add('tooltip-top');
    } else {
      finalY = y + 20;
      tooltip.classList.add('tooltip-bottom');
    }

    tooltip.style.cssText = `
      position: absolute !important;
      background: var(--color-background) !important;
      border: 2px solid ${chartData.color} !important;
      border-radius: 12px !important;
      padding: 12px 16px !important;
      font-size: 15px !important;
      font-weight: 600 !important;
      box-shadow: var(--shadow-xl) !important;
      pointer-events: none !important;
      z-index: 1000 !important;
      left: ${finalX}px !important;
      top: ${finalY}px !important;
      transform: ${transform} !important;
      min-width: 90px !important;
      opacity: 0 !important;
      transition: opacity 0.15s ease !important;
      color: var(--color-text-primary) !important;
    `;

    tooltip.innerHTML = `
      <div style="color: var(--color-text-secondary) !important; margin-bottom: 4px !important; font-weight: 500 !important; font-size: 14px !important;">${
        data.label
      }</div>
      <div style="color: var(--color-text-primary) !important; font-size: 16px !important; font-weight: 700 !important;">${Math.round(
        value * 1000
      )} GB</div>
    `;

    document.body.appendChild(tooltip);

    setTimeout(() => {
      tooltip.style.opacity = '1';
    }, 10);
  }

  hideTooltips() {
    this.currentHoverDay = null;
    const tooltips = document.querySelectorAll('.chart-tooltip');
    tooltips.forEach(tooltip => {
      tooltip.style.opacity = '0';
      setTimeout(() => {
        if (tooltip.parentNode) {
          tooltip.parentNode.removeChild(tooltip);
        }
      }, 150);
    });
  }

  updateStats() {
    const totalChart1 = this.data.data.reduce((sum, d) => sum + d.chart1, 0);
    const totalChart2 = this.data.data.reduce((sum, d) => sum + d.chart2, 0);

    this.animateStatValue('#chart1-value', Math.round(totalChart1 * 100) + ' GB');
    this.animateStatValue('#chart2-value', Math.round(totalChart2 * 100) + ' GB');
  }

  animateStatValue(selector, newValue) {
    const $element = $(selector);
    const currentValue = $element.text();

    if (currentValue !== newValue) {
      $element.css('opacity', 1).animate({ opacity: 0 }, 150, () => {
        $element
          .text(newValue)
          .css('transform', 'translateY(10px)')
          .animate({ opacity: 1 }, 150)
          .animate({ transform: 'translateY(0px)' }, 200);
      });
    }
  }

  bindEvents() {
    $(document).on('click', '.month-btn', e => {
      const month = parseInt($(e.target).data('month'));
      if (month !== this.selectedMonth) {
        this.loadDailyData(month);
      }
    });

    $('#carousel-prev').on('click', () => {
      this.moveCarousel('prev');
    });

    $('#carousel-next').on('click', () => {
      this.moveCarousel('next');
    });

    $('.month-timeline').on('scroll', () => {
      this.updateScrollFadeGradients();
    });

    let resizeTimeout;
    $(window).on('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (this.chart) {
          this.chart.resize();
        }
        setTimeout(() => {
          this.scrollToActiveMonth();
          this.updateScrollFadeGradients();
        }, 100);
      }, 250);
    });

    const observer = new MutationObserver(() => {
      this.updateTextColors();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
  }

  showError() {
    const container = document.getElementById('chart-container');
    if (container) {
      container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 400px; color: var(--color-text-secondary);">
          <div style="font-size: 48px; margin-bottom: 16px;">📊</div>
          <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">Не удалось загрузить данные</div>
          <div style="font-size: 14px;">Попробуйте обновить страницу</div>
        </div>
      `;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.chartsApp = new ChartsApp();
});

export default ChartsApp;
