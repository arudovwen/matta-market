<template>
  <section class="flex flex-col gap-y-3">
    <div class="bg-white py-10 rounded-lg">
      <div
        class="flex items-center justify-between mb-4 overflow-x-auto gap-x-4"
      >
        <span class="flex gap-x-3 items-center">
          <button
            class="w-10 h-10 border border-[#ddd] rounded-full flex items-center justify-center"
          >
            <i class="uil uil-search text-lg text-gray-500"></i></button
          ><select
            class="h-10 rounded-full border border-[#ddd] px-3 text-[13px]"
            v-model="documentType"
          >
            <option value="">Document type</option>
            <option
              :value="item.value"
              v-for="item in documents"
              :key="item.text"
            >
              {{ item.text }}
            </option>
          </select>
        </span>
        <span class="flex gap-x-3 items-center">
          <button
            @click="handleRequest"
            class="text-[13px] border border-primary- text-primary px-3 py-2 h-10 rounded-full whitespace-nowrap"
          >
            Request a document
          </button>
          <button
            class="w-10 h-10 border border-[#ddd] rounded-full flex items-center justify-center"
          >
            <i class="uil uil-sort text-lg text-gray-500"></i>
          </button>
        </span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <tbody class="">
            <tr class="" v-for="(n, id) in documentList" :key="id">
              <td class="border-b border-[#ddd] py-4 px-3">
                <div class="flex gap-x-3">
                  <i class="uil uil-file text-2xl text-gray-500"></i>

                  <div>
                    <p class="text-sm text-matta-black">
                      {{ n.fileName }}
                    </p>
                    <p class="text-xs text-[#ABABAB]">
                      {{ parseInt(n.fileSize / 1000) }}kb
                    </p>
                  </div>
                </div>
              </td>
              <td class="border-b border-[#ddd] py-4 px-3">
                <div class="flex items-center gap-x-5 text-sm">
                  <div class="flex-1 whitespace-nowrap">{{ n.category }}</div>
                  <span class="text-gray-200 text-3xl font-light">| </span>
                  <div class="flex items-center">
                    <a :href="n.documentUrl" :download="n.fileName">
                      <span
                        class="border border-gray-300 rounded-full h-8 w-8 flex items-center justify-center"
                        ><i class="uil uil-import"></i></span
                    ></a>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-if="!documentList.length"
          class="text-gray-400 text-xs text-center p-4"
        >
          Not available
        </div>
      </div>
    </div>
  </section>
  <div>
    <Modal :isOpen="isOpen" @togglePopup="isOpen = false">
      <template #content>
        <div class="h-[80vh]">
          <!-- <pdf :src="src"></pdf> -->
        </div>
        <div class="flex justify-center items-center">
          <span>Saftey data sheet</span>
          <button
            class="text-[13px] text-primary border-primary- border rounded-full px-2 py-3"
          >
            Download
          </button>
        </div>
      </template>
    </Modal>
    <SideModal
      :isOpen="openRequest"
      @togglePopup="openRequest = false"
      v-if="openRequest"
    >
      <template #content>
        <div class="h-full w-full bg-white rounded-lg p-6 lg:p-8">
          <IndexDocument @togglePopup="openRequest = false" />
        </div>
      </template>
    </SideModal>
  </div>
  <LoginModal
    v-if="isAuthOpen && active == 'signin'"
    :showSignup="true"
    :isOpen="isAuthOpen"
    @close="handleclose"
  />
  <RegisterModal
    v-if="isAuthOpen && active == 'signup'"
    :showSignup="true"
    :isOpen="isAuthOpen"
    @close="handleclose"
  />
</template>
<script setup>
import LoginModal from "~/components/LoginModal";
import RegisterModal from "~/components/RegisterModal";
import { inject, ref, provide, computed } from "vue";
import Modal from "~/components/IndexModal";
import SideModal from "~/components/SideModal";
import IndexDocument from "./document/IndexDocument";
// import pdf from "vue-pdf";
import { useStore } from "vuex";

const store = useStore();
const isAuthOpen = ref(false);
const openRequest = ref(false);
const isOpen = ref(false);
const product = inject("product");
const active = ref("signin");
const documentType = ref("");
const documents = [
  {
    text: "Material safety data sheet (MSDS)",
    item: "Info such as the chemical properties.",
    value: "Material safety data sheet (MSDS)",
  },
  {
    text: "Certificate of analysis (COA)",
    item: "Certificate of analysis of product.",
    value: "Certificate of analysis (COA)",
  },
  {
    text: "Technical data sheet (TDS)",
    item: "Document with technical data of product.",
    value: "Technical data sheet (TDS)",
  },
  {
    text: "Other",
    item: "Other types of product documents.",
    value: "other",
  },
];

const documentList = computed(() => {
  return product.value.documentInfoModels.filter((i) =>
    i.category.toLowerCase().includes(documentType.value.toLowerCase())
  );
});
function handleclose(val) {
  if (val == "success") {
    window.location.reload();
  }
  isAuthOpen.value = openRequest.value = false;
}
function handleRequest() {
  if (store.getters.isLoggedIn) {
    openRequest.value = true;
  } else {
    isAuthOpen.value = true;
  }
}
function togglePopup() {
  isOpen.value = false;
}
function toggleModal(val) {
  active.value = val;
}
provide("toggleModal", toggleModal);
provide("togglePopup", togglePopup);
</script>
