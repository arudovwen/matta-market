<template>
  <div
    class="bg-matta-black text-white p-6 lg:p-8 rounded-lg flex justify-between"
  >
    <div>
      <h5 class="uppercase text-[#ABABAB] text-[13px] mb-4">product preview</h5>
      <h3 class="text-2xl text-white font-medium mb-2">
        Preview how this product looks to buyers
      </h3>
      <p class="text-white text-base">
        You can go back to editing or finish and publish the product to catalog.
      </p>
    </div>
    <div>
      <div class="flex items-end gap-x-4 h-full">
        <button
          @click="togglePreview"
          class="bg-white text-matta-black rounded-full px-6 py-4 hover:bg-slate-50 text-[13px]"
        >
          BACK TO EDITING
        </button>
        <!-- <button
          :disabled="isLoading"
          @click="handleSubmit"
          class="bg-primary-500 rounded-full text-white uppercase px-6 py-4 hover:bg-primary/80 text-[13px]"
        >
          <span v-if="!isLoading">FINISH </span>
          <span v-if="isLoading"
            >Saving product <i class="fa fa-spinner fa-spin"></i>
          </span>
        </button> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject } from "vue";
// import { useRouter } from "vue-router";
// import { toast } from 'vue3-toastify';
// import { updateAdditional } from "~/services/productservices";

// const router = useRouter();
// 
// const isLoading = ref(false);
const togglePreview = inject("togglePreview");
// const form = inject("form");
// async function handleSubmit() {
//   isLoading.value = true;

//   updateAdditional(form)
//     .then((res) => {
//       if (res.status === 200) {
//         toast.info("Information saved", {
//           position: "bottom",
//           duration: 4000,
//         });
//         router.push(`/storefront/products`);
//       }
//     })

//     .catch((err) => {
//       isLoading.value = false;

//       toast.error((err.response.data.message || err.response.data.Message), {
//         position: "bottom",
//       });
//     });
// }
</script>
