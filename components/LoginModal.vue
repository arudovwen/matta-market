<template>
  <div>
    <TransitionRoot as="template" :show="isOpen">
      <Dialog as="div" class="relative z-[999]" @close="handleclose('close')">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-[#222222]/60 transition-opacity"
          />
        </TransitionChild>

        <div class="fixed z-10 inset-0 overflow-y-auto">
          <div
            class="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
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
              <div
                class="relative bg-white rounded-lg text-left p-6 lg:p-10 overflow-hidden shadow-xl transform transition-all sm:w-[400px]"
              >
                <span @click="handleclose('close')" class="cursor-pointer">
                  <i
                    class="uil uil-times cursor-pointer text-lg absolute top-4 right-4"
                  ></i
                ></span>
                <div class="w-full h-full grid items-center">
                  <div>
                    <form @submit.prevent="handleSubmit">
                      <div class="mb-6">
                        <label class="mb-2 font-normal text-xs block"
                          >E-mail</label
                        >
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
                          <div
                            class="error-msg text-error text-xs font-semibold"
                          >
                            {{ error.$message }}
                          </div>
                        </div>
                      </div>
                      <div class="mb-6">
                        <label
                          class="mb-2 font-normal text-xs block text-matta-black"
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
                          <div
                            class="error-msg text-error text-xs font-semibold"
                          >
                            {{ error.$message }}
                          </div>
                        </div>
                      </div>
                      <div class="mb-6 flex items-center justify-between">
                        <label
                          class="flex text-xs items-center text-matta-black"
                        >
                          <input
                            type="checkbox"
                            class="mr-1 accent-matta-black"
                          />
                          Keep me logged in
                        </label>
                        <NuxtLink
                          to="/forgot-password"
                          class="text-xs hover:underline"
                          >Forgot password?
                        </NuxtLink>
                      </div>

                      <div class="mb-4">
                        <button
                          type="submit"
                          :disabled="isLoading"
                          class="border text-[13px] mb-4 border-primary-500 uppercase text-white lg:min-w-[120px] w-full bg-primary-500 rounded-lg px-6 py-2 hover:bg-primary/80 h-11"
                        >
                          <span>
                            <span
                              class="flex gap-x-4 justify-center items-center"
                              v-if="isLoading"
                              ><span> Signing in...</span>
                              <i
                                v-if="isLoading"
                                class="fa fa-spinner fa-spin text-white"
                                aria-hidden="true"
                              ></i
                            ></span>
                            <span v-else>Sign in</span>
                          </span>
                        </button>
                      </div>
                      <div v-if="showSignup">
                        Don't have an account?
                        <span
                          class="text-primary cursor-pointer"
                          @click="toggleModal('signup')"
                          >Sign up</span
                        >
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
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
import { loginUser } from "@/services/authservices";
import { useStore } from "vuex";

defineProps({
  title: {
    default: "",
  },
  text: {
    default: "",
  },
  isOpen: {
    default: false,
  },
  showSignup: {
    default: true,
  },
});
const emits = defineEmits(["deleteItem", "close"]);
const toggleModal = inject("toggleModal");
function handleclose(val) {
  emits("close", val);
}
const store = useStore();

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
        localStorage.setItem("fetchCart", "true");
        store.commit("setUser", res.data.data);
        store.dispatch("handleToken", res.data.data.jwToken).then(() => {
          handleclose("success");
        });
        toast.info("Login successful");
        window.location.reload();
      }
    })

    .catch((err) => {
      invalidCredentials.value = true;
      isLoading.value = false;

      toast.error((err?.response?.data?.message || err?.response?.data?.Message));
    });
}
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("@/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
