<!-- eslint-disable no-useless-escape -->
<template>
  <form @submit.prevent="handleSubmit" class="w-full px-4 lg:px-[30px]">
    <div
      class="flex gap-x-[76px] pt-[30px] justify-between flex-col lg:flex-row gap-y-7 lg:gap-y-"
    >
      <div class="w-[300px]">
        <h2 class="text-sm text-[#101828] font-semibold">Company Documents</h2>
        <p class="text-xs text-[#475467]">
          Upload your company registration documents
        </p>
      </div>
      <div class="grid gap-y-6 max-w-[560px] w-full">
        <div>
          <FileUpload
            label="Memorandum and Articles of Association"
            id="mermat"
          />
          <span @click="downloadFile(docUrl(1), 'MERMAT')" download v-if="docUrl(1)">  <span class="block text-xs text-blue-500 mt-1">Download Mermat</span></span>
        </div>
        <div>
          <FileUpload label="Certificate of Incorporation" id="incorporation" />
          <span @click="downloadFile(docUrl(0), 'CAC')"  v-if="docUrl(0)">  <span class="block text-xs text-blue-500 mt-1">Download Certificate of Incorporation</span></span>
        </div>
        <div>
          <FileUpload label="CAC Status Report" id="statusReport" />
        <span @click="downloadFile(docUrl(2), 'Status report')"  v-if="docUrl(2)">  <span class="block text-xs text-blue-500 mt-1">Download CAC Status Report</span></span>
        </div>
      </div>
    </div>
    <div  v-if="!authStore?.userInfo?.onboardingPageStatus || !companyInfo.approvalStatus"
      class="flex justify-end pt-6 border-t border-[#EAECF0] gap-x-4 items-center mt-16 w-full"
    >
      <button
        @click="active--"
        type="button"
        class="appearance-none leading-none px-10 py-[10px] rounded-lg w-full lg:w-auto text-matta-black border border-[#E7EBEE] hover:bg-gray-100 text-[13px] capitalize"
      >
        Back
      </button>

      <button
        :disabled="form.companyDocuments.some((i) => i.url === '') || isLoading"
        :class="{
          'opacity-60 cursor-not-allowed': form.companyDocuments.some(
            (i) => i.url === ''
          ),
        }"
        class="appearance-none leading-none px-10 py-[10px] grid-cols-1 lg:grid-cols-2 gap-4 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] capitalize"
      >
        <i
          class="fa fa-spinner fa-spin"
          v-show="isLoading"
          aria-hidden="true"
        ></i>
        <span v-show="!isLoading">Next</span>
      </button>
    </div>
  </form>
</template>
<script setup>
import "vue-advanced-cropper/dist/style.css";
import { ref, reactive, onMounted, provide } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
// eslint-disable-next-line no-unused-vars
import { updateDocuments } from "@/services/settingservices";
import { useStore } from "vuex";

const companyInfo = inject("companyInfo");
const router = useRouter();
const active = inject("active");
const form = reactive({
  companyDocuments: companyInfo.value.companyDocuments || [
    {
      url: "",
      documentType: 0,
    },
    {
      url: "",
      documentType: 1,
    },
    {
      url: "",
      documentType: 2,
    },
  ],
});

const isLoading = ref(false);

onMounted(() => {});

// eslint-disable-next-line no-unused-vars
function handleChange(id, value) {
  form.companyDocuments.map((i) => {
    if (id === "incorporation" && i.documentType === 0) {
      i.url = value;
    }
    if (id === "mermat" && i.documentType === 1) {
      i.url = value;
    }
    if (id === "statusReport" && i.documentType === 2) {
      i.url = value;
    }
  });
}

function docUrl(id) {
 return form.companyDocuments.find((i) => i.documentType === id)?.url || "";
}
function downloadFile(fileUrl,fileName) {
    // Replace 'your_file_url' with the actual URL of the file you want to download
   
    fetch(fileUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => {
            // Create a link element
            const link = document.createElement('a');

            // Create a Blob URL for the file data
            const blobUrl = window.URL.createObjectURL(blob);

            // Set the link's href attribute to the Blob URL
            link.href = blobUrl;

            // Set the download attribute with the desired file name
            link.download = fileName || 'downloaded_file'; // Change the file name as needed

            // Append the link to the document
            document.body.appendChild(link);

            // Trigger a click on the link to start the download
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);

            // Revoke the Blob URL to free up resources
            window.URL.revokeObjectURL(blobUrl);
        })
        .catch(error => {
            console.error('Error downloading file:', error);
        });
}
const rules = {
  cac: {
    required,
  },
  mermat: {
    required,
  },
  statusReport: {
    required,
  },
};

const invalidCredentials = ref(false);

//Timer

// const isDisabled = ref(false);

async function handleSubmit() {
  if (form.companyDocuments.some((i) => i.url === "")) return;
  isLoading.value = true;

  updateDocuments(form)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Documents saved");
        active.value = 3;
      }
    })

    .catch((err) => {
      invalidCredentials.value = true;
      isLoading.value = false;

      toast.error(err.response.data.message || err.response.data.Message);
    });
}
provide("handleChange", handleChange);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("@/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
