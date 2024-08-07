<template>
  <form class="mt-12">
    <legend class="text-lg font-medium mb-1">Shipping Address</legend>
    <p class="text-sm text-[#ABABAB] mb-8">
      Choose your shipping options for samples requested.
    </p>
    <div class="mb-6">
      <label
        for="email"
        class="mb-2 font-medium text-sm text-[#344054] block text-left"
        >E-mail</label
      >
      <input
        id="email"
        class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
        placeholder="E-mail"
        autocomplete="off"
        autofocus="on"
        v-model="request2$.email.$model"
      />
      <div
        class="text-red-500 mt-1"
        v-for="error of request2$.email.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="mb-6">
      <label
        for="phone"
        class="mb-2 font-medium text-sm text-[#344054] block text-left"
        >Phone number</label
      >
      <div class="flex relative rounded-lg h-11">
        <FormsPhoneCodes v-model="request2$.phone.$model" />
      </div>
      <div
        class="text-red-500 mt-1"
        v-for="error of request2$.phone.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <div class="mb-6">
      <label
        for="Address"
        class="mb-2 font-medium text-sm text-[#344054] block text-left"
        >Address</label
      >
      <Listbox v-if="authStore.isLoggedIn" v-model="selectedoption">
        <div class="relative w-full">
          <ListboxButton
            class="relative w-full cursor-default rounded-lg min-h-[40px] border border-[#DCDEE6] py-2 px-[15px] text-left shadow-[0px_1px_2px_rgba(16,24,40,0.05)] sm:text-[13px] flex items-center"
          >
            <span
              class="flex gap-x-1 text-[#101828] text-[13px] whitespace-nowrap"
              v-if="selectedoption"
              ><span class="font-medium capitalize">{{
                `${selectedoption.firstName} ${selectedoption.lastName}`
              }}</span
              >,
              <span class="truncate ... max-w-[170px]">{{
                selectedoption.street
              }}</span></span
            >

            <span
              class="block text-[#8F8C9A] text-[13px] whitespace-nowrap"
              v-else
              >Choose your shipping adress...</span
            >
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <i
                class="uil uil-angle-down absolute right-2 appearance-none"
              ></i>
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div>
              <ListboxOptions
                class="absolute mt-1 w-full z-40 rounded-lg border border-[#DCDEE6] bg-white pb-4 overflow-hidden text-xs shadow-lg outline-0 sm:text-[13px]"
              >
                <div class="max-h-60 overflow-y-auto mb-3">
                  <ListboxOption
                    v-for="option in shippingStore.addressesData"
                    v-slot="{ active }"
                    :key="option.name"
                    :value="option"
                    as="template"
                  >
                    <div
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'relative cursor-default select-none py-2 px-[10px] text-loft-black border-b hover:bg-gray-50',
                      ]"
                    >
                      <p class="text-xs font-medium mb-1 capitalize">
                        {{ `${option.firstName} ${option.lastName}` }}
                      </p>
                      <p>
                        {{ option.street }}
                      </p>
                    </div>
                  </ListboxOption>
                </div>
                <button
                  type="button"
                  class="text-xs text-primary-500 mt-2 px-[10px]"
                  @click="isOpen = true"
                >
                  <i class="uil uil-plus"></i>
                  <span>Add new shipping address</span>
                </button>
              </ListboxOptions>
            </div>
          </transition>
        </div>
      </Listbox>
      <input
        v-else
        id="additionalInformation"
        v-model="request2$.shippingAddressId.$model"
        placeholder=""
        class="placeholder:text-xs rounded-lg px-[14px] py-[10px] w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
      />
      <div
        class="text-red-500 mt-1"
        v-for="error of request2$.shippingAddressId.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <div class="mb-6">
      <label
        for="addressDescription"
        class="mb-2 font-medium text-sm text-[#344054] block text-left"
        >Description</label
      >
      <textarea
        id="addressDescription"
        v-model="request2$.addressDescription.$model"
        placeholder=""
        row="4"
        class="placeholder:text-xs rounded-lg px-[14px] py-[10px] w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
      ></textarea>
      <div
        class="text-red-500 mt-1"
        v-for="error of request2$.addressDescription.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>
  </form>

  <ModalCenter>
    <template #default>
      <div class="w-full max-w-[500px] p-6 md:py-9 md:px-10 z-[999] relative">
        <CheckoutShippingEditForm />
      </div>
    </template>
  </ModalCenter>
</template>
<script setup>
import {
  Listbox,
  // ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const authStore = useAuthStore();
const request2$ = inject("request2$");
const sampleForm = inject("sampleForm");
const isOpen = ref(false);
const selectedoption = ref();
const shippingStore = useShippingStore();
onMounted(() => {
  shippingStore.getAlladdress();
});

const phoneCode = ref("+234");

watch(selectedoption, () => {
  sampleForm.shippingAddressId = selectedoption.value.id;
});

function togglePopup() {
  isOpen.value = false;
}

function handleReload() {
  shippingStore.getAlladdress();
  isOpen.value = false;
}
provide("togglePopup", togglePopup);
provide("handleReload", handleReload);
provide("isOpen", isOpen);
provide("detail", null);
</script>
