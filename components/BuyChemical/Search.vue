<template>
  <section class="bg-[#F2F4F7] py-[96px]">
    <div class="container grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-16 md:gap-y-0">
     <div class="flex-1 flex items-center flex-col md:flex-row">
      <div data-aos="fade-up"
      data-aos-once="true" class="max-w-[630px]">
        <h2 class="font-semibold text-xl md:text-[36px] leading-[1.2] mb-4 md:mb-8">
          Search for a wide range of chemicals across different markets and
          applications.
        </h2>
        <p class="mb-8 text-base md:text-lg text-[#475467]">
          Matta offers a vast selection of chemicals from top suppliers,
          tailored for various industrial applications, from pharmaceuticals to
          construction and FMCGs.
        </p>
        <AppButton
        @click="navigateTo('/')"
          text="Start your Chemical Search"
          btnClass="bg-primary-500 text-white  border-primary-500  border !px-[18px] !py-3"
        />
      </div>
     </div>
      <div data-aos="fade-in"
      data-aos-once="true" class="w-full h-[200px] lg:h-[500px] bg-cover bg-[url('/images/search.png')] rounded-lg"></div>
    </div>
  </section>
</template>
