<template>
  <div>
    <div class="mb-8">
      <h3 class="text-xl font-medium text-gray-700 capitalize">
        Request for quote
      </h3>
      <p class="text-base font-normal capitalize">
        {{ quote.buyerBusinessName }}
      </p>
    </div>

    <div class="mb-8">
      <p class="text-lg font-medium">
        <span class="text-gray-500">Product name :</span>
        {{ quote.productName }}
      </p>
      <!-- <p class="flex items-center mb-4 text-base font-medium gap-x-2">
        <span class="text-gray-500">Supplier :</span> {{ quote.sellerName }}
      </p> -->
      <div class="grid grid-cols-2">
        <div>
          <p class="text-sm text-gray-500 font-nomrmal">Market</p>
          <p class="text-sm font-medium">{{ quote.market }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 font-nomrmal">Application</p>
          <p class="text-sm font-medium">{{ quote.applications }}</p>
        </div>
      </div>

      <hr class="my-4" />

      <div class="mb-8">
        <h4 class="mb-4 text-lg font-medium text-gray-700">
          Status of request
        </h4>
        <div class="flex items-start gap-x-3">
          <i
            v-if="quote.status == 0"
            class="w-5 text-lg text-yellow-500 fa fa-clock-o"
          ></i>
          <i
            v-if="quote.status == 1"
            class="w-5 text-lg text-blue-500 fa fa-clock-o"
          ></i>
          <i
            v-if="quote.status == 2"
            class="w-5 text-lg text-green-500 fa fa-clock-o"
          ></i>

          <div>
            <div class="flex items-center text-xl font-medium gap-x-2">
              <p class="">Status</p>
              :
              <span v-if="quote.status == 0" class="text-yellow-500"
                >Pending response</span
              >
              <span v-if="quote.status == 1" class="text-blue-500">Viewed</span>
              <span v-if="quote.status == 2" class="text-green-500"
                >Responsed</span
              >
            </div>
            <p
              v-if="quote.status == 0"
              class="text-base font-medium text-gray-500"
            >
              Your request for quote is under review by Matta
            </p>
            <p
              v-if="quote.status == 1"
              class="text-base font-medium text-gray-500"
            >
              Your request for quote has been viewed by Matta
            </p>
            <p
              v-if="quote.status == 2"
              class="text-base font-medium text-gray-500"
            >
              Your request for quote has been sent by Matta
            </p>
          </div>
        </div>
      </div>
      <hr class="my-4" />
      <div class="mb-6">
        <h4 class="mb-4 text-lg font-medium text-gray-700">Requested terms</h4>
        <div class="flex items-start mb-3 gap-x-3">
          <i
            class="w-5 text-lg text-gray-500 fa fa-hand-o-up"
            aria-hidden="true"
          ></i>
          <div>
            <p class="text-base font-medium">
              Estimated {{ quote.expectedVolume }} {{ quote.unit }}(s) total
              annual volume
            </p>
            <p class="text-sm font-normal text-gray-500">
              Use: {{ quote.productUse }}
            </p>
          </div>
        </div>
        <div class="flex items-start gap-x-3">
          <i class="w-5 text-lg text-gray-500 fas fa-truck"></i>
          <div class="text-base">
            <p class="mb-1 text-sm font-medium">Your pick up</p>
            <p class="flex items-center text-sm font-normal gap-x-2">
              <span>Address : </span><span>{{ quote.deliverAddress }}</span>
            </p>
          </div>
        </div>
      </div>

      <hr class="my-4" />
      <div>
        <h4 class="mb-4 text-base font-medium text-gray-700">
          Order preference
        </h4>
        <div class="flex items-start mb-3 gap-x-3">
          <i class="w-5 text-lg text-gray-500 fas fa-clipboard-list"></i>
          <div>
            <p class="flex items-center text-sm font-medium gap-x-2">
              <span class="text-lg text-gray-500">Special instruction:</span>
              <span> {{ quote.additionalInformation }}</span>
            </p>
          </div>
        </div>
        <!-- <div class="flex items-start mb-3 gap-x-3">
          <i
            class="w-5 text-lg text-gray-500 fa fa-user"
            aria-hidden="true"
          ></i>
          <div>
            <p class="mb-2 text-sm font-medium text-gray-700">Requested by</p>
            <p class="mb-1 text-sm">
              {{ quote.requestedBy }}
            </p>
            <p class="text-sm font-normal">{{ quote.contactPhone }}</p>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject } from "vue";

const quote = inject("quote");
</script>
