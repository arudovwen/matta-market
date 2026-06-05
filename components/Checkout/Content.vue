<template>
  <div>
    <!-- <button type="button" @click="clearcart()">clear cart</button> -->
    <div class="rounded-[10px] lg:pb-20">
      <div class="flex flex-col gap-y-8">
        <CheckoutShippingOptions
          @updateShipping="(val) => (selectedShipping = val)"
        />
        <CheckoutCost v-if="selectedShipping === 'shipping'" />
        <div v-if="cartStore?.cartTotalAmount">
          <CheckoutPayment />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { clearShipping, setdefaultaddress } from '~/services/cartservice';

const cartStore = useCartStore();
const shippingStore = useShippingStore();
const selectedShipping = inject("selectedShipping");

watch(selectedShipping, async (newVal, oldVal) => {
  if (newVal === "pickup") {
    const response = await clearShipping(cartStore?.cartId);
    if (response.status === 200) {
      await cartStore.getMyCart();
    }
  } else if (newVal === "shipping" && oldVal === "pickup") {
    if (shippingStore?.defaultAddress?.id) {
      await setdefaultaddress(shippingStore.defaultAddress.id);
    }
    await cartStore.getMyCart();
  }
});
</script>
