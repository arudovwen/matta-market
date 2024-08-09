<template>
  <div class="bg-white rounded-lg p-6 lg:p-8">
    <div class="grid grid-cols-2 gap-4 text-left mb-8">
      <CardDetail :active="1" :index="n" v-for="n in 3" :key="n" />
    </div>
    <div>
      <button class="text-primary text-sm" @click="openmodal('method')">
        <i class="uil uil-plus"></i> Add new payment method
      </button>
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
        <PaymentMethod v-if="showing === 'method'" />
        <RemovePayment v-if="showing === 'remove'" />
      </div>
    </template>
  </Modal>
</template>
<script setup>
import { ref, provide } from "vue";
import CardDetail from "./CardDetail";
import Modal from "~/components/IndexModal";
import PaymentMethod from "./PaymentMethod.vue";
import RemovePayment from "./RemovePayment.vue";

const showing = ref("");
const isOpen = ref(false);
function removeCard() {}
function openmodal(val) {
	showing.value = val;
  isOpen.value = true;
	console.log("fire openmodal");
}
function togglePopup() {
  isOpen.value = !isOpen.value;
}
provide("togglePopup", togglePopup);
provide("removeCard", removeCard);
provide("openmodal", openmodal);
</script>
