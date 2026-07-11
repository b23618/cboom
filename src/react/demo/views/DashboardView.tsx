import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, ShoppingCart, DollarSign, PieChart, Wallet, Target,
  UserPlus, Clock, Sparkles, Brain, Package, Truck, CheckCircle2,
  AlertCircle, Leaf, Activity, ArrowUpRight, Zap, Users, Building2,
  Boxes, Store, BarChart3, Radio,
} from "lucide-react";
import {
  AnimatedCounter, KpiCard, Card, BarChart, LineChart, DonutChart,
  ProgressBar, StatusBadge, SectionHeader, MultiLineChart, RadialProgress,
} from "../ui";
import {
  kpiData, channelData, pipelineStages, reportData, aiInsights,
  dailySalesData, hourlySalesData, allOrders, allCustomers, allProducts,
  allEmployees, formatTHB,
} from "../data";

export default function DashboardView() {
  const [liveRevenue, setLiveRevenue] = useState(128450);
  const [liveOrders, setLiveOrders] = useState(342);

  // Simulate realtime counter
  useState(() => {
    const interval = setInterval(() => {
      setLiveRevenue(prev => prev + Math.floor(Math.random() * 2000) + 500);
      setLiveOrders(prev => prev + 1);
    }, 8000);
    return () => clearInterval(interval);
  });

  const executiveKPIs = [
    { label: "ยอดขายวันนี้", value: liveRevenue, prefix: "฿", change: 18.2, up: true, icon: TrendingUp, color: "text-green-500" },
    { label: "ออเดอร์วันนี้", value: liveOrders, prefix: "", change: 9.4, up: true, icon: ShoppingCart, color: "text-blue-500" },
    { label: "GMV", value: 1850000, prefix: "฿", change: 15.7, up: true, icon: DollarSign, color: "text-purple-500" },
    { label: "กำไรขั้นต้น", value: 642000, prefix: "฿", change: 12.3, up: true, icon: PieChart, color: "text-cyan-500" },
    { label: "กำไรสุทธิ", value: 385000, prefix: "฿", change: 8.1, up: true, icon: Wallet, color: "text-indigo-500" },
    { label: "ยอดขาย vs เป้าหมาย", value: 87, prefix: "", suffix: "%", change: 5.2, up: true, icon: Target, color: "text-amber-500" },
    { label: "Conversion Rate", value: 3.8, prefix: "", suffix: "%", change: 0.5, up: true, icon: Activity, color: "text-pink-500" },
    { label: "ลูกค้าใหม่", value: 87, prefix: "", change: 4.1, up: true, icon: UserPlus, color: "text-rose-500" },
    { label: "ลีดใหม่", value: 142, prefix: "", change: 12.5, up: true, icon: Sparkles, color: "text-teal-500" },
    { label: "รอดำเนินการ", value: 23, prefix: "", change: -12, up: false, icon: Clock, color: "text-orange-500" },
    { label: "สต๊อกรวม", value: 18420, prefix: "", change: 3.2, up: true, icon: Boxes, color: "text-lime-500" },
    { label: "POS ยอดวันนี้", value: 45600, prefix: "฿", change: 22.1, up: true, icon: Store, color: "text-emerald-500" },
  ];

  const warehouseStats = [
    { label: "คลังกรุงเทพ", stock: 8200, pct: 85, color: "bg-green-500" },
    { label: "คลังเชียงใหม่", stock: 3400, pct: 62, color: "bg-blue-500" },
    { label: "คลังสงขลา", stock: 2100, pct: 45, color: "bg-amber-500" },
    { label: "คลังขอนแก่น", stock: 2800, pct: 70, color: "bg-cyan-500" },
    { label: "คลังชลบุรี", stock: 1920, pct: 38, color: "bg-red-500" },
  ];

  const attendanceData = [
    { status: "มาทำงาน", count: 48, color: "bg-green-500" },
    { status: "ลา", count: 5, color: "bg-amber-500" },
    { status: "ออกงานนอก", count: 3, color: "bg-blue-500" },
  ];

  const recentOrders = allOrders.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Executive KPI Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {executiveKPIs.map((kpi, i) => (
          <KpiCard key={kpi.label} {...kpi} index={i} />
        ))}
      </div>

      {/* Revenue + Profit Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionHeader title="รายได้และกำไร (6 เดือน)" action={
            <span className="flex items-center gap-1.5 text-xs text-green-500">
              <Radio className="h-3 w-3 animate-pulse" /> Live
            </span>
          } />
          <MultiLineChart
            data={reportData}
            lines={[
              { key: "revenue", color: "#16a34a", name: "รายได้" },
              { key: "profit", color: "#3b82f6", name: "กำไร" },
            ]}
            height={240}
          />
        </Card>

        <Card>
          <SectionHeader title="ช่องทางขาย" />
          <DonutChart
            segments={channelData.map(c => ({ label: c.name, value: c.orders, color: c.color }))}
            size={180}
          />
        </Card>
      </div>

      {/* Daily Sales + Hourly */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <SectionHeader title="ยอดขายรายวัน (30 วัน)" />
          <LineChart data={dailySalesData} dataKey="revenue" height={200} color="#16a34a" />
        </Card>
        <Card>
          <SectionHeader title="ยอดขายรายชั่วโมงวันนี้" />
          <BarChart data={hourlySalesData} dataKey="amount" height={200} color="#3b82f6" />
        </Card>
      </div>

      {/* Sales Pipeline + Warehouse Status */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <SectionHeader title="Sales Pipeline" />
          <div className="space-y-3">
            {pipelineStages.map((stage, i) => (
              <div key={stage.stage}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium">{stage.stage}</span>
                  <span className="text-gray-400 dark:text-white/40">{stage.count} รายการ</span>
                </div>
                <ProgressBar pct={stage.pct} color={stage.color} delay={i * 0.1} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="สถานะคลังสินค้า" />
          <div className="space-y-3">
            {warehouseStats.map((w, i) => (
              <div key={w.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium">{w.label}</span>
                  <span className="text-gray-400 dark:text-white/40">{w.stock.toLocaleString()} ชิ้น</span>
                </div>
                <ProgressBar pct={w.pct} color={w.color} delay={i * 0.1} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <SectionHeader title="AI Insights" action={
          <span className="flex items-center gap-1 text-xs font-medium text-green-500">
            <Brain className="h-3.5 w-3.5" /> AI Powered
          </span>
        } />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {aiInsights.map((insight, i) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-gray-200/60 p-4 dark:border-white/10"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-white/50">{insight.title}</span>
                <Sparkles className="h-3.5 w-3.5 text-green-500" />
              </div>
              <p className="mt-2 text-lg font-bold text-green-500">{insight.value}</p>
              <p className="mt-1 text-[10px] leading-relaxed text-gray-400 dark:text-white/40">{insight.desc}</p>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Recent Orders + Employee Attendance */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionHeader title="ออเดอร์ล่าสุด" action={
            <span className="flex items-center gap-1 text-xs font-medium text-green-500">
              <Radio className="h-3 w-3 animate-pulse" /> Realtime
            </span>
          } />
          <div className="space-y-2">
            {recentOrders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between rounded-xl border border-gray-200/60 p-3 transition-colors hover:bg-gray-50/60 dark:border-white/5 dark:hover:bg-white/[0.02]"
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                    order.channel === "Shopee" ? "bg-orange-500/10 text-orange-500" :
                    order.channel === "TikTok Shop" ? "bg-pink-500/10 text-pink-500" :
                    "bg-blue-500/10 text-blue-500"
                  }`}>
                    {order.channel === "Shopee" ? "S" : order.channel === "TikTok Shop" ? "T" : "L"}
                  </span>
                  <div>
                    <p className="text-xs font-semibold">{order.id}</p>
                    <p className="text-[10px] text-gray-400 dark:text-white/40">{order.customer} · {order.items} ชิ้น</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold">{formatTHB(order.amount)}</span>
                  <StatusBadge status={order.status} />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="การเข้าทำงานวันนี้" />
          <div className="mb-4 flex items-center justify-center">
            <RadialProgress value={86} size={140} label="เข้าทำงาน" />
          </div>
          <div className="space-y-2">
            {attendanceData.map(item => (
              <div key={item.status} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                  <span className="text-gray-600 dark:text-white/60">{item.status}</span>
                </div>
                <span className="font-semibold">{item.count} คน</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Executive Summary */}
      <Card>
        <SectionHeader title="Executive Summary" action={
          <span className="rounded-lg bg-green-500/10 px-2 py-1 text-[10px] font-medium text-green-500">AI Generated</span>
        } />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-gray-400 dark:text-white/40">ยอดขายรวมเดือนนี้</p>
            <p className="mt-1 text-xl font-bold">
              <AnimatedCounter value={5200000} prefix="฿" />
            </p>
            <p className="mt-0.5 text-xs text-green-500">+22% จากเดือนที่แล้ว</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 dark:text-white/40">ลูกค้าทั้งหมด</p>
            <p className="mt-1 text-xl font-bold">
              <AnimatedCounter value={allCustomers.length} />
            </p>
            <p className="mt-0.5 text-xs text-green-500">+87 รายใหม่เดือนนี้</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 dark:text-white/40">สินค้าทั้งหมด</p>
            <p className="mt-1 text-xl font-bold">
              <AnimatedCounter value={allProducts.length} />
            </p>
            <p className="mt-0.5 text-xs text-gray-400 dark:text-white/40">{allProducts.filter(p => p.status === "ใกล้หมด").length} รายการใกล้หมด</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 dark:text-white/40">พนักงาน</p>
            <p className="mt-1 text-xl font-bold">
              <AnimatedCounter value={allEmployees.length} />
            </p>
            <p className="mt-0.5 text-xs text-green-500">{allEmployees.filter(e => e.status === "ทำงาน").length} คนทำงานวันนี้</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
