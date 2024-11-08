<template>
  <div class="gap-y-2 flex flex-col rounded-[10px] border border-[#F4F7FE]">
    <Breadcrumbs :links="links" />
    <HeaderComponent :title="`Request Credit`" className="!border-none !px-0" />
    <div class="bg-white rounded-lg border border-[#EAECF0]">
      <div class="px-6 py-4 border-b border-[#EAECF0]">
        <span
          ><button
            @click="navigateTo('/wallet/home')"
            class="text-sm font-medium flex gap-x-2 items-center"
          >
            <AppIcon icon="ph:arrow-left-bold" /> <span>Back</span>
          </button></span
        >
      </div>
      <div class="py-10 mb-8" v-if="active !== 5">
        <Stepper :tabs="tabs" />
      </div>
      <div
        v-if="!loading && !isfetching"
        class="w-full pb-10 mx-auto max-w-[676px]"
      >
        <div
          :class="` mx-auto w-full ${active === 3 ? '' : 'max-w-[676px]'}`"
          v-if="active !== 5"
        >
          <CreditFormsRequest v-if="active === 1" />
          <SupplierFinanceRequestTradeKyb v-if="active === 2" />
          <CreditFormsDocuments v-if="active === 4" />
          <SupplierFinanceRequestTradeDirectors v-if="active === 3" />
          <!-- <Finalize v-if="active === 5" /> -->
        </div>
        <CreditFormsSummary v-if="active === 5" />
      </div>
      <AppLoader v-else />
    </div>
  </div>
</template>
<script setup>
import { getCompanyProfile } from "~/services/settingservices";
import { getFinance } from "~/services/financeservice";

const loading = ref(true);
const isfetching = ref(false);
const company = ref(null);
const route = useRoute();
const { financeId, type, id } = route.params;
const authStore = useAuthStore();
const links = [
  {
    title: "Wallets",
    url: "/wallet/home",
  },
  {
    title: "Request credit",
    url: "#",
  },
];
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
  ],
  companyDocuments: [],
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
      linkedIn: "",
      homeAddress: "",
      signatureUrl: "",
      identityUrl: "",
      utilityBillUrl: "",
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
    ],
  },
});

const active = ref(1);
const tabs = [
  {
    name: "Credit request",
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
        country: companyProfile.country || "Nigeria",
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
