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
          :class="`${n.key === 'card' ? '' : 'opacity-50'}`"
        >
          <input
            type="radio"
            v-model="active"
            :value="n.key"
            class="mt-[5px] accent-primary-500"
            :disabled="n.key === 'matta'"
          />
          <div>
            <span class="block cursor-pointer">
              <span class="block font-medium mb-1">{{ n.title }}</span>
              <span class="block text-sm text-[#475467]">{{n.text}} </span>
            </span>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
<script setup>
const active = ref("card");
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
    key: "matta",
    text: "Make payment with funds from your Matta wallet",
  },
  // {
  //   title: "Pay with Trade Finance",
  //   icon: "teenyicons:credit-card-outline",
  //   url: "",
  //   key: "finance",
  // },
];
</script>
