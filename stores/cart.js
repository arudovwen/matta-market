import { defineStore } from "pinia";
import {
  createcart,
  updatecart,
  removecartitem,
  getcart,
} from "~/services/cartservice";
import { useAuthStore } from "./auth";
import { toast } from "vue3-toastify";

export const useCartStore = defineStore(
  "cart",
  () => {
    const authStore = useAuthStore();
    const cartItems = ref([]);
    const cartData = ref(null);
    const tax = ref(0);
    const shippingTotal = ref(0);
    const removeId = ref(null);
    const cartTotalwithTax = ref(0);
    const loadingCart = ref(false);
    const cartId = ref(null);
    const discountValue = ref(0);
    const removeLoading = ref(false);
    const cart = computed(() => cartItems.value);
    const cartTotal = computed(() => cartItems.value.length);
    const cartTotalAmount = computed(() =>
      cartItems.value
        .map((item) => item.packagePrice * item.quantity)
        .reduce((a, b) => Number(a) + Number(b), 0)
    );

    function getMyCart() {
      if (!authStore.isLoggedIn) return;

      loadingCart.value = true;

      getcart()
        .then((res) => {
          loadingCart.value = false;

          if (res.status === 200) {
            const cartData = res.data.data;
            const items = cartData?.items || [];
            const cartId = cartData?.cartId || 0;

            // Merge new items with existing cart items to ensure uniqueness
            const mergedCart = [...items, ...cartItems.value];
            const uniqueCart = mergedCart.filter(
              (item, index, self) =>
                self.findIndex((i) => i.productId === item.productId) === index
            );
          
              // Create new cart with unique items
              createcart({ items: uniqueCart }).then((createRes) => {
                if (createRes.status === 200) {
                  // Refresh the minicart after updating with unique items
                  // getMyCart();
                }
              });
             
            // Update local state with cart data
            setCart(uniqueCart);
            setTax(cartData.tax || 0);
            SetShippingTotal(cartData.shippingTotal || 0);
            setCartTotalwithTax(cartData.cartTotalwithTax || 0);
            setCartId(cartId);
            setDiscount(cartData.discountValue || 0);
            setCartData(cartData);
          } else {
            // Handle cases where API response status is not 200
            resetCartState();
          }
        })
        .catch((err) => {
          if (cartItems.value.length > 0) {
            createcart({ items: cartItems.value }).then((createRes) => {
              if (createRes.status === 200) {
                getMyCart();
              }
            });
          }
          // Handle API request errors
          resetCartState();
        });

      function resetCartState() {
        setCart([]);
        setTax(0);
        SetShippingTotal(0);
        setCartTotalwithTax(0);
        setCartId(0);
        setDiscount(0);
        loadingCart.value = false;
        setCartData(null);
      }
    }

    function resetCartState() {
      setCart([]);
      setTax(0);
      SetShippingTotal(0);
      setCartTotalwithTax(0);
      setCartId(0);
      setDiscount(0);
      loadingCart.value = false;
      setCartData(null);
    }

    function setCartData(data) {
      cartData.value = data;
    }
    function setTax(data) {
      tax.value = data;
    }
    function setDiscount(data) {
      discountValue.value = data;
    }
    function setCartId(value) {
      cartId.value = value;
    }
    function setLoadingCart(data) {
      loadingCart.value = data;
    }
    function SetShippingTotal(data) {
      shippingTotal.value = data;
    }
    function setCartTotalwithTax(data) {
      cartTotalwithTax.value = data;
    }

    const setCart = (data) => {
      cartItems.value = data;
    };

    async function addToCart(item, type) {
      if (
        cartItems.value.some((ct) => ct.productId === item.productId) &&
        cartItems.value.some((ct) => ct.packageId === item.packageId)
      ) {
        return { status: false, message: "incart" };
      }

      if (!authStore.isLoggedIn) {
        setCart([...cartItems.value, item]);

        return { status: true, message: type };
      }

      const cartOperation = cartTotal.value ? updateCartAsync : createCartAsync;

      try {
        const res = await cartOperation(item);
        if (res.status == 200) {
          getMyCart();
          setCart([...cartItems.value, item]);
          return { status: true, message: type };
        }
      } catch (error) {
        toast.error(error?.response?.data?.Message);
        return { status: false, message: "Error adding to cart" };
      }
    }

    async function updateCartAsync(item) {
      return await updatecart(item);
    }

    function updateCart(item) {
      if (authStore.isLoggedIn) {
        updatecart(item).then((res) => {
          if (res.status === 200) {
            const tempCart = cartItems.value.map((dt) => {
              if (item.id === dt.id) {
                dt.quantity = item.quantity;
              }
              return dt;
            });
            setCart(tempCart);
            getMyCart();
          }
        });
      } else {
        const tempCart = cartItems.value.map((dt) => {
          if (item.id === dt.id) {
            dt.quantity = item.quantity;
          }
          return dt;
        });
        setCart(tempCart);
      }
    }

    async function createCartAsync(item) {
      return await createcart({ items: [item] });
    }

    function removeFromCart(id) {
      removeId.value = id;
      if (authStore.isLoggedIn) {
        removeLoading.value = true;
        removecartitem(id)
          .then((res) => {
            if (res.status === 200) {
              const tempCart = cartItems.value.filter((item) => item.id !== id);
              setCart(tempCart);
              getMyCart();
              removeLoading.value = false;
            }
          })
          .catch(() => {
            removeLoading.value = false;
            toast.error(
              err?.response?.data?.message ||
                err?.response?.data?.Message ||
                "Invalid code"
            );
          });
      } else {
        const tempCart = cartItems.value.filter((item) => item.id !== id);
        setCart(tempCart);
      }
    }

    function clearCart() {
      setCart([]);
    }

    return {
      tax,
      cart,
      setCart,
      getMyCart,
      addToCart,
      clearCart,
      removeFromCart,
      cartTotalAmount,
      cartTotal,
      setTax,
      SetShippingTotal,
      updateCart,
      cartItems,
      shippingTotal,
      cartTotalwithTax,
      setCartTotalwithTax,
      loadingCart,
      setLoadingCart,
      cartId,
      setCartId,
      discountValue,
      setDiscount,
      removeLoading,
      removeId,
      setCartData,
      cartData,
    };
  },

  {
    persist: {
      storage: persistedState.cookiesWithOptions({
        sameSite: "strict",
      }),
    },
  }
);
