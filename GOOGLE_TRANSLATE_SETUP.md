# Google Translate Select Integration

This document explains how Google Translate Select has been integrated into the Nuxt application.

## Overview

The Google Translate Select component (`@google-translate-select/vue3`) has been configured to work seamlessly with Nuxt 3, providing language translation capabilities across the application.

## Configuration

### 1. Plugin Setup

A Nuxt plugin has been created at `/plugins/google-translate.client.js`:

```javascript
import { defineNuxtPlugin } from "#app";
import GoogleTranslateSelect from "@google-translate-select/vue3";
import "@google-translate-select/theme-chalk/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("GoogleTranslateSelect", GoogleTranslateSelect);
});
```

This registers the component globally and imports the required CSS.

### 2. Nuxt Config

The CSS has been added to `nuxt.config.js`:

```javascript
css: [
  // ... other styles
  "@google-translate-select/theme-chalk/dist/index.css",
  // ... other styles
],
```

### 3. Composable

A composable has been created at `/composables/useGoogleTranslate.js` to manage translation state across the application:

```javascript
const { availableLanguages, handleLanguageSelect } = useGoogleTranslate();
```

## Usage

### In Components

The component is now available globally, so you don't need to import it:

```vue
<template>
  <GoogleTranslateSelect
    :fetch-browser-language="false"
    :languages="availableLanguages"
    trigger="click"
    @select="handleLanguageSelect"
  />
</template>

<script setup>
// Use the composable
const { availableLanguages, handleLanguageSelect } = useGoogleTranslate();
</script>
```

### Available Props

- `fetch-browser-language` - Whether to auto-detect browser language (set to `false`)
- `languages` - Array of language options (provided by composable)
- `trigger` - How to trigger the dropdown (`"click"` or `"hover"`)
- `@select` - Event handler for language selection

### Available Languages

The current configuration supports:

- English (en)
- French (fr)
- Spanish (es)
- German (de)
- Chinese (zh-CN)
- Arabic (ar)
- Portuguese (pt)
- Japanese (ja)

To add more languages, update the `availableLanguages` array in `/composables/useGoogleTranslate.js`.

## Components Using Translation

The Google Translate Select component is currently integrated into:

1. `DealBanner.vue` - Top promotional banner
2. `AppHeader.vue` - Main application header
3. `AppSideMenu.vue` - Mobile side menu

## Features

- **Language Persistence**: Selected language is stored in localStorage
- **Consistent Styling**: Uses the theme-chalk CSS package for consistent appearance
- **Global State**: The composable ensures language selection is shared across components
- **Client-Side Only**: The plugin runs only on the client side (`.client.js`)

## Customization

### Changing Available Languages

Edit `/composables/useGoogleTranslate.js` and modify the `availableLanguages` array:

```javascript
const availableLanguages = [
  { code: 'en', name: 'English', cname: '英语', ename: 'English' },
  // Add more languages here
];
```

### Custom Styling

The component uses the theme-chalk CSS. To customize:

1. Override CSS classes in your global styles
2. Or create a custom theme by forking the theme-chalk package

### Language Change Handler

The `handleLanguageSelect` function in the composable can be extended to:

- Make API calls to save user preferences
- Update application-wide i18n settings
- Trigger analytics events
- Update content based on language

## Troubleshooting

### Component Not Rendering

- Ensure the dev server was restarted after adding the plugin
- Check browser console for errors
- Verify the component is being used inside a client-side context

### Styles Not Loading

- Verify the CSS import in `nuxt.config.js`
- Check that the package is properly installed: `npm list @google-translate-select/vue3`
- Clear `.nuxt` cache and rebuild: `rm -rf .nuxt && npm run dev`

### Language Not Persisting

- Check localStorage is enabled in the browser
- Verify the `handleLanguageSelect` function is being called
- Check browser console for any errors during localStorage operations

## Dependencies

```json
{
  "@google-translate-select/vue3": "^0.1.8"
}
```

The package also installs these peer dependencies:
- `@google-translate-select/constants`
- `@google-translate-select/theme-chalk`
- `@google-translate-select/utils`

## Testing

To test the translation component:

1. Run the development server: `npm run dev`
2. Navigate to a page with the GoogleTranslateSelect component
3. Click the language selector
4. Select a different language
5. Verify the selection is logged to console
6. Refresh the page and verify the language persists

## Future Enhancements

Potential improvements:

1. Integrate with Nuxt i18n module for full translation support
2. Add server-side language detection based on request headers
3. Create language-specific routes
4. Implement content translation API integration
5. Add language switcher animations
