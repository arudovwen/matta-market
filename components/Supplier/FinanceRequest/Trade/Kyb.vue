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
        label="Registration number"
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
      <div class="md:col-span-2">
        <label class="mb-4 mt-3 font-medium text-sm block"
          >Company documents
        </label>

        <div
          v-if="
            !company?.companyDocuments?.length ||
            (company?.companyDocuments.some((i) => i.urls?.length === 0) &&
              company?.companyDocuments.some((i) => !i.url))
          "
          class="grid gap-y-6"
        >
          <FormGroup
            v-if="country?.toLowerCase() === 'nigeria'"
            :isCumpulsory="true"
            :error="isFieldTouched('mermat') && errors.mermat"
            class="col-span-2"
          >
            <FileUpload
              label="Memorandum and Articles of Association"
              id="mermat"
              :multiple="true"
            />
            <div
              class="flex flex-wrap gap-x-4 gap-y-3"
              v-if="company.companyDocuments[1]?.urls?.length"
            >
              <span
                v-for="(file, idx) in company.companyDocuments[1]?.urls"
                :key="file"
                @click="downloadFile(file, 'Mermat')"
              >
                <span class="block text-xs text-blue-500 mt-1"
                  >Download mermat {{ idx + 1 }}</span
                ></span
              >
            </div>
            <div
              class="flex flex-wrap gap-x-4 gap-y-3"
              v-else-if="company.companyDocuments[1]?.url"
            >
              <span
                @click="
                  downloadFile(company.companyDocuments[1]?.url, 'Mermat')
                "
              >
                <span class="block text-xs text-blue-500 mt-1"
                  >Download Mermat</span
                ></span
              >
            </div>
          </FormGroup>
          <FormGroup
            :isCumpulsory="true"
            :error="isFieldTouched('incorporation') && errors.incorporation"
            class="col-span-2"
          >
            <FileUpload
              label="Certificate of Incorporation"
              id="incorporation"
              :multiple="true"
            />
            <div
              class="flex flex-wrap gap-x-4 gap-y-3"
              v-if="company.companyDocuments[0]?.urls?.length"
            >
              <span
                v-for="(file, idx) in company.companyDocuments[0]?.urls"
                :key="file"
                @click="downloadFile(file, 'Certificate of Incorporation')"
              >
                <span class="block text-xs text-blue-500 mt-1"
                  >Download Certificate of Incorporation {{ idx + 1 }}</span
                ></span
              >
            </div>
            <div
              class="flex flex-wrap gap-x-4 gap-y-3"
              v-else-if="company.companyDocuments[0]?.url"
            >
              <span
                @click="
                  downloadFile(
                    company.companyDocuments[0]?.url,
                    'Certificate of Incorporation'
                  )
                "
              >
                <span class="block text-xs text-blue-500 mt-1"
                  >Download Certificate of Incorporation</span
                ></span
              >
            </div>
          </FormGroup>
          <FormGroup
            v-if="country?.toLowerCase() === 'nigeria'"
            :isCumpulsory="true"
            :error="isFieldTouched('statusReport') && errors.statusReport"
            class="col-span-2"
          >
            <FileUpload
              label="CAC Status Report"
              id="statusReport"
              :multiple="true"
            />
            <div
              class="flex flex-wrap gap-x-4 gap-y-3"
              v-if="company.companyDocuments[2]?.urls?.length"
            >
              <span
                v-for="(file, idx) in company.companyDocuments[2]?.urls"
                :key="file"
                @click="downloadFile(file, 'Status Report')"
              >
                <span class="block text-xs text-blue-500 mt-1"
                  >Download Status Report {{ idx + 1 }}</span
                ></span
              >
            </div>
            <div
              class="flex flex-wrap gap-x-4 gap-y-3"
              v-else-if="company.companyDocuments[2]?.url"
            >
              <span
                @click="
                  downloadFile(
                    company.companyDocuments[2]?.url,
                    'Status Report'
                  )
                "
              >
                <span class="block text-xs text-blue-500 mt-1"
                  >Download Status Report</span
                ></span
              >
            </div>
          </FormGroup>
          <FormGroup
            v-if="country?.toLowerCase() === 'nigeria'"
            :isCumpulsory="true"
            :error="isFieldTouched('utilityBill') && errors.utilityBill"
            class="col-span-2"
          >
            <FileUpload
              label="Utility bill"
              id="utilityBill"
              :multiple="true"
            />
            <div
              class="flex flex-wrap gap-x-4 gap-y-3"
              v-if="company.companyDocuments[3]?.urls?.length"
            >
              <span
                v-for="(file, idx) in company.companyDocuments[3]?.urls"
                :key="file"
                @click="downloadFile(file, 'Utility bill')"
              >
                <span class="block text-xs text-blue-500 mt-1"
                  >Download Utility bill {{ idx + 1 }}</span
                ></span
              >
            </div>
            <div
              class="flex flex-wrap gap-x-4 gap-y-3"
              v-else-if="company.companyDocuments[3]?.url"
            >
              <span
                @click="
                  downloadFile(company.companyDocuments[3]?.url, 'Utility bill')
                "
              >
                <span class="block text-xs text-blue-500 mt-1"
                  >Download Utility bill</span
                ></span
              >
            </div>
          </FormGroup>
        </div>

        <div v-else class="">
          <DocumentsViewer
            type="kyb"
            :documents="
              country?.toLowerCase() === 'nigeria'
                ? company?.companyDocuments
                : company?.companyDocuments.filter((i) => i.documentType == 0)
            "
          />
        </div>
      </div>
    </div>
    <div class="flex gap-x-4 items-center justify-between">
      <AppButton
        @click="active--"
        btnClass="bg-white text-white !px-11  !text-sm !py-[10px] disabled:cursor-not-allowed border border-[#BDC0C5] !rounded-lg !text-[#333]"
        type="button"
        text="Previous"
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import CountryList from "country-list-with-dial-code-and-flag";
import countries from "@/utils/countries.json";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { businessTypes } from "~/utils/constants.js";
import {
  updateCompanyProfile,
  updateDocuments,
} from "@/services/settingservices";
import { toast } from "vue3-toastify";
import SelectComponent from "@/components/forms/SelectComponent";

const company = inject("company");
const formData = inject("formData");
const isLoading = ref(false);
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
  statusReport: yup.array().when("country", {
    is: "Nigeria",
    then: (schema) => schema.required("Status Report is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  incorporation: yup.array().required("Incorporation is required"), // Assuming incorporation is a dateofIncorporation type
  mermat: yup.array().when("country", {
    is: "Nigeria",
    then: (schema) => schema.required("Mermat is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  utilityBill: yup.array().when("country", {
    is: "Nigeria",
    then: (schema) => schema.required("Utility Bill is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  country: yup.string().required(),
  state: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  city: yup.string(),
  registrationNo: yup
    .string()
    .min(7, "Value must be more than 14")
    .when("country", {
      is: "Nigeria",
      then: (schema) => schema.required("Registration number is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  tin: yup.string().when("country", {
    is: "Nigeria",
    then: (schema) => schema.required("TIN is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

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

const [utilityBill] = defineField("utilityBill");
const [mermat] = defineField("mermat");
const [statusReport] = defineField("statusReport");
const [incorporation] = defineField("incorporation");
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
  setValues(company?.value || {});

  if (
    !company?.value?.companyDocuments &&
    !company?.value?.companyDocuments?.length
  ) {
    setFieldValue("incorporation", null);
    setFieldValue("mermat", null);
    setFieldValue("utilityBill", null);
    setFieldValue("statusReport", null);
    formData.kyb.companyDocuments = [
      {
        url: "",
        urls: [],
        documentType: 0,
      },
      {
        url: "",
        urls: [],
        documentType: 1,
      },
      {
        url: "",
        urls: [],
        documentType: 2,
      },
      {
        url: "",
        urls: [],
        documentType: 3,
      },
    ];
  } else {
    setFieldValue(
      "incorporation",
      company?.value?.companyDocuments[0].urls ||
        company?.value?.companyDocuments[0].url ||
        []
    );
    setFieldValue(
      "mermat",
      company?.value?.companyDocuments[0].urls ||
        company?.value?.companyDocuments[1].url ||
        []
    );
    setFieldValue(
      "utilityBill",
      company?.value?.companyDocuments[0].urls ||
        company?.value?.companyDocuments[3].url ||
        []
    );
    setFieldValue(
      "statusReport",
      company?.value?.companyDocuments[0].urls ||
        company?.value?.companyDocuments[2].url ||
        []
    );
  }
});
function handleChange(id, value) {
  formData.kyb.companyDocuments.map((i) => {
    if (id === "incorporation" && i.documentType === 0) {
      i.urls = value;
    }
    if (id === "mermat" && i.documentType === 1) {
      i.urls = value;
    }
    if (id === "statusReport" && i.documentType === 2) {
      i.urls = value;
    }
    if (id === "utilityBill" && i.documentType === 3) {
      i.urls = value;
    }
  });
  setFieldValue(id, value);
}

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  updateCompanyProfile(values)
    .then((res) => {
      if (res.status === 200) {
        // if(!formData?.kyb?.companyDocuments?.some((i) => i.urls?.length === 0)){
        updateDocuments({
          companyDocuments: formData.kyb.companyDocuments,
        })
          .then((res) => {
            isLoading.value = false;
          })
          .catch((err) => {
            isLoading.value = false;
            toast.error(
              err.response.data.message ||
                err.response.data.Message ||
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
        err.response.data.message ||
          err.response.data.Message ||
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
