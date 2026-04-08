export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  roles: {
    all: ["roles"] as const,
    list: () => ["roles", "list"] as const,
  },
  users: {
    all: ["users"] as const,
    list: (params?: Record<string, unknown>) =>
      ["users", "list", params] as const,
    detail: (id: string) => ["users", "detail", id] as const,
  },
  formSubmissions: {
    all: ["formSubmissions"] as const,
    list: (params?: Record<string, unknown>) =>
      ["formSubmissions", "list", params] as const,
    detail: (id: string) => ["formSubmissions", "detail", id] as const,
  },
  faqs: {
    all: ["faqs"] as const,
    list: (params?: Record<string, unknown>) =>
      ["faqs", "list", params] as const,
    detail: (id: string) => ["faqs", "detail", id] as const,
  },
  testimonials: {
    all: ["testimonials"] as const,
    list: (params?: Record<string, unknown>) =>
      ["testimonials", "list", params] as const,
    detail: (id: string) => ["testimonials", "detail", id] as const,
  },
  partners: {
    all: ["partners"] as const,
    list: (params?: Record<string, unknown>) =>
      ["partners", "list", params] as const,
    detail: (id: string) => ["partners", "detail", id] as const,
  },
  contactInfo: {
    all: ["contactInfo"] as const,
    detail: () => ["contactInfo", "detail"] as const,
  },
  pricingPlans: {
    all: ["pricingPlans"] as const,
    list: (params?: Record<string, unknown>) =>
      ["pricingPlans", "list", params] as const,
    detail: (id: string) => ["pricingPlans", "detail", id] as const,
  },
};
