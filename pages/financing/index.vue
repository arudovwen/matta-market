<template>
  <div
    class="gap-y-2 flex flex-col bg-white rounded-[10px] border border-[#F4F7FE]"
  >
    <!-- Top bar   -->

    <HeaderComponent title="Financing" className="px-6">
      <template #subtext>
        <p class="text-sm text-[#475467]">
          Request for financing for your business.
          <NuxtLink to="/finance"
            ><span class="text-primary-500 font-medium"
              >Learn more</span
            ></NuxtLink
          >
        </p>
      </template>
      <template #button>
        <Menu class="relative" as="div">
          <MenuButton
            id="request"
            class="shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] font-semibold outline-none !px-[14px] !py-[10px] bg-primary-500 !text-white !text-sm rounded-lg border border-primary-500 flex items-center gap-x-1"
          >
            <AppIcon icon="humbleicons:plus" /> Request Financing
          </MenuButton>
          <MenuItems
            class="absolute z-[999] bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] py-2 right-0 min-w-[180px] rounded-xl overflow-hidden flex flex-col"
          >
            <MenuItem
              v-for="n in FinancesOptions.filter((i) => i.value !== '')"
              :key="n.title"
              class="py-2 px-5 hover:bg-gray-50 text-sm whitespace-nowrap capitalize"
            >
              <span
                class="cursor-pointer"
                @click="navigateTo(handleRouting(n.url))"
              >
                {{ n.label }}
              </span>
            </MenuItem>
          </MenuItems>
        </Menu>
      </template>
    </HeaderComponent>
    <div class="pt-5">
      <div>
        <div class="flex justify-between items-center mb-8">
          <div class="flex gap-x-4 px-6">
            <div class="relative flex items-center">
              <span class="absolute left-4 pointer-events-none text-[#667085]"
                ><i class="uil uil-search"></i
              ></span>
              <input
                v-model="queryParams.Search"
                @change="getRequests()"
                @keyup="debounceSearch"
                placeholder="Search"
                class="border border-[#E7E7E7] text-sm focus:pr-3 pl-10 rounded-lg w-[280px] focus:outline-none py-[10px] transition ease-in-out duration-300"
                type="search"
              />
            </div>
            <FilterButton
              v-model="queryParams.LoadRequestType"
              :options="FinancesOptions"
            />
          </div>
        </div>
        <div v-if="!docLoading && financeData?.length">
          <table class="w-full">
            <thead>
              <tr>
                <th
                  v-for="item in theads"
                  :key="item"
                  class="capitalize text-[#475467] text-sm text-left font-medium border-t border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
                >
                  {{ item }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in financeData" :key="item">
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  {{ item.financeRequestNo }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap max-w-[260px] truncate"
                >
                  {{ item.customer || "-" }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  {{ handleType(item.loanRequestType) }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  {{ moment(item.created).format("ll") }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap max-w-[260px] truncate"
                >
                  {{ currencyFormat(item.amountRequired) }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap max-w-[260px] truncate"
                >
                  {{
                    !item.financeRequestStatus
                      ? "-"
                      : currencyFormat(item.amountApproved)
                  }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  <AppStatusButton
                    :status="item.financeRequestStatus"
                    stattype="finance"
                  />
                </td>

                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  <Menu class="relative" as="div">
                    <MenuButton
                      :id="`${item.productName}+option`"
                      class="outline-none"
                    >
                      <AppIcon icon="heroicons:ellipsis-vertical-solid" />
                    </MenuButton>
                    <MenuItems
                      class="absolute z-[999] bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] py-2 right-0 min-w-[180px] rounded-xl overflow-hidden"
                    >
                      <div
                        class="py-2 px-5 hover:bg-gray-50 text-sm whitespace-nowrap"
                        @click="openRequest(item)"
                      >
                        View request
                      </div>
                      <div
                        v-if="item.financeRequestStatus === 1"
                        class="py-2 px-5 hover:bg-gray-50 text-sm whitespace-nowrap"
                        @click="openLoan(item)"
                      >
                        View loan offer
                      </div>

                      <NuxtLink
                        v-if="item.financeRequestStatus === 0"
                        :to="`/financing/requests/${handleType(
                          item.loanRequestType
                        )}/${item.loanRequestType}/${item.id}`"
                      >
                        <div
                          class="py-2 px-5 hover:bg-gray-50 text-sm whitespace-nowrap"
                        >
                          Edit request
                        </div>
                      </NuxtLink>
                      <div
                        v-if="item.financeRequestStatus === 0"
                        @click="withdrawRequest(item.id)"
                        class="py-2 px-5 hover:bg-gray-50 text-sm whitespace-nowrap"
                      >
                        Withdraw request
                      </div>
                    </MenuItems>
                  </Menu>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <EmptyData v-if="!docLoading && !financeData?.length" title="No request available" />
      </div>
      <div class="text-center p-6 lg:p-8 my-20" v-if="docLoading">
        <AppLoader />
      </div>

      <div class="p-5" v-if="queryParams.totalCount > queryParams.PageSize">
        <PaginationSimple
          :total="queryParams.totalCount"
          :current="queryParams.PageNumber"
          :per-page="queryParams.PageSize"
          :pageRange="5"
          @page-changed="queryParams.PageNumber = $event"
        />
      </div>
    </div>
  </div>
  <DeleteModal
    @deleteItem="handleDelete"
    @close="open = false"
    title="Withdraw request"
    text="Are you sure you want to withdraw this application? This action cannot be undone."
    :open="open"
    btnText="Withdraw request"
    :loading="loading"
  />
  <SideModal :isOpen="isOpen" @togglePopup="isOpen = false" v-if="isOpen">
    <template #content>
      <div class="h-full w-full bg-white rounded-lg p-6 lg:p-10">
        <FinanceRequestDetail :detail="detail" />
      </div>
    </template>
  </SideModal>
  <IndexModal
    :isOpen="isLoanOpen"
    @togglePopup="isLoanOpen = false"
    v-if="isLoanOpen"
  >
    <template #content>
      <div class="h-full w-full bg-white rounded-lg p-6">
        <FinanceLoanUpdate v-if="detail" :detail="detail" @refresh="refresh" />
      </div>
    </template>
  </IndexModal>
</template>
<script setup>
import AppIcon from "@/components/AppIcon";
import moment from "moment";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { getAllFinance, withdrawFinance } from "~/services/financeservice";
import debounce from "lodash/debounce";
import { toast } from "vue3-toastify";
import CardDetail from "~/components/payments/CardDetail.vue";

const type = ref(null);
const id = ref(null);
const open = ref(false);
const isOpen = ref(false);
const loading = ref(false);
const isLoanOpen = ref(false);
const detail = ref(null);
const authStore = useAuthStore();

const theads = [
  "request id",
  "customer name",
  "financing type",
  "created",
  "requested amount",
  "approved amount",
  "status",
  "",
];
const financeData = ref([]);

onMounted(() => {
  getFinanceData();
});

const queryParams = reactive({
  SupplierId: "",
  RequestStatus: "",
  ProducerId: "",
  ProductId: "",
  Search: "",
  SortOrder: "",
  PageNumber: 1,
  PageSize: 10,
  Type: "",
});
const docLoading = ref(true);

function getFinanceData() {
  docLoading.value = true;
  getAllFinance(queryParams).then((res) => {
    financeData.value = res.data.data;
    queryParams.totalCount = res.data.data.totalCount;
    docLoading.value = false;
  });
}
function refresh() {
  getFinanceData();
  isOpen.value = isLoanOpen.value = false;
  detail.value = null;
}
function handleType(key) {
  switch (parseInt(key)) {
    case 0:
      return "trade";
      break;
    case 1:
      return "supply";
      break;
    case 2:
      return "import";
      break;
    case 3:
      return "export";
      break;

    default:
      break;
  }
}
const handleRouting = (url) => {
  // if (!authStore.userInfo.onboardingPageStatus) {
  //   toast.info("Complete your KYB before you proceed");
  //   return `/company/settings?redirected_from=${url}`;
  // }
  return url;
};
function withdrawRequest(value) {
  id.value = value;
  open.value = true;
}
const document = ref({});
function openRequest(val) {
  type.value = "detail";
  detail.value = val;
  isOpen.value = true;
}
function openLoan(val) {
  type.value = "update";
  detail.value = val;
  isLoanOpen.value = true;
}
const debounceSearch = debounce(() => {
  getFinanceData();
}, 800);
const handleDelete = () => {
  loading.value = true;
  withdrawFinance(id.value)
    .then((res) => {
      if (res.status === 200) {
        open.value = false;
        getFinanceData();
        toast.success("Request withdrawn");
        loading.value = false;
      }
    })
    .catch((err) => {
      toast.error(
        err.response.data.message ||
          err.response.data.message ||
          "Withdraw request failed"
      );
    });
};
watch(
  () => [queryParams.Search],
  () => {
    debounceSearch();
  }
);
watch(
  () => [queryParams.PageNumber, queryParams.SortOrder, queryParams.LoadRequestType, queryParams.RequestStatus],
  () => {
    getFinanceData();
  }
);
const FinancesOptions = [
  {
    label: "all finance",
    key: "all",
    value: "",
  },
  {
    label: "trade finance",
    key: 0,
    value: 0,
    url: "/financing/requests/trade/0",
  },
  {
    label: "supply finance",
    key: 1,
    value: 1,
    url: "/financing/requests/supply/1",
  },
  {
    label: "import finance",
    key: 2,
    value: 2,
    url: "/financing/requests/import/2",
  },
  {
    label: "export finance",
    key: 3,
    value: 3,
    url: "/financing/requests/export/3",
  },
];
provide("document", document);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
