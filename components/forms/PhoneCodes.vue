<template>
  <div class="flex items-center border rounded-lg w-full">
    <Listbox class="flex items-center" v-model="code">
      <div class="relative h-full">
        <ListboxButton
          :class="classStyles"
          class="relative cursor-pointer h-full text-left flex items-center rounded-l-lg pl-3 gap-x-2 py-3 border-r placeholder:text-[#B6B7B9] focus:outline-matta-black/20 text-sm"
        >
          <span class="text-sm" v-if="code">
            <div class="text-[#3A3745] flex items-center gap-x-1">
              <span v-if="code">{{ code }}</span>
            </div></span
          >
          <span class="block text-sm text-[#8F8C9A] whitespace-nowrap" v-else>{{
            placeholder
          }}</span>
          <i class="uil uil-angle-down text-[#101828]"></i>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute top-11 mt-1 w-full min-w-[320px] border border-gray-100 z-40 rounded-lg bg-white py-6 text-xs shadow-lg outline-0 sm:text-[13px]"
          >
            <div class="relative flex items-center mb-3 mt-3 px-4">
              <input
                v-model="query"
                placeholder="Search"
                class="text-xs rounded-lg px-3 py-1 h-10 w-full border placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
              />
            </div>
            <div class="max-h-60 overflow-y-auto py-2">
              <ListboxOption
                v-slot="{ active, selected }"
                v-for="z in filteredCodes"
                :key="z"
                :value="z"
                as="template"
              >
                <li
                  :class="[
                    active || selected ? 'bg-gray-50' : '',
                    'relative cursor-pointer select-none py-[11px] px-[20px] text-loft-black hover:bg-gray-100  flex items-center justify-between',
                  ]"
                >
                  <p class="text-sm text-[#101828] capitalize">
                    {{ z.dial_code }} - &nbsp; {{ z.name }}
                  </p>
                  <i class="uil uil-check text-[#101828]" v-show="selected"></i>
                </li>
              </ListboxOption>
            </div>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <input
      v-model="phone"
      placeholder="08160723884"
      type="tel"
      class="flex-1 px-4 outline-none h-full py-2 text-sm"
    />
  </div>
</template>
<script setup>
import {
  Listbox,
  // ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import CountryList from "country-list-with-dial-code-and-flag";

const props = defineProps([
  "label",
  "id",
  "modelValue",
  "placeholder",
  "classStyles",
]);
const emits = defineEmits(["update:modelValue"]);
const selectedOption = computed(() => `${code.value}-${phone.value}`);

const code = ref("+234");
const phone = ref("");
onMounted(() => {
  if (!props.modelValue) return {};
  if (props.modelValue.includes("-")) {
    code.value = props.modelValue.split("-")[0] || "+234";
    phone.value = props.modelValue.split("-")[1];
  } else {
    phone.value = props.modelValue;
  }
});
const query = ref("");
const filteredCodes = computed(() => {
  if (!query.value.length) return CountryList;
  return CountryList?.filter((item) =>
    item.name.toLowerCase().includes(query.value.toLowerCase())
  );
});

watch(selectedOption, () => {
  if (!selectedOption.value) return;

  emits("update:modelValue", selectedOption.value);
});
watch(
  () => props.modelValue,
  () => {
    if (!props.modelValue) return {};
    if (props.modelValue.includes("-")) {
    code.value = props.modelValue.split("-")[0] || "+234";
    phone.value = props.modelValue.split("-")[1];
  } else {
    phone.value = props.modelValue;
  }
  }
);
</script>
