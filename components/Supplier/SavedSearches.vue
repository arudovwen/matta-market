<template>
  <div class="b rounded-[10px]">
    <!-- Top bar   -->

    <HeaderComponent title="Saved items" />

    <div class="pt-[30px]">
      <div v-if="!loading">
        <div v-if="productsData?.length">
          <div
            class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[30px] px-[30px]"
          >
            <ProductCard
              v-for="(n, idx) in productsData"
              :key="idx"
              :index="idx"
              :detail="n"
            />
          </div>
          <!-- <div class="px-[30px] py-6 w-full mt-6">
            <PaginationSimple
              :total="40"
              :pageNumber="1"
              :pageSize="10"
              @next="next"
              @prev="prev"
              :perPage="5"
            />
          </div> -->
        </div>
        <EmptyData
          v-else
          @btnFunction="btnFunction"
          btnText="Search for products"
          title="No saved items found"
          subtext="You do not have any item saved yet. Click the “Save for later” icon on the product page and it will show up here"
        />
      </div>

      <AppLoader v-if="loading" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { getlikeproducts } from "~/services/productservices";

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const query = reactive({
  pageNumber: 1,
  pageSize: 10,
});
const isOpen = ref(false);
defineProps(["title"]);
const productsData = ref([]);
const getData = async () => {
  try {
    loading.value = true;
    const res = await getlikeproducts(query);
    if (res.status === 200) {
      productsData.value = res.data.data.map((item) => {
        return {
          ...item,
          productId: item.productId,
          productName: item.title,
          liked: true,
        };
      });
    }
  } catch (err) {
    console.log({ err });
    toast.error("Something went wrong, please try again.");
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  getData();
});
const totalData = ref(20);
const btnFunction = () => {
  router.push("/");
};
const next = () => {};
const prev = () => {};
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
