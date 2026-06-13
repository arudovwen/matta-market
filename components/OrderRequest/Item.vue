<template>
  <div
    class="flex flex-col sm:flex-row justify-between p-5 sm:p-6 lg:p-[30px] gap-y-5 md:gap-y-0"
  >
    <div class="flex gap-x-4 md:gap-x-6">
      <NuxtImg
        :src="detail.productImg || '/images/imgplace.png'"
        alt="img"
        width="117"
        height="117"
        class="bg-gray-100 w-12 md:w-[117px] h-11 md:h-[117px] rounded-[5px] bg-cover object-cover"
      />
      <div class="w-full sm:w-auto sm:max-w-[350px]">
        <p class="font-bold text-xs md:text-base mb-[6px]md: mb-[9px]">
          {{ detail?.product }}
        </p>
        <p class="text-[10px] md:text-xs mb-[10px]md: mb-[15px]">
          <span class="font-normal">Manufactured by:</span
          ><span class="font-bold"> {{ detail?.producer }}</span>
        </p>
        <div class="flex flex-col sm:flex-row gap-y-4 lg:gap-y-0 sm:gap-x-6">
          <div>
            <p class="font-medium text-[10px] md:text-xs mb-1">Packaging</p>
            <span
              class="text-sm rounded border border-[#E7E7E7] bg-white flex items-center h-8 px-[15px]"
              >{{ detail.selectedPackage }}</span
            >
          </div>
          <div>
            <p class="font-medium text-[10px] md:text-xs mb-1">Quantity</p>
            <div class="h-8 sm:max-w-[115px]">
              <CartButton
                textClass="!text-[11px] md:!text-sm"
                iconClass="!text-[10px] md:!text-xs"
                btnClass="!px-[10px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-center md:justify-between">
      <p class="font-bold text-center md:text-right">
        {{ currencyFormat(detail.packagePrice * counter) }}
      </p>

      <AppButton
        @click="orderRequestStore?.removeFromRequest(detail.id)"
        text="Remove item"
        icon="bx:trash"
        btnClass=" !px-0  !py-[0] !text-[11px] sm:text-xs md:text-sm !font-normal"
        iconClass="!text-[10px] md:!text-base !mr-1"
      />
    </div>
  </div>
</template>
<script setup>
const orderRequestStore = useOrderRequestStore();
const props = defineProps(["detail"]);

const counter = ref(props.detail.quantity);
watch(counter, () => {
  orderRequestStore?.updateRequest({
    ...props.detail,
    quantity: counter.value,
  });
});
provide("counter", counter);
</script>
