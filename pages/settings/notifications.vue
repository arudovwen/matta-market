<template>
  <div class="py-2">
    <div>
      <div
        class="flex gap-x-[76px]  flex-col lg:flex-row gap-y-7 lg:gap-y-10"
      >
        <div class="w-[250px]">
          <h2 class="text-sm text-[#101828] font-semibold">Notifications</h2>
          <p class="text-xs text-[#475467]">
            Please enter your current password to change your password.
          </p>
         
        </div>
        <div class="flex-1">
          <div class="flex justify-between mb-10">
            <h4 class="font-medium text-base">Prevent all notifications?</h4>
            <button class="button">Disable All</button>
          </div>
          <div class="mb-6">
            <SwitchGroup>
              <div class="flex items-center justify-between">
                <SwitchLabel class="mr-4">Storefront notifications</SwitchLabel>
                <Switch
                  v-model="enabled"
                  disabled
                  :class="enabled ? 'bg-blue-600' : 'bg-gray-200'"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span
                    :class="enabled ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  />
                </Switch>
              </div>
            </SwitchGroup>
          </div>
          <hr class="my-4" />
          <div class="mb-6">
            <SwitchGroup>
              <div class="flex items-center justify-between">
                <SwitchLabel class="mr-4"
                  >Procurement Notifications</SwitchLabel
                >
                <Switch
                  disabled
                  v-model="enabled"
                  :class="enabled ? 'bg-blue-600' : 'bg-gray-200'"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span
                    :class="enabled ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  />
                </Switch>
              </div>
            </SwitchGroup>
          </div>
          <hr class="my-4" />
          <div class="mb-6">
            <SwitchGroup>
              <div class="flex items-center justify-between">
                <SwitchLabel class="mr-4">Request Notifications</SwitchLabel>
                <Switch
                  disabled
                  v-model="enabled"
                  :class="enabled ? 'bg-blue-600' : 'bg-gray-200'"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span
                    :class="enabled ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  />
                </Switch>
              </div>
            </SwitchGroup>
          </div>

          <hr class="my-4" />

          <div class="">
            <SwitchGroup>
              <div class="flex items-center justify-between">
                <SwitchLabel class="mr-4"
                  >Announcement Notifications</SwitchLabel
                >
                <Switch
                  disabled
                  v-model="enabled"
                  :class="enabled ? 'bg-blue-600' : 'bg-gray-200'"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span
                    :class="enabled ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  />
                </Switch>
              </div>
            </SwitchGroup>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

const store = useAuthStore();
const enabled = ref(false);
const route = useRoute();
defineProps(["title"]);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
