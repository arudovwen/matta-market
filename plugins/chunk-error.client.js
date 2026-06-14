export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:chunkError', ({ error }) => {
    if (typeof window !== 'undefined') {
      console.warn("Chunk error detected, reloading page...");
      window.location.reload(true);
    }
  });
});
