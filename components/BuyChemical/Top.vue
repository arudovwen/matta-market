<template>
  <div class="container pt-[64px] md:pt-[96px] pb-6">
    <h1
      data-aos="fade-in"
      data-aos-once="true"
      class="text-4xl md:text-6xl md:leading-[72px] font-bold mb-6 relative max-w-[731px]"
    >
      <span class="relative z-[2]">
        Source your <span class="text-primary-500"> {{ `${words[0]}` }}</span>
        <br class="md:hidden" />
        all in one place</span
      >
      <span
        class="z-[1] absolute top-[50px] right-0 bg-contain bg-no-repeat rounded-r-lg bg-[url('/images/underline.png')] block w-[334px] h-[28px]"
      ></span>
    </h1>
    <p
      data-aos="fade-in"
      data-aos-once="true"
      class="text-base sm:text-lg md:text-xl mb-12 max-w-[640px] text-[#475467]"
    >
      Search products. Request samples. Request quotes. Explore flexible payment
      options. Enjoy fast delivery.
    </p>

    <div data-aos="fade-in" data-aos-once="true" class="flex gap-x-4 mb-[64px]">
      <AppButton
        @click="navigateTo('/auth/register')"
        text="Sign up for free"
        btnClass="bg-transparent border-[#D0D5DD] border !px-[18px] !py-3 text-[#344054]"
      />
      <AppButton
        @click="isOpen = true"
        text="Watch demo video"
        btnClass="bg-primary-500 text-white  border-primary-500  border !px-[18px] !py-3"
      />
    </div>

    <div
      data-aos="fade-up"
      data-aos-once="true"
      class="top_image h-[200px] xl:h-[516px] w-full"
    ></div>
  </div>

  <ModalCenter>
    <template #default>
     <div class="w-[800px] h-[80vh] bg-white">
      <iframe
        src="https://drive.google.com/file/d/1Wan3WL-dqyjlhvmf6i-xQNNiWS-nj1On/preview"
        width="800"
        height="800"
        allow="autoplay"
        class="h-full w-full"
      ></iframe>
     </div>
    </template>
  </ModalCenter>
</template>
<script setup>
const isOpen = ref(false);
const words = ref(["Chemicals", "Raw Materials", "Commodities", "Ingredients"]);
function toggleWords() {
  const first = words.value.shift();
  words.value = words.value.concat(first);
}
onMounted(() => {
  setInterval(() => {
    toggleWords();
  }, 5000);
});
provide("isOpen", isOpen);
</script>
<style scoped>
.top_image {
  background-image: url("/top.png");
  background-size: cover;
  background-repeat: repeat;
}
</style>
