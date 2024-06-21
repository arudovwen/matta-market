<template>
  <div class="mt-12 max-w-[400px]">
    <p class="text-lg font-medium mb-2">Only one step left!</p>
    <p class="text-sm text-[#ABABAB] mb-8">
      Sign Up with your work email so Supplier can respond. Already have an
      account?
      <span class="text-primary" @click="toggleAuth"
        >Log in <i class="uil uil-arrow-up-right text-x"></i
      ></span>
    </p>
    <form @submit.prevent="handleSubmit">
      <div class="flex gap-x-3 md:gap-x-6 items-center mb-10">
        <button
          @click="type = 'buyer'"
          type="button"
          class="border uppercase w-full rounded-lg px-6 py-3 text-sm flex items-center gap-x-2 justify-center"
          :class="
            type === 'buyer'
              ? 'border-matta-black bg-matta-black hover:bg-matta-black/80 text-white'
              : 'border-matta-black bg-white hover:bg-matta-black/10 text-matta-black'
          "
        >
          <i class="uil uil-shopping-cart-alt"></i>
          <span class="opacity-50">|</span>
          <span>Buyer</span>
        </button>

        <button
          @click="type = 'supplier'"
          type="button"
          class="border uppercase w-full rounded-lg px-6 py-3 text-sm flex items-center gap-x-2 justify-center"
          :class="
            type === 'supplier'
              ? 'border-matta-black bg-matta-black hover:bg-matta-black/80 text-white'
              : 'border-matta-black bg-white hover:bg-matta-black/10 text-matta-black'
          "
        >
          <i class="uil uil-shop"></i>
          <span class="opacity-50">|</span>
          <span>Supplier</span>
        </button>
      </div>

      <div class="mb-6">
        <label class="mb-2 font-medium text-sm text-[#344054] block text-left">E-mail</label>
        <input
          v-model="v$.email.$model"
          :class="{ 'border-red-500': v$.email.$error }"
          class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          placeholder="E-mail"
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
      <div class="mb-6">
        <label class="mb-2 font-normal text-xs block text-matta-black"
          >Password</label
        >
        <div class="relative flex items-center">
          <input
            v-model="v$.password.$model"
            :class="{ 'border-red-500 ': v$.password.$error }"
            class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            placeholder="Password"
            autocomplete="off"
            :type="!isShowingPasword ? 'password' : 'text'"
          />
          <EyeIcon
            v-if="!isShowingPasword"
            @click="isShowingPasword = !isShowingPasword"
            class="w-4 h-4 absolute cursor-pointer right-6"
          />
          <EyeSlashIcon
            @click="isShowingPasword = !isShowingPasword"
            v-else
            class="w-4 h-4 absolute cursor-pointer right-6"
          />
        </div>
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.password.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="mb-12">
        <label class="mb-2 font-normal text-xs block text-matta-black"
          >Confirm Password</label
        >
        <div class="relative flex items-center">
          <input
            v-model="v$.confirmPassword.$model"
            :class="{ 'border-red-500 ': v$.confirmPassword.$error }"
            class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            placeholder="Password"
            autocomplete="off"
            :type="!isShowingPasword ? 'password' : 'text'"
          />
          <EyeIcon
            v-if="!isShowingPasword"
            @click="isShowingPasword = !isShowingPasword"
            class="w-4 h-4 absolute cursor-pointer right-6"
          />
          <EyeSlashIcon
            @click="isShowingPasword = !isShowingPasword"
            v-else
            class="w-4 h-4 absolute cursor-pointer right-6"
          />
        </div>
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.confirmPassword.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="">
        <button
          :disabled="v$.$silentErrors.length || isLoading"
          :class="{
            'opacity-70 cursor-not-allowed':
              v$.$silentErrors.length || isLoading,
          }"
          class="border mb-4 text-[13px] border-primary- uppercase text-white w-full min-w-[55px] bg-primary-500 text-center opacity-80 rounded-full px-6 py-2 hover:opacity-100 h-11 leading-[normal]"
        >
          <span v-if="isLoading"
            >Signing up
            <i
              v-show="isLoading"
              class="fa fa-spinner fa-spin text-white"
              aria-hidden="true"
            ></i
          ></span>
          <span v-else> Sign up</span>
        </button>

        <div class="text-center mt-4">
          <p
            class="mb-0 text-matta-black text-sm relative before:absolute before:w-[25%] before:border-t before:top-[7px] after:top-[7px] before:left-0 after:right-0 after:border-t after:w-[25%] after:absolute text-center uppercase"
          >
            Or continue with
          </p>
          <div class="flex justify-center gap-x-6 mt-6">
            <button
              class="border border-[#E7EBEE] rounded-full flex items-center h-11 w-12 justify-center text-center hover:bg-gray-400 hover:shadow-sm relative"
            >
               <img
                src="~/assets/img/google.png"
                alt="google"
                class="w-4 h-auto"
              />
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  helpers,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import { toast } from 'vue3-toastify';
import { registerUser } from "~/services/authservices";

const toggleAuth = inject("toggleAuth");

const type = ref("buyer");
const handleRequestSubmit = inject("handleSubmit");
const form = reactive({
  email: "",
  password: "",
  business_UserType: 0,
  confirmPassword: "",
  BusinessName: "BusinessName",
});
const isLoading = ref(false);
const validPassword = (value) => {
  let res = /[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value);
  return res;
};
const specialPassword = (value) => {
  let res = /[@&!%#$%]/.test(value);
  return res;
};
const samePassword = (value) => value === form.password;
const rules = {
  email: {
    required: helpers.withMessage("Email field cannot be empty", required),
    email: helpers.withMessage("Email is invalid", email),
    maxLength: maxLength(50),
  },

  password: {
    required: helpers.withMessage("Password field cannot be empty", required),
    minLength: minLength(8),
    maxLength: maxLength(24),
    validPassword: helpers.withMessage(
      "Password must include UPPER/lowercase characters and number",
      validPassword
    ),
    specialPassword: helpers.withMessage(
      "Password must contain at least 1 of the special  characters @&!-%#$%",
      specialPassword
    ),
  },
  confirmPassword: {
    required: helpers.withMessage(
      "Confirm Password field cannot be empty",
      required
    ),
    minLength: minLength(8),
    maxLength: maxLength(24),
    validPassword: helpers.withMessage(
      "Confirm Password is invalid",
      validPassword
    ),
    samePassword: helpers.withMessage("Passwords do not match!", samePassword),
  },
};

const invalidCredentials = ref(false);
const v$ = useVuelidate(rules, form);
const isShowingPasword = ref(false);

//Timer

async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;
  type.value == "buyer"
    ? (form.business_UserType = 0)
    : (form.business_UserType = 1);
  registerUser(form)
    .then((res) => {
      if (res.status === 200) {
        toast.info("Registration successful");
      }
      handleRequestSubmit();
    })

    .catch((err) => {
      invalidCredentials.value = true;
      isLoading.value = false;

      toast.error((err.response.data.message || err.response.data.Message));
    });
}
</script>
