<template>
  <section class="bg-[#F2F4F7] py-[96px]">
    <div
      class="container grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-12 md:gap-y-0"
    >
      <div class="flex-1">
        <div class="max-w-[630px]">
          <h2
            data-aos="fade-up"
            data-aos-once="true"
            class="font-semibold text-xl md:text-[36px] md:leading-[1.2] mb-3 lg:mb-8"
          >
            FAQs
          </h2>
          <p
            data-aos="fade-up"
            data-aos-once="true"
            class="mb-8 text-sm md:text-lg text-[#475467]"
          >
            Everything you need to know about our products and services. Can’t
            find the answer you’re looking for? Please chat to our friendly
            team.
          </p>
        </div>
      </div>
      <div data-aos="fade-up" data-aos-once="true" class="w-full">
        <AccordionComponent :items="content">
          <template v-slot="{ item }">
            {{ item.answer }}
          </template>
        </AccordionComponent>
      </div>
    </div>
  </section>
</template>
<script setup>
const content = [
  {
    title: "Can I create both buyer and seller accounts on Matta?",
    answer:
      "Yes, We understand that as a seller, you may need to procure from other Matta platform stores. However, if you created a buyer account, you are limited to making procurements on the platform.",
  },
  {
    title: "What other services does Matta offer to Chemical vendors?",
    answer:
      "Matta offers a range of services that facilitates the trade of chemicals, raw materials and minerals in a seamless fashion. We also provide credit financing, cross border payment and enable the importation and exportation of these goods. You can contact us via our customer care line to discuss your needs.",
  },
  {
    title: "Can I request Samples of Chemicals?",
    answer:
      "Yes, however, not all products have samples. There is an indication on the Matta platform for products with samples.",
  },
  {
    title: "How do I pay for products on Matta?",
    answer:
      "You can make payment for items by bank transfer or pay online with cards (Master card, Verve Card or Visa Card)",
  },
  {
    title: "How long will it take to have my product delivered?",
    answer:
      "Depending on your location and the nature and quantity of product requested, it will take between 24 and 72 hours to have your product delivered.",
  },
  {
    title: "Does Matta have warehouses or store outlets?",
    answer:
      "Yes, Matta does have a warehouse facility. Our primary warehouse is located in Lagos, and we also maintain a network of strategic partnerships with warehouse owners nationwide to ensure widespread and efficient distribution.",
  },
  {
    title:
      "Can I contact Matta for chemicals or raw materials I cannot find on the platform?",
    answer:
      "Yes, you can contact us through our customer care line. Matta can facilitate the importation of chemicals if such chemicals are not available in the country.",
  },
  {
    title: "Can I return products bought from Matta?",
    answer:
      "Please refer to our Return Policy to see if and when a product can be returned.",
  },
  {
    title: "How does MATTA protect my personal and payment information, and what measures are in place to ensure the security of transactions conducted on the platform? Is my data shared with third parties, and how is my privacy protected?",
    answer: "Matta takes the security and privacy of your personal and payment information very seriously. We employ robust security measures to protect your data, including encryption, secure servers, and compliance with industry-standard data protection regulations. All transactions on our platform are safeguarded with advanced security protocols to ensure their integrity and confidentiality. We do not share your personal information with third parties without your explicit consent, except as necessary to process your transactions (like with payment processing partners) or comply with legal requirements. Rest assured, your privacy and the security of your transactions are our top priorities at Matta.",
  },
];
</script>
