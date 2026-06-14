<template>
  <span
    :class="`px-[6px] py-1 text-xs rounded-[6px] flex gap-x-1 items-center border max-w-max font-semibold ${Stats[status]?.className}`"
  >
    <!-- <AppIcon icon="octicon:dot-fill-24" /> -->
    <span class=""> {{ Stats[status]?.text }}</span>
  </span>
</template>

<script setup>
import { defineProps } from "vue";
import AppIcon from "~/components/AppIcon";

const props = defineProps(["status", "type", "stattype"]);
const StatusClass = {
  0: "text-[#F79009] bg-[#FFFAEB] border-[#FEDF89]",
  1: "text-[#067647] bg-[#ECFDF3] border-[#ABEFC6]",
  2: "text-[#175CD3] bg-[#EFF8FF] border-[#B2DDFF]",
  3: "text-[#363F72] bg-transparent border-[#3E4784]",
  4: "text-[#B42318] bg-[#FEF3F2] border-[#FECDCA]",
  5: "text-[#5925DC] bg-[#F4F3FF] border-[#D9D6FE]",
};

const StatusText = {
  0: {
    text: "Pending",
    className: StatusClass[0],
  },
  1: {
    text: props.type == "verdict" ? "Approved" : "Completed",
    className: StatusClass[1],
  },
  2: {
    text: "Rejected",
    className: StatusClass[4],
  },
  3: { text: "Completed" },
  className: StatusClass[3],
  4: {
    text: "Rejected",
    className: StatusClass[4],
  },
  5: {
    text: "Shipped",
    className: StatusClass[5],
  },
};
const OrderStatusText = {
  0: {
    text: "In cart",
    className: StatusClass[0],
  },
  1: {
    text: "Order created",
    className: StatusClass[0],
  },
  2: {
    text: "Payment confirmed",
    className: StatusClass[2],
  },
  3: {
    text: "Order received",
    className: StatusClass[2],
  },
  4: {
    text: "Order cancelled",
    className: StatusClass[4],
  },
  5: {
    text: "Refund complete",
    className: StatusClass[0],
  },

  6: {
    text: "Shipping in progress",
    className: StatusClass[5],
  },
  7: {
    text: "Delivered",
    className: StatusClass[1],
  },
    8: {
    text: "Order request",
    className: StatusClass[2],
  },
};
const FinanceStatusText = {
  0: {
    text: "Pending",
    className: StatusClass[0],
  },
  1: {
    text: "Request approved",
    className: StatusClass[1],
  },

  2: {
    text: "Request rejected",
    className: StatusClass[4],
  },
  3: {
    text: "Offer accepted",
    className: StatusClass[1],
  },

  4: {
    text: "Offer rejected",
    className: StatusClass[4],
  },

  5: {
    text: "Loan disbursed",
    className: StatusClass[5],
  },
  7: {
    text: "Request approved",
    className: StatusClass[1],
  },
};
const ActiveFinance = {
  0: {
    text: "Active",
    className: StatusClass[1],
  },
  1: {
    text: "Finished",
    className: StatusClass[5],
  },
};
const PaymentStatus = {
  0: {
    text: "Settlement",
    className: StatusClass[5],
  },
  1: {
    text: "Withdrawal",
    className: StatusClass[0],
  },
};
const ParentOrderStatusText = {
  0: {
    text: props.type ? "In progress" : "In cart",
    className: StatusClass[0],
  },
  1: {
    text: "Payment Confirmed",
    className: StatusClass[2],
  },
 4: {
    text: "Quote request",
    className: StatusClass[5],
  },

  2: {
    text: "Completed",
    className: StatusClass[1],
  },

  3: {
    text: "Cancelled",
    className: StatusClass[4],
  },
};
const WalletStatus = {
  0: {
    text: "Transaction",
    className: StatusClass[3],
  },
  1: {
    text: "Account Funding",
    className: StatusClass[1],
  },
  2: {
    text: "Withdrawal",
    className: StatusClass[4],
  },
  3: {
    text: "Charge",
    className: StatusClass[4],
  },
  4: {
    text: "Vendor Settlement",
    className: StatusClass[1],
  },
  5: {
    text: "Order Payment",
    className: StatusClass[1],
  },
  6: {
    text: "Order Debit",
    className: StatusClass[4],
  },
  7: {
    text: "Repayment",
    className: StatusClass[1],
  },
  8: {
    text: "Reversal",
    className: StatusClass[1],
  },
};
const LoanStatus = {
  0: {
    text: "pending",
    className: StatusClass[0],
  },
  1: {
    text: "active",
    className: StatusClass[2],
  },
  2: {
    text: "paid",
    className: StatusClass[1],
  },
};

const CreditStatus = {
  0: {
    text: "pending",
    className: StatusClass[0],
  },
  1: {
    text: "approved",
    className: StatusClass[1],
  },
  2: {
    text: "disbursed",
    className: StatusClass[1],
  },
  3: {
    text: "declined",
    className: StatusClass[4],
  },
  4: {
    text: "reviewed",
    className: StatusClass[3],
  },
};
const Stats = computed(() => {
  if (props.stattype === "order") {
    return OrderStatusText;
  }
  if (props.stattype === "finance") {
    return FinanceStatusText;
  }
  if (props.stattype === "payment") {
    return PaymentStatus;
  }
  if (props.stattype === "wallet") {
    return WalletStatus;
  }
  if (props.stattype === "parent-order") {
    return ParentOrderStatusText;
  }
  if (props.stattype === "active-finance") {
    return ActiveFinance;
  }
  if (props.stattype === "loan") {
    return LoanStatus;
  }
  if (props.stattype === "credit") {
    return CreditStatus;
  }
  return StatusText;
});
</script>
