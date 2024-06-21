<template>
    <div>
        <SupplierSavedSearches />
    </div>
</template>
<script setup>
definePageMeta({
 layout: "dashboard",
  middleware: "auth",
});
</script>