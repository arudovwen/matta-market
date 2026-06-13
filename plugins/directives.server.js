export default defineNuxtPlugin((nuxtApp) => {
  const ssrDirective = {
    getSSRProps() {
      return {};
    },
  };

  nuxtApp.vueApp.directive("click-outside", ssrDirective);
  nuxtApp.vueApp.directive("clipboard", ssrDirective);
  nuxtApp.vueApp.directive("tippy", ssrDirective);
});
