<template>
  <div>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-[999]" @close="handleclose">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-[#222222]/60 transition-opacity"
          />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div
            class="flex items-center justify-center min-h-full p-4 text-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                class="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-sm sm:w-full"
              >
                <div class="px-6 py-6 bg-white">
                  <div class="flex items-center justify-between mb-5">
                    <div>
                      <NuxtImg
                        alt="delte"
                        v-if="!insufficient"
                        src="/images/handes.svg"
                      />
                      <NuxtImg alt="delte" v-else src="/images/reject.svg" />
                    </div>
                    <span
                      v-if="canClose"
                      @click="handleclose"
                      class="absolute top-3 right-4"
                    >
                      <i
                        class="uil uil-times cursor-pointer text-xl text-[#98A2B3]"
                      ></i>
                    </span>
                  </div>

                  <h4 class="font-semibold text-[#101828] text-lg mb-[4px]">
                    Credit Advance
                  </h4>

                  <p class="text-sm text-[#475467]">
                    {{ handleMessage() }}
                  </p>
                  <div
                    v-if="available && creditDetail.creditWalletStatus === 1"
                    class="rounded-lg py-6 px-4 border border-[#E2E2E2] bg-[#F2F4F7] mt-4"
                  >
                    <div class="grid gap-y-2">
                      <div
                        class="flex items-center justify-between text-xs gap-x-2"
                        v-for="item in insufficient
                          ? advanceOptions
                          : bankOptions"
                        :key="item.key"
                      >
                        <span class="text-[#344054] capitalize"
                          >{{ item.title }}
                        </span>

                        <span class="text-[#344054] font-semibold">{{
                          item.key === "dueDate" || item.key === "repaymentDate"
                            ? moment(
                                handleData(creditDetail)?.[item.key],
                              ).format("ll")
                            : currencyFormat(
                                handleData(creditDetail)?.[item.key],
                              )
                        }}</span>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="!insufficient"
                    class="flex items-center mt-6 gap-x-4"
                  >
                    <button
                      v-if="isCancel"
                      type="button"
                      @click="handleclose"
                      paci
                      class="h-11 appearance-none leading-none px-4 py-[10px] rounded-lg text-matta-black hover:bg-gray-100 text-sm w-full border border-[#D0D5DD] font-medium justify-center flex items-center"
                    >
                      Cancel
                    </button>

                    <AppButton
                      :isDisabled="isLoading || insufficient"
                      :isLoading="isLoading"
                      type="button"
                      :text="!available ? 'Apply for credit' : 'Proceed'"
                      @click="handlePurchase"
                      class="h-11 bg-primary-500 appearance-none leading-none px-4 py-[10px] rounded-lg text-white text-sm w-full border font-medium disabled:opacity-50 flex items-center justify-center"
                    />
                  </div>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import moment from "moment";
import { toast } from "vue3-toastify";
import { confirmpurchase } from "~/services/cartservice";
import { getPrepaidInfo } from "~/services/creditservice";

const isLoading = ref(false);
const shippingStore = useShippingStore();
const cartStore = useCartStore();
const props = defineProps({
  title: {
    default: "",
  },
  text: { default: "" },
  open: { default: false },
  btnText: { default: "" },
  loading: { default: false },
  available: { default: true },
  insufficient: { default: false },
  detail: { default: null },
  isCancel: { default: true },
  isOkay: { default: false },
  canClose: { default: true },
  creditDetail: { default: null },
});
const prepaidInfo = ref(null);
const emits = defineEmits(["close"]);

const text1 = "You are about to make payment for this purchase using credit?";
const text2 =
  "You are not yet pre-qualified for this option of payment. Would you like to apply for a credit?";
const text3 = "You do not have sufficient credit to complete this purchase. ";
const text4 =
  "Your credit request is currently pending. Please consider using an alternative payment option";
// Would you like to pay the balance";
function actionItem() {}
function handleclose() {
  emits("close");
}

const bankOptions = [
  {
    title: "Available Balance",
    key: "availableCredit",
  },
  {
    title: "Amount to pay",
    key: "amountToPay",
  },
  {
    title: "Due date",
    key: "repaymentDate",
  },
  {
    title: "Repayment Amount",
    key: "repaymentAmount",
  },
];

const advanceOptions = [
  {
    title: "Available credit",
    key: "availableCredit",
  },
  {
    title: "total purchase",
    key: "creditUsed",
  },
  {
    title: "balance to pay",
    key: "amountToPay",
  },
  {
    title: "Repayment Amount",
    key: "creditLimit",
  },
  {
    title: "Due date",
    key: "repaymentDate",
  },
];

function handlePurchase() {
  isLoading.value = true;
  if (!props.available || props.insufficient) {
    window.open("https://dev.oxide.matta.trade/credit", "_blank");
    isLoading.value = false;
    return;
  }
  if (!shippingStore?.defaultAddress?.id) {
    toast.info("Please provide a shipping address");
    isLoading.value = false;
    return;
  }
  if (!props.insufficient) {
    confirmpurchase({
      paymentOption: 3,
      shippingAddressId: shippingStore?.defaultAddress.id,
    })
      .then((res) => {
        if (res.status === 200) {
          cartStore?.clearCart();
          navigateTo(`/order-success?orderId=${res?.data?.data}`);
          isLoading.value = false;
        }
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message || err?.response?.data?.Message,
        );
        isLoading.value = false;
      });
  }
}
function handleData(data) {
  return { ...data, ...prepaidInfo.value };
}
function handleMessage() {
  if (props.insufficient && props?.creditDetail?.creditWalletStatus === 1) {
    return text3;
  }
  if (props.insufficient && props?.creditDetail?.creditWalletStatus === 0) {
    return text4;
  }
  if (props.available && props?.creditDetail?.creditWalletStatus === 1) {
    return text1;
  }
  return text2;
}
onMounted(() => {
  getPrepaidInfo(props.creditDetail.amountToPay).then((res) => {
    if (res.status === 200) {
      prepaidInfo.value = res.data.data;
    }
  });
});
</script>
