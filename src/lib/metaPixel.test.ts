import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { trackMetaCustomEvent, trackMetaEvent } from "./metaPixel";

describe("metaPixel helper", () => {
  let fbq: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fbq = vi.fn();
    window.fbq = fbq as unknown as Window["fbq"];
  });

  afterEach(() => {
    delete (window as { fbq?: unknown }).fbq;
    vi.restoreAllMocks();
  });

  it("calls fbq('track', ...) for standard events", () => {
    trackMetaEvent("Lead", { value: 100, currency: "THB" });
    expect(fbq).toHaveBeenCalledWith("track", "Lead", {
      value: 100,
      currency: "THB",
    });
  });

  it("calls fbq('trackCustom', ...) for custom events", () => {
    trackMetaCustomEvent("DemoOpened", { module: "crm" });
    expect(fbq).toHaveBeenCalledWith("trackCustom", "DemoOpened", {
      module: "crm",
    });
  });

  it("does nothing when fbq is not present (pixel not loaded / disabled)", () => {
    delete (window as { fbq?: unknown }).fbq;
    expect(() => trackMetaEvent("Lead")).not.toThrow();
    expect(fbq).not.toHaveBeenCalled();
  });

  it("strips PII fields (email, phone, first/last name) before sending", () => {
    trackMetaEvent("CompleteRegistration", {
      email: "user@example.com",
      phone: "0812345678",
      first_name: "Somchai",
      last_name: "Sae-Lim",
      plan: "pro",
    });
    expect(fbq).toHaveBeenCalledWith("track", "CompleteRegistration", {
      plan: "pro",
    });
  });

  it("strips PII using Meta's short-form parameter keys too", () => {
    trackMetaCustomEvent("Signup", {
      em: "user@example.com",
      ph: "0812345678",
      fn: "Somchai",
      ln: "Sae-Lim",
      source: "landing",
    });
    expect(fbq).toHaveBeenCalledWith("trackCustom", "Signup", {
      source: "landing",
    });
  });

  it("passes undefined parameters through untouched", () => {
    trackMetaEvent("PageView");
    expect(fbq).toHaveBeenCalledWith("track", "PageView", undefined);
  });
});
