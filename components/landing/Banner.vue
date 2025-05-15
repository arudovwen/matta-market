<template>
  <div class="relative w-full bg-black-400">
    <div
      class="bg-cover bg-center min-h-[480px] md:min-h-[600px] transition-all duration-500 ease-in-out"
      :style="{ backgroundImage: `url('${backgroundImage}')` }"
      :class="{ loaded: isLoaded }"
    >
      <!-- Overlay -->
      <div class="absolute inset-0 bg-[rgba(0,0,0,0.72)]"></div>

      <!-- assets/images/banner.pngContent in the banner -->
      <div
        class="absolute inset-0 flex items-center justify-start text-white text-left container"
      >
        <div>
          <div class="max-w-[761px] mb-10">
            <h1
              class="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] lg:leading-[67px] font-bold mb-6"
            >
              Discover and buy chemicals and raw materials all in one place
            </h1>
            <p class="text-sm sm:text-base md:text-xl lg:text-2xl">
              Search, compare, sample, quote and purchase from reliable and
              trustworthy suppliers
            </p>
          </div>
          <form @submit.prevent="handleSearch" class="max-w-[786px]">
            <div
              class="relative flex p-1 w-full bg-white rounded-[5px] items-center mb-[6px] sm:mb-8"
            >
              <input
                required
                placeholder="Search by product name or supplier"
                class="px-4 flex-1 h-9 placeholder:text-[rgba(156, 163, 175, 1)] text-xs sm:text-sm outline-none text-[#333]"
                v-model="search"
              />
              <AppButton
                type="submit"
                text="Search"
                btnClass="!px-10 btn-primary hidden sm:flex"
              />
            </div>
            <AppButton
              type="submit"
              text="Search"
              btnClass="!px-4 !py-[10px] btn-primary sm:hidden w-full"
            />

            <div class="hidden sm:flex gap-2 items-center flex-wrap">
              <span class="whitespace-nowrap text-sm md:text-base"
                >Frequently searched:
              </span>
              <span class="flex gap-2 items-center flex-wrap">
                <NuxtLink
                  :to="`/category/market/${i.name}?search_query=${i.name}`"
                  v-for="i in frequentlySearched"
                  :key="i.name"
                >
                  <span
                    class="text-white border border-white rounded-full text-sm py-[5px] px-[10px]"
                    >{{ i.name }}</span
                  >
                </NuxtLink>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const img = useImage();
const highQualityImageUrl = img(
  "https://res.cloudinary.com/arudovwen-me/image/upload/f_webp/c_scale,h_600/xddierf8sf3w2gn1csau.jpg",
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
const lqipSource =
  "https://res.cloudinary.com/arudovwen-me/image/upload/imageedit_4_4515965894_r27igz.jpg";
const backgroundImage = ref(lqipSource);
const isLoaded = ref(false);

onMounted(() => {
  const imgLoader = new Image();
  imgLoader.onload = () => {
    backgroundImage.value = highQualityImageUrl;
    isLoaded.value = true;
  };
  imgLoader.src = highQualityImageUrl;
});

const router = useRouter();
const route = useRoute();

const search = ref("");
const frequentlySearched = [
  {
    name: "Ammonia Liquor",
  },
  {
    name: "Hydrogenated Oil",
  },
  {
    name: "Caustic Soda",
  },
];

function handleSearch() {
  if (!search) return;
  router.push(`/category/market/${search.value}?search_query=${search.value}`);
}
</script>

<style scoped>
/* Add any custom styling or adjustments here */
</style>
