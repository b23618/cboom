import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package, Warehouse, Truck, ScanLine, ArrowRightLeft, ClipboardList,
  Box, AlertTriangle, CheckCircle2, MapPin, Plus, Barcode, Eye, Edit, Trash2,
  TrendingUp, Building2,
} from "lucide-react";
import {
  KpiCard, Card, DataTable, StatusBadge, SubTabs, FilterBar,
  ProgressBar, AnimatedCounter, SectionHeader, ActionMenu,
} from "../ui";
import {
  allProducts, allSuppliers, allPurchaseOrders, allStockMovements,
  allCycleCounts, thaiWarehouseItems, thaiPickings, formatTHB,
} from "../data";

export default function WarehouseView() {
  const [tab, setTab] = useState("inventory");
  const [search, setSearch] = useState("");

  const tabs = [
    { id: "inventory", label: "สินค้าคงคลัง" },
    { id: "po", label: "ใบสั่งซื้อ" },
    { id: "movements", label: "การเคลื่อนย้าย" },
    { id: "cycle", label: "ตรวจนับ" },
    { id: "pickings", label: "หยิบสินค้า" },
    { id: "suppliers", label: "ซัพพลายเออร์" },
  ];

  const filteredProducts = allProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPOs = allPurchaseOrders.filter(p =>
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.supplier.toLowerCase().includes(search.toLowerCase())
  );

  const filteredMovements = allStockMovements.filter(m =>
    m.sku.toLowerCase().includes(search.toLowerCase()) ||
    m.product.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCycleCounts = allCycleCounts.filter(c =>
    c.sku.toLowerCase().includes(search.toLowerCase()) ||
    c.product.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSuppliers = allSuppliers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase())
  );

  const warehouseKPIs = [
    { label: "มูลค่าสต๊อก", value: 18420000, prefix: "฿", change: 5.2, up: true, icon: Box, color: "text-green-500" },
    { label: "สินค้าทั้งหมด", value: allProducts.length, prefix: "", change: 3.1, up: true, icon: Package, color: "text-blue-500" },
    { label: "ใกล้หมด", value: allProducts.filter(p => p.status === "ใกล้หมด").length, prefix: "", change: -8, up: false, icon: AlertTriangle, color: "text-amber-500" },
    { label: "ซัพพลายเออร์", value: allSuppliers.length, prefix: "", change: 2.5, up: true, icon: Building2, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {warehouseKPIs.map((kpi, i) => (
          <KpiCard key={kpi.label} {...kpi} index={i} />
        ))}
      </div>

      <SubTabs tabs={tabs} active={tab} onChange={setTab} />
      <FilterBar placeholder="ค้นหา..." onSearch={setSearch} />

      {tab === "inventory" && (
        <Card>
          <SectionHeader title={`สินค้าคงคลัง (${filteredProducts.length} ราย)`} action={
            <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
              <Plus className="h-3.5 w-3.5" /> เพิ่มสินค้า
            </button>
          } />
          <DataTable
            columns={[
              { key: "sku", label: "SKU", render: (p) => <span className="font-mono text-[10px] text-gray-400">{p.sku}</span> },
              { key: "name", label: "ชื่อ", render: (p) => <span className="font-medium">{p.name}</span> },
              { key: "category", label: "หมวด", render: (p) => <span className="text-gray-400">{p.category}</span> },
              { key: "cost", label: "ต้นทุน", render: (p) => <span>{formatTHB(p.cost)}</span> },
              { key: "stock", label: "สต๊อก", render: (p) => (
                <span className={p.stock < 20 ? "text-amber-500 font-semibold" : ""}>{p.stock}</span>
              )},
              { key: "status", label: "สถานะ", render: (p) => <StatusBadge status={p.status} /> },
              { key: "actions", label: "", render: () => (
                <ActionMenu items={[
                  { label: "ดู", icon: Eye },
                  { label: "แก้ไข", icon: Edit },
                  { label: "สแกน", icon: Barcode },
                  { label: "ลบ", icon: Trash2, danger: true },
                ]} />
              )},
            ]}
            data={filteredProducts.slice(0, 200)}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "po" && (
        <Card>
          <SectionHeader title={`ใบสั่งซื้อ (${filteredPOs.length} ราย)`} action={
            <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
              <Plus className="h-3.5 w-3.5" /> สร้าง PO
            </button>
          } />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (p) => <span className="font-mono text-[10px] text-gray-400">{p.id}</span> },
              { key: "supplier", label: "ซัพพลายเออร์", render: (p) => <span className="font-medium">{p.supplier}</span> },
              { key: "product", label: "สินค้า", render: (p) => <span className="text-gray-400">{p.product}</span> },
              { key: "qty", label: "จำนวน", render: (p) => <span>{p.qty}</span> },
              { key: "total", label: "มูลค่า", render: (p) => <span className="font-semibold">{formatTHB(p.total)}</span> },
              { key: "status", label: "สถานะ", render: (p) => <StatusBadge status={p.status} /> },
              { key: "warehouse", label: "คลัง", render: (p) => <span className="text-gray-400">{p.warehouse}</span> },
              { key: "expectedDate", label: "รับเข้า", render: (p) => <span className="text-gray-400">{p.expectedDate}</span> },
              { key: "actions", label: "", render: () => (
                <ActionMenu items={[
                  { label: "ดู", icon: Eye },
                  { label: "แก้ไข", icon: Edit },
                  { label: "รับเข้า", icon: CheckCircle2 },
                  { label: "ยกเลิก", icon: Trash2, danger: true },
                ]} />
              )},
            ]}
            data={filteredPOs}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "movements" && (
        <Card>
          <SectionHeader title={`การเคลื่อนย้ายสินค้า (${filteredMovements.length} ราย)`} />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (m) => <span className="font-mono text-[10px] text-gray-400">{m.id}</span> },
              { key: "sku", label: "SKU", render: (m) => <span className="font-mono text-[10px]">{m.sku}</span> },
              { key: "product", label: "สินค้า", render: (m) => <span className="font-medium">{m.product}</span> },
              { key: "type", label: "ประเภท", render: (m) => <StatusBadge status={m.type} /> },
              { key: "qty", label: "จำนวน", render: (m) => (
                <span className={m.qty > 0 ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
                  {m.qty > 0 ? "+" : ""}{m.qty}
                </span>
              )},
              { key: "warehouse", label: "คลัง", render: (m) => <span className="text-gray-400">{m.warehouse}</span> },
              { key: "reference", label: "อ้างอิง", render: (m) => <span className="font-mono text-[10px] text-gray-400">{m.reference}</span> },
              { key: "user", label: "ผู้ทำ", render: (m) => <span className="text-gray-400">{m.user}</span> },
              { key: "date", label: "วันที่", render: (m) => <span className="text-gray-400">{m.date}</span> },
            ]}
            data={filteredMovements}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "cycle" && (
        <Card>
          <SectionHeader title={`ตรวจนับสินค้า (${filteredCycleCounts.length} ราย)`} action={
            <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
              <ClipboardList className="h-3.5 w-3.5" /> เริ่มตรวจนับ
            </button>
          } />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (c) => <span className="font-mono text-[10px] text-gray-400">{c.id}</span> },
              { key: "sku", label: "SKU", render: (c) => <span className="font-mono text-[10px]">{c.sku}</span> },
              { key: "product", label: "สินค้า", render: (c) => <span className="font-medium">{c.product}</span> },
              { key: "warehouse", label: "คลัง", render: (c) => <span className="text-gray-400">{c.warehouse}</span> },
              { key: "systemQty", label: "ระบบ", render: (c) => <span>{c.systemQty}</span> },
              { key: "actualQty", label: "จริง", render: (c) => <span className="font-semibold">{c.actualQty}</span> },
              { key: "diff", label: "ผลต่าง", render: (c) => (
                <span className={c.diff === 0 ? "text-green-500" : c.diff > 0 ? "text-cyan-500" : "text-red-500"}>
                  {c.diff > 0 ? "+" : ""}{c.diff}
                </span>
              )},
              { key: "status", label: "สถานะ", render: (c) => <StatusBadge status={c.status} /> },
              { key: "counter", label: "ผู้ตรวจ", render: (c) => <span className="text-gray-400">{c.counter}</span> },
              { key: "date", label: "วันที่", render: (c) => <span className="text-gray-400">{c.date}</span> },
            ]}
            data={filteredCycleCounts}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "pickings" && (
        <Card>
          <SectionHeader title="หยิบสินค้า" />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (p) => <span className="font-mono text-[10px] text-gray-400">{p.id}</span> },
              { key: "order", label: "ออเดอร์", render: (p) => <span className="font-mono text-[10px]">{p.order}</span> },
              { key: "product", label: "สินค้า", render: (p) => <span className="text-gray-400">{p.product}</span> },
              { key: "qty", label: "จำนวน", render: (p) => <span>{p.qty}</span> },
              { key: "picker", label: "ผู้หยิบ", render: (p) => <span className="text-gray-400">{p.picker}</span> },
              { key: "status", label: "สถานะ", render: (p) => <StatusBadge status={p.status} /> },
              { key: "date", label: "วันที่", render: (p) => <span className="text-gray-400">{p.date}</span> },
              { key: "actions", label: "", render: () => (
                <ActionMenu items={[
                  { label: "ดู", icon: Eye },
                  { label: "พิมพ์", icon: ClipboardList },
                ]} />
              )},
            ]}
            data={thaiPickings}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "suppliers" && (
        <Card>
          <SectionHeader title={`ซัพพลายเออร์ (${filteredSuppliers.length} ราย)`} action={
            <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
              <Plus className="h-3.5 w-3.5" /> เพิ่มซัพพลายเออร์
            </button>
          } />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (s) => <span className="font-mono text-[10px] text-gray-400">{s.id}</span> },
              { key: "name", label: "ชื่อ", render: (s) => <span className="font-medium">{s.name}</span> },
              { key: "contact", label: "ผู้ติดต่อ", render: (s) => <span className="text-gray-400">{s.contact}</span> },
              { key: "category", label: "หมวด", render: (s) => <span className="text-gray-400">{s.category}</span> },
              { key: "city", label: "จังหวัด", render: (s) => <span className="text-gray-400">{s.city}</span> },
              { key: "totalPO", label: "PO", render: (s) => <span>{s.totalPO}</span> },
              { key: "totalValue", label: "มูลค่ารวม", render: (s) => <span className="font-semibold">{formatTHB(s.totalValue)}</span> },
              { key: "leadTime", label: "Lead Time", render: (s) => <span>{s.leadTime} วัน</span> },
              { key: "rating", label: "Rating", render: (s) => <span>{s.rating}★</span> },
              { key: "status", label: "สถานะ", render: (s) => <StatusBadge status={s.status} /> },
              { key: "actions", label: "", render: () => (
                <ActionMenu items={[
                  { label: "ดู", icon: Eye },
                  { label: "แก้ไข", icon: Edit },
                  { label: "ลบ", icon: Trash2, danger: true },
                ]} />
              )},
            ]}
            data={filteredSuppliers}
            pageSize={10}
          />
        </Card>
      )}
    </div>
  );
}
