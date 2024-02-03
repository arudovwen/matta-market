<template>
  <div
    class="h-screen w-screen grid grid-cols-1 lg:grid-cols-12 bg-cover bg-center relative"
    :style="backgroundStyles"
  >
    <div
      class="bg-[rgba(3,14,46,0.85)] h-full hidden lg:flex flex-col px-10 py-8 gap-y-8 lg:col-span-7"
    >
      <div class="flex justify-between">
        <NuxtLink to="/">
          <img
            src="/images/logo-white.png"
            width="100"
            height="26"
            alt="Matta"
            class="w-[100px] h-auto"
        /></NuxtLink>
      </div>

      <div class="relative flex-1 flex flex-col justify-center">
        <div class="max-w-[700px] w-full">
          <h1
            class="text-4xl leading-10 xl:text-5xl 2xl:text-[50px] text-white font-bold mb-8 xl:leading-[1.2]"
          >
            Sell your chemicals, raw materials and finished goods easily on
            Matta
          </h1>
          <div class="grid gap-y-7">
            <div
              v-for="n in content"
              :key="n.title"
              class="flex items-start gap-x-5"
            >
              <div class="w-20 mt-1">
                <img :src="n.icon" :alt="n.title" class="w-10" />
              </div>
              <div>
                <p class="text-xl font-bold text-white mb-1">
                  {{ n.title }}
                </p>
                <p class="text-base text-white">
                  {{ n.text }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex items-center justify-center py-8 px-10 bg-white lg:col-span-5 h-full overflow-y-auto"
    >
      <div class="w-full h-full bg-white flex flex-col">
        <div class="z-10 lg:hidden mb-14 max-h-max">
          <NuxtLink to="/">
            <img
              src="/images/logo.png"
              width="100"

              height="26"
              alt="Matta"
              class="w-[100px] h-auto"
          /></NuxtLink>
        </div>
        <div class="flex-1 flex flex-col justify-center">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const Earth = "/images/earth-africa.svg";
const Code = "/images/code.svg";
const Group = "/images/users.svg";
const img = useImage();
const backgroundStyles = computed(() => {
  const imgUrl = img(
    `https://res.cloudinary.com/arudovwen-me/image/upload/c_scale,w_1280/f_webp/yqbey9rcgfvo4gj2lgpz.jpg`,
    {
      sizes: {
        xl: "100vw",
        lg: "100vw",
        md: "100vw",
        sm: "100vw",
        xs: "100vw",
      },
    }
  );
  return { backgroundImage: `url('${imgUrl}')` };
});
const content = [
  {
    title: "Strong coverage across Africa",
    text: "With our extensive network, gain unparalleled access to buyers and manufacturers across the diverse markets of Africa. We ensure your products reach every corner, maximizing your potential for growth and success.",
    icon: Earth,
  },
  {
    title: "Keep track of your customers",
    text: "Never lose sight of your customers again. Our intuitive platform simplifies customer interaction, helping you manage relationships seamlessly. From order history to personalized communication, stay informed and build lasting partnerships that drive business forward.",
    icon: Group,
  },
  {
    title: "Grow Your Business with Our Technology",
    text: "Experience a new era of business operations through our platform. Connect your systems effortlessly, ensuring a smooth and efficient flow of information. From order processing to inventory management, our integrated solutions simplify your workflow, allowing you to focus on what matters most—growing your business.",
    icon: Code,
  },
];
</script>
