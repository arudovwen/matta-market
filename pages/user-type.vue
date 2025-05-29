<template>
  <section
    v-if="!authStore.userType"
    class="flex h-full w-screen items-center justify-center"
  >
    <div class="mx-auto w-full max-w-[750px] rounded-lg bg-white p-8 sm:p-10">
      <header class="mb-8">
        <h1 class="mb-1 text-2xl font-medium text-[#101828] sm:text-[30px]">
          Complete your profile
        </h1>
        <p class="text-base">
          To continue, please select the type of service that best fits you
        </p>
      </header>

      <form @submit.prevent="onSubmit" class="w-full">
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
          <AuthUserTypeCard
            v-for="option in userTypeOptions"
            :key="option.type"
            :active="businessUserType === option.type"
            :icon="option.icon"
            :title="option.title"
            :description="option.description"
            @click="setFieldValue('businessUserType', option.type)"
          />
        </div>
        <div class="mt-6" v-if="businessUserType === 0">
          <SelectSearch
            placeholder=""
            label="Which chemical do you use frequently?"
            name="chemical"
            v-model="chemical"
            :error="errors.chemical"
            :options="products"
            @getQuery="
              (val) => {
                query.search = val;
                console.log(val)
              }
            "
          />
        </div>

        <div class="mx-auto w-full max-w-[400px] mt-8">
          <AppButton
            type="submit"
            :is-loading="isLoading"
            :is-disabled="isLoading || !meta.valid"
            text="Get Started"
            btn-class="normal-case btn-primary !py-3 w-full"
          />
        </div>
      </form>
    </div>
  </section>
  <AppLoaderV2 v-else />
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import { signUpWithMatta } from "~/services/userservices";
import { getProducts } from "~/services/productservices";

definePageMeta({
  layout: "empty",
  // middleware: "user-type",
});

const query = reactive({
  search: "",
  page: 1,
  pageSize: 100,
});
const products = ref([]);
const loading = ref(false);
const config = useRuntimeConfig();
const authStore = useAuthStore();
const isLoading = ref(false);
const route = useRoute();
// Constants
const userTypeOptions = [
  {
    type: 0,
    icon: "ri:user-3-line",
    title: "Buyer Account",
    description: "Search, buy and place orders for products",
  },
  {
    type: 1,
    icon: "solar:shop-linear",
    title: "Vendor Account",
    description: "For merchants who wants to sell their products",
  },
];

// Form setup
const schema = yup.object({
  businessUserType: yup.number().required(),
   email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  chemical: yup.mixed().when("businessUserType", {
    is: 0,
    then: (schema) => schema.required("Chemical is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const { handleSubmit, defineField, meta, setFieldValue, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    email: authStore.userInfo?.email,
    businessUserType: 0,
    appCode: config.public.APP_CODE,
    ssoUserCategory: authStore.userInfo?.userCategory,
  },
});

const [businessUserType] = defineField("businessUserType");
const [chemical, chemicalAtt] = defineField("chemical");

// Form submission handler
const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    const response = await signUpWithMatta({ ...values });

    if (response.status === 200) {
      removeItem("isMattaSignup");
      authStore.setLoggedUser({
        ...authStore.userInfo,
        businessUserType: values.businessUserType,
        accountType: values.businessUserType,
      });

      toast.success("Profile updated!");
      navigateTo(route.query?.return_to || "/");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "An error occurred");
  } finally {
    isLoading.value = false;
  }
});

// Navigation guard
onBeforeMount(() => {
  if (authStore.userType) {
    navigateTo("/");
  }
});
async function getData() {
  loading.value = true;
  getProducts(query)
    .then((res) => {
      if (res.status === 200) {
        products.value = res.data?.data?.map((i) => ({
          ...i,
          label: i.title,
          value: i.title,
        }));
      }
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
}
watch(
  () => [query.search],
  () => {
    getData();
    console.log(query.search);
  }
);
onMounted(() => {
  getData();
});
</script>
