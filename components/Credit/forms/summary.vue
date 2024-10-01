<template>
  <div class="mt-9 w-full max-w-[490px] mx-auto">
    <h1 class="mb-3 font-semibold text-[20px] text-[#333]">Summary</h1>
    <div class="w-full mt-4 mb-10">
      <div
        class="grid grid-cols-1 gap-y-3 mb-8 rounded-lg p-6 border border-[#E2E2E2] bg-[#F5FAFF]"
      >
        <div
          class="grid grid-cols-2 gap-y-6 border-b border-[#3440541A pb-2 last:border-none"
          v-for="(item, index) in bankOptions"
          :key="index"
        >
          <div
            class="flex flex-col text-xs"
            v-for="n in item.data"
            :key="n.key"
          >
            <span class="text-[#667085] capitalize mb-1">{{ n.title }} </span>
            <span class="text-[#344054] font-medium">{{
              companyInfo?.[n.key]
            }}</span>
          </div>
        </div>
      </div>
      <div
        class="lg:col-span-2 flex items-center text-xs lg:text-sm gap-x-[2px]"
      >
        <Checkbox
          v-model.value="agree"
          label="By clicking this, you consent that credit checks will be conducted on the company and its directors"
          labelClass="text-xs lg:text-sm"
        />
      </div>
    </div>
    <div class="flex gap-x-4 items-center justify-end">
      <AppButton
        btnClass="bg-white text-white !px-11  !text-sm !py-[10px] disabled:cursor-not-allowed border border-[#BDC0C5] !text-[#344054] !rounded-lg"
        type="button"
        text="Back"
        @click="active--"
      />
      <AppButton
        :disabled="isLoading || !agree"
        :isLoading="isLoading"
        @click="onSubmit"
        btnClass="bg-primary-500 text-white !px-12  !text-sm !py-[10px] disabled:cursor-not-allowed border  !rounded-lg border-primary-500"
        type="button"
        text="Submit"
      />
    </div>
  </div>
  <ActionModal
    :open="isSuccessOpen"
    type="approve"
    title="Request has be sent"
    text="Your request has been sent. You will be contacted within the next 24hrs."
    btnText="Okay"
    :isCancel="false"
    @actionItem="
      () => {
        navigateTo('/wallet/home');
      }
    "
    @close="isSuccessOpen = false"
  />
  <ActionModal
    :open="isErrorOpen"
    type="reject"
    title="Request Failed"
    :text="errorText"
    btnText="Retry"
    @actionItem="() => (isErrorOpen = false)"
    @close="() => (isErrorOpen = false)"
  />
</template>
<script setup>
import moment from "moment";
import { postCreditRequest } from "~/services/creditservice";

const isSuccessOpen = ref(false);
const isErrorOpen = ref(false);
const errorText = ref(null);
const route = useRoute();
const company = inject("company");
const formData = inject("formData");
const isLoading = ref(false);
const active = inject("active");
const agree = ref(false);
const bankOptions = [
  {
    data: [
      {
        title: "Company name",
        key: "companyName",
      },
      {
        title: "Business type",
        key: "companyType",
      },
    ],
  },
  {
    data: [
      {
        title: "Date of incorporation",
        key: "dateofIncorporation",
      },
      {
        title: "Sector",
        key: "sector",
      },
    ],
  },
  {
    data: [
      {
        title: "Business address",
        key: "address",
      },
    ],
  },
];
const companyInfo = computed(() => ({
  ...company.value,
  dateofIncorporation: moment(company.value.dateofIncorporation).format("ll"),
}));
const onSubmit = () => {
  isLoading.value = true;

  postCreditRequest({
    ...formData,
    supportingDocuments: formData?.supportingDocuments.map((i) => ({
      ...i,
      urls: i.urls.map((j) => j.url),
    })),
  })
    .then((res) => {
      if (res.status === 200) {
        isSuccessOpen.value = true;
        isLoading.value = false;
      }
    })
    .catch((err) => {
      errorText.value =
        err?.response?.data?.Message || err?.response?.data?.message;
      isLoading.value = false;
      isErrorOpen.value = true;
    });
};
</script>
