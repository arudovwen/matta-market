<template>
  <div class="bg-white rounded-lg">
    <nav class="flex justify-between gap-x-2 items-center py-5 px-6">
      <div class="flex items-center">
        <NuxtLink to="/">
           <img
            src="~/assets/img/logo.svg"
            width="80"
            height="auto"
            alt="Matta"
          />
        </NuxtLink>
      </div>
      <div>
        <NuxtLink to="/">
          <button
            type="button"
            class="appearance-none h-auto leading-none py-2 px-5 text-xs md:text-[13px] uppercase border rounded-full border-primary- text-primary hover:bg-slate-50 flex items-center justify-center"
          >
            Skip
          </button></NuxtLink
        >
      </div>
    </nav>
    <div class="grid grid-cols-3">
      <div
        class="p-[.25rem]"
        :class="active >= n ? 'bg-primary' : ''"
        v-for="n in 3"
        :key="n"
      ></div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
defineProps({
  active: {
    default: null,
  },
});
</script>
<style scoped lang="scss">
.nav-menu {
  label.menu {
    flex-direction: column;
    width: 25px;
    cursor: pointer;
    margin-bottom: 0;
  }

  .menu span {
    background: black;
    border-radius: 10px;
    height: 3px;
    margin: 5px 0 0 0;
    transition: 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
  }

  .menu span:nth-of-type(1) {
    width: 50%;
  }

  .menu span:nth-of-type(2) {
    width: 100%;
  }

  .menu span:nth-of-type(3) {
    width: 75%;
  }

  input[type="checkbox"] {
    display: none;
  }

  .menu input[type="checkbox"]:checked ~ span:nth-of-type(1) {
    transform-origin: bottom;
    transform: rotatez(45deg) translate(3px, 0px);
  }

  .menu input[type="checkbox"]:checked ~ span:nth-of-type(2) {
    transform-origin: top;
    transform: rotatez(-45deg);
  }

  .menu input[type="checkbox"]:checked ~ span:nth-of-type(3) {
    transform-origin: bottom;
    width: 50%;
    transform: translate(11.2px, -5px) rotatez(45deg);
  }
}
.slide-in-right {
  -webkit-animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@-webkit-keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
    transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
    transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
