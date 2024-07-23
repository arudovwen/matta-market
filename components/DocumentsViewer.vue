<template>
  <div
    v-if="documents.length"
    class="w-full rounded-[10px] border border-[#EAECF0] overflow-x-auto md:min-w-[560px]"
  >
    <table aria-describedby="true" class="w-full">
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
        <tr
          v-for="(document, id) in documents.filter((i) => i.urls)"
          :key="id"
          class="border-b last:border-none"
        >
          <td
            class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap max-w-[260px] truncate"
          >
            {{ docName(document.documentType, type) }}
          </td>

          <td
            class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap flex gap-x-4 items-center"
          >
            <span
              v-for="(file, i) in document.urls"
              :key="file.url"
              @click="openMedia(file.url)"
              class="flex gap-x-3 items-center justify-end text-primary-500 cursor-pointer"
            >
              View document {{ i + 1 }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <MediaViewer
    v-if="isMediaOpen"
    :open="isMediaOpen"
    @close="isMediaOpen = false"
    :media="media"
  />
</template>
<script setup>
const props = defineProps(["documents", "type"]);

const media = ref(null);
const isMediaOpen = ref(false);

function openMedia(val) {
  media.value = val;
  isMediaOpen.value = true;
}
</script>
