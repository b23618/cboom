/**
 * Meta Pixel tracking helper.
 *
 * Base pixel bootstrap + PageView are injected once via an inline script in
 * `Layout.astro` (runs on every full page load — this site has no
 * client-side router, so there is no SPA route-change case to cover).
 * Everything past that (standard/custom events from components, including
 * the React demo dashboard) should go through the helpers below instead of
 * calling `window.fbq` directly.
 *
 * PII note: never pass email, phone, first name, or last name into
 * `parameters` — Advanced Matching is intentionally not enabled.
 */

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[] };
    _fbq?: unknown;
  }
}

const PII_KEYS = new Set([
  "email",
  "em",
  "phone",
  "ph",
  "first_name",
  "fn",
  "last_name",
  "ln",
]);

function isTrackingEnabled(): boolean {
  return typeof window !== "undefined" && typeof window.fbq === "function";
}

function stripPII(
  parameters?: Record<string, unknown>,
): Record<string, unknown> | undefined {
  if (!parameters) return parameters;
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(parameters)) {
    if (PII_KEYS.has(key.toLowerCase())) {
      if (import.meta.env.DEV) {
        console.warn(
          `[meta-pixel] Dropped disallowed PII field "${key}" from event payload.`,
        );
      }
      continue;
    }
    clean[key] = value;
  }
  return clean;
}

/** Track a standard Meta event (e.g. "Lead", "Contact", "CompleteRegistration"). */
export function trackMetaEvent(
  eventName: string,
  parameters?: Record<string, unknown>,
): void {
  if (!isTrackingEnabled()) return;
  window.fbq!("track", eventName, stripPII(parameters));
}

/** Track a custom (non-standard) Meta event. */
export function trackMetaCustomEvent(
  eventName: string,
  parameters?: Record<string, unknown>,
): void {
  if (!isTrackingEnabled()) return;
  window.fbq!("trackCustom", eventName, stripPII(parameters));
}
