<template>
  <div class="bg-[#F9FAFB] border border-[#EAECF0] rounded-[10px]">
    <div class="px-5 pt-3 pb-4">
      <div class="mb-6">
        <CheckoutShippingAddress :detail="shippingStore?.defaultAddress" />
      </div>
      <div
        class="flex flex-col md:flex-row md:items-center gap-y-4 md:gap-y-0 md:gap-x-4"
      >
        <AppButton
          @click="openModal('form')"
          text="New shipping address"
          icon="icon-park-outline:plus"
          btnClass="bg-primary-500  text-white !px-4
      !sm:px-6 !py-[9px] text-xs sm:text-sm"
        />

        <AppButton
          v-if="shippingStore?.addressesData?.length"
          @click="openModal('select')"
          text="Change address"
          btnClass="!px-4
      !sm:px-6 !py-[0px] text-sm hover:underline"
        />
      </div>
    </div>
  </div>

  <ModalCenter>
    <template #default>
      <div class="w-full max-w-[500px] p-6 md:py-9 md:px-10 z-[999] relative">
        <CheckoutShippingEditForm v-if="type === 'form'" />
        <CheckoutSelect v-if="type === 'select'" />
      </div>
    </template>
  </ModalCenter>
</template>
<script setup>
const shippingStore = useShippingStore();
const type = ref("form");
const detail = ref(null);
const isOpen = ref(false);
function openModal(val) {
  type.value = val;
  isOpen.value = true;
}
onMounted(() => {
  shippingStore.getAlladdress();
});

provide("type", type);
provide("isOpen", isOpen);
provide("detail", detail);
</script>
