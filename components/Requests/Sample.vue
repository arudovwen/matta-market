<template>
  <div class="bg-white flex-1">
    <form @submit.prevent="onSubmit" class="h-full max-w-[600px] mx-auto">
      <h4 class="text-2xl font-semibold text-left mb-1">Request for sample</h4>
      <p class="text-xs text-[#ABABAB] mb-8">
        This information will help us get you the right materials.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="">
          <Textinput
          :isCumpulsory="true"
            placeholder=""
            label="Number of samples"
            name="numberOfSamples"
            v-model="numberOfSamples"
            disabled
          />
        </div>

        <div>
          <Textinput
          :isCumpulsory="true"
            placeholder=""
            label="Email"
            type="email"
            name="email"
            v-bind="emailAtt"
            v-model="email"
            :error="errors.email"
            disabled
          />
        </div>

        <div>
          <FormGroup :isCumpulsory="true" name="phone" label="Phone number" :error="errors.phone">
            <FormsPhoneCodes v-model="phone" />
          </FormGroup>
        </div>

        <div class="z-[90] relative">
          <Textinput
          :isCumpulsory="true"
            placeholder=""
            label="Expected annnual usage"
            name="expectedAnualUsage"
            v-bind="expectedAnualUsageAtt"
            v-model="expectedAnualUsage"
            :error="errors.expectedAnualUsage"
            ><template #suffix>
              <span class="request">{{ unit }}</span>
            </template></Textinput
          >
 
        </div>
        <div class="md:col-span-2">
          <Textinput
            placeholder=""
            label="Description"
            name="description"
            v-bind="descriptionAtt"
            v-model="description"
            :error="errors.description"
          />
        </div>

        <div class="md:col-span-2">
          <FormGroup
            isCumpulsory
            class="lg:col-span-2"
            label="Address"
            :error="errors.shippingAddressId"
          >
            <SelectVueSelect
              class="w-full"
              v-model.value="shippingAddressId"
              :options="addressOptions"
              placeholder=""
              name="shippingAddressId"
              :reduce="(address) => address.value"
            />
          </FormGroup>

        </div>

        <!-- <div class="md:col-span-2">
          <Textinput
            placeholder=""
            label="Address Description"
            name="addressDescription"
            v-bind="addressDescriptionAtt"
            v-model="addressDescription"
            :error="errors.addressDescription"
          />
        </div> -->
      </div>

      <div class="flex justify-center mt-8">
        <button
          type="submit"
          :disabled="isLoading"
          class="border text-[13px] mb-4 border-primary- uppercase text-white w-full lg:min-w-[150px] mx-auto bg-primary-500 rounded-lg px-6 py-2 hover:bg-primary/80 h-11"
        >
          <span>
            <span
              class="flex gap-x-4 justify-center items-center"
              v-if="isLoading"
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
  <ActionModal
    :open="isSuccessOpen"
    type="approve"
    title="Request has be sent"
    text="Your request has been sent. You will be contacted by one of our sales reps within the next 24hrs."
    btnText="Okay"
    :isCancel="false"
    @actionItem="
      () => {
        isSuccessOpen = false;
        togglePopup();
      }
    "
    @close="togglePopup"
  />
  <ActionModal
    :open="isErrorOpen"
    type="reject"
    title="Request Failed"
    :text="errorText"
    btnText="Retry"
    @actionItem="() => (isErrorOpen = false)"
    @close="() => (isErrorOpen = false)"
  />
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { addrequest } from "~/services/procurementservice";

const authStore = useAuthStore();
const shippingStore = useShippingStore();
const isSuccessOpen = ref(false);
const isErrorOpen = ref(false);
const isComplete = ref(false);
const product = inject("product");
const supplierStore = useSupplierStore();
const togglePopup = inject("togglePopup");
const errorText = ref("Quote request failed");
const sampleForm = reactive({
  sellerId: product.value?.supplierId,
  seller: supplierStore.supplierData?.companyName,
  productId: product.value?.id,
  productImg: product.value?.gallery[0],
  productName: product.value?.name,
  producerId: product.value?.producer.id,
  producer: product.value?.producer.title,
  numberOfSamples: "1",
  expectedAnualUsage: "1",
  description: "",
  email: authStore?.userInfo?.email,
  phone:  authStore?.userInfo?.phone,
  shippingAddressId: null,
  addressDescription: "",
  unit: product.value?.unit,
});
const validationSchema = yup.object({
  numberOfSamples: yup.number().typeError("Invalid value").required(),
  expectedAnualUsage: yup.number().typeError("Invalid value").required(),
  description: yup.string().notRequired(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  shippingAddressId: yup.mixed().nullable(),
  addressDescription: yup.string().notRequired(),
  unit:yup.string()
});

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: validationSchema,
  initialValues: sampleForm,
});

// Define the fields and their attributes using defineField function

const [numberOfSamples, numberOfSamplesAtt] = defineField("numberOfSamples");
const [expectedAnualUsage, expectedAnualUsageAtt] =
  defineField("expectedAnualUsage");
const [description, descriptionAtt] = defineField("description");
const [addressDescription, addressDescriptionAtt] =
  defineField("addressDescription");
const [email, emailAtt] = defineField("email");
const [shippingAddressId] = defineField("shippingAddressId");
const [phone] = defineField("phone");
const [unit] = defineField("unit");

const isLoading = ref(false);
const isUploading = ref(false);
const addressOptions = computed(() => shippingStore.addressesData);

const onSubmit = handleSubmit((values) => {
  isLoading.value = true
  addrequest({
    ...values,
    package: values.packageType,
  })
    .then((res) => {
      if (res.status === 200) {
        isLoading.value = false;
        resetForm();
        isSuccessOpen.value = true;
   
      }
    })

    .catch((err) => {
      isLoading.value = false;
      errorText.value =
        err?.response?.data?.message || err?.response?.data?.Message;
    });
});

onMounted(() => {
  shippingStore.getAlladdress();
});
provide("isComplete", isComplete);
provide("handleChange", null);
</script>
<style>
.request .formGroup .vs__dropdown-toggle {
  border: none;
}
</style>
