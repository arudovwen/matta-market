<template>
  <form @submit.prevent="onSubmit" class="w-full mt-6">
    <div class="grid grid-cols-2 gap-x-[25px] gap-y-4 mb-[50px]">
      <div class="md:col-span-2">
        <Textinput
          placeholder=""
          label="Company name"
          name="companyName"
          v-bind="companyNameAtt"
          v-model="companyName"
          :error="errors.companyName"
          :isCumpulsory="true"
        />
      </div>
      <Textinput
        placeholder=""
        label="Email"
        name="email"
        v-bind="emailAtt"
        v-model="email"
        :error="errors.email"
        disabled
        :isCumpulsory="true"
      />
      <FormGroup
        label="Phone number"
        name="phone"
        :error="errors.phone"
        :isCumpulsory="true"
      >
        <FormsPhoneCodes v-model="phone" />
      </FormGroup>
      <FormGroup
        :isCumpulsory="true"
        label="Country"
        :error="errors.country"
        name="sector"
      >
        <SelectVueSelect
          :options="allcountries"
          v-model.value="country"
          :reduce="(country) => country.value"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.country ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>
      <FormGroup
        :isCumpulsory="true"
        label="State"
        :error="errors.state"
        name="state"
      >
        <SelectVueSelect
          :options="mystates"
          :reduce="(state) => state.value"
          v-model="state"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.state ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>

      <FormGroup
        label="Date of incorporation"
        name="dateofIncorporation"
        :error="errors.dateofIncorporation"
        :isCumpulsory="true"
      >
        <ClientOnly>
          <VueDatePicker
            auto-apply
            v-model="dateofIncorporation"
            placeholder="Select date"
            :enable-time-picker="false"
            :input-class-name="`!rounded-lg px-[14px] py-[10px] h-11 w-full border  placeholder:text-[#B6B7B9] focus:outline-matta-black/20
                        border-[#DCDEE6]`"
          />
        </ClientOnly>
      </FormGroup>

      <FormGroup
        label="Business type"
        :error="errors.companyType"
        name="companyType"
        :isCumpulsory="true"
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

      <FormGroup
        :isCumpulsory="true"
        label="Sector"
        :error="errors.sector"
        name="sector"
      >
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

      <Textinput
        v-if="country?.toLowerCase() === 'nigeria'"
        placeholder=""
        label="CAC Registration number"
        name="registrationNo"
        v-bind="registrationNoAtt"
        v-model="registrationNo"
        :error="errors.registrationNo"
      />
      <Textinput
        v-if="country?.toLowerCase() === 'nigeria'"
        placeholder=""
        label="TIN number"
        name="tin"
        v-bind="tinAtt"
        v-model="tin"
        :error="errors.tin"
        :isCumpulsory="true"
      />
      <div>
        <Textinput
          :isCumpulsory="true"
          placeholder=""
          label="City"
          name="city"
          v-bind="cityAtt"
          v-model="city"
          :error="errors.city"
        />
      </div>
      <div class="md:col-span-2">
        <Textinput
          :isCumpulsory="true"
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
          :isCumpulsory="true"
          placeholder=""
          label="Brief description of the company"
          name="description"
          v-bind="descriptionAtt"
          v-model="description"
          :error="errors.description"
        />
      </div>
      <div class="md:col-span-2 mt-6">
        <label
          for="companyDocuments"
          class="mb-4 mt-3 font-medium text-sm block"
          >Upload the documents listed in the dropdown below
        </label>

        <div class="grid gap-y-[25px]" v-if="companyDocuments">
          <div v-for="(doc, index) in companyDocuments" :key="index">
            <FormGroup
              :isCumpulsory="true"
              formClass="col-span-2 grid grid-cols-1 gap-y-4"
              :errors="doc?.urls.some((i) => !i.url) && errors.companyDocuments"
            >
              <div
                v-for="(file, idx) in doc?.urls"
                :key="idx"
                class="mb-4 last:mb-0"
              >
                <div class="relative">
                  <FileUpload
                    :label="documentsOptions[index].title"
                    :id="documentsOptions[index].short"
                    :isCumpulsory="true"
                    v-model="file.url"
                  />
                  <button
                    v-if="doc?.urls.length > 1"
                    type="button"
                    class="text-red-500 text-xs font-medium right-0 top-2 absolute"
                    @click="removeField(index, idx)"
                  >
                    Remove
                  </button>
                </div>
                <div class="flex flex-wrap gap-x-4 gap-y-3" v-if="file.url">
                  <span @click="downloadFile(file.url, 'Mermat')">
                    <span class="block text-xs text-blue-500 mt-1"
                      >Download {{ documentsOptions[index].short }}
                      {{ idx + 1 }}</span
                    ></span
                  >
                </div>
              </div>
              <div>
                <button
                  @click="addField(index)"
                  type="button"
                  class="block text-primary-500 text-xs font-medium ml-auto"
                >
                  + Add document
                </button>
              </div>
            </FormGroup>
          </div>
        </div>

        <!-- <div class="w-full">
          <div class="flex items-center gap-x-3 w-full">
            <SelectVueSelect
              v-model="selectedDocument"
              :options="options"
              :reduce="(option) => option.value"
              placeholder="Select document type"
              classInput="flex-1 w-full"
              :clearable="false"
            />
            <AppButton
              :disabled="!selectedDocument"
              :isLoading="isLoading"
              btnClass="bg-primary-500  text-white !px-12 !text-sm !py-[10px] disabled:cursor-not-allowed border !rounded-lg border-primary-500"
              type="button"
              text="Upload"
            />
          </div>
        </div> -->
      </div>
    </div>
    <div class="flex gap-x-4 items-center justify-end">
      <AppButton
        @click="active--"
        btnClass="bg-white text-white !px-11  !text-sm !py-[10px] disabled:cursor-not-allowed border border-[#BDC0C5] !rounded-lg !text-[#333]"
        type="button"
        text="Back"
      />
      <AppButton
        :disabled="
          isLoading ||
          (country.toLowerCase() === 'nigeria' && (!registrationNo || !tin))
        "
        :isLoading="isLoading"
        btnClass="bg-primary-500
      text-white !px-12 !text-sm !py-[10px] disabled:cursor-not-allowed border
      !rounded-lg border-primary-500"
        type="submit"
        text="Next"
      />
    </div>
  </form>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import CountryList from "country-list-with-dial-code-and-flag";
import countries from "~/utils/countries.json";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { businessTypes } from "~/utils/constants.js";
import {
  updateCompanyProfile,
  updateDocuments,
} from "~/services/settingservices";
import { toast } from "vue3-toastify";

const company = inject("company");
const formData = inject("formData");
const isLoading = ref(false);
const selectedDocument = ref(null);
const active = inject("active");
const authStore = useAuthStore();
const formSchema = yup.object().shape({
  companyName: yup.string().required("Company Name is required"),
  sector: yup.string().required("Sector is required"),
  dateofIncorporation: yup
    .date()
    .typeError("Invalid date Of Incorporation")
    .nullable()
    .max(new Date(), "Date Of Incorporation cannot be after today")
    .required("Date Of Incorporation is required"),
  companyType: yup.string().required("Business Type is required"),
  address: yup.string().required("Address is required"),
  description: yup.string().nullable(),
  companyDocuments: yup.array().of(
    yup.object().shape({
      urls: yup
        .array()
        .of(
          yup.object().shape({
            url: yup.string().required("At least 1 document is required"),
          })
        )
        .min(1, "At least 1 document is required")
        .required("At least 1 document is required"),
    })
  ),

  country: yup.string().required(),
  state: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  city: yup.string().required(),
  registrationNo: yup.string().when("country", {
    is: "Nigeria",
    then: (schema) =>
      schema
        .min(7, "Provide a valid number")
        .required("CAC Registration number is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  tin: yup.string().when("country", {
    is: "Nigeria",
    then: (schema) => schema.required("TIN is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
const options = [
  {
    label: "Company profile",
    value: 4,
  },
  {
    label: "Certificate of Incorporations",
    value: 0,
  },
  {
    label: "Memorandum and Articles of Association",
    value: 1,
  },
  {
    label: "CAC Status Report",
    value: 2,
  },
  {
    label: "Utility Bill",
    value: 3,
  },
];
const {
  handleSubmit,
  defineField,
  errors,
  setFieldValue,
  setValues,
  isFieldTouched,
} = useForm({
  validationSchema: formSchema,
  initialValues: formData.kyb,
});

const [companyDocuments] = defineField("companyDocuments");
const [companyName, companyNameAtt] = defineField("companyName");
const [registrationNo, registrationNoAtt] = defineField("registrationNo");
const [tin, tinAtt] = defineField("tin");
const [sector] = defineField("sector");
const [email, emailAtt] = defineField("email");
const [phone] = defineField("phone");
const [dateofIncorporation] = defineField("dateofIncorporation");
const [companyType] = defineField("companyType");
const [address, addressAtt] = defineField("address");
const [description, descriptionAtt] = defineField("description");
const [country] = defineField("country");
const [state] = defineField("state");
const [city, cityAtt] = defineField("city");
const allcountries = computed(() => {
  return CountryList.map((item) => {
    return {
      id: "",
      label: `${item.name}`,
      value: item.name,
    };
  });
});
const getCompanyData = inject("getCompanyData");

const states = computed(() => {
  if (!country.value) return [];
  return countries.find(
    (item) => item.name.toLowerCase() == country.value?.toLowerCase()
  )?.states;
});

const mystates = computed(() => {
  return states.value?.map((item) => {
    return {
      id: item.code,
      label: item.name,
      value: item.name,
    };
  });
});

onMounted(() => {
  setValues({ ...company?.value, ...formData.kyb } || {});
});
function handleChange(id, value) {}

function addField(id) {
  companyDocuments?.value[id].urls.push({
    url: "",
  });
}

function removeField(id, idx) {
  companyDocuments?.value[id].urls.splice(idx, 1);
}

watch(country, () => {
  if (country?.value?.toLowerCase() !== "nigeria") {
    setFieldValue(
      "companyDocuments",
      formData.kyb?.companyDocuments?.filter((i) => i.documentType === 0)
    );
  } else {
    setFieldValue("companyDocuments", [
      ...formData.kyb?.companyDocuments,
      {
        urls: [
          {
            url: "",
          },
        ],
        documentType: 1,
      },
      {
        urls: [
          {
            url: "",
          },
        ],
        documentType: 2,
      },
      {
        urls: [
          {
            url: "",
          },
        ],
        documentType: 3,
      },
    ]);
  }
});

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  updateCompanyProfile({
    ...values,
    companyDocuments: values.companyDocuments.map((i) => ({
      ...i,
      urls: i.urls.map((j) => j.url),
    })),
  })
    .then((res) => {
      if (res.status === 200) {
        updateDocuments({
          companyDocuments: values.companyDocuments.map((i) => ({
            ...i,
            urls: i.urls.map((j) => j.url),
          })),
        })
          .then((res) => {
            isLoading.value = false;
          })
          .catch((err) => {
            isLoading.value = false;
            toast.error(
              err?.response?.data?.message ||
                err?.response?.data?.Message ||
                "Something went wrong, try again later"
            );
          });
        // }
        active.value = 3;
      }
      getCompanyData();
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.Message ||
          "Something went wrong, try again later"
      );
    });

  // formData.kyb = values;
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
        value: i.subSectorName, // Use subSectorCode as the value
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
