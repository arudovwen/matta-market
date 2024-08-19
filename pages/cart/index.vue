<template>
  <div class="container py-10 w-full">
    <div class="mb-6">
      <AppButton link="/category/market/all products" icon="ion:arrow-back-sharp" text="Back to shopping"
        btnClass="text-xs sm:text-sm !py-0 !px-0 !font-semibold" />
    </div>
    <div class="flex gap-x-5 w-full flex-col lg:flex-row gap-y-8 lg:gap-y-0">
      <div class="flex-1">
        <CartContent />
      </div>
      <div>
        <CartSide />
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "default",
});
useHead({
  title: "Cart | Matta",
  meta: [{ name: "description", content: "Cart" }],
});
import { confirmpurchase } from "~/services/cartservice";
import { toast } from "vue3-toastify";

const shippingStore = useShippingStore();
const authStore = useAuthStore();
const cartStore = useCartStore();
const loading = ref(false);
const authOpen = ref(false);
const action = ref("");

function handleProceed() {
  console.log("heyy");
  if (!authStore.isLoggedIn) {
    action.value = "order";
    authOpen.value = true;
    return;
  }

  navigateTo("/checkout");
}
function handleOrderRequest() {
  if (!authStore.isLoggedIn) {
    action.value = "call";
    authOpen.value = true;
    return;
  }
  loading.value = true;
  confirmpurchase({ shippingAddressId: shippingStore?.defaultAddress?.id })
    .then((res) => {
      if (res.status === 200) {
        loading.value = false;
        cartStore?.clearCart();
        window.location.href = `/order-success?orderId=${res.data.data}&order_type=requests`;
      }
    })
    .catch((err) => {
      const error = `${err?.response?.data?.Message || err?.response?.data?.message
        }, Contact us for assistance on your order`;
      toast.error(error);
      loading.value = false;
    });
}

onMounted(() => {
  cartStore.getMyCart();
});

provide("action", action);
provide("authOpen", authOpen);
provide("handleOrderRequest", handleOrderRequest);
provide("handleProceed", handleProceed);
</script>
