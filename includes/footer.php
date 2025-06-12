        </div>
    </main>

    <!-- Import maps for ES6 modules -->
    <script type="importmap">
    {
        "imports": {
            "jquery": "https://esm.sh/jquery@3.7.1"
        }
    }
    </script>

    <!-- Development cache buster (loaded first in dev mode) -->
    <?php if (isDevelopment()): ?>
        <script src="<?= getVersionedUrl('/assets/js/dev-cache-buster.js') ?>"></script>
    <?php endif; ?>
    
    <!-- Theme toggle (loaded on all pages) -->
    <script type="module" src="<?= getVersionedUrl('/assets/js/theme-toggle.js') ?>"></script>

    <!-- Page-specific JavaScript -->
    <?php if (isset($pageScript)): ?>
        <script type="module" src="<?= getVersionedUrl($pageScript) ?>"></script>
    <?php endif; ?>
</body>
</html>