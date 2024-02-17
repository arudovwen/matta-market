<template>
  <form class="px-6 lg:px-[30px] text-left" @submit.prevent="handleSubmit">
    <div
      class="flex gap-x-[56px] justify-start flex-col lg:flex-row gap-y-7 lg:gap-y-10"
    >
      <div class="w-[250px] text-left">
        <h2 class="text-sm text-[#101828] font-semibold">Product info</h2>
        <p class="text-xs text-[#475467]">Add your product details here.</p>
      </div>
      <div class="max-w-[654px] w-full">
        <div class="">
          <div>
            <div>
              <div class="grid grid-cols-2 gap-x-4">
                <div class="mb-6">
                  <label
                    class="mb-2 font-medium text-sm text-[#344054] block text-left capitalize"
                  >
                    <span class="text-red-500 mr-[.5px]">*</span> Product
                    generic name
                  </label>
                  <input
                    v-model="v$.name.$model"
                    class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                    autocomplete="off"
                    autofocus="on"
                    placeholder=""
                  />
                  <div
                    class="text-red-500 mt-1"
                    v-for="error of v$.name.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>
                <div class="mb-6">
                  <label
                    class="mb-2 font-medium text-sm text-[#344054] block text-left capitalize"
                  >
                    Product brand name
                  </label>

                  <div class="flex relative items-center">
                    <input
                      v-model="v$.productBrandName.$model"
                      class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                      placeholder=""
                    />
                  </div>
                  <div
                    class="text-red-500 mt-1"
                    v-for="error of v$.productBrandName.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="">
                <div class="mb-6">
                  <label
                    class="mb-2 font-medium text-sm text-[#344054] block text-left"
                  >
                    <span class="text-red-500 mr-[.5px]">*</span> Producer
                  </label>

                  <Combobox v-model="form.manufacturer">
                    <div class="relative mt-1">
                      <div
                        class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
                      >
                        <ComboboxInput
                          class="px-[14px] py-[10px] h-11 rounded-lg w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                          :displayValue="(i) => i"
                          @change="query = $event.target.value"
                          placeholder="Type a producer name"
                        />
                        <ComboboxButton
                          class="absolute inset-y-0 right-0 flex items-center pr-2"
                        >
                          <span
                            ><AppIcon
                              icon="ph:caret-down-bold"
                              iconClass="h-4 w-4 text-[#667085]"
                              aria-hidden="true"
                          /></span>
                        </ComboboxButton>
                      </div>
                      <TransitionRoot
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        @after-leave="query = ''"
                      >
                        <ComboboxOptions
                          class="absolute mt-1 max-h-80 md:min-w-[350px] px-3 overflow-y-auto rounded-lg z-40 bg-white py-4 text-base shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)] border border-[#DCDEE6] sm:text-sm"
                        >
                          <div
                            v-if="
                              filteredProducers.length === 0 && query !== ''
                            "
                            class="relative cursor-default select-none py-2 px-4 text-gray-700"
                          >
                            <p class="mb-2">Nothing found.</p>
                            <hr class="my-4" />
                            <div class="flex justify-end">
                              <button
                                @click="handleAddingProducer"
                                type="button"
                                class="appearance-none text-xs leading-none px-6 py-3 rounded-lg text-white bg-primary-500 hover:opacity-70 uppercase"
                              >
                                Add new
                              </button>
                            </div>
                          </div>
                          <ComboboxOption
                            v-for="i in filteredProducers"
                            as="template"
                            :key="i.id"
                            :value="i.title"
                            v-slot="{ selected, active }"
                          >
                            <li
                              class="relative cursor-default select-none py-2"
                            >
                              <div class="flex items-center gap-x-4">
                                <span
                                  class="h-11 w-12 rounded-lg bg-white shadow p-4 flex items-center justify-center mr-4 border border-[#E7EBEE]"
                                >
                                  <img v-if="i.logo" :src="i.logo" alt="logo" />
                                  <p class="uppercase text-base" v-else>
                                    {{ i.title.slice(0, 2) }}
                                  </p>
                                </span>

                                <div>
                                  <p
                                    class="block truncate mb-1"
                                    :class="{
                                      'font-medium': selected,
                                      'font-normal': !selected,
                                    }"
                                  >
                                    {{ i.title }}
                                  </p>
                                  <p
                                    class="block truncate text-matta-black/80 text-sm"
                                  >
                                    {{ i.location }}
                                  </p>
                                </div>
                              </div>
                              <span
                                v-if="selected"
                                class="absolute inset-y-0 left-0 flex items-center pl-3"
                                :class="{
                                  'text-white': active,
                                  'text-teal-600': !active,
                                }"
                              >
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                              </span>
                            </li>
                          </ComboboxOption>
                        </ComboboxOptions>
                      </TransitionRoot>
                    </div>
                  </Combobox>
                  <div
                    class="text-red-500 mt-1"
                    v-for="error of v$.manufacturer.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="">
                <div class="mb-6">
                  <label
                    class="mb-2 font-medium text-sm text-[#344054] block text-left"
                  >
                    <span class="text-red-500 mr-[.5px]">*</span> Markets
                  </label>
                  <MultiInput
                    :markets="allmarkets"
                    :selectedmarkets="form.markets"
                    :applications="form.marketApplications"
                    :subapplications="form.marketSubapplications"
                    @getValue="getMarketValue"
                  />
                  <div
                    class="text-red-500 mt-1"
                    v-for="error of v$.markets.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                  <div
                    class="text-red-500 mt-1"
                    v-for="error of v$.marketApplications.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="">
                <div class="mb-6">
                  <label
                    class="mb-2 font-medium text-sm text-[#344054] block text-left"
                  >
                    <span class="text-red-500 mr-[.5px]">*</span> Applications
                  </label>
                  <MultiInput
                    :markets="technologies"
                    @getValue="getTechValue"
                    :selectedmarkets="form.technologies"
                    :applications="form.techApplications"
                    :subapplications="form.techSubApplications"
                  />
                  <div
                    class="text-red-500 mt-1"
                    v-for="error of v$.technologies.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                  <div
                    class="text-red-500 mt-1"
                    v-for="error of v$.techApplications.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-6">
                <label
                  class="mb-2 font-medium text-sm text-[#344054] text-left flex items-center"
                >
                  <span class="text-red-500 mr-[.5px]">*</span>
                  <span>Description </span>
                  <span
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Brief general information about the chemicals, its chemical composition, other names, important uses or any specificity"
                    class="cursor-pointer"
                  >
                    <AppIcon icon="quill:info" iconClass="text-gray-600" />
                  </span>
                </label>
                <textarea
                  v-model="v$.description.$model"
                  rows="3"
                  placeholder="Product description"
                  class="rounded-lg px-[14px] py-[10px] w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20 resize-none"
                ></textarea>
                <div
                  class="text-red-500 mt-1"
                  v-for="error of v$.description.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg text-error text-xs font-semibold">
                    {{ error.$message }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="border-[#F4F7FE] my-10" />
    <div
      class="flex gap-x-[56px] justify-start flex-col lg:flex-row gap-y-7 lg:gap-y-10"
    >
      <div class="w-[250px]">
        <h2 class="text-sm text-[#101828] font-semibold">
          Packages & Availability <span class="text-red-500 mr-[.5px]">*</span>
        </h2>
        <p class="text-xs text-[#475467]">Provide package information here.</p>
      </div>
      <div class="max-w-[654px] w-full">
        <div class="mb-6">
          <Listbox v-model="form.unit">
            <div class="relative mt-1">
              <ListboxButton
                class="relative w-[250px] text-left rounded-lg appearance-none px-[14px] py-[10px] flex items-center h-11 border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
              >
                <span class="block truncate">{{
                  measurements.find((i) => i.value == form.unit)?.name
                }}</span>
                <span class="right-0 pr-2 absolute"
                  ><AppIcon
                    icon="ph:caret-down-bold"
                    iconClass="h-4 w-4 text-[#667085]"
                    aria-hidden="true"
                /></span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="absolute mt-1 mx-h-60 w-[200px] z-40 overflow-auto rounded-[10px] bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ selected }"
                    v-for="i in measurements"
                    :key="i.name"
                    :value="i.value"
                    as="template"
                  >
                    <li
                      :class="[
                        'relative cursor-pointer  text-matta-black  hover:text-primary select-none py-2 pl-10 pr-4 text-left',
                      ]"
                    >
                      <span
                        :class="[selected ? 'font-medium' : 'font-normal']"
                        >{{ i.name }}</span
                      >
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>

          <div
            class="text-red-500 mt-1"
            v-for="error of v$.unit.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>

        <button
          type="button"
          class="bg-primary-500 text-white rounded-lg px-[14px] py-[10px] text-[11px] text-left leading-[normal] block"
          @click="handleAddingPackage"
        >
          <i class="uil uil-plus"></i> Add a package
        </button>
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.packagesAvailable.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
        <div
          class="border border-[#DCDEE6] rounded-[10px] overflow-hidden mt-6"
        >
          <table class="w-full">
            <thead>
              <tr>
                <th
                  v-for="(item, i) in headers"
                  :key="item"
                  class="text-[#475467] text-xs text-left font-medium border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
                >
                  {{ item }}
                </th>
              </tr>
            </thead>
            <tbody v-if="form.packagesAvailable?.length">
              <tr
                v-for="item in form.packagesAvailable"
                :key="item.id"
                class="border-b border-[#EAECF0] last:border-none"
              >
                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-6 whitespace-nowrap"
                >
                  {{ item?.package?.title }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-6 whitespace-nowrap"
                >
                  {{ item?.size }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-6 whitespace-nowrap"
                >
                  {{ currencyFormat(item?.amount) }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-6 whitespace-nowrap"
                >
                  {{ item?.color || "-" }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-6 whitespace-nowrap"
                >
                  {{ item?.purity || "-" }}{{ item?.purity && "%" }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-6 ] whitespace-nowrap"
                >
                  <span class="flex gap-x-4">
                    <span @click="removepackage(i)" class="cursor-pointer"
                      ><AppIcon icon="fa-trash-o" iconClass="text-[#E53F3F]"
                    /></span>
                    <!-- <span
                      ><AppIcon
                        icon="prime:pencil"
                        iconClass="text-[#475467]" /></span
                  >-->
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <EmptyData
            v-if="!form.packagesAvailable?.length"
            title="No package added yet"
            titleClass="text-xs !font-normal text-[#475467]"
            className="!h-auto py-6"
            classIcon="!text-3xl w-[120px]"
          />
        </div>
      </div>
    </div>
    <hr class="border-[#F4F7FE] my-10" />
    <div
      class="flex gap-x-[56px] justify-start flex-col lg:flex-row gap-y-7 lg:gap-y-10"
    >
      <div class="w-[250px]">
        <h2 class="text-sm text-[#101828] font-semibold">Gallery</h2>
        <p class="text-xs text-[#475467]">
          Upload pictures of your products here.
        </p>
      </div>
      <div class="max-w-[654px] w-full">
        <Uploader
          @onGetFiles="onGetFiles"
          @removeFile="removeFile"
          :isMultiple="true"
          :gallery="form.gallery"
          support="SVG, PNG, JPG or GIF (max. 800x400px)"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.gallery.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
        <div class="bg-white rounded-lg py-6 mt-6 flex gap-x-10 items-center">
          <label class="flex item-center leading-[normal]">
            <input
              type="checkbox"
              v-model="form.sampleAvailable"
              class="mr-2 accent-primary-500"
            /><span class="text-[#344054]"> Sample is available</span>
          </label>
          <label class="flex item-center leading-[normal]">
            <input
              type="checkbox"
              v-model="form.hideProduct"
              class="mr-2 accent-primary-500"
            />
            <span class="text-[#344054]">Hide product</span>
          </label>
          <label class="flex item-center leading-[normal]">
            <input
              type="checkbox"
              v-model="form.hidePrice"
              class="mr-2 accent-primary-500"
            />
            <span class="text-[#344054]">Hide price</span>
          </label>
        </div>
      </div>
    </div>
    <div
      class="bg-white flex justify-between gap-x-10 items-center sticky bottom-0 py-6 mt-10 border-t border-[#F4F7FE]"
    >
      <button
        type="button"
        @click="togglePreview"
        class="appearance-none leading-none px-5 lg:px-10 py-[10px] rounded-lg text-primary border-primary-500 text-primary-500 border hover:bg-gray-300 text-[13px]"
      >
        Preview
      </button>
      <div class="flex gap-x-4 items-center">
        <NuxtLink to="/storefront/products"
          ><button
            type="button"
            class="appearance-none leading-none px-5 lg:px-10 py-[10px] rounded-lg text-primary border-primary- border hover:bg-gray-300 text-[13px]"
          >
            Cancel
          </button></NuxtLink
        >
        <button
          :disabled="isLoading"
          :class="{
            'bg-primary/60 cursor-not-allowed': isLoading,
          }"
          type="submit"
          class="appearance-none leading-none px-6 lg:px-10 py-[10px] rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px]"
        >
          Next
        </button>
      </div>
    </div>
  </form>

  <div>
    <IndexModal
      :isOpen="isAddingPackage"
      @toggleModal="isAddingPackage = false"
    >
      <template #content>
        <form
          v-if="typeForm === 'producer'"
          class="bg-white px-4 pt-5 pb-8 sm:p-6 sm:pb-4 w-[500px] rounded-lg"
          @submit.prevent="handleProducer"
        >
          <div class="flex justify-between mb-8 items-center">
            <h4 class="font-medium text-matta-black text-xl">Add Producer</h4>
            <i
              class="uil uil-times cursor-pointer text-lg hover:ring-1 w-6 h-6 ring-gray-200 flex items-center justify-center hover:ring-offset-2 rounded-full"
              @click="isAddingPackage = false"
            ></i>
          </div>
          <div class="mb-5">
            <label class="mb-2 font-normal text-xs block"
              >Name <span class="text-red-500 pl-[.5px]">*</span></label
            >
            <input
              v-model="producerForm.title"
              class="rounded-lg px-[14px] py-3 h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
              placeholder="Enter producer name"
              required
            />
          </div>
          <div class="flex gap-x-6 mb-5">
            <div class="w-full">
              <label
                class="mb-2 font-medium text-sm text-[#344054] block text-left"
                >Country</label
              >
              <CountriesSelect v-model="producerForm.country" />
            </div>
            <div class="w-full">
              <label
                class="mb-2 font-medium text-sm text-[#344054] block text-left"
                >State</label
              >
              <StatesSelect v-model="producerForm.state" :states="states" />
            </div>
          </div>
          <div>
            <label
              class="mb-2 font-medium text-sm text-[#344054] block text-left"
              >Producer Logo</label
            >
            <label for="upload" class="cursor-pointer">
              <input
                @change="handleEvent($event)"
                type="file"
                accept="image/*"
                id="upload"
                class="hidden"
              />
              <div>
                <span
                  v-if="!producerForm.logo"
                  class="h-16 w-16 rounded-full flex items-center text-xs bg-[#F1F3F5] mr-4 justify-center"
                  >Logo</span
                >
                <img
                  v-else
                  :src="producerForm.logo"
                  class="h-16 w-16 rounded-full flex items-center bg-[#F1F3F5] mr-4 justify-center"
                />
              </div>
              <i
                class="fa fa-spinner fa-spin ml-6"
                v-if="isLoadingLogo"
                aria-hidden="true"
              ></i>
            </label>
          </div>

          <hr class="my-6" />
          <div class="flex justify-end gap-x-2 items-center mt-8">
            <button
              type="button"
              @click="isAddingPackage = false"
              class="appearance-none text-xs leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 uppercase"
            >
              Cancel
            </button>

            <button
              :disabled="isLoading"
              type="submit"
              class="appearance-none text-xs leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:opacity-70 uppercase disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </form>
        <PackageForm
          v-if="typeForm === 'package'"
          @close="isAddingPackage = false"
          :canClose="false"
        />
      </template>
    </IndexModal>
  </div>
</template>

<script setup>
import CurrencyInput from "~/components/CurrencyInput";
import {
  TransitionRoot,
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import PackageForm from "../AddProduct/PackageForm";
// import "vue-advanced-cropper/dist/style.css";

import useVuelidate from "@vuelidate/core";
import {
  required,
  maxLength,
  minValue,
  maxValue,
  helpers,
  or,
  integer,
  decimal,
} from "@vuelidate/validators";
import { toast } from "vue3-toastify";
import {
  addProduct,
  updateProduct,
  addproducer,
} from "~/services/productservices";
import Uploader from "~/components/UploadComponent";
import {
  CheckIcon,
  ChevronUpDownIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/solid";
import { useRoute, useRouter } from "vue-router";
import CountriesSelect from "~/components/forms/CountriesSelect";
import StatesSelect from "~/components/forms/StatesSelect";
import countries from "~/utils/countries.json";
import { uploadfile } from "~/services/onboardingservices";

const route = useRoute();
const router = useRouter();

// const queryParams = reactive({
//   Search: "",
//   PageSize: 10,
//   PageNumber: 1,
//   productId: route.query.id,
// });
const technologies = inject("technologies");
const allmarkets = inject("allmarkets");
const togglePreview = inject("togglePreview");
const producers = inject("producers");
const states = computed(() => {
  if (!producerForm.country) return [];
  return (
    countries.find(
      (item) => producerForm.country.toLowerCase === item.name.toLowerCase()
    ).states || []
  );
});

const producerForm = reactive({
  title: "",
  location: "",
  country: "",
  state: "",
  logo: "",
});

function getTechValue(data) {
  form.technologies = data.selectedmarkets;
  form.techApplications = data.applications;
  form.techSubApplications = data.subapplications;
}
function getMarketValue(data) {
  form.markets = data.selectedmarkets;
  form.marketApplications = data.applications;
  form.marketSubapplications = data.subapplications;
}
const isAddingPackage = ref(false);
const isLoading = ref(false);
const selectedMeasurement = ref(measurements[0]);
// const newpackage = ref("");
let query = ref("");

let filteredProducers = computed(() =>
  query.value === ""
    ? producers.value
    : producers.value.filter((i) =>
        i.title
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);

const form = inject("form");
const headers = computed(() => [
  "name",
  `size (${form.unit})`,
  `price / ${form.unit}`,
  "color",
  "purity",
  "",
]);

const rules = {
  name: {
    required,
    maxLength: maxLength(100),
  },
  manufacturer: {
    required: helpers.withMessage("Select a prodicer", required),
  },
  markets: {
    required: helpers.withMessage("Select a market", required),
  },
  marketApplications: {
    required: helpers.withMessage("Select a market application", required),
  },
  techApplications: {
    required: helpers.withMessage("Select a Sub-application", required),
  },
  technologies: {
    required: helpers.withMessage("Select an application", required),
  },
  description: {
    maxLength: maxLength(400),
  },
  unit: { required },
  productBrandName: { maxLength: maxLength(100) },
  packagesAvailable: {
    required:helpers.withMessage("At least 1 package is required", required),
  },
  gallery: {
    required: helpers.withMessage("At least 1 imaage is required", required),
  },
};
// const index = ref(null);
const invalidCredentials = ref(false);
const v$ = useVuelidate(rules, form);

watch(
  () => form.unit,
  () => {
    if (!form && !form.packagesAvailable) return;
    form.packagesAvailable = form.packagesAvailable.map((i) => {
      i.unit = form.unit;
      return i;
    });
  }
);
function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
const isLoadingLogo = ref(false);
function handleEvent(e) {
  isLoadingLogo.value = true;
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;

  const file = files[0];

  // Check file type
  if (!file.type.startsWith("image/")) {
    toast.error("Please upload an image file.");
    isLoadingLogo.value = false;
    return;
  }

  // Check file size (in bytes)
  const maxSize = 800 * 1024; // 800 KB
  if (file.size > maxSize) {
    toast.error("File size exceeds the limit (800 KB).");
    isLoadingLogo.value = false;
    return;
  }

  if (producerForm.logo) {
    URL.revokeObjectURL(producerForm.logo);
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    const base64String = reader.result;

    uploadfile({
      base64: base64String.replace(/^data:image\/[a-z]+;base64,/, ""),
    })
      .then((res) => {
        producerForm.logo = res.data.message;
        isLoadingLogo.value = false;
      })
      .catch(() => {
        isLoadingLogo.value = false;
      });
  };
}
function removepackage(val) {
  form.packagesAvailable.splice(val, 1);
}
async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;
  if (route.query.id) {
    updateProduct(form)
      .then((res) => {
        if (res.status === 200) {
          toast.info("Information saved", {
            position: "bottom",
            duration: 4000,
          });
          router.push(
            `/storefront/products/edit-product?id=${route.query.id}&stage=2`
          );
        }
      })

      .catch((err) => {
        invalidCredentials.value = true;
        isLoading.value = false;

        toast.error(err.response.data.message || err.response.data.Message);
      });
  } else {
    addProduct(form)
      .then((res) => {
        if (res.status === 200) {
          toast.info("Information saved", {
            position: "bottom",
            duration: 4000,
          });
          router.push(
            `/storefront/products/add-product?id=${res.data.data.item_id}&stage=2`
          );
        }
      })

      .catch((err) => {
        invalidCredentials.value = true;
        isLoading.value = false;

        toast.error(err.response.data.message || err.response.data.Message);
      });
  }
}
function onGetFiles(file) {
  form.gallery = [...form.gallery, file];
}
function removeFile(id) {
  form.gallery.splice(id, 1);
}

function addnewpackage() {
  form.packagesAvailable.push({
    package: {
      id: create_UUID(),
      title: "",
    },
    unit: selectedMeasurement.value.value,
    size: null,
    amount: null,
    isAvailable: true,
    color: "",
    purity: "",
  });
}
const getProducers = inject("getProducers");
function handleProducer() {
  isLoading.value = true;
  producerForm.location = `${producerForm.state}, ${producerForm.country}`;
  addproducer(producerForm).then((res) => {
    if (res.status == 200) {
      getProducers();
      form.manufacturer = producerForm.title;
      producerForm.title = "";
      producerForm.location = "";
      producerForm.country = "";
      producerForm.state = "";
      isAddingPackage.value = false;
      isLoading.value = false;
    }
  });
}
const typeForm = ref("");
function handleAddingProducer() {
  typeForm.value = "producer";
  isAddingPackage.value = true;
}
function handleAddingPackage() {
  typeForm.value = "package";
  isAddingPackage.value = true;
}
provide("images", form.gallery);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
