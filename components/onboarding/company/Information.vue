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
                      alt="information"
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
                      for="companyName"
                      class="mb-2 font-medium text-sm text-[#344054] block"
                    >
                      Company name
                      <RedDot
                    /></label>
                    <input
                      id="companyName"
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
                    <label
                      for="dateofIncorporation"
                      class="mb-2 font-medium text-sm text-[#344054] block"
                      >Date Of Incorporation <RedDot
                    /></label>

                    <ClientOnly>
                      <VueDatePicker
                        auto-apply
                        id="dateofIncorporation"
                        v-model="v$.dateofIncorporation.$model"
                        placeholder="Select date"
                        :enable-time-picker="false"
                        :input-class-name="`!rounded-lg px-[14px] py-[10px] h-11 w-full border  placeholder:text-[#B6B7B9] focus:outline-matta-black/20 ${
                          v$.dateofIncorporation.$error
                            ? 'border-red-500'
                            : 'border-[#DCDEE6]'
                        }`"
                      />
                    </ClientOnly>
                    <div
                      class="text-red-500 mt-1"
                      v-for="error of v$.dateofIncorporation.$errors"
                      :key="error.$uid"
                    >
                      <div class="error-msg text-error text-xs font-semibold">
                        {{ error.$message }}
                      </div>
                    </div>
                  </div>

                  <div class="mb-6">
                    <label
                      for="country"
                      class="mb-2 font-medium text-sm text-[#344054] block"
                      >Country <RedDot
                    /></label>
                    <div class="relative">
                      <FormGroup label="" name="state">
                        <SelectVueSelect
                          id="country"
                          v-model="form.country"
                          :options="allcountries"
                          :reduce="(country) => country.value"
                          placeholder="Select country"
                          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer border-[#D0D5DD]`"
                        />
                      </FormGroup>
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
                    <label
                      for="state"
                      class="mb-2 font-medium text-sm text-[#344054] block"
                      >State <RedDot
                    /></label>

                    <FormGroup label="" name="state">
                      <SelectVueSelect
                        id="state"
                        v-model="form.state"
                        :disabled="!form.country"
                        :options="mystates"
                        :reduce="(state) => state.value"
                        placeholder="Select state"
                        :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer border-[#D0D5DD]`"
                      />
                    </FormGroup>
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

                  <div class="mb-6">
                    <label
                      for="email"
                      class="mb-2 font-medium text-sm text-[#344054] block"
                      >E-mail <RedDot
                    /></label>
                    <input
                      id="email"
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
                    <label
                      for="Phone"
                      class="mb-2 font-medium text-sm text-[#344054] block"
                      >Phone number <RedDot
                    /></label>
                    <div class="flex relative rounded-lg h-11">
                      <FormsPhoneCodes v-model="v$.phone.$model" />
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
                      for="companyType"
                      class="mb-2 font-medium text-sm text-[#344054] block"
                      >Business type <RedDot
                    /></label>

                    <div class="flex relative items-center">
                      <select
                        id="companyType"
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
                    <label
                      for="sector"
                      class="mb-2 font-medium text-sm text-[#344054] block"
                      >Business sector <RedDot
                    /></label>

                    <div class="flex relative items-center">
                      <select
                        id="sector"
                        :disabled="!form.companyType"
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

                  <div
                    class="mb-6"
                    v-if="form.country?.toLowerCase() === 'nigeria'"
                  >
                    <label
                      for="registrationNo"
                      class="mb-2 font-medium text-sm text-[#344054] block"
                    >
                      CAC Registration number
                      <RedDot
                    /></label>
                    <input
                      id="registrationNo"
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
                  <div
                    class="mb-6"
                    v-if="form.country?.toLowerCase() === 'nigeria'"
                  >
                    <label
                      for="tin"
                      class="mb-2 font-medium text-sm text-[#344054] block"
                      >TIN number <RedDot
                    /></label>

                    <input
                      id="tin"
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
                    <label
                      for="website"
                      class="mb-2 font-medium text-sm text-[#344054] block"
                      >Company website</label
                    >
                    <input
                      id="website"
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

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div class="mb-6">
                    <label
                      for="address"
                      class="mb-2 font-medium text-sm text-[#344054] block"
                      >Company Address <RedDot
                    /></label>
                    <input
                      id="address"
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
                    <label
                      for="City"
                      class="mb-2 font-medium text-sm text-[#344054] block"
                      >City <RedDot
                    /></label>
                    <input
                      id="City"
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
                <div class="mb-6">
                  <label
                    for="description"
                    class="mb-2 font-medium text-sm text-[#344054] block"
                    >Description</label
                  >
                  <textarea
                    id="description"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex justify-between gap-x-4 items-center mt-16 pt-6 border-t border-[#EAECF0] w-full"
      v-if="!companyInfo?.approvalStatus"
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
          :disabled="
            isLoading ||
            (form.country?.toLowerCase() === 'nigeria' &&
              (!form.registrationNo || !form.tin))
          "
          :class="{
            'opacity-60 cursor-not-allowed': v$.$silentErrors.length,
          }"
          class="disabled:opacity-50 appearance-none leading-none px-10 py-[10px] grid-cols-1 lg:grid-cols-2 gap-4 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] capitalize"
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import CountryList from "country-list-with-dial-code-and-flag";
import countries from "~/utils/countries.json";
import sectors from "~/utils/sectors.json";
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
  requiredIf,
  minLength,
} from "@vuelidate/validators";
import { toast } from "vue3-toastify";
import { uploadfile } from "~/services/onboardingservices";
import { useRouter } from "vue-router";
import {
  getCompanyProfile,
  updateCompanyProfile,
} from "~/services/settingservices";
import { maxDate } from "~/utils/constants";

const getData = inject("getData");
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
        value: i.subSectorName, // Use subSectorCode as the value
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
  country: "Nigeria",
  city: "",
  state: "",
  address: "",
  logo: "",
  code: "+234",
  registrationNo: "",
  tin: "",
  sector: "",
  dateofIncorporation: "",
});

const isLoading = ref(false);

const mystates = computed(() => {
  return states.value?.map((item) => {
    return {
      id: item.code,
      label: item.name,
      value: item.name,
    };
  });
});

const allcountries = computed(() => {
  return CountryList?.map((item) => {
    return {
      id: "",
      label: `${item.name}`,
      value: item.name,
    };
  });
});


onMounted(() => {
  form.companyName = authStore.userInfo?.companyName;
  form.photo = image.value = companyInfo?.value?.photo;
  form.companyType = companyInfo?.value?.companyType;
  form.website = companyInfo?.value?.website;
  form.fax = companyInfo?.value?.fax;
  form.email = companyInfo?.value?.email;
  form.description = companyInfo?.value?.description;

  form.address = companyInfo?.value?.address;
  form.country = companyInfo?.value?.country;
  form.city = companyInfo?.value?.city;
  form.dateofIncorporation = companyInfo?.value?.dateofIncorporation;
  form.sector = companyInfo?.value?.sector;
  form.tin = companyInfo?.value?.tin;
  form.registrationNo = companyInfo?.value?.registrationNo;
  form.phone = companyInfo?.value?.phone;
  image.value = form.logo = companyInfo?.value?.logo;
  form.state = companyInfo?.value?.state;

  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (
    !companyInfo?.value?.companyName ||
    !companyInfo?.value?.companyName?.match(validRegex)
  ) {
    form.companyName = companyInfo?.value?.companyName;
  }
});
function removesocial(i) {
  form.socials.splice(i, 1);
}
const states = computed(() => {
  if (!form.country) return [];
  return countries.find(
    (item) => item.name.toLowerCase() == form.country.toLowerCase()
  )?.states;
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

const rules = computed(() => ({
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
  dateofIncorporation: {
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
  tin: {
    required: requiredIf(() => form.country.toLowerCase() === "nigeria"),
  },
  registrationNo: {
    required: requiredIf(() => form.country.toLowerCase() === "nigeria"),
    minLength: requiredIf(() => form.country.toLowerCase() === "nigeria")
      ? minLength(7)
      : undefined,
  },
  companyType: { required },
  state: {
    required,
    maxLength: maxLength(50),
  },
  phone: {
    required,
  },
  fax: {
    maxLength: maxLength(50),
  },
  description: {
    maxLength: maxLength(1000),
  },
  logo: {},
}));



const invalidCredentials = ref(false);
const v$ = useVuelidate(rules, form);

//Timer

// const isDisabled = ref(false);

async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;
  companyInfo.value.country = form.country;
  updateCompanyProfile(form)
    .then((res) => {
      if (res.status === 200) {
        getData();
        toast.success("Information saved");
        active.value = 2;
        getCompanyProfile().then((res) => {
          if (res.status === 200) {
            form.companyName = res.data.data.companyName;
            form.photo = image.value = res.data.data.photo;
            form.companyType = res.data.data.companyType;
            form.website = res.data.data.website;
            form.description = res.data.data.description;
            form.address = res.data.data.address;
            form.country = res.data.data.country;
            form.city = res.data.data.city;
            form.dateofIncorporation = res.data.data.dateofIncorporation;
            form.sector = res.data.data.sector;
            form.tin = res.data.data.tin;
            form.registrationNo = res.data.data.registrationNo;
            form.phone = res.data.data.phone;
            image.value = form.logo = res.data.data.logo;
            form.state = res.data.data.state;
          }
        });
      }
    })

    .catch((err) => {
      isLoading.value = false;
      toast.error(err?.response?.data?.message || err?.response?.data?.Message);
    });
}
function removeImage() {
  image.value = form.logo = "";
}
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
