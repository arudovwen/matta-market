<template>
  <div class="bg-white flex-1 rounded-lg">
    <form
      @submit.prevent="onSubmit"
      class="h-full max-w-[600px] mx-auto border p-8 rounded-lg border-[#B2DDFF] max-h-[750px] overflow-y-auto"
    >
      <h4 class="text-2xl font-semibold text-left mb-7">
        {{ isDetailPage ? "Request a call" : "Request a product" }}
      </h4>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <Textinput
            placeholder=""
            label="Full name"
            name="email"
            v-bind="fullNameAtt"
            v-model="fullName"
            :error="errors.fullName"
          />
        </div>
        <div>
          <Textinput
            placeholder=""
            label="Business name"
            name="businessName"
            v-bind="businessNameAtt"
            v-model="businessName"
            :error="errors.businessName"
          />
        </div>
        <div>
          <Textinput
            placeholder=""
            label="Email"
            type="email"
            name="email"
            v-bind="emailAtt"
            v-model="email"
            :error="errors.email"
          />
        </div>
        <div>
          <FormGroup name="phone" label="Phone number" :error="errors.phone">
            <FormsPhoneCodes v-model="phone" />
          </FormGroup>
        </div>
        <!-- <div>
          <Textinput
            placeholder=""
            label="Chemical name"
            name="chemicalName"
            v-bind="chemicalNameAtt"
            v-model="chemicalName"
            :error="errors.chemicalName"
          />
        </div> -->

        <div
          class="rounded-lg lg:col-span-2 p-4 border border-gray-200 grid gap-y-4"
        >
          <div
            v-for="(item, idx) in products"
            :key="idx"
            class="flex md:flex-row gap-4 items-center"
          >
            <div class="flex-1">
              <Textinput
                placeholder="Chemical Name"
                label=""
                name="chemicalName"
                v-model="products[idx].chemicalName"
              />
            </div>

            <div class="relative z-10">
              <Textinput
                placeholder="Quantity"
                label=""
                name="quantity"
                v-model="products[idx].quantity"
                type="number"
                :isNumber="true"
              >
                <template #suffix>
                  <span class="request">
                    <SelectVueSelect
                      v-model="products[idx].unit"
                      :options="minimeasurements"
                      :reduce="(option) => option.value"
                      placeholder="unit"
                      classInput="!border-none"
                      :clearable="false"
                    />
                  </span>
                </template>
              </Textinput>
            </div>

            <div class="">
              <button
                v-if="products.length > 1"
                @click="removeProduct(idx)"
                type="button"
                class="hover:text-red-700 text-xl flex items-center"
              >
                <AppIcon icon="lets-icons:trash-duotone" />
              </button>
            </div>
          </div>
          <span
            v-if="errors.products"
            class="text-danger-500 block placeholder-[#f9bb64] text-sm"
            >{{ errors.products }}</span
          >
          <div class="">
            <button
              @click="addProduct"
              type="button"
              class="rounded text-primary-500 text-sm"
            >
              + Add Another Product
            </button>
          </div>
        </div>
        <!-- <FormGroup
          isCumpulsory
          class="lg:col-span-2"
          label="Address"
          :error="errors.address"
        >
          <SelectSearchSelect
            class="w-full"
            v-model.value="address"
            :options="addressOptions"
            placeholder=""
            name="address"
            :reduce="(address) => address.value"
            :loading="addressLoading"
          />
        </FormGroup> -->

        <div class="lg:col-span-2">
          <Textinput
            placeholder=""
            label="Address"
            name="address"
            v-model="address"
          />
        </div>
        <div class="lg:col-span-2">
          <Textinput
            placeholder=""
            label="What do you want to use it for?"
            name="productUse"
            v-bind="productUseAtt"
            v-model="productUse"
          />
        </div>
        <div class="mb-6 lg:col-span-2">
          <FileUpload
            label="Document upload"
            placeholder="Select document to upload"
            id="uploadedDocumentUrl"
            v-model="uploadedDocumentUrl"
            @getName="(value) => setFieldValue('documentName', value)"
            :name="documentName"
          />
        </div>
      </div>
      <div class="flex justify-center">
        <button
          type="submit"
          :disabled="isLoading"
          class="border text-[13px] mb-4 border-primary-500 uppercase text-white w-full lg:min-w-[150px] mx-auto bg-primary-500 disabled:opacity-75 rounded-lg px-6 py-2 hover:bg-primary/80 h-11"
        >
          <span>
            <span
              class="flex gap-x-4 justify-center items-center"
              v-if="isLoading || isUploading"
              ><span> Processing...</span>
              <i
                v-if="isLoading"
                class="fa fa-spinner fa-spin text-white"
                aria-hidden="true"
              ></i
            ></span>
            <span v-else>Submit request</span>
          </span>
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { createproductrequest } from "~/services/productservices";
import { toast } from "vue3-toastify";
import { placeSuggestion } from "~/services/cartservice";
import debounce from "lodash/debounce";

const isComplete = ref(false);
const emits = defineEmits(["close"]);
const props = defineProps({
  productOptions: {
    default: null,
  },
  isDetailPage: {
    default: false,
    type: Boolean,
  },
});
const authStore = useAuthStore();

const form = reactive({
  fullName: authStore.userInfo?.fullName,
  businessName: authStore.userInfo?.companyName,
  email: authStore.userInfo?.email || "",
  phone: authStore.userInfo?.phoneNumber || "",
  address: "",
  documentName: "",
  uploadedDocumentUrl: "",
  confirm: false,
  productUse: "",
  phoneCode: "+234",
  products: [
    {
      quantity: null,
      unit: "g",
      chemicalName: props.productOptions?.chemicalName,
    },
  ],
});
const productSchema = yup.object().shape({
  quantity: yup
    .number()
    .typeError("Invalid value")
    .positive()
    .required("Quantity is required"),
  unit: yup.string().required("Unit is required"),
  chemicalName: yup
    .string()
    .required("Chemical name is required")
    .min(2, "Chemical name must be at least 2 characters"),
});
const validationSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  businessName: yup.string().required("Business name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  uploadedDocumentUrl: yup.string(),
  documentName: yup.string(),
  products: yup
    .array()
    .of(productSchema)
    .min(1, "At least one product is required")
    .required("Products array is required"),
  address: yup.string("Address is required").min(3),
});

const { handleSubmit, defineField, errors, resetForm, setFieldValue } = useForm(
  {
    validationSchema: validationSchema,
    initialValues: form,
  }
);

const [fullName, fullNameAtt] = defineField("fullName");
const [businessName, businessNameAtt] = defineField("businessName");
const [email, emailAtt] = defineField("email");
const [phone] = defineField("phone");
const [productUse, productUseAtt] = defineField("productUse");
const [uploadedDocumentUrl] = defineField("uploadedDocumentUrl");
const [documentName] = defineField("documentName");
const [products] = defineField("products");
const [address] = defineField("address");

const isLoading = ref(false);
const isUploading = ref(false);

// Add new product
const addProduct = () => {
  products.value.push({
    quantity: null,
    unit: "g",
    chemicalName: "",
  });
};

// Remove product
const removeProduct = (index) => {
  if (products.value.length > 1) {
    products.value.splice(index, 1);
    // emit('update:modelValue', products.value);
  }
};
const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  createproductrequest(values)
    .then((res) => {
      if (res.status === 200) {
        isComplete.value = true;
        isLoading.value = false;
        resetForm();
        toast.success("Request Successful");
        if (props.isDetailPage) {
          emits("close");
        }
      }
    })

    .catch((err) => {
      isLoading.value = false;

      toast.error(err?.response?.data?.message || err?.response?.data?.Message);
    });
});
const addressOptions = ref([]);
const addressLoading = ref(false);
const debounceSearch = debounce(() => {
  addressLoading.value = true;
  placeSuggestion({ text: address.value })
    .then((res) => {
      if (res.status === 200) {
        addressOptions.value = res.data.map((i, index) => ({
          label: i.text,
          value: i.text,
        }));
        addressLoading.value = false;
      }
    })
    .catch(() => {
      addressLoading.value = false;
    });
}, 1000);
watch(address, () => {
  debounceSearch();
});
provide("isComplete", isComplete);
provide("handleChange", null);
</script>
<style>
.request .formGroup .vs__dropdown-toggle {
  border: none;
}
</style>
