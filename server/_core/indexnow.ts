/**
 * IndexNow (https://www.indexnow.org): tells Bing, DuckDuckGo, Yandex and others
 * about new or changed URLs immediately. Google does not use it. The key file is
 * served from client/public/<key>.txt.
 */
export const INDEXNOW_KEY = "0ed1c0a4e1ed8b576c62f5d93cf46839";
const HOST = "www.skylinecustomshop.com";

export async function submitIndexNow(urls: string[]): Promise<{ ok: boolean; status?: number; error?: string }> {
  const urlList = urls.filter((u) => u.startsWith(`https://${HOST}/`)).slice(0, 10000);
  if (urlList.length === 0) return { ok: true };
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`, urlList }),
    });
    const ok = res.status === 200 || res.status === 202;
    if (!ok) console.warn(`[indexnow] HTTP ${res.status} for ${urlList.length} url(s)`);
    else console.log(`[indexnow] submitted ${urlList.length} url(s)`);
    return { ok, status: res.status };
  } catch (err) {
    console.warn("[indexnow] failed:", (err as Error).message);
    return { ok: false, error: (err as Error).message };
  }
}
