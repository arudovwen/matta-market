<template>
  <div class="bg-[#222] py-20">
    <div class="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <div
        class="p-[30px] rounded-[16px] bg-[rgba(255,255,255,0.03)]"
        v-for="n in content"
        :key="n.title"
       
      >
        <div>
          <span
            class="bg-[rgba(255,255,255,0.08)] h-[60px] w-[60px] rounded-full flex items0center justify-center mb-[30px]"
          >
             <img :src="n.img" :alt="n.title" width="40" height="40" />
          </span>
          <p class="mb-3 text-white text-lg md:text-xl max-w-[200px] leading-normal">{{ n.title }}</p>
          <p class="mb-2 text-white text-sm">{{ n.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const GridImg = "/images/grid.svg";
const CheckImg = "/images/check.svg";
const FolderImg = "/images/folder.svg";
const LayerImg = "/images/layer.svg";
const content = [
  {
    title: "Streamlined Sourcing Made Easy",
    text: "Effortlessly connect with trusted suppliers for your chemical and raw material needs. Matta makes finding the right products simple and efficient",
    img: GridImg,
  },
  {
    title: "Discover Diverse, Quality Selection",
    text: "Access a wide array of top-quality chemicals and materials. Matta’s extensive product range meets diverse industrial demands with ease.",
    img: CheckImg,
  },
  {
    title: "Quality Meets Competitive Pricing",
    text: "Experience superior quality at Matta's competitive prices. Our tailored approach ensures you get products of the highest quality at the best market rates.",
    img: FolderImg,
  },
  {
    title: "Reliable Delivery, On Time Every Time",
    text: "Count on Matta for prompt deliveries. We ensure your production process remains uninterrupted with our fast and consistent supply chain.",
    img: LayerImg,
  },
];
</script>
