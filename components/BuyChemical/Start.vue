<template>
  <section class="bg-[#0C111D] py-[34px]">
    <div class="container flex justify-between gap-x-20">
      <div class="flex-1">
        <div class="">
          <h2 class="text-white font-semibold text-[30px] leading-[1.2] mb-4">
            Start selling with Matta
          </h2>
          <p class="mb-8 text-lg text-[#EAECF0]">
            Unlock Manufacturing Growth: Join 250+ Brands in Africa Enjoying
            Seamless Procurement and Logistics With Matta.
          </p>
        </div>
      </div>
      <div>
        <AppButton
          @click="handleRouting('register')"
          text="Get started"
          icon="lets-icons:arrow-right"
          btnClass="bg-primary-500 text-white  border-primary-500  border !px-[18px] !py-3"
          iconPosition="right"
        />
      </div>
    </div>
  </section>
</template>
