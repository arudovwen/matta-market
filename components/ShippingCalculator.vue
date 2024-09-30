<template>
  <div
    class="w-full transition-[height] mb-8 h-fit rounded-lg justify-self-center border-gray border-2 bg-white pb-8 pt-6 border-box py-auto mr-auto sm:w-[520px] sm:mr-2 px-2 sm:px-8"
  >
    <div class="w-full py-4">
      <span class="text-[#344054] font-bold text-xl">Shipping Calculator</span>
    </div>
    <form @submit.prevent="onSubmit" class="grid gap-y-6">
      <template v-if="!cost">
        <div class="w-full flex flex-row justify-between">
          <div class="w-[48%]">
            <Textinput
              isCumpulsory
              label="Full Name"
              v-model="fullName"
              v-bind="fullNameAtt"
              name="fullName"
              placeholder=""
              type="text"
              :error="errors.name"
              classInput="!w-full"
            />
          </div>
          <div class="w-[48%]">
            <Textinput
              isCumpulsory
              label="Email Address"
              v-model="email"
              v-bind="emailAtt"
              name="email"
              placeholder=""
              type="text"
              :error="errors.email"
              classInput="!w-full"
            />
          </div>
        </div>
        <div class="w-full flex flex-row justify-between">
          <div class="w-[48%]">
            <Textinput
              label="Company (optional)"
              v-model="company"
              v-bind="companyAtt"
              name="company"
              placeholder=""
              type="text"
              :error="errors.company"
              classInput="!w-full"
              info
              infoTitle="What is the appearance of the product?"
            />
          </div>
          <div class="w-[48%]">
            <FormGroup
              name="pickupLocation"
              :error="errors.pickupLocation"
              label="Pickup Location"
              isCumpulsory
            >
              <FormsStatesSelect
                v-model="pickupLocation"
                :vbind="pickupLocationAtt"
                :states="countries.find((i) => i.name === 'Nigeria')?.states"
              />
            </FormGroup>
          </div>
        </div>
        <div class="w-full flex flex-row justify-between">
          <div class="w-[48%]">
            <FormGroup
              name="title"
              :error="errors.destination"
              label="Destination"
              isCumpulsory
            >
              <FormsStatesSelect
                v-model="destination"
                :vbind="destinationAtt"
                :states="countries.find((i) => i.name === 'Nigeria')?.states"
              />
            </FormGroup>
          </div>
          <div class="w-[48%]">
            <Textinput
              v-model="size"
              v-bind="sizeAtt"
              name="size"
              placeholder=""
              type="number"
              isCumpulsory
              label="Package Size"
              info
              infoTitle="Indicate what quantity of unit of measurement makes up the selected package type"
            >
              <template #suffix>
                <SelectVueSelect
                  :id="`size-dropdown`"
                  class-input="!border-none"
                  :clearable="false"
                  v-model="unit"
                  :vbind="unitAtt"
                  :options="measurements"
                  :reduce="(title) => title.value"
                  placeholder="Select package size"
                  :error="errors.unit"
                />
              </template>
            </Textinput>
          </div>
        </div>
        <div
          v-if="requestError"
          class="w-full flex flex-row justify-center items-center pt-2"
        >
          <span class="text-danger-500 text-[12px]">{{ requestError }}</span>
        </div>
      </template>
      <template v-if="cost">
        <div
          class="w-full mt-4 input-control w-full block focus:outline-none h-[44px] !bg-[#F2F4F7] px-8 !flex !flex-row !justify-between"
        >
          <span class="text-[#667085]">Cost of Shipping</span>
          <span class="font-bold">{{
            cost ? currencyFormat(cost) : " - "
          }}</span>
        </div>
        <button
          @click="cost = null"
          class="bg-[#165EF0] w-full text-white flex justify-center items-center mt-4 rounded-[5px] px-[24px] py-[9px] gap-x-1 font-semibold"
        >
          <span class="text-[#fff]">Do another calculation</span>
        </button>
      </template>
      <button
        v-else
        class="bg-[#165EF0] w-full text-white flex justify-center items-center mt-4 rounded-[5px] px-[24px] py-[9px] gap-x-1 font-semibold"
      >
        <span v-if="!isLoading" class="text-[#fff]">Calculate</span>
        <template v-if="isLoading">
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            :class="loadingClass"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading ...
        </template>
      </button>
    </form>
  </div>
</template>
<script setup>
import { useForm } from "vee-validate";
import { watch } from "vue";
import * as yup from "yup";
import countries from "~/utils/countries.json";
import { calculateCost } from "~/services/deltaservice";

const {
  handleSubmit,
  defineField,
  errors,
  setFieldValue,
  resetForm,
  values,
  validate,
} = useForm({
  validationSchema: yup.object({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    companyName: yup.string().notRequired(),
    pickupLocation: yup.string().required(),
    destination: yup.string().required(),
    size: yup.number(),
    unit: yup.string().required(),
  }),
  initialValues: reactive({
    fullName: "",
    email: "",
    companyName: "",
    size: null,
    unit: "gramme",
    pickupLocation: "",
    destination: "",
  }),
});

const [fullName, fullNameAtt] = defineField("fullName");
const [email, emailAtt] = defineField("email");
const [company, companyAtt] = defineField("companyName");
const [pickupLocation, pickupLocationAtt] = defineField("pickupLocation");
const [destination, destinationAtt] = defineField("destination");
const [size, sizeAtt] = defineField("size");
const [unit, unitAtt] = defineField("unit");

const cost = ref(null);
const requestError = ref(null);
const isLoading = ref(false);
const calculate = (v) => {
  requestError.value = null;
  isLoading.value = true;
  calculateCost({
    ...values,
    size: parseFloat(values.size),
  })
    .then((res) => {
      cost.value = res.data.data?.cost;
      isLoading.value = false;
    })
    .catch((error) => {
      requestError.value = error.response.data.Message;
      isLoading.value = false;
    });
};

const measurements = [
  { value: "Gram", name: "Gramme", label: "Gramme" },
  { value: "Kilogram", name: "Kilogramme", label: "Kilogram" },
  { value: "Liter", name: "Litre", label: "Litre" },
  { value: "CubicMeter", name: "Cubicmetre", label: "Cubic Metre" },
  { value: "SquareMeter", name: "Squaremetre", label: "Square Metre" },
  { value: "Tonne", name: "Ton", label: "Ton" },
  { value: "Milliliter", name: "Millilitre", label: "Millilitre" },
  { value: "mm", name: "Millimetre", label: "Millimetre" },
  { value: "mm", name: "Millimetre", label: "Millimetre" },
];

const onSubmit = handleSubmit((values) => calculate(values));
</script>

<style lang="scss">
#size-dropdown > div > div > div > .vs__dropdown-toggle {
  height: 16px;
  border: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

#size-dropdown {
  input.vs__search {
    display: none;
  }
}
</style>

<!-- width: 520px;
height: 452px;
top: 88px;
left: 808px;
gap: 0px;
border-radius: 12px 0px 0px 0px;
border: 1px 0px 0px 0px;
opacity: 0px; -->
