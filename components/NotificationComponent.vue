<!-- eslint-disable no-unused-vars -->
<template>
  <div class="flex items-center gap-x-4 mb-3">
    <h2 class="font-medium text-lg md:text-2xl">Notifications</h2>
    <span class="text-gray-300">/</span>
    <p class="text-lg md:text-2xl text-primary">{{ unreadnotifications }}</p>
  </div>
  <div class="flex items-center justify-between">
    <div class="flex items-center relative gap-x-3">
      <Listbox v-model="selectedOption" multiple>
        <div class="relative w-full">
          <ListboxButton
            class="border text-matta-black border-gray-200 px-4 py-3 rounded-full text-xs outline-none appearance-none w-[90px] md:w-[140px]"
          >
            <span
              class="block capitalize text-[11px] md:text-xs text-[#8F8C9A] whitespace-nowrap text-left"
              >Filter by</span
            >
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <i
                class="uil uil-angle-down text-lg absolute right-2 pointer-events-none"
              ></i>
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute max-h-60 w-full mt-[.5rem] min-w-[12rem] z-[999] py-2 overflow-auto rounded-lg bg-white text-sm shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),_0px_4px_6px_-2px_rgba(16,24,40,0.03)] ring-1 ring-black ring-opacity-5 border-b-2 outline-0 sm:text-sm"
            >
              <ListboxOption
                v-for="option in options"
                :key="option.name"
                :value="option.id"
                as="ul"
              >
                <li
                  class="relative cursor-pointer select-none py-[5px] px-[13px] text-loft-black"
                >
                  <div class="flex gap-x-2 items-center cursor-pointer">
                    <input
                      type="checkbox"
                      class="accent-matta-black"
                      :value="option.id"
                      v-model="selectedOption"
                    />
                    <div class="text-xs text-[#101828]" v-if="option.name">
                      {{ option.name }}
                    </div>
                  </div>
                </li>
              </ListboxOption>
              <div
                v-if="!options.length"
                class="relative cursor-pointer select-none py-[11px] px-[13px] text-loft-black text-sm text-[#667085]"
              >
                No option
              </div>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>
    <button
      @click="markAllNotification"
      class="border border-primary text-primary px-4 py-3 rounded-full capitlize text-[11px] md:text-xs"
    >
      Mark all as read
    </button>
  </div>
  <hr class="my-3 border-gray-200" />
  <div
    class="h-[310px] rounded-lg w-full flex items-center justify-center"
    v-if="!notifications"
  >
    <div class="text-center max-w-sm mx-auto">
      <img alt="notification"
        src="~/assets/img/nofound.svg"
        class="w-[52px] h-auto mx-auto mb-2"
      />

      <p class="text-sm text-gray-400 mb-6">No new notification</p>
    </div>
  </div>
  <NotificationBar v-if="notifications" />
</template>
<script setup>
import {
  marknotification,
  markallnotification,
} from "~/services/notificationservice";
// eslint-disable-next-line no-unused-vars
import { ref, inject, computed, provide } from "vue";
import NotificationBar from "~/components/NotificationTypes/AllNotifications.vue";
import {
  Listbox,
  // ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const authStore = useAuthStore();
const notifications = inject("notifications");
const getNotifications = inject("getNotifications");

// eslint-disable-next-line no-unused-vars
const unreadnotifications = computed(() => {
  return notifications?.value?.filter((i) => !i.isViewed)?.length;
});
const selectedOption = ref([]);
// eslint-disable-next-line no-unused-vars
function handleNotification(data) {
  data.userId = authStore.userId;
  data.businessId = authStore.businessId;
  marknotification(data).then((res) => {
    if (res.status == 200) {
      notifications.value = notifications.value.map((i) => {
        if (i.id == data.id) {
          i.isViewed = true;
        }

        return i;
      });
    }
  });
}

function markAllNotification() {
  markallnotification({
    userId: authStore.userId,
    businessId: authStore.businessId,
  }).then((res) => {
    if (res.status == 200) {
      getNotifications();
    }
  });
}
const options = [
  {
    id: 0,
    name: "Profile updates",
  },
  {
    id: 1,
    name: "Orders",
  },
  {
    id: 2,
    name: "Requests",
  },
  {
    id: 3,
    name: "Storefront",
  },
  {
    id: 4,
    name: "Announcement",
  },
];
provide("handleNotification", handleNotification);
provide("selectedOption", selectedOption);
</script>
