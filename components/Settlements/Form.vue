<template>
  <div class="bg-white w-full sm:min-w-[350px]">
    <legend class="block text-[20px] font-bold mb-8 text-left">
      {{ detail ? "Update" : "Add" }} Settlement Account
    </legend>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-y-6 w-full">
      <FormGroup label="Bank" :error="errors.bank" name="bank">
        <Select
          v-model="bank"
          :options="bankOptions"
          placeholder="Select bank"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.bank ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>
      <div>
        <Textinput
          placeholder=""
          label="Account name"
          name="accountName"
          v-bind="accountNameAtt"
          v-model="accountName"
          :error="errors.accountName"
        />
      </div>

      <div>
        <Textinput
          placeholder=""
          label="Account number"
          name="accountNumber"
          classInput="!h-[45px]"
          v-model="accountNumber"
          v-bind="accountNumberAtt"
          :error="errors.accountNumber"
        />
      </div>

      <div
        class="flex items-center text-[#333] darks:text-slate-400 text-xs md:text-sm gap-x-[2px]"
      >
        <Checkbox
          label="Set as primary account"
          labelClass="text-xs md:text-sm"
          v-model="isPrimary"
          v-bind="isPrimaryAtt"
        />
      </div>

      <div class="grid grid-cols-2 gap-x-4 mt-4">
        <button
          @click="isOpen = false"
          type="button"
          class="appearance-none leading-none px-5 lg:px-10 py-[10px] rounded-lg text-primary border-primary- border hover:bg-gray-300"
        >
          Cancel
        </button>
        <AppButton
          type="submit"
          :isLoading="isLoading"
          :isDisabled="isLoading"
          :text="`${detail ? 'Update' : 'Add'} account`"
          btnClass="normal-case btn-primary !py-3"
        />
      </div>
    </form>
  </div>
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import { addshipping } from "~/services/cartservice";

const props = defineProps(["id", "detail"]);
const isOpen = inject("isOpen");
const shippingStore = useShippingStore();
const isLoading = ref(false);
const formValues = {
  bank: "",
  accountNumber: "",
  accountName: "",
  isPrimary: false,
};

const schema = yup.object({
  bank: yup.string().required("Bank name is required"),
  accountNumber: yup.string().required("Account number is required"),
  accountName: yup.string().required("Account name is required"),
  isPrimary: yup.boolean(),
});

const { handleSubmit, defineField, errors, setValues } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
onMounted(() => {
  if (props.detail) {
    setValues(props.detail);
  }
});
const [bank, bankAtt] = defineField("bank");
const [accountNumber, accountNumberAtt] = defineField("accountNumber");
const [accountName, accountNameAtt] = defineField("accountName");
const [isPrimary, isPrimaryAtt] = defineField("isPrimary");
const bankOptions = [
  {
    label: "First Bank",
    value: "fiest bank",
  },
];
const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  addshipping(values)
    .then((res) => {
      if (res.status === 200) {
        toast.info("Address added");
        shippingStore?.getAlladdress();
        isOpen.value = false;
      }
    })

    .catch((err) => {
      isLoading.value = false;
      if (err.response.data.message || err.response.data.Message) {
        toast.error(err.response.data.message || err.response.data.Message);
      }
    });
});
</script>
