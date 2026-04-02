export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  formSubmissions: {
    all: ["formSubmissions"] as const,
    list: (params?: Record<string, unknown>) =>
      ["formSubmissions", "list", params] as const,
    detail: (id: string) => ["formSubmissions", "detail", id] as const,
  },
};
