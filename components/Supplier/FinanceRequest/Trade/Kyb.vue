<template>
  <form @submit.prevent="onSubmit" class="w-full mt-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-[25px] gap-y-4 mb-6">
      <Textinput
        placeholder=""
        label="Company name"
        name="companyName"
        v-bind="companyNameAtt"
        v-model="companyName"
        :error="errors.companyName"
        :isCumpulsory="true"
      />

      <FormGroup
        label="Date of incorporation"
        name="dateOfIncorporation"
        :error="errors.dateOfIncorporation"
        :isCumpulsory="true"
      >
        <ClientOnly>
          <VueDatePicker
            auto-apply
            v-model="dateOfIncorporation"
            placeholder="Select date"
            :enable-time-picker="false"
            :input-class-name="`!rounded-lg px-[14px] py-[10px] h-11 w-full border  placeholder:text-[#B6B7B9] focus:outline-matta-black/20
                        border-[#DCDEE6]`"
          />
        </ClientOnly>
      </FormGroup>
      <Textinput
        placeholder=""
        label="Email address"
        name="companyEmail"
        v-bind="emailAtt"
        v-model="companyEmail"
        :error="errors.companyEmail"
        :isCumpulsory="true"
      />
      <FormGroup
        label="Phone number"
        name="companyPhone"
        :error="errors.companyPhone"
        :isCumpulsory="true"
      >
        <FormsPhoneCodes v-model="companyPhone" />
      </FormGroup>
      <FormGroup
        :isCumpulsory="true"
        label="Country"
        :error="errors.country"
        name="sector"
      >
        <Select
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
        <Select
          :options="mystates"
          :reduce="(state) => state.value"
          v-model="state"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.state ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>
      <FormGroup
        :isCumpulsory="true"
        label="Business Sector"
        :error="errors.sector"
        name="sector"
      >
        <Select
          v-model="sector"
          :options="sectorOptions"
          placeholder="Select sector"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.sector ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>

      <FormGroup
        label="Business category"
        :error="errors.category"
        name="category"
        :isCumpulsory="true"
      >
        <Select
          v-model="category"
          :disabled="!sector"
          :options="categorysOptions"
          placeholder="Select type"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.tenor ? 'border-red-500' : 'border-[#D0D5DD]'
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
        :isCumpulsory="true"
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

      <div class="md:col-span-2">
        <Textinput
          :isCumpulsory="true"
          placeholder=""
          label="Business address"
          name="address"
          v-bind="addressAtt"
          v-model="address"
          :error="errors.address"
          icon="majesticons:map-marker-area-line"
          icon-position="left"
        />
      </div>
      <div>
        <Textinput
          placeholder=""
          label="Company website"
          name="website"
          v-bind="cityAtt"
          v-model="website"
          :error="errors.website"
        />
      </div>
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
        <Textarea
          :isCumpulsory="true"
          placeholder=""
          label="Brief description of the company"
          name="notes"
          v-bind="notesAtt"
          v-model="notes"
          :error="errors.notes"
        />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-x-[25px] gap-y-4 mb-[50px]">
      <div class="md:col-span-2 mt-6">
        <label
          for="companyDocuments"
          class="mb-4 mt-3 font-medium text-sm block"
          >Upload the documents listed below
        </label>

        <div class="w-full" v-if="country">
          <OnboardingCompanyDocumentsUpload
            :documents="companyDocuments"
            @get-docs="handleDocUpdate"
            :isNonNigerian="country?.toLowerCase() !== 'nigeria'"
          />
        </div>
      </div>
    </div>
    <div class="flex gap-x-4 items-center justify-between">
      <AppButton
        @click="active--"
        btnClass="bg-white text-white !px-11  !text-sm !py-[10px] disabled:cursor-not-allowed border border-[#BDC0C5] !rounded-lg !text-[#333]"
        type="button"
        text="Back"
      />
      <div class="flex gap-x-4 items-center">
        <AppButton
          :disabled="isLoading"
          :isLoading="isSaving"
          btnClass="border border-primary-500 text-primary-500 !px-12 !text-sm !py-[10px] disabled:cursor-not-allowed"
          type="button"
          text="Save as Draft"
          @click="onSaveAndContinue"
        />
        <AppButton
          :disabled="
            isLoading ||
            (country?.toLowerCase() === 'nigeria' && (!registrationNo || !tin))
          "
          :isLoading="isLoading"
          btnClass="bg-primary-500 text-white !px-12 !text-sm !py-[10px] disabled:cursor-not-allowed border !rounded-lg border-primary-500"
          type="submit"
          text="Next"
        />
      </div>
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
import {
  businessTypes,
  nigeriaTypes,
  nonNigeriaTypes,
} from "~/utils/constants.js";
import {
  updateCompanyProfile,
  updateDocuments,
} from "~/services/settingservices";
import { toast } from "vue3-toastify";
import { saveAsDraft } from "~/services/requestservice";
const router = useRouter();
const isSaving = ref(false);

const company = inject("company");
const formData = inject("formData");

const isLoading = ref(false);
const active = inject("active");
const authStore = useAuthStore();
const formSchema = yup.object({
  companyName: yup
    .string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters long")
    .max(100, "Company name cannot exceed 100 characters"),

  dateOfIncorporation: yup
    .date()
    .required("Date of incorporation is required")
    .max(new Date(), "Date of incorporation cannot be in the future"),
  companyDocuments: yup.array(),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  companyEmail: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  companyPhone: yup.string().required("Phone number is required").min(10), // Adjust companyPhone number pattern to your country format

  sector: yup.string().required("Business sector is required"),
  category: yup.string().required("Business type is required"),
  registrationNo: yup.string().when("country", {
    is: (country) => country?.toLowerCase() === "nigeria",
    then: (schema) => schema.required("CAC registration number is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  tin: yup.string().when("country", {
    is: (country) => country?.toLowerCase() === "nigeria",
    then: (schema) => schema.required("TIN number is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  website: yup.string().nullable(),
  // .required("Company website is required"),

  address: yup
    .string()
    .required("Company address is required")
    .min(5, "Address must be at least 5 characters long"),

  city: yup
    .string()
    .required("City is required")
    .min(2, "City name must be at least 2 characters long"),

  notes: yup
    .string()
    .nullable()
    // .required("Description is required")
    // .min(10, "Description must be at least 10 characters long")
    .max(500, "Description cannot exceed 500 characters"),
});

const onSaveAndContinue = async () => {
  try {
    isSaving.value = true;
    const formattedValues = {
      ...values,
      companyDocuments: values.companyDocuments.map((i) => ({
        ...i,
        urls: i.urls.map((j) => j.url),
      })),
    };

    // Update formData with current values
    Object.assign(formData.kyb, formattedValues);

    // Save as draft
    await saveAsDraft({
      ...formData,
      ...(!formData?.supportingDocuments[0]?.urls[0].length && {
        supportingDocuments: formData?.supportingDocuments.map((i) => ({
          ...i,
          urls: i.urls.map((j) => j?.url),
        })),
      }),
    });

    // Update company profile
    await updateCompanyProfile(formattedValues);

    toast.success("Draft saved successfully");
    router.push("/financing");
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.response?.data?.Message ||
        "Failed to save draft"
    );
  } finally {
    isSaving.value = false;
  }
};

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
  values,
} = useForm({
  validationSchema: formSchema,
  initialValues: formData.kyb,
});

const [companyDocuments] = defineField("companyDocuments");
const [companyName, companyNameAtt] = defineField("companyName");
const [registrationNo, registrationNoAtt] = defineField("registrationNo");
const [tin, tinAtt] = defineField("tin");
const [sector] = defineField("sector");
const [companyEmail, emailAtt] = defineField("companyEmail");
const [companyPhone] = defineField("companyPhone");
const [dateOfIncorporation] = defineField("dateOfIncorporation");
const [category] = defineField("category");
const [address, addressAtt] = defineField("address");
const [notes, notesAtt] = defineField("notes");
const [country] = defineField("country");
const [state] = defineField("state");
const [city, cityAtt] = defineField("city");
const [website, websiteAtt] = defineField("website");

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

function handleDocUpdate(data) {
  setFieldValue("companyDocuments", data);
}

watch(country, () => {
  const isNigeria = country?.value?.toLowerCase() === "nigeria";
  const defaultDocuments = [
    {
      urls: [{ url: "" }],
      url: "",
      documentType: 1,
    },
    {
      urls: [{ url: "" }],
      url: "",
      documentType: 2,
    },
    {
      urls: [{ url: "" }],
      url: "",
      documentType: 3,
    },
  ];

  // Filter documents based on document type (0 and 4)
  const filterDocuments = (documents) =>
    documents.filter((i) => i.documentType === 0 || i.documentType === 4);

  if (!isNigeria) {
    const filteredDocuments = filterDocuments(formData.kyb?.companyDocuments);
    setFieldValue("companyDocuments", filteredDocuments);
    formData.kyb.companyDocuments = filteredDocuments;
  } else {
    const updatedDocuments = [
      ...formData.kyb?.companyDocuments,
      ...defaultDocuments,
    ];
    setFieldValue("companyDocuments", updatedDocuments);
    formData.kyb.companyDocuments = updatedDocuments;
  }
});

const onSubmit = handleSubmit(async (values) => {
  if (
    country.value?.toLowerCase() === "nigeria" &&
    (values.companyDocuments.some(
      (i) => i.urls.filter((i) => i.url).length === 0
    ) ||
      values.companyDocuments.length !== 5)
  ) {
    toast.error("Please upload all available document types");
    return;
  }

  const nonNigerian = values.companyDocuments
    .filter((i) => [0, 4].includes(i.documentType))
    .some((i) => i.urls.filter((i) => i.url).length == 0);

  if (
    country.value?.toLowerCase() !== "nigeria" &&
    (nonNigerian || values.companyDocuments.length !== 2)
  ) {
    toast.error("Please upload all available document types");
    return;
  }

  isLoading.value = true;

  try {
    // First save as draft
    const formattedValues = {
      ...values,
      companyDocuments: values.companyDocuments.map((i) => ({
        ...i,
        urls: i.urls.map((j) => j.url),
      })),
    };

    // Update formData with current values
    Object.assign(formData.kyb, formattedValues);

    // Handle empty documents
    if (!formData.kyb.companyDocuments?.[0]?.urls[0]?.length) {
      formData.kyb.companyDocuments = [];
    }

    // Save as draft first
    await saveAsDraft({
      ...formData,
      ...(!formData?.supportingDocuments[0]?.urls[0].length && {
        supportingDocuments: formData?.supportingDocuments.map((i) => ({
          ...i,
          urls: i.urls.map((j) => j?.url),
        })),
      }),
    });

    // Then proceed with the company profile update
    const response = await updateCompanyProfile(formattedValues);

    if (response.status === 200) {
      await getCompanyData();
      active.value = 3;
    }
  } catch (err) {

    toast.error(
      err?.response?.data?.message ||
        err?.response?.data?.Message ||
        "Something went wrong, try again later"
    );
  } finally {
    isLoading.value = false;
  }
});

const sectorOptions = businessTypes?.map((i) => {
  return {
    label: i.sector,
    value: i.sector,
  };
});
const categorysOptions = computed(() => {
  const selectedcategory = businessTypes?.find(
    (i) => i.sector === sector.value
  );
  if (!selectedcategory) return []; // Handle case when selected business type is not found

  return (
    selectedcategory.subSectors?.map((i) => {
      return {
        label: i.subSectorName,
        value: i.subSectorName, // Use subSectorCode as the value
      };
    }) ?? []
  ); // Use optional chaining and nullish coalescing operators for safer property access
});
provide("handleChange", null);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
