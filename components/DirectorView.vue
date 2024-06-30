<template>
  <div v-if="detail" class="w-full bg-white p-6 rounded-lg">
    <h3 class="font-medium text-2xl mb-8">Director Detail</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
      <div class="mb-6">
        <label title="" class="mb-2 font-medium text-sm text-[#344054] block text-left"
          >Full name</label
        >
        <p class="text-[#344054] text-base font-medium">
          {{ detail.firstName }} {{ detail.lastName }}
        </p>
      </div>

      <div class="mb-6">
        <label title="" for="email" class="mb-2 font-normal text-xs block">E-mail</label>
        <p class="text-[#344054] text-base font-medium">
          {{ detail.email }}
        </p>
      </div>
      <div class="mb-6">
        <label title="" class="mb-2 font-normal text-xs block" for="phone"
          >Phone number
        </label>
        <p class="text-[#344054] text-base font-medium">
          {{ detail.phone }}
        </p>
      </div>

      <div class="mb-6">
        <label title="" class="mb-2 font-medium text-sm text-[#344054] block text-left"
          >BVN</label
        >
        <p class="text-[#344054] text-base font-medium">
          {{ detail.bvn }}
        </p>
      </div>
      <div class="mb-6">
        <label title="" class="mb-2 font-medium text-sm text-[#344054] block text-left"
          >Date of birth</label
        >
        <p class="text-[#344054] text-base font-medium">
          {{ moment(detail.dob).format("ll") }}
        </p>
      </div>

      <div class="l mb-6">
        <label title="" class="mb-2 font-medium text-sm text-[#344054] block text-left"
          >Linkedin</label
        >
        <p class="text-[#344054] text-base font-medium">
          {{ detail.linkedIn || "-" }}
        </p>
      </div>
      <div
        class="w-full rounded-[10px] border border-[#EAECF0] overflow-hidden md:min-w-[560px] md:col-span-2"
      >
        <table class="w-full">
          <thead>
            <tr>
              <th
                class="capitalize text-[#475467] text-sm text-left font-medium border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
              >
                Uploaded Documents
              </th>

              <th
                class="capitalize text-[#475467] text-sm text-left font-medium border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
              ></th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b last:border-none">
              <td
                class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap"
              >
                Signature
              </td>

              <td
                class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap"
              >
                <spanw
                  @click="openMedia(detail.signatureUrl)"
                  class="flex gap-x-3 items-center justify-end text-primary-500 cursor-pointer"
                >
                  View
                </spanw>
              </td>
            </tr>
            <tr class="border-b last:border-none">
              <td
                class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap"
              >
                Identity Card
              </td>

              <td
                class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap"
              >
                <span
                  @click="openMedia(detail.identityUrl)"
                  class="flex gap-x-3 items-center justify-end text-primary-500 cursor-pointer"
                >
                  View
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <MediaViewer
    v-if="isMediaOpen"
    :open="isMediaOpen"
    @close="isMediaOpen = false"
    :media="media"
  />
</template>

<script setup>
import moment from "moment";
defineProps(["detail"]);

const media = ref(null);
const isMediaOpen = ref(false);

function openMedia(val) {
  media.value = val;
  isMediaOpen.value = true;
}
</script>
