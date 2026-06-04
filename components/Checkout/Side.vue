<template>
  <div
    class="bg-[#101828] rounded-[10px] py-[30px] px-5 w-full lg:w-[250px] xl:w-[360px]"
  >
    <div class="pb-6 text-2xl font-semibold text-white">Order Details</div>
    <div class="flex flex-col gap-y-5">
      <div
        class="flex justify-between"
        v-for="item in cartStore?.cart"
        :key="item.product + item.selectedPackage"
      >
        <div>
          <p class="font-semibold text-sm text-white mb-[2px]">
            {{ item.product }}
          </p>
          <p class="text-xs text-[#959595]">
            Qty: {{ item.quantity }} {{ item.selectedPackage }}
          </p>
        </div>
        <p class="text-xs font-normal text-white">
          {{ currencyFormat(item.packagePrice) }}
        </p>
      </div>
    </div>

    <hr class="my-[20px] border-white/10" />

    <div class="flex flex-col gap-y-3">
      <OrderSummaryRow label="Sub-total" :value="cartStore?.cartTotalAmount" />
      <OrderSummaryRow
        label="VAT (7.5%)"
        :value="cartStore?.cartTotalAmount * cartStore?.tax"
      />

      <OrderSummaryRow
        v-if="cartStore?.discountValue"
        label="Discount"
        :value="cartStore?.discountValue"
        isNegative
      />
      <OrderSummaryRow
        v-if="cartStore?.referralDiscountValue"
        label="Referral Discount"
        :value="cartStore?.referralDiscountValue"
        isNegative
      />
    </div>

    <hr class="my-[20px] border-white/10" />

    <OrderSummaryRow
      v-if="selectedShipping === 'shipping'"
      label="Estimated Shipping Cost"
      :value="cartStore?.shippingTotal"
      isBold
    />

    <hr class="my-[20px] border-white/10" />

    <div class="flex justify-between mb-[25px]">
      <p class="text-sm text-[#E1E1E1]">Total</p>
      <p class="font-bold text-white">
        {{ currencyFormat(cartStore?.cartTotalwithTax) }}
      </p>
    </div>

    <AppButton
      @click="handleOrderRequest"
      text="Submit Order Request"
      :isLoading="requestLoading"
      :isDisabled="isOrderRequestDisabled"
      loadingText="Processing ..."
      btnClass="bg-primary-500 w-full text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm mb-4"
    />

    <AppButton
      @click="confirmOrder"
      :isLoading="loading || cartStore?.loadingCart"
      :isDisabled="isPaymentDisabled || insufficient"
      :text="status"
      loadingText="Processing ..."
      btnClass="!text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm bg-[#FF9900] !normal-case mb-4 w-full"
    />

    <p class="text-xs text-[#E1E1E1]">{{ orderText }}</p>
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import { nanoid } from "nanoid";
import { confirmpurchase, confirmpayment } from "~/services/cartservice";
import OrderSummaryRow from "./sideRow.vue";

const isPopOpen = inject("isPopOpen");
const activeMethod = inject("activeMethod");
const authOpen = inject("authOpen");
const selectedShipping = inject("selectedShipping");

const shippingStore = useShippingStore();
const authStore = useAuthStore();
const cartStore = useCartStore();

const loading = ref(false);
const requestLoading = ref(false);
const status = ref("Make Payment");
const router = useRouter();
const insufficient = ref(false);
const referenceData = reactive({
  zohoorderId: null,
  transactionRef: null,
  orderId: null,
});

const data = ref(null);

// Computed to simplify button disabling
const isOrderRequestDisabled = computed(
  () =>
    !cartStore?.cart ||
    !cartStore?.cartTotalwithTax ||
    loading.value ||
    (!shippingStore?.defaultAddress?.id &&
      selectedShipping.value === "shipping") ||
    cartStore?.loadingCart ||
    requestLoading.value,
);

const isPaymentDisabled = computed(
  () =>
    !cartStore?.cart ||
    !cartStore?.cartTotalAmount ||
    loading.value ||
    (!shippingStore?.defaultAddress?.id &&
      selectedShipping.value === "shipping") ||
    cartStore?.loadingCart ||
    requestLoading.value ||
    (activeMethod.value === "wallet" &&
      authStore.userBalance?.balance?.availableBalance <
        cartStore?.cartTotalwithTax),
);

function onModalClose() {
  loading.value = false;
  status.value = "Retry payment";
  toast.error("Payment cancelled");
}

function makePayment() {
  loading.value = true;
  status.value = "Processing order...";
  data.value = {
    shippingAddressId: shippingStore?.defaultAddress.id,
    email: authStore.userInfo?.email,
    name: `${authStore.userInfo?.firstName} ${authStore.userInfo?.lastName}`,
    amount: cartStore?.cartTotalwithTax,
    phoneNumber: authStore.userInfo?.phoneNumber,
    reference: referenceData.transactionRef,
    orderRequest: false,
  };
  payWithMonnify(data.value, onModalClose, onSuccess);
}

async function confirmOrder() {
  if (
    activeMethod.value === "wallet" &&
    authStore.userBalance?.balance?.availableBalance <
      cartStore?.cartTotalwithTax
  ) {
    toast.info("Insufficient Wallet balance");
    return;
  }

  if (activeMethod.value === "credit") {
    isPopOpen.value = true;
    return;
  }

  loading.value = true;
  try {
    const res = await confirmpurchase({
      shippingAddressId: shippingStore?.defaultAddress.id,
      orderRequest: false,
      paymentOption: activeMethod.value === "card" ? 0 : 1,
      orderPickUp: selectedShipping.value === "pickup",
    });

    if (res.status === 200) {
      if (activeMethod.value === "wallet") {
        cartStore?.clearCart();
        window.location.href = `/order-success?orderId=${res.data.data}`;
      } else {
        referenceData.transactionRef = `ORD-${res.data.data}-${nanoid(6)}`;
        referenceData.zohoorderId = `ORD-${res.data.data}`;
        referenceData.orderId = res.data.data;
        makePayment();
      }
    }
  } catch (err) {
    toast.error(
      `${
        err?.response?.data?.Message ||
        err?.response?.data?.message ||
        "Payment Failed"
      }, Contact us for assistance on your order`,
    );
    status.value = "Retry order";
  } finally {
    loading.value = false;
  }
}

async function onSuccess(response) {
  if (response.status.toLowerCase() !== "success") return;

  try {
    const res = await confirmpayment({
      ...referenceData,
      transactionRef: response.transactionReference,
    });

    if (res.status === 200) {
      cartStore?.clearCart();
      window.location.href = `/order-success?orderId=${referenceData.orderId}`;
    }
  } catch (err) {
    toast.error(
      `${
        err?.response?.data?.Message || err?.response?.data?.message
      }, Contact us for assistance on your order`,
    );
    status.value = "Retry order";
    loading.value = false;
  }
}

async function handleOrderRequest() {
  if (!authStore.isLoggedIn) {
    authOpen.value = true;
    return;
  }

  requestLoading.value = true;
  try {
    const res = await confirmpurchase({
      shippingAddressId: shippingStore?.defaultAddress?.id,
      orderRequest: true,
    });

    if (res.status === 200) {
      cartStore?.clearCart();
      window.location.href = `/order-success?orderId=${res.data.data}&order_type=requests`;
    }
  } catch (err) {
    toast.error(
      `${
        err?.response?.data?.Message || err?.response?.data?.message
      }, Contact us for assistance on your order`,
    );
  } finally {
    requestLoading.value = false;
  }
}

// Dynamically watch for insufficiency
watchEffect(() => {
  insufficient.value =
    cartStore?.cartTotalwithTax >
      authStore.userBalance?.creditDetail?.availableCredit &&
    activeMethod.value === "credit";
});
</script>
