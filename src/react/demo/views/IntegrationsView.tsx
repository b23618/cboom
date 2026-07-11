import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag, Music, ShoppingCart, MessageCircle, FileSpreadsheet,
  Webhook, Code, Key, Plus, CheckCircle2, Store, Globe,
} from "lucide-react";
import { Card, StatusBadge, SubTabs, FilterBar } from "../ui";
import { integrationsConnected, integrationsAvailable } from "../data";

const iconMap: Record<string, typeof ShoppingBag> = {
  "shopping-bag": ShoppingBag,
  "music": Music,
  "shopping-cart": ShoppingCart,
  "message-circle": MessageCircle,
  "file-spreadsheet": FileSpreadsheet,
  "store": Store,
  "facebook": Globe,
};

export default function IntegrationsView() {
  const [tab, setTab] = useState("connected");

  const tabs = [
    { id: "connected", label: "เชื่อมต่อแล้ว", icon: CheckCircle2 },
    { id: "available", label: "Available", icon: Plus },
    { id: "webhooks", label: "Webhooks", icon: Webhook },
    { id: "api", label: "REST API", icon: Code },
  ];

  return (
    <div className="space-y-5">
      <SubTabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === "connected" && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {integrationsConnected.map((integration, i) => {
            const Icon = iconMap[integration.icon] || ShoppingBag;
            return (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-gray-200/60 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-center justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${integration.color} text-white`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <StatusBadge status={integration.status} />
                </div>
                <h3 className="mt-4 text-sm font-bold">{integration.name}</h3>
                <p className="mt-1 text-xs text-gray-500 dark:text-white/50">{integration.category}</p>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] text-gray-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                  ซิงค์ล่าสุด: {integration.lastSync}
                </div>
                <button className="mt-4 w-full rounded-xl border border-gray-200/60 py-2 text-xs font-medium text-gray-600 transition-colors hover:border-green-500/40 hover:text-green-500 dark:border-white/10 dark:text-white/60">
                  ตั้งค่า
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      {tab === "available" && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {integrationsAvailable.map((integration, i) => {
            const Icon = iconMap[integration.icon] || Store;
            return (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-gray-200/60 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-center justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${integration.color} text-white opacity-60`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-medium text-gray-500 dark:bg-white/5 dark:text-white/50">
                    เร็วๆ นี้
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-bold">{integration.name}</h3>
                <p className="mt-1 text-xs text-gray-500 dark:text-white/50">{integration.category}</p>
                <button className="mt-4 w-full rounded-xl border border-dashed border-gray-200/60 py-2 text-xs font-medium text-gray-400 dark:border-white/10 dark:text-white/40">
                  แจ้งเตือนเมื่อพร้อม
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      {tab === "webhooks" && (
        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Webhook Endpoints</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-white/50">รับ Event แบบ Realtime จากระบบภายนอก</p>
              </div>
              <button className="flex items-center gap-1.5 rounded-xl bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-500">
                <Plus className="h-3.5 w-3.5" /> เพิ่ม Webhook
              </button>
            </div>
            <div className="mt-4 space-y-2">
              {[
                { url: "https://api.cboom.in.th/webhooks/orders", events: ["order.created", "order.updated", "order.cancelled"], status: "เปิดใช้งาน" },
                { url: "https://api.cboom.in.th/webhooks/products", events: ["product.stock_updated", "product.price_changed"], status: "เปิดใช้งาน" },
                { url: "https://api.cboom.in.th/webhooks/payments", events: ["payment.completed", "payment.failed"], status: "เปิดใช้งาน" },
              ].map((hook, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="rounded-xl border border-gray-200/60 p-3 dark:border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <code className="text-xs text-gray-600 dark:text-white/60">{hook.url}</code>
                    <StatusBadge status={hook.status} />
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {hook.events.map(ev => (
                      <span key={ev} className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-mono text-gray-500 dark:bg-white/5 dark:text-white/50">
                        {ev}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
          <Card delay={0.3}>
            <p className="mb-4 text-sm font-semibold">Webhook Delivery Logs</p>
            <div className="space-y-2">
              {[
                { event: "order.created", url: "https://api.cboom.in.th/webhooks/orders", status: "สำเร็จ", code: 200, time: "10:32:15", attempts: 1 },
                { event: "payment.completed", url: "https://api.cboom.in.th/webhooks/payments", status: "สำเร็จ", code: 200, time: "10:28:42", attempts: 1 },
                { event: "product.stock_updated", url: "https://api.cboom.in.th/webhooks/products", status: "ล้มเหลว", code: 500, time: "10:15:20", attempts: 3 },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-gray-50 p-3 text-xs dark:bg-white/5">
                  <div>
                    <p className="font-mono text-gray-600 dark:text-white/60">{log.event}</p>
                    <p className="text-[10px] text-gray-400">{log.time} · {log.attempts} attempts</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-[10px] ${log.code === 200 ? "text-green-500" : "text-red-500"}`}>{log.code}</span>
                    <StatusBadge status={log.status} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "api" && (
        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-green-500" />
              <p className="text-sm font-semibold">API Keys</p>
            </div>
            <div className="mt-4 space-y-2">
              {[
                { name: "Production Key", key: "cboom_prod_••••••••••••3f9a", created: "2026-01-15", lastUsed: "10 ก.ค. 10:32" },
                { name: "Sandbox Key", key: "cboom_test_••••••••••••a2b1", created: "2026-03-20", lastUsed: "09 ก.ค. 15:20" },
              ].map((apiKey, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="rounded-xl border border-gray-200/60 p-4 dark:border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold">{apiKey.name}</p>
                      <code className="text-[10px] text-gray-400">{apiKey.key}</code>
                    </div>
                    <button className="rounded-lg border border-gray-200/60 px-2.5 py-1 text-[10px] font-medium text-gray-500 hover:border-green-500/40 hover:text-green-500 dark:border-white/10 dark:text-white/50">
                      คัดลอก
                    </button>
                  </div>
                  <p className="mt-2 text-[10px] text-gray-400">สร้าง: {apiKey.created} · ใช้ล่าสุด: {apiKey.lastUsed}</p>
                </motion.div>
              ))}
            </div>
            <button className="mt-4 flex items-center gap-1.5 rounded-xl bg-green-500/10 px-3 py-2 text-xs font-medium text-green-500">
              <Plus className="h-3.5 w-3.5" /> สร้าง API Key
            </button>
          </Card>
          <Card delay={0.3}>
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-green-500" />
              <p className="text-sm font-semibold">REST API Documentation</p>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { method: "GET", endpoint: "/api/v1/orders", desc: "ดึงรายการออเดอร์ทั้งหมด" },
                { method: "POST", endpoint: "/api/v1/orders", desc: "สร้างออเดอร์ใหม่" },
                { method: "GET", endpoint: "/api/v1/products", desc: "ดึงรายการสินค้า" },
                { method: "PUT", endpoint: "/api/v1/products/:id/stock", desc: "อัปเดตสต๊อกสินค้า" },
                { method: "GET", endpoint: "/api/v1/customers", desc: "ดึงรายชื่อลูกค้า" },
                { method: "POST", endpoint: "/api/v1/invoices", desc: "สร้างใบแจ้งหนี้" },
              ].map((endpoint, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-white/5">
                  <span className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${
                    endpoint.method === "GET" ? "bg-blue-500/10 text-blue-500" :
                    endpoint.method === "POST" ? "bg-green-500/10 text-green-500" :
                    "bg-amber-500/10 text-amber-500"
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="flex-1 text-xs text-gray-600 dark:text-white/60">{endpoint.endpoint}</code>
                  <span className="text-[10px] text-gray-400">{endpoint.desc}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500">OAuth 2.0</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-white/5 dark:text-white/50">Rate Limit: 1000 req/hr</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-white/5 dark:text-white/50">OpenAPI 3.0</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
