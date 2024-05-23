<template>
  <div class="bg-[#F4F4F4] darks:bg-gray-800 relative w-screen">
    <AppHeader />
    <slot />
    <AppFooter />
    <!-- <AppScrollTop /> -->

    <a href="https://wa.me/+2349169982190" target="_blank" class="z-[99999]">
      <button
        class="fixed bottom-10 transition duration-300 right-4 opacity-80 hover:opacity-100 hover:scale-[1.1]"
      >
        <img
          src="@/assets/img/whatsapp.png"
          width="60"
          height="60"
          alt="whatsapp link"
          class="drop-shadow-lg"
        />
      </button>
    </a>
  </div>
</template>
<script setup>
import { createcart, getcart, clearcart } from "~/services/cartservice";
const cookie = useCookie("cart");
const authStore = useAuthStore();
const cartStore = useCartStore();
const localCart = [];
onMounted(() => {
  if (authStore.isLoggedIn && localStorage.getItem("fetchCart")) {
    localStorage.removeItem("fetchCart");
    getcart()
      .then((res) => {
        if (res.status === 200) {
          const remoteCartItems = res.data.data.items;

          if (cookie?.value?.cartItems?.length > 0) {
            // Merge remote and local cart items, remove duplicates, and update the minicart
            const mergedCart = [
              ...remoteCartItems,
              ...cookie?.value?.cartItems,
            ];
            const uniqueCart = mergedCart.filter(
              (item, index, self) =>
                index === self.findIndex((i) => i.productId === item.productId)
            );
            clearcart()
              .then(() => {
                if (res.status === 200) {
                  createcart({ items: uniqueCart }).then((createRes) => {
                    if (createRes.status === 200) {
                      // Refresh the minicart after updating with unique items
                      cartStore?.getMyCart();
                    }
                  });
                }
              })
              .catch(() => {
                cartStore?.getMyCart();
              });
          } else {
            cartStore?.getMyCart();
          }
        }
      })
      .catch((err) => {
        if (
          err.response.data.Message.toLowerCase() === "no items in cart" &&
          !cookie?.value?.cartItems?.length
        ) {
          cartStore?.setCart?.([]);
          cartStore?.setTax(0);
          cartStore?.SetShippingTotal(0);
          cartStore?.setCartTotalwithTax(0);
          cartStore?.setCartId(0);
          cartStore?.setDiscount(0);
          cartStore?.setCartData(null);
        } else {
          createcart({ items: cookie?.value?.cartItems }).then((createRes) => {
            if (createRes.status === 200) {
              // Refresh the minicart after updating with unique items
              cartStore?.getMyCart();
            }
          });
        }
      });
  } else {
    cartStore?.setCart?.(cookie?.value?.cartItems || []);
  }
});
</script>
