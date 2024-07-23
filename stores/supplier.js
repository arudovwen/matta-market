import { defineStore } from "pinia";
import { getProducers, getsupplier } from "~/services/productservices";

export const useSupplierStore = defineStore("supplier", () => {
  const suppliers = ref([]);
  const supplier = ref(null);
  const producers = ref([]);
  const suppliersData = computed(() => suppliers.value);
  const supplierData = computed(() => supplier.value);
  const producersData = computed(() => producers.value);

  function fetchSupplier(id) {
    getsupplier({ supplierId: id }).then((res) => {
      supplier.value = res.data;
    });
  }
  function fetchProducers(query) {
    getProducers(query).then((res) => {
      producers.value = res?.data?.data?.data;
    });
  }

  return {
    suppliersData,
    supplierData,
    fetchSupplier,
    producersData,
    fetchProducers,
  };
});
