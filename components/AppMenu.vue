<template>
  <Menu as="div" class="relative">
    <MenuButton  
              aria-label="menu" class="outline-none">
      <span
        class="h-[36px] w-[36px] flex justify-center items-center bg-gray-100 rounded-[50%]"
      >
        <DotsGrid class="h-[20px] w-[20px]"
      /></span>
    </MenuButton>
    <MenuItems
      class="absolute z-[999] bg-white shadow right-0 min-w-[150px] w-[200px] rounded-lg overflow-hidden mt-2 p-4 grid grid-cols-2 gap-4 justify-center"
    >
      <MenuItem v-for="item in authStore.appList" :key="item.name"
        ><a target="_blank" :href="item?.url">
          <button
            class="flex flex-col items-center w-full p-2 text-sm font-medium rounded-lg bg-primary-50/40 gap-y-1"
          >
            <span>
              <img
                :src="item?.iconUrl"
                :alt="item.name"
                width="80"
                height="26"
                class="w-auto h-[28px] mx-auto block"
               
            /></span>
            <span class="text-xs"> {{ item.name }} </span>
          </button>
        </a></MenuItem
      >
    </MenuItems>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

const authStore = useAuthStore();
</script>
