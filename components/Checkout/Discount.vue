<template>
  <div class="bg-white rounded-[10px]">
    <h2 class="px-[30px] py-5 font-bold text-xl border-b border-[#f3f3f3]">
      Discount voucher
    </h2>

    <form
      @submit.prevent="handleSubmit"
      class="px-[30px] pt-6 pb-[30px] flex items-center gap-x-3"
    >
      <div class="flex-1 max-w-[313px]">
        <Textinput placeholder="Discount code" required v-model="code" />
      </div>
      <AppButton
        :isLoading="loading"
        :isDisabled="(!cartStore.cartId && authStore.isLoggedIn) || !code"
        type="submit"
        text="Apply Voucher"
        btnClass="!px-[14px] !py-[10px] h-11 bg-primary-500 text-sm text-white leading-normal"
      />
    </form>
  </div>
</template>
<script setup>
import { toast } from "vue3-toastify";
import { applyDiscount } from "@/services/cartservice";
const code = ref(null);
const loading = ref(false);
const cartStore = useCartStore();
const authStore = useAuthStore();
const isOpen = inject("isOpen");

function handleSubmit() {
  if (!authStore.isLoggedIn) {
    isOpen.value = true;
    return;
  }

  loading.value = true;
  applyDiscount({
    discountCode: code.value,
    orderId: cartStore.cartId,
  })
    .then((res) => {
      if (res.status === 200) {
        cartStore.getMyCart();
        loading.value = false;
        toast.success("Discount applied");
      }
    })
    .catch((err) => {
      toast.error(
        err?.response?.data?.message || err.response.data.Message || "Invalid code"
      );
      loading.value = false;
    });
}
</script>
