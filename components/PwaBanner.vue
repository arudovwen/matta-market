<template>
  <ClientOnly>
    <div
      v-if="$pwa?.offlineReady || $pwa?.needRefresh"
      class="flex justify-start items-center gap-x-6 py-2 container"
      role="alert"
    >
      <div class="message font-bold">
        <span v-if="$pwa.offlineReady"> App ready to work offline </span>
        <span v-else>
          New content available, click on reload button to update.
        </span>
      </div>
      <div class="flex items-center gap-x-6">
        <button
          class="btn btn-sm bg-primary-500 text-white text-sm px-3 py-2"
          v-if="$pwa.needRefresh"
          @click="$pwa.updateServiceWorker()"
        >
          Reload
        </button>
        <button class="btn-sm text-sm" @click="$pwa.cancelPrompt()">
          Close
        </button>
      </div>
    </div>
    <div
      v-if="
        $pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh
      "
      class="flex justify-start items-center gap-x-6 py-2 container"
      role="alert"
    >
      <div class="font-bold text-sm">
        <span> Install Matta?</span>
      </div>
      <div class="flex gap-x-4">
        <button
          class="btn btn-sm bg-primary-500 text-white text-sm px-3 py-2"
          @click="$pwa.install()"
        >
          Install
        </button>
        <button class="btn-sm text-sm" @click="$pwa.cancelInstall()">
          Cancel
        </button>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
const { $pwa } = useNuxtApp();
</script>
