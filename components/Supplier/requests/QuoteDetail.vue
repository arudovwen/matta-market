<template>
  <div>
    <div class="mb-8">
      <p class="text-gray-700 text-base mb-1">Dear {{ quote.sellerName }},</p>
      <p class="text-gray-700 text-base">
        We’ll be pleased if you could be kind to provide a quote based on the
        details below for <strong>{{ quote.productName }}</strong
        >.
      </p>
    </div>
    <div class="mb-8">
      <div class="grid grid-cols-2 gap-x-3 gap-y-6">
        <div>
          <p class="font-nomrmal text-sm text-gray-500">Product name</p>
          <p class="font-medium text-sm">{{ quote.productName }}</p>
        </div>
        <div>
          <p class="font-nomrmal text-sm text-gray-500">Supplier</p>
          <p class="font-medium text-sm">{{ quote.sellerName }}</p>
        </div>
        <div>
          <p class="font-nomrmal text-sm text-gray-500">Market</p>
          <p class="font-medium text-sm">{{ quote.market }}</p>
        </div>
        <div>
          <p class="font-nomrmal text-sm text-gray-500">Application</p>
          <p class="font-medium text-sm">{{ quote?.applications }}</p>
        </div>
        <div>
          <p class="font-nomrmal text-sm text-gray-500">Package type</p>
          <p class="font-medium text-sm capitalize">
            {{ quote?.package?.package?.title }}
          </p>
        </div>
        <!-- <div>
          <p class="font-nomrmal text-sm text-gray-500">Expected Volume</p>
          <p class="font-medium text-sm">
            {{ quote?.expectedVolume }} {{ quote?.unit }}
          </p>
        </div> -->
      </div>

      <div>
        <!-- <h4 class="text-base font-medium mb-4 text-gray-700">
          Order preference
        </h4>
        <div class="flex items-start gap-x-3 mb-3">
          <i class="fas fa-clipboard-list text-base text-gray-500 w-5"></i>
          <div>
            <p class="text-sm flex font-medium items-center gap-x-2">
              <span class="text-gray-500 text-base">Special instruction:</span>
              <span> {{ quote.additionalInformation }}</span>
            </p>
          </div>
        </div> -->
        <!-- <div class="flex items-start gap-x-3 mb-3">
          <i
            class="fa fa-user text-lg text-gray-500 w-5"
            aria-hidden="true"
          ></i>
          <div>
            <p class="text-sm font-medium mb-2 text-gray-700">Requested by</p>
            <p class="text-sm mb-1">
              {{ quote.requestedBy }} - {{ quote.buyerBusinessName }}
            </p>
            <p class="text-sm font-normal">{{ quote.contactPhone }}</p>
          </div>
        </div> -->
      </div>
      <hr class="my-4" />
      <div class="bg-[#F1F3F5] rounded-lg p-6 text-matta-black">
        <div class="mb-6">
          <label class="mb-2 text-xs block text-matta-black font-bold"
            >Upload Quote</label
          >
          <div class="relative flex items-center">
            <input
              class="border flex-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
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
            v-for="error of request$.url.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div>
          <button
            @click="handleSubmit"
            :disabled="!form.url || isLoading"
            class="bg-matta-black text-sm px-6 py-2 rounded-lg text-white active:scale-95 ml-auto block disabled:opacity-60"
          >
            Upload
            <i
              class="fa fa-spinner fa-spin"
              v-if="isLoading"
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { uploaddocument } from "~/services/onboardingservices";
import { uploaddoc } from "~/services/quoteservice";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { toast } from 'vue3-toastify';

const quote = inject("quote");

const isUploading = ref(false);
const form = reactive({
  sampleRequestId: quote?.value?.id,
  documentName: `${quote?.value?.productName?.replaceAll(" ", "")}-Quote`,
  url: "",
});
const myrules = {
  sampleRequestId: { required },
  documentName: { required },
  url: { required },
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
    form.url = res.data.message;
    isUploading.value = false;
  });
}
const isLoading = ref(false);
async function handleSubmit() {
  const validity = await request$.value.$validate();

  if (!validity) return;
  isLoading.value = true;
  uploaddoc(form)
    .then((res) => {
      if (res.status === 200) {
        request$.value.$reset();
        form.url = "";
        isLoading.value = false;
        toast.success("Upload success");
      }
    })

    .catch((err) => {
      isLoading.value = false;

      toast.error((err.response.data.message || err.response.data.Message));
    });
}
</script>
