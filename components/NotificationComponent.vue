<template>
  <div class="flex items-center justify-between">
    <div class="relative flex items-center gap-x-3">
      <Listbox v-model="selectedOption" multiple>
        <div class="relative w-full">
          <ListboxButton class="relative flex items-center">
            <span
              class="relative h-8 w-8 rounded-full bg-[#F7F7F7] flex items-center justify-center"
            >
              <AppIcon
                class="text-base md:text-lg text-[#484848]"
                icon="uiw:bell"
              />
              <span
                v-if="unreadnotifications > 0"
                class="w-3 h-3 rounded-full bg-[#16F046] text-[8px] flex items-center justify-center absolute top-[4px] right-[4px]"
              >
                {{ unreadnotifications }}
              </span>
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute max-h-[700px] mt-[.5rem] right-0 w-[380px] z-[999] py-2 overflow-auto rounded-lg bg-white text-sm shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),_0px_4px_6px_-2px_rgba(16,24,40,0.03)] border border-gray-100 outline-0 sm:text-sm"
            >
              <!-- Loading Spinner -->
              <div v-if="loading" class="flex items-center justify-center py-4">
                <div class="loader"></div>
              </div>

              <!-- Notification List -->
              <ListboxOption
                as="li"
                class="flex justify-start mb-2 border-b border-gray-50"
                v-if="notifications?.length > 0"
              >
                <button
                  class="px-2 pt-3 pb-3 text-base font-semibold hover:underline"
                  @click="markAllNotification"
                >
                  Notifications
                </button>
              </ListboxOption>
              <ListboxOption
                v-for="notification in notifications"
                :key="notification?.id"
                :value="notification?.id"
                as="li"
                class="py-2 px-[13px] border-gray-50 border-b"
                @click="handleMarknotification(notification.id)"
              >
                <div class="relative mb-[6px] cursor-pointer select-none">
                  <div class="flex items-start gap-x-3">
                    <p
                      :class="!notification?.isViewed ? 'font-medium' : ''"
                      class="text-sm text-[#101828] flex-1"
                      v-if="notification?.message"
                    >
                      {{ notification?.message }}
                    </p>
                  </div>
                </div>
                <div class="flex justify-between">
                  <span class="text-[11px]">
                    {{ moment(notification?.notificationDate).fromNow() }}
                  </span>
                  <button
                    v-if="[3].includes(notification?.notificationType)"
                    class="block ml-auto text-xs font-medium max-w-max text-primary-500 hover:underline"
                    type="button"
                    @click="handleRouting(notification)"
                  >
                    See detail
                  </button>
                </div>
              </ListboxOption>

              <!-- Mark all as read option -->
              <ListboxOption
                as="li"
                class="flex justify-center"
                v-if="unreadnotifications?.length > 0"
              >
                <button
                  class="px-2 pt-3 pb-1 text-xs font-medium text-center text-primary-500 hover:underline"
                  @click="markAllNotification"
                >
                  Mark all as read
                </button>
              </ListboxOption>

              <!-- No notifications message -->
              <div
                v-if="notifications?.length === 0 && !loading"
                class="relative cursor-pointer text-center font-medium select-none py-[11px] px-[13px] text-sm text-[#667085]"
              >
                No new notification
              </div>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, provide } from "vue";
import {
  marknotification,
  markallnotification,
  getnotifications,
} from "~/services/notificationservice";
import { useAuthStore } from "~/stores/auth"; // Assuming you have this
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import moment from "moment";

// State and refs
const authStore = useAuthStore();
const notifications = inject("notifications");
const getNotifications = inject("getNotifications");
const loading = ref(false); // State to handle loading indicator

// Computed count of unread notifications
const unreadnotifications = computed(() => {
  return notifications.value?.filter((n) => !n.isViewed).length || 0;
});

// Selected options from listbox
const selectedOption = ref([]);

// Handle marking a notification as viewed
function handleMarknotification(notificationId) {
  const notification = notifications.value.find((n) => n.id === notificationId);
  if (notification) {
    notification.isViewed = true;
  }
  marknotification({
    userId: authStore.userId,
    businessId: authStore.businessId,
    id: notificationId,
  }).then((res) => {
    if (res.status === 200) {
      getNotifications();
    }
  });
}

// Mark all notifications as viewed and refresh
function markAllNotification() {
  markallnotification({
    userId: authStore.userId,
    businessId: authStore.businessId,
  }).then((res) => {
    if (res.status === 200) {
      getNotifications();
    }
  });
}

function handleRouting(val) {
  switch (val.notificationType) {
    case 3:
      navigateTo(`/procurement/my-orders?notify=true&orderId=${val.refId}`);
      break;

    default:
      break;
  }
}
</script>

<style scoped>
/* Loader styles */
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
