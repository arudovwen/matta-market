<template>
  <form
    @submit.prevent="handleSubmit"
    class="w-full lg:w-[400px] max-w-[400px] mx-auto px-6 py-8 bg-matta-black rounded-lg"
  >
    <span class="block text-2xl font-medium text-center mb-2 text-gray-100"
      >Enter transaction pin</span
    >
    <p class="mb-6 text-sm text-center font-base text-gray-300">
      Provide 4 digit transaction pin
    </p>

    <div class="flex gap-x-2 justify-center mb-7">
      <v-otp-input
        ref="otpInput"
        v-model:value="v$.otp.$modal"
        :input-classes="`otp-input ${
          v$.otp.$error ? '!border-red-500' : ''
        } w-8 h-8 flex items-center border border-matta-black/20 focus:border-matta-black/50 outline-none mx-1 rounded-md text-center text-sm `"
        separator=" "
        :num-inputs="4"
        :should-auto-focus="true"
        input-type="letter-numeric"
        :conditionalClass="['one', 'two', 'three', 'four']"
        :placeholder="['', '', '', '']"
        @on-change="handleOnChange"
        @on-complete="handleOnComplete"
      />
    </div>
    <div class="">
      <button
        type="submit"
        :disabled="isLoading"
        class="border text-[13px] border-primary- uppercase block text-white lg:min-w-[100px] w-full lg:max-w-[180px] mx-auto bg-primary-500 rounded-lg px-6 py-2 hover:bg-primary/80 h-11 active:scale-95"
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
</template>
<script setup>
import { ref, reactive, defineEmits } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import VOtpInput from "vue3-otp-input";

const emit = defineEmits(["handleSubmit"]);

const otpInput = ref("");
const handleOnComplete = (value) => {
  form.otp = value;
};

const handleOnChange = () => {
  v$.value.$reset();
};

const form = reactive({
  otp: "",
});
const isLoading = ref(false);

const rules = {
  otp: { required, minLength: minLength(4), maxLength: maxLength(4) },
};

const v$ = useVuelidate(rules, form);

async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;
  emit("handleSubmit", form);
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
