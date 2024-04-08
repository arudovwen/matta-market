<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col h-full overflow-y-auto"
  >
    <div class="flex-1">
      <div class="flex justify-between items-center mb-6">
        <h4 class="text-lg sm:text-2xl font-medium">Request a Quote</h4>
      </div>

      <div class="flex justify-between items-center mb-2 text-[13px] uppercase">
        <h4 class="text-[13px] uppercase">{{ product.name }}</h4>
        <span>Step {{ active }}/3</span>
      </div>
      <div class="grid grid-cols-3 border-b border-[#E7EBEE]">
        <span
          v-for="n in 3"
          :key="n"
          :class="`rounded-full pt-1 ${
            active >= n ? 'bg-primary' : 'bg-white'
          }`"
        ></span>
      </div>
      <div>
        <InformationQuoteUsageDetails v-if="active === 1" />
        <div v-if="active === 2 && !showAuth">
          <InformationQuoteShippingAddress />
        </div>
        <InformationQuoteRequestComplete v-if="active === 3" />
        <InformationQuoteRegisterComponent v-if="active === 2 && showAuth" />
      </div>
    </div>
    <div v-if="active !== 3">
      <span
        @click="isOpen = true"
        class="mb-2 text-primary text-xs"
        v-if="!authStore.isLoggedIn"
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
          @click="toggleNext"
          type="button"
          class="appearance-none border w-1/2 border-primary- leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
        >
          Next
        </button>
      </div>
    </div>
    <div v-if="active === 3">
      <div class="grid grid-cols-2 justify-between gap-x-2 items-center mt-8">
        <NuxtLink to="/procurement/my-requests">
          <button
            type="button"
            class="appearance-none whitespace-nowrap border w-full leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 text-[13px] uppercase"
          >
            My Quotes
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
  </form>
  <LoginModal
    v-if="isOpen"
    :showSignup="false"
    :isOpen="isOpen"
    @close="handleclose"
  />
</template>
<script setup>
import { useStore } from "vuex";
import { newquote } from "~/services/quoteservice";
import useVuelidate from "@vuelidate/core";
import { required, numeric, helpers } from "@vuelidate/validators";
import { toast } from 'vue3-toastify';
import { getCompanyProfile } from "~/services/settingservices";

onMounted(() => {
  getCompanyProfile().then((res) => {
    quoteForm.buyerBusinessName = res.data.data.companyName;
  });
});
const supplierStore = useSupplierStore()
const togglePopup = inject("togglePopup");
const authStore = useAuthStore()
const store = useStore();
const product = inject("product");
const quoteForm = reactive({
  sellerId: product.value?.supplierId,
  seller: supplierStore.supplierData?.companyName,
  productId: product.value?.id,
  productImg: product.value?.gallery[0],
  productName: product.value?.name,
  producerId: product.value?.producer.id,
  producer: product.value?.producer.title,
  buyerBusinessName: "",
  requestedBy: authStore?.userInfo?.fullName,
  sellerName: supplierStore.supplierData?.companyName,
  market: "",
  productUse: "",
  expectedVolume: 0,
  unit: product.value?.unit,
  deliverAddress: "",
  contactPhone: "",
  additionalInformation: "",
  phoneCode: "+234",
  phone: null,
  package: null,
  applications: "",
});


const showAuth = ref(false);
const isOpen = ref(false);
const active = ref(1);
const emit = defineEmits(["togglePopup"]);
const isLoading = ref(false);
const authType = ref("login");
const myrules1 = {
  market: { required },
  applications: { required },
  productUse: { required },
  expectedVolume: { required },
  package: { required },
  unit: { required },
};
const validPhoneLength = (value) =>
  quoteForm.phoneCode === "+234" ? value.length > 9 && value.length < 12 : true;
const myrules2 = {
  deliverAddress: { required },
  phone: {
    required,
    numeric,
    validPhoneLength: helpers.withMessage(
      "Phone number must be between 10 0r 11 digits",
      validPhoneLength
    ),
  },
  additionalInformation: {},
};

const request1$ = useVuelidate(myrules1, quoteForm);
const request2$ = useVuelidate(myrules2, quoteForm);

async function handleSubmit() {
  const validity1 = await request1$.value.$validate();
  const validity2 = await request2$.value.$validate();
  if (!validity1 || !validity2) return;
  isLoading.value = true;
  quoteForm.contactPhone = `${quoteForm.phoneCode} - ${quoteForm.phone}`;
  newquote(quoteForm)
    .then((res) => {
      if (res.status === 200) {
        active.value = 3;
      }
    })

    .catch((err) => {
      isLoading.value = false;

      toast.error((err.response.data.message || err.response.data.Message));
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
async function toggleNext() {
  if (active.value == 1) {
    const validity = await request1$.value.$validate();
    if (!validity) {
      return;
    }
  }
  if (active.value == 2) {
    const validity1 = await request2$.value.$validate();
    if (!validity1) {
      return;
    }
  }
  if (active.value == 2 && !isLoggedIn.value) {
    showAuth.value = true;
    return;
  }
  if (active.value == 2 && isLoggedIn.value) {
    handleSubmit();
    return;
  }
  active.value++;
}
function handleclose() {
  isOpen.value = false;
  if (active.value == 2) {
    handleSubmit();
  } else {
    showAuth.value = false;
  }
}
provide("handleSubmit", handleSubmit);
provide("toggleModal", toggleModal);
provide("toggleAuth", toggleAuth);
provide("request1$", request1$);
provide("request2$", request2$);
provide("quoteForm", quoteForm);
</script>
