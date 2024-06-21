<template>
  <div class="min-w-[400px] py-10 px-6">
    <span class="block text-2xl font-medium text-center mb-2">{{
      step === 1 ? "Create transaction pin" : "Enter OTP code"
    }}</span>

    <form @submit.prevent="handleSubmit" v-if="step === 1">
      <div class="mb-6">
        <label class="mb-2 font-normal text-xs block text-matta-black"
          >New pin</label
        >
        <div class="relative flex items-center">
          <input
            v-model="v$.pin.$model"
            :class="{ 'border-red-500 ': v$.pin.$error }"
            class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            placeholder="Enter new pin"
          />
          <EyeIcon
            v-if="!isShowingPasword"
            @click="isShowingPasword = !isShowingPasword"
            class="w-4 h-4 absolute cursor-pointer right-6"
          />
          <EyeSlashIcon
            @click="isShowingPasword = !isShowingPasword"
            v-else
            class="w-4 h-4 absolute cursor-pointer right-6"
          />
        </div>
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.pin.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="mb-6">
        <label class="mb-2 font-normal text-xs block text-matta-black"
          >Confirm pin</label
        >
        <div class="relative flex items-center">
          <input
            v-model="v$.confirmPin.$model"
            :class="{ 'border-red-500 ': v$.confirmPin.$error }"
            class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            placeholder="Confirm your pin"
          />
          <EyeIcon
            v-if="!isShowingPasword"
            @click="isShowingPasword = !isShowingPasword"
            class="w-4 h-4 absolute cursor-pointer right-6"
          />
          <EyeSlashIcon
            @click="isShowingPasword = !isShowingPasword"
            v-else
            class="w-4 h-4 absolute cursor-pointer right-6"
          />
        </div>
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.confirmPin.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>

      <div class="">
        <button
          type="submit"
          :disabled="isLoading"
          class="border text-[13px] mb-4 border-primary- uppercase text-white lg:min-w-[120px] w-full bg-primary-500 rounded-lg px-6 py-2 hover:bg-primary/80 h-11"
        >
          <span>
            <span
              class="flex gap-x-4 justify-center items-center"
              v-if="isLoading"
              ><span> Processing...</span>
              <i
                v-if="isLoading"
                class="fa fa-spinner fa-spin text-white"
                aria-hidden="true"
              ></i
            ></span>
            <span v-else>Submit</span>
          </span>
        </button>
      </div>
    </form>
    <form @submit.prevent="verifyWalletPin" v-if="step === 2">
      <div class="mb-6">
        <label class="mb-2 font-normal text-xs block text-matta-black"
          >Otp code</label
        >
        <div class="relative flex items-center">
          <input
            v-model="v1$.otp.$model"
            :class="{ 'border-red-500 ': v1$.otp.$error }"
            class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            placeholder="Enter otp code"
          />
        </div>
        <div
          class="text-red-500 mt-1"
          v-for="error of v1$.otp.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>

      <div class="">
        <button
          type="submit"
          :disabled="isLoading"
          class="border text-[13px] mb-4 border-primary- uppercase text-white lg:min-w-[120px] w-full bg-primary-500 rounded-lg px-6 py-2 hover:bg-primary/80 h-11"
        >
          <span>
            <span
              class="flex gap-x-4 justify-center items-center"
              v-if="isLoading"
              ><span> Processing...</span>
              <i
                v-if="isLoading"
                class="fa fa-spinner fa-spin text-white"
                aria-hidden="true"
              ></i
            ></span>
            <span v-else>Create pin</span>
          </span>
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, reactive, defineEmits, defineProps } from "vue";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import useVuelidate from "@vuelidate/core";
import {
  required,
  helpers,
  minLength,
  maxLength,
  numeric,
} from "@vuelidate/validators";
import { setWalletpin, verifyPin } from "~/services/walletservice";
import { toast } from 'vue3-toastify';

const props = defineProps(["details"]);
const emits = defineEmits(["close"]);
const form = reactive({
  pin: "",
  confirmPin: "",
  walletId: props?.details?.walletId,
});
const form1 = reactive({
  otp: null,
});


const isLoading = ref(false);
const step = ref(1);
const samePin = (value) => value === form.pin;
const rules = {
  pin: {
    required: helpers.withMessage("Pin field cannot be empty", required),
    minLength: minLength(4),
    maxLength: maxLength(4),
    numeric,
  },

  confirmPin: {
    samePin: helpers.withMessage("Pins must match", samePin),
  },
  walletId: {
    required,
  },
};
const rule = {
  otp: {
    required,
    minLength: minLength(6),
    maxLength: maxLength(6),
    numeric,
  },
};
const v$ = useVuelidate(rules, form);
const v1$ = useVuelidate(rule, form1);
const isShowingPasword = ref(false);

async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;
  form.pin = form.pin.toString();
  form.confirmPin = form.confirmPin.toString();
  form.walletId = props.details.walletId;
  setWalletpin(form).then((res) => {
    if (res.status === 200) {
      step.value = 2;
      isLoading.value = false;
      toast.info(res.data.data.message);
    }
  });
}

async function verifyWalletPin() {
  const validity = await v1$.value.$validate();
  if (!validity) return;
  verifyPin(form1.otp).then((res) => {
    if (res.status == 200) {
      toast.info("Pin created successfully");
      emits("close");
    }
  });
}
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
