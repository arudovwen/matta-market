<!-- eslint-disable vue/valid-v-model -->
<template>
  <form class="flex flex-col gap-y-3" @submit.prevent="handleSubmit">
    <div class="bg-white p-6 lg:p-8 rounded-lg">
      <div class="w-[85%]">
        <label class="mb-4 font-normal block">
          Questions
          <!-- <span class="font-light text-xs text-[#ABABAB]"
            >(Optional)</span
          > -->
        </label>

        <div
          class="flex flex-wrap gap-3 mb-6"
          v-if="form.productQuestions.length"
        >
          <span v-for="n in form.productQuestions" :key="n">
            <span
              class="border border-gray-[300] text-matta-black px-3 rounded-full py-1 text-sm"
              v-if="n.question"
              >{{ n.question }}</span
            ></span
          >
        </div>
        <div
          class="flex gap-x-2 items-start"
          v-for="(n, i) in form.productQuestions"
          :key="i"
        >
          <div class="flex-1">
            <div class="mb-6">
              <input
                v-model="n.question"
                class="rounded-lg px-[14px] py-[10px] h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                autocomplete="off"
                placeholder="Enter question"
              />
            </div>
            <div class="mb-6">
              <textarea
                v-model="n.answer"
                rows="3"
                placeholder="Enter answer"
                class="rounded-lg px-[14px] py-[10px] w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
              ></textarea>
            </div>
          </div>
          <div class="flex items-center">
            <span
              @click="removeQuestion(id)"
              class="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center"
              ><i class="uil uil-times"></i
            ></span>
          </div>
        </div>
        <div class="mt-3">
          <button type="button" class="text-primary" @click="addQuestion">
            <i class="uil uil-plus text-sm"></i> Add new question
          </button>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-x-3">
      <div class="bg-white p-6 lg:p-8 rounded-lg">
        <div class="mb-5 text-left">
          <label class="mb-2 font-normal block">
            Experts
            <!-- <span class="font-light text-xs text-[#ABABAB]"
              >(Optional)</span
            > -->
          </label>
          <div
            class="flex gap-x-2 items-center mb-2"
            v-for="(p, id) in form.productExperts"
            :key="id"
          >
            <div class="relative flex-1">
              <Combobox v-model="form.productExperts[id]">
                <ComboboxInput
                  class="px-5 py-1 h-10 rounded-lg w-full text-left flex items-center justify-between border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                  @change="query = $event.target.value"
                  :displayValue="
                    (p) => (p.name && p.role ? `${p.name}, ${p.role}` : '')
                  "
                />

                <TransitionRoot
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  @after-leave="query = ''"
                >
                  <ComboboxOptions
                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <div
                      v-if="filteredExperts.length === 0 && query !== ''"
                      class="relative cursor-default select-none py-2 px-4 text-gray-700"
                    >
                      Nothing found.
                    </div>
                    <ComboboxOption
                      as="template"
                      v-for="(p, i) in filteredExperts"
                      :key="i"
                      :value="p"
                    >
                      <li
                        :class="[
                          'relative cursor-pointer flex items-cente gap-x-2 capitalize text-matta-black  hover:text-primary select-none py-2 pl-6 pr-4 text-left',
                        ]"
                      >
                        <div class="flex items-center gap-x-4">
                          <span
                            class="h-8 w-8 rounded-full flex items-start justify-center bg-gray-100 uppercase p-2"
                            >{{ p.name.slice(0, 2) }}</span
                          >
                          <div>
                            <p class="text-[13px] mb-1">{{ p.name }}</p>
                            <p class="text-[11px]">{{ p.role }}</p>
                          </div>
                        </div>
                      </li>
                    </ComboboxOption>
                  </ComboboxOptions>
                </TransitionRoot>
              </Combobox>
            </div>
            <!-- <Listbox
              class="flex-1"
              v-model="e.name"
              :value="e.name"
              @change="addExpertInput"
            >
              <div class="relative mt-1">
                <ListboxButton
                  class="px-5 py-1 h-10 rounded-lg w-full text-left flex items-center justify-between border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                >
                  <div class="" v-if="e">
                    <div class="flex items-center gap-x-3">
                      <div class="flex items-center">
                        <span class="text-sm font-medium">{{ e.name }}</span
                        >,
                        <span class="text-sm ml-1">{{ e.role }}</span>
                      </div>
                    </div>
                  </div>

                  <span class="text-sm text-matta-black" v-else
                    >Enter expert name</span
                  >
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
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
                    class="absolute mt-1 max-h-80 w-[200px] z-40 overflow-auto rounded-md bg-white py-4 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      v-for="(p, i) in experts"
                      :key="i"
                      :value="p"
                      as="template"
                    >
                      <li
                        :class="[
                          'relative cursor-pointer flex items-cente gap-x-2 capitalize text-matta-black  hover:text-primary select-none py-2 pl-6 pr-4 text-left',
                        ]"
                      >
                        <div class="flex items-center gap-x-3">
                          <span
                            class="h-8 w-8 rounded-full flex items-start justify-center bg-gray-100 uppercase p-2"
                            >{{ p.name.slice(0, 2) }}</span
                          >
                          <div>
                            <p class="text-[13px]">{{ p.name }}</p>
                            <p class="text-[11px]">{{ p.role }}</p>
                          </div>
                        </div>
                      </li>
                    </ListboxOption>
                    <p
                      v-if="!experts.length"
                      class="text-[#B6B7B9] py-2 pl-6 pr-4 text-sm"
                    >
                      Nothing found
                    </p>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox> -->
            <i
              class="uil uil-times cursor-pointer text-lg hover:ring-1 w-6 h-6 ring-gray-200 flex items-center justify-center hover:ring-offset-2 rounded-full"
              @click="removeExpert(id)"
            ></i>
          </div>
          <div class="py-2 pr-4 mt-4 flex justify-between">
            <button
              type="button"
              class="text-primary text-sm"
              @click="openmodal('expert', id)"
            >
              <i class="uil uil-plus text-sm"></i> Create expert
            </button>
            <button
              type="button"
              class="text-primary text-sm"
              @click="addNewExpert"
            >
              <i class="uil uil-plus text-sm"></i> Add new
            </button>
          </div>
        </div>
      </div>
      <div class="bg-white p-6 lg:p-8 rounded-lg">
        <div class="mb-5 text-left">
          <label class="mb-2 font-normal block">
            Tags
            <!-- <span class="font-light text-xs text-[#ABABAB]"
              >(Optional)</span
            > -->
          </label>
          <Listbox v-model="form.tags">
            <div class="relative mt-1">
              <ListboxButton
                class="px-5 py-1 rounded-lg min-h-[40px] w-full text-left flex items-center justify-between border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
              >
                <div class="" v-if="form.tags.length">
                  <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span
                      v-for="(tag, id) in form.tags"
                      :key="tag"
                      class="px-2 py-1 gap-x-3 flex items-center bg-white text-xs rounded-full"
                      ><span>{{ tag }}</span>
                      <i
                        class="uil uil-times text-matta-black"
                        @click="form.tags.splice(id, 1)"
                      ></i
                    ></span>
                  </div>
                </div>
                <span class="text-sm text-[#B6B7B9]" v-else>Enter tag</span>
                <span
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
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
                  class="absolute mt-1 max-h-80 w-[200px] z-40 overflow-auto rounded-md bg-white py-4 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  <!-- <ListboxOption
                    v-slot="{ selected }"
                    v-for="(p, i) in tags"
                    :key="i"
                    :value="p"
                    as="template"
                  >
                    <li
                      :class="[
                        'relative cursor-pointer  text-matta-black  hover:text-primary select-none py-2 pl-6 pr-4 text-left',
                      ]"
                    >
                      <span
                        :class="[selected ? 'font-medium' : 'font-normal']"
                        >{{ p }}</span
                      >
                    </li>
                  </ListboxOption>
                  <p
                    v-if="!tags.length"
                    class="text-[#B6B7B9] py-2 pl-6 pr-4 text-sm"
                  >
                    Nothing found
                  </p>
                  <hr class="my-2" /> -->
                  <div class="py-2 pl-6 pr-4">
                    <button
                      type="button"
                      class="text-primary"
                      @click="openmodal('tag')"
                    >
                      <i class="uil uil-plus text-sm"></i> Add new tag
                    </button>
                  </div>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
      </div>
    </div>
    <div
      class="bg-white rounded-lg px-10 py-6 flex justify-between gap-x-10 items-center"
    >
      <button
        type="button"
        @click="togglePreview"
        class="appearance-none leading-none px-10 py-4 rounded-full text-primary border-primary- border hover:bg-gray-100 text-[13px] uppercase"
      >
        PREVIEW
      </button>
      <div class="flex justify-center gap-x-4 items-center">
        <button
          type="button"
          @click="toggleNext(3)"
          class="appearance-none leading-none px-10 py-4 rounded-full text-matta-black bg-[#F1F3F5] hover:bg-gray-100 text-[13px] uppercase"
        >
          Back
        </button>
        <button
          type="submit"
          class="appearance-none leading-none px-10 py-4 rounded-full text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
        >
          Complete
        </button>
      </div>
    </div>
  </form>
  <div>
    <IndexModal :isOpen="isAdding" @toggleModal="isAdding = false">
      <template #content>
        <div
          class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-[400px]"
          v-if="adding == 'expert'"
        >
          <div class="flex justify-between mb-5 items-center">
            <h4 class="font-medium text-matta-black text-xl">Add new value</h4>
            <i
              class="uil uil-times cursor-pointer text-lg hover:ring-1 w-6 h-6 ring-gray-200 flex items-center justify-center hover:ring-offset-2 rounded-full"
              @click="isAdding = false"
            ></i>
          </div>
          <input
            v-model="expertAnswer.name"
            class="rounded-lg px-3 py-3 h-11 mb-5 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            autocomplete="off"
            placeholder="Enter expert name..."
          />
          <input
            v-model="expertAnswer.role"
            class="rounded-lg px-3 py-3 h-11 mb-5 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            autocomplete="off"
            placeholder="Enter expert role..."
          />
          <input
            v-model="expertAnswer.phone"
            class="rounded-lg px-3 py-3 h-11 mb-5 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            autocomplete="off"
            placeholder="Enter phone number.."
            type="number"
          />
          <input
            v-model="expertAnswer.email"
            class="rounded-lg px-3 py-3 h-11 mb-5 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            autocomplete="off"
            placeholder="Enter email..."
            type="email"
          />
          <input
            v-model="expertAnswer.language"
            class="rounded-lg px-3 py-3 h-11 mb-5 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            autocomplete="off"
            placeholder="Enter language..."
          />
          <input
            type="file"
            id="file"
            class=""
            accept="image/*"
            @change="handleFile"
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
              @click="addExpert"
              class="appearance-none text-xs leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:opacity-70 uppercase"
            >
              Save
            </button>
          </div>
        </div>
        <div
          class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-[400px]"
          v-if="adding == 'tag'"
        >
          <div class="flex justify-between mb-5 items-center">
            <h4 class="font-medium text-matta-black text-xl">Add new value</h4>
            <i
              class="uil uil-times cursor-pointer text-lg hover:ring-1 w-6 h-6 ring-gray-200 flex items-center justify-center hover:ring-offset-2 rounded-full"
              @click="isAdding = false"
            ></i>
          </div>
          <input
            v-model="answer"
            class="rounded-lg px-3 py-3 h-11 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            autocomplete="off"
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
              @click="addTag"
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
  TransitionRoot,
  Combobox,
  ComboboxInput,
  // ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  // ListboxOption,
} from "@headlessui/vue";
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";
import { useRouter } from "vue-router";
import { toast } from 'vue3-toastify';
import { updateAdditional } from "~/services/productservices";
import { uploadfile } from "~/services/onboardingservices";

// const route = useRoute();
const router = useRouter();

const query = ref("");
const toggleNext = inject("toggleNext");
const togglePreview = inject("togglePreview");
const filteredExperts = computed(() =>
  query.value === ""
    ? experts.value
    : experts.value.filter((person) => {
        return person.name.toLowerCase().includes(query.value.toLowerCase());
      })
);
const form = inject("form");
function handleFile(e) {
  const file = e.target.files[0];
  // Encode the file using the FileReader API
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    // Use a regex to remove data url part
    const base64String = reader.result;

    uploadfile({
      base64: base64String.replace("data:", "").replace(/^.+,/, ""),
    }).then((res) => {
      expertAnswer.photo = res.data.message;
    });
  };
}

const experts = ref([
  {
    name: "John Jones",
    email: "johnjones@email.com",
    phone: "0860723910",
    language: "English, French",
    photo: "",
    role: "Manager",
  },
]);
const tags = ref([]);
const isLoading = ref(false);
async function handleSubmit() {
  isLoading.value = true;

  updateAdditional(form)
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

      toast.error((err.response.data.message || err.response.data.Message));
    });
}
function addQuestion() {
  form.productQuestions.push({
    question: "",
    answer: "",
  });
}
function removeQuestion(id) {
  form.productQuestions.splice(id, 1);
}
function addNewExpert() {
  form.productExperts.push({
    name: "",
    email: "",
    phone: "",
    language: "",
    photo: "",
    role: "",
  });
}
function removeExpert(id) {
  form.productExperts.splice(id, 1);
}
const adding = ref("");
// const index = ref(null);
const isAdding = ref(false);
const answer = ref("");
const expertAnswer = reactive({
  name: "",
  email: "",
  phone: "",
  language: "",
  photo: "",
  role: "",
});
function addExpert() {
  experts.value.push(expertAnswer);
  isAdding.value = false;
  form.productExperts[form.productExperts.length - 1].name = expertAnswer.name;
  form.productExperts[form.productExperts.length - 1].email =
    expertAnswer.email;
  form.productExperts[form.productExperts.length - 1].phone =
    expertAnswer.phone;
  form.productExperts[form.productExperts.length - 1].language =
    expertAnswer.language;
  form.productExperts[form.productExperts.length - 1].photo =
    expertAnswer.photo;
  form.productExperts[form.productExperts.length - 1].role = expertAnswer.role;
}
function addTag() {
  form.tags.push(answer.value);
  tags.value.push(answer.value);
  isAdding.value = false;
  answer.value = "";
}
const index = ref(null);
function openmodal(val, id) {
  adding.value = val;
  isAdding.value = true;
  index.value = id;
}
</script>
