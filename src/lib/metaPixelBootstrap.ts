/**
 * Meta Pixel base bootstrap script (official snippet, unmodified logic).
 *
 * Kept as a plain function — rather than inline in `Layout.astro` — so the
 * duplicate-init guard (`if (f.fbq) return;`) and the init/PageView calls
 * can be unit tested against the exact code that ships. `Layout.astro`
 * calls `metaPixelBootstrapScript()` to get the source and inlines it via
 * `<script is:inline set:html={...}>`.
 */
export function metaPixelBootstrapScript(pixelId: string): string {
  return `(function (f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function () {
    n.callMethod
      ? n.callMethod.apply(n, arguments)
      : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  t = b.createElement(e);
  t.async = true;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
})(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
fbq("init", ${JSON.stringify(pixelId)});
fbq("track", "PageView");`;
}
