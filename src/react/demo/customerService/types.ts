// ─── Customer Service — Domain Types & Provider Contract ──────
//
// This module defines a channel-agnostic abstraction for the Customer
// Service Inbox. The demo is backed entirely by fictional in-memory
// data (see ./data.ts), but every UI component talks only to the
// `CustomerServiceProvider` interface below, so a real marketplace
// Customer Service API (e.g. TikTok Shop) can be dropped in later
// without touching the views.

export type CSChannel = "tiktok" | "shopee" | "lazada" | "lineoa";

export const CS_CHANNELS: { id: CSChannel; label: string; badgeClass: string }[] = [
  { id: "tiktok", label: "TikTok Shop", badgeClass: "bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-400" },
  { id: "shopee", label: "Shopee", badgeClass: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400" },
  { id: "lazada", label: "Lazada", badgeClass: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400" },
  { id: "lineoa", label: "LINE OA", badgeClass: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400" },
];

export function channelLabel(id: CSChannel): string {
  return CS_CHANNELS.find((c) => c.id === id)?.label ?? id;
}

// Conversation status — Thai labels are the display values used across
// the UI and match the StatusBadge palette in ../ui.tsx.
export type CSStatus =
  | "ใหม่"
  | "รอตอบกลับ"
  | "กำลังดำเนินการ"
  | "แก้ไขแล้ว"
  | "ปิดการสนทนา";

export const CS_STATUSES: CSStatus[] = [
  "ใหม่",
  "รอตอบกลับ",
  "กำลังดำเนินการ",
  "แก้ไขแล้ว",
  "ปิดการสนทนา",
];

export interface CSAgent {
  id: string;
  name: string;
  /** Roles this agent holds — used only to demo role-based access. */
  role: "Admin" | "Manager" | "Customer Service Agent";
}

export interface CSMessageAuthor {
  kind: "customer" | "agent" | "system";
  name: string;
}

export interface CSMessage {
  id: string;
  author: CSMessageAuthor;
  body: string;
  /** ISO-ish display time, e.g. "10:42" or "เมื่อวาน 16:20". */
  time: string;
}

export interface CSRelatedOrder {
  id: string;
  channel: CSChannel;
  status: string;
  total: number;
  itemCount: number;
  payment: string;
  shipping: string;
  /** Clearly fictional demo tracking reference. */
  tracking: string;
}

export interface CSConversation {
  id: string;
  /** The organization / connected shop this conversation belongs to.
   *  Conversations are always scoped to one org — a user from org A
   *  must never be handed an org B conversation. */
  orgId: string;
  channel: CSChannel;
  customerName: string;
  /** Non-PII reference id shown in the context panel. */
  customerRef: string;
  customerStatus: string;
  lastContact: string;
  status: CSStatus;
  unread: number;
  /** Agent id, or null when unassigned. */
  assignedAgentId: string | null;
  updatedAt: string;
  preview: string;
  messages: CSMessage[];
  relatedOrder: CSRelatedOrder | null;
}

// ─── Filters passed from the UI to the provider ──────────────
export interface CSInboxFilter {
  channel?: CSChannel | "all";
  status?: CSStatus | "all";
  assignedAgentId?: string | "all" | "unassigned";
  unreadOnly?: boolean;
  search?: string;
}

export interface CSMetrics {
  total: number;
  unread: number;
  waiting: number;
  inProgress: number;
  closed: number;
  avgResponse: string;
}

export interface CSAuditEvent {
  id: string;
  user: string;
  action: string;
  channel: CSChannel;
  time: string;
}

// ─── Provider contract ───────────────────────────────────────
//
// A caller supplies the acting user's context (org + granted
// permissions). The provider is responsible for scoping every
// result to that org and refusing writes the caller is not
// permitted to make.

export type CSPermission =
  | "customer_service.view"
  | "customer_service.reply"
  | "customer_service.assign"
  | "customer_service.resolve"
  | "customer_service.manage";

export interface CSCaller {
  userId: string;
  orgId: string;
  permissions: CSPermission[];
}

export interface CustomerServiceProvider {
  /** Channels this provider can serve. */
  readonly channels: CSChannel[];

  listAgents(caller: CSCaller): CSAgent[];
  getMetrics(caller: CSCaller): CSMetrics;
  listConversations(caller: CSCaller, filter: CSInboxFilter): CSConversation[];
  getConversation(caller: CSCaller, id: string): CSConversation | null;

  sendReply(caller: CSCaller, id: string, body: string): CSConversation;
  assign(caller: CSCaller, id: string, agentId: string | null): CSConversation;
  setStatus(caller: CSCaller, id: string, status: CSStatus): CSConversation;
  setRead(caller: CSCaller, id: string, read: boolean): CSConversation;

  /** Audit trail — never contains message bodies. */
  listAuditEvents(caller: CSCaller): CSAuditEvent[];
}

export class CSAccessError extends Error {
  constructor(message = "ไม่มีสิทธิ์เข้าถึงข้อมูลนี้") {
    super(message);
    this.name = "CSAccessError";
  }
}
