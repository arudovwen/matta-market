<template>
    <section class=" py-[96px]">
      <div class="container grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-16 md:gap-y-0">
       
        <div data-aos="fade-in"
      data-aos-once="true" class="w-full  h-[200px] lg:h-[500px] bg-cover bg-[url('/images/request.png')] rounded-lg"></div>
        <div class="flex-1 flex items-center  flex-col md:flex-row">
      <div data-aos="fade-up"
      data-aos-once="true" class="max-w-[630px]">
        <h2 class="font-semibold text-xl md:text-[36px] leading-[1.2] mb-4 md:mb-8">
          Request specific products and tailored quotes.
        </h2>
        <p class="mb-8 text-base md:text-lg text-[#475467]">
          Specify your chemical requirements using our easy request form and receive tailored quotes. Our platform is designed to efficiently align your needs with the ideal products and suppliers, simplifying your procurement process.
        </p>
        <AppButton
        @click="navigateTo('/request-product')"
          text="Submit Your Product Request"
          btnClass="bg-primary-500 text-white  border-primary-500  border !px-[18px] !py-3"
        />
      </div>
     </div>
      </div>
    </section>
  </template>
  