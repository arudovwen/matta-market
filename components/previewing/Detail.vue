<template>
  <div>

    <div
      class="p-4 sm:p-6 lg:p-[30px] bg-white rounded-[10px] flex flex-col lg:flex-row gap-x-[38px] gap-y-10 lg:gap-y-0"
    >
      <div
        class="flex-1 flex flex-col-reverse lg:flex-row gap-y-[14px] lg:gap-y-0 lg:gap-x-[14px]"
      >
        <div
        v-if="productData.gallery?.length"
          class="lg:w-[100px] flex flex-row lg:flex-col gap-x-3 lg:gap-x-0 lg:gap-y-3"
        >
          <img
            :src="n"
            v-for="n in productData.gallery"
            :key="n"
            :alt="n"
            width="100px"
            height="100"
            @click="imageUrl = n"
            class="bg-gray-100 w-16 lg:w-[100px] object-cover h-16 lg:h-[100px] rounded-[5px]"
          />
          
        </div>
        <div class="lg:w-[100px] flex flex-row lg:flex-col gap-x-3 lg:gap-x-0 lg:gap-y-3" v-if="!productData.gallery?.length">
            <div v-for="n in 4"
            class="bg-gray-100 w-16 lg:w-[100px] object-cover h-16 lg:h-[100px] rounded-[5px]"
          />
          </div>
      
        <div  class="flex-1 relative">
          <img
            :src="imageUrl || productData.gallery[0]"
            alt="cover"
            width="400"
            height="300"
            class="bg-gray-100 w-full h-[200px] lg:h-[300px] xl:h-[460px] rounded-[5px] object-cover"
          />
          <span
            class="absolute h-5 sm:h-[30px] w-5 sm:w-[30px] rounded-full right-[10px] top-[10px] bg-white/70 flex items-center justify-center"
            ><AppIcon
             
              :icon="!productData.liked ? 'ph:heart' : 'ph:heart-fill'"
              class="text-xs sm:text-sm md:text-base darks:text-white"
          /></span>
        </div>
     
      </div>
      <div class="lg:w-[550px]">
        <h1 class="font-bold text-lg sm:text-2xl lg:text-[32px] mb-3 lg:mb-6">
          {{ productData.name }}
        </h1>
        <p class="text-[#444] text-xs lg:text-sm mb-6">
          {{ productData.description }}
        </p>
        <p
          v-if="!productData.hidePrice"
          class="text-xl lg:text-2xl font-[800] mb-6"
        >
          {{ currencyFormat(productData?.packagesAvailable[0].amount || 0) }}
          <span class="text-sm text-[#444] font-normal"
            >/{{ productData.unit }}</span
          >
        </p>
        <p class="text-xs LG:text-sm mb-6">
          <span class="font-normal">Producer:</span
          > <span class="font-bold"> {{ productData?.manufacturer }}</span>
        </p>
        <div
          class="flex flex-col md:flex-row gap-x-[18px] gap-y-4 lg:gap-y-0 mb-6 justify-start"
        >
          <div
            class="flex flex-col sm:flex-row gap-y-4 lg:gap-y-0 gap-x-4 items-center"
          >
            <AppButton
              v-if="productData?.sampleAvailable"
             
              text="Request sample"
              btnClass="!rounded-[5px] !text-[#333] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB]"
            />
            <AppButton
            
              text="Request quote"
              btnClass="!rounded-[5px] !text-[#333] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB] "
            />
          </div>
          <AppButton
           
            :icon="isSaved?'tdesign:heart-filled':'tdesign:heart'"
            text="Save for later"
            btnClass="text-xs sm:text-sm !py-0 !px-0 w-full sm:!w-auto sm:!max-w-max items-center"
          />
        </div>
        <div class="mb-6">
          <h2 class="font-bold text-sm mb-2">Choose packaging</h2>
          <Select
            v-model="selectedPackage"
            :options="packageOptions"
            placeholder="Select a package"
            classInput="min-w-[180px] w-full !bg-white !border-[#E7E7E7] !rounded-[4px] !text-[#333] !h-[50px] cursor-pointer bg-[#FCFCFC]"
          />
        </div>
        <div
          v-if="!productData.hidePrice"
          class="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 gap-x-4"
        >
          <div class="h-[50px] lg:flex-1">
            <CartButton />
          </div>
          <div class="flex flex-col sm:flex-row gap-y-4 lg:gap-y-0 gap-x-4">
            <AppButton
            
              text="Add to cart"
              icon="bytesize:cart"
              btnClass="bg-primary-500  text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm w-full lg:!w-[140px]"
            />
            <AppButton
            
              icon="icon-park-outline:mall-bag"
              text="Buy now"
              btnClass="text-white  !px-[15px] !py-[13px] !normal-case bg-[#f90] flex w-full lg:!w-[140px]"
            />
          </div>
        </div>
      </div>

   
    </div>
  </div>

</template>
<script setup>

const productData = inject(["form"]);

const cartStore = useCartStore();
const authStore = useAuthStore();
const supplierStore = useSupplierStore();

const isAdded = ref(false);
const route = useRoute();
const router = useRouter();
const selectedPackage = ref(null);
const { name, id, category } = route.params;
const imageUrl = ref(productData?.gallery[0]);
const isSaved = ref(false)
const packageOptions = computed(() =>
  productData?.packagesAvailable?.map((i) => {
    return {
      ...i,
      label: `${i.package.title}/${i.size}${i.unit} - ${currencyFormat(
        i.amount
      )}`,
      value: JSON.stringify({ ...i }),
    };
  })
);

const isOpen = ref(false);
const active = ref("signin");
const isAuthOpen = ref(false);
const requestType = ref(null);
function handleclose(val) {
  if (val == "success") {
    window.location.reload();
  }
  isAuthOpen.value = isOpen.value = false;
}

function toggleModal(val) {
  active.value = val;
}
const mypackage = computed(() => JSON.parse(selectedPackage.value));
const counter = ref(1);

function togglePopup() {
  isOpen.value = false;
}
watch(productData, () => {
  supplierStore.fetchSupplier(productData.value.supplierId);
  imageUrl.value = productData?.value?.featuredPhoto;
});
provide("counter", counter);
provide("toggleModal", toggleModal);
provide("togglePopup", togglePopup);
provide("product", productData);
</script>
