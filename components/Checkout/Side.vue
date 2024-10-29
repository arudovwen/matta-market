<template>
  <div
    class="bg-[#101828] rounded-[10px] py-[30px] px-5 w-full lg:w-[250px] xl:w-[360px]"
  >
    <div class="font-semibold text-2xl text-white pb-6">Order Details</div>
    <div class="flex flex-col gap-y-5">
      <div class="flex justify-between" v-for="item in cartStore?.cart">
        <div>
          <p class="font-semibold text-sm text-white mb-[2px]">
            {{ item.product }}
          </p>
          <p class="text-xs text-[#959595]">
            Qty: {{ item.quantity }} {{ item.selectedPackage }}
          </p>
        </div>
        <p class="font-normal text-xs text-white">
          {{ currencyFormat(item.packagePrice) }}
        </p>
      </div>
    </div>
    <hr class="my-[20px] border-white/10" />
    <div class="flex flex-col gap-y-3">
      <div class="flex justify-between">
        <p class="text-sm text-[#E1E1E1]">Sub-total</p>

        <p class="text-white text-xs">
          {{ currencyFormat(cartStore?.cartTotalAmount) }}
        </p>
      </div>
      <div class="flex justify-between">
        <p class="text-sm text-[#E1E1E1]">VAT (7.5%)</p>

        <p class="text-white text-xs">
          {{ currencyFormat(cartStore?.cartTotalAmount * cartStore?.tax) }}
        </p>
      </div>
      <div class="flex justify-between" v-if="cartStore?.discountValue">
        <p class="text-sm text-[#E1E1E1]">Discount</p>

        <p class="text-white text-xs">
          - {{ currencyFormat(cartStore?.discountValue) }}
        </p>
      </div>
      <div class="flex justify-between" v-if="cartStore?.referralDiscountValue">
        <p class="text-sm text-[#E1E1E1]">Referral Discount</p>

        <p class="text-white text-xs">
          - {{ currencyFormat(cartStore?.referralDiscountValue) }}
        </p>
      </div>
    </div>
    <hr class="my-[20px] border-white/10" />
    <div>
      <div class="flex justify-between">
        <p class="text-sm text-[#E1E1E1]">Estimated Shipping Cost</p>

        <p class="text-white font-medium text-sm">
          {{ currencyFormat(cartStore?.shippingTotal) }}
        </p>
      </div>
    </div>
    <hr class="my-[20px] border-white/10" />
    <div class="flex justify-between mb-[25px]">
      <p class="text-sm text-[#E1E1E1]">Total</p>

      <p class="text-white font-bold">
        {{ currencyFormat(cartStore?.cartTotalwithTax) }}
      </p>
    </div>
    <AppButton
      @click="handleOrderRequest()"
      text="Submit Order Request"
      :isLoading="requestLoading"
      :isDisabled="
        !cartStore?.cart ||
        !cartStore?.cartTotalAmount ||
        cartStore?.loadingCart ||
        requestLoading ||
        loading
      "
      loadingText="Processing ..."
      btnClass="bg-primary-500  w-full text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm mb-4"
    />

    <AppButton
      v-if="cartStore?.cartTotalAmount > minCartAmount"
      :isLoading="loading || cartStore?.loadingCart"
      @click="confirmOrder"
      :isDisabled="
        !cartStore?.cart ||
        !cartStore?.cartTotalAmount ||
        loading ||
        !shippingStore?.defaultAddress?.id ||
        cartStore?.loadingCart ||
        requestLoading
      "
      :text="status"
      loadingText="Processing ..."
      btnClass="!text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm bg-[#FF9900] !normal-case mb-4 w-full"
    />
  
    <p class="text-xs text-[#E1E1E1]">
      {{ orderText }}
    </p>
  </div>
</template>
<script setup>
import { toast } from "vue3-toastify";
import { confirmpurchase, confirmpayment } from "~/services/cartservice";
import { nanoid } from "nanoid";

const isPopOpen = inject("isPopOpen");
const activeMethod = inject("activeMethod");
const authOpen = inject("authOpen");
const shippingStore = useShippingStore();
const authStore = useAuthStore();
const cartStore = useCartStore();
const loading = ref(false);
const router = useRouter();

const data = ref(null);
const status = ref("Make Payment");
const requestLoading = ref(false);
function onModalClose() {
  loading.value = false;
  toast.error("Payment cancelled");
  status.value = "Retry payment";
  loading.value = false;
}
function makePayment(reference) {
  status.value = "Processing order...";
  loading.value = true;
  data.value = {
    shippingAddressId: shippingStore?.defaultAddress.id,
    email: authStore.userInfo?.email,
    name: `${authStore.userInfo?.firstName} ${authStore.userInfo?.lastName}`,
    amount: cartStore?.cartTotalwithTax,
    phoneNumber: authStore.userInfo?.phoneNumber,
    reference: `ORD-${reference}-${nanoid(6)}`,
    orderId: reference,
  };

  payWithMonnify(data.value, onModalClose, onSuccess);
}
function confirmOrder() {
  // status.value = "Processing order...";
  if (activeMethod.value === "card") {
    loading.value = true;
    confirmpurchase({ shippingAddressId: shippingStore?.defaultAddress.id })
      .then((res) => {
        if (res.status === 200) {
          makePayment(res.data.data);
        }
      })
      .catch((err) => {
        const error = `${
          err?.response?.data?.Message || err?.response?.data?.message
        }, Contact us for assistance on your order`;
        toast.error(error);
        status.value = "Retry order";
        loading.value = false;
      });
    return;
  }
  if (activeMethod.value === "credit") {
    isPopOpen.value = true;
    return;
  }
}
function onSuccess(response) {
  if (response.status.toLowerCase() === "success") {
    confirmpayment({ orderId: data.value.orderId })
      .then((res) => {
        if (res.status === 200) {
          cartStore?.clearCart();
          window.location.href = `/order-success?orderId=${data.value.orderId}`;
        }
      })
      .catch((err) => {
        const error = `${
          err?.response?.data?.Message || err?.response?.data?.message
        }, Contact us for assistance on your order`;
        toast.error(error);
        status.value = "Retry order";
        loading.value = false;
      });
  }
}
function handleOrderRequest() {
  if (!authStore.isLoggedIn) {
    authOpen.value = true;
    return;
  }
  requestLoading.value = true;
  confirmpurchase({ shippingAddressId: shippingStore?.defaultAddress?.id })
    .then((res) => {
      if (res.status === 200) {
        requestLoading.value = false;
        cartStore?.clearCart();
        window.location.href = `/order-success?orderId=${res.data.data}&order_type=requests`;
      }
    })
    .catch((err) => {
      const error = `${
        err?.response?.data?.Message || err?.response?.data?.message
      }, Contact us for assistance on your order`;
      toast.error(error);
      requestLoading.value = false;
    });
}
</script>
