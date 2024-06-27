<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-useless-escape -->
<template>
  <div class="px-4 lg:px-[30px]">
    <div
      class="flex gap-x-[76px] pt-[30px] justify-start flex-col lg:flex-row gap-y-7 lg:gap-y-"
    >
      <div class="w-[250px]">
        <h2 class="text-sm text-[#101828] font-semibold">Company Directors</h2>
        <p class="text-xs text-[#475467]">
          Update your company director details here.
        </p>
      </div>
      <!-- Top bar   -->
      <div class="flex-1">
        <div class="">
          <div v-if="!companyInfo.approvalStatus">
            <button
              type="button"
              @click="
                () => {
                  open = true;
                  action = 'add';
                }
              "
              class="appearance-none leading-none px-[14px] py-[10px] grid-cols-1 lg:grid-cols-2 gap-4 rounded-lg text-white bg-primary-500 hover:opacity-70 text-xs mb-6"
            >
              <span class=""> + Add director</span>
            </button>
          </div>
          <div class="overflow-x-auto max-w-[656px]">
            <DirectorsView
              :directors="companyInfo.directors"
              :companyInfo="companyInfo"
              @handleDelete="handleDelete"
              @handleEdit="handleEdit"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="!companyInfo.approvalStatus"
      class="flex justify-end pt-6 border-t border-[#EAECF0] gap-x-4 items-center mt-16 w-full"
    >
      <button
        @click="active--"
        type="button"
        class="appearance-none leading-none px-10 py-[10px] rounded-lg w-full lg:w-auto text-matta-black border border-[#E7EBEE] hover:bg-gray-100 text-[13px] capitalize"
      >
        Back
      </button>

      <button
        @click="handleSubmit"
        :disabled="!form.directors.length || isLoading"
        :class="{
          'opacity-60 cursor-not-allowed': !form.directors.length,
        }"
        class="appearance-none leading-none px-10 py-[10px] grid-cols-1 lg:grid-cols-2 gap-4 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] capitalize"
      >
        <i
          class="fa fa-spinner fa-spin"
          v-show="isLoading"
          aria-hidden="true"
        ></i>
        <span v-show="!isLoading">Done</span>
      </button>
    </div>
  </div>

  <div>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-[999]" @close="">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>
        <div class="fixed z-10 inset-0 overflow-y-auto">
          <div
            class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full"
                :class="action == 'add' ? 'sm:max-w-lg' : 'sm:max-w-[343px]'"
              >
                <div class="p-6">
                  <OnboardingCompanyDirectorForm
                    v-if="action !== 'delete'"
                    :type="action"
                    :director="director"
                    :id="id"
                  />
                  <OnboardingCompanyDeleteModal
                    v-if="action === 'delete'"
                    @delete="onDelete"
                    @close="open = false"
                  />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import "vue-advanced-cropper/dist/style.css";
import { ref, reactive, provide } from "vue";
import { toast } from "vue3-toastify";
import {
  additionalInfo,
  setOnboardingcomplete,
} from "@/services/onboardingservices";
import { useRouter } from "vue-router";
// import { getCompanyProfile } from "@/services/settingservices";
import { useStore } from "vuex";
import { updateDirectors } from "~/services/settingservices";

const companyInfo = inject("companyInfo");
const id = ref(null);
const director = ref(null);
const action = ref("");
const authStore = useAuthStore();
const route = useRoute();
const open = ref(false);
const active = inject("active");
const form = reactive({
  directors: companyInfo.value.directors || [],
});

const isLoading = ref(false);
function handleDelete(val) {
  id.value = val;
  action.value = "delete";
  open.value = true;
}
function handleEdit(val, option) {
  id.value = val;
  director.value = option;
  action.value = "edit";
  open.value = true;
}

function onDelete() {
  form.directors.splice(id.value, 1);
  open.value = false;
}
//Timer

// const isDisabled = ref(false);

// eslint-disable-next-line no-unused-vars
async function handleSubmit() {
  if (!form.directors.length) return;
  isLoading.value = true;

  updateDirectors(form)
    .then((res) => {
      if (res.status === 200) {
        setOnboardingcomplete();
        authStore.updateUserInfo({ onboardingPageStatus: 1 });
        toast.success("Directors saved");
        isLoading.value = false;

        setTimeout(() => {
          if (route.query.redirected_from) {
            navigateTo(route.query.redirected_from);
          }
          navigateTo("/storefront?page=settings");
        }, 1000);
      }
    })

    .catch((err) => {
      isLoading.value = false;

      toast.error(err?.response?.data?.message || err.response.data.Message);
    });
}
provide("open", open);
provide("form", form);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("@/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
