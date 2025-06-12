// Charts page JavaScript
import $ from 'jquery';
import { addCacheBuster, isDevelopment } from './cache-buster.js';

class ChartsApp {
    constructor() {
        this.apiBase = '/api';
        this.canvas = null;
        this.ctx = null;
        this.chartData = null;
        this.currentMonth = 9; // September
        this.init();
    }

    async init() {
        try {
            this.canvas = document.getElementById('chart-canvas');
            this.ctx = this.canvas.getContext('2d');
            this.setupCanvas();
            
            await this.loadChartData();
            this.bindEvents();
            this.generateXAxisDates();
        } catch (error) {
            console.error('Failed to initialize charts app:', error);
        }
    }

    setupCanvas() {
        // Set canvas size for high DPI displays
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }

    async loadChartData() {
        try {
            const url = isDevelopment() ? 
                addCacheBuster(`${this.apiBase}/charts`) : 
                `${this.apiBase}/charts`;
            const response = await fetch(url);
            const data = await response.json();
            
            this.chartData = data;
            this.updateStats(data);
            this.drawChart(data);
        } catch (error) {
            console.error('Failed to load chart data:', error);
            this.showError();
        }
    }

    updateStats(data) {
        $('#chart1-value').text(data.chart1.total);
        $('#chart2-value').text(data.chart2.total);
    }

    drawChart(data) {
        const canvas = this.canvas;
        const ctx = this.ctx;
        const rect = canvas.getBoundingClientRect();
        
        // Clear canvas
        ctx.clearRect(0, 0, rect.width, rect.height);
        
        // Chart dimensions
        const padding = 40;
        const chartWidth = rect.width - padding * 2;
        const chartHeight = rect.height - padding * 2;
        
        // Draw chart lines
        this.drawChartLine(ctx, data.chart1.data, data.chart1.color, padding, chartWidth, chartHeight);
        this.drawChartLine(ctx, data.chart2.data, data.chart2.color, padding, chartWidth, chartHeight);
        
        // Update data points
        this.updateDataPoints(data);
    }

    drawChartLine(ctx, data, color, padding, chartWidth, chartHeight) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        
        data.forEach((point, index) => {
            const x = padding + (index / (data.length - 1)) * chartWidth;
            const y = padding + chartHeight - (point.value * chartHeight);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw points
        ctx.fillStyle = color;
        data.forEach((point, index) => {
            const x = padding + (index / (data.length - 1)) * chartWidth;
            const y = padding + chartHeight - (point.value * chartHeight);
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    updateDataPoints(data) {
        const $container = $('.data-points');
        $container.empty();
        
        // Add sample data points
        const chart1Point = data.chart1.data[2]; // 3rd day
        const chart2Point = data.chart2.data[2];
        
        const $point1 = $(`
            <div class="data-point chart1-point" style="left: 10%; bottom: ${chart1Point.value * 60}%;">
                <div class="tooltip">
                    <div class="date">${chart1Point.label}</div>
                    <div class="value">${Math.round(chart1Point.value * 1000)} GB</div>
                </div>
            </div>
        `);
        
        const $point2 = $(`
            <div class="data-point chart2-point" style="left: 15%; bottom: ${chart2Point.value * 60}%;">
                <div class="tooltip">
                    <div class="date">${chart2Point.label}</div>
                    <div class="value">${Math.round(chart2Point.value * 1000)} GB</div>
                </div>
            </div>
        `);
        
        $container.append($point1, $point2);
    }

    generateXAxisDates() {
        const $xAxis = $('#x-axis-dates');
        $xAxis.empty();
        
        const dates = [];
        for (let i = 1; i <= 31; i += 5) {
            dates.push(`${i} Aug`);
        }
        
        dates.forEach(date => {
            $xAxis.append(`<span>${date}</span>`);
        });
    }

    bindEvents() {
        // Month navigation
        $('.month-btn').on('click', (e) => {
            const $btn = $(e.target);
            const month = parseInt($btn.data('month'));
            
            $('.month-btn').removeClass('active');
            $btn.addClass('active');
            
            this.currentMonth = month;
            this.loadChartData(); // Reload data for new month
        });

        // Arrow navigation
        $('#prev-month').on('click', () => {
            this.navigateMonth(-1);
        });

        $('#next-month').on('click', () => {
            this.navigateMonth(1);
        });

        // Canvas resize handling
        $(window).on('resize', () => {
            this.setupCanvas();
            if (this.chartData) {
                this.drawChart(this.chartData);
            }
        });

        // Add smooth hover animations
        $('.data-point').hover(
            function() {
                $(this).css('transform', 'scale(1.2)');
            },
            function() {
                $(this).css('transform', 'scale(1)');
            }
        );
    }

    navigateMonth(direction) {
        const months = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6]; // Aug to Jun
        const currentIndex = months.indexOf(this.currentMonth);
        const newIndex = Math.max(0, Math.min(months.length - 1, currentIndex + direction));
        
        const $newBtn = $(`.month-btn[data-month="${months[newIndex]}"]`);
        $newBtn.trigger('click');
    }

    showError() {
        const ctx = this.ctx;
        const rect = this.canvas.getBoundingClientRect();
        
        ctx.fillStyle = '#666';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Failed to load chart data', rect.width / 2, rect.height / 2);
    }

    // Utility method for smooth animations
    animateValue(element, start, end, duration = 1000) {
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * easeOut;
            
            $(element).text(Math.round(current) + ' GB');
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Initialize charts app when DOM is ready
$(document).ready(() => {
    new ChartsApp();
});

// Add custom CSS for smooth transitions
const style = document.createElement('style');
style.textContent = `
    .data-point {
        transition: transform 0.2s ease;
    }
    
    .month-btn {
        transition: all 0.2s ease;
    }
    
    .nav-arrow {
        transition: all 0.2s ease;
    }
    
    .nav-arrow:active {
        transform: scale(0.95);
    }
`;
document.head.appendChild(style); 