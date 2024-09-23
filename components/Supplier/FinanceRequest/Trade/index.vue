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
    email: authStore.userInfo.email,
    phone: authStore.userInfo.phoneNumber,
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
  getCompanyProfile()
    .then((res) => {
      loading.value = false;

      const tempData = {
        ...res.data.data,
        companyDocuments:
          res.data.data.companyDocuments.length > 0
            ? res.data.data.companyDocuments?.map((doc) => ({
                ...doc,
                urls: !doc.urls.length
                  ? [
                      {
                        url: doc.url || "",
                      },
                    ]
                  : doc.urls.map((i) => ({
                      url: i?.url || i || "",
                    })),
              }))
            : [],
      };

      company.value = tempData;
      formData.kyb = { ...tempData };

      if (res.data.data?.companyDocuments?.length > 0) {
        const tempDocData = res.data.data.companyDocuments?.map((doc) => ({
          ...doc,
          urls: !doc.urls.length
            ? [
                {
                  url: doc.url || "",
                },
              ]
            : doc.urls.map((i) => ({
                url: i?.url || i || "",
              })),
        }));
        formData.kyb.companyDocuments =
          res.data.data.country.toLowerCase() === "nigeria"
            ? tempDocData
            : tempDocData.filter((i) => i.documentType === 0);
      }
    })
    .catch(() => {
      loading.value = false;
    });
}
onMounted(() => {
  getCompanyData();
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
provide("companyInfo", company);
provide("active", active);
provide("formData", formData);
provide("getCompanyData", getCompanyData);
</script>
