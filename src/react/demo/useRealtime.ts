import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────
export interface RealtimeNotification {
  id: string;
  title: string;
  type: "order" | "payment" | "stock" | "ai" | "shipping" | "lead" | "success" | "warning";
  time: string;
}

export interface RealtimeState {
  revenue: number;
  orders: number;
  customers: number;
  profit: number;
  notifications: RealtimeNotification[];
  liveOrders: { id: string; channel: string; amount: number; customer: string }[];
}

// ─── Random helpers ───────────────────────────────────────────
const channels = ["Shopee", "TikTok Shop", "Lazada", "POS", "Website"];
const customerNames = [
  "คุณสมชัย ใจดี", "คุณปนัดดา ศรีสุข", "คุณวิทยา พานิช", "คุณอนุชา ออนไลน์",
  "คุณมาลี ขายดี", "คุณกิตติ พอเพียง", "คุณสุดา รักไทย", "คุณบุญเลิศ มีสุข",
  "คุณภาคิน วงศ์ไพศน์", "คุณชนาภัทร บุญมี", "คุณอาทิตย์ แสงทอง", "คุณปวีณา จันทร์เพ็ญ",
];
const aiSuggestions = [
  "เติมสต๊อก SKU-2291 และ SKU-1101",
  "เพิ่มงบโฆษณา TikTok Shop 20%",
  "ติดตามลูกค้า บจก. สยามเทรดดิ้ง",
  "ส่งใบเสนอราคา Smart Retail",
  "พยากรณ์ยอดขาย Q3 เพิ่ม 22%",
  "ลูกค้า 3 รายมีความเสี่ยงสูง",
];
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

let notifId = 1000;

function generateNotification(): RealtimeNotification {
  const types: RealtimeNotification["type"][] = ["order", "order", "payment", "shipping", "success", "stock", "ai", "lead"];
  const type = pick(types);
  const now = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });

  switch (type) {
    case "order": {
      const ch = pick(channels);
      const id = `${ch === "Shopee" ? "SH" : ch === "TikTok Shop" ? "TT" : ch === "Lazada" ? "LZ" : "POS"}-${rand(8000, 9999)}`;
      return { id: `N-${notifId++}`, title: `ออเดอร์ใหม่จาก ${ch} #${id}`, type, time: now };
    }
    case "payment":
      return { id: `N-${notifId++}`, title: `ได้รับชำระ INV-2026-${String(rand(1, 1050)).padStart(4, "0")}`, type, time: now };
    case "shipping":
      return { id: `N-${notifId++}`, title: `จัดส่ง #${pick(["SH", "TT", "LZ"])}-${rand(8000, 9999)} สำเร็จ`, type, time: now };
    case "stock":
      return { id: `N-${notifId++}`, title: `สต๊อก SKU-${rand(1000, 9999)} ใกล้หมด`, type: "warning", time: now };
    case "ai":
      return { id: `N-${notifId++}`, title: `AI แนะนำ: ${pick(aiSuggestions)}`, type: "ai", time: now };
    case "lead":
      return { id: `N-${notifId++}`, title: `ลีดใหม่: ${pick(customerNames)}`, type: "order", time: now };
    default:
      return { id: `N-${notifId++}`, title: `คุณ${pick(["สมชัย", "ปนัดดา", "อนุชา"])} ปิดการขาย ฿${rand(50, 500)}K`, type: "success", time: now };
  }
}

function generateLiveOrder() {
  const ch = pick(channels);
  return {
    id: `${ch === "Shopee" ? "SH" : ch === "TikTok Shop" ? "TT" : ch === "Lazada" ? "LZ" : ch === "POS" ? "POS" : "WEB"}-${rand(8000, 9999)}`,
    channel: ch,
    amount: rand(150, 5000),
    customer: pick(customerNames),
  };
}

// ─── Hook ─────────────────────────────────────────────────────
export function useRealtimeSimulation(enabled = true, intervalMs = 5000) {
  const [state, setState] = useState<RealtimeState>({
    revenue: 128450,
    orders: 342,
    customers: 87,
    profit: 64200,
    notifications: [],
    liveOrders: [],
  });

  const [toasts, setToasts] = useState<RealtimeNotification[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Initial notifications
    const initialNotifs: RealtimeNotification[] = [];
    for (let i = 0; i < 6; i++) {
      initialNotifs.push(generateNotification());
    }
    setState(prev => ({ ...prev, notifications: initialNotifs }));

    // Realtime tick
    intervalRef.current = setInterval(() => {
      const notif = generateNotification();
      const orderAmount = rand(150, 5000);

      setState(prev => ({
        revenue: prev.revenue + orderAmount,
        orders: prev.orders + 1,
        customers: Math.random() > 0.7 ? prev.customers + 1 : prev.customers,
        profit: prev.profit + Math.round(orderAmount * 0.35),
        notifications: [notif, ...prev.notifications].slice(0, 20),
        liveOrders: [generateLiveOrder(), ...prev.liveOrders].slice(0, 5),
      }));

      // Show toast for certain events
      if (Math.random() > 0.5) {
        setToasts(prev => [notif, ...prev].slice(0, 3));
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== notif.id));
        }, 4000);
      }
    }, intervalMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [enabled, intervalMs]);

  return { ...state, toasts, dismissToast };
}
