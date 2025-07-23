<template>
  <div
    class="grid grid-cols-1 gap-12 p-6 bg-white rounded-xl lg:p-8"
    v-if="product"
  >
    <div class="bg-[#F1F3F5] flex h-[200px] lg:h-[350px] rounded-xl z-10">
      <div class="relative z-10 flex-1 overflow-hidden rounded-lg">
        <div class="h-full w-full bg-[#F1F3F5]">
          <carousel
            ref="myslide"
            :breakpoints="breakpoints"
            class="h-full"
            v-if="product.gallery && product.gallery.length"
          >
            <slide v-for="item in product.gallery" :key="item" class="">
               <img
                :src="item"
                class="h-[350px] w-full object-cover bg-white"
                alt="alt"
              />
            </slide>
          </carousel>
        </div>
        <div
          class="bg-gray-200 animate-pulse h-full w-full rounded-[20px] z-[-1] absolute top-0"
        ></div>
      </div>
      <div
        class="flex flex-col justify-between md:w-[70px] p-2 md:p-4 text-center items-center"
      >
        <div
          class="flex flex-col items-center text-xs text-center gap-y-2 md:text-sm"
        >
          <p v-if="count">{{ count }}</p>
          <div
            class="h-[25px] md:h-[50px] border w-[1px] border-[#DDDDDD] bg-[#DDDDDD]"
          ></div>
          <p v-if="maxcount">{{ maxcount }}</p>
        </div>
        <div>
          <span class="grid gap-y-5">
            <div
              @click="prev"
              class="w-8 h-8 text-sm sm:text-base bg-[#E7EBEE] rounded-full flex items-center justify-center cursor-pointer"
            >
              <i class="uil uil-arrow-left"></i>
            </div>
            <div
              @click="next"
              class="w-8 h-8 text-sm sm:text-base bg-[#E7EBEE] rounded-full flex items-center justify-center cursor-pointer"
            >
              <i class="uil uil-arrow-right"></i>
            </div>
          </span>
        </div>
      </div>
    </div>

    <!-- <div class="border border-[#E7EBEE] rounded-xl p-6 grid grid-cols-2 gap-2">
      <span class="text-sm txt-matta-black"
        ><i class="uil uil-globe"></i> This product ships to 150 countries</span
      >
      <span class="text-sm txt-matta-black"
        ><i class="uil uil-award"></i> Most popular Producer (TOp-8)</span
      >
      <span class="text-sm txt-matta-black"
        ><i class="uil uil-box"></i> Minimum 15 kg</span
      >
      <span class="text-sm txt-matta-black"
        ><i class="uil uil-box"></i> ISO Container, Rail Tank Car, FTL, Drum,
        Pallet</span
      >
    </div> -->

    <div class="flex overflow-x-auto gap-x-4">
      <button
        @click="active = 'overview'"
        :class="
          active == 'overview'
            ? 'bg-matta-black text-white'
            : 'text-matta-black'
        "
        class="flex gap-x-2 whitespace-nowrap items-center uppercase hover:text-white hover:bg-matta-black py-4 px-3 md:py-4 md:px-6 border rounded-lg border-[#E7EBEE] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
      >
        <i class="uil uil-apps"></i>
        <span class="hidden md:inline">|</span>
        overview
      </button>
      <!-- <button
        :class="
          active == 'properties'
            ? 'bg-matta-black text-white'
            : 'text-matta-black'
        "
        @click="active = 'properties'"
        class="flex gap-x-2 whitespace-nowrap items-center uppercase text-matta-black hover:text-white hover:bg-matta-black py-2 px-3 md:py-4 md:px-6 border rounded-lg border-[#E7EBEE] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
      >
        <i class="uil uil-layer-group"></i>
        <span class="hidden md:inline">|</span>
        properties
      </button> -->
      <button
        :class="
          active == 'packages'
            ? 'bg-matta-black text-white'
            : 'text-matta-black'
        "
        @click="active = 'packages'"
        class="flex gap-x-2 whitespace-nowrap items-center uppercase text-matta-black hover:text-white hover:bg-matta-black py-4 px-2 md:py-4 md:px-6 border rounded-lg border-[#E7EBEE] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
      >
        <i class="uil uil-box"></i>
        <span class="hidden md:inline">|</span>
        packaging & availability
      </button>
      <button
        :class="
          active == 'document'
            ? 'bg-matta-black text-white'
            : 'text-matta-black'
        "
        @click="active = 'document'"
        class="flex gap-x-2 whitespace-nowrap items-center uppercase text-matta-black hover:text-white hover:bg-matta-black py-4 px-2 md:py-4 md:px-6 border rounded-lg border-[#E7EBEE] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
      >
        <i class="uil uil-file"></i>
        <span class="hidden md:inline">|</span>
        documents
      </button>
    </div>
    <div class="flex flex-col gap-y-6" v-if="active == 'overview'">
      <div>
        <p class="text-sm sm:text-base text-matta-black mb-2 md:w-[80%]">
          {{ product.description }}
        </p>
      </div>

      <div v-for="d in sideData" :key="d.id">
        <div class="flex items-start justify-between gap-4">
          <span
            class="flex-1 text-base font-medium text-matta-black sm:text-lg lg:text-2xl"
            >{{ d.title }}</span
          >
          <span
            class="text-sm text-right sm:text-base lg:text-lg"
            @click="handleIndex(d.id)"
            v-if="!openIndex.includes(d.id)"
            ><i class="uil uil-plus"></i
          ></span>
          <span
            class="text-sm text-right sm:text-base lg:text-lg"
            @click="dropIndex(d.id)"
            v-if="openIndex.includes(d.id)"
            ><i class="uil uil-minus"></i
          ></span>
        </div>

        <hr class="border-[#DDDDDD] my-4" />
        <!-- subs  -->
        <div v-if="openIndex.includes(d.id)">
          <div v-if="technical && d.id === 'tech'">
            <div
              class="grid grid-cols-1 gap-4 lg:grid-cols-3"
              v-if="technical.propertyItems && technical.propertyItems.length"
            >
              <div
                class=""
                v-for="(n, idx) in technical.propertyItems"
                :key="idx"
              >
                <h5
                  class="text-[#B6B7B9] text-[13px] mb-3 uppercase"
                  v-if="n.property"
                >
                  {{ n.property.name }}
                </h5>
                <p
                  class="mb-1 text-sm text-matta-black sm:text-base"
                  v-for="(sub, i) in n.propertyValue"
                  :key="i"
                >
                  {{ sub }}
                </p>
              </div>
            </div>
            <div v-if="technical.subSection">
              <div class="" v-for="(n, idx) in technical.subSection" :key="idx">
                <p class="mb-4">{{ n.subSectionName }}</p>
                <div class="mb-4 description" v-html="n.description"></div>
              </div>
            </div>
          </div>
          <div v-if="compliance && d.id === 'compliance'">
            <div
              class="grid grid-cols-1 gap-4 lg:grid-cols-3"
              v-if="compliance.propertyItems && compliance.propertyItems.length"
            >
              <div
                class=""
                v-for="(n, idx) in compliance.propertyItems"
                :key="idx"
              >
                <h5
                  class="text-[#B6B7B9] text-[13px] mb-3 uppercase"
                  v-if="n.property"
                >
                  {{ n.property.name }}
                </h5>
                <p
                  class="mb-1 text-sm text-matta-black sm:text-base"
                  v-for="(sub, i) in n.propertyValue"
                  :key="i"
                >
                  {{ sub }}
                </p>
              </div>
            </div>
            <div v-if="compliance.subSection">
              <div
                class=""
                v-for="(n, idx) in compliance.subSection"
                :key="idx"
              >
                <p class="mb-4">{{ n.subSectionName }}</p>
                <div class="mb-4 description" v-html="n.description"></div>
              </div>
            </div>
          </div>
          <div v-if="property && d.id === 'property'">
            <div
              class="grid grid-cols-1 gap-4 lg:grid-cols-3"
              v-if="property.propertyItems && property.propertyItems.length"
            >
              <div
                class=""
                v-for="(n, idx) in property.propertyItems"
                :key="idx"
              >
                <h5
                  class="text-[#B6B7B9] text-[13px] mb-3 uppercase"
                  v-if="n.property"
                >
                  {{ n.property.name }}
                </h5>
                <p
                  class="mb-1 text-sm text-matta-black sm:text-base"
                  v-for="(sub, i) in n.propertyValue"
                  :key="i"
                >
                  {{ sub }}
                </p>
              </div>
            </div>
            <div v-if="property.subSection">
              <div class="" v-for="(n, idx) in property.subSection" :key="idx">
                <p class="mb-4">{{ n.subSectionName }}</p>
                <div class="mb-4 description" v-html="n.description"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ProductDocument v-if="active == 'document'" />
    <ProductProperties v-if="active == 'properties'" />

    <PackageAvailability v-if="active == 'packages'" />
  </div>
</template>

<script setup>
import { ref, inject, computed } from "vue";
import ProductDocument from "./ProductDocument";
import ProductProperties from "./ProductProperties";
import PackageAvailability from "./PackageAvailability";
import { Carousel as carousel, Slide } from "vue3-carousel";
const myslide = ref(null);
const breakpoints = {
  250: {
    itemsToShow: 1,
    snapAlign: "center",
  },
};
function next() {
  myslide.value.next();
}

function prev() {
  myslide.value.prev();
}
const product = inject("product");
// const gallery = inject("gallery");

const active = ref("overview");
const sideData = [
  // {
  //   id: "applications",
  //   title: "Identification & Functionality",
  // },
  // {
  //   id: "features",
  //   title: "Features & Benefits",
  // },
  {
    id: "tech",
    title: "Technical Details & Test Data",
  },
  {
    id: "property",
    title: "Properties",
  },
  {
    id: "compliance",
    title: "Regulatory & Compliance",
  },
];
// const features = computed(() => {
//   if (!product.value || !product.value.propertyItems) return;
//   return product.value.propertyItems.propertyItems.features;
// });
const compliance = computed(() => {
  if (!product.value || !product.value.propertyItems) return;
  return product.value.propertyItems.propertyItems.compliance;
});
const property = computed(() => {
  if (!product.value || !product.value.propertyItems) return;
  return product.value.propertyItems.propertyItems.property;
});

const technical = computed(() => {
  if (!product.value || !product.value.propertyItems) return;
  return product.value.propertyItems.propertyItems.technical;
});
// const applications = computed(() => {
//   if (!product.value || !product.value.propertyItems) return;
//   return product.value.propertyItems.propertyItems.applications;
// });
const openIndex = ref(["tech", "compliance", "property"]);
const count = computed(() => {
  if (!myslide.value) return 0;
  return Number(myslide.value.data.currentSlide.value) + 1;
});
const maxcount = computed(() => {
  if (!myslide.value) return 0;
  return myslide.value.data.slidesCount;
});
function handleIndex(val) {
  openIndex.value.push(val);
}
function dropIndex(val) {
  openIndex.value = openIndex.value.filter((i) => i !== val);
}

onMounted(async () => {
  await import('vue3-carousel/dist/carousel.css');
});

</script>
<style scoped>
p {
  line-height: 1.4;
}
</style>
