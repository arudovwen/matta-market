<template>
  <div
    class="grid grid-cols-1 gap-12 bg-white rounded-xl p-6 lg:p-8"
    v-if="product"
  >
    <div class="bg-[#F1F3F5] flex h-[350px] rounded-xl">
      <div
        class="flex-1 rounded-lg overflow-hidden relative"
        v-if="product.gallery && product.gallery.length"
      >
        <carousel
          ref="myslide"
          :breakpoints="breakpoints"
          class="h-full"
          v-if="product.gallery"
        >
          <slide v-for="item in product.gallery" :key="item" class="">
             <img :src="item" class="h-[350px] w-full object-cover" alt="alt" />
          </slide>
        </carousel>
      </div>
      <div
        v-if="product.gallery && product.gallery.length"
        class="flex flex-col justify-between w-[70px] p-4 text-center items-center"
      >
        <div class="flex flex-col gap-y-2 items-center text-center">
          <p v-if="count">{{ count }}</p>
          <div
            class="h-[50px] border w-[1px] border-[#DDDDDD] bg-[#DDDDDD]"
          ></div>
          <p v-if="maxcount">{{ maxcount }}</p>
        </div>
        <div>
          <span class="grid gap-y-5">
            <div
              @click="prev"
              class="w-8 h-8 text-base bg-[#E7EBEE] rounded-full flex items-center justify-center cursor-pointer"
            >
              <i class="uil uil-arrow-left"></i>
            </div>
            <div
              @click="next"
              class="w-8 h-8 text-base bg-[#E7EBEE] rounded-full flex items-center justify-center cursor-pointer"
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

    <div class="flex gap-x-4">
      <button
        @click="active = 'overview'"
        :class="
          active == 'overview'
            ? 'bg-matta-black text-white'
            : 'text-matta-black'
        "
        class="flex gap-x-2 items-center uppercase hover:text-white hover:bg-matta-black py-2 px-3 md:py-4 md:px-6 border rounded-lg border-[#E7EBEE] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
      >
        <i class="uil uil-apps"></i>
        <span class="hidden md:inline">|</span>
        overview
      </button>
      <button
        :class="
          active == 'properties'
            ? 'bg-matta-black text-white'
            : 'text-matta-black'
        "
        @click="active = 'properties'"
        class="flex gap-x-2 items-center uppercase text-matta-black hover:text-white hover:bg-matta-black py-2 px-3 md:py-4 md:px-6 border rounded-lg border-[#E7EBEE] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
      >
        <i class="uil uil-layer-group"></i>
        <span class="hidden md:inline">|</span>
        properties
      </button>
      <button
        :class="
          active == 'packages'
            ? 'bg-matta-black text-white'
            : 'text-matta-black'
        "
        @click="active = 'packages'"
        class="flex gap-x-2 items-center uppercase text-matta-black hover:text-white hover:bg-matta-black py-2 px-2 md:py-4 md:px-6 border rounded-lg border-[#E7EBEE] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
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
        class="flex gap-x-2 items-center uppercase text-matta-black hover:text-white hover:bg-matta-black py-2 px-2 md:py-4 md:px-6 border rounded-lg border-[#E7EBEE] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
      >
        <i class="uil uil-file"></i>
        <span class="hidden md:inline">|</span>
        documents
      </button>
    </div>
    <div class="flex flex-col gap-y-6" v-if="active == 'overview'">
      <div>
        <p class="text-base text-matta-black mb-2">
          {{ product.description }}
        </p>
      </div>

      <div v-for="d in sideData" :key="d.id">
        <div class="grid grid-cols-3 justify-between items-start">
          <span class="col-span-2 text-matta-black font-medium text-2xl">{{
            d.title
          }}</span>
          <span
            class="text-right text-lg"
            @click="handleIndex(d.id)"
            v-if="!openIndex.includes(d.id)"
            ><i class="uil uil-plus"></i
          ></span>
          <span
            class="text-right text-lg"
            @click="dropIndex(d.id)"
            v-if="openIndex.includes(d.id)"
            ><i class="uil uil-minus"></i
          ></span>
        </div>
        <hr class="border-[#DDDDDD] my-4" />

        <!-- subs  -->
        <div v-if="openIndex.includes(d.id)">
          <!-- <div v-if="applications && d.id === 'applications'" class="">
            <div
              class="grid grid-cols-3 gap-4"
              v-if="
                applications.propertyItems && applications.propertyItems.length
              "
            >
              <div
                class=""
                v-for="(n, idx) in applications.propertyItems"
                :key="idx"
              >
                <h5
                  class="text-[#B6B7B9] text-[13px] mb-3 uppercase"
                  v-if="n.property"
                >
                  {{ n.property.name }}
                </h5>
                <p
                  class="text-matta-black text-base mb-1"
                  v-for="(sub, i) in n.propertyValue"
                  :key="i"
                >
                  {{ sub }}
                </p>
              </div>
            </div>
            <div v-if="applications.subSection">
              <div
                class=""
                v-for="(n, idx) in applications.subSection"
                :key="idx"
              >
                <p class="mb-4">{{ n.subSectionName }}</p>
                <div class="mb-4 description" v-html="n.description"></div>
              </div>
            </div>
          </div>
          <div v-if="features && d.id === 'features'">
            <div
              class="grid grid-cols-3 gap-4"
              v-if="features.propertyItems && features.propertyItems.length"
            >
              <div
                class=""
                v-for="(n, idx) in features.propertyItems"
                :key="idx"
              >
                <h5
                  class="text-[#B6B7B9] text-[13px] mb-3 uppercase"
                  v-if="n.property"
                >
                  {{ n.property.name }}
                </h5>
                <p
                  class="text-matta-black text-base mb-1"
                  v-for="(sub, i) in n.propertyValue"
                  :key="i"
                >
                  {{ sub }}
                </p>
              </div>
            </div>
            <div v-if="features.subSection">
              <div class="" v-for="(n, idx) in features.subSection" :key="idx">
                <p class="mb-4">{{ n.subSectionName }}</p>
                <div class="mb-4 description" v-html="n.description"></div>
              </div>
            </div>
          </div> -->
          <div v-if="technical && d.id === 'tech'">
            <div
              class="grid grid-cols-3 gap-4"
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
                  class="text-matta-black text-base mb-1"
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
              class="grid grid-cols-3 gap-4"
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
                  class="text-matta-black text-base mb-1"
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
              class="grid grid-cols-3 gap-4"
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
                  class="text-matta-black text-base mb-1"
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
const sideData = [
  {
    id: "applications",
    title: "Identification & Functionality",
  },
  {
    id: "features",
    title: "Features & Benefits",
  },
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
const active = ref("overview");

// const features = computed(() => {
//   if (!product || !product.propertyItems) return;
//   return product.propertyItems.features;
// });
const compliance = computed(() => {
  if (!product || !product.propertyItems) return;
  return product.propertyItems.compliance;
});
const property = computed(() => {
  if (!product || !product.propertyItems) return;
  return product.propertyItems.property;
});
const technical = computed(() => {
  if (!product || !product.propertyItems) return;
  return product.propertyItems.technical;
});
// const applications = computed(() => {
//   if (!product || !product.propertyItems) return;
//   return product.propertyItems.applications;
// });
const openIndex = ref(["tech"]);
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
</script>
<style lang="scss">
.description {
  ul,
  ol {
    display: block;
    list-style-type: inherit;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }
}
</style>
