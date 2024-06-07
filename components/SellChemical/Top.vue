<template>
  <div class="container pt-[64px] md:pt-[96px] pb-10 grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-0 md:gap-x-10">
    <div>
      <h1
        data-aos="fade-in"
        data-aos-once="true"
        class="text-4xl md:text-6xl md:leading-[72px] font-bold mb-6 max-w-[731px] relative"
      >
        <span class="relative z-[2]">The Customers You Are Looking For Are on the Matta Platform</span>
        <span  class="z-[1] absolute top-[50px] right-0 bg-contain bg-no-repeat rounded-r-lg bg-[url('/images/underline.png')] block w-[334px] h-[28px]"></span>
      </h1>
      <p
        data-aos="fade-in"
        data-aos-once="true"
        class="text-base sm:text-lg md:text-xl mb-12 text-[#475467] max-w-[731px]"
      >
        Customers across Africa are trying to find your chemicals online. Help
        them find you by joining the fastest-growing marketplace for Chemicals,
        Raw materials, Ingredients, and Commodities.
      </p>

      <div
        data-aos="fade-in"
        data-aos-once="true"
        class="flex gap-x-4 mb-[64px] max-w-[731px]"
      >
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
    </div>
    <div
      class="bg-cover bg-no-repeat rounded-r-lg bg-[url('/images/looking.png')] rounded-lg overflow-hidden h-[200px] md:h-auto"
    ></div>
  </div>
  <ModalCenter>
    <template #default>
     <div class="w-[90vw] h-[80vh] bg-white">
      <iframe
        src="https://res.cloudinary.com/arudovwen-me/video/upload/v1717768112/Matta_Demo_-_Buy_Chemicals_1_kfbwwf.mp4"
        width="1400"
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
// const words = ref(["Chemicals", "Raw Materials", "Commodities", "Ingredients"]);
// function toggleWords() {
//   const first = words.value.shift();
//   words.value = words.value.concat(first);
// }
// onMounted(() => {
//   setInterval(() => {
//     toggleWords();
//   }, 5000);
// });
</script>
<style scoped>
.top_image {
  background-image: url("/top.png");
  background-size: cover;
  background-repeat: repeat;
}
</style>
