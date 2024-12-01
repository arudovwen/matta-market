<template>
  <div v-if="step === 1" class="pt-10 lg:pt-0 w-full max-w-[500px] mx-auto">
    <h1 class="text-[#333] darks:text-white mb-[10px] text-3xl font-bold">
      Welcome back
    </h1>
    <p class="mb-[31px] text-sm text-[#666] darks:text-white/80">
      Please enter your details to sign in
    </p>
    <form @submit.prevent="onSubmit">
      <div class="mb-5">
        <TextinputTwo
          icon="line-md:email"
          placeholder=""
          label="Email"
          type="email"
          name="email"
          v-bind="emailAtt"
          v-model="email"
          :error="errors.email"
        />
      </div>

      <div class="mb-5">
        <TextinputTwo
          hasicon
          placeholder=""
          label="Password"
          type="password"
          name="password"
          v-model="password"
          v-bind="passwordAtt"
          :error="errors.password"
        />
      </div>
      <span class="block text-sm text-[#333] darks:text-white/80 mb-10">
        <NuxtLink to="/auth/forgot-password" class="font-medium"
          >Forgot password?</NuxtLink
        >
      </span>
      <div class="grid gap-y-[22px] mb-9">
        <AppButton
          type="submit"
          :isLoading="isLoading"
          :isDisabled="isLoading"
          text="Login"
          btnClass="btn-primary !py-3"
        />
        <AppButton
          v-if="main"
          :disabled="!isReady"
          @click="() => login()"
          text="Sign in with Google"
          icon="flat-color-icons:google"
          btnClass="btn-dark !py-3 disabled:opacity-50"
          type="button"
        />
      </div>
      <span
        class="flex items-center text-center text-sm text-[#333] darks:text-white/80 gap-x-1 justify-center"
      >
        Don’t have an account?
        <NuxtLink
          to="/auth/register"
          v-if="main"
          class="font-semibold text-[#2176FF]"
          >Sign Up</NuxtLink
        >
        <span
          v-else
          @click="emits('toggleAuth', 'register')"
          class="font-semibold text-[#2176FF] cursor-pointer"
          >Sign Up</span
        >
      </span>
    </form>
  </div>
  <AuthOtp
    v-if="step === 2"
    title="OTP Verification"
    :isVerifyPin="isVerifyPin"
    @close="step = 1"
    buttonText="Verify OTP"
    @handleSubmit="handleFinalSubmit"
    :isLoading="isLoading"
    :email="formValues.email"
  />
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import { loginUser, sociallogin, loginUser2FA } from "~/services/authservices";

const props = defineProps({
  main: {
    default: true,
  },
});
const step = ref(1);
const isVerifyPin = ref(false);
const isLoading = ref(false);
const formValues = {
  email: "",
  password: "",
};

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup.string().required("Password is required"),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
const emits = defineEmits(["close", "toggleAuth"]);
const authStore = useAuthStore();
const [email, emailAtt] = defineField("email");
const [password, passwordAtt] = defineField("password");
const route = useRoute();
const router = useRouter();
const onSubmit = handleSubmit((values) => {
  formValues.email = values.email;
  formValues.password = values.password;
  isLoading.value = true;
  loginUser(values)
    .then((res) => {
      if (res.status === 200) {
        isVerifyPin.value = true;
        step.value = 2;
        isLoading.value = false;
      }
    })

    .catch((err) => {
      isLoading.value = false;

      if (!err.response.data) return;
      const { data } = err.response;
      if (data.message || data.Message) {
        toast.error(data.message || data.Message);
      }
      if (
        (data.message || data.Message).includes("Email has not verified yet")
      ) {
        router.push(
          `/auth/register?email=${encodeURIComponent(values.email)}&step=2`
        );
      }
    });
});
const handleFinalSubmit = (token) => {
  isLoading.value = true;
  loginUser2FA({ token, email: formValues.email })
    .then((res) => {
      if (res.status === 200) {
      
        isLoading.value = false;
        authStore.setLoggedUser(res.data.data);
        authStore.setHasPin(res.data.data.hasTransactionPIN);
        localStorage.setItem("fetchCart", true);
        if (!props.main) {
          toast.info("Login successful");
          emits("close");
          return;
        }
        if (route.query.redirected_from) {
          window.location.replace(route.query.redirected_from);
          return;
        }
        if (
          !res.data.data?.onboardingPageStatus &&
          res.data.data?.businessUserType.toLowerCase() === "supplier"
        ) {
          toast.info("Login successful");
          window.location.replace("/products");
          return;
        }
        toast.success("Login successful");

        window.location.replace("/");
      }
    })

    .catch((err) => {
      isLoading.value = false;

      if (!err?.response?.data) return;
      const { data } = err.response;
      if (data?.message || data?.Message) {
        toast.error(data?.message || data?.Message);
      }
      if (
        (data?.message || data?.Message).includes("Email has not verified yet")
      ) {
        router.push(
          `/auth/resend-verification/${encodeURIComponent(formValues.email)}`
        );
      }
    });
};

const handleLoginSuccess = (response) => {
  const { access_token } = response;
  let data = {
    provider: "GOOGLE",
    idToken: access_token,
    business_UserType: 0,
  };

  sociallogin(data)
    .then((res) => {
      if (res.status === 200) {
        store.commit("setUser", res.data.data);
        toast.success(res.data.message ? res.data.message : "Login successful");
        if (res.data.message.includes("Email has not verified yet")) {
          return;
        }

        if (!res.data.data.onboardingPageStatus) {
          window.location.replace("/overview");
          return;
        }
        if (route.query.redirected_from) {
          window.location.replace(route.query.redirected_from);
          return;
        }
        if (route.query.redirect_to) {
          window.location.replace(route.query.redirect_to);
          return;
        }

        window.location.replace("/");
      }
    })
    .catch((err) => {
      invalidCredentials.value = true;
      isLoading.value = false;
      if (!err.response.data) return;
      const { data } = err.response;
      if (data.message || data.Message) {
        toast.error(data.message || data.Message);
      }
      if (
        (data.message || data.Message).includes("Email has not verified yet")
      ) {
        router.push(
          `/auth/register?email=${encodeURIComponent(values.email)}&step=2`
        );
      }
    });
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};

const { isReady, login } = useTokenClient({
  onSuccess: handleLoginSuccess,
  onError: handleLoginError,
  // other options
});
</script>
