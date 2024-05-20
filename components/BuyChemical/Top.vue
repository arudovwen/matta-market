<template>
  <div class="container pt-[96px] pb-6">
    <h1
      data-aos="fade-in"
      data-aos-once="true"
      class="text-4xl md:text-6xl font-semibold mb-6"
    >
      Source your <span class="text-primary-500"> {{ `${words[0]}` }}</span> <br />
      all in one place
    </h1>
    <p
      data-aos="fade-in"
      data-aos-once="true"
      class="text-lg md:text-xl mb-12 max-w-[640px] text-[#475467]"
    >
      Search products. Request samples. Request quotes. Explore flexible payment
      options. Enjoy fast delivery.
    </p>

    <div data-aos="fade-in" data-aos-once="true" class="flex gap-x-4 mb-[64px]">
      <AppButton
        @click="navigateTo('/auth/register')"
        text="Free sign up"
        btnClass="bg-transparent border-[#D0D5DD] border !px-[18px] !py-3 text-[#344054]"
      />
      <AppButton
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
</template>
<script setup>
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
</script>
<style scoped>
.top_image {
  background-image: url("/top.png");
  background-size: cover;
  background-repeat: repeat;
}
</style>
