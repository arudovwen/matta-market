<template>
  <div v-if="!shippingStore.isLoading && cartStore?.cartTotalwithTax">
    <h2 class="mb-1 font-bold text-xl border-b border-[#f3f3f3]">
      Shipping Cost Estimate
    </h2>
    <p class="mb-6 text-sm">
      Your shipping cost is calculated based on the type and size of vehicle
      required to transport the materials
    </p>

    <CustomTable
      :columns="columns"
      :rows="rows"
      :isBalance="true"
      emptyTitle="Provide a valid shipping address above to get an estimate of your shipping and handling cost"
      :isLoading="loading"
      emptyType="shipping"
      emptyTitleClass="font-bold text-[#F24A26]"
    />
  </div>
</template>

<script setup>
import { shippingBreakdown } from "~/services/cartservice";

const cartStore = useCartStore();
const shippingStore = useShippingStore();

const rows = ref([]);
const error = ref(null);
const loading = ref(false);

const columns = [
  { header: "Item", key: "item" },
  { header: "Size", key: "size" },
  { header: "Quantity", key: "quantity" },
  { header: "Shipping cost", key: "shippingCost" },
];

async function getData() {
  try {
    loading.value = true;
    cartStore.setLoadingCart(true);

    const res = await shippingBreakdown();

    if (res.status === 200 && res.data?.data) {
      const items = res.data.data.items || [];
      console.log(res.data.data.totalShippingCost);
      
      const totalCost = res.data.data.totalShippingCost || 0;

      rows.value = [
        ...items,
        {
          item: "Total Cost",
          size: "",
          quantity: "",
          shippingCost: totalCost,
        },
      ].map(item => ({
        ...item,
        shippingCost: currencyFormat(item.shippingCost),
      }));

      error.value = null;
      cartStore.getMyCart();
    } else {
      error.value = "Failed to load shipping cost.";
    }
  } catch (err) {
    error.value = err?.response?.data?.Message || err?.response?.data?.message || "An unexpected error occurred.";
  } finally {
    loading.value = false;
    cartStore.setLoadingCart(false);
  }
}

// onMounted(getData);

watch(
  () => [shippingStore.defaultAddress, shippingStore.addresses],
  getData
);
</script>
