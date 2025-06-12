<?php
  function renderIcon($iconName, $width = 20, $height = 20, $class = '') {
    $classAttr = $class ? ' class="' . $class . '"' : '';

    switch ($iconName) {
      case 'arrow-right':
        return '<svg width="' . $width . '" height="' . $height . '" viewBox="0 0 20 20" fill="none"' . $classAttr . '>
          <path d="M12.1084 15.1167L17.1667 10.0583L12.1084 5" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3.00002 10.0583L17.025 10.0583" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>';

      case 'arrow-left':
        return '<svg width="' . $width . '" height="' . $height . '" viewBox="0 0 20 20" fill="none"' . $classAttr . ' style="transform: scaleX(-1);">
          <path d="M12.1084 15.1167L17.1667 10.0583L12.1084 5" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3.00002 10.0583L17.025 10.0583" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>';

      default:
        return '';
    }
  }
?>