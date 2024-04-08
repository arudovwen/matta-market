<template>
  <div
    class="pt-0 lg:pt-0 w-full max-w-[500px] mx-auto grid flex-1 items-center"
  >
    <div>
      <h1 class="text-[#333] darks:text-white mb-[10px] text-[28px] font-bold">
        Reset Password
      </h1>
      <p class="mb-[25px] text-sm text-[#666] darks:text-white/80">
        Enter the email associated with your account and we”ll send you
        instructions to reset your password
      </p>
      <form @submit.prevent="onSubmit">
        <div class="mb-5">
          <Textinput
            hasicon
            placeholder=""
            label="New Password"
            type="password"
            v-model="password"
            v-bind="passwordAtt"
            :error="errors.password"
          />
        </div>
        <div class="mb-6">
          <Textinput
            hasicon
            placeholder=""
            label="Confirm Password"
            type="password"
            v-model="confirmPassword"
            v-bind="confirmPasswordAtt"
            :error="errors.confirmPassword"
          />
        </div>

        <div class="grid gap-y-[22px] mb-9">
          <AppButton  type="submit"
            :isLoading="isLoading"
            :isDisabled="isLoading" text="Submit" btnClass="btn-primary !py-3" />
        </div>
        <span
          class="flex items-center text-center text-sm text-[#333] darks:text-white/80 gap-x-1 justify-center"
        >
          Have an account?
          <NuxtLink to="/auth/login" class="font-semibold text-[#2176FF]"
            >Sign in</NuxtLink
          >
        </span>
      </form>
    </div>
  </div>
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from 'vue3-toastify';
import { resetPassword } from "~/services/authservices";

definePageMeta({
  layout: "auth",
  middleware: "auth",
});
useHead({
  
  title: "Reset password | Matta"
});

const isLoading = ref(false);
const route = useRoute();
const router = useRouter();
const formValues = {
  confirmPassword: "",
  password: "",
  token: route.query.code,
  email: route.query.email,
};

const schema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [password, passwordAtt] = defineField("password");
const [confirmPassword, confirmPasswordAtt] = defineField("confirmPassword");

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  resetPassword(values)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Password Reset successful");
        router.push("/auth/login");
      }
    })

    .catch((err) => {
      isLoading.value = false;
      if ((err.response.data.message || err.response.data.Message)) {
        toast.error((err.response.data.message || err.response.data.Message));
      }
    });
});
</script>
