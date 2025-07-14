<template>
  <div>
    <div class="mb-8">
      <p class="mb-1 text-base text-gray-700">Dear {{ quote.sellerName }},</p>
      <p class="text-base text-gray-700">
        We’ll be pleased if you could be kind to provide a quote based on the
        details below for <strong>{{ quote.productName }}</strong
        >.
      </p>
    </div>
    <div class="mb-8">
      <div class="grid grid-cols-2 gap-x-3 gap-y-6">
        <div>
          <p class="text-sm text-gray-500 font-nomrmal">Product name</p>
          <p class="text-sm font-medium">{{ quote.productName }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 font-nomrmal">Supplier</p>
          <p class="text-sm font-medium">{{ quote.sellerName }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 font-nomrmal">Market</p>
          <p class="text-sm font-medium">{{ quote.market }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 font-nomrmal">Application</p>
          <p class="text-sm font-medium">{{ quote?.applications }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 font-nomrmal">Package type</p>
          <p class="text-sm font-medium capitalize">
            {{ quote?.package?.package?.title }}
          </p>
        </div>
        <!-- <div>
          <p class="text-sm text-gray-500 font-nomrmal">Expected Volume</p>
          <p class="text-sm font-medium">
            {{ quote?.expectedVolume }} {{ quote?.unit }}
          </p>
        </div> -->
      </div>

      <div>
        <!-- <h4 class="mb-4 text-base font-medium text-gray-700">
          Order preference
        </h4>
        <div class="flex items-start mb-3 gap-x-3">
          <i class="w-5 text-base text-gray-500 fas fa-clipboard-list"></i>
          <div>
            <p class="flex items-center text-sm font-medium gap-x-2">
              <span class="text-base text-gray-500">Special instruction:</span>
              <span> {{ quote.additionalInformation }}</span>
            </p>
          </div>
        </div> -->
        <!-- <div class="flex items-start mb-3 gap-x-3">
          <i
            class="w-5 text-lg text-gray-500 fa fa-user"
            aria-hidden="true"
          ></i>
          <div>
            <p class="mb-2 text-sm font-medium text-gray-700">Requested by</p>
            <p class="mb-1 text-sm">
              {{ quote.requestedBy }} - {{ quote.buyerBusinessName }}
            </p>
            <p class="text-sm font-normal">{{ quote.contactPhone }}</p>
          </div>
        </div> -->
      </div>
      <hr class="my-4" />
      <div class="bg-[#F1F3F5] border rounded-lg p-6 text-matta-black">
        <div class="mb-6">
          <label
            for="formFile"
            class="block mb-2 text-xs font-bold text-matta-black"
            >Upload Quote</label
          >
          <div class="relative flex items-center">
            <input
              class="flex-1 block w-full text-sm border text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
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
            class="mt-1 text-red-500"
            v-for="error of request$.url.$errors"
            :key="error.$uid"
          >
            <div class="text-xs font-semibold error-msg text-error">
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span>
            <button
              v-if="quote.documentUrl"
              @click="downloadFile(quote?.documentUrl)"
              type="button"
              class="text-primary-500 rounded-lg text-xs px-0 py-[10px]"
            >
              Download document
            </button>
          </span>
          <button
            @click="handleSubmit"
            :disabled="!form.url || isLoading"
            class="block px-6 py-2 ml-auto text-sm text-white rounded-lg bg-matta-black active:scale-95 disabled:opacity-60"
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
      <div class="mt-4">
        <AppButton
          @click="open = true"
          text="Edit Order"
          icon="charm:refresh"
          btnClass=" !px-0  !py-[0] !text-[11px] sm:text-xs md:text-sm !font-normal !text-primary-500"
          iconClass="!text-[10px] md:!text-base !mr-1"
        />
      </div>
      <div class="mt-6">
        <AppButton
          text="Confirm product is available"
          :isLoading="loading && confirmvalue == 2"
          :isDisabled="loading"
          @click="confirmOrder(2)"
          loadingText="Processing ..."
          btnClass="bg-primary-500  w-full text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm mb-4"
        />

        <AppButton
          :isLoading="loading && confirmvalue == 3"
          :isDisabled="loading"
          @click="confirmOrder(3)"
          text="Confirm product is Unavailable"
          loadingText="Processing ..."
          btnClass="!text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm bg-[#F04438] !normal-case mb-4 w-full"
        />
      </div>
    </div>

    <IndexModal :isOpen="open" @togglePopup="open = false" v-if="open">
      <template #content>
        <EditOrder
          @close="open = false"
          :detail="{
            ...quote.package,
            productName: quote.productName,
            productId: quote.productId,
            brand: quote.brand,
            quoteId: quote.quoteId,
            id: quote.id,
          }"
        />
      </template>
    </IndexModal>
  </div>
</template>
<script setup>
import { uploaddocument } from "~/services/onboardingservices";
import { uploaddoc } from "~/services/quoteservice";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { toast } from "vue3-toastify";
import { confirmavailablilty } from "~/services/quoteservice";
import EditOrder from "../order/confirmation/edit-order.vue";

const quote = inject("quote");
const open = ref(false);
const isUploading = ref(false);
const loading = ref(false);
const confirmvalue= ref(null)
const emit = defineEmits(['close'])
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
    form.url = res.data.data;
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

      toast.error(err?.response?.data?.message || err?.response?.data?.Message);
    });
}
async function confirmOrder(val) {
  try {
    loading.value = true;
    confirmvalue.value = val
    const res = await confirmavailablilty({
      id: quote?.value?.id,
      status: val,
    });

    if (res.status === 200) {
      toast.success("Successful");
      emit('close')
    }
  } catch (err) {
    errorResponse(err);
  } finally {
    loading.value = false;
  }
}
</script>
