import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Send, Paperclip, Smile, ChevronLeft, MoreVertical,
  UserCircle2, Package, ExternalLink, CircleDot, CheckCheck, Inbox as InboxIcon,
} from "lucide-react";
import { StatusBadge } from "../ui";
import { DEMO_ORG_ID, DEMO_USER_ID } from "../customerService/data";
import {
  customerServiceProvider, permissionsForRole, type CSDemoRole,
} from "../customerService/provider";
import {
  CS_CHANNELS, CS_STATUSES,
  type CSCaller, type CSChannel, type CSConversation, type CSStatus,
} from "../customerService/types";
import { ChannelBadge, CSRoleSwitcher, CSAccessDenied } from "./customerServiceShared";

const formatTHB = (n: number) => "฿" + n.toLocaleString("en-US");

// which mobile pane is showing
type MobilePane = "list" | "conversation" | "context";

export default function CustomerServiceInboxView({ onOpenOrder }: { onOpenOrder?: (orderId: string) => void }) {
  const [role, setRole] = useState<CSDemoRole>("Customer Service Agent");
  const caller: CSCaller = useMemo(
    () => ({ userId: DEMO_USER_ID, orgId: DEMO_ORG_ID, permissions: permissionsForRole(role) }),
    [role],
  );
  const canView = caller.permissions.includes("customer_service.view");
  const canReply = caller.permissions.includes("customer_service.reply");
  const canAssign = caller.permissions.includes("customer_service.assign");
  const canResolve = caller.permissions.includes("customer_service.resolve");

  // filters
  const [channel, setChannel] = useState<CSChannel | "all">("all");
  const [statusFilter, setStatusFilter] = useState<CSStatus | "all">("all");
  const [agentFilter, setAgentFilter] = useState<string>("all");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [search, setSearch] = useState("");

  // data — a monotonically increasing token forces a re-read after writes
  const [rev, setRev] = useState(0);
  const bump = () => setRev((r) => r + 1);

  const agents = useMemo(() => (canView ? customerServiceProvider.listAgents(caller) : []), [caller, canView, rev]);
  const metrics = useMemo(() => (canView ? customerServiceProvider.getMetrics(caller) : null), [caller, canView, rev]);
  const conversations = useMemo(
    () =>
      canView
        ? customerServiceProvider.listConversations(caller, {
            channel,
            status: statusFilter,
            assignedAgentId: agentFilter as any,
            unreadOnly,
            search,
          })
        : [],
    [caller, canView, channel, statusFilter, agentFilter, unreadOnly, search, rev],
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected: CSConversation | null = useMemo(
    () => (selectedId && canView ? customerServiceProvider.getConversation(caller, selectedId) : null),
    [selectedId, caller, canView, rev],
  );

  const [mobilePane, setMobilePane] = useState<MobilePane>("list");
  const [draft, setDraft] = useState("");
  const timelineRef = useRef<HTMLDivElement>(null);

  // keep a valid selection
  useEffect(() => {
    if (!canView) { setSelectedId(null); return; }
    if (conversations.length === 0) { setSelectedId(null); return; }
    if (!selectedId || !conversations.some((c) => c.id === selectedId)) {
      setSelectedId(conversations[0].id);
    }
  }, [conversations, selectedId, canView]);

  useEffect(() => {
    timelineRef.current?.scrollTo({ top: timelineRef.current.scrollHeight, behavior: "smooth" });
  }, [selected?.messages.length, selectedId]);

  const openConversation = (id: string) => {
    setSelectedId(id);
    setMobilePane("conversation");
    const conv = customerServiceProvider.getConversation(caller, id);
    if (conv && conv.unread > 0) {
      customerServiceProvider.setRead(caller, id, true);
      bump();
    }
  };

  const doSend = () => {
    if (!selected || !draft.trim() || !canReply) return;
    customerServiceProvider.sendReply(caller, selected.id, draft.trim());
    setDraft("");
    bump();
  };

  const agentName = (id: string | null) =>
    id ? agents.find((a) => a.id === id)?.name ?? "ไม่ทราบชื่อ" : "ยังไม่มอบหมาย";

  const summaryCards = metrics
    ? [
        { label: "การสนทนาทั้งหมด", value: metrics.total },
        { label: "ยังไม่ได้อ่าน", value: metrics.unread },
        { label: "รอตอบกลับ", value: metrics.waiting },
        { label: "กำลังดำเนินการ", value: metrics.inProgress },
        { label: "ปิดแล้ว", value: metrics.closed },
        { label: "เวลาเฉลี่ยในการตอบกลับ", value: metrics.avgResponse },
      ]
    : [];

  return (
    <div className="space-y-4">
      <CSRoleSwitcher role={role} onChange={setRole} />

      {!canView ? (
        <CSAccessDenied />
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
            {summaryCards.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="rounded-xl border border-gray-200/60 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5"
              >
                <p className="text-[10px] text-gray-500 dark:text-white/50">{c.label}</p>
                <p className="mt-1 text-base font-bold">{c.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Channel filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[{ id: "all" as const, label: "ทั้งหมด" }, ...CS_CHANNELS].map((c) => (
              <button
                key={c.id}
                onClick={() => setChannel(c.id as CSChannel | "all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  channel === c.id
                    ? "bg-green-500/10 text-green-600 dark:text-green-400"
                    : "text-gray-500 hover:bg-gray-100 dark:text-white/50 dark:hover:bg-white/5"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Secondary filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[180px] flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ค้นหาชื่อลูกค้า, ข้อความ, เลขออเดอร์..."
                className="w-full rounded-xl border border-gray-200/60 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-green-500/40 dark:border-white/10 dark:bg-white/5"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as CSStatus | "all")}
              className="rounded-xl border border-gray-200/60 bg-gray-50 px-3 py-2 text-xs outline-none focus:border-green-500/40 dark:border-white/10 dark:bg-white/5"
            >
              <option value="all">ทุกสถานะ</option>
              {CS_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="rounded-xl border border-gray-200/60 bg-gray-50 px-3 py-2 text-xs outline-none focus:border-green-500/40 dark:border-white/10 dark:bg-white/5"
            >
              <option value="all">เจ้าหน้าที่ทั้งหมด</option>
              <option value="unassigned">ยังไม่มอบหมาย</option>
              <option value={DEMO_USER_ID}>งานของฉัน</option>
              {agents.filter((a) => a.id !== DEMO_USER_ID).map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
            <button
              onClick={() => setUnreadOnly((v) => !v)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-colors ${
                unreadOnly
                  ? "border-green-500/40 bg-green-500/10 text-green-600 dark:text-green-400"
                  : "border-gray-200/60 text-gray-600 hover:border-green-500/40 hover:text-green-500 dark:border-white/10 dark:text-white/60"
              }`}
            >
              <CircleDot className="h-3.5 w-3.5" /> เฉพาะที่ยังไม่อ่าน
            </button>
          </div>

          {/* 3-column inbox */}
          <div className="grid gap-3 lg:grid-cols-[320px_1fr_300px] xl:grid-cols-[340px_1fr_320px]">
            {/* LEFT — conversation list */}
            <div
              className={`rounded-2xl border border-gray-200/60 bg-white/70 dark:border-white/10 dark:bg-white/5 ${
                mobilePane === "list" ? "block" : "hidden"
              } lg:block`}
            >
              <div className="border-b border-gray-200/60 px-4 py-3 text-xs font-semibold dark:border-white/10">
                กล่องข้อความ · {conversations.length} รายการ
              </div>
              <div className="max-h-[560px] divide-y divide-gray-100/70 overflow-y-auto dark:divide-white/5">
                {conversations.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <InboxIcon className="h-8 w-8 text-gray-300 dark:text-white/20" />
                    <p className="mt-3 text-xs text-gray-400 dark:text-white/40">ไม่พบการสนทนาตามเงื่อนไข</p>
                  </div>
                )}
                {conversations.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => openConversation(c.id)}
                    className={`flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50/80 dark:hover:bg-white/[0.03] ${
                      selectedId === c.id ? "bg-green-500/5" : ""
                    }`}
                  >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-xs font-bold text-white">
                      {c.customerName.replace(/^คุณ/, "").charAt(0) || "?"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-xs font-semibold">{c.customerName}</span>
                        <span className="flex-shrink-0 text-[10px] text-gray-400">{c.updatedAt}</span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-1.5">
                        <ChannelBadge channel={c.channel} />
                        {c.unread > 0 && (
                          <span className="rounded-full bg-green-500 px-1.5 text-[10px] font-bold text-white">{c.unread}</span>
                        )}
                      </div>
                      <p className="mt-1 truncate text-[11px] text-gray-500 dark:text-white/50">{c.preview}</p>
                      <div className="mt-1.5 flex items-center justify-between gap-2">
                        <StatusBadge status={c.status} />
                        <span className="truncate text-[10px] text-gray-400">
                          {c.assignedAgentId ? agentName(c.assignedAgentId) : "ยังไม่มอบหมาย"}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* CENTER — conversation */}
            <div
              className={`flex min-h-[560px] flex-col rounded-2xl border border-gray-200/60 bg-white/70 dark:border-white/10 dark:bg-white/5 ${
                mobilePane === "conversation" ? "flex" : "hidden"
              } lg:flex`}
            >
              {!selected ? (
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <InboxIcon className="h-10 w-10 text-gray-300 dark:text-white/20" />
                  <p className="mt-3 text-sm font-medium text-gray-400 dark:text-white/40">เลือกการสนทนาเพื่อเริ่มต้น</p>
                </div>
              ) : (
                <>
                  {/* header */}
                  <div className="flex items-center gap-2 border-b border-gray-200/60 px-4 py-3 dark:border-white/10">
                    <button className="lg:hidden" onClick={() => setMobilePane("list")}>
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-xs font-bold text-white">
                      {selected.customerName.replace(/^คุณ/, "").charAt(0) || "?"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-bold">{selected.customerName}</span>
                        <ChannelBadge channel={selected.channel} />
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-[10px] text-gray-400">
                        <StatusBadge status={selected.status} />
                        <span>· {agentName(selected.assignedAgentId)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setMobilePane("context")}
                      className="rounded-lg border border-gray-200/60 px-2.5 py-1 text-[10px] font-medium text-gray-500 hover:border-green-500/40 hover:text-green-500 lg:hidden dark:border-white/10"
                    >
                      ข้อมูลลูกค้า
                    </button>
                    <ConvActionMenu
                      canAssign={canAssign}
                      canResolve={canResolve}
                      agents={agents}
                      currentUserId={DEMO_USER_ID}
                      conversation={selected}
                      onAssign={(agentId) => { customerServiceProvider.assign(caller, selected.id, agentId); bump(); }}
                      onStatus={(s) => { customerServiceProvider.setStatus(caller, selected.id, s); bump(); }}
                      onToggleRead={() => { customerServiceProvider.setRead(caller, selected.id, selected.unread === 0 ? false : true); bump(); }}
                    />
                  </div>

                  {/* timeline */}
                  <div ref={timelineRef} className="flex-1 space-y-3 overflow-y-auto p-4">
                    {selected.messages.map((msg) => {
                      if (msg.author.kind === "system") {
                        return (
                          <p key={msg.id} className="text-center text-[10px] text-gray-400">
                            {msg.body} · {msg.time}
                          </p>
                        );
                      }
                      const isAgent = msg.author.kind === "agent";
                      return (
                        <div key={msg.id} className={`flex ${isAgent ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[78%] ${isAgent ? "items-end" : "items-start"}`}>
                            <div
                              className={`rounded-2xl px-3 py-2 text-xs ${
                                isAgent
                                  ? "bg-green-600 text-white"
                                  : "border border-gray-200/60 bg-white text-gray-800 dark:border-white/10 dark:bg-white/10 dark:text-white/80"
                              }`}
                            >
                              {msg.body}
                            </div>
                            <p className={`mt-1 text-[10px] text-gray-400 ${isAgent ? "text-right" : "text-left"}`}>
                              {isAgent ? msg.author.name : selected.customerName} · {msg.time}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* composer */}
                  <div className="border-t border-gray-200/60 p-3 dark:border-white/10">
                    {canReply ? (
                      <>
                        <div className="flex items-end gap-2">
                          <textarea
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); doSend(); }
                            }}
                            rows={2}
                            placeholder="พิมพ์ข้อความตอบกลับ..."
                            className="flex-1 resize-none rounded-xl border border-gray-200/60 bg-gray-50 px-3 py-2 text-xs outline-none focus:border-green-500/40 dark:border-white/10 dark:bg-white/5"
                          />
                          <button
                            onClick={doSend}
                            disabled={!draft.trim()}
                            className="flex h-9 items-center gap-1.5 rounded-xl bg-green-600 px-3 text-xs font-semibold text-white transition-all hover:bg-green-700 disabled:opacity-40"
                          >
                            <Send className="h-3.5 w-3.5" /> ส่ง
                          </button>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-gray-400">
                          <button title="แนบไฟล์" className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-white/5">
                            <Paperclip className="h-3.5 w-3.5" />
                          </button>
                          <button title="อีโมจิ" className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-white/5">
                            <Smile className="h-3.5 w-3.5" />
                          </button>
                          <span className="text-[10px]">กด Enter เพื่อส่ง · Shift+Enter ขึ้นบรรทัดใหม่</span>
                        </div>
                      </>
                    ) : (
                      <p className="rounded-xl bg-gray-50 px-3 py-2 text-center text-[11px] text-gray-500 dark:bg-white/5 dark:text-white/50">
                        บทบาทของคุณไม่มีสิทธิ์ <span className="font-mono">customer_service.reply</span> — ดูได้อย่างเดียว
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* RIGHT — customer & order context */}
            <div
              className={`rounded-2xl border border-gray-200/60 bg-white/70 dark:border-white/10 dark:bg-white/5 ${
                mobilePane === "context" ? "block" : "hidden"
              } lg:block`}
            >
              {!selected ? (
                <div className="flex h-full items-center justify-center p-6 text-center text-xs text-gray-400">
                  เลือกการสนทนาเพื่อดูข้อมูลลูกค้าและออเดอร์
                </div>
              ) : (
                <div className="space-y-4 p-4">
                  <button className="lg:hidden" onClick={() => setMobilePane("conversation")}>
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {/* customer */}
                  <div>
                    <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      <UserCircle2 className="h-3.5 w-3.5" /> ลูกค้า
                    </p>
                    <div className="space-y-1.5 rounded-xl border border-gray-200/60 p-3 text-xs dark:border-white/10">
                      <Row label="ชื่อที่แสดง" value={selected.customerName} />
                      <Row label="ช่องทาง" value={<ChannelBadge channel={selected.channel} />} />
                      <Row label="รหัสอ้างอิงลูกค้า" value={<span className="font-mono text-[11px]">{selected.customerRef}</span>} />
                      <Row label="สถานะลูกค้า" value={selected.customerStatus} />
                      <Row label="ติดต่อล่าสุด" value={selected.lastContact} />
                    </div>
                    <p className="mt-1.5 text-[10px] text-gray-400">
                      แสดงเฉพาะข้อมูลที่จำเป็นต่อการบริการลูกค้า ไม่แสดงข้อมูลส่วนบุคคลที่ไม่จำเป็น
                    </p>
                  </div>

                  {/* related order */}
                  <div>
                    <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      <Package className="h-3.5 w-3.5" /> ออเดอร์ที่เกี่ยวข้อง
                    </p>
                    {selected.relatedOrder ? (
                      <div className="space-y-1.5 rounded-xl border border-gray-200/60 p-3 text-xs dark:border-white/10">
                        <Row label="เลขออเดอร์" value={<span className="font-mono font-semibold">{selected.relatedOrder.id}</span>} />
                        <Row label="ช่องทาง" value={<ChannelBadge channel={selected.relatedOrder.channel} />} />
                        <Row label="สถานะ" value={<StatusBadge status={selected.relatedOrder.status} />} />
                        <Row label="ยอดรวม" value={<span className="font-semibold">{formatTHB(selected.relatedOrder.total)}</span>} />
                        <Row label="รายการ" value={`${selected.relatedOrder.itemCount} รายการ`} />
                        <Row label="การชำระเงิน" value={selected.relatedOrder.payment} />
                        <Row label="ขนส่ง" value={selected.relatedOrder.shipping} />
                        <Row label="เลขพัสดุ (เดโม)" value={<span className="font-mono text-[11px]">{selected.relatedOrder.tracking}</span>} />
                        <button
                          onClick={() => onOpenOrder?.(selected.relatedOrder!.id)}
                          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl bg-green-600 py-2 text-[11px] font-semibold text-white transition-all hover:bg-green-700"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> ดูรายละเอียดออเดอร์
                        </button>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-gray-200/60 p-3 text-center text-[11px] text-gray-400 dark:border-white/10">
                        การสนทนานี้ยังไม่ผูกกับออเดอร์
                      </div>
                    )}
                  </div>

                  {/* assignment quick-actions */}
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">การมอบหมาย &amp; สถานะ</p>
                    <div className="space-y-2">
                      <label className="block text-[10px] text-gray-500 dark:text-white/50">เจ้าหน้าที่ผู้รับผิดชอบ</label>
                      <select
                        disabled={!canAssign}
                        value={selected.assignedAgentId ?? ""}
                        onChange={(e) => { customerServiceProvider.assign(caller, selected.id, e.target.value || null); bump(); }}
                        className="w-full rounded-xl border border-gray-200/60 bg-gray-50 px-3 py-2 text-xs outline-none focus:border-green-500/40 disabled:opacity-50 dark:border-white/10 dark:bg-white/5"
                      >
                        <option value="">ยังไม่มอบหมาย</option>
                        <option value={DEMO_USER_ID}>มอบหมายให้ฉัน</option>
                        {agents.filter((a) => a.id !== DEMO_USER_ID).map((a) => (
                          <option key={a.id} value={a.id}>{a.name}</option>
                        ))}
                      </select>
                      <label className="block text-[10px] text-gray-500 dark:text-white/50">สถานะการสนทนา</label>
                      <select
                        value={selected.status}
                        onChange={(e) => { customerServiceProvider.setStatus(caller, selected.id, e.target.value as CSStatus); bump(); }}
                        className="w-full rounded-xl border border-gray-200/60 bg-gray-50 px-3 py-2 text-xs outline-none focus:border-green-500/40 dark:border-white/10 dark:bg-white/5"
                      >
                        {CS_STATUSES.map((s) => (
                          <option key={s} value={s} disabled={["แก้ไขแล้ว", "ปิดการสนทนา"].includes(s) && !canResolve}>
                            {s}{["แก้ไขแล้ว", "ปิดการสนทนา"].includes(s) && !canResolve ? " (ต้องมีสิทธิ์ resolve)" : ""}
                          </option>
                        ))}
                      </select>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { customerServiceProvider.setRead(caller, selected.id, selected.unread === 0 ? false : true); bump(); }}
                          className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-gray-200/60 py-2 text-[11px] font-medium hover:border-green-500/40 dark:border-white/10"
                        >
                          {selected.unread === 0 ? <><CircleDot className="h-3.5 w-3.5" /> ทำเป็นยังไม่อ่าน</> : <><CheckCheck className="h-3.5 w-3.5" /> ทำเป็นอ่านแล้ว</>}
                        </button>
                        {canResolve && (
                          <button
                            onClick={() => { customerServiceProvider.setStatus(caller, selected.id, "แก้ไขแล้ว"); bump(); }}
                            className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-green-600 py-2 text-[11px] font-semibold text-white hover:bg-green-700"
                          >
                            <CheckCheck className="h-3.5 w-3.5" /> ปิดเคส
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className="text-center text-[10px] text-gray-400 dark:text-white/40">
            ข้อความทั้งหมดเป็นข้อมูลสาธิต (demo) ภายในระบบ CBoom — จำกัดขอบเขตเฉพาะร้าน/องค์กรที่เชื่อมต่อ
          </p>
        </>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-gray-400">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

function ConvActionMenu({
  conversation, agents, currentUserId, canAssign, canResolve, onAssign, onStatus, onToggleRead,
}: {
  conversation: CSConversation;
  agents: { id: string; name: string }[];
  currentUserId: string;
  canAssign: boolean;
  canResolve: boolean;
  onAssign: (agentId: string | null) => void;
  onStatus: (s: CSStatus) => void;
  onToggleRead: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/5"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-8 z-30 w-52 rounded-xl border border-gray-200/60 bg-white p-1.5 text-xs shadow-xl dark:border-white/10 dark:bg-[#0d1410]"
          >
            <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-300">มอบหมาย</p>
            <button
              disabled={!canAssign}
              onClick={() => { onAssign(currentUserId); setOpen(false); }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-white/60 dark:hover:bg-white/5"
            >
              มอบหมายให้ฉัน
            </button>
            <button
              disabled={!canAssign}
              onClick={() => { onAssign(null); setOpen(false); }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-white/60 dark:hover:bg-white/5"
            >
              ยกเลิกการมอบหมาย
            </button>
            <div className="my-1 border-t border-gray-100 dark:border-white/5" />
            <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-300">สถานะ</p>
            {(["รอตอบกลับ", "กำลังดำเนินการ", "แก้ไขแล้ว", "ปิดการสนทนา"] as CSStatus[]).map((s) => (
              <button
                key={s}
                disabled={["แก้ไขแล้ว", "ปิดการสนทนา"].includes(s) && !canResolve}
                onClick={() => { onStatus(s); setOpen(false); }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-white/60 dark:hover:bg-white/5"
              >
                {s}
              </button>
            ))}
            <div className="my-1 border-t border-gray-100 dark:border-white/5" />
            <button
              onClick={() => { onToggleRead(); setOpen(false); }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 font-medium text-gray-600 hover:bg-gray-100 dark:text-white/60 dark:hover:bg-white/5"
            >
              {conversation.unread === 0 ? "ทำเป็นยังไม่อ่าน" : "ทำเป็นอ่านแล้ว"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
