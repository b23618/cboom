import { motion } from "framer-motion";
import { Target, TrendingDown, Sun, Leaf } from "lucide-react";
import {
  KpiCard, Card, SectionHeader, ProgressBar, RadialProgress,
} from "../ui";
import { esgTargets, carbonKPIs } from "../esgData";

export default function TargetsView() {
  const kpis = [
    { label: "เป้าหมาย 2030", value: 30, prefix: "", suffix: "% ลดลง", change: 0, up: false, icon: Target, color: "text-green-500" },
    { label: "Net Zero 2050", value: 100, prefix: "", suffix: "% ลดลง", change: 0, up: false, icon: Leaf, color: "text-blue-500" },
    { label: "พลังงานหมุนเวียน 2030", value: 40, prefix: "", suffix: "%", change: 0, up: true, icon: Sun, color: "text-orange-500" },
    { label: "ความคืบหน้า", value: carbonKPIs.netZeroProgress, prefix: "", suffix: "%", change: 5.2, up: true, icon: TrendingDown, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi, i) => <KpiCard key={kpi.label} {...kpi} index={i} />)}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <SectionHeader title="Net Zero Progress" />
          <div className="flex flex-col items-center">
            <RadialProgress value={carbonKPIs.netZeroProgress} size={160} color="#16a34a" label="สู่ Net Zero" />
            <p className="mt-4 text-xs text-gray-400">เป้าหมาย: ลด 100% ภายในปี 2050</p>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <SectionHeader title="เป้าหมายการลดการปล่อย CO₂" />
          <div className="space-y-4">
            {esgTargets.map((target, i) => (
              <motion.div
                key={target.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-gray-200/60 p-4 dark:border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">{target.scope}</p>
                    <p className="text-[10px] text-gray-400">เป้าหมายปี {target.year}: ลด {target.target}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Baseline: {target.baseline.toLocaleString()} {target.unit}</p>
                    <p className="text-xs font-semibold text-green-500">ปัจจุบัน: {target.current.toLocaleString()} {target.unit}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-[10px]">
                    <span className="text-gray-400">ความคืบหน้า</span>
                    <span className="font-semibold">{target.progress.toFixed(1)}%</span>
                  </div>
                  <ProgressBar pct={target.progress} color="bg-green-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
