import { defineNuxtPlugin } from "#app";
import GoogleTranslateSelect from "@google-translate-select/vue3";
import "@google-translate-select/theme-chalk/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("GoogleTranslateSelect", GoogleTranslateSelect);
});
