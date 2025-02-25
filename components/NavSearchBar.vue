<template>
  <div ref="searchContainer" class="w-full space-y-2 relative">
    <Textinput
      v-model="searchQuery"
      placeholder="Search for products"
      type="text"
      class="bg-[#F2F4F7] !border-none w-full rounded-lg md:min-w-[400px]"
       classInput="bg-[#F2F4F7] !border-none w-full rounded-lg placeholder:text-[#98A2B3] md:min-w-[400px]"
      iconPosition="left"
      icon="clarity:search-line"
      @keydown.enter="handleEnterKey"
      @focus="showDropdown = true"
      name="search"
    />

    <div
      v-if="loading"
      class="text-center text-gray-500 py-4 bg-white rounded-lg shadow-md border border-gray-200 absolute z-30 w-full"
    >
      Loading...
    </div>

    <div   v-else-if="showDropdown && results.length"  class=" absolute z-30 w-full bg-white rounded-b-lg shadow-2xl border overflow-hidden border-gray-100">
      <ul
    
      class="overflow-y-auto max-h-[300px] w-full  "
    >
      <li
        v-for="product in results"
        :key="product.id"
        @click="selectProduct(product.title)"
        class="px-3 py-[10px] hover:bg-gray-100 cursor-pointer transition-colors text-sm last:rounded-b-lg"
      >
        {{ product.title }}
      </li>
    </ul>
    </div>

    <div
      v-else-if="showDropdown && searchQuery && !results.length && !loading"
      class="text-center text-gray-500 py-4 bg-white rounded-b-lg shadow-md border border-gray-200 absolute z-30 w-full"
    >
      No products found.
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useDebounceFn } from "@vueuse/core";
import { getProducts } from "~/services/productservices";

const searchQuery = ref("");
const results = ref([]);
const loading = ref(false);
const showDropdown = ref(false);
const searchContainer = ref(null);
const router = useRouter();

const closeDropdown = (event) => {
  if (searchContainer.value && !searchContainer.value.contains(event.target)) {
    showDropdown.value = false;
  }
};

const navigateToProduct = (productName) => {
  const encodedName = encodeURIComponent(productName);
  router.push(`/category/market/${encodedName}?search_query=${encodedName}`);
  searchQuery.value = "";
};

const selectProduct = (productName) => {
  navigateToProduct(productName);
  showDropdown.value = false;
  searchQuery.value = "";
};

const handleEnterKey = () => {
  if (searchQuery.value.trim()) {
    navigateToProduct(searchQuery.value.trim());
    searchQuery.value = "";
    showDropdown.value = false;
  }
};

const fetchProducts = useDebounceFn(async (query) => {
  if (query.trim()) {
    loading.value = true;
    try {
      const res = await getProducts({ Search: query.trim() });
      results.value = Array.isArray(res.data?.data) ? res.data.data : [];
      await nextTick();
      if (results.value.length) {
        showDropdown.value = true;
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      results.value = [];
    } finally {
      loading.value = false;
    }
  } else {
    results.value = [];
    showDropdown.value = false;
  }
}, 500);

watch(searchQuery, (newQuery) => {
  if (newQuery.trim()) {
    fetchProducts(newQuery);
  } else {
    results.value = [];
    showDropdown.value = false;
  }
});

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<style scoped>
ul {
  background-color: #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

ul::-webkit-scrollbar {
  width: 6px;
}

ul::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 3px;
}

ul::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
}

li {
  transition: background-color 0.2s ease;
}
</style>
