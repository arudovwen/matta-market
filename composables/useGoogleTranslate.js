/**
 * Composable for handling Google Translate functionality
 * This provides a centralized way to manage language selection across the app
 */

import { ref } from 'vue';

export const useGoogleTranslate = () => {
  const selectedLanguage = ref('en');

  // Available languages for the application
  const availableLanguages = [
    { code: 'en', name: 'English', cname: '英语', ename: 'English' },
    { code: 'fr', name: 'French', cname: '法语', ename: 'French' },
    { code: 'es', name: 'Spanish', cname: '西班牙语', ename: 'Spanish' },
    { code: 'de', name: 'German', cname: '德语', ename: 'German' },
    { code: 'zh-CN', name: 'Chinese', cname: '中文', ename: 'Chinese' },
    { code: 'ar', name: 'Arabic', cname: '阿拉伯语', ename: 'Arabic' },
    { code: 'pt', name: 'Portuguese', cname: '葡萄牙语', ename: 'Portuguese' },
    { code: 'ja', name: 'Japanese', cname: '日语', ename: 'Japanese' },
  ];

  /**
   * Handle language selection
   * @param {Object} language - The selected language object
   */
  const handleLanguageSelect = (language) => {
    if (language && language.code) {
      selectedLanguage.value = language.code;
      
      // Store preference in localStorage for persistence
      if (process.client) {
        localStorage.setItem('preferredLanguage', language.code);
      }

      console.log('Language changed to:', language.name);
    }
  };

  /**
   * Get stored language preference
   */
  const getStoredLanguage = () => {
    if (process.client) {
      return localStorage.getItem('preferredLanguage') || 'en';
    }
    return 'en';
  };

  /**
   * Initialize language from stored preference
   */
  const initLanguage = () => {
    selectedLanguage.value = getStoredLanguage();
  };

  return {
    selectedLanguage,
    availableLanguages,
    handleLanguageSelect,
    getStoredLanguage,
    initLanguage,
  };
};
