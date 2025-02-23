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
      :data-testid="label"
    >
      {{ label }} <RedDot v-if="isCumpulsory" />
      <span
        v-if="info"
        data-toggle="tooltip"
        data-placement="top"
        data-animation="false"
        :title="infoTitle"
        class="cursor-pointer h-4 w-4 flex items-center justify-center"
      >
        <AppIcon icon="quill:info" iconClass="text-gray-600" />
      </span>
    </label>

    <div class="relative flex items-center" :class="horizontal ? 'flex-1' : ''">
      <input
        v-if="!isMask"
        :type="types"
        :name="name"
        :data-testid="name"
        :placeholder="placeholder"
        :class="`${classInput} input-control w-full block focus:outline-none h-[44px] ${
          hasicon ? 'pr-10' : ''
        } ${iconPosition === 'left' ? '!pl-10' : 'pr-10'} `"
        :value="modelValue"
        @input="handleInput"
        :error="error"
        :id="name"
        :readonly="isReadonly"
        :disabled="disabled"
        :validate="validate"
      />

      <cleave
        v-if="isMask"
        :class="`${classInput} cleave input-control block w-full focus:outline-none h-[44px] `"
        :name="name"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleInput"
        :error="error"
        :id="name"
        :readonly="isReadonly"
        :disabled="disabled"
        :validate="validate"
        :options="options"
        modelValue="modelValue"
      />

      <div
        :class="`flex text-xl absolute  ${
          iconPosition === 'left' ? 'left-[14px]' : 'right-[14px]'
        } top-1/2 -translate-y-1/2`"
      >
        <span
          v-if="hasicon"
          @click="toggleType"
          iconClass="cursor-pointer text-secondary-500"
        >
          <AppIcon
            icon="la:eye"
            iconClass="text-[#667085]"
            v-if="types === 'password'"
          />
          <AppIcon icon="la:eye-slash" iconClass="text-[#667085]" v-else />
        </span>

        <span v-if="error && types !== 'date'" class="text-danger-500">
          <AppIcon icon="heroicons-outline:information-circle" />
        </span>

        <span v-if="validate" class="text-success-500">
          <AppIcon icon="bi:check-lg" />
        </span>

        <span v-if="icon" class="text-[#667085]">
          <AppIcon :icon="icon" iconClass="text-[#667085]" />
        </span>

        <span class="text-sm">
          <slot name="suffix"></slot>
        </span>
      </div>

      <slot name="content"></slot>
    </div>

    <span
      v-if="error"
      :class="
        msgTooltip
          ? 'inline-block bg-danger-500 text-white text-[10px] px-2 py-1 rounded'
          : 'text-danger-500 block text-sm'
      "
    >
      {{ error }}
    </span>

    <span
      v-if="validate"
      :class="
        msgTooltip
          ? 'inline-block bg-success-500 text-white text-[10px] px-2 py-1 rounded'
          : 'text-success-500 block text-sm'
      "
    >
      {{ validate }}
    </span>

    <span
      v-if="description"
      class="block text-secondary-500 font-light leading-4 text-xs mt-2"
    >
      {{ description }}
    </span>
  </div>
</template>

<script>
import Cleave from "vue-cleave-component";

export default {
  name: 'CustomInput',
  
  components: { 
    Cleave 
  },

  props: {
    placeholder: {
      type: String,
      default: "Search",
    },
    label: {
      type: String,
      default: "",
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
    },
    isCumpulsory: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    error: {
      type: String,
      default: "",
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
      default: "",
    },
    msgTooltip: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    iconPosition: {
      type: String,
      default: "right",
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
      default: "",
    },
    info: {
      type: Boolean,
      default: false,
    },
    suffix: {
      default: "",
    },
    // New prop to explicitly handle number inputs
    isNumber: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      types: this.type,
    };
  },

  methods: {
    handleInput(event) {
      let value = event.target?.value ?? event;
      
      if (this.isNumber && this.type === 'number') {
        // Handle empty input
        if (value === '') {
          this.$emit('update:modelValue', null);
          return;
        }
        
        // Convert to number if valid
        const numberValue = Number(value);
        if (!isNaN(numberValue)) {
          this.$emit('update:modelValue', numberValue);
          return;
        }
      }
      
      // Emit original value if not a number input
      this.$emit('update:modelValue', value);
    },

    toggleType() {
      this.types = this.types === "text" ? "password" : "text";
    },
  },
};
</script>

<style lang="scss">
/* Add any custom styles here */
</style>