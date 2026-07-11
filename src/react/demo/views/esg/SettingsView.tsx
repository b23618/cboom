import { useState } from "react";
import { Building2, Bell, Shield, FileText, ChevronRight } from "lucide-react";
import { Card, SectionHeader, SubTabs, StatusBadge } from "../../ui";
import { esgCompany, esgBranches, emissionFactors } from "../../esgData";

export default function SettingsView() {
  const [tab, setTab] = useState("company");
  const tabs = [
    { id: "company", label: "ข้อมูลบริษัท" },
    { id: "branches", label: "สาขา" },
    { id: "factors", label: "Emission Factors" },
    { id: "notifications", label: "การแจ้งเตือน" },
  ];

  return (
    <div className="space-y-6">
      <SubTabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === "company" && (
        <Card>
          <SectionHeader title="ข้อมูลบริษัท" action={
            <span className="flex items-center gap-1 text-xs font-medium text-green-500">
              <Building2 className="h-3.5 w-3.5" /> ESG Profile
            </span>
          } />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              {[
                { label: "ชื่อบริษัท", value: esgCompany.name },
                { label: "อุตสาหกรรม", value: esgCompany.industry },
                { label: "จำนวนพนักงาน", value: `${esgCompany.employees} คน` },
                { label: "จำนวนสาขา", value: `${esgCompany.branches} สาขา` },
                { label: "รายได้ต่อปี", value: `฿${esgCompany.revenue.toLocaleString()}` },
                { label: "ปีงบประมาณ", value: esgCompany.fiscalYear },
                { label: "ช่วงรายงาน", value: esgCompany.reportingPeriod },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-xl border border-gray-200/60 px-4 py-3 dark:border-white/10">
                  <span className="text-xs text-gray-400">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="rounded-xl border border-gray-200/60 p-4 dark:border-white/10">
                <p className="text-xs font-semibold text-gray-400">มาตรฐานที่ใช้</p>
                <div className="mt-3 space-y-2">
                  {["ISO 14064-1", "ISO 50001", "GHG Protocol", "TCFD", "GRI Standards"].map((std) => (
                    <div key={std} className="flex items-center justify-between">
                      <span className="text-sm">{std}</span>
                      <StatusBadge status="ใช้งาน" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-gray-200/60 p-4 dark:border-white/10">
                <p className="text-xs font-semibold text-gray-400">การตั้งค่าการรายงาน</p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>รายงานอัตโนมัติ</span>
                    <span className="flex h-5 w-9 items-center rounded-full bg-green-500 px-0.5"><span className="h-4 w-4 rounded-full bg-white" /></span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>แจ้งเตือนเมื่อใช้เกินเป้า</span>
                    <span className="flex h-5 w-9 items-center rounded-full bg-green-500 px-0.5"><span className="h-4 w-4 rounded-full bg-white" /></span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>ส่งรายงานให้กรมโรงงาน</span>
                    <span className="flex h-5 w-9 items-center rounded-full bg-gray-300 px-0.5 dark:bg-white/10"><span className="h-4 w-4 rounded-full bg-white" /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {tab === "branches" && (
        <Card>
          <SectionHeader title="สาขาทั้งหมด" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {esgBranches.map((b, i) => (
              <div key={b.id} className="rounded-xl border border-gray-200/60 p-4 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{b.name}</span>
                  <StatusBadge status={b.type} />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div><span className="text-gray-400">พื้นที่: </span><span className="font-medium">{b.area.toLocaleString()} m²</span></div>
                  <div><span className="text-gray-400">พนักงาน: </span><span className="font-medium">{b.employees}</span></div>
                  <div><span className="text-gray-400">ไฟฟ้า: </span><span className="font-medium">{b.electricity.toLocaleString()} kWh</span></div>
                  <div><span className="text-gray-400">CO₂: </span><span className="font-medium text-green-500">{b.co2} tCO₂e</span></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === "factors" && (
        <Card>
          <SectionHeader title="Emission Factors" action={
            <span className="text-xs text-gray-400">อ้างอิง: TGO (Thailand Greenhouse Gas Management Organization)</span>
          } />
          <div className="space-y-2">
            {emissionFactors.map((f, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-gray-200/60 px-4 py-3 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{f.source}</span>
                  <StatusBadge status={f.scope} />
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="font-mono font-semibold">{f.factor}</span>
                  <span className="text-gray-400">{f.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === "notifications" && (
        <Card>
          <SectionHeader title="การตั้งค่าการแจ้งเตือน" />
          <div className="space-y-3">
            {[
              { label: "แจ้งเตือนเมื่อการปล่อย CO₂ เกินเป้าหมาย", on: true },
              { label: "แจ้งเตือนเมื่อใช้ไฟฟ้าเกินเป้าหมายรายเดือน", on: true },
              { label: "แจ้งเตือนเมื่อซัพพลายเออร์ ESG Score ต่ำ", on: true },
              { label: "แจ้งเตือนเมื่อมีเอกสารรอตรวจสอบ", on: true },
              { label: "ส่งรายงาน ESG รายเดือนทางอีเมล", on: false },
              { label: "แจ้งเตือนความคืบหน้าโครงการลด CO₂", on: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-gray-200/60 px-4 py-3 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <Bell className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{item.label}</span>
                </div>
                <span className={`flex h-5 w-9 items-center rounded-full px-0.5 ${item.on ? "bg-green-500" : "bg-gray-300 dark:bg-white/10"}`}>
                  <span className="h-4 w-4 rounded-full bg-white" />
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
