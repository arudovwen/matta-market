<template>
  <form class="mt-8">
    <legend class="text-lg font-medium mb-1">Purchase Details</legend>
    <p class="text-xs text-[#ABABAB] mb-5">
      This information will help us prepare your quote.
    </p>
    <div class="mb-6">
      <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Market</label>
      <FormsSelectComponent
        @onGetData="onGetMarket"
        :options="marketOptions"
        :showSearch="true"
        placeholder="Select market"
        :class="{ 'border-red-500 ': request1$.market.$error }"
        classStyles="appearance-none h-[46px] text-matta-black bg-transparent py-2 px-3 min-w-[150px] cursor-pointer md:py-3 md:px-3 border !rounded-lg border-[#ddd] md:leading-5 text-[10px] !sm:text-[13px] shadow-sm focus:outline-gray-200"
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
      <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Application</label>
      <FormsSelectComponent
        @onGetData="onGetApp"
        :options="appOptions"
        :showSearch="true"
        placeholder="Select application"
        :class="{ 'border-red-500 ': request1$.applications.$error }"
        classStyles="appearance-none h-[46px] text-matta-black bg-transparent py-2 px-3 min-w-[150px] cursor-pointer md:py-3 md:px-3 border !rounded-lg border-[#ddd] md:leading-5 text-[10px] !sm:text-[13px] shadow-sm focus:outline-gray-200"
      />
      <div
        class="text-red-500 mt-1"
        v-for="error of request1$.applications.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <div class="mb-6">
      <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Package type</label>
      <select
        v-if="product && product.packagesAvailable"
        v-model="request1$.package.$model"
        :class="{ 'border-red-500 ': request1$.package.$error }"
        class="disabled:opacity-60 h-[46px] placeholder:text-sm w-full text-matta-black bg-transparent py-2 px-3 min-w-[150px] cursor-pointer md:py-3 md:px-3 border !rounded-lg border-[#ddd] md:leading-5 text-[13px] shadow-sm focus:outline-gray-200"
      >
        <option :value="null" disabled>Select a package</option>
        <option :value="n" v-for="(n, i) in product.packagesAvailable" :key="i">
          {{ n.package ? `${n.package.title} ${n.size}  ${n.unit}` : "-" }}
        </option>
      </select>
      <div
        class="text-red-500 mt-1"
        v-for="error of request1$.package.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="mb-6">
      <label class="mb-2 font-normal text-xs block"
        >How do you intend to use the product?</label
      >
      <textarea
        placeholder="Tell us here"
        v-model="request1$.productUse.$model"
        :class="{ 'border-red-500 ': request1$.productUse.$error }"
        class="h-[46px] placeholder:text-sm w-full text-matta-black bg-transparent py-2 px-3 min-w-[150px] cursor-pointer md:py-3 md:px-3 border !rounded-lg border-[#ddd] md:leading-5 text-[13px] shadow-sm focus:outline-gray-200"
      ></textarea>
      <div
        class="text-red-500 mt-1"
        v-for="error of request1$.productUse.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="mb-6">
      <label class="mb-2 font-normal text-xs block"
        >Expected annual volume</label
      >
      <div
        class="flex items-center gap-x-2 h-[46px] placeholder:text-sm w-full text-matta-black bg-transparent px-3 min-w-[150px] cursor-pointer md:px-3 border rounded-lg border-[#ddd] md:leading-5 text-[10px] sm:text-[13px] shadow-sm focus:outline-gray-200"
      >
        <CurrencyInput
          placeholder="Tell us here"
          :class="{ 'border-red-500 ': request1$.expectedVolume.$error }"
          v-model="request1$.expectedVolume.$model"
          class="flex-1 py-2 md:py-3 outline-none"
          :options="{
            currency: 'ngn',
            currencyDisplay: 'hidden',
          }"
        />

        <select
          v-model="request1$.unit.$model"
          class="h-full outline-none border-l pl-2 py-2 md:py-3"
        >
          <option value="" disabled>Unit</option>
          <option v-for="unit in measurements" :key="unit.value">
            {{ unit.value }}
          </option>
        </select>
      </div>
      <div
        class="text-red-500 mt-1"
        v-for="error of request1$.expectedVolume.$errors"
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
import { inject, computed, ref } from "vue";
import CurrencyInput from "~/components/CurrencyInput";

const request1$ = inject("request1$");
const quoteForm = inject("quoteForm");
const product = inject("product");
const applications = ref([]);
const marketStore = useMarketStore();
const appStore = useApplicationStore();
function onGetMarket(data) {
  applications.value = data.categorySubMenu;
  quoteForm.market = data.title;
}
function onGetApp(data) {
  quoteForm.applications = data.title;
}

const marketOptions = computed(() => {
  if (!marketStore.marketsData.length) return [];
  return marketStore.marketsData.map((i) => {
    i.name = i.title;
    return i;
  });
});
const appOptions = computed(() => {
  if (!appStore.applicationsData.length) return [];
  return appStore.applicationsData.map((i) => {
    i.name = i.title;
    return i;
  });
});
</script>
