<!--
  Example: How to use Google Translate Select in your components
  
  This file demonstrates the proper way to integrate the Google Translate
  Select component in any Vue component within the Nuxt application.
-->

<template>
  <div class="translation-example">
    <!-- Basic Usage -->
    <GoogleTranslateSelect
      :fetch-browser-language="false"
      :languages="availableLanguages"
      trigger="click"
      @select="handleLanguageSelect"
    />

    <!-- With custom styling -->
    <GoogleTranslateSelect
      :fetch-browser-language="false"
      :languages="availableLanguages"
      trigger="click"
      @select="handleLanguageSelect"
      class="custom-translator"
    />

    <!-- Display current selected language -->
    <div v-if="selectedLanguage">
      Current Language: {{ getCurrentLanguageName() }}
    </div>
  </div>
</template>

<script setup>
// No need to import GoogleTranslateSelect - it's globally registered
// Just use the composable for state management

const { 
  availableLanguages, 
  handleLanguageSelect, 
  selectedLanguage,
  initLanguage 
} = useGoogleTranslate();

// Initialize language preference on component mount
onMounted(() => {
  initLanguage();
});

// Get the full language name from code
const getCurrentLanguageName = () => {
  const lang = availableLanguages.find(l => l.code === selectedLanguage.value);
  return lang ? lang.name : 'English';
};
</script>

<style scoped>
/* Custom styles for the translator */
.custom-translator {
  /* Add your custom styles here */
  border-radius: 8px;
  padding: 4px;
}

.translation-example {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
