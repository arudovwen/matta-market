<template>
  <div
    class="gap-y-2 flex flex-col bg-white rounded-[10px] pb-10 border border-[#F4F7FE]"
  >
    <!-- <HeaderComponent
      title="Customization"
      subtext="Setup the look and feel of your store"
    /> -->
    <!-- Top bar   -->
    <div class="p-[30px]">
      <form @submit.prevent="onSubmit">
        <div class="mb-6 grid grid-cols-1 xl:grid-cols-2 xl:gap-x-6 gap-y-5">
          <Textinput
            placeholder=""
            label="Name of store"
            name="storeName"
            v-bind="storeNameAtt"
            v-model="storeName"
            :error="errors.storeName"
            @keyup="getProfileData()"
            isCumpulsory
          />
          <div>
            <label
              class="flex-0 mr-6 md:w-[100px] w-[60px] break-words inline-block input-label text-sm !text-[#1B2B41B8]"
              for="storeSlug"
            >
              Store URL</label
            >
            <div
              class="flex items-center bg-transparent transition duration-300 ease-in-out border border-[#D0D5DD] focus:ring-1 focus:ring-slate-600 focus:outline-none focus:ring-opacity-90 rounded-lg placeholder:text-[#CDD2DA] text-[#344054] text-sm placeholder:font-normal w-full"
            >
              <span
                class="rounded-l-lg h-11 bg-gray-100 pl-[14px] pr-2 py-[10px] text-base"
                >{{ url }}</span
              >
              <Textinput
              isCumpulsory
                placeholder=""
                label=""
                name="storeSlug"
                v-bind="storeSlugAtt"
                v-model="storeSlug"
                :error="errors.storeSlug"
                classInput="!border-none !pl-2"
              />
            </div>
          </div>
        </div>

        <div class="mb-6">
          <label class="mb-2 font-medium text-sm block"
            >Storefront Banner
            <span class="text-[#B9B9B9]">(Optional)</span></label
          >
          <UploadComponent
            @onGetFiles="onGetBanner"
            @removeFile="removeFile"
            support="SVG, PNG, JPG (max. 800x400px)"
            :is-multiple="false"
            id="bannerUrl"
            :url="formValues.bannerUrl"
          />
        </div>

        <div class="mb-6">
          <label class="mb-1 font-medium text-sm block"
            >Campaign Banner
            <span class="text-[#B9B9B9]">(Optional)</span></label
          >
          <p class="mb-2 text-xs text-[#555555]">
            Campaign bannerUrls can be used to show you’re running a discount
            promotion
          </p>
          <UploadComponent
            @onGetFiles="onGetCampaign"
            @removeFile="removeFile"
            support="SVG, PNG, JPG (max. 800x400px)"
            recommended="Recommended size: 1000px by 150px"
            :is-multiple="false"
            id="campaignBanner"
            :url="formValues.campaignBanner"
          />
        </div>

        <div
          class="bg-white flex justify-between gap-x-6 items-center sticky bottom-0 pb-6"
        >
          <NuxtLink :to="`/${storeSlug}`"
            ><button
              type="button"
              :disabled="!storeSlug"
              class="appearance-none leading-none px-5 md:px-10 py-[10px] rounded-[6px] text-primary-500 border-primary-500 border hover:bg-gray-50 text-sm"
            >
              Preview
            </button></NuxtLink
          >
          <div class="flex gap-x-4 items-center">
            <NuxtLink to="/company/settings"
              ><button
                type="button"
                class="appearance-none leading-none px-5 md:px-10 py-[10px] rounded-[6px] text-primary border-primary- border hover:bg-gray-50 text-sm"
              >
                Cancel
              </button></NuxtLink
            >
            <AppButton
              :disabled="isLoading"
              :isLoading="isLoading"
              btnClass="bg-primary-500 text-white  px-6 md:!px-10  !text-sm !py-[10px] disabled:cursor-not-allowed"
              type="submit"
              text="Save"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import debounce from "lodash/debounce";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import {
  updateVendorInfo,
  postStoreName,
  getVendorInfo,
} from "~/services/userservices";

const url = ref("");
if (process.client) {
  url.value = window.location.origin + "/";
  
}

const config = useRuntimeConfig();
const authStore = useAuthStore();
const isLoading = ref(false);
const defaultName = ref("");
const formValues = reactive({
  storeName: "",
  storeSlug: "",
  bannerUrl: "",
  campaignBanner: "",
  businessId: authStore.userId,
});

const schema = yup.object({
  storeName: yup.string().required("Your store name is required"),
});

const {
  handleSubmit,
  defineField,
  errors,
  setFieldValue,
  setValues,
  setFieldError,
} = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
const onGetBanner = (value) => {
  formValues.bannerUrl = value;
  setFieldValue("bannerUrl", value);
};
const onGetCampaign = (value) => {
  formValues.campaignBanner = value;
  setFieldValue("campaignBanner", value);
};
const removeFile = () => {};
const [storeName, storeNameAtt] = defineField("storeName");
const [storeSlug, storeSlugAtt] = defineField("storeSlug");
const vendorInfo = ref(null);
const isLoadingData = ref(true);
onMounted(() => {
  getVendorInfo().then((res) => {
    vendorInfo.value = res.data.data;
    setValues(res.data.data);
    formValues.storeSlug = res.data.data.storeSlug;
    formValues.bannerUrl = res.data.data.bannerUrl;
    formValues.campaignBanner = res.data.data.campaignBanner;
    isLoadingData.value = false;
  });
});
const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  updateVendorInfo(values)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Information saved");
        isLoading.value = false;
      }
    })
    .catch((err) => {
      isLoading.value = false;
      if (err.response.data.message || err.response.data.Message) {
        toast.error(err.response.data.message || err.response.data.Message);
      }
    });
});
const getProfileData = debounce(() => {
  postStoreName(storeName.value)
    .then((res) => {
      formValues.storeSlug = res.data.data;
      setFieldValue("storeSlug", res.data.data);
    })
    .catch((err) => {
      toast.error(err.response.data.message || err.response.data.Message);
      if (vendorInfo.value?.storeSlug) {
        setFieldValue("storeSlug", vendorInfo.value?.storeSlug);
        formValues.storeSlug = vendorInfo.value?.storeSlug;
      }
    });
}, 1000);
``;
// watch(
//   () => [storeName.value],
//   () => {
//     if (storeName.value.length > 3) {
//       getProfileData();
//     }
//   }
// );
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
