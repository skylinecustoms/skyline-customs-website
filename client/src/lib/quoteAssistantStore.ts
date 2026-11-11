/**
 * What the AI quote assistant collected, handed to the quote form on /get-a-quote. Its own tiny module so the
 * quote form (on the home page, in the main bundle) does not pull in the lazily loaded assistant.
 */
export interface AssistantFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  year: string;
  make: string;
  model: string;
  service: string;
}

export const quoteAssistantStore = {
  formData: null as AssistantFormData | null,
};
