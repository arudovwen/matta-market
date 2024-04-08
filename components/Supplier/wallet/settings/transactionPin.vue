<template>
  <div class="grid gap-8 lg:grid-cols-2">
    <div>
      <span class="block text-base font-medium mb-1">Transaction pin</span>
      <span class="block text-sm">Manage your transaction pin</span>
    </div>
    <div class="max-w-[400px]">
      <form @submit.prevent="handleSubmit">
        <div class="mb-6">
          <label class="mb-2 font-normal text-xs block text-matta-black"
            >Current pin</label
          >
          <div class="relative flex items-center">
            <input
              v-model="v$.currentPin.$model"
              :class="{ 'border-red-500 ': v$.currentPin.$error }"
              class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
              placeholder="Enter current pin"
              autocomplete="off"
              :type="!isShowingPasword ? 'password' : 'text'"
              maxlength="4"
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
            v-for="error of v$.currentPin.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="mb-6">
          <label class="mb-2 font-normal text-xs block text-matta-black"
            >New pin</label
          >
          <div class="relative flex items-center">
            <input
              v-model="v$.pin.$model"
              :class="{ 'border-red-500 ': v$.pin.$error }"
              class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
              placeholder="Enter new pin"
              autocomplete="off"
              :type="!isShowingPasword ? 'password' : 'text'"
              maxlength="4"
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
            v-for="error of v$.pin.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="mb-6">
          <label class="mb-2 font-normal text-xs block text-matta-black"
            >Confirm pin</label
          >
          <div class="relative flex items-center">
            <input
              v-model="v$.confirmPin.$model"
              :class="{ 'border-red-500 ': v$.confirmPin.$error }"
              class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
              placeholder="Confirm your pin"
              autocomplete="off"
              :type="!isShowingPasword ? 'password' : 'text'"
              maxlength="4"
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
            v-for="error of v$.confirmPin.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>

        <div class="">
          <button
            type="submit"
            :disabled="isLoading"
            class="border text-[13px] mb-4 border-primary- uppercase text-white lg:min-w-[120px] w-full bg-primary-500 rounded-lg px-6 py-2 hover:bg-primary/80 h-11"
          >
            <span>
              <span
                class="flex gap-x-4 justify-center items-center"
                v-if="isLoading"
                ><span> Processing...</span>
                <i
                  v-if="isLoading"
                  class="fa fa-spinner fa-spin text-white"
                  aria-hidden="true"
                ></i
              ></span>
              <span v-else>Change pin</span>
            </span>
          </button>
        </div>
        <span
          class="block text-sm text-center"
          v-if="!details?.pinSet && !isPageLoading"
          >Don't have a transaction pin?
          <button
            type="button"
            @click="isOpen = isCreatePin = true"
            class="text-blue-700"
          >
            Create pin
          </button></span
        >
      </form>
    </div>
  </div>

  <Modal :isOpen="isOpen" @togglePopup="isCreatePin = isOpen = false">
    <template #content>
      <div class="max-w-[500px]">
        <CreatePin
          v-if="isCreatePin"
          @close="isCreatePin = isOpen = false"
          :details="details"
        />
        <form
          @submit.prevent="verifyWalletPin"
          v-if="isVerify"
          class="w-full p-6"
        >
          <legend class="text-xl font-medium text-center mb-5 block">
            Enter OTP code
          </legend>
          <div class="mb-6">
            <label class="mb-2 font-normal text-xs block text-matta-black"
              >Otp code</label
            >
            <div class="relative flex items-center">
              <input
                v-model="v1$.otp.$model"
                :class="{ 'border-red-500 ': v1$.otp.$error }"
                class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                placeholder="Enter otp code"
              />
            </div>
            <div
              class="text-red-500 mt-1"
              v-for="error of v1$.otp.$errors"
              :key="error.$uid"
            >
              <div class="error-msg text-error text-xs font-semibold">
                {{ error.$message }}
              </div>
            </div>
          </div>

          <div class="">
            <button
              type="submit"
              :disabled="isLoading"
              class="border text-[13px] mb-4 border-primary- uppercase text-white lg:min-w-[120px] w-full bg-primary-500 rounded-lg px-6 py-2 hover:bg-primary/80 h-11"
            >
              <span>
                <span
                  class="flex gap-x-4 justify-center items-center"
                  v-if="isLoading"
                  ><span> Processing...</span>
                  <i
                    v-if="isLoading"
                    class="fa fa-spinner fa-spin text-white"
                    aria-hidden="true"
                  ></i
                ></span>
                <span v-else>Confirm</span>
              </span>
            </button>
          </div>
        </form>
        <span class="cursor-pointer" @click="isCreatePin = isOpen = false"
          ><AppIcon icon="heroicons-solid:x"
            class="w-4 h-4 absolute top-4 right-3 text-matta-black z-10"
        /></span>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import Modal from "~/components/IndexModal";
import { ref, reactive, inject } from "vue";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import useVuelidate from "@vuelidate/core";
import {
  required,
  helpers,
  minLength,
  maxLength,
  numeric,
} from "@vuelidate/validators";
import CreatePin from "../modals/CreatePin";

import { changeWalletpin, verifyPin } from "~/services/walletservice";
import { toast } from 'vue3-toastify';


const isOpen = ref(false);
const details = inject("details");
const isCreatePin = ref(false);
const form = reactive({
  currentPin: "",
  pin: "",
  confirmPin: "",
  walletId: "",
});
const form1 = reactive({
  otp: null,
});

const rule = {
  otp: {
    required,
    minLength: minLength(6),
    maxLength: maxLength(6),
    numeric,
  },
};
const v1$ = useVuelidate(rule, form1);
const isPageLoading = inject("isPageLoading");
const isLoading = inject("isLoading");
const isVerify = ref(false);
const validPassword = (value) => value === form.pin;
const rules = {
  currentPin: {
    required,
    numeric,
    minLength: minLength(4),
    maxLength: maxLength(4),
  },
  walletId: { required },
  pin: {
    required: helpers.withMessage("Pin field cannot be empty", required),
    minLength: minLength(4),
    maxLength: maxLength(4),
    numeric,
  },
  confirmPin: {
    validPassword: helpers.withMessage("Pin is invalid", validPassword),
  },
};

const v$ = useVuelidate(rules, form);
const isShowingPasword = ref(false);
async function handleSubmit() {
  form.walletId = details.value.walletId;
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;

  changeWalletpin(form)
    .then((res) => {
      if (res.status === 200) {
        toast.info("Verify your otp");
        isLoading.value = false;
        isVerify.value = isOpen.value = true;
      }
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error((err.response.data.message || err.response.data.Message));
    });
}
async function verifyWalletPin() {
  form.walletId = details.value.walletId;
  const validity = await v1$.value.$validate();
  if (!validity) return;
  verifyPin(form1.otp)
    .then((res) => {
      if (res.status == 200) {
        toast.info("Pin changed successfully");
        isOpen.value = isVerify.value = isLoading.value = false;
        v$.value.$reset();
        v1$.value.$reset();
        form1.otp = form.currentPin = form.pin = form.confirmPin = "";
      }
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error((err.response.data.message || err.response.data.Message));
    });
}
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
