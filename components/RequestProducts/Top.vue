<template>
  <div class="container pt-[64px] md:pt-[96px] pb-6">
    <h1
  
      class="text-4xl md:text-6xl md:leading-[72px] font-bold mb-6 relative max-w-[820px]"
    >
      <span class="relative z-[2]">
        Procurement Made Easy: Get Competitive Quotes Fast!</span
      >
      <span
        class="z-[1] absolute top-[50px] right-0 bg-contain bg-no-repeat rounded-r-lg bg-[url('/images/underline.png')] block w-[334px] h-[28px]"
      ></span>
    </h1>
    <p

      class="text-base sm:text-lg md:text-xl mb-12 max-w-[640px] text-[#475467]"
    >
      Join Matta’s all-in-one sourcing platform and streamline your chemical
      procurement process with same-day RFQ responses
    </p>

    <div  class="flex gap-x-4 mb-[64px]">
      <AppButton
      @click="navigateTo('/submit-request')"
        type="button"
        text="Submit a request"
        btnClass="bg-primary-500 text-white  border-primary-500  border !px-[18px] !py-3 min-w-[230px]"
      />
    </div>

    <div
      
      class="top_image h-[200px] md:h-[516px] w-full"
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
					 title="buy chemicals"
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
  background-image: url("/images/three.png");
  background-size: cover;
  background-repeat: repeat;
  border-radius:10px;
}
</style>
