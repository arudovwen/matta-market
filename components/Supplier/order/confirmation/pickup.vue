<template>
  <div class="bg-white border border-[#F4F4F4] rounded-lg">
    <div
      class="flex items-center justify-between px-[30px] py-4 border-b border-[#F4F4F4]"
    >
      <h2 class="text-xl font-semibold text-[#333333]">Pickup Location</h2>
      <AppButton
        @click="
          () => {
            detail = null;
            openModal('form');
          }
        "
        text="New Location"
        icon="gravity-ui:plus"
        iconClass="text-sm"
        btnClass="!py-[6px] !px-[10px] !text-xs !text-white !bg-primary-500"
      />
    </div>
    <div class="px-[30px] py-6">
      <div class="" v-if="!pickupStore.isLoading">
        <div
          class="grid grid-cols-3 gap-6 mb-6"
          v-if="pickupStore.addressesData?.length"
        >
          <div
            v-for="n in pickupStore.addressesData"
            :key="n"
            :class="
              n?.id === selectedPickup
                ? 'border-[#EAECF0] bg-[#F9FAFB]'
                : 'border-[#ECF1FD]'
            "
            @click="selectedPickup = n.id"
            class="rounded-[10px] py-3 px-[16px] border-2 cursor-pointer relative"
          >
            <span
              v-if="n?.id === selectedPickup"
              class="absolute text-lg top-4 right-4"
            >
              <AppIcon
                icon="lets-icons:check-fill"
                iconClass="text-lg text-primary-500"
            /></span>
            <div class="mb-1">
              <CheckoutPickupAddress
                :detail="n"
                :active="n?.id === selectedPickup"
              />
            </div>
            <div class="flex mt-3 gap-x-5">
              <AppButton
                @click="handleEdit(n)"
                text="Edit Address"
                type="button"
                icon="nimbus:edit"
                btnClass=" !px-0 0 !py-[0] !text-xs  !font-medium !text-primary-500"
                iconClass="!text-xs"
              />
            </div>
          </div>
        </div>
        <EmptyData
          v-else
          type="pickup"
          title="No location added"
          subtext="Add a pickup address where your goods can be picked up by customers"
        />
      </div>
      <AppLoader v-else />
    </div>
  </div>
  <ModalCenter className="max-w-[600px]">
    <template #default>
      <div class="w-full max-w-[600px] p-6 md:px-10 z-[999] relative">
        <CheckoutPickupEditForm v-if="type === 'edit' || type === 'form'" />
      </div>
    </template>
  </ModalCenter>
</template>
<script setup>
const pickupStore = usePickupStore();
const type = ref("form");
const detail = ref(null);
const isOpen = ref(false);
const selectedPickup = inject("selectedPickup");
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
provide("type", type);
provide("isOpen", isOpen);
provide("detail", detail);
</script>
