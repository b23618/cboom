import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package, CheckCircle2, AlertCircle, X, ShoppingBag, Truck,
  RefreshCw, DollarSign, Webhook, Download, Plus, Eye, Edit, Trash2,
  TrendingUp, Store, Zap,
} from "lucide-react";
import {
  KpiCard, Card, DataTable, StatusBadge, SubTabs, FilterBar,
  ProgressBar, AnimatedCounter, SectionHeader, ActionMenu, DonutChart,
} from "../ui";
import {
  allProducts, allOrders, allReturns, allSettlements, allApiLogs,
  webhookLogs, channelData, formatTHB,
} from "../data";

export default function MarketplaceView() {
  const [tab, setTab] = useState("orders");
  const [search, setSearch] = useState("");

  const tabs = [
    { id: "orders", label: "ออเดอร์" },
    { id: "products", label: "สินค้า" },
    { id: "returns", label: "การคืนสินค้า" },
    { id: "settlements", label: "การเงิน/Settlement" },
    { id: "api", label: "API Logs" },
    { id: "webhooks", label: "Webhooks" },
  ];

  const filteredOrders = allOrders.filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.customer.toLowerCase().includes(search.toLowerCase()) ||
    o.channel.toLowerCase().includes(search.toLowerCase())
  );

  const filteredProducts = allProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const filteredReturns = allReturns.filter(r =>
    r.id.toLowerCase().includes(search.toLowerCase()) ||
    r.customer.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSettlements = allSettlements.filter(s =>
    s.id.toLowerCase().includes(search.toLowerCase()) ||
    s.channel.toLowerCase().includes(search.toLowerCase())
  );

  const filteredApiLogs = allApiLogs.filter(l =>
    l.endpoint.toLowerCase().includes(search.toLowerCase()) ||
    l.method.toLowerCase().includes(search.toLowerCase())
  );

  const marketKPIs = [
    { label: "ออเดอร์ทั้งหมด", value: allOrders.length, prefix: "", change: 22.1, up: true, icon: ShoppingBag, color: "text-blue-500" },
    { label: "สินค้าทั้งหมด", value: allProducts.length, prefix: "", change: 5.3, up: true, icon: Package, color: "text-purple-500" },
    { label: "GMV", value: allOrders.reduce((s, o) => s + o.amount, 0), prefix: "฿", change: 18.7, up: true, icon: DollarSign, color: "text-green-500" },
    { label: "อัตราคืนสินค้า", value: 2.8, prefix: "", suffix: "%", change: -0.5, up: false, icon: RefreshCw, color: "text-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {marketKPIs.map((kpi, i) => (
          <KpiCard key={kpi.label} {...kpi} index={i} />
        ))}
      </div>

      <SubTabs tabs={tabs} active={tab} onChange={setTab} />
      <FilterBar placeholder="ค้นหา..." onSearch={setSearch} />

      {tab === "orders" && (
        <Card>
          <SectionHeader title={`ออเดอร์ (${filteredOrders.length} ราย)`} action={
            <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
              <Plus className="h-3.5 w-3.5" /> สร้างออเดอร์
            </button>
          } />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (o) => <span className="font-mono text-[10px] text-gray-400">{o.id}</span> },
              { key: "channel", label: "ช่องทาง", render: (o) => (
                <span className={`rounded-lg px-2 py-0.5 text-[10px] font-medium ${
                  o.channel === "Shopee" ? "bg-orange-500/10 text-orange-500" :
                  o.channel === "TikTok Shop" ? "bg-pink-500/10 text-pink-500" :
                  "bg-blue-500/10 text-blue-500"
                }`}>{o.channel}</span>
              )},
              { key: "customer", label: "ลูกค้า", render: (o) => <span className="font-medium">{o.customer}</span> },
              { key: "items", label: "ชิ้น", render: (o) => <span>{o.items}</span> },
              { key: "amount", label: "ยอด", render: (o) => <span className="font-semibold">{formatTHB(o.amount)}</span> },
              { key: "paymentMethod", label: "ชำระ", render: (o) => <span className="text-gray-400">{o.paymentMethod}</span> },
              { key: "shipping", label: "จัดส่ง", render: (o) => <span className="text-gray-400">{o.shipping}</span> },
              { key: "status", label: "สถานะ", render: (o) => <StatusBadge status={o.status} /> },
              { key: "time", label: "เวลา", render: (o) => <span className="text-gray-400">{o.time}</span> },
              { key: "actions", label: "", render: () => (
                <ActionMenu items={[
                  { label: "ดู", icon: Eye },
                  { label: "แก้ไข", icon: Edit },
                  { label: "พิมพ์", icon: Download },
                  { label: "ยกเลิก", icon: X, danger: true },
                ]} />
              )},
            ]}
            data={filteredOrders.slice(0, 200)}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "products" && (
        <Card>
          <SectionHeader title={`สินค้า (${filteredProducts.length} ราย)`} action={
            <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
              <Plus className="h-3.5 w-3.5" /> เพิ่มสินค้า
            </button>
          } />
          <DataTable
            columns={[
              { key: "sku", label: "SKU", render: (p) => <span className="font-mono text-[10px] text-gray-400">{p.sku}</span> },
              { key: "name", label: "ชื่อ", render: (p) => <span className="font-medium">{p.name}</span> },
              { key: "category", label: "หมวด", render: (p) => <span className="text-gray-400">{p.category}</span> },
              { key: "price", label: "ราคา", render: (p) => <span className="font-semibold">{formatTHB(p.price)}</span> },
              { key: "stock", label: "สต๊อก", render: (p) => (
                <span className={p.stock < 20 ? "text-amber-500 font-semibold" : ""}>{p.stock}</span>
              )},
              { key: "shopee", label: "Shopee", render: (p) => <span className="text-orange-500">{p.shopee}</span> },
              { key: "tiktok", label: "TikTok", render: (p) => <span className="text-pink-500">{p.tiktok}</span> },
              { key: "lazada", label: "Lazada", render: (p) => <span className="text-blue-500">{p.lazada}</span> },
              { key: "sold", label: "ขายแล้ว", render: (p) => <span>{p.sold}</span> },
              { key: "rating", label: "Rating", render: (p) => <span>{p.rating}★</span> },
              { key: "status", label: "สถานะ", render: (p) => <StatusBadge status={p.status} /> },
              { key: "actions", label: "", render: () => (
                <ActionMenu items={[
                  { label: "ดู", icon: Eye },
                  { label: "แก้ไข", icon: Edit },
                  { label: "ลบ", icon: Trash2, danger: true },
                ]} />
              )},
            ]}
            data={filteredProducts.slice(0, 200)}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "returns" && (
        <Card>
          <SectionHeader title={`การคืนสินค้า (${filteredReturns.length} ราย)`} />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (r) => <span className="font-mono text-[10px] text-gray-400">{r.id}</span> },
              { key: "orderId", label: "ออเดอร์", render: (r) => <span className="font-mono text-[10px]">{r.orderId}</span> },
              { key: "customer", label: "ลูกค้า", render: (r) => <span className="font-medium">{r.customer}</span> },
              { key: "channel", label: "ช่องทาง", render: (r) => <span className="text-gray-400">{r.channel}</span> },
              { key: "amount", label: "ยอด", render: (r) => <span className="font-semibold">{formatTHB(r.amount)}</span> },
              { key: "reason", label: "เหตุผล", render: (r) => <span className="text-gray-400">{r.reason}</span> },
              { key: "status", label: "สถานะ", render: (r) => <StatusBadge status={r.status} /> },
              { key: "date", label: "วันที่", render: (r) => <span className="text-gray-400">{r.date}</span> },
              { key: "actions", label: "", render: () => (
                <ActionMenu items={[
                  { label: "ดู", icon: Eye },
                  { label: "อนุมัติ", icon: CheckCircle2 },
                  { label: "ปฏิเสธ", icon: X, danger: true },
                ]} />
              )},
            ]}
            data={filteredReturns}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "settlements" && (
        <Card>
          <SectionHeader title={`Settlement (${filteredSettlements.length} ราย)`} />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (s) => <span className="font-mono text-[10px] text-gray-400">{s.id}</span> },
              { key: "channel", label: "ช่องทาง", render: (s) => (
                <span className={`rounded-lg px-2 py-0.5 text-[10px] font-medium ${
                  s.channel === "Shopee" ? "bg-orange-500/10 text-orange-500" :
                  s.channel === "TikTok Shop" ? "bg-pink-500/10 text-pink-500" :
                  "bg-blue-500/10 text-blue-500"
                }`}>{s.channel}</span>
              )},
              { key: "period", label: "งวด", render: (s) => <span className="text-gray-400">{s.period}</span> },
              { key: "gross", label: "ยอดรวม", render: (s) => <span>{formatTHB(s.gross)}</span> },
              { key: "fee", label: "ค่าธรรมเนียม", render: (s) => <span className="text-red-400">-{formatTHB(s.fee)}</span> },
              { key: "net", label: "ได้รับ", render: (s) => <span className="font-semibold text-green-500">{formatTHB(s.net)}</span> },
              { key: "orders", label: "ออเดอร์", render: (s) => <span>{s.orders}</span> },
              { key: "status", label: "สถานะ", render: (s) => <StatusBadge status={s.status} /> },
              { key: "date", label: "วันที่", render: (s) => <span className="text-gray-400">{s.date}</span> },
            ]}
            data={filteredSettlements}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "api" && (
        <Card>
          <SectionHeader title={`API Logs (${filteredApiLogs.length} ราย)`} />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (l) => <span className="font-mono text-[10px] text-gray-400">{l.id}</span> },
              { key: "method", label: "Method", render: (l) => (
                <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                  l.method === "GET" ? "bg-blue-500/10 text-blue-500" :
                  l.method === "POST" ? "bg-green-500/10 text-green-500" :
                  l.method === "PUT" ? "bg-amber-500/10 text-amber-500" :
                  "bg-red-500/10 text-red-500"
                }`}>{l.method}</span>
              )},
              { key: "endpoint", label: "Endpoint", render: (l) => <span className="font-mono text-[10px]">{l.endpoint}</span> },
              { key: "status", label: "Status", render: (l) => (
                <span className={l.status >= 200 && l.status < 300 ? "text-green-500" : "text-red-500"}>{l.status}</span>
              )},
              { key: "responseTime", label: "เวลา", render: (l) => <span className="text-gray-400">{l.responseTime}ms</span> },
              { key: "ip", label: "IP", render: (l) => <span className="font-mono text-[10px] text-gray-400">{l.ip}</span> },
              { key: "time", label: "เวลา", render: (l) => <span className="text-gray-400">{l.time}</span> },
              { key: "date", label: "วันที่", render: (l) => <span className="text-gray-400">{l.date}</span> },
            ]}
            data={filteredApiLogs}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "webhooks" && (
        <Card>
          <SectionHeader title="Webhook Logs" />
          <DataTable
            columns={[
              { key: "event", label: "Event", render: (w) => <span className="font-mono text-[10px] font-medium">{w.event}</span> },
              { key: "source", label: "Source", render: (w) => <span className="text-gray-400">{w.source}</span> },
              { key: "status", label: "Status", render: (w) => <StatusBadge status={w.status} /> },
              { key: "response", label: "Response", render: (w) => <span className="text-gray-400">{w.response}</span> },
              { key: "time", label: "เวลา", render: (w) => <span className="text-gray-400">{w.time}</span> },
            ]}
            data={webhookLogs}
            pageSize={10}
          />
        </Card>
      )}
    </div>
  );
}
