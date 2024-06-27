// vitest.config.js
import { defineVitestConfig } from "file:///Users/user/Documents/GitHub/Matta/node_modules/@nuxt/test-utils/dist/config.mjs";
var vitest_config_default = defineVitestConfig({
  test: {
    globals: true,
    environment: "nuxt",
    reporters: "lcov",
    // setupFiles: 'test.setup.js',
    coverage: {
      reporter: ["text", "lcov"],
      include: [
        "components/**/*.{js,ts,vue}",
        // Include all JavaScript, TypeScript, and Vue files in 'components' directory
        "pages/**/*.vue",
        // Include all Vue files in 'pages' directory
        "utils/*.js",
        // Include all JavaScript files in 'utils' directory
        "services/*.js",
        // Include all JavaScript files in 'services' directory
        "layouts/*.vue",
        // Include all Vue files in 'layouts' directory
        "middleware/*.js"
        // Include all JavaScript files in 'middleware' directory
      ],
      exclude: [
        "plugins/**",
        // Exclude all JavaScript files in 'plugins' directory
        "__tests__/**",
        // Exclude all files in '__tests__' directory
        "__mocks__/**"
        // Exclude all files in '__mocks__' directory
      ]
    }
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy91c2VyL0RvY3VtZW50cy9HaXRIdWIvTWF0dGFcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy91c2VyL0RvY3VtZW50cy9HaXRIdWIvTWF0dGEvdml0ZXN0LmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdXNlci9Eb2N1bWVudHMvR2l0SHViL01hdHRhL3ZpdGVzdC5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVWaXRlc3RDb25maWcgfSBmcm9tICdAbnV4dC90ZXN0LXV0aWxzL2NvbmZpZydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lVml0ZXN0Q29uZmlnKHtcbiAgdGVzdDoge1xuICAgIGdsb2JhbHM6IHRydWUsXG4gICAgZW52aXJvbm1lbnQ6IFwibnV4dFwiLFxuICAgIHJlcG9ydGVyczogXCJsY292XCIsXG4gICAgLy8gc2V0dXBGaWxlczogJ3Rlc3Quc2V0dXAuanMnLFxuICAgIGNvdmVyYWdlOiB7XG4gICAgICByZXBvcnRlcjogWyd0ZXh0JywgJ2xjb3YnXSxcbiAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgJ2NvbXBvbmVudHMvKiovKi57anMsdHMsdnVlfScsIC8vIEluY2x1ZGUgYWxsIEphdmFTY3JpcHQsIFR5cGVTY3JpcHQsIGFuZCBWdWUgZmlsZXMgaW4gJ2NvbXBvbmVudHMnIGRpcmVjdG9yeVxuICAgICAgICAncGFnZXMvKiovKi52dWUnLCAgICAgICAgICAgICAgLy8gSW5jbHVkZSBhbGwgVnVlIGZpbGVzIGluICdwYWdlcycgZGlyZWN0b3J5XG4gICAgICAgICd1dGlscy8qLmpzJywgICAgICAgICAgICAgICAgICAvLyBJbmNsdWRlIGFsbCBKYXZhU2NyaXB0IGZpbGVzIGluICd1dGlscycgZGlyZWN0b3J5XG4gICAgICAgICdzZXJ2aWNlcy8qLmpzJywgICAgICAgICAgICAgICAvLyBJbmNsdWRlIGFsbCBKYXZhU2NyaXB0IGZpbGVzIGluICdzZXJ2aWNlcycgZGlyZWN0b3J5XG4gICAgICAgICdsYXlvdXRzLyoudnVlJywgICAgICAgICAgICAgICAvLyBJbmNsdWRlIGFsbCBWdWUgZmlsZXMgaW4gJ2xheW91dHMnIGRpcmVjdG9yeVxuICAgICAgICAnbWlkZGxld2FyZS8qLmpzJywgICAgICAgICAgICAgLy8gSW5jbHVkZSBhbGwgSmF2YVNjcmlwdCBmaWxlcyBpbiAnbWlkZGxld2FyZScgZGlyZWN0b3J5XG4gICAgICBdLFxuICAgICAgZXhjbHVkZTogW1xuICAgICAgICAncGx1Z2lucy8qKicsICAgICAgICAgICAgICAgIC8vIEV4Y2x1ZGUgYWxsIEphdmFTY3JpcHQgZmlsZXMgaW4gJ3BsdWdpbnMnIGRpcmVjdG9yeVxuICAgICAgICAnX190ZXN0c19fLyoqJywgICAgICAgICAgICAgICAgLy8gRXhjbHVkZSBhbGwgZmlsZXMgaW4gJ19fdGVzdHNfXycgZGlyZWN0b3J5XG4gICAgICAgICdfX21vY2tzX18vKionLCAgICAgICAgICAgICAgICAvLyBFeGNsdWRlIGFsbCBmaWxlcyBpbiAnX19tb2Nrc19fJyBkaXJlY3RvcnlcbiAgICAgIF0sXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRSLFNBQVMsMEJBQTBCO0FBRS9ULElBQU8sd0JBQVEsbUJBQW1CO0FBQUEsRUFDaEMsTUFBTTtBQUFBLElBQ0osU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsV0FBVztBQUFBO0FBQUEsSUFFWCxVQUFVO0FBQUEsTUFDUixVQUFVLENBQUMsUUFBUSxNQUFNO0FBQUEsTUFDekIsU0FBUztBQUFBLFFBQ1A7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQO0FBQUE7QUFBQSxRQUNBO0FBQUE7QUFBQSxRQUNBO0FBQUE7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
