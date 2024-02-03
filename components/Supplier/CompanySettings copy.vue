<template>
  <div class="gap-y-2 flex flex-col bg-white rounded-[10px] pb-10">
    <HeaderComponent title="Company settings" />
    <!-- Top bar   -->
    <div class="p-6 lg:p-8 bg-white rounded-lg grid grid-cols-3">
      <div class="col-span-3">
        <div class="flex justify-between items-center mb-10">
          <div class="flex items-center">
            <span>
              <span
                v-if="!image"
                class="h-24 w-24 rounded-lg flex items-center text-xs bg-[#F1F3F5] mr-4 justify-center"
                >Logo</span
              >
              <img
                v-else
                :src="image"
                class="h-24 w-24 rounded-lg flex items-center bg-[#F1F3F5] mr-4 justify-center"
              />
            </span>
          </div>
          <div class="flex items-center gap-x-3">
            <label for="upload">
              <span
                class="text-primary border border-primary- rounded-full px-6 py-3 text-sm cursor-pointer"
              >
                Upload logo
              </span>
              <input
                @change="handleEvent($event)"
                type="file"
                accept="image/*"
                id="upload"
                class="hidden"
              />
            </label>
            <i
              v-if="image"
              @click="removeImage"
              class="uil uil-times ring-1 flex items-center justify-center ring-[#F1F3F5] text-lg text-matta-black rounded-full w-[46px] h-[46px]"
            ></i>
          </div>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="grid lg:grid-cols-2 gap-x-4">
            <div class="mb-6">
              <label class="mb-2 font-medium text-sm text-[#344054] block text-left">
                Company name</label
              >
              <input
                v-model="v$.companyName.$model"
                :class="{ 'border-red-500': v$.companyName.$error }"
                class="rounded-lg px-[14px] py-[10px] h-11 w-full border placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
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
              <label class="mb-2 font-normal text-xs block"
                >Company sector</label
              >

              <div class="flex relative items-center">
                <select
                  v-model="form.companyType"
                  :class="{ 'border-red-500': v$.companyType.$error }"
                  class="appearance-none rounded-lg px-[14px] py-[10px] h-11 w-full border placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                >
                  <option disabled value="">Select sector</option>
                  <option
                    v-for="item in sectors"
                    :key="item.name"
                    :value="item.name"
                  >
                    {{ item.name }}
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
          </div>

          <div class="grid lg:grid-cols-2 gap-x-4">
            <div class="mb-6">
              <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Phone number</label>
              <div class="flex relative rounded-lg h-11">
                <FormsPhoneCodes v-model="form.code" />

                <input
                  v-model="v$.phone.$model"
                  :class="{ 'border-red-500': v$.phone.$error }"
                  class="flex-1 rounded-r-lg px-[14px] py-[10px] h-11 w-full border placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
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
              <label class="mb-2 font-medium text-sm text-[#344054] block text-left">E-mail</label>
              <input
                v-model="v$.email.$model"
                :class="{ 'border-red-500': v$.email.$error }"
                class="px-[14px] py-[10px] h-11 rounded-lg w-full border placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
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
          </div>
          <div class="grid lg:grid-cols-2 gap-x-4">
            <div class="mb-6">
              <label class="mb-2 font-normal text-xs block"
                >Company website</label
              >
              <input
                v-model="v$.website.$model"
                :class="{ 'border-red-500': v$.website.$error }"
                class="rounded-lg px-[14px] py-[10px] h-11 w-full border placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
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
            <div class="mb-6">
              <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Fax</label>
              <input
                v-model="v$.fax.$model"
                :class="{ 'border-red-500': v$.fax.$error }"
                class="rounded-lg px-[14px] py-[10px] h-11 w-full border placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                autocomplete="off"
                autofocus="on"
                placeholder="Fax"
              />
              <div
                class="text-red-500 mt-1"
                v-for="error of v$.fax.$errors"
                :key="error.$uid"
              >
                <div class="error-msg text-error text-xs font-semibold">
                  {{ error.$message }}
                </div>
              </div>
            </div>
          </div>
          <div class="mb-6">
            <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Description</label>
            <textarea
              v-model="v$.description.$model"
              :class="{ 'border-red-500': v$.description.$error }"
              rows="5"
              placeholder="Company description"
              class="rounded-lg px-[14px] py-[10px] w-full border placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
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

          <div class="">
            <div
              class="flex gap-x-6 relative items-center mb-3"
              v-for="(social, i) in form.socials"
              :key="i"
            >
              <div class="flex relative items-center">
                <select
                  v-model="social.name"
                  class="appearance-none rounded-lg px-7 py-3 h-11 w-full border placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                >
                  <option value="">Select a network</option>
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                </select>
                <i
                  class="uil uil-angle-down absolute right-2 pointer-events-none"
                ></i>
              </div>
              <input
                v-model="social.link"
                class="flex-1 rounded-lg px-[14px] py-[10px] h-11 w-full border placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                autocomplete="off"
                autofocus="on"
                placeholder="https://facebook.com/pharmazell"
              />
              <i class="uil uil-times text-xl" @click="removesocial"></i>
            </div>
            <button
              class="text-xs text-primary"
              type="button"
              @click="addsocial"
            >
              <i class="uil uil-plus"></i> Add social network
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-2 rounded-lg bg-white">
      <div class="p-6 lg:p-8 col-span-2">
        <form @submit.prevent="handleSubmit">
          <legend class="font-medium mb-6">Company Address</legend>
          <div>
            <div class="grid lg:grid-cols-2 gap-x-4">
              <div class="mb-6">
                <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Country</label>
                <div class="flex relative">
                  <FormsCountriesSelect v-model="v$.country.$model" />
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
                <label class="mb-2 font-medium text-sm text-[#344054] block text-left">State</label>
                <FormsStatesSelect v-model="v$.state.$model" :states="states" />
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
            <div class="grid lg:grid-cols-2 gap-x-4">
              <div class="mb-6">
                <label class="mb-2 font-medium text-sm text-[#344054] block text-left">City</label>
                <input
                  v-model="v$.city.$model"
                  :class="{ 'border-red-500': v$.city.$error }"
                  class="px-[14px] py-[10px] h-11 w-full rounded-lg border placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
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
              <div class="mb-6">
                <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Address</label>
                <input
                  v-model="v$.address.$model"
                  :class="{ 'border-red-500': v$.address.$error }"
                  class="rounded-lg px-[14px] py-[10px] h-11 w-full border placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
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
            </div>

            <div class="mt-8 justify-end flex">
              <button
                :disabled="isLoading"
                :class="isLoading && 'bg-primary/80'"
                type="submit"
                class="text-white border bg-primary-500 rounded-[10px] px-10 py-3 text-sm"
              >
                Save changes
              </button>
            </div>
          </div>
        </form>
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

                  <Cropper ref="cropper" class="cropper" :src="img" />
                  <div class="flex justify-end gap-x-2 items-center mt-8">
                    <button
                      @click="open = false"
                      class="appearance-none leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 text-[13px] uppercase"
                    >
                      Cancel
                    </button>

                    <button
                      @click="crop"
                      class="appearance-none leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
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
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import useVuelidate from "@vuelidate/core";
import { email, helpers, maxLength, url, numeric } from "@vuelidate/validators";
import { toast } from "vue3-toastify";
import {
  updateCompanyProfile,
  getCompanyProfile,
} from "~/services/settingservices";
import countries from "~/utils/countries.json";
import sectors from "~/utils/sectors.json";
import { useRoute } from "vue-router";
import { uploadfile } from "~/services/onboardingservices";

const route = useRoute();
defineProps(["title"]);
const open = ref(false);
const img = ref("");
const image = ref(null);
const coordinate = ref(null);
const cropper = ref(null);

const form = reactive({
  code: "+234",
  companyName: "",
  companyType: "",
  phone: "",
  email: "",
  website: "",
  fax: "",
  description: "",

  logo: "",
  socials: [
    {
      name: "",
      link: "",
    },
  ],

  country: "",
  city: "",
  state: "",
  address: "",
});
const isLoading = ref(false);
const validPhoneLength = (value) =>
  form.code === "+234" ? value.length > 9 && value.length < 12 : true;
function addsocial() {
  form.socials.push({
    name: "",
    link: "",
  });
}
onMounted(() => {
  getCompanyProfile()
    .then((res) => {
      form.photo = image.value = res.data.data.photo;
      form.companyName = res.data.data.companyName;
      form.companyType = res.data.data.companyType;
      form.website = res.data.data.website;
      form.fax = res.data.data.fax;
      form.description = res.data.data.description;
      form.socials = res.data.data.socials ? res.data.data.socials : [];
      form.address = res.data.data.address;
      form.country = res.data.data.country;
      form.city = res.data.data.city;
      form.email = res.data.data.email;
      form.phone = res.data.data.phone;
      form.logo = image.value = res.data.data.logo;
      form.state = res.data.data.state;
    })
    .catch((err) => {
      isLoading.value = false;

      toast.error(err.response.data.message || err.response.data.Message);
    });
});

const states = computed(() => {
  if (!form.country) return [];
  return (
    countries.find(
      (item) => form.country.toLowerCase() === item.name.toLowerCase()
    ).states || []
  );
});
function removesocial(i) {
  form.socials.splice(i, 1);
}
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
  // form.logo = canvas.toDataURL().replace("data:", "").replace(/^.+,/, "");
  uploadfile({
    base64: canvas.toDataURL().replace("data:", "").replace(/^.+,/, ""),
  }).then((res) => {
    form.logo = res.data.message;
  });
}

const rules = {
  email: {
    email: helpers.withMessage("Email is invalid", email),
    maxLength: maxLength(50),
  },
  companyName: {
    maxLength: maxLength(50),
  },
  website: {
    maxLength: maxLength(50),
    url,
  },
  companyType: maxLength(150),
  state: {
    maxLength: maxLength(50),
  },
  phone: {
    numeric,
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

  country: {
    maxLength: maxLength(50),
  },
  city: {
    maxLength: maxLength(50),
  },
  address: {
    maxLength: maxLength(50),
  },
};

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
        isLoading.value = false;
        toast.info("Profile updated successfully");
      }
    })
    .catch((err) => {
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
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
