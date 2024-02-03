<template>
    <div>
      <SupplierCustomization />
    </div>
  </template>
  <script setup>
definePageMeta({
 layout: "dashboard",
  middleware: "auth",
});
  useHead({
    title: "Customization | Matta",
    meta: [{ name: "description", content: "Customization" }],
  });
  </script>
  