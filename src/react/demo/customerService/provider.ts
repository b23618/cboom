// ─── Customer Service — Provider Implementation ──────────────
//
// `DemoCustomerServiceProvider` is the only implementation wired into
// the demo. It is backed by the fictional fixtures in ./data.ts.
//
// The named per-channel adapter classes below (TikTokShop / Shopee /
// Lazada / LINE OA) describe the intended real integration surface.
// In the demo they all delegate to the same demo store — none of them
// call an external API. When a real TikTok Shop Customer Service API
// becomes available, `TikTokShopCustomerServiceProvider` is where that
// wiring goes; the UI never changes because it depends only on the
// `CustomerServiceProvider` interface.

import {
  CSAccessError,
  type CSAgent,
  type CSAuditEvent,
  type CSCaller,
  type CSChannel,
  type CSConversation,
  type CSInboxFilter,
  type CSMetrics,
  type CSPermission,
  type CSStatus,
  type CustomerServiceProvider,
} from "./types";
import {
  csAgents,
  csAuditSeed,
  csConversations,
  DEMO_ORG_ID,
} from "./data";

function requires(caller: CSCaller, permission: CSPermission) {
  if (!caller.permissions.includes(permission)) {
    throw new CSAccessError();
  }
}

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

// ─── Demo store (module-level, mutable within the session) ───
class DemoStore {
  private conversations: CSConversation[] = clone(csConversations);
  private audit: CSAuditEvent[] = clone(csAuditSeed);

  /** Every read is hard-scoped to the caller's organization. */
  private scoped(caller: CSCaller): CSConversation[] {
    return this.conversations.filter((c) => c.orgId === caller.orgId);
  }

  agents(): CSAgent[] {
    return clone(csAgents);
  }

  list(caller: CSCaller, filter: CSInboxFilter): CSConversation[] {
    let rows = this.scoped(caller);

    if (filter.channel && filter.channel !== "all") {
      rows = rows.filter((c) => c.channel === filter.channel);
    }
    if (filter.status && filter.status !== "all") {
      rows = rows.filter((c) => c.status === filter.status);
    }
    if (filter.assignedAgentId && filter.assignedAgentId !== "all") {
      rows =
        filter.assignedAgentId === "unassigned"
          ? rows.filter((c) => c.assignedAgentId === null)
          : rows.filter((c) => c.assignedAgentId === filter.assignedAgentId);
    }
    if (filter.unreadOnly) {
      rows = rows.filter((c) => c.unread > 0);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      rows = rows.filter(
        (c) =>
          c.customerName.toLowerCase().includes(q) ||
          c.preview.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          (c.relatedOrder?.id.toLowerCase().includes(q) ?? false),
      );
    }
    return clone(rows);
  }

  get(caller: CSCaller, id: string): CSConversation | null {
    const row = this.scoped(caller).find((c) => c.id === id);
    return row ? clone(row) : null;
  }

  private mutate(caller: CSCaller, id: string, fn: (c: CSConversation) => void): CSConversation {
    const row = this.conversations.find(
      (c) => c.id === id && c.orgId === caller.orgId,
    );
    if (!row) throw new CSAccessError("ไม่พบการสนทนา หรือไม่มีสิทธิ์เข้าถึง");
    fn(row);
    return clone(row);
  }

  private logEvent(user: string, action: string, channel: CSChannel) {
    this.audit = [
      {
        id: `CSLOG-${String(this.audit.length + 1).padStart(3, "0")}`,
        user,
        action,
        channel,
        time: new Date().toISOString().slice(0, 19).replace("T", " "),
      },
      ...this.audit,
    ];
  }

  reply(caller: CSCaller, id: string, body: string): CSConversation {
    const agentName = this.agents().find((a) => a.id === caller.userId)?.name ?? "เจ้าหน้าที่";
    const updated = this.mutate(caller, id, (c) => {
      c.messages.push({
        id: `${c.id}-m${c.messages.length + 1}`,
        author: { kind: "agent", name: agentName },
        body,
        time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
      });
      c.preview = body;
      c.unread = 0;
      c.updatedAt = "เมื่อสักครู่";
      c.lastContact = "เมื่อสักครู่";
      if (c.status === "ใหม่" || c.status === "รอตอบกลับ") c.status = "กำลังดำเนินการ";
      if (c.assignedAgentId === null) c.assignedAgentId = caller.userId;
    });
    this.logEvent(agentName, "ตอบกลับข้อความลูกค้า", updated.channel);
    return updated;
  }

  assign(caller: CSCaller, id: string, agentId: string | null): CSConversation {
    const actor = this.agents().find((a) => a.id === caller.userId)?.name ?? "เจ้าหน้าที่";
    const target = agentId ? this.agents().find((a) => a.id === agentId)?.name ?? agentId : "ไม่ระบุผู้รับผิดชอบ";
    const updated = this.mutate(caller, id, (c) => {
      c.assignedAgentId = agentId;
      if (agentId && c.status === "ใหม่") c.status = "กำลังดำเนินการ";
    });
    this.logEvent(actor, `มอบหมายการสนทนาให้ ${target}`, updated.channel);
    return updated;
  }

  setStatus(caller: CSCaller, id: string, status: CSStatus): CSConversation {
    const actor = this.agents().find((a) => a.id === caller.userId)?.name ?? "เจ้าหน้าที่";
    const updated = this.mutate(caller, id, (c) => {
      c.status = status;
      if (status === "แก้ไขแล้ว" || status === "ปิดการสนทนา") c.unread = 0;
    });
    this.logEvent(actor, `เปลี่ยนสถานะเป็น ${status}`, updated.channel);
    return updated;
  }

  setRead(caller: CSCaller, id: string, read: boolean): CSConversation {
    const actor = this.agents().find((a) => a.id === caller.userId)?.name ?? "เจ้าหน้าที่";
    const updated = this.mutate(caller, id, (c) => {
      c.unread = read ? 0 : Math.max(1, c.unread);
    });
    this.logEvent(actor, read ? "ทำเครื่องหมายว่าอ่านแล้ว" : "ทำเครื่องหมายว่ายังไม่อ่าน", updated.channel);
    return updated;
  }

  metrics(caller: CSCaller): CSMetrics {
    const rows = this.scoped(caller);
    return {
      total: 248,
      unread: rows.filter((c) => c.unread > 0).length + 15,
      waiting: rows.filter((c) => c.status === "รอตอบกลับ").length + 9,
      inProgress: rows.filter((c) => c.status === "กำลังดำเนินการ").length + 18,
      closed: rows.filter((c) => c.status === "ปิดการสนทนา" || c.status === "แก้ไขแล้ว").length + 188,
      avgResponse: "4m 32s",
    };
  }

  auditems(caller: CSCaller): CSAuditEvent[] {
    // Audit is org-wide; the demo store keeps a single trail.
    void caller;
    return clone(this.audit);
  }
}

const store = new DemoStore();

// ─── Channel adapter stubs ─────────────────────────────────
//
// Conceptual shape of a real per-channel integration. Each one would
// own auth, message normalization and outbound send for its channel.
// In the demo they are thin pass-throughs to the shared demo store so
// no external network call is ever made.

abstract class ChannelAdapter {
  abstract readonly channel: CSChannel;
  /** In a real integration: true only when OAuth + webhooks are live. */
  readonly isLiveIntegration = false;

  listConversations(caller: CSCaller, filter: CSInboxFilter): CSConversation[] {
    return store.list(caller, { ...filter, channel: this.channel });
  }
  getConversation(caller: CSCaller, id: string): CSConversation | null {
    return store.get(caller, id);
  }
  sendReply(caller: CSCaller, id: string, body: string): CSConversation {
    // Real adapter would POST to the channel's Customer Service API here.
    return store.reply(caller, id, body);
  }
}

export class TikTokShopCustomerServiceProvider extends ChannelAdapter {
  readonly channel = "tiktok" as const;
}
export class ShopeeCustomerServiceProvider extends ChannelAdapter {
  readonly channel = "shopee" as const;
}
export class LazadaCustomerServiceProvider extends ChannelAdapter {
  readonly channel = "lazada" as const;
}
export class LineOACustomerServiceProvider extends ChannelAdapter {
  readonly channel = "lineoa" as const;
}

export const channelAdapters: Record<CSChannel, ChannelAdapter> = {
  tiktok: new TikTokShopCustomerServiceProvider(),
  shopee: new ShopeeCustomerServiceProvider(),
  lazada: new LazadaCustomerServiceProvider(),
  lineoa: new LineOACustomerServiceProvider(),
};

// ─── The aggregate provider the UI consumes ────────────────
export class DemoCustomerServiceProvider implements CustomerServiceProvider {
  readonly channels: CSChannel[] = ["tiktok", "shopee", "lazada", "lineoa"];

  listAgents(caller: CSCaller): CSAgent[] {
    requires(caller, "customer_service.view");
    return store.agents();
  }

  getMetrics(caller: CSCaller): CSMetrics {
    requires(caller, "customer_service.view");
    return store.metrics(caller);
  }

  listConversations(caller: CSCaller, filter: CSInboxFilter): CSConversation[] {
    requires(caller, "customer_service.view");
    if (filter.channel && filter.channel !== "all") {
      return channelAdapters[filter.channel].listConversations(caller, filter);
    }
    return store.list(caller, filter);
  }

  getConversation(caller: CSCaller, id: string): CSConversation | null {
    requires(caller, "customer_service.view");
    return store.get(caller, id);
  }

  sendReply(caller: CSCaller, id: string, body: string): CSConversation {
    requires(caller, "customer_service.reply");
    const conv = store.get(caller, id);
    if (!conv) throw new CSAccessError("ไม่พบการสนทนา หรือไม่มีสิทธิ์เข้าถึง");
    return channelAdapters[conv.channel].sendReply(caller, id, body);
  }

  assign(caller: CSCaller, id: string, agentId: string | null): CSConversation {
    requires(caller, "customer_service.assign");
    return store.assign(caller, id, agentId);
  }

  setStatus(caller: CSCaller, id: string, status: CSStatus): CSConversation {
    requires(caller, status === "แก้ไขแล้ว" || status === "ปิดการสนทนา" ? "customer_service.resolve" : "customer_service.reply");
    return store.setStatus(caller, id, status);
  }

  setRead(caller: CSCaller, id: string, read: boolean): CSConversation {
    requires(caller, "customer_service.view");
    return store.setRead(caller, id, read);
  }

  listAuditEvents(caller: CSCaller): CSAuditEvent[] {
    requires(caller, "customer_service.view");
    return store.auditems(caller);
  }
}

export const customerServiceProvider: CustomerServiceProvider = new DemoCustomerServiceProvider();

// ─── Demo RBAC — role → permission mapping ─────────────────
//
// Mirrors the "Customer Service" permission group added to
// Settings → Roles & Permissions. A user with none of these
// permissions cannot open the inbox at all.

export const CS_ROLE_PERMISSIONS: Record<string, CSPermission[]> = {
  Admin: [
    "customer_service.view",
    "customer_service.reply",
    "customer_service.assign",
    "customer_service.resolve",
    "customer_service.manage",
  ],
  Manager: [
    "customer_service.view",
    "customer_service.reply",
    "customer_service.assign",
    "customer_service.resolve",
  ],
  "Customer Service Agent": [
    "customer_service.view",
    "customer_service.reply",
  ],
  // Roles with no Customer Service access at all.
  Sales: [],
  Accountant: [],
  Staff: [],
  Viewer: [],
};

export const CS_PERMISSION_LABELS: Record<CSPermission, string> = {
  "customer_service.view": "ดูการสนทนาและกล่องข้อความ",
  "customer_service.reply": "ตอบกลับข้อความลูกค้า",
  "customer_service.assign": "มอบหมายการสนทนาให้เจ้าหน้าที่",
  "customer_service.resolve": "เปลี่ยนสถานะ / ปิดการสนทนา",
  "customer_service.manage": "ตั้งค่าระบบ Customer Service",
};

/** The role the demo lets you preview the inbox as. */
export type CSDemoRole = "Admin" | "Manager" | "Customer Service Agent" | "Sales";

export function permissionsForRole(role: CSDemoRole): CSPermission[] {
  return CS_ROLE_PERMISSIONS[role] ?? [];
}
