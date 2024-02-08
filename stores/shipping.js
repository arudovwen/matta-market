import { defineStore } from "pinia";
import { getalladdress } from "~/services/cartservice";
export const useShippingStore = defineStore("shipping", () => {
  const addresses = ref([]);
  const loading = ref(true);
  const addressesData = computed(() => addresses.value);
  const isLoading = computed(() => loading.value);
  const defaultAddress = computed(() =>
    addresses.value.find((i) => i.isDefault)
  );

  function setAddresses(data) {
    addresses.value = data;
  }
  function getAlladdress() {
    loading.value = true;
    getalladdress()
      .then((res) => {
        addresses.value = res.data.data;
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
