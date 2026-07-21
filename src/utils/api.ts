export const API_BASE =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : (window.location.hostname.includes("ais-dev-") || window.location.hostname.includes("ais-pre-"))
    ? window.location.origin
    : "https://generate-my-invoice-297074042391.europe-west2.run.app";

export async function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  let url = typeof input === "string" ? input : input.toString();

  // If the URL starts with /api/, prepend API_BASE
  if (url.startsWith("/api/")) {
    const base = API_BASE.endsWith("/") ? API_BASE.slice(0, -1) : API_BASE;
    url = `${base}${url}`;
  }

  try {
    const response = await fetch(url, init);

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      try {
        const data = await response.json();
        errorMessage = data.error || data.message || data.err || errorMessage;
      } catch (jsonErr) {
        try {
          const text = await response.text();
          if (text && text.length < 200) {
            errorMessage = text;
          }
        } catch (textErr) {}
      }

      // Trigger user alert via custom DOM event (unless it's an background ping)
      if (!url.includes("/api/ai/status")) {
        window.dispatchEvent(
          new CustomEvent("api-error", {
            detail: { message: errorMessage },
          })
        );
      }

      throw new Error(errorMessage);
    }

    return response;
  } catch (error: any) {
    // Only dispatch for genuine API routes, ignore background ping failures
    if (url.startsWith(API_BASE) && !url.includes("/api/ai/status")) {
      window.dispatchEvent(
        new CustomEvent("api-error", {
          detail: { message: error.message || "Network connection failure." },
        })
      );
    }
    throw error;
  }
}
