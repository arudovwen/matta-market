<template>
    <section class=" py-[96px]">
      <div class="container grid grid-cols-2 gap-x-16">
       
        <div class="w-full h-[500px] bg-cover bg-[url('/images/request.png')]"></div>
        <div class="flex-1 flex items-center">
      <div class="max-w-[630px]">
        <h2 class="font-semibold text-[36px] leading-[1.2] mb-8">
          Request specific products and tailored quotes.
        </h2>
        <p class="mb-8 text-lg text-[#475467]">
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
  