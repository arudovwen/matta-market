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
            class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
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
                class="relative bg-white rounded-lg text-left p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:w-[500px]"
              >
                <span @click="handleclose('close')" class="cursor-pointer">
                  <i
                    class="uil uil-times cursor-pointer text-lg absolute top-4 right-4"
                  ></i
                ></span>
                <div class="w-full h-full grid items-center">
                  <div>
                    <form
                      @submit.prevent="handleSubmit"
                      v-if="!store.getters.isLoggedIn"
                    >
                      <p class="text-sm mb-8">
                        Sign Up with your work email so Supplier can respond.
                        Already have an account?
                        <span
                          class="text-primary cursor-pointer"
                          @click="toggleModal('signin')"
                          >Sign in <i class="uil uil-arrow-up-right"></i
                        ></span>
                      </p>

                      <div class="flex gap-x-4 items-center mb-10">
                        <button
                          @click="type = 'buyer'"
                          type="button"
                          class="border uppercase w-full rounded-lg px-6 py-3 flex items-center gap-x-2 justify-center text-xs"
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
                          class="border uppercase w-full rounded-lg px-6 py-3 flex items-center gap-x-2 justify-center text-xs"
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
                        <label class="mb-2 font-normal text-xs block"
                          >E-mail</label
                        >
                        <input
                          v-model="v$.email.$model"
                          :class="{ 'border-red-500': v$.email.$error }"
                          class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                          placeholder="E-mail"
                          type="email"
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
                      <div class="grid grid-cols-2 gap-x-6">
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
                        <div class="mb-6">
                          <label
                            class="mb-2 font-normal text-xs block text-matta-black"
                            >Confirm Password</label
                          >
                          <div class="relative flex items-center">
                            <input
                              v-model="v$.confirmPassword.$model"
                              :class="{
                                'border-red-500 ': v$.confirmPassword.$error,
                              }"
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
                            <div
                              class="error-msg text-error text-xs font-semibold"
                            >
                              {{ error.$message }}
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- socials here  -->
                      <div
                        class="flex justify-between gap-x-6 items-center mt-4"
                      >
                        <button
                          :disabled="isLoading || v$.$silentErrors.length"
                          type="submit"
                          class="border text-[13px] border-primary- uppercase min-w-[150px] w-full text-white bg-primary-500 text-center rounded-full px-6 py-4 hover:bg-primary/80 leading-[normal]"
                        >
                          <span v-if="!isLoading">Sign up</span>
                          <span v-if="isLoading"
                            >Signing up
                            <i
                              v-if="isLoading"
                              class="fa fa-spinner fa-spin text-white"
                              aria-hidden="true"
                            ></i
                          ></span>
                        </button>
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
import { ref, reactive, inject } from "vue";
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
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
import { registerUser, loginUser } from "~/services/authservices";
import { useStore } from "vuex";
import { defineProps, defineEmits } from "vue";

const store = useStore();

const type = ref("buyer");
const form = reactive({
  email: "",
  password: "",
  business_UserType: 0,
  confirmPassword: "",
  BusinessName: "BusinessName",
});
defineProps(["title", "text", "isOpen"]);
const emits = defineEmits(["deleteItem", "close"]);
const toggleModal = inject("toggleModal");
function handleclose(val) {
  emits("close", val);
}
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

const v$ = useVuelidate(rules, form);
const isShowingPasword = ref(false);

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
        loginUser(form)
          .then((res) => {
            if (res.status === 200) {
              store.commit("setUser", res.data.data);
              toast.info("Login successful", {
                position: "bottom",
              });
              handleclose("success");
            }
          })

          .catch((err) => {
            isLoading.value = false;

            toast.error((err.response.data.message || err.response.data.Message), {
              position: "bottom",
            });
          });
      }
    })

    .catch((err) => {
      isLoading.value = false;

      toast.error((err.response.data.message || err.response.data.Message));
    });
}
</script>
