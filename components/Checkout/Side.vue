<template>
  <div
    class="bg-[#333] rounded-[10px] py-[30px] px-5 w-full lg:w-[250px] xl:w-[360px]"
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
          {{ currencyFormat(cartStore?.cartTotalAmount) }}
        </p>
      </div>
      <div class="flex justify-between">
        <p class="text-sm text-[#E1E1E1]">Tax (7.5%)</p>

        <p class="text-white text-sm font-medium">
          {{ currencyFormat(cartStore?.cartTotalAmount * cartStore?.tax) }}
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
        {{
          currencyFormat(
            cartStore?.cartTotalAmount * cartStore?.tax +
              cartStore?.cartTotalAmount
          )
        }}
      </p>
    </div>
    <AppButton
      :isLoading="loading"
      @click="confirmOrder"
      :isDisabled="
        !cartStore?.cart ||
        !cartStore?.cartTotalAmount ||
        loading ||
        !shippingStore?.defaultAddress?.id
      "
      :text="status"
      btnClass="bg-primary-500  w-full text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm mb-4"
    />

    <p class="text-xs text-[#E1E1E1]">
      After placing an order, our manager will contact you to clarify the price
      and other details of your order.
    </p>
  </div>
</template>
<script setup>
import { toast } from "vue3-toastify";
import { confirmpurchase,confirmpayment } from "~/services/cartservice";

const cartTaxAmount = computed(
  () => cartStore?.cartTotalAmount * cartStore?.tax + cartStore?.cartTotalAmount
);
const shippingStore = useShippingStore();
const authstore = useAuthStore();
const loading = ref(false);
const cartStore = useCartStore();
const router = useRouter();

const data = ref(null);
const status = ref("Confirm order");
function onModalClose() {
  loading.value = false;
  toast.error("Payment cancelled");
  status.value = "Retry order";
  loading.value = false;
}
function makePayment(reference) {
  status.value = "Processing order...";
  loading.value = true;
  data.value = {
    shippingAddressId: shippingStore?.defaultAddress.id,
    email: authstore.userInfo?.email,
    name: `${authstore.userInfo?.firstName} ${authstore.userInfo?.lastName}`,
    amount: cartTaxAmount.value,
    phoneNumber: authstore.userInfo?.phoneNumber,
    reference,
  };

  payWithMonnify(data.value, onModalClose, onSuccess);
}
function confirmOrder() {
  status.value = "Processing order...";
  loading.value = true;
  confirmpurchase({ shippingAddressId:  shippingStore?.defaultAddress.id })
    .then((res) => {
      if (res.status === 200) {
        console.log("🚀 ~ .then ~ res:", res);
        makePayment(res.data.data)
      }
    })
    .catch((err) => {
      const error = `${
        err.response.data.Message || err.response.data.message
      }, Contact us for assistance on your order`;
      toast.error(error);
      status.value = "Retry order";
      loading.value = false;
    });
}
function onSuccess(response) {
  if (response.status.toLowerCase() === "success") {
    confirmpayment({ orderId: data.value.reference })
      .then((res) => {
        if (res.status === 200) {
          cartStore?.clearCart;
          window.location.href = "/order-success";
          // window.location.href = `/transaction/successful?trx_ref=${response.transactionReference}`;
          // Payment complete! Reference: transaction.reference
        }
      })
      .catch((err) => {
        const error = `${
          err.response.data.Message || err.response.data.message
        }, Contact us for assistance on your order`;
        toast.error(error);
        status.value = "Retry order";
        loading.value = false;
      });
  }
}
</script>
