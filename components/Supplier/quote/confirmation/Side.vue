<template>
  <div class="bg-[#101828] rounded-[10px] py-[30px] px-5 w-full lg:w-[250px] xl:w-[360px]">
    <div class="pb-6 text-2xl font-semibold text-white">Order Details</div>

    <div class="flex flex-col gap-y-5">
      <div class="flex justify-between">
        <div>
          <p class="font-semibold text-sm text-white mb-[2px] capitalize">
            {{ order?.productName }}
          </p>
          <p class="text-xs text-[#959595]">
            Qty: {{ order?.quantity }} {{ order?.package?.package?.title }}
          </p>
        </div>
        <p class="text-xs font-normal text-white">
          {{ currencyFormat(order?.package?.purchaseAmount) }}
        </p>
      </div>
    </div>

    <hr class="my-[20px] border-white/10" />
    <div class="flex justify-between mb-[25px]">
      <p class="text-sm text-[#E1E1E1]">Total</p>
      <p class="font-bold text-white">
        {{ currencyFormat(order?.package?.purchaseAmount * order?.quantity) }}
      </p>
    </div>

    <!-- Buttons -->
    <div class="mt-6" v-if="order?.status === 0">
      <AppButton
        text="Confirm product is available"
        :isLoading="loading && confirmValue === 2"
        :isDisabled="loading"
        @click="handleConfirm(2)"
        loadingText="Processing ..."
        btnClass="bg-primary-500 w-full text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm mb-4"
      />

      <AppButton
        text="Confirm product is Unavailable"
        :isLoading="loading && confirmValue === 3"
        :isDisabled="loading"
        @click="handleConfirm(3)"
        loadingText="Processing ..."
        btnClass="bg-[#F04438] text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm !normal-case w-full"
      />
    </div>
  </div>

  <!-- Modal for decline reason -->
  <Modal :isOpen="isOpen" @togglePopup="isOpen = false">
    <template #content>
      <div class="bg-white rounded-lg p-6 relative w-[400px]">
        <h4 class="mb-3 font-semibold">Reason for Quote/Order Decline</h4>

        <div class="grid mb-4 gap-y-2">
          <label
            v-for="info in reasons"
            :key="info"
            class="flex items-center gap-2"
          >
            <input type="radio" :value="info" v-model="reason" />
            <span>{{ info }}</span>
          </label>
        </div>

        <AppButton
          text="Submit"
          :isLoading="loading && confirmValue === 3"
          :isDisabled="loading || !reason"
          @click="submitDecline"
          loadingText="Processing ..."
          btnClass="bg-primary-500 w-full text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm"
        />
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { ref, inject } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import { confirmavailablilty } from "~/services/quoteservice";
import Modal from "~/components/IndexModal";

const emit = defineEmits(["close"]);

const reasons = [
  "Price changes",
  "Insufficient or no stocks",
  "Quantity below MOQ",
  "Different packages/specifications/quality",
  "Legal or regulatory reasons",
  "Others",
];

const reason = ref("");
const isOpen = ref(false);
const updated = ref(false);
const loading = ref(false);
const confirmValue = ref(null);

const selectedPickup = inject("selectedPickup");
const order = inject("order");
const { id } = useRoute().params;

async function handleConfirm(val) {
  if (!selectedPickup.value) {
    toast.info("Select a pickup location");
    return;
  }

  confirmValue.value = val;

  if (val === 3) {
    isOpen.value = true;
    return;
  }

  await sendConfirmation({ status: val });
}

async function submitDecline() {
  if (!reason.value) {
    toast.error("Please select a reason before submitting");
    return;
  }
  await sendConfirmation({ status: 3, reason: reason.value });
  isOpen.value = false;
}

async function sendConfirmation(payload) {
  try {
    loading.value = true;
    const res = await confirmavailablilty({ id, ...payload });

    if (res.status === 200) {
      toast.success("Successful");
      updated.value = true;
      emit("close");
    }
  } catch (err) {
    toast.error("Something went wrong");
    errorResponse(err);
  } finally {
    loading.value = false;
  }
}
</script>
