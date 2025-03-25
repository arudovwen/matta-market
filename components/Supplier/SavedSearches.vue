<template>
  <div class="bg-white rounded-[10px] pb-20">
    <!-- Top bar   -->

    <HeaderComponent title="Saved items" />

    <div class="pt-[30px]">
      <div v-if="!loading">
        <div
          class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[30px]"
          v-if="productsData?.length"
        >
          <ProductCard
            v-for="(n, idx) in productsData"
            :key="idx"
            :index="idx"
            :detail="n"
          />
          <div class="px-[30px] py-6 w-full mt-6">
            <PaginationSimple
              :total="40"
              :pageNumber="1"
              :pageSize="10"
              @next="next"
              @prev="prev"
              :perPage="5"
            />
          </div>
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

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const isOpen = ref(false);
defineProps(["title"]);
const productsData = ref([]);

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
