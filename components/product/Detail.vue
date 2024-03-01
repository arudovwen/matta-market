<template>
  <div>
    <Breadcrumbs
      className="mb-8 !text-[#333] last:!text-[#165EF0]"
      :links="links"
    />
    <div
      class="p-4 sm:p-6 lg:p-[30px] bg-white rounded-[10px] flex flex-col lg:flex-row gap-x-[38px] gap-y-10 lg:gap-y-0"
    >
      <div
        class="flex-1 flex flex-col-reverse lg:flex-row gap-y-[14px] lg:gap-y-0 lg:gap-x-[14px]"
      >
        <div
          v-if="!isLoading"
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
            class="cursor-pointer bg-gray-100 w-16 lg:w-[100px] object-cover h-16 lg:h-[100px] rounded-[5px]"
          />
        </div>
        <div
          v-if="isLoading"
          class="lg:w-[100px] flex flex-row lg:flex-col gap-x-3 lg:gap-x-0 lg:gap-y-3"
        >
          <div
            v-for="n in 4"
            :key="n"
            class="bg-gray-200 animate-pulse w-16 lg:w-[100px] object-cover h-16 lg:h-[100px] rounded-[5px]"
          />
        </div>
        <div v-if="!isLoading" class="flex-1 relative">
          <img
            :src="imageUrl || productData.featuredPhoto"
            alt="cover"
            width="400"
            height="300"
            class="bg-gray-100 w-full h-[200px] lg:h-[300px] xl:h-[460px] rounded-[5px] object-cover"
          />
          <span
            class="absolute h-5 sm:h-[30px] w-5 sm:w-[30px] rounded-full right-[10px] top-[10px] bg-white/70 flex items-center justify-center"
            ><AppIcon
              @click="handleLike(productData.liked)"
              :icon="!productData.liked ? 'ph:heart' : 'ph:heart-fill'"
              class="text-xs sm:text-sm md:text-base darks:text-white"
          /></span>
        </div>
        <div v-if="isLoading" class="flex-1 relative">
          <div
            class="bg-gray-200 animate-pulse w-full h-[200px] lg:h-[300px] xl:h-[460px] rounded-[10px]"
          />
        </div>
      </div>
      <div class="lg:w-[550px]" v-if="!isLoading">
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
          {{ currencyFormat(productData?.price || 0) }}
          <!-- <span class="text-sm text-[#444] font-normal"
            >/{{ productData.unit }}</span
          > -->
        </p>
        <p class="text-xs :text-sm mb-6">
          <span class="font-normal">Producer:</span
          ><span class="font-bold"> {{ productData?.producer?.title }}</span>
        </p>
        <div
          class="flex flex-col md:flex-row gap-x-[18px] gap-y-4 lg:gap-y-0 mb-6 justify-start"
        >
          <div
            class="flex flex-col sm:flex-row gap-y-4 lg:gap-y-0 gap-x-4 items-center"
          >
            <AppButton
              v-if="productData?.sampleAvailable"
              @click="handleRequest('sample')"
              text="Request sample"
              btnClass="!rounded-[5px] !text-[#333] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB]"
            />
            <AppButton
              @click="handleRequest('quote')"
              text="Request quote"
              btnClass="!rounded-[5px] !text-[#333] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB] "
            />
          </div>
          <AppButton
            @click="handleSave"
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
          v-if="!productData.hidePrice && productData?.supplierId !== authStore.businessId"
          class="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 gap-x-4"
        >
          <div class="h-[50px] lg:flex-1">
            <CartButton />
          </div>
          <div class="flex flex-col sm:flex-row gap-y-4 lg:gap-y-0 gap-x-4">
            <AppButton
              @click="handleCart('add')"
              text="Add to cart"
              icon="bytesize:cart"
              btnClass="bg-primary-500  text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm w-full lg:!w-[140px]"
            />
            <AppButton
              @click="handleCart('buy')"
              icon="icon-park-outline:mall-bag"
              text="Buy now"
              btnClass="text-white  !px-[15px] !py-[13px] !normal-case bg-[#f90] flex w-full lg:!w-[140px]"
            />
          </div>
        </div>
      </div>

      <!-- Sklenton starts here  -->
      <div class="lg:w-[550px]" v-if="isLoading">
        <h1
          class="font-bold text-lg sm:text-2xl lg:text-[32px] mb-3 lg:mb-6 bg-gray-200 w-[160px] p-[8px] rounded-full animate-pulse"
        ></h1>
        <p
          class="text-[#444] text-xs lg:text-sm mb-6 bg-gray-200 w-[260px] p-[8px] rounded-full animate-pulse"
        ></p>
        <p
          class="text-xl lg:text-2xl font-[800] mb-6 bg-gray-200 w-[160px] p-[6px] rounded-full animate-pulse"
        ></p>
        <p class="text-xs :text-sm mb-6">
          <span
            class="font-normal bg-gray-200 inline-flex w-[80px] p-[4px] rounded-full animate-pulse"
          ></span
          ><span
            class="font-bold bg-gray-200 w-[140px] inline-flex p-[4px] rounded-full animate-pulse ml-2"
          >
          </span>
        </p>
        <div
          class="flex flex-col md:flex-row gap-x-[18px] gap-y-4 lg:gap-y-0 mb-6 justify-start items-center"
        >
          <div
            class="flex flex-col sm:flex-row gap-y-4 lg:gap-y-0 gap-x-4 items-center"
          >
            <AppButton
              text=""
              btnClass="!rounded-[5px] !text-[#333] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB] !bg-gray-200 w-[160px] !h-[38px] rounded-full animate-pulse"
            />
            <AppButton
              text=""
              btnClass="!rounded-[5px] !text-[#333] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB] !bg-gray-200 w-[160px] !h-[38px] rounded-full animate-pulse"
            />
          </div>
          <p
            class="text-xl lg:text-2xl font-[800] bg-gray-200 w-[160px] p-[6px] rounded-full animate-pulse"
          ></p>
        </div>
        <div class="mb-6">
          <p
            class="text-xl lg:text-2xl font-[800] mb-6 bg-gray-200 w-[160px] p-[6px] rounded-full animate-pulse"
          ></p>
          <AppButton
            text=""
            btnClass="!rounded-[5px] !text-[#333] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB] !bg-gray-200 w-[260px] !h-[50px] rounded-full animate-pulse"
          />
        </div>
        <div class="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 gap-x-4">
          <AppButton
            text=""
            btnClass="!rounded-[5px] !text-[#333] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB] !bg-gray-200 w-[160px] !h-[50px] rounded-full animate-pulse"
          />
          <div class="flex flex-col sm:flex-row gap-y-4 lg:gap-y-0 gap-x-4">
            <AppButton
              text=""
              btnClass="!rounded-[5px] !text-[#333] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB] !bg-gray-200 w-[160px] !h-[50px] rounded-full animate-pulse"
            />
            <AppButton
              text=""
              btnClass="!rounded-[5px] !text-[#333] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB] !bg-gray-200 w-[160px] !h-[50px] rounded-full animate-pulse"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <SideModal :isOpen="isOpen" @togglePopup="isOpen = false" v-if="isOpen">
    <template #content>
      <div class="h-full w-full bg-white rounded-lg p-6 lg:p-10">
        <InformationSampleIndexSample
          @togglePopup="isOpen = false"
          v-if="requestType == 'sample'"
        />
        <InformationQuoteIndexQuote
          @togglePopup="isOpen = false"
          v-if="requestType == 'quote'"
        />
      </div>
    </template>
  </SideModal>
  <LoginModal
    v-if="isAuthOpen && active == 'signin'"
    :showSignup="true"
    :isOpen="isAuthOpen"
    @close="handleclose"
  />
  <RegisterModal
    v-if="isAuthOpen && active == 'signup'"
    :showSignup="true"
    :isOpen="isAuthOpen"
    @close="handleclose"
  />
  <AddedToCart
    v-if="isAdded"
    :selectedPackage="mypackage.package"
    @close="isAdded = false"
    :totalAmount="mypackage?.amount"
    :quantity="counter"
    :name="productData.name"
    :hidePrice="productData.hidePrice"
  />
</template>
<script setup>
import { useProductStore } from "~/stores/products";
import { toast } from "vue3-toastify";
import { likeproduct } from "~/services/productservices";

const isLoading = inject("isLoading");
const store = useProductStore();
const cartStore = useCartStore();
const authStore = useAuthStore();
const supplierStore = useSupplierStore();
const { productData } = storeToRefs(store);
const isAdded = ref(false);
const route = useRoute();
const router = useRouter();
const selectedPackage = ref(null);
const { name, id, category } = route.params;
const imageUrl = ref(productData?.value?.featuredPhoto);
const isSaved = ref(false)
const packageOptions = computed(() =>
  productData?.value?.packagesAvailable?.map((i) => {
    return {
      ...i,
      label: `${i.package.title}/${i.size}${i.unit} - ${currencyFormat(
        i.amount
      )}`,
      value: JSON.stringify({ ...i }),
    };
  })
);
const links = [
  {
    title: "home",
    url: "/",
  },
  {
    title: category,
    url: `/category/market/${category}/${
      route.query.categoryId ? route.query.categoryId : ""
    }`,
  },
  {
    title: name,
    url: "#",
  },
];
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
function handleRequest(type) {
  if (authStore.isLoggedIn) {
    isOpen.value = true;
    requestType.value = type;
  } else {
    isAuthOpen.value = true;
  }
}
function toggleModal(val) {
  active.value = val;
}
const mypackage = computed(() => JSON.parse(selectedPackage.value));
const counter = ref(1);
function handleCart(type) {
  if (!selectedPackage.value) {
    toast.info("Please choose a package");
    return;
  }

  let data = {
    id: 0,
    packageId: mypackage?.value.package.id,
    unit: mypackage?.value.unit,
    productId: productData?.value?.id,
    product: productData?.value.name,
    productImg: productData?.value?.featuredPhoto,
    selectedPackage: mypackage?.value.package?.title,
    selectedPackageData: mypackage.value,
    productBrandName: productData?.value.productBrandName,
    supplierId: productData?.value.supplierId,
    producer: productData.value?.manufacturer,
    quantity: counter.value,
    packagePrice: mypackage?.value.amount,
  };

  cartStore?.addToCart(data, type).then((res) => {
    if (!res.status && res.message === "incart") {
      toast.info("Already in your cart");
    }
    if (res.status && res.message !== "buy") {
      isAdded.value = true;
      setTimeout(() => {
        isAdded.value = false;
      }, 3000);
    }
    if (res.message === "buy") {
      router.push("/cart");
    }
  });
}
function handleSave() {
  if (!authStore.isLoggedIn) {
    toast.info("Login to continue");
   return;
  }
  isSaved.value = true
  toast.success("Saved");
}

function handleLike(value) {
  if (!authStore.isLoggedIn) {
    toast.info("Login to continue");
  }
  let data = {
    businessId: authStore.userId,
    productId: productData.value.id,
    productName: productData.value.name,
    productImg: productData.value.gallery.length
      ? productData.value.gallery[0]
      : "",
    backgroundbg: "",
    price: productData.value.price,
    unit: productData.value.unit,
    supplier: productData.value.companyName,
    manufacturer: productData.value.manufacturer,
    options: productData.value.packagesAvailable.length,
    featuredPack: productData.value.packages.length
      ? productData.value.packages[0].title
      : "",
  };

  if (value) {
    unlikeproduct(data).then((res) => {
      if (res.status === 200) {
        toast.success("Successfully Unliked");
      }
    });
  } else {
    likeproduct(data).then((res) => {
      if (res.status === 200) {
        toast.success("Successfully liked");
      }
    });
  }
}

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
