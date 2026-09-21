/**
 * Server-side rendering entry. Built separately by Vite (dist/ssr/entry-server.js)
 * and imported by the Express server at runtime, so every known page ships its
 * full HTML to crawlers and first paint instead of an empty #root shell.
 *
 * Data queries (tRPC/react-query) render in their initial "pending" state on
 * the server, exactly as they do on the client's first render, so hydration
 * matches and the live data fills in on the client as before.
 */
import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "node:stream";
import { Router } from "wouter";
import { QueryClient, QueryClientProvider, dehydrate } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { getQueryKey } from "@trpc/react-query";
import superjson from "superjson";
import { trpc } from "@/lib/trpc";
import App from "./App";

export interface RenderResult { html: string; /** superjson-serialized react-query cache for client hydration */ state: string }
export interface Preload { blogPost?: { slug: string; post: unknown }; gallery?: unknown[]; promo?: unknown; blogList?: unknown[] }

export function render(url: string, preload: Preload = {}, timeoutMs = 8000): Promise<RenderResult> {
  const [path, search = ""] = url.split("?");
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: Infinity } } });
  // Data the server already has (e.g. the blog post for /blog/:slug) is seeded into
  // the query cache so it renders into the HTML; the same state is handed to the
  // client so hydration matches exactly.
  if (preload.blogPost) {
    queryClient.setQueryData(getQueryKey(trpc.blog.getBySlug, { slug: preload.blogPost.slug }, "query"), preload.blogPost.post);
  }
  if (preload.gallery) {
    queryClient.setQueryData(getQueryKey(trpc.site.gallery, undefined, "query"), preload.gallery);
  }
  if (preload.blogList) {
    queryClient.setQueryData(getQueryKey(trpc.blog.list, undefined, "query"), preload.blogList);
  }
  if (preload.promo !== undefined) {
    queryClient.setQueryData(getQueryKey(trpc.promo.getActive, undefined, "query"), preload.promo);
  }
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: "http://ssr.invalid/api/trpc",
        transformer: superjson,
        // Never fetch during server rendering; the client fetches after hydration.
        fetch: () => new Promise(() => {}),
      }),
    ],
  });

  return new Promise((resolve, reject) => {
    let html = "";
    let settled = false;
    const sink = new Writable({
      write(chunk, _enc, cb) { html += chunk.toString(); cb(); },
      final(cb) { cb(); if (!settled) { settled = true; resolve({ html, state: superjson.stringify(dehydrate(queryClient)) }); } },
    });
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      stream.abort();
      reject(new Error(`SSR timed out after ${timeoutMs}ms for ${url}`));
    }, timeoutMs);

    const stream = renderToPipeableStream(
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Router ssrPath={path} ssrSearch={search}>
            <App />
          </Router>
        </QueryClientProvider>
      </trpc.Provider>,
      {
        onAllReady() {
          clearTimeout(timer);
          stream.pipe(sink);
        },
        onShellError(err) { clearTimeout(timer); if (!settled) { settled = true; reject(err); } },
        onError(err) { console.warn("[ssr] render error:", (err as Error)?.message ?? err); },
      }
    );
  });
}
