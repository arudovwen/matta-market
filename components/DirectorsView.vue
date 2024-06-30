<template>
  <div
    class="w-full rounded-[10px] border border-[#EAECF0] overflow-x-auto md:min-w-[560px] mx-auto"
  >
    <table aria-describedby="" v-if="directors.length" class="w-full">
      <thead>
        <tr>
          <th
            class="capitalize text-[#475467] text-sm text-left font-medium border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
          >
            Name
          </th>
          <th
            class="capitalize text-[#475467] text-sm text-left font-medium border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
          >
            Phone
          </th>
          <th
            class="capitalize text-[#475467] text-sm text-left font-medium border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
          >
            DOB
          </th>
          <th
            v-if="companyInfo?.country?.toLowerCase() === 'nigeria'"
            class="capitalize text-[#475467] text-sm text-left font-medium border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
          >
            BVN
          </th>

          <th
            class="capitalize text-[#475467] text-sm text-left font-medium border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
          >
            ID
          </th>
          <th
            class="capitalize text-[#475467] text-sm text-left font-medium border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
          >
            Signature
          </th>
          <th
            class="capitalize text-[#475467] text-sm text-left font-medium border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
          >
            Linkedin
          </th>
          <th
            v-if="!companyInfo?.approvalStatus"
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
            <span class="text-[#101828] mb-1 block">
              {{ director.firstName }} {{ director.lastName }}</span
            >
            <span class="text-[#475467]"> {{ director.email }}</span>
          </td>

          <td
            class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap"
          >
            {{ director.phone }}
          </td>
          <td
            class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap"
          >
            {{ moment(director.dob).format("ll") }}
          </td>
          <td
            v-if="companyInfo?.country?.toLowerCase() === 'nigeria'"
            class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap"
          >
            {{ director.bvn }}
          </td>
          <td
            class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap"
          >
            <span
              class="text-primary-500 cursor-pointer"
              @click="openMedia(director.identityUrl)"
              >View</span
            >
          </td>
          <td
            class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap"
          >
            <span
              class="text-primary-500 cursor-pointer"
              @click="openMedia(director.signatureUrl)"
              >View</span
            >
          </td>
          <td
            class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap"
          >
            <a
              class="text-primary-500"
              :href="director.linkedIn"
              target="_blank"
              >View profile</a
            >
          </td>
          <td
            v-if="!companyInfo?.approvalStatus"
            class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap"
          >
            <span class="flex gap-x-3 items-center justify-end">
              <span @click="emits('handleEdit', id, director)" class="p-1"
                ><i class="uil uil-pen"></i
              ></span>
              <span class="p-1" @click="emits('handleDelete', id)"
                ><i class="uil uil-trash text-red-500"></i
              ></span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="mx-auto">
      <EmptyData type="user" title="No director added" />
    </div>
  </div>

  <IndexModal :is-open="open" @toggle-popup="open = false">
    <template #content>
      <DirectorView :detail="detail" />
    </template>
  </IndexModal>
  <MediaViewer
    v-if="isOpen"
    :open="isOpen"
    @close="isOpen = false"
    :media="media"
  />
</template>
<script setup>
import IndexModal from "@/components/IndexModal";
import { defineProps, ref, defineEmits } from "vue";
import DirectorView from "./DirectorView.vue";
import MediaViewer from "@/components/MediaViewer";
import moment from "moment";
import EmptyData from "./EmptyData.vue";

const isOpen = ref(false);
const media = ref("");
defineProps(["directors", "companyInfo"]);
const emits = defineEmits(["handleDelete", "handleEdit"]);
const detail = ref(null);
const open = ref(false);
function openMedia(val) {
  media.value = val;
  isOpen.value = true;
}
</script>
