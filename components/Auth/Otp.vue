<template>
  <div>
    <form
      @submit.prevent="handleSubmit"
      class="min-w-[300px] max-w-[500px] mx-auto px-6 py-6 text-center"
    >
      <div class="mb-8">
        <img alt="check" src="/images/otp.png" class="block mx-auto" />
      </div>
      <h2 class="text-center font-semibold text-[#101828] mb-[6px] text-2xl">
        {{ title }}
      </h2>
      <p class="block text-base text-center mb-8 text-[#475467]">
        {{ subtext }}
      </p>

      <div class="flex gap-x-2 justify-center mb-8">
        <v-otp-input
          ref="otpInput"
          v-model:value="form.otp"
          :input-classes="`otp-input w-12 h-12 flex items-center border border-matta-black/20 focus:border-[#4A5578] outline-none mx-1 rounded-md text-center text-sm `"
          separator=" "
          :num-inputs="numInput"
          :should-auto-focus="true"
          input-type="letter-numeric"
          :placeholder="['', '', '', '', '', '']"
        />
      </div>
      <div class="flex gap-x-4 mb-1">
        <button
          type="submit"
          :disabled="isLoading || !form.otp"
          class="border text-[13px] mb-4 border-primary-500 font-medium text-white lg:min-w-[120px] w-full bg-primary-500 rounded-lg px-6 py-2 hover:bg-primary/80 h-11 disabled:opacity-60"
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
            <span v-else>Verify OTP</span>
          </span>
        </button>
      </div>
      <div class="text-sm mb-8 font-normal">
        <span>
          Didn't receive OTP,
          <button
            v-if="!isResending"
            class="font-semibold pl-1 text-primary-500"
            @click.prevent="resendOTP"
            :disabled="isResending || countdown > 0"
          >
            Click here to resend
          </button>
          <span v-if="countdown > 0" class="ml-2"
            >Resend available in {{ countdown }}s</span
          >
        </span>
      </div>
      <div>
        <button
          class="flex items-center gap-x-2 justify-center mx-auto font-semibold text-sm"
          @click="emit('close')"
        >
          <AppIcon icon="eva:arrow-back-fill" /> Back
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import VOtpInput from "vue3-otp-input";
import { resend2FA } from "~/services/authservices";

const props = defineProps({
  title: {
    default: "Enter your transaction PIN",
  },
  numInput: {
    default: 6,
  },

  isLoading: {
    default: false,
  },
  email: {
    default: "",
  },
  subtext: {
    default: "We have sent an OTP to your email address and your registered mobile number",
  },
});
const emit = defineEmits(["handleSubmit", "close"]);

const form = reactive({
  otp: "",
});

const countdown = ref(0);
const isResending = ref(false);

async function handleSubmit() {
  emit("handleSubmit", form.otp);
}
function resendOTP() {
  if (countdown.value === 0) {
    resend2FA({ email: props.email }).then((res) => {
      if (res.status === 200) {
        // Start the countdown
        countdown.value = 60;
        isResending.value = true;

        const interval = setInterval(() => {
          countdown.value--;
          if (countdown.value <= 0) {
            clearInterval(interval);
            isResending.value = false;
          }
        }, 1000);
      }
    });

    // Logic to actually resend the OTP can go here
  }
}
</script>
