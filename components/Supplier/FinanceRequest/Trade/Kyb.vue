<template>
  <form @submit.prevent="onSubmit" class="w-full mt-6">
    <div class="grid grid-cols-2 gap-x-[25px] gap-y-4 mb-[50px]">
      <Textinput
        placeholder=""
        label="Company name"
        name="companyName"
        v-bind="companyNameAtt"
        v-model="companyName"
        :error="errors.companyName"
      />

      <FormGroup
        label="Business type"
        :error="errors.businessType"
        name="businessType"
      >
        <Select
          v-model="businessType"
          :options="businessTypesOptions"
          placeholder="Select type"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.tenor ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>
      <Textinput
        placeholder=""
        label="Date of incorporation"
        name="dateOfIncorporation"
        type="date"
        v-bind="dateOfIncorporationAtt"
        v-model="dateOfIncorporation"
        :error="errors.dateOfIncorporation"
      />

      <FormGroup label="Sector" :error="errors.sector" name="sector">
        <Select
          v-model="sector"
          :options="sectorOptions"
          :disabled="!businessType"
          placeholder="Select sector"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.sector ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>
      <div class="md:col-span-2">
        <Textinput
          placeholder=""
          label="Business address"
          name="address"
          v-bind="addressAtt"
          v-model="address"
          :error="errors.address"
        />
      </div>
      <div class="md:col-span-2">
        <Textarea
          placeholder=""
          label="Brief description of the product"
          name="productDesc"
          v-bind="productDescAtt"
          v-model="productDesc"
          :error="errors.productDesc"
        />
      </div>
      <label class="mb-2 mt-3 font-medium text-sm block"
        >Company documents <span class="text-[#B9B9B9]">(Optional)</span></label
      >
      <FormGroup :error="errors.mermat" class="col-span-2">
        <FileUpload
          label="Memorandum and Articles of Association"
          id="mermat"
        />
      </FormGroup>
      <FormGroup :error="errors.incorporation" class="col-span-2">
        <FileUpload label="Certificate of Incorporation" id="incorporation" />
      </FormGroup>
      <FormGroup :error="errors.statusReport" class="col-span-2">
        <FileUpload label="CAC Status Report" id="statusReport" />
      </FormGroup>
      <FormGroup :error="errors.utilityBill" class="col-span-2">
        <FileUpload label="Utility bill" id="utilitybill" />
      </FormGroup>
    </div>
    <div class="flex gap-x-4 items-center justify-between">
      <AppButton
        @click="active--"
        btnClass="bg-white text-white !px-11  !text-sm !py-[10px] disabled:cursor-not-allowed border border-[#BDC0C5] !rounded-lg !text-[#333]"
        type="button"
        text="Previous"
      />
      <AppButton
        :disabled="isLoading"
        :isLoading="isLoading"
        btnClass="bg-primary-500 text-white !px-16  !text-sm !py-[10px] disabled:cursor-not-allowed border  !rounded-lg border-primary-500"
        type="submit"
        text="Next"
      />
    </div>
  </form>
</template>

<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import sectors from "~/utils/sectors.json";
import {businessTypes} from "~/utils/constants.js";

const formData = inject("formData");
const mappedSectors = computed(() =>
  sectors.map((i) => ({ label: i.name, value: i.name }))
);
const isLoading = ref(false);

const active = inject("active");

const formSchema = yup.object().shape({
  companyName: yup.string().required("Company Name is required"),
  sector: yup.string().required("Sector is required"),
  dateOfIncorporation: yup
    .date()
    .typeError("Invalid date Of Incorporation")
    .nullable()
    .required("Date Of Incorporation is required"), // Assuming dateOfIncorporation is a dateOfIncorporation type
  businessType: yup.string().required("Business Type is required"),
  address: yup.string().required("Address is required"),
  productDesc: yup.string().required("Product Description is required"),
  statusReport: yup.string().required("Status Report is required"),
  incorporation: yup.string().required("Incorporation is required"), // Assuming incorporation is a dateOfIncorporation type
  mermat: yup.string().required("Mermat is required"),
  utilityBill: yup.string().required("Utility Bill is required"),
});

const { handleSubmit, defineField, errors, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: formData.kyb,
});

const [companyName, companyNameAtt] = defineField("companyName");
const [sector, sectorAtt] = defineField("sector");
const [dateOfIncorporation, dateOfIncorporationAtt] = defineField("dateOfIncorporation");
const [businessType, businessTypeAtt] = defineField("businessType");
const [address, addressAtt] = defineField("address");
const [productDesc, productDescAtt] = defineField("productDesc");

function handleChange(id, value) {
  form.kyb.companyDocuments.map((i) => {
    if (id === "incorporation" && i.documentType === 0) {
      i.url = value;
    }
    if (id === "mermat" && i.documentType === 1) {
      i.url = value;
    }
    if (id === "statusReport" && i.documentType === 2) {
      i.url = value;
    }
    if (id === "utilitybill" && i.documentType === 2) {
      i.url = value;
    }
  });
}
function docUrl(id) {
  return form.companyDocuments.find((i) => i.documentType === id)?.url || "";
}
function downloadFile(fileUrl, fileName) {
  // Replace 'your_file_url' with the actual URL of the file you want to download

  fetch(fileUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => {
      // Create a link element
      const link = document.createElement("a");

      // Create a Blob URL for the file data
      const blobUrl = window.URL.createObjectURL(blob);

      // Set the link's href attribute to the Blob URL
      link.href = blobUrl;

      // Set the download attribute with the desired file name
      link.download = fileName || "downloaded_file"; // Change the file name as needed

      // Append the link to the document
      document.body.appendChild(link);

      // Trigger a click on the link to start the download
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);

      // Revoke the Blob URL to free up resources
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch((error) => {
      console.error("Error downloading file:", error);
    });
}

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ onSubmit ~ values:", values);
  formData.kyb = values;
  active.value = 3;
});

const businessTypesOptions = businessTypes?.map(i=>{
  return {
    label:i.sector,
    value:i.sector
  }
});
const sectorOptions = computed(() => {
  const selectedBusinessType = businessTypes?.find(i => i.sector === businessType.value);
  if (!selectedBusinessType) return []; // Handle case when selected business type is not found
  
  return selectedBusinessType.subSectors?.map(i => {
    return {
      label: i.subSectorName,
      value: i.subSectorCode // Use subSectorCode as the value
    };
  }) ?? []; // Use optional chaining and nullish coalescing operators for safer property access
});

provide("handleChange", handleChange);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
