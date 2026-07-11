import { Truck, TrendingDown, Eye, Plus, Zap, Fuel } from "lucide-react";
import {
  KpiCard, Card, DataTable, StatusBadge, FilterBar,
  SectionHeader, ActionMenu, ProgressBar,
} from "../ui";
import { useState } from "react";
import { fleetVehicles, formatTHB } from "../esgData";

export default function FleetView() {
  const [search, setSearch] = useState("");
  const filtered = fleetVehicles.filter(v =>
    v.plate.toLowerCase().includes(search.toLowerCase()) ||
    v.brand.toLowerCase().includes(search.toLowerCase()) ||
    v.type.toLowerCase().includes(search.toLowerCase())
  );

  const totalMileage = fleetVehicles.reduce((s, v) => s + v.mileage, 0);
  const totalCO2 = fleetVehicles.reduce((s, v) => s + v.co2, 0);
  const evCount = fleetVehicles.filter(v => v.fuel === "ไฟฟ้า").length;

  const kpis = [
    { label: "ยานพาหนะทั้งหมด", value: fleetVehicles.length, prefix: "", change: 0, up: true, icon: Truck, color: "text-blue-500" },
    { label: "ระยะทางรวม", value: totalMileage, prefix: "", suffix: " กม.", change: 8.2, up: true, icon: Truck, color: "text-purple-500" },
    { label: "CO₂ รวม", value: Math.round(totalCO2 * 100) / 100, prefix: "", suffix: " tCO₂e", change: -12.5, up: false, icon: TrendingDown, color: "text-green-500" },
    { label: "รถ EV", value: evCount, prefix: "", suffix: " คัน", change: 50, up: true, icon: Zap, color: "text-orange-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi, i) => <KpiCard key={kpi.label} {...kpi} index={i} />)}
      </div>

      <FilterBar placeholder="ค้นหาทะเบียน, รุ่น..." onSearch={setSearch} />
      <Card>
        <SectionHeader title={`ยานพาหนะ (${filtered.length} คัน)`} action={
          <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
            <Plus className="h-3.5 w-3.5" /> เพิ่มยานพาหนะ
          </button>
        } />
        <DataTable
          columns={[
            { key: "plate", label: "ทะเบียน", render: (v) => <span className="font-mono text-[10px] font-medium">{v.plate}</span> },
            { key: "type", label: "ประเภท", render: (v) => <span className="font-medium">{v.type}</span> },
            { key: "brand", label: "รุ่น", render: (v) => <span className="text-gray-400">{v.brand}</span> },
            { key: "fuel", label: "เชื้อเพลิง", render: (v) => (
              <span className={`rounded-lg px-2 py-0.5 text-[10px] font-medium ${
                v.fuel === "ไฟฟ้า" ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-500"
              }`}>{v.fuel}</span>
            )},
            { key: "mileage", label: "ระยะ (กม.)", render: (v) => <span className="font-semibold">{v.mileage.toLocaleString()}</span> },
            { key: "fuelUsage", label: "เชื้อเพลิง (ลิตร)", render: (v) => <span>{v.fuelUsage > 0 ? v.fuelUsage.toLocaleString() : "—"}</span> },
            { key: "co2", label: "CO₂ (tCO₂e)", render: (v) => (
              v.co2 > 0 ? <span className="text-red-500 font-semibold">{v.co2}</span> : <span className="text-green-500 font-semibold">0</span>
            )},
            { key: "lastService", label: "ซ่อมล่าสุด", render: (v) => <span className="text-gray-400">{v.lastService}</span> },
            { key: "status", label: "สถานะ", render: (v) => <StatusBadge status={v.status} /> },
            { key: "actions", label: "", render: () => <ActionMenu items={[{ label: "ดู", icon: Eye }]} /> },
          ]}
          data={filtered}
          pageSize={10}
        />
      </Card>
    </div>
  );
}
