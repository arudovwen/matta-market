<template>
  <div
    v-if="needRefresh"
    class="fixed bottom-6 right-6 z-[9999] p-5 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-blue-50 flex flex-col gap-4 max-w-sm transform transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-10"
    role="alert"
  >
    <div class="flex items-start gap-4">
      <div class="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-bold text-gray-900 leading-tight">Update Available</h3>
        <p class="text-sm text-gray-500 mt-1 leading-relaxed">
          A new version of Matta Trade is ready. Reload now to enjoy the latest features.
        </p>
      </div>
    </div>
    
    <div class="flex items-center gap-3 w-full">
      <button
        @click="close"
        class="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200"
      >
        Dismiss
      </button>
      <button
        @click="updateServiceWorker()"
        class="flex-[2] px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-200 transition-all duration-200 active:scale-[0.98]"
      >
        Update Now
      </button>
    </div>
  </div>
</template>

<script setup>
const { $pwa } = useNuxtApp();

const needRefresh = computed(() => $pwa?.needRefresh);

const updateServiceWorker = async () => {
  if ($pwa) {
    await $pwa.updateServiceWorker(true);
  }
};

const close = () => {
  if ($pwa) {
    $pwa.cancelPrompt();
  }
};
</script>
