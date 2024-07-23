<template>
  <div class="py-2" v-if="detail">
    <div class="flex justify-between items-center">
      <p class="text-base font-bold mb-[10px] capitalize">
        {{ detail.storeName }}
      </p>
    </div>
    <p class="text-sm mb-[7px]">
      {{ detail.address }} ,{{ detail.lga?` ,${detail.lga}`:'' }}
    </p>
    <p class="text-sm capitalize mb-2">
      {{ detail.phoneNumber }}
    </p>
    <p class="text-sm capitalize">
    {{ detail.state }},&nbsp; {{ detail.country }}
    </p>
  </div>
</template>

<script setup>
defineProps(["active", "detail"]);
</script>
