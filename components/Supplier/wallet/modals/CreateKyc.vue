<template>
  <div class="sm:min-w-[650px] w-full max-w-[800px] py-10 px-6">
    <h3 class="block text-2xl font-medium text-center mb-6">
      Complete your KYC
    </h3>
    <form @submit.prevent="handleSubmit">
      <div class="grid lg:grid-cols-2 lg:gap-6">
        <div class="mb-6">
          <label class="mb-2 font-normal text-xs block text-matta-black"
            >BVN</label
          >
          <div class="relative flex items-center">
            <input
              v-model="v$.bvn.$model"
              :class="{ 'border-red-500 ': v$.bvn.$error }"
              class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
              placeholder="Provide your bvn"
              @keyup="isBvnError = false"
            />
          </div>
          <div class="text-red-500 mt-1" v-if="isBvnError">
            <div class="error-msg text-error text-xs font-semibold">
              Invalid BVN number
            </div>
          </div>
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
          <label class="mb-2 font-normal text-xs block text-matta-black"
            >NIN</label
          >
          <div class="relative flex items-center">
            <input
              v-model="v$.nin.$model"
              :class="{ 'border-red-500 ': v$.nin.$error }"
              class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
              placeholder="Provide your NIN"
              @keyup="isNinError = false"
            />
          </div>
          <div
            class="text-red-500 mt-1"
            v-for="error of v$.nin.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
          <div class="text-red-500 mt-1" v-if="isNinError">
            <div class="error-msg text-error text-xs font-semibold">
              Invalid NIN number
            </div>
          </div>
        </div>
      </div>
      <div class="mb-6">
        <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Company name</label>
        <div class="flex relative items-center">
          <input
            :value="v$.companyName.$model"
            :class="{ 'border-red-500 ': v$.companyName.$error }"
            class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            readonly
          />
        </div>
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.companyName.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 lg:gap-6">
        <div class="mb-6">
          <label class="mb-2 font-normal text-xs block text-matta-black"
            >Company type
          </label>
          <div class="flex relative items-center">
            <select
              v-model="v$.companyType.$model"
              :class="{ 'border-red-500': v$.companyType.$error }"
              class="appearance-none rounded-lg px-[14px] py-[10px] h-11 text-sm w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            >
              <option disabled value="">Select sector</option>
              <option v-for="item in sectors" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
            <i
              class="uil uil-angle-down absolute right-2 pointer-events-none"
            ></i>
          </div>
          <div
            class="text-red-500 mt-1"
            v-for="error of v$.companyType.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="mb-6">
          <label class="mb-2 font-normal text-xs block text-matta-black"
            >CAC</label
          >
          <div class="relative flex items-center">
            <input
              v-model="v$.cac.$model"
              :class="{ 'border-red-500 ': v$.cac.$error }"
              class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
              placeholder="Provide your CAC"
              @keyup="isBvnError = false"
            />
          </div>
          <div
            class="text-red-500 mt-1"
            v-for="error of v$.cac.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
          <div class="text-red-500 mt-1" v-if="isCacError">
            <div class="error-msg text-error text-xs font-semibold">
              Invalid CAC number
            </div>
          </div>
        </div>
      </div>
      <div class="mb-6">
        <label class="mb-2 font-normal text-xs block text-matta-black"
          >Company Utility Bill</label
        >
        <div class="relative flex items-center">
          <input
            class="flex-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            type="file"
            id="formFile"
            @change="handleFile"
          />
          <div class="flex gap-x-3">
            <i
              class="fa fa-spinner fa-spin"
              v-if="isUploading"
              aria-hidden="true"
            ></i>

            <button
              v-if="form.utilityBilly"
              class="text-blue-700 text-sm"
              @click="downloadUsingFetch"
            >
              View
            </button>
          </div>
        </div>
      </div>
      <div class="mb-6">
        <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Address</label>
        <div class="flex relative items-center">
          <input
            :value="form.address"
            class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            readonly
          />
          <i class="uil uil-home absolute right-4 text-gray-600"></i>
        </div>
      </div>

      <div class="mb-6">
        <p class="mb-4 font-bold text-sm block text-matta-black">
          Directors Details
        </p>
        <div
          v-for="(director, index) in form.directorsInfos"
          :key="index"
          class="py-2 mb-4 relative gap-x-3 flex items-start"
        >
          <div class="grid lg:grid-cols-2 gap-6 flex-1">
            <div class="">
              <label class="mb-2 font-normal text-xs block text-matta-black"
                >Full Name</label
              >
              <div class="relative flex items-center">
                <input
                  v-model="director.name"
                  class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                  placeholder="Enter director's name"
                />
              </div>
              <div
                class="text-red-500 mt-1"
                v-for="error of v$.directorsInfos.$each.$response.$errors[index]
                  .name"
                :key="error.$uid"
              >
                <div class="error-msg text-error text-xs font-semibold">
                  {{ error.$message }}
                </div>
              </div>
            </div>
            <div>
              <label class="mb-2 font-normal text-xs block text-matta-black"
                >Title</label
              >
              <div class="relative flex items-center">
                <input
                  v-model="director.title"
                  class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                  placeholder="Enter director's title"
                />
              </div>
              <div
                class="text-red-500 mt-1"
                v-for="error of v$.directorsInfos.$each.$response.$errors[index]
                  .title"
                :key="error.$uid"
              >
                <div class="error-msg text-error text-xs font-semibold">
                  {{ error.$message }}
                </div>
              </div>
            </div>
            <div class="col-span-2">
              <label class="mb-2 font-normal text-xs block text-matta-black"
                >Address</label
              >
              <div class="relative flex items-center">
                <input
                  v-model="director.address"
                  class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                  placeholder="Enter director's address"
                />
              </div>
              <div
                class="text-red-500 mt-1"
                v-for="error of v$.directorsInfos.$each.$response.$errors[index]
                  .address"
                :key="error.$uid"
              >
                <div class="error-msg text-error text-xs font-semibold">
                  {{ error.$message }}
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <button type="button" @click="form.directorsInfos.splice(index, 1)">
              x
            </button>
          </div>
        </div>
        <div>
          <button
            @click="
              form.directorsInfos.push({
                name: '',
                title: '',
                address: '',
              })
            "
            type="button"
            class="text-xs"
          >
            + Add director
          </button>
        </div>
      </div>
      <div class="flex justify-center mt-8">
        <button
          type="submit"
          :disabled="isLoading"
          class="border text-[13px] mb-4 border-primary- uppercase text-white w-full lg:w-auto lg:min-w-[150px] mx-auto bg-primary-500 rounded-lg px-6 py-2 hover:bg-primary/80 h-11"
        >
          <span>
            <span
              class="flex gap-x-4 justify-center items-center"
              v-if="isLoading"
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
  </div>
</template>
<script setup>
import { ref, reactive, defineEmits, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers, minLength, maxLength } from "@vuelidate/validators";
import { useStore } from "vuex";
import { uploaddocument } from "~/services/onboardingservices";
import { createUpdateKyc, getKycDetail } from "~/services/walletservice";
import { toast } from 'vue3-toastify';
import { getCompanyProfile } from "~/services/settingservices";


const store = useStore();
const emits = defineEmits(["success"]);
const sectors = ["RC", "BN", "IT", "LL", "LLP"];
const isCacError = ref(false);
const isNinError = ref(false);
const isBvnError = ref(false);
const company = ref(null);
const form = reactive({
  fullName: store.getters.loggedUser.fullName,
  phoneCode: "+234",
  phone: store.getters.loggedUser.phoneNumber,
  bvn: "",
  cac: "",
  nin: "",
  utilityBilly: "",
  address: company?.value?.address || "",
  companyType: "",
  companyName: company?.value?.companyName || "",
  directorsInfos: [
    {
      name: "",
      title: "",
      address: "",
    },
  ],
});
const isLoading = ref(false);
const rules = {
  cac: {
    required: helpers.withMessage("CAC field cannot be empty", required),
    // minLength: minLength(14),
    maxLength: maxLength(14),
  },
  utilityBilly: { required },
  directorsInfos: {
    $each: helpers.forEach({
      name: { required },
      title: { required },
      address: { required },
    }),
  },
  companyType: { required },
  companyName: { required },
  bvn: {
    required: helpers.withMessage("BVN field cannot be empty", required),
    minLength: minLength(11),
    maxLength: maxLength(11),
  },
  nin: {
    required: helpers.withMessage("NIN field cannot be empty", required),
    minLength: minLength(11),
    maxLength: maxLength(11),
  },
};

const v$ = useVuelidate(rules, form);
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve(reader.result.replace("data:", "").replace(/^.+,/, ""));
    reader.onerror = reject;
  });
const isUploading = ref(false);
async function handleFile(e) {
  const file = e.target.files[0];
  const ext = file.name.substring(file.name.lastIndexOf(".") + 1);
  isUploading.value = true;
  uploaddocument({
    base64: await toBase64(file),
    ext: `.${ext}`,
  }).then((res) => {
    form.utilityBilly = res.data.message;
    isUploading.value = false;
  });
}
async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;
  createUpdateKyc(form)
    .then((res) => {
      if (res.status == 200) {
        isLoading.value = false;
        if (res.data.data.processStatus.some((item) => !item.status)) {
          console.log("error");
          res.data.data.processStatus.forEach((item) => {
            if (item.processName === "bvn" && !item.status) {
              isBvnError.value = true;
            }
            if (item.processName === "nin" && !item.status) {
              isNinError.value = true;
            }
            if (item.processName === "cac" && !item.status) {
              isCacError.value = true;
            }
          });
        } else {
          toast.info("KYC updated successfully", {
            position: "bottom",
          });
          emits("success", res.data);
        }
      }
    })
    .catch((err) => {
      isLoading.value = false;

      toast.error((err.response.data.message || err.response.data.Message));
    });
}
async function downloadUsingFetch() {
  const file = await fetch(form.utilityBilly);
  const FILE_NAME = "document";
  const fileBlog = await file.blob();
  const fileURL = URL.createObjectURL(fileBlog);

  const anchor = document.createElement("a");
  anchor.href = fileURL;
  anchor.download = FILE_NAME;

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(fileURL);
}
onMounted(() => {
  getCompanyProfile().then((res) => {
    company.value = res.data.data;
    form.companyName = company?.value?.companyName;
  });
  getKycDetail().then((res) => {
    if (res.status === 200 && res.data) {
  
      form.fullName = res.data.data.fullName;
      form.phoneCode = res.data.data.phoneCode;
      form.phone = res.data.data.phone;
      form.bvn = res.data.data.bvn;
      form.cac = res.data.data.cac;
      form.nin = res.data.data.nin;
      form.utilityBilly = res.data.data.utilityBilly;
      form.address = res.data.data.address;
      form.companyType = res.data.data.companyType;
      form.companyName =
        company?.value?.companyName || res.data.data.companyName;
      form.directorsInfos = res.data.data.directorsInfos;
    }
  });
});
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
