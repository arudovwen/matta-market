<template>
  <form @submit.prevent="onSubmit" class="w-full mt-6">
    <div class="grid grid-cols-2 gap-x-[25px] gap-y-4 mb-[50px]">
      <FormGroup
        :error="isFieldTouched('BankStatement') ? errors.BankStatement : ''"
        class="col-span-2"
        label="Bank Statement"
        isCumpulsory
      >
        <FileUpload id="BankStatement" :multiple="true" />
        <div
          class="flex flex-wrap gap-x-4 gap-y-3"
          v-if="formData?.supportingDocuments[0]?.urls?.length"
        >
          <span
            v-for="(file, idx) in formData?.supportingDocuments[0]?.urls"
            :key="file"
            @click="downloadFile(file, 'BankStatement')"
          >
            <span class="block text-xs text-blue-500 mt-1"
              >Download Bank Statement {{ idx + 1 }}</span
            ></span
          >
        </div>
      </FormGroup>

      <FormGroup
        :error="isFieldTouched('ProformaInvoice') ? errors.ProformaInvoice : ''"
        class="col-span-2"
        label="Proforma Invoice"
        isCumpulsory
      >
        <FileUpload id="ProformaInvoice" :multiple="true" />
        <div
          class="flex flex-wrap gap-x-4 gap-y-3"
          v-if="formData?.supportingDocuments[1]?.urls?.length"
        >
          <span
            v-for="(file, idx) in formData?.supportingDocuments[1]?.urls"
            :key="file"
            @click="downloadFile(file, 'ProformaInvoice')"
          >
            <span class="block text-xs text-blue-500 mt-1"
              >Download Proforma Invoice {{ idx + 1 }}</span
            ></span
          >
        </div>
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
        isCumpulsory
      >
        <FileUpload
          id="EvidenceOfPreviouslySuccessfulSupplyContracts"
          :multiple="true"
        />
        <div
          class="flex flex-wrap gap-x-4 gap-y-3"
          v-if="formData?.supportingDocuments[2]?.urls?.length"
        >
          <span
            v-for="(file, idx) in formData?.supportingDocuments[2]?.urls"
            :key="file"
            @click="
              downloadFile(
                file,
                'EvidenceOfPreviouslySuccessfulSupplyContracts'
              )
            "
          >
            <span class="block text-xs text-blue-500 mt-1"
              >Download Contract {{ idx + 1 }}</span
            ></span
          >
        </div>
      </FormGroup>
      <FormGroup
        label="Other documents"
        :error="isFieldTouched('OtherDocuments') ? errors.OtherDocuments : ''"
        class="col-span-2"
      >
        <FileUpload id="OtherDocuments" :multiple="true" />
        <div
          class="flex flex-wrap gap-x-4 gap-y-3"
          v-if="formData?.supportingDocuments[3]?.urls?.length"
        >
          <span
            v-for="(file, idx) in formData?.supportingDocuments[3]?.urls"
            :key="file"
            @click="downloadFile(file, 'Others')"
          >
            <span class="block text-xs text-blue-500 mt-1"
              >Download Other document {{ idx + 1 }}</span
            ></span
          >
        </div>
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
  EvidenceOfPreviouslySuccessfulSupplyContracts: yup.array(),
  ProformaInvoice: yup.array().required("Proforma Invoice is required"),
  BankStatement: yup.array().required("Bank statement is required"),
  OtherDocuments: yup.array(),
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
      formData?.supportingDocuments[2]?.urls || [],
    ProformaInvoice: formData?.supportingDocuments[1]?.urls || [],
    BankStatement: formData?.supportingDocuments[0]?.urls || [],
    OtherDocuments: formData?.supportingDocuments[3]?.urls || [],
  },
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

  if (!value) return;
  setFieldValue(id, value);
  setFieldTouched(id, value);

  formData.supportingDocuments.map((i) => {
    setFieldValue(id, value);
    if (id === "BankStatement" && i.documentType === 0) {
      i.urls = value;
    }
    if (id === "ProformaInvoice" && i.documentType === 1) {
      i.urls = value;
    }
    if (
      id === "EvidenceOfPreviouslySuccessfulSupplyContracts" &&
      i.documentType === 2
    ) {
      i.urls = value;
    }
    if (id === "OtherDocuments" && i.documentType === 3) {
      i.urls = value;
    }
  });
}
provide("handleChange", handleChange);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: urls("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
