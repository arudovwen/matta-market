<template>
  <section v-if="!loading" class="h-full w-screen flex items-center justify-center">
    <div class="w-full max-w-[900px] mx-auto bg-white p-16 rounded-lg">
      <div>
        <h1
          class="text-[#101828] darks:text-white mb-[4px] text-[30px] font-medium"
        >
          Complete your profile
        </h1>
        <p class="mb-8 text-base darks:text-white/80">
          To get started, please select the type of service that best fits you
        </p>
      </div>
      <div class="mb-8 flex gap-x-1 items-center w-full">
        <div class="w-full">
          <form
            v-if="step === 1"
            @submit.prevent="onSubmit"
            class="grid w-full grid-cols-1 lg:grid-cols-2 gap-x-[18px] gap-y-5"
          >
            <div class="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AuthUserTypeCard
                :active="businessUserType === 0"
                @click="setFieldValue('businessUserType', 0)"
                icon="ri:user-3-line"
                title="Buyer Account"
                description="Search, buy and place orders for products"
              />
              <AuthUserTypeCard
                :active="businessUserType === 1"
                @click="setFieldValue('businessUserType', 1)"
                icon="solar:shop-linear"
                title="Vendor Account"
                description="For merchants who wants to sell their products"
              />
            </div>

            <div
              class="lg:col-span-2 grid gap-y-[22px] mb-[13px] mt-4 max-w-[400px] mx-auto w-full"
            >
              <AppButton
                type="submit"
                :isLoading="isLoading"
                text="Get Started"
                btnClass="normal-case btn-primary !py-3"
                :isDisabled="isLoading || !meta.valid"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  <div v-else class="flex justify-center items-center p-10 h-screen w-screen">
    <div class="text-center flex flex-col justify-center items-center gap-y-6">
      <AppLoaderV2 />
      <span class="text-sm text-center block">Logging user</span>
    </div>
  </div>
</template>
<script setup>
import { getBusinessType } from "~/services/userservices";

definePageMeta({
  layout: "empty",
});
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import { signUpWithMatta } from "~/services/userservices";

const props = defineProps({
  main: {
    default: true,
  },
});
const emits = defineEmits(["close", "toggleAuth"]);
const route = useRoute();

const loading = ref(true);
const authStore = useAuthStore();
const isVerifyPin = ref(false);
const isLoading = ref(false);
const formValues = {
  email: authStore.loggedUser.email,
  businessUserType: 0,
};
const step = ref(1);
const schema = yup.object({
  businessUserType: yup.mixed(),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

const { handleSubmit, defineField, errors, values, meta, setFieldValue } =
  useForm({
    validationSchema: schema,
    initialValues: formValues,
  });

const [businessUserType] = defineField("businessUserType");

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  signUpWithMatta({ ...values })
    .then((res) => {
      if (res.status === 200) {
        authStore.setLoggedUser({
          ...authStore.loggedUser,
          businessUserType: values?.businessUserType,
          accountType: values?.businessUserType,
        });
        toast.success("Profile updated!");
        navigateTo("/");
      }
    })
    .catch((err) => {
      toast.error(err.response.data.message);
      isLoading.value = false;
    });
});

onMounted(async () => {
  try {
    const typeResponse = await getBusinessType();
    if (typeResponse.status === 200) {
      authStore.setLoggedUser({
        ...authStore.loggedUser,
        businessUserType: typeResponse.data?.data?.businessUserType,
      });
      navigateTo("/");
    }
  } finally {
    loading.value = false;
  }
});
</script>
