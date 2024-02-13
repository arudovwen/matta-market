<template>
  <div
    v-if="documents.length"
    class="w-full rounded-[10px] border border-[#EAECF0] overflow-hidden md:min-w-[560px]"
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
        <tr
          v-for="(document, id) in documents.filter((i) => i.url)"
          :key="id"
          class="border-b last:border-none"
        >
          <td
            class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap"
          >
            {{ docName(document.documentType) }}
          </td>

          <td
            class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap"
          >
            <span
              v-if="document.url"
              @click="
                downloadFile(document.url, docName(document.documentType))
              "
              class="flex gap-x-3 items-center justify-end text-primary-500 cursor-pointer"
            >
              View
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
const authStore = useAuthStore();
const props = defineProps(["documents", "type"]);

function downloadFile(fileUrl, fileName) {
  // Replace 'your_file_url' with the actual URL of the file you want to download

  fetch(fileUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => {
      // Create a link element
      const link = document.createElement("a");

      // Create a Blob URL for the file data
      const blobUrl = window.URL.createObjectURL(blob);

      // Set the link's href attribute to the Blob URL
      link.href = blobUrl;

      // Set the download attribute with the desired file name
      link.download = fileName || "downloaded_file"; // Change the file name as needed

      // Append the link to the document
      document.body.appendChild(link);

      // Trigger a click on the link to start the download
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);

      // Revoke the Blob URL to free up resources
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch((error) => {
      console.error("Error downloading file:", error);
    });
}

</script>
