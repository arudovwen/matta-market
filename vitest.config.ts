import vue from '@vitejs/plugin-vue';

// Configure Vitest (https://vitest.dev/config)

import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
  },
});
