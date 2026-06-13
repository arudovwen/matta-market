<template>
  <div class="w-full bg-white border border-[#F4F4F4] rounded-lg">
    <div
      class="flex flex-col sm:flex-row justify-between p-5 sm:p-6 lg:p-[30px] gap-y-5 md:gap-y-0"
    >
      <div class="flex gap-x-4 md:gap-x-6">
        <NuxtImg
          :src="detail?.productImg || '/images/imgplace.png'"
          alt="img"
          width="110"
          height="110"
          class="bg-gray-100 w-12 md:w-[110px] h-11 md:h-[110px] rounded-[5px] bg-cover object-cover"
        />
        <div class="w-full sm:w-auto sm:max-w-[350px]">
          <p
            class="font-bold text-xs md:text-base mb-[6px] md:mb-[9px] capitalize"
          >
            {{ detail?.productName }}
          </p>
          <p class="text-[10px] md:text-xs mb-[10px]md: mb-[15px]">
            <span class="font-normal">Brand :</span
            ><span class="font-bold"> {{ detail?.brand || "n/a" }}</span>
          </p>
          <div class="flex flex-col sm:flex-row gap-y-4 lg:gap-y-0 sm:gap-x-6">
            <div>
              <p class="font-medium text-[10px] md:text-xs mb-1">Packaging</p>
              <span class="flex items-center text-sm font-semibold">{{
                detail?.package?.package?.title
              }}</span>
            </div>
            <div>
              <p class="font-medium text-[10px] md:text-xs mb-1">Quantity</p>
              <span class="font-semibold"> {{ detail?.quantity }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-center md:justify-between">
        <p class="font-bold text-center md:text-right">
          {{ currencyFormat(detail?.package?.purchaseAmount) }}
        </p>

        <AppButton
          v-if="order?.status === 0"
          @click="open = true"
          text="Edit Order"
          icon="charm:refresh"
          btnClass=" !px-0  !py-[0] !text-[11px] sm:text-xs md:text-sm !font-normal !text-primary-500"
          iconClass="!text-[10px] md:!text-base !mr-1"
        />
      </div>
    </div>
  </div>
  <IndexModal :isOpen="open" @togglePopup="open = false" v-if="open">
    <template #content>
      <EditOrder @close="open = false" :detail="detail" />
    </template>
  </IndexModal>
</template>
<script setup>
import EditOrder from "./edit-order.vue";
const props = defineProps(["detail"]);
const order = inject("order");
const open = ref(false);
</script>
