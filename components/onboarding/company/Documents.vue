<!-- eslint-disable no-useless-escape -->
<template>
  <form @submit.prevent="handleSubmit" class="w-full px-4 lg:px-[30px]">
    <div
      class="flex gap-x-[76px] pt-[30px] justify-start flex-col lg:flex-row gap-y-7 lg:gap-y-"
    >
      <div class="w-[250px]">
        <h2 class="text-sm text-[#101828] font-semibold">Company Documents</h2>
        <p class="text-xs text-[#475467]">
          Upload your company registration documents
        </p>
      </div>

      <div class="w-full max-w-[560px]">
        <OnboardingCompanyDocumentsUpload
          :documents="companyDoc"
          @get-docs="handleDocUpdate"
          :isNonNigerian="companyInfo?.country?.toLowerCase() !== 'nigeria'"
        />
      </div>
    </div>
    <div
      class="flex justify-end pt-6 border-t border-[#EAECF0] gap-x-4 items-center mt-16 w-full"
      v-if="
        !companyInfo?.approvalStatus ||
        !companyDoc?.some((i) => i.documentType === 4)
      "
    >
      <button
        @click="active--"
        type="button"
        class="appearance-none leading-none px-10 py-[10px] rounded-lg w-full lg:w-auto text-matta-black border border-[#E7EBEE] hover:bg-gray-100 text-[13px] capitalize"
      >
        Back
      </button>

      <button
        :disabled="isLoading"
        :class="{
          'opacity-60 cursor-not-allowed': isLoading,
        }"
        class="appearance-none leading-none px-10 py-[10px] grid-cols-1 lg:grid-cols-2 gap-4 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] capitalize"
      >
        <i
          class="fa fa-spinner fa-spin"
          v-show="isLoading"
          aria-hidden="true"
        ></i>
        <span v-show="!isLoading">Next</span>
      </button>
    </div>
  </form>
</template>
<script setup>
import "vue-advanced-cropper/dist/style.css";
import { ref, reactive, onMounted, provide } from "vue";
import { nigeriaTypes, nonNigeriaTypes } from "~/utils/constants.js";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
// eslint-disable-next-line no-unused-vars
import { updateDocuments } from "~/services/settingservices";

const authStore = useAuthStore();
const companyInfo = inject("companyInfo");
const getData = inject("getData");
const router = useRouter();
const active = inject("active");
const form = reactive({
  companyDocuments: companyInfo?.value?.companyDocuments,
});

const companyDoc = computed(() => {
  if (companyInfo?.value.country?.toLowerCase() !== "nigeria") {
    return companyInfo?.value.companyDocuments.filter(
      (i) => i.documentType === 0 || i.documentType === 4
    );
  } else {
    return companyInfo?.value.companyDocuments;
  }
});
const isLoading = ref(false);
const invalidCredentials = ref(false);

function handleDocUpdate(data) {
  form.companyDocuments = data;
}
async function handleSubmit() {
  if (
    companyInfo?.value.country?.toLowerCase() === "nigeria" &&
    (form.companyDocuments.some(
      (i) => i.urls.filter((i) => i.url).length === 0
    ) ||
      form.companyDocuments.length !== 5)
  ) {
    toast.error("Please upload all available document types");
    return;
  }
  const nonNigerian = form.companyDocuments
    .filter((i) => [0, 4].includes(i.documentType))
    .some((i) => i.urls.filter((i) => i.url).length == 0);

  if (
    companyInfo?.value.country?.toLowerCase() !== "nigeria" &&
    (nonNigerian || form.companyDocuments.length < 2)
  ) {
    toast.error("Please upload all available document types");
    return;
  }
  isLoading.value = true;
  const dataValue = {
    ...form,
    companyDocuments: form.companyDocuments.map((i) => ({
      ...i,
      urls: i.urls.map((j) => j.url),
    })),
  };
  updateDocuments(dataValue)
    .then((res) => {
      if (res.status === 200) {
        getData();
        toast.success("Documents saved");
        active.value = 3;
      }
    })

    .catch((err) => {
      invalidCredentials.value = true;
      isLoading.value = false;

      toast.error(err?.response?.data?.message || err?.response?.data?.Message);
    });
}

onMounted(() => {
  console.log("🚀 ~ onMounted ~ country:",  companyInfo?.value.country)
});

watch(companyDoc, () => {
  form.companyDocuments = companyDoc.value;
});
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
