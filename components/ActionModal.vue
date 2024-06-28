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

        <div class="fixed z-10 inset-0 overflow-y-auto">
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
                class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full"
              >
                <div class="bg-white px-6 py-6">
                  <div class="flex justify-between mb-5 items-center">
                    <div>
                      <img alt="delte image" v-if="type === 'delete'" src="/images/delete.svg" />
                      <img alt="check image" v-if="type === 'approve'" src="/images/check.svg" />
                      <img alt="reject image" v-if="type === 'reject'" src="/images/reject.svg" />
                      <img alt="success image"
                        v-if="type === 'success'"
                        src="/images/success.svg"
                      />
                    </div>
                    <span @click="handleclose" class="absolute top-3 right-4">
                      <i
                        class="uil uil-times cursor-pointer text-xl text-[#98A2B3]"
                      ></i>
                    </span>
                  </div>

                  <h4 class="font-semibold text-[#101828] text-lg" v-if="title">
                    {{ title }}
                  </h4>

                  <p class="text-sm text-[#475467]" v-if="text">
                    {{ text }}
                  </p>
                  <div
                    v-if="detail"
                    class="rounded-lg p-6 border border-[#EAECF0] bg-[#F2F4F7] mt-4"
                  >
                    <h3 class="text-sm font-semibold mb-3 text-[#344054]">
                      Payment Summary
                    </h3>
                    <div class="grid gap-y-2">
                      <div
                        class="flex gap-x-2 items-center text-xs"
                        v-for="item in bankOptions"
                        :key="item.key"
                      >
                        <span class="text-[#667085]">{{ item.title }}: </span>
                        <span class="text-[#101828]">Name</span>
                      </div>
                    </div>
                  </div>

                  <div class="flex gap-x-4 items-center mt-6">
                    <button
                      v-if="isCancel"
                      type="button"
                      @click="handleclose"
                      class="h-11 appearance-none leading-none px-4 py-[10px] rounded-lg text-matta-black hover:bg-gray-100 text-sm w-full border border-[#D0D5DD] font-medium justify-center flex items-center"
                    >
                      Cancel
                    </button>

                    <button
                      v-if="!isOkay"
                      :disabled="loading"
                      type="button"
                      @click="actionItem"
                      class="h-11 appearance-none leading-none px-4 py-[10px] rounded-lg text-white text-sm w-full border font-medium disabled:opacity-50 flex items-center justify-center"
                      :class="
                        type === 'approve'
                          ? 'bg-green-600 border-green-600'
                          : 'bg-[#D92D20] border-[#D92D20]'
                      "
                    >
                      {{ btnText }}
                    </button>
                    <button
                      v-if="isOkay"
                      :disabled="loading"
                      type="button"
                      @click="actionItem"
                      class="h-11 appearance-none leading-none px-4 py-[10px] rounded-lg text-white text-sm w-full border border-primary-500 font-medium disabled:opacity-50 flex items-center justify-center bg-primary-500"
                    >
                      {{ btnText }}
                    </button>
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

defineProps({
  title: {
    default: "",
  },
  text: { default: "" },
  open: { default: false },
  btnText: { default: "" },
  loading: { default: false },
  type: { default: "" },
  detail: { default: null },
  isCancel: { default: true },
  isOkay: { default: false },
});
const emits = defineEmits(["actionItem", "close"]);

function actionItem() {
  emits("actionItem");
}
function handleclose() {
  emits("close");
}

const bankOptions = [
  {
    title: "Bank Name",
    key: "bankName",
  },
  {
    title: "Account Name",
    key: "accountName",
  },
  {
    title: "Account Number",
    key: "accountNumber",
  },
  {
    title: "Amount",
    key: "amount",
  },
];
</script>
