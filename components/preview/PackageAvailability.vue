<template>
  <section class="p-8">
    <div>
      <table aria-describedby="true" class="w-full" v-if="product">
        <thead>
          <tr>
            <th
              v-for="th in theads"
              :key="th"
              class="text-[#B6B7B9] text-[13px] uppercase py-4 px-2 border-b text-left font-medium"
            >
              {{ th }}
            </th>
            <th
              v-if="product.packagesAvailable.length"
              class="text-[#B6B7B9] text-[13px] uppercase py-4 px-2 border-b text-left font-medium"
            >
              price per {{ product.packagesAvailable[0]?.unit }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(td, id) in product.packagesAvailable" :key="id">
            <td class="text-sm text-matta-black py-4 px-2 border-b text-left">
              {{ td.size }}{{ td.unit }}
            </td>
            <td class="text-sm text-matta-black py-4 px-2 border-b text-left">
              <i v-if="td.isAvailable" class="uil uil-check text-green-500"></i>
              <i v-if="!td.isAvailable" class="uil uil-minus text-gray-400"></i>
            </td>
            <td class="text-sm text-matta-black py-4 px-2 border-b text-left">
              {{ td.purity }}%
            </td>
            <td class="text-sm text-matta-black py-4 px-2 border-b text-left">
              {{ td.color }}
            </td>
            <td class="text-sm text-matta-black py-4 px-2 border-b text-left">
              {{ product.hidePrice ? "-" : currencyFormat(td.amount) }}
            </td>
            <td class="text-sm text-matta-black py-4 px-2 border-b text-left">
              {{ product.hidePrice ? "-" : currencyFormat(td.amount) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<script setup>
import { inject } from "vue";
const product = inject("product");


const theads = ["size", "availability", "purity", "colour", "price"];
</script>
