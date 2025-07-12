import { toast } from "vue3-toastify";

export function errorResponse(err, customMesssage) {
  const message =
    err?.response?.data?.Message ||
    err?.response?.data?.message ||
    customMesssage ||
    "An unexpected error occurred";

  toast.error(`${message}, contact us for assistance on your order.`);
}
