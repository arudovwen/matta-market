<template>
  <div class="top">
    <DeltaLogHeader />
    <div
      class="flex flex-col justify-between container h-fit pb-[40px] md:flex-row"
    >
      <div class="w-full sm:w-[50%] flex h-auto flex-col items-start mb-8">
        <h1
          class="text-[40px] sm:text-[60px] font-bold line-height-[72px] text-[#101828]"
        >
          Move, Store, and <br />Distribute with<br />DeltaLog
        </h1>
        <span class="font-normal line-height-[36px] text-[#475467] my-[30px]"
          >Seamless Fulfillment Solutions for Africa's Manufacturing
          Industry</span
        >
        <button
          @click="getStartedIsOpen = true"
          class="bg-[#1570EF] text-white rounded-[5px] px-[24px] py-[9px] flex gap-x-1 items-center font-semibold"
        >
          Get Started
        </button>
      </div>
      <ShippingCalculator />
    </div>
  </div>
  <div
    class="container h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[80vh] overflow-hidden rounded-lg mb-12"
  >
    <img src="/assets/images/landing-page-image-one.jpeg" class="w-full" />
  </div>
  <div
    class="flex flex-col items-center container justify-around sm:py-8 mb-12 bg-[#F9FAFB] h-[230px]"
  >
    <p text="font-weight-normal text-[50px] mb-8">
      Trusted by 4,000+ companies
    </p>
    <div class="flex flex-row justify-around w-full">
      <div class="flex flex-row justify-between items-center company">
        <img src="/assets/images/Coca-Cola-logo.png" />
      </div>
      <div class="flex flex-row justify-between items-center company">
        <img src="/assets/images/cormart-logo.png" />
      </div>
      <div class="flex flex-row justify-between items-center company">
        <img
          src="/assets/images/Honeywell-Flour-Mills-Profit-Turns-Red-as-Costs-Eclipse-Revenue.png"
        />
      </div>
      <div class="flex flex-row justify-between items-center company">
        <img src="/assets/images/BASF-Logo.png" />
      </div>
      <div class="flex flex-row justify-between items-center company">
        <img src="/assets/images/Air-Liquide-logo.png" />
      </div>
      <div class="flex flex-row justify-between items-center company">
        <img src="/assets/images/cargill-logo-vector.png" />
      </div>
    </div>
  </div>

  <div
    class="h-fit container flex flex-col items-center justify-start mt-2 mb-10"
  >
    <h1 class="text-[42px] font-bold text-[#101828] text-center">
      Our Solutions
    </h1>
    <span class="font-light text-center text=[#52525B]"
      >Discover Our Fulfillment Solutions, expertly curated to<br />
      meet your business goals.</span
    >
    <div
      class="flex flex-col justify-around w-full mt-6 items-center sm:flex-row"
    >
      <div
        class="flex flex-col justify-between items-center w-full sm:w-[270px] my-4"
      >
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            d="M58.0493 16.9799L39.1792 6.81C37.1992 5.73 34.7992 5.73 32.7892 6.81L13.9193 16.9799C12.5393 17.7299 11.6992 19.1999 11.6992 20.8199C11.6992 22.4399 12.5393 23.9099 13.9193 24.6599L32.7892 34.8299C33.7792 35.3699 34.8892 35.64 35.9692 35.64C37.0492 35.64 38.1592 35.3699 39.1492 34.8299L58.0192 24.6599C59.3992 23.9099 60.2392 22.4399 60.2392 20.8199C60.2992 19.1999 59.4293 17.7299 58.0493 16.9799Z"
            fill="#102A56"
          />
          <path
            opacity="0.4"
            d="M29.7001 38.3701L12.1501 29.5802C10.8001 28.8902 9.24013 28.9801 7.95013 29.7601C6.66013 30.5401 5.91016 31.9202 5.91016 33.4202V50.0101C5.91016 52.8901 7.50011 55.4701 10.0801 56.7601L27.6301 65.5203C28.2301 65.8203 28.8902 65.9702 29.5502 65.9702C30.3302 65.9702 31.1102 65.7603 31.8002 65.3103C33.0902 64.5303 33.8401 63.1502 33.8401 61.6502V45.0603C33.8701 42.2403 32.2801 39.6601 29.7001 38.3701Z"
            fill="#102A56"
          />
          <path
            opacity="0.4"
            d="M66.0909 33.45V47.2199C66.0609 47.1899 66.0309 47.1299 66.0009 47.0999C66.0009 47.0699 65.9709 47.0399 65.9409 47.0099C65.8209 46.8299 65.6709 46.6499 65.5209 46.4999C65.4909 46.4699 65.4609 46.41 65.4309 46.38C63.0009 43.68 59.4309 41.9999 55.5009 41.9999C51.7209 41.9999 48.2709 43.5599 45.8109 46.0799C43.4409 48.5099 42.0009 51.8399 42.0009 55.4999C42.0009 58.0199 42.7209 60.4199 43.9509 62.4599C44.4609 63.3299 45.0909 64.1099 45.7809 64.8299L44.3709 65.5498C43.7709 65.8498 43.1109 65.9999 42.4509 65.9999C41.6709 65.9999 40.8909 65.79 40.1709 65.34C38.9109 64.56 38.1309 63.1799 38.1309 61.6799V45.1198C38.1309 42.2398 39.7209 39.6598 42.3009 38.3698L59.8509 29.6099C61.2009 28.9199 62.7609 28.9799 64.0509 29.7899C65.3109 30.5699 66.0909 31.95 66.0909 33.45Z"
            fill="#102A56"
          />
          <path
            d="M65.94 47.0099C63.48 43.9799 59.73 42.0601 55.5 42.0601C52.32 42.0601 49.38 43.17 47.07 45.03C43.95 47.49 42 51.3001 42 55.5601C42 58.0801 42.72 60.4801 43.95 62.5201C44.76 63.8701 45.78 65.04 46.98 66H47.01C49.32 67.92 52.29 69.0601 55.5 69.0601C58.92 69.0601 62.01 67.8001 64.38 65.7001C65.43 64.8001 66.33 63.7201 67.05 62.5201C68.28 60.4801 69 58.0801 69 55.5601C69 52.3201 67.86 49.3199 65.94 47.0099ZM62.28 53.8801L55.08 60.54C54.66 60.93 54.09 61.14 53.55 61.14C52.98 61.14 52.41 60.9299 51.96 60.4799L48.63 57.15C47.76 56.28 47.76 54.84 48.63 53.97C49.5 53.1 50.94 53.1 51.81 53.97L53.61 55.7701L59.22 50.58C60.12 49.74 61.56 49.8001 62.4 50.7001C63.27 51.6301 63.21 53.0401 62.28 53.8801Z"
            fill="#102A56"
          />
        </svg>
        <span class="font-bold text-lg my-2">Order Fulfillment</span>
        <span class="text-center text-sm"
          >Efficiently manage your fulfilment processes, from inventory
          management to delivery.</span
        >
      </div>
      <div
        class="flex flex-col justify-between items-center w-full sm:w-[270px] my-4"
      >
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M68.25 66C68.25 67.23 67.23 68.25 66 68.25H6C4.77 68.25 3.75 67.23 3.75 66C3.75 64.74 4.77 63.75 6 63.75H66C67.23 63.75 68.25 64.74 68.25 66Z"
            fill="#102A56"
          />
          <path
            opacity="0.4"
            d="M62.9996 29.94V63.7501H8.84961L8.99962 29.91C8.99962 28.08 9.83961 26.3402 11.3096 25.2002L32.3096 8.88016C34.4696 7.17016 37.5296 7.17016 39.6896 8.88016L60.6896 25.2002C62.1596 26.3402 62.9996 28.08 62.9996 29.94Z"
            fill="#102A56"
          />
          <path
            d="M40.5 24.75H31.5C30.27 24.75 29.25 23.73 29.25 22.5C29.25 21.27 30.27 20.25 31.5 20.25H40.5C41.73 20.25 42.75 21.27 42.75 22.5C42.75 23.73 41.73 24.75 40.5 24.75Z"
            fill="#102A56"
          />
          <path
            d="M46.5 33H25.5C23.01 33 21 35.01 21 37.5V66H51V37.5C51 35.01 48.99 33 46.5 33ZM32.25 53.25C32.25 54.48 31.23 55.5 30 55.5C28.77 55.5 27.75 54.48 27.75 53.25V48.75C27.75 47.52 28.77 46.5 30 46.5C31.23 46.5 32.25 47.52 32.25 48.75V53.25Z"
            fill="#102A56"
          />
        </svg>

        <span class="font-bold text-lg my-2">Warehousing</span>
        <span class="text-center text-sm"
          >Provide secure storage solutions for importers, ensuring goods are
          well-kept until needed.</span
        >
      </div>
      <div
        class="flex flex-col justify-around items-center w-full sm:w-[270px] my-4"
      >
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            d="M66 42V51C66 55.98 61.98 60 57 60H54C54 56.7 51.3 54 48 54C44.7 54 42 56.7 42 60H30C30 56.7 27.3 54 24 54C20.7 54 18 56.7 18 60H15C10.02 60 6 55.98 6 51V42H39C42.3 42 45 39.3 45 36V15H50.5201C52.6801 15 54.66 16.17 55.7401 18.03L60.8699 27H57C55.35 27 54 28.35 54 30V39C54 40.65 55.35 42 57 42H66Z"
            fill="#102A56"
          />
          <path
            d="M24 66C27.3137 66 30 63.3137 30 60C30 56.6863 27.3137 54 24 54C20.6863 54 18 56.6863 18 60C18 63.3137 20.6863 66 24 66Z"
            fill="#102A56"
          />
          <path
            d="M48 66C51.3137 66 54 63.3137 54 60C54 56.6863 51.3137 54 48 54C44.6863 54 42 56.6863 42 60C42 63.3137 44.6863 66 48 66Z"
            fill="#102A56"
          />
          <path
            d="M66 37.5901V42H57C55.35 42 54 40.65 54 39V30C54 28.35 55.35 27 57 27H60.8699L65.22 34.6199C65.73 35.5199 66 36.5401 66 37.5901Z"
            fill="#102A56"
          />
          <path
            d="M42 6H18C12.15 6 7.29005 10.2 6.24005 15.75H21C22.23 15.75 23.25 16.77 23.25 18C23.25 19.23 22.23 20.25 21 20.25H6V24.75H15C16.23 24.75 17.25 25.77 17.25 27C17.25 28.23 16.23 29.25 15 29.25H6V33.75H9C10.23 33.75 11.25 34.77 11.25 36C11.25 37.23 10.23 38.25 9 38.25H6V42H39C42.3 42 45 39.3 45 36V9C45 7.35 43.65 6 42 6Z"
            fill="#102A56"
          />
          <path
            d="M6.24005 15.75H3C1.77 15.75 0.75 16.77 0.75 18C0.75 19.23 1.77 20.25 3 20.25H6V18C6 17.22 6.09005 16.47 6.24005 15.75Z"
            fill="#102A56"
          />
          <path
            d="M3 24.75C1.77 24.75 0.75 25.77 0.75 27C0.75 28.23 1.77 29.25 3 29.25H6V24.75H3Z"
            fill="#102A56"
          />
          <path
            d="M3 33.75C1.77 33.75 0.75 34.77 0.75 36C0.75 37.23 1.77 38.25 3 38.25H6V33.75H3Z"
            fill="#102A56"
          />
        </svg>

        <span class="font-bold text-lg my-2">Distribution</span>
        <span class="text-center text-sm"
          >Streamline the movement of goods to regional hubs, making
          distribution within markets more efficient and faster.</span
        >
      </div>
    </div>
  </div>
  <!-- Why choose matta -->
  <div class="w-full h-auto bg-[#F9FAFB] py-24">
    <div class="container flex flex-col align-start justify-start">
      <h2 class="text-[36px] font-bold text-[#101828]">
        Why Choose Matta for Your Sourcing Needs?
      </h2>
      <span class="text-[20px] text-[#475467] font-normal mt-2"
        >Simplify Your Procurement Process with Matta</span
      >
      <div class="flex flex-col lg:flex-row flex-wrap justify-between mt-12">
        <div class="w-full lg:w-[45%] flex flex-col items-start justify-around">
          <span class="flex flex-row">
            <img src="/assets/images/Featured icon.svg" class="mr-2" />
            <div class="flex flex-col justify-between items-start">
              <span class="text[20px] text-[#101828] font-bold"
                >Instant Quotes</span
              >
              <span class="text[20px] text-[#475467]"
                >Get an instant estimate for any of our fulfilment
                solutions.</span
              >
            </div>
          </span>
          <span class="flex flex-row">
            <img src="/assets/images/Featured icon.svg" class="mr-2" />
            <div class="flex flex-col justify-between items-start">
              <span class="text[20px] text-[#101828] font-bold"
                >API Integration</span
              >
              <span class="text[20px] text-[#475467]"
                >Seamlessly connect your platform to our suite of solutions to
                manage your data centrally.</span
              >
            </div>
          </span>
          <span class="flex flex-row">
            <img src="/assets/images/Featured icon.svg" class="mr-2" />
            <div class="flex flex-col justify-between items-start">
              <span class="text[20px] text-[#101828] font-bold"
                >Live Tracking</span
              >
              <span class="text[20px] text-[#475467]"
                >Track the specific location of your delivery or requested
                vehicle in real-time, eliminating hassles.</span
              >
            </div>
          </span>
          <span class="flex flex-row">
            <img src="/assets/images/Featured icon.svg" class="mr-2" />
            <div class="flex flex-col justify-between items-start">
              <span class="text[20px] text-[#101828] font-bold">Wallet</span>
              <span class="text[20px] text-[#475467]"
                >Conveniently manage and track your financial transactions with
                our integrated wallet feature.</span
              >
            </div>
          </span>
        </div>
        <div class="w-full lg:w-[45%] mt-8">
          <img
            class="w-full rounded-xs"
            src="/assets/images/huge-heavy-duty-truck-on-the-empty-road-2023-11-27-05-16-03-utc.jpg"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="bg-[#0C111D] w-full h-auto pt-28 pb-12">
    <div
      class="container flex flex-col sm:flex-row justify-between align-start mb-40"
    >
      <div class="text-[#EAECF0] flex flex-col w-full sm:w-[60%]">
        <span class="font-semibold text-3xl"
          >Ready to Transform your Procurement Process?</span
        >
        <span class="text-xl"
          >Get started with Matta today and experience a new level of sourcing
          efficiency. Upload your RFQ and let us connect you to the world’s best
          suppliers in no time.</span
        >
      </div>
      <button
        @click="getStartedIsOpen = true"
        class="bg-blue-600 h-[48%] py-[12px] px-[18px] text-white rounded-lg flex items-center w-[155px]"
      >
        Get Started
        <img src="/assets/images/Buttons/arrow-narrow-right.svg" class="ml-2" />
      </button>
    </div>
    <div
      class="flex flex-row items-end container border-t-2 border-[#182230] justify-between h-[46px]"
    >
      <span class="text-white text-[16px]"
        >© 2024 DeltaLog All Rights Reserved</span
      >
      <div class="flex flex-row w-[70px] justify-between">
        <img src="/assets//images/twitter.svg" class="h-[22px] w-[22px]" />
        <img src="/assets//images/linkedin.svg" class="h-[22px] w-[22px]" />
      </div>
    </div>
  </div>
  <IndexModal :isOpen="getStartedIsOpen" :canClose="false">
    <template #content>
      <form @submit.prevent="onSubmit" class="rounded-sm p-8 w-[400px]">
        <div
          class="flex gap-x-5 justify-between items-center mb-4 bg-white w-full"
        >
          <legend
            @click="getStartedIsOpen = true"
            class="text-[#18273AF0] text-lg font-bold"
          >
            Get Started
          </legend>
          <button
            @click="getStartedIsOpen = false"
            type="button"
            class="h-6 w-6 text-[#8C8C8C] bg-[#F5F5F5] rounded-full flex items-center justify-center text-[13px]"
          >
            <AppIcon icon="ph:x-bold" />
          </button>
        </div>
        <div class="w-full mb-2">
          <Textinput
            label="Full Name"
            v-model="fullName"
            v-bind="fullNameAtt"
            name="company"
            placeholder=""
            type="text"
            :error="errors.fullName"
            classInput="!w-full"
          />
        </div>
        <div class="w-full mb-2">
          <Textinput
            label="Business Name"
            v-model="company"
            v-bind="companyAtt"
            name="companyName"
            placeholder=""
            type="text"
            :error="errors.companyName"
            classInput="!w-full"
          />
        </div>
        <div class="w-full mb-2">
          <Textinput
            label="Email Address"
            v-model="email"
            v-bind="emailAtt"
            name="email"
            placeholder=""
            type="text"
            :error="errors.email"
            classInput="!w-full"
          />
        </div>
        <div>
          <div class="mb-2 mt-2">
            <label for="phone" class="mb-2 font-weight[700] block"
              >Phone number
              <span class="text-red-500 pl-[.02rem]">*</span>
            </label>
            <div class="flex items-center border rounded-lg w-full">
              <Listbox
                class="flex items-center"
                v-model="phoneCode"
                :v-bind="phoneCode"
              >
                <div class="relative h-full">
                  <ListboxButton
                    class="relative cursor-pointer h-full text-left flex items-center rounded-l-lg pl-3 gap-x-2 py-3 border-r placeholder:text-[#B6B7B9] focus:outline-matta-black/20 text-sm"
                  >
                    <span class="text-sm" v-if="phoneCode">
                      <div class="text-[#3A3745] flex items-center gap-x-1">
                        <span v-if="phoneCode">{{ phoneCode }}</span>
                      </div>
                    </span>
                    <span
                      class="block text-sm text-[#8F8C9A] whitespace-nowrap"
                      v-else
                      >{{ "" }}</span
                    >
                    <AppIcon icon="uil:angle-down" />
                  </ListboxButton>

                  <transition
                    leave-active-class="transition duration-100 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <ListboxOptions
                      class="absolute top-11 mt-1 w-full min-w-[320px] border border-gray-100 z-40 rounded-lg bg-white py-6 text-xs shadow-lg outline-0 sm:text-[13px]"
                    >
                      <div class="relative flex items-center mb-3 mt-3 px-4">
                        <input
                          v-model="query"
                          placeholder="Search"
                          class="text-xs rounded-lg px-3 py-1 h-10 w-full border placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                        />
                      </div>
                      <div class="max-h-60 overflow-y-auto py-2">
                        <ListboxOption
                          v-slot="{ active, selected }"
                          v-for="z in filteredCodes"
                          :key="z"
                          :value="z.dial_code"
                          as="template"
                        >
                          <span
                            :class="[
                              active || selected ? 'bg-gray-50' : '',
                              'relative cursor-pointer select-none py-[11px] px-[20px] text-loft-black hover:bg-gray-100  flex items-center justify-between',
                            ]"
                          >
                            <p class="text-sm text-[#101828] capitalize">
                              {{ z.dial_code }} - &nbsp; {{ z.name }}
                            </p>
                            <i
                              class="uil uil-check text-[#101828]"
                              v-show="selected"
                            ></i>
                          </span>
                        </ListboxOption>
                      </div>
                    </ListboxOptions>
                  </transition>
                </div>
              </Listbox>
              <input
                v-model="phoneNumber"
                :v-vbind="phoneNumberAtt"
                placeholder="08160723884"
                type="tel"
                class="flex-1 px-4 outline-none h-full py-2 text-sm"
              />
            </div>
          </div>
          <span
            v-if="errors.phoneCode || errors.phoneNumber"
            class=""
            :class="' text-danger-500 block text-sm'"
            >{{ errors.phoneCode || errors.phoneNumber }}</span
          >
        </div>
        <Textarea
          :isCumpulsory="true"
          placeholder=""
          label="How can we serve you?"
          name="description"
          v-bind="enquiryAtt"
          v-model="enquiry"
          :error="errors.enquiry"
        />
        <button
          :disabled="loading"
          class="appearance-none leading-none px-5 lg:px-10px-10 py-[10px] rounded-lg text-white bg-primary-500 disabled:opacity-50 text-[13px] w-full mt-6 h-[44px]"
          type="submit"
        >
          Submit
        </button>
      </form>
    </template>
  </IndexModal>
</template>
<script setup>
import DeltaLogHeader from "~/components/DeltaLogHeader.vue";
import ShippingCalculator from "~/components/ShippingCalculator.vue";
import IndexModal from "~/components/IndexModal.vue";
import AppIcon from "~/components/AppIcon.vue";
import * as yup from "yup";
import PhoneCodes from "~/components/forms/PhoneCodes.vue";
import { toast } from "vue3-toastify";
import { provide } from "vue";
definePageMeta({
  layout: "",
});

provide("toggleGetStarted", () => (getStartedIsOpen.value = false));

const loading = ref(false);

const sendEnquiry = (values) => {
  loading.value = true;
  // fetch("https://gateway.deltalog.co/api/Anonymous/enquiry", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     ...values,
  //     phoneNumber: values.phoneCode + values.phoneNumber,
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  getEnquiry({
    ...values,
    phoneNumber: values.phoneCode + values.phoneNumber,
  })
    .then((res) => {
      if (res.status === 200) {
        toast.success("Enquiry made successfully", {
          position: "bottom-right",
        });
        getStartedIsOpen.value = false;
      }
      return res.json();
    })
    .catch((err) => {
      toast.error("Enquiry failed", { position: "bottom-right" });
    })
    .finally(() => {
      loading.value = false;
    });
};

const { handleSubmit, defineField, errors, setFieldValue, resetForm, values } =
  useForm({
    validationSchema: yup.object({
      fullName: yup.string().required(),
      email: yup.string().email().required(),
      companyName: yup.string().notRequired(),
      phoneCode: yup.string().required(),
      phoneNumber: yup.string().required(),
      enquiry: yup.string().required(),
    }),
    initialValues: reactive({
      fullName: "",
      email: "",
      companyName: "",
      phoneNumber: "",
      phoneCode: "+234",
      enquiry: "",
    }),
  });

const [fullName, fullNameAtt] = defineField("fullName");
const [email, emailAtt] = defineField("email");
const [company, companyAtt] = defineField("companyName");
const [phoneCode, phoneCodeAtt] = defineField("phoneCode");
const [phoneNumber, phoneNumberAtt] = defineField("phoneNumber");
const [enquiry, enquiryAtt] = defineField("enquiry");

import {
  Listbox,
  // ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import CountryList from "country-list-with-dial-code-and-flag";
import { getEnquiry } from "~/services/deltaservice";

const query = ref("");
const filteredCodes = computed(() => {
  if (!query.value.length) return CountryList;
  return CountryList?.filter((item) =>
    item.name.toLowerCase().includes(query.value.toLowerCase())
  );
});

const getStartedIsOpen = ref(false);

const onSubmit = handleSubmit((values) => {
  sendEnquiry(values);
});
</script>
<style lang="scss">
.top {
  background: white;
  background-image: radial-gradient(gray 1px, transparent 0);
  background-size: 40px 40px;
  background-position: -19px -19px;
  height: auto;
}

.company > img {
  width: 80%;
}
</style>
