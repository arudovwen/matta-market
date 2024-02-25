<template>
  <div
    class="w-full py-5 px-4 lg:px-[30px] border-[#F4F7FE] border-b flex items-center justify-between"
    :class="className"
  >
    <div>
      <h1
        v-if="title"
        class="text-base md:text-lg text-[#101828] col-span-1 font-semibold flex gap-x-3 items-center capitalize"
      >
        <span
          class="cursor-pointer"
          v-if="canGoback"
          @click="backRoute ? navigateTo(backRoute) : router.go(-1)"
          ><AppIcon icon="ph:arrow-left-bold"
        /></span>
        {{ title }}
        <span
          class="text-xs h-6 min-w-[24px] px-1 rounded-full flex justify-center items-center border border-[#EAECF0] bg-[#F9FAFB] text-[#344054]"
          v-if="count"
          >{{ count }}</span
        >
      </h1>
      <h1
        v-if="welcome"
        class="text-xl xl:text-[30px] text-[#101828] font-semibold capitalize mb-1 xl:mb-2"
      >
        {{ welcome }}
      </h1>
      <slot name="subtext">
        <p
          v-if="subtext"
          class="text-xs md:text-sm text-[#475467] max-w-[500px]"
        >
          {{ subtext }}
        </p>
      </slot>
    </div>
    <div>
      <slot name="button">
        <div class="hidden md:flex">
          <AppButton
            v-if="btnText"
            @click="emits('onClick')"
            :text="btnText"
            :icon="btnIcon"
            :btnClass="`!px-[10px] md:!px-[14px] !py-[10px] bg-primary-500 !text-white !text-sm ${btnClass}`"
            iconClass="text-sm md:text-base"
          />
        </div>
        <div class="md:hidden">
          <AppButton
            v-if="btnMiniText || btnText"
            @click="emits('onClick')"
            :text="btnMiniText || btnText"
            :icon="btnIcon"
            :btnClass="`!px-[10px] md:!px-[14px] !py-[10px] bg-primary-500 !text-white !text-sm ${btnClass}`"
            iconClass="text-sm md:text-base"
          />
        </div>
      </slot>
    </div>
  </div>
</template>
<script setup>
defineProps([
  "title",
  "className",
  "welcome",
  "subtext",
  "btnText",
  "btnIcon",
  "canGoback",
  "btnClass",
  "btnMiniText",
  "count",
  "backRoute",
]);
const emits = defineEmits(["onClick"]);
const router = useRouter();
</script>
