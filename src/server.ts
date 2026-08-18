// import "./lib/error-capture";

// import { consumeLastCapturedError } from "./lib/error-capture";
// import { renderErrorPage } from "./lib/error-page";

// type ServerEntry = {
//   fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
// };

// let serverEntryPromise: Promise<ServerEntry> | undefined;

// async function getServerEntry(): Promise<ServerEntry> {
//   if (!serverEntryPromise) {
//     serverEntryPromise = import("@tanstack/react-start/server-entry").then(
//       (m) => (m.default ?? m) as ServerEntry,
//     );
//   }
//   return serverEntryPromise;
// }

// // h3 swallows in-handler throws into a normal 500 Response with body
// // {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
// async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
//   if (response.status < 500) return response;
//   const contentType = response.headers.get("content-type") ?? "";
//   if (!contentType.includes("application/json")) return response;

//   const body = await response.clone().text();
//   if (!isH3SwallowedErrorBody(body)) return response;

//   console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
//   return new Response(renderErrorPage(), {
//     status: 500,
//     headers: { "content-type": "text/html; charset=utf-8" },
//   });
// }

// function isH3SwallowedErrorBody(body: string): boolean {
//   try {
//     const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
//     return payload.unhandled === true && payload.message === "HTTPError";
//   } catch {
//     return false;
//   }
// }

// export default {
//   async fetch(request: Request, env: unknown, ctx: unknown) {
//     try {
//       const handler = await getServerEntry();
//       const response = await handler.fetch(request, env, ctx);
//       return await normalizeCatastrophicSsrResponse(response);
//     } catch (error) {
//       console.error(error);
//       return new Response(renderErrorPage(), {
//         status: 500,
//         headers: { "content-type": "text/html; charset=utf-8" },
//       });
//     }
//   },
// };

import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  const original = consumeLastCapturedError();
  if (isClientAbortError(original)) {
    // The browser disconnected mid-response (fast navigation, cancelled
    // duplicate request, closed tab, etc.) — not a real server error.
    // Nothing is listening on the other end, so don't bother building or
    // logging a full error page for it; a lightweight console note is
    // enough to keep this out of alerting/error-tracking noise.
    console.warn("[ssr] client aborted request mid-response (ignored)");
    return response;
  }

  console.error(original ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isClientAbortError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const err = error as { code?: string; message?: string; cause?: unknown };
  if (err.code === "ECONNRESET") return true;
  if (typeof err.message === "string" && err.message.toLowerCase().includes("aborted")) return true;
  // Errors sometimes arrive wrapped in a `cause`, e.g. { cause: Error: aborted }
  if (err.cause) return isClientAbortError(err.cause);
  return false;
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      if (isClientAbortError(error)) {
        console.warn("[ssr] client aborted request (ignored)");
        // Client is already gone — a Response object here is never actually
        // delivered anywhere, it just satisfies the fetch handler's return type.
        return new Response(null, { status: 499 });
      }
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
