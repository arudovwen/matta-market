<template>
  <div
    class="bg-[#333] rounded-[10px] py-[30px] px-5 w-full lg:w-[250px] xl:w-[360px]"
  >
    <div class="font-semibold text-2xl text-white pb-6">Order Summary</div>
    <div class="flex flex-col gap-y-5">
      <div class="flex justify-between" v-for="item in cartStore?.cart">
        <div>
          <p class="font-semibold text-sm text-white mb-[2px]">
            {{ item.product }}
          </p>
          <p class="text-xs text-[#959595]">
            Qty: {{ item.quantity }} {{ item.selectedPackage }}
          </p>
        </div>
        <p class="font-medium text-sm text-white">
          {{ currencyFormat(item.packagePrice) }}
        </p>
      </div>
    </div>
    <hr class="my-[20px] border-white/10" />
    <div class="flex flex-col gap-y-3">
      <div class="flex justify-between">
        <p class="text-sm text-[#E1E1E1]">Sub-total</p>

        <p class="text-white font-medium text-sm">
          {{ currencyFormat(cartStore?.cartTotalAmount) }}
        </p>
      </div>
      <div class="flex justify-between">
        <p class="text-sm text-[#E1E1E1]">Tax (7.5%)</p>

        <p class="text-white text-sm font-medium">
          {{ currencyFormat(cartStore?.cartTotalAmount * cartStore?.tax) }}
        </p>
      </div>
      <div class="flex justify-between">
        <p class="text-sm text-[#E1E1E1]">Shipping & Handling</p>

        <p class="text-white font-medium text-sm">TBD</p>
      </div>
    </div>
    <hr class="my-[20px] border-white/10" />
    <div class="flex justify-between mb-[25px]">
      <p class="text-sm text-[#E1E1E1]">Total</p>

      <p class="text-white font-bold">
        {{
          currencyFormat(
            cartStore?.cartTotalAmount * cartStore?.tax +
              cartStore?.cartTotalAmount
          )
        }}
      </p>
    </div>
    <div class="flex flex-col gap-y-4 mt-3">
      <AppButton
        @click="handleOrderRequest()"
        text="Submit order request"
        :isLoading="loading"
        :isDisabled="!shippingStore?.defaultAddress?.id"
        btnClass="!rounded-[5px] !text-[#DBDBDB] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB] "
      />
      <NuxtLink href="/checkout">
        <AppButton
          :isDisabled="!cartStore?.cart || !cartStore?.cartTotalAmount"
          text="Proceed to Checkout"
          btnClass="bg-primary-500  w-full text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm"
        />
      </NuxtLink>
    </div>
  </div>
</template>
<script setup>
import { confirmpurchase } from "~/services/cartservice";
import { toast } from "vue3-toastify";

const shippingStore = useShippingStore();
const cartStore = useCartStore();
const loading = ref(false);

onMounted(() => {
  shippingStore.getAlladdress();
});
function handleOrderRequest() {
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
      const error = `${
        err.response.data.Message || err.response.data.message
      }, Contact us for assistance on your order`;
      toast.error(error);
      loading.value = false;
    });
}
</script>
