import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, TrendingDown, DollarSign, Eye, Plus, Download } from "lucide-react";
import {
  KpiCard, Card, DataTable, StatusBadge, SubTabs, FilterBar,
  SectionHeader, ActionMenu, BarChart, MultiLineChart, ProgressBar,
} from "../../ui";
import { electricityRecords, energyTrendData, esgBranches, formatTHB } from "../../esgData";

export default function ElectricityView() {
  const [tab, setTab] = useState("records");
  const [search, setSearch] = useState("");

  const tabs = [
    { id: "records", label: "บันทึกไฟฟ้า" },
    { id: "comparison", label: "เปรียบเทียบสาขา" },
    { id: "forecast", label: "พยากรณ์" },
  ];

  const filtered = electricityRecords.filter(r =>
    r.branch.toLowerCase().includes(search.toLowerCase()) ||
    r.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalUsage = electricityRecords.reduce((s, r) => s + r.usage, 0);
  const totalCost = electricityRecords.reduce((s, r) => s + r.cost, 0);
  const totalCO2 = electricityRecords.reduce((s, r) => s + r.co2, 0);

  const kpis = [
    { label: "การใช้ไฟฟ้ารวม", value: totalUsage, prefix: "", suffix: " kWh", change: -3.5, up: false, icon: Zap, color: "text-blue-500" },
    { label: "ค่าไฟฟ้ารวม", value: totalCost, prefix: "฿", change: -2.1, up: false, icon: DollarSign, color: "text-amber-500" },
    { label: "CO₂ จากไฟฟ้า", value: Math.round(totalCO2 * 10) / 10, prefix: "", suffix: " tCO₂e", change: -3.5, up: false, icon: TrendingDown, color: "text-green-500" },
    { label: "พลังงานหมุนเวียน", value: 18.5, prefix: "", suffix: "%", change: 13.5, up: true, icon: Zap, color: "text-orange-500" },
  ];

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
          <FilterBar placeholder="ค้นหาสาขา..." onSearch={setSearch} />
          <Card>
            <SectionHeader title={`บันทึกไฟฟ้า (${filtered.length} ราย)`} action={
              <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
                <Plus className="h-3.5 w-3.5" /> บันทึกใหม่
              </button>
            } />
            <DataTable
              columns={[
                { key: "id", label: "รหัส", render: (r) => <span className="font-mono text-[10px] text-gray-400">{r.id}</span> },
                { key: "branch", label: "สาขา", render: (r) => <span className="font-medium">{r.branch}</span> },
                { key: "month", label: "เดือน", render: (r) => <span className="text-gray-400">{r.month}</span> },
                { key: "meterStart", label: "มิเตอร์เริ่ม", render: (r) => <span className="font-mono text-[10px]">{r.meterStart.toLocaleString()}</span> },
                { key: "meterEnd", label: "มิเตอร์ปลาย", render: (r) => <span className="font-mono text-[10px]">{r.meterEnd.toLocaleString()}</span> },
                { key: "usage", label: "ใช้ (kWh)", render: (r) => <span className="font-semibold">{r.usage.toLocaleString()}</span> },
                { key: "rate", label: "อัตรา", render: (r) => <span className="text-gray-400">฿{r.rate}</span> },
                { key: "cost", label: "ค่าไฟ", render: (r) => <span className="font-semibold">{formatTHB(r.cost)}</span> },
                { key: "co2", label: "CO₂ (tCO₂e)", render: (r) => <span className="text-green-500 font-semibold">{r.co2}</span> },
                { key: "status", label: "สถานะ", render: (r) => <StatusBadge status={r.status} /> },
                { key: "actions", label: "", render: () => (
                  <ActionMenu items={[
                    { label: "ดู", icon: Eye },
                    { label: "ดาวน์โหลดใบเสร็จ", icon: Download },
                  ]} />
                )},
              ]}
              data={filtered}
              pageSize={10}
            />
          </Card>
        </>
      )}

      {tab === "comparison" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <SectionHeader title="การใช้ไฟฟ้ารายสาขา" />
            <BarChart
              data={esgBranches.map(b => b.electricity)}
              labels={esgBranches.map(b => b.name.replace("สำนักงานใหญ่ ", "").replace("ศูนย์กระจาย", "สงขลา"))}
              dataKey="usage"
              height={220}
              color="#3b82f6"
            />
          </Card>
          <Card>
            <SectionHeader title="CO₂ จากไฟฟ้ารายสาขา" />
            <div className="space-y-3">
              {esgBranches.map((b, i) => {
                const co2 = (b.electricity * 0.557) / 1000;
                return (
                  <div key={b.id}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-medium">{b.name}</span>
                      <span className="text-gray-400">{co2.toFixed(1)} tCO₂e</span>
                    </div>
                    <ProgressBar pct={Math.round((co2 / 160) * 100)} color="bg-blue-500" delay={i * 0.1} />
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {tab === "forecast" && (
        <Card>
          <SectionHeader title="พยากรณ์การใช้ไฟฟ้า 6 เดือนข้างหน้า" />
          <MultiLineChart
            data={[
              ...energyTrendData.slice(-6).map(d => ({ month: d.month, actual: d.electricity, forecast: 0 })),
              { month: "ม.ค.67", actual: 0, forecast: 58500 },
              { month: "ก.พ.67", actual: 0, forecast: 56200 },
              { month: "มี.ค.67", actual: 0, forecast: 62100 },
              { month: "เม.ย.67", actual: 0, forecast: 65500 },
              { month: "พ.ค.67", actual: 0, forecast: 63200 },
              { month: "มิ.ย.67", actual: 0, forecast: 61400 },
            ]}
            lines={[
              { key: "actual", color: "#3b82f6", name: "ข้อมูลจริง" },
              { key: "forecast", color: "#eab308", name: "พยากรณ์" },
            ]}
            height={260}
          />
        </Card>
      )}
    </div>
  );
}
