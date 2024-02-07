<template>
  <form @submit.prevent="onSubmit" class="w-full mt-6">
    <div class="grid grid-cols-2 gap-x-[25px] gap-y-4 mb-[50px]">
      <FormGroup :error="errors.bankStatement" class="col-span-2">
        <FileUpload label="Bank Statement" id="BankStatement" />
      </FormGroup>
      <FormGroup :error="errors.proformaInvoice" class="col-span-2">
        <FileUpload label="Proforma Invoice" id="ProformaInvoice" />
      </FormGroup>
      <FormGroup :error="errors.other" class="col-span-2">
        <FileUpload
          label="Evidence of previously successful supply contracts (PO and Paid Invoices)"
          id="EvidenceOfPreviouslySuccessfulSupplyContracts"
        />
      </FormGroup>
      <FormGroup :error="errors.other" class="col-span-2">
        <FileUpload label="Other documents" id="OtherDocuments" />
      </FormGroup>

      <div class="md:col-span-2">
        <Textinput
          placeholder=""
          label="Have you done business with the buyer before?"
          name="doneBusiness"
          v-bind="doneBusinessAtt"
          v-model="doneBusiness"
          :error="errors.doneBusiness"
        />
      </div>
      <div class="md:col-span-2">
        <Textinput
          placeholder=""
          label="Have you previously exported to the order’s country of destination?"
          name="previousExport"
          v-bind="previousExportAtt"
          v-model="previousExport"
          :error="errors.previousExport"
        />
      </div>
    </div>
    <div class="flex gap-x-4 items-center justify-between">
      <AppButton
        btnClass="bg-white text-white !px-11  !text-sm !py-[10px] disabled:cursor-not-allowed border border-[#BDC0C5] !rounded-lg !text-[#333]"
        type="button"
        text="Previous"
        @click="active--"
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

const isLoading = ref(false);
const formValues = reactive({
  previousExport: "",
  doneBusiness: "",
  OtherDocuments: "",
  BankStatement: "",
  ProformaInvoice: "",
  EvidenceOfPreviouslySuccessfulSupplyContracts: "",
});
const active = inject("active");
const formData = inject("formData");
const formSchema = yup.object().shape({
  previousExport: yup.string().required("Previous Export is required"),
  doneBusiness: yup.string().required("Previous Business is required"),
});

const { handleSubmit, defineField, errors, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: formData.documents,
});

const [doneBusiness, doneBusinessAtt] = defineField("doneBusiness");
const [previousExport, previousExportAtt] = defineField("previousExport");

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ onSubmit ~ values:", values);
  formData.documents = values;
  active.value = 5;
});

const options = [
  {
    label: "1 month",
    value: 0,
  },
  {
    label: "3 month",
    value: 1,
  },
];
function handleChange(id, value) {
  form.kyb.companyDocuments.map((i) => {
    setFieldValue(id, value)
    if (id === "BankStatement" && i.documentType === 0) {
      i.url = value;
    }
    if (id === "ProformaInvoice" && i.documentType === 1) {
      i.url = value;
    }
    if (id === "EvidenceOfPreviouslySuccessfulSupplyContracts" && i.documentType === 2) {
      i.url = value;
    }
    if (id === "OtherDocuments" && i.documentType === 3) {
      i.url = value;
    }
  });
}
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
