<template>
  <section class="py-10">
    <p class="mb-16 text-base">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui ipsa expedita
      voluptates, porro sint, corrupti deserunt commodi enim optio tempore
      maiores exercitationem illo dicta! Quo optio cumque veniam quas explicabo?
    </p>

    <div>
      <h3 class="mb-4 text-lg">Physical Properties</h3>
      <table aria-describedby="true" class="w-full">
        <thead>
          <tr>
            <th
              v-for="th in theads"
              :key="th"
              class="text-[#B6B7B9] text-[13px] uppercase py-4 px-2 border-b text-left"
            >
              {{ th }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="td in tdata" :key="td">
            <td class="text-sm text-matta-black py-4 px-2 border-b text-left">
              {{ td.product }}
            </td>
            <td class="text-sm text-matta-black py-4 px-2 border-b text-left">
              {{ td.value }}
            </td>
            <td class="text-sm text-matta-black py-4 px-2 border-b text-left">
              {{ td.units }}
            </td>
            <td class="text-sm text-matta-black py-4 px-2 border-b text-left">
              {{ td.orders }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<script setup>
const tdata = [
  {
    product: "Sieve Retention (at min. 63 μm)",
    value: "20",
    units: "kg",
    orders: 4,
  },
  {
    product: "Sieve Retention (at min. 63 μm)",
    value: "20",
    units: "kg",
    orders: 4,
  },
  {
    product: "Sieve Retention (at min. 63 μm)",
    value: "20",
    units: "kg",
    orders: 4,
  },
];
const theads = ["product", "value", "units", "orders"];
</script>
