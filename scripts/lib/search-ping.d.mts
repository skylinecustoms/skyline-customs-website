export const HOST: string;
export const INDEXNOW_KEY: string;
export function absolute(p: string): string;
export function pingIndexNow(urls: string[]): Promise<{ status: number; count: number }>;
export function googleIndexingConfigured(): boolean;
export function pingGoogleIndexing(urls: string[]): Promise<{ url: string; status: number; detail: string }[] | null>;
export function notifySearchEngines(urls: string[], log?: (m: string) => void): Promise<void>;
export function parseServiceAccount(raw: string): { client_email: string; private_key: string } | null;
