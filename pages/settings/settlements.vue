<template>
  <div class="gap-y-2 flex flex-col">
    <!-- Top bar   -->

    <div class="mb-6">
      <div v-if="!docLoading">
        <div class="mb-8">
          <AppButton
            @click="isOpen = true"
            text="Add settlement account"
            icon="humbleicons:plus"
            :btnClass="`!px-[10px] md:!px-[14px] !py-[10px] bg-primary-500 !text-white !text-sm !rounded-lg`"
          />
        </div>
        <div class="rounded-[10px] border border-[#F4F7FE] bg-white">
          <table class="w-full" v-if="financeData?.length">
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
                  :class="item.status == 3 ? 'opacity-25' : ''"
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap max-w-[260px] truncate"
                >
                  {{ item.customer || "-" }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  -
                </td>

                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap max-w-[260px] truncate"
                >
                  -
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
                        class="py-2 px-5 hover:bg-gray-50 text-sm whitespace-nowrap flex gap-x-1 items-center"
                        @click="openRequest(item)"
                      >
                        <AppIcon icon="akar-icons:pencil" /> Edit
                      </div>

                      <div
                        class="py-2 px-5 hover:bg-gray-50 text-sm whitespace-nowrap flex gap-x-1 items-center"
                      >
                        <AppIcon
                          icon="fluent:star-28-regular"
                          class="text-yellow-600"
                        />
                        Set as primary
                      </div>

                      <div
                        @click="deleteRequest(item.id)"
                        class="py-2 px-5 hover:bg-gray-50 text-sm whitespace-nowrap flex gap-x-1 items-center"
                      >
                        <AppIcon
                          icon="mingcute:delete-2-line"
                          class="text-red-600"
                        />
                        Delete
                      </div>
                    </MenuItems>
                  </Menu>
                </td>
              </tr>
            </tbody>
          </table>
          <EmptyData
            v-else
            title="No settlement available"
            type="settlements"
          />
          <div class="p-5" v-if="financeData.length">
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
      <div class="text-center p-6 lg:p-8 my-20" v-if="docLoading">
        <AppLoader />
      </div>
    </div>
    <div class="max-w-[252px]">
      <FormGroup
        label="How do you want to get your earnings"
        name="earings"
        class="mb-6"
      >
        <label class="flex gap-x-2 items-center">
          <input
            type="radio"
            v-model="earnings"
            value="bankAccount"
            class="accent-primary-500"
          />
          <span>Settle to my bank account</span>
        </label>
        <label class="flex gap-x-2 items-center">
          <input
            type="radio"
            v-model="earnings"
            value="wallet"
            class="accent-primary-500"
          />
          <span>Settle to my wallet</span>
        </label>
      </FormGroup>

      <div class="">
        <AppButton
          text="Save changes"
          :btnClass="`!px-[10px] md:!px-[14px] !py-[10px] bg-primary-500 !text-white !text-sm !rounded-lg`"
        />
      </div>
    </div>
  </div>
  <DeleteModal
    @deleteItem="handleDelete"
    @close="open = false"
    title="Delete account"
    text="Are you sure you want to delete this account? This action cannot be undone."
    :open="open"
    btnText="Yes, Delete"
  />
  <IndexModal :isOpen="isOpen" @togglePopup="isOpen = false" v-if="isOpen">
    <template #content>
      <div class="h-full w-full bg-white rounded-lg p-6">
        <SettlementsForm :id="id" :detail="detail" />
      </div>
    </template>
  </IndexModal>

  <ActionModal
    :open="isSuccessOpen"
    type="success"
    title="Account deleted Succesfully"
    btnText="Okay"
    :isCancel="false"
    @actionItem="
      () => {
        isSuccessOpen = false;
      }
    "
  />
  <ActionModal
    :open="isErrorOpen"
    type="reject"
    title="Delete Failed"
    :text="errorText"
    btnText="Retry"
    @actionItem="() => (isErrorOpen = false)"
    @close="() => (isErrorOpen = false)"
  />
</template>
<script setup>
definePageMeta({
  layout: "dashboard",
});
import AppIcon from "@/components/AppIcon";
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import {
  viewSettlement,
  deleteSettlement,
  getBanks,
} from "~/services/settlementservice";
import debounce from "lodash/debounce";

const isSuccessOpen = ref(false);
const isErrorOpen = ref(false);
const errorText = ref("Settlement creation failed");
const id = ref(null);
const banks = ref([]);
const open = ref(false);
const isOpen = ref(false);
const detail = ref(null);
const earnings = ref(null);
const authStore = useAuthStore();

const theads = ["account name", "account number", "bank", "type", ""];
const financeData = ref([]);

onMounted(() => {
  getFinanceData();
  getBanks().then((res) => {
    if (res.status === 200) {
      banks.value = res.data.data.responseBody.map((i) => ({
        label: i.name,
        value: i.code,
      }));
    }
  });
});

const queryParams = reactive({
  Search: "",
  SortOrder: "",
  PageNumber: 1,
  PageSize: 10,
  Type: "",
});
const docLoading = ref(true);

function getFinanceData() {
  docLoading.value = true;
  viewSettlement(queryParams)
    .then((res) => {
      financeData.value = res.data.data;
      queryParams.totalCount = res.data.data.totalCount;
      docLoading.value = false;
    })
    .catch((err) => {
      docLoading.value = false;
    });
}

function deleteRequest(value) {
  id.value = value;
  open.value = true;
}
const document = ref({});
function openRequest(val) {
  detail.value = val;
  isOpen.value = true;
}
function handleSuccess() {
  getFinanceData();
  isOpen.value = false;
}
const debounceSearch = debounce(() => {
  getFinanceData();
}, 800);
const handleDelete = () => {
  deleteSettlement(id.value)
    .then((res) => {
      if (res.status === 200) {
        getFinanceData();
        isSuccessOpen.value = true;
      }
    })
    .catch((err) => {
      errorText.value =
        err.response.data.message ||
        err.response.data.Message ||
        "Account deletion failed";
      isErrorOpen.value = true;
      isLoading.value = false;
    });
};
watch(
  () => [queryParams.Search],
  () => {
    debounceSearch();
  }
);
watch(
  () => [queryParams.PageNumber, queryParams.SortOrder],
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
provide("handleSuccess", handleSuccess);
provide("isOpen", isOpen);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
