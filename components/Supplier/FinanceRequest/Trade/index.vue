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
    <div v-if="!loading && !isfetching" class="w-full">
      <div
        :class="` mx-auto w-full ${active === 3 ? '' : 'max-w-[676px]'}`"
        v-if="active !== 5"
      >
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
import { getCompanyProfile } from "~/services/settingservices";
import { getFinance } from "~/services/financeservice";
import { getDraft } from "~/services/requestservice";

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
      urls: [
        {
          url: "",
        },
      ],
      documentType: 0,
    },
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
    dateofIncorporation: null,
    companyDocuments: [],
    statusReport: "",
    incorporation: "", // Assuming incorporation is a dateofIncorporation type
    mermat: "",
    utilityBill: "",
    country: "Nigeria",
    city: "",
    state: "",
    email: authStore.userInfo?.email,
    phone: authStore.userInfo?.phoneNumber,
  },
  customerId: authStore?.userId,
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
        urls: [
          {
            url: "",
          },
        ],
        documentType: 0,
      },
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
function getCompanyData() {
  loading.value = true; // Assuming loading starts when the function is called

  getCompanyProfile()
    .then((res) => {
      loading.value = false;

      const { companyDocuments = [], ...companyProfile } = res.data.data;
      companyProfile.country = companyProfile.country || "Nigeria";
      const formatDocuments = (documents) => {
        return documents.map((doc) => ({
          ...doc,
          urls:
            doc.urls.length > 0
              ? doc.urls.map((urlItem) => ({
                  url: urlItem?.url || urlItem || "",
                }))
              : [{ url: doc.url || "" }],
        }));
      };

      const tempData = {
        ...companyProfile,

        companyDocuments:
          companyDocuments.length > 0
            ? formatDocuments(companyDocuments)
            : companyProfile.country.toLowerCase() === "nigeria"
            ? KybDocumentDefault
            : KybDocumentDefault.filter((doc) =>
                [0, 4].includes(doc.documentType)
              ),
      };

      company.value = tempData;
      formData.kyb = { ...tempData };
    })

    .catch(() => {
      loading.value = false;
      // Consider adding error handling here, e.g., logging or notifying the user
    });
}

function retrieveDraft() {
  isfetching.value = true;
  getDraft()
    .then((res) => {
      if (res.status === 200) {
        formData.amountRequired = res.data.data.amountRequired;
        formData.tenor = res.data.data.tenor;
        formData.whereDidYouHearAboutUs = res.data.data.whereDidYouHearAboutUs;

        if (res.data.data.supportingDocuments.length > 0) {
          formData.supportingDocuments = res.data.data.supportingDocuments.map(
            (i) => ({
              ...i,
              urls: i.urls.map((j) => ({ url: j })),
            })
          );
        }
        formData.haveyoudonebusiness = res.data.data.haveyoudonebusiness;
        formData.haveyouexportedtotheothercourty =
          res.data.data.haveyouexportedtotheothercourty;

        isfetching.value = false;
      }
    })
    .catch((err) => {
      isfetching.value = false;
    });
}

onMounted(() => {
  getCompanyData();
  getFinanceData();
  retrieveDraft();
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

        if (res.data.data.supportingDocuments.length > 0) {
          formData.supportingDocuments = res.data.data.supportingDocuments.map(
            (i) => ({
              ...i,
              urls: i.urls.map((j) => ({ url: j })),
            })
          );
        }
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
provide("companyInfo", company);
provide("active", active);
provide("formData", formData);
provide("getCompanyData", getCompanyData);
</script>
