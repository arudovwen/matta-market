<template>
  <div
    class="bg-[#E7EBEE] p-3 md:p-6 flex flex-col gap-y-2 min-h-screen w-full"
  >
    <TopBar />
    <div class="flex items-center flex-1 bg-white rounded-lg">
      <div class="px-10 py-10 relative text-center bg-white flex-1">
        <h3
          class="font-medium text-2xl md:text-4xl lg:text-5xl mb-12 text-matta-black"
        >
          Select account type
        </h3>

        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-3 text-left mt-12 md:w-[80%] mx-auto mb-24"
        >
          <div
            @click="type = 1"
            :class="type == 1 ? 'bg-matta-black' : ''"
            class="py-12 px-10 border border-[#E7EBEE] rounded-[20px] shadow-sm hover:shadow-lg group hover:bg-matta-black/80 text-center cursor-pointer"
          >
            <div
              :class="type == 1 ? 'border-gray-200' : 'border-matta-black'"
              class="mb-4 w-16 h-16 rounded-full border group-hover:border-gray-200 flex items-center justify-center mx-auto"
            >
              <i
                :class="type == 1 ? 'text-white' : ''"
                class="uil uil-users-alt group-hover:text-white text-matta-black text-2xl"
              ></i>
            </div>
            <p
              :class="type == 1 ? 'text-white' : ''"
              class="font-medium text-matta-black text-xl group-hover:text-white"
            >
              Company Account
            </p>
            <p
              :class="type == 1 ? 'text-white' : ''"
              class="text-matta-black group-hover:text-white text-sm lg:text-base"
            >
              Create account on behalf of the company.
            </p>
          </div>

          <div
            @click="type = 0"
            :class="type == 0 ? 'bg-matta-black' : ''"
            class="py-12 px-10 border border-[#E7EBEE] rounded-[20px] shadow-sm hover:shadow-lg group hover:bg-matta-black/80 text-center cursor-pointer"
          >
            <div
              :class="type == 0 ? 'border-gray-200' : 'border-matta-black'"
              class="mb-4 w-16 h-16 rounded-full border group-hover:border-gray-200 flex items-center justify-center mx-auto"
            >
              <i
                :class="type == 0 ? 'text-white' : ''"
                class="uil uil-user group-hover:text-white text-matta-black text-2xl"
              ></i>
            </div>
            <p
              :class="type == 0 ? 'text-white' : ''"
              class="font-medium text-matta-black text-xl group-hover:text-white"
            >
              Personal Account
            </p>
            <p
              :class="type == 0 ? 'text-white' : ''"
              class="text-matta-black group-hover:text-white text-sm lg:text-base"
            >
              Create an account on your behalf.
            </p>
          </div>
        </div>
        <div class="flex justify-center gap-x-4 items-center">
          <button
            class="appearance-none leading-none px-10 py-4 rounded-full text-matta-black bg-[#F1F3F5] hover:bg-gray-100 text-[13px] uppercase"
          >
            Back
          </button>

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
import TopBar from "./layout/TopBar.vue";
import { ref } from "vue";
import { setaccountype } from "@/services/onboardingservices";
import { useStore } from "vuex";
import { toast } from 'vue3-toastify';
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const authStore = useAuthStore();

const isLoading = ref(false);

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
        authStore.updateUserInfo({ accountType: type.value });
        isLoading.value = false;
        router.push(
          `/onboarding/${
            type.value == 1 ? "company-account" : "personal-account"
          }`
        );
      }
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error((err.response.data.message || err.response.data.Message));
    });
}
const type = ref(null);
</script>
