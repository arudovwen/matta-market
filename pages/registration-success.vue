<template>
  <div class="items-center flex justify-center p-6">
    <div class="bg-white rounded-[10px] p-5 md:p-9 text-center max-w-[450px]">
      <NuxtImg
        src="/assets/images/mail.svg"
        class="mx-auto mb-[10px]"
        alt="success"
      />
      <h1 class="text-2xl mb-[27px] font-bold">Sign up successful</h1>
      <p class="mb-8 md:mb-10 text-sm text-[#444] leading-[21px]">
        We have sent an account activation link to your email address. Click on
        the link to activate your account.
      </p>
      <div class="flex justify-center">
        <AppButton
          link="/auth/login"
          text="Return to login"
          btnClass="bg-[#2176FF] text-white w-full !text-sm !font-normal !py-3"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "custom",
});
useHead({
  title: "Sign Up success | Matta",
});
</script>
