import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Brain,
  FileBarChart,
  Bell,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  ShoppingCart,
  UserPlus,
  Clock,
  Sparkles,
  Package,
  Truck,
  CheckCircle2,
  AlertCircle,
  Brain as BrainIcon,
  Target,
  Filter,
  Download,
  ChevronRight,
} from "lucide-react";

// ─── Mock Data ───────────────────────────────────────────────
const kpiData = [
  { label: "ยอดขายวันนี้", value: 128450, prefix: "฿", change: 18.2, up: true, icon: TrendingUp, color: "text-green-500" },
  { label: "ออเดอร์วันนี้", value: 342, prefix: "", change: 9.4, up: true, icon: ShoppingCart, color: "text-blue-500" },
  { label: "ลูกค้าใหม่", value: 87, prefix: "", change: 4.1, up: true, icon: UserPlus, color: "text-purple-500" },
  { label: "รอดำเนินการ", value: 23, prefix: "", change: -12, up: false, icon: Clock, color: "text-orange-500" },
];

const channelData = [
  { name: "Shopee", orders: 156, pct: 46, color: "bg-orange-500" },
  { name: "TikTok Shop", orders: 112, pct: 33, color: "bg-pink-500" },
  { name: "Lazada", orders: 74, pct: 21, color: "bg-blue-500" },
];

const initialOrders = [
  { id: "SH-8821", channel: "Shopee", customer: "คุณสมชาย ใจดี", amount: 1850, status: "ใหม่", time: "1 นาทีที่แล้ว" },
  { id: "TT-4521", channel: "TikTok Shop", customer: "คุณสุดา รักไทย", amount: 2400, status: "จัดส่งแล้ว", time: "5 นาทีที่แล้ว" },
  { id: "LZ-3092", channel: "Lazada", customer: "บจก. สยามเทรด", amount: 15200, status: "รอชำระ", time: "12 นาทีที่แล้ว" },
  { id: "SH-8820", channel: "Shopee", customer: "คุณวิภา ส่งสินค้า", amount: 980, status: "ใหม่", time: "18 นาทีที่แล้ว" },
  { id: "TT-4520", channel: "TikTok Shop", customer: "คุณกิตติ พอเพียง", amount: 3200, status: "จัดส่งแล้ว", time: "25 นาทีที่แล้ว" },
];

const notifications = [
  { id: 1, title: "ออเดอร์ใหม่จาก Shopee #SH-8821", type: "order", time: "1 นาทีที่แล้ว" },
  { id: 2, title: "AI แนะนำเติมสต๊อก SKU-2291", type: "ai", time: "8 นาทีที่แล้ว" },
  { id: 3, title: "สต๊อกสินค้า SKU-1101 เหลือน้อย", type: "warning", time: "20 นาทีที่แล้ว" },
  { id: 4, title: "รายงานยอดขายรายสัปดาห์พร้อมแล้ว", type: "report", time: "1 ชั่วโมงที่แล้ว" },
];

const pipelineStages = [
  { stage: "ลีดใหม่", count: 142, pct: 100, color: "bg-blue-500" },
  { stage: "ติดต่อแล้ว", count: 98, pct: 69, color: "bg-cyan-500" },
  { stage: "เสนอราคา", count: 54, pct: 38, color: "bg-amber-500" },
  { stage: "ปิดการขาย", count: 31, pct: 22, color: "bg-green-500" },
];

const crmCustomers = [
  { name: "บจก. สยามเทรดดิ้ง", contact: "คุณสมชัย", stage: "เสนอราคา", value: "฿850,000", lastContact: "2 วันที่แล้ว" },
  { name: "ร้าน ก้าวหน้า คอมเมิร์ซ", contact: "คุณปนัดดา", stage: "ติดต่อแล้ว", value: "฿320,000", lastContact: "1 วันที่แล้ว" },
  { name: "โรงงาน ไทยพรีเมียม", contact: "คุณวิทยา", stage: "ปิดการขาย", value: "฿1,200,000", lastContact: "3 วันที่แล้ว" },
  { name: "Smart Retail Co.", contact: "คุณอนุชา", stage: "ลีดใหม่", value: "฿150,000", lastContact: "วันนี้" },
  { name: "แม่ค้าออนไลน์ ไทยแลนด์", contact: "คุณมาลี", stage: "เสนอราคา", value: "฿430,000", lastContact: "5 วันที่แล้ว" },
];

const marketplaceProducts = [
  { sku: "SKU-2291", name: "เสื้อยืด Cotton Premium", stock: 45, shopee: 18, tiktok: 12, lazada: 15, status: "พร้อมขาย" },
  { sku: "SKU-1101", name: "รองเท้าผ้าใบ Sport", stock: 8, shopee: 3, tiktok: 2, lazada: 3, status: "ใกล้หมด" },
  { sku: "SKU-3302", name: "กระเป๋าผ้า Canvas", stock: 120, shopee: 40, tiktok: 35, lazada: 45, status: "พร้อมขาย" },
  { sku: "SKU-4408", name: "หมวกแก๊ป UV Protect", stock: 0, shopee: 0, tiktok: 0, lazada: 0, status: "สินค้าหมด" },
  { sku: "SKU-5520", name: "เข็มขัดหนังแท้", stock: 67, shopee: 22, tiktok: 18, lazada: 27, status: "พร้อมขาย" },
];

const aiInsights = [
  { title: "พยากรณ์ยอดขาย", value: "+22%", desc: "สัปดาห์หน้า คาดว่ายอดขายเพิ่มขึ้น 22% จากเทรนด์ปัจจุบัน", icon: TrendingUp },
  { title: "สินค้าควรเติมสต๊อก", value: "5 รายการ", desc: "SKU-2291, SKU-1101 และอีก 3 รายการใกล้หมดสต๊อก", icon: Package },
  { title: "ลูกค้าเสี่ยงสูง", value: "3 ราย", desc: "ลูกค้าที่ไม่ได้สั่งซื้อนานกว่า 30 วัน ควรติดตาม", icon: AlertCircle },
  { title: "ช่องทางที่มีศักยภาพ", value: "TikTok Shop", desc: "การเติบโต 45% ในไตรมาสนี้ แนะนำเพิ่มงบโฆษณา", icon: Target },
];

const reportData = [
  { month: "ม.ค.", revenue: 3200000, orders: 8200 },
  { month: "ก.พ.", revenue: 3850000, orders: 9800 },
  { month: "มี.ค.", revenue: 4100000, orders: 10500 },
  { month: "เม.ย.", revenue: 3650000, orders: 9100 },
  { month: "พ.ค.", revenue: 4800000, orders: 12300 },
  { month: "มิ.ย.", revenue: 5200000, orders: 13800 },
];

// ─── Animated Counter ─────────────────────────────────────────
function AnimatedCounter({ value, prefix = "", duration = 1.5 }: { value: number; prefix?: string; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(value * eased);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  const formatted = display >= 1000 ? Math.floor(display).toLocaleString("en-US") : Math.floor(display).toString();
  return <span ref={ref}>{prefix}{formatted}</span>;
}

// ─── Animated Bar Chart ───────────────────────────────────────
function BarChart({ data, height = 120 }: { data: number[]; height?: number }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setAnimated(true), 100);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const max = Math.max(...data);
  return (
    <div ref={ref} className="flex items-end gap-1.5" style={{ height }}>
      {data.map((v, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-md bg-gradient-to-t from-green-600 to-green-400/70 dark:from-green-500 dark:to-green-300/70"
          initial={{ height: 0 }}
          animate={{ height: animated ? `${(v / max) * 100}%` : 0 }}
          transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// ─── Line Chart ───────────────────────────────────────────────
function LineChart({ data }: { data: { month: string; revenue: number }[] }) {
  const max = Math.max(...data.map((d) => d.revenue));
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d.revenue / max) * 80 - 10;
    return `${x},${y}`;
  });
  const pathD = `M ${points.join(" L ")}`;
  const areaD = `${pathD} L 100,100 L 0,100 Z`;

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full" style={{ height: 200 }}>
      <motion.path
        d={areaD}
        fill="url(#chartGradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      <motion.path
        d={pathD}
        fill="none"
        stroke="#16a34a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Status Badge ─────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "ใหม่": "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    "จัดส่งแล้ว": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "รอชำระ": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "พร้อมขาย": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "ใกล้หมด": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "สินค้าหมด": "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
  };
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] || ""}`}>{status}</span>;
}

// ─── KPI Card ─────────────────────────────────────────────────
function KpiCard({ kpi, index }: { kpi: typeof kpiData[0]; index: number }) {
  const Icon = kpi.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="rounded-2xl border border-gray-200/60 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
    >
      <div className="flex items-center justify-between">
        <span className={`flex h-8 w-8 items-center justify-center rounded-xl bg-green-500/10 ${kpi.color}`}>
          <Icon className="h-4 w-4" />
        </span>
        <span className={`flex items-center gap-0.5 text-xs font-semibold ${kpi.up ? "text-green-500" : "text-red-500"}`}>
          {kpi.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(kpi.change)}%
        </span>
      </div>
      <p className="mt-3 text-xs text-gray-500 dark:text-white/50">{kpi.label}</p>
      <p className="text-lg font-bold">
        <AnimatedCounter value={kpi.value} prefix={kpi.prefix} />
      </p>
    </motion.div>
  );
}

// ─── Views ────────────────────────────────────────────────────

function DashboardView() {
  const [bars, setBars] = useState([35, 52, 48, 72, 58, 88, 65, 92, 70, 85, 60, 78]);
  useEffect(() => {
    const interval = setInterval(() => {
      setBars((prev) => prev.map(() => 30 + Math.random() * 65));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-5">
      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpiData.map((kpi, i) => (
          <KpiCard key={kpi.label} kpi={kpi} index={i} />
        ))}
      </div>

      {/* Sales Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-2xl border border-gray-200/60 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">ยอดขาย 12 วัน</p>
          <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-500">
            <Sparkles className="h-3 w-3" /> AI Forecast
          </span>
        </div>
        <div className="mt-4">
          <BarChart data={bars} height={120} />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-gray-400 dark:text-white/40">
          <span>1 ม.ค.</span>
          <span>12 ม.ค.</span>
        </div>
      </motion.div>

      {/* Channels + Pipeline */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="rounded-2xl border border-gray-200/60 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5"
        >
          <p className="mb-3 text-sm font-semibold">ออเดอร์แยกตามช่องทาง</p>
          <div className="space-y-3">
            {channelData.map((ch, i) => (
              <div key={ch.name}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-gray-700 dark:text-white/70">{ch.name}</span>
                  <span className="text-gray-500 dark:text-white/50">{ch.orders} ออเดอร์</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-200/60 dark:bg-white/10">
                  <motion.div
                    className={`h-full rounded-full ${ch.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${ch.pct}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.15, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="rounded-2xl border border-gray-200/60 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5"
        >
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-green-500" />
            <p className="text-sm font-semibold">Sales Pipeline</p>
          </div>
          <div className="mt-4 space-y-3">
            {pipelineStages.map((stage, i) => (
              <div key={stage.stage}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-white/60">{stage.stage}</span>
                  <span className="font-semibold">{stage.count}</span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-gray-200/60 dark:bg-white/10">
                  <motion.div
                    className={`h-full rounded-full ${stage.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.pct}%` }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="rounded-2xl border border-green-500/30 bg-green-500/5 p-5"
      >
        <div className="flex items-center gap-2">
          <BrainIcon className="h-4 w-4 text-green-500" />
          <p className="text-sm font-semibold text-green-500">AI Insight</p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-white/70">
          ยอดขายคาดว่าจะเพิ่ม 22% ในสัปดาห์หน้า แนะนำเติมสต๊อกสินค้า 5 รายการ และเพิ่มงบโฆษณาใน TikTok Shop
        </p>
      </motion.div>
    </div>
  );
}

function CRMView() {
  return (
    <div className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        {[
          { label: "ลีดทั้งหมด", value: 142, icon: UserPlus, color: "text-blue-500" },
          { label: "กำลังเจรจา", value: 54, icon: Target, color: "text-amber-500" },
          { label: "ปิดการขาย", value: 31, icon: CheckCircle2, color: "text-green-500" },
          { label: "มูลค่า Pipeline", value: 8500000, prefix: "฿", icon: TrendingUp, color: "text-purple-500" },
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
              <p className="text-lg font-bold">
                <AnimatedCounter value={kpi.value} prefix={kpi.prefix || ""} />
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-2xl border border-gray-200/60 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold">รายชื่อลูกค้า</p>
          <button className="flex items-center gap-1 rounded-lg bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-500">
            <Filter className="h-3 w-3" /> กรอง
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200/60 dark:border-white/10">
                <th className="pb-3 pr-4 font-semibold text-gray-500 dark:text-white/50">บริษัท</th>
                <th className="pb-3 pr-4 font-semibold text-gray-500 dark:text-white/50">ผู้ติดต่อ</th>
                <th className="pb-3 pr-4 font-semibold text-gray-500 dark:text-white/50">สถานะ</th>
                <th className="pb-3 pr-4 font-semibold text-gray-500 dark:text-white/50">มูลค่า</th>
                <th className="pb-3 font-semibold text-gray-500 dark:text-white/50">ติดต่อล่าสุด</th>
              </tr>
            </thead>
            <tbody>
              {crmCustomers.map((c, i) => (
                <motion.tr
                  key={c.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                  className="border-b border-gray-100/60 dark:border-white/5"
                >
                  <td className="py-3 pr-4 font-medium">{c.name}</td>
                  <td className="py-3 pr-4 text-gray-600 dark:text-white/60">{c.contact}</td>
                  <td className="py-3 pr-4"><StatusBadge status={c.stage} /></td>
                  <td className="py-3 pr-4 font-semibold">{c.value}</td>
                  <td className="py-3 text-gray-500 dark:text-white/50">{c.lastContact}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

function MarketplaceView() {
  return (
    <div className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        {[
          { label: "สินค้าทั้งหมด", value: 1248, icon: Package, color: "text-blue-500" },
          { label: "พร้อมขาย", value: 1198, icon: CheckCircle2, color: "text-green-500" },
          { label: "ใกล้หมด", value: 42, icon: AlertCircle, color: "text-amber-500" },
          { label: "สินค้าหมด", value: 8, icon: X, color: "text-red-500" },
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-2xl border border-gray-200/60 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold">สต๊อกสินค้า</p>
          <button className="flex items-center gap-1 rounded-lg bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-500">
            <Download className="h-3 w-3" /> Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200/60 dark:border-white/10">
                <th className="pb-3 pr-4 font-semibold text-gray-500 dark:text-white/50">SKU</th>
                <th className="pb-3 pr-4 font-semibold text-gray-500 dark:text-white/50">สินค้า</th>
                <th className="pb-3 pr-4 font-semibold text-gray-500 dark:text-white/50">สต๊อกรวม</th>
                <th className="pb-3 pr-4 font-semibold text-gray-500 dark:text-white/50">Shopee</th>
                <th className="pb-3 pr-4 font-semibold text-gray-500 dark:text-white/50">TikTok</th>
                <th className="pb-3 pr-4 font-semibold text-gray-500 dark:text-white/50">Lazada</th>
                <th className="pb-3 font-semibold text-gray-500 dark:text-white/50">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {marketplaceProducts.map((p, i) => (
                <motion.tr
                  key={p.sku}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                  className="border-b border-gray-100/60 dark:border-white/5"
                >
                  <td className="py-3 pr-4 font-mono text-gray-500 dark:text-white/50">{p.sku}</td>
                  <td className="py-3 pr-4 font-medium">{p.name}</td>
                  <td className="py-3 pr-4 font-semibold">{p.stock}</td>
                  <td className="py-3 pr-4">{p.shopee}</td>
                  <td className="py-3 pr-4">{p.tiktok}</td>
                  <td className="py-3 pr-4">{p.lazada}</td>
                  <td className="py-3"><StatusBadge status={p.status} /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

function AIView() {
  return (
    <div className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-green-500/30 bg-green-500/5 p-5"
      >
        <div className="flex items-center gap-2">
          <BrainIcon className="h-5 w-5 text-green-500" />
          <p className="text-sm font-semibold text-green-500">AI Business Intelligence</p>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-white/60">
          วิเคราะห์ข้อมูลอัตโนมัติ พยากรณ์เทรนด์ และให้คำแนะนำเชิงปฏิบัติการสำหรับธุรกิจของคุณ
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {aiInsights.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-gray-200/60 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-2xl font-extrabold text-green-500">{insight.value}</span>
              </div>
              <h3 className="mt-4 text-sm font-bold">{insight.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-white/60">{insight.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ReportsView() {
  return (
    <div className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        {[
          { label: "ยอดขายรวม 6 เดือน", value: 24800000, prefix: "฿", icon: TrendingUp, color: "text-green-500" },
          { label: "ออเดอร์รวม", value: 63700, icon: ShoppingCart, color: "text-blue-500" },
          { label: "ยอดเฉลี่ย/ออเดอร์", value: 390, prefix: "฿", icon: Target, color: "text-purple-500" },
          { label: "ลูกค้าใหม่", value: 1240, icon: UserPlus, color: "text-amber-500" },
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
              <p className="text-lg font-bold">
                <AnimatedCounter value={kpi.value} prefix={kpi.prefix || ""} />
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-2xl border border-gray-200/60 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold">ยอดขายรายเดือน</p>
          <button className="flex items-center gap-1 rounded-lg bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-500">
            <Download className="h-3 w-3" /> Export PDF
          </button>
        </div>
        <LineChart data={reportData} />
        <div className="mt-2 flex justify-between text-[10px] text-gray-400 dark:text-white/40">
          {reportData.map((d) => (
            <span key={d.month}>{d.month}</span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="rounded-2xl border border-gray-200/60 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5"
      >
        <p className="mb-4 text-sm font-semibold">สรุปออเดอร์รายเดือน</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200/60 dark:border-white/10">
                <th className="pb-3 pr-4 font-semibold text-gray-500 dark:text-white/50">เดือน</th>
                <th className="pb-3 pr-4 font-semibold text-gray-500 dark:text-white/50">ยอดขาย</th>
                <th className="pb-3 pr-4 font-semibold text-gray-500 dark:text-white/50">ออเดอร์</th>
                <th className="pb-3 font-semibold text-gray-500 dark:text-white/50">เฉลี่ย/ออเดอร์</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((r, i) => (
                <motion.tr
                  key={r.month}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
                  className="border-b border-gray-100/60 dark:border-white/5"
                >
                  <td className="py-3 pr-4 font-medium">{r.month}</td>
                  <td className="py-3 pr-4 font-semibold">฿{r.revenue.toLocaleString("en-US")}</td>
                  <td className="py-3 pr-4">{r.orders.toLocaleString("en-US")}</td>
                  <td className="py-3">฿{Math.floor(r.revenue / r.orders).toLocaleString("en-US")}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Notification Item ────────────────────────────────────────
function NotificationItem({ notif, index }: { notif: typeof notifications[0]; index: number }) {
  const icons: Record<string, typeof Bell> = {
    order: ShoppingCart,
    ai: BrainIcon,
    warning: AlertCircle,
    report: FileBarChart,
  };
  const colors: Record<string, string> = {
    order: "bg-blue-500",
    ai: "bg-green-500",
    warning: "bg-amber-500",
    report: "bg-purple-500",
  };
  const Icon = icons[notif.type] || Bell;
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-gray-100/60 dark:hover:bg-white/5"
    >
      <span className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${colors[notif.type]} text-white`}>
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="flex-1">
        <p className="text-xs font-medium leading-snug">{notif.title}</p>
        <p className="mt-0.5 text-[10px] text-gray-400 dark:text-white/40">{notif.time}</p>
      </div>
    </motion.div>
  );
}

// ─── Order Feed Item ──────────────────────────────────────────
function OrderFeedItem({ order, index }: { order: typeof initialOrders[0]; index: number }) {
  const channelColors: Record<string, string> = {
    Shopee: "bg-orange-500",
    "TikTok Shop": "bg-pink-500",
    Lazada: "bg-blue-500",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="flex items-center justify-between rounded-xl border border-gray-100/60 bg-white/50 p-3 dark:border-white/5 dark:bg-white/[0.02]"
    >
      <div className="flex items-center gap-3">
        <span className={`h-2 w-2 rounded-full ${channelColors[order.channel] || "bg-gray-400"}`} />
        <div>
          <p className="text-xs font-semibold">{order.customer}</p>
          <p className="text-[10px] text-gray-400 dark:text-white/40">{order.id} · {order.channel} · {order.time}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs font-bold">฿{order.amount.toLocaleString("en-US")}</p>
        <StatusBadge status={order.status} />
      </div>
    </motion.div>
  );
}

// ─── Main Dashboard App ───────────────────────────────────────
export default function DashboardApp() {
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [orders, setOrders] = useState(initialOrders);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "crm", label: "CRM", icon: Users },
    { id: "marketplace", label: "Marketplace", icon: ShoppingBag },
    { id: "ai", label: "AI", icon: Brain },
    { id: "reports", label: "Reports", icon: FileBarChart },
  ];

  // Dark mode
  useEffect(() => {
    const stored = localStorage.getItem("cboom-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(stored === "dark" || (!stored && prefersDark));
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("cboom-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("cboom-theme", "light");
    }
  }, [isDark]);

  // Simulate realtime order feed
  useEffect(() => {
    const channels = ["Shopee", "TikTok Shop", "Lazada"];
    const customers = ["คุณสมชาย ใจดี", "คุณสุดา รักไทย", "บจก. สยามเทรด", "คุณวิภา ส่งสินค้า", "คุณกิตติ พอเพียง", "คุณมาลี ขายดี", "คุณอนุชา ออนไลน์"];
    const statuses = ["ใหม่", "รอชำระ", "จัดส่งแล้ว"];
    const prefixes: Record<string, string> = { Shopee: "SH", "TikTok Shop": "TT", Lazada: "LZ" };

    const interval = setInterval(() => {
      const ch = channels[Math.floor(Math.random() * channels.length)];
      const prefix = prefixes[ch];
      const num = Math.floor(Math.random() * 9000 + 1000);
      setOrders((prev) => [
        {
          id: `${prefix}-${num}`,
          channel: ch,
          customer: customers[Math.floor(Math.random() * customers.length)],
          amount: Math.floor(Math.random() * 15000 + 500),
          status: statuses[Math.floor(Math.random() * statuses.length)],
          time: "เมื่อสักครู่",
        },
        ...prev.slice(0, 6),
      ]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const views: Record<string, React.ReactNode> = {
    dashboard: <DashboardView />,
    crm: <CRMView />,
    marketplace: <MarketplaceView />,
    ai: <AIView />,
    reports: <ReportsView />,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900 dark:bg-[#0a0f0d] dark:text-white">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-gray-200/60 bg-white transition-transform dark:border-white/10 dark:bg-[#0d1410] lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200/60 px-5 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-600 text-white font-bold text-sm">C</div>
            <span className="font-extrabold tracking-tight">CBoom</span>
            <span className="rounded-md bg-green-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-green-500">Demo</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-1 p-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  active
                    ? "bg-green-500/10 text-green-600 dark:text-green-400"
                    : "text-gray-600 hover:bg-gray-100 dark:text-white/60 dark:hover:bg-white/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-green-500"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="border-t border-gray-200/60 p-4 dark:border-white/10">
          <a
            href="https://lin.ee/QVWxues"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-green-700"
          >
            เริ่มใช้งานจริง
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200/60 bg-white/80 px-4 backdrop-blur dark:border-white/10 dark:bg-[#0d1410]/80">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="ค้นหา..."
                className="w-48 rounded-xl border border-gray-200/60 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-green-500/40 dark:border-white/10 dark:bg-white/5"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDark(!isDark)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200/60 text-gray-600 transition-colors hover:border-green-500/40 hover:text-green-500 dark:border-white/10 dark:text-white/60"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gray-200/60 text-gray-600 transition-colors hover:border-green-500/40 hover:text-green-500 dark:border-white/10 dark:text-white/60"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 animate-pulse rounded-full bg-green-500" />
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-gray-200/60 bg-white p-2 shadow-2xl dark:border-white/10 dark:bg-[#0d1410]"
                    >
                      <p className="px-3 py-2 text-sm font-semibold">การแจ้งเตือน</p>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((n, i) => (
                          <NotificationItem key={n.id} notif={n} index={i} />
                        ))}
                      </div>
                      <button className="mt-1 w-full rounded-xl py-2 text-xs font-medium text-green-500 hover:bg-green-500/5">
                        ดูทั้งหมด
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-xs font-bold text-white">
              ท
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl p-4 sm:p-6">
            {/* Page Header */}
            <motion.div
              key={`header-${activeView}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 flex items-center justify-between"
            >
              <div>
                <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                  {menuItems.find((m) => m.id === activeView)?.label}
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-white/50">
                  {activeView === "dashboard" && "ภาพรวมธุรกิจของคุณวันนี้"}
                  {activeView === "crm" && "จัดการลูกค้าและงานขาย"}
                  {activeView === "marketplace" && "สต๊อกสินค้าและช่องทางการขาย"}
                  {activeView === "ai" && "วิเคราะห์และพยากรณ์ด้วย AI"}
                  {activeView === "reports" && "รายงานและสถิติยอดขาย"}
                </p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-500">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                Live Demo
              </span>
            </motion.div>

            {/* Active View */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {views[activeView]}
              </motion.div>
            </AnimatePresence>

            {/* Order Feed — always visible */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="mt-6 rounded-2xl border border-gray-200/60 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold">ออเดอร์ล่าสุด</p>
                <span className="flex items-center gap-1 text-xs text-green-500">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                  Realtime
                </span>
              </div>
              <div className="space-y-2">
                <AnimatePresence initial={false}>
                  {orders.map((order, i) => (
                    <OrderFeedItem key={order.id} order={order} index={i} />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Footer */}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-200/60 pt-6 text-xs text-gray-400 dark:border-white/10 dark:text-white/40 sm:flex-row">
              <p>CBoom Demo — ข้อมูลตัวอย่างสำหรับการสาธิต</p>
              <a href="/" className="font-medium text-green-500 hover:underline">← กลับหน้าหลัก</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
