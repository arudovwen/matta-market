<template>
  <h3 class="font-medium text-2xl mb-6">Add new payment method</h3>
  <form @submit.prevent="handleSubmit">
    <div class="mb-6">
      <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Card number</label>
      <input
        v-model="v$.card_number.$model"
        :class="{ 'border-red-500': v$.card_number.$error }"
        class="rounded-full px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
        placeholder="1234  5678  9123  4567"
        autocomplete="off"
        autofocus="on"
      />
      <div
        class="text-red-500 mt-1"
        v-for="error of v$.card_number.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-x-6">
      <div class="mb-6">
        <label class="mb-2 font-normal text-xs block text-matta-black"
          >Expiry date</label
        >
        <div class="relative flex items-center">
          <input
            v-model="v$.expiry_date.$model"
            :class="{ 'border-red-500 ': v$.expiry_date.$error }"
            class="rounded-full px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            placeholder="03/24"
            autocomplete="off"
          />
        </div>
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.expiry_date.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="mb-6">
        <label class="mb-2 font-normal text-xs block text-matta-black"
          >CVV</label
        >
        <div class="relative flex items-center">
          <input
            v-model="v$.cvv.$model"
            :class="{ 'border-red-500 ': v$.cvv.$error }"
            class="rounded-full px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            placeholder="***"
            autocomplete="off"
          />
        </div>
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.cvv.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>
    <div class="mb-6">
      <label class="text-xs flex gap-x-2 items-center">
        <input type="checkbox" class="accent-matta-black" />Mark as Default
        payment method
      </label>
    </div>
    <div class="mb-5 flex justify-end gap-x-4 mt-8">
      <button class="text-xs upperase hover:bg-gray-50">Cancel</button>
      <button
        class="text-xs uppercase bg-primary-500 text-white px-5 py-4 rounded-lg hover:bg-primary/70"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers, minLength, maxLength } from "@vuelidate/validators";
import { toast } from 'vue3-toastify';
import { useRoute } from "vue-router";
import { loginUser } from "~/services/authservices";
import { useStore } from "vuex";

const store = useStore();

const route = useRoute();
const form = reactive({
  card_number: "",
  expiry_date: "",
  cvv: "",
});
const isLoading = ref(false);

const rules = {
  card_number: {
    required: helpers.withMessage(
      "card_number field cannot be empty",
      required
    ),
    maxLength: maxLength(50),
  },

  cvv: {
    required: helpers.withMessage("Cvv field cannot be empty", required),
    minLength: minLength(3),

    maxLength: maxLength(3),
  },
  expiry_date: {
    required,
  },
};

const v$ = useVuelidate(rules, form);

async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;
  loginUser(form)
    .then((res) => {
      if (res.status === 200) {
        store.commit("setUser", res.data.data);
        toast.info("Login successful");
        if (route.query.redirected_from) {
          window.location.href = route.query.redirected_from;
          return;
        }
        if (route.query.redirect_to) {
          window.location.href = route.query.redirect_to;
          return;
        }

        window.location.href = "/";
      }
    })

    .catch((err) => {
      isLoading.value = false;

      toast.error((err.response.data.message || err.response.data.Message));
    });
}
</script>
