<template>
  <section class="bg-white">
    <div class="pattern">
      <RequestProductsTop />
    </div>

    <RequestProductsRequest />
  </section>
</template>
<script setup>
useHead({
  title: "Product Requests | Matta",
});
</script>
<style scoped>
.pattern {
  background-image: url("/pattern.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
