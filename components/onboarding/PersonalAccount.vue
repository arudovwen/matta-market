<template>
  <div
    class="bg-[#E7EBEE] p-4 lg:p-6 flex flex-col gap-y-2 h-screen w-full overflow-y-auto"
  >
    <OnboardingLayoutTopBar />
    <div
      class="gap-y-2 flex flex-col flex-1 p-6 lg:p-10 justify-center bg-white rounded-lg"
    >
      <!-- Top bar   -->
      <div class="md:max-w-[656px] mx-auto">
        <div class="col-span-2">
          <div class="mb-8">
            <h1
              class="text-3xl lg:text-[48px] leading-[56px] text-matta-black col-span-1 font-medium text-center mb-4 lg:mb-8"
            >
              Set your personal profile
            </h1>
            <p class="text-center text-sm lg:text-base">
              Recommended filling out your profile
            </p>
          </div>
          <div
            class="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-10 gap-y-8"
          >
            <div class="flex items-center">
              <span>
                <span
                  v-if="!image"
                  class="h-16 lg:h-24 w-16 lg:w-24 rounded-full flex items-center text-xs bg-[#F1F3F5] mr-4 justify-center"
                  >Photo</span
                >
                 <img
                  v-else
                  :src="image"
                  class="h-16 lg:h-24 w-16 lg:w-24 rounded-full flex items-center bg-[#F1F3F5] mr-4 justify-center"
                />
              </span>
              <span>
                <p class="text-xs lg:text-sm font-medium mb-1">Your photo</p>
                <p class="text-xs lg:text-sm font-normal">
                  Recommended 200x200 px
                </p>
                <div
                  class="text-red-500 mt-1"
                  v-for="error of v$.photo.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg text-error text-xs font-semibold">
                    {{ error.$message }}
                  </div>
                </div>
              </span>
            </div>
            <div class="flex items-center gap-x-3">
              <label title="" for="upload" class="w-full lg:w-auto block lg:inline">
                <span
                  class="text-primary border border-primary- rounded-lg w-full lg:w-auto px-4 lg:px-6 py-2 lg:py-3 text-xs lg:text-sm cursor-pointer"
                >
                  Upload photo
                </span>
                <input
                  @change="handleEvent($event)"
                  type="file"
                  accept="image/*"
                  id="upload"
                  class="hidden"
                />
              </label>
            </div>
          </div>
          <form @submit.prevent="handleSubmit">
            <div>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div class="mb-6">
                  <label title="" class="mb-2 font-normal text-xs block"
                    >First name
                    <span class="text-red-500 pl-[.02rem]">*</span></label
                  >
                  <input
                    v-model="v$.firstName.$model"
                    :class="{ 'border-red-500': v$.firstName.$error }"
                    class="rounded-lg px-[14px] py-[10px] h-11 text-sm w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                    autocomplete="off"
                    autofocus="on"
                  />
                  <div
                    class="text-red-500 mt-1"
                    v-for="error of v$.firstName.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>
                <div class="mb-6">
                  <label title="" class="mb-2 font-normal text-xs block"
                    >Last name
                    <span class="text-red-500 pl-[.02rem]">*</span></label
                  >
                  <input
                    v-model="v$.lastName.$model"
                    :class="{ 'border-red-500': v$.lastName.$error }"
                    class="rounded-lg px-[14px] py-[10px] h-11 text-sm w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                    autocomplete="off"
                    autofocus="on"
                  />
                  <div
                    class="text-red-500 mt-1"
                    v-for="error of v$.lastName.$errors"
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
                  <label title="" class="mb-2 font-normal text-xs block"
                    >Country
                    <span class="text-red-500 pl-[.02rem]">*</span></label
                  >
                  <div class="flex relative">
                    <CountriesSelect v-model="v$.country.$model" />
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
                  <label title="" class="mb-2 font-normal text-xs block"
                    >State
                    <span class="text-red-500 pl-[.02rem]">*</span></label
                  >
                  <StatesSelect v-model="v$.city.$model" :states="states" />
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
                  <label title="" class="mb-2 font-normal text-xs block"
                    >Phone number
                    <span class="text-red-500 pl-[.02rem]">*</span></label
                  >
                  <div class="flex relative rounded-lg h-11">
                    <PhoneCodes v-model="form.code" />

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
                <div class="mb-6">
                  <label title="" class="mb-2 font-normal text-xs block"
                    >E-mail
                    <span class="text-red-500 pl-[.02rem]">*</span></label
                  >
                  <div class="flex relative items-center">
                    <input
                      :class="{ 'border-red-500': v$.email.$error }"
                      :value="form.email"
                      class="rounded-lg px-[14px] py-[10px] h-11 text-sm w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                      autocomplete="off"
                      autofocus="on"
                      disabled
                    />
                    <i class="uil uil-lock absolute right-4 text-gray-300"></i>
                  </div>
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
              </div>
            </div>
            <hr class="my-8" />

            <legend class="font-medium mb-4">
              Timezone <span class="text-red-500 pl-[.02rem]">*</span>
            </legend>
            <div class="mb-10">
              <div class="flex relative items-center w-full">
                <select
                  v-model="v$.timeZone.$model"
                  :class="{ 'border-red-500': v$.timeZone.$error }"
                  class="appearance-none rounded-lg px-[14px] py-[10px] h-11 text-sm w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9]"
                >
                  <option v-for="z in zones" :key="z">
                    ({{ moment.tz(new Date(), z).format("z - Z") }})
                    {{ moment.tz(new Date(), z).format("zz") }} {{ z }}
                  </option>
                </select>
                <i
                  class="uil uil-sort absolute right-3 pointer-events-none"
                ></i>
              </div>
              <div
                class="text-red-500 mt-1"
                v-for="error of v$.timeZone.$errors"
                :key="error.$uid"
              >
                <div class="error-msg text-error text-xs font-semibold">
                  {{ error.$message }}
                </div>
              </div>
            </div>
            <div class="flex justify-center gap-x-4 items-center mt-8">
            <span></span>
              <button
                :disabled="v$.$silentErrors.length"
                :class="{
                  'bg-primary/40 border-primary/40 cursor-not-allowed':
                    v$.$silentErrors.length,
                }"
                class="appearance-none leading-none px-10 py-4 rounded-full text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
              >
                <i
                  class="fa fa-spinner fa-spin"
                  v-show="isLoading"
                  aria-hidden="true"
                ></i>
                <span v-show="!isLoading">Finish</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
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
                      Customize photo
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
                    :stencil-component="ImageStencil"
                  />
                  <div class="flex justify-end gap-x-2 items-center mt-8">
                    <button
                      @click="open = false"
                      class="appearance-none leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 text-[13px] uppercase"
                    >
                      Cancel
                    </button>

                    <button
                      @click="crop"
                      class="appearance-none leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase active:scale-95"
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
import countries from "@/utils/countries.json";
import moment from "moment-timezone";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
// eslint-disable-next-line no-unused-vars
import PhoneCodes from "@/components/forms/PhoneCodes";
import CountriesSelect from "@/components/forms/CountriesSelect";
import StatesSelect from "@/components/forms/StatesSelect";
import { replaceCountryCode } from "@/utils/replaceCountryCode";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  helpers,
  maxLength,
  numeric,
} from "@vuelidate/validators";
import { toast } from 'vue3-toastify';
import {
  updatePersonalInfo,
  setOnboardingcomplete,
} from "@/services/onboardingservices";
import { getProfile } from "@/services/settingservices";
import { useStore } from "vuex";

const store = useStore();
onMounted(() => {
  getProfile().then((res) => {
    form.photo = image.value = res.data.data.photo;
    form.firstName = res.data.data.firstName;
    form.lastName = res.data.data.lastName;
    form.country = res.data.data.country;
    form.city = res.data.data.city;
    form.email = res.data.data.email;
    form.phone = replaceCountryCode(res.data.data.phone, "+234");
    form.timeZone = res.data.data.timeZone;
  });
});

const open = ref(false);
const img = ref("");
const image = ref(null);
const coordinate = ref(null);
const cropper = ref(null);
const zones = moment.tz.names();


const form = reactive({
  code: "+234",
  photo: "",
  firstName: "",
  lastName: "",
  country: "Nigeria",
  city: "",
  email: "",
  phone: "",
  timeZone: "",
});
const isLoading = ref(false);
const validPhoneLength = (value) =>
  form.code === "+234" ? value.length > 9 && value.length < 15 : true;
const abbrs = {
  EST: "Eastern Standard Time",
  EDT: "Eastern Daylight Time",
  CST: "Central Standard Time",
  CDT: "Central Daylight Time",
  MST: "Mountain Standard Time",
  MDT: "Mountain Daylight Time",
  PST: "Pacific Standard Time",
  PDT: "Pacific Daylight Time",
  GMT: "Greenwich Mean Time",
  CAT: "Central Africa Time",
  WAT: "Western Africa Time",
  EAT: "Eastern Africa Time",
  EET: "Eastern European Time",
};
moment.fn.zoneName = function () {
  var abbr = this.zoneAbbr();
  return abbrs[abbr] || abbr;
};

const states = computed(() => {
  if (!form.country) return [];
  return (
    countries.find(
      (item) => form.country.toLowerCase() === item.name.toLowerCase()
    ).states || []
  );
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
  form.photo = canvas.toDataURL().replace("data:", "").replace(/^.+,/, "");
}

const rules = {
  email: {
    required,
    email: helpers.withMessage("Email is invalid", email),
    maxLength: maxLength(50),
  },
  firstName: {
    required,
    maxLength: maxLength(50),
  },
  lastName: {
    required,
    maxLength: maxLength(50),
  },
  country: {
    required,
    maxLength: maxLength(50),
  },
  city: {
    required,
    maxLength: maxLength(50),
  },
  phone: {
    numeric,
    required,
  },
  timeZone: {
    required,
    maxLength: maxLength(250),
  },
  photo: {},
};

const invalidCredentials = ref(false);
const v$ = useVuelidate(rules, form);

//Timer
const authStore = useAuthStore();
// const isDisabled = ref(false);
const fullName = computed(() => {
  return `${form.firstName} ${form.lastName}`;
});
async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;

  updatePersonalInfo(form)
    .then((res) => {
      if (res.status === 200) {
        setOnboardingcomplete();
        toast.info("Successful");

        authStore.updateUserInfo({
          fullName: fullName.value,
          firstName: form.firstName,
          lastName: form.lastName,
          onboardingPageStatus: 1,
        });

        window.location.href = "/onboarding/complete/personal";
      }
    })

    .catch((err) => {
      invalidCredentials.value = true;
      isLoading.value = false;

      toast.error((err.response.data.message || err.response.data.Message));
    });
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
