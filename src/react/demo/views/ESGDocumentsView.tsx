import { useState } from "react";
import { FileText, Upload, Eye, Download, Trash2, Plus } from "lucide-react";
import {
  KpiCard, Card, DataTable, StatusBadge, FilterBar,
  SectionHeader, ActionMenu,
} from "../ui";
import { esgDocuments } from "../esgData";

export default function DocumentsView() {
  const [search, setSearch] = useState("");
  const filtered = esgDocuments.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.type.toLowerCase().includes(search.toLowerCase()) ||
    d.branch.toLowerCase().includes(search.toLowerCase())
  );

  const totalDocs = esgDocuments.length;
  const verified = esgDocuments.filter(d => d.status === "ตรวจสอบแล้ว").length;
  const pending = esgDocuments.filter(d => d.status === "รอตรวจสอบ").length;

  const kpis = [
    { label: "เอกสารทั้งหมด", value: totalDocs, prefix: "", change: 0, up: true, icon: FileText, color: "text-blue-500" },
    { label: "ตรวจสอบแล้ว", value: verified, prefix: "", change: 0, up: true, icon: FileText, color: "text-green-500" },
    { label: "รอตรวจสอบ", value: pending, prefix: "", change: 0, up: false, icon: FileText, color: "text-amber-500" },
    { label: "ประเภทเอกสาร", value: 6, prefix: "", change: 0, up: true, icon: FileText, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi, i) => <KpiCard key={kpi.label} {...kpi} index={i} />)}
      </div>

      <Card>
        <SectionHeader title="อัปโหลดเอกสาร" action={
          <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
            <Upload className="h-3.5 w-3.5" /> อัปโหลด
          </button>
        } />
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200/60 py-12 dark:border-white/10">
          <Upload className="h-10 w-10 text-gray-300 dark:text-white/20" />
          <p className="mt-3 text-sm font-medium text-gray-500 dark:text-white/50">ลากไฟล์มาวาง หรือคลิกเพื่ออัปโหลด</p>
          <p className="mt-1 text-[10px] text-gray-400">รองรับ PDF, JPG, PNG (สูงสุด 10 MB)</p>
        </div>
      </Card>

      <FilterBar placeholder="ค้นหาเอกสาร..." onSearch={setSearch} />
      <Card>
        <SectionHeader title={`เอกสาร ESG (${filtered.length} ราย)`} />
        <DataTable
          columns={[
            { key: "id", label: "รหัส", render: (d) => <span className="font-mono text-[10px] text-gray-400">{d.id}</span> },
            { key: "name", label: "ชื่อไฟล์", render: (d) => (
              <span className="flex items-center gap-2 font-medium">
                <FileText className="h-3.5 w-3.5 text-green-500" />
                {d.name}
              </span>
            )},
            { key: "type", label: "ประเภท", render: (d) => <span className="text-gray-400">{d.type}</span> },
            { key: "branch", label: "สาขา", render: (d) => <span className="text-gray-400">{d.branch}</span> },
            { key: "size", label: "ขนาด", render: (d) => <span className="text-gray-400">{d.size}</span> },
            { key: "uploadedBy", label: "อัปโหลดโดย", render: (d) => <span className="text-gray-400">{d.uploadedBy}</span> },
            { key: "date", label: "วันที่", render: (d) => <span className="text-gray-400">{d.date}</span> },
            { key: "status", label: "สถานะ", render: (d) => <StatusBadge status={d.status} /> },
            { key: "actions", label: "", render: () => (
              <ActionMenu items={[
                { label: "ดู", icon: Eye },
                { label: "ดาวน์โหลด", icon: Download },
                { label: "ลบ", icon: Trash2, danger: true },
              ]} />
            )},
          ]}
          data={filtered}
          pageSize={10}
        />
      </Card>
    </div>
  );
}
