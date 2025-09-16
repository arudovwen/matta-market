<template>
  <section
    class="bg-[#343434] h-screen w-screen flex items-center justify-center p-6"
  >
    <!-- Loading Spinner -->
    <div
      v-if="status === 'initiate'"
      class="rounded-[10px] py-[30px] px-5 w-full max-w-[400px] text-white flex items-center justify-center"
    >
      <AppIcon
        icon="ei:spinner"
        iconClass="animate-spin duration-[2500ms] text-[100px]"
      />
    </div>

    <!-- Order Summary & Payment -->
    <div
      v-else
      class="bg-white rounded-[10px] py-[30px] px-5 w-full max-w-[400px] shadow"
    >
      <div class="pb-6 text-2xl font-semibold text-matta-black">Order Details</div>

      <div v-if="order?.items?.length" class="flex flex-col gap-y-5">
        <div class="flex justify-between" v-for="item in order.items" :key="item.product">
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

        <div class="flex justify-between" v-if="order?.discountValue">
          <p class="text-sm text-matta-black">Discount</p>
          <p class="text-sm font-medium text-matta-black">
            {{ currencyFormat(order.discountValue) }}
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
          <p class="text-sm font-medium text-matta-black">
            {{ currencyFormat(order?.shippingTotal) }}
          </p>
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
        :isDisabled="loading || !order?.items?.length || !userInfo"
        text="Make payment"
        btnClass="bg-primary-500 w-full text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm mb-4"
      />
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getcartorder, getcartcustomer, confirmpayment } from '~/services/cartservice';
import { toast } from 'vue3-toastify';
import { nanoid } from 'nanoid';

definePageMeta({
  layout: 'custom',
});

const route = useRoute();
const { orderId } = route.params;

const order = ref({});
const userInfo = ref(null);
const loading = ref(false);
const status = ref('initiate');
const orderData = ref(null);

onMounted(async () => {
  try {
    const res = await getcartorder({ orderNo: orderId });
    if (res.status === 200) {
      order.value = res.data.data;

      const resp = await getcartcustomer({ businessId: res.data.data.businessId });
      if (resp.status === 200) {
        userInfo.value = resp.data.data;
        status.value = 'ready'; // Show order summary and payment button
      }
    }
  } catch (err) {
    toast.error('Failed to load order details. Please refresh the page.');
    status.value = 'error';
  }
});

function handlePayment() {
  if (!userInfo.value || !order.value?.cartTotalwithTax) {
    toast.error('User or order information is missing');
    return;
  }

  loading.value = true;
  status.value = 'Processing payment...';

  orderData.value = {
    email: userInfo.value.email,
    name: userInfo.value.companyName,
    amount: order.value.cartTotalwithTax,
    phoneNumber: userInfo.value.phoneNumber,
    reference: `ORD-${orderId}-${nanoid(6)}`,
    orderId,
  };

  payWithMonnify(orderData.value, onModalClose, onSuccess);
}

async function onSuccess(response) {
  if (response.status.toLowerCase() !== 'success') {
    toast.error('Payment failed');
    loading.value = false;
    status.value = 'failed';
    return;
  }

  try {
    const res = await confirmpayment({
      ...orderData.value,
      transactionRef: response.transactionReference,
    });

    if (res.status === 200) {
      window.location.href = `/order-success?orderId=${orderId}`;
    } else {
      throw new Error('Confirmation failed');
    }
  } catch (err) {
    toast.error(
      `${
        err?.response?.data?.Message || err?.response?.data?.message
      }, Contact us for assistance on your order`
    );
    status.value = 'Retry order';
    loading.value = false;
  }
}

function onModalClose() {
  loading.value = false;
  status.value = 'cancelled';
  toast.error('Payment cancelled');
}
</script>
