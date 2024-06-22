<!-- eslint-disable no-unused-vars -->
<template>
  <div class="flex justify-between mb-6 items-center">
    <span class="block font-bold">List of Nubans</span>
    <button
      @click="isOpen = true"
      type="button"
      class="bg-primary-500 text-[12px] px-4 py-2 rounded-lg text-white hover:opacity-60"
    >
      Create new
    </button>
  </div>
  <div class="gap-y-2 flex flex-col">
    <div class="bg-white rounded-lg">
      <div v-if="!isPageLoading">
        <div v-if="!isEmpty" class="max-w-[80vw]">
          <table class="w-full">
            <thead>
              <tr>
                <th
                  v-for="item in theads"
                  :key="item"
                  class="uppercase text-[#B6B7B9] text-[13px] text-left font-normal border-b py-6 px-3 border-[#E7EBEE]"
                >
                  {{ item }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in tdata" :key="item">
                <td
                   class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                ></td>
                <td
                  class="text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
                >
                  {{ item.email }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                ></td>

                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  <span
                    v-if="item.invitationStatusText == 'Expired'"
                    class="px-2 py-2 text-xs rounded-lg border text-[#EE5C5C] border-[#EE5C5C]"
                  >
                    {{ item.invitationStatusText }}</span
                  >
                  <span
                    v-if="item.invitationStatusText == 'Invited'"
                    class="px-2 py-2 text-xs rounded-lg border text-primary border-primary"
                  >
                    {{ item.invitationStatusText }}</span
                  >
                  <span
                    v-if="item.invitationStatusText == 'Verified'"
                    class="px-2 py-2 text-xs rounded-lg text-white bg-[#59B221]"
                  >
                    Verified</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          v-else
          class="h-[210px] rounded-lg w-full flex items-center justify-center bg-[#F1F3F5]"
        >
          <div class="text-center max-w-sm mx-auto">
            <p class="text-matta-black font-medium">No account available</p>
          </div>
        </div>
      </div>
      <div class="text-center p-6 lg:p-8 my-24" v-else>
         <AppLoader />
      </div>
    </div>
  </div>
  <IndexModal :isOpen="isOpen" @togglePopup="isOpen = false">
    <template #content>
      <div class="max-w-[800px]">
        <SupplierWalletModalsAddBeneficiary />

        <span class="cursor-pointer" @click="handleClose"
          ><AppIcon icon="heroicons-solid:x"
            class="w-4 h-4 absolute top-4 right-3 text-matta-black z-10"
        /></span>
      </div>
    </template>
  </IndexModal>
</template>

<script setup>
import { reactive, ref } from "vue";

const isOpen = ref(false);
const theads = ["Account no", "currency", "balance"];
const tdata = [];
const isEmpty = ref(true);
const isPageLoading = ref(false);
// eslint-disable-next-line no-unused-vars
const queryParams = reactive({
  Status: "",
  Role: "",
  PageSize: 10,
  PageNumber: 1,
  pagecount: 0,
  totalCount: 0,
  Search: "",
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
