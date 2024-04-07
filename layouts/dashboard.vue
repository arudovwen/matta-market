<template>
  <div
    class="flex flex-col gap-y-4 lg:gap-y-7 bg-[#F9FAFB] pb-2 min-h-screen max-w-screen"
  >
    <div class="w-full"><AppHeader /></div>

    <div class="flex-1 flex flex-col w-full">
      <div class="flex gap-x-4 flex-1 container">
        <div class="hidden lg:inline">
          <DashboardLayoutSideComponent />
        </div>

        <div class="flex-1 min-h-[80vh] overflow-auto">
          <DashboardLayoutMainComponent />
        </div>
      </div>
      <div><AppFooter /></div>
    </div>
  </div>
</template>

<script setup>
import { getCompanyProfile } from "~/services/settingservices";
import { createcart, getcart } from "~/services/cartservice";

const cookie = useCookie("cart");
const authStore = useAuthStore();
const cartStore = useCartStore();
const localCart = cookie?.value?.cartItems;
const company = ref(null);
const router = useRouter();
onBeforeMount(() => {
  if (!authStore.isLoggedIn) {
    router.push("/");
  }
});

onMounted(() => {
  getCompanyProfile().then((res) => {
    company.value = res.data.data;
  });

  if (authStore.isLoggedIn) {
    getcart()
      .then((res) => {
        if (res.status === 200) {
          const remoteCartItems = res.data.data.items;
          const remoteTax = res.data.data.tax;

          // Set the remote cart items and tax in the store
          cartStore?.setCart(remoteCartItems);
          cartStore?.setTax(remoteTax);

          if (localCart?.length > 0) {
            // Merge remote and local cart items, remove duplicates, and update the minicart
            const mergedCart = [...remoteCartItems, ...localCart];
            const uniqueCart = mergedCart.filter(
              (item, index, self) =>
                index ===
                self.findIndex(
                  (i) =>
                    i.productId === item.productId &&
                    i.packageId === item.packageId
                )
            );
            if (!remoteCartItems.length) {
              createcart({ items: uniqueCart }).then((createRes) => {
                if (createRes.status === 200) {
                  // Refresh the minicart after updating with unique items
                  cartStore?.getMyCart();
                }
              });
            }
          }
        }
      })
      .catch((err) => {
       
        if (err.response.data.Message.toLowerCase() === "no items in cart") {
          cartStore?.setCart?.([]);
        }
      });
  } else {
    cartStore?.setCart(cookie?.value?.cartItems || []);
  }
});
provide("company", company);
</script>
