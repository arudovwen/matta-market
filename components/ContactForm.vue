<template>
  <IndexModal :isOpen="open" @togglePopup="togglePopup">
    <template #content>
      <form
        class="bg-white w-[400px] p-6 rounded-lg block"
        @submit.prevent="handleSubmit"
      >
        <legend class="block mb-7 font-bold text-center text-sm uppercase">
          Contact us form
        </legend>
        <div class="mb-6">
          <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Full name</label>
          <input
            v-model="v$.fullName.$model"
            :class="{ 'border-red-500': v$.fullName.$error }"
            class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            placeholder="Provide your full name"
          />
          <div
            class="text-red-500 mt-1"
            v-for="error of v$.fullName.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="mb-6">
          <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Phone number</label>
          <input
            v-model="v$.phone.$model"
            :class="{ 'border-red-500': v$.phone.$error }"
            class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            placeholder="Phone number"
          />
          <div
            class="text-red-500 mt-1"
            v-for="error of v$.phone.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="mb-6">
          <label class="mb-2 font-medium text-sm text-[#344054] block text-left">E-mail</label>
          <input
            v-model="v$.email.$model"
            :class="{ 'border-red-500': v$.email.$error }"
            class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            placeholder="E-mail"
          />
          <div
            class="text-red-500 mt-1"
            v-for="error of v$.email.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="mb-6">
          <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Message</label>
          <textarea
            v-model="v$.message.$model"
            :class="{ 'border-red-500': v$.message.$error }"
            class="rounded-lg px-[14px] py-[10px] w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            placeholder="Type here"
          ></textarea>
          <div
            class="text-red-500 mt-1"
            v-for="error of v$.message.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="mb-6">
          <button
            type="submit"
            :disabled="isLoading"
            class="border text-[13px] mb-4 border-primary- uppercase text-white lg:min-w-[120px] w-full bg-primary-500 rounded-lg px-6 py-2 hover:bg-primary/80 h-11"
          >
            <span>
              <span
                class="flex gap-x-4 justify-center items-center"
                v-if="isLoading"
                ><span> Sending...</span>
                <i
                  v-if="isLoading"
                  class="fa fa-spinner fa-spin text-white"
                  aria-hidden="true"
                ></i
              ></span>
              <span v-else>Send message</span>
            </span>
          </button>
        </div>
      </form>
    </template>
  </IndexModal>
</template>

<script setup> 
import useVuelidate from "@vuelidate/core";
import { required, email, helpers, maxLength } from "@vuelidate/validators";
import { sendMessage } from "~/services/authservices";
import { toast } from 'vue3-toastify';

const open = inject("open");

const isLoading = ref(false);
const togglePopup = inject("togglePopup");
const form = reactive({
  fullName: "",
  email: "",
  message: "",
  phone: "",
});

const rules = {
  fullName: {
    required: helpers.withMessage("Please provide your full name", required),
  },
  message: {
    required: helpers.withMessage("Enter a message", required),
  },
  phone: {
    required: helpers.withMessage("Provide your phone  number", required),
  },
  email: {
    required: helpers.withMessage("Email field cannot be empty", required),
    email: helpers.withMessage("Email is invalid", email),
    maxLength: maxLength(50),
  },
};
const v$ = useVuelidate(rules, form);
async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;
  sendMessage(form)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Message sent");
        isLoading.value = false;
        open.value = false;
      }
    })
    .catch(() => {
      toast.error("Message sending failed");
      isLoading.value = false;
    });
}
</script>
