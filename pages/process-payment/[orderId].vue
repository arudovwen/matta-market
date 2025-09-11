<template>
  <section
    class="bg-[#343434] h-screen w-screen flex items-center justify-center p-6"
  >
    <div
      v-if="status === 'initiate'"
      class="rounded-[10px] py-[30px] px-5 w-full max-w-[400px] text-white flex itemx-center justify-center"
    >
      <AppIcon
        icon="ei:spinner"
        iconClass="animate-spin duration-[2500ms] text-[100px]"
      />
    </div>
    <div
      v-else
      class="bg-white rounded-[10px] py-[30px] px-5 w-full max-w-[400px] shadow"
    >
      <div class="pb-6 text-2xl font-semibold text-matta-black">Order Details</div>
      <div class="flex flex-col gap-y-5">
        <div class="flex justify-between" v-for="item in order?.items">
          <div>
            <p class="font-semibold text-sm text-matta-black mb-[2px]">
              {{ item.product }}
            </p>
            <p class="text-xs text-[#959595]">
              Qty: {{ item.quantity }} {{ item.selectedPackage }}
            </p>
          </div>
          <p class="text-sm font-medium text-matta-black">
            {{ currencyFormat(item.packagePrice) }}
          </p>
        </div>
      </div>
      <hr class="my-[20px] border-white/10" />
      <div class="flex flex-col gap-y-3">
        <div class="flex justify-between">
          <p class="text-sm text-matta-black">Sub-total</p>

          <p class="text-sm font-medium text-matta-black">
            {{ currencyFormat(order?.cartTotal) }}
          </p>
        </div>
        <div class="flex justify-between" v-if="order.discountValue">
          <p class="text-sm text-matta-black">Discount</p>

          <p class="text-sm font-medium text-matta-black">
            {{ currencyFormat(order?.discountValue) }}
          </p>
        </div>
        <div class="flex justify-between">
          <p class="text-sm text-matta-black">VAT (7.5%)</p>

          <p class="text-sm font-medium text-matta-black">
            {{ currencyFormat(order?.cartTotalwithTax - order?.cartTotal) }}
          </p>
        </div>
        <div class="flex justify-between">
          <p class="text-sm text-matta-black">Shipping & Handling</p>

          <p class="text-sm font-medium text-matta-black">{{currencyFormat(order?.shippingTotal)}}</p>
        </div>
      </div>
      <hr class="my-[20px] border-white/10" />
      <div class="flex justify-between mb-[25px]">
        <p class="text-sm text-matta-black">Total</p>

        <p class="font-bold text-matta-black">
          {{ currencyFormat(order?.cartTotalwithTax) }}
        </p>
      </div>
      <AppButton
        :isLoading="loading"
        @click="handlePayment"
        :isDisabled="loading"
        text="Make payment"
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
  layout: "custom",
});
const order = ref({});
const status = ref("initiate");
const route = useRoute();
const { orderId } = route.params;
const loading = ref(false);
const userInfo = ref(null);
const orderData = ref(null)
function handlePayment() {
  status.value = "Processing payment...";
  loading.value = true;
   orderData.value = {
    email: userInfo?.value?.email,
    name: userInfo?.value.companyName,
    amount: order?.value?.cartTotalwithTax,
    phoneNumber: userInfo?.value?.phoneNumber,
    reference: `ORD-${orderId}-${nanoid(6)}`,
    orderId: orderId,
  };

  payWithMonnify(orderData, onModalClose, onSuccess);
}
function onSuccess(response) {
  if (response.status.toLowerCase() === "success") {
    window.location.href = `/order-success?orderId=${orderId}`;
  }
}
async function onSuccess(response) {
  if (response.status.toLowerCase() !== "success") return;

  try {
    const res = await confirmpayment({
      ...orderData.value,
      transactionRef: response.transactionReference,
    });

    if (res.status === 200) {
      window.location.href = `/order-success?orderId=${orderId}`;
    }
  } catch (err) {
    toast.error(
      `${
        err?.response?.data?.Message || err?.response?.data?.message
      }, Contact us for assistance on your order`
    );
    status.value = "Retry order";
    loading.value = false;
  }
}
function onModalClose() {
  loading.value = false;
  status.value = "cancelled";
  toast.error("Payment cancelled");
}

onMounted(() => {
  getcartorder({ orderNo: orderId }).then((res) => {
    if (res.status === 200) {
      order.value = res.data.data;
      getcartcustomer({ businessId: res.data.data.businessId }).then((resp) => {
        if (resp.status === 200) {
          userInfo.value = resp.data.data;
          handlePayment();
        }
      });
    }
  });
});
</script>
