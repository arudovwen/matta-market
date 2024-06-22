<template>
  <div>
    <h5 class="block text-[20px] font-bold mb-8 text-left">
      Select shipping address
    </h5>

    <div class="grid gap-y-6 mb-4 max-h-[600px] overflow-y-auto relative">
      <div
        v-for="n in shippingStore.addressesData"
        :key="n"
        :class="`${
          n?.isDefault ? 'border-[#91B3F8] bg-[#E3EBFD] ' : 'border-[#F3F3F3]'
        } ${defaultLoading ? 'opacity-30' : ''}`"
        class="rounded-[10px] py-3 px-[16px] border-2 cursor-pointer"
      >
        <div @click="!defaultLoading && handleDefault(n.id)">
          <CheckoutShippingAddress :detail="n" :active="n.isDefault" />
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
            text="Delete"
            icon="bx:trash"
            btnClass=" !px-0  !py-[0] text-xs sm:text-sm !font-normal"
            iconClass="!text-base"
          />
        </div>
      </div>
      <div v-if="defaultLoading"
        class="flex items-center justify-center absolute top-0 left-0 right-0"
      >
        <AppLoader />
      </div>
    </div>
    <AppButton
      :class="defaultLoading ? 'opacity-30' : ''"
      @click="type = 'form'"
      text="New shipping address"
      icon="icon-park-outline:plus"
      btnClass=" !px-0 !sm:px-6 !py-[0px] text-xs sm:text-sm !text-[#2176FF]"
    />
  </div>
</template>
<script setup>
import { setdefaultaddress } from "~/services/cartservice";
import { toast } from "vue3-toastify";

const shippingStore = useShippingStore();
const cartStore = useCartStore();
const detail = inject("detail");
const type = inject("type");
const isOpen = inject("isOpen");
const defaultLoading = ref(false);
function handleEdit(val) {
  detail.value = val;
  type.value = "edit";
  isOpen.value = true;
}
function handleDefault(id) {
  defaultLoading.value = true;
  setdefaultaddress(id)
    .then((res) => {
      if (res.status === 200) {
        isOpen.value = false;
        shippingStore.getAlladdress();
        cartStore?.getMyCart();
        toast.success("Default address updated");
        defaultLoading.value = false;
      }
    })
    .catch((err) => {
      toast.error(err.response.data.message || err.response.data.Message);
      defaultLoading.value = false;
    });
}
</script>
