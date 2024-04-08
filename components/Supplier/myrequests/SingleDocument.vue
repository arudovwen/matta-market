<template>
  <section class="flex flex-col gap-y-8">
    <div class="flex items-center">
      <span
        class="mr-3 h-10 w-10 rounded-lg flex items-center justify-center border border-[#E7EBEE] p-2"
      >
         <img class="" :src="document.logo" alt="alt" />
      </span>
      <span>
        <span class="text-xs font-medium">{{ document.productName }}</span>
        <br />
        <span class="text-xs font-normal"> {{ document.producer }} </span>
      </span>
    </div>
    <div class="grid grid-cols-2 gap-y-8 gap-x-4 mb-8">
      <div>
        <p class="text-[12px] text-[#B6B7B9] mb-2 uppercase">STATUS</p>
        <span
          class="px-2 py-2 text-xs rounded-lg bg-[#D0C9FF]"
          v-if="document.requestStatus == 0"
        >
          New</span
        >
        <span
          v-if="document.requestStatus == 2"
          class="px-2 py-1 text-xs rounded-lg bg-[#E0F7B0]"
        >
          Completed</span
        >
        <span
          v-if="document.requestStatus == 1"
          class="px-2 py-1 text-xs rounded-lg bg-[#FDD0AF]"
        >
          In progress</span
        >
      </div>
      <div>
        <p class="text-[12px] text-[#B6B7B9] mb-2 uppercase">created</p>
        <span class="text-xs">{{
          moment(document.createdOn).format("ll")
        }}</span>
      </div>
      <div>
        <p class="text-[12px] text-[#B6B7B9] mb-2 uppercase">document type</p>
        <span class="text-xs">SDS & Other</span>
      </div>
    </div>
    <div
      class="bg-[#F1F3F5] rounded-lg p-6 text-matta-black"
      v-if="document.description"
    >
      <div class="">
        <p class="text-sm font-normal">
          {{ document.description }}
        </p>
      </div>
    </div>
    <button
      class="px-6 py-4 w-full border-primary- border text-sm rounded-full text-primary uppercase"
    >
      see documents
    </button>
    <hr class="my-4 border-[#E7EBEE]" />
    <div class="bg-[#F1F3F5] rounded-lg p-6 text-matta-black">
      <div class="flex justify-between mb-6">
        <h3 class="text-lg font-medium">Timeline</h3>
        <span><i class="uil uil-minusext-lg"></i></span>
      </div>

      <div
        class="flex justify-start items-center gap-x-2 mb-3"
        :class="stage > 1 ? 'opacity-50' : ''"
      >
        <span
          :class="stage > 1 ? '' : ' bg-primary-500 text-white'"
          class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-xs"
        >
          <i class="uil uil-check"></i>
        </span>
        <span>
          <span class="text-xs text-[#ABABAB]">Mar 18, 13:05PM</span>
          <br />
          <span class="text-xs"
            ><span
              >Document request has been
              <span class="font-medium">completed</span>.</span
            ></span
          >
        </span>
      </div>

      <div
        class="flex justify-start items-center gap-x-2 mb-3"
        :class="stage > 2 ? 'opacity-50' : ''"
      >
        <span
          :class="
            stage > 2
              ? ''
              : stage == 2
              ? ' bg-primary-500 text-white'
              : stage < 2
              ? 'bg-white text-matta-black'
              : ''
          "
          class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-xs"
        >
          <i class="uil uil-refresh"></i>
        </span>
        <span>
          <span class="text-xs text-[#ABABAB]">Mar 18, 13:05PM</span>
          <br />
          <span class="text-xs"
            ><span
              >Status changed from <span class="font-medium">New</span> to
              <span class="font-medium">In Progress</span>.</span
            ></span
          >
        </span>
      </div>

      <div
        class="flex justify-start items-center gap-x-2 mb-3"
        :class="stage > 3 ? 'opacity-50' : ''"
      >
        <span
          :class="
            stage > 3
              ? ''
              : stage == 3
              ? ' bg-primary-500 text-white'
              : stage < 3
              ? 'bg-white text-matta-black'
              : ''
          "
          class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-xs"
        >
          <i class="uil uil-plus"></i>
        </span>
        <span>
          <span class="text-xs text-[#ABABAB]">Mar 18, 13:05PM</span>
          <br />
          <span class="text-xs"
            ><span
              >Document request
              <span class="font-medium">#SE554-334</span> created.</span
            ></span
          >
        </span>
      </div>
    </div>
  </section>
</template>
<script setup>
import moment from "moment";
const document = inject("document");
const stage = ref(1);
</script>
<style scoped>
input[type="range" i]:disabled {
  background-color: #2c2c2c !important;
  color: rgb(197, 197, 197);
}
</style>
