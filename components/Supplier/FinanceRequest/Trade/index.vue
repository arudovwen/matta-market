<template>
  <div
    class="gap-y-2 flex flex-col bg-white rounded-[10px] border border-[#F4F7FE] py-[30px]"
  >
    <HeaderComponent :title="`${type} Financing request`" :canGoback="true" />
    <div class="py-10" v-if="active !== 5">
      <Stepper :tabs="tabs" />
    </div>
    <div class="max-w-[576px] mx-auto w-full" v-if="active !== 5">
      <LoanRequest v-if="active === 1" />
      <Kyb v-if="active === 2" />
      <Documents v-if="active === 4" />
      <Directors v-if="active === 3" />
    </div>
    <Final v-if="active === 5" />
  </div>
</template>
<script setup>
import LoanRequest from "./LoanRequest";
import Kyb from "./Kyb";
import Documents from "./Documents";
import Directors from "./Directors";
import Final from "./Final";
import {
  getCompanyProfile
} from "@/services/settingservices";

const company = ref(null)
const route = useRoute();
const { type } = route.params;
const formData = reactive({
  loanRequest: null,
  kyb: null,
  amountRequired: 0,
  tenor: 0,
  customerId: 0,
  whereDidYouHearAboutUs: "",
  loanRequestType: 0,
  directors: [
    {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      bvn: "",
    },
  ],
  supportingDocuments: [
    {
      url: "",
      documentType: 0,
    },
  ],
});
const active = ref(1);
const tabs = [
  {
    name: "Loan request",
    value: 1,
  },
  {
    name: "KYB",
    value: 2,
  },
  {
    name: "Directors",
    value: 3,
  },
  {
    name: "Documents",
    value: 4,
  },
];

onMounted(() => {
  getCompanyProfile().then((res) => {
    company.value = res.data.data;
  });
});
provide("active", active);
provide("formData", formData);
</script>
