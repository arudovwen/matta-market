<template>
  <div
    class="gap-y-2 flex flex-col bg-white rounded-[10px] border border-[#F4F7FE] py-[30px]"
  >
    <HeaderComponent
      :title="`${type} Financing request`"
      :canGoback="true"
      backRoute="/financing"
    />
    <div class="py-10" v-if="active !== 5">
      <Stepper :tabs="tabs" />
    </div>
    <div v-if="!loading && !isfetching">
      <div class="max-w-[576px] mx-auto w-full" v-if="active !== 5">
        <LoanRequest v-if="active === 1" />
        <Kyb v-if="active === 2" />
        <Documents v-if="active === 4" />
        <Directors v-if="active === 3" />
        <!-- <Finalize v-if="active === 5" /> -->
      </div>
      <Final v-if="active === 5" />
    </div>
    <AppLoader v-else />
  </div>
</template>
<script setup>
import LoanRequest from "./LoanRequest";
import Kyb from "./Kyb";
import Documents from "./Documents";
import Directors from "./Directors";
import Final from "./Final";
import { getCompanyProfile } from "@/services/settingservices";
import { getFinance } from "~/services/financeservice";

const loading = ref(true);
const isfetching = ref(false);
const company = ref(null);
const route = useRoute();
const { financeId, type, id } = route.params;
const authStore = useAuthStore();
const formData = reactive({
  amountRequired: null,
  tenor: null,
  whereDidYouHearAboutUs: "",

  supportingDocuments: [
    {
      url: "",
      documentType: 0,
    },
    {
      url: "",
      documentType: 1,
    },
    {
      url: "",
      documentType: 2,
    },
    {
      url: "",
      documentType: 3,
    },
  ],
  companyDocuments: [],
  haveyoudonebusiness: "",
  haveyouexportedtotheothercourty: "",

  kyb: {
    companyName: "",
    sector: "",
    date: "",
    businessType: "",
    address: "",
    description: "",
    companyDocuments: [
      {
        url: "",
        documentType: 0,
      },
      {
        url: "",
        documentType: 1,
      },
      {
        url: "",
        documentType: 2,
      },
      {
        url: "",
        documentType: 3,
      },
    ],
  },
  customerId: authStore.userId,
  loanRequestType: parseInt(id),
  directors: [
    {
      firstName: "",
      lastName: "",
      name: "",
      bvn: "",
      email: "",
      phone: "",
      linkedin: "",
      id: "",
      signature: "",
    },
  ],
  documents: {
    supportingDocuments: [
      {
        url: "",
        documentType: 0,
      },
      {
        url: "",
        documentType: 1,
      },
      {
        url: "",
        documentType: 2,
      },
      {
        url: "",
        documentType: 3,
      },
    ],
    previousExport: "",
    doneBusiness: "",
  },
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
  // {
  //   name: "Finalize",
  //   value: 5,
  // },
];

onMounted(() => {
  getCompanyProfile().then((res) => {
    loading.value = false;
    company.value = res.data.data;
    formData.kyb.companyName = res.data.data.companyName;
    formData.kyb.sector = res.data.data.companyType;
    formData.kyb.businessType = res.data.data.companyType;
    formData.kyb.address = res.data.data.address;
    formData.kyb.productDesc = res.data.data.description;
  });
  getFinanceData();
});
function getFinanceData() {
  if (!financeId) return;
  isfetching.value = true;
  getFinance(financeId)
    .then((res) => {
      if (res.status === 200) {
        formData.amountRequired = res.data.data.amountRequired;
        formData.tenor = res.data.data.tenor;
        formData.whereDidYouHearAboutUs = res.data.data.whereDidYouHearAboutUs;
        formData.supportingDocuments = res.data.data.supportingDocuments;
        formData.haveyoudonebusiness = res.data.data.haveyoudonebusiness;
        formData.haveyouexportedtotheothercourty =
          res.data.data.haveyouexportedtotheothercourty;
        isfetching.value = false;
      }
    })
    .catch(() => {
      isfetching.value = false;
    });
}
provide("company", company);
provide("active", active);
provide("formData", formData);
</script>
