import { motion } from "framer-motion";
import {
  Leaf, TrendingDown, TrendingUp, Zap, Droplets, Recycle,
  Sun, Target, Factory, Truck, Building2, Radio, Brain, Sparkles,
} from "lucide-react";
import {
  AnimatedCounter, KpiCard, Card, SectionHeader, MultiLineChart,
  DonutChart, ProgressBar, RadialProgress,
} from "../ui";
import {
  carbonKPIs, monthlyCarbonData, scopeBreakdown, esgAIInsights,
  carbonByBranch, energyTrendData, formatCO2, formatTHB,
} from "../esgData";

export default function OverviewView() {
  const kpis = [
    { label: "การปล่อย CO₂ รวม", value: carbonKPIs.totalEmission, prefix: "", suffix: " tCO₂e", change: -14.0, up: false, icon: Leaf, color: "text-green-500" },
    { label: "เดือนนี้", value: carbonKPIs.currentMonth, prefix: "", suffix: " tCO₂e", change: -5.2, up: false, icon: TrendingDown, color: "text-blue-500" },
    { label: "ปีนี้ (YTD)", value: carbonKPIs.currentYear, prefix: "", suffix: " tCO₂e", change: -8.1, up: false, icon: Target, color: "text-purple-500" },
    { label: "Carbon Intensity", value: carbonKPIs.carbonIntensity, prefix: "", suffix: " tCO₂e/ล้านบาท", change: -12.3, up: false, icon: Factory, color: "text-amber-500" },
    { label: "พลังงานรวม", value: carbonKPIs.energyConsumption, prefix: "", suffix: " kWh", change: -3.5, up: false, icon: Zap, color: "text-cyan-500" },
    { label: "น้ำใช้รวม", value: carbonKPIs.waterConsumption, prefix: "", suffix: " m³", change: -2.1, up: false, icon: Droplets, color: "text-indigo-500" },
    { label: "ขยะรวม", value: carbonKPIs.wasteTotal, prefix: "", suffix: " kg", change: -8.5, up: false, icon: Recycle, color: "text-rose-500" },
    { label: "พลังงานหมุนเวียน", value: carbonKPIs.renewableEnergy, prefix: "", suffix: "%", change: 13.5, up: true, icon: Sun, color: "text-orange-500" },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {kpis.map((kpi, i) => (
          <KpiCard key={kpi.label} {...kpi} index={i} />
        ))}
      </div>

      {/* Net Zero Progress + Scope Breakdown */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <SectionHeader title="Net Zero Progress" action={
            <span className="flex items-center gap-1.5 text-xs text-green-500">
              <Radio className="h-3 w-3 animate-pulse" /> Live
            </span>
          } />
          <div className="flex flex-col items-center">
            <RadialProgress value={carbonKPIs.netZeroProgress} size={160} color="#16a34a" label="สู่ Net Zero 2050" />
            <div className="mt-4 w-full space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Baseline 2024</span>
                <span className="font-semibold">{carbonKPIs.baselineEmission.toLocaleString()} tCO₂e</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">ปัจจุบัน</span>
                <span className="font-semibold text-green-500">{carbonKPIs.totalEmission.toLocaleString()} tCO₂e</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">เป้าหมาย 2030</span>
                <span className="font-semibold text-amber-500">-{carbonKPIs.reductionTarget}%</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <SectionHeader title="การปล่อย CO₂ รายเดือน (Scope 1, 2, 3)" />
          <MultiLineChart
            data={monthlyCarbonData}
            lines={[
              { key: "scope1", color: "#ef4444", name: "Scope 1" },
              { key: "scope2", color: "#3b82f6", name: "Scope 2" },
              { key: "scope3", color: "#8b5cf6", name: "Scope 3" },
            ]}
            height={240}
          />
        </Card>
      </div>

      {/* Scope Breakdown + Carbon by Branch */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <SectionHeader title="สัดส่วนการปล่อย CO₂ ตาม Scope" />
          <DonutChart
            segments={scopeBreakdown.map(s => ({ label: s.name, value: Math.round(s.value), color: s.color }))}
            size={200}
          />
        </Card>

        <Card>
          <SectionHeader title="การปล่อย CO₂ รายสาขา" />
          <div className="space-y-3">
            {carbonByBranch.map((branch, i) => (
              <div key={branch.branch}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium">{branch.branch}</span>
                  <span className="text-gray-400">{branch.co2.toLocaleString()} tCO₂e ({branch.pct}%)</span>
                </div>
                <ProgressBar pct={branch.pct} color="bg-green-500" delay={i * 0.1} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <SectionHeader title="AI ESG Insights" action={
          <span className="flex items-center gap-1 text-xs font-medium text-green-500">
            <Brain className="h-3.5 w-3.5" /> AI Powered
          </span>
        } />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {esgAIInsights.map((insight, i) => (
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

      {/* Energy Trend */}
      <Card>
        <SectionHeader title="แนวโน้มการใช้พลังงานและพลังงานหมุนเวียน" />
        <MultiLineChart
          data={energyTrendData}
          lines={[
            { key: "electricity", color: "#3b82f6", name: "ไฟฟ้า (kWh)" },
            { key: "renewable", color: "#16a34a", name: "พลังงานหมุนเวียน (kWh)" },
          ]}
          height={200}
        />
      </Card>
    </div>
  );
}
