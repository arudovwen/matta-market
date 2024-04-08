<!-- eslint-disable no-unused-vars -->
<template>
  <form class="mt-12">
    <legend class="text-lg font-medium">Product Details</legend>
    <p class="text-xs text-[#ABABAB] mb-8">
      This information will help us get you the right product.
    </p>
    <div class="mb-6">
      <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Choose Market</label>
      <SelectComponent
        @onGetData="onGetMarket"
        :options="marketOptions"
        :showSearch="true"
        :placeholder="`${
          isLoadingMarket ? 'Loading markets ...' : 'Select market'
        }`"
        :class="{ 'border-red-500 ': request1$.market.$error }"
        classStyles="appearance-none h-[46px] text-matta-black bg-transparent py-2 pl-3 pr-6  min-w-[150px] cursor-pointer md:py-3 md:px-3 border !rounded-lg border-[#ddd] md:leading-5 text-[10px] !sm:text-[13px] shadow-sm focus:outline-gray-200"
      />
      <div
        class="text-red-500 mt-1"
        v-for="error of request1$.market.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="mb-6">
      <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Choose Product</label>
      <ProductSearch :id="sampleForm.market" v-model="sampleForm.product" />
      <div
        class="text-red-500 mt-1"
        v-for="error of request1$.market.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <div class="mb-6">
      <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Number of Samples</label>
      <div class="flex relative">
        <div class="flex relative items-center w-full">
          <select
            :value="request1$.numberofSamples.$model"
            disabled
            :class="{ 'border-red-500 ': request1$.numberofSamples.$error }"
            class="rounded-lg appearance-none px-[14px] py-[10px] h-11 border w-full bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          >
            <option v-for="z in 10" :key="z" :value="z">
              <span class="flex gap-x-6">
                <span> {{ z }}</span></span
              >
            </option>
          </select>
        </div>
      </div>
      <div
        class="text-red-500 mt-1"
        v-for="error of request1$.numberofSamples.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="mb-6">
      <label class="mb-2 font-normal text-xs block"
        >Estimate purchase of product
      </label>
      <div class="flex relative">
        <div
          class="flex h-[60px] w-full items-center gap-x-3 lg:gap-x-4 rounded-lg bg-[#F1F3F5] relative py-4 md:py-5 text-xs lg:text-[13px] px-4 lg:px-4 uppercase text-matta-black"
        >
          <button
            class="disabled:opacity-20 disabled:cursor-not-allowed p-2"
            type="button"
            @click="sampleForm.expectedAnualUsage -= 1"
            :disabled="sampleForm.expectedAnualUsage <= 1"
          >
            <i class="uil uil-minus text-lg"></i>
          </button>
          <input
            min="1"
            class="min-w-[30px] md:min-w-[50px] text-center text-xs md:text-base border bg-transparent focus:outline-matta-black/10 flex-1 p-2"
            v-model="sampleForm.expectedAnualUsage"
          />
          <button
            type="button"
            @click="sampleForm.expectedAnualUsage += 1"
            class="p-2"
          >
            <i class="uil uil-plus"></i>
          </button>
        </div>
      </div>
      <div
        class="text-red-500 mt-1"
        v-for="error of request1$.expectedAnualUsage.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>
  </form>
</template>
<script setup>
import { inject, computed, ref, reactive, onMounted } from "vue";
import SelectComponent from "~/components/forms/SelectComponent";
// eslint-disable-next-line no-unused-vars
import CurrencyInput from "~/components/CurrencyInput";
import { getMarkets } from "~/services/productservices";
import ProductSearch from "~/components/forms/ProductSearch.vue";

onMounted(() => {
  getMarket();
});

const isLoadingMarket = ref(false);
const queryParams = reactive({
  Search: "",
  PageSize: 20,
  PageNumber: 1,
  pagecount: 0,
  totalData: 0,
});

function getMarket() {
  isLoadingMarket.value = true;
  getMarkets(queryParams)
    .then((res) => {
      markets.value = res.data.data.map((i) => {
        i.imagePath = i.imagePath?.replace("~/assets", "");
        return i;
      });
      isLoadingMarket.value = false;
    })
    .catch(() => {
      isLoadingMarket.value = false;
    });
}
const markets = ref([]);
const request1$ = inject("request1$");
const sampleForm = inject("sampleForm");
function onGetMarket(data) {

  sampleForm.market = data.id;
}

const marketOptions = computed(() => {
  if (!markets.value.length) return [];
  return markets.value.map((i) => {
    i.name = i.title;
    return i;
  });
});
</script>
