<template>
  <div>
    <div class="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
      <SingleSupplier :supplier="s" v-for="(s, i) in suppliers" :key="i" />
    </div>
    <Pagination v-if="!isLoading" totalData="20" pageNumber="1" pageSize="10" />
    <div class="text-center p-6 lg:p-8 mt-24" v-else>
       <AppLoader />
    </div>
  </div>
</template>

<script setup>
const isLoading = inject("isLoading");
const suppliers = inject("suppliers");
</script>
