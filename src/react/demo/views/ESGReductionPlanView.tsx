import { motion } from "framer-motion";
import { Sun, Lightbulb, Zap, Recycle, Leaf, TrendingDown, Eye, Plus } from "lucide-react";
import {
  KpiCard, Card, DataTable, StatusBadge, SectionHeader,
  ActionMenu, ProgressBar,
} from "../ui";
import { reductionProjects, carbonKPIs, formatTHB } from "../esgData";

export default function ReductionPlanView() {
  const totalTarget = reductionProjects.reduce((s, p) => s + p.targetReduction, 0);
  const totalCurrent = reductionProjects.reduce((s, p) => s + p.currentReduction, 0);
  const totalBudget = reductionProjects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = reductionProjects.reduce((s, p) => s + p.spent, 0);

  const kpis = [
    { label: "เป้าลด CO₂", value: totalTarget, prefix: "", suffix: " tCO₂e", change: 0, up: false, icon: TrendingDown, color: "text-green-500" },
    { label: "ลดได้แล้ว", value: totalCurrent, prefix: "", suffix: " tCO₂e", change: 22.5, up: true, icon: Leaf, color: "text-blue-500" },
    { label: "งบประมาณ", value: totalBudget, prefix: "฿", change: 0, up: true, icon: Sun, color: "text-amber-500" },
    { label: "ใช้จ่ายแล้ว", value: totalSpent, prefix: "฿", change: 0, up: true, icon: Zap, color: "text-purple-500" },
  ];

  const categoryIcons: Record<string, typeof Sun> = {
    "พลังงานหมุนเวียน": Sun,
    "ประหยัดพลังงาน": Lightbulb,
    "ยานพาหนะ": Zap,
    "การจัดการน้ำ": Recycle,
    "การจัดการพลังงาน": Lightbulb,
    "การดูดซับคาร์บอน": Leaf,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi, i) => <KpiCard key={kpi.label} {...kpi} index={i} />)}
      </div>

      <Card>
        <SectionHeader title="แผนการลดการปล่อย CO₂" action={
          <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
            <Plus className="h-3.5 w-3.5" /> สร้างโครงการ
          </button>
        } />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {reductionProjects.map((project, i) => {
            const Icon = categoryIcons[project.category] || Sun;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-gray-200/60 p-4 dark:border-white/10"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                    <Icon className="h-4 w-4" />
                  </span>
                  <StatusBadge status={project.status} />
                </div>
                <p className="mt-3 text-sm font-semibold leading-snug">{project.name}</p>
                <p className="mt-1 text-[10px] text-gray-400">{project.category}</p>

                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-[10px]">
                    <span className="text-gray-400">ความคืบหน้า</span>
                    <span className="font-semibold">{project.progress}%</span>
                  </div>
                  <ProgressBar pct={project.progress} color={project.progress === 100 ? "bg-green-500" : "bg-blue-500"} />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-lg bg-gray-50 p-2 dark:bg-white/5">
                    <p className="text-sm font-bold text-green-500">{project.currentReduction}</p>
                    <p className="text-[10px] text-gray-400">ลดแล้ว (tCO₂e)</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2 dark:bg-white/5">
                    <p className="text-sm font-bold">{project.targetReduction}</p>
                    <p className="text-[10px] text-gray-400">เป้าหมาย</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400">
                  <span>งบ: {formatTHB(project.spent)}/{formatTHB(project.budget)}</span>
                  <span>{project.startDate} → {project.endDate}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
