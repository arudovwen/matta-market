<!-- eslint-disable no-useless-escape -->
<template>
  <form
    @submit.prevent="handleSubmit"
    v-if="active === 1"
    class="px-4 lg:px-[30px]"
  >
    <div
      class="flex gap-x-[76px] pt-[30px] justify-start flex-col lg:flex-row gap-y-7 lg:gap-y-0"
    >
      <div class="w-[250px]">
        <h2 class="text-sm text-[#101828] font-semibold">
          Company Information
        </h2>
        <p class="text-xs text-[#475467]">Update your details here.</p>
      </div>
      <div class="">
        <!-- Top bar   -->
        <div class="md:max-w-[560px]">
          <div class="">
            <div
              class="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-10 gap-y-8"
            >
              <div class="flex items-center gap-x-6">
                <span>
                  <label for="upload">
                    <span
                      v-if="!image"
                      class="h-[64px] w-[64px] rounded-full flex items-center text-xs bg-[#F1F3F5] justify-center"
                      ><i class="uil uil-image text-4xl text-gray-400"></i>
                    </span>
                    <img
                      v-else
                      :src="image"
                      class="h-[64px] w-[64px] rounded-full flex items-center bg-[#F1F3F5] justify-center"
                    />
                    <input
                      @change="handleEvent($event)"
                      type="file"
                      accept="image/*"
                      id="upload"
                      class="hidden"
                    />
                  </label>
                </span>
                <span>
                  <p class="text-xs lg:text-sm font-medium text-[#475467]">
                    Upload Company logo
                  </p>

                  <div
                    class="text-red-500 mt-1"
                    v-for="error of v$.logo.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                </span>
              </div>
            </div>
            <div>
              <div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div class="mb-6">
                    <label
                      class="mb-2 font-medium text-sm text-[#344054] block"
                    >
                      Company name
                      <span class="text-red-500 pl-[.02rem]">*</span></label
                    >
                    <input
                      v-model="v$.companyName.$model"
                      :class="{ 'border-red-500': v$.companyName.$error }"
                      class="rounded-lg px-[14px] py-[10px] h-11 text-sm w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                      autocomplete="off"
                      autofocus="on"
                      placeholder=""
                    />
                    <div
                      class="text-red-500 mt-1"
                      v-for="error of v$.companyName.$errors"
                      :key="error.$uid"
                    >
                      <div class="error-msg text-error text-xs font-semibold">
                        {{ error.$message }}
                      </div>
                    </div>
                  </div>
                  <div class="mb-6">
                    <label class="mb-2 font-medium text-sm text-[#344054] block"
                      >Date Of Incorporation
                      <span class="text-red-500 pl-[.02rem]">*</span></label
                    >
                    <input
                      v-model="v$.dateOfIncorporation.$model"
                      :class="{
                        'border-red-500': v$.dateOfIncorporation.$error,
                      }"
                      class="px-[14px] py-[10px] h-11 text-sm rounded-lg w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                      type="date"
                    />
                    <div
                      class="text-red-500 mt-1"
                      v-for="error of v$.dateOfIncorporation.$errors"
                      :key="error.$uid"
                    >
                      <div class="error-msg text-error text-xs font-semibold">
                        {{ error.$message }}
                      </div>
                    </div>
                  </div>

                  <div class="mb-6">
                    <label class="mb-2 font-medium text-sm text-[#344054] block"
                      >Business type
                      <span class="text-red-500 pl-[.02rem]">*</span></label
                    >

                    <div class="flex relative items-center">
                      <select
                        v-model="v$.companyType.$model"
                        :class="{ 'border-red-500': v$.companyType.$error }"
                        class="appearance-none rounded-lg px-[14px] py-[10px] h-11 text-sm w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                      >
                        <option disabled value="">Select sector</option>
                        <option
                          v-for="item in businessTypesOptions"
                          :key="item.label"
                          :value="item.value"
                        >
                          {{ item.label }}
                        </option>
                      </select>
                      <i
                        class="uil uil-angle-down absolute right-2 pointer-events-none"
                      ></i>
                    </div>
                    <div
                      class="text-red-500 mt-1"
                      v-for="error of v$.companyType.$errors"
                      :key="error.$uid"
                    >
                      <div class="error-msg text-error text-xs font-semibold">
                        {{ error.$message }}
                      </div>
                    </div>
                  </div>
                  <div class="mb-6">
                    <label class="mb-2 font-medium text-sm text-[#344054] block"
                      >Business sector
                      <span class="text-red-500 pl-[.02rem]">*</span></label
                    >

                    <div class="flex relative items-center">
                      <select
                        v-model="v$.sector.$model"
                        :class="{ 'border-red-500': v$.sector.$error }"
                        class="appearance-none rounded-lg px-[14px] py-[10px] h-11 text-sm w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                      >
                        <option disabled value="">Select sector</option>
                        <option
                          v-for="item in sectorOptions"
                          :key="item.label"
                          :value="item.value"
                        >
                          {{ item.label }}
                        </option>
                      </select>
                      <i
                        class="uil uil-angle-down absolute right-2 pointer-events-none"
                      ></i>
                    </div>
                    <div
                      class="text-red-500 mt-1"
                      v-for="error of v$.sector.$errors"
                      :key="error.$uid"
                    >
                      <div class="error-msg text-error text-xs font-semibold">
                        {{ error.$message }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div class="mb-6">
                    <label class="mb-2 font-medium text-sm text-[#344054] block"
                      >E-mail
                      <span class="text-red-500 pl-[.02rem]">*</span></label
                    >
                    <input
                      v-model="v$.email.$model"
                      :class="{ 'border-red-500': v$.email.$error }"
                      class="px-[14px] py-[10px] h-11 text-sm rounded-lg w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                      autocomplete="off"
                      autofocus="on"
                    />
                    <div
                      class="text-red-500 mt-1"
                      v-for="error of v$.email.$errors"
                      :key="error.$uid"
                    >
                      <div class="error-msg text-error text-xs font-semibold">
                        {{ error.$message }}
                      </div>
                    </div>
                  </div>
               
                  <div class="mb-6">
                    <label class="mb-2 font-medium text-sm text-[#344054] block"
                      >Phone number
                      <span class="text-red-500 pl-[.02rem]">*</span></label
                    >
                    <div class="flex relative rounded-lg h-11">
                      <FormsPhoneCodes v-model="form.code" />

                      <input
                        :class="{ 'border-red-500': v$.phone.$error }"
                        v-model="v$.phone.$model"
                        class="flex-1 rounded-r-lg px-[14px] py-[10px] h-11 text-sm w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                        autocomplete="off"
                        autofocus="on"
                        placeholder="08160723884"
                        type="tel"
                      />
                    </div>
                    <div
                      class="text-red-500 mt-1"
                      v-for="error of v$.phone.$errors"
                      :key="error.$uid"
                    >
                      <div class="error-msg text-error text-xs font-semibold">
                        {{ error.$message }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div class="mb-6">
                    <label
                      class="mb-2 font-medium text-sm text-[#344054] block"
                    >
                      Registration number
                      <span class="text-red-500 pl-[.02rem]">*</span></label
                    >
                    <input
                      v-model="v$.registrationNo.$model"
                      :class="{ 'border-red-500': v$.registrationNo.$error }"
                      class="rounded-lg px-[14px] py-[10px] h-11 text-sm w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                      autocomplete="off"
                      autofocus="on"
                      placeholder=""
                    />
                    <div
                      class="text-red-500 mt-1"
                      v-for="error of v$.registrationNo.$errors"
                      :key="error.$uid"
                    >
                      <div class="error-msg text-error text-xs font-semibold">
                        {{ error.$message }}
                      </div>
                    </div>
                  </div>
                  <div class="mb-6">
                    <label class="mb-2 font-medium text-sm text-[#344054] block"
                      >TIN number
                      <span class="text-red-500 pl-[.02rem]">*</span></label
                    >

                    <input
                      v-model="v$.tin.$model"
                      :class="{ 'border-red-500': v$.tin.$error }"
                      class="rounded-lg px-[14px] py-[10px] h-11 text-sm w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                      autocomplete="off"
                      autofocus="on"
                      placeholder=""
                    />
                    <div
                      class="text-red-500 mt-1"
                      v-for="error of v$.tin.$errors"
                      :key="error.$uid"
                    >
                      <div class="error-msg text-error text-xs font-semibold">
                        {{ error.$message }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div class="mb-6 lg:col-span-2">
                    <label class="mb-2 font-medium text-sm text-[#344054] block"
                      >Company website</label
                    >
                    <input
                      v-model="v$.website.$model"
                      :class="{ 'border-red-500': v$.website.$error }"
                      class="rounded-lg px-[14px] py-[10px] h-11 text-sm w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                      autocomplete="off"
                      autofocus="on"
                      placeholder="https://www.example.com"
                      type="url"
                    />
                    <div
                      class="text-red-500 mt-1"
                      v-for="error of v$.website.$errors"
                      :key="error.$uid"
                    >
                      <div class="error-msg text-error text-xs font-semibold">
                        {{ error.$message }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-6">
                  <label class="mb-2 font-medium text-sm text-[#344054] block"
                    >Description</label
                  >
                  <textarea
                    v-model="v$.description.$model"
                    :class="{ 'border-red-500': v$.description.$error }"
                    rows="4"
                    placeholder="Company description"
                    class="rounded-lg px-[14px] py-[10px] w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
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

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div class="mb-6">
                    <label class="mb-2 font-medium text-sm text-[#344054] block"
                      >Company Address
                      <span class="text-red-500 pl-[.02rem]">*</span></label
                    >
                    <input
                      v-model="v$.address.$model"
                      :class="{ 'border-red-500': v$.address.$error }"
                      class="rounded-lg px-[14px] py-[10px] h-11 text-sm w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                      autocomplete="off"
                      autofocus="on"
                      placeholder="Company address"
                    />
                    <div
                      class="text-red-500 mt-1"
                      v-for="error of v$.address.$errors"
                      :key="error.$uid"
                    >
                      <div class="error-msg text-error text-xs font-semibold">
                        {{ error.$message }}
                      </div>
                    </div>
                  </div>
                  <div class="mb-6">
                    <label class="mb-2 font-medium text-sm text-[#344054] block"
                      >City
                      <span class="text-red-500 pl-[.02rem]">*</span></label
                    >
                    <input
                      v-model="v$.city.$model"
                      :class="{ 'border-red-500': v$.city.$error }"
                      class="px-[14px] py-[10px] h-11 text-sm w-full border rounded-lg placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                      autocomplete="off"
                      autofocus="on"
                      placeholder="Company city"
                    />
                    <div
                      class="text-red-500 mt-1"
                      v-for="error of v$.city.$errors"
                      :key="error.$uid"
                    >
                      <div class="error-msg text-error text-xs font-semibold">
                        {{ error.$message }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div class="mb-6">
                    <label class="mb-2 font-medium text-sm text-[#344054] block"
                      >Country
                      <span class="text-red-500 pl-[.02rem]">*</span></label
                    >
                    <div class="relative">
                      <FormsSelectComponent
                        :options="allcountries"
                        :showSearch="true"
                        :value="form.country"
                        @onGetData="getCountry"
                        containerStyle="w-full"
                        :classStyles="`${
                          v$.country.$error && 'border-red-500'
                        } rounded-lg appearance-none px-[14px] py-[10px] h-11 text-sm border w-full ! placeholder:text-[#B6B7B9] focus:outline-matta-black/20`"
                      />
                      <div
                        class="text-red-500 mt-1"
                        v-for="error of v$.country.$errors"
                        :key="error.$uid"
                      >
                        <div class="error-msg text-error text-xs font-semibold">
                          {{ error.$message }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mb-6">
                    <label class="mb-2 font-medium text-sm text-[#344054] block"
                      >State
                      <span class="text-red-500 pl-[.02rem]">*</span></label
                    >
                    <FormsSelectComponent
                      :options="mystates"
                      :showSearch="true"
                      :value="form.state"
                      @onGetData="getState"
                      containerStyle="w-full"
                      :classStyles="`${
                        v$.state.$error && 'border-red-500'
                      } rounded-lg appearance-none px-[14px] py-[10px] h-11 text-sm border w-full ! placeholder:text-[#B6B7B9] focus:outline-matta-black/20`"
                    />
                    <div
                      class="text-red-500 mt-1"
                      v-for="error of v$.state.$errors"
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
      </div>
    </div>
    <div
      v-if="
        !authStore?.userInfo?.onboardingPageStatus &&
        !companyInfo.approvalStatus
      "
      class="flex justify-between gap-x-4 items-center mt-16 pt-6 border-t border-[#EAECF0] w-full"
    >
      <!-- <button
          type="button"
          class="appearance-none leading-none px-10 py-[14px] rounded-lg w-full lg:w-auto text-primary-500 border border-primary-500 hover:bg-gray-100 text-[13px] capitalize"
        >
          Prevew
        </button> -->
      <span></span>

      <div class="flex justify-end gap-x-4 items-center">
        <!--     
          <button
            type="button"
            class="appearance-none leading-none px-10 py-[14px] rounded-lg w-full lg:w-auto text-matta-black border border-[#E7EBEE] hover:bg-gray-100 text-[13px] capitalize"
          >
            Cancel
          </button>
        -->

        <button
          :disabled="v$.$silentErrors.length || isLoading"
          :class="{
            'opacity-60 cursor-not-allowed': v$.$silentErrors.length,
          }"
          class="appearance-none leading-none px-10 py-[10px] grid-cols-1 lg:grid-cols-2 gap-4 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] capitalize"
        >
          <i
            class="fa fa-spinner fa-spin"
            v-show="isLoading"
            aria-hidden="true"
          ></i>
          <span v-show="!isLoading">Next</span>
        </button>
      </div>
    </div>
  </form>

  <div>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <div class="fixed z-10 inset-0 overflow-y-auto">
          <div
            class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full"
              >
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="flex justify-between mb-5 items-center">
                    <h4 class="font-medium text-matta-black text-xl">
                      Customize logo
                    </h4>
                    <i
                      class="uil uil-times cursor-pointer text-lg"
                      @click="open = false"
                    ></i>
                  </div>

                  <Cropper
                    ref="cropper"
                    class="cropper"
                    :src="img"
                    :stencil-size="{
                      width: 200,
                      height: 200,
                    }"
                  />
                  <div class="flex justify-end gap-x-2 items-center mt-8">
                    <button
                      @click="open = false"
                      class="appearance-none leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 text-[13px] capitalize"
                    >
                      Cancel
                    </button>

                    <button
                      @click="crop"
                      class="appearance-none leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] capitalize"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import CountryList from "country-list-with-dial-code-and-flag";
import countries from "@/utils/countries.json";
import sectors from "@/utils/sectors.json";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { ref, reactive, onMounted, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  helpers,
  maxLength,
  url,
  numeric,
  minLength,
} from "@vuelidate/validators";
import { toast } from "vue3-toastify";
import {
  additionalInfo,
  uploadfile,
  setOnboardingcomplete,
} from "@/services/onboardingservices";
import { useRouter } from "vue-router";
import {
  getCompanyProfile,
  updateCompanyProfile,
} from "@/services/settingservices";

const active = inject("active");
const companyInfo = inject("companyInfo");
const authStore = useAuthStore();
const router = useRouter();
const open = ref(false);
const img = ref("");
const image = ref(null);
const coordinate = ref(null);
const cropper = ref(null);
const businessTypesOptions = businessTypes?.map((i) => {
  return {
    label: i.sector,
    value: i.sector,
  };
});
const sectorOptions = computed(() => {
  const selectedBusinessType = businessTypes?.find(
    (i) => i.sector === form.companyType
  );
  if (!selectedBusinessType) return []; // Handle case when selected business type is not found

  return (
    selectedBusinessType.subSectors?.map((i) => {
      return {
        label: i.subSectorName,
        value: i.subSectorCode, // Use subSectorCode as the value
      };
    }) ?? []
  ); // Use optional chaining and nullish coalescing operators for safer property access
});
const form = reactive({
  companyName: "",
  companyType: "",
  phone: "",
  email: "",
  website: "",
  fax: "",
  description: "",
  country: "",
  city: "",
  state: "",
  address: "",
  logo: "",
  code: "+234",
  registrationNo: "",
  tin: "",
  sector: "",
  dateOfIncorporation: "",
  socials: [
    {
      name: "",
      link: "",
    },
  ],
});

const isLoading = ref(false);
const validPhoneLength = (value) =>
  form.code === "+234" ? value.length > 9 && value.length < 12 : true;
const mystates = computed(() => {
  return states.value.map((item) => {
    return {
      id: item.code,
      name: item.name,
      value: item.name,
    };
  });
});

function getCountry(data) {
  form.country = data.value;
}
function getState(data) {
  form.state = data.value;
}
const allcountries = computed(() => {
  return CountryList.map((item) => {
    return {
      id: "",
      name: `${item.name}`,
      value: item.name,
    };
  });
});

function addsocial() {
  form.socials.push({
    name: "",
    link: "",
  });
}
onMounted(() => {
  form.companyName = authStore.userInfo?.companyName;
  form.photo = image.value = companyInfo?.value.photo;
  form.companyType = companyInfo?.value.companyType;
  form.website = companyInfo?.value.website;
  form.fax = companyInfo?.value.fax;
  form.email = companyInfo?.value.email;
  form.description = companyInfo?.value.description;
  form.socials = companyInfo?.value.socials || [
    {
      name: "",
      link: "",
    },
  ];
  form.address = companyInfo?.value.address;
  form.country = companyInfo?.value.country;
  form.city = companyInfo?.value.city;
  form.tin = companyInfo?.value.tin;
  form.registrationNo = companyInfo?.value.registrationNo;
  form.phone = companyInfo?.value.phone;
  image.value = form.logo = companyInfo?.value.logo;
  form.state = companyInfo?.value.state;

  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (
    !companyInfo?.value.companyName ||
    !companyInfo?.value.companyName.match(validRegex)
  ) {
    form.companyName = companyInfo?.value.companyName;
  }
});
function removesocial(i) {
  form.socials.splice(i, 1);
}
const states = computed(() => {
  if (!form.country) return [];
  return countries.find(
    (item) => item.name.toLowerCase() == form.country.toLowerCase()
  ).states;
});
function handleEvent(e) {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  if (img.value) {
    URL.revokeObjectURL(img.value);
  }
  img.value = URL.createObjectURL(files[0]);
  open.value = true;
}

function crop() {
  const { coordinates, canvas } = cropper.value.getResult();
  coordinate.value = coordinates;
  image.value = canvas.toDataURL();
  open.value = false;
  form.logo = canvas.toDataURL().replace("data:", "").replace(/^.+,/, "");
  uploadfile({
    base64: canvas.toDataURL().replace("data:", "").replace(/^.+,/, ""),
  }).then((res) => {
    form.logo = res.data.message;
    updateCompanyProfile({ ...form, logo: res.data.message }).then((res) => {
      if (res.status === 200) {
        toast.success("Logo saved");
      }
    });
  });
}

const rules = {
  email: {
    required,
    email: helpers.withMessage("Email is invalid", email),
    maxLength: maxLength(50),
  },
  companyName: {
    required,
    maxLength: maxLength(50),
  },
  website: {
    maxLength: maxLength(100),
  },
  country: {
    required,
    maxLength: maxLength(50),
  },
  dateOfIncorporation: {
    required,
  },
  sector: {
    required,
  },

  city: {
    required,
    maxLength: maxLength(50),
  },
  address: {
    required,
    maxLength: maxLength(250),
  },
  tin: { required, minLength: minLength(7) },
  registrationNo: { required, minLength: minLength(14) },
  companyType: { required },
  state: {
    required,
    maxLength: maxLength(50),
  },
  phone: {
    numeric,
    required,
    validPhoneLength: helpers.withMessage(
      "Phone number must be between 10 0r 11 digits",
      validPhoneLength
    ),
  },
  fax: {
    maxLength: maxLength(50),
  },
  description: {
    maxLength: maxLength(1000),
  },
  logo: {},
};

const invalidCredentials = ref(false);
const v$ = useVuelidate(rules, form);

//Timer

// const isDisabled = ref(false);

async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;

  updateCompanyProfile(form)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Information saved");
        active.value = 2;
      }
    })

    .catch((err) => {
      invalidCredentials.value = true;
      isLoading.value = false;

      toast.error(err.response.data.message || err.response.data.Message);
    });
}
function removeImage() {
  image.value = form.logo = "";
}
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("@/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
