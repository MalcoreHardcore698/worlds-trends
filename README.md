# World Trends

A web application for visualizing and analyzing global trends and statistics.

## Quick Start

```bash
# Clone repository
git clone https://github.com/MalcoreHardcore698/worlds-trends.git
cd worlds-trends

# Start development server
php -S localhost:8000 router.php
```

## PHP Installation

### 🖥️ macOS

```bash
# Using Homebrew (recommended)
brew install php

# Or download from official site
# Visit: https://www.php.net/downloads.php
```

### Windows

```bash
# Using Chocolatey
choco install php

# Or download XAMPP (includes PHP, Apache, MySQL)
# Visit: https://www.apachefriends.org/download.html

# Or download PHP directly
# Visit: https://windows.php.net/download/
```

### Linux (Ubuntu/Debian)

```bash
# Update package list
sudo apt update

# Install PHP
sudo apt install php php-cli

# For other distributions:
# CentOS/RHEL: sudo yum install php php-cli
# Fedora: sudo dnf install php php-cli
# Arch: sudo pacman -S php
```

### Verify Installation

```bash
php --version
```

## Alternative Run Methods

### 🐳 Using Docker (No PHP installation required)

```bash
# Build and run with Docker
docker run -p 8000:8000 -v $(pwd):/app -w /app php:8.2-cli php -S 0.0.0.0:8000 router.php

# Or create Dockerfile and use docker-compose
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
