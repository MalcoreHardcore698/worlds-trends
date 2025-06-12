// Advanced Charts with D3.js - Monthly timeline with daily drilldown
import $ from 'jquery';
import { addCacheBuster, isDevelopment } from './cache-buster.js';

class D3ChartsApp {
  constructor() {
    this.apiBase = '/api';
    this.currentYear = 2024;
    this.currentView = 'days'; // Always show daily view
    this.selectedMonth = 9; // Default to September
    this.data = null;
    this.monthlyData = null; // Cache monthly data for timeline
    this.svg = null;
    this.margin = { top: 40, right: 40, bottom: 60, left: 60 };
    this.width = 800;
    this.height = 400;
    this.carouselOffset = 0;
    this.visibleMonths = 6; // Number of months visible at once
    this.isHoveringPoint = false; // Flag to track if hovering over a point

    this.init();
  }

  async init() {
    try {
      // Load D3.js from CDN
      await this.loadD3();

      // Wait for DOM to be fully rendered and CSS applied
      await this.waitForLayout();

      this.setupChart();

      // Load monthly data for timeline first
      await this.loadMonthlyDataForTimeline();
      this.setupTimeline();

      // Then load daily data for selected month
      await this.loadDailyData(this.selectedMonth);
      this.bindEvents();
    } catch (error) {
      console.error('Failed to initialize D3 charts app:', error);
      this.showError();
    }
  }

  async waitForLayout() {
    return new Promise(resolve => {
      // Wait for next frame to ensure layout is complete
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          resolve();
        });
      });
    });
  }

  async loadD3() {
    return new Promise((resolve, reject) => {
      if (window.d3) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://d3js.org/d3.v7.min.js';
      script.onload = () => {
        console.log('[D3Charts] D3.js loaded successfully');
        resolve();
      };
      script.onerror = () => reject(new Error('Failed to load D3.js'));
      document.head.appendChild(script);
    });
  }

  setupChart() {
    // Clear existing content
    d3.select('#chart-container').selectAll('*').remove();

    // Create SVG
    const container = d3.select('#chart-container');
    const containerNode = container.node();

    if (!containerNode) {
      console.warn('Chart container not found');
      return;
    }

    const containerRect = containerNode.getBoundingClientRect();

    // Fallback to minimum width if container has no size yet
    let containerWidth = containerRect.width;
    if (containerWidth <= 0) {
      // Use parent element width or fallback
      const parentWidth = containerNode.parentElement?.getBoundingClientRect().width || 800;
      containerWidth = Math.max(parentWidth - 40, 600); // минимум 600px
    }

    this.width = containerWidth - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;

    console.log(`[Chart] Setting up chart with dimensions: ${this.width}x${this.height}`);

    this.svg = container
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .style('background', 'transparent')
      .style('width', '100%') // Responsive width
      .style('height', 'auto');

    this.chartGroup = this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  async loadMonthlyData() {
    try {
      const url = this.buildApiUrl('months');
      const response = await fetch(url);
      this.data = await response.json();

      this.updateTimeline();
      this.drawMonthlyChart();
      this.updateStats();
    } catch (error) {
      console.error('Failed to load monthly data:', error);
      this.showError();
    }
  }

  async loadDailyData(month) {
    try {
      const url = this.buildApiUrl('days', month);
      const response = await fetch(url);
      this.data = await response.json();

      this.selectedMonth = month;
      this.updateActiveMonth(); // Just update active state, don't rebuild
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

    // Create all month buttons
    this.monthlyData.data.forEach(monthData => {
      const isActive = this.selectedMonth === monthData.month;
      const $btn = $(`
                <button class="month-btn ${isActive ? 'active' : ''}" 
                        data-month="${monthData.month}">
                    ${monthData.monthName} '${monthData.year.toString().slice(-2)}
                </button>
            `);
      $timeline.append($btn);
    });

    // Scroll to active month after DOM update
    setTimeout(() => this.scrollToActiveMonth(), 100);
  }

  updateActiveMonth() {
    // Just update active states without rebuilding
    $('.month-btn').removeClass('active');
    $(`.month-btn[data-month="${this.selectedMonth}"]`).addClass('active');
    this.scrollToActiveMonth();
  }

  scrollToActiveMonth() {
    const container = $('.month-timeline-container')[0];
    const button = $(`.month-btn[data-month="${this.selectedMonth}"]`)[0];

    if (button && container) {
      const containerWidth = container.offsetWidth;
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;

      // Calculate desired scroll position to center the active button
      const targetScroll = buttonLeft - containerWidth / 2 + buttonWidth / 2;

      // Smooth scroll to target
      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
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
      // Кольцевое движение вперед: если это последний месяц, переходим к первому
      newIndex = (currentIndex + 1) % months.length;
    } else {
      // Кольцевое движение назад: если это первый месяц, переходим к последнему
      newIndex = currentIndex === 0 ? months.length - 1 : currentIndex - 1;
    }

    const newMonth = months[newIndex].month;

    // Загружаем данные для нового месяца
    this.loadDailyData(newMonth);
  }

  drawMonthlyChart() {
    this.chartGroup.selectAll('*').remove();

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(this.data.data.map(d => d.month))
      .range([0, this.width])
      .padding(0.1);

    const yScale = d3.scaleLinear().domain([0, 1]).range([this.height, 0]);

    // Axes
    const xAxis = d3.axisBottom(xScale).tickFormat(d => {
      const monthData = this.data.data.find(m => m.month === d);
      return monthData ? monthData.monthName : '';
    });

    const yAxis = d3.axisLeft(yScale).tickFormat(d3.format('.0%'));

    this.chartGroup
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${this.height})`)
      .call(xAxis)
      .selectAll('text')
      .style('font-family', 'var(--font-family-sans)')
      .style('fill', 'var(--color-text-secondary)');

    this.chartGroup
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .selectAll('text')
      .style('font-family', 'var(--font-family-sans)')
      .style('fill', 'var(--color-text-secondary)');

    // Chart lines
    this.drawLine(this.data.data, 'chart1', this.data.chart1.color, xScale, yScale);
    this.drawLine(this.data.data, 'chart2', this.data.chart2.color, xScale, yScale);

    // Interactive month areas
    this.chartGroup
      .selectAll('.month-area')
      .data(this.data.data)
      .enter()
      .append('rect')
      .attr('class', 'month-area')
      .attr('x', d => xScale(d.month))
      .attr('y', 0)
      .attr('width', xScale.bandwidth())
      .attr('height', this.height)
      .style('fill', 'transparent')
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        this.loadDailyData(d.month);
      })
      .on('mouseenter', (event, d) => {
        this.showTooltip(event, d, 'month');
      })
      .on('mouseleave', () => {
        this.hideTooltip();
      });
  }

  drawDailyChart() {
    this.chartGroup.selectAll('*').remove();

    // Scales
    const xScale = d3.scaleLinear().domain([1, this.data.data.length]).range([0, this.width]);

    const yScale = d3.scaleLinear().domain([0, 1]).range([this.height, 0]);

    // Axes
    const xAxis = d3.axisBottom(xScale).tickFormat(d => Math.round(d));

    const yAxis = d3.axisLeft(yScale).tickFormat(d3.format('.0%'));

    this.chartGroup
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${this.height})`)
      .call(xAxis)
      .selectAll('text')
      .style('font-family', 'var(--font-family-sans)')
      .style('fill', 'var(--color-text-secondary)');

    this.chartGroup
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .selectAll('text')
      .style('font-family', 'var(--font-family-sans)')
      .style('fill', 'var(--color-text-secondary)');

    // Chart lines
    this.drawDailyLine(this.data.data, 'chart1', this.data.chart1.color, xScale, yScale);
    this.drawDailyLine(this.data.data, 'chart2', this.data.chart2.color, xScale, yScale);

    // Interactive points
    this.addInteractivePoints(this.data.data, xScale, yScale);
  }

  drawLine(data, metric, color, xScale, yScale) {
    const line = d3
      .line()
      .x(d => xScale(d.month) + xScale.bandwidth() / 2)
      .y(d => yScale(d[metric]))
      .curve(d3.curveCardinal);

    this.chartGroup
      .append('path')
      .datum(data)
      .attr('class', `line-${metric}`)
      .attr('d', line)
      .style('fill', 'none')
      .style('stroke', color)
      .style('stroke-width', 3)
      .style('stroke-linecap', 'round');

    // Points
    this.chartGroup
      .selectAll(`.point-${metric}`)
      .data(data)
      .enter()
      .append('circle')
      .attr('class', `point-${metric}`)
      .attr('cx', d => xScale(d.month) + xScale.bandwidth() / 2)
      .attr('cy', d => yScale(d[metric]))
      .attr('r', 5)
      .style('fill', color)
      .style('stroke', 'var(--color-surface)')
      .style('stroke-width', 2);
  }

  drawDailyLine(data, metric, color, xScale, yScale) {
    const line = d3
      .line()
      .x(d => xScale(d.day))
      .y(d => yScale(d[metric]))
      .curve(d3.curveCardinal);

    this.chartGroup
      .append('path')
      .datum(data)
      .attr('class', `line-${metric}`)
      .attr('d', line)
      .style('fill', 'none')
      .style('stroke', color)
      .style('stroke-width', 3)
      .style('stroke-linecap', 'round');
  }

  addInteractivePoints(data, xScale, yScale) {
    // Add vertical line for hover indicator (initially hidden)
    this.hoverLine = this.chartGroup
      .append('line')
      .attr('class', 'hover-line')
      .attr('y1', 0)
      .attr('y2', this.height)
      .style('stroke', 'var(--color-text-muted)')
      .style('stroke-width', 1)
      .style('stroke-dasharray', '3,3')
      .style('opacity', 0)
      .style('pointer-events', 'none');

    // Add invisible overlay for mouse tracking
    this.chartGroup
      .append('rect')
      .attr('class', 'chart-overlay')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', this.width)
      .attr('height', this.height)
      .style('fill', 'transparent')
      .style('pointer-events', 'all')
      .on('mousemove', event => {
        this.handleChartMouseMove(event, data, xScale, yScale);
      })
      .on('mouseleave', () => {
        this.hideChartHover();
      });

    // Chart1 points
    this.chartGroup
      .selectAll('.point-chart1')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'point-chart1')
      .attr('cx', d => xScale(d.day))
      .attr('cy', d => yScale(d.chart1))
      .attr('r', 4)
      .style('fill', this.data.chart1.color)
      .style('stroke', 'var(--color-surface)')
      .style('stroke-width', 2)
      .style('cursor', 'pointer')
      .style('transition', 'all 0.2s ease')
      .style('pointer-events', 'all') // Включаем события для точек
      .on('mouseenter', (event, d) => {
        this.showDualTooltips(event, d, xScale, yScale);
        this.isHoveringPoint = true;
      })
      .on('mouseleave', (event, d) => {
        this.hideDualTooltips();
        this.isHoveringPoint = false;
      });

    // Chart2 points
    this.chartGroup
      .selectAll('.point-chart2')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'point-chart2')
      .attr('cx', d => xScale(d.day))
      .attr('cy', d => yScale(d.chart2))
      .attr('r', 4)
      .style('fill', this.data.chart2.color)
      .style('stroke', 'var(--color-surface)')
      .style('stroke-width', 2)
      .style('cursor', 'pointer')
      .style('transition', 'all 0.2s ease')
      .style('pointer-events', 'all') // Включаем события для точек
      .on('mouseenter', (event, d) => {
        this.showDualTooltips(event, d, xScale, yScale);
        this.isHoveringPoint = true;
      })
      .on('mouseleave', (event, d) => {
        this.hideDualTooltips();
        this.isHoveringPoint = false;
      });
  }

  handleChartMouseMove(event, data, xScale, yScale) {
    // Получаем координаты мыши относительно chartGroup
    const [mouseX] = d3.pointer(event, this.chartGroup.node());

    // Находим ближайший день
    const closestDay = Math.round(xScale.invert(mouseX));
    const closestData = data.find(d => d.day === closestDay);

    if (closestData) {
      const xPos = xScale(closestData.day);

      // Show vertical line
      this.hoverLine.attr('x1', xPos).attr('x2', xPos).style('opacity', 0.6);

      // Highlight points for this day
      this.highlightPointsForDay(closestData.day, true);

      // Не показываем tooltip при наведении на область - только вертикальная линия и подсветка
    }
  }

  hideChartHover() {
    // Hide vertical line only if not hovering over a point
    if (!this.isHoveringPoint) {
      this.hoverLine.style('opacity', 0);

      // Reset all points
      this.highlightPointsForDay(null, false);
    }
  }

  highlightPointsForDay(targetDay, highlight) {
    this.chartGroup
      .selectAll('.point-chart1, .point-chart2')
      .transition()
      .duration(highlight ? 100 : 200)
      .attr('r', d => {
        if (highlight && d.day === targetDay) {
          return 6;
        }
        return 4;
      })
      .style('stroke-width', d => {
        if (highlight && d.day === targetDay) {
          return 3;
        }
        return 2;
      })
      .style('opacity', d => {
        if (!highlight) {
          return 1;
        } else if (d.day === targetDay) {
          return 1;
        } else {
          return 0.6;
        }
      });
  }

  showPointTooltip(event, data, metric) {
    this.showTooltip(event, data, 'day', metric);
  }

  showDualTooltips(event, data, xScale, yScale) {
    // Убираем обычный tooltip
    this.hideTooltip();

    // Позиционируем вертикальную линию
    const xPos = xScale(data.day);
    this.hoverLine.attr('x1', xPos).attr('x2', xPos).style('opacity', 0.6);

    // Подсвечиваем точки
    this.highlightPointsForDay(data.day, true);

    // Создаем два tooltip
    this.createDualTooltip(event, data, 'chart1', yScale(data.chart1));
    this.createDualTooltip(event, data, 'chart2', yScale(data.chart2));
  }

  createDualTooltip(event, data, metric, yPosition) {
    const chartData = metric === 'chart1' ? this.data.chart1 : this.data.chart2;
    const value = data[metric];

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', `d3-tooltip-dual d3-tooltip-${metric}`)
      .style('position', 'absolute')
      .style('background', 'var(--color-surface)')
      .style('border', '1px solid var(--color-border)')
      .style('border-radius', 'var(--radius-md)')
      .style('padding', '12px')
      .style('font-size', '14px')
      .style('box-shadow', 'var(--shadow-lg)')
      .style('pointer-events', 'none')
      .style('z-index', '1000')
      .style('opacity', 0)
      .style('min-width', '120px');

    const content = `
            <div style="font-weight: 600; margin-bottom: 4px;">${data.label}</div>
            <div style="color: ${chartData.color};">${chartData.name}: ${Math.round(
      value * 100
    )}%</div>
            <div style="font-size: 12px; color: var(--color-text-muted);">${Math.round(
              value * 1000
            )} ${chartData.unit}</div>
        `;

    tooltip.html(content);

    // Позиционируем tooltips друг под другом с зазором
    const baseLeft = event.pageX + 10;
    const baseTop = event.pageY;

    let leftPos = baseLeft;
    let topPos = baseTop;

    const tooltipWidth = 160;
    const tooltipHeight = 80; // Увеличиваем высоту для точности
    const gap = 10; // Зазор между tooltips

    if (metric === 'chart1') {
      // Первый tooltip: размещаем ВЫШЕ курсора
      topPos = baseTop - tooltipHeight - gap;
    } else if (metric === 'chart2') {
      // Второй tooltip: размещаем НИЖЕ курсора
      topPos = baseTop + gap;
    }

    // Проверка по горизонтали
    if (leftPos + tooltipWidth > window.innerWidth) {
      leftPos = event.pageX - tooltipWidth - 10;
    }

    // Проверка по вертикали
    if (metric === 'chart1' && topPos < 0) {
      // Если первый tooltip выходит за верх экрана
      topPos = 10;
    } else if (metric === 'chart2' && topPos + tooltipHeight > window.innerHeight) {
      // Если второй tooltip выходит за низ экрана
      topPos = window.innerHeight - tooltipHeight - 10;
    }

    tooltip
      .style('left', leftPos + 'px')
      .style('top', topPos + 'px')
      .transition()
      .duration(200)
      .style('opacity', 1);
  }

  hideDualTooltips() {
    d3.selectAll('.d3-tooltip-dual').transition().duration(200).style('opacity', 0).remove();
  }

  showTooltip(event, data, type, metric = null) {
    const tooltip = d3.select('body').selectAll('.d3-tooltip').data([0]);

    const tooltipEnter = tooltip
      .enter()
      .append('div')
      .attr('class', 'd3-tooltip')
      .style('position', 'absolute')
      .style('background', 'var(--color-surface)')
      .style('border', '1px solid var(--color-border)')
      .style('border-radius', 'var(--radius-md)')
      .style('padding', '12px')
      .style('font-size', '14px')
      .style('box-shadow', 'var(--shadow-lg)')
      .style('pointer-events', 'none')
      .style('z-index', '1000')
      .style('opacity', 0);

    const tooltipUpdate = tooltipEnter.merge(tooltip);

    let content = '';
    if (type === 'month') {
      content = `
                <div style="font-weight: 600; margin-bottom: 4px;">${data.label}</div>
                <div style="color: ${this.data.chart1.color};">${
        this.data.chart1.name
      }: ${Math.round(data.chart1 * 100)}%</div>
                <div style="color: ${this.data.chart2.color};">${
        this.data.chart2.name
      }: ${Math.round(data.chart2 * 100)}%</div>
                <div style="margin-top: 8px; font-size: 12px; color: var(--color-text-muted);">Click to view daily data</div>
            `;
    } else if (type === 'day') {
      const chartData = metric === 'chart1' ? this.data.chart1 : this.data.chart2;
      const value = data[metric];
      content = `
                <div style="font-weight: 600; margin-bottom: 4px;">${data.label}</div>
                <div style="color: ${chartData.color};">${chartData.name}: ${Math.round(
        value * 100
      )}%</div>
                <div style="font-size: 12px; color: var(--color-text-muted);">${Math.round(
                  value * 1000
                )} ${chartData.unit}</div>
            `;
    }

    tooltipUpdate
      .html(content)
      .style('left', event.pageX + 10 + 'px')
      .style('top', event.pageY - 10 + 'px')
      .transition()
      .duration(200)
      .style('opacity', 1);
  }

  hideTooltip() {
    d3.select('.d3-tooltip').transition().duration(200).style('opacity', 0).remove();
  }

  updateStats() {
    if (this.currentView === 'months') {
      // Show yearly averages
      const avgChart1 =
        this.data.data.reduce((sum, d) => sum + d.chart1, 0) / this.data.data.length;
      const avgChart2 =
        this.data.data.reduce((sum, d) => sum + d.chart2, 0) / this.data.data.length;

      $('#chart1-value').text(Math.round(avgChart1 * 1000) + ' GB avg');
      $('#chart2-value').text(Math.round(avgChart2 * 1000) + ' GB avg');
    } else {
      // Show monthly totals
      const totalChart1 = this.data.data.reduce((sum, d) => sum + d.chart1, 0);
      const totalChart2 = this.data.data.reduce((sum, d) => sum + d.chart2, 0);

      $('#chart1-value').text(Math.round(totalChart1 * 100) + ' GB');
      $('#chart2-value').text(Math.round(totalChart2 * 100) + ' GB');
    }
  }

  bindEvents() {
    // Month button clicks (delegated) - always switch to daily view
    $(document).on('click', '.month-btn', e => {
      const month = parseInt($(e.target).data('month'));
      if (month !== this.selectedMonth) {
        this.loadDailyData(month);
      }
    });

    // Carousel navigation buttons
    $('#carousel-prev').on('click', () => {
      this.moveCarousel('prev');
    });

    $('#carousel-next').on('click', () => {
      this.moveCarousel('next');
    });

    // Window resize with debounce
    let resizeTimeout;
    $(window).on('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        console.log('[Chart] Window resized, redrawing chart');
        this.setupChart();
        if (this.data) {
          if (this.currentView === 'days') {
            this.drawDailyChart();
          } else {
            this.drawMonthlyChart();
          }
        }
        // Also update carousel scroll position
        setTimeout(() => this.scrollToActiveMonth(), 100);
      }, 250); // Debounce resize events
    });
  }

  showError() {
    const $container = $('#chart-container');
    $container.html(`
            <div class="error-state" style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                flex: 1;

                height: 100%;

                color: var(--color-text-muted);
                text-align: center;
            ">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📊</div>
                <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">Failed to load chart data</div>
                <div style="font-size: 0.9rem;">Please try refreshing the page</div>
            </div>
        `);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.d3ChartsApp = new D3ChartsApp();
});

export default D3ChartsApp;
