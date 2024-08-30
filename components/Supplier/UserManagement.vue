<template>
  <div
    class=" flex flex-col bg-white rounded-[10px] border border-[#F4F7FE]"
  >
    <!-- Top bar   -->
    <HeaderComponent
      title="User management"
      subtext="Invite and assign roles to your company users"
      btnText="Add users"
      btnIcon="humbleicons:plus"
      @onButtonClick="openmodal('method')"
      className="!border-[#EAECF0]"
      :count="queryParams.totalCount"
			onkeypress="() => {}"
    />

    <div class="rounded-lg bg-white pt-4">
      <div class="flex justify-between items-center mb-4 px-6">
        <div class="flex gap-x-4">
          <div class="relative flex items-center">
            <span
              class="absolute left-4 peer-focus:right-3 pointer-events-none text-[#667085]"
              ><i class="uil uil-search"></i
            ></span>
            <input
              v-model="queryParams.Search"
              @change="getAllInvites()"
              @keyup="debounceSearch"
              placeholder="Search"
              class="border border-[#D0D5DD] focus:pr-3 pl-10 rounded-lg w-[280px] focus:outline-none py-[10px] transition ease-in-out duration-300"
              type="search"
            />
          </div>
          <div class="flex relative items-center">
            <select
              v-model="queryParams.Role"
              @change="getAllInvites()"
              class="appearance-none border border-[#D0D5DD] rounded-lg py-[10px] px-[14px] w-[180px] focus:outline-none"
            >
              <option value="">Role</option>
              <option v-for="role in roles" :key="role" :value="role">
                {{
                  role == "CompanyAdmin"
                    ? "Company admin"
                    : role == "CompanyUser"
                    ? "Company user"
                    : "Buyer"
                }}
              </option>
            </select>
            <i
              class="uil uil-angle-down absolute right-2 pointer-events-none"
            ></i>
          </div>
          <div class="flex relative items-center">
            <select
              v-model="queryParams.Status"
              @change="getAllInvites()"
              class="appearance-none border border-[#D0D5DD] rounded-lg py-[10px] px-[14px] w-[180px] focus:outline-none"
            >
              <option value="">Status</option>
              <option value="0">Unverified</option>
              <option value="2">Verified</option>
            </select>
            <i
              class="uil uil-angle-down absolute right-2 pointer-events-none"
            ></i>
          </div>
        </div>
      </div>
      <div v-if="!isPageLoading">
        <div v-if="!isEmpty" class="max-w-[80vw]">
          <table aria-describedby="true" class="w-full">
            <thead>
              <tr>
                <th
                  v-for="item in theads"
                  :key="item"
                  class="capitalize text-[#475467] text-sm text-left font-medium border-b border-t py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
                >
                  {{ item }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in tdata" :key="item">
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  {{ item.fullName }}
                </td>
                <td
                  class=" text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  {{ item.email }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  <select
                    :value="item.role"
                    class="outline-0 capitalize"
                    @change="updateRole($event, item)"
                    :disabled="!item.status"
                  >
                    <option v-for="role in roles" :key="role" :value="role">
                      {{
                        role == "CompanyAdmin"
                          ? "Company admin"
                          : role == "CompanyUser"
                          ? "Company user"
                          : "Buyer"
                      }}
                    </option>
                  </select>
                </td>

                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  <span
                    v-if="item.invitationStatusText == 'Expired'"
                    class="px-2 py-1 text-xs rounded-full text-[#B42318] bg-[#FEF3F2] flex gap-x-1 items-center max-w-max border border-[#FECDCA]"
                  >
                    <AppIcon
                      icon="octicon:dot-fill-24"
                      iconClass="text-[#B42318]"
                    />
                    Suspended</span
                  >
                  <span
                    v-if="item.invitationStatusText == 'Invited'"
                    class="px-2 py-1 text-xs rounded-full text-[#B54708] bg-[#FFFAEB] flex gap-x-1 items-center max-w-max border border-[#FEDF89]"
                  >
                    <AppIcon
                      icon="octicon:dot-fill-24"
                      iconClass="text-[#B54708]"
                    />
                    Pending</span
                  >
                  <span
                    v-if="item.invitationStatusText == 'Verified'"
                    class="px-2 py-1 text-xs rounded-full text-[#067647] bg-[#ECFDF3] flex gap-x-1 items-center max-w-max border border-[#ABEFC6]"
                  >
                    <AppIcon
                      icon="octicon:dot-fill-24"
                      iconClass="text-[#067647]"
                    />
                    Active</span
                  >
                  <!-- <span
                    v-if="item.invitationStatusText.toLowerCase() === 'invited'"
                    class="px-2 py-2 text-xs rounded-lg border text-primary border-primary"
                  >
                    {{ item.invitationStatusText }}</span
                  > -->
                </td>

                <td
                  class="uppercase text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
                >
                  <Menu class="relative" as="div">
                    <MenuButton class="outline-none">
                       <AppIcon icon="heroicons:ellipsis-vertical-solid" />
                    </MenuButton>
                    <MenuItems
                      class="absolute z-[999] bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] py-2 right-0 min-w-[140px] rounded-xl overflow-hidden"
                    >
                      <div
                        class="py-2 px-4 hover:bg-gray-50 text-matta-black text-sm whitespace-nowrap capitalize cursor-pointer"
                        @click="openmodal('remove', item)"
                      >
                        <i class="uil uil-trash-alt mr-1"></i> Remove
                      </div>
                      <div
                        v-if="item.invitationStatusText !== 'Verified'"
                        class="py-2 px-4 hover:bg-gray-50 text-matta-black text-sm whitespace-nowrap capitalize cursor-pointer"
                        @click="resendinvite(item.id)"
                      >
                        <i class="uil uil-envelope-redo mr-1"></i> Resend invite
                      </div>
                    </MenuItems>
                  </Menu>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <EmptyData
          @btnFunction="openmodal('method')"
          btnText="New User"
          title="No users found"
          subtext="You havent't added any user to your team"
          type="user"
          btnIcon="humbleicons:plus"
          v-else
        />
      </div>
      <div class="text-center p-6 lg:p-8 my-24" v-else>
        <AppLoader />
      </div>
    </div>

    <div class="px-5 py-4">
      <PaginationSimple
        :total="queryParams.totalCount"
        :current="queryParams.PageNumber"
        :per-page="queryParams.PageSize"
        :pageRange="5"
        @page-changed="queryParams.PageNumber = $event"
      />
    </div>
  </div>
  <IndexModal :isOpen="isOpen" @togglePopup="isOpen = false">
    <template #content>
      <div class="bg-white rounded-lg p-6 lg:p-8 relative w-[550px]">
        <span
          @click="isOpen = false"
          class="hover:bg-gray-50 rounded-full h-6 w-6 flex items-center justify-center absolute top-4 right-4"
          ><AppIcon icon="heroicons-solid:x" class="w-4 h-4"
        /></span>
        <SupplierManagementInviteUser v-if="showing === 'method'" />
        <SupplierManagementRemoveUser v-if="showing === 'remove'" />
      </div>
    </template>
  </IndexModal>
</template>

<script setup>
import { useRoute } from "vue-router";
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import {
  getInvites,
  inviteUsers,
  deleteInvite,
  deleteUser,
  changeUserRole,
  getRoles,
  resendInvite,
} from "~/services/userservices";
import debounce from "lodash/debounce";
import { toast } from "vue3-toastify";

const multi = ref([]);
const showing = ref("");
const isOpen = ref(false);
const roles = ref(null);
const isPageLoading = ref(true);
const user = ref(null);

function removeUser() {
  if (user.value.invitationStatusText == "Verified") {
    deleteUser({ email: user.value.email }).then(() => {
      updateData();
      togglePopup();
    });
  } else {
    deleteInvite({ invitationId: user.value.id }).then(() => {
      updateData();
      togglePopup();
    });
  }
}
function resendinvite(id) {
  resendInvite({ invitationId: id })
    .then((res) => {
      if (res.status === 200) {
        toast.info("Invite sent!");
      }
    })
    .catch((error) => {
      toast.info(error?.response?.data?.Message);
    });
}
function openmodal(val, userdata = null) {
  showing.value = val;
  isOpen.value = true;
  user.value = userdata;
}
function togglePopup() {
  isOpen.value = !isOpen.value;
}
function next() {
  queryParams.PageNumber++;
  getAllInvites();
}
function prev() {
  if (queryParams.PageNumber == 1) return;
  queryParams.PageNumber--;
  getAllInvites();
}
provide("togglePopup", togglePopup);
provide("removeUser", removeUser);
provide("openmodal", openmodal);
const route = useRoute();
defineProps(["title"]);
const isEmpty = ref(false);
const queryParams = reactive({
  Status: "",
  Role: "",
  PageSize: 10,
  PageNumber: 1,
  pagecount: 0,
  totalCount: 0,
  Search: "",
});
function getAllInvites() {
  getInvites(queryParams)
    .then((res) => {
      tdata.value = res.data.data;
      queryParams.totalCount = res.data.totalCount;
      queryParams.pagecount = res.data.data.length;
      isPageLoading.value = false;
      !res.data.data.length ? (isEmpty.value = true) : (isEmpty.value = false);
    })
    .catch(() => {
      isPageLoading.value = false;
    });
}
function updateData() {
  getAllInvites();
}
onMounted(() => {
  getAllInvites();
  getRoles().then((res) => {
    roles.value = res.data;
  });
});
watch(
  () => [queryParams.PageNumber],
  () => {
    getAllInvites();
  }
);
const debounceSearch = debounce(() => {
  getAllInvites();
}, 1500);

function updateRole(e, user) {
  let data = {
    roleName: e.target.value,
    users: [user.email],
  };
  changeUserRole(data).then((res) => {
    if (res.status === 200) {
      getAllInvites();
    }
  });
}
const theads = ["name", "email address", "role", "status", ""];
const tdata = ref([]);
provide("deleteInvite", deleteInvite);
provide("deleteUser", deleteUser);
provide("inviteUsers", inviteUsers);
provide("roles", roles);
provide("updateData", updateData);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
