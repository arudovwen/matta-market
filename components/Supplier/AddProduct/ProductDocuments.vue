<template>
  <form class="px-4 lg:px-[30px]" @submit.prevent="handleSubmit">

    <div class="mb-10 max-w-[654px] ">
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
          class="text-xs text-primary-500 font-medium"
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
    </div>

    <div
      class="flex gap-x-[56px] justify-start flex-col lg:flex-row gap-y-7 lg:gap-y-10 mb-10"
    >
      <div class="w-full lg:w-[250px]">
        <h2 class="text-sm text-[#101828] font-semibold mb-[2px]">
          Packages & Availability <span class="text-red-500 mr-[.5px]">*</span>
        </h2>
        <p class="text-xs text-[#475467]">Provide package information here.</p>
      </div>
      <div class="max-w-[654px] w-full">
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
                <!-- <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-4 whitespace-nowrap"
                >
                  {{ currencyFormat(item?.amount) }}
                </td> -->
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
                    <span @click="removepackage(i)" class="cursor-pointer">
                      <AppIcon icon="fa-trash-o" iconClass="text-[#E53F3F]" />
                    </span>
                    <span @click="editPackage(item)" class="cursor-pointer">
                      <AppIcon icon="prime:pencil" iconClass="text-[#475467]" />
                    </span>
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

    
      <div
        class="flex gap-x-[56px] justify-start text-left flex-col lg:flex-row gap-y-7 lg:gap-y-10"
      >
        <div class="lg:w-[250px] text-left">
          <h2 class="text-sm text-[#101828] font-semibold mb-[2px]">
            Product documents
          </h2>
          <p class="mb-5 flex items-center text-xs">
            Please attach the manufacturer's MSDS, COA, and TDS here and
            indicate the document type.
          </p>
        </div>

        <div class="max-w-[654px] w-full">
          <Uploader @onGetFiles="onGetFiles" :isMultiple="true" type="doc" />
          <div
            class="bg-white py-6 lg:py-8 rounded-lg"
            v-if="form.documents.length"
          >
            <div class="">
              <div
                class="flex items-center gap-x-4 mb-3"
                v-for="(n, id) in form.documents"
                :key="id"
              >
                <div class="border rounded-xl p-4 flex flex-1 justify-between">
                  <div class="flex gap-x-3 items-center">
                    <img
                      src="~/assets/images/filetype.png"
                      alt="prduct"
                      class="w-8 h-auto"
                    />
                    <div>
                      <p
                        class="text-sm text-matta-black capitalize truncate max-w-[250px]"
                      >
                        {{ n.fileName }}
                      </p>
                      <p class="text-xs text-[#ABABAB]">{{ n.size }}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-x-5 text-xs relative">
                    <div class="absolute -bottom-2 -right-2">
                      <Listbox v-model="n.category">
                        <div class="relative mt-1">
                          <ListboxButton
                            class="relative text-left flex gap-x-6 items-center rounded-lg pl-[14px] pr-4 placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                          >
                            <span
                              class="mr-2 capitalize max-w-[130px] truncate"
                              v-if="n.category"
                              >{{ n.category }}</span
                            >
                            <span
                              class="text-matta-black mr-2 whitespace-nowrap"
                              v-else
                              >Select category</span
                            >
                            <span
                              class="pointer-events-none absolute inset-y-0 -right-1 flex items-center"
                            >
                              <ChevronUpDownIcon
                                class="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </ListboxButton>

                          <transition
                            leave-active-class="transition duration-100 ease-in"
                            leave-from-class="opacity-100"
                            leave-to-class="opacity-0"
                          >
                            <ListboxOptions
                              class="absolute mt-1 mx-h-60 w-[250px] z-40 overflow-auto rounded-md bg-white py-4 text-base shadow-lg focus:outline-none sm:text-sm"
                            >
                              <ListboxOption
                                v-slot="{ selected }"
                                v-for="(p, i) in form.documentproperties"
                                :key="i"
                                :value="p.value"
                                as="template"
                              >
                                <li
                                  :class="[
                                    selected
                                      ? 'text-blue-800 bg-blue-50'
                                      : 'font-normal text-matta-black',
                                    'relative cursor-pointer capitalize text-matta-black  hover:text-primary select-none py-2 pl-6 pr-4 text-left',
                                  ]"
                                >
                                  <div class="flex gap-x-4 items-start">
                                    <div>
                                      <p class="text-sm font-medium">
                                        {{ p.text }}
                                      </p>
                                      <p class="text-xs">{{ p.item }}</p>
                                    </div>
                                    <i
                                      class="uil uil-check text-blue-800"
                                      v-if="selected"
                                    ></i>
                                  </div>
                                </li>
                              </ListboxOption>
                              <p
                                v-if="!form.documentproperties.length"
                                class="text-[#B6B7B9] py-2 pl-6 pr-4 text-sm"
                              >
                                Nothing found
                              </p>
                            </ListboxOptions>
                          </transition>
                        </div>
                      </Listbox>
                    </div>
                    <span
                      @click="removeFile(id)"
                      class="text-sm absolute -top-3 -right-2 z-10 text-[#475467] cursor-pointer"
                    >
                      <AppIcon icon="fa:trash-o" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="border-[#F4F7FE] my-10" />
      <div
        class="bg-white rounded-lg flex justify-between gap-x-4 items-center"
      >
        <!-- <button
        type="button"
        @click="togglePreview"
        class="appearance-none leading-none px-5 lg:px-10px-10 py-[10px] rounded-lg text-primary border-primary text-primary border hover:bg-gray-300 text-[13px]"
      >
        Preview
      </button>
      <div class="flex justify-center gap-x-3 lg:gap-x-4 items-center"> -->
        <!-- </div> -->
      </div>
    

    <hr class="border-[#F4F7FE] my-10" />

    <div
      class="bg-white rounded-lg py-6 flex justify-between gap-x-10 items-center"
    >
      <!-- <button
        type="button"
        @click="togglePreview"
        class="appearance-none leading-none px-10 py-[10px] rounded-lg text-primary border-primary  border hover:bg-gray-300 text-[13px]"
      >
        Preview
      </button>
      <div class="flex justify-center gap-x-4 items-center"> -->
      <button
        type="button"
        @click="toggleNext(1)"
        class="appearance-none leading-none px-10 py-[10px] rounded-lg text-primary border-primary- border hover:bg-gray-300 text-[13px]"
      >
        Back
      </button>
      <button
        :disabled="isLoading || v$.$silentErrors.length"
        :class="{
          'opacity-60 cursor-not-allowed': isLoading,
        }"
        type="submit"
        class="appearance-none leading-none px-5 lg:px-10px-10 py-[10px] rounded-lg text-white bg-primary-500 disabled:opacity-50 text-[13px]"
      >
      {{ isLoading ? "Saving..." : "Save and continue" }}
      </button>
      <!-- </div> -->
    </div>
  </form>
  <div>
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
        <EditForm @close="getData()" />
      </div>
    </template>
  </ModalCenter>
</template>

<script setup>
import { ref, provide, onMounted, inject, computed, reactive } from "vue";
import countries from "~/utils/countries.json";
import EmptyData from "~/components/EmptyData.vue";
// import FeaturedProp from "./FeaturedProp.vue";
import {
  updateProperties,
  updateProduct,
  updateDocuments,
} from "~/services/productservices";
import { uploadfile } from "~/services/onboardingservices";
import { useRoute, useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { getallpickuplocations } from "~/services/cartservice";
import VueSelect from "~/components/Select/VueSelect.vue";
import ModalCenter from "~/components/Modal/Center.vue";
import Modal from "~/components/IndexModal.vue";
import PackageForm from "./PackageForm.vue";
import CountriesSelect from "~/components/forms/CountriesSelect.vue";
import StatesSelect from "~/components/forms/StatesSelect.vue";
import { addproducer } from "~/services/productservices";
import AppIcon from "~/components/AppIcon.vue";
import Uploader from "~/components/UploadComponent.vue";
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";
import { toast } from "vue3-toastify";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { helpers, required } from "@vuelidate/validators";
import EditForm from "~/components/Checkout/pickup/EditForm.vue";

const route = useRoute();
const router = useRouter();
const toggleNext = inject("toggleNext");
const locations = ref([]);
const isLocationOpen = ref(false);
const headers = computed(() => [
  "Name",
  `Package Size`,
  `Unit Price`,
  "Appearance",
  "Purity & Grade",
  "",
]);
const form = inject("form");
const rules = {
  pickUpLocationId: {
    required,
  },
  packagesAvailable: {
    required: helpers.withMessage("At least 1 package is required", required),
  },
};
const v$ = useVuelidate(rules, form);

onMounted(() => {
  getData();
  form.productId = route.query.id;
});

const isLoading = ref(false);

const states = computed(() => {
  if (!producerForm.country) return [];
  return (
    countries.find(
      (item) => producerForm.country.toLowerCase() === item.name.toLowerCase()
    ).states || []
  );
});

function handleProducer() {
  isLoading.value = true;
  producerForm.location = `${producerForm.state}, ${producerForm.country}`;
  addproducer(producerForm)
    .then((res) => {
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
    })
    .catch((err) => {
      isLoading.value = false;

      toast.error(err.response.data.message || err.response.data.Message);
    });
}

function addProperty(val) {
  form.properties.push(val);
}
function addPropertyValue(val) {
  form.propertyValueList.push(val.name);
}
provide("addPropertyValue", addPropertyValue);
provide("addProperty", addProperty);

async function handleSubmit() {
  const validity = await v$.value.$validate();
  const invalidCredentials = ref(null);
  if (!validity) return;
  isLoading.value = true;

  updateProduct(form)
    .then((res) => {
      if (res.status === 200) {
        updateDocuments(form)
          .then((res) => {
            if (res.status === 200) {
              updateProperties(form)
                .then((res) => {
                  if (res.status === 200) {
                    toast.info("Information saved", {
                      position: "bottom",
                      duration: 4000,
                    });
                    isLoading.value = false;
                    router.push(
                      `/storefront/products/${route.params.process}?id=${route.query.id}&stage=3`
                    );
                  }
                })
                .catch((err) => {
                  isLoading.value = false;

                  toast.error(err.response.data.Message, {
                    position: "bottom",
                  });
                });
            }
          })

          .catch((err) => {
            isLoading.value = false;

            toast.error(err.response.data.Message, {
              position: "bottom",
            });
          });
      }
    })

    .catch((err) => {
      invalidCredentials.value = true;
      isLoading.value = false;

      toast.error(err.response.data.message || err.response.data.Message);
    });
}

function onGetFiles(file) {
  form.documents = [
    ...form.documents,
    {
      id: 0,
      category: "",
      fileName: file.fileName,
      file: file.url,
      size: file.size,
      fileSize: file.fileSize,
      documentUrl: file.url,
    },
  ];
}
function removeFile(id) {
  form.documents.splice(id, 1);
}

function editPackage(val) {
  typeForm.value = "package";
  detail.value = val;
  isAddingPackage.value = true;
}

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

const producerForm = reactive({
  title: "",
  location: "",
  country: "",
  state: "",
  logo: "",
});

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

const typeForm = ref("");
const isAddingPackage = ref(false);
const isLoadingLogo = ref(false);
const detail = ref(null);
const getProducers = inject("getProducers");
// const currencyFormat = inject("currencyFormat");

function removepackage(val) {
  form.packagesAvailable.splice(val, 1);
}

function handleAddingPackage() {
  typeForm.value = "package";
  isAddingPackage.value = true;
}

provide("form", form);
provide("v$", v$);
provide("images", form.gallery);
provide("isOpen", isLocationOpen);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
