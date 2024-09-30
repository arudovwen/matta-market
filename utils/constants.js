import { required, helpers } from "@vuelidate/validators";

export const measurements = [
  { value: "g", name: "Gramme", label: "Gramme" },
  { value: "kg", name: "Kilogramme", label: "Kilogram" },
  { value: "l", name: "Litre", label: "Litre" },
  { value: "m3", name: "Cubicmetre", label: "Cubic Metre" },
  { value: "sqm", name: "Squaremetre", label: "Square Metre" },
  { value: "truck", name: "Truck", label: "Truck" },
  { value: "ton", name: "Ton", label: "Ton" },
  { value: "ml", name: "Millilitre", label: "Millilitre" },
  { value: "mm", name: "Millimetre", label: "Millimetre" },
  { value: "bag", name: "Bag", label: "Bag" },
  { value: "drum", name: "Drum", label: "Drum" },
  { value: "others", name: "Others", label: "Others" },
];
export const minimeasurements = [
  { value: "g", label: "g" },
  { value: "kg", label: "kg" },
  { value: "l", label: "l" },
  { value: "m3", label: "m³" },
  { value: "sqm", label: "sqm" },
  { value: "truck", label: "Truck" },
  { value: "ton", label: "Ton" },
  { value: "ml", label: "ml" },
  { value: "mm", label: "mm" },
  { value: "bag", label: "Bag" },
  { value: "drum", label: "Drum" },
  { value: "others", label: "Others" },
];

export const testimonialData = [
  {
    text: "Switching to Matta's digital platform has significantly streamlined our procurement process.",
    name: "Operations Director, Water Treatment Company",
  },
  {
    text: "Matta's digital platform offers unparalleled convenience and efficiency compared to traditional services.",
    name: "Senior Manager, Industrial & Consumer Goods Company",
  },
];

export const documentsOptions = {
  1: {
    title: "Memorandum and Articles of Association",
    short: "Mermat",
    isNigeria: true,
    isNonNigeria: false,
  },
  0: {
    title: "Certificate of incorporation",
    short: "Certificate of incorporation",
    isNigeria: true,
    isNonNigeria: true,
  },
  2: {
    title: "CAC  Status report",
    short: "CAC  Status report",
    isNigeria: true,
    isNonNigeria: false,
  },
  3: {
    title: "Utility Bill",
    short: "Utility Bill",
    isNigeria: true,
    isNonNigeria: false,
  },
};
export const languagesOptions = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "fr",
    name: "French",
  },

  {
    code: "ja",
    name: "Japanese",
  },
  {
    code: "de",
    name: "German",
  },
  {
    code: "zh-CN",
    name: "Chinese",
  },
  {
    code: "es",
    name: "Spanish",
  },
];

export const languagesOptionsMini = [
  {
    code: "en",
    name: "En",
  },
  {
    code: "fr",
    name: "Fr",
  },
  {
    code: "zh-CN",
    name: "Cn",
  },
  {
    code: "de",
    name: "De",
  },
  {
    code: "es",
    name: "Es",
  },

  {
    code: "ja",
    name: "Ja",
  },
];

export const FinancesOptions = [
  {
    title: "trade finance",
    img: "/images/finance1.png",
    text: "How do you create compelling presentations that wow your colleagues and impress your managers?",
    url: "/financing/requests/trade/0",
  },
  {
    title: "inventory finance",
    img: "/images/finance2.png",
    text: "How do you create compelling presentations that wow your colleagues and impress your managers?",
    url: "/financing/requests/supply/1",
  },
  {
    title: "import finance",
    img: "/images/finance3.png",
    text: "How do you create compelling presentations that wow your colleagues and impress your managers?",
    url: "/financing/requests/import/2",
  },
  {
    title: "export finance",
    img: "/images/finance4.png",
    text: "How do you create compelling presentations that wow your colleagues and impress your managers?",
    url: "/financing/requests/export/3",
  },
];

export const buyerRoutes = [
  "settings",
  "procurement-my-orders",
  "procurement-my-requests",
  "wallet-home",
  "financing",
  "procurement-shipping-addresses",
  "account-saved-searches",
  "company-settings",
  "profile",
  "sign-out",
  "financing-requests-type-id-financeId",
];
export const vendorRoutes = [
  "overview",
  "settings",
  "procurement-my-orders",
  "procurement-my-requests",
  "wallet-home",
  "procurement-shipping-addresses",
  "pickup-locations",
  "financing",
  "account-saved-searches",
  "products",
  "storefront",
  "storefront-orders",
  "storefront-requests",
  "user-managemennt",
  "company-settings",
  "profile",
  "sign-out",
  "financing-requests-type-id-financeId",
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
    key: "procurement-my-orders",
  },
  {
    name: "My Requests",
    url: "/procurement/my-requests",
    icon: "ri:hand-coin-line",
    key: "procurement-my-requests",
  },
  {
    name: "Wallet",
    url: "/wallet/home",
    icon: "ion:wallet-outline",
    key: "wallet-home",
  },
  {
    name: "Financing",
    url: "/financing",
    icon: "la:hand-holding-usd",
    key: "financing",
  },
  {
    name: "Shipping Addresses",
    url: "/procurement/shipping-addresses",
    icon: "ion:map-outline",
    key: "procurement-shipping-addresses",
  },
  {
    name: "Pickup locations",
    url: "/pickup-locations",
    icon: "lucide:truck",
    key: "pickup-locations",
  },

  {
    name: "Saved items",
    url: "/account/saved-searches",
    icon: "tdesign:heart",
    key: "account-saved-searches",
  },
  {
    name: "Storefront",
    url: "/storefront",
    icon: "solar:shop-outline",
    key: "storefront",
  },
  {
    name: "Products",
    url: "/products",
    icon: "fluent-mdl2:product-variant",
    key: "products",
  },

  {
    name: "User Management",
    url: "/user-management",
    icon: "lucide:users",
    key: "user-management",
  },

  {
    name: "Company Settings",
    url: "/company/settings",
    icon: "mingcute:building-5-line",
    key: "company-settings",
  },

  {
    name: "Account",
    url: "/settings",
    icon: "lucide:user",
    key: "settings",
  },
  {
    name: "Sign out",
    key: "sign-out",
    icon: "fa-solid:sign-out-alt",
    url: "#",
  },
];

export const businessTypes = [
  {
    sector: "Agriculture",
    sectorCode: "40100",
    subSectors: [
      {
        subSectorName: "Crop Production",
        subSectorCode: "40110",
      },
      {
        subSectorName: "Poultry and livestock",
        subSectorCode: "40120",
      },
      {
        subSectorName: "Fishing",
        subSectorCode: "40130",
      },
      {
        subSectorName: "Plantation",
        subSectorCode: "40140",
      },
      {
        subSectorName: "Agro Services",
        subSectorCode: "40150",
      },
      {
        subSectorName: "Cash Crop",
        subSectorCode: "40160",
      },
    ],
  },
  {
    sector: "Mining and Quarrying",
    sectorCode: "40200",
    subSectors: [
      {
        subSectorName: "Metal Tin, Iron, etc",
        subSectorCode: "40210",
      },
      {
        subSectorName: "Non-metal Quarrying",
        subSectorCode: "40220",
      },
      {
        subSectorName: "Others",
        subSectorCode: "40230",
      },
    ],
  },
  {
    sector: "Manufacturing",
    sectorCode: "40300",
    subSectors: [
      {
        subSectorName: "Flourmills and Bakeries",
        subSectorCode: "40301",
      },
      {
        subSectorName: "Food manufacturing",
        subSectorCode: "40302",
      },
      {
        subSectorName: "Beverages",
        subSectorCode: "40303",
      },
      {
        subSectorName: "Aluminium and allied products",
        subSectorCode: "40304",
      },
      {
        subSectorName: "Basic Metal Products",
        subSectorCode: "40305",
      },
      {
        subSectorName: "Breweries",
        subSectorCode: "40306",
      },
      {
        subSectorName: "Building materials",
        subSectorCode: "40307",
      },
      {
        subSectorName: "Cement",
        subSectorCode: "40308",
      },
      {
        subSectorName: "Chemicals and Allied products",
        subSectorCode: "40309",
      },
      {
        subSectorName: "Footwear",
        subSectorCode: "40310",
      },
      {
        subSectorName: "Hides and Skin",
        subSectorCode: "40311",
      },
      {
        subSectorName: "Household Equipment",
        subSectorCode: "40312",
      },
      {
        subSectorName: "Pharmaceuticals",
        subSectorCode: "40313",
      },
      {
        subSectorName: "Paints and Allied products",
        subSectorCode: "40314",
      },
      {
        subSectorName: "Miscellaneous Manufacturing",
        subSectorCode: "40315",
      },
      {
        subSectorName: "Paper and Paper products",
        subSectorCode: "40316",
      },
      {
        subSectorName: "Printing and Publishing",
        subSectorCode: "40317",
      },
      {
        subSectorName: "Personal care",
        subSectorCode: "40318",
      },
      {
        subSectorName: "Plastics",
        subSectorCode: "40319",
      },
      {
        subSectorName: "Rubber and Allied products",
        subSectorCode: "40320",
      },
      {
        subSectorName: "Steel Rolling Mills",
        subSectorCode: "40321",
      },
      {
        subSectorName: "Soft Drinks",
        subSectorCode: "40322",
      },
      {
        subSectorName: "Cables and Mines",
        subSectorCode: "40323",
      },
      {
        subSectorName: "Textiles and Apparel",
        subSectorCode: "40324",
      },
      {
        subSectorName: "Tyre",
        subSectorCode: "40325",
      },
      {
        subSectorName: "Conglomerate",
        subSectorCode: "40326",
      },
    ],
  },
  {
    sector: "Real Estate",
    sectorCode: "40500",
    subSectors: [
      {
        subSectorName: "Residential Mortgage Loans",
        subSectorCode: "40510",
      },
      {
        subSectorName: "Commercial Property",
        subSectorCode: "40520",
      },
      {
        subSectorName: "Home Equity",
        subSectorCode: "40530",
      },
      {
        subSectorName: "Real estate Construction/ Home Developers",
        subSectorCode: "40540",
      },
      {
        subSectorName: "Real estate (Income-Producing)",
        subSectorCode: "40550",
      },
      {
        subSectorName: "High-volatility Commercial real estate",
        subSectorCode: "40560",
      },
    ],
  },
  {
    sector: "Public Utilities",
    sectorCode: "40600",
    subSectors: [
      {
        subSectorName: "Utility (Public)",
        subSectorCode: "40610",
      },
      {
        subSectorName: "Utility (Private)",
        subSectorCode: "40620",
      },
    ],
  },
  {
    sector: "General Commerce",
    sectorCode: "40700",
    subSectors: [
      {
        subSectorName: "Automotive parts",
        subSectorCode: "40710",
      },
      {
        subSectorName: "Domestic trade (General Trading)",
        subSectorCode: "40720",
      },
      {
        subSectorName: "Automobile (Motor Vehicles)",
        subSectorCode: "40730",
      },
      {
        subSectorName: "Food Processing",
        subSectorCode: "40740",
      },
      {
        subSectorName: "Chemicals and Allied Products",
        subSectorCode: "40750",
      },
      {
        subSectorName: "Trading (Rice)",
        subSectorCode: "40760",
      },
      {
        subSectorName: "Trading (Cocoa)",
        subSectorCode: "40770",
      },
      {
        subSectorName: "Generator set (sales and services)",
        subSectorCode: "40780",
      },
    ],
  },
  {
    sector: "Transportation and Storage",
    sectorCode: "40800",
    subSectors: [
      {
        subSectorName: "Road transport",
        subSectorCode: "40810",
      },
      {
        subSectorName: "Water transport",
        subSectorCode: "40820",
      },
      {
        subSectorName: "Air transport",
        subSectorCode: "40830",
      },
      {
        subSectorName: "Warehousing and support activities for transportation",
        subSectorCode: "40840",
      },
      {
        subSectorName: "Postal and courier activities",
        subSectorCode: "40850",
      },
    ],
  },
  {
    sector: "Finance and Insurance",
    sectorCode: "40900",
    subSectors: [
      {
        subSectorName: "Commercial bank",
        subSectorCode: "40910",
      },
      {
        subSectorName: "Microfinance bank",
        subSectorCode: "40920",
      },
      {
        subSectorName: "Asset management",
        subSectorCode: "40930",
      },
      {
        subSectorName: "Mortgage institutions",
        subSectorCode: "40940",
      },
      {
        subSectorName: "Insurance companies",
        subSectorCode: "40950",
      },
      {
        subSectorName: "Pension Fund custodians",
        subSectorCode: "40960",
      },
      {
        subSectorName: "Pension Fund administrators",
        subSectorCode: "40970",
      },
      {
        subSectorName: "Stock broking firms",
        subSectorCode: "40980",
      },
      {
        subSectorName: "Other financial institutions",
        subSectorCode: "40990",
      },
      {
        subSectorName: "Mutual fund Administrators",
        subSectorCode: "40991",
      },
      {
        subSectorName: "Money and Value Transfer Operators",
        subSectorCode: "40992",
      },
      {
        subSectorName: "Bureau De Change",
        subSectorCode: "40993",
      },
    ],
  },
  {
    sector: "General",
    sectorCode: "41000",
    subSectors: [
      {
        subSectorName: "Hotel and leisure",
        subSectorCode: "41010",
      },
      {
        subSectorName: "Personal",
        subSectorCode: "41020",
      },
      {
        subSectorName: "Religious bodies",
        subSectorCode: "41030",
      },
      {
        subSectorName: "Retail (others)",
        subSectorCode: "41040",
      },
      {
        subSectorName: "Logistics",
        subSectorCode: "41050",
      },
      {
        subSectorName: "Political parties accounts",
        subSectorCode: "41060",
      },
      {
        subSectorName: "Jewellery and precious stone dealers",
        subSectorCode: "41070",
      },
      {
        subSectorName: "Association and Clubs",
        subSectorCode: "41080",
      },
      {
        subSectorName:
          "Non governmental organisation/ Not for profit org (NGOs/NPOs)",
        subSectorCode: "41090",
      },
    ],
  },
  {
    sector: "Government",
    sectorCode: "41200",
    subSectors: [
      {
        subSectorName: "Federal (Direct)",
        subSectorCode: "41210",
      },
      {
        subSectorName: "Federal (Parastatal)",
        subSectorCode: "41220",
      },
      {
        subSectorName: "State (Direct)",
        subSectorCode: "41230",
      },
      {
        subSectorName: "State (Parastatal)",
        subSectorCode: "41240",
      },
      {
        subSectorName: "Local (Direct)",
        subSectorCode: "41250",
      },
      {
        subSectorName: "Local (Parastatal)",
        subSectorCode: "41260",
      },
      {
        subSectorName: "Legislative arm of government",
        subSectorCode: "41270",
      },
      {
        subSectorName: "Judiciary arm of government",
        subSectorCode: "41280",
      },
      {
        subSectorName: "Executive arm of government",
        subSectorCode: "41290",
      },
    ],
  },
  {
    sector:
      "Water Supply; Sewerage, Waste Management and Remediation Activities",
    sectorCode: "41300",
    subSectors: [
      {
        subSectorName: "Water collection, treatment and supply",
        subSectorCode: "41310",
      },
      {
        subSectorName: "Sewerage",
        subSectorCode: "41320",
      },
      {
        subSectorName:
          "Waste collection, treatment and disposal activities; materials recovery",
        subSectorCode: "41330",
      },
      {
        subSectorName:
          "Remediation activities and other waste management services",
        subSectorCode: "41340",
      },
    ],
  },
  {
    sector: "Construction",
    sectorCode: "41400",
    subSectors: [
      {
        subSectorName: "Civil engineering",
        subSectorCode: "41410",
      },
      {
        subSectorName: "Specialized construction activities",
        subSectorCode: "41420",
      },
    ],
  },
  {
    sector: "Information and Communication",
    sectorCode: "41500",
    subSectors: [
      {
        subSectorName: "Publishing activities",
        subSectorCode: "41510",
      },
      {
        subSectorName:
          "Motion picture, video and television programme production, sound recording and",
        subSectorCode: "41520",
      },
      {
        subSectorName: "Programming and broadcasting activities",
        subSectorCode: "41530",
      },
      {
        subSectorName: "Telecommunications",
        subSectorCode: "41540",
      },
      {
        subSectorName:
          "Computer programming, consultancy and related activities",
        subSectorCode: "41550",
      },
      {
        subSectorName: "Information service activities",
        subSectorCode: "41560",
      },
    ],
  },
  {
    sector: "Professional, Scientific and Technical Activities",
    sectorCode: "41600",
    subSectors: [
      {
        subSectorName: "Legal and accounting activities",
        subSectorCode: "41610",
      },
      {
        subSectorName:
          "Activities of head offices; management consultancy activities",
        subSectorCode: "41620",
      },
      {
        subSectorName:
          "Architectural and engineering activities; technical testing and analysis",
        subSectorCode: "41630",
      },
      {
        subSectorName: "Scientific research and development",
        subSectorCode: "41640",
      },
      {
        subSectorName: "Advertising and market research",
        subSectorCode: "41650",
      },
      {
        subSectorName:
          "Other professional, scientific and technical activities",
        subSectorCode: "41660",
      },
      {
        subSectorName: "Veterinary activities",
        subSectorCode: "41670",
      },
    ],
  },
  {
    sector: "Administrative and Support Service Activities",
    sectorCode: "41700",
    subSectors: [
      {
        subSectorName: "Rental and leasing activities",
        subSectorCode: "41710",
      },
      {
        subSectorName: "Employment activities",
        subSectorCode: "41720",
      },
      {
        subSectorName:
          "Travel agency, tour operator, reservation service and related activities",
        subSectorCode: "41730",
      },
      {
        subSectorName: "Security and investigation activities",
        subSectorCode: "41740",
      },
      {
        subSectorName: "Services to buildings and landscape activities",
        subSectorCode: "41750",
      },
      {
        subSectorName:
          "Office administrative, office support and other business support activities",
        subSectorCode: "41760",
      },
    ],
  },
  {
    sector: "Education",
    sectorCode: "41800",
    subSectors: [
      {
        subSectorName: "Pre Primary and primary education",
        subSectorCode: "41810",
      },
      {
        subSectorName: "Post primary education",
        subSectorCode: "41820",
      },
      {
        subSectorName: "Tertiary education",
        subSectorCode: "41830",
      },
      {
        subSectorName: "Other education",
        subSectorCode: "41840",
      },
      {
        subSectorName: "Educational support services",
        subSectorCode: "41850",
      },
    ],
  },
  {
    sector: "Human Health and Social Work Activities",
    sectorCode: "41900",
    subSectors: [
      {
        subSectorName: "Human health activities",
        subSectorCode: "41910",
      },
      {
        subSectorName: "Residential care activities",
        subSectorCode: "41920",
      },
      {
        subSectorName: "Social work activities without accommodation",
        subSectorCode: "41930",
      },
    ],
  },
  {
    sector: "Arts, Entertainment and Recreation",
    sectorCode: "42000",
    subSectors: [
      {
        subSectorName: "Creative, arts and entertainment activities",
        subSectorCode: "42010",
      },
      {
        subSectorName:
          "Libraries, archives, museums and other cultural activities",
        subSectorCode: "42020",
      },
      {
        subSectorName: "Gambling and betting activities",
        subSectorCode: "42030",
      },
      {
        subSectorName:
          "Sports activities and amusement and recreation activities",
        subSectorCode: "42040",
      },
    ],
  },
  {
    sector: "Activities Of Extraterritorial Organizations and Bodies",
    sectorCode: "42100",
    subSectors: [
      {
        subSectorName:
          "Activities of Extraterritorial Organizations and Bodies",
        subSectorCode: "42110",
      },
    ],
  },
  {
    sector: "Power and Energy",
    sectorCode: "42200",
    subSectors: [
      {
        subSectorName: "Independent Power Projects (IPP)",
        subSectorCode: "42210",
      },
      {
        subSectorName: "Power generation/power plants",
        subSectorCode: "42220",
      },
      {
        subSectorName: "Power transmission",
        subSectorCode: "42230",
      },
      {
        subSectorName: "Power distribution",
        subSectorCode: "42240",
      },
    ],
  },
  {
    sector: "Capital Market",
    sectorCode: "42300",
    subSectors: [
      {
        subSectorName: "Margin lending",
        subSectorCode: "42310",
      },
      {
        subSectorName: "Proprietary trading",
        subSectorCode: "42320",
      },
      {
        subSectorName: "Share loans",
        subSectorCode: "42330",
      },
      {
        subSectorName: "Share underwriting",
        subSectorCode: "42340",
      },
      {
        subSectorName: "Bonds/ debt obligations",
        subSectorCode: "42350",
      },
    ],
  },
  {
    sector: "Oil and Gas",
    sectorCode: "42400",
    subSectors: [
      {
        subSectorName: "Oil - upstream",
        subSectorCode: "42420",
      },
      {
        subSectorName: "Natural gas",
        subSectorCode: "42430",
      },
      {
        subSectorName: "Crude oil refining",
        subSectorCode: "42440",
      },
      {
        subSectorName: "Oil & Gas Services",
        subSectorCode: "42450",
      },
    ],
  },
];

export const LedgerAction = {
  0: "Debit",
  1: "Credit",
  2: "Charge",
};

export const languages = {
  en: "/en/en",
  fr: "/en/fr",
  cn: "/en/cn",
  "en-GB": "/en/en",
  "en-US": "/en/en",
  "es-ES": "/en/fr",
  "fr-FR": "/en/fr",
  "de-DE": "/en/de",
  "pt-PT": "/en/pt",
  "zh-CN": "/en/zh",
  "ja-JP": "/en/ja",
  "ar-AE": "/en/ar",
  "ru-RU": "/en/ru",
};

export const traditionalData = [
  {
    id: 1,
    label: "Market access",
    matta: "Broad access to multiple markets across Africa. ",
    trad: "Often a narrower product offering.",
    info: "Reach to diverse markets.",
  },
  {
    id: 2,
    label: "Product Range",
    matta: " Wide selection of chemicals and raw materials.",
    trad: " Limited to local or regional reach.",
    info: "Variety of products offered.",
  },
  {
    id: 3,
    label: "Digital Efficiency",
    matta: "Streamlined online procurement process.  ",
    trad: " Manual, time-consuming processes.",
    info: "Speed and ease of online processes.",
  },
  {
    id: 4,
    label: "Quality Assurance",
    matta: "Standardized quality checks and verification.",
    trad: "Quality may vary without standard checks.",
    info: "Standards and checks for quality.",
  },
  {
    id: 5,
    label: "Logistics",
    matta: "Integrated logistics solutions for delivery. ",
    trad: "Separate logistics arrangements needed.",
    info: " Integration and handling of deliveries.",
  },
  {
    id: 6,
    label: "Cost-Effectiveness",
    matta: "Competitive pricing through direct manufacturer ties.",
    trad: "Additional costs due to middlemen.",
    info: "Pricing benefits and savings.",
  },
  {
    id: 7,
    label: "Transparency",
    matta: "Clear pricing and transaction processes online.   ",
    trad: " Pricing often opaque and negotiable.",
    info: "Clarity in transactions.",
  },
  {
    id: 8,
    label: "Convenience",
    matta: "24/7 availability for ordering and support. ",
    trad: "Restricted by business hours and availability.",
    info: "Ease and availability of services.",
  },
  {
    id: 9,
    label: "Payment Security",
    matta: "Secure online payment systems. ",
    trad: "Payment security not always guaranteed.",
    info: "Safety of online payments.",
  },
  {
    id: 10,
    label: "Customization",
    matta: "Tailored orders and quantities to meet specific needs.",
    trad: "Standard order sizes, less flexibility.",
    info: "Tailoring to specific needs.",
  },
  {
    id: 11,
    label: "Technical Support",
    matta: "Expert advice and support available.    ",
    trad: "Limited or no support.",
    info: "Assistance and expertise available.",
  },
  {
    id: 12,
    label: "Market Intelligence",
    matta: "Access to market trends and data analytics.",
    trad: "Little to no market insights provided.",
    info: "Insights into market trends.",
  },
  {
    id: 13,
    label: "Scalability",
    matta: "Easy to scale operations with demand.",
    trad: "Scaling up often requires significant effort and time.",
    info: "Ability to grow with demand.",
  },
  {
    id: 14,
    label: "Compliance",
    matta: "Adherence to international standards and regulations. ",
    trad: "May not always comply with global standards.",
    info: "Adherence to standards and regulations.",
  },
];

export const defaultPropertyItems = {
  features: {
    propertyItems: [],
    subSection: [],
  },
  applications: {
    propertyItems: [{ property: null, propertyValue: [] }],
    subSection: [],
  },
  property: {
    propertyItems: [{ property: null, propertyValue: [] }],
    subSection: [],
  },
  compliance: {
    propertyItems: [],
    subSection: [],
  },
  technical: {
    propertyItems: [{ property: null, propertyValue: [] }],
    subSection: [],
  },
};

export const productrules = {
  propertyItems: {
    property: {
      propertyItems: {
        required,
        $each: helpers.forEach({
          property: {
            required,
          },
          propertyValue: {
            required,
          },
        }),
      },
    },

    technical: {
      propertyItems: {
        required,
        $each: helpers.forEach({
          property: {
            required,
          },
          propertyValue: {
            required,
          },
        }),
      },
    },

    compliance: {
      propertyItems: {
        $each: helpers.forEach({
          property: {
            required,
          },
          propertyValue: {
            required,
          },
        }),
      },
    },
  },
};

export const nigeriaTypes = [0, 1, 2, 3, 4];
export const nonNigeriaTypes = [0, 4];
