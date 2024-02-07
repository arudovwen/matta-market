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
    <NuxtLink href="/checkout">
      <AppButton
        icon="bytesize:cart"
        :isDisabled="!cartStore?.cart || !cartStore?.cartTotalAmount"
        text="Checkout"
        btnClass="bg-primary-500  w-full text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm"
      />
    </NuxtLink>
  </div>
</template>
<script setup>
const cartStore = useCartStore();
</script>
