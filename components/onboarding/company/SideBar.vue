<template>
  <aside class="rounded-lg bg-white p-6 lg:p-10">
    <ul>
      <li class="py-2" v-for="(n, i) in navigation" :key="i">
        <div
          class="flex gap-x-4 items-center"
          :class="active >= i + 1 ? '' : 'opacity-50'"
        >
          <span
            :class="
              active >= i + 1
                ? 'bg-matta-black ring-2 ring-matta-black text-white'
                : 'ring-1 ring-gray-300'
            "
            class="rounded-full text-xs w-6 h-6 flex items-center justify-center leading-[normal]"
            >{{ i + 1 }}</span
          >
          <span class="leading-[normal]">{{ n }}</span>
        </div>
      </li>
    </ul>
  </aside>
</template>
<script setup>
defineProps(["active"]);
const navigation = [
  "Profile",
  "Company info",
  "Company dpocuments",
  "Directors",
];
</script>
