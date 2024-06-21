<template>
  <div class="gap-y-2 flex flex-col p-6 lg:p-10">
    <div class="mb-5 text-center text-[13px]"><p>STEP 3/3</p></div>
    <!-- Top bar   -->
    <div class="md:max-w-[656px] mx-auto w-full">
      <div class="">
        <div class="mb-8">
          <h1
            class="text-3xl lg:text-[48px] leading-[56px] text-matta-black col-span-1 font-medium text-center mb-1 lg:mb-8"
          >
            Invite your team members
          </h1>
          <p class="text-sm lg:text-base text-center">
            We will send them an invite to join your team
          </p>
        </div>

        <form @submit.prevent="handleSubmit">
          <div>
            <div class="">
              <div class="grid gap-y-3 mb-4">
                <div
                  v-for="(n, i) in form.users"
                  :key="i"
                  class="flex gap-x-3 relative items-center"
                >
                  <input
                    v-model="n.email"
                    class="flex-1 rounded-lg text-sm px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                    autocomplete="off"
                    autofocus="on"
                    type="email"
                    placeholder="kate.minchenko@gmailcom"
                  />
                  <Listbox v-model="n.role">
                    <div class="relative">
                      <ListboxButton
                        class="relative cursor-default rounded-lg min-w-[160px] h-11 border border-[#D0D5DD] bg-[#F1F3F5] py-2 px-[15px] text-left sm:text-sm"
                      >
                        <span
                          class="block text-[#101828] text-sm"
                          v-if="n.role"
                        >
                          {{
                            n.role == "CompanyAdmin"
                              ? "Company admin"
                              : n.role == "CompanyUser"
                              ? "Company member"
                              : "Buyer"
                          }}</span
                        >

                        <span class="block text-[#8F8C9A] text-sm" v-else>
                          Select role
                        </span>
                        <span
                          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                        >
                          <ChevronDownIcon
                            class="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </ListboxButton>

                      <transition
                        leave-active-class="transition duration-100 ease-in"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                      >
                        <ListboxOptions
                          class="absolute mt-1 max-h-60 w-[200px] z-40 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 outline-0 sm:text-sm"
                        >
                          <ListboxOption
                            v-slot="{ active, selected }"
                            v-for="option in roles.filter((i) => i !== 'Buyer')"
                            :key="option"
                            :value="option"
                            as="template"
                          >
                            <li
                              :class="[
                                active ? 'bg-blue-50 text-primary' : '',
                                'relative cursor-default select-none py-2 pl-[15px] pr-4  mb-1 text-loft-black hover:bg-gray-50',
                              ]"
                            >
                              <span
                                :class="[
                                  selected ? 'font-medium' : 'font-normal',
                                  'block',
                                ]"
                              >
                                {{
                                  option == "CompanyAdmin"
                                    ? "Company admin"
                                    : option == "CompanyUser"
                                    ? "Company member"
                                    : "Buyer"
                                }}</span
                              >
                              <span
                                v-if="selected"
                                class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700"
                              >
                                <CheckIcon
                                  class="h-4 w-4 tet-primary"
                                  aria-hidden="true"
                                />
                              </span>
                            </li>
                          </ListboxOption>
                        </ListboxOptions>
                      </transition>
                    </div>
                  </Listbox>

                  <i
                    @click="remove(i)"
                    class="uil uil-times text-xl hover:ring w-8 h-8 flex items-center justify-center bg-[#F1F3F5] ring-[#F1F3F5] rounded-full"
                  ></i>
                </div>
              </div>
              <button
                class="text-xs text-primary"
                @click="addnew"
                type="button"
              >
                <i class="uil uil-plus"></i> Add new member
              </button>
            </div>

            <div class="flex justify-center gap-x-4 items-center mt-8">
              <NuxtLink
                to="/onboarding/company?onboarding_stage=2"
                class="w-1/2 lg:w-auto"
              >
                <button
                  class="appearance-none w-full leading-none px-10 py-4 rounded-lg text-matta-black border border-[#E7EBEE] hover:bg-gray-100 text-[13px] uppercase"
                >
                  Back
                </button>
              </NuxtLink>
              <button
                :disabled="isLoading"
                :class="{
                  'opacity-60 cursor-not-allowed': isLoading,
                }"
                class="appearance-none leading-none px-10 py-4 w-1/2 lg:w-auto rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
              >
                Finish
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import "vue-advanced-cropper/dist/style.css";
import { ref, reactive, onMounted } from "vue";
import { toast } from 'vue3-toastify';
import { useStore } from "vuex";
import { inviteUsers } from "@/services/onboardingservices";
import {
  Listbox,
  // ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/24/solid";
import { getRoles } from "@/services/userservices";


const store = useStore();
const form = reactive({
  sendersEmail: store.getters.loggedUser.email,
  users: [],
});
const isLoading = ref(false);
const roles = ref([]);
const invalidCredentials = ref(false);

//Timer
onMounted(() => {
  getRoles().then((res) => {
    roles.value = res.data;
  });
});
// const isDisabled = ref(false);
function addnew() {
  form.users.push({ email: "", role: "CompanyAdmin" });
}
function remove(i) {
  form.users.splice(i, 1);
}
// const newForm = computed(() => {
//   var validRegex =
//     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//   const newval = form.users.filter((i) => i.email && i.email.match(validRegex));
//   return {
//     users: newval,
//   };
// });
async function handleSubmit() {
  isLoading.value = true;
  // if (newForm.value.length) {
  inviteUsers(form)
    .then((res) => {
      if (res.status === 200) {
        window.location.href = "/onboarding/complete/company";
      }
    })
    .catch((err) => {
      invalidCredentials.value = true;
      isLoading.value = false;
      toast.error((err.response.data.message || err.response.data.Message));
    });
}
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("@/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
