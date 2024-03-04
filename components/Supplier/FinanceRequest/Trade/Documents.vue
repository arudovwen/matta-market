<template>
  <form @submit.prevent="onSubmit" class="w-full mt-6">
    <div class="grid grid-cols-2 gap-x-[25px] gap-y-4 mb-[50px]">
      <FormGroup
        :error="isFieldTouched('BankStatement') ? errors.BankStatement : ''"
        class="col-span-2"
        label="Bank Statement"
        required
      >
        <FileUpload id="BankStatement" />
        <span
          @click="
            downloadFile(formData?.supportingDocuments[0]?.url, 'BankStatement')
          "
          v-if="formData?.supportingDocuments[0]?.url"
        >
          <span class="block text-xs text-blue-500 mt-1"
            >Download Bank Statement</span
          ></span
        >
      </FormGroup>

      <FormGroup
        :error="isFieldTouched('ProformaInvoice') ? errors.ProformaInvoice : ''"
        class="col-span-2"
        label="Proforma Invoice"
        required
      >
        <FileUpload id="ProformaInvoice" />
        <span
          @click="
            downloadFile(
              formData?.supportingDocuments[1]?.url,
              'ProformaInvoice'
            )
          "
          v-if="formData?.supportingDocuments[1]?.url"
        >
          <span class="block text-xs text-blue-500 mt-1"
            >Download Proforma Invoice</span
          ></span
        >
      </FormGroup>
      <FormGroup
        label="Evidence of previously successful supply contracts (PO and Paid Invoices)"
        :error="
          isFieldTouched('EvidenceOfPreviouslySuccessfulSupplyContracts')
            ? errors.EvidenceOfPreviouslySuccessfulSupplyContracts
            : ''
        "
        class="col-span-2"
        v-if="id == 1 || id == 3"
        required
      >
        <FileUpload id="EvidenceOfPreviouslySuccessfulSupplyContracts" />
        <span
          @click="
            downloadFile(
              formData?.supportingDocuments[2]?.url,
              'EvidenceOfPreviouslySuccessfulSupplyContracts'
            )
          "
          v-if="formData?.supportingDocuments[2]?.url"
        >
          <span class="block text-xs text-blue-500 mt-1"
            >Download Evidence Of Previously Successful Supply Contracts</span
          ></span
        >
      </FormGroup>
      <FormGroup
        label="Other documents"
        :error="isFieldTouched('OtherDocuments') ? errors.OtherDocuments : ''"
        class="col-span-2"
      >
        <FileUpload id="OtherDocuments" />
        <span
          @click="downloadFile(formData?.supportingDocuments[3]?.url, 'Others')"
          v-if="formData?.supportingDocuments[3]?.url"
        >
          <span class="block text-xs text-blue-500 mt-1"
            >Download Others</span
          ></span
        >
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
        text="Submit"
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

const active = inject("active");
const formData = inject("formData");
const formSchema = yup.object().shape({
  haveyouexportedtotheothercourty: yup.string(),
  haveyoudonebusiness: yup.string(),
  EvidenceOfPreviouslySuccessfulSupplyContracts: yup.string(),
  ProformaInvoice: yup.string().required("Proforma Invoice is required"),
  BankStatement: yup.string().required("Bank statement is required"),
  OtherDocuments: yup.string(),
});

const {
  handleSubmit,
  defineField,
  errors,
  setFieldValue,
  setFieldTouched,
  isFieldTouched,
} = useForm({
  validationSchema: formSchema,
  initialValues: {
    haveyouexportedtotheothercourty: formData.haveyouexportedtotheothercourty,
    haveyoudonebusiness: formData.haveyoudonebusiness,
    EvidenceOfPreviouslySuccessfulSupplyContracts:
      formData?.supportingDocuments[2]?.url || "",
    ProformaInvoice: formData?.supportingDocuments[1]?.url || "",
    BankStatement: formData?.supportingDocuments[0]?.url || "",
    OtherDocuments: formData?.supportingDocuments[3]?.url || "",
  },
});

const [haveyoudonebusiness, haveyoudonebusinessAtt] = defineField(
  "haveyoudonebusiness"
);
const [haveyouexportedtotheothercourty, haveyouexportedtotheothercourtyAtt] =
  defineField("haveyouexportedtotheothercourty");
const [BankStatement, BankStatementAtt] = defineField("haveyoudonebusiness");
const [ProformaInvoice, ProformaInvoiceAtt] = defineField(
  "haveyouexportedtotheothercourty"
);
const [OtherDocuments, OtherDocumentsAtt] = defineField("haveyoudonebusiness");
const [
  EvidenceOfPreviouslySuccessfulSupplyContracts,
  EvidenceOfPreviouslySuccessfulSupplyContractsAtt,
] = defineField("haveyouexportedtotheothercourty");

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
  if (!value) return;
  setFieldValue(id, value);
  setFieldTouched(id, value);

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
