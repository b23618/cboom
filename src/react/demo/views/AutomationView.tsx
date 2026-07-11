import { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap, Plus, Play, Pause, ChevronDown, ChevronRight,
  ShoppingCart, UserPlus, Package, FileText, MessageCircle,
  Bell, ArrowRight, Clock, CheckCircle2, Settings,
} from "lucide-react";
import { Card, DataTable, StatusBadge, SubTabs, FilterBar, AnimatedCounter } from "../ui";
import { automationWorkflows, automationFlow } from "../data";

const iconMap: Record<string, typeof ShoppingCart> = {
  "shopping-cart": ShoppingCart,
  "user-plus": UserPlus,
  "package": Package,
  "file-text": FileText,
  "message-circle": MessageCircle,
  "bell": Bell,
};

export default function AutomationView() {
  const [tab, setTab] = useState("workflows");
  const [enabledWorkflows, setEnabledWorkflows] = useState<Record<string, boolean>>(
    Object.fromEntries(automationWorkflows.map(w => [w.id, w.status === "เปิดใช้งาน"]))
  );

  const tabs = [
    { id: "workflows", label: "Workflows", icon: Zap },
    { id: "builder", label: "Workflow Builder", icon: Plus },
    { id: "history", label: "History", icon: Clock },
    { id: "examples", label: "ตัวอย่าง", icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-5">
      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Workflows ทั้งหมด", value: 4, icon: Zap, color: "text-green-500" },
          { label: "การทำงานรวม", value: 2152, icon: Play, color: "text-blue-500" },
          { label: "สำเร็จ", value: 2148, icon: CheckCircle2, color: "text-green-500" },
          { label: "ล้มเหลว", value: 4, icon: Pause, color: "text-red-500" },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-gray-200/60 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
            >
              <span className={`flex h-8 w-8 items-center justify-center rounded-xl bg-green-500/10 ${kpi.color}`}>
                <Icon className="h-4 w-4" />
              </span>
              <p className="mt-3 text-xs text-gray-500 dark:text-white/50">{kpi.label}</p>
              <p className="text-lg font-bold"><AnimatedCounter value={kpi.value} /></p>
            </motion.div>
          );
        })}
      </div>

      <SubTabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === "workflows" && (
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold">Workflows ทั้งหมด</p>
            <button className="flex items-center gap-1.5 rounded-xl bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-500">
              <Plus className="h-3.5 w-3.5" /> สร้าง Workflow
            </button>
          </div>
          <div className="space-y-3">
            {automationWorkflows.map((wf, i) => (
              <motion.div
                key={wf.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="rounded-xl border border-gray-200/60 p-4 dark:border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-gray-400">{wf.id}</span>
                      <StatusBadge status={enabledWorkflows[wf.id] ? "เปิดใช้งาน" : "ปิดใช้งาน"} />
                    </div>
                    <p className="mt-2 text-xs font-medium leading-snug">{wf.name}</p>
                    <div className="mt-2 flex items-center gap-4 text-[10px] text-gray-400">
                      <span>Trigger: {wf.trigger}</span>
                      <span>Actions: {wf.actions}</span>
                      <span>รันแล้ว: {wf.runs.toLocaleString()} ครั้ง</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setEnabledWorkflows(prev => ({ ...prev, [wf.id]: !prev[wf.id] }))}
                    className={`relative h-6 w-11 rounded-full transition-colors ${enabledWorkflows[wf.id] ? "bg-green-500" : "bg-gray-300 dark:bg-white/10"}`}
                  >
                    <motion.span
                      layout
                      className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
                      animate={{ left: enabledWorkflows[wf.id] ? "22px" : "2px" }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {tab === "builder" && (
        <Card>
          <p className="mb-4 text-sm font-semibold">Workflow Builder</p>
          {/* Visual Flow */}
          <div className="space-y-2">
            {automationFlow.map((step, i) => {
              const Icon = iconMap[step.icon] || Zap;
              const isTrigger = step.type === "trigger";
              return (
                <div key={step.step}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className={`flex items-center gap-3 rounded-xl p-4 ${
                      isTrigger
                        ? "border-2 border-dashed border-green-500/40 bg-green-500/5"
                        : "border border-gray-200/60 bg-white/70 dark:border-white/10 dark:bg-white/5"
                    }`}
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      isTrigger ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-white/60"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          isTrigger ? "bg-green-500/10 text-green-500" : "bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-white/50"
                        }`}>
                          {isTrigger ? "TRIGGER" : `ACTION ${step.step - 1}`}
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-medium">{step.label}</p>
                    </div>
                    <button className="text-gray-400 hover:text-green-500">
                      <Settings className="h-4 w-4" />
                    </button>
                  </motion.div>
                  {i < automationFlow.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ChevronDown className="h-4 w-4 text-gray-300 dark:text-white/20" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-xl border border-dashed border-gray-200/60 px-4 py-2 text-xs font-medium text-gray-500 hover:border-green-500/40 hover:text-green-500 dark:border-white/10 dark:text-white/50">
              <Plus className="h-3.5 w-3.5" /> เพิ่ม Action
            </button>
            <button className="ml-auto flex items-center gap-1.5 rounded-xl bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-700">
              <Play className="h-3.5 w-3.5" /> ทดสอบ Workflow
            </button>
          </div>
        </Card>
      )}

      {tab === "history" && (
        <Card>
          <div className="mb-4"><FilterBar placeholder="ค้นหาประวัติ..." /></div>
          <DataTable
            columns={[
              { key: "id", label: "ID", render: (r) => <span className="font-mono text-gray-400">{r.id}</span> },
              { key: "workflow", label: "Workflow" },
              { key: "trigger", label: "Trigger" },
              { key: "duration", label: "เวลา", render: (r) => <span>{r.duration}ms</span> },
              { key: "time", label: "เวลาที่รัน" },
              { key: "status", label: "สถานะ", render: (r) => <StatusBadge status={r.status} /> },
            ]}
            data={[
              { id: "RUN-001", workflow: "WF-001: ออเดอร์ใหม่ → สร้างลูกค้า", trigger: "SH-8821", duration: 245, time: "10:32:15", status: "สำเร็จ" },
              { id: "RUN-002", workflow: "WF-003: ชำระเงิน → อัปเดตออเดอร์", trigger: "PAY-4521", duration: 180, time: "10:28:42", status: "สำเร็จ" },
              { id: "RUN-003", workflow: "WF-002: สต๊อกต่ำ → แจ้งเตือน", trigger: "SKU-1101", duration: 95, time: "10:15:20", status: "สำเร็จ" },
              { id: "RUN-004", workflow: "WF-001: ออเดอร์ใหม่ → สร้างลูกค้า", trigger: "TT-4521", duration: 210, time: "10:05:33", status: "สำเร็จ" },
              { id: "RUN-005", workflow: "WF-003: ชำระเงิน → อัปเดตออเดอร์", trigger: "PAY-3092", duration: 320, time: "09:58:10", status: "ล้มเหลว" },
              { id: "RUN-006", workflow: "WF-001: ออเดอร์ใหม่ → สร้างลูกค้า", trigger: "LZ-3092", duration: 195, time: "09:45:00", status: "สำเร็จ" },
            ]}
          />
        </Card>
      )}

      {tab === "examples" && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { title: "ออเดอร์ใหม่ → สร้างลูกค้า → หักสต๊อก → ใบแจ้งหนี้ → LINE Notify → แจ้งทีมขาย", tags: ["E-Commerce", "CRM", "Accounting"] },
            { title: "สต๊อกต่ำ → แจ้งเตือนทีมคลัง → สร้าง PO อัตโนมัติ", tags: ["Warehouse", "Purchasing"] },
            { title: "ชำระเงินแล้ว → อัปเดตออเดอร์ → ส่งใบเสร็จ → ส่ง LINE ขอบคุณ", tags: ["Payment", "Customer Success"] },
            { title: "สิ้นเดือน → สร้างรายงานยอดขาย → ส่งอีเมลผู้บริหาร → สร้าง Backup", tags: ["Reports", "Admin"] },
            { title: "ลูกค้าใหม่ → ส่ง Welcome Email → สร้างไลน์กรุ๊ป → มอบหมาย Sales", tags: ["CRM", "Onboarding"] },
            { title: "ใบแจ้งหนี้เกินกำหนด → ส่งชี้แจง → แจ้งการบัญชี → อัปเดตสถานะ", tags: ["Accounting", "AR"] },
          ].map((example, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-gray-200/60 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
                  <Zap className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-medium leading-relaxed">{example.title}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {example.tags.map(tag => (
                      <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500 dark:bg-white/5 dark:text-white/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button className="mt-4 flex items-center gap-1 text-xs font-medium text-green-500 hover:underline">
                ใช้เทมเพลตนี้ <ArrowRight className="h-3 w-3" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
