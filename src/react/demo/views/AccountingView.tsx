import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText, Receipt, Wallet, CreditCard, BookOpen, Calculator,
  TrendingUp, TrendingDown, DollarSign, Download, Plus, Eye, Edit, Trash2,
  ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import {
  KpiCard, Card, DataTable, StatusBadge, SubTabs, FilterBar,
  AnimatedCounter, LineChart, ProgressBar, SectionHeader, ActionMenu,
  MultiLineChart, DonutChart,
} from "../ui";
import {
  allInvoices, allExpenses, allPayments, allIncome, allLedger,
  reportData, formatTHB,
} from "../data";

export default function AccountingView() {
  const [tab, setTab] = useState("dashboard");
  const [search, setSearch] = useState("");

  const tabs = [
    { id: "dashboard", label: "Financial Dashboard" },
    { id: "invoices", label: "ใบแจ้งหนี้" },
    { id: "payments", label: "การชำระ" },
    { id: "income", label: "รายได้" },
    { id: "expenses", label: "ค่าใช้จ่าย" },
    { id: "ledger", label: "บัญชีแยกประเภท" },
  ];

  const filteredInvoices = allInvoices.filter(i =>
    i.id.toLowerCase().includes(search.toLowerCase()) ||
    i.customer.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPayments = allPayments.filter(p =>
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.customer.toLowerCase().includes(search.toLowerCase())
  );

  const filteredIncome = allIncome.filter(i =>
    i.id.toLowerCase().includes(search.toLowerCase()) ||
    i.source.toLowerCase().includes(search.toLowerCase())
  );

  const filteredExpenses = allExpenses.filter(e =>
    e.id.toLowerCase().includes(search.toLowerCase()) ||
    e.category.toLowerCase().includes(search.toLowerCase())
  );

  const filteredLedger = allLedger.filter(l =>
    l.accountName.toLowerCase().includes(search.toLowerCase()) ||
    l.description.toLowerCase().includes(search.toLowerCase())
  );

  const accountingKPIs = [
    { label: "รายได้รวม", value: 5200000, prefix: "฿", change: 18.2, up: true, icon: TrendingUp, color: "text-green-500" },
    { label: "ค่าใช้จ่ายรวม", value: 3850000, prefix: "฿", change: 12.1, up: false, icon: TrendingDown, color: "text-red-500" },
    { label: "กำไรสุทธิ", value: 1350000, prefix: "฿", change: 22.5, up: true, icon: DollarSign, color: "text-blue-500" },
    { label: "ภาษี", value: 94500, prefix: "฿", change: 8.3, up: true, icon: Calculator, color: "text-amber-500" },
  ];

  const expenseBreakdown = [
    { label: "ค่าจ้างพนักงาน", value: 1800000, color: "bg-blue-500" },
    { label: "ค่าโฆษณา", value: 650000, color: "bg-purple-500" },
    { label: "ค่าเช่า", value: 450000, color: "bg-amber-500" },
    { label: "ค่าขนส่ง", value: 320000, color: "bg-cyan-500" },
    { label: "อื่นๆ", value: 630000, color: "bg-green-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {accountingKPIs.map((kpi, i) => (
          <KpiCard key={kpi.label} {...kpi} index={i} />
        ))}
      </div>

      <SubTabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === "dashboard" && (
        <div className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <SectionHeader title="รายได้ vs ค่าใช้จ่าย vs กำไร" />
              <MultiLineChart
                data={reportData}
                lines={[
                  { key: "revenue", color: "#16a34a", name: "รายได้" },
                  { key: "expenses", color: "#ef4444", name: "ค่าใช้จ่าย" },
                  { key: "profit", color: "#3b82f6", name: "กำไร" },
                ]}
                height={260}
              />
            </Card>
            <Card>
              <SectionHeader title="โครงสร้างค่าใช้จ่าย" />
              <DonutChart
                segments={expenseBreakdown.map(e => ({ label: e.label, value: Math.round(e.value / 1000), color: e.color }))}
                size={180}
              />
            </Card>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <p className="text-xs text-gray-400">สินทรัพย์รวม</p>
              <p className="mt-2 text-2xl font-bold text-green-500">
                <AnimatedCounter value={8420000} prefix="฿" />
              </p>
              <p className="mt-1 text-xs text-green-500">+8.2%</p>
            </Card>
            <Card>
              <p className="text-xs text-gray-400">หนี้สินรวม</p>
              <p className="mt-2 text-2xl font-bold text-red-500">
                <AnimatedCounter value={3200000} prefix="฿" />
              </p>
              <p className="mt-1 text-xs text-red-500">+3.1%</p>
            </Card>
            <Card>
              <p className="text-xs text-gray-400">ส่วนของผู้ถือหุ้น</p>
              <p className="mt-2 text-2xl font-bold text-blue-500">
                <AnimatedCounter value={5220000} prefix="฿" />
              </p>
              <p className="mt-1 text-xs text-green-500">+12.5%</p>
            </Card>
            <Card>
              <p className="text-xs text-gray-400">กระแสเงินสด</p>
              <p className="mt-2 text-2xl font-bold text-purple-500">
                <AnimatedCounter value={680000} prefix="฿" />
              </p>
              <p className="mt-1 text-xs text-green-500">+15.7%</p>
            </Card>
          </div>
        </div>
      )}

      {tab !== "dashboard" && <FilterBar placeholder="ค้นหา..." onSearch={setSearch} />}

      {tab === "invoices" && (
        <Card>
          <SectionHeader title={`ใบแจ้งหนี้ (${filteredInvoices.length} ราย)`} action={
            <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
              <Plus className="h-3.5 w-3.5" /> สร้างใบแจ้งหนี้
            </button>
          } />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (i) => <span className="font-mono text-[10px] text-gray-400">{i.id}</span> },
              { key: "customer", label: "ลูกค้า", render: (i) => <span className="font-medium">{i.customer}</span> },
              { key: "date", label: "วันที่", render: (i) => <span className="text-gray-400">{i.date}</span> },
              { key: "dueDate", label: "ครบกำหนด", render: (i) => <span className="text-gray-400">{i.dueDate}</span> },
              { key: "amount", label: "ยอดก่อนภาษี", render: (i) => <span>{formatTHB(i.amount)}</span> },
              { key: "tax", label: "ภาษี", render: (i) => <span className="text-gray-400">{formatTHB(i.tax)}</span> },
              { key: "total", label: "รวม", render: (i) => <span className="font-semibold">{formatTHB(i.total)}</span> },
              { key: "status", label: "สถานะ", render: (i) => <StatusBadge status={i.status} /> },
              { key: "actions", label: "", render: () => (
                <ActionMenu items={[
                  { label: "ดู", icon: Eye },
                  { label: "แก้ไข", icon: Edit },
                  { label: "พิมพ์", icon: FileText },
                  { label: "ส่ง", icon: Receipt },
                  { label: "ลบ", icon: Trash2, danger: true },
                ]} />
              )},
            ]}
            data={filteredInvoices.slice(0, 200)}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "payments" && (
        <Card>
          <SectionHeader title={`การชำระเงิน (${filteredPayments.length} ราย)`} />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (p) => <span className="font-mono text-[10px] text-gray-400">{p.id}</span> },
              { key: "invoiceId", label: "ใบแจ้งหนี้", render: (p) => <span className="font-mono text-[10px]">{p.invoiceId}</span> },
              { key: "customer", label: "ลูกค้า", render: (p) => <span className="font-medium">{p.customer}</span> },
              { key: "amount", label: "ยอด", render: (p) => <span className="font-semibold">{formatTHB(p.amount)}</span> },
              { key: "method", label: "วิธี", render: (p) => <span className="text-gray-400">{p.method}</span> },
              { key: "reference", label: "อ้างอิง", render: (p) => <span className="font-mono text-[10px] text-gray-400">{p.reference}</span> },
              { key: "status", label: "สถานะ", render: (p) => <StatusBadge status={p.status} /> },
              { key: "date", label: "วันที่", render: (p) => <span className="text-gray-400">{p.date}</span> },
            ]}
            data={filteredPayments}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "income" && (
        <Card>
          <SectionHeader title={`รายได้ (${filteredIncome.length} ราย)`} />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (i) => <span className="font-mono text-[10px] text-gray-400">{i.id}</span> },
              { key: "source", label: "แหล่ง", render: (i) => <span className="font-medium">{i.source}</span> },
              { key: "customer", label: "ลูกค้า", render: (i) => <span className="text-gray-400">{i.customer}</span> },
              { key: "amount", label: "ยอด", render: (i) => <span className="font-semibold text-green-500">{formatTHB(i.amount)}</span> },
              { key: "method", label: "วิธี", render: (i) => <span className="text-gray-400">{i.method}</span> },
              { key: "status", label: "สถานะ", render: (i) => <StatusBadge status={i.status} /> },
              { key: "date", label: "วันที่", render: (i) => <span className="text-gray-400">{i.date}</span> },
            ]}
            data={filteredIncome}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "expenses" && (
        <Card>
          <SectionHeader title={`ค่าใช้จ่าย (${filteredExpenses.length} ราย)`} action={
            <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
              <Plus className="h-3.5 w-3.5" /> เพิ่มค่าใช้จ่าย
            </button>
          } />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (e) => <span className="font-mono text-[10px] text-gray-400">{e.id}</span> },
              { key: "category", label: "หมวด", render: (e) => <span className="font-medium">{e.category}</span> },
              { key: "amount", label: "ยอด", render: (e) => <span className="font-semibold text-red-500">{formatTHB(e.amount)}</span> },
              { key: "vendor", label: "ผู้รับ", render: (e) => <span className="text-gray-400">{e.vendor}</span> },
              { key: "paymentMethod", label: "วิธี", render: (e) => <span className="text-gray-400">{e.paymentMethod}</span> },
              { key: "approvedBy", label: "อนุมัติโดย", render: (e) => <span className="text-gray-400">{e.approvedBy}</span> },
              { key: "status", label: "สถานะ", render: (e) => <StatusBadge status={e.status} /> },
              { key: "date", label: "วันที่", render: (e) => <span className="text-gray-400">{e.date}</span> },
              { key: "actions", label: "", render: () => (
                <ActionMenu items={[
                  { label: "ดู", icon: Eye },
                  { label: "แก้ไข", icon: Edit },
                  { label: "ลบ", icon: Trash2, danger: true },
                ]} />
              )},
            ]}
            data={filteredExpenses}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "ledger" && (
        <Card>
          <SectionHeader title={`บัญชีแยกประเภท (${filteredLedger.length} ราย)`} />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (l) => <span className="font-mono text-[10px] text-gray-400">{l.id}</span> },
              { key: "date", label: "วันที่", render: (l) => <span className="text-gray-400">{l.date}</span> },
              { key: "accountCode", label: "รหัสบัญชี", render: (l) => <span className="font-mono text-[10px]">{l.accountCode}</span> },
              { key: "accountName", label: "ชื่อบัญชี", render: (l) => <span className="font-medium">{l.accountName}</span> },
              { key: "accountType", label: "ประเภท", render: (l) => <StatusBadge status={l.accountType} /> },
              { key: "description", label: "รายการ", render: (l) => <span className="text-gray-400">{l.description}</span> },
              { key: "debit", label: "เดบิต", render: (l) => <span className={l.debit ? "font-semibold text-green-500" : ""}>{l.debit ? formatTHB(l.debit) : "—"}</span> },
              { key: "credit", label: "เครดิต", render: (l) => <span className={l.credit ? "font-semibold text-red-500" : ""}>{l.credit ? formatTHB(l.credit) : "—"}</span> },
              { key: "reference", label: "อ้างอิง", render: (l) => <span className="font-mono text-[10px] text-gray-400">{l.reference}</span> },
            ]}
            data={filteredLedger}
            pageSize={10}
          />
        </Card>
      )}
    </div>
  );
}
