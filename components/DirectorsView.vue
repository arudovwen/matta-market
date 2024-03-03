<template>
  <div
    v-if="directors.length"
    class="w-full rounded-[10px] border border-[#EAECF0] overflow-hidden md:min-w-[560px]"
  >
    <table class="w-full">
      <thead>
        <tr>
          <th
            class="capitalize text-[#475467] text-sm text-left font-medium border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
          >
            Name
          </th>

          <th
            class="capitalize text-[#475467] text-sm text-left font-medium border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
          ></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(director, id) in directors"
          :key="id"
          class="border-b last:border-none"
        >
          <td
            class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap"
          >
            {{ director.firstName }} {{ director.lastName }}
          </td>

          <td
            class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap"
          >
            <span
              class="flex gap-x-3 items-center justify-end"
              v-if="
                !authStore?.userInfo?.onboardingPageStatus &&
                !companyInfo?.approvalStatus
              "
            >
              <span @click="emits('handleEdit', id, director)" class="p-1"
                ><i class="uil uil-pen"></i
              ></span>
              <span class="p-1" @click="emits('handleDelete', id)"
                ><i class="uil uil-trash text-red-500"></i
              ></span>
            </span>
            <span v-else>
              <span
                @click="handleDetail(director)"
                class="flex gap-x-3 items-center justify-end text-primary-500 cursor-pointer"
              >
                View details
              </span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <EmptyData title="No director added" type="user" />
  </div>
  <IndexModal :is-open="open" @toggle-popup="open = false">
    <template #content>
      <DirectorView :detail="detail" />
    </template>
  </IndexModal>
</template>
<script setup>
import EmptyData from "./EmptyData.vue";

const authStore = useAuthStore();
defineProps(["directors", "companyInfo"]);
const emits = defineEmits(["handleDelete", "handleEdit"]);
const detail = ref(null);
const open = ref(false);
function handleDetail(data) {
  detail.value = data;
  open.value = true;
}
</script>
