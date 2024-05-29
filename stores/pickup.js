import { defineStore } from "pinia";
import { getallpickuplocations } from "~/services/cartservice";
export const usePickupStore = defineStore("pickup", () => {
  const addresses = ref([]);
  const loading = ref(true);
  const addressesData = computed(() => addresses.value);
  const isLoading = computed(() => loading.value);

  function setAddresses(data) {
    addresses.value = data;
  }
  function getAlladdress() {
    loading.value = true;
    getallpickuplocations()
      .then((res) => {
        if (res.data.data.length) {
          addresses.value = res.data.data.some((i) => i.isDefault)
            ? [
                res.data.data.find((i) => i.isDefault),
                ...res.data.data.filter((i) => !i.isDefault),
              ]
            : res.data.data;
        }

        loading.value = false;
      })
      .catch(() => {
        loading.value = false;
      });
  }
  // function deleteAddress(id) {
  //   getallpickuplocations(id).then((res) => {
  //     getallpickuplocations();
  //   });
  // }
  return {
    addressesData,
    addresses,
    setAddresses,
    getAlladdress,
    isLoading,
  };
});
