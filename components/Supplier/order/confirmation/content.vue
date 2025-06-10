<template>
  <div class="grid w-full gap-y-4">
   <div>
    <div v-for="item in order?.orderDetails">
       <Item :detail="item"/>
    </div>
   </div>
     <Pickup />
  </div>
 
</template>
<script setup>
import Item from "./Item.vue"
import Pickup from "./pickup.vue";

const order = inject("order")
</script>