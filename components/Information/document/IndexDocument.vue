<template>
  <section class="flex flex-col h-full">
    <div class="flex-1">
      <div class="flex justify-between items-center mb-6">
        <h4 class="text-2xl font-medium">Request a Document</h4>
      </div>
      <article class="" v-if="supplier">
        <div class="flex items-center gap-x-4 mb-6">
          <div
            class="w-20 h-20 rounded-xl bg-white flex items-center justify-center"
          >
             <img :src="supplier.logo" class="rounded-xl" alt="alt" />
          </div>
          <div>
            <p class="font-medium text-base text-matta-black capitalize">
              {{ supplier.companyName }}
            </p>
            <p class="font-normal text-sm text-matta-black capitalize">
              <i class="uil uil-map-marker"></i> {{ supplier.city }},
              {{ supplier.country }}
            </p>
          </div>
        </div>
      </article>

      <div class="flex justify-between items-center mb-2 text-[13px] uppercase">
        <h4 class="text-[13px] uppercase">PharmaZell Clascoterone</h4>
        <span>Step {{ active }}/2</span>
      </div>
      <div class="grid grid-cols-2 border-b border-[#E7EBEE]">
        <span
          v-for="n in 2"
          :key="n"
          :class="`rounded-full pt-1 ${
            active >= n ? 'bg-primary' : 'bg-white'
          }`"
        ></span>
      </div>
      <div>
        <DocumentList v-if="active === 1 && !showAuth" />
        <RequestComplete v-if="active === 2" />
      </div>
    </div>
    <div v-if="active !== 2">
      <span
        v-if="!isLoggedIn"
        @click="isOpen = true"
        class="mb-2 text-primary text-xs cursor-pointer"
        >Log In to speed up your request
        <i class="uil uil-arrow-up-right text-x"></i
      ></span>
      <div class="flex justify-between gap-x-2 items-center mt-8">
        <button
          @click="emit('togglePopup')"
          type="button"
          class="appearance-none border w-1/2 leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 text-[13px] uppercase"
        >
          Cancel
        </button>
        <button
          v-if="active > 1"
          @click="active--"
          type="button"
          class="appearance-none border w-1/2 leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 text-[13px] uppercase"
        >
          Back
        </button>
        <button
          :disabled="!sampleForm.documentCategories.length || isLoading"
          @click="handleSubmit"
          type="button"
          class="appearance-none border w-1/2 border-primary- leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:opacity-70 disabled:opacity-50 text-[13px] uppercase"
        >
          Next
        </button>
      </div>
    </div>
    <div v-if="active === 2">
      <div class="flex justify-between gap-x-2 items-center mt-8">
        <NuxtLink to="/procurement/my-requests">
          <button
            type="button"
            class="appearance-none border w-full leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 text-[13px] uppercase"
          >
            My Requests
          </button>
        </NuxtLink>

        <button
          @click="togglePopup"
          type="button"
          class="appearance-none border w-full border-primary- leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
        >
          product page
        </button>
      </div>
    </div>
  </section>

</template>
<script setup>
import DocumentList from "./DocumentList";
import RequestComplete from "./RequestComplete";
import { ref, defineEmits, provide, computed, reactive, inject } from "vue";
import { useStore } from "vuex";
import { adddocument } from "~/services/requestservice";
import { toast } from 'vue3-toastify';

const authStore = useAuthStore()
const togglePopup = inject("togglePopup");
const product = inject("product");
const supplier = inject("supplier");
const sampleForm = reactive({
  sellerId: product.value?.supplierId,
  seller: supplier.value?.companyName,
  productId: product.value?.id,
  logo: product.value?.gallery[0],
  productName: product.value?.name,
  producerId: product.value?.producer.id,
  producer: product.value?.producer.title,
  documentCategories: [],
  description: "",
});


const store = useStore();
const showAuth = ref(false);
const isOpen = ref(false);
const active = ref(1);
const emit = defineEmits(["togglePopup"]);
const isLoading = ref(false);
const authType = ref("login");

async function handleSubmit() {
  isLoading.value = true;
  adddocument(sampleForm)
    .then((res) => {
      if (res.status === 200) {
        active.value = 2;
        isLoading.value = false;
      }
    })

    .catch((err) => {
      isLoading.value = false;

      toast.error((err?.response?.data?.message || err.response.data.Message));
    });
}
function toggleAuth() {
  isOpen.value = true;
}
function toggleModal(val) {
  authType.value = val;
}
const isLoggedIn = computed(() => {
  return authStore.isLoggedIn;
});

function handleclose() {
  isOpen.value = false;
  if (active.value == 2) {
    handleSubmit();
  }
}
provide("handleSubmit", handleSubmit);
provide("toggleModal", toggleModal);
provide("toggleAuth", toggleAuth);
provide("sampleForm", sampleForm);
</script>
