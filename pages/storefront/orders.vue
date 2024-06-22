<template>
    <div>
        <SupplierOrdersComponent />
    </div>
</template>
<script setup>
definePageMeta({
 layout: "dashboard",
  middleware: "auth",
});
</script>