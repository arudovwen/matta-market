<template>
  <div class="">
    <div
      data-aos="fade-up"
      data-aos-once="true"
      class="rounded-[10px]"
    >
      <!-- <NuxtLink to="/market/products" class="h-full block"> -->
        <img crossorigin :src="url" alt="image" class="w-full  min-h-[100px] max-h-[211px]  h-full md:object-cover  rounded-[10px] bg-gray-300" />
      <!-- </NuxtLink> -->
    </div>
  </div>
</template>
<script setup>
defineProps({
  url:{
    default:"https://res.cloudinary.com/arudovwen-me/image/upload/f_auto,q_auto/nhgtgwivu3kvuaheufnd"
  }
})
const imageSrc = "";
</script>
