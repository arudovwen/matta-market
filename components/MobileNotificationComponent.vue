<template>
  <div class="fixed z-[999] w-screen h-screen bg-white flex flex-col py-2">
    <!-- Notification List -->
    <div
      class="flex items-center justify-between px-3 mb-2 border-b border-gray-100"
     
    >
      <button
        class="pt-3 pb-3 text-base font-semibold hover:underline"
        @click="markAllNotification"
      >
        Notifications
      </button>

      <button type="button" class="text-xs" @click="notificationOpen = false">Close</button>
    </div>
    <!-- No notifications message -->
    <div
      v-if="notifications?.length === 0 && !loading"
      class="relative cursor-pointer text-center font-medium select-none py-[11px] px-[13px] text-sm text-[#667085] mt-10"
    >
      No new notification
    </div>
    <div class="p-3">
      <ul
        class="grid flex-1 py-2 overflow-auto text-sm bg-white gap-y-3 outline-0 sm:text-sm"
      >
        <!-- Loading Spinner -->
        <div v-if="loading" class="flex items-center justify-center py-4">
          <div class="loader"></div>
        </div>

        <li
          v-for="notification in notifications"
          :key="notification?.id"
          :value="notification?.id"
          as="li"
          class="py-2 px-[13px] border border-gray-100 rounded-lg"
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
          <div class="flex justify-between mt-2">
            <span class="text-[11px]">
              {{ moment(notification?.notificationDate).fromNow() }}
            </span>
            <button
              v-if="[3, 4, 5, 6, 7, 8, 9, 10].includes(notification?.notificationType)"
              class="block ml-auto text-xs font-medium max-w-max text-primary-500 hover:underline"
              type="button"
              @click="handleNotifyRouting(notification)"
            >
              See detail
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <!-- Mark all as read option -->
      <div class="flex justify-center" v-if="unreadnotifications?.length > 0">
        <button
          class="px-2 pt-3 pb-1 text-xs font-medium text-center text-primary-500 hover:underline"
          @click="markAllNotification"
        >
          Mark all as read
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  marknotification,
  markallnotification,
} from "~/services/notificationservice";
import { useAuthStore } from "~/stores/auth"; // Assuming you have this

import moment from "moment";

// State and refs
const authStore = useAuthStore();
const notificationOpen = inject("notificationOpen");
const notifications = inject("notifications");
const getNotifications = inject("getNotifications");
const loading = ref(false); // State to handle loading indicator

// Computed count of unread notifications
const unreadnotifications = computed(() => {
  return notifications.value?.filter((n) => !n.isViewed).length || 0;
});

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
