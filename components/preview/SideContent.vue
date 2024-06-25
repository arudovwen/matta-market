<template>
  <aside class="rounded-xl grid grid-cols-1 gap-y-3" v-if="product">
    <article
      class="p-6 lg:p-8 rounded-xl bg-[#F1F3F5]"
      v-if="product && product.productExperts && product.productExperts.length"
    >
      <div class="flex justify-between items-center">
        <h5 class="font-medium text-lg mb-6">Experts</h5>
        <span class="flex gap-x-3">
          <span
            class="w-6 h-6 flex items-center justify-center text-[10px] bg-[#E7EBEE] rounded-full hover:shadow cursor-pointer"
            @click="prev"
          >
            <i class="uil uil-arrow-left text-lg"></i>
          </span>
          <span
            class="w-6 h-6 flex items-center justify-center text-[10px] bg-[#E7EBEE] rounded-full hover:shadow cursor-pointer"
            @click="next"
          >
            <i class="uil uil-arrow-right text-lg"></i>
          </span>
        </span>
      </div>
      <carousel
        ref="myslider"
        :breakpoints="breakpoints"
        class="py-5"
        v-if="product && product.productExperts"
      >
        <slide
          v-for="item in product.productExperts"
          :key="item.email"
          class="px-2 py-5"
        >
          <div class="w-full">
            <div class="mb-5 text-center">
              <div
                class="w-28 h-28 rounded-full mx-auto border border-white mb-4 overflow-hidden flex items-center justify-center"
              >
                 <img
                  :src="
                    item.photo
                      ? item.photo
                      : defaultImage

                  "
                  class="w-full h-full"
                />
              </div>
              <div>
                <p class="font-medium text-base text-matta-black">
                  {{ item.name }}
                </p>
                <p class="font-normal text-sm text-[#ABABAB]">
                  {{ item.role }}
                </p>
              </div>
            </div>
            <table class="mb-6 w-full table-auto">
              <tbody>
                <tr>
                  <td class="font-normal text-sm text-[#ABABAB] text-left">
                    E-mail
                  </td>
                  <td class="font-normal text-sm text-matta-black text-right">
                    {{ item.email || "-" }}
                  </td>
                </tr>
                <tr>
                  <td class="font-normal text-sm text-[#ABABAB] text-left">
                    Phone number
                  </td>
                  <td class="font-normal text-sm text-matta-black text-right">
                    {{ item.phone || "-" }}
                  </td>
                </tr>
                <tr>
                  <td class="font-normal text-sm text-[#ABABAB] text-left">
                    Language
                  </td>
                  <td class="font-normal text-sm text-matta-black text-right">
                    {{ item.language || "-" }}
                  </td>
                </tr>
              </tbody>
            </table>

            <a :href="`mailto:${item.email}`">
              <button
                class="uppercase w-full text-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black py-4 px-3 md:px-6 border rounded-full border-[#ABABAB] md:leading-5 text-[13px] shadow-sm"
              >
                <span>send message</span>
              </button>
            </a>
          </div>
        </slide>
      </carousel>
    </article>

    <article class="p-6 lg:p-8 rounded-xl bg-[#F1F3F5]" v-if="producer">
      <h5 class="font-medium text-lg mb-6">Producer</h5>
      <div class="flex items-center gap-x-4 mb-6">
        <div
          class="w-20 h-20 rounded-xl bg-white flex items-center justify-center"
        >
           <img
            v-if="producer.logo"
            :src="producer.logo"
            alt="logo"
            class="rounded-xl"
          />
          <span v-else class="text-lg font-bold">{{
            producer.title.slice(0, 1).toUpperCase()
          }}</span>
        </div>
        <div>
          <p class="font-medium text-base text-matta-black">
            {{ producer.title }}
          </p>
          <p
            class="font-normal text-sm text-matta-black"
            v-if="producer.location"
          >
            <i class="uil uil-map-marker"></i> {{ producer.location }}
          </p>
        </div>
      </div>

      <button
        class="uppercase w-full text-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black py-4 px-3 md:px-6 border rounded-full border-[#ABABAB] md:leading-5 text-[13px] shadow-sm"
      >
        <span>view more products</span>
      </button>
    </article>

    <!-- <article
      class="p-6 lg:p-8 rounded-xl bg-[#F1F3F5]"
      v-if="product.productQuestions && product.productQuestions.length"
    >
      <h5 class="font-medium text-lg mb-6">Questions</h5>
      <ul>
        <li v-for="(n, i) in product.productQuestions" :key="i" class="mb-6">
          <div class="grid grid-cols-3 justify-between items-start">
            <span class="col-span-2 text-matta-black font-medium text-base">{{
              n.question
            }}</span>
            <span
              class="text-right text-lg"
              @click="handleIndex(i)"
              v-if="!openIndex.includes(i)"
              ><i class="uil uil-plus"></i
            ></span>
            <span
              class="text-right text-lg"
              @click="dropIndex(i)"
              v-if="openIndex.includes(i)"
              ><i class="uil uil-minus"></i
            ></span>
          </div>
          <hr class="border-[#DDDDDD] my-4" />
        
          <ul v-if="openIndex.includes(i)">
            <li class="mb-1">
              <span class="text-sm text-matta-black font-normal pr-1">{{
                n.answer
              }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </article>

    <article
      class="p-6 lg:p-8 rounded-xl bg-[#F1F3F5]"
      v-if="product.tags && product.tags.length"
    >
      <h5 class="font-medium text-lg mb-6">Tags</h5>
      <div class="flex flex-wrap gap-3">
        <span
          class="text-xs rounded-full border px-2 py-1 border-[#DDDDDD]"
          v-for="tag in product.tags"
          :key="tag"
        >
          {{ tag }}
        </span>
      </div>
    </article> -->
  </aside>
</template>
<script setup>
import { ref, inject, onMounted } from "vue";
import { Carousel as carousel, Slide } from "vue3-carousel";
import { getProducers, getsupplier } from "~/services/productservices";

const product = inject("product");
const myslider = ref(null);
const breakpoints = {
  250: {
    itemsToShow: 1,
    snapAlign: "center",
  },
};
function next() {
  myslider.value.next();
}

function prev() {
  myslider.value.prev();
}
const producer = ref(null);
const supplier = ref(null);
const openIndex = ref([]);
const defaultImage = '../../assets/img/avatar1.svg'

// eslint-disable-next-line no-unused-vars
function handleIndex(val) {
  openIndex.value.push(val);
}
// eslint-disable-next-line no-unused-vars
function dropIndex(val) {
  openIndex.value = openIndex.value.filter((i) => i !== val);
}
onMounted(() => {
	console.log(product);
  getProducers({ Search: product.manufacturer }).then((res) => {
    producer.value = res.data.data.data[0];
  });
  getsupplier({ supplierId: product.supplierId }).then((res) => {
    supplier.value = res.data;
  });
});
</script>
