<template>
  <section
    v-if="!authStore.userType"
    class="flex h-full w-screen items-center justify-center"
  >
    <div class="mx-auto w-full max-w-[900px] rounded-lg bg-white p-8 sm:p-16">
      <header class="mb-8">
        <h1 class="mb-1 text-2xl font-medium text-[#101828] dark:text-white sm:text-[30px]">
          Complete your profile
        </h1>
        <p class="text-base dark:text-white/80">
          To get started, please select the type of service that best fits you
        </p>
      </header>

      <form @submit.prevent="onSubmit" class="w-full">
        <div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AuthUserTypeCard
            v-for="option in userTypeOptions"
            :key="option.type"
            :active="businessUserType === option.type"
            :icon="option.icon"
            :title="option.title"
            :description="option.description"
            @click="setFieldValue('businessUserType', option.type)"
          />
        </div>

        <div class="mx-auto w-full max-w-[400px]">
          <AppButton
            type="submit"
            :is-loading="isLoading"
            :is-disabled="isLoading || !meta.valid"
            text="Get Started"
            btn-class="normal-case btn-primary !py-3 w-full"
          />
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { toast } from 'vue3-toastify'
import { signUpWithMatta } from '~/services/userservices'

definePageMeta({
  layout: 'empty',
  middleware: 'user-type'
})

const config = useRuntimeConfig()
const authStore = useAuthStore()
const isLoading = ref(false)

// Constants
const userTypeOptions = [
  {
    type: 0,
    icon: 'ri:user-3-line',
    title: 'Buyer Account',
    description: 'Search, buy and place orders for products'
  },
  {
    type: 1,
    icon: 'solar:shop-linear',
    title: 'Vendor Account',
    description: 'For merchants who wants to sell their products'
  }
]

// Form setup
const schema = yup.object({
  businessUserType: yup.number().required(),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
})

const { handleSubmit, defineField, meta, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: {
    email: authStore.userInfo?.email,
    businessUserType: 0,
    appCode: config.public.APP_CODE
  }
})

const [businessUserType] = defineField('businessUserType')

// Form submission handler
const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    const response = await signUpWithMatta({ ...values })
    
    if (response.status === 200) {
      authStore.setLoggedUser({
        ...authStore.userInfo,
        businessUserType: values.businessUserType,
        accountType: values.businessUserType
      })
      
      toast.success('Profile updated!')
      navigateTo('/')
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'An error occurred')
  } finally {
    isLoading.value = false
  }
})

// Navigation guard
onBeforeMount(() => {
  if (authStore.userType) {
    navigateTo('/')
  }
})
</script>