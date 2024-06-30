<template>
  <div class="gap-y-4 flex flex-col pb-10">
    <!-- Top bar   -->

    <div class="bg-white rounded-[10px] border border-[#F4F7FE]">
      <HeaderComponent title="Shipping address" />

      <div class="p-5" v-if="!shippingStore.isLoading">
        <div
          class="mb-6 grid grid-cols-2 gap-6"
          v-if="shippingStore.addressesData?.length"
        >
          <div
            v-for="n in shippingStore.addressesData"
            :key="n"
            :class="
              n?.isDefault
                ? 'border-[#91B3F8] bg-[#E3EBFD] '
                : 'border-[#ECF1FD]'
            "
            class="rounded-[10px] py-3 px-[16px] border-2 cursor-pointer"
          >
            <div @click="handleDefault(n.id)" class="mb-1">
              <CheckoutShippingAddress :detail="n" :active="n?.isDefault" />
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
            @click="
              () => {
                detail = null;
                openModal('form');
              }
            "
            class="rounded-[10px] py-3 px-[16px] border-2 cursor-pointer flex flex-col gap-y-1 border-[#ECF1FD] h-[180px] items-center justify-center text-primary-500"
          >
            <AppIcon icon="fa6-solid:truck" iconClass="text-2xl" />
            <span class="text-sm">Add new shipping address</span>
          </div>
        </div>
        <EmptyData
          v-else
          @btnFunction="btnFunction"
          type="shipping"
          title="No shipping address"
          subtext=""
          btnText="Add new shipping address"
        />
      </div>
      <AppLoader v-else />
    </div>

    <ModalCenter>
      <template #default>
        <div class="w-full max-w-[500px] p-6 md:py-9 md:px-10 z-[999] relative">
          <!-- <CheckoutShippingAddForm v-if="type === 'form' || type === 'edit'" /> -->
          <CheckoutShippingEditForm v-if="type === 'form' || type === 'edit'" />
        </div>
      </template>
    </ModalCenter>
    <DeleteModal
      @deleteItem="deleteItem"
      title=" Remove Shipping Address"
      :open="isDeleteOpen"
      btnText="Delete address"
      :loading="deleteLoading"
      @close="isDeleteOpen = false"
    />
  </div>
</template>

<script setup>
import { setdefaultaddress, deleteAddress } from "~/services/cartservice";
import { toast } from "vue3-toastify";

defineProps(["title"]);

const shippingStore = useShippingStore();
const type = ref("form");
const detail = ref(null);
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
  shippingStore.getAlladdress();
});
function handleDefault(id) {
  setdefaultaddress(id)
    .then((res) => {
      if (res.status === 200) {
        isOpen.value = false;
        shippingStore.getAlladdress();
        toast.success("Default address updated");
      }
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message || err?.response?.data?.Message);
    });
}

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
  deleteAddress(detail.value.id)
    .then(() => {
      shippingStore.getAlladdress();
      deleteLoading.value = false;
      isDeleteOpen.value = false;
    })
    .catch((err) => {
      deleteLoading.value = false;
      toast.error(err?.response?.data?.Message || err?.response?.data?.message);
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
