<template>
  <form
    @submit.prevent="onSubmit"
    class="bg-white p-6 rounded-[10px] min-w-[400px]"
  >
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

    <div class="grid grid-cols-1 gap-y-5 mb-7">
      <FormGroup
        name="title"
        :error="errors.title"
        label="Package type"
        isCumpulsory
        info
        infoTitle="Kindly select from the list the appropriate type of product package"
      >
        <SelectVueSelect
          v-model="title"
          :options="packageForms"
          :reduce="(title) => title.value"
          placeholder="Select package"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] ! cursor-pointer ${
            errors.title ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>
      <FormGroup
        name="purchaseAmount"
        label="Unit price"
        :error="errors.purchaseAmount"
        isCumpulsory
        info
        infoTitle="Please indicate the selling price for the selected unit of measurement"
      >
        <CurrencyInput
          min="1"
          :class="`outline-none px-[14px] py-[10px] min-w-[180px] w-full !bg-white border !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.purchaseAmount ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
          v-model="purchaseAmount"
          :options="{
            currency: 'ngn',
            currencyDisplay: 'hidden',
          }"
        />
      </FormGroup>
      <div>
        <Textinput
          v-model="size"
          v-bind="sizeAtt"
          name="size"
          placeholder=""
          type="text"
          :error="errors.size"
          class="flex-1"
          isCumpulsory
          label="Package Size"
          info
          infoTitle="Indicate what quantity of unit of measurement makes up the selected package type"
        >
          <template #content>
            <select
              v-model="unit"
              v-bind="unitAtt"
              name="unit"
              class="outline-none absolute right-2 w-max"
            >
              <option v-for="i in measurements" :key="i.value" :value="i.value">
                {{ i.name }}
              </option>
            </select>
          </template>
        </Textinput>

        <div class="flex gap-x-1 items-center mt-3">
          <span class="text-[#344054]">Package price:</span>
          <span class="font-medium">{{
            currencyFormat(size * purchaseAmount)
          }}</span>
        </div>
      </div>

      <Textinput
        label="Color"
        v-model="color"
        v-bind="colorAtt"
        name="color"
        placeholder=""
        type="text"
        :error="errors.color"
        class="!"
        info
        infoTitle="What is the colour of the product?"
      />

      <Textinput
        label="Purity"
        v-model="purity"
        v-bind="purityAtt"
        name="purity"
        placeholder=""
        min="0"
        max="100"
        :error="errors.purity"
        icon="ic:baseline-percent"
        hasIcon
        info
        infoTitle=" Kindly state the purity of the product if known"
      />

      <div>
        <label title="" for="isAvailable" class="flex item-center leading-[normal]">
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
import { v4 as uuidv4 } from "uuid";

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
  id: uuidv4(),
});
onMounted(() => {
  if (props.detail) {
    setValues({
      ...props.detail,
      title: props?.detail?.package?.title,
      id: props?.detail?.package?.id,
    });
  }
});

const packageForms = [
  {
    label: "Plastic drum",
    value: "Plastic drum",
  },
  {
    label: "Metal drum",
    value: "Metal drum",
  },
  {
    label: "Keg",
    value: "Keg",
  },
  {
    label: "Carton",
    value: "Carton",
  },
  {
    label: "Bag",
    value: "Bag",
  },
  {
    label: "Cylinder",
    value: "Cylinder",
  },
  {
    label: "Tank",
    value: "Tank",
  },
];

const packFormSchema = yup.object({
  title: yup.string().required("Select a package"),
  purchaseAmount: yup.string().required("Amount is required"),
  color: yup.string().nullable(),
  purity: yup
    .number()
    .typeError("Invalid value")
    .max(100, "Maximum is 100")
    .nullable(),
  size: yup.number().typeError("Invalid value").required("Amount is required"),
  isAvailable: yup.boolean(),
  unit: yup.string(),
  id: yup.string(),
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
      package: { title: values.title, id: values.id },
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
        package: { title: values.title, id: values.id },
      };
    }
  }
  emits("close");
});
</script>
