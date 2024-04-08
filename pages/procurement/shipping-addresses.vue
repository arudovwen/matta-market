<template>
  <div>
    <SupplierShippingAddresses />
  </div>
</template>
<script setup>
definePageMeta({
 layout: "dashboard",
  middleware: "auth",
});
</script>
