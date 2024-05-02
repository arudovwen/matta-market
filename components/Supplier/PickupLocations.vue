<template>
  <div class="gap-y-4 flex flex-col pb-10">
    <!-- Top bar   -->

    <div class="bg-white rounded-[10px] border border-[#F4F7FE]">
      <HeaderComponent
        title="Pickup locations"
        subtext="Locations where orders can be picked up"
      />

      <div class="p-5" v-if="!pickupStore.isLoading">
        <div
          class="mb-6 grid grid-cols-2 gap-6"
          v-if="pickupStore.addressesData?.length"
        >
          <div
            v-for="n in pickupStore.addressesData"
            :key="n"
            :class="
              n?.isDefault
                ? 'border-[#91B3F8] bg-[#E3EBFD] '
                : 'border-[#ECF1FD]'
            "
            class="rounded-[10px] py-3 px-[16px] border-2 cursor-pointer"
          >
            <div class="mb-1">
              <CheckoutPickupAddress :detail="n" :active="n?.isDefault" />
            </div>
            <div class="flex gap-x-5 mt-3">
              <AppButton
                @click="handleEdit(n)"
                text="Edit"
                type="button"
                icon="iconamoon:edit"
                btnClass=" !px-0 0 !py-[0] text-xs sm:text-sm !font-normal"
                iconClass="!text-base"
              />
              <AppButton
                @click="handleDelete(n)"
                text="Delete"
                icon="bx:trash"
                btnClass=" !px-0  !py-[0] text-xs sm:text-sm !font-normal text-red-600"
                iconClass="!text-base"
              />
            </div>
          </div>
          <div
            @click="openModal('form')"
            class="rounded-[10px] py-3 px-[16px] border-2 cursor-pointer flex flex-col gap-y-1 border-[#ECF1FD] h-[180px] items-center justify-center text-primary-500"
          >
            <AppIcon icon="fa6-solid:truck" iconClass="text-2xl" />
            <span class="text-sm">Add new pickup location</span>
          </div>
        </div>
        <EmptyData
          v-else
          @btnFunction="btnFunction"
          type="pickup"
          title="No location added"
          subtext="Add a pickup address where your goods can be picked up by customers"
          btnText="Add new pickup location"
        />
      </div>
      <AppLoader v-else />
    </div>

    <ModalCenter className="max-w-[600px]">
      <template #default>
        <div class="w-full max-w-[600px] p-6 md:py-9 md:px-10 z-[999] relative">
          <CheckoutPickupAddForm v-if="type === 'form'" />
          <CheckoutPickupEditForm v-if="type === 'edit'" />
        </div>
      </template>
    </ModalCenter>
    <DeleteModal
      @deleteItem="deleteItem"
      title=" Remove pickup location"
      :open="isDeleteOpen"
      btnText="Delete location"
      :loading="deleteLoading"
      @close="isDeleteOpen = false"
    />
  </div>
</template>

<script setup>
import {  deletePickupLocation } from "~/services/cartservice";
import { toast } from "vue3-toastify";

defineProps(["title"]);

const pickupStore = usePickupStore();
const type = ref("form");
const detail = ref("detail");
const isOpen = ref(false);
const isDeleteOpen = ref(false);
const deleteLoading = ref(false);
function openModal(val) {
  type.value = val;
  isOpen.value = true;
}
function btnFunction() {
  openModal("form");
}
onMounted(() => {
  pickupStore.getAlladdress();
});

function handleEdit(val) {
  detail.value = val;
  type.value = "edit";
  isOpen.value = true;
}
function handleDelete(val) {
  detail.value = val;
  type.value = "delete";
  isDeleteOpen.value = true;
}
function deleteItem() {
  deleteLoading.value = true;
  deletePickupLocation(detail.value.id)
    .then(() => {
      pickupStore.getAlladdress();
      deleteLoading.value = false;
      isDeleteOpen.value = false;
    })
    .catch((err) => {
      deleteLoading.value = false;
      toast.error(err.response.data.Message || err.response.data.message);
    });
}

provide("type", type);
provide("isOpen", isOpen);
provide("detail", detail);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
