<template>
  <div class="bg-white rounded-[10px]">
    <h2 class="px-[30px] py-5 font-bold text-2xl border-b border-[#f3f3f3]">
      Payment Method
    </h2>
    <div class="p-[30px]">
      <div class="grid gap-y-5">
        <label
          v-for="n in data"
          :key="n.title"
          class="flex gap-x-2 items-start"
        >
          <input
            type="radio"
            v-model="activeMethod"
            :value="n.key"
            class="mt-[5px] accent-primary-500"
            :disabled="n.key === 'trade' && n.key === 'wallet'"
          />
          <div>
            <span class="block cursor-pointer">
              <span class="block font-medium mb-1">{{ n.title }}</span>
              <span class="block text-sm text-[#475467]">{{ n.text }} </span>
            </span>
          </div>
        </label>
      </div>
    </div>
  </div>
  <CheckoutCreditPopup
    @close="isPopOpen = false"
    :open="isPopOpen"
    :available="false"
    :insufficient="false"
  />
</template>
<script setup>
const activeMethod = inject("activeMethod");
const isPopOpen = inject("isPopOpen");
const data = [
  {
    title: "Pay Online",
    icon: "uil:credit-card",
    key: "card",
    url: "",
    text: "Pay instantly and securely with your credit/debit card",
  },
  {
    title: "Matta Wallet",
    icon: "ion:wallet-outline",
    url: "",
    key: "wallet",
    text: "Make payment with funds from your Matta wallet",
  },
  {
    title: "Pay with Trade Finance",
    icon: "teenyicons:credit-card-outline",
    url: "",
    key: "trade",
    text: "Make payment with trade finance",
  },
  {
    title: "Credit Available",
    icon: "teenyicons:credit-card-outline",
    text: "Pay with your available credit",
    key: "credit",
  },
];
watch(activeMethod, () => {
  activeMethod.value === "credit"
    ? (isPopOpen.value = true)
    : (isPopOpen.value = false);
});
</script>
