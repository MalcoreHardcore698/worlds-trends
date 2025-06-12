  </main>

  <!-- Import maps for ES6 modules -->
  <script type="importmap">
  {
    "imports": {
      "jquery": "<?= CDN_JQUERY ?>",
      "chart.js": "<?= CDN_CHARTJS ?>"
    }
  }
  </script>

  <!-- Development cache buster (loaded first in dev mode) -->
  <?php if (isDevelopment()): ?>
    <script src="<?= getVersionedUrl(JS_DEV_CACHE_BUSTER) ?>"></script>
  <?php endif; ?>

  <!-- Theme toggle (loaded on all pages) -->
  <script type="module" src="<?= getVersionedUrl(JS_THEME_TOGGLE) ?>"></script>

  <!-- Page-specific JavaScript -->
  <?php if (isset($pageScript)): ?>
    <script type="module" src="<?= getVersionedUrl($pageScript) ?>"></script>
  <?php endif; ?>
</body>
</html>