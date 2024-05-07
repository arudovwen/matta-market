<template>
  <section class="bg-[#F2F4F7] py-[96px]">
    <div class="container grid grid-cols-2 gap-x-16">
     <div class="flex-1 flex items-center">
      <div class="max-w-[630px]">
        <h2 class="font-semibold text-[36px] leading-[1.2] mb-8">
          Search for a wide range of chemicals across different markets and
          applications.
        </h2>
        <p class="mb-8 text-lg text-[#475467]">
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
      <div class="w-full h-[500px] bg-cover bg-[url('/images/search.png')]"></div>
    </div>
  </section>
</template>
