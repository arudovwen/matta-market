<template>
    <div>
        <SupplierNotificationComponent />
    </div>
</template>
<script setup>
definePageMeta({
 layout: "dashboard",
  middleware: "auth",
});
</script>