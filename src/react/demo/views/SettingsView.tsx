import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2, Users, Shield, Key, Bell, CreditCard,
  FileText, Lock, Plus, ChevronRight,
} from "lucide-react";
import { Card, DataTable, StatusBadge, SubTabs, FilterBar, AnimatedCounter } from "../ui";
import { settingsUsers, auditLogs } from "../data";

const formatTHB = (n: number) => "฿" + n.toLocaleString("en-US");

export default function SettingsView() {
  const [tab, setTab] = useState("company");

  const tabs = [
    { id: "company", label: "บริษัท", icon: Building2 },
    { id: "users", label: "ผู้ใช้", icon: Users },
    { id: "roles", label: "Roles & Permissions", icon: Shield },
    { id: "audit", label: "Audit Log", icon: FileText },
    { id: "security", label: "Security", icon: Lock },
    { id: "api", label: "API Keys", icon: Key },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <div className="space-y-5">
      <SubTabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === "company" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <p className="mb-4 text-sm font-semibold">ข้อมูลบริษัท</p>
            <div className="space-y-3">
              {[
                { label: "ชื่อบริษัท", value: "บจก. CBoom ซิสเท็มส์" },
                { label: "เลขประจำตัวผู้เสียภาษี", value: "0105562000000" },
                { label: "ที่อยู่", value: "123 ซอยสุขุมวิท 21 คลองตันเหนือ วัฒนา กรุงเทพมหานคร 10110" },
                { label: "โทรศัพท์", value: "02-123-4567" },
                { label: "อีเมล", value: "hello@cboom.in.th" },
                { label: "เว็บไซต์", value: "https://cboom.in.th" },
              ].map((field, i) => (
                <div key={i}>
                  <label className="text-[10px] font-medium text-gray-500 dark:text-white/50">{field.label}</label>
                  <input
                    type="text"
                    defaultValue={field.value}
                    className="mt-1 w-full rounded-xl border border-gray-200/60 bg-gray-50 px-3 py-2 text-xs outline-none focus:border-green-500/40 dark:border-white/10 dark:bg-white/5"
                  />
                </div>
              ))}
            </div>
            <button className="mt-4 rounded-xl bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-700">บันทึก</button>
          </Card>
          <Card delay={0.1}>
            <p className="mb-4 text-sm font-semibold">โลโก้ & การแสดงผล</p>
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-green-600 text-2xl font-bold text-white">C</div>
              <div>
                <button className="rounded-xl border border-gray-200/60 px-3 py-2 text-xs font-medium text-gray-600 hover:border-green-500/40 dark:border-white/10 dark:text-white/60">เปลี่ยนโลโก้</button>
                <p className="mt-2 text-[10px] text-gray-400">แนะนำขนาด 256×256px · PNG/SVG</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div>
                <label className="text-[10px] font-medium text-gray-500 dark:text-white/50">สีหลัก (Primary Color)</label>
                <div className="mt-1 flex gap-2">
                  {["#16a34a", "#3b82f6", "#8b5cf6", "#f97316", "#ec4899"].map(color => (
                    <button key={color} className={`h-8 w-8 rounded-lg ${color === "#16a34a" ? "ring-2 ring-offset-2 ring-green-500" : ""}`} style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-medium text-gray-500 dark:text-white/50">โซนเวลา</label>
                <select className="mt-1 w-full rounded-xl border border-gray-200/60 bg-gray-50 px-3 py-2 text-xs outline-none focus:border-green-500/40 dark:border-white/10 dark:bg-white/5">
                  <option>Asia/Bangkok (GMT+7)</option>
                  <option>Asia/Singapore (GMT+8)</option>
                  <option>UTC</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-medium text-gray-500 dark:text-white/50">สกุลเงิน</label>
                <select className="mt-1 w-full rounded-xl border border-gray-200/60 bg-gray-50 px-3 py-2 text-xs outline-none focus:border-green-500/40 dark:border-white/10 dark:bg-white/5">
                  <option>THB - บาทไทย</option>
                  <option>USD - ดอลลาร์สหรัฐ</option>
                  <option>SGD - ดอลลาร์สิงคโปร์</option>
                </select>
              </div>
            </div>
          </Card>
        </div>
      )}

      {tab === "users" && (
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <FilterBar placeholder="ค้นหาผู้ใช้..." />
          </div>
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (r) => <span className="font-mono text-gray-400">{r.id}</span> },
              { key: "name", label: "ชื่อ", render: (r) => (
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-[10px] font-bold text-white">
                    {r.name.charAt(5)}
                  </span>
                  <span className="font-medium">{r.name}</span>
                </div>
              ) },
              { key: "email", label: "อีเมล" },
              { key: "role", label: "Role", render: (r) => (
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  r.role === "Admin" ? "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400" :
                  r.role === "Manager" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400" :
                  "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400"
                }`}>{r.role}</span>
              ) },
              { key: "lastLogin", label: "เข้าระบบล่าสุด" },
              { key: "status", label: "สถานะ", render: (r) => <StatusBadge status={r.status} /> },
            ]}
            data={settingsUsers}
          />
        </Card>
      )}

      {tab === "roles" && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { role: "Admin", users: 1, color: "bg-red-500", permissions: ["ทั้งหมด"] },
            { role: "Manager", users: 2, color: "bg-amber-500", permissions: ["ดูได้ทุกโมดูล", "แก้ไขได้", "ไม่ลบบริษัท"] },
            { role: "Sales", users: 12, color: "bg-blue-500", permissions: ["CRM", "Marketplace", "POS"] },
            { role: "Accountant", users: 3, color: "bg-purple-500", permissions: ["Accounting", "Reports"] },
            { role: "Staff", users: 8, color: "bg-gray-500", permissions: ["Warehouse", "POS"] },
            { role: "Viewer", users: 6, color: "bg-cyan-500", permissions: ["ดูได้ทุกโมดูล"] },
          ].map((role, i) => (
            <motion.div
              key={role.role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-gray-200/60 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${role.color} text-white`}>
                  <Shield className="h-5 w-5" />
                </span>
                <span className="text-lg font-bold">{role.users}</span>
              </div>
              <h3 className="mt-3 text-sm font-bold">{role.role}</h3>
              <p className="mt-1 text-[10px] text-gray-500 dark:text-white/50">{role.users} ผู้ใช้</p>
              <div className="mt-3 space-y-1">
                {role.permissions.map(p => (
                  <p key={p} className="text-[10px] text-gray-600 dark:text-white/60">• {p}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "audit" && (
        <Card>
          <div className="mb-4"><FilterBar placeholder="ค้นหา Audit Log..." /></div>
          <DataTable
            columns={[
              { key: "id", label: "ID", render: (r) => <span className="font-mono text-gray-400">{r.id}</span> },
              { key: "user", label: "ผู้ใช้" },
              { key: "action", label: "การกระทำ" },
              { key: "module", label: "โมดูล" },
              { key: "ip", label: "IP Address", render: (r) => <span className="font-mono text-gray-400">{r.ip}</span> },
              { key: "time", label: "เวลา" },
            ]}
            data={auditLogs}
          />
        </Card>
      )}

      {tab === "security" && (
        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-green-500" />
              <p className="text-sm font-semibold">Security Settings</p>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { label: "2FA Authentication", desc: "บังคับใช้ 2FA สำหรับผู้ใช้ทุกคน", enabled: true },
                { label: "IP Whitelist", desc: "อนุญาตเฉพาะ IP ที่กำหนด", enabled: false },
                { label: "Session Timeout", desc: "ออกจากระบบอัตโนมัติหลัง 30 นาที", enabled: true },
                { label: "Password Policy", desc: "รหัสผ่านขั้นต่ำ 12 ตัวอักษร มีตัวเลขและสัญลักษณ์", enabled: true },
                { label: "Login Alert", desc: "แจ้งเตือนเมื่อมีการเข้าระบบจากอุปกรณ์ใหม่", enabled: true },
              ].map((setting, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="flex items-center justify-between rounded-xl border border-gray-200/60 p-3 dark:border-white/10"
                >
                  <div>
                    <p className="text-xs font-medium">{setting.label}</p>
                    <p className="text-[10px] text-gray-400">{setting.desc}</p>
                  </div>
                  <div className={`relative h-6 w-11 rounded-full transition-colors ${setting.enabled ? "bg-green-500" : "bg-gray-300 dark:bg-white/10"}`}>
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow ${setting.enabled ? "left-[22px]" : "left-0.5"}`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "api" && (
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">API Keys</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-white/50">สำหรับเชื่อมต่อระบบภายนอกผ่าน REST API</p>
            </div>
            <button className="flex items-center gap-1.5 rounded-xl bg-green-500/10 px-3 py-2 text-xs font-medium text-green-500">
              <Plus className="h-3.5 w-3.5" /> สร้าง Key
            </button>
          </div>
          <div className="mt-4 space-y-2">
            {[
              { name: "Production", key: "cboom_prod_••••••••••••3f9a", created: "2026-01-15", requests: 125000 },
              { name: "Sandbox", key: "cboom_test_••••••••••••a2b1", created: "2026-03-20", requests: 8500 },
            ].map((apiKey, i) => (
              <div key={i} className="rounded-xl border border-gray-200/60 p-4 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold">{apiKey.name}</p>
                    <code className="text-[10px] text-gray-400">{apiKey.key}</code>
                  </div>
                  <button className="rounded-lg border border-gray-200/60 px-2.5 py-1 text-[10px] font-medium text-gray-500 hover:border-green-500/40 hover:text-green-500 dark:border-white/10 dark:text-white/50">คัดลอก</button>
                </div>
                <p className="mt-2 text-[10px] text-gray-400">สร้าง: {apiKey.created} · {apiKey.requests.toLocaleString()} requests</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === "notifications" && (
        <Card>
          <p className="mb-4 text-sm font-semibold">การแจ้งเตือน</p>
          <div className="space-y-3">
            {[
              { label: "ออเดอร์ใหม่", desc: "แจ้งเตือนเมื่อมีออเดอร์ใหม่", email: true, line: true, push: true },
              { label: "สต๊อกต่ำ", desc: "แจ้งเตือนเมื่อสต๊อกใกล้หมด", email: true, line: true, push: false },
              { label: "ใบแจ้งหนี้เกินกำหนด", desc: "แจ้งเตือนเมื่อลูกหนี้เกินกำหนดชำระ", email: true, line: false, push: true },
              { label: "รายงานประจำวัน", desc: "ส่งรายงานสรุปทุกเช้า 08:00", email: true, line: false, push: false },
              { label: "AI Insights", desc: "แจ้งเตือนคำแนะนำจาก AI", email: false, line: true, push: true },
            ].map((notif, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="flex items-center justify-between rounded-xl border border-gray-200/60 p-3 dark:border-white/10"
              >
                <div>
                  <p className="text-xs font-medium">{notif.label}</p>
                  <p className="text-[10px] text-gray-400">{notif.desc}</p>
                </div>
                <div className="flex items-center gap-3">
                  {[
                    { key: "email", label: "Email", enabled: notif.email },
                    { key: "line", label: "LINE", enabled: notif.line },
                    { key: "push", label: "Push", enabled: notif.push },
                  ].map(ch => (
                    <div key={ch.key} className="flex items-center gap-1">
                      <span className="text-[10px] text-gray-400">{ch.label}</span>
                      <div className={`relative h-5 w-9 rounded-full transition-colors ${ch.enabled ? "bg-green-500" : "bg-gray-300 dark:bg-white/10"}`}>
                        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow ${ch.enabled ? "left-[18px]" : "left-0.5"}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {tab === "billing" && (
        <div className="space-y-4">
          <Card className="border-green-500/30 bg-green-500/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-green-500">แพ็คเกจปัจจุบัน: Business Pro</p>
                <p className="mt-1 text-xs text-gray-600 dark:text-white/60">฿4,900/เดือน · ผู้ใช้ไม่จำกัด · ครบทุกโมดูล</p>
              </div>
              <button className="rounded-xl bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-700">อัปเกรด</button>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { label: "ใช้จ่ายเดือนนี้", value: 4900, prefix: "฿" },
              { label: "ผู้ใช้", value: 32 },
              { label: "ออเดอร์ API", value: 125000 },
              { label: "พื้นที่จัดเก็บ", value: 8.4, suffix: " GB" },
            ].map((kpi, i) => (
              <Card key={i} delay={i * 0.1}>
                <p className="text-xs text-gray-500 dark:text-white/50">{kpi.label}</p>
                <p className="mt-2 text-lg font-bold"><AnimatedCounter value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} /></p>
              </Card>
            ))}
          </div>
          <Card delay={0.3}>
            <p className="mb-4 text-sm font-semibold">ประวัติการชำระ</p>
            <DataTable
              columns={[
                { key: "id", label: "เลขที่", render: (r) => <span className="font-mono text-gray-400">{r.id}</span> },
                { key: "date", label: "วันที่" },
                { key: "plan", label: "แพ็คเกจ" },
                { key: "amount", label: "จำนวน", render: (r) => <span className="font-semibold">{formatTHB(r.amount)}</span> },
                { key: "method", label: "การชำระ" },
                { key: "status", label: "สถานะ", render: (r) => <StatusBadge status={r.status} /> },
              ]}
              data={[
                { id: "BILL-2026-07", date: "2026-07-01", plan: "Business Pro", amount: 4900, method: "บัตรเครดิต •••• 4242", status: "ชำระแล้ว" },
                { id: "BILL-2026-06", date: "2026-06-01", plan: "Business Pro", amount: 4900, method: "บัตรเครดิต •••• 4242", status: "ชำระแล้ว" },
                { id: "BILL-2026-05", date: "2026-05-01", plan: "Business Pro", amount: 4900, method: "บัตรเครดิต •••• 4242", status: "ชำระแล้ว" },
                { id: "BILL-2026-04", date: "2026-04-01", plan: "Business", amount: 2900, method: "บัตรเครดิต •••• 4242", status: "ชำระแล้ว" },
              ]}
            />
          </Card>
        </div>
      )}
    </div>
  );
}
