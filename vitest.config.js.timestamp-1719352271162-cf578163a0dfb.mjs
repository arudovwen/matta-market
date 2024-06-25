// vitest.config.js
import { defineVitestConfig } from "file:///Users/tolulopeoduro/Documents/work/Matta-Trade-Frontend-New/node_modules/@nuxt/test-utils/dist/config.mjs";
var vitest_config_default = defineVitestConfig({
  test: {
    globals: true,
    environment: "nuxt",
    coverage: {
      include: [
        "components/**/*.{js,ts,vue}",
        // Example: Include all JavaScript, TypeScript, and Vue files in 'components' directory
        "pages/**/*.vue",
        // Include all Vue files in 'pages' directory
        "utils/*.js",
        "services/*.js",
        // Include all JavaScript files in 'utils' directory
        "layouts/*.vue",
        "plugins/*.js",
        "middleware/*.js"
      ]
    }
    // setupFiles: ["./setup.ts"]
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy90b2x1bG9wZW9kdXJvL0RvY3VtZW50cy93b3JrL01hdHRhLVRyYWRlLUZyb250ZW5kLU5ld1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3RvbHVsb3Blb2R1cm8vRG9jdW1lbnRzL3dvcmsvTWF0dGEtVHJhZGUtRnJvbnRlbmQtTmV3L3ZpdGVzdC5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3RvbHVsb3Blb2R1cm8vRG9jdW1lbnRzL3dvcmsvTWF0dGEtVHJhZGUtRnJvbnRlbmQtTmV3L3ZpdGVzdC5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVWaXRlc3RDb25maWcgfSBmcm9tICdAbnV4dC90ZXN0LXV0aWxzL2NvbmZpZydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lVml0ZXN0Q29uZmlnKHtcblx0dGVzdDoge1xuXHRcdGdsb2JhbHM6IHRydWUsXG5cdFx0ZW52aXJvbm1lbnQ6IFwibnV4dFwiLFxuXHRcdGNvdmVyYWdlOiB7XG5cdFx0XHRpbmNsdWRlOiBbXG5cdFx0XHRcdCdjb21wb25lbnRzLyoqLyoue2pzLHRzLHZ1ZX0nLCAgLy8gRXhhbXBsZTogSW5jbHVkZSBhbGwgSmF2YVNjcmlwdCwgVHlwZVNjcmlwdCwgYW5kIFZ1ZSBmaWxlcyBpbiAnY29tcG9uZW50cycgZGlyZWN0b3J5XG5cdFx0XHRcdCdwYWdlcy8qKi8qLnZ1ZScsICAgICAgICAgICAgICAgLy8gSW5jbHVkZSBhbGwgVnVlIGZpbGVzIGluICdwYWdlcycgZGlyZWN0b3J5XG5cdFx0XHRcdCd1dGlscy8qLmpzJyxcblx0XHRcdFx0J3NlcnZpY2VzLyouanMnLCAgICAgICAgICAgICAgICAgICAvLyBJbmNsdWRlIGFsbCBKYXZhU2NyaXB0IGZpbGVzIGluICd1dGlscycgZGlyZWN0b3J5XG5cdFx0XHRcdCdsYXlvdXRzLyoudnVlJywgXG5cdFx0XHRcdCdwbHVnaW5zLyouanMnLCAgIFxuXHRcdFx0XHQnbWlkZGxld2FyZS8qLmpzJywgICBcblx0XHRcdCAgXSxcblx0XHR9LFxuXHRcdC8vIHNldHVwRmlsZXM6IFtcIi4vc2V0dXAudHNcIl1cblx0fSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBXLFNBQVMsMEJBQTBCO0FBRTdZLElBQU8sd0JBQVEsbUJBQW1CO0FBQUEsRUFDakMsTUFBTTtBQUFBLElBQ0wsU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLE1BQ1QsU0FBUztBQUFBLFFBQ1I7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUE7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNDO0FBQUEsSUFDSDtBQUFBO0FBQUEsRUFFRDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
