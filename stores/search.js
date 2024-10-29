import { defineStore } from "pinia";

export const useSearchStore = defineStore(
  "recentSearch",
  () => {
    const recentSearches = ref([]);
    const recentSearchIds = new Set();

    const recentSearchesData = computed(() => recentSearches.value);

    function setRecentSearch(data) {
      recentSearches.value = data;
      recentSearchIds.clear();
      data.forEach((item) => recentSearchIds.add(item.id));
    }

    async function addToSearch(value) {
      const { id } = value;

      // Check if the value already exists using the Set
      if (recentSearchIds.has(id)) {
        return { status: false, message: "inhistory" };
      }

      // Add the new search term and limit the length to 30
      const tempSearch = [value, ...recentSearches.value].slice(0, 30);
      setRecentSearch(tempSearch);
    }

    return {
      recentSearches,
      recentSearchesData,
      addToSearch,
      setRecentSearch,
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
