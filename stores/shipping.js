import { defineStore } from "pinia";
import { getalladdress } from "~/services/cartservice";
export const useShippingStore = defineStore("shipping", () => {
  const authStore = useAuthStore();
  const addresses = ref([]);
  const loading = ref(true);
  const addressesData = computed(() => addresses.value);
  const isLoading = computed(() => loading.value);
  const defaultAddress = computed(() =>
    addresses.value.length
      ? addresses.value.find((i) => i.isDefault) || addresses.value[0]
      : null
  );

  function setAddresses(data) {
    addresses.value = data.map((i) => ({ ...i, label: i.street, value: i.id }));
  }
  function getAlladdress() {
    if (!authStore.isLoggedIn) return;
    loading.value = true;
    getalladdress()
      .then((res) => {
        if (res.data.data.length) {
          const tempAddress = res.data.data.some((i) => i.isDefault)
            ? [
                res.data.data.find((i) => i.isDefault),
                ...res.data.data.filter((i) => !i.isDefault),
              ]
            : res.data.data;
          setAddresses(tempAddress);
        }

        loading.value = false;
      })
      .catch(() => {
        loading.value = false;
      });
  }
  function deleteAddress(id) {
    getalladdress(id).then((res) => {
      getalladdress();
    });
  }
  return {
    addressesData,
    addresses,
    setAddresses,
    defaultAddress,
    getAlladdress,
    isLoading,
  };
});
