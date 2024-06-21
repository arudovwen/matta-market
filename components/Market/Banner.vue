<template>
  <div class="bg-[#182230]">
    <div
      class="container py-[35px] flex flex-col lg:flex-row lg:items-end justify-between"
    >
      <div>
        <Breadcrumbs :links="links" className="text-white" />
        <div class="mt-9 w-full max-w-[450px]">
          <Textinput
            v-model="query.Search"
            placeholder="Search for products"
            type="search"
            class="bg-white  w-full rounded-lg placeholder:text-[#667085] md:min-w-[400px]"
            iconPosition="left"
            icon="clarity:search-line"
          />
        </div>
      </div>
      <div class="hidden md:flex">
        <Select
          v-model.number="query.sortOrder"
          :options="options"
          placeholder="Sort prices by"
          classInput="min-w-[180px] !bg-white !border-[#B9C0D4] !rounded-[4px] !text-[#5D6B98] !h-11 cursor-pointer"
        />
      </div>
    </div>
  </div>
  <div class="container">
    <h1 class="text-[#101828] text-2xl font-semibold mb-2 mt-9 capitalize">
      {{ title }}
    </h1>
    <p class="text-sm text-[#475467] mb-4 lg:mb-0">
      We found <span class="font-semibold">{{ total }} Products”</span> matching
      your search criteria
    </p>
  </div>
</template>

<script setup>
import { useProductStore } from "~/stores/products";
const query = inject("query");
const store = useProductStore();
const { total } = storeToRefs(store);

const router = useRoute();
const { title, id } = router.params;

const links = [
  {
    title: "home",
    url: "/",
  },
  {
    title: title,
    url: "#",
  },
];
const options = [
  {
    label: "Default",
    value: "",
  },
  {
    label: "Low to High",
    value: 0,
  },
  {
    label: "High to Low",
    value: 1,
  },
];
</script>
