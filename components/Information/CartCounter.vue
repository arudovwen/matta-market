<template>
  <div
    class="flex flex-col lg:flex-row items-center gap-x-3 lg:mb-4 w-full relative gap-y-3 lg:gap-y-0 mt-3"
    :class="isAvailable ? '' : 'opacity-60'"
  >
    <div
      class="flex flex-col lg:flex-row items-center relative flex-1 lg:gap-x-6 w-full gap-y-3 lg:gap-y-0"
    >
      <div class="bg-[#F1F3F5] rounded-lg lg:flex-1 w-full">
        <Listbox v-model="selectedPackage">
          <div class="relative w-full">
            <ListboxButton
              class="py-3 md:py-5 text-[13px] lg:h-[60px] px-3 lg:px-6 bg-transparent capitlize md:uppercase text-matta-black w-full text-left"
            >
              <span
                class="text-[#101828] text-xs md:text-sm"
                v-if="selectedPackage"
                >{{ selectedPackage.package.title }}</span
              >

              <span
                class="text-[#8F8C9A] text-xs md:text-sm leading-[normal]"
                v-else
                >Select a package</span
              >
              <span
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <ChevronDownIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute mt-1 min-w-[250px] w-full z-[99] overflow-auto rounded-md bg-white text-[13px] lg:text-base shadow-lg ring-1 ring-black ring-opacity-5 outline-0 sm:text-sm"
              >
                <ListboxOption
                  v-slot="{ active, selected }"
                  v-for="(n, i) in product.packagesAvailable"
                  :key="i"
                  :value="n"
                  as="template"
                >
                  <li
                    :class="[
                      active ? '' : '',
                      'relative text-matta-black flex items-center h-[60px] justify-start py-4 border-b px-3 lg:px-6',
                    ]"
                  >
                    <span
                      :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block',
                        'text-[13px]',
                        'uppercase whitespace-nowrap',
                      ]"
                    >
                      {{
                        n.package
                          ? `${n.package.title} ${n.size}  ${n.unit}`
                          : "-"
                      }}</span
                    >
                    <span class="text-gray-700" v-if="!product.hidePrice">
                      <span class="text-[13px]"> {{ n.amount }}</span> /<span
                        class="text-[13px] whitespace-nowrap"
                      >
                        {{ n.unit }}</span
                      >
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <div
        class="flex lg:h-[60px] w-full lg:w-[250px] items-center gap-x-3 lg:gap-x-4 rounded-lg bg-[#F1F3F5] relative py-1 md:py-5 text-xs lg:text-[13px] px-4 lg:px-4 uppercase text-matta-black"
      >
        <button
          class="disabled:opacity-20 disabled:cursor-not-allowed p-2"
          type="button"
          @click="counter -= 1"
          :disabled="counter <= 1"
        >
         
          <AppIcon icon="lucide:minus" />
        </button>
        <CurrencyInput
          min="1"
          class="min-w-[30px] md:min-w-[50px] text-center text-xs md:text-base bg-transparent focus:outline-matta-black/10 flex-1 p-2"
          v-model="counter"
          :options="{
            currency: 'ngn',
            currencyDisplay: 'hidden',
          }"
        />
        <button @click="counter += 1" class="p-2">
        
          <AppIcon icon="lucide:plus" />
        </button>
      </div>
    </div>
    <div class="w-full lg:w-auto" v-if="!product.hidePrice">
      <button data-testid="add-to-cart"
        :class="isAvailable ? 'bg-matta-black' : 'bg-matta-black/70'"
        @click="addTocart"
        class="py-4 md:py-5 text-xs md:text-[13px] h-[60px] px-6 w-full lg:w-[290px] flex justify-center text-white rounded-lg items-center hover:bg-matta-black/80 uppercase font-normal leading-[unset] gap-x-4"
      >
        <span>{{ "add to cart" }}</span>
        <i v-if="!product.hidePrice" class="uil uil-minus"></i>
        <span class="font-medium" v-if="!product.hidePrice">{{
          currencyFormat(totalAmount)
        }}</span>
      </button>
    </div>
  </div>
  <AddedToCart
    v-if="isAdded"
    :selectedPackage="selectedPackage.package"
    @close="isAdded = false"
    :totalAmount="totalAmount"
    :quantity="counter"
    :name="product.name"
    :hidePrice="product.hidePrice"
  />
</template>

<script setup>
import { inject, computed, ref, defineProps } from "vue";
import AddedToCart from "~/components/AddedToCart";
import { toast } from 'vue3-toastify';
import {
  Listbox,
  // ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/24/solid";
import { useStore } from "vuex";
import CurrencyInput from "~/components/CurrencyInput";

const store = useStore();
defineProps(["isAvailable"]);

const isAdded = ref(false);
const selectedPackage = ref(null);

const product = inject("product");
const counter = ref(1);
const isInCart = ref(false);
const supplier = inject("supplier");

function addTocart() {
  if (!selectedPackage.value) {
    toast.info("Select a package", { position: "bottom" });
    return;
  }
  let data = {
    id: 0,
    packageId: selectedPackage.value.package.id,
    unit: selectedPackage.value.unit,
    productId: product.value.id,
    product: product.value.name,
    selectedPackage: selectedPackage.value.package.title,
    selectedPackageData: selectedPackage.value,
    productBrandName: product.value.productBrandName,
    supplierId: product.value.supplierId,
    supplier: supplier,
    producer: product.value.manufacturer,
    quantity: counter.value,
    packagePrice: selectedPackage.value.amount,
  };

  store.dispatch("handleAddToCart", data).then((res) => {
    if (res.status) {
      isAdded.value = true;
      isInCart.value = true;
      counter.value = 1;
    } else {
      toast.info(res.message, { position: "bottom", duration: 5000 });
    }
  });

  setTimeout(() => {
    isAdded.value = false;
  }, 3500);
}
const totalAmount = computed(() => {
  if (!selectedPackage.value) return 0;
  return Number(selectedPackage.value.amount) * counter.value;
});
</script>
