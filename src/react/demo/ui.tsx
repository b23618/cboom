import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight, ArrowDownRight, Search, Filter, Download,
  ChevronLeft, ChevronRight, ChevronDown, X, CheckCircle2,
  AlertCircle, Clock, Loader2, Inbox, MoreVertical, Eye, Edit, Trash2, Copy, Printer, Send, Plus, TrendingUp, Users, Maximize2, Brain,
} from "lucide-react";
import {
  ResponsiveContainer, LineChart as RLineChart, Line, AreaChart as RAreaChart, Area, BarChart as RBarChart, Bar,
  PieChart as RPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadialBarChart, RadialBar,
} from "recharts";
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender, type ColumnDef, type SortingState } from "@tanstack/react-table";

// ─── Animated Counter ─────────────────────────────────────────
export function AnimatedCounter({ value, prefix = "", suffix = "", duration = 1.5 }: { value: number; prefix?: string; suffix?: string; duration?: number }) {
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
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

// ─── Status Badge ─────────────────────────────────────────────
export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "ใหม่": "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    "จัดส่งแล้ว": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "รอชำระ": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "พร้อมขาย": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "ใกล้หมด": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "สินค้าหมด": "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
    "ปิดการขาย": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "เสนอราคา": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "ติดต่อแล้ว": "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400",
    "ลีดใหม่": "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    "ชำระแล้ว": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "ออกใบแจ้งหนี้แล้ว": "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    "เกินกำหนด": "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
    "อนุมัติแล้ว": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "รออนุมัติ": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "รับเข้าแล้ว": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "รอรับ": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "หยิบแล้ว": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "กำลังหยิบ": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "รอหยิบ": "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    "ทำเสร็จ": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "กำลังทำ": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "ต้องทำ": "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    "กำลังดำเนิน": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "ใกล้เสร็จ": "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400",
    "เริ่มต้น": "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    "เปิดใช้งาน": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "ปิดใช้งาน": "bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-white/40",
    "สำเร็จ": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "ล้มเหลว": "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
    "ทำงาน": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "ลาพัก": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "ลากิจ": "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400",
    "ปกติ": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "ใช้งาน": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "เชื่อมต่อแล้ว": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "สูง": "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
    "ปานกลาง": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "ต่ำ": "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    "จัดเตรียม": "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400",
    "รอตอบกลับ": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "ส่งแล้ว": "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    "อนุมัติ": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "ปฏิเสธ": "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
    "หมดอายุ": "bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-white/40",
    "ฉบับร่าง": "bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-white/40",
    "รอตรวจสอบ": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "คืนเงินแล้ว": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "รับคืนแล้ว": "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400",
    "เรียบร้อย": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "รอดำเนินการ": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "จ่ายแล้ว": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "รับแล้ว": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "รอยืนยัน": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "เปิดรับ": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "ปิดรับ": "bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-white/40",
    "รอสัมภาษณ์": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "เสร็จสิ้น": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "จัดแล้ว": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "กำลังอบรม": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "วางแผน": "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    "ตรง": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "เกิน": "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400",
    "ขาด": "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
    "รับเข้าบางส่วน": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "รับเข้าครบแล้ว": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "สั่งซื้อแล้ว": "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    "ดูแลหลังขาย": "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400",
    "ค้นหาลูกค้า": "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    "เจรจา": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "ได้รับ": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    "ออกงานนอก": "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400",
    "ลาป่วย": "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400",
  };
  return <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-white/50"}`}>{status}</span>;
}

// ─── KPI Card ─────────────────────────────────────────────────
export function KpiCard({ label, value, prefix, suffix, change, up, icon: Icon, color, index = 0 }: {
  label: string; value: number; prefix?: string; suffix?: string; change: number; up: boolean;
  icon: typeof TrendingUp; color: string; index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="rounded-2xl border border-gray-200/60 bg-white/70 p-4 transition-all hover:shadow-lg hover:shadow-gray-200/30 dark:border-white/10 dark:bg-white/5 dark:hover:shadow-black/20"
    >
      <div className="flex items-center justify-between">
        <span className={`flex h-8 w-8 items-center justify-center rounded-xl bg-green-500/10 ${color}`}>
          <Icon className="h-4 w-4" />
        </span>
        <span className={`flex items-center gap-0.5 text-xs font-semibold ${up ? "text-green-500" : "text-red-500"}`}>
          {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(change)}%
        </span>
      </div>
      <p className="mt-3 text-xs text-gray-500 dark:text-white/50">{label}</p>
      <p className="text-lg font-bold">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
      </p>
    </motion.div>
  );
}


// ─── Card ─────────────────────────────────────────────────────
export function Card({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`rounded-2xl border border-gray-200/60 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ─── Section Header ───────────────────────────────────────────
export function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <p className="text-sm font-semibold">{title}</p>
      {action}
    </div>
  );
}

// ─── Filter Bar ───────────────────────────────────────────────
export function FilterBar({ placeholder = "ค้นหา...", onSearch }: { placeholder?: string; onSearch?: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full rounded-xl border border-gray-200/60 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-green-500/40 dark:border-white/10 dark:bg-white/5"
        />
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-xl border border-gray-200/60 px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:border-green-500/40 hover:text-green-500 dark:border-white/10 dark:text-white/60"
      >
        <Filter className="h-3.5 w-3.5" /> กรอง
        <ChevronDown className="h-3 w-3" />
      </button>
      <button className="flex items-center gap-1.5 rounded-xl border border-gray-200/60 px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:border-green-500/40 hover:text-green-500 dark:border-white/10 dark:text-white/60">
        <Download className="h-3.5 w-3.5" /> Export
      </button>
    </div>
  );
}

// ─── DataTable ────────────────────────────────────────────────
export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  pageSize = 8,
  delay = 0.3,
}: {
  columns: { key: string; label: string; render?: (row: T) => ReactNode }[];
  data: T[];
  pageSize?: number;
  delay?: number;
}) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [page]);

  const totalPages = Math.ceil(data.length / pageSize);
  const paged = data.slice((page - 1) * pageSize, page * pageSize);

  if (data.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      {loading ? (
        <LoadingSkeleton rows={Math.min(pageSize, paged.length)} cols={columns.length} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200/60 dark:border-white/10">
                {columns.map((col) => (
                  <th key={col.key} className="pb-3 pr-4 font-semibold text-gray-500 dark:text-white/50 whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: delay + i * 0.05 }}
                  className="border-b border-gray-100/60 transition-colors hover:bg-gray-50/80 dark:border-white/5 dark:hover:bg-white/[0.02]"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="py-3 pr-4 whitespace-nowrap">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-400 dark:text-white/40">
            หน้า {page} จาก {totalPages} · {data.length} รายการ
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200/60 text-gray-500 transition-colors hover:border-green-500/40 hover:text-green-500 disabled:opacity-30 dark:border-white/10 dark:text-white/50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                  p === page
                    ? "bg-green-500/10 text-green-500"
                    : "text-gray-500 hover:bg-gray-100 dark:text-white/50 dark:hover:bg-white/5"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200/60 text-gray-500 transition-colors hover:border-green-500/40 hover:text-green-500 disabled:opacity-30 dark:border-white/10 dark:text-white/50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────
export function LoadingSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <div
              key={j}
              className="h-4 flex-1 animate-pulse rounded-lg bg-gray-200/60 dark:bg-white/5"
              style={{ animationDelay: `${i * 100 + j * 50}ms` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────
export function EmptyState({ message = "ยังไม่มีข้อมูล" }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-white/5">
        <Inbox className="h-8 w-8 text-gray-300 dark:text-white/20" />
      </span>
      <p className="mt-4 text-sm font-medium text-gray-400 dark:text-white/40">{message}</p>
      <p className="mt-1 text-xs text-gray-300 dark:text-white/30">ข้อมูลจะแสดงที่นี่เมื่อมีรายการ</p>
    </div>
  );
}

// ─── Recharts Bar Chart ───────────────────────────────────────
export function BarChart({ data, height = 160, labels, dataKey = "value", color = "#16a34a" }: { data: number[] | Record<string, any>[]; height?: number; labels?: string[]; dataKey?: string; color?: string }) {
  const chartData: Record<string, any>[] = Array.isArray(data) && data.length > 0 && typeof data[0] === "object"
    ? data as Record<string, any>[]
    : (data as number[]).map((v, i) => ({ name: labels?.[i] || `${i + 1}`, [dataKey]: v }));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RBarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.3} />
        <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }} />
        <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} />
      </RBarChart>
    </ResponsiveContainer>
  );
}

// ─── Recharts Area/Line Chart ────────────────────────────────
export function LineChart({ data, dataKey = "revenue", height = 200, color = "#16a34a", area = true }: { data: Record<string, any>[]; dataKey?: string; height?: number; color?: string; area?: boolean }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      {area ? (
        <RAreaChart data={data}>
          <defs>
            <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.25} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.3} />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v} />
          <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(v: number) => `฿${v.toLocaleString()}`} />
          <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#grad-${dataKey})`} />
        </RAreaChart>
      ) : (
        <RLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.3} />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v} />
          <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }} formatter={(v: number) => `฿${v.toLocaleString()}`} />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} />
        </RLineChart>
      )}
    </ResponsiveContainer>
  );
}

// ─── Recharts Donut/Pie Chart ────────────────────────────────
export function DonutChart({ segments, size = 160 }: { segments: { label: string; value: number; color: string }[]; size?: number }) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  const colorMap: Record<string, string> = { orange: "#f97316", pink: "#ec4899", blue: "#3b82f6", green: "#16a34a", purple: "#8b5cf6", cyan: "#06b6d4", amber: "#f59e0b", red: "#ef4444", indigo: "#6366f1", rose: "#f43f5e", yellow: "#eab308" };
  const resolveColor = (c: string) => c.startsWith("#") ? c : (colorMap[c.replace("bg-", "").replace("-500", "")] || "#6b7280");
  const chartData = segments.map(s => ({ name: s.label, value: s.value, fill: resolveColor(s.color) }));
  return (
    <div className="flex items-center gap-5">
      <ResponsiveContainer width={size} height={size}>
        <RPieChart>
          <Pie data={chartData} dataKey="value" innerRadius={size * 0.3} outerRadius={size * 0.45} paddingAngle={2}>
            {chartData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }} />
        </RPieChart>
      </ResponsiveContainer>
      <div className="space-y-2">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2 text-xs">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: resolveColor(seg.color) }} />
            <span className="text-gray-600 dark:text-white/60">{seg.label}</span>
            <span className="font-semibold">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────
export function ProgressBar({ pct, color = "bg-green-500", delay = 0 }: { pct: number; color?: string; delay?: number }) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-gray-200/60 dark:bg-white/10">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
      />
    </div>
  );
}

// ─── Sub Tabs ─────────────────────────────────────────────────
export function SubTabs({ tabs, active, onChange }: { tabs: { id: string; label: string; icon?: typeof Users }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto border-b border-gray-200/60 pb-2 dark:border-white/10">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              isActive
                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                : "text-gray-500 hover:bg-gray-100 dark:text-white/50 dark:hover:bg-white/5"
            }`}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}


// ─── Toast Notification ───────────────────────────────────────
export function Toast({ message, show }: { message: string; show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          className="fixed bottom-6 left-1/2 z-[70] flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-2xl dark:bg-white dark:text-gray-900"
        >
          <CheckCircle2 className="h-4 w-4 text-green-400 dark:text-green-600" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Action Button ────────────────────────────────────────────
export function ActionButton({ children, onClick, variant = "primary", icon: Icon }: {
  children: ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "ghost";
  icon?: typeof Plus;
}) {
  const styles = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "border border-gray-200/60 text-gray-600 hover:border-green-500/40 hover:text-green-500 dark:border-white/10 dark:text-white/60",
    ghost: "text-gray-500 hover:bg-gray-100 dark:text-white/50 dark:hover:bg-white/5",
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all ${styles[variant]}`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </button>
  );
}

// ─── Drawer (slide-in panel) ──────────────────────────────────
export function Drawer({ open, onClose, title, children, width = 480 }: {
  open: boolean; onClose: () => void; title: string; children: ReactNode; width?: number;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 overflow-y-auto border-l border-gray-200/60 bg-white p-6 dark:border-white/10 dark:bg-[#0d1410]"
            style={{ width }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">{title}</h3>
              <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5">
                <X className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Modal ────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children, size = "md" }: {
  open: boolean; onClose: () => void; title: string; children: ReactNode; size?: "sm" | "md" | "lg";
}) {
  const sizes = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl" };
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className={`w-full ${sizes[size]} rounded-2xl border border-gray-200/60 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0d1410]`}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold">{title}</h3>
                <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Action Menu (dropdown) ───────────────────────────────────
export function ActionMenu({ items }: { items: { label: string; icon?: typeof Eye; onClick?: () => void; danger?: boolean }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/5 dark:hover:text-white/60"
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
            className="absolute right-0 top-8 z-30 w-40 rounded-xl border border-gray-200/60 bg-white p-1.5 shadow-xl dark:border-white/10 dark:bg-[#0d1410]"
          >
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={i}
                  onClick={() => { item.onClick?.(); setOpen(false); }}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    item.danger
                      ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                      : "text-gray-600 hover:bg-gray-100 dark:text-white/60 dark:hover:bg-white/5"
                  }`}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Toast Container (multiple toasts) ────────────────────────
export function ToastContainer({ toasts, onDismiss }: {
  toasts: { id: string; title: string; type?: string }[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-6 right-6 z-[80] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-2xl dark:bg-white dark:text-gray-900"
          >
            {toast.type === "warning" ? (
              <AlertCircle className="h-4 w-4 text-amber-400" />
            ) : toast.type === "ai" ? (
              <Brain className="h-4 w-4 text-green-400" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-green-400 dark:text-green-600" />
            )}
            <span className="flex-1">{toast.title}</span>
            <button onClick={() => onDismiss(toast.id)} className="text-gray-400 hover:text-white dark:hover:text-gray-900">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Smart Table (TanStack Table powered) ─────────────────────
export function SmartTable<T extends Record<string, any>>({
  columns,
  data,
  pageSize = 10,
  searchable = true,
  searchKeys,
}: {
  columns: ColumnDef<T, any>[];
  data: T[];
  pageSize?: number;
  searchable?: boolean;
  searchKeys?: string[];
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  const filteredData = searchable && globalFilter && searchKeys
    ? data.filter(row => searchKeys.some(key => String(row[key] || "").toLowerCase().includes(globalFilter.toLowerCase())))
    : data;

  // Re-create table with filtered data
  const table2 = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  if (data.length === 0) return <EmptyState />;

  return (
    <div>
      {searchable && (
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="ค้นหา..."
            className="w-full rounded-xl border border-gray-200/60 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-green-500/40 dark:border-white/10 dark:bg-white/5"
          />
        </div>
      )}

      {loading ? (
        <LoadingSkeleton rows={pageSize} cols={columns.length} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              {table2.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-gray-200/60 dark:border-white/10">
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer select-none pb-3 pr-4 font-semibold text-gray-500 whitespace-nowrap dark:text-white/50 hover:text-green-500"
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() && (
                          <ChevronDown className={`h-3 w-3 transition-transform ${header.column.getIsSorted() === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table2.getRowModel().rows.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                  className="border-b border-gray-100/60 transition-colors hover:bg-gray-50/80 dark:border-white/5 dark:hover:bg-white/[0.02]"
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="py-3 pr-4 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-400 dark:text-white/40">
          หน้า {table2.getState().pagination.pageIndex + 1} จาก {table2.getPageCount()} · {filteredData.length} รายการ
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => table2.previousPage()}
            disabled={!table2.getCanPreviousPage()}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200/60 text-gray-500 transition-colors hover:border-green-500/40 hover:text-green-500 disabled:opacity-30 dark:border-white/10 dark:text-white/50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: Math.min(table2.getPageCount(), 5) }, (_, i) => i).map(p => (
            <button
              key={p}
              onClick={() => table2.setPageIndex(p)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                p === table2.getState().pagination.pageIndex
                  ? "bg-green-500/10 text-green-500"
                  : "text-gray-500 hover:bg-gray-100 dark:text-white/50 dark:hover:bg-white/5"
              }`}
            >
              {p + 1}
            </button>
          ))}
          <button
            onClick={() => table2.nextPage()}
            disabled={!table2.getCanNextPage()}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200/60 text-gray-500 transition-colors hover:border-green-500/40 hover:text-green-500 disabled:opacity-30 dark:border-white/10 dark:text-white/50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Multi-Line Chart (Recharts with multiple lines) ──────────
export function MultiLineChart({ data, lines, height = 200 }: {
  data: Record<string, any>[];
  lines: { key: string; color: string; name: string }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.3} />
        <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        {lines.map((line, i) => (
          <Line key={i} type="monotone" dataKey={line.key} stroke={line.color} strokeWidth={2} dot={false} name={line.name} />
        ))}
      </RLineChart>
    </ResponsiveContainer>
  );
}

// ─── Radial Progress Chart ────────────────────────────────────
export function RadialProgress({ value, size = 120, color = "#16a34a", label }: {
  value: number; size?: number; color?: string; label?: string;
}) {
  const data = [{ name: "progress", value, fill: color }];
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ResponsiveContainer width={size} height={size}>
        <RadialBarChart innerRadius={size * 0.35} outerRadius={size * 0.5} data={data} startAngle={90} endAngle={-270}>
          <RadialBar background dataKey="value" cornerRadius={10} fill={color} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold">{value}%</span>
        {label && <span className="text-[10px] text-gray-400 dark:text-white/40">{label}</span>}
      </div>
    </div>
  );
}
