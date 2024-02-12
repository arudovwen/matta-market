<template>
  <form @submit.prevent="onSubmit" class="w-full mt-6">
    <div class="grid grid-cols-2 gap-x-[25px] gap-y-4 mb-[50px]">
      <FormGroup :error="errors.bankStatement" class="col-span-2">
        <FileUpload label="Bank Statement" id="BankStatement" />
      </FormGroup>
      <FormGroup :error="errors.proformaInvoice" class="col-span-2">
        <FileUpload label="Proforma Invoice" id="ProformaInvoice" />
      </FormGroup>
      <FormGroup
        :error="errors.other"
        class="col-span-2"
        v-if="id == 1 || id == 3"
      >
        <FileUpload
          label="Evidence of previously successful supply contracts (PO and Paid Invoices)"
          id="EvidenceOfPreviouslySuccessfulSupplyContracts"
        />
      </FormGroup>
      <FormGroup :error="errors.other" class="col-span-2">
        <FileUpload label="Other documents" id="OtherDocuments" />
      </FormGroup>

      <div class="md:col-span-2" v-if="id == 0 || id == 3">
        <Textinput
          placeholder=""
          label="Have you done business with the buyer before?"
          name="haveyoudonebusiness"
          v-bind="haveyoudonebusinessAtt"
          v-model="haveyoudonebusiness"
          :error="errors.haveyoudonebusiness"
        />
      </div>
      <div class="md:col-span-2" v-if="id == 0 || id == 3">
        <Textinput
          placeholder=""
          label="Have you previously exported to the order’s country of destination?"
          name="haveyouexportedtotheothercourty"
          v-bind="haveyouexportedtotheothercourtyAtt"
          v-model="haveyouexportedtotheothercourty"
          :error="errors.haveyouexportedtotheothercourty"
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
import { toast } from "vue3-toastify";
import { addFinance, editFinance } from "~/services/financeservice";

const isLoading = ref(false);
const route = useRoute();
const { id, financeId } = route.params;
const formValues = reactive({
  haveyouexportedtotheothercourty: "",
  haveyoudonebusiness: "",
  OtherDocuments: "",
  BankStatement: "",
  ProformaInvoice: "",
  EvidenceOfPreviouslySuccessfulSupplyContracts: "",
});
const active = inject("active");
const formData = inject("formData");
const formSchema = yup.object().shape({
  haveyouexportedtotheothercourty: yup.string(),
  haveyoudonebusiness: yup.string(),
});

const { handleSubmit, defineField, errors, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: formData.documents,
});

const [haveyoudonebusiness, haveyoudonebusinessAtt] = defineField(
  "haveyoudonebusiness"
);
const [haveyouexportedtotheothercourty, haveyouexportedtotheothercourtyAtt] =
  defineField("haveyouexportedtotheothercourty");

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  formData.haveyoudonebusiness = values.haveyoudonebusiness;
  formData.haveyouexportedtotheothercourty =
    values.haveyouexportedtotheothercourty;
  if (financeId) {
    editFinance({ ...formData, id: financeId })
      .then((res) => {
        if (res.status === 200) {
          active.value = 5;
          isLoading.value = false;
        }
      })
      .catch((err) => {
        toast.error(err.response.data.Message || err.response.data.message);
        isLoading.value = false;
      });
  } else {
    addFinance(formData)
      .then((res) => {
        if (res.status === 200) {
          active.value = 5;
          isLoading.value = false;
        }
      })
      .catch((err) => {
        toast.error(err.response.data.Message || err.response.data.message);
        isLoading.value = false;
      });
  }
});

function handleChange(id, value) {
  formData.supportingDocuments.map((i) => {
    setFieldValue(id, value);
    if (id === "BankStatement" && i.documentType === 0) {
      i.url = value;
    }
    if (id === "ProformaInvoice" && i.documentType === 1) {
      i.url = value;
    }
    if (
      id === "EvidenceOfPreviouslySuccessfulSupplyContracts" &&
      i.documentType === 2
    ) {
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
