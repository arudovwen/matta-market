<template>
  <h3 class="font-medium text-2xl mb-8">Add director</h3>
  <form @submit.prevent="handleSubmit">
    <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4">
      <div class="mb-6">
        <label class="mb-2 font-medium text-sm text-[#344054] block text-left"
          >First name <RedDot /></label
        >
        <input
          v-model="v$.firstName.$model"
          :class="{ 'border-red-500': v$.firstName.$error }"
          class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          autocomplete="off"
          autofocus="on"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.firstName.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="mb-6">
        <label class="mb-2 font-medium text-sm text-[#344054] block text-left"
          >Last name <RedDot /></label
        >
        <input
          v-model="v$.lastName.$model"
          :class="{ 'border-red-500': v$.lastName.$error }"
          class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          autocomplete="off"
          autofocus="on"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.lastName.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4">
      <div class="mb-6">
        <label for="email" class="mb-2 font-normal text-xs block">E-mail <RedDot /></label>
        <input
          v-model="v$.email.$model"
          :class="{ 'border-red-500': v$.email.$error }"
          class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          placeholder="E-mail"
          autocomplete="off"
          aria-autocomplete="none"
          type="email"
          id="email"
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
        <label class="mb-2 font-normal text-xs block" for="phone"
          >Phone number <RedDot />
        </label>
        <div class="flex relative rounded-lg h-11">
          <input
            :class="{ 'border-red-500': v$.phone.$error }"
            v-model="v$.phone.$model"
            class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            autocomplete="off"
            aria-autocomplete="none"
            placeholder="08160723884"
            role="presentation"
            id="phone"
          />
        </div>
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
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4">
      <div class="mb-6">
        <label class="mb-2 font-medium text-sm text-[#344054] block text-left"
          >BVN <RedDot /></label
        >
        <input
          v-model="v$.bvn.$model"
          :class="{ 'border-red-500': v$.bvn.$error }"
          class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          autocomplete="off"
          autofocus="on"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.bvn.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="mb-6">
        <label class="mb-2 font-medium text-sm text-[#344054] block text-left"
          >Date of birth <RedDot /></label
        >
        <ClientOnly>
          <VueDatePicker
            auto-apply
            v-model="v$.dob.$model"
            placeholder="Select date"
            :enable-time-picker="false"
            :input-class-name="`!rounded-lg px-[14px] py-[10px] h-11 w-full border  placeholder:text-[#B6B7B9] focus:outline-matta-black/20 ${
              v$.dob.$error ? 'border-red-500' : 'border-[#DCDEE6]'
            }`"
          />
        </ClientOnly>
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.dob.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>
    <div class="lg:col-span-2 mb-6">
      <label class="mb-2 font-medium text-sm text-[#344054] block text-left"
        >Linkedin
        <span class="text-gray-400 text-xs pl-[.02rem]">(Optional)</span></label
      >
      <input
        v-model="v$.linkedIn.$model"
        :class="{ 'border-red-500': v$.linkedIn.$error }"
        class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
        autocomplete="off"
        autofocus="on"
        placeholder="Your linkedin profile url"
      />
      <div
        class="text-red-500 mt-1"
        v-for="error of v$.linkedIn.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <div class="lg:col-span-2 mb-6">
      <FileUpload
        label="Upload ID (Passport, Driver’s License, or NIN)"
        id="identityUrl"
        :modelValue="form.identityUrl"
        isCumpulsory
      />
      <span
        @click="downloadFile(form.identityUrl, 'Identity card')"
        download
        v-if="form.identityUrl"
      >
        <span class="block text-xs text-blue-500 mt-1"
          >Download Identity card</span
        ></span
      >
      <div
        class="text-red-500 mt-1"
        v-for="error of v$.identityUrl.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="lg:col-span-2 mb-6">
      <FileUpload
        label="Upload Signature"
        id="signatureUrl"
        :modelValue="form.signatureUrl"
        isCumpulsory
      />
      <span
        @click="downloadFile(form.signatureUrl, 'Signature')"
        download
        v-if="form.signatureUrl"
      >
        <span class="block text-xs text-blue-500 mt-1"
          >Download Signature</span
        ></span
      >
      <div
        class="text-red-500 mt-1"
        v-for="error of v$.signatureUrl.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-x-4 mt-8 w-full">
      <button
        type="button"
        @click="open = false"
        class="text-xs uppercase border border-gray-100 w-full px-5 py-4 rounded-lg"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="isLoading"
        class="text-xs uppercase bg-primary-500 text-white px-5 py-4 rounded-lg hover:bg-primary/70 disabled:opacity-60 w-full"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import moment from "moment";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {
  required,
  email,
  helpers,
  maxLength,
  minLength,
  numeric,
} from "@vuelidate/validators";

const open = inject("open");
const formData = inject("form");
const props = defineProps(["type", "director", "id"]);
const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  bvn: "",
  dob: "",
  linkedIn: "",
  signatureUrl: "",
  identityUrl: "",
});
onMounted(() => {
  if (props.director) {
    form.firstName = props.director.firstName;
    form.lastName = props.director.lastName;
    form.email = props.director.email;
    form.phone = props.director.phone;
    form.bvn = props.director.bvn;
    form.dob = new Date(props.director.dob);
    form.linkedIn = props.director.linkedIn;
    form.signatureUrl = props.director.signatureUrl;
    form.identityUrl = props.director.identityUrl;
  }
});
const isLoading = ref(false);
const validPhoneLength = (value) =>
  form.code === "+234" ? value.length > 9 && value.length < 12 : true;
const rules = {
  firstName: {
    required,
    maxLength: maxLength(50),
  },

  lastName: {
    required,
  },
  bvn: {
    required,
    minLength: minLength(10),
  },
  dob: {
    required,
  },
  email: {
    required: helpers.withMessage("Email field cannot be empty", required),
    email: helpers.withMessage("Email is invalid", email),
    maxLength: maxLength(50),
  },
  phone: {
    numeric,
    required,
  },

  linkedIn: {},
  identityUrl: {
    required,
  },
  signatureUrl: {
    required,
  },
};

const v$ = useVuelidate(rules, form);

function handleChange(id, value) {
  if (id === "signatureUrl") {
    form.signatureUrl = value;
  }
  if (id === "identityUrl") {
    form.identityUrl = value;
  }
}
async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  if (props.type === "add") {
    formData.directors.push(form);
  } else {
    formData.directors.map((i, index) => {
      if (index === props.id) {
        i.firstName = form.firstName;
        i.lastName = form.lastName;
        i.email = form.email;
        i.phone = form.phone;
        i.bvn = form.bvn;
        i.dob = form.dob;
        i.linkedIn = form.linkedIn;
        i.signatureUrl = form.signatureUrl;
        i.identityUrl = form.identityUrl;
      }
      return i;
    });
  }

  open.value = false;
}
provide("handleChange", handleChange);
</script>
