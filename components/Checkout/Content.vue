<template>
  <div>
    <!-- <button type="button" @click="clearcart()">clear cart</button> -->
    <div class="rounded-[10px] lg:pb-20">
      <div class="flex flex-col gap-y-8">
        <CheckoutShippingOptions />
        <CheckoutCost />
        <div v-if="cartStore?.cartTotalAmount < minCartAmount">
          <CheckoutPayment />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { clearcart } from '~/services/cartservice';

const cartStore = useCartStore();
</script>
