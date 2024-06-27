<template>
  <section class="flex flex-col gap-y-8" v-if="request">
    <div class="flex items-center">
      <span
        class="mr-3 h-10 w-10 rounded-lg flex items-center justify-center border border-[#E7EBEE] p-2"
      >
         <!-- <img class="" :src="request?.image" v-if="request?.image" alt="alt" /> -->
      </span>
      <span>
        <span class="text-xs font-medium"> {{ request.productName }} </span>
        <br />
        <span class="text-xs font-normal"> {{ request.producer }} </span>
      </span>
    </div>
    <div class="grid grid-cols-2 gap-y-8 gap-x-4 mb-8">
      <div>
        <p class="text-[12px] text-[#98A2B3] mb-1 capitalize">Status</p>
        <!-- <span class="px-2 py-2 text-xs rounded-lg bg-[#D0C9FF]"> New</span> -->
        <span
          v-if="request.requestStatus == 0"
          class="px-2 py-1 text-xs rounded-lg bg-[#E0F7B0]"
        >
          New</span
        >
        <span
          v-if="request.requestStatus == 1"
          class="px-2 py-1 text-xs rounded-lg bg-[#FDD0AF]"
        >
          In progress</span
        >
      </div>
      <div>
        <p class="text-[12px] text-[#98A2B3] mb-1 capitalize">created</p>
        <span class="text-xs"> {{ moment(request.date).format("ll") }}</span>
      </div>
      <div>
        <p class="text-[12px] text-[#98A2B3] mb-1 capitalize">
          number of samples
        </p>
        <span class="text-xs">{{ request.numberofSamples }}</span>
      </div>
      <div>
        <p class="text-[12px] text-[#98A2B3] mb-1 capitalize">
          Expected annual usage
        </p>
        <span class="text-xs">{{ request.expectedAnualUsage }}</span>
      </div>
    </div>
    <div
      class="bg-[#F1F3F5] rounded-lg p-6 text-matta-black"
      v-if="request.description"
    >
      <div class="">
        <p class="text-sm font-normal">
          {{ request.description }}
        </p>
      </div>
    </div>
    <!-- <div class="bg-[#F1F3F5] rounded-lg p-6 text-matta-black">
      <div class="flex justify-between mb-6">
        <h3 class="text-lg font-medium">Shipping Address</h3>
        <span><i class="uil uil-minusext-lg"></i></span>
      </div>
      <div class="text-xs">
        <p class="text-xs font-medium mb-2">
          {{ request.firstName }} {{ request.lastName }}
        </p>
        <p class="text-xs flex gap-x-2 items-center mb-2">
          <span>{{
            `${request.shippingAddress.country} ${request.shippingAddress.city}`
          }}</span>
          <span class="h-1 w-1 rounded-full bg-[#DDDDDD]"></span>
          <span class="max-w-[200px] truncate ...">{{
            request.shippingAddress.street
          }}</span>
        </p>

        <p class="text-xs flex gap-x-2 items-center mb-2">
          {{ request.phone }}
        </p>
        <p class="text-xs flex gap-x-2 items-center mb-2">
          {{ request.email }}
        </p>
      </div>
    </div> -->
    <div class="bg-[#F1F3F5] rounded-lg p-6 text-matta-black">
      <div class="mb-6">
        <label class="mb-2 text-sm block text-matta-black font-bold"
          >Upload Request document</label
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

    <!-- <div class="bg-[#F1F3F5] rounded-lg p-6 text-matta-black">
      <div class="flex justify-between mb-6">
        <h3 class="text-lg font-medium">Timeline</h3>
        <span><i class="uil uil-minusext-lg"></i></span>
      </div>

      <div
        class="flex justify-start items-center gap-x-2 mb-3"
        :class="stage > 1 ? 'opacity-50' : ''"
      >
        <span
          :class="stage > 1 ? '' : ' bg-primary-500 text-white'"
          class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-xs"
        >
          <i class="uil uil-check"></i>
        </span>
        <span>
          <span class="text-xs text-[#ABABAB]">Mar 18, 13:05PM</span>
          <br />
          <span class="text-xs"
            ><span
              >Sample request has been
              <span class="fomt-medium">Completed</span>.</span
            ></span
          >
        </span>
      </div>

      <div
        class="flex justify-start items-center gap-x-2 mb-3"
        :class="stage > 2 ? 'opacity-50' : ''"
      >
        <span
          :class="
            stage > 2
              ? ''
              : stage == 2
              ? ' bg-primary-500 text-white'
              : stage < 2
              ? 'bg-white text-matta-black'
              : ''
          "
          class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-xs"
        >
          <i class="uil uil-map-marker"></i>
        </span>
        <span>
          <span class="text-xs text-[#ABABAB]">Mar 18, 13:05PM</span>
          <br />
          <span class="text-xs"
            ><span
              >Sample is ready to be
              <span class="fomt-medium">Shipped</span>.</span
            ></span
          >
        </span>
      </div>

      <div
        class="flex justify-start items-center gap-x-2 mb-3"
        :class="stage > 3 ? 'opacity-50' : ''"
      >
        <span
          :class="
            stage > 3
              ? ''
              : stage == 3
              ? ' bg-primary-500 text-white'
              : stage < 3
              ? 'bg-white text-matta-black'
              : ''
          "
          class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-xs"
        >
          <i class="uil uil-refresh"></i>
        </span>
        <span>
          <span class="text-xs text-[#ABABAB]">Mar 18, 13:05PM</span>
          <br />
          <span class="text-xs"
            ><span
              >Status changed from <span class="font-medium">New</span> to
              <span class="font-medium">In Progress</span>.</span
            ></span
          >
        </span>
      </div>

      <div class="flex justify-start items-center gap-x-2">
        <span
          :class="
            stage > 4
              ? ''
              : stage == 4
              ? ' bg-primary-500 text-white'
              : stage < 4
              ? 'bg-white text-matta-black'
              : ''
          "
          class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-xs"
        >
          <i class="uil uil-plus"></i>
        </span>
        <span>
          <span class="text-xs text-[#ABABAB]">Mar 18, 13:05PM</span>
          <br />
          <span class="text-xs"
            ><span
              >Sample request
              <span class="font-medium">#SE554-334</span> created.</span
            ></span
          >
        </span>
      </div>
    </div> -->
  </section>
</template>

<script setup>
import moment from "moment";
import { uploaddocument } from "~/services/onboardingservices";
import { uploaddoc } from "~/services/requestservice";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { toast } from 'vue3-toastify';



// eslint-disable-next-line no-unused-vars
const stage = ref(1);
const request = inject("request");
const isUploading = ref(false);
const form = reactive({
  sampleRequestId: request?.value?.id,
  documentName: `${request?.value?.productName?.replaceAll(" ", "")}-Document`,
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
<style scoped>
input[type="range" i]:disabled {
  background-color: #2c2c2c !important;
  color: rgb(197, 197, 197);
}
</style>
