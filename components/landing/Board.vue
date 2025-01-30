<template>
  <div class="">
    <div
      
      class="rounded-[10px]"
    >
      <NuxtLink :to="link" class="h-full block"> 
        <img crossorigin :src="url" alt="board" class="w-full  min-h-[100px] max-h-[211px]  h-full md:object-cover  rounded-[10px] bg-gray-300" />
      </NuxtLink>
    </div>
  </div>
</template>
<script setup>
defineProps({
  url:{
    default:"https://res.cloudinary.com/arudovwen-me/image/upload/f_auto,q_auto/v0q5ahswrqzvtqrfkp9g"
  },
  link:{
    default: 'https://matta.trade/product/ASPARTAME/3009649000015519001?categoryId='
  }
})
const imageSrc = "";
</script>
