import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    globals: true,
    environment: "nuxt",
    setupFiles: 'test.setup.js',
    coverage: {
      reporter: ['text', 'lcov'],
      include: [
        'components/**/*.{js,ts,vue}', // Include all JavaScript, TypeScript, and Vue files in 'components' directory
        'pages/**/*.vue',              // Include all Vue files in 'pages' directory
        'utils/*.js',                  // Include all JavaScript files in 'utils' directory
        'services/*.js',               // Include all JavaScript files in 'services' directory
        'layouts/*.vue',               // Include all Vue files in 'layouts' directory
        'middleware/*.js',             // Include all JavaScript files in 'middleware' directory
      ],
      exclude: [
        'plugins/**',                // Exclude all JavaScript files in 'plugins' directory
        '__tests__/**',                // Exclude all files in '__tests__' directory
        '__mocks__/**',                // Exclude all files in '__mocks__' directory
      ],
    },
  },
})
