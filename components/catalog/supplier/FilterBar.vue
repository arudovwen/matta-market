<template>
  <div
    class="flex justify-between items-center bg-white rounded-lg p-2 shadow-[5px_12px_35px_rgba(44,44,44,0.12)]"
  >
    <div class="flex flex-1 max-w-full">
      <div class="flex gap-x-2 items-center">
        <button
          @click="open = true"
          class="flex gap-x-2 items-center uppercase whitespace-nowrap hover:text-white hover:bg-matta-black py-2 px-3 md:py-3 md:px-6 border rounded-full border-[#ddd] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
          :class="
            filter
              ? 'text-white bg-matta-black'
              : 'text-matta-black bg-transparent'
          "
        >
          <span class=""><i class="uil uil-list-ui-alt text-sm"></i></span>
          <span>All Filters</span>
          <span
            v-if="filter"
            class="bg-white w-4 h-4 text-[10px] rounded-full text-matta-black hover:text-matta-black flex items-center justify-center"
            >5</span
          >
        </button>
        <SelectComponent
          @onGetData="onGetPrice"
          :options="priceOptions"
          :showSearch="true"
          placeholder="Country"
          classStyles="appearance-none h-[46px] uppercase text-matta-black bg-transparent py-2 px-3 min-w-[150px] cursor-pointer md:py-3 md:px-6 border !rounded-full border-[#ddd] md:leading-5 text-[10px] !sm:text-[13px] shadow-sm focus:outline-gray-200"
        />

        <MultiFilter
          @onGetData="onGetApp"
          :options="applications"
          :showSearch="true"
          placeholder="Area of application"
          classStyles="appearance-none h-[46px] uppercase text-matta-black bg-transparent py-2 px-3 min-w-[150px] cursor-pointer md:py-3 md:px-6 border !rounded-full border-[#ddd] md:leading-5 text-[10px] !sm:text-[13px] shadow-sm focus:outline-gray-200"
        />

        <MultiFilter
          @onGetData="onGetProducer"
          :options="filteredManufacturers"
          :showSearch="true"
          placeholder="Producer"
          classStyles="appearance-none h-[46px] uppercase text-matta-black bg-transparent py-2 px-3 min-w-[150px] cursor-pointer md:py-3 md:px-6 border !rounded-full border-[#ddd] md:leading-5 text-[10px] !sm:text-[13px] shadow-sm focus:outline-gray-200"
        />
      </div>
    </div>

    <div class="flex gap-x-2">
      <div class="flex gap-x-3 ml-2">
        <button
          @click="isClearing = true"
          class="h-[46px] w-[46px] rounded-full flex items-center justify-center border border-[#E7EBEE]"
        >
          x
        </button>
        <button
          @click="isSaving = true"
          class="h-[46px] rounded-full flex items-center justify-center border border-[#E7EBEE] text-[13px] px-5"
        >
          Save
        </button>
      </div>
      <SearchFilter>
        <template #content>
          <button
            class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-sm"
          >
            <i class="uil uil-bookmark"></i></button
        ></template>
      </SearchFilter>
      <SortFilter>
        <template #content>
          <button
            class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-sm"
          >
             <img
              src="~/assets/img/sorting.svg"
              alt="sorting"
            /></button></template
      ></SortFilter>
    </div>
  </div>

  <SideModal :isOpen="open" @togglePopup="open = false">
    <template #content>
      <AllFilter
        @onGetData="onGetApp"
        :options="applications"
        @cancel="open = false"
        @toggleClear="isClearing = !isClearing"
        @toggleSave="isSaving = !isSaving"
      />
    </template>
  </SideModal>
  <CenterModal
    :isOpen="isSaving"
    @toggleModal="isSaving = false"
    v-if="isSaving"
  >
    <template #content>
      <save-search-form @cancel="isSaving = false"></save-search-form>
    </template>
  </CenterModal>

  <CenterModal
    :isOpen="isClearing"
    @toggleModal="isClearing = false"
    v-if="isClearing"
  >
    <template #content>
      <div
        class="bg-white p-6 lg:p-8 sm:p-6 sm:pb-4 w-[400px]"
        v-if="isClearing"
      >
        <div class="flex justify-between mb-5 items-center">
          <h4 class="font-medium text-matta-black text-xl">Clear Filters</h4>
          <i
            class="uil uil-times cursor-pointer text-lg"
            @click="isClearing = false"
          ></i>
        </div>

        <p class="text-sm text-matta-black mb-2">
          Are you sure you want to clear all filters?
        </p>

        <div class="flex justify-between gap-x-2 items-center mt-8">
          <button
            type="button"
            @click="isClearing = false"
            class="appearance-none border w-1/2 leading-none px-8 py-4 rounded-lg text-matta-black hover:bg-gray-100 text-[13px] uppercase"
          >
            Cancel
          </button>

          <button
            type="button"
            @click="isClearing = false"
            class="appearance-none border w-1/2 border-primary- leading-none px-8 py-4 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
          >
            clear filters
          </button>
        </div>
      </div>
    </template>
  </CenterModal>
</template>
<script setup>
import { inject, computed, ref } from "vue";
import SelectComponent from "~/components/forms/SelectComponent";
import MultiFilter from "~/components/forms/MultiFilter";
import SideModal from "~/components/SideModal";
import AllFilter from "~/components/forms/AllFilter.vue";
import SortFilter from "~/components/forms/SortFilter.vue";
import SearchFilter from "~/components/forms/SearchFilter.vue";
import CenterModal from "~/components/IndexModal";
import SaveSearchForm from "~/components/forms/SaveSearchForm";

const isClearing = ref(false);
const isSaving = ref(false);
const open = ref(false);
// const sortProduct = inject("sortProduct");
// const sortPrice = inject("sortPrice");
const filter = ref(0);
const manufacturers = inject("manufacturers");
const allmarkets = inject("allmarkets");
const queryParams = inject("queryParams");
const getAllProducts = inject("getAllProducts");
const filteredManufacturers = computed(() => {
  return manufacturers.value.map((i) => {
    return { id: i.title, name: i.title, value: i.title };
  });
});
const applications = computed(() => {
  return allmarkets.value
    .map((element) => {
      return element.applications;
    })
    .flat()
    .map((i) => {
      return { id: i.title, name: i.title, value: i.title };
    });
});
// eslint-disable-next-line no-unused-vars
function onGetPrice(data) {}
function onGetProducer(data) {
  queryParams.Producer = data.value;
  getAllProducts();
}
function onGetApp(data) {
  queryParams.Application = data.value;
  getAllProducts();
}
const priceOptions = [
  { id: 0, name: "Country", value: "" },
  { id: 1, name: "Nigeria", value: "nigeria" },
];
</script>
