import { Plane, TrendingDown, DollarSign, Eye, Plus } from "lucide-react";
import {
  KpiCard, Card, DataTable, StatusBadge, FilterBar,
  SectionHeader, ActionMenu,
} from "../ui";
import { useState } from "react";
import { travelRecords, formatTHB } from "../esgData";

export default function TravelView() {
  const [search, setSearch] = useState("");
  const filtered = travelRecords.filter(r =>
    r.employee.toLowerCase().includes(search.toLowerCase()) ||
    r.purpose.toLowerCase().includes(search.toLowerCase())
  );

  const totalCO2 = travelRecords.reduce((s, r) => s + r.co2, 0);
  const totalCost = travelRecords.reduce((s, r) => s + r.cost, 0);
  const totalDistance = travelRecords.reduce((s, r) => s + r.distance, 0);

  const kpis = [
    { label: "การเดินทางรวม", value: filtered.length, prefix: "", suffix: " ครั้ง", change: 5.2, up: true, icon: Plane, color: "text-blue-500" },
    { label: "ระยะทางรวม", value: totalDistance, prefix: "", suffix: " กม.", change: 3.1, up: true, icon: Plane, color: "text-purple-500" },
    { label: "CO₂ จากการเดินทาง", value: Math.round(totalCO2 * 1000) / 1000, prefix: "", suffix: " tCO₂e", change: -2.5, up: false, icon: TrendingDown, color: "text-green-500" },
    { label: "ค่าใช้จ่ายเดินทาง", value: totalCost, prefix: "฿", change: 4.2, up: true, icon: DollarSign, color: "text-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi, i) => <KpiCard key={kpi.label} {...kpi} index={i} />)}
      </div>

      <FilterBar placeholder="ค้นหา..." onSearch={setSearch} />
      <Card>
        <SectionHeader title={`การเดินทางเพื่อธุรกิจ (${filtered.length} ราย)`} action={
          <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
            <Plus className="h-3.5 w-3.5" /> บันทึกใหม่
          </button>
        } />
        <DataTable
          columns={[
            { key: "id", label: "รหัส", render: (r) => <span className="font-mono text-[10px] text-gray-400">{r.id}</span> },
            { key: "employee", label: "พนักงาน", render: (r) => <span className="font-medium">{r.employee}</span> },
            { key: "purpose", label: "วัตถุประสงค์", render: (r) => <span className="text-gray-400">{r.purpose}</span> },
            { key: "mode", label: "รูปแบบ", render: (r) => <StatusBadge status={r.mode} /> },
            { key: "distance", label: "ระยะ (กม.)", render: (r) => <span className="font-semibold">{r.distance}</span> },
            { key: "co2", label: "CO₂ (tCO₂e)", render: (r) => <span className="text-green-500 font-semibold">{r.co2}</span> },
            { key: "cost", label: "ค่าใช้จ่าย", render: (r) => <span className="font-semibold">{formatTHB(r.cost)}</span> },
            { key: "date", label: "วันที่", render: (r) => <span className="text-gray-400">{r.date}</span> },
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
