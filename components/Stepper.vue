<template>
  <div class="flex gap-x-20 justify-center items-center z-[2]">
    <div
      v-for="tab in tabs"
      @click="active = tab.value"
      class="relative after:content-[''] after:absolute after:border-b-2 after:border-[#EAECF0] after:w-24 after:top-1/2 after:translate-y-[-50%] after:left-[24px] after:last:content-none after:z-10"
    :class="`${active > tab.value?'after:border-primary-500':'after:border-[#EAECF0]'}`"
      >
      <span
        class="flex flex-col justify-center gap-y-1 z-20 relative items-center"
      >
   
        <span class="bg-white" v-if="active > tab.value">
          <AppIcon
            icon="fa6-solid:circle-check"
            iconClass="text-2xl text-primary-500"
        /></span>

        <span
          class="rounded-full flex items-center relative justify-center"
          v-if="active === tab.value"
        >
          <span
            class="bg-[rgba(34,112,250,0.25)] rounded-full flex items-center h-[26px] w-[26px] justify-center absolute z-[1]"
          ></span>
          <span class="bg-white h-4 w-4 z-[2] absolute rounded-full"></span>
          <AppIcon
            icon="fa-solid:dot-circle"
            iconClass="text-2xl text-primary-500 z-[3] relative"
          />
        </span>

        <span v-if="active < tab.value" class="bg-white">
          <AppIcon
            icon="fa-regular:dot-circle"
            iconClass="text-2xl text-[#EAECF0]"
          />
        </span>
        <span
          :class="`absolute -bottom-8 text-xs leading-5 block font-semibold whitespace-nowrap ${active >= tab.value?'text-[#344054]':'text-[#999]'}`"
        >
          {{ tab.name }}</span
        >
      </span>
    </div>
  </div>
</template>
<script setup>
defineProps(["tabs"]);
const active = inject("active");
</script>
