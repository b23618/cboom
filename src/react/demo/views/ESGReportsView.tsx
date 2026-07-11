import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, FileSpreadsheet, Eye, Plus } from "lucide-react";
import {
  Card, DataTable, StatusBadge, SubTabs, SectionHeader,
  ActionMenu, MultiLineChart, DonutChart, BarChart,
} from "../ui";
import {
  monthlyCarbonData, yearlyCarbonData, scopeBreakdown,
  carbonByBranch, carbonKPIs,
} from "../esgData";

export default function ReportsView() {
  const [tab, setTab] = useState("monthly");
  const tabs = [
    { id: "monthly", label: "รายงานรายเดือน" },
    { id: "annual", label: "รายงานรายปี" },
    { id: "footprint", label: "Carbon Footprint" },
  ];

  const monthlyReports = monthlyCarbonData.map((d, i) => ({
    id: `RPT-M-${String(i + 1).padStart(3, "0")}`,
    period: `${d.month} 2026`,
    scope1: d.scope1, scope2: d.scope2, scope3: d.scope3, total: d.total,
    status: i < 7 ? "อนุมัติแล้ว" : "ร่าง",
  }));

  const annualReports = yearlyCarbonData.map((d, i) => ({
    id: `RPT-Y-${d.year}`,
    period: d.year,
    scope1: d.scope1, scope2: d.scope2, scope3: d.scope3, total: d.total,
    status: i < 4 ? "อนุมัติแล้ว" : "ร่าง",
  }));

  return (
    <div className="space-y-6">
      <SubTabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === "monthly" && (
        <Card>
          <SectionHeader title="รายงาน ESG รายเดือน" action={
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 rounded-xl border border-gray-200/60 px-3 py-2 text-xs font-medium hover:border-green-500/40 dark:border-white/10">
                <FileSpreadsheet className="h-3.5 w-3.5" /> Excel
              </button>
              <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
                <Download className="h-3.5 w-3.5" /> PDF
              </button>
            </div>
          } />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (r) => <span className="font-mono text-[10px] text-gray-400">{r.id}</span> },
              { key: "period", label: "งวด", render: (r) => <span className="font-medium">{r.period}</span> },
              { key: "scope1", label: "Scope 1", render: (r) => <span className="text-red-500">{r.scope1}</span> },
              { key: "scope2", label: "Scope 2", render: (r) => <span className="text-blue-500">{r.scope2}</span> },
              { key: "scope3", label: "Scope 3", render: (r) => <span className="text-purple-500">{r.scope3}</span> },
              { key: "total", label: "รวม (tCO₂e)", render: (r) => <span className="font-bold text-green-500">{r.total}</span> },
              { key: "status", label: "สถานะ", render: (r) => <StatusBadge status={r.status} /> },
              { key: "actions", label: "", render: () => (
                <ActionMenu items={[
                  { label: "ดู", icon: Eye },
                  { label: "PDF", icon: Download },
                  { label: "Excel", icon: FileSpreadsheet },
                ]} />
              )},
            ]}
            data={monthlyReports}
            pageSize={12}
          />
        </Card>
      )}

      {tab === "annual" && (
        <div className="space-y-4">
          <Card>
            <SectionHeader title="การปล่อย CO₂ รายปี (5 ปี)" />
            <MultiLineChart
              data={yearlyCarbonData}
              lines={[
                { key: "scope1", color: "#ef4444", name: "Scope 1" },
                { key: "scope2", color: "#3b82f6", name: "Scope 2" },
                { key: "scope3", color: "#8b5cf6", name: "Scope 3" },
              ]}
              height={240}
            />
          </Card>
          <Card>
            <SectionHeader title="รายงาน ESG รายปี" action={
              <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
                <Plus className="h-3.5 w-3.5" /> สร้างรายงาน
              </button>
            } />
            <DataTable
              columns={[
                { key: "id", label: "รหัส", render: (r) => <span className="font-mono text-[10px] text-gray-400">{r.id}</span> },
                { key: "period", label: "ปี", render: (r) => <span className="font-medium">{r.period}</span> },
                { key: "scope1", label: "Scope 1", render: (r) => <span className="text-red-500">{r.scope1}</span> },
                { key: "scope2", label: "Scope 2", render: (r) => <span className="text-blue-500">{r.scope2}</span> },
                { key: "scope3", label: "Scope 3", render: (r) => <span className="text-purple-500">{r.scope3}</span> },
                { key: "total", label: "รวม (tCO₂e)", render: (r) => <span className="font-bold text-green-500">{r.total}</span> },
                { key: "status", label: "สถานะ", render: (r) => <StatusBadge status={r.status} /> },
                { key: "actions", label: "", render: () => (
                  <ActionMenu items={[
                    { label: "ดู", icon: Eye },
                    { label: "PDF", icon: Download },
                    { label: "Excel", icon: FileSpreadsheet },
                  ]} />
                )},
              ]}
              data={annualReports}
              pageSize={10}
            />
          </Card>
        </div>
      )}

      {tab === "footprint" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <SectionHeader title="Carbon Footprint ตาม Scope" />
            <DonutChart
              segments={scopeBreakdown.map(s => ({ label: s.name, value: Math.round(s.value), color: s.color }))}
              size={200}
            />
          </Card>
          <Card>
            <SectionHeader title="Carbon Footprint รายสาขา" />
            <BarChart
              data={carbonByBranch.map(b => b.co2)}
              labels={carbonByBranch.map(b => b.branch.replace("โรงงาน", "").replace("สำนักงานใหญ่ ", ""))}
              dataKey="co2"
              height={200}
              color="#16a34a"
            />
          </Card>
          <Card className="lg:col-span-2">
            <SectionHeader title="สรุป Carbon Footprint" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Baseline 2024", value: carbonKPIs.baselineEmission, color: "text-gray-500" },
                { label: "ปัจจุบัน 2026", value: carbonKPIs.totalEmission, color: "text-green-500" },
                { label: "ลดลง", value: carbonKPIs.baselineEmission - carbonKPIs.totalEmission, color: "text-blue-500" },
                { label: "Net Zero Progress", value: carbonKPIs.netZeroProgress, suffix: "%", color: "text-purple-500" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-gray-200/60 p-4 dark:border-white/10"
                >
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className={`mt-2 text-xl font-bold ${item.color}`}>
                    {item.value.toLocaleString()}{item.suffix || " tCO₂e"}
                  </p>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
