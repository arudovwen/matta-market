<template>
  <div class="w-[520px] h-auto max-h-[400px] rounded-lg border-gray border-2 bg-white px-8 border-box">
    <div class="w-full py-4">
      <span class="text-[#344054] font-bold text-xl">Shipping Calculator</span>
    </div>
    <form>
      <div class="w-full flex flex-row justify-between">
        <div class="w-[48%]">
          <Textinput isCumpulsory label="Full Name" v-model="fullName" v-bind="fullNameAtt" name="fullName"
            placeholder="" type="text" :error="errors.name" classInput="!w-full" />
        </div>
        <div class="w-[48%]">
          <Textinput isCumpulsory label="Email Address" v-model="email" v-bind="emailAtt" name="email" placeholder=""
            type="text" :error="errors.email" classInput="!w-full" />
        </div>
      </div>
      <div class="w-full flex flex-row justify-between">
        <div class="w-[48%]">
          <Textinput label="Company (optional)" v-model="company" v-bind="companyAtt" name="company" placeholder=""
            type="text" :error="errors.company" classInput="!w-full" info
            infoTitle="What is the appearance of the product?" />
        </div>
        <div class="w-[48%]">
          <FormGroup name="pickupLocation" :error="errors.pickupLocation" label="Pickup Location" isCumpulsory>
            <FormsStatesSelect v-model="pickupLocation" :vbind="pickupLocationAtt"
              :states="countries.find((i) => i.name === 'Nigeria')?.states" />
          </FormGroup>
        </div>
      </div>
      <div class="w-full flex flex-row justify-between">
        <div class="w-[48%]">
          <FormGroup name="title" :error="errors.destination" label="Destination" isCumpulsory>
            <FormsStatesSelect v-model="destination" :vbind="destinationAtt"
              :states="countries.find((i) => i.name === 'Nigeria')?.states" />
          </FormGroup>
        </div>
        <div class="w-[48%]">
          <Textinput v-model="size" v-bind="sizeAtt" name="size" placeholder="" type="number" isCumpulsory
            label="Package Size" info
            infoTitle="Indicate what quantity of unit of measurement makes up the selected package type">
            <template #suffix>
              <SelectVueSelect :id="`size-dropdown`" class-input="!border-none" :clearable="false" v-model="unit"
                :vbind="unitAtt" :options="measurements" :reduce="(title) => title.name.toLowerCase()"
                placeholder="Select package size" :error="errors.unit" />
            </template>
          </Textinput>
        </div>
      </div>
      <div v-if="requestError" class="w-full flex flex-row justify-center items-center pt-2">
        <span class="text-danger-500 text-[12px]">{{ requestError }}</span>
      </div>
      <div
        class="w-full mt-4 input-control w-full block focus:outline-none h-[44px] !bg-[#F2F4F7] px-8 !flex !flex-row !justify-between">
        <span class="text-[#667085]">Cost of Shipping</span>
        <span class="font-bold">{{ cost ? currencyFormat(cost) : " - " }}</span>
      </div>
    </form>
  </div>
</template>
<script setup>
import { useForm } from "vee-validate";
import { watch } from "vue";
import * as yup from "yup";
import countries from "~/utils/countries.json";
import axios from "axios";

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
    size: 0,
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

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

watch(
  () => [
    values.fullName,
    values.companyName,
    values.email,
    values.pickupLocation,
    values.destination,
    values.size,
    values.unit,
  ],
  async () => {
    const { valid } = await validate();
    if (valid) {
      requestError.value = null;
      cost.value = null;
      axios
        .post("https://dev.gateway.deltalog.co/api/Anonymous/shipping-cost", {
          ...values,
          size: parseInt(values.size),
        })
        .then((res) => {
          cost.value = res.data.data?.cost;
        })
        .catch((error) => {
          requestError.value = error.response.data.Message;
        });
    }
  }
);
</script>

<style lang="scss">
#size-dropdown>div>div>div>.vs__dropdown-toggle {
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
