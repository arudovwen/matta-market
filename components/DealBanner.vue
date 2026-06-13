<template>
  <div
    data-testid="deal-container"
    class="bg-[#1849A9] text-xs sm:text-sm py-3"
  >
    <div class="container flex items-center justify-between gap-x-6">
      <div
        class="flex font-normal text-left text-white gap-x-2 md:items-center"
      >
        <AppIcon icon="gravity-ui:seal-percent" iconClass="text-lg" />
        <span class="" data-testid="promo"
          >Get N50,000 off when you sign up and make your first purchase. &nbsp;
          Use the code
          <ClientOnly>
            <span
              v-clipboard="'1ST50KOFF'"
              @click="toast.success('Copied')"
              class="md:border md:border-white rounded-[4px] md:px-1 md:py-[2px] cursor-pointer font-semibold md:font-bold text-xs"
              >1ST50KOFF</span
            >
          </ClientOnly>
          on checkout</span
        >
      </div>
      <span class="items-center hidden text-sm md:flex gap-x-4">
        <ClientOnly>
          <template v-if="authStore.isLoggedIn">
            <NotificationComponent />
          </template>
        </ClientOnly>
        <button
          type="button"
          aria-label="cart"
          @click="navigateTo('/cart')"
          class="relative flex items-center"
        >
          <span
            class="relative h-8 w-8 rounded-full bg-[#F7F7F7] flex items-center justify-center"
          >
            <AppIcon
              class="text-base md:text-lg text-[#484848]"
              icon="lucide:shopping-cart"
            />
            <ClientOnly>
              <span
                v-if="cartStore?.cartTotal > 0"
                class="w-3 h-3 rounded-full bg-[#16F046] text-[8px] flex items-center justify-center absolute top-[4px] right-[4px]"
                >{{ cartStore?.cartTotal }}</span
              >
            </ClientOnly>
          </span>
        </button>
        <span class="text-sm"><CurrencyChanger /></span>
        <span class="hidden text-sm text-white lg:inline">
          <ClientOnly>
            <GoogleTranslateSelect
              :fetch-browser-language="true"
              :languages="availableLanguages"
              trigger="click"
              @select="handleLanguageSelect"
            />
          </ClientOnly>
        </span>
      </span>
    </div>
  </div>
</template>
<script setup>
import GoogleTranslateSelect from "@google-translate-select/vue3";
import { toast } from "vue3-toastify";
import { getStoreInfo } from "~/services/productservices";
const router = useRoute();
const { vendor } = router.params;
const vendorInfo = ref(null);

const cartStore = useCartStore();
const authStore = useAuthStore();

// Use Google Translate composable
const { availableLanguages, handleLanguageSelect } = useGoogleTranslate();

onMounted(() => {
  if (!vendor) {

    return;
  }



  getStoreInfo(vendor)
    .then((res) => {
      vendorInfo.value = res.data;
      const lang = res.data?.language || "en";
      const langCode = lang.split("-")[0]; // Convert en-US to en

   
      const langData = availableLanguages.find(
        (l) => l.code === langCode || l.code === lang
      );

      if (langData) {

        
        // Set Google Translate cookies
        const googtrans = `/auto/${langData.code}`;
        document.cookie = `googtrans=${googtrans};path=/`;
        document.cookie = `googtrans=${googtrans};domain=${location.hostname};path=/`;


        // Store in localStorage
        localStorage.setItem("preferredLanguage", langData.code);

        // Wait for Google Translate to be ready, then trigger translation
        const waitForGoogleTranslate = setInterval(() => {
          const selectElement = document.querySelector(".goog-te-combo");
          
          if (selectElement) {

            selectElement.value = langData.code;
            
            // Trigger change event
            const event = new Event("change", { bubbles: true });
            selectElement.dispatchEvent(event);
            

            clearInterval(waitForGoogleTranslate);
          } else {

          }
        }, 500);

        // Stop checking after 10 seconds
        setTimeout(() => {
          clearInterval(waitForGoogleTranslate);

        }, 10000);

        // Also call the composable handler
        handleLanguageSelect(langData);
      } else {
        console.warn("No matching language data found for:", langCode);
      }
    })
    .catch((err) => {
      console.error("Error fetching store info:", err);
    });
});
</script>
