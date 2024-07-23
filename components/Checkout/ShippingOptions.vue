<template>
  <div class="bg-white rounded-[10px]">
    <h2 class="px-[30px] py-5 font-bold text-xl border-b border-[#f3f3f3]">
      Choose delivery option
    </h2>

    <div class="px-[30px] pt-6 pb-[30px]">
      <label
        for="shipping"
        class="flex gap-x-2 items-start"
        :class="`${active !== 'shipping' ? 'opacity-80' : ''}`"
      >
        <input
          id="shipping"
          v-model="active"
          value="shipping"
          type="radio"
          class="mt-[5px] accent-primary-500"
        />
        <div>
          <span class="block mb-6 cursor-pointer">
            <span class="block font-medium mb-1">Shipping address</span>
            <span class="block text-sm text-[#475467]"
              >Select a shipping address where your package will be delivered to
            </span>
          </span>

          <CheckoutShipping />
        </div>
      </label>
    </div>
  </div>
</template>
<script setup>
const active = ref("shipping");
</script>
