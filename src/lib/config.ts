export const config = {
  productName: "InnPilot",
  brandLine: "Hospitality Operating System",
  coreMessage: "Manage your property. Sell more rooms.",

  seo: {
    title: "InnPilot — Hospitality Operating System",
    description:
      "InnPilot is a hospitality operating system that brings property management, direct bookings, and channel distribution together in one connected platform. Built for hotels, resorts, boutique properties, and growing hospitality businesses.",
    url: "https://inn-pilot.com",
    image: "/og-image.png",
  },

  urls: {
    website: "https://inn-pilot.com",
    saaSApp: import.meta.env.PUBLIC_SaaS_APP_URL || "https://app.inn-pilot.com",
    requestAccess: "/request-access/",
    signIn: import.meta.env.PUBLIC_SIGN_IN_URL || "https://app.inn-pilot.com/admin/login",
  },

  whatsapp: {
    number: import.meta.env.WHATSAPP_NUMBER || "919899389636",
    message: "Hello! I'm interested in InnPilot. I'd like to request access and learn more about the platform.",
    get link() {
      if (!this.number) return "";
      const digits = this.number.replace(/\D/g, "");
      const text = encodeURIComponent(this.message);
      return `https://wa.me/${digits}?text=${text}`;
    },
  },

  nav: [
    { label: "Built For", href: "/built-for/" },
    { label: "Platform", href: "/platform/" },
    { label: "Compare Plans", href: "/compare-plans/" },
  ],

  pillars: [
    {
      id: "operate",
      name: "Operate",
      title: "Property Management System",
      description:
        "Run your day-to-day property operations from one place. Front desk, reservations, housekeeping, guest profiles, billing, and maintenance — all connected.",
      features: [
        "Front Desk",
        "Reservations",
        "Housekeeping",
        "Guest Profiles",
        "Billing & Payments",
        "Maintenance",
      ],
      icon: "grid" as const,
    },
    {
      id: "sell",
      name: "Sell",
      title: "Website Booking Engine",
      description:
        "Turn your website into a direct booking channel. A fast, branded engine that lets guests check availability, select rooms, and complete bookings online.",
      features: [
        "Direct Bookings",
        "Availability Display",
        "Room Selection",
        "Online Payments",
        "Guest Booking Experience",
      ],
      icon: "chart" as const,
    },
    {
      id: "distribute",
      name: "Distribute",
      title: "Channel Manager",
      description:
        "Keep availability and rates aligned across connected sales channels. Update once in the PMS — it propagates everywhere.",
      features: [
        "OTA Distribution",
        "Inventory Synchronisation",
        "Rate Synchronisation",
        "Booking Updates",
      ],
      icon: "globe" as const,
    },
  ] as const,

  freePlanFeatures: [
    "PMS for one property",
    "Website Booking Engine",
    "Guest Profiles",
    "Room Management",
    "Service Requests",
    "Maintenance",
    "Tax Engine",
    "Operational Reports",
  ],

  footer: {
    platform: [
      { label: "PMS", href: "/platform/#operate" },
      { label: "Booking Engine", href: "/platform/#sell" },
      { label: "Channel Manager", href: "/platform/#distribute" },
      { label: "Compare Plans", href: "/compare-plans/" },
    ],
    company: [
      { label: "About", href: "/about/" },
      { label: "Request Access", href: "/request-access/" },
    ] as { label: string; href: string }[],
    legal: [
      { label: "Privacy Policy", href: "/privacy/" },
      { label: "Terms of Service", href: "/terms/" },
    ],
  },
} as const;

export const pricingPlans = [
  {
    plan: "Free",
    position: "Operate one property completely.",
    price: "Free",
    billing: "",
    features: [
      "Property Management System",
      "Website Booking Engine",
      "Guest Profiles",
      "Room Management",
      "Service Requests",
      "Maintenance",
      "Tax Engine",
      "Operational Reports",
    ],
    highlighted: true,
    cta: { label: "Request Access", href: "/request-access/?plan=free" },
  },
  {
    plan: "Starter",
    position: "Optimise revenue and operations.",
    price: "₹4,999",
    billing: "/month + GST",
    features: [
      "Everything in Free",
      "Channel Manager",
      "Room Assignment",
      "Revenue Management",
      "Inventory",
      "Procurement",
      "Activities",
    ],
    cta: { label: "Request Access", href: "/request-access/?plan=starter" },
  },
  {
    plan: "Professional",
    position: "Automation and smarter decisions.",
    price: "₹9,999",
    billing: "/month + GST",
    features: [
      "Everything in Starter",
      "Commission Management",
      "Operations Dashboard",
      "Advanced Business Reports",
      "Dynamic Pricing",
      "Forecasting",
      "WhatsApp Communication",
      "Third-party Integrations",
    ],
    cta: { label: "Request Access", href: "/request-access/?plan=professional" },
  },
  {
    plan: "Enterprise",
    position: "Run hotel groups at scale.",
    price: "₹19,999",
    billing: "/month + GST",
    features: [
      "Everything in Professional",
      "AI Revenue Advisor",
      "Multi-property",
      "Loyalty",
      "Smart Alerts",
      "Business Insights",
      "Advanced Reports",
      "White Label",
      "Custom Domain",
    ],
    cta: { label: "Request Access", href: "/request-access/?plan=enterprise" },
  },
];

export type Pillar = (typeof config.pillars)[number];
