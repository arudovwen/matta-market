<template>
  <div class="bg-white rounded-lg p-6 lg:p-8">
    <div>
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-3 text-left mb-8">
        <SingleAddress
          v-for="(address, id) in addresses"
          @click="activeAddress = address"
          :activeAddress="activeAddress"
          :address="address"
          :key="id"
        />
      </div>
      <div class="mb-8">
        <button class="text-primary text-sm" @click="openmodal('shipping')">
          <i class="uil uil-plus"></i> Add new shipping address
        </button>
      </div>
    </div>
  </div>
  <Modal :isOpen="isOpen" @togglePopup="isOpen = false">
    <template #content>
      <div class="bg-white rounded-lg p-6 lg:p-8 relative w-[500px]">
        <span
          @click="isOpen = false"
          class="hover:bg-gray-50 rounded-full h-6 w-6 flex items-center justify-center absolute top-4 right-4"
          ><AppIcon icon="heroicons-solid:x" class="w-4 h-4"
        /></span>
        <ShippingForm v-if="showing === 'shipping'" />
        <RemoveAddress v-if="showing === 'remove'" />
        <EditAddress v-if="showing === 'edit'" />
      </div>
    </template>
  </Modal>
</template>
<script setup>
import { ref, provide, onMounted } from "vue";
import SingleAddress from "~/components/shipping/SingleAddress";
import ShippingForm from "~/components/shipping/ShippingForm";
import EditAddress from "~/components/shipping/EditAddress";
import RemoveAddress from "~/components/shipping/RemoveAddress";
import {toast} from "vue3-toastify"
import Modal from "~/components/IndexModal";
import { getalladdress, setdefaultaddress } from "~/services/cartservice";

const showing = ref("");
const isOpen = ref(false);
const addresses = ref([]);
const loading = ref(false);
const activeAddress = ref(null);
const form = ref({});
function removeCard() {}
function openmodal(val) {
  showing.value = val;
  isOpen.value = true;
}
function togglePopup() {
  isOpen.value = !isOpen.value;
}

onMounted(() => {
  getData();
});

function getData() {
  getalladdress().then((res) => {
    if (res.status) {
      addresses.value = res.data.data;
      activeAddress.value = res.data.data.find((i) => i.isDefault);
    }
  });
}
function handleReload() {
  getData();
  togglePopup();
}

function editAddress(data) {
  form.value = data;
  showing.value = "edit";
  togglePopup();
}

function handleDefault(id) {
  loading.value = true;
  setdefaultaddress(id).then((res) => {
    if (res.status) {
      loading.value = false;
      getData();
      toast.success("Default address updated")
    }
  }).catch(err=>{
    toast.error(err?.response?.data?.message || err?.response?.data?.Message)
  });;
}

provide("editAddress", editAddress);
provide("form", form);
provide("handleReload", handleReload);
provide("handleDefault", handleDefault);
provide("togglePopup", togglePopup);
provide("removeCard", removeCard);
provide("openmodal", openmodal);
provide("addresses", addresses);
provide("loading", loading);
</script>
