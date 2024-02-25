<template>
  <div
    class="group p-6 rounded-2xl flex justify-between items-center hover:bg-matta-black hover:text-white border border-[#ddd]"
    :class="
      active === index
        ? 'bg-matta-black text-white'
        : 'bg-white text-matta-black'
    "
  >
    <div>
      <div class="flex items-center mb-3 gap-x-2">
        <p
          class="font-medium group-hover:text-white"
          :class="active === index ? ' text-white' : ' text-matta-black'"
        >
          Frank Paredes Jr.
        </p>
        <span
          v-if="active === index"
          class="rounded border px-1 py-1 text-xs group-hover:text-white group-hover:border-white"
          :class="
            active === index
              ? ' text-white border-white'
              : ' text-matta-black border-matta-black'
          "
          >Default</span
        >
      </div>
      <p
        class="flex gap-x-4 items-center text-sm"
        :class="active === index ? ' text-white' : ' text-matta-black'"
      >
        <span
          class="group-hover:text-white"
          :class="active === index ? ' text-white' : ' text-matta-black'"
          >London, United Kingdom</span
        >
        <span
          class="rounded-full h-1 w-1 group-hover:bg-matta-black"
          :class="active === index ? ' bg-white' : ' bg-matta-black'"
        ></span>
        <span
          class="group-hover:text-white"
          :class="active === index ? ' text-white' : ' text-matta-black'"
          >Columbia Road street 21/1501</span
        >
      </p>
    </div>
    <Menu class="relative" as="div">
      <MenuButton class="outline-none">
         <AppIcon icon="heroicons:ellipsis-vertical-solid" />
      </MenuButton>
      <MenuItems
        class="absolute z-[999] bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] py-2 right-0 min-w-[140px] rounded-xl overflow-hidden"
      >
        <div
          class="py-2 px-4 hover:bg-gray-50 text-matta-black text-sm whitespace-nowrap"
          @click="openRequest(item)"
        >
          <i class="uil uil-refresh mr-2"></i> Set as Default
        </div>
        <div
          class="py-2 px-4 hover:bg-gray-50 text-matta-black text-sm whitespace-nowrap"
          @click="openRequest(item)"
        >
          <i class="uil uil-pen mr-2"></i> Edit
        </div>
        <div
          class="py-2 px-4 hover:bg-gray-50 text-matta-black text-sm whitespace-nowrap"
          @click="openmodal('remove')"
        >
          <i class="uil uil-trash-alt mr-2"></i> Remove
        </div>
      </MenuItems>
    </Menu>
  </div>
</template>
<script setup>
import { defineProps, inject } from "vue";
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
defineProps(["index", "active"]);
const openmodal = inject("openmodal");
</script>
