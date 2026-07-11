import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Fuel, Droplets, Recycle, Plane, Truck, Package, FileText, Eye } from "lucide-react";
import { KpiCard, Card, DataTable, StatusBadge, SubTabs, SectionHeader, ActionMenu, ProgressBar } from "../ui";
import { scopeBreakdown, emissionFactors, formatCO2 } from "../esgData";

export default function EmissionSourcesView() {
  const [tab, setTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "ภาพรวม" },
    { id: "factors", label: "Emission Factors" },
  ];

  const sourceIcons: Record<string, typeof Zap> = {
    "ไฟฟ้า": Zap,
    "เชื้อเพลิง": Fuel,
    "น้ำ": Droplets,
    "ขยะ": Recycle,
    "การเดินทาง": Plane,
    "ขนส่ง": Truck,
    "ซัพพลายเออร์": Package,
  };

  const sourceKPIs = [
    { label: "แหล่งปล่อยทั้งหมด", value: 10, prefix: "", change: 0, up: true, icon: FileText, color: "text-blue-500" },
    { label: "Scope 1", value: 5, prefix: "", change: 0, up: true, icon: Fuel, color: "text-red-500" },
    { label: "Scope 2", value: 1, prefix: "", change: 0, up: true, icon: Zap, color: "text-blue-500" },
    { label: "Scope 3", value: 4, prefix: "", change: 0, up: true, icon: Truck, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {sourceKPIs.map((kpi, i) => (
          <KpiCard key={kpi.label} {...kpi} index={i} />
        ))}
      </div>

      <SubTabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === "overview" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scopeBreakdown.map((source, i) => {
            const Icon = sourceIcons[source.name.split(" - ")[0]] || FileText;
            return (
              <motion.div
                key={source.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card>
                  <div className="flex items-center justify-between">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl`} style={{ backgroundColor: `${source.color}15`, color: source.color }}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <StatusBadge status={source.name.includes("Scope 1") ? "สูง" : source.name.includes("Scope 2") ? "ปานกลาง" : "ต่ำ"} />
                  </div>
                  <p className="mt-3 text-sm font-semibold">{source.name}</p>
                  <p className="mt-2 text-2xl font-bold" style={{ color: source.color }}>{source.value.toLocaleString()} <span className="text-xs font-normal text-gray-400">tCO₂e</span></p>
                  <div className="mt-3">
                    <ProgressBar pct={Math.round((source.value / 4514.8) * 100)} color="bg-green-500" />
                  </div>
                  <p className="mt-2 text-[10px] text-gray-400">{((source.value / 4514.8) * 100).toFixed(1)}% ของการปล่อยทั้งหมด</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {tab === "factors" && (
        <Card>
          <SectionHeader title="Emission Factors (ค่าปริมาณการปล่อย)" />
          <DataTable
            columns={[
              { key: "source", label: "แหล่งปล่อย", render: (f) => <span className="font-medium">{f.source}</span> },
              { key: "factor", label: "ค่าปริมาณ", render: (f) => <span className="font-semibold">{f.factor}</span> },
              { key: "unit", label: "หน่วย", render: (f) => <span className="text-gray-400">{f.unit}</span> },
              { key: "scope", label: "Scope", render: (f) => <StatusBadge status={f.scope} /> },
            ]}
            data={emissionFactors}
            pageSize={15}
          />
        </Card>
      )}
    </div>
  );
}
