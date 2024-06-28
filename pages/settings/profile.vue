<template>
  <div
    class="rounded-lg bg-white px-6 border border-[#EAECF0] flex gap-x-[76px] flex-col lg:flex-row gap-y-7 lg:gap-y-10 py-[30px]"
  >
    <div class="w-[250px]">
      <h2 class="text-sm text-[#101828] font-semibold">Personal info</h2>
      <p class="text-xs text-[#475467]">
        Update your photo and personal details here.
      </p>
    </div>
    <div class="flex-1">
      <div class="flex gap-x-3 items-center mb-10">
        <div class="flex items-center">
          <span>
            <span
              v-if="!image"
              class="h-24 w-24 rounded-full flex items-center text-sm justify-center bg-[#F1F3F5]"
              >Photo</span
            >
            <img
              v-else
              :src="image"
              alt="profile image"
              class="h-24 w-24 rounded-full flex items-center justify-center bg-[#F1F3F5]"
            />
          </span>
        </div>
        <div class="flex items-center gap-x-3">
          <label for="upload">
            <span
              class="text-[#344054] rounded-full px-1 py-3 text-sm cursor-pointer"
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
          <div class="grid lg:grid-cols-2 gap-x-6">
            <div class="mb-6">
              <label class="mb-2 font-normal text-sm block"
                >First name <RedDot
              /></label>
              <input
                v-model="v$.firstName.$model"
                :class="{ 'border-red-500': v$.firstName.$error }"
                class="rounded-lg px-[14px] py-[10px] h-11 w-full border placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                autocomplete="off"
                autofocus="on"
              />
              <div
                class="text-red-500 mt-1"
                v-for="error of v$.firstName.$errors"
                :key="error.$uid"
              >
                <div class="error-msg text-error text-sm font-semibold">
                  {{ error.$message }}
                </div>
              </div>
            </div>
            <div class="mb-6">
              <label class="mb-2 font-normal text-sm block"
                >Last name <RedDot
              /></label>
              <input
                v-model="v$.lastName.$model"
                :class="{ 'border-red-500': v$.lastName.$error }"
                class="rounded-lg px-[14px] py-[10px] h-11 w-full border placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                autocomplete="off"
                autofocus="on"
              />
              <div
                class="text-red-500 mt-1"
                v-for="error of v$.lastName.$errors"
                :key="error.$uid"
              >
                <div class="error-msg text-error text-sm font-semibold">
                  {{ error.$message }}
                </div>
              </div>
            </div>
          </div>
          <div class="grid lg:grid-cols-2 gap-x-6">
            <div class="mb-6">
              <label class="mb-2 font-normal text-sm block"
                >E-mail <RedDot
              /></label>
              <div class="flex relative items-center">
                <input
                  :value="form.email"
                  class="rounded-lg px-[14px] py-[10px] h-11 w-full border placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                  autocomplete="off"
                  autofocus="on"
                  disabled
                  readonnly
                />
                <i class="uil uil-lock absolute right-4 text-gray-600"></i>
              </div>
              <div
                class="text-red-500 mt-1"
                v-for="error of v$.email.$errors"
                :key="error.$uid"
              >
                <div class="error-msg text-error text-sm font-semibold">
                  {{ error.$message }}
                </div>
              </div>
            </div>
            <div class="mb-6">
              <label class="mb-2 font-normal text-sm block"
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
                <div class="error-msg text-error text-sm font-semibold">
                  {{ error.$message }}
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="grid lg:grid-cols-2 gap-x-6">
            <div class="mb-6">
              <label class="mb-2 font-normal text-sm block">Country <RedDot /></label>
              <div class="flex relative">
                <FormsCountriesSelect v-model="v$.country.$model" />
              </div>
              <div
                class="text-red-500 mt-1"
                v-for="error of v$.country.$errors"
                :key="error.$uid"
              >
                <div class="error-msg text-error text-sm font-semibold">
                  {{ error.$message }}
                </div>
              </div>
            </div>

            <div class="mb-6">
              <label class="mb-2 font-normal text-sm block">State <RedDot /></label>

              <FormsStatesSelect v-model="v$.city.$model" :states="states" />
              <div
                class="text-red-500 mt-1"
                v-for="error of v$.city.$errors"
                :key="error.$uid"
              >
                <div class="error-msg text-error text-sm font-semibold">
                  {{ error.$message }}
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <div class="mb-6">
              <label class="mb-2 font-normal text-sm block">Timezone</label>
              <div class="flex relative items-center w-full">
                <select
                  v-model="form.timezone"
                  class="appearance-none rounded-lg px-[14px] py-[10px] h-11 w-full border placeholder:text-[#B6B7B9]"
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
            </div>
          </div> -->

          <div class="mt-6 flex justify-end">
            <button
              :disabled="isLoading"
              :class="isLoading && 'bg-primary/80'"
              type="submit"
              class="border border-primary-500 text-sm bg-primary-500 text-white rounded-[10px] block w-full lg:w-auto px-10 font-semibold py-[10px] hover:bg-primary/80"
            >
              Save changes
            </button>
          </div>
        </div>
      </form>
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
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import { useRoute } from "vue-router";
import moment from "moment-timezone";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  helpers,
  maxLength,
  minLength,
  numeric,
} from "@vuelidate/validators";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
// eslint-disable-next-line no-unused-vars

import {
  getProfile,
  deleteaccount,
  settimezone,
  updateProfile,
  changepassword,
} from "~/services/settingservices";
import { toast } from "vue3-toastify";
import countries from "~/utils/countries.json";

const store = useAuthStore();
const deleteText = ref("");
const isShowing = ref("crop");
const open = ref(false);
const img = ref("");
const image = ref(null);
const coordinate = ref(null);
const cropper = ref(null);
const route = useRoute();
const isOpen = ref(false);
const zones = moment.tz.names();

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

// const country = computed(() => {
//   return CountryList.map((item) => {
//     return {
//       id: "",
//       name: `${item.flag} ${item.name}`,
//       value: item.dial_code,
//     };
//   });
// });

moment.fn.zoneName = function () {
  var abbr = this.zoneAbbr();
  return abbrs[abbr] || abbr;
};
defineProps(["title"]);
const isLoading = ref(false);
onMounted(() => {
  getProfile().then((res) => {
    form.photo = image.value = res.data.data.photo;
    form.firstName = res.data.data.firstName;
    form.lastName = res.data.data.lastName;
    form.country = res.data.data.country;
    form.city = res.data.data.city;
    form.email = res.data.data.email;
    form.phone = res.data.data.phone;
    form.timezone = res.data.data.timeZone;
  });
});

const form = reactive({
  photo: "",
  firstName: "",
  lastName: "",
  country: "Nigeria",
  city: "",
  email: "",
  phone: "",
  timezone: "",
  code: "+234",
});

const states = computed(() => {
  if (!form.country) return [];
  return (
    countries.find(
      (item) => form.country.toLowerCase() === item.name.toLowerCase()
    ).states || []
  );
});
function handleDelete(val) {
  isShowing.value = val;
  open.value = true;
}
function deleteAccount() {
  deleteaccount.then((res) => {
    if (res.status == 200) {
      toast.info("Account deleted successfully");
      store.logOut();
      window.location.href = "/";
    }
  });
}
function setTimezone() {
  settimezone(form).then((res) => {
    if (res.status == 200) {
      toast.info("timezone updated successfully");
    }
  });
}
function handleEvent(e) {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  if (img.value) {
    URL.revokeObjectURL(img.value);
  }
  img.value = URL.createObjectURL(files[0]);
  isShowing.value = "crop";
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
    required,
  },
  timezone: {
    maxLength: maxLength(250),
  },
  photo: {},
};
const fullName = computed(() => {
  return `${form.firstName} ${form.lastName}`;
});
const v$ = useVuelidate(rules, form);
async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;

  updateProfile(form)
    .then((res) => {
      if (res.status === 200) {
        store.updateUser(fullName.value);
        toast.info("Profile updated successfully");
        isLoading.value = false;
      }
    })
    .catch((err) => {
      isLoading.value = false;

      toast.error(err?.response?.data?.message || err?.response?.data?.Message);
    });
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
