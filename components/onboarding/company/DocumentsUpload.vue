<template>
  <div class="w-full">
    <div class="flex items-center gap-x-3 w-full mb-8" v-if="!hideUpdate">
      <SelectVueSelect
        v-model="selectedDocument"
        :options="
          isNonNigerian
            ? options.filter((i) => i.value == 4 || i.value == 0)
            : options
        "
        :reduce="(option) => option.value"
        placeholder="Select document type"
        classInput="flex-1 w-full"
        :clearable="false"
      />
      <input
        id="upload"
        ref="fileInputRef"
        type="file"
        class="hidden"
        @change="
          (e) => {
            handleEvent(e);
          }
        "
        accept="pdf,jpeg,jpg,png"
      />
      <AppButton
        :disabled="selectedDocument === null || isLoading"
        :isLoading="isLoading"
        @click="triggerFileInput"
        btnClass="bg-primary-500  text-white !px-12 !text-sm !py-[10px] disabled:cursor-not-allowed border !rounded-lg border-primary-500"
        type="button"
        text="Upload"
      />
    </div>
    <div
      v-if="
        privateDocuments &&
        privateDocuments.some((i) => i.urls.filter((i) => i.url).length !== 0)
      "
    >
      <DocumentsViewer
        type="kyb"
        :documents="privateDocuments"
        @deleteDoc="handleDelete"
        :hideUpdate="hideUpdate"
      />
    </div>
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import { uploaddocument } from "~/services/onboardingservices";

const isLoading = ref(false);
const loading = ref(false);
const selectedDocument = ref(null);
const fileInputRef = ref(null);
const privateDocuments = ref([]);
const props = defineProps(["documents", "hideUpdate", "isNonNigerian"]);
const emits = defineEmits(["getDocs"]);
const options = [
  {
    label: "Company profile",
    value: 4,
  },
  {
    label: "Certificate of Incorporations",
    value: 0,
  },
  {
    label: "Memorandum and Articles of Association",
    value: 1,
  },
  {
    label: "CAC Status Report",
    value: 2,
  },
  {
    label: "Utility Bill",
    value: 3,
  },
];
onMounted(() => {
  privateDocuments.value = props.documents;
});

function triggerFileInput() {
  fileInputRef.value.click();
}
function resetFileInput() {
  fileInputRef.value.value = ""; // Clear the file input value
}
function handleEvent(e) {
  const file = e.target.files[0];

  if (!file) return;

  // Add more allowed extensions if needed
  const fileExtension = file.name.split(".").pop().toLowerCase();

  if (!["pdf", "jpeg", "jpg", "png"].includes(fileExtension)) {
    // Show an error message or handle accordingly
    toast.error("Invalid file type. Please upload a document.");
    return;
  }
  const reader = new FileReader();
  isLoading.value = true;
  reader.onload = function (event) {
    const base64String = event.target.result.split(",")[1];
    loading.value = true;
    const data = { base64: base64String, ext: `.${fileExtension}` };

    uploaddocument(data)
      .then((res) => {
        loading.value = false;
        handleDocuments(res.data.message, selectedDocument.value);
        isLoading.value = false;
        resetFileInput();
      })
      .catch((error) => {
        toast.success(`Error uploading file: ${error}`);
        loading.value = false;
        isLoading.value = false;
        resetFileInput();
      });
  };

  reader.onerror = function (error) {
    console.error("Error reading file:", error);
  };

  reader.readAsDataURL(file);
}

function handleDocuments(url, type) {
  let tempDocuments = privateDocuments.value || [];

  // Check if we already have a document of the same type
  const existingDocIndex = tempDocuments.findIndex(
    (i) => i.documentType === type
  );

  if (existingDocIndex === -1) {
    // No document of this type exists, so add a new one
    privateDocuments.value = [
      ...tempDocuments,
      {
        documentType: type,
        url,
        urls: [{ url }], // Make sure `urls` is an array of strings
      },
    ];
  } else {
    // Document of this type exists, update the existing one
    tempDocuments[existingDocIndex].urls.push({ url }); // Add the new URL
    privateDocuments.value = [...tempDocuments];
  }

  selectedDocument.value = null;
  emits("getDocs", privateDocuments.value);
}

function handleDelete({ url, type }) {
  let tempDocuments = privateDocuments.value;
  privateDocuments.value = tempDocuments.map((i) => {
    if (i.documentType === type) {
      i.urls = i.urls.filter((i) => i.url !== url);
    }
    return i;
  });

  emits("getDocs", privateDocuments.value);
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
