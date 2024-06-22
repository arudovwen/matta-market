<template>
  <div>
    <SupplierOverviewComponent />
  </div>
</template>
<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>
