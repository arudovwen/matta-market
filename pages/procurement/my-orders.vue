<template>
    <div>
        <SupplierMyOrders />
    </div>
</template>
<script setup>
definePageMeta({
 layout: "dashboard",
  middleware: "auth",
});
</script>