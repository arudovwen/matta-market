<template>
  <div class="bg-white rounded-b-[10px] border-t border-[#f3f3f3]">
    <form
      @submit.prevent="handleSubmit"
      class="px-[30px] pt-6 pb-[30px] flex items-center gap-x-3"
    >
      <div class="flex-1 max-w-[313px]">
        <Textinput
          placeholder="Enter a discount code here if you have one"
          required
          v-model="code"
          name="code"
        />
      </div>
      <AppButton
        :isLoading="loading"
        :isDisabled="!cartStore.cartId || !code"
        type="submit"
        text="Apply voucher"
        btnClass="!px-[14px] !py-[10px] h-11 bg-primary-500 text-sm text-white leading-normal disabled:!opacity-90"
      />
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { toast } from "vue3-toastify";
import { applyDiscount, getDiscountByCode } from "~/services/cartservice";

const code = ref(null);
const loading = ref(false);
const cartStore = useCartStore();
const isApplied = ref(false);
const firstTimeCode = "1ST50KOFF";

function handleSubmit() {
  loading.value = true;
  applyDiscount({
    discountCode: code.value,
    orderId: cartStore.cartId,
  })
    .then((res) => {
      if (res.status === 200) {
        isApplied.value = true;
        toast.success("Discount applied");
        cartStore.getMyCart();
      }
    })
    .catch((err) => {
      const errorMsg =
        err?.response?.data?.message ||
        err?.response?.data?.Message ||
        "Invalid code";
      toast.error(errorMsg);
    })
    .finally(() => {
      loading.value = false;
    });
}

function handleFirst() {
  if (cartStore?.cartData?.firstOrder && cartStore.cartId && !isApplied.value) {
    getDiscountByCode(firstTimeCode)
      .then((res) => {
        if (
          res.status === 200 &&
          cartStore?.cartTotalAmount > res.data.minimumOrderValue
        ) {
          code.value = firstTimeCode;
          handleSubmit();
        }
      })
      .catch(() => {
        toast.error("Error applying first-time discount");
      });
  }
}

watch(
  () => cartStore?.cartData,
  () => {
    if (!isApplied.value) handleFirst();
  }
);
</script>
