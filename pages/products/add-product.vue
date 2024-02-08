<template>
    <div>
        <SupplierAddProduct />
    </div>
</template>
<script setup>
definePageMeta({
 layout: "dashboard",
  middleware: "auth",
});
</script>