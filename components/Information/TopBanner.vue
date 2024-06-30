<template>
  <div class="p-6 lg:p-8 bg-white rounded-lg bg-img">
    <div class="mb-12"><Breadcrumbs :manual="true" :crumbs="crumbs" /></div>
    <div class="mb-3">
      <span
        v-if="!isAvailable"
        class="px-3 py-2 rounded-lg border border-[#ABABAB] text-[#ABABAB] text-[13px]"
        >Not available</span
      >
    </div>
    <div class="mb-4 lg:mb-16">
      <h1
        class="text-2xl sm:text-4xl lg:text-[48px] lg:leading-[56px] text-matta-black col-span-1 font-medium capitalize max-w-[656px] mb-4"
      >
        {{ product.name }}
      </h1>

      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-end gap-y-4 lg:gap-y-0 lg:gap-x-12"
      >
        <div class="lg:px-4 lg:mr-6" v-if="isAvailable && !product.hidePrice">
          <p class="text-xs text-[#ddd] font-normal uppercase">from</p>
          <p class="text-matta-black">
            <span class="font-medium text-base sm:text-xl"
              >{{
                defaultPackage ? currencyFormat(defaultPackage.amount) : 0
              }} </span
            >/{{ defaultPackage ? defaultPackage.unit : "Kg" }}
          </p>
        </div>
        <div class="flex gap-y-4 lg:gap-y-0 gap-x-2">
          <button
            v-if="!product.liked"
            @click="handlelike"
            class="p-2 w-auto sm:w-[46px] h-9 sm:h-[46px] rounded-lg sm:rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#E7EBEE] shadow-sm"
          >
            <HeartIcon class="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" />
          </button>
          <button
            v-if="product.liked"
            @click="handleUnlike"
            class="p-2 w-auto sm:w-[46px] h-9 sm:h-[46px] rounded-lg sm:rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#E7EBEE] shadow-sm"
          >
            <HeartSolidIcon class="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </button>
          <div class="flex-1 flex items-center gap-x-2 sm:h-full">
            <span
              class="text-[#E7EBEE] text-3xl font-light hidden sm:inline-flex"
              >|</span
            >
            <button
              @click="handleRequest('sample')"
              :disabled="product.sampleAvailable || !supplier"
              :class="{
                'opacity-50 cursor-not-allowed': product.sampleAvailable,
              }"
              class="flex flex-1 text-center whitespace-nowrap justify-center h-9 sm:h-[46px] items-center sm:uppercase text-matta-black bg-transparent hover:text-white hover:bg-matta-black py-2 px-2 md:py-3 md:px-6 border rounded-lg border-[#E7EBEE] md:leading-5 text-[13px] shadow-sm disabled:opacity-50"
            >
              <span>Request Sample</span>
            </button>
            <button
              @click="handleRequest('quote')"
              :disabled="!supplier"
              class="flex flex-1 text-center whitespace-nowrap justify-center h-9 sm:h-[46px] items-center sm:uppercase text-matta-black bg-transparent hover:text-white hover:bg-matta-black py-2 px-2 md:py-3 md:px-6 border rounded-lg border-[#E7EBEE] md:leading-5 text-[13px] shadow-sm disabled:opacity-50"
            >
              <span>Request Quote</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <CartCounter :isAvailable="isAvailable" />
    <!-- <AddedToFav :name="product.name" v-if="isFav" @close="isFav = false" /> -->
  </div>
  <Modal :isOpen="isOpen" @togglePopup="isOpen = false" v-if="isOpen">
    <template #content>
      <div class="h-full w-full bg-white rounded-lg p-6 lg:p-8">
        <IndexSample
          @togglePopup="isOpen = false"
          v-if="requestType == 'sample'"
        />
        <IndexQuote
          @togglePopup="isOpen = false"
          v-if="requestType == 'quote'"
        />
      </div>
    </template>
  </Modal>

</template>
<script setup>
import CartCounter from "./CartCounter.vue";
import { HeartIcon } from "@heroicons/vue/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/vue/24/solid";
import { inject, onMounted, ref, provide } from "vue";
import { useRoute } from "vue-router";
// import AddedToFav from "~/components/AddedToFav";
import Modal from "~/components/SideModal";
import IndexSample from "./sample/IndexSample";
import IndexQuote from "./quote/IndexQuote";
import { useStore } from "vuex";
import { likeproduct, unlikeproduct } from "~/services/productservices";

const authstore = useAuthStore()
const isAuthOpen = ref(false);
const isOpen = ref(false);
const isAvailable = ref(true);

const product = inject("product");
const defaultPackage = inject("defaultPackage");
const liked = ref(false);
const route = useRoute();
const isFav = ref(false);
const store = useStore();
const supplier = inject("supplier");
const crumbs = [
  { name: "markets", url: `/markets` },
  {
    name: route.query.market,
    url: `/category/market/${route.query.market}/${route.query.marketId}`,
  },
  { name: route.params.type, url: `#` },
];
const active = ref("signin");
const requestType = ref(null);
function handleclose(val) {
  if (val == "success") {
    window.location.reload();
  }
  isAuthOpen.value = isOpen.value = false;
}
function addToFav() {
  isFav.value = true;
  liked.value = true;
  setTimeout(() => {
    isFav.value = false;
  }, 3500);
}
onMounted(() => {});

function handleRequest(type) {
  if (store.getters.isLoggedIn) {
    isOpen.value = true;
    requestType.value = type;
  } else {
    isAuthOpen.value = true;
  }
}
function toggleModal(val) {
  active.value = val;
}
function togglePopup() {
  isOpen.value = false;
}
function handlelike() {
  if (!store.getters.isLoggedIn) {
    isAuthOpen.value = true;
    return;
  }
  let data = {
    businessId: store.getters.userId,
    productId: product.value.id,
    productName: product.value.name,
    productImg: product.value.gallery.length ? product.value.gallery[0] : "",
    backgroundbg: supplier.value.logo,
    price: product.value.price,
    unit: product.value.unit,
    supplier: supplier.value.companyName,
    manufacturer: product.value.manufacturer,
    options: product.value.packagesAvailable.length,
    featuredPack: product.value.packages.length
      ? product.value.packages[0].title
      : "",
  };
  likeproduct(data).then(() => {
    addToFav();
    product.value.liked = true;
  });
}

function handleUnlike() {
  if (!store.getters.isLoggedIn) {
    isAuthOpen.value = true;
    return;
  }
  unlikeproduct({
    productId: product.value.id,
  }).then(() => {
    product.value.liked = false;
  });
}
provide("toggleModal", toggleModal);
provide("togglePopup", togglePopup);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
