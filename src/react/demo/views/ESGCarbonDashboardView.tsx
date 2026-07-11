import { motion } from "framer-motion";
import { Leaf, TrendingDown, Factory, Building2, Truck, Radio } from "lucide-react";
import {
  KpiCard, Card, SectionHeader, MultiLineChart, DonutChart,
  ProgressBar, BarChart, StatusBadge,
} from "../ui";
import {
  carbonKPIs, monthlyCarbonData, yearlyCarbonData, scopeBreakdown,
  carbonByDepartment, carbonByBranch, energyTrendData,
} from "../esgData";

export default function CarbonDashboardView() {
  const scopeKPIs = [
    { label: "Scope 1 (Direct)", value: carbonKPIs.scope1, prefix: "", suffix: " tCO₂e", change: -12.2, up: false, icon: Factory, color: "text-red-500" },
    { label: "Scope 2 (Electricity)", value: carbonKPIs.scope2, prefix: "", suffix: " tCO₂e", change: -15.4, up: false, icon: Building2, color: "text-blue-500" },
    { label: "Scope 3 (Other)", value: carbonKPIs.scope3, prefix: "", suffix: " tCO₂e", change: -14.5, up: false, icon: Truck, color: "text-purple-500" },
    { label: "Carbon Intensity", value: carbonKPIs.carbonIntensity, prefix: "", suffix: " tCO₂e/ล้านบาท", change: -12.3, up: false, icon: Leaf, color: "text-green-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {scopeKPIs.map((kpi, i) => (
          <KpiCard key={kpi.label} {...kpi} index={i} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionHeader title="การปล่อย CO₂ รายเดือน" action={
            <span className="flex items-center gap-1.5 text-xs text-green-500">
              <Radio className="h-3 w-3 animate-pulse" /> Live
            </span>
          } />
          <MultiLineChart
            data={monthlyCarbonData}
            lines={[
              { key: "scope1", color: "#ef4444", name: "Scope 1" },
              { key: "scope2", color: "#3b82f6", name: "Scope 2" },
              { key: "scope3", color: "#8b5cf6", name: "Scope 3" },
              { key: "total", color: "#16a34a", name: "รวม" },
            ]}
            height={260}
          />
        </Card>

        <Card>
          <SectionHeader title="สัดส่วน Scope" />
          <DonutChart
            segments={scopeBreakdown.map(s => ({ label: s.name, value: Math.round(s.value), color: s.color }))}
            size={200}
          />
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <SectionHeader title="การปล่อย CO₂ รายปี (5 ปี)" />
          <MultiLineChart
            data={yearlyCarbonData}
            lines={[
              { key: "scope1", color: "#ef4444", name: "Scope 1" },
              { key: "scope2", color: "#3b82f6", name: "Scope 2" },
              { key: "scope3", color: "#8b5cf6", name: "Scope 3" },
            ]}
            height={220}
          />
        </Card>

        <Card>
          <SectionHeader title="การปล่อย CO₂ รายแผนก" />
          <div className="space-y-3">
            {carbonByDepartment.map((dept, i) => (
              <div key={dept.dept}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium">{dept.dept}</span>
                  <span className="text-gray-400">{dept.co2.toLocaleString()} tCO₂e</span>
                </div>
                <ProgressBar pct={dept.pct} color="bg-green-500" delay={i * 0.1} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <SectionHeader title="การปล่อย CO₂ รายสาขา" />
        <BarChart
          data={carbonByBranch.map(b => b.co2)}
          labels={carbonByBranch.map(b => b.branch.replace("โรงงาน", "โรงงาน\n").replace("สำนักงานใหญ่ ", ""))}
          dataKey="co2"
          height={200}
          color="#16a34a"
        />
      </Card>

      <Card>
        <SectionHeader title="แนวโน้มพลังงานและต้นทุน" />
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
