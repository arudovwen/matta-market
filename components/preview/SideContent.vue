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
                  :src="item.photo ? item.photo : defaultImage"
                  class="w-full h-full"
                  alt="default"
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
            <table aria-describedby="true" class="mb-6 w-full table-auto">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
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
const defaultImage = "../../assets/img/avatar1.svg";

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
