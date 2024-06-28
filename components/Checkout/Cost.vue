<template>
  <div>
    <h2 class="mb-1 font-bold text-xl border-b border-[#f3f3f3]">
      Shipping Cost Breakdown
    </h2>
    <p class="text-sm mb-6">
      Your shipping cost is calculated based on the type and sizeof vehicle
      required to transport the materials
    </p>

    <div>
      <CustomTable
        :columns="columns"
        :rows="rows"
        :isBalance="true"
        :emptyTitle="error"
        :isLoading="loading"
      />
    </div>
  </div>
</template>
<script setup>
import { shippingBreakdown } from "@/services/cartservice";
// const currencyFormat = inject("currencyFormat");

const cartStore = useCartStore();
const shippingStore = useShippingStore();
const rows = ref([]);
const error = ref(null);
const loading = ref(false);
const columns = [
  {
    header: "Item",
    key: "item",
    isHtml: false,
    isStatus: false,
  },

  {
    header: "Size",
    key: "size",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "Quantity",
    key: "quantity",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "Shipping cost",
    key: "shippingCost",
    isHtml: false,
    isStatus: false,
  },
];
function getData() {
  loading.value = true;
  cartStore.setLoadingCart(true);
  shippingBreakdown()
	.then((res) => {
			console.log("yooo");
      cartStore.setLoadingCart(false);
      if (res.status === 200) {
				rows.value = [
					...res.data.data.items,
          {
						item: "Total Cost",
            size: "",
            quantity: "",
            shippingCost: res.data.data.totalShippingCost,
          },
        ].map((i) => ({ ...i, shippingCost: currencyFormat(i.shippingCost) }));
        error.value = null;
        cartStore.getMyCart();
				loading.value = false;
      }
    })
    .catch((err) => {
      loading.value = false;
      cartStore.setLoadingCart(false);
      error.value = err?.response?.data?.Message || err?.response?.data?.message;
    });
}

onMounted(() => {
  getData();
});
// const refresh = inject("refresh");

watch(
  () => [shippingStore?.defaultAddress],
  () => {
    getData();
  }
);
</script>
