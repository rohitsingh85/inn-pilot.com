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
    startFree: import.meta.env.PUBLIC_START_FREE_URL || "https://app.inn-pilot.com/admin/login",
    signIn: import.meta.env.PUBLIC_SIGN_IN_URL || "https://app.inn-pilot.com/admin/login",
  },

  whatsapp: {
    number: import.meta.env.WHATSAPP_NUMBER || "",
    get link() {
      if (!this.number) return "";
      const digits = this.number.replace(/\D/g, "");
      return `https://wa.me/${digits}`;
    },
  },

  nav: [
    { label: "Platform", href: "/platform/" },
    { label: "Pricing", href: "/pricing/" },
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
    "Channel Manager",
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
      { label: "Pricing", href: "/pricing/" },
    ],
    company: [] as { label: string; href: string }[],
    legal: [] as { label: string; href: string }[],
  },
} as const;

export type Pillar = (typeof config.pillars)[number];
