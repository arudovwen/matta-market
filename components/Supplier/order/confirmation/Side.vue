<template>
  <div
    class="bg-[#101828] rounded-[10px] py-[30px] px-5 w-full lg:w-[250px] xl:w-[360px]"
  >
    <div class="pb-6 text-2xl font-semibold text-white">Order Details</div>
    <div class="flex flex-col gap-y-5">
      <div class="flex justify-between" v-for="item in order?.orderDetails">
        <div>
          <p class="font-semibold text-sm text-white mb-[2px] capitalize">
            {{ item.product }}
          </p>
          <p class="text-xs text-[#959595]">
            Qty: {{ item.quantity }} {{ item.selectedPackage }}
          </p>
        </div>
        <p class="text-xs font-normal text-white">
          {{ currencyFormat(item.itemTotal) }}
        </p>
      </div>
    </div>
    <hr class="my-[20px] border-white/10" />
    <div class="flex flex-col gap-y-3">
      <div class="flex justify-between">
        <p class="text-sm text-[#E1E1E1]">Sub-total</p>

        <p class="text-xs text-white">
          {{ currencyFormat(order?.orderTotal) }}
        </p>
      </div>
    </div>
    <hr class="my-[20px] border-white/10" />
    <div>
      <div class="flex justify-between">
        <p class="text-sm text-[#E1E1E1]">Total cost of products</p>

        <p class="text-sm font-medium text-white">
          {{ currencyFormat(order?.orderTotal) }}
        </p>
      </div>
    </div>
    <hr class="my-[20px] border-white/10" />
    <div class="flex justify-between mb-[25px]">
      <p class="text-sm text-[#E1E1E1]">Total</p>

      <p class="font-bold text-white">
        {{ currencyFormat(order?.orderTotal) }}
      </p>
    </div>
    <AppButton
      text="Confirm product is available"
      :isLoading="loading && value == true"
      :isDisabled="loading"
      @click="confirmOrder(true)"
      loadingText="Processing ..."
      btnClass="bg-primary-500  w-full text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm mb-4"
    />

    <AppButton
      :isLoading="loading && value == false"
      :isDisabled="loading"
      @click="confirmOrder(false)"
      text="Confirm product is Unavailable"
      loadingText="Processing ..."
      btnClass="!text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm bg-[#F04438] !normal-case mb-4 w-full"
    />
  </div>
</template>
<script setup>
import { toast } from "vue3-toastify";
import { confirmavailablilty } from "~/services/cartservice";

const selectedPickup = inject("selectedPickup");
const order = inject("order");
const value = ref(null);
const loading = ref(false);
const { id } = useRoute().params;

async function confirmOrder(val) {
  try {
    if (!selectedPickup.value) {
      toast.info("Select a pickup location");
      return;
    }
    loading.value = true;
    value.value = val;
    const res = await confirmavailablilty({
      shippingAddressId: selectedPickup.value,
      orderItemId: id,
      available: val,
    });

    if (res.status === 200) {
      toast.success("Successful");
    }
  } catch (err) {
    const errorText = `${
      err?.response?.data?.Message || err?.response?.data?.message
    }, Contact us for assistance on your order`;
    toast.error(errorText);
    loading.value = false;
  } finally {
    value.value = null;
  }
}
</script>
