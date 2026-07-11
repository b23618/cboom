import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileBarChart, ShoppingBag, Users, Package, ShoppingCart,
  Wallet, UserCheck, Brain, Download, FileText, FileSpreadsheet,
} from "lucide-react";
import { Card, DataTable, SubTabs, LineChart, BarChart, AnimatedCounter, ProgressBar } from "../ui";
import { reportData } from "../data";

const formatTHB = (n: number) => "฿" + n.toLocaleString("en-US");

export default function ReportsView() {
  const [tab, setTab] = useState("sales");

  const tabs = [
    { id: "sales", label: "รายงานยอดขาย", icon: FileBarChart },
    { id: "crm", label: "รายงาน CRM", icon: Users },
    { id: "marketplace", label: "รายงาน Marketplace", icon: ShoppingBag },
    { id: "warehouse", label: "รายงานคลังสินค้า", icon: Package },
    { id: "pos", label: "รายงาน POS", icon: ShoppingCart },
    { id: "accounting", label: "รายงานบัญชี", icon: Wallet },
    { id: "hr", label: "รายงาน HR", icon: UserCheck },
    { id: "ai", label: "AI Analytics", icon: Brain },
  ];

  return (
    <div className="space-y-5">
      {/* Export Buttons */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-white/50">เลือกประเภทรายงานและส่งออกได้ที่นี่</p>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-xl border border-gray-200/60 px-3 py-2 text-xs font-medium text-gray-600 transition-all hover:border-green-500/40 hover:text-green-500 dark:border-white/10 dark:text-white/60">
            <FileText className="h-3.5 w-3.5" /> Export PDF
          </button>
          <button className="flex items-center gap-1.5 rounded-xl border border-gray-200/60 px-3 py-2 text-xs font-medium text-gray-600 transition-all hover:border-green-500/40 hover:text-green-500 dark:border-white/10 dark:text-white/60">
            <FileSpreadsheet className="h-3.5 w-3.5" /> Export Excel
          </button>
          <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-green-700">
            <Download className="h-3.5 w-3.5" /> ดาวน์โหลด
          </button>
        </div>
      </div>

      <SubTabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === "sales" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { label: "ยอดขายรวม 6 เดือน", value: 24800000, prefix: "฿" },
              { label: "ออเดอร์รวม", value: 63700 },
              { label: "ยอดเฉลี่ย/ออเดอร์", value: 390, prefix: "฿" },
              { label: "ลูกค้าใหม่", value: 1240 },
            ].map((kpi, i) => (
              <Card key={i} delay={i * 0.1}>
                <p className="text-xs text-gray-500 dark:text-white/50">{kpi.label}</p>
                <p className="mt-2 text-lg font-bold"><AnimatedCounter value={kpi.value} prefix={kpi.prefix} /></p>
              </Card>
            ))}
          </div>
          <Card delay={0.3}>
            <p className="mb-4 text-sm font-semibold">ยอดขาย & กำไรรายเดือน</p>
            <LineChart data={reportData} dataKey="revenue" />
            <div className="mt-2 flex justify-between text-[10px] text-gray-400 dark:text-white/40">
              {reportData.map(d => <span key={d.month}>{d.month}</span>)}
            </div>
          </Card>
          <Card delay={0.4}>
            <p className="mb-4 text-sm font-semibold">ออเดอร์ & ลูกค้าใหม่รายเดือน</p>
            <BarChart data={reportData.map(d => d.orders)} height={120} labels={reportData.map(d => d.month)} />
          </Card>
          <Card delay={0.5}>
            <p className="mb-4 text-sm font-semibold">สรุปรายเดือน</p>
            <DataTable
              columns={[
                { key: "month", label: "เดือน", render: (r) => <span className="font-medium">{r.month}</span> },
                { key: "revenue", label: "ยอดขาย", render: (r) => <span className="font-semibold">{formatTHB(r.revenue)}</span> },
                { key: "orders", label: "ออเดอร์", render: (r) => <span>{r.orders.toLocaleString()}</span> },
                { key: "profit", label: "กำไร", render: (r) => <span className="text-green-500">{formatTHB(r.profit)}</span> },
                { key: "customers", label: "ลูกค้าใหม่" },
                { key: "avg", label: "เฉลี่ย/ออเดอร์", render: (r) => <span>{formatTHB(Math.floor(r.revenue / r.orders))}</span> },
              ]}
              data={reportData}
            />
          </Card>
        </div>
      )}

      {tab === "crm" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { label: "ลีดใหม่เดือนนี้", value: 142 },
              { label: "ปิดการขาย", value: 31 },
              { label: "Conversion Rate", value: 21.8, suffix: "%" },
              { label: "มูลค่าเฉลี่ย/ดีล", value: 274000, prefix: "฿" },
            ].map((kpi, i) => (
              <Card key={i} delay={i * 0.1}>
                <p className="text-xs text-gray-500 dark:text-white/50">{kpi.label}</p>
                <p className="mt-2 text-lg font-bold"><AnimatedCounter value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} /></p>
              </Card>
            ))}
          </div>
          <Card delay={0.3}>
            <p className="mb-4 text-sm font-semibold">Conversion Funnel</p>
            <div className="space-y-3">
              {[
                { stage: "ลีดใหม่", count: 142, pct: 100 },
                { stage: "ติดต่อแล้ว", count: 98, pct: 69 },
                { stage: "เสนอราคา", count: 54, pct: 38 },
                { stage: "ปิดการขาย", count: 31, pct: 22 },
              ].map((s, i) => (
                <div key={s.stage}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-white/60">{s.stage}</span>
                    <span className="font-semibold">{s.count} ({s.pct}%)</span>
                  </div>
                  <div className="mt-1.5"><ProgressBar pct={s.pct} delay={0.4 + i * 0.1} /></div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "marketplace" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {[
              { label: "Shopee ยอดขาย", value: 1148000, prefix: "฿", color: "text-orange-500" },
              { label: "TikTok Shop ยอดขาย", value: 825000, prefix: "฿", color: "text-pink-500" },
              { label: "Lazada ยอดขาย", value: 507000, prefix: "฿", color: "text-blue-500" },
            ].map((kpi, i) => (
              <Card key={i} delay={i * 0.1}>
                <p className="text-xs text-gray-500 dark:text-white/50">{kpi.label}</p>
                <p className={`mt-2 text-lg font-bold ${kpi.color}`}><AnimatedCounter value={kpi.value} prefix={kpi.prefix} /></p>
              </Card>
            ))}
          </div>
          <Card delay={0.3}>
            <p className="mb-4 text-sm font-semibold">ยอดขายแยกช่องทางรายเดือน</p>
            <BarChart data={[320, 280, 245, 295, 380, 410]} height={140} labels={reportData.map(d => d.month)} />
          </Card>
        </div>
      )}

      {tab === "warehouse" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { label: "มูลค่าสต๊อกรวม", value: 2850000, prefix: "฿" },
              { label: "สินค้าทั้งหมด", value: 1248 },
              { label: "อัตราหมุนเวียน", value: 4.2, suffix: "x" },
              { label: "สินค้าคงคลัง 90 วัน", value: 45820 },
            ].map((kpi, i) => (
              <Card key={i} delay={i * 0.1}>
                <p className="text-xs text-gray-500 dark:text-white/50">{kpi.label}</p>
                <p className="mt-2 text-lg font-bold"><AnimatedCounter value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} /></p>
              </Card>
            ))}
          </div>
          <Card delay={0.3}>
            <p className="mb-4 text-sm font-semibold">สต๊อกแยกคลังสินค้า</p>
            <DataTable
              columns={[
                { key: "warehouse", label: "คลัง" },
                { key: "items", label: "จำนวนชิ้น", render: (r) => <span className="font-semibold">{r.items.toLocaleString()}</span> },
                { key: "value", label: "มูลค่า", render: (r) => <span>{formatTHB(r.value)}</span> },
                { key: "utilization", label: "การใช้พื้นที่", render: (r) => (
                  <div className="flex items-center gap-2">
                    <span>{r.utilization}%</span>
                    <div className="w-20"><ProgressBar pct={r.utilization} color={r.utilization > 80 ? "bg-red-500" : r.utilization > 60 ? "bg-amber-500" : "bg-green-500"} /></div>
                  </div>
                ) },
              ]}
              data={[
                { warehouse: "คลังกรุงเทพ", items: 28400, value: 1680000, utilization: 78 },
                { warehouse: "คลังเชียงใหม่", items: 12500, value: 820000, utilization: 55 },
                { warehouse: "คลังสงขลา", items: 4920, value: 350000, utilization: 42 },
              ]}
            />
          </Card>
        </div>
      )}

      {tab === "pos" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { label: "ยอดขาย POS เดือนนี้", value: 1280000, prefix: "฿" },
              { label: "ออเดอร์ POS", value: 3400 },
              { label: "เฉลี่ย/ออเดอร์", value: 376, prefix: "฿" },
              { label: "สมาชิกใหม่", value: 87 },
            ].map((kpi, i) => (
              <Card key={i} delay={i * 0.1}>
                <p className="text-xs text-gray-500 dark:text-white/50">{kpi.label}</p>
                <p className="mt-2 text-lg font-bold"><AnimatedCounter value={kpi.value} prefix={kpi.prefix} /></p>
              </Card>
            ))}
          </div>
          <Card delay={0.3}>
            <p className="mb-4 text-sm font-semibold">ยอดขาย POS รายวัน · 7 วันล่าสุด</p>
            <BarChart data={[42, 55, 48, 62, 71, 58, 45]} height={140} labels={["จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"]} />
          </Card>
        </div>
      )}

      {tab === "accounting" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { label: "รายได้รวม", value: 24800000, prefix: "฿" },
              { label: "ค่าใช้จ่ายรวม", value: 18500000, prefix: "฿" },
              { label: "กำไรสุทธิ", value: 6300000, prefix: "฿" },
              { label: "VAT ที่ต้องชำระ", value: 441000, prefix: "฿" },
            ].map((kpi, i) => (
              <Card key={i} delay={i * 0.1}>
                <p className="text-xs text-gray-500 dark:text-white/50">{kpi.label}</p>
                <p className="mt-2 text-lg font-bold"><AnimatedCounter value={kpi.value} prefix={kpi.prefix} /></p>
              </Card>
            ))}
          </div>
          <Card delay={0.3}>
            <p className="mb-4 text-sm font-semibold">กำไรรายเดือน</p>
            <LineChart data={reportData} dataKey="profit" />
            <div className="mt-2 flex justify-between text-[10px] text-gray-400 dark:text-white/40">
              {reportData.map(d => <span key={d.month}>{d.month}</span>)}
            </div>
          </Card>
        </div>
      )}

      {tab === "hr" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { label: "พนักงานทั้งหมด", value: 32 },
              { label: "อัตราเข้างาน", value: 90.3, suffix: "%" },
              { label: "เงินเดือนรวม/เดือน", value: 1240000, prefix: "฿" },
              { label: "พนักงานใหม่ปีนี้", value: 5 },
            ].map((kpi, i) => (
              <Card key={i} delay={i * 0.1}>
                <p className="text-xs text-gray-500 dark:text-white/50">{kpi.label}</p>
                <p className="mt-2 text-lg font-bold"><AnimatedCounter value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} /></p>
              </Card>
            ))}
          </div>
          <Card delay={0.3}>
            <p className="mb-4 text-sm font-semibold">พนักงานแยกแผนก</p>
            <DataTable
              columns={[
                { key: "dept", label: "แผนก" },
                { key: "count", label: "จำนวน", render: (r) => <span className="font-semibold">{r.count}</span> },
                { key: "pct", label: "สัดส่วน", render: (r) => (
                  <div className="flex items-center gap-2">
                    <span>{r.pct}%</span>
                    <div className="w-20"><ProgressBar pct={r.pct} /></div>
                  </div>
                ) },
                { key: "budget", label: "งบประมาณ", render: (r) => <span>{formatTHB(r.budget)}</span> },
              ]}
              data={[
                { dept: "ฝ่ายขาย", count: 12, pct: 37.5, budget: 420000 },
                { dept: "คลังสินค้า", count: 8, pct: 25, budget: 240000 },
                { dept: "การตลาด", count: 5, pct: 15.6, budget: 180000 },
                { dept: "ไอที", count: 4, pct: 12.5, budget: 280000 },
                { dept: "บัญชี", count: 3, pct: 9.4, budget: 120000 },
              ]}
            />
          </Card>
        </div>
      )}

      {tab === "ai" && (
        <div className="space-y-4">
          <Card className="border-green-500/30 bg-green-500/5">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-green-500" />
              <p className="text-sm font-semibold text-green-500">AI Analytics Report</p>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-white/60">
              วิเคราะห์ข้อมูลอัตโนมัติด้วย AI พยากรณ์เทรนด์ และให้คำแนะนำเชิงปฏิบัติการ
            </p>
          </Card>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { title: "พยากรณ์ยอดขาย Q3", value: "+22%", desc: "คาดว่ายอดขาย Q3 2026 จะเพิ่มขึ้น 22% จาก Q2", accuracy: 94 },
              { title: "พยากรณ์สต๊อก", value: "5 รายการ", desc: "สินค้า 5 รายการจะหมดสต๊อกภายใน 7 วัน", accuracy: 88 },
              { title: "Customer Churn", value: "3 ราย", desc: "ลูกค้า 3 รายมีโอกาสเลิกใช้บริการสูง", accuracy: 82 },
              { title: "Best Channel Q3", value: "TikTok Shop", desc: "ช่องทางที่มีศักยภาพสูงสุดในไตรมาสนี้", accuracy: 91 },
            ].map((item, i) => (
              <Card key={i} delay={i * 0.1}>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold">{item.title}</p>
                  <span className="text-lg font-extrabold text-green-500">{item.value}</span>
                </div>
                <p className="mt-2 text-xs text-gray-600 dark:text-white/60">{item.desc}</p>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[10px] text-gray-400">
                    <span>ความแม่นยำ</span>
                    <span>{item.accuracy}%</span>
                  </div>
                  <div className="mt-1"><ProgressBar pct={item.accuracy} delay={0.3 + i * 0.1} /></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
