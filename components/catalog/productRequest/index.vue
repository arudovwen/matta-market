<template>
  <div class="bg-white flex-1">
    <form
      @submit.prevent="onSubmit"
      class="h-full max-w-[600px] mx-auto border p-8 rounded-lg border-[#B2DDFF]"
    >
      <h4 class="text-2xl font-semibold text-left mb-7">Request a product</h4>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Textinput
            placeholder=""
            label="Full name"
            name="email"
            v-bind="fullNameAtt"
            v-model="fullName"
            :error="errors.fullName"
          />
        </div>
        <div>
          <Textinput
            placeholder=""
            label="Business name"
            name="businessName"
            v-bind="businessNameAtt"
            v-model="businessName"
            :error="errors.businessName"
          />
        </div>
        <div>
          <Textinput
            placeholder=""
            label="Email"
            type="email"
            name="email"
            v-bind="emailAtt"
            v-model="email"
            :error="errors.email"
          />
        </div>
        <div>
          <FormGroup name="phone" label="Phone number" :error="errors.phone">
            <FormsPhoneCodes v-model="phone" />
          </FormGroup>
        </div>
        <div>
          <Textinput
            placeholder=""
            label="Chemical name"
            name="chemicalName"
            v-bind="chemicalNameAtt"
            v-model="chemicalName"
            :error="errors.chemicalName"
          />
        </div>
        <div>
          <Textinput
            placeholder=""
            label="Unit price"
            name="unit"
            v-bind="unitAtt"
            v-model="unit"
            :error="errors.unit"
            ><template #suffix>
              <span>tonne</span>
            </template></Textinput
          >
        </div>

        <div class="md:col-span-2">
          <Textinput
            placeholder=""
            label="What do you want to use it for?"
            name="usage"
            v-bind="usageAtt"
            v-model="usage"
            :error="errors.usage"
          />
        </div>
        <div class="mb-6 md:col-span-2">
          <FileUpload
            label="Select file to upload"
            id="uploadedDocumentUrl"
            v-model="uploadedDocumentUrl"
          />
        </div>
      </div>
      <div class="flex justify-center">
        <button
          type="submit"
          :disabled="isLoading"
          class="border text-[13px] mb-4 border-primary- uppercase text-white w-full lg:min-w-[150px] mx-auto bg-primary-500 rounded-lg px-6 py-2 hover:bg-primary/80 h-11"
        >
          <span>
            <span
              class="flex gap-x-4 justify-center items-center"
              v-if="isLoading || isUploading"
              ><span> Processing...</span>
              <i
                v-if="isLoading"
                class="fa fa-spinner fa-spin text-white"
                aria-hidden="true"
              ></i
            ></span>
            <span v-else>Submit request</span>
          </span>
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
import { createproductrequest } from "~/services/productservices";
import { uploaddocument } from "~/services/onboardingservices";
import { toast } from "vue3-toastify";

const isComplete = ref(false);

const store = useStore();

const form = reactive({
  fullName: "",
  businessName: "",
  email: store.getters.loggedUser?.email || "",
  phone: store.getters.loggedUser?.phoneNumber || "",
  address: "",
  uploadedDocumentUrl: "",
  chemicalName: "",
  quantity: "",
  confirm: false,
  unit: "",
  usage: "",
  phoneCode: "+234",
});
const validationSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  businessName: yup.string().required("Business name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  uploadedDocumentUrl: yup.string(),
  chemicalName: yup.string().required("Chemical name is required"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .positive("Quantity must be positive"),
  confirm: yup.boolean().oneOf([true], "Please confirm before submitting"),
  unit: yup.string().required("Unit is required"),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: validationSchema,
  initialValues: form,
});

const [fullName, fullNameAtt] = defineField("fullName");
const [businessName, businessNameAtt] = defineField("businessName");
const [email, emailAtt] = defineField("email");
const [phone] = defineField("phone");
const [usage, usageAtt] = defineField("usage");
const [uploadedDocumentUrl, uploadedDocumentUrlAtt] = defineField(
  "uploadedDocumentUrl"
);
const [chemicalName, chemicalNameAtt] = defineField("chemicalName");
const [unit, unitAtt] = defineField("unit");

const isLoading = ref(false);
const isUploading = ref(false);

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve(reader.result.replace("data:", "").replace(/^.+,/, ""));
    reader.onerror = reject;
  });

const onSubmit = handleSubmit((values) => {
  createproductrequest(form)
    .then((res) => {
      if (res.status === 200) {
        isComplete.value = true;
        isLoading.value = false;
      }
    })

    .catch((err) => {
      isLoading.value = false;

      toast.error(err?.response?.data?.message || err?.response?.data?.Message);
    });
});
provide("isComplete", isComplete);
provide("handleChange", null);
</script>
