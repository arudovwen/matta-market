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
      : null,
  );

  function setAddresses(data) {
    addresses.value = data.map((i) => ({ ...i, label: i.street, value: i.id }));
  }

  const sortAddresses = (addresses) => {
    return [...addresses].sort((a, b) => Number(b.isDefault) - Number(a.isDefault));
  };

  async function getAlladdress() {
    if (!authStore.isLoggedIn) return;
    loading.value = true;
    try {
      const res = await getalladdress();
      if (res.status === 200) {
        const fetchedAddresses = res.data.data || [];
        if (fetchedAddresses.length > 0 && !fetchedAddresses.some((i) => i.isDefault)) {
          await setdefaultaddress(fetchedAddresses[0].id);
          fetchedAddresses[0].isDefault = true;
        }
        setAddresses(sortAddresses(fetchedAddresses));
      } else {
        setAddresses([]);
      }
    } catch (error) {
      // ignore
    } finally {
      loading.value = false;
    }
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
