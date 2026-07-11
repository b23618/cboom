import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, Search, ScanLine, CreditCard, QrCode, Banknote,
  Users, Tag, Clock, CheckCircle2, X, Plus, Minus, Receipt,
  Store, TrendingUp, Gift, Calendar, Eye, Edit, Trash2,
} from "lucide-react";
import {
  KpiCard, Card, DataTable, StatusBadge, SubTabs, FilterBar,
  AnimatedCounter, SectionHeader, ActionMenu, ProgressBar,
} from "../ui";
import { posProducts, allPOSSales, formatTHB } from "../data";

export default function POSView() {
  const [tab, setTab] = useState("register");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<{ sku: string; name: string; price: number; qty: number }[]>([]);

  const tabs = [
    { id: "register", label: "หน้าขาย" },
    { id: "sales", label: "ประวัติการขาย" },
    { id: "promotions", label: "โปรโมชั่น" },
    { id: "shifts", label: "จัดการกะ" },
  ];

  const filteredProducts = posProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSales = allPOSSales.filter(s =>
    s.id.toLowerCase().includes(search.toLowerCase()) ||
    s.cashier.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product: any) => {
    const key = product.sku || product.barcode;
    setCart(prev => {
      const existing = prev.find(c => c.sku === key);
      if (existing) return prev.map(c => c.sku === key ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { sku: key, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const updateQty = (sku: string, delta: number) => {
    setCart(prev => prev.map(c => c.sku === sku ? { ...c, qty: Math.max(1, c.qty + delta) } : c));
  };

  const removeFromCart = (sku: string) => setCart(prev => prev.filter(c => c.sku !== sku));

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const promotions = [
    { id: "PROMO-001", name: "ลด 20% สินค้าในหมวดเสื้อผ้า", code: "SAVE20", discount: 20, type: "percent", uses: 342, limit: 1000, status: "เปิดใช้งาน", startDate: "2026-07-01", endDate: "2026-07-31" },
    { id: "PROMO-002", name: "ซื้อ 2 แถม 1 รองเท้า", code: "BUY2GET1", discount: 33, type: "bogo", uses: 128, limit: 500, status: "เปิดใช้งาน", startDate: "2026-07-05", endDate: "2026-07-20" },
    { id: "PROMO-003", name: "ลด 100 บาท ขั้นต่ำ 500", code: "SAVE100", discount: 100, type: "fixed", uses: 89, limit: 200, status: "เปิดใช้งาน", startDate: "2026-07-08", endDate: "2026-07-15" },
    { id: "PROMO-004", name: "ฟรีค่าจัดส่ง", code: "FREESHIP", discount: 50, type: "shipping", uses: 567, limit: 9999, status: "เปิดใช้งาน", startDate: "2026-07-01", endDate: "2026-12-31" },
    { id: "PROMO-005", name: "ส่วนลดสมาชิก VIP 15%", code: "VIP15", discount: 15, type: "percent", uses: 45, limit: 100, status: "ปิดใช้งาน", startDate: "2026-06-01", endDate: "2026-06-30" },
  ];

  const shifts = [
    { id: "S-001", name: "กะเช้า", time: "08:00 - 14:00", cashier: "คุณสมชัย ใจดี", sales: 12500, orders: 34, status: "ทำเสร็จ", date: "2026-07-11" },
    { id: "S-002", name: "กะบ่าย", time: "14:00 - 20:00", cashier: "คุณปนัดดา ศรีสุข", sales: 18600, orders: 52, status: "กำลังทำ", date: "2026-07-11" },
    { id: "S-003", name: "กะเช้า", time: "08:00 - 14:00", cashier: "คุณวิทยา พานิช", sales: 9800, orders: 28, status: "ทำเสร็จ", date: "2026-07-10" },
    { id: "S-004", name: "กะบ่าย", time: "14:00 - 20:00", cashier: "คุณอนุชา ออนไลน์", sales: 15200, orders: 41, status: "ทำเสร็จ", date: "2026-07-10" },
    { id: "S-005", name: "กะเช้า", time: "08:00 - 14:00", cashier: "คุณมาลี ขายดี", sales: 11200, orders: 31, status: "ทำเสร็จ", date: "2026-07-09" },
  ];

  const posKPIs = [
    { label: "ยอดขายวันนี้", value: 45600, prefix: "฿", change: 22.1, up: true, icon: ShoppingCart, color: "text-green-500" },
    { label: "ออเดอร์วันนี้", value: 128, prefix: "", change: 15.3, up: true, icon: Receipt, color: "text-blue-500" },
    { label: "ยอดเฉลี่ย/ออเดอร์", value: 356, prefix: "฿", change: 5.2, up: true, icon: TrendingUp, color: "text-purple-500" },
    { label: "สมาชิกใหม่", value: 12, prefix: "", change: 8.0, up: true, icon: Users, color: "text-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {posKPIs.map((kpi, i) => (
          <KpiCard key={kpi.label} {...kpi} index={i} />
        ))}
      </div>

      <SubTabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === "register" && (
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Product Grid */}
          <Card className="lg:col-span-2">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ค้นหาสินค้า..."
                className="w-full rounded-xl border border-gray-200/60 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-green-500/40 dark:border-white/10 dark:bg-white/5"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product, i) => (
                <motion.button
                  key={product.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => addToCart(product)}
                  className="rounded-xl border border-gray-200/60 p-3 text-left transition-all hover:border-green-500/40 hover:shadow-md dark:border-white/10"
                >
                  <div className="mb-2 flex h-16 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5">
                    <ShoppingCart className="h-6 w-6 text-gray-300 dark:text-white/20" />
                  </div>
                  <p className="text-xs font-medium line-clamp-2">{product.name}</p>
                  <p className="mt-1 text-sm font-bold text-green-500">{formatTHB(product.price)}</p>
                  <p className="text-[10px] text-gray-400">สต๊อก: {product.stock}</p>
                </motion.button>
              ))}
            </div>
          </Card>

          {/* Cart */}
          <Card>
            <SectionHeader title="ตะกร้าสินค้า" action={
              cart.length > 0 ? (
                <button onClick={() => setCart([])} className="text-xs text-red-400 hover:text-red-500">ล้าง</button>
              ) : null
            } />
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ShoppingCart className="h-10 w-10 text-gray-200 dark:text-white/10" />
                <p className="mt-3 text-xs text-gray-400">เพิ่มสินค้าลงตะกร้า</p>
              </div>
            ) : (
              <>
                <div className="max-h-[300px] space-y-2 overflow-y-auto">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={item.sku}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center gap-2 rounded-xl border border-gray-200/60 p-2 dark:border-white/5"
                      >
                        <div className="flex-1">
                          <p className="text-xs font-medium">{item.name}</p>
                          <p className="text-[10px] text-gray-400">{formatTHB(item.price)} × {item.qty}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => updateQty(item.sku, -1)} className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold">{item.qty}</span>
                          <button onClick={() => updateQty(item.sku, 1)} className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5">
                            <Plus className="h-3 w-3" />
                          </button>
                          <button onClick={() => removeFromCart(item.sku)} className="ml-1 text-red-400">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="mt-4 border-t border-gray-200/60 pt-4 dark:border-white/10">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs text-gray-400">จำนวนชิ้น</span>
                    <span className="text-xs font-semibold">{cartItems} ชิ้น</span>
                  </div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-semibold">รวมทั้งสิ้น</span>
                    <span className="text-xl font-bold text-green-500">{formatTHB(cartTotal)}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="flex flex-col items-center gap-1 rounded-xl border border-gray-200/60 py-2.5 text-xs hover:border-green-500/40 dark:border-white/10">
                      <Banknote className="h-4 w-4 text-green-500" />
                      เงินสด
                    </button>
                    <button className="flex flex-col items-center gap-1 rounded-xl border border-gray-200/60 py-2.5 text-xs hover:border-green-500/40 dark:border-white/10">
                      <QrCode className="h-4 w-4 text-blue-500" />
                      QR Pay
                    </button>
                    <button className="flex flex-col items-center gap-1 rounded-xl border border-gray-200/60 py-2.5 text-xs hover:border-green-500/40 dark:border-white/10">
                      <CreditCard className="h-4 w-4 text-purple-500" />
                      บัตร
                    </button>
                  </div>
                  <button className="mt-3 w-full rounded-xl bg-green-600 py-3 text-sm font-bold text-white transition-colors hover:bg-green-700">
                    ชำระเงิน {formatTHB(cartTotal)}
                  </button>
                </div>
              </>
            )}
          </Card>
        </div>
      )}

      {tab === "sales" && (
        <Card>
          <SectionHeader title={`ประวัติการขาย (${filteredSales.length} ราย)`} />
          <FilterBar placeholder="ค้นหา..." onSearch={setSearch} />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (s) => <span className="font-mono text-[10px] text-gray-400">{s.id}</span> },
              { key: "date", label: "วันที่", render: (s) => <span className="text-gray-400">{s.date}</span> },
              { key: "time", label: "เวลา", render: (s) => <span className="text-gray-400">{s.time}</span> },
              { key: "items", label: "ชิ้น", render: (s) => <span>{s.items}</span> },
              { key: "amount", label: "ยอด", render: (s) => <span className="font-semibold">{formatTHB(s.amount)}</span> },
              { key: "paymentMethod", label: "ชำระ", render: (s) => <span className="text-gray-400">{s.paymentMethod}</span> },
              { key: "cashier", label: "แคชเชียร์", render: (s) => <span className="text-gray-400">{s.cashier}</span> },
              { key: "status", label: "สถานะ", render: (s) => <StatusBadge status={s.status} /> },
              { key: "actions", label: "", render: () => (
                <ActionMenu items={[
                  { label: "ดู", icon: Eye },
                  { label: "พิมพ์ใบเสร็จ", icon: Receipt },
                  { label: "ยกเลิก", icon: X, danger: true },
                ]} />
              )},
            ]}
            data={filteredSales.slice(0, 200)}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "promotions" && (
        <Card>
          <SectionHeader title="โปรโมชั่น" action={
            <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
              <Plus className="h-3.5 w-3.5" /> สร้างโปรโมชั่น
            </button>
          } />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {promotions.map((promo, i) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-gray-200/60 p-4 dark:border-white/10"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                    <Gift className="h-4 w-4" />
                  </span>
                  <StatusBadge status={promo.status} />
                </div>
                <p className="mt-3 text-sm font-semibold">{promo.name}</p>
                <p className="mt-1 font-mono text-[10px] text-gray-400">Code: {promo.code}</p>
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-[10px] text-gray-400">
                    <span>ใช้แล้ว {promo.uses} ครั้ง</span>
                    <span>จำกัด {promo.limit}</span>
                  </div>
                  <ProgressBar pct={Math.round((promo.uses / promo.limit) * 100)} />
                </div>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-400">
                  <Calendar className="h-3 w-3" />
                  {promo.startDate} → {promo.endDate}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {tab === "shifts" && (
        <Card>
          <SectionHeader title="จัดการกะ" action={
            <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
              <Plus className="h-3.5 w-3.5" /> เปิดกะใหม่
            </button>
          } />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (s) => <span className="font-mono text-[10px] text-gray-400">{s.id}</span> },
              { key: "name", label: "กะ", render: (s) => <span className="font-medium">{s.name}</span> },
              { key: "time", label: "เวลา", render: (s) => <span className="text-gray-400">{s.time}</span> },
              { key: "cashier", label: "แคชเชียร์", render: (s) => <span className="text-gray-400">{s.cashier}</span> },
              { key: "sales", label: "ยอดขาย", render: (s) => <span className="font-semibold">{formatTHB(s.sales)}</span> },
              { key: "orders", label: "ออเดอร์", render: (s) => <span>{s.orders}</span> },
              { key: "status", label: "สถานะ", render: (s) => <StatusBadge status={s.status} /> },
              { key: "date", label: "วันที่", render: (s) => <span className="text-gray-400">{s.date}</span> },
              { key: "actions", label: "", render: () => (
                <ActionMenu items={[
                  { label: "ดู", icon: Eye },
                  { label: "ปิดกะ", icon: CheckCircle2 },
                ]} />
              )},
            ]}
            data={shifts}
            pageSize={10}
          />
        </Card>
      )}
    </div>
  );
}
