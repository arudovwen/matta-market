<template>
  <div
    class="rounded-lg bg-white px-6 border border-[#EAECF0] flex gap-x-[76px] flex-col lg:flex-row gap-y-7 lg:gap-y-10 py-[30px]"
  >
    <div class="w-[250px]">
      <h2 class="text-sm text-[#101828] font-semibold">Password</h2>
      <p class="text-xs text-[#475467]">
        Please enter your current password to change your password.
      </p>
    </div>
    <div class="flex-1 max-w-[576px]">
      <form @submit.prevent="handlePassword">
        <div class="mb-6">
          <label for="" class="mb-2 font-normal text-sm block text-matta-black"
            >Current Password</label
          >
          <div class="relative flex items-center">
            <input
              :class="{ 'border-red-500': newv$.oldPassword.$error }"
              v-model="newv$.oldPassword.$model"
              class="rounded-lg px-[14px] py-[10px] h-11 w-full border placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
              placeholder="Password"
              autocomplete="off"
              :type="!isOpen ? 'oldPassword' : 'text'"
            />
            <EyeIcon
              v-if="!isOpen"
              @click="isOpen = !isOpen"
              class="w-4 h-4 absolute cursor-pointer right-6"
            />
            <EyeSlashIcon
              @click="isOpen = !isOpen"
              v-else
              class="w-4 h-4 absolute cursor-pointer right-6"
            />
          </div>
          <div
            class="text-red-500 mt-1"
            v-for="error of newv$.oldPassword.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-sm font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="mb-6">
          <label for="" class="mb-2 font-normal text-sm block text-matta-black"
            >New Password</label
          >
          <div class="relative flex items-center">
            <input
              :class="{ 'border-red-500': newv$.newPassword.$error }"
              v-model="newv$.newPassword.$model"
              class="rounded-lg px-[14px] py-[10px] h-11 w-full border placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
              placeholder="Password"
              autocomplete="off"
              :type="!isOpen ? 'oldPassword' : 'text'"
            />
            <EyeIcon
              v-if="!isOpen"
              @click="isOpen = !isOpen"
              class="w-4 h-4 absolute cursor-pointer right-6"
            />
            <EyeSlashIcon
              @click="isOpen = !isOpen"
              v-else
              class="w-4 h-4 absolute cursor-pointer right-6"
            />
          </div>
          <div
            class="text-red-500 mt-1"
            v-for="error of newv$.newPassword.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-sm font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="mb-12">
          <label for="" class="mb-2 font-normal text-sm block text-matta-black"
            >Confirm Password</label
          >
          <div class="relative flex items-center">
            <input
              :class="{ 'border-red-500': newv$.confirmPassword.$error }"
              v-model="newv$.confirmPassword.$model"
              class="rounded-lg px-[14px] py-[10px] h-11 w-full border placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
              placeholder="Confirm oldPassword"
              autocomplete="off"
              :type="!isOpen ? 'oldPassword' : 'text'"
            />
            <EyeIcon
              v-if="!isOpen"
              @click="isOpen = !isOpen"
              class="w-4 h-4 absolute cursor-pointer right-6"
            />
            <EyeSlashIcon
              @click="isOpen = !isOpen"
              v-else
              class="w-4 h-4 absolute cursor-pointer right-6"
            />
          </div>
          <div
            class="text-red-500 mt-1"
            v-for="error of newv$.confirmPassword.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-sm font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <AppButton
            :disabled="isLoading"
            :isLoading="isLoading"
            btnClass="bg-primary-500 text-white !px-16  !text-sm !py-[10px] disabled:cursor-not-allowed border  !rounded-lg border-primary-500"
            type="submit"
            text=" Change password"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import useVuelidate from "@vuelidate/core";
import { required, helpers, maxLength, minLength } from "@vuelidate/validators";

import { changepassword } from "~/services/settingservices";
import { toast } from "vue3-toastify";

const isOpen = ref(false);
const isLoading = ref(false);

const newform = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const validPassword = (value) => {
  let res = /[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value);
  return res;
};
const specialPassword = (value) => {
  let res = /[@&!%#$%]/.test(value);
  return res;
};
const samePassword = (value) => value === newform.newPassword;
const newrules = {
  oldPassword: {
    required: helpers.withMessage("Password field cannot be empty", required),
    minLength: minLength(8),
    maxLength: maxLength(16),
    validPassword: helpers.withMessage(
      "Password must include UPPER/lowercase characters and number",
      validPassword
    ),
    specialPassword: helpers.withMessage(
      "Password must contain at least 1 of the special  characters @&!-%#$%",
      specialPassword
    ),
  },
  newPassword: {
    required: helpers.withMessage("Password field cannot be empty", required),
    minLength: minLength(8),
    maxLength: maxLength(16),
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
    maxLength: maxLength(16),
    validPassword: helpers.withMessage(
      "Confirm Password is invalid",
      validPassword
    ),
    samePassword: helpers.withMessage("Passwords do not match!", samePassword),
  },
};
const newv$ = useVuelidate(newrules, newform);

async function handlePassword() {
  const validity = await newv$.value.$validate();
  if (!validity) return;
  isLoading.value = true;

  changepassword(newform)
    .then((res) => {
      if (res.status === 200) {
        toast.info("Password updated successfully");
        isLoading.value = false;
        newform.oldPassword =
          newform.newPassword =
          newform.confirmPassword =
            "";
        newv$.value.$reset();
      }
    })

    .catch((err) => {
      isLoading.value = false;

      toast.error(err?.response?.data?.message || err?.response?.data?.Message);
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
