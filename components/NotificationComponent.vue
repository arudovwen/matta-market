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
              class="absolute max-h-[600px] mt-[.5rem] right-0 w-[380px] z-[999] py-2 overflow-hidden rounded-lg bg-white text-sm shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),_0px_4px_6px_-2px_rgba(16,24,40,0.03)] border border-gray-100 outline-0 sm:text-sm"
            >
              <!-- Fixed Content -->
              <div class="sticky top-0 z-10 px-3 py-1 bg-white">
                <ListboxOption
                  as="li"
                  class="flex justify-start mb-2 border-b border-gray-50"
                  @click="markAllNotification"
                >
                  <button
                    class="px-1 pt-3 pb-3 text-base font-semibold hover:underline"
                  >
                    Notifications
                  </button>
                </ListboxOption>
              </div>

              <!-- Scrollable Notification List -->
              <div class="max-h-[400px] overflow-y-auto">
                <div v-if="notifications?.length > 0">
                  <ListboxOption
                    v-for="notification in notifications"
                    :key="notification?.id"
                    :value="notification?.id"
                    as="li"
                    class="py-2 px-[13px] border-gray-50 border-b"
                
                  >
                    <div     @click="handleMarknotification(notification.id)" class="relative mb-[6px] cursor-pointer select-none">
                      <div class="flex items-start gap-x-3">
                        <p
                          :class="!notification?.isViewed ? 'font-medium' : 'text-gray-500'"
                          class="text-sm text-[#101828] flex-1"
                          v-if="notification?.message"
                        >
                          {{ notification?.message }}
                        </p>
                      </div>
                    </div>
                    <div class="flex justify-between mt-2">
                      <span class="text-[11px] text-gray-500">
                        {{ moment(notification?.notificationDate).fromNow() }}
                      </span>
                      <button
                        v-if="isNotificationWithDetails(notification)"
                        class="block ml-auto text-xs max-w-max text-primary-500 hover:underline"
                        type="button"
                        @click="handleNotifyRouting(notification)"
                      >
                        See detail
                      </button>
                    </div>
                  </ListboxOption>
                </div>
              </div>
              <div v-if="notifications?.length > 1"  class="sticky bottom-0 z-10 px-3 bg-white">
                <!-- Mark all as read option -->
                <ListboxOption as="li" class="flex justify-center">
                  <button
                    class="px-2 pt-3 pb-1 text-xs font-medium text-center text-primary-500 hover:underline"
                    @click="markAllNotification"
                  >
                    Mark all as read
                  </button>
                </ListboxOption>
              </div>
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
import { ref, computed, inject } from "vue";
import {
  marknotification,
  markallnotification,
} from "~/services/notificationservice";
import { useAuthStore } from "~/stores/auth";
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

// Check if the notification has details to view
function isNotificationWithDetails(notification) {
  return [4, 5, 6, 7, 8, 9, 10].includes(notification?.notificationType);
}

// Handle routing to notification details page
function handleNotifyRouting(notification) {
  handleMarknotification(notification.id)
  switch (notification.notificationType) {
    case 3:
      navigateTo(`/procurement/my-orders?notify=true&orderId=${encodeURIComponent(notification.refId)}`);
      break;
    case 4:
      navigateTo(
        `/procurement/my-orders?notify=true&sampleId=${encodeURIComponent(notification.refId)}&tab=${encodeURIComponent('samples')}`
      );
      break;
    case 5:
      navigateTo(
        `/procurement/my-orders?notify=true&documentId=${encodeURIComponent(notification.refId)}&tab=${encodeURIComponent('documents')}`
      );
      break;
    case 6:
       navigateTo(
        `/storefront?notify=true&orderId=${encodeURIComponent(notification.refId)}&tab=${encodeURIComponent('customer requests')}`
      );
      break;
    case 7:
      navigateTo(
        `/procurement/my-orders?notify=true&productId=${encodeURIComponent(notification.refId)}&tab=${encodeURIComponent('products')}`
      );
      break;
    case 8:
      navigateTo(
        `/storefront?notify=true&orderId=${encodeURIComponent(notification.refId)}&tab=${encodeURIComponent('customer orders')}`
      );
      break;
    case 9:
      navigateTo(
        `/storefront/order/confirmation/${encodeURIComponent(notification.refId)}?orderNumber=${encodeURIComponent(notification.refId)}&tab=${encodeURIComponent('pending confirmation')}`
      );
      break;
    case 10:
      navigateTo(
        `/storefront/quote/confirmation/${encodeURIComponent(notification.refId)}?tab=${encodeURIComponent('customer requests')}`
      );
      break;

    default:
      break;
  }
}
</script>
