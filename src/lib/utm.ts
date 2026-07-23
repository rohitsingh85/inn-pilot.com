const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export function getUTMParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) result[key] = val;
  }
  return result;
}

export function populateUTMFields(form: HTMLFormElement) {
  const utm = getUTMParams();
  for (const [key, value] of Object.entries(utm)) {
    const input = form.querySelector<HTMLInputElement>(`[name="${key}"]`);
    if (input) input.value = value;
  }
}
