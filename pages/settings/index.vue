<template>
  <div class="mb-8 rounded-[10px] border border-[#F4F7FE]">
    <div class=" mb-4">
    <div class="mb-2">
        <HeaderComponent
        title="Account settings"
        className="!px-6 !border-none "
        subtext="Manage your team members and their account permissions here."
      />
    </div>
      <AppTab :tabs="tabs" className="px-6" />
      <div class="px-6">
        <div class="rounded-lg bg-white p-6 border border-[#EAECF0]">
          <Profile v-if="active === 'profile'" />
          <Notifications v-if="active === 'notifications'" />
          <Password v-if="active === 'password'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Profile from "./profile";
import Password from "./password";
import Notifications from "./notifications";

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const tabs = [
  {
    title: "profile",
    key: "profile",
  },
  {
    title: "password",
    key: "password",
  },

  {
    title: "notifications",
    key: "notifications",
  },
];

const active = ref("profile");
provide("active", active);
</script>
