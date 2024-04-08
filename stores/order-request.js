import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useOrderRequestStore = defineStore(
  "orderRequest",
  () => {
    const authStore = useAuthStore();
    const orderRequestItems = ref([]);

    const orderRequest = computed(() => orderRequestItems?.value);
    const orderRequestTotal = computed(() => orderRequestItems?.value.length);
    const orderAmountTotal = computed(() =>
      orderRequestItems.value
        .map((i) => i.quantity * i.packagePrice)
        .reduce((a, b) => a + b)
    );

    const setRequest = (data) => {
      orderRequestItems.value = data;
    };

    async function addToRequest(item) {
      if (orderRequestItems.value.some((i) => i.id === item.id)) return;
      orderRequestItems.value = [...orderRequestItems.value, item];
    }

    function removeFromRequest(id) {
      orderRequestItems.value = orderRequestItems.value.filter(
        (i) => i.id !== id
      );
    }
    function updateRequest(item) {
      const tempRequest = orderRequestItems?.value.map((dt) => {
        if (item.id === dt.id) {
          dt.quantity = item.quantity;
        }
        return dt;
      });
      setRequest(tempRequest);
    }
    function clearRequest() {
      setRequest([]);
    }

    return {
      orderRequest,
      setRequest,
      addToRequest,
      clearRequest,
      removeFromRequest,
      orderRequestTotal,
      orderRequestItems,
      updateRequest,
      orderAmountTotal
    };
  },

  {
    persist: {
      storage: persistedState.cookiesWithOptions({
        sameSite: "strict",
      }),
    },
  }
);
