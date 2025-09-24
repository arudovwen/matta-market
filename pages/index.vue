<template>
  <div class="min-h-screen mx-auto">
    <LandingBanner />

    <div class="bg-[#F4F4F4] darks:bg-gray-700 pt-8 sm:pt-[60px]">
      <div class="container hidden mb-6 lg:block sm:mb-10">
        <LandingBoard
          link="https://sites.google.com/view/orbital-waitlist/home"
          url="https://res.cloudinary.com/arudovwen-me/video/upload/q_auto/v1758010465/1440_by_248_yi9tum.mp4"
          type="video"
        />
      </div>
      <div class="pb-8 xl:pb-[70px]">
        <LandingHistory />
        <LandingHot tag="hotdeals" />
        <div class="container mb-6 lg:hidden sm:mb-10">
          <LandingBoard
            link="https://sites.google.com/view/orbital-waitlist/home"
            url="https://res.cloudinary.com/arudovwen-me/video/upload/q_auto/v1758010465/1440_by_248_yi9tum.mp4"
               type="video"
          />
        </div>
        <!-- <LandingRecommended tag="recommended" /> -->
        <LandingHot title="Recommended" tag="recommended" />
        <LandingHot title="Best sellers" tag="bestsellers" />
        <div class="container">
          <LandingBoard
            url="https://res.cloudinary.com/arudovwen-me/image/upload/f_auto,q_auto/icxwdfiszid12mimlr3h"
            link="https://matta.trade/product/Sodium%20Cyclamate/3009649000015634003?categoryId="
          />
        </div>
      </div>
      <LandingInfo />
    </div>
    <div class="pt-6 bg-white md:pt-10">
      <LandingCategories />
      <LandingBrands />
      <LandingTestimonials />
      <LandingCall />
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "default",
});
</script>
