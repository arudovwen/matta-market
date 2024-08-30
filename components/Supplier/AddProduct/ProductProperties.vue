<template>
  <form class="px-4 lg:px-[30px]" @submit.prevent="handleSubmit">
    <FeaturedProp title="Properties" type="property" />
    <hr class="border-[#F4F7FE] my-10" />
    <FeaturedProp title="Technical Details & Test Data" type="technical" />
    <hr class="border-[#F4F7FE] my-10" />
    <FeaturedProp title="Regulatory & Compliance" type="compliance" :optional="true" />

    <hr class="border-[#F4F7FE] my-10" />

    <div class="bg-white rounded-lg py-6 flex justify-between gap-x-10 items-center">
      <!-- <button
        type="button"
        @click="togglePreview"
        class="appearance-none leading-none px-10 py-[10px] rounded-lg text-primary border-primary  border hover:bg-gray-300 text-[13px]"
      >
        Preview
      </button>
      <div class="flex justify-center gap-x-4 items-center"> -->
      <button type="button" @click="toggleNext(2)"
        class="appearance-none leading-none px-10 py-[10px] rounded-lg text-primary border-primary- border hover:bg-gray-300 text-[13px]">
        Back
      </button>
      <button :disabled="isLoading || v$.$silentErrors.length" :class="{
        'opacity-60 cursor-not-allowed': isLoading,
      }" type="submit"
        class="appearance-none leading-none  px-5  lg:px-10px-10 py-[10px] rounded-lg text-white bg-primary-500 disabled:opacity-50 text-[13px]">
        {{ isLoading ? "Saving..." : "Complete" }}
      </button>
      <!-- </div> -->
    </div>
  </form>
</template>

<script setup>
import { ref, provide, onMounted, inject } from "vue";
import FeaturedProp from "./FeaturedProp.vue";
import { updateProperties } from "~/services/productservices";
import { useRoute, useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { toast } from "vue3-toastify";

const propertiesRules = {
  // pickUpLocationId: {
  //   required,
  // },
  // packagesAvailable: {
  //   required: helpers.withMessage("At least 1 package is required", required),
  // },
  propertyItems: {
    property: {
      propertyItems: {
        required,
        $each: helpers.forEach({
          property: {
            required,
          },
          propertyValue: {
            required,
          },
        }),
      },
    },

    technical: {
      propertyItems: {
        required,
        $each: helpers.forEach({
          property: {
            required,
          },
          propertyValue: {
            required,
          },
        }),
      },
    },
    // applications: {
    //   propertyItems: {
    //     required,
    //     $each: helpers.forEach({
    //       property: {
    //         required,
    //       },
    //       propertyValue: {
    //         required,
    //       },
    //     }),
    //   },
    // },
    // features: {
    //   propertyItems: {
    //     $each: helpers.forEach({
    //       property: {
    //         required,
    //       },
    //       propertyValue: {
    //         required,
    //       },
    //     }),
    //   },
    // },
    compliance: {
      propertyItems: {
        $each: helpers.forEach({
          property: {
            required,
          },
          propertyValue: {
            required,
          },
        }),
      },
    },
  },
};

const route = useRoute();
const router = useRouter();
const toggleNext = inject("toggleNext");

const form = inject("form");
const rules = {
  ...propertiesRules,
};
const v$ = useVuelidate(rules, form);

onMounted(() => {
  form.productId = route.query.id;
});

const isLoading = ref(false);

function addProperty(val) {
  form.properties.push(val);
}
function addPropertyValue(val) {
  form.propertyValueList.push(val.name);
}
provide("addPropertyValue", addPropertyValue);
provide("addProperty", addProperty);

async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;

  updateProperties(form)
    .then((res) => {
      if (res.status === 200) {
        toast.info("Information saved", {
          position: "bottom",
          duration: 4000,
        });
        router.push(`/storefront/products`);
      }
    })

    .catch((err) => {
      isLoading.value = false;

      toast.error(err.response?.data?.Message, {
        position: "bottom",
      });
    });
}
provide("form", form);
provide("v$", v$);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
