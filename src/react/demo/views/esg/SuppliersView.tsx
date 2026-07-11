import { Package, Eye, Plus, Star } from "lucide-react";
import {
  KpiCard, Card, DataTable, StatusBadge, FilterBar,
  SectionHeader, ActionMenu, ProgressBar,
} from "../../ui";
import { useState } from "react";
import { supplierESG } from "../../esgData";

export default function SuppliersView() {
  const [search, setSearch] = useState("");
  const filtered = supplierESG.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  const avgScore = Math.round(supplierESG.reduce((s, sup) => s + sup.esgScore, 0) / supplierESG.length);
  const totalCO2 = supplierESG.reduce((s, sup) => s + sup.carbonFootprint, 0);
  const assessed = supplierESG.filter(s => s.status === "ประเมินแล้ว").length;

  const kpis = [
    { label: "ซัพพลายเออร์ทั้งหมด", value: supplierESG.length, prefix: "", change: 0, up: true, icon: Package, color: "text-blue-500" },
    { label: "ESG Score เฉลี่ย", value: avgScore, prefix: "", suffix: "/100", change: 5.2, up: true, icon: Star, color: "text-green-500" },
    { label: "Carbon Footprint", value: Math.round(totalCO2 * 10) / 10, prefix: "", suffix: " tCO₂e", change: -8.5, up: false, icon: Package, color: "text-amber-500" },
    { label: "ประเมินแล้ว", value: assessed, prefix: "", suffix: `/${supplierESG.length}`, change: 12.5, up: true, icon: Star, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi, i) => <KpiCard key={kpi.label} {...kpi} index={i} />)}
      </div>

      <FilterBar placeholder="ค้นหาซัพพลายเออร์..." onSearch={setSearch} />
      <Card>
        <SectionHeader title={`ซัพพลายเออร์ ESG (${filtered.length} ราย)`} action={
          <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
            <Plus className="h-3.5 w-3.5" /> เพิ่มซัพพลายเออร์
          </button>
        } />
        <DataTable
          columns={[
            { key: "id", label: "รหัส", render: (s) => <span className="font-mono text-[10px] text-gray-400">{s.id}</span> },
            { key: "name", label: "ชื่อ", render: (s) => <span className="font-medium">{s.name}</span> },
            { key: "category", label: "หมวด", render: (s) => <span className="text-gray-400">{s.category}</span> },
            { key: "esgScore", label: "ESG Score", render: (s) => (
              <div className="flex items-center gap-2">
                <ProgressBar pct={s.esgScore} color={s.esgScore > 80 ? "bg-green-500" : s.esgScore > 60 ? "bg-amber-500" : "bg-red-500"} />
                <span className="text-[10px] font-semibold">{s.esgScore}</span>
              </div>
            )},
            { key: "carbonFootprint", label: "CO₂ (tCO₂e)", render: (s) => <span className="font-semibold text-amber-500">{s.carbonFootprint}</span> },
            { key: "lastAudit", label: "ตรวจสอบล่าสุด", render: (s) => <span className="text-gray-400">{s.lastAudit}</span> },
            { key: "status", label: "สถานะ", render: (s) => <StatusBadge status={s.status} /> },
            { key: "actions", label: "", render: () => (
              <ActionMenu items={[{ label: "ดู", icon: Eye }, { label: "ประเมิน", icon: Star }]} />
            )},
          ]}
          data={filtered}
          pageSize={10}
        />
      </Card>
    </div>
  );
}
