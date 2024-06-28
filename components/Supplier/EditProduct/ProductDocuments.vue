<template>
  <section class="px-6 lg:px-[30px] py-[30px]">
    <div
      class="flex gap-x-[56px] justify-start text-left flex-col lg:flex-row gap-y-7 lg:gap-y-10"
    >
      <div class="lg:w-[350px] text-left">
        <h2 class="text-sm text-[#101828] font-semibold">Product documents</h2>
        <p class="mb-5 flex items-center text-xs">
          Please attach the manufacturer's MSDS, COA, and TDS here and indicate
          the document type.
        </p>
      </div>

      <div class="max-w-[654px] w-full">
        <UploadComponent @onGetFiles="onGetFiles" :isMultiple="true" type="doc" />
        <div
          class="bg-white py-6 lg:py-8 rounded-lg"
          v-if="form.documents.length"
        >
          <div class="">
            <div
              class="flex items-center gap-x-4 mb-3"
              v-for="(n, id) in form.documents"
              :key="id"
            >
              <div class="border rounded-xl p-4 flex flex-1 justify-between">
                <div class="flex gap-x-3 items-center">
                  <img alt="product image" src="~/assets/images/filetype.png" class="w-8 h-auto" />
                  <div>
                    <p
                      class="text-sm text-matta-black capitalize truncate max-w-[250px]"
                    >
                      {{ n.fileName }}
                    </p>
                    <p class="text-xs text-[#ABABAB]">{{ n.size }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-x-5 text-xs relative">
                  <div class="absolute -bottom-2 -right-2">
                    <Listbox v-model="n.category">
                      <div class="relative mt-1">
                        <ListboxButton
                          class="relative text-left flex gap-x-6 items-center rounded-lg pl-[14px] pr-4 placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                        >
                          <span
                            class="mr-2 capitalize max-w-[130px] truncate"
                            v-if="n.category"
                            >{{ n.category }}</span
                          >
                          <span
                            class="text-matta-black mr-2 whitespace-nowrap"
                            v-else
                            >Select category</span
                          >
                          <span
                            class="pointer-events-none absolute inset-y-0 -right-1 flex items-center"
                          >
                            <ChevronUpDownIcon
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
                            class="absolute mt-1 mx-h-60 w-[250px] z-40 overflow-auto rounded-md bg-white py-4 text-base shadow-lg focus:outline-none sm:text-sm"
                          >
                            <ListboxOption
                              v-slot="{ selected }"
                              v-for="(p, i) in form.documentproperties"
                              :key="i"
                              :value="p.value"
                              as="template"
                            >
                              <li
                                :class="[
                                  selected
                                    ? 'text-blue-800 bg-blue-50'
                                    : 'font-normal text-matta-black',
                                  'relative cursor-pointer capitalize text-matta-black  hover:text-primary select-none py-2 pl-6 pr-4 text-left',
                                ]"
                              >
                                <div class="flex gap-x-4 items-start">
                                  <div>
                                    <p class="text-sm font-medium">
                                      {{ p.text }}
                                    </p>
                                    <p class="text-xs">{{ p.item }}</p>
                                  </div>
                                  <i
                                    class="uil uil-check text-blue-800"
                                    v-if="selected"
                                  ></i>
                                </div>
                              </li>
                            </ListboxOption>
                            <p
                              v-if="!form.documentproperties.length"
                              class="text-[#B6B7B9] py-2 pl-6 pr-4 text-sm"
                            >
                              Nothing found
                            </p>
                          </ListboxOptions>
                        </transition>
                      </div>
                    </Listbox>
                  </div>
                  <span
                    @click="removeFile(id)"
                    class="text-sm absolute -top-3 -right-2 z-10 text-[#475467] cursor-pointer"
                    ><AppIcon icon="fa:trash-o"
                  /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="border-[#F4F7FE] my-10" />
    <div class="bg-white rounded-lg flex justify-between gap-x-4 items-center">
      <button
        type="button"
        @click="togglePreview"
        class="appearance-none leading-none px-5 lg:px-10px-10 py-[10px] rounded-lg text-primary border-primary-500 text-primary-500 border hover:bg-gray-300 text-[13px]"
      >
        Preview
      </button>
      <div class="flex justify-center gap-x-3 lg:gap-x-4 items-center">
        <button
          type="button"
          @click="toggleNext(2)"
          class="appearance-none leading-none px-5 lg:px-10px-10 py-[10px] rounded-lg text-primary border-primary- border hover:bg-gray-300 text-[13px]"
        >
          Back
        </button>
        <button
          type="button"
          @click="handleSubmit"
          :disabled="isLoading"
          :class="{
            'bg-primary/60 cursor-not-allowed': isLoading,
          }"
          class="appearance-none leading-none px-5 lg:px-10px-10 py-[10px] rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px]"
        >
          Complete
        </button>
      </div>
    </div>
  </section>
  <div>
    <IndexModal :isOpen="isAdding" @toggleModal="isAdding = false">
      <template #content>
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-[400px]">
          <div class="flex justify-between mb-5 items-center">
            <h4 class="font-medium text-matta-black text-xl">Add new value</h4>
            <i
              class="uil uil-times cursor-pointer text-lg hover:ring-1 w-6 h-6 ring-gray-200 flex items-center justify-center hover:ring-offset-2 rounded-full"
              @click="isAdding = false"
            ></i>
          </div>
          <input
            v-model="category"
            class="rounded-lg px-3 py-3 h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            autocomplete="off"
            autofocus="on"
            placeholder="Enter package name..."
          />

          <div class="flex justify-end gap-x-2 items-center mt-8">
            <button
              type="button"
              @click="isAdding = false"
              class="appearance-none text-xs leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 uppercase"
            >
              Cancel
            </button>

            <button
              type="button"
              @click="handleAddingPackage"
              class="appearance-none text-xs leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:opacity-70 uppercase"
            >
              Save
            </button>
          </div>
        </div>
      </template>
    </IndexModal>
  </div>
</template>
<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import {
  ChevronUpDownIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/solid";

import { updateDocuments } from "~/services/productservices";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const router = useRouter();

const category = ref("");
const isAdding = ref(false);
const index = ref(null);
const toggleNext = inject("toggleNext");
const togglePreview = inject("togglePreview");
const form = inject("form");
function onGetFiles(file) {
  form.documents = [
    ...form.documents,
    {
      id: 0,
      category: "",
      fileName: file.fileName,
      file: file.url,
      size: file.size,
      fileSize: file.fileSize,
      documentUrl: file.url,
    },
  ];
}
function removeFile(id) {
  form.documents.splice(id, 1);
}
function handleAddingPackage() {
  form.properties.push(category.value);
  form.documents[index.value].category = category.value;
  isAdding.value = false;
  category.value = "";
}
// function openmodal(id) {
//   index.value = id;
//   isAdding.value = true;
// }
const isLoading = ref(false);
async function handleSubmit() {
  isLoading.value = true;

  updateDocuments(form)
    .then((res) => {
      if (res.status === 200) {
        toast.info("Information saved", {
          position: "bottom",
          duration: 4000,
        });
        router.push(`/storefront/products`);
      }
    })

    .catch((err) => {
      isLoading.value = false;

      toast.error(err?.response?.data?.message || err?.response?.data?.Message);
    });
}
</script>
