<template>
  <div class="pt-10 lg:pt-0 w-full max-w-[500px] mx-auto">
    <h1 class="text-[#333] darks:text-white mb-[10px] text-2xl font-bold">
      Login
    </h1>
    <p class="mb-[31px] text-sm text-[#666] darks:text-white/80">
      Please enter your details to sign in
    </p>
    <form @submit.prevent="onSubmit">
      <div class="mb-5">
        <Textinput
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
        <Textinput
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
        <NuxtLink
          to="/auth/forgot-password?redirected_from=/cart"
          class="font-medium"
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
      </div>
      <span
        class="flex items-center text-center text-sm text-[#333] darks:text-white/80 gap-x-1 justify-center"
      >
        Don’t have an account?
        <span
          @click="type = 'register'"
          class="cursor-pointer font-semibold text-[#2176FF]"
          >Sign Up</span
        >
      </span>
    </form>
  </div>
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import { loginUser, sociallogin } from "~/services/authservices";

definePageMeta({
  layout: "auth",
  middleware: "auth",
});
useHead({
  title: "Login | Matta",
  meta: [{ name: "description", content: "Login | Matta" }],
});
const type = inject("type");
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
const authStore = useAuthStore();
const [email, emailAtt] = defineField("email");
const [password, passwordAtt] = defineField("password");
const route = useRoute();
const router = useRouter();

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  loginUser(values)
    .then((res) => {
      if (res.status === 200) {
        authStore.setLoggedUser(res.data.data);
        toast.success("Login successful");
        window.location.reload();
      }
    })

    .catch((err) => {
      isLoading.value = false;
      if (err?.response?.data?.message || err?.response?.data?.Message) {
        toast.error(err?.response?.data?.message || err?.response?.data?.Message);
      }
      if (
        (err?.response?.data?.message || err?.response?.data?.Message).includes(
          "Email has not verified yet"
        )
      ) {
        router.push(
          `/auth/resend-verification/${encodeURIComponent(values.email)}`
        );
      }
    });
});

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
        localStorage.setItem("fetchCart", "true");
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
      if (err?.response?.data?.message || err?.response?.data?.Message) {
        toast.error(err?.response?.data?.message || err?.response?.data?.Message);
      }
      if (
        (err?.response?.data?.message || err?.response?.data?.Message).includes(
          "Email has not verified yet"
        )
      ) {
        router.push(`/resend-verification/${form.email}`);
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
