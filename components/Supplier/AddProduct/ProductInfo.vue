<template>
  <form class="px-4 md:px-[30px] text-left" @submit.prevent="handleSubmit">
    <div class="flex gap-x-[56px] justify-start flex-col lg:flex-row gap-y-7 lg:gap-y-10">
      <div class="text-left w-[250px]">
        <h2 class="text-sm text-[#101828] font-semibold">Product info</h2>
        <p class="text-xs text-[#475467]">Add your product details here.</p>
      </div>
      <div class="max-w-[654px] w-full">
        <div class="">
          <div>
            <div>
              <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4">
                <div class="mb-6">
                  <label for="" class="mb-2 font-medium text-sm text-[#344054] block text-left capitalize">
                    <span class="text-red-500 mr-[.5px]">*</span> Product
                    generic name
                  </label>
                  <input v-model="v$.name.$model"
                    class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                    autocomplete="off" autofocus="on" placeholder="" />
                  <div class="text-red-500 mt-1" v-for="error of v$.name.$errors" :key="error.$uid">
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>
                <div class="mb-6">
                  <label for="" class="mb-2 font-medium text-sm text-[#344054] block text-left capitalize">
                    Product brand name
                  </label>

                  <div class="flex relative items-center">
                    <input v-model="v$.productBrandName.$model"
                      class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                      placeholder="" />
                  </div>
                  <div class="text-red-500 mt-1" v-for="error of v$.productBrandName.$errors" :key="error.$uid">
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="">
                <div class="mb-6">
                  <label for="" class="mb-2 font-medium text-sm text-[#344054] block text-left">
                    <span class="text-red-500 mr-[.5px]">*</span> Producer
                  </label>

                  <Combobox v-model="form.manufacturer">
                    <div class="relative mt-1">
                      <div
                        class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <ComboboxInput
                          class="px-[14px] py-[10px] h-11 rounded-lg w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                          :displayValue="(i) => i" @change="query = $event.target.value"
                          placeholder="Type a producer name" />
                        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                          <span>
                            <AppIcon icon="ph:caret-down-bold" iconClass="h-4 w-4 text-[#667085]" aria-hidden="true" />
                          </span>
                        </ComboboxButton>
                      </div>
                      <TransitionRoot leave="transition ease-in duration-100" leaveFrom="opacity-100"
                        leaveTo="opacity-0" @after-leave="query = ''">
                        <ComboboxOptions
                          class="absolute mt-1 max-h-80 md:min-w-[350px] px-3 overflow-y-auto rounded-lg z-40 bg-white py-4 text-base shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)] border border-[#DCDEE6] sm:text-sm">
                          <div v-if="
                            filteredProducers.length === 0 && query !== ''
                          " class="relative cursor-default select-none py-2 px-4 text-gray-700">
                            <p class="mb-2">Nothing found.</p>
                            <hr class="my-4" />
                            <div class="flex justify-end">
                              <button @click="handleAddingProducer" type="button"
                                class="appearance-none text-xs leading-none px-6 py-3 rounded-lg text-white bg-primary hover:opacity-70 uppercase">
                                Add new
                              </button>
                            </div>
                          </div>
                          <ComboboxOption v-for="i in filteredProducers" as="template" :key="i.id" :value="i.title"
                            v-slot="{ selected, active }">
                            <li class="relative cursor-default select-none py-2">
                              <div class="flex items-center gap-x-4">
                                <span
                                  class="h-11 w-12 rounded-lg bg-white shadow p-4 flex items-center justify-center mr-4 border border-[#E7EBEE]">
                                  <img v-if="i.logo" :src="i.logo" alt="logo" />
                                  <p class="uppercase text-base" v-else>
                                    {{ i.title.slice(0, 2) }}
                                  </p>
                                </span>

                                <div>
                                  <p class="block truncate mb-1" :class="{
                                    'font-medium': selected,
                                    'font-normal': !selected,
                                  }">
                                    {{ i.title }}
                                  </p>
                                  <p class="block truncate text-matta-black/80 text-sm">
                                    {{ i.location }}
                                  </p>
                                </div>
                              </div>
                              <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3" :class="{
                                'text-white': active,
                                'text-teal-600': !active,
                              }">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                              </span>
                            </li>
                          </ComboboxOption>
                        </ComboboxOptions>
                      </TransitionRoot>
                    </div>
                  </Combobox>
                  <div class="text-red-500 mt-1" v-for="error of v$.manufacturer.$errors" :key="error.$uid">
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="">
                <div class="mb-6">
                  <label for="" class="mb-2 font-medium text-sm text-[#344054] block text-left">
                    <span class="text-red-500 mr-[.5px]">*</span> Markets
                  </label>
                  <MultiInput :markets="allmarkets" :selectedmarkets="form.markets"
                    :applications="form.marketApplications" :subapplications="form.marketSubapplications"
                    @getValue="getMarketValue" />
                  <div class="text-red-500 mt-1" v-for="error of v$.markets.$errors" :key="error.$uid">
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                  <div class="text-red-500 mt-1" v-for="error of v$.marketApplications.$errors" :key="error.$uid">
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="">
                <div class="mb-6">
                  <label for="" class="mb-2 font-medium text-sm text-[#344054] block text-left">
                    <span class="text-red-500 mr-[.5px]">*</span> Applications
                  </label>
                  <MultiInput :markets="technologies" @getValue="getTechValue" :selectedmarkets="form.technologies"
                    :applications="form.techApplications" :subapplications="form.techSubApplications" />
                  <div class="text-red-500 mt-1" v-for="error of v$.technologies.$errors" :key="error.$uid">
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                  <div class="text-red-500 mt-1" v-for="error of v$.techApplications.$errors" :key="error.$uid">
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="mb-6">
                <label
                  for=""
                  class="mb-2 font-medium text-sm text-[#344054] text-left flex items-center gap-x-1"
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
              </div> -->
              <!-- <div class="mb-6">
                <label
                  for=""
                  class="mb-2 font-medium text-sm text-[#344054] text-left flex items-center gap-x-1"
                >
                  <span>Pickup location </span>
                </label>

                <VueSelect
                  v-model="v$.pickUpLocationId.$model"
                  :options="locations"
                  :reduce="(location) => location.value"
                  placeholder="Select location"
                  :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer border-[#D0D5DD]`"
                />
                <div class="flex justify-start mt-1">
                  <button
                    @click="isLocationOpen = true"
                    class="text-xs text-primary font-medium"
                    type="button"
                  >
                    + Add a new location
                  </button>
                </div>
                <div
                  class="text-red-500 mt-1"
                  v-for="error of v$.pickUpLocationId.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg text-error text-xs font-semibold">
                    {{ error.$message }}
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="border-[#F4F7FE] my-10" />
    <!-- <div
      class="flex gap-x-[56px] justify-start flex-col lg:flex-row gap-y-7 lg:gap-y-10"
    >
      <div class="w-[250px]">
        <h2 class="text-sm text-[#101828] font-semibold">
          Packages & Availability <span class="text-red-500 mr-[.5px]">*</span>
        </h2>
        <p class="text-xs text-[#475467]">Provide package information here.</p>
      </div>
      <div class="max-w-[654px] w-full">
        <button
          type="button"
          class="bg-primary text-white rounded-lg px-[14px] py-[10px] text-[11px] text-left leading-[normal] block"
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
        <div class="border border-[#DCDEE6] rounded-[10px] mt-6">
          <table class="w-full">
            <thead>
              <tr>
                <th
                  v-for="(item, i) in headers"
                  :key="item + i"
                  class="text-[#475467] text-xs text-left font-medium border-b py-3 px-4 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB] rounded-t-[10px]"
                >
                  {{ item }}
                </th>
              </tr>
            </thead>
            <tbody v-if="form.packagesAvailable?.length">
              <tr
                v-for="item in form.packagesAvailable"
                :key="item.id"
                class="border-b border-[#EAECF0] last:border-none last:rounded-b-[10px]"
              >
                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-4 whitespace-nowrap"
                >
                  {{ item?.package?.title }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-4 whitespace-nowrap"
                >
                  {{ item?.size }}{{ item?.unit }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-4 whitespace-nowrap"
                >
                  {{ currencyFormat(item?.purchaseAmount) }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-4 whitespace-nowrap"
                >
                  {{ currencyFormat(item?.amount) }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-4 whitespace-nowrap"
                >
                  {{ item?.color || "-" }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-4 whitespace-nowrap"
                >
                  {{ item?.purity || "-" }}{{ item?.purity && "%" }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-6 ] whitespace-nowrap"
                >
                  <span class="flex gap-x-5">
                    <span @click="removepackage(i)" class="cursor-pointer"
                      ><AppIcon icon="fa-trash-o" iconClass="text-[#E53F3F]"
                    /></span>
                    <span @click="editPackage(item)" class="cursor-pointer"
                      ><AppIcon icon="prime:pencil" iconClass="text-[#475467]"
                    /></span>
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
    </div> -->
    <hr class="border-[#F4F7FE] my-10" />
    <div class="flex gap-x-[56px] justify-start flex-col lg:flex-row gap-y-7 lg:gap-y-10">
      <div class="w-[250px]">
        <h2 class="text-sm text-[#101828] font-semibold">Gallery</h2>
        <p class="text-xs text-[#475467]">
          Upload pictures of your products here.
        </p>
      </div>
      <div class="max-w-[654px] w-full">
        <Uploader @onGetFiles="onGetFiles" @removeFile="removeFile" :isMultiple="true" :gallery="form.gallery"
          support="SVG, PNG, JPG or GIF (max. 800x400px)" />
        <div class="text-red-500 mt-1" v-for="error of v$.gallery.$errors" :key="error.$uid">
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
        <!-- <div
          class="bg-white rounded-lg py-6 mt-6 flex flex-col lg:flex-row gap-x-10 justify-start lg:items-center gap-y-2 lg:gap-y-0"
        >
          <label for="" class="flex item-center leading-[normal]">
            <input
              type="checkbox"
              v-model="form.sampleAvailable"
              class="mr-2 accent-primary"
            /><span class="text-[#344054]"> Sample is available</span>
          </label>
          <label for="" class="flex item-center leading-[normal]">
            <input
              type="checkbox"
              v-model="form.hideProduct"
              class="mr-2 accent-primary"
            />
            <span class="text-[#344054]">Hide product</span>
          </label>
          <label for="" class="flex item-center leading-[normal]">
            <input
              type="checkbox"
              v-model="form.hidePrice"
              class="mr-2 accent-primary"
            />
            <span class="text-[#344054]">Hide price</span>
          </label>
        </div> -->
      </div>
    </div>

    <div
      class="bg-white flex justify-between gap-x-10 items-center sticky bottom-0 py-6 mt-10 border-t border-[#F4F7FE]">
      <router-link to="/products"><button type="button"
          class="appearance-none leading-none px-5 lg:px-10 py-[10px] rounded-lg text-primary border-primary border hover:bg-gray-300 text-[13px]">
          Cancel
        </button></router-link>
      <button :disabled="isLoading" :class="{
        'bg-primary/60 cursor-not-allowed': isLoading,
      }" type="submit"
        class="bg-[#165EF0] text-white rounded-[5px] px-[24px] py-[9px] flex gap-x-1 items-center font-semibold">
        Save and Continue
      </button>
    </div>
  </form>

  <!-- <div>
    <Modal
      :isOpen="isAddingPackage"
      @toggleModal="isAddingPackage = false"
      :canClose="false"
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
            <label for="" class="mb-2 font-normal text-xs block"
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
                for=""
                class="mb-2 font-medium text-sm text-[#344054] block text-left"
                >Country</label
              >
              <CountriesSelect v-model="producerForm.country" />
            </div>
            <div class="w-full">
              <label
                for=""
                class="mb-2 font-medium text-sm text-[#344054] block text-left"
                >State</label
              >
              <StatesSelect v-model="producerForm.state" :states="states" />
            </div>
          </div>
          <div>
            <label
              for=""
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
              class="appearance-none text-xs leading-none px-8 py-3 rounded-lg text-white bg-primary hover:opacity-70 uppercase disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </form>
        <PackageForm
          v-if="typeForm === 'package'"
          @close="
            () => {
              isAddingPackage = false;
              detail = null;
            }
          "
          :detail="detail"
        />
      </template>
</Modal>
</div>
<ModalCenter>
  <template #default>
      <div class="w-full max-w-max p-6 md:py-9 md:px-10 z-[999] relative">
        <CheckoutPickupAddForm @close="getData()" />
      </div>
    </template>
</ModalCenter> -->
</template>

<script setup>
import {
  TransitionRoot,
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/vue";
import {
  ref,
  reactive,
  computed,
  provide,
  onMounted,
  inject,
  watch,
} from "vue";
import useVuelidate from "@vuelidate/core";
import { required, maxLength, helpers } from "@vuelidate/validators";
import { toast } from 'vue3-toastify';
import {
  updateProduct,
  addProduct,
  getMarkets,
} from "@/services/productservices";
import { getallpickuplocations } from "@/services/cartservice";
import Uploader from "@/components/UploadComponent.vue";
import { CheckIcon } from "@heroicons/vue/24/solid";
import { useRoute, useRouter } from "vue-router";
import AppIcon from "@/components/AppIcon.vue";
import MultiInput from "~/components/MultiInput.vue";

const isLocationOpen = ref(false);
const locations = ref([]);
// const toast = useToast();
const route = useRoute();
const router = useRouter();
const queryParams = reactive({
  Search: "",
  PageSize: 10,
  PageNumber: 1,
  productId: route.query.id,
});
const technologies = inject("technologies");
const markets = ref([]);
const form = inject("form");
// const togglePreview = inject("togglePreview");
const allmarkets = inject("allmarkets");
const producers = inject("producers");
function getData() {
  getallpickuplocations(route.params.SellerId).then((res) => {
    if (res.status === 200) {
      locations.value = res.data.data.map((i) => ({
        label: i.address,
        value: i.id,
      }));
    }
  });
}
onMounted(() => {
  getData();
  getMarkets(queryParams).then((res) => {
    markets.value = res.data.data;
    form.productId = route.query.id;
  });
});

const isAddingPackage = ref(false);
const isLoading = ref(false);

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

const rules = {
  name: {
    required,
    maxLength: maxLength(100),
  },
  manufacturer: {
    required: helpers.withMessage("Select a producer", required),
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
  productBrandName: { maxLength: maxLength(100) },
  gallery: {
    required: helpers.withMessage("At least 1 image is required", required),
  },
};
// const index = ref(null);
const invalidCredentials = ref(false);
const v$ = useVuelidate(rules, form);

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
            `/storefront/products/${route.params.process}?id=${route.query.id}&stage=2`
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
            `/storefront/products/${route.params.process}?id=${res.data.data.item_id}&stage=2`
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

const typeForm = ref("");
function handleAddingProducer() {
  typeForm.value = "producer";
  isAddingPackage.value = true;
}
provide("images", form.gallery);
provide("isOpen", isLocationOpen);
</script>
