import { Droplets, TrendingDown, DollarSign, Eye, Plus } from "lucide-react";
import {
  KpiCard, Card, DataTable, StatusBadge, FilterBar,
  SectionHeader, ActionMenu, MultiLineChart, BarChart,
} from "../ui";
import { useState } from "react";
import { waterRecords, waterTrendData, esgBranches, formatTHB } from "../esgData";

export default function WaterView() {
  const [search, setSearch] = useState("");
  const filtered = waterRecords.filter(r => r.branch.toLowerCase().includes(search.toLowerCase()));

  const totalUsage = waterRecords.reduce((s, r) => s + r.usage, 0);
  const totalCost = waterRecords.reduce((s, r) => s + r.cost, 0);
  const totalCO2 = waterRecords.reduce((s, r) => s + r.co2, 0);

  const kpis = [
    { label: "การใช้น้ำรวม", value: totalUsage, prefix: "", suffix: " m³", change: -2.1, up: false, icon: Droplets, color: "text-blue-500" },
    { label: "ค่าน้ำรวม", value: totalCost, prefix: "฿", change: -1.5, up: false, icon: DollarSign, color: "text-cyan-500" },
    { label: "CO₂ จากน้ำ", value: Math.round(totalCO2 * 100) / 100, prefix: "", suffix: " tCO₂e", change: -2.1, up: false, icon: TrendingDown, color: "text-green-500" },
    { label: "สาขาที่บันทึก", value: waterRecords.length, prefix: "", change: 0, up: true, icon: Droplets, color: "text-indigo-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi, i) => <KpiCard key={kpi.label} {...kpi} index={i} />)}
      </div>

      <Card>
        <SectionHeader title="แนวโน้มการใช้น้ำรายเดือน" />
        <MultiLineChart
          data={waterTrendData}
          lines={[{ key: "usage", color: "#3b82f6", name: "การใช้น้ำ (m³)" }]}
          height={200}
        />
      </Card>

      <Card>
        <SectionHeader title="การใช้น้ำรายสาขา" />
        <BarChart
          data={esgBranches.map(b => b.water)}
          labels={esgBranches.map(b => b.name.replace("สำนักงานใหญ่ ", "").replace("ศูนย์กระจาย", "สงขลา"))}
          dataKey="usage"
          height={180}
          color="#3b82f6"
        />
      </Card>

      <FilterBar placeholder="ค้นหาสาขา..." onSearch={setSearch} />
      <Card>
        <SectionHeader title={`บันทึกน้ำ (${filtered.length} ราย)`} action={
          <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
            <Plus className="h-3.5 w-3.5" /> บันทึกใหม่
          </button>
        } />
        <DataTable
          columns={[
            { key: "id", label: "รหัส", render: (r) => <span className="font-mono text-[10px] text-gray-400">{r.id}</span> },
            { key: "branch", label: "สาขา", render: (r) => <span className="font-medium">{r.branch}</span> },
            { key: "month", label: "เดือน", render: (r) => <span className="text-gray-400">{r.month}</span> },
            { key: "usage", label: "ปริมาณ (m³)", render: (r) => <span className="font-semibold">{r.usage.toLocaleString()}</span> },
            { key: "cost", label: "ค่าน้ำ", render: (r) => <span className="font-semibold">{formatTHB(r.cost)}</span> },
            { key: "co2", label: "CO₂ (tCO₂e)", render: (r) => <span className="text-green-500 font-semibold">{r.co2}</span> },
            { key: "status", label: "สถานะ", render: (r) => <StatusBadge status={r.status} /> },
            { key: "actions", label: "", render: () => <ActionMenu items={[{ label: "ดู", icon: Eye }]} /> },
          ]}
          data={filtered}
          pageSize={10}
        />
      </Card>
    </div>
  );
}
