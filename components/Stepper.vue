<template>
  <div
    class="flex gap-x-20 justify-center items-center z-[2]"
    v-if="!pending && !complete"
  >
    <div
      v-for="tab in tabs"
      @click="selectValue(tab.value)"
      class="relative after:content-[''] after:absolute after:border-b-2 after:border-[#EAECF0] after:w-24 after:top-1/2 after:translate-y-[-50%] after:left-[24px] after:last:content-none after:z-10"
      :class="`${
        active > tab.value
          ? 'after:border-primary-500'
          : 'after:border-[#EAECF0]'
      } `"
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
          :class="`absolute -bottom-8 text-xs leading-5 block font-semibold whitespace-nowrap ${
            active >= tab.value ? 'text-[#344054]' : 'text-[#999]'
          }`"
        >
          {{ tab.name }}</span
        >
      </span>
    </div>
  </div>
  <div
    class="flex gap-x-20 justify-center items-center z-[2]"
    v-if="pending & !complete"
  >
    <div
      v-for="tab in tabs"
      @click="selectValue(tab.value)"
      class="relative after:content-[''] after:border-primary-500 after:absolute after:border-b-2 after:w-24 after:top-1/2 after:translate-y-[-50%] after:left-[24px] after:last:content-none after:z-10"
    >
      <span
        class="flex flex-col justify-center gap-y-1 z-20 relative items-center"
      >
        <span class="rounded-full flex items-center relative justify-center">
          <span
            class="bg-[rgba(34,112,250,0.25)] rounded-full flex items-center h-[26px] w-[26px] justify-center absolute z-[1]"
          ></span>
          <span class="bg-white h-4 w-4 z-[2] absolute rounded-full"></span>
          <AppIcon
          icon="fa6-solid:circle-check"
            iconClass="text-2xl text-primary-500 z-[3] relative"
          />
        </span>

        <span
          :class="`absolute -bottom-8 text-xs leading-5 block font-semibold whitespace-nowrap ${
            active >= tab.value ? 'text-[#344054]' : 'text-[#999]'
          }`"
        >
          {{ tab.name }}</span
        >
      </span>
    </div>
  </div>
  <div
    class="flex gap-x-20 justify-center items-center z-[2]"
    v-if="complete"
  >
    <div
      v-for="tab in tabs"
      @click="selectValue(tab.value)"
      class="relative after:content-[''] after:border-green-700 after:absolute after:border-b-2 after:w-24 after:top-1/2 after:translate-y-[-50%] after:left-[24px] after:last:content-none after:z-10"
    >
      <span
        class="flex flex-col justify-center gap-y-1 z-20 relative items-center"
      >
        <span class="rounded-full flex items-center relative justify-center">
          <span
            class="bg-green-700 rounded-full flex items-center h-[26px] w-[26px] justify-center absolute z-[1]"
          ></span>
          <span class="bg-white h-4 w-4 z-[2] absolute rounded-full"></span>
          <AppIcon
          icon="fa6-solid:circle-check"
            iconClass="text-2xl text-green-700 z-[3] relative"
          />
        </span>

        <span
          :class="`absolute -bottom-8 text-xs leading-5 block font-semibold whitespace-nowrap ${
            active >= tab.value ? 'text-[#344054]' : 'text-[#999]'
          }`"
        >
          {{ tab.name }}</span
        >
      </span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  tabs: {
    type: Array,
    default: [],
  },
  complete: {
    type: Boolean,
    default: false,
  },
  pending: { type: Boolean, default: false },
});
const active = inject("active");

function selectValue(val) {
  if (props.pending || props.complete) {
    active.value = val;
  }
}
</script>
