<template>
  <div>
    <div class="bg-white rounded-[10px]">
      <div class="px-[30px] py-5 font-bold text-2xl border-b border-[#f3f3f3]">
        Order Requests
      </div>
      <div class="flex flex-col gap-y-5" v-if="orderRequestStore?.orderRequestItems?.length">
       <div v-for="item in orderRequestStore?.orderRequestItems" class="border-b last:border-none border-[#f3f3f3]">
        <OrderRequestItem :detail="item"  />
      
       </div>
        
      </div>

      <EmptyData v-else title="You have no item added" />
    </div>
  </div>
</template>
<script setup>
const orderRequestStore = useOrderRequestStore()
</script>