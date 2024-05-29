<template>
  <section>
    <div class="container py-[96px]">
      <h2 data-aos="fade-up"
      data-aos-once="true" class="text-2xl md:text-5xl font-semibold text-center mb-5">
        Matta vs Traditional Procurement
      </h2>
      <p  data-aos="fade-up"
      data-aos-once="true" class="text-base md:text-2xl text-[#475467] text-center mb-10">
        The Advantage is Clear
      </p>

      <div class="mx-auto max-w-4xl">
        <table data-aos="fade-up"
      data-aos-once="true" class="w-full table-auto">
          <thead>
            <tr>
              <td></td>
              <td
                class="border border-[#EAECF0] text-center px-4 py-[10px] text-xs md:text-sm lg:text-lg font-semibold rounded-tl-lg overflow-hidden"
              >
                Matta
              </td>
              <td
                class="border border-[#EAECF0] px-3 md:px-4 py-[10px] text-xs md:text-sm lg:text-lg font-semibold rounded-tr-lg"
              >
                Traditional procurement
              </td>
            </tr>
          </thead>
          <tbody>
            <tr
              class="first:border-t last:border-b border-r border-l border-[#EAECF0] rounded-t-lg odd:bg-[#F9FAFB]" 
              v-for="i in data"
              :key="i.label"
            >
              <td class="px-3 md:px-6 py-5  text-[11px] md:text-sm font-medium flex items-center gap-x-1">
                {{ i.label }} <AppIcon icon="octicon:question-24" iconClass="text-[#98A2B3]" />
              </td>
              <td
                class="px-3 md:px-4 py-5 text-[11px] md:text-sm border-l border-[#EAECF0] text-[#475467]"
              >
                {{ i.matta }}
              </td>
              <td
                class="px-3 md:px-4 py-5 text-[11px] md:text-sm border-l border-[#EAECF0] text-[#475467]"
              >
                {{ i.trad }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
<script setup>
const data = [
  {
    label: "Market access",
    matta: "Broad access to multiple markets across Africa. ",
    trad: "Often a narrower product offering.",
  },
  {
    label: "Product Range",
    matta: " Wide selection of chemicals and raw materials.",
    trad: " Limited to local or regional reach.",
  },
  {
    label: "Digital Efficiency",
    matta: "Streamlined online procurement process.  ",
    trad: " Manual, time-consuming processes.",
  },
  {
    label: "Quality Assurance",
    matta: "Standardized quality checks and verification.",
    trad: "Quality may vary without standard checks.",
  },
  {
    label: "Logistics",
    matta: "Integrated logistics solutions for delivery. ",
    trad: "Separate logistics arrangements needed.",
  },
  {
    label: "Cost-Effectiveness",
    matta: "Competitive pricing through direct manufacturer ties.",
    trad: "Additional costs due to middlemen.",
  },
  {
    label: "Transparency",
    matta: "Clear pricing and transaction processes online.   ",
    trad: " Pricing often opaque and negotiable.",
  },
  {
    label: "Convenience",
    matta: "24/7 availability for ordering and support. ",
    trad: "Restricted by business hours and availability.",
  },
  {
    label: "Payment Security",
    matta: "Secure online payment systems. ",
    trad: "Payment security not always guaranteed.",
  },
  {
    label: "Customization",
    matta: "Tailored orders and quantities to meet specific needs.",
    trad: "Standard order sizes, less flexibility.",
  },
  {
    label: "Technical Support",
    matta: "Expert advice and support available.    ",
    trad: "Limited or no support.",
  },
  {
    label: "Market Intelligence",
    matta: "Access to market trends and data analytics.",
    trad: "Little to no market insights provided.",
  },
  {
    label: "Scalability",
    matta: "Easy to scale operations with demand.",
    trad: "Scaling up often requires significant effort and time.",
  },
  {
    label: "Compliance",
    matta: "Adherence to international standards and regulations. ",
    trad: "May not always comply with global standards.",
  },
];
</script>
