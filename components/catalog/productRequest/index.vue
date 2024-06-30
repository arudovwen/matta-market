<template>
  <div class="bg-white py-8 sm:py-10 px-4 xs:px-6 lg:px-10 rounded-lg flex-1">
    <form
      v-if="!isComplete"
      @submit.prevent="handleSubmit"
      class="h-full max-w-[600px] mx-auto my-10 border p-6 rounded-lg"
    >
      <h4 class="text-2xl font-medium text-center mb-7">Request a product</h4>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <div class="mb-6">
          <label title="" class="mb-2 font-medium text-sm text-[#344054] block text-left"
            >Full name  <RedDot /></label
          >
          <input
            class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            placeholder="Provide your full name"
            autocomplete="off"
            autofocus="on"
            v-model="request$.fullName.$model"
          />
          <div
            class="text-red-500 mt-1"
            v-for="error of request$.fullName.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="mb-6">
          <label title="" class="mb-2 font-medium text-sm text-[#344054] block text-left"
            >Business name  <RedDot /></label
          >
          <input
            class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            placeholder="Provide your business name"
            autocomplete="off"
            autofocus="on"
            v-model="request$.businessName.$model"
          />
          <div
            class="text-red-500 mt-1"
            v-for="error of request$.businessName.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="mb-6 md:col-span-2">
          <label title="" class="mb-2 font-medium text-sm text-[#344054] block text-left"
            >E-mail  <RedDot /></label
          >
          <input
            class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            placeholder="Provide your email address"
            autocomplete="off"
            type="email"
            v-model="request$.email.$model"
          />
          <div
            class="text-red-500 mt-1"
            v-for="error of request$.email.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>

        <div class="mb-6">
          <label title="" class="mb-2 font-medium text-sm text-[#344054] block text-left"
            >Phone number  <RedDot /></label
          >
          <div class="flex relative rounded-lg h-11">
            <FormsPhoneCodes v-model="request$.phone.$model" />
          </div>
          <div
            class="text-red-500 mt-1"
            v-for="error of request$.phone.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>

        <div class="mb-6">
          <label title="" class="mb-2 font-medium text-sm text-[#344054] block text-left"
            >Chemical name  <RedDot /></label
          >
          <input
            class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            placeholder="Provide chemical name"
            autocomplete="off"
            autofocus="on"
            v-model="request$.chemicalName.$model"
          />
          <div
            class="text-red-500 mt-1"
            v-for="error of request$.chemicalName.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>

        <div class="mb-6">
          <label title="" class="mb-2 font-medium text-sm text-[#344054] block text-left"
            >Quantity  <RedDot /></label
          >
          <input
            class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            placeholder="Enter quantity needed"
            type=""
            v-model="request$.quantity.$model"
          />
          <div
            class="text-red-500 mt-1"
            v-for="error of request$.quantity.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="mb-6">
          <label title="" class="mb-2 font-medium text-sm text-[#344054] block text-left"
            >Unit  <RedDot /></label
          >
          <select
            v-model="request$.unit.$model"
            class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          >
            <option v-for="n in measurements" :key="n" :value="n.value">
              {{ n.name }}
            </option>
          </select>
          <div
            class="text-red-500 mt-1"
            v-for="error of request$.unit.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>

        <div class="mb-6 md:col-span-2">
          <label title="" class="mb-2 font-normal text-xs block text-matta-black"
            >Upload document  <RedDot /></label
          >
          <div class="relative flex items-center">
            <input
              class="flex-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:cursor-pointer file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              type="file"
              id="formFile"
              accept=".xls, .xlsx, .png, .jpg, .jpeg, .docx, .pdf"
              @change="handleFile"
            />
            <div class="ml-2" v-if="isUploading">
              <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
            </div>
          </div>
          <div
            class="text-red-500 mt-1"
            v-for="error of request$.uploadedDocumentUrl.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>

        <div class="mb-6 md:col-span-2">
          <label
            class="flex items-center gap-x-2"
            :class="request$.confirm.$errors.length ? 'text-red-600' : ''"
          >
            <input
              type="checkbox"
              v-model="request$.confirm.$model"
              :class="request$.confirm.$errors.length ? 'outline-red-600' : ''"
            />
            <span>I confirm that I want to submit this request</span>
          </label>
        </div>
      </div>
      <div class="flex justify-center mt-8">
        <button
          type="submit"
          :disabled="isLoading"
          class="border text-[13px] mb-4 border-primary- uppercase text-white w-full lg:min-w-[150px] mx-auto bg-primary-500 rounded-lg px-6 py-2 hover:bg-primary/80 h-11"
        >
          <span>
            <span
              class="flex gap-x-4 justify-center items-center"
              v-if="isLoading || isUploading"
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
    <CatalogProductRequestComplete v-else />
  </div>
</template>
<script setup>
import { useStore } from "vuex";
// eslint-disable-next-line no-unused-vars
import { createproductrequest } from "~/services/productservices";
import { uploaddocument } from "~/services/onboardingservices";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  numeric,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import { toast } from "vue3-toastify";

const isComplete = ref(false);

const store = useStore();

const form = reactive({
  fullName: "",
  businessName: "",
  email: store.getters.loggedUser?.email || "",
  phone: store.getters.loggedUser?.phoneNumber || "",
  address: "",
  uploadedDocumentUrl: "",
  chemicalName: "",
  quantity: "",
  confirm: false,
  unit: "",
  uploadedDocumentExtension: "",
  phoneCode: "+234",
});

const isLoading = ref(false);
const isUploading = ref(false);
const myrules = {
  phone: {
    required,
  },
  businessName: { required },
  fullName: { required },
  uploadedDocumentUrl: {},
  email: { required, email },
  chemicalName: { required },
  quantity: { required, numeric },
  confirm: { sameAs: sameAs(true) },
  unit: { required },
};

const request$ = useVuelidate(myrules, form);
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve(reader.result.replace("data:", "").replace(/^.+,/, ""));
    reader.onerror = reject;
  });

async function handleFile(e) {
  const file = e.target.files[0];
  const ext = file.name.substring(file.name.lastIndexOf(".") + 1);
  isUploading.value = true;
  uploaddocument({
    base64: await toBase64(file),
    ext: `.${ext}`,
  }).then((res) => {
    form.uploadedDocumentUrl = res.data.message;
    isUploading.value = false;
  });
  form.uploadedDocumentExtension = `.${ext}`;
}
async function handleSubmit() {
  const validity = await request$.value.$validate();

  if (!validity) return;
  isLoading.value = true;
  createproductrequest(form)
    .then((res) => {
      if (res.status === 200) {
        form.fullName = "";
        form.email = store.getters.loggedUser?.email || "";
        form.phone = store.getters.loggedUser?.phoneNumber || "";
        form.uploadedDocumentUrl =
          form.chemicalName =
          form.quantity =
          form.businessName =
          form.unit =
          form.address =
            "";
        request$.value.$reset();
        isComplete.value = true;
        isLoading.value = false;
      }
    })

    .catch((err) => {
      isLoading.value = false;

      toast.error(err.response.data.message || err.response.data.Message);
    });
}
provide("isComplete", isComplete);
</script>
