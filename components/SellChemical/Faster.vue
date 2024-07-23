<template>
  <section class="bg-[#F9FAFB] pt-20 lg:pt-[96px]">
    <div class="container">
      <div  class="max-w-[768px] mb-16">
        <h2
          class="font-semibold text-xl md:text-[36px] leading-[1.2] mb-4 md:mb-8"
        >
          Sell chemicals online faster and easier with the Matta Platform.
        </h2>
        <p class="mb-8 text-base md:text-lg text-[#475467]">
          Traditional methods (relationships, trade shows, sales) fuelled your
          growth, but today's digital-first customers demand online visibility.
          Partner with Matta to unlock visibility and gain the following
          additional benefits:
        </p>
      </div>
    </div>
    <div class="container grid md:grid-cols-2">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12 max-w-[576px] pb-20 lg:pb-[180px]"
      >
        <div
          v-for="n in content"
          :key="n.title"
          class="text-center lg:text-left max-w-[272px] mx-auto lg:mx-0"
        >
          <div
            class="mx-auto lg:mx-0 h-12 text-xl w-12 mb-5 text-primary-500 rounded-full flex items-center justify-center bg-[#EFF8FF]"
          >
            <div
              class="h-10 text-xl w-10 text-primary-500 rounded-full flex items-center justify-center bg-[#D1E9FF]"
            >
              <AppIcon :icon="n.icon" />
            </div>
          </div>
          <h4 class="text-lg text-[#101828] font-semibold mb-1">
            {{ n.title }}
          </h4>
          <p class="text-sm text-[#475467]">{{ n.text }}</p>
        </div>
      </div>
      <div
        class="hidden lg:inline-block bg-contain bg-right bg-no-repeat rounded-r-lg bg-[url('/images/faster.png')]"
      ></div>
    </div>
  </section>
</template>

<script setup>
const content = [
  {
    icon: "streamline:chat-two-bubbles-oval",
    title: "Share team inboxes",
    text: "Connect with a vast network of buyers across Africa using Matta’s platform ",
  },
  {
    icon: "iconoir:flash",
    title: "Deliver instant answers",
    text: "Showcase your products through our digital storefront for maximum visibility",
  },
  {
    icon: "lets-icons:chart-pin",
    title: "Manage your team with reports",
    text: "Your one-stop shop experience from product listing to delivery",
  },
  {
    icon: "streamline:chat-bubble-oval-smiley-1",
    title: "Connect with customers",
    text: "Enjoy streamlined logistics and financing solutions tailored to your business needs",
  },
];
</script>
