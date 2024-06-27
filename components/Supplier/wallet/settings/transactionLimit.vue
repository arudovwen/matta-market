<template>
  <div class="grid gap-8 lg:grid-cols-2">
    <div>
      <span class="block text-base font-medium mb-1">Transaction limits</span>
      <span class="block text-sm"
        >Manage your transaction limits for deposits and withdrawals</span
      >
    </div>
    <div>
      <div class="max-w-[400px] mb-10">
        <h5 class="text-[13px] font-medium mb-1">Lower Limit</h5>
        <p class="text-xs mb-6">
          Get notified when your spend account balance drops below your
          threshold.
        </p>

        <div class="flex gap-x-2 items-center mb-5">
          <CurrencyInput
            v-model="v$.amount.$model"
            class="rounded-lg px-5 text-sm py-3 h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20 flex-1"
            placeholder=""
            :options="{
              currency: 'ngn',
              currencyDisplay: 'narrowSymbol',
            }"
          />
          <button
            type="button"
            :disabled="isLoading"
            class="px-6 py-3 rounded-md bg-primary-500 text-white hover:bg-primary/80 active:scale-95"
            @click="handleWarningLimit"
          >
            Set
          </button>
        </div>
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.amount.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>

      <div class="max-w-[400px]">
        <h5 class="text-[13px] font-medium mb-1">Upper Limit</h5>
        <p class="text-xs mb-6">
          To further secure your transactions, activate a 2FA (two-factor
          authentication) when a transaction is above your set upper limit.
        </p>

        <div class="flex gap-x-2 items-center mb-5">
          <CurrencyInput
            v-model="v1$.upperLimit.$model"
            class="rounded-lg px-5 text-sm py-3 h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            placeholder=""
            :options="{
              currency: 'ngn',
              currencyDisplay: 'narrowSymbol',
            }"
          />
          <button
            type="button"
            :disabled="isLoading"
            class="px-6 py-3 rounded-md bg-primary-500 text-white hover:bg-primary/80 active:scale-95 disabled:opacity:60"
            @click="handleUpperLimit"
          >
            Set
          </button>
        </div>
        <div
          class="text-red-500 mt-1"
          v-for="error of v1$.upperLimit.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, inject } from "vue";
import CurrencyInput from "~/components/CurrencyInput";
import { setWarningLimit, setUpperLimit } from "~/services/walletservice";
import { toast } from 'vue3-toastify';
import useVuelidate from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";


// eslint-disable-next-line no-unused-vars
const details = inject("details");
const form = reactive({
  amount: 0,
});
const form1 = reactive({
  upperLimit: 0,
});
const rule = {
  amount: {
    required,
    numeric,
  },
};
const rule1 = {
  upperLimit: {
    required,
    numeric,
  },
};
const v$ = useVuelidate(rule, form);
const v1$ = useVuelidate(rule1, form1);
const isLoading = ref(false);

async function handleWarningLimit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;

  setWarningLimit(form)
    .then((res) => {
      if (res.status === 200) {
        toast.info("Set successfully");
        isLoading.value = false;
      }
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error((err.response.data.message || err.response.data.Message));
    });
}
async function handleUpperLimit() {
  const validity = await v1$.value.$validate();
  if (!validity) return;
  isLoading.value = true;

  setUpperLimit(form1)
    .then((res) => {
      if (res.status === 200) {
        toast.info("Set successfully");
        isLoading.value = false;
      }
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error((err.response.data.message || err.response.data.Message));
    });
}

onMounted(() => {
  form.amount = details.value?.minWarningAmount;
  form1.upperLimit = details.value?.upperLimitCheckAmount;
});
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
