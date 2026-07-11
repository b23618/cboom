import { useState } from "react";
import { motion } from "framer-motion";
import { Fuel, TrendingDown, DollarSign, Eye, Plus } from "lucide-react";
import {
  KpiCard, Card, DataTable, StatusBadge, SubTabs, FilterBar,
  SectionHeader, ActionMenu, BarChart, DonutChart,
} from "../ui";
import { fuelTypes, fuelRecords, formatTHB } from "../esgData";

export default function FuelView() {
  const [tab, setTab] = useState("records");
  const [search, setSearch] = useState("");

  const tabs = [
    { id: "records", label: "บันทึกเชื้อเพลิง" },
    { id: "summary", label: "สรุปรายประเภท" },
  ];

  const filtered = fuelRecords.filter(r =>
    r.branch.toLowerCase().includes(search.toLowerCase()) ||
    r.fuelType.toLowerCase().includes(search.toLowerCase())
  );

  const totalCO2 = fuelTypes.reduce((s, f) => s + f.co2, 0);
  const totalCost = fuelTypes.reduce((s, f) => s + f.cost, 0);
  const totalUsage = fuelTypes.reduce((s, f) => s + f.totalUsage, 0);

  const kpis = [
    { label: "เชื้อเพลิงรวม", value: totalUsage, prefix: "", suffix: " ลิตร", change: -5.2, up: false, icon: Fuel, color: "text-orange-500" },
    { label: "CO₂ จากเชื้อเพลิง", value: Math.round(totalCO2 * 10) / 10, prefix: "", suffix: " tCO₂e", change: -5.2, up: false, icon: TrendingDown, color: "text-red-500" },
    { label: "ค่าเชื้อเพลิง", value: totalCost, prefix: "฿", change: -3.1, up: false, icon: DollarSign, color: "text-amber-500" },
    { label: "ประเภทเชื้อเพลิง", value: fuelTypes.length, prefix: "", change: 0, up: true, icon: Fuel, color: "text-blue-500" },
  ];

  const fuelColors: Record<string, string> = {
    "ดีเซล": "#ef4444",
    "เบนซิน 95": "#3b82f6",
    "LPG": "#eab308",
    "ก๊าซธรรมชาติ": "#16a34a",
    "น้ำมันเตา": "#8b5cf6",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <KpiCard key={kpi.label} {...kpi} index={i} />
        ))}
      </div>

      <SubTabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === "records" && (
        <>
          <FilterBar placeholder="ค้นหา..." onSearch={setSearch} />
          <Card>
            <SectionHeader title={`บันทึกเชื้อเพลิง (${filtered.length} ราย)`} action={
              <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
                <Plus className="h-3.5 w-3.5" /> บันทึกใหม่
              </button>
            } />
            <DataTable
              columns={[
                { key: "id", label: "รหัส", render: (r) => <span className="font-mono text-[10px] text-gray-400">{r.id}</span> },
                { key: "branch", label: "สาขา", render: (r) => <span className="font-medium">{r.branch}</span> },
                { key: "fuelType", label: "ประเภท", render: (r) => (
                  <span className="rounded-lg px-2 py-0.5 text-[10px] font-medium" style={{ backgroundColor: `${fuelColors[r.fuelType]}15`, color: fuelColors[r.fuelType] }}>
                    {r.fuelType}
                  </span>
                )},
                { key: "usage", label: "ปริมาณ", render: (r) => <span className="font-semibold">{r.usage.toLocaleString()} {r.unit}</span> },
                { key: "co2", label: "CO₂ (tCO₂e)", render: (r) => <span className="text-red-500 font-semibold">{r.co2}</span> },
                { key: "cost", label: "ค่าใช้จ่าย", render: (r) => <span className="font-semibold">{formatTHB(r.cost)}</span> },
                { key: "date", label: "วันที่", render: (r) => <span className="text-gray-400">{r.date}</span> },
                { key: "status", label: "สถานะ", render: (r) => <StatusBadge status={r.status} /> },
                { key: "actions", label: "", render: () => (
                  <ActionMenu items={[{ label: "ดู", icon: Eye }]} />
                )},
              ]}
              data={filtered}
              pageSize={10}
            />
          </Card>
        </>
      )}

      {tab === "summary" && (
        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <SectionHeader title="สัดส่วนการใช้เชื้อเพลิง" />
            <DonutChart
              segments={fuelTypes.map(f => ({ label: f.type, value: f.totalUsage, color: fuelColors[f.type] || "#6b7280" }))}
              size={180}
            />
          </Card>
          <Card className="lg:col-span-2">
            <SectionHeader title="CO₂ และต้นทุนตามประเภทเชื้อเพลิง" />
            <div className="space-y-4">
              {fuelTypes.map((f, i) => (
                <motion.div
                  key={f.type}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-gray-200/60 p-4 dark:border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: fuelColors[f.type] }} />
                      <span className="text-sm font-medium">{f.type}</span>
                    </span>
                    <span className="text-xs text-gray-400">฿{f.pricePerUnit}/{f.unit}</span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-lg font-bold">{f.totalUsage.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-400">{f.unit}</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-red-500">{f.co2.toFixed(1)}</p>
                      <p className="text-[10px] text-gray-400">tCO₂e</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-amber-500">{formatTHB(f.cost)}</p>
                      <p className="text-[10px] text-gray-400">ต้นทุน</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
