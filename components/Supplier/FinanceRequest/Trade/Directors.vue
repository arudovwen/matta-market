<template>
  <div class="w-full mt-6">
    <form
      v-if="!company.directors.length"
      @submit.prevent="onSubmit"
      class="grid grid-cols-2 gap-x-[25px] gap-y-4 mb-6"
    >
      <FormGroup
        label="Select a director from your profile or add a new director"
        name="selected"
        class="col-span-2"
      >
        <Select
          v-model="selected"
          :options="directorOptions"
          placeholder="Select director"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer`"
        />
      </FormGroup>
      <Textinput
        placeholder=""
        label="First Name"
        name="firstName"
        v-bind="firstNameAtt"
        v-model="firstName"
        :error="errors.firstName"
      />
      <Textinput
        placeholder=""
        label="Last Name"
        name="lastName"
        v-bind="lastNameAtt"
        v-model="lastName"
        :error="errors.lastName"
      />

      <Textinput
        placeholder=""
        label="bvn"
        name="bvn"
        v-bind="bvnAtt"
        v-model="bvn"
        :error="errors.bvn"
      />

      <Textinput
        placeholder=""
        label="Email"
        name="email"
        v-bind="emailAtt"
        v-model="email"
        :error="errors.email"
      />

      <Textinput
        placeholder=""
        label="Phone number"
        name="phone"
        v-bind="phoneAtt"
        v-model="phone"
        :error="errors.phone"
      />

      <div class="">
        <Textinput
          placeholder=""
          label="Linkedin"
          name="linkedin"
          v-bind="linkedinAtt"
          v-model="linkedin"
          :error="errors.linkedin"
        />
      </div>

      <FormGroup :error="errors.id" class="col-span-2">
        <FileUpload
          label="Upload ID (Passport, Driver’s License, or NIN)"
          id="id"
        />
      </FormGroup>
      <FormGroup :error="errors.signature" class="col-span-2">
        <FileUpload label="Upload Signature" id="signature" />
      </FormGroup>
      <div class="flex items-center gap-x-2 mb-6">
        <button
          type="submit"
          class="appearance-none leading-none px-[14px] py-[10px] grid-cols-1 lg:grid-cols-2 gap-4 rounded-lg text-primary-500 border border-primary-500 hover:opacity-70 text-xs"
        >
          <span class=""> + Add director</span>
        </button>
        <span class="text-[#B9B9B9]">(Optional)</span>
      </div>
    </form>
    <div class="mb-8">
      <DirectorsView
        v-if="company.directors.length"
        :directors="company.directors"
        :companyInfo="company"
      />
      <DirectorsView
        v-else
        :directors="directors"
        :companyInfo="company"
        @handleDelete="handleDelete"
        @handleEdit="handleEdit"
      />
    </div>
    <div class="flex gap-x-4 items-center justify-between">
      <AppButton
        @click="active--"
        btnClass="bg-white text-white !px-11  !text-sm !py-[10px] disabled:cursor-not-allowed border border-[#BDC0C5] !rounded-lg !text-[#333]"
        type="button"
        text="Previous"
      />
      <AppButton
        :disabled="
          isLoading || (!directors.length && !company.directors.length)
        "
        @click="handleNext"
        :isLoading="isLoading"
        btnClass="bg-primary-500 text-white !px-16  !text-sm !py-[10px] disabled:cursor-not-allowed border  !rounded-lg border-primary-500"
        type="button"
        text="Next"
      />
    </div>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";

const company = inject("company");
const directorOptions = ref(
  company.value.directors.map((i) => ({
    label: `${i.firstName} ${i.lastName}`,
    value: JSON.stringify({
      ...i,
      name: `${i.firstName} ${i.lastName}`,
    }),
  }))
);

const selected = ref(null);
const isLoading = ref(false);
const directors = ref([]);
const formValues = reactive({
  lastName: "",
  firstName: "",
  bvn: "",
  email: "",
  phone: "",
  linkedin: "",
  id: "",
  signature: "",
});
const active = inject("active");

const formSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  bvn: yup
    .string()
    .required("BVN is required")
    .matches(/^\d{11}$/, "BVN must be 11 digits"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  phone: yup
    .string()
    .required("Phone Number is required")
    .matches(/^\d{11}$/, "Phone Number must be 11 digits"),
  linkedin: yup.string().url("Invalid LinkedIn URL"),
  // id: yup.string().required("ID is required"),
  // signature: yup.string().required("Signature is required"),
});

const {
  handleSubmit,
  defineField,
  errors,
  setFieldValue,
  resetForm,
  setValues,
} = useForm({
  validationSchema: formSchema,
  initialValues: formValues,
});

const [lastName, lastNameAtt] = defineField("lastName");
const [firstName, firstNameAtt] = defineField("firstName");
const [bvn, bvnAtt] = defineField("bvn");
const [email, emailAtt] = defineField("email");
const [phone, phoneAtt] = defineField("phone");
const [linkedin, linkedinAtt] = defineField("linkedin");

function handleDelete(id) {
  
  directors.value = directors.value.filter((i, index) => index !== id);
}
function handleEdit(id, director) {

  setValues(director);
  directors.value = directors.value.filter((i, index) => index !== id);
}
function handleChange(id, value) {
  setFieldValue(id, value);
}

const formData = inject("formData");
const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ onSubmit ~ values:", values);
  directors.value = [...directors.value, values];
  formData.directors = directors.value;
  resetForm();
});
const handleNext = () => {
  active.value = 4;
};

watch(
  () => selected.value,
  () => {
    console.log("🚀 ~ watch ~ selected:", selected.value);
    if (selected.value) {
      directors.value = [...directors.value, JSON.parse(selected.value)];
      formData.directors = directors.value;
    }
  }
);
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
