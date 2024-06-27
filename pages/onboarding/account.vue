<template>
  <div
    class="bg-[#E7EBEE] p-3 md:p-6 flex flex-col gap-y-2 min-h-screen w-full"
  >
    <OnboardingLayoutTopBar />
    <div class="flex items-center flex-1 bg-white rounded-lg">
      <div class="px-10 py-10 relative text-center bg-white flex-1 container">
        <h3 class="font-bold text-2xl md:text-4xl mb-12 text-matta-black">
          Select account type
        </h3>

        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-x-6 text-left mt-12 md:w-[80%] mx-auto mb-24"
        >
          <div
            v-for="i in content"
            @click="type = i.type"
            :class="type == i.type ? 'bg-matta-black' : ''"
            class="py-12 px-10 border border-[#E7EBEE] rounded-[20px] shadow-sm hover:shadow-lg group hover:bg-matta-black/80 text-center cursor-pointer"
          >
            <div
              :class="type == i.type ? 'border-gray-200' : 'border-matta-black'"
              class="mb-4 w-16 h-16 rounded-full border group-hover:border-gray-200 flex items-center justify-center mx-auto"
            >
              <AppIcon
                :icon="i.icon"
                :class="type == i.type ? 'text-white' : ''"
                class="group-hover:text-white text-matta-black text-4xl"
              />
            </div>
            <p
              :class="type == i.type ? 'text-white' : ''"
              class="font-semibold text-matta-black text-xl group-hover:text-white"
            >
              {{ i.title }} Account
            </p>
            <p
              :class="type == i.type ? 'text-white' : ''"
              class="text-matta-black group-hover:text-white text-sm lg:text-base"
            >
              {{ i.sub }}
            </p>
          </div>
        </div>
        <div class="flex justify-center gap-x-4 items-center">
          <NuxtLink to="/auth/login">
            <button
              class="appearance-none leading-none px-10 py-4 rounded-full text-matta-black bg-[#F1F3F5] hover:bg-gray-100 text-[13px] uppercase"
            >
              Back
            </button>
          </NuxtLink>

          <button
            @click="handleSubmit"
            :disabled="type === null || isLoading"
            class="appearance-none leading-none px-10 py-4 rounded-full text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase disabled:opacity-60"
          >
            <i
              class="fa fa-spinner fa-spin"
              v-show="isLoading"
              aria-hidden="true"
            ></i>
            <span v-show="!isLoading">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "onboarding",
});

import { setaccountype } from "@/services/onboardingservices";
import { useStore } from "vuex";
import { toast } from 'vue3-toastify';
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const store = useStore();

const isLoading = ref(false);
const content = [
  {
    title: "Personal",
    sub: "Create an account on your behalf",
    type: 1,
    icon: "la:user",
  },
  {
    title: "Company",
    sub: "Create an account on behalf of the company",
    type: 0,
    icon: "la:users",
  },
];
function handleSubmit() {
  if (type.value === null) {
    toast.info("Select an account type!");
    return;
  }
  isLoading.value = true;
  setaccountype({
    userId: authStore.userId,
    accountType: type.value,
  })
    .then((res) => {
      if (res.status == 200) {
        authStore.updateAccountType(type.value);
        isLoading.value = false;
        router.push(`/onboarding/${type.value == 0 ? "company" : "personal"}`);
      }
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error((err.response.data.message || err.response.data.Message));
    });
}
const type = ref(null);
</script>
