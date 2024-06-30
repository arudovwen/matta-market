<!-- eslint-disable no-unused-vars -->
<template>
  <div class="flex justify-between mb-6 items-center">
    <span class="block font-bold">List of Beneficiaries</span>
    <button
      @click="
        () => {
          isOpen = true;
          isAdd = true;
        }
      "
      type="button"
      class="bg-primary-500 text-[12px] px-4 py-2 rounded-lg text-white hover:opacity-60"
    >
      Add new
    </button>
  </div>
  <div class="gap-y-2 flex flex-col">
    <div class="bg-white rounded-lg">
      <div v-if="!isPageLoading">
        <div v-if="!isEmpty" class="border rounded-lg border-[#E7EBEE]">
          <table aria-describedby="" class="w-full">
            <thead>
              <tr>
                <th
                  v-for="item in theads"
                  :key="item"
                  class="uppercase text-[#B6B7B9] text-[13px] text-left font-normal border-b py-4 px-3 border-[#E7EBEE]"
                >
                  {{ item }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in tdata" :key="item">
                <td
                  class="text-matta-black text-sm font-normal border-b py-4 px-3 border-[#E7EBEE]"
                >
                  {{ item.accountNo }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-3 border-[#E7EBEE]"
                >
                  {{ item.bank }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-1 border-[#E7EBEE]"
                >
                  <span
                    class="cursor-pointer"
                    @click="
                      () => {
                        isOpen = true;
                        isDelete = true;
                        id = item.id;
                      }
                    "
                    ><AppIcon icon="heroicons-solid:x" class="w-4 h-4 text-matta-black z-10"
                  /></span>
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
  <IndexModal :isOpen="isOpen" @togglePopup="handleClose">
    <template #content>
      <div class="max-w-md">
        <SupplierWalletModalsAddBeneficiary v-if="isAdd" @success="handleUpdate" />
        <SupplierWalletModalsRemoveItem
          v-if="isDelete"
          data="beneficiary"
          @remove="remove"
          @cancel="handleClose"
        />
        <span class="cursor-pointer" @click="handleClose"
          ><AppIcon icon="heroicons-solid:x"
            class="w-4 h-4 absolute top-4 right-3 text-matta-black z-10"
        /></span>
      </div>
    </template>
  </IndexModal>
</template>

<script setup>
import { getBeneficiaries, removeBeneficiary } from "~/services/walletservice";


const isAdd = ref(false);
const isDelete = ref(false);
const isOpen = ref(false);
const theads = ["Account no", "bank"];
const tdata = ref([]);
const isEmpty = ref(true);
const isPageLoading = ref(false);
const id = ref(null);
// eslint-disable-next-line no-unused-vars
const queryParams = reactive({
  Search: "",
  discontinued: false,
  PageSize: 10,
  PageNumber: 1,
  pagecount: 0,
});
function handleClose() {
  isOpen.value = isAdd.value = isDelete.value = false;
}
function getData() {
  getBeneficiaries(queryParams).then((res) => {
    if (res.status === 200) {
   
      if (res.data.data.data.length) {
        isEmpty.value = false;
        tdata.value = res.data.data.data;
      }
    }
  });
}
function handleUpdate() {
  getData();
  isOpen.value = false;
}
function remove() {
  removeBeneficiary({ id: id.value }).then((res) => {
    if (res.status === 200) {
      handleUpdate();
    }
  });
}
onMounted(() => {
  getData();
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
