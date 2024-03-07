<template>
  <form @submit.prevent="onSubmit" class="grid bg-white p-6 rounded-[10px]">
    <div class="flex gap-x-5 justify-between items-center mb-4">
      <legend class="text-[#18273AF0] text-lg font-bold">
        {{ detail ? "Edit" : "Add" }} Package
      </legend>
      <button
        @click="emits('close')"
        type="button"
        class="h-6 w-6 text-[#8C8C8C] bg-[#F5F5F5] rounded-full flex items-center justify-center text-[13px]"
      >
        <AppIcon icon="ph:x-bold" />
      </button>
    </div>
    <div class="grid relative gap-y-6 mb-7">
      <div>
        <div class="flex justify-between items-center">
          <label
            class="mb-2 font-medium text-sm text-[#344054] block text-left"
          >
            <span class="text-red-500 mr-[.5px]">*</span> Package name
          </label>
        </div>
        <Listbox v-model="title" v-bind="titleAtt" name="title">
          <div class="relative mt-1">
            <ListboxButton
              class="relative w-full text-left rounded-lg flex items-center appearance-none px-[14px] py-[10px] h-11 border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            >
              <span class="block truncate text-sm">{{
                title || "Select pack"
              }}</span>
              <span class="right-0 pr-2 absolute"
                ><AppIcon
                  icon="ph:caret-down-bold"
                  iconClass="h-4 w-4 text-[#667085]"
                  aria-hidden="true"
              /></span>
            </ListboxButton>

            <transition
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute mt-1 w-[200px] z-40 rounded-md bg-white py-4 text-base shadow-lg focus:outline-none sm:text-sm border border-gray-100"
              >
                <div class="mx-h-60 overflow-y-auto">
                  <ListboxOption
                    v-slot="{ selected }"
                    v-for="(p, i) in packageForms"
                    :key="i"
                    :value="p"
                    as="template"
                  >
                    <li
                      :class="[
                        'relative cursor-pointer  text-matta-black  hover:text-primary select-none py-2 pl-6 pr-4 text-left',
                      ]"
                    >
                      <span
                        :class="[selected ? 'font-medium' : 'font-normal']"
                        >{{ p }}</span
                      >
                    </li>
                  </ListboxOption>
                </div>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <div class="grid grid-cols-2 gap-x-4 gap-y-6">
        <div>
          <label
            class="mb-2 font-medium text-sm text-[#344054] block text-left"
          >
            <span class="text-red-500 mr-[.5px]">*</span> Size
          </label>
          <div class="relative flex items-center">
            <Textinput
              v-model="size"
              v-bind="sizeAtt"
              name="size"
              placeholder=""
              type="text"
              :error="errors.size"
              class="h-11 flex-1"
              horizontal
            >
              <template #content>
                <select
                  v-model="unit"
                  v-bind="unitAtt"
                  name="unit"
                  class="outline-none absolute right-2"
                >
                  <option
                    v-for="i in measurements"
                    :key="i.value"
                    :value="i.value"
                  >
                    {{ i.value }}
                  </option>
                </select>
              </template>
            </Textinput>
          </div>
        </div>
        <div>
          <label
            class="mb-2 font-medium text-sm text-[#344054] flex items-center gap-x-1 text-left"
          >
            <span class="text-red-500 mr-[.5px]">*</span>
            <span>Purchase Price </span>
            <span
              data-toggle="tooltip"
              data-placement="top"
              title="Please indicate price with respect to the selected unit of measurement"
              class="cursor-pointer"
            >
              <AppIcon icon="quill:info" iconClass="text-gray-600" />
            </span>
          </label>

          <div class="relative">
            <div class="relative flex items-center">
              <CurrencyInput
                v-model="purchaseAmount"
                v-bind="purchaseAmountAtt"
                name="purchaseAmount"
                class="rounded-lg text-sm px-[14px] py-3 h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                placeholder=""
                :options="{
                  currency: 'ngn',
                  currencyDisplay: 'narrowSymbol',
                }"
              />
            </div>
          </div>
        </div>
        <div>
          <label class="mb-2 font-medium text-sm text-[#344054] block text-left"
            >Color
          </label>

          <div class="flex relative items-center">
            <Textinput
              v-model="color"
              v-bind="colorAtt"
              name="color"
              placeholder=""
              type="text"
              :error="errors.color"
              class="!h-11"
            />
          </div>
        </div>
        <div>
          <label class="mb-2 font-medium text-sm text-[#344054] block text-left"
            >Purity
          </label>
          <div class="relative">
            <div class="relative flex items-center">
              <Textinput
                v-model="purity"
                v-bind="purityAtt"
                name="purity"
                placeholder=""
                min="0"
                max="100"
                :error="errors.purity"
              />
              <span class="absolute right-2 text-xs">%</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <label for="isAvailable" class="flex item-center leading-[normal]">
          <input
            id="isAvailable"
            type="checkbox"
            class="mr-2 accent-primary-500"
            v-model="isAvailable"
            v-bind="isAvailableAtt"
            name="isAvailable"
          />
          <span>Package is available</span>
        </label>
      </div>
    </div>
    <div class="flex gap-x-4 items-center justify-end">
      <button
        type="submit"
        class="appearance-none leading-none px-10 py-4 w-full rounded-lg text-white bg-primary-500 hover:opacity-70 text-sm"
      >
        {{ detail ? "Update" : "Add" }} package
      </button>
    </div>
  </form>
</template>
<script setup>
import * as yup from "yup";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { useForm } from "vee-validate";

const form = inject("form");
const props = defineProps({
  detail: {
    default: null,
  },
});
const emits = defineEmits(["close"]);
const packForm = reactive({
  title: "",
  purchaseAmount: null,
  color: "",
  purity: null,
  size: "",
  isAvailable: false,
  unit: form.unit,
});
onMounted(() => {
  if (props.detail) {
    setValues({ ...props.detail, title: props?.detail?.package?.title });
  }
});

const packageForms = [
  "Plastic drum",
  "Metal drum",
  "Keg",
  "Carton",
  "Bag",
  "Cylinder",
  "Tank",
];

const packFormSchema = yup.object({
  title: yup.string().required(),
  purchaseAmount: yup.string().required(),
  color: yup.string().nullable(),
  purity: yup
    .number()
    .typeError("Invalid value")
    .max(100, "Maximum is 100")
    .nullable(),
  size: yup.number().typeError("Invalid value").required(),
  isAvailable: yup.boolean(),
  unit: yup.string(),
});

const { handleSubmit, defineField, errors, setValues } = useForm({
  validationSchema: packFormSchema,
  initialValues: packForm,
});

const [title, titleAtt] = defineField("title");
const [purchaseAmount, purchaseAmountAtt] = defineField("purchaseAmount");
const [color, colorAtt] = defineField("color");
const [size, sizeAtt] = defineField("size");
const [isAvailable, isAvailableAtt] = defineField("isAvailable");
const [purity, purityAtt] = defineField("purity");
const [unit, unitAtt] = defineField("unit");

const onSubmit = handleSubmit((values) => {
  if (!props.detail) {
    form.packagesAvailable.push({
      ...values,
      package: { title: values.title },
    });
  } else {
    const index = form.packagesAvailable.findIndex(
      (i) =>
        i.title === props.detail.title &&
        i.purchaseAmount === props.detail.purchaseAmount &&
        i.size === props.detail.size
    );
    if (index !== -1) {
      form.packagesAvailable[index] = {
        ...values,
        package: { title: values.title },
      };
      console.log("🚀 ~ form.packagesAvailable.map ~ values:", values);
    }
  }
  emits("close");
});
</script>
