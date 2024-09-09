<template>
  <div
    class="flex flex-col items-center justify-center p-4 h-[300px] text-gray-400 text-center"
    :class="className"
  >
    <div class="mb-6 flex justify-center">
      <AppIcon
        icon="fa6-solid:truck"
        :iconClass="`${classIcon} text-6xl text-[#E8E8E8]`"
        v-if="type == 'shipping'"
      />
      <img
        alt="user"
        src="~/assets/images/emptyuser.png"
        v-else-if="type == 'user'"
        :class="classIcon"
      />
      <img
        alt="campaign"
        src="/images/campaign.png"
        v-else-if="type == 'campaign'"
        :class="classIcon"
      />
      <img
        alt="settlements"
        src="/images/settlements.svg"
        v-else-if="type == 'settlements'"
        :class="classIcon"
      />
      <img
        alt="transactions"
        src="/images/transaction.svg"
        v-else-if="type == 'transaction'"
        :class="classIcon"
      />
      <img
        alt="empty"
        src="~/assets/images/empty.svg"
        v-else
        :class="classIcon"
      />
    </div>
    <p :class="titleClass" class="text-lg text-[#101828] font-semibold mb-2">
      {{ title || "No data available" }}
    </p>
    <p
      v-if="subtext"
      class="text-sm text-[#475467] max-w-[352px] mx-auto text-center"
    >
      {{ subtext }}
    </p>
    <AppButton
      @click="emits('btnFunction')"
      v-if="btnText"
      :text="btnText"
      btnClass="!py-[10px] bg-primary-500 text-white mt-3 !rounded-lg"
      :icon="btnIcon"
    />
  </div>
</template>
<script setup>
defineProps([
  "title",
  "subtext",
  "btnText",
  "url",
  "type",
  "btnIcon",
  "className",
  "classIcon",
  "titleClass",
]);
const emits = defineEmits(["btnFunction"]);
</script>
