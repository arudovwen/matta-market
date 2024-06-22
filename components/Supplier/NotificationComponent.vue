<template>
  <div class="gap-y-2 flex flex-col">
    <!-- Top bar   -->
    <div class="p-6 lg:p-8 bg-white rounded-lg bg-img">
      <div class="mb-12"><Breadcrumbs /></div>
      <div class="grid grid-cols-3 justify-between items-end mb-4 lg:mb-10">
        <h1
          class="text-3xl lg:text-[48px] lg:leading-[56px] text-matta-black col-span-1 font-medium capitalize"
        >
          Notifications
        </h1>
      </div>
      <div class="grid lg:grid-cols-2 justify-between items-end mb-10">
        <div class="lg:col-span-2">
          <!-- <h4 class="font-medium text-base">Labore et dolore magna aliqua</h4> -->
          <div class="flex flex-col lg:flex-row gap-8 items-center">
            <p class="text-sm lg:text-base">
              We may send important notifications about your Matta account to
              your email outside of your notification settings.
            </p>
            <div>
              <input
                class="rounded-lg px-[14px] py-[10px] h-11 w-[350px] border border-[#DCDEE6] text-[#B6B7B9] focus:outline-matta-black/20"
                autocomplete="off"
                autofocus="on"
                placeholder="team@pharmazell.com"
                :value="store.userInfo?.email"
                readonly
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-6 lg:p-8 rounded-lg bg-white ">
      <div class="col-span-2">
        <!-- <h4 class="font-medium">Labore et dolore magna aliqua</h4> -->
        <div class="flex gap-x-16 justify-between items-center mb-8">
          <p class="text-sm lg:text-base">
            Select the kind of notifications you would like to get about your
            Storefront, Procurements, Requests and Announcements.
          </p>
          <!-- <div>
            <div class="flex relative items-center">
              <select
                class="border border-[#E7EBEE] rounded-full px-8 py-3 appearance-none relative"
              >
                <option>Hourly</option>
              </select>
              <i class="uil uil-sort absolute right-3 pointer-events-none"></i>
            </div>
          </div> -->
        </div>
        <div class="border p-6 lg:p-8 rounded-[20px]">
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
