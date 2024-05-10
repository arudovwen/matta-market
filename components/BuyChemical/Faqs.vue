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
      "Yes, We understand that as a seller, you may need to procure from other Matta platform stores. However, if you created a buyer account, you are limited to making procurements on the platform.",
  },
  {
    title: "Can I request Samples of Chemicals?",
    answer:
      "Yes, We understand that as a seller, you may need to procure from other Matta platform stores. However, if you created a buyer account, you are limited to making procurements on the platform.",
  },
  {
    title: "How do I pay for products on Matta?",
    answer:
      "Yes, We understand that as a seller, you may need to procure from other Matta platform stores. However, if you created a buyer account, you are limited to making procurements on the platform.",
  },
  {
    title: "How long will it take to have my product delivered?",
    answer:
      "Yes, We understand that as a seller, you may need to procure from other Matta platform stores. However, if you created a buyer account, you are limited to making procurements on the platform.",
  },
  {
    title: "Does Matta have warehouses or store outlets?",
    answer:
      "Yes, We understand that as a seller, you may need to procure from other Matta platform stores. However, if you created a buyer account, you are limited to making procurements on the platform.",
  },
  {
    title:
      "Can I contact Matta for chemicals or raw materials I cannot find on the platform?",
    answer:
      "Yes, We understand that as a seller, you may need to procure from other Matta platform stores. However, if you created a buyer account, you are limited to making procurements on the platform.",
  },
  {
    title: "Can I return products bought from Matta?",
    answer:
      "Yes, We understand that as a seller, you may need to procure from other Matta platform stores. However, if you created a buyer account, you are limited to making procurements on the platform.",
  },
];
</script>
