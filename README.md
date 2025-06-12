# World Trends

A web application for visualizing and analyzing global trends and statistics.

## Quick Start

```bash
# Clone repository
git clone https://github.com/MalcoreHardcore698/worlds-trends.git
cd worlds-trends

# Install dependencies
php composer.phar install

# Start development server
php -S localhost:8000 router.php
```

## Project Structure

```
worlds-trends/
├── api/           # Backend API endpoints
├── assets/        # Frontend assets
│   ├── css/       # CSS files using CUBE CSS methodology
│   ├── images/    # Images and icons
│   └── js/        # JavaScript modules
├── includes/      # PHP includes and helpers
└── pages/         # Page templates
```

## Architecture

- Frontend: Vanilla JavaScript with modular architecture (jQuery, chart.js)
- Styling: CUBE CSS methodology (Composition, Utility, Block, Exception)
- Backend: PHP with simple router
- No external frontend frameworks used

## CSS Architecture

```
main.css
├── base.css        # Base styles, CSS variables
├── layout.css      # Layout and grid systems
├── components.css  # UI components
└── utilities.css   # Utility classes
```

## Browser Support

- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
