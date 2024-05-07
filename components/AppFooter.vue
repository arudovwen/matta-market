<template>
  <footer class="bg-[#0C111D] pt-16 pb-8">
    <div class="rounded-lg container">
      <div
        class="grid text-center lg:text-left grid-cols-1 lg:grid-cols-4 gap-y-8 lg:gap-x-10 lg:pt-8 mb-14"
      >
        <div class="">
          <div class="mb-[15px]">
            <NuxtLink to="/">
              <img
                src="/images/logo-white.png"
                class="w-[132px]"
                alt="Matta"
                width="132"
                height="auto"
              />
            </NuxtLink>
          </div>
          <p class="text-sm text-[#EAECF0] text-left mb-10">
            Discover and buy chemicals, raw materials, ingredients, and
            commodities all in one place.
          </p>
          <div class="flex gap-x-6">
            <a
              target="_blank"
              v-for="s in socials"
              :key="s.title"
              :href="s.link"
            >
              <span class="">
                <AppIcon
                  :icon="s.icon"
                  class="cursor-pointer text-[#EAECF0] text-[28px]"
              /></span>
            </a>
          </div>
        </div>
        <div
          class="grid md:grid-cols-3 gap-y-8 md:gap-x-10 col-span-3 text-left"
        >
          <div v-for="n in navs" :key="n.subject">
            <span
              class="text-base capitalize text-[#EAECF0] font-bold mb-3 block"
            >
              {{ n.subject }}
            </span>
            <ul>
              <li
                v-for="l in n.links"
                :key="l.title"
                class="text-[14px] font-normal capitlize text-[#EAECF0] mb-2"
              >
                <NuxtLink
                  v-if="l.title.toLowerCase() !== 'contact'"
                  :href="l.url"
                  class="hover:underline"
                >
                  {{ l.title }}
                </NuxtLink>
                <span v-else @click="open = true" class="hover:underline">
                  {{ l.title }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr class="border-[#182230] mb-6" />
      <div
        class="flex flex-col-reverse lg:flex-row gap-4 lg:gap-0 justify-between lg:items-center"
      >
        <div
          class="order-1 md:grid-cols-2 grid gap-y-3 lg:gap-y-6 md:gap-y-0 text-left md:gap-x-4 text-[#EAECF0]"
        >
          <p class="order-2 lg:order-1 text-sm">
            © {{ new Date().getFullYear() }} Matta. All Rights Reserved.
          </p>
          <div class="order-1 lg:order-2 flex gap-x-2 md:gap-x-4 items-center">
            <NuxtLink to="/privacy-policies" class="text-sm md:text-sm"
              >Privacy policy</NuxtLink
            >
            <span
              class=" text-[#EAECF0] w-[2px] h-[2px] rounded-full"
            ></span>
            <NuxtLink to="/terms-and-conditions" class="text-sm md:text-sm"
              >Terms of use</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
  <ContactForm />
</template>

<script setup>
import { ref, provide } from "vue";

const open = ref(false);
const navs = [
  {
    subject: "company",
    links: [
      {
        title: "About Us",
        url: "https://corporate.matta.trade/",
      },
      {
        title: "Careers",
        url: "https://corporate.matta.trade/",
      },
      {
        title: "Newsletter",
        url: "#",
      },
      {
        title: "Contact",
        url: "",
      },
    ],
  },
  {
    subject: "services",
    links: [
      {
        title: "Buy chemicals",
        url: "/buy-chemicals",
      },
      {
        title: "Sell chemicals",
        url: "/auth/vendor-register",
      },
      {
        title: "Logistics solutions",
        url: "#",
      },

      {
        title: "Financing solutions",
        url: "#",
      },
      {
        title: "Local fulfillment partnerships",
        url: "#",
      },
    ],
  },

  {
    subject: "quick links",
    links: [
      {
        title: "Request product",
        url: "/request-product",
      },
      {
        title: "Become a Verified Supplier",
        url: "/auth/vendor-register",
      },
      {
        title: "Join agent network program",
        url: "#",
      },
    ],
  },
];

const socials = [
  {
    title: "Facebook",
    icon: "ant-design:facebook-filled",
    link: "https://www.facebook.com/mattatrade",
  },
  {
    title: "Linkedin",
    icon: "akar-icons:linkedin-fill",
    link: "https://www.linkedin.com/company/matta-trade/",
  },

  {
    title: "X",
    icon: "line-md:twitter-x-alt",
    link: "https://twitter.com/matta_trade",
  },
  {
    title: "Instagram",
    icon: "fe:instagram",
    link: "https://www.instagram.com/matta_trade/",
  },
];
function togglePopup() {
  open.value = !open.value;
}
provide("open", open);
provide("togglePopup", togglePopup);
</script>
