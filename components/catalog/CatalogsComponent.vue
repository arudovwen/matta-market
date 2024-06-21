<template>
  <section
    class="bg-white rounded-lg px-6 md:px-10 py-12 bg-no-repeat bg-[100%_100%] bg-[length:100%_100%] transition-[background-image] ease-in-out delay-150 duration-500"
    :style="`background-image:url('${bgImg}')`"
    @mouseover.self="bgImg = ''"
  >
    <h1 class="text-4xl font-medium text-matta-black mb-8">Markets</h1>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
      v-if="!isLoading"
    >
      <div
        class="tab relative group cursor-pointer overflow-hidden rounded-lg border-2 border-matta-black/10 hover:border-matta-black/30"
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-duration="1500"
        v-for="(n, i) in markets"
        :key="i"
        @mouseover="
          () => {
            bgImg = n.bgUrl;
            activeIndex = i;
          }
        "
        @mouseleave="activeIndex = null"
      >
        <router-link :to="`/market/${n.title}/${n.id}`">
          <TabComponent :detail="n" :index="i" :activeIndex="activeIndex" />
        </router-link>
      </div>
    </div>
    <div class="text-center p-6 lg:p-8 my-24" v-else>
       <AppLoader />
    </div>
  </section>
</template>
<script setup>
import { getMarkets } from "~/services/productservices";
import { onMounted, ref, reactive } from "vue";
import TabComponent from "~/components/TabComponent";
// import generateRandomColor from "~/utils/generateRandomColor";

const markets = ref(null);
const isLoading = ref(true);
const bgImg = ref("");
const activeIndex = ref("");
onMounted(() => {
  getMarket();
});
const queryParams = reactive({
  Search: "",
  PageSize: 8,
  PageNumber: 1,
  pagecount: 0,
  totalData: 0,
});

function getMarket() {
	getMarkets(queryParams)
	.then((res) => {
      markets.value = res.data.data.map((i) => {
        i.imagePath = i.imagePath?.replace("~/assets", "");
        // i.marketColor = generateRandomColor();
        return i;
      });
      queryParams.totalData = res.data.totalCount;
      queryParams.pagecount = res.data.data.length;
      isLoading.value = false;
    })
    .catch(() => {
      isLoading.value = false;
    });
}
// function next() {
//   queryParams.PageNumber++;
//   getMarket();
// }
// function prev() {
//   if (queryParams.PageNumber == 1) return;
//   queryParams.PageNumber--;
//   getMarket();
// }

// const categories = [
//   {
//     img: require("~/assets/img/1.svg"),
//     title: "Consumer Goods",
//     products: "4 850 products",
//     subcategories: "5 subcategories",
//     color: "#F6F396",
//   },
//   {
//     img: require("~/assets/img/2.svg"),
//     title: "Building & Construction",
//     products: "4 850 products",
//     subcategories: "5 subcategories",
//     color: "#FDD0AF",
//   },
//   {
//     img: require("~/assets/img/3.svg"),
//     title: "Healthcare & Pharmaceuticals",
//     products: "4 850 products",
//     subcategories: "5 subcategories",
//     color: "#A9CAFF",
//   },
//   {
//     img: require("~/assets/img/iconauto.svg"),
//     title: "Automotive & Transportation",
//     products: "4 850 products",
//     subcategories: "5 subcategories",
//     color: "#D0C9FF",
//   },
//   {
//     img: require("~/assets/img/4.svg"),
//     title: "Printing & Packaging",
//     products: "4 850 products",
//     subcategories: "5 subcategories",
//     color: "#F9CBE4",
//   },
//   {
//     img: require("~/assets/img/iconagric.svg"),
//     title: "Agriculture & Animal Feed",
//     products: "4 850 products",
//     subcategories: "5 subcategories",
//     color: "#BBE5AC",
//   },
//   {
//     img: require("~/assets/img/5.svg"),
//     title: "Electrical & Electronics",
//     products: "4 850 products",
//     subcategories: "5 subcategories",
//     color: "#C9E2FA",
//   },
//   {
//     img: require("~/assets/img/6.svg"),
//     title: "Home & Personal Care",
//     products: "4 850 products",
//     subcategories: "5 subcategories",
//     color: "#C8F6EE",
//   },
//   {
//     img: require("~/assets/img/7.svg"),
//     title: "Paints & Coatings",
//     products: "4 850 products",
//     subcategories: "5 subcategories",
//     color: "#E0F7B0",
//   },
// ];
</script>

<style lang="scss" scoped>
.tab:nth-child(3),
.tab:nth-child(4),
.tab:nth-child(10),
.tab:nth-child(11) {
  grid-column: span 2 / span 2;
}
.tab:nth-child(6) {
  grid-row: span 2 / span 2;
}
@media (max-width: 1024px) {
  .tab:nth-child(3),
  .tab:nth-child(4),
  .tab:nth-child(10),
  .tab:nth-child(11) {
    grid-column: span 1 / span 1;
  }
  .tab:nth-child(6) {
    grid-row: span 1 / span 1;
  }
}
</style>
