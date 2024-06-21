<template>
  <div class="p-6 lg:p-8 bg-white rounded-lg bg-img">
    <div class="mb-8"><Breadcrumbs :manual="true" :crumbs="crumbsData" /></div>
    <div
      class="grid grid-cols-1 lg:grid-cols-3 justify-between items-end gap-2"
    >
      <h1
        class="text-4xl lg:text-[48px] lg:leading-[56px] text-matta-black col-span-1 font-medium capitalize"
      >
        {{ name.toLowerCase() }}
      </h1>

      <div />
      <div class="lg:col-span-1 grid lg:justify-end">
        <p class="text-4xl lg:text-[64px] text-primary font-medium mb-3">
          {{ pageData.totalData }}
        </p>
        <p class="text-sm text-matta-black">
          Discover here thousands of products in <br />
          <span class="capitalize">{{ name }}</span> market.
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>

import { useRoute } from "vue-router";
import { onMounted, ref, inject, watch } from "vue";

const pageData = inject("totalData");
const route = useRoute();
const emitter = inject("emitter");
const crumbsData = ref([
  {
    name: "Markets",
    url: "/category/markets",
  },
  {
    name: route.params.type,
    url: `/category/market/${route.params.type}/${route.params.marketId}?showing=parent`,
  },
]);
onMounted(() => {
  name.value = route.params.type;
  if (route.query.applicationTitle && route.query.applicationId) {
    let data = {
      name: route.query.applicationTitle,
      url: "#",
    };
    name.value = route.query.applicationTitle;
    crumbsData.value.push(data);
  }

  emitter.on("toggleName", (val) => {
    let data = {
      name: val.title,
      url: "#",
    };
    if (crumbsData.value.length == 3) {
      crumbsData.value.pop();
      crumbsData.value.push(data);
      name.value = data.name;
    } else {
      crumbsData.value.push(data);
      name.value = data.name;
    }
  });
});
const name = ref("");
watch(route, () => {
  name.value = route.params.type;
});
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
