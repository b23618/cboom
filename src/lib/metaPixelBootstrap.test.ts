import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { metaPixelBootstrapScript } from "./metaPixelBootstrap";

/**
 * The bootstrap script is written to run as an inline <script> in the
 * browser (it references `window`/`document` as free globals, the way the
 * literal snippet does in Layout.astro). We exercise it the same way here:
 * `new Function(...)` it and run it against jsdom's window/document.
 */
function runBootstrap(pixelId: string) {
  const fn = new Function(
    "window",
    "document",
    metaPixelBootstrapScript(pixelId),
  );
  fn(window, document);
}

describe("metaPixelBootstrapScript", () => {
  beforeEach(() => {
    delete (window as { fbq?: unknown }).fbq;
    delete (window as { _fbq?: unknown }).fbq;
    document.head.innerHTML = "";
    document.body.innerHTML = "";
    // Layout.astro always has the GTM <script> preceding this one, which is
    // what the snippet's `getElementsByTagName("script")[0]` anchors on —
    // seed an equivalent tag so the DOM shape matches production.
    document.head.appendChild(document.createElement("script"));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("defines window.fbq and injects exactly one fbevents.js script tag", () => {
    runBootstrap("1652154163003052");

    expect(typeof window.fbq).toBe("function");
    const scripts = document.querySelectorAll(
      'script[src="https://connect.facebook.net/en_US/fbevents.js"]',
    );
    expect(scripts.length).toBe(1);
  });

  it("queues init and a single PageView track call", () => {
    runBootstrap("1652154163003052");

    // Before fbevents.js actually loads, calls accumulate in n.queue.
    const queue = (window.fbq as unknown as { queue: unknown[][] }).queue;
    expect(queue.map((args) => Array.from(args))).toEqual([
      ["init", "1652154163003052"],
      ["track", "PageView"],
    ]);
  });

  it("does not reinitialize or duplicate the script tag if run twice", () => {
    runBootstrap("1652154163003052");
    const fbqAfterFirst = window.fbq;

    runBootstrap("1652154163003052");

    const scripts = document.querySelectorAll(
      'script[src="https://connect.facebook.net/en_US/fbevents.js"]',
    );
    expect(scripts.length).toBe(1);
    expect(window.fbq).toBe(fbqAfterFirst);

    // A second run still calls fbq("init", ...) / fbq("track", "PageView")
    // again (Layout.astro only ever runs this once per page load, so this
    // guards the injection/init side, not a second PageView in practice) —
    // but the underlying script tag and factory are never duplicated.
    const queue = (window.fbq as unknown as { queue: unknown[][] }).queue;
    expect(queue.length).toBe(4);
  });
});
