import { defineStore } from "pinia";

export const useSearchStore = defineStore(
  "recentSearch",
  () => {
    const recentSearches = ref([]);
    const recentSearchesData = computed(() => recentSearches.value);

    function setRecentSearch(data) {
      recentSearches.value = data;
    }

    async function addToSearch(value) {
      const { id } = value;
      // Check if the value already exists using the Set
      if (recentSearches.value.some((i) => i.id === id)) {
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
