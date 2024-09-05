<template>
  <div class="mt-9 max-w-[490px] mx-auto">
    <h1 class="mb-3 font-semibold text-[20px] text-[#333]">Summary</h1>
    <div
      class="w-full  mt-4 mb-10"
    >
      <div class="grid grid-cols-1 gap-y-3 mb-8 rounded-lg p-6 border border-[#E2E2E2] bg-[#F5FAFF]">
        <div
          class="grid grid-cols-2 gap-y-6 border-b border-[#3440541A pb-2"
          v-for="(item, index) in bankOptions"
          :key="index"
        >
          <div
            class="flex flex-col text-xs"
            v-for="n in item.data"
            :key="n.key"
          >
            <span class="text-[#667085] capitalize">{{ n.title }} </span>
            <span class="text-[#344054] font-medium">Value</span>
          </div>
        </div>
        <div
            class="flex flex-col text-xs"
          
          >
            <span class="text-[#667085] capitalize">Directors </span>
            <span class="text-[#344054] font-medium">Value</span>
          </div>
          <div
            class="flex flex-col text-xs"
           
          >
            <span class="text-[#667085] capitalize">Documents </span>
            <span class="text-[#344054] font-medium">Value</span>
          </div>
      </div>
      <div
        class="lg:col-span-2 flex items-center  text-xs lg:text-sm gap-x-[2px]"
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
        :disabled="isLoading"
        :isLoading="isLoading"
        btnClass="bg-primary-500 text-white !px-12  !text-sm !py-[10px] disabled:cursor-not-allowed border  !rounded-lg border-primary-500"
        type="submit"
        text="Submit"
      />
    </div>
  </div>
  <ActionModal
    :open="isSuccessOpen"
    type="approve"
    title="Request has be sent"
    text="Your request has been sent. You will be contacted by within the next 24hrs."
    btnText="Okay"
    :isCancel="false"
    @actionItem="
      () => {
        navigateTo('/wallet/home')
      }
    "
    @close="isSuccessOpen = false;"
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
const isSuccessOpen = ref(false);
const isErrorOpen = ref(false);
const route = useRoute();
const { financeId } = route.params;
const isLoading = ref(false);
const active = inject("active")
const agree = ref(false)
const bankOptions = [
  {
    data: [
      {
        title: "Company name",
        key: "bankName",
      },
      {
        title: "Business type",
        key: "accountName",
      },
    ],
  },
  {
    data: [
      {
        title: "Date of incorporation",
        key: "bankName",
      },
      {
        title: "Sector",
        key: "accountName",
      },
    ],
  },
  {
    data: [
      {
        title: "Business address",
        key: "bankName",
      },
    ],
  },
  {
    data: [
      {
        title: "Brief description of Product",
        key: "bankName",
      },
    ],
  },
];
</script>
