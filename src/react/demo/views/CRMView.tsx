import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, UserPlus, Target, CheckCircle2, TrendingUp, Phone, Mail,
  Calendar, Clock, MessageCircle, FileText, Plus, Eye, Edit, Trash2,
  Building2, Star, DollarSign, Briefcase,
} from "lucide-react";
import {
  KpiCard, Card, DataTable, StatusBadge, SubTabs, FilterBar,
  ProgressBar, AnimatedCounter, SectionHeader, Drawer, ActionMenu,
} from "../ui";
import {
  allCustomers, allLeads, allOpportunities, allQuotations,
  pipelineStages, formatTHB,
} from "../data";

export default function CRMView() {
  const [tab, setTab] = useState("customers");
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const tabs = [
    { id: "customers", label: "ลูกค้า" },
    { id: "leads", label: "ลีด" },
    { id: "opportunities", label: "โอกาส" },
    { id: "quotes", label: "ใบเสนอราคา" },
    { id: "pipeline", label: "Pipeline" },
  ];

  const filteredCustomers = allCustomers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.contact.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  const filteredLeads = allLeads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.source.toLowerCase().includes(search.toLowerCase())
  );

  const filteredOpps = allOpportunities.filter(o =>
    o.customer.toLowerCase().includes(search.toLowerCase())
  );

  const filteredQuotes = allQuotations.filter(q =>
    q.customer.toLowerCase().includes(search.toLowerCase())
  );

  const crmKPIs = [
    { label: "ลูกค้าทั้งหมด", value: allCustomers.length, prefix: "", change: 12.5, up: true, icon: Users, color: "text-blue-500" },
    { label: "ลีดใหม่", value: allLeads.length, prefix: "", change: 18.2, up: true, icon: UserPlus, color: "text-green-500" },
    { label: "โอกาสขาย", value: allOpportunities.length, prefix: "", change: 8.7, up: true, icon: Target, color: "text-purple-500" },
    { label: "มูลค่ารวม", value: allCustomers.reduce((s, c) => s + c.value, 0), prefix: "฿", change: 15.3, up: true, icon: DollarSign, color: "text-amber-500" },
  ];

  const openCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {crmKPIs.map((kpi, i) => (
          <KpiCard key={kpi.label} {...kpi} index={i} />
        ))}
      </div>

      <SubTabs tabs={tabs} active={tab} onChange={setTab} />

      <FilterBar placeholder="ค้นหาลูกค้า, ลีด, โอกาส..." onSearch={setSearch} />

      {tab === "customers" && (
        <Card>
          <SectionHeader title={`ลูกค้า (${filteredCustomers.length} ราย)`} action={
            <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
              <Plus className="h-3.5 w-3.5" /> เพิ่มลูกค้า
            </button>
          } />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (c) => <span className="font-mono text-[10px] text-gray-400">{c.id}</span> },
              { key: "name", label: "ชื่อ", render: (c) => (
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-[10px] text-gray-400">{c.contact}</p>
                </div>
              )},
              { key: "type", label: "ประเภท", render: (c) => <StatusBadge status={c.type} /> },
              { key: "stage", label: "สถานะ", render: (c) => <StatusBadge status={c.stage} /> },
              { key: "value", label: "มูลค่า", render: (c) => <span className="font-semibold">{formatTHB(c.value)}</span> },
              { key: "orders", label: "ออเดอร์", render: (c) => <span>{c.orders}</span> },
              { key: "satisfaction", label: "ความพึงพอใจ", render: (c) => (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-amber-400" />
                  <span>{c.satisfaction}%</span>
                </div>
              )},
              { key: "lastContact", label: "ติดต่อล่าสุด", render: (c) => <span className="text-gray-400">{c.lastContact}</span> },
              { key: "actions", label: "", render: (c) => (
                <ActionMenu items={[
                  { label: "ดูรายละเอียด", icon: Eye, onClick: () => openCustomer(c) },
                  { label: "แก้ไข", icon: Edit },
                  { label: "โทร", icon: Phone },
                  { label: "ส่งอีเมล", icon: Mail },
                  { label: "ลบ", icon: Trash2, danger: true },
                ]} />
              )},
            ]}
            data={filteredCustomers.slice(0, 100)}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "leads" && (
        <Card>
          <SectionHeader title={`ลีด (${filteredLeads.length} ราย)`} />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (l) => <span className="font-mono text-[10px] text-gray-400">{l.id}</span> },
              { key: "name", label: "ชื่อ", render: (l) => <span className="font-medium">{l.name}</span> },
              { key: "source", label: "แหล่ง", render: (l) => <StatusBadge status={l.source} /> },
              { key: "score", label: "Score", render: (l) => (
                <div className="flex items-center gap-2">
                  <ProgressBar pct={l.score} color={l.score > 70 ? "bg-green-500" : l.score > 40 ? "bg-amber-500" : "bg-red-500"} />
                  <span className="text-[10px]">{l.score}</span>
                </div>
              )},
              { key: "stage", label: "สถานะ", render: (l) => <StatusBadge status={l.stage} /> },
              { key: "estimatedValue", label: "มูลค่าประเมิน", render: (l) => <span className="font-semibold">{formatTHB(l.estimatedValue)}</span> },
              { key: "assignedTo", label: "ทีม", render: (l) => <span className="text-gray-400">{l.assignedTo}</span> },
              { key: "date", label: "วันที่", render: (l) => <span className="text-gray-400">{l.date}</span> },
              { key: "actions", label: "", render: () => (
                <ActionMenu items={[
                  { label: "ดูรายละเอียด", icon: Eye },
                  { label: "แก้ไข", icon: Edit },
                  { label: "โทร", icon: Phone },
                  { label: "ลบ", icon: Trash2, danger: true },
                ]} />
              )},
            ]}
            data={filteredLeads}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "opportunities" && (
        <Card>
          <SectionHeader title={`โอกาสขาย (${filteredOpps.length} ราย)`} />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (o) => <span className="font-mono text-[10px] text-gray-400">{o.id}</span> },
              { key: "customer", label: "ลูกค้า", render: (o) => <span className="font-medium">{o.customer}</span> },
              { key: "amount", label: "มูลค่า", render: (o) => <span className="font-semibold">{formatTHB(o.amount)}</span> },
              { key: "stage", label: "ขั้นตอน", render: (o) => <StatusBadge status={o.stage} /> },
              { key: "probability", label: "โอกาส", render: (o) => (
                <div className="flex items-center gap-2">
                  <ProgressBar pct={o.probability} color={o.probability > 60 ? "bg-green-500" : "bg-amber-500"} />
                  <span className="text-[10px]">{o.probability}%</span>
                </div>
              )},
              { key: "expectedClose", label: "คาดว่าปิด", render: (o) => <span className="text-gray-400">{o.expectedClose}</span> },
              { key: "salesperson", label: "พนักงานขาย", render: (o) => <span className="text-gray-400">{o.salesperson}</span> },
              { key: "actions", label: "", render: () => (
                <ActionMenu items={[
                  { label: "ดูรายละเอียด", icon: Eye },
                  { label: "แก้ไข", icon: Edit },
                  { label: "ลบ", icon: Trash2, danger: true },
                ]} />
              )},
            ]}
            data={filteredOpps}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "quotes" && (
        <Card>
          <SectionHeader title={`ใบเสนอราคา (${filteredQuotes.length} ราย)`} />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (q) => <span className="font-mono text-[10px] text-gray-400">{q.id}</span> },
              { key: "customer", label: "ลูกค้า", render: (q) => <span className="font-medium">{q.customer}</span> },
              { key: "amount", label: "มูลค่า", render: (q) => <span className="font-semibold">{formatTHB(q.amount)}</span> },
              { key: "status", label: "สถานะ", render: (q) => <StatusBadge status={q.status} /> },
              { key: "date", label: "วันที่", render: (q) => <span className="text-gray-400">{q.date}</span> },
              { key: "validUntil", label: "หมดอายุ", render: (q) => <span className="text-gray-400">{q.validUntil}</span> },
              { key: "salesperson", label: "พนักงานขาย", render: (q) => <span className="text-gray-400">{q.salesperson}</span> },
              { key: "actions", label: "", render: () => (
                <ActionMenu items={[
                  { label: "ดู", icon: Eye },
                  { label: "แก้ไข", icon: Edit },
                  { label: "ส่ง", icon: Mail },
                  { label: "พิมพ์", icon: FileText },
                  { label: "ลบ", icon: Trash2, danger: true },
                ]} />
              )},
            ]}
            data={filteredQuotes}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "pipeline" && (
        <div className="grid gap-4 lg:grid-cols-5">
          {pipelineStages.map((stage, i) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">{stage.stage}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${stage.color} text-white`}>{stage.count}</span>
                </div>
                <div className="space-y-2">
                  {allOpportunities.filter(o => {
                    const stageMap: Record<string, string> = {
                      "ค้นหาลูกค้า": "ลีดใหม่",
                      "ติดต่อ": "ติดต่อแล้ว",
                      "เสนอราคา": "เสนอราคา",
                      "เจรจา": "เสนอราคา",
                      "ปิดการขาย": "ปิดการขาย",
                      "ได้รับ": "ปิดการขาย",
                    };
                    return stageMap[o.stage] === stage.stage;
                  }).slice(0, 4).map((opp) => (
                    <div key={opp.id} className="rounded-xl border border-gray-200/60 p-3 dark:border-white/5">
                      <p className="text-xs font-medium">{opp.customer}</p>
                      <p className="mt-1 text-xs font-bold text-green-500">{formatTHB(opp.amount)}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[10px] text-gray-400">{opp.salesperson}</span>
                        <span className="text-[10px] text-gray-400">{opp.probability}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Customer 360 Drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Customer 360" width={520}>
        {selectedCustomer && (
          <div className="space-y-5">
            <div className="rounded-xl border border-gray-200/60 p-4 dark:border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">{selectedCustomer.name}</h3>
                  <p className="text-xs text-gray-400">{selectedCustomer.id} · {selectedCustomer.type}</p>
                </div>
                <StatusBadge status={selectedCustomer.stage} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-gray-200/60 p-3 dark:border-white/10">
                <p className="text-[10px] text-gray-400">มูลค่ารวม</p>
                <p className="text-sm font-bold">{formatTHB(selectedCustomer.value)}</p>
              </div>
              <div className="rounded-xl border border-gray-200/60 p-3 dark:border-white/10">
                <p className="text-[10px] text-gray-400">ออเดอร์ทั้งหมด</p>
                <p className="text-sm font-bold">{selectedCustomer.orders} ครั้ง</p>
              </div>
              <div className="rounded-xl border border-gray-200/60 p-3 dark:border-white/10">
                <p className="text-[10px] text-gray-400">ยอดเฉลี่ย/ครั้ง</p>
                <p className="text-sm font-bold">{formatTHB(selectedCustomer.avgOrder)}</p>
              </div>
              <div className="rounded-xl border border-gray-200/60 p-3 dark:border-white/10">
                <p className="text-[10px] text-gray-400">ความพึงพอใจ</p>
                <p className="text-sm font-bold text-amber-500">{selectedCustomer.satisfaction}%</p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold">ข้อมูลติดต่อ</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <Phone className="h-3.5 w-3.5 text-gray-400" />
                  <span>{selectedCustomer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Mail className="h-3.5 w-3.5 text-gray-400" />
                  <span>{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Building2 className="h-3.5 w-3.5 text-gray-400" />
                  <span>{selectedCustomer.city}</span>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold">ประวัติการติดต่อ</p>
              <div className="space-y-2">
                {["2 วันที่แล้ว - โทรหาลูกค้า", "1 สัปดาห์ที่แล้ว - ส่งใบเสนอราคา", "2 สัปดาห์ที่แล้ว - นัดหมายเยี่ยม"].map((act, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg border border-gray-200/60 p-2 text-xs dark:border-white/5">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold">บันทึก</p>
              <textarea
                className="w-full rounded-xl border border-gray-200/60 bg-gray-50 p-3 text-xs outline-none focus:border-green-500/40 dark:border-white/10 dark:bg-white/5"
                rows={3}
                placeholder="เพิ่มบันทึก..."
              />
            </div>

            <div className="flex gap-2">
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-green-600 py-2.5 text-xs font-medium text-white hover:bg-green-700">
                <Phone className="h-3.5 w-3.5" /> โทร
              </button>
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200/60 py-2.5 text-xs font-medium hover:border-green-500/40 dark:border-white/10">
                <Mail className="h-3.5 w-3.5" /> อีเมล
              </button>
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200/60 py-2.5 text-xs font-medium hover:border-green-500/40 dark:border-white/10">
                <FileText className="h-3.5 w-3.5" /> ใบเสนอราคา
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
