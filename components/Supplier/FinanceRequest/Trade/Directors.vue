<template>
  <div class="w-full mt-6">
    <form
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
        label="Full Name"
        name="name"
        v-bind="nameAtt"
        v-model="name"
        :error="errors.name"
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

      <div class="md:col-span-2">
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
      <div class="flex itemx-center gap-x-2 mb-6">
        <button
          type="submit"
          class="appearance-none leading-none px-[14px] py-[10px] grid-cols-1 lg:grid-cols-2 gap-4 rounded-lg text-primary-500 border border-primary-500 hover:opacity-70 text-xs"
        >
          <span class=""> + Add another director</span>
        </button>
        <span class="text-[#B9B9B9]">(Optional)</span>
      </div>
    </form>
    <div
      v-if="directors.length"
      class="w-full rounded-[10px] border border-[#EAECF0] overflow-hidden mb-[50px]"
    >
      <table class="w-full">
        <thead>
          <tr>
            <th
              class="capitalize text-[#475467] text-sm text-left font-medium border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
            >
              Name
            </th>
            <th
              class="capitalize text-[#475467] text-sm text-left font-medium border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(director, id) in directors"
            :key="id"
            class="border-b last:border-none"
          >
            <td
              class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap"
            >
              {{ director?.name }}
            </td>
            <td
              class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap"
            >
              <span class="flex gap-x-3 items-center justify-end">
                <span class="p-1"><i class="uil uil-pen"></i></span>
                <span
                  class="p-1"
                  @click="
                    () => {
                      directors.splice(id, 1);
                      selected = null;
                    }
                  "
                  ><i class="uil uil-trash text-red-500"></i
                ></span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex gap-x-4 items-center justify-between">
      <AppButton
        @click="active--"
        btnClass="bg-white text-white !px-11  !text-sm !py-[10px] disabled:cursor-not-allowed border border-[#BDC0C5] !rounded-lg !text-[#333]"
        type="button"
        text="Previous"
      />
      <AppButton
        :disabled="isLoading || !directors.length"
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
  name: "",
  bvn: "",
  email: "",
  phone: "",
  linkedin: "",
  id: "",
  signature: "",
});
const active = inject("active");

const formSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
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
  id: yup.string().required("ID is required"),
  signature: yup.string().required("Signature is required"),
});

const { handleSubmit, defineField, errors, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: formValues,
});

const [name, nameAtt] = defineField("name");
const [bvn, bvnAtt] = defineField("bvn");
const [email, emailAtt] = defineField("email");
const [phone, phoneAtt] = defineField("phone");
const [linkedin, linkedinAtt] = defineField("linkedin");

function handleChange(id, value) {
  setFieldValue(id, value);
}

const formData = inject("formData");
const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ onSubmit ~ values:", values);
  directors.value = [...directors.value, values];
  formData.directors = directors.value;
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
