<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm mb-[10px] text-[#344054]"
      >{{ label }} <RedDot v-if="isCumpulsory"
    /></label>
    <div
      class="flex-1 rounded-lg py-[6px] pr-[14px] pl-2 h-12 text-sm w-full relative border border-[##EAECF0] placeholder:text-[#B6B7B9] bg-[#F9FAFB] focus:outline-matta-black/20 flex items-center"
    >
      <input
        ref="fileInputRef"
        type="file"
        class="hidden"
        @change="
          (e) => {
            multiple ? handleMultiple(e) : handleEvent(e);
          }
        "
        :accept="accept"
        :multiple="multiple"
      />

      <button type="button" @click="triggerFileInput" class="mr-4">
        <span>
          <UploadSvg />
        </span>
      </button>
      <span v-if="!loading" class="flex-1 max-w-max truncate">
        <span v-if="!name && !title" class="text-[#98A2B3]">{{
          btnText || "Select file for upload"
        }}</span>
        <span
          v-else
          :class="lClass"
          class="flex-1 truncate text-[#999999] inline-bloc"
          >{{ name || title }}</span
        ></span
      >
      <div
        v-if="loading"
        class="loader border-t-2 border-primary-500 border-solid rounded-full h-4 w-4 animate-spin whitespace-nowrap absolute right-4"
      ></div>
    </div>
  </div>
</template>

<script setup>
import RedDot from "@/components/RedDot.vue";
import { uploaddocument } from "@/services/onboardingservices";
import { Icon } from "@iconify/vue";
import { defineProps, ref, inject, watch, onMounted, defineEmits } from "vue";
import { toast } from "vue3-toastify";

const props = defineProps({
  label: {
    default: "",
  },
  id: {
    default: "",
  },
  btnText: {
    default: "",
  },
  modelValue: {
    default: "",
  },
  multiple: {
    default: false,
  },
  accept: {
    default: "pdf,jpeg,jpg,png",
  },
  isCumpulsory: {
    default: false,
  },
  lClass: {
    default: " max-w-[300px] xl:max-w-[380px]",
  },
  name: {
    default: "",
  },
});
const emits = defineEmits(["update:modelValue", "getName"]);
const handleChange = inject("handleChange");
const fileInputRef = ref(null);
const title = ref("");
const loading = ref(false);
const multiUrls = ref([]);
const multiNames = ref([]);
function handleEvent(e) {
  const file = e.target.files[0];

  if (!file) return;

  // Add more allowed extensions if needed
  const fileExtension = file.name.split(".").pop().toLowerCase();

  if (!props.accept.split(",").includes(fileExtension)) {
    // Show an error message or handle accordingly
    toast.error("Invalid file type. Please upload a document.");
    return;
  }
  title.value = file.name;
  emits("getName", file.name);
  const reader = new FileReader();

  reader.onload = function (event) {
    const base64String = event.target.result.split(",")[1];
    loading.value = true;
    const data = { base64: base64String, ext: `.${fileExtension}` };
    // Assuming canvas and uploaddocument are available

    uploaddocument(data)
      .then((res) => {
        loading.value = false;
        handleChange && handleChange(props.id, res.data.data);
        emits("update:modelValue", res.data.data);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        loading.value = false;
      });
  };

  reader.onerror = function (error) {
    console.error("Error reading file:", error);
  };

  reader.readAsDataURL(file);
}
function handleMultiple(e) {
  const files = Object.values(e.target.files);

  if (!files.length) return;
  const promises = [];
  files.forEach((file) => {
  multiNames.value =  multiUrls.value = [];

    const fileExtension = file.name.split(".").pop().toLowerCase();
    const name = file.name
    if (!props.accept.split(",").includes(fileExtension)) {
      // Show an error message or handle accordingly
      toast.error("Invalid file type. Please upload a document.");
      return;
    }
 
    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
      reader.onload = function (event) {
        const base64String = event.target.result.split(",")[1];
        loading.value = true;
        const data = { base64: base64String, ext: `.${fileExtension}` };

        // Assuming uploaddocument is available
        uploaddocument(data)
          .then((res) => {
            multiNames.value = [...multiNames.value,name];
            multiUrls.value = [...multiUrls.value, res.data.data];
            resolve(); // Resolve the promise after successful upload
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            reject(error); // Reject the promise if there's an error
          })
          .finally(() => {
            loading.value = false; // Ensure loading indicator is turned off after upload, regardless of success or failure
          });
      };

      reader.onerror = function (error) {
        console.error("Error reading file:", error);
        reject(error);
      };

      reader.readAsDataURL(file);
    });

    promises.push(promise);
  });

  // Wait for all promises to resolve before calling handleChange
  Promise.all(promises)
    .then(() => {
      // All files have been successfully uploaded
      handleChange && handleChange(props.id, multiUrls.value);
      emits("update:modelValue", multiUrls.value);
      emits("getName", multiNames.value.join(", "))
    })
    .catch((error) => {
      // An error occurred during file upload
      console.error("Error handling multiple files:", error);
    });
}

function triggerFileInput() {
  fileInputRef.value.click();
}
onMounted(() => {
  title.value = props.modelValue;
});
watch(
  () => [props.modelValue],
  () => {
    title.value = props.modelValue;
  }
);
</script>
