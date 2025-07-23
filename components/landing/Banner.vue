<template>
  <div class="relative w-full bg-black-400 min-h-[480px] ">
    <!-- LQIP blurred layer -->
    <div
      class="absolute inset-0 transition-opacity duration-500 bg-center bg-cover"
      :style="{ backgroundImage: `url('${lqipSource}')` }"
    ></div>

    <!-- HQ image layer -->
    <div
      class="absolute inset-0 transition-opacity duration-700 bg-center bg-cover"
      :style="{ backgroundImage: `url('${highQualityImageUrl}')` }"
      :class="{ 'opacity-100': isLoaded, 'opacity-0': !isLoaded }"
    ></div>

    <!-- Overlay -->
    <div class="absolute inset-0 bg-[rgba(0,0,0,0.72)]"></div>

    <!-- Content -->
    <div
      class="container relative z-10 flex items-center justify-start h-full py-24 text-left text-white"
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

          <div class="flex-wrap items-center hidden gap-2 sm:flex">
            <span class="text-sm whitespace-nowrap md:text-base"
              >Frequently searched:
            </span>
            <span class="flex flex-wrap items-center gap-2">
              <NuxtLink
                v-for="i in frequentlySearched"
                :key="i.name"
                :to="`/category/market/${i.name}?search_query=${i.name}`"
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useHead, useRouter } from '#imports'

const router = useRouter()

// Optimized Cloudinary URL
const highQualityImageUrl =
  'https://res.cloudinary.com/arudovwen-me/image/upload/f_auto,q_auto,dpr_auto,c_scale,w_1920,h_600/xddierf8sf3w2gn1csau.jpg'

// Low quality placeholder (small, heavily compressed)
const lqipSource =
  'https://res.cloudinary.com/arudovwen-me/image/upload/f_auto,q_10,w_20/xddierf8sf3w2gn1csau.jpg'

const isLoaded = ref(false)

useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: highQualityImageUrl
    }
  ]
})

onMounted(() => {
  const img = new Image()
  img.onload = () => {
    isLoaded.value = true
  }
  img.src = highQualityImageUrl
})

const search = ref('')
const frequentlySearched = [
  { name: 'Ammonia Liquor' },
  { name: 'Hydrogenated Oil' },
  { name: 'Caustic Soda' }
]

function handleSearch() {
  if (!search.value) return
  router.push(`/category/market/${search.value}?search_query=${search.value}`)
}
</script>

<style scoped>
/* Slight blur on LQIP */
.blur {
  filter: blur(20px);
}
.scale-110 {
  transform: scale(1.1);
}
</style>
