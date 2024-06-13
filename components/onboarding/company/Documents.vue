<!-- eslint-disable no-useless-escape -->
<template>
  <form @submit.prevent="handleSubmit" class="w-full px-4 lg:px-[30px]">
    <div
      class="flex gap-x-[76px] pt-[30px] justify-start flex-col lg:flex-row gap-y-7 lg:gap-y-"
    >
      <div class="w-[250px]">
        <h2 class="text-sm text-[#101828] font-semibold">Company Documents</h2>
        <p class="text-xs text-[#475467]">
          Upload your company registration documents
        </p>
      </div>
      <div
        v-if="!companyInfo?.approvalStatus"
        class="grid gap-y-6 max-w-[560px] w-full"
      >
        <div
          class="grid grid-cols-1 gap-y-4"
          v-if="companyInfo?.country?.toLowerCase() === 'nigeria'"
        >
          <div v-for="(file, idx) in form.companyDocuments[1]?.urls" :key="idx">
            <div class="relative">
              <FileUpload
                label="Memorandum and Articles of Association"
                id="mermat"
                v-model="file.url"
                isCumpulsory
              />
              <button
                v-if="form.companyDocuments[1]?.urls.length > 1"
                type="button"
                class="text-red-500 text-xs font-medium right-0 top-2 absolute"
                @click="removeField(1, idx)"
              >
                Remove
              </button>
            </div>
            <div class="flex flex-wrap gap-x-4 gap-y-3" v-if="file.url">
              <span @click="downloadFile(file.url, 'Mermat')">
                <span class="block text-xs text-blue-500 mt-1"
                  >Download Mermat {{ idx + 1 }}</span
                ></span
              >
            </div>
          </div>
          <div class="mt-1">
            <button
              @click="addField(1)"
              type="button"
              class="block text-primary-500 text-xs font-medium ml-auto"
            >
              + Add field
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-y-4">
          <div v-for="(file, idx) in form.companyDocuments[0]?.urls" :key="idx">
            <div class="relative">
              <FileUpload
                label="Certificate of Incorporation"
                id="incorporation"
                v-model="file.url"
                isCumpulsory
              />
              <button
                v-if="form.companyDocuments[0]?.urls.length > 1"
                type="button"
                class="text-red-500 text-xs font-medium right-0 top-2 absolute"
                @click="removeField(0, idx)"
              >
                Remove
              </button>
            </div>

            <div class="flex flex-wrap gap-x-4 gap-y-3" v-if="file.url">
              <span
                @click="downloadFile(file.url, 'Certificate of Incorporation')"
              >
                <span class="block text-xs text-blue-500 mt-1"
                  >Download Certificate of Incorporation {{ idx + 1 }}</span
                ></span
              >
            </div>
          </div>
          <div class="mt-1">
            <button
              @click="addField(0)"
              type="button"
              class="block text-primary-500 text-xs font-medium ml-auto"
            >
              + Add field
            </button>
          </div>
        </div>
        <div
          class="grid grid-cols-1 gap-y-4"
          v-if="companyInfo?.country?.toLowerCase() === 'nigeria'"
        >
          <div v-for="(file, idx) in form.companyDocuments[2]?.urls" :key="idx">
            <div class="relative">
              <FileUpload
                label="CAC Status Report"
                id="statusReport"
                v-model="file.url"
                isCumpulsory
              />
              <button
                v-if="form.companyDocuments[2]?.urls.length > 1"
                type="button"
                class="text-red-500 text-xs font-medium right-0 top-2 absolute"
                @click="removeField(2, idx)"
              >
                Remove
              </button>
            </div>

            <div class="flex flex-wrap gap-x-4 gap-y-3" v-if="file.url">
              <span @click="downloadFile(file.url, 'Status Report')">
                <span class="block text-xs text-blue-500 mt-1"
                  >Download Status Report {{ idx + 1 }}</span
                ></span
              >
            </div>
          </div>
          <div class="mt-1">
            <button
              @click="addField(2)"
              type="button"
              class="block text-primary-500 text-xs font-medium ml-auto"
            >
              + Add field
            </button>
          </div>
        </div>
        <div
          class="grid grid-cols-1 gap-y-4"
          v-if="companyInfo?.country?.toLowerCase() === 'nigeria'"
        >
          <div v-for="(file, idx) in form.companyDocuments[3]?.urls" :key="idx">
            <div class="relative">
              <FileUpload
                label="Utility bill"
                id="utitlityBill"
                v-model="file.url"
                isCumpulsory
              />
              <button
                v-if="form.companyDocuments[3]?.urls.length > 1"
                type="button"
                class="text-red-500 text-xs font-medium right-0 top-2 absolute"
                @click="removeField(3, idx)"
              >
                Remove
              </button>
            </div>
            <div class="flex flex-wrap gap-x-4 gap-y-3" v-if="file.url">
              <span @click="downloadFile(file.url, 'Utility bill')">
                <span class="block text-xs text-blue-500 mt-1"
                  >Download Utility bill {{ idx + 1 }}</span
                ></span
              >
            </div>
           
          </div>
          <div class="mt-1">
              <button
                @click="addField(3)"
                type="button"
                class="block text-primary-500 text-xs font-medium ml-auto"
              >
                + Add field
              </button>
            </div>
        </div>
      </div>
      <div v-else class="max-w-[560px]">
        <DocumentsViewer type="kyb" :documents="companyDoc" />
      </div>
    </div>
    <div
      class="flex justify-end pt-6 border-t border-[#EAECF0] gap-x-4 items-center mt-16 w-full"
      v-if="!companyInfo?.approvalStatus"
    >
      <button
        @click="active--"
        type="button"
        class="appearance-none leading-none px-10 py-[10px] rounded-lg w-full lg:w-auto text-matta-black border border-[#E7EBEE] hover:bg-gray-100 text-[13px] capitalize"
      >
        Back
      </button>

      <button
        :disabled="isLoading"
        :class="{
          'opacity-60 cursor-not-allowed': isLoading,
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

const authStore = useAuthStore();
const companyInfo = inject("companyInfo");
const getData = inject("getData");
const router = useRouter();
const active = inject("active");
const form = reactive({
  companyDocuments:
    companyInfo?.value?.companyDocuments?.length === 4
      ? companyInfo?.value.companyDocuments
      : [
          {
            url: "",
            urls: [
              {
                url: "",
              },
            ],
            documentType: 0,
          },
          {
            url: "",
            urls: [
              {
                url: "",
              },
            ],
            documentType: 1,
          },
          {
            url: "",
            urls: [
              {
                url: "",
              },
            ],
            documentType: 2,
          },
          {
            url: "",
            urls: [
              {
                url: "",
              },
            ],
            documentType: 3,
          },
        ],
});
const viewingDoc = computed(() => {
  if (companyInfo?.value.country?.toLowerCase() !== "nigeria") {
    return form.companyDocuments.filter((i) => i.documentType === 0);
  } else {
    return form.companyDocuments;
  }
});

const companyDoc = computed(() => {
  if (companyInfo?.value.country?.toLowerCase() !== "nigeria") {
    return companyInfo?.value.companyDocuments.filter(
      (i) => i.documentType === 0
    );
  } else {
    return companyInfo?.value.companyDocuments;
  }
});

const isLoading = ref(false);

onMounted(() => {});

// eslint-disable-next-line no-unused-vars
function handleChange(id, value) {
  // form.companyDocuments.map((i) => {
  //   if (id === "incorporation" && i.documentType === 0) {
  //     i.urls = value;
  //   }
  //   if (id === "mermat" && i.documentType === 1) {
  //     i.urls = value;
  //   }
  //   if (id === "statusReport" && i.documentType === 2) {
  //     i.urls = value;
  //   }
  //   if (id === "utitlityBill" && i.documentType === 3) {
  //     i.urls = value;
  //   }
  // });
}
function addField(id) {
  form.companyDocuments[id].urls.push({
    url: "",
  });
}

function removeField(id, idx) {
  form.companyDocuments[id].urls.splice(idx, 1);
}

function docUrl(id) {
  return form.companyDocuments.find((i) => i.documentType === id)?.urls || "";
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
  if (
    companyInfo?.value.country?.toLowerCase() === "nigeria" &&
    form.companyDocuments.some((i) => i.urls.filter((i) => i.url).length === 0)
  )
    return;
  const nonNigerian = form.companyDocuments
    .filter((i) => i.documentType === 0)
    .some((i) => i.urls.filter((i) => i.url).length == 0);

  if (companyInfo?.value.country?.toLowerCase() !== "nigeria" && nonNigerian)
    return;
  isLoading.value = true;

  updateDocuments({
    ...form,
    companyDocuments: form.companyDocuments.map((i) => ({
      ...i,
      urls: i.urls.map((j) => j.url),
    })),
  })
    .then((res) => {
      if (res.status === 200) {
        getData();
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
