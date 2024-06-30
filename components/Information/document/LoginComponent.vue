<template>
  <div class="w-full h-full grid items-center mt-12">
    <p class="text-lg font-medium mb-2">Only one step left!</p>
    <p class="text-sm text-[#ABABAB] mb-8">
      Sign into your account. Don't have an account?
      <span class="text-primary" @click="toggleAuth"
        >Sign up <i class="uil uil-arrow-up-right text-x"></i
      ></span>
    </p>
    <div>
      <form @submit.prevent="handleSubmit">
        <div class="mb-6">
          <label title="" class="mb-2 font-medium text-sm text-[#344054] block text-left">E-mail</label>
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
          <label title="" class="mb-2 font-normal text-xs block text-matta-black"
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
        <div class="mb-6 flex items-center justify-between">
          <label title="" class="flex text-xs items-center text-matta-black">
            <input type="checkbox" class="mr-1 accent-matta-black" /> Keep me
            logged in
          </label>
          <NuxtLink to="/forgot-password" class="text-xs hover:underline"
            >Forgot password?
          </NuxtLink>
        </div>

        <div class="mb-4">
          <button
            type="submit"
            :disabled="isLoading"
            class="border text-[13px] mb-4 border-primary- uppercase text-white lg:min-w-[120px] w-full bg-primary-500 opacity-80 rounded-full px-6 py-2 hover:opacity-100 h-11"
          >
            <span>
              <span v-if="isLoading"
                >Signing in
                <i
                  v-show="isLoading"
                  class="fa fa-spinner fa-spin text-white"
                  aria-hidden="true"
                ></i
              ></span>
              <span v-else>Sign in</span>
            </span>
          </button>

          <!-- socials here  -->
          <div class="text-center mt-4">
            <p
              class="mb-0 text-matta-black text-sm relative before:absolute before:w-[25%] before:border-t before:top-[7px] after:top-[7px] before:left-0 after:right-0 after:border-t after:w-[25%] after:absolute text-center"
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
  </div>
</template>

<script setup>
import { ref, reactive, inject } from "vue";
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
import { useRoute } from "vue-router";
import { loginUser } from "~/services/authservices";
import { useStore } from "vuex";

const store = useStore();

const route = useRoute();
const form = reactive({
  email: "",
  password: "",
});
const isLoading = ref(false);
const validPassword = (value) => {
  let res = /[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value);

  return res;
};
const rules = {
  email: {
    required: helpers.withMessage("Email field cannot be empty", required),
    email: helpers.withMessage("Email is invalid", email),
    maxLength: maxLength(50),
  },

  password: {
    required: helpers.withMessage("Password field cannot be empty", required),
    minLength: minLength(8),
    validPassword: helpers.withMessage("Password is invalid", validPassword),
    maxLength: maxLength(24),
  },
};

const invalidCredentials = ref(false);
const v$ = useVuelidate(rules, form);
const isShowingPasword = ref(false);

async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;
  loginUser(form)
    .then((res) => {
      if (res.status === 200) {
        store.commit("setUser", res.data.data);
        toast.info("Login successful");
        if (route.query.redirected_from) {
          window.location.href = route.query.redirected_from;
          return;
        }
        if (route.query.redirect_to) {
          window.location.href = route.query.redirect_to;
          return;
        }

        window.location.href = "/";
      }
    })

    .catch((err) => {
      invalidCredentials.value = true;
      isLoading.value = false;

      toast.error((err.response.data.message || err.response.data.Message));
    });
}
const toggleAuth = inject("toggleAuth");
</script>
