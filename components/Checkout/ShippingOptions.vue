<template>
  <div class="">
    <h2 class=" py-5 font-bold text-xl border-b border-[#f3f3f3]">
      Choose delivery option
    </h2>

    <div class="px-[30px] pt-6 pb-[30px] bg-white rounded-[10px]">
      <label
        for="shipping"
        class="flex items-start gap-x-2"
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
            <span class="block mb-1 font-medium">Shipping address</span>
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
