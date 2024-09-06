<template>
  <div class="gap-y-2 flex flex-col">
    <!-- Top bar   -->
    <div>
      <HeaderComponent
        :welcome="`Welcome back, ${auth?.userInfo?.firstName}`"
        subtext="Your current sales summary and activity."
        className="!px-0 !py-0 pb-6 !border-none mb-[15px]"
      />
    </div>
    <VerificationBox />

    <div class="pb-10" v-if="stats">
	
      <div
        class="p-4 lg:p-6 rounded-[10px] bg-white mb-8 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)]"
      >
        <div
          class="mb-10 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-y-4"
        >
          <div
            class="border border-[#D0D5DD] rounded-lg overflow-hidden text-xs lg:text-sm text-[#344054] max-w-max"
          >
            <button
              class="px-4 py-2 border-r border-[#D0D5DD] last:border-none font-semibold"
              :class="active === n.value ? 'bg-[#F9FAFB]' : ''"
              v-for="n in filters"
              @click="active = n.value"
            >
              {{ n.title }}
            </button>
          </div>
          <div class="max-w-[200px] hidden lg:inline">
            <ClientOnly>
              <VueDatePicker
                auto-apply
                v-model="date"
                range
                multi-calendars
                placeholder="Select dates"
                :time-picker="false"
                input-class-name="!text-sm"
              />
            </ClientOnly>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-x-8 w-full">
          <div class="flex-1">
            <div class="">
              <div class="flex justify-between">
                <div>
                  <span class="block text-sm text-[#475467] font-medium"
                    >Total Amount</span
                  >

                  <div class="flex gap-x-1 items-start">
                    <span class="block text-[30px] font-bold">
                      <span
                        class="block text-xl xl:text-[30px] font-semibold text-[#101828]"
                        >{{ currencyFormat(stats.currentBalance) }}</span
                      ></span
                    >
                    <span
                      class="text-xs flex gap-x-1 items-center text-[#17B26A]"
                    >
                      <AppIcon
                        icon="uil:arrow-growth"
                        iconClass="!text-[#17B26A]"
                      />
                      <span>{{ stats.currentBalancePecentage }}%</span></span
                    >
                  </div>
                </div>
              </div>
              <client-only>
                <apexchart
                  type="area"
                  height="300"
                  :options="chartOptions"
                  :series="series"
                ></apexchart
              ></client-only>
            </div>
          </div>
          <div
            class="xl:w-[200px] flex flex-row lg:flex-col gap-6 justify-between xl:justify-start"
          >
            <div
              class="leading-tight text-center md:text-left"
              v-for="n in Statistics"
              :key="n.title"
            >
              <span
                class="block text-[#475467] font-medium text-xs lg:text-sm capitalize"
                >{{ n.title }}</span
              >
              <div class="flex gap-x-1 items-start">
                <span
                  class="block text-base lg:text-xl xl:text-[30px] font-bold"
                  >{{ stats[n.key] }}</span
                >
                <span class="text-xs flex gap-x-1 items-center text-[#17B26A]">
                  <AppIcon
                    icon="uil:arrow-growth"
                    iconClass="!text-[#17B26A]"
                  />
                  <span>{{ stats[n.percent] }}%</span></span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="rounded-[10px] bg-white border border-[#F4F7FE] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)]"
      >
        <HeaderComponent title="Trending Products" className="!px-5" />
        <div>
          <div class="overflow-x-auto max-w-[80vw] lg:max-w-full">
            <table aria-describedby="true" class="w-full" v-if="trending.length">
              <thead>
                <tr>
                  <th
                    v-for="item in theads"
                    :key="item"
                    class="capitalize text-[#475467] text-sm text-left font-medium border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
                  >
                    {{ item }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in trending" :key="item.id">
                  <td
                    class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                  >
                    <span>
                      <span class="text-sm font-medium">
                        {{ item.product }}
                      </span>
                      <br />
                      <span class="text-xs font-normal">
                        {{ item.manufacturer }}
                      </span>
                    </span>
                  </td>
                  <td
                    class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                  >
                    {{ moment(item.created).format("ll") }}
                  </td>
                  <td
                    class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                  >
                    {{ item.views }}
                  </td>

                  <td
                    class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                  >
                    {{ item.orders }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <EmptyData
            v-if="!trending.length"
            buttonText=""
            text="No orders yet"
          />
        </div>
      </div>
    </div>
    <div class="text-center p-6 lg:p-8 my-24" v-else>
      <AppLoader />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import {
  getesfrontstats,
  getstorefronttrending,
} from "~/services/settingservices";
import moment from "moment";
import EmptyData from "~/components/EmptyData";
import { getorderchart, getchart } from "~/services/chartservice";

const auth = useAuthStore();
const date = ref();
const links = [
  {
    title: "home",
    url: "/",
  },
  {
    title: "storefront",
    url: "/overview",
  },
];
const filters = [
  {
    title: "12 months",
    value: 12,
    duration: "months",
  },
  {
    title: "30 days",
    value: 30,
    duration: "days",
  },
  {
    title: "7 days",
    value: 7,
    duration: "days",
  },
  {
    title: "24 hours",
    value: 1,
    duration: "day",
  },
];
const Statistics = [
  {
    title: "product views",
    key: "productViews",
    percent: "productViewPercentage",
  },
  {
    title: "confirmed orders",
    key: "confirmedOrders",
    percent: "confirmOrdersPecentage",
  },
  {
    title: "pending orders",
    key: "pendingOrder",
    percent: "pendingorderPercentage",
  },
];
const startDate = ref(new Date(moment(moment()).subtract(5, "months")));
const endDate = ref(new Date());
const query = reactive({
  StartDate: moment(moment()).subtract(5, "months").format("yyyy-MM-DD"),
  EndDate: moment().format("yyyy-MM-DD"),
  top: 10,
});

const active = ref(null);
const stats = ref(null);
const trending = ref([]);
const thisyear = ref([]);
const thisyearseries = ref([]);
const lastyearseries = ref([]);
const showChart = ref(false);

const viewmonth = ref([]);
const viewseries = ref([]);
const quotemonth = ref([]);
const quoteseries = ref([]);
const balancemonth = ref([]);
const balanceseries = ref([]);
const confirmmonth = ref([]);
const confirmseries = ref([]);
// const pendingmonth = ref(["Sep", "Oct", "Nov"]);
// const pendingseries = ref([0, 0, 0]);

onMounted(() => {
  getesfrontstats(query).then((res) => {
	
    stats.value = res.data.data;
  });
  getstorefronttrending(query).then((res) => {
    trending.value = res.data.data.slice(0, 9);
  });
  getAllCharts();
});

function getAllCharts() {
  getorderchart(query).then((res) => {
    if (res.status === 200) {
      thisyear.value = res?.data?.data?.data[0]?.chartrecords.map(
        (item) => item.month
      );
      thisyearseries.value = res?.data?.data?.data[1]?.chartrecords.map(
        (item) => item.total
      );

      lastyearseries.value = res?.data?.data?.data[0].chartrecords.map(
        (item) => item.total
      );

      showChart.value = true;
    }
  });
  getchart(query).then((res) => {
    if (res.status === 200) {
      viewmonth.value = res.data.data.viewTrends.data[0].chartrecords.map(
        (item) => item.month
      );

      viewseries.value = res.data.data.viewTrends.data[0].chartrecords.map(
        (item) => item.total
      );
      quotemonth.value = res.data.data.quoteTrend.data[0].chartrecords.map(
        (item) => item.month
      );
      quoteseries.value = res.data.data.quoteTrend.data[0].chartrecords.map(
        (item) => item.total
      );
      balancemonth.value =
        res.data.data.orderTotalTrend.data[0].chartrecords.map(
          (item) => item.month
        );
      balanceseries.value =
        res.data.data.orderTotalTrend.data[0].chartrecords.map(
          (item) => item.total
        );
      confirmmonth.value = res.data.data.orderTrend.data[0].chartrecords.map(
        (item) => item.month
      );
      confirmseries.value = res.data.data.orderTrend.data[0].chartrecords.map(
        (item) => item.total
      );
    }
  });
}
// const apexchart = VueApexCharts;
const route = useRoute();

const series = computed(() => {
  return [
    {
      name: "This year",
      data: thisyearseries.value,
    },
    {
      name: "Last year",
      data: lastyearseries.value,
    },
  ];
});

const chartOptions = computed(() => {
  return {
    colors: ["#165EF0", "#B6B7B9"],
    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    xaxis: {
      categories: thisyear.value,
    },
    tooltip: {
      y: {
        format: "MM dd",
        formatter: (value) => currencyFormat(value),
      },
    },
  };
});
const viewOptions = computed(() => {
  return {
    colors: ["#165EF0"],
    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
    toolbar: {
      show: false,
    },
    grid: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: viewmonth.value,
      labels: {
        show: false,
      },
      axisBorder: { show: false },
    },
  };
});
const viewSeries = computed(() => {
  return [
    {
      name: "Total",
      data: viewseries.value,
    },
  ];
});
const quoteOptions = computed(() => {
  return {
    colors: ["#165EF0"],
    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
    toolbar: {
      show: false,
    },
    grid: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: quotemonth.value,
      labels: {
        show: false,
      },
      axisBorder: { show: false },
    },
  };
});
const quoteSeries = computed(() => {
  return [
    {
      name: "Total",
      data: quoteseries.value,
    },
  ];
});
const balanceOptions = computed(() => {
  return {
    colors: ["#165EF0"],
    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
    toolbar: {
      show: false,
    },
    grid: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      y: {
        format: "MM dd",
        formatter: (value) => currencyFormat(value),
      },
    },
    xaxis: {
      categories: balancemonth.value,
      labels: {
        show: false,
      },
      axisBorder: { show: false },
    },
  };
});

const balanceSeries = computed(() => {
  return [
    {
      name: "Total",
      data: balanceseries.value,
    },
  ];
});
const confirmOptions = computed(() => {
  return {
    colors: ["#165EF0"],
    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
    toolbar: {
      show: false,
    },
    grid: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: confirmmonth.value,
      labels: {
        show: false,
      },
      axisBorder: { show: false },
    },
  };
});
const confirmSeries = computed(() => {
  return [
    {
      name: "Total",
      data: confirmseries.value,
    },
  ];
});
// const pendingOptions = computed(() => {
//   return {
//     colors: ["#165EF0"],
//     yaxis: {
//       show: false,
//     },
//     legend: {
//       show: false,
//     },
//     toolbar: {
//       show: false,
//     },
//     grid: {
//       show: false,
//     },

//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       curve: "smooth",
//       width: 1,
//     },
//     chart: {
//       toolbar: {
//         show: false,
//       },
//     },
//     xaxis: {
//       categories: pendingmonth.value,
//       labels: {
//         show: false,
//       },
//       axisBorder: { show: false },
//     },
//   };
// });
// const pendingSeries = computed(() => {
//   return [
//     {
//       name: "Total",
//       data: pendingseries.value,
//     },
//   ];
// });

defineProps(["title"]);
const theads = ["product", "created", "views", "orders"];

watch(date, () => {
  if (date.value) {
    query.StartDate = moment(date.value[0]).format("yyyy-MM-DD");
    query.EndDate = moment(date.value[1]).format("yyyy-MM-DD");
    getesfrontstats(query).then((res) => {
      stats.value = res.data.data;
    });
    getstorefronttrending(query).then((res) => {
      trending.value = res.data.data.slice(0, 9);
    });
    getAllCharts();
  }
});

watch(active, () => {
  if (active.value) {
    query.StartDate = moment().add(active.value, "days").format("yyyy-MM-DD");
    query.EndDate = moment().format("yyyy-MM-DD");
    getesfrontstats(query).then((res) => {
      stats.value = res.data.data;
    });
    getstorefronttrending(query).then((res) => {
      trending.value = res.data.data.slice(0, 9);
    });
    getAllCharts();
  }
});

const compEndDate = computed(() => {
  return new Date(moment(date.value.startDate).add(5, "months"));
});
// const compStartDate = computed(() => {
//   return moment(moment(startDate.value)).subtract(5, "months");
// });
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
