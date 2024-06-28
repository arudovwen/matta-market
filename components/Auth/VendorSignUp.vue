<template>
  <form
    @submit.prevent="onSubmit"
    class="grid grid-cols-1 lg:grid-cols-2 gap-x-[18px] gap-y-5"
  >
    <div>
      <Textinput
        placeholder=""
        label="First name"
        type="text"
        name="firstName"
        v-bind="firstNameAtt"
        v-model="firstName"
        :error="errors.firstName"
        isCumpulsory
      />
    </div>
    <div>
      <Textinput
        placeholder=""
        label="Last name"
        type="text"
        name="lasttName"
        v-bind="lastNameAtt"
        v-model="lastName"
        :error="errors.lastName"
        isCumpulsory
      />
    </div>
    <div>
      <Textinput
        placeholder="Email address"
        label="Email"
        type="email"
        name="email"
        v-bind="emailAtt"
        v-model="email"
        :error="errors.email"
        isCumpulsory
      />
    </div>
    <div>
      <Textinput
        placeholder=""
        label="Phone number"
        type="tel"
        name="phone"
        v-bind="phoneAtt"
        v-model="phone"
        :error="errors.phone"
        isCumpulsory
      />
    </div>
    <div class="lg:col-span-2">
      <Textinput
        placeholder=""
        label="Company name"
        type="text"
        name="companyName"
        v-bind="companyNameAtt"
        v-model="companyName"
        :error="errors.companyName"
        isCumpulsory
      />
    </div>
    <div>
      <Textinput
        placeholder=""
        label="Password"
        type="password"
        name="password"
        v-bind="passwordAtt"
        v-model="password"
        :error="errors.password"
        isCumpulsory
      />
    </div>
    <div>
      <Textinput
        placeholder=""
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        v-bind="confirmPasswordAtt"
        v-model="confirmPassword"
        :error="errors.confirmPassword"
        isCumpulsory
      />
    </div>
    <div
      class="lg:col-span-2 flex items-center text-[#333] darks:text-slate-400 text-xs lg:text-sm gap-x-[2px]"
    >
      <Checkbox
        v-model.value="agree"
        label="I agree to the "
        labelClass="text-xs lg:text-sm"
      />
      <span
        ><NuxtLink to="/terms" class="text-[#2176FF]">Terms </NuxtLink>
        and
        <NuxtLink to="/policy" class="text-[#2176FF]">Policy</NuxtLink>
        of Matta Trade</span
      >
    </div>

    <div class="lg:col-span-2 grid gap-y-[22px] mb-9 mt-4">
      <AppButton
        type="submit"
        :isLoading="isLoading"
        text="Create your account"
        btnClass="normal-case btn-primary !py-3"
        :isDisabled="!agree || isLoading"
      />
    </div>
    <span
      class="lg:col-span-2 flex items-center text-center text-sm text-[#333] darks:text-white/80 gap-x-1 justify-center"
    >
      Already have an account?
      <NuxtLink to="/auth/login" class="font-semibold text-[#2176FF]"
        >Login</NuxtLink
      >
    </span>
  </form>
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import { registerUser } from "~/services/authservices";

const agree = ref(false);
const isLoading = ref(false);
const formValues = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  password: "",
  confirmPassword: "",
  business_UserType: 1,
  companyName: "",
};

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  firstName: yup.string().required("First name is required"),
  companyName: yup.string().required("Company name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup.string().required("Phone number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&#)"
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

const [email, emailAtt] = defineField("email");
const [password, passwordAtt] = defineField("password");
const [firstName, firstNameAtt] = defineField("firstName");
const [lastName, lastNameAtt] = defineField("lastName");
const [phone, phoneAtt] = defineField("phone");
const [confirmPassword, confirmPasswordAtt] = defineField("confirmPassword");
const [companyName, companyNameAtt] = defineField("companyName");
const router = useRouter();

const onSubmit = handleSubmit((values) => {
	console.log("Submitting");
  isLoading.value = true;
  registerUser({ ...values, business_UserType: 1 })
    .then((res) => {
      if (res.status === 200) {
        toast.info(
          "Sign up successful, Complete registration via link sent to your email"
        );
        router.push("/registration-success");
      }
    })

    .catch((err) => {
      isLoading.value = false;
      if (err?.response?.data?.message || err?.response?.data?.Message) {
        toast.error(
          err?.response?.data?.message ||
            err?.response?.data?.Message ||
            "Something went wrong"
        );
      }
    });
});
</script>
