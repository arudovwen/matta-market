<template>
  <div class="mx-auto w-full max-w-[676px]">
    <div
      class="flex gap-x-[76px] pt-[30px] justify-start flex-col lg:flex-row gap-y-7 lg:gap-y-"
    >
      <!-- Top bar   -->
      <div class="w-full">
        <div class="w-full">
          <div>
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
          <div class="mx-auto">
            <DirectorsView
              :directors="form.directors"
              :companyInfo="company"
              @handleDelete="handleDelete"
              @handleEdit="handleEdit"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="flex gap-x-4 items-center justify-between mt-8">
      <AppButton
        @click="active--"
        btnClass="bg-white text-white !px-11  !text-sm !py-[10px] disabled:cursor-not-allowed border border-[#BDC0C5] !rounded-lg !text-[#333]"
        type="button"
        text="Back"
      />
      <div class="flex gap-x-4 items-center">
        <AppButton
          :disabled="isLoading"
          :isLoading="isSaving"
          btnClass="border border-primary-500 text-primary-500 !px-12 !text-sm !py-[10px] disabled:cursor-not-allowed"
          type="button"
          text="Save as Draft"
          @click="onSaveAndContinue"
        />
        <AppButton
          @click="handleSubmit"
          :disabled="!form.directors.length || isLoading"
          :isLoading="isLoading"
          btnClass="bg-primary-500 text-white !px-12  !text-sm !py-[10px] disabled:cursor-not-allowed border !rounded-lg border-primary-500"
          type="button"
          text="Next"
        />
      </div>
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
                class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl"
                :class="action == 'add' ? 'sm:max-w-xl' : 'sm:max-w-xl'"
              >
                <div class="p-6">
                  <OnboardingCompanyDirectorForm
                    v-if="action !== 'delete'"
                    :type="action"
                    :director="director"
                    :id="id"
                  />
                  <div class="max-w-sm">
                    <OnboardingCompanyDeleteModal
                      v-if="action === 'delete'"
                      @delete="onDelete"
                      @close="open = false"
                    />
                  </div>
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
import { updateDirectors } from "~/services/settingservices";
import { saveAsDraft } from "~/services/requestservice";
import { toast } from "vue3-toastify";

const company = inject("company");
const getCompanyData = inject("getCompanyData");
const formData = inject("formData");
const router = useRouter();
const id = ref(null);
const director = ref(null);
const action = ref("");
const route = useRoute();
const open = ref(false);
const active = inject("active");
const isSaving = ref(false);
const form = reactive({
  ...company.value,
  directors: company.value.directors || [],
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

  try {
    // First save as draft
    formData.directors = form.directors;
    await saveAsDraft({
      ...formData,
      ...(!formData?.supportingDocuments[0]?.urls[0].length && {
        supportingDocuments: formData?.supportingDocuments.map((i) => ({
          ...i,
          urls: i.urls.map((j) => j?.url),
        })),
      }),
    });

    // Then update directors
    const formattedData = {
      ...form,
      companyDocuments: form.companyDocuments.map((i) => ({
        ...i,
        urls: i.urls.map((j) => j.url),
      })),
    };

    const response = await updateDirectors(formattedData);

    if (response.status === 200) {
      toast.success("Directors updated successfully");
      active.value = 4;
    }
  } catch (err) {
    toast.error(
      err?.response?.data?.message ||
        err?.response?.data?.Message ||
        "Failed to save directors"
    );
  } finally {
    isLoading.value = false;
  }
}

// Updated save as draft handler with both operations
const onSaveAndContinue = async () => {
  try {
    isSaving.value = true;
    formData.directors = form.directors;
    // Save as draft
    await saveAsDraft({
      ...formData,
      ...(!formData?.supportingDocuments[0]?.urls[0].length && {
        supportingDocuments: formData?.supportingDocuments.map((i) => ({
          ...i,
          urls: i.urls.map((j) => j?.url),
        })),
      }),
    });

    // Also update directors
    const formattedData = {
      ...form,
      companyDocuments: form.companyDocuments.map((i) => ({
        ...i,
        urls: i.urls.map((j) => j.url),
      })),
    };

    await updateDirectors(formattedData);

    toast.success("Draft saved successfully");
    router.push("/financing");
  } catch (err) {
    toast.error(
      err?.response?.data?.message ||
        err?.response?.data?.Message ||
        "Failed to save draft"
    );
  } finally {
    isSaving.value = false;
  }
};



provide("form", form);
provide("open", open);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
