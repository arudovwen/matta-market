<template>
    <div>
        <SupplierWalletTransactionPage />
    </div>
</template>
<script setup>
definePageMeta({
 layout: "dashboard",
  middleware: "auth",
});
</script>