<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="name"
      :class="`${classLabel} inline-block input-label`"
    >
      {{ label }}
      <RedDot v-if="isCumpulsory" />
    </label>

    <Combobox v-model="selected">
      <div class="relative mt-1">
        <div
          class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left input-control outline-none"
        >
          <ComboboxInput
            class="w-full border-none py-2 pl-1 pr-10 text-sm leading-5 outline-none"
            :displayValue="(option) => option?.label || ''"
            @change="query = $event.target.value"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>

        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-primary-500/5 focus:outline-none sm:text-sm"
          >
            <div
              v-if="filteredOptions.length === 0 && query !== ''"
              class="relative cursor-default select-none px-4 py-2 text-gray-700"
            >
              Nothing found.
            </div>

            <ComboboxOption
              v-for="option in filteredOptions"
              :key="option.value"
              :value="option"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-primary-500 text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ option.label }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-teal-600': !active }"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>

    <span
      v-if="error"
      class="mt-2"
      :class="
        msgTooltip
          ? 'inline-block bg-danger-500 text-white text-[10px] px-2 py-1 rounded'
          : 'text-danger-500 block text-sm'
      "
    >
      {{ error }}
    </span>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { debounce } from "lodash";
const props = defineProps({
  name: String,
  label: String,
  isCumpulsory: Boolean,
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  msgTooltip: {
    type: Boolean,
    default: false,
  },
  error: String,
  classLabel: {
    type: String,
    default: "",
  },
  classInput: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "getQuery"]);

const query = ref("");
const selected = ref(
  props.options.find((opt) => opt.value === props.modelValue) || null
);

const filteredOptions = computed(() => {
  return props.options.filter((opt) =>
    opt.label.toLowerCase().includes(query.value.toLowerCase())
  );
});
const debouncedSearch = debounc((val) => {
  emit("getQuery", val);
}, 800);
watch(query, (val) => {
  debouncedSearch(val);
});

watch(selected, (val) => {
  if (val) {
    emit("update:modelValue", val.value);
  }
});

watch(
  () => props.modelValue,
  (val) => {
    selected.value = props.options.find((opt) => opt.value === val) || null;
  }
);
</script>
