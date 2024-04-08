<template>
    <div>
        <SupplierStoreRequests />  
    </div>
</template>
<script setup>
definePageMeta({
 layout: "dashboard",
  middleware: "auth",
});
</script>