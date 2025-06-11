<template>
  <form
    @submit.prevent="onSubmit"
    class="bg-white p-6 rounded-[10px] min-w-[550px]"
  >
    <div class="flex items-center justify-between mb-4 gap-x-5">
      <legend class="text-[#18273AF0] text-lg font-bold">Edit Order</legend>
    </div>

    <div class="grid grid-cols-1 gap-6 mb-7">
      <Textinput
        label="Product name"
        v-model="productName"
        name="productName"
        placeholder=""
        type="text"
        :error="errors.productName"
      />
      <Textinput
        label="Brand"
        v-model="brand"
        name="brand"
        placeholder=""
        type="text"
        :error="errors.brand"
      />

      <div class="relative z-[999] grid grid-cols-2 gap-x-5">
        <FormGroup
          name="packageName"
          :error="errors.packageName"
          label="Package type"
        >
          <SelectVueSelect
            v-model="packageName"
            :options="packageForms"
            :reduce="(title) => title.value"
            placeholder="Select package"
            :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] cursor-pointer ${
              errors.title ? 'border-red-500' : 'border-[#D0D5DD]'
            }`"
          />
        </FormGroup>
        <FormGroup
          name="purchaseAmount"
          label="Edit price"
          :error="errors.purchaseAmount"
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
          <span>Product is available</span>
        </label>
      </div>
    </div>
    <div class="flex items-center justify-end gap-x-4">
      <button
        type="submit"
        class="w-full px-10 py-4 text-sm leading-none text-white rounded-lg appearance-none bg-primary-500 hover:opacity-70"
      >
        Update Order
      </button>
    </div>
  </form>
</template>

<script setup>
import * as yup from "yup";
import { useForm } from "vee-validate";
import { editOrder } from "~/services/cartservice";
import { toast } from "vue3-toastify";

const getData = inject("getData");
const props = defineProps({
  detail: {
    default: null,
  },
});
const { id } = useRoute().params;
const loading = ref(false);
const emits = defineEmits(["close"]);
const packForm = reactive({
  orderId: id,
  productName: "",
  brand: null,
  packageName: null,
  packageId: null,
  purchaseAmount: null,
  isAvailable: false,
  productId: null
});
onMounted(() => {
  if (props.detail) {
    setValues({
      productName: props?.detail?.product,
      packageName: props?.detail?.selectedPackage,
      productId: props?.detail?.id,
      purchaseAmount: props?.detail?.itemTotal,
      brand: props?.detail?.brand,
      packageId: props?.detail.packageId,
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
  {
    label: "Others",
    value: "Others",
  },
];
// {
//   "orderId": 0,
//   "brand": "string",
//   "productId": "string",
//   "packageName": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "purchasepurchaseAmount": 0
// }
const packFormSchema = yup.object({
  productName: yup.string().required("Select a package"),
  purchaseAmount: yup.string().required("purchaseAmount is required"),
  brand: yup.string().nullable(),
  isAvailable: yup.boolean(),
  packageName: yup.string().nullable(),
});

const { handleSubmit, defineField, errors, setValues } = useForm({
  validationSchema: packFormSchema,
  initialValues: packForm,
});

const [productName] = defineField("productName");
const [purchaseAmount] = defineField("purchaseAmount");
const [brand] = defineField("brand");
const [packageName] = defineField("packageName");
const [isAvailable, isAvailableAtt] = defineField("isAvailable");

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    const { status } = editOrder(values);
    if (status === 200) {
      getData();
      toast.success("Product updated!");
      emits("close");
    }
  } catch (error) {
    toast.error(error.response.data?.message);
  } finally {
    loading.value = false;
  }
});
</script>
