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
      <Textinput
        placeholder=""
        label="Date of incorporation"
        name="dateOfIncorporation"
        type="date"
        v-bind="dateOfIncorporationAtt"
        v-model="dateOfIncorporation"
        :error="errors.dateOfIncorporation"
      />

      <FormGroup
        label="Business type"
        :error="errors.companyType"
        name="companyType"
      >
        <Select
          v-model="companyType"
          :options="companyTypesOptions"
          placeholder="Select type"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.tenor ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>

      <FormGroup label="Sector" :error="errors.sector" name="sector">
        <Select
          v-model="sector"
          :options="sectorOptions"
          :disabled="!companyType"
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
          name="description"
          v-bind="descriptionAtt"
          v-model="description"
          :error="errors.description"
        />
      </div>
      <div class="md:col-span-2">
        <label class="mb-4 mt-3 font-medium text-sm block"
          >Company documents
          <span class="text-[#B9B9B9]">(Optional)</span></label
        >
        <div v-if="!company.companyDocuments.length" class="grid gap-y-6">
          <FormGroup :error="errors.mermat" class="col-span-2">
            <FileUpload
              label="Memorandum and Articles of Association"
              id="mermat"
            />
          </FormGroup>
          <FormGroup :error="errors.incorporation" class="col-span-2">
            <FileUpload
              label="Certificate of Incorporation"
              id="incorporation"
            />
          </FormGroup>
          <FormGroup :error="errors.statusReport" class="col-span-2">
            <FileUpload label="CAC Status Report" id="statusReport" />
          </FormGroup>
          <FormGroup :error="errors.utilityBill" class="col-span-2">
            <FileUpload label="Utility bill" id="utilitybill" />
          </FormGroup>
        </div>

        <div v-else class="">
          <DocumentsViewer type="kyb" :documents="company.companyDocuments" />
        </div>
      </div>
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
import { businessTypes } from "~/utils/constants.js";
import { updateCompanyProfile,updateDocuments } from "@/services/settingservices";
import{toast} from "vue3-toastify"

const company = inject("company");
const formData = inject("formData");
const isLoading = ref(false);
const active = inject("active");
const authStore = useAuthStore()
const formSchema = yup.object().shape({
  companyName: yup.string().required("Company Name is required"),
  sector: yup.string().required("Sector is required"),
  dateOfIncorporation: yup
    .date()
    .typeError("Invalid date Of Incorporation")
    .nullable()
    .required("Date Of Incorporation is required"), // Assuming dateOfIncorporation is a dateOfIncorporation type
  companyType: yup.string().required("Business Type is required"),
  address: yup.string().required("Address is required"),
  description: yup.string().required("Product Description is required"),
  // statusReport: yup.string().required("Status Report is required"),
  // incorporation: yup.string().required("Incorporation is required"), // Assuming incorporation is a dateOfIncorporation type
  // mermat: yup.string().required("Mermat is required"),
  // utilityBill: yup.string().required("Utility Bill is required"),
});

const { handleSubmit, defineField, errors, setFieldValue, setValues } = useForm(
  {
    validationSchema: formSchema,
    initialValues: formData.kyb,
  }
);

const [companyName, companyNameAtt] = defineField("companyName");
const [sector, sectorAtt] = defineField("sector");
const [dateOfIncorporation, dateOfIncorporationAtt] = defineField(
  "dateOfIncorporation"
);
const [companyType, companyTypeAtt] = defineField("companyType");
const [address, addressAtt] = defineField("address");
const [description, descriptionAtt] = defineField("description");

onMounted(() => {
  setValues(company?.value || {});
});
function handleChange(id, value) {
  formData.kyb.companyDocuments.map((i) => {
    if (id === "incorporation" && i.documentType === 0) {
      i.url = value;
    }
    if (id === "mermat" && i.documentType === 1) {
      i.url = value;
    }
    if (id === "description" && i.documentType === 2) {
      i.url = value;
    }
    if (id === "utilitybill" && i.documentType === 2) {
      i.url = value;
    }
  });
}

const onSubmit = handleSubmit((values) => {
 
  if (!authStore.userInfo.onboardingPageStatus) {
    updateCompanyProfile(values).catch(err=>{
      toast.error(err.response.data.message || err.response.data.Message || "Soemthing went wrong, try again later")
    });
    formData.kyb.companyDocuments.some(i=> i.url) && updateDocuments(formData.kyb.companyDocuments).catch(err=>{
      toast.error(err.response.data.message || err.response.data.Message || "Soemthing went wrong, try again later")
    });
  } else {
    active.value = 3;
  }
  formData.kyb = values;
});

const companyTypesOptions = businessTypes?.map((i) => {
  return {
    label: i.sector,
    value: i.sector,
  };
});
const sectorOptions = computed(() => {
  const selectedcompanyType = businessTypes?.find(
    (i) => i.sector === companyType.value
  );
  if (!selectedcompanyType) return []; // Handle case when selected business type is not found

  return (
    selectedcompanyType.subSectors?.map((i) => {
      return {
        label: i.subSectorName,
        value: i.subSectorCode, // Use subSectorCode as the value
      };
    }) ?? []
  ); // Use optional chaining and nullish coalescing operators for safer property access
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
