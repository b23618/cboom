import { Recycle, TrendingDown, DollarSign, Eye } from "lucide-react";
import {
  KpiCard, Card, DataTable, StatusBadge, SubTabs,
  SectionHeader, ActionMenu, DonutChart, MultiLineChart, ProgressBar,
} from "../../ui";
import { useState } from "react";
import { wasteTypes, wasteTrendData, formatTHB } from "../../esgData";

export default function WasteView() {
  const [tab, setTab] = useState("records");
  const tabs = [
    { id: "records", label: "บันทึกขยะ" },
    { id: "trend", label: "แนวโน้ม" },
  ];

  const totalAmount = wasteTypes.reduce((s, w) => s + w.amount, 0);
  const totalCO2 = wasteTypes.reduce((s, w) => s + w.co2, 0);
  const totalCost = wasteTypes.reduce((s, w) => s + w.cost, 0);
  const recycled = wasteTypes.filter(w => w.disposal === "รีไซเคิล").reduce((s, w) => s + w.amount, 0);

  const kpis = [
    { label: "ขยะรวม", value: totalAmount, prefix: "", suffix: " kg", change: -8.5, up: false, icon: Recycle, color: "text-rose-500" },
    { label: "CO₂ จากขยะ", value: Math.round(totalCO2 * 100) / 100, prefix: "", suffix: " tCO₂e", change: -8.5, up: false, icon: TrendingDown, color: "text-green-500" },
    { label: "ค่ากำจัดขยะ", value: totalCost, prefix: "฿", change: -5.2, up: false, icon: DollarSign, color: "text-amber-500" },
    { label: "อัตรารีไซเคิล", value: Math.round((recycled / totalAmount) * 100), prefix: "", suffix: "%", change: 15.2, up: true, icon: Recycle, color: "text-green-500" },
  ];

  const wasteColors: Record<string, string> = {
    "ขยะทั่วไป": "#6b7280",
    "ขยะอันตราย": "#ef4444",
    "พลาสติก": "#3b82f6",
    "กระดาษ": "#eab308",
    "โลหะ": "#8b5cf6",
    "อินทรีย์": "#16a34a",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi, i) => <KpiCard key={kpi.label} {...kpi} index={i} />)}
      </div>

      <SubTabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === "records" && (
        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <SectionHeader title="สัดส่วนประเภทขยะ" />
            <DonutChart
              segments={wasteTypes.map(w => ({ label: w.type, value: w.amount, color: wasteColors[w.type] }))}
              size={180}
            />
          </Card>
          <Card className="lg:col-span-2">
            <SectionHeader title="รายการขยะ" />
            <DataTable
              columns={[
                { key: "type", label: "ประเภท", render: (w) => (
                  <span className="flex items-center gap-2 font-medium">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: wasteColors[w.type] }} />
                    {w.type}
                  </span>
                )},
                { key: "amount", label: "ปริมาณ (kg)", render: (w) => <span className="font-semibold">{w.amount}</span> },
                { key: "co2", label: "CO₂ (tCO₂e)", render: (w) => <span className="text-green-500 font-semibold">{w.co2}</span> },
                { key: "disposal", label: "การกำจัด", render: (w) => <StatusBadge status={w.disposal} /> },
                { key: "cost", label: "ต้นทุน", render: (w) => <span className="font-semibold">{formatTHB(w.cost)}</span> },
                { key: "actions", label: "", render: () => <ActionMenu items={[{ label: "ดู", icon: Eye }]} /> },
              ]}
              data={wasteTypes}
              pageSize={10}
            />
          </Card>
        </div>
      )}

      {tab === "trend" && (
        <Card>
          <SectionHeader title="แนวโน้มขยะรายเดือน" />
          <MultiLineChart
            data={wasteTrendData}
            lines={[
              { key: "general", color: "#6b7280", name: "ขยะทั่วไป" },
              { key: "hazardous", color: "#ef4444", name: "ขยะอันตราย" },
              { key: "recyclable", color: "#16a34a", name: "รีไซเคิล" },
            ]}
            height={240}
          />
        </Card>
      )}
    </div>
  );
}
