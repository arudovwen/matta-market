<template>
  <div class="grid w-full gap-y-4">
   <div>
  <!-- <pre>  {{ order }}</pre>
   -->
       <Item :detail="order"/>
  
   </div>
     <Pickup />
  </div>
 
</template>
<script setup>
import Item from "./Item.vue"
import Pickup from "./pickup.vue";

const order = inject("order")
</script>