<template>
  <form @submit.prevent="onSubmit" class="w-full mt-6">
    <div class="grid grid-cols-2 gap-x-[25px] gap-y-4 mb-[50px]">
      <FormGroup
        class="col-span-2"
        label="Bank Statement (6 months statement is required)"
        isCumpulsory
      >
        <div class="grid gap-y-7 mb-4">
          <div
            v-for="(file, idx) in formData?.supportingDocuments[0].urls"
            :key="idx"
          >
            <div class="relative">
              <FileUpload id="BankStatement" v-model="file.url" />
              <button
                v-if="formData?.supportingDocuments[0]?.urls.length > 1"
                type="button"
                class="text-red-500 text-xs font-medium right-0 -top-5 absolute"
                @click="removeField(0, idx)"
              >
                Remove
              </button>
            </div>
            <div class="flex flex-wrap gap-x-4 gap-y-3" v-if="file.url">
              <span @click="downloadFile(file.url, 'BankStatement')">
                <span class="block text-xs text-blue-500 mt-1"
                  >Download Bank Statement {{ idx + 1 }}</span
                ></span
              >
            </div>
          </div>
        </div>
        <div class="mt-1">
          <button
            @click="addField(0)"
            type="button"
            class="block text-primary-500 text-xs font-medium ml-auto"
          >
            + Add document
          </button>
        </div>
      </FormGroup>

      <FormGroup label="Other documents" class="col-span-2">
        <div class="grid gap-y-7 mb-6">
          <div
            v-for="(file, idx) in formData?.supportingDocuments[1].urls"
            :key="idx"
          >
            <div class="relative">
              <FileUpload id="OtherDocuments" v-model="file.url" />
              <button
                v-if="formData?.supportingDocuments[1]?.urls.length > 1"
                type="button"
                class="text-red-500 text-xs font-medium right-0 -top-5 absolute"
                @click="removeField(3, idx)"
              >
                Remove
              </button>
            </div>
            <div class="flex flex-wrap gap-x-4 gap-y-3" v-if="file.url">
              <span @click="downloadFile(file.url, 'Others')">
                <span class="block text-xs text-blue-500 mt-1"
                  >Download Other document {{ idx + 1 }}</span
                ></span
              >
            </div>
          </div>
        </div>
        <div class="mt-1">
          <button
            @click="addField(3)"
            type="button"
            class="block text-primary-500 text-xs font-medium ml-auto"
          >
            + Add document
          </button>
        </div>
      </FormGroup>
    </div>
    <div class="flex gap-x-4 items-center justify-end">
      <AppButton
        btnClass="bg-white text-white !px-11  !text-sm !py-[10px] disabled:cursor-not-allowed border border-[#BDC0C5] !rounded-lg !text-[#333]"
        type="button"
        text="Back"
        @click="active--"
      />
      <AppButton
        :disabled="isLoading || errors?.BankStatement"
        :isLoading="isLoading"
        btnClass="bg-primary-500 text-white !px-12  !text-sm !py-[10px] disabled:cursor-not-allowed border  !rounded-lg border-primary-500"
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

const active = inject("active");
const formData = inject("formData");

const formSchema = yup.object().shape({
  BankStatement: yup.string().required("Bank statement is required").nullable(),
  OtherDocuments: yup.string().nullable(),
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
    BankStatement: "",
    OtherDocuments: "",
  },
});

function addField(id) {
  formData?.supportingDocuments[id].urls.push({
    url: "",
  });
}

function removeField(id, idx) {
  formData?.supportingDocuments[id].urls.splice(idx, 1);
}

const onSubmit = handleSubmit(() => {
  isLoading.value = true;
  formData.supportingDocuments = formData?.supportingDocuments.map((i) => ({
    ...i,
    urls: i.urls.map((j) => j.url),
  }));
  active.value = 5;
});

function handleChange(id, value) {}
watch(
  formData,

  () => {
    setFieldValue(
      "OtherDocuments",
      formData?.supportingDocuments[1].urls.some((i) => !i.url) ? "" : "Valid"
    );
    setFieldValue(
      "BankStatement",
      formData?.supportingDocuments[0].urls.some((i) => !i.url) ? "" : "Valid"
    );
  }
);
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
