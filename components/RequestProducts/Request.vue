<template>
  <section class="py-[96px]">
    <div class="container">
      <h2 class="font-semibold text-xl md:text-[36px] leading-[1.2] mb-4">
        Why Choose Matta for Your Sourcing Needs?
      </h2>
      <p class="mb-8 text-base md:text-lg text-[#475467]">
        Simplify Your Procurement Process with Matta
      </p>
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-16 md:gap-y-0"
      >
        <div class="grid grid-cols-1 gap-y-6">
          <div
            v-for="n in content"
            :key="n.title"
            data-aos="fade-up"
            data-aos-once="true"
            class="max-w-[500px] flex gap-x-4"
          >
            <div>
              <div
                class="mx-auto lg:mx-0 h-12 text-xl w-12 mb-5 text-primary-500 rounded-full flex items-center justify-center bg-[#EFF8FF]"
              >
                <div
                  class="h-10 text-xl w-10 text-primary-500 rounded-full flex items-center justify-center bg-[#D1E9FF]"
                >
                  <img :src="n.icon" />
                </div>
              </div>
            </div>
            <div>
              <h2 class="text-[#101828] text-lg font-semibold mb-2">
                {{ n.title }}
              </h2>
              <p class="text-[#475467]">
                {{ n.text }}
              </p>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-in"
          data-aos-once="true"
          class="w-full h-[200px] lg:h-[500px] bg-cover bg-[url('/images/trailer.png')] rounded-lg"
        ></div>
      </div>
    </div>
  </section>
</template>
<script setup>
const content = [
  {
    title: "Speed and Efficiency",
    icon: "/images/flash.svg",
    text: "Stop drowning in RFQs. Submit your request and receive quotes within the same day—significantly speeding up your sourcing cycle.",
  },
  {
    title: "Cost savings",
    icon: "/images/dollar.svg",
    text: "Gain access to a competitive marketplace. Compare prices from hundreds of global suppliers and ensure you get the best deals.",
  },
  {
    title: "Global Reach",
    icon: "/images/iconglobe.svg",
    text: "Expand your options with over 1,000 chemicals available from suppliers worldwide. Whatever you need, wherever you need it, we've got you covered.",
  },
  {
    title: "Trusted Partnership",
    icon: "/images/trust.svg",
    text: "With Matta, you’re not just finding suppliers but building relationships with a trusted network committed to your business success.",
  },
];
</script>
