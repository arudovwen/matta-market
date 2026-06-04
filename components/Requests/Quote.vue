<template>
  <div class="bg-white flex-1">
    <form @submit.prevent="onSubmit" class="h-full max-w-[600px] mx-auto">
      <h4 class="text-2xl font-semibold text-left mb-7">Request for quote</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2" v-if="!authStore.isLoggedIn">
          <Textinput
            placeholder=""
            label="Full name"
            name="requestedBy"
            v-bind="requestedByAtt"
            v-model="requestedBy"
            :error="errors.requestedBy"
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
          <FormGroup
            name="contactPhone"
            label="Phone number"
            :error="errors.contactPhone"
          >
            <FormsPhoneCodes v-model="contactPhone" />
          </FormGroup>
        </div>

        <div>
          <FormGroup name="market" :error="errors.market" label="Market">
            <SelectVueSelect
              v-model="market"
              :options="marketOptions"
              :reduce="(option) => option.value"
              placeholder="Select market"
              classInput="!border-none"
              :clearable="false"
            />
          </FormGroup>
        </div>

        <div>
          <FormGroup
            name="applications"
            :error="errors.applications"
            label="Application"
          >
            <SelectVueSelect
              v-model="applications"
              :options="applicationOptions"
              :reduce="(option) => option.value"
              placeholder="Select application"
              classInput="!border-none"
              :clearable="false"
            />
          </FormGroup>
        </div>
        <div class="">
          <FormGroup
            name="packageType"
            :error="errors.packageType"
            label="Package type"
          >
            <SelectVueSelect
              v-model="packageType"
              :options="packageOptions"
              :reduce="(option) => option.value"
              placeholder="Select package"
              classInput="!border-none w-full"
              :clearable="false"
            />
          </FormGroup>
        </div>
        <div class="z-[90] relative">
          <Textinput
            placeholder=""
            label="Quanitity"
            name="quantity"
            v-bind="expectedVolumeAtt"
            v-model="expectedVolume"
            :error="errors.expectedVolume"
            ><template #suffix>
              <span class="request">{{ unit }}</span>
            </template></Textinput
          >
        </div>

        <div class="md:col-span-2">
          <Textinput
            placeholder=""
            label="Address"
            name="deliverAddress"
            v-bind="deliverAddressAtt"
            v-model="deliverAddress"
            :error="errors.deliverAddress"
          />
        </div>

        <div class="md:col-span-2">
          <Textinput
            placeholder=""
            label="Additional information"
            name="additionalInformation"
            v-bind="additionalInformationAtt"
            v-model="additionalInformation"
            :error="errors.additionalInformation"
          />
        </div>
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
  <ActionModal
    :open="isSuccessOpen"
    type="approve"
    title="Request has be sent"
    text="YYour request has been sent. You will be contacted by one of our technical experts shortly."
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
import { useStore } from "vuex";
import { newquote } from "~/services/quoteservice";
import { toast } from "vue3-toastify";

const isSuccessOpen = ref(false);
const isErrorOpen = ref(false);
const isComplete = ref(false);
const product = inject("product");
const store = useStore();
const togglePopup = inject("togglePopup");
const authStore = useAuthStore();
const errorText = ref("Quote request failed");
const quoteForm = reactive({
  sellerId: product.value?.supplierId,
  seller: product.value?.supplier,
  productId: product.value?.id,
  productImg: product.value?.gallery?.[0],
  productName: product.value?.name,
  brand: product.value?.productBrandName,
  producerId: product.value?.producer.id,
  producer: product.value?.producer.title,
  buyerBusinessName: "",
  requestedBy: authStore?.userInfo?.fullName || "",
  sellerName: product.value?.supplier,
  market: "",
  email: "",
  productUse: "",
  expectedVolume: null,
  unit: product.value?.unit,
  deliverAddress: "",
  additionalInformation: "",
  contactPhone: null,
  packageType: product.value?.packagesAvailable?.[0]?.package.id,
  applications: "",
});
const validationSchema = yup.object({
  sellerId: yup.string().required(),
  seller: yup.string().required(),
  productId: yup.string().required(),
  productImg: yup.string().nullable(),
  productName: yup.string().required(),
  brand: yup.string().nullable(),
  producerId: yup.string().required(),
  producer: yup.string().required(),
  buyerBusinessName: yup.string(),
  requestedBy: yup.string().required(),
  sellerName: yup.string().required(),
  market: yup.string().required(),
  productUse: yup.string(),
  expectedVolume: yup.number().min(0),
  unit: yup.string(),
  deliverAddress: yup.string().required(),
  contactPhone: yup.string().required(),
  additionalInformation: yup.string().nullable(),
  packageType: yup.string(),
  applications: yup.string().required(),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: validationSchema,
  initialValues: quoteForm,
});

// Define the fields and their attributes using defineField function

const [requestedBy, requestedByAtt] = defineField("requestedBy");
const [market] = defineField("market");
const [expectedVolume, expectedVolumeAtt] = defineField("expectedVolume");
const [unit] = defineField("unit");
const [email, emailAtt] = defineField("email");
const [deliverAddress, deliverAddressAtt] = defineField("deliverAddress");
const [contactPhone] = defineField("contactPhone");
const [additionalInformation, additionalInformationAtt] = defineField(
  "additionalInformation"
);
const [packageType] = defineField("packageType");
const [applications] = defineField("applications");

const isLoading = ref(false);
const isUploading = ref(false);
const marketStore = useMarketStore();
const appStore = useApplicationStore();
const marketOptions = computed(() => {
  if (!marketStore.marketsData.length) return [];
  return marketStore.marketsData.map((i) => {
    i.name = i.title;
    i.label = i.title;
    i.value = i.title;
    return i;
  });
});
const applicationOptions = computed(() => {
  if (!appStore.applicationsData.length) return [];
  return appStore.applicationsData.map((i) => {
    i.name = i.title;
    i.label = i.title;
    i.value = i.title;
    return i;
  });
});
const packageOptions = computed(() =>
  product.value.packagesAvailable.map((n) => ({
    label: `${n.package.title} ${n.size}  ${n.unit}`,
    value: n.package.id,
  }))
);

const onSubmit = handleSubmit((values) => {
  isLoading.value = true
  const tempData = {
    ...values,
    package: product.value.packagesAvailable?.find(
      (i) => i.package.id === values.packageType
    ),
  };

  newquote(tempData)
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
provide("isComplete", isComplete);
provide("handleChange", null);
</script>
<style>
.request .formGroup .vs__dropdown-toggle {
  border: none;
}
</style>
