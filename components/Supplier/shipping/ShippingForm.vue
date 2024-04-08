<template>
  <h3 class="font-medium text-2xl mb-8">Add new shipping address</h3>
  <form @submit.prevent="handleSubmit">
    <div class="grid grid-cols-2 gap-x-4">
      <div class="mb-6">
        <label class="mb-2 font-medium text-sm text-[#344054] block text-left">First name</label>
        <input
          v-model="v$.firstName.$model"
          :class="{ 'border-red-500': v$.firstName.$error }"
          class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          autocomplete="off"
          autofocus="on"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.firstName.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="mb-6">
        <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Last name</label>
        <input
          v-model="v$.lastName.$model"
          :class="{ 'border-red-500': v$.lastName.$error }"
          class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          autocomplete="off"
          autofocus="on"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.lastName.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-x-4">
      <div class="mb-6">
        <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Country</label>
        <div class="relative">
          <CountriesSelect v-model="v$.country.$model" />
          <div
            class="text-red-500 mt-1"
            v-for="error of v$.country.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
      </div>
      <div class="mb-6">
        <label class="mb-2 font-medium text-sm text-[#344054] block text-left">City</label>
        <input
          v-model="v$.city.$model"
          :class="{ 'border-red-500': v$.city.$error }"
          class="px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] rounded-lg focus:outline-matta-black/20"
          autocomplete="off"
          autofocus="on"
          placeholder="Company city"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.city.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-x-4">
      <div class="mb-6">
        <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Street</label>
        <input
          v-model="v$.street.$model"
          :class="{ 'border-red-500': v$.street.$error }"
          class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          autocomplete="off"
          autofocus="on"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.street.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="mb-6">
        <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Postal code</label>
        <input
          v-model="v$.postalCode.$model"
          :class="{ 'border-red-500': v$.postalCode.$error }"
          class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          autocomplete="off"
          autofocus="on"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.postalCode.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>
    <div class="mb-6">
      <label class="text-xs flex gap-x-2 items-center">
        <input type="checkbox" class="accent-matta-black" />Mark as Default
        shipping address
      </label>
    </div>
    <div class="mb-5 flex justify-end gap-x-4 mt-8">
      <button class="text-xs upperase hover:bg-gray-50">Cancel</button>
      <button
        class="text-xs uppercase bg-primary-500 text-white px-5 py-4 rounded-lg hover:bg-primary/70"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
import { toast } from 'vue3-toastify';
import { useRoute } from "vue-router";
import { loginUser } from "~/services/authservices";
import CountriesSelect from "~/components/forms/CountriesSelect";
import { useStore } from "vuex";

const store = useStore();

const route = useRoute();
const form = reactive({
  firstName: "",
  lastName: "",
  country: "",
  city: "",
  street: "",
  postalCode: "",
});
const isLoading = ref(false);

const rules = {
  firstName: {
    required,
    maxLength: maxLength(50),
  },

  postalCode: {},
  lastName: {
    required,
  },
  country: {
    required,
  },
  street: {
    required,
  },
  city: {
    required,
  },
};

const v$ = useVuelidate(rules, form);

async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;
  loginUser(form)
    .then((res) => {
      if (res.status === 200) {
        store.commit("setUser", res.data.data);
        toast.info("Login successful");
        if (route.query.redirected_from) {
          window.location.href = route.query.redirected_from;
          return;
        }
        if (route.query.redirect_to) {
          window.location.href = route.query.redirect_to;
          return;
        }

        window.location.href = "/";
      }
    })

    .catch((err) => {
      isLoading.value = false;

      toast.error((err.response.data.message || err.response.data.Message));
    });
}
</script>
