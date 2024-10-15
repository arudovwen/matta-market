import { defineStore } from "pinia";
import { getalladdress, setdefaultaddress } from "~/services/cartservice";
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

  const sortAddresses = (addresses) => {
    return addresses.some((i) => i.isDefault)
      ? [
          addresses.find((i) => i.isDefault),
          ...addresses.filter((i) => !i.isDefault),
        ]
      : addresses;
  };

  function getAlladdress() {
    if (!authStore.isLoggedIn) return;
    loading.value = true;
    getalladdress()
      .then(async (res) => {
        if (res.data.data.length) {
          const addresses = res.data.data;
          if (addresses.length === 1 && !addresses[0].isDefault)
            await setdefaultaddress(addresses[0].id);
          addresses[0].isDefault = true;
          setAddresses(addresses);
          const tempAddress = sortAddresses(addresses);
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
