<template>
  <div
    class="formGroup relative"
    :class="`${error ? 'has-error' : ''}  ${horizontal ? 'flex' : ''}  ${
      validate ? 'is-valid' : ''
    } `"
  >
    <label
      v-if="label"
      :class="`${classLabel} ${
        horizontal ? 'flex-0 mr-6 md:w-[100px] w-[60px] break-words' : ''
      }  flex items-center gap-x-1 input-label text-sm !text-[#1B2B41B8]`"
      :for="name"
    >
      {{ label }} <RedDot v-if="isCumpulsory"
    /> <span
        v-if="info"
        data-toggle="tooltip"
        data-placement="top"
        :title="infoTitle"
        class="cursor-pointer h-4 w-4 flex items-center justify-center"
      >
        <AppIcon icon="quill:info" iconClass="text-gray-600" />
      </span></label>
    <div class="relative flex items-center" :class="horizontal ? 'flex-1' : ''">
      <input
        :type="types"
        :name="name"
        :placeholder="placeholder"
        :class="`${classInput} input-control w-full block focus:outline-none h-[44px] ${
          hasicon ? 'pr-10' : ''
        } `"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :error="error"
        :id="name"
        :readonly="isReadonly"
        :disabled="disabled"
        :validate="validate"
        v-if="!isMask"
      />
      <cleave
        :class="`${classInput} cleave input-control block w-full focus:outline-none h-[44px] `"
        :name="name"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :error="error"
        :id="name"
        :readonly="isReadonly"
        :disabled="disabled"
        :validate="validate"
        :options="options"
        v-if="isMask"
        modelValue="modelValue"
      />

      <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">
        <span
          v-if="hasicon"
          @click="toggleType"
          class="cursor-pointer text-secondary-500"
        >
          <AppIcon
            icon="la:eye"
            class="text-[#666]"
            v-if="types === 'password'"
          />
          <AppIcon icon="la:eye-slash" class="text-[#666]" v-else />
        </span>

        <span v-if="error && types !== 'date'" class="text-danger-500">
          <AppIcon icon="heroicons-outline:information-circle" />
        </span>

        <span v-if="validate" class="text-success-500">
          <AppIcon icon="bi:check-lg" />
        </span>
        <span v-if="icon" class="text-[#666]">
          <AppIcon :icon="icon" />
        </span>
      </div>
      <slot name="content"></slot>
    </div>

    <span
      v-if="error"
      class=""
      :class="
        msgTooltip
          ? ' inline-block bg-danger-500 text-white text-[10px] px-2 py-1 rounded'
          : ' text-danger-500 block text-sm'
      "
      >{{ error }}</span
    >
    <span
      v-if="validate"
      class=""
      :class="
        msgTooltip
          ? ' inline-block bg-success-500 text-white text-[10px] px-2 py-1 rounded'
          : ' text-success-500 block text-sm'
      "
      >{{ validate }}</span
    >
    <span
      class="block text-secondary-500 font-light leading-4 text-xs mt-2"
      v-if="description"
      >{{ description }}</span
    >
  </div>
</template>
<script>
import Cleave from "vue-cleave-component";
export default {
  components: { Cleave },
  props: {
    placeholder: {
      type: String,
      default: "Search",
    },
    label: {
      type: String,
    },
    classLabel: {
      type: String,
      default: " ",
    },
    classInput: {
      type: String,
      default: "classinput",
    },
    type: {
      type: String,
      default: "text",
      //required: true,
    },
    isCumpulsory: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
    modelValue: {
      type: String,
      default: "",
    },
    error: {
      type: String,
    },
    hasicon: {
      type: Boolean,
      default: false,
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
    validate: {
      type: String,
    },
    msgTooltip: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
    },
    isMask: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      default: () => ({
        creditCard: true,
        delimiter: "-",
      }),
    },
    infoTitle: {
      type: String,
    },
    info: {
      type: Boolean,
    },
  },
  data() {
    return {
      types: this.type,
    };
  },

  methods: {
    toggleType() {
      // toggle the type of the input field
      this.types = this.types === "text" ? "password" : "text";
    },
  },
};
</script>
<style lang="scss"></style>
