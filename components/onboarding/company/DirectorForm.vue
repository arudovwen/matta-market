<template>
  <h3 class="font-medium text-2xl mb-8">Add director</h3>
  <form @submit.prevent="handleSubmit">
    <div class="grid grid-cols-1  lg:grid-cols-2 lg:gap-x-4">
      <div class="mb-6">
        <label class="mb-2 font-medium text-sm text-[#344054] block text-left"
          >First name</label
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
          >Last name</label
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
   <div class="grid grid-cols-1  lg:grid-cols-2 lg:gap-x-4">
    <div class="mb-6">
      <label for="email" class="mb-2 font-normal text-xs block">E-mail</label>
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
        >Phone number <span class="text-red-500 pl-[.02rem]">*</span></label
      >
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
    <div class="grid grid-cols-1  lg:grid-cols-2 lg:gap-x-4">
      <div class="mb-6">
        <label class="mb-2 font-medium text-sm text-[#344054] block text-left"
          >BVN</label
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
          >Date of birth</label
        >
        <input
          v-model="v$.dob.$model"
          :class="{ 'border-red-500': v$.dob.$error }"
          class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          autocomplete="off"
          autofocus="on"
          type="date"
        />
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
      <FileUpload
        label="Upload ID (Passport, Driver’s License, or NIN)"
        id="idcard"
      />
    </div>
    <div class="lg:col-span-2 mb-6">
      <FileUpload label="Upload Signature" id="signature" />
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
import {
  required,
  email,
  helpers,
  maxLength,
  minLength,
  numeric,
} from "@vuelidate/validators";

const open = inject("open");
const directors = inject("directors");

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  bvn: "",
  dob: "",
  documents: [
    {
      url: "",
      documentType: 0,
    },
    {
      url: "",
      documentType: 1,
    },
  ],
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
};

const v$ = useVuelidate(rules, form);

function handleChange(id, value) {
  form.documents.map((i) => {
    if (id === "idcard" && i.documentType === 0) {
      i.url = value;
    }
    if (id === "signature" && i.documentType === 1) {
      i.url = value;
    }
  });
}
async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  directors.push(form);
  // form.phone =
  //   form.bvn =
  //   form.dob =
  //   form.firstName =
  //   form.lastName =
  //   form.email =
  //     "";
  open.value = false;
}
provide("handleChange", handleChange);
</script>
