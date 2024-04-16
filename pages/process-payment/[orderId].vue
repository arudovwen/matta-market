<template>
  <section
    class="bg-transparent h-screen w-screen flex items-center justify-center p-6"
  >
    <div
      class="bg-[#333] rounded-[10px] py-[30px] px-5 w-full max-w-[400px] shadow"
    >
      <div class="font-semibold text-2xl text-white pb-6">Order Details</div>
      <div class="flex flex-col gap-y-5">
        <div class="flex justify-between" v-for="item in order?.items">
          <div>
            <p class="font-semibold text-sm text-white mb-[2px]">
              {{ item.product }}
            </p>
            <p class="text-xs text-[#959595]">
              Qty: {{ item.quantity }} {{ item.selectedPackage }}
            </p>
          </div>
          <p class="font-medium text-sm text-white">
            {{ currencyFormat(item.packagePrice) }}
          </p>
        </div>
      </div>
      <hr class="my-[20px] border-white/10" />
      <div class="flex flex-col gap-y-3">
        <div class="flex justify-between">
          <p class="text-sm text-[#E1E1E1]">Sub-total</p>

          <p class="text-white font-medium text-sm">
            {{ currencyFormat(order?.cartTotal) }}
          </p>
        </div>
        <div class="flex justify-between">
          <p class="text-sm text-[#E1E1E1]">VAT (7.5%)</p>

          <p class="text-white text-sm font-medium">
            {{ currencyFormat(order?.cartTotalwithTax - order?.cartTotal) }}
          </p>
        </div>
        <div class="flex justify-between">
          <p class="text-sm text-[#E1E1E1]">Shipping & Handling</p>

          <p class="text-white font-medium text-sm">TBD</p>
        </div>
      </div>
      <hr class="my-[20px] border-white/10" />
      <div class="flex justify-between mb-[25px]">
        <p class="text-sm text-[#E1E1E1]">Total</p>

        <p class="text-white font-bold">
          {{ currencyFormat(order?.cartTotalwithTax) }}
        </p>
      </div>
      <AppButton
        :isLoading="loading"
        @click="handlePayment"
        :isDisabled="loading"
        :text="status"
        btnClass="bg-primary-500  w-full text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm mb-4"
      />
    </div>
  </section>
</template>

<script setup>
import { getcartorder, getcartcustomer } from "~/services/cartservice";
import { toast } from "vue3-toastify";
import { nanoid } from "nanoid";
definePageMeta({
  layout: "default",
});
const order = ref({});
const status = ref("Make payment");
const route = useRoute();
const { orderId } = route.params;
const loading = ref(false);
const userInfo = ref(null);
function handlePayment() {
  status.value = "Processing payment...";
  loading.value = true;
  const data = {
    email: userInfo?.value?.email,
    name: userInfo?.value.companyName,
    amount: order?.value?.cartTotalwithTax,
    phoneNumber: userInfo?.value?.phoneNumber,
    reference: `ORD-${orderId}-${nanoid(6)}`,
    orderId: orderId,
  };

  payWithMonnify(data, onModalClose, onSuccess);
}
function onSuccess(response) {
  if (response.status.toLowerCase() === "success") {
    window.location.href = `/order-success?orderId=${ orderId}`;
  }
}
function onModalClose() {
  loading.value = false;
  toast.error("Payment cancelled");
  status.value = "Retry payment";
  loading.value = false;
}

onMounted(() => {
  getcartorder({ orderNo: orderId }).then((res) => {
    if (res.status === 200) {
      order.value = res.data.data;
      getcartcustomer({ businessId: res.data.data.businessId }).then((resp) => {
        if (resp.status === 200) {
          userInfo.value = resp.data.data;
        }
      });
    }
  });
});
</script>
