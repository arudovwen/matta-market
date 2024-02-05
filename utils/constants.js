export const measurements = [
  { value: "g", name: "Gramme (g)" },
  { value: "kg", name: "Kilogramme (kg)" },
  { value: "l", name: "Litre (l)" },
  { value: "m3", name: "Cubic metre (m3)" },
  { value: "sqm", name: "Square metre (sqm)" },
  { value: "truck", name: "Truck" },
  { value: "ton", name: "Ton (ton)" },
  { value: "ml", name: "Millilitre (ml)" },
  { value: "mm", name: "Millimetre (mm)" },
  { value: "bag", name: "Bag" },
  { value: "drum", name: "Drum" },
];

export const FinancesOptions = [
  {
    title: "trade finance",
    img: "/images/finance1.png",
    text: "How do you create compelling presentations that wow your colleagues and impress your managers?",
    url: "/financing/requests/trade",
  },
  {
    title: "supply finance",
    img: "/images/finance2.png",
    text: "How do you create compelling presentations that wow your colleagues and impress your managers?",
    url: "/financing/requests/supply",
  },
  {
    title: "import finance",
    img: "/images/finance3.png",
    text: "How do you create compelling presentations that wow your colleagues and impress your managers?",
    url: "/financing/requests/import",
  },
  {
    title: "export finance",
    img: "/images/finance4.png",
    text: "How do you create compelling presentations that wow your colleagues and impress your managers?",
    url: "/financing/requests/export",
  },
];

export const buyerRoutes = [
  "overview",
  "account",
  "my-orders",
  "my-requests",
  "wallet",
  "shipping",
  "financing",
  "saved",
  "profile",
  "sign-out",
];
export const vendorRoutes = [
  "overview",
  "account",
  "my-orders",
  "my-requests",
  "wallet",
  "shipping",
  "financing",
  "saved",
  "products",
  "storefront",
  "orders",
  "requests",
  "users",
  "company",
  "profile",
  "sign-out",
];
export const navigation = [
  {
    name: "Dashboard",
    url: "/overview",
    icon: "mingcute:layout-3-line",
    key: "overview",
  },

  {
    name: "My Orders",
    url: "/procurement/my-orders",
    icon: "lucide:shopping-bag",
    key: "my-orders",
  },
  {
    name: "My Requests",
    url: "/procurement/my-requests",
    icon: "ri:hand-coin-line",
    key: "my-requests",
  },

  {
    name: "Shipping Addresses",
    url: "/procurement/shipping-addresses",
    icon: "ion:map-outline",
    key: "shipping",
  },

  {
    name: "Wallet",
    url: "/wallet/home",
    icon: "ion:wallet-outline",
    key: "wallet",
  },
  {
    name: "Financing requests",
    url: "/financing",
    icon: "f7:tag",
    key: "financing",
  },
  {
    name: "Saved items",
    url: "/account/saved-searches",
    icon: "tdesign:heart",
    key: "saved",
  },
  {
    name: "Storefront",
    url: "/storefront",
    icon: "solar:shop-outline",
    key: "storefront",
  },

  {
    name: "Company Settings",
    url: "/company/settings",
    icon: "mingcute:building-5-line",
    key: "company",
  },

  {
    name: "User Management",
    url: "/user-management",
    icon: "lucide:users",
    key: "users",
  },
  {
    name: "Account settings",
    url: "/account/settings",
    icon: "lucide:user",
    key: "account",
  },
];

export const subnavigation = [
  {
    name: "Products",
    url: "/storefront/products",
    icon: "fluent-mdl2:product-variant",
    key: "products",
  },
  {
    name: "Store Orders",
    url: "/storefront/orders",
    icon: "lucide:shopping-bag",
    key: "orders",
  },
  {
    name: "Store Requests",
    url: "/storefront/requests",
    icon: "ri:hand-coin-line",
    key: "requests",
  },
  {
    name: "Store Settings",
    url: "/storefront/customization",
    icon: "bx:cog",
    key: "storefront",
  },
];
