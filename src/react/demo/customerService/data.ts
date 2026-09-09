// ─── Customer Service — Fictional Demo Data ──────────────────
//
// ⚠️ DEMO DATA ONLY. Every customer, message, order and tracking
// reference below is invented for the CBoom Demo environment. No real
// marketplace messages are retrieved here and no real personal data is
// used. This is intentionally isolated so a real Customer Service API
// integration can replace it later.

import type {
  CSAgent,
  CSAuditEvent,
  CSConversation,
} from "./types";

// The demo runs as a single connected organization / shop. The second
// org exists purely to prove tenant isolation in the provider layer.
export const DEMO_ORG_ID = "org-cboom-demo";
export const OTHER_ORG_ID = "org-other-shop";

// The signed-in demo user (matches the "ท" avatar in the app shell).
export const DEMO_USER_ID = "agent-current";

export const csAgents: CSAgent[] = [
  { id: "agent-current", name: "คุณธนพร (คุณ)", role: "Customer Service Agent" },
  { id: "agent-somchai", name: "คุณสมชัย ใจดี", role: "Manager" },
  { id: "agent-panadda", name: "คุณปนัดดา ศรีสุข", role: "Customer Service Agent" },
  { id: "agent-nuttapong", name: "คุณณัฐพงศ์ ทองดี", role: "Customer Service Agent" },
  { id: "agent-admin", name: "คุณกิตติ (Admin)", role: "Admin" },
];

// Compact message builder — keeps the conversation fixtures readable.
function m(
  convId: string,
  i: number,
  kind: "customer" | "agent" | "system",
  name: string,
  body: string,
  time: string,
) {
  return { id: `${convId}-m${i}`, author: { kind, name }, body, time };
}

// ─── Conversations ──────────────────────────────────────────
// 8 TikTok Shop · 5 Shopee · 4 Lazada · 3 LINE OA
// States represented: ใหม่ (unread) · รอตอบกลับ (waiting) ·
// กำลังดำเนินการ (assigned/in-progress) · แก้ไขแล้ว (resolved) ·
// ปิดการสนทนา (closed)

export const csConversations: CSConversation[] = [
  // ── TikTok Shop 1 — unread, new
  {
    id: "CS-TT-1001",
    orgId: DEMO_ORG_ID,
    channel: "tiktok",
    customerName: "คุณณัฐชา",
    customerRef: "TT-CUST-4827",
    customerStatus: "ลูกค้าประจำ",
    lastContact: "วันนี้ 10:42",
    status: "ใหม่",
    unread: 2,
    assignedAgentId: null,
    updatedAt: "10:42",
    preview: "สอบถามค่ะ ออเดอร์นี้จัดส่งหรือยังคะ",
    messages: [
      m("CS-TT-1001", 1, "customer", "คุณณัฐชา", "สวัสดีค่ะ", "10:41"),
      m("CS-TT-1001", 2, "customer", "คุณณัฐชา", "สอบถามค่ะ ออเดอร์นี้จัดส่งหรือยังคะ", "10:42"),
    ],
    relatedOrder: {
      id: "TT-8170",
      channel: "tiktok",
      status: "กำลังจัดส่ง",
      total: 20933,
      itemCount: 2,
      payment: "ชำระแล้ว",
      shipping: "Kerry Express",
      tracking: "DEMO-TH-TRACK-8170",
    },
  },
  // ── TikTok Shop 2 — unread, new, product change request
  {
    id: "CS-TT-1002",
    orgId: DEMO_ORG_ID,
    channel: "tiktok",
    customerName: "คุณวรพล",
    customerRef: "TT-CUST-5510",
    customerStatus: "ลูกค้าใหม่",
    lastContact: "วันนี้ 10:15",
    status: "ใหม่",
    unread: 1,
    assignedAgentId: null,
    updatedAt: "10:15",
    preview: "ต้องการเปลี่ยนสีสินค้าก่อนจัดส่งครับ",
    messages: [
      m("CS-TT-1002", 1, "customer", "คุณวรพล", "ต้องการเปลี่ยนสีสินค้าก่อนจัดส่งครับ", "10:15"),
    ],
    relatedOrder: {
      id: "TT-8166",
      channel: "tiktok",
      status: "กำลังแพ็ก",
      total: 1290,
      itemCount: 1,
      payment: "ชำระแล้ว",
      shipping: "Flash Express",
      tracking: "DEMO-TH-TRACK-8166",
    },
  },
  // ── TikTok Shop 3 — waiting for reply
  {
    id: "CS-TT-1003",
    orgId: DEMO_ORG_ID,
    channel: "tiktok",
    customerName: "คุณศิริพร",
    customerRef: "TT-CUST-3391",
    customerStatus: "ลูกค้าประจำ",
    lastContact: "วันนี้ 09:50",
    status: "รอตอบกลับ",
    unread: 0,
    assignedAgentId: "agent-current",
    updatedAt: "09:50",
    preview: "รบกวนออกใบกำกับภาษีให้ด้วยนะคะ",
    messages: [
      m("CS-TT-1003", 1, "customer", "คุณศิริพร", "รบกวนออกใบกำกับภาษีให้ด้วยนะคะ", "09:48"),
      m("CS-TT-1003", 2, "agent", "คุณธนพร (คุณ)", "รับทราบค่ะ ขอเลขผู้เสียภาษีและที่อยู่สำหรับออกใบกำกับด้วยนะคะ", "09:50"),
    ],
    relatedOrder: {
      id: "TT-8120",
      channel: "tiktok",
      status: "จัดส่งแล้ว",
      total: 4580,
      itemCount: 3,
      payment: "ชำระแล้ว",
      shipping: "J&T Express",
      tracking: "DEMO-TH-TRACK-8120",
    },
  },
  // ── TikTok Shop 4 — in progress, assigned to other agent
  {
    id: "CS-TT-1004",
    orgId: DEMO_ORG_ID,
    channel: "tiktok",
    customerName: "คุณธีรภัทร",
    customerRef: "TT-CUST-2204",
    customerStatus: "ลูกค้าประจำ",
    lastContact: "วันนี้ 09:20",
    status: "กำลังดำเนินการ",
    unread: 0,
    assignedAgentId: "agent-panadda",
    updatedAt: "09:20",
    preview: "สินค้าได้รับแล้วแต่มีชิ้นหนึ่งชำรุดครับ",
    messages: [
      m("CS-TT-1004", 1, "customer", "คุณธีรภัทร", "สินค้าได้รับแล้วแต่มีชิ้นหนึ่งชำรุดครับ", "09:05"),
      m("CS-TT-1004", 2, "agent", "คุณปนัดดา ศรีสุข", "ขออภัยด้วยนะคะ รบกวนส่งรูปสินค้าที่ชำรุดให้ดูหน่อยได้ไหมคะ", "09:12"),
      m("CS-TT-1004", 3, "customer", "คุณธีรภัทร", "ส่งให้แล้วนะครับ", "09:18"),
      m("CS-TT-1004", 4, "agent", "คุณปนัดดา ศรีสุข", "ได้รับรูปแล้วค่ะ กำลังเปิดเคสเคลมให้นะคะ", "09:20"),
    ],
    relatedOrder: {
      id: "TT-8095",
      channel: "tiktok",
      status: "จัดส่งแล้ว",
      total: 3120,
      itemCount: 4,
      payment: "ชำระแล้ว",
      shipping: "Kerry Express",
      tracking: "DEMO-TH-TRACK-8095",
    },
  },
  // ── TikTok Shop 5 — in progress, assigned to current user
  {
    id: "CS-TT-1005",
    orgId: DEMO_ORG_ID,
    channel: "tiktok",
    customerName: "คุณกมลชนก",
    customerRef: "TT-CUST-7788",
    customerStatus: "ลูกค้าใหม่",
    lastContact: "วันนี้ 08:55",
    status: "กำลังดำเนินการ",
    unread: 0,
    assignedAgentId: "agent-current",
    updatedAt: "08:55",
    preview: "ขอเปลี่ยนที่อยู่จัดส่งได้ไหมคะ",
    messages: [
      m("CS-TT-1005", 1, "customer", "คุณกมลชนก", "ขอเปลี่ยนที่อยู่จัดส่งได้ไหมคะ", "08:50"),
      m("CS-TT-1005", 2, "agent", "คุณธนพร (คุณ)", "ได้ค่ะ ออเดอร์ยังไม่ถูกจัดส่ง รบกวนแจ้งที่อยู่ใหม่มาได้เลยนะคะ", "08:55"),
    ],
    relatedOrder: {
      id: "TT-8150",
      channel: "tiktok",
      status: "กำลังแพ็ก",
      total: 890,
      itemCount: 1,
      payment: "ชำระแล้ว",
      shipping: "Flash Express",
      tracking: "DEMO-TH-TRACK-8150",
    },
  },
  // ── TikTok Shop 6 — resolved
  {
    id: "CS-TT-1006",
    orgId: DEMO_ORG_ID,
    channel: "tiktok",
    customerName: "คุณอนุสรณ์",
    customerRef: "TT-CUST-1120",
    customerStatus: "ลูกค้าประจำ",
    lastContact: "เมื่อวาน 17:30",
    status: "แก้ไขแล้ว",
    unread: 0,
    assignedAgentId: "agent-current",
    updatedAt: "เมื่อวาน 17:30",
    preview: "ขอบคุณมากครับ ได้รับของแล้ว",
    messages: [
      m("CS-TT-1006", 1, "customer", "คุณอนุสรณ์", "ของยังไม่ถึงเลยครับ สั่งมา 5 วันแล้ว", "เมื่อวาน 15:10"),
      m("CS-TT-1006", 2, "agent", "คุณธนพร (คุณ)", "ตรวจสอบให้แล้วนะคะ พัสดุอยู่ระหว่างนำจ่าย คาดว่าถึงวันนี้ค่ะ", "เมื่อวาน 15:20"),
      m("CS-TT-1006", 3, "customer", "คุณอนุสรณ์", "ขอบคุณมากครับ ได้รับของแล้ว", "เมื่อวาน 17:30"),
    ],
    relatedOrder: {
      id: "TT-8042",
      channel: "tiktok",
      status: "จัดส่งสำเร็จ",
      total: 2450,
      itemCount: 2,
      payment: "ชำระแล้ว",
      shipping: "J&T Express",
      tracking: "DEMO-TH-TRACK-8042",
    },
  },
  // ── TikTok Shop 7 — closed
  {
    id: "CS-TT-1007",
    orgId: DEMO_ORG_ID,
    channel: "tiktok",
    customerName: "คุณพิมพ์ชนก",
    customerRef: "TT-CUST-9931",
    customerStatus: "ลูกค้าประจำ",
    lastContact: "2 วันก่อน",
    status: "ปิดการสนทนา",
    unread: 0,
    assignedAgentId: "agent-somchai",
    updatedAt: "2 วันก่อน",
    preview: "โอนคืนเรียบร้อยแล้ว ขอบคุณค่ะ",
    messages: [
      m("CS-TT-1007", 1, "customer", "คุณพิมพ์ชนก", "ขอยกเลิกออเดอร์และคืนเงินค่ะ", "2 วันก่อน"),
      m("CS-TT-1007", 2, "agent", "คุณสมชัย ใจดี", "ดำเนินการคืนเงินให้แล้วนะคะ เข้าบัญชีภายใน 3-5 วันทำการค่ะ", "2 วันก่อน"),
      m("CS-TT-1007", 3, "customer", "คุณพิมพ์ชนก", "โอนคืนเรียบร้อยแล้ว ขอบคุณค่ะ", "2 วันก่อน"),
    ],
    relatedOrder: {
      id: "TT-7980",
      channel: "tiktok",
      status: "ยกเลิก",
      total: 1780,
      itemCount: 1,
      payment: "คืนเงินแล้ว",
      shipping: "-",
      tracking: "DEMO-TH-TRACK-7980",
    },
  },
  // ── TikTok Shop 8 — waiting, unassigned
  {
    id: "CS-TT-1008",
    orgId: DEMO_ORG_ID,
    channel: "tiktok",
    customerName: "คุณเจนจิรา",
    customerRef: "TT-CUST-6650",
    customerStatus: "ลูกค้าใหม่",
    lastContact: "วันนี้ 08:10",
    status: "รอตอบกลับ",
    unread: 0,
    assignedAgentId: null,
    updatedAt: "08:10",
    preview: "สินค้ามีขนาด L ไหมคะ",
    messages: [
      m("CS-TT-1008", 1, "customer", "คุณเจนจิรา", "สินค้ามีขนาด L ไหมคะ", "08:08"),
      m("CS-TT-1008", 2, "agent", "ระบบ", "สวัสดีค่ะ ขอบคุณที่ติดต่อร้าน เจ้าหน้าที่จะตอบกลับโดยเร็วที่สุดค่ะ", "08:10"),
    ],
    relatedOrder: null,
  },

  // ── Shopee 1 — unread
  {
    id: "CS-SP-2001",
    orgId: DEMO_ORG_ID,
    channel: "shopee",
    customerName: "คุณรัชนก",
    customerRef: "SP-CUST-3320",
    customerStatus: "ลูกค้าประจำ",
    lastContact: "วันนี้ 10:05",
    status: "ใหม่",
    unread: 3,
    assignedAgentId: null,
    updatedAt: "10:05",
    preview: "กดสั่งซื้อแล้วแต่ยังไม่ได้เลขพัสดุเลยค่ะ",
    messages: [
      m("CS-SP-2001", 1, "customer", "คุณรัชนก", "กดสั่งซื้อแล้วแต่ยังไม่ได้เลขพัสดุเลยค่ะ", "10:03"),
      m("CS-SP-2001", 2, "customer", "คุณรัชนก", "ออเดอร์ SP-4521 ค่ะ", "10:04"),
      m("CS-SP-2001", 3, "customer", "คุณรัชนก", "รบกวนช่วยเช็คให้หน่อยนะคะ", "10:05"),
    ],
    relatedOrder: {
      id: "SP-4521",
      channel: "shopee",
      status: "กำลังแพ็ก",
      total: 690,
      itemCount: 2,
      payment: "ชำระแล้ว",
      shipping: "Shopee Express",
      tracking: "DEMO-TH-TRACK-4521",
    },
  },
  // ── Shopee 2 — in progress
  {
    id: "CS-SP-2002",
    orgId: DEMO_ORG_ID,
    channel: "shopee",
    customerName: "คุณสุทธิดา",
    customerRef: "SP-CUST-8890",
    customerStatus: "ลูกค้าประจำ",
    lastContact: "วันนี้ 09:35",
    status: "กำลังดำเนินการ",
    unread: 0,
    assignedAgentId: "agent-nuttapong",
    updatedAt: "09:35",
    preview: "อยากสอบถามเรื่องการรับประกันสินค้าค่ะ",
    messages: [
      m("CS-SP-2002", 1, "customer", "คุณสุทธิดา", "อยากสอบถามเรื่องการรับประกันสินค้าค่ะ", "09:30"),
      m("CS-SP-2002", 2, "agent", "คุณณัฐพงศ์ ทองดี", "สินค้ารับประกัน 1 ปีค่ะ เก็บกล่องและใบเสร็จไว้เป็นหลักฐานนะคะ", "09:35"),
    ],
    relatedOrder: {
      id: "SP-4498",
      channel: "shopee",
      status: "จัดส่งแล้ว",
      total: 2990,
      itemCount: 1,
      payment: "ชำระแล้ว",
      shipping: "Shopee Express",
      tracking: "DEMO-TH-TRACK-4498",
    },
  },
  // ── Shopee 3 — resolved
  {
    id: "CS-SP-2003",
    orgId: DEMO_ORG_ID,
    channel: "shopee",
    customerName: "คุณวีรยุทธ",
    customerRef: "SP-CUST-1177",
    customerStatus: "ลูกค้าใหม่",
    lastContact: "เมื่อวาน 14:00",
    status: "แก้ไขแล้ว",
    unread: 0,
    assignedAgentId: "agent-current",
    updatedAt: "เมื่อวาน 14:00",
    preview: "เข้าใจแล้วครับ ขอบคุณครับ",
    messages: [
      m("CS-SP-2003", 1, "customer", "คุณวีรยุทธ", "ทำไมค่าส่งแพงจังครับ", "เมื่อวาน 13:40"),
      m("CS-SP-2003", 2, "agent", "คุณธนพร (คุณ)", "ค่าส่งคำนวณตามน้ำหนักและปลายทางค่ะ ออเดอร์นี้ 45 บาทค่ะ", "เมื่อวาน 13:50"),
      m("CS-SP-2003", 3, "customer", "คุณวีรยุทธ", "เข้าใจแล้วครับ ขอบคุณครับ", "เมื่อวาน 14:00"),
    ],
    relatedOrder: {
      id: "SP-4460",
      channel: "shopee",
      status: "จัดส่งสำเร็จ",
      total: 545,
      itemCount: 1,
      payment: "ชำระแล้ว",
      shipping: "Shopee Express",
      tracking: "DEMO-TH-TRACK-4460",
    },
  },
  // ── Shopee 4 — waiting
  {
    id: "CS-SP-2004",
    orgId: DEMO_ORG_ID,
    channel: "shopee",
    customerName: "คุณอารยา",
    customerRef: "SP-CUST-5540",
    customerStatus: "ลูกค้าประจำ",
    lastContact: "วันนี้ 08:20",
    status: "รอตอบกลับ",
    unread: 0,
    assignedAgentId: "agent-current",
    updatedAt: "08:20",
    preview: "รอสินค้ากลับมาสต๊อกเมื่อไหร่คะ",
    messages: [
      m("CS-SP-2004", 1, "customer", "คุณอารยา", "รอสินค้ากลับมาสต๊อกเมื่อไหร่คะ", "08:15"),
      m("CS-SP-2004", 2, "agent", "คุณธนพร (คุณ)", "คาดว่าล็อตใหม่เข้าภายในสัปดาห์หน้าค่ะ จะแจ้งให้ทราบอีกครั้งนะคะ", "08:20"),
    ],
    relatedOrder: null,
  },
  // ── Shopee 5 — closed
  {
    id: "CS-SP-2005",
    orgId: DEMO_ORG_ID,
    channel: "shopee",
    customerName: "คุณธนกร",
    customerRef: "SP-CUST-2299",
    customerStatus: "ลูกค้าประจำ",
    lastContact: "3 วันก่อน",
    status: "ปิดการสนทนา",
    unread: 0,
    assignedAgentId: "agent-somchai",
    updatedAt: "3 วันก่อน",
    preview: "จัดการให้เรียบร้อยแล้ว ขอบคุณครับ",
    messages: [
      m("CS-SP-2005", 1, "customer", "คุณธนกร", "ได้รับสินค้าผิดรุ่นครับ", "3 วันก่อน"),
      m("CS-SP-2005", 2, "agent", "คุณสมชัย ใจดี", "ขออภัยด้วยนะคะ จะจัดส่งรุ่นที่ถูกต้องให้ใหม่และให้เก็บของเดิมไว้ได้เลยค่ะ", "3 วันก่อน"),
      m("CS-SP-2005", 3, "customer", "คุณธนกร", "จัดการให้เรียบร้อยแล้ว ขอบคุณครับ", "3 วันก่อน"),
    ],
    relatedOrder: {
      id: "SP-4380",
      channel: "shopee",
      status: "จัดส่งใหม่แล้ว",
      total: 1350,
      itemCount: 1,
      payment: "ชำระแล้ว",
      shipping: "Shopee Express",
      tracking: "DEMO-TH-TRACK-4380",
    },
  },

  // ── Lazada 1 — unread
  {
    id: "CS-LZ-3001",
    orgId: DEMO_ORG_ID,
    channel: "lazada",
    customerName: "คุณปิยะพงษ์",
    customerRef: "LZ-CUST-4410",
    customerStatus: "ลูกค้าใหม่",
    lastContact: "วันนี้ 09:58",
    status: "ใหม่",
    unread: 1,
    assignedAgentId: null,
    updatedAt: "09:58",
    preview: "สินค้าตัวนี้ใช้กับรุ่นปี 2022 ได้ไหมครับ",
    messages: [
      m("CS-LZ-3001", 1, "customer", "คุณปิยะพงษ์", "สินค้าตัวนี้ใช้กับรุ่นปี 2022 ได้ไหมครับ", "09:58"),
    ],
    relatedOrder: null,
  },
  // ── Lazada 2 — in progress
  {
    id: "CS-LZ-3002",
    orgId: DEMO_ORG_ID,
    channel: "lazada",
    customerName: "คุณเบญจวรรณ",
    customerRef: "LZ-CUST-7720",
    customerStatus: "ลูกค้าประจำ",
    lastContact: "วันนี้ 09:15",
    status: "กำลังดำเนินการ",
    unread: 0,
    assignedAgentId: "agent-current",
    updatedAt: "09:15",
    preview: "ขอเลื่อนวันจัดส่งเป็นสัปดาห์หน้าได้ไหมคะ",
    messages: [
      m("CS-LZ-3002", 1, "customer", "คุณเบญจวรรณ", "ขอเลื่อนวันจัดส่งเป็นสัปดาห์หน้าได้ไหมคะ", "09:10"),
      m("CS-LZ-3002", 2, "agent", "คุณธนพร (คุณ)", "ได้ค่ะ จะพักออเดอร์ไว้และจัดส่งให้วันจันทร์หน้านะคะ", "09:15"),
    ],
    relatedOrder: {
      id: "LZ-6610",
      channel: "lazada",
      status: "พักการจัดส่ง",
      total: 4290,
      itemCount: 3,
      payment: "ชำระแล้ว",
      shipping: "LEX",
      tracking: "DEMO-TH-TRACK-6610",
    },
  },
  // ── Lazada 3 — resolved
  {
    id: "CS-LZ-3003",
    orgId: DEMO_ORG_ID,
    channel: "lazada",
    customerName: "คุณจักรพันธ์",
    customerRef: "LZ-CUST-3300",
    customerStatus: "ลูกค้าประจำ",
    lastContact: "เมื่อวาน 11:20",
    status: "แก้ไขแล้ว",
    unread: 0,
    assignedAgentId: "agent-panadda",
    updatedAt: "เมื่อวาน 11:20",
    preview: "โอเคครับ รอรับของ",
    messages: [
      m("CS-LZ-3003", 1, "customer", "คุณจักรพันธ์", "เมื่อไหร่จะจัดส่งครับ", "เมื่อวาน 11:00"),
      m("CS-LZ-3003", 2, "agent", "คุณปนัดดา ศรีสุข", "จัดส่งวันนี้ค่ะ เลขพัสดุจะอัปเดตในระบบภายในเย็นนี้นะคะ", "เมื่อวาน 11:10"),
      m("CS-LZ-3003", 3, "customer", "คุณจักรพันธ์", "โอเคครับ รอรับของ", "เมื่อวาน 11:20"),
    ],
    relatedOrder: {
      id: "LZ-6555",
      channel: "lazada",
      status: "จัดส่งแล้ว",
      total: 990,
      itemCount: 1,
      payment: "ชำระแล้ว",
      shipping: "LEX",
      tracking: "DEMO-TH-TRACK-6555",
    },
  },
  // ── Lazada 4 — closed
  {
    id: "CS-LZ-3004",
    orgId: DEMO_ORG_ID,
    channel: "lazada",
    customerName: "คุณศรัณย์",
    customerRef: "LZ-CUST-9910",
    customerStatus: "ลูกค้าใหม่",
    lastContact: "4 วันก่อน",
    status: "ปิดการสนทนา",
    unread: 0,
    assignedAgentId: "agent-somchai",
    updatedAt: "4 วันก่อน",
    preview: "ขอบคุณครับ",
    messages: [
      m("CS-LZ-3004", 1, "customer", "คุณศรัณย์", "อยากได้ใบเสร็จย้อนหลังครับ", "4 วันก่อน"),
      m("CS-LZ-3004", 2, "agent", "คุณสมชัย ใจดี", "ส่งใบเสร็จให้ทางระบบแล้วนะคะ ตรวจสอบได้ในหน้าออเดอร์ค่ะ", "4 วันก่อน"),
      m("CS-LZ-3004", 3, "customer", "คุณศรัณย์", "ขอบคุณครับ", "4 วันก่อน"),
    ],
    relatedOrder: {
      id: "LZ-6400",
      channel: "lazada",
      status: "จัดส่งสำเร็จ",
      total: 1620,
      itemCount: 2,
      payment: "ชำระแล้ว",
      shipping: "LEX",
      tracking: "DEMO-TH-TRACK-6400",
    },
  },

  // ── LINE OA 1 — unread
  {
    id: "CS-LN-4001",
    orgId: DEMO_ORG_ID,
    channel: "lineoa",
    customerName: "คุณมนัสนันท์",
    customerRef: "LN-CUST-2010",
    customerStatus: "ลูกค้าประจำ",
    lastContact: "วันนี้ 10:30",
    status: "ใหม่",
    unread: 2,
    assignedAgentId: null,
    updatedAt: "10:30",
    preview: "พี่คะ สินค้าล็อตใหม่มาถึงยัง",
    messages: [
      m("CS-LN-4001", 1, "customer", "คุณมนัสนันท์", "พี่คะ สินค้าล็อตใหม่มาถึงยัง", "10:28"),
      m("CS-LN-4001", 2, "customer", "คุณมนัสนันท์", "อยากได้สี olive ค่ะ", "10:30"),
    ],
    relatedOrder: null,
  },
  // ── LINE OA 2 — in progress
  {
    id: "CS-LN-4002",
    orgId: DEMO_ORG_ID,
    channel: "lineoa",
    customerName: "คุณกฤษณะ",
    customerRef: "LN-CUST-6620",
    customerStatus: "ลูกค้าประจำ",
    lastContact: "วันนี้ 09:05",
    status: "กำลังดำเนินการ",
    unread: 0,
    assignedAgentId: "agent-current",
    updatedAt: "09:05",
    preview: "โอนแล้วนะครับ แนบสลิปไว้",
    messages: [
      m("CS-LN-4002", 1, "customer", "คุณกฤษณะ", "สั่ง 3 ชิ้น ยอดรวมเท่าไหร่ครับ", "08:55"),
      m("CS-LN-4002", 2, "agent", "คุณธนพร (คุณ)", "รวม 1,170 บาท ส่งฟรีค่ะ", "09:00"),
      m("CS-LN-4002", 3, "customer", "คุณกฤษณะ", "โอนแล้วนะครับ แนบสลิปไว้", "09:05"),
    ],
    relatedOrder: {
      id: "MN-1042",
      channel: "lineoa",
      status: "รอตรวจสอบการชำระ",
      total: 1170,
      itemCount: 3,
      payment: "รอตรวจสอบ",
      shipping: "Kerry Express",
      tracking: "DEMO-TH-TRACK-1042",
    },
  },
  // ── LINE OA 3 — resolved
  {
    id: "CS-LN-4003",
    orgId: DEMO_ORG_ID,
    channel: "lineoa",
    customerName: "คุณสุภาวดี",
    customerRef: "LN-CUST-3390",
    customerStatus: "ลูกค้าประจำ",
    lastContact: "เมื่อวาน 16:20",
    status: "แก้ไขแล้ว",
    unread: 0,
    assignedAgentId: "agent-current",
    updatedAt: "เมื่อวาน 16:20",
    preview: "ได้รับแล้วค่ะ สวยมาก",
    messages: [
      m("CS-LN-4003", 1, "customer", "คุณสุภาวดี", "ของถึงแล้วแต่กล่องบุบนิดหน่อยค่ะ", "เมื่อวาน 16:00"),
      m("CS-LN-4003", 2, "agent", "คุณธนพร (คุณ)", "ขออภัยด้วยนะคะ ตัวสินค้าด้านในปกติไหมคะ", "เมื่อวาน 16:10"),
      m("CS-LN-4003", 3, "customer", "คุณสุภาวดี", "ได้รับแล้วค่ะ สวยมาก", "เมื่อวาน 16:20"),
    ],
    relatedOrder: null,
  },

  // ── Isolation probe — belongs to ANOTHER org, must never surface
  {
    id: "CS-XX-9001",
    orgId: OTHER_ORG_ID,
    channel: "tiktok",
    customerName: "ลูกค้าร้านอื่น",
    customerRef: "TT-CUST-0000",
    customerStatus: "-",
    lastContact: "-",
    status: "ใหม่",
    unread: 9,
    assignedAgentId: null,
    updatedAt: "-",
    preview: "(ข้อมูลขององค์กรอื่น — ต้องไม่แสดงในเดโมนี้)",
    messages: [
      m("CS-XX-9001", 1, "customer", "ลูกค้าร้านอื่น", "ข้อความขององค์กรอื่น", "-"),
    ],
    relatedOrder: null,
  },
];

export const csAuditSeed: CSAuditEvent[] = [
  { id: "CSLOG-001", user: "คุณธนพร (คุณ)", action: "เปิดดูการสนทนาของลูกค้า", channel: "tiktok", time: "2026-09-09 10:42:03" },
  { id: "CSLOG-002", user: "คุณปนัดดา ศรีสุข", action: "มอบหมายการสนทนา", channel: "tiktok", time: "2026-09-09 09:20:41" },
  { id: "CSLOG-003", user: "คุณธนพร (คุณ)", action: "ตอบกลับข้อความลูกค้า", channel: "shopee", time: "2026-09-09 09:35:12" },
  { id: "CSLOG-004", user: "คุณสมชัย ใจดี", action: "ปิดการสนทนา", channel: "tiktok", time: "2026-09-08 17:31:55" },
  { id: "CSLOG-005", user: "คุณธนพร (คุณ)", action: "เปลี่ยนสถานะเป็น แก้ไขแล้ว", channel: "lineoa", time: "2026-09-08 16:20:30" },
];

// ─── Analytics series (fictional) ───────────────────────────
export const csVolumeByDay = [
  { day: "จ.", value: 34 },
  { day: "อ.", value: 41 },
  { day: "พ.", value: 38 },
  { day: "พฤ.", value: 52 },
  { day: "ศ.", value: 61 },
  { day: "ส.", value: 47 },
  { day: "อา.", value: 29 },
];

export const csByChannel = [
  { label: "TikTok Shop", value: 112, color: "pink" },
  { label: "Shopee", value: 78, color: "orange" },
  { label: "Lazada", value: 41, color: "blue" },
  { label: "LINE OA", value: 17, color: "green" },
];

export const csResponseTrend = [
  { month: "สัปดาห์ 1", value: 6.2 },
  { month: "สัปดาห์ 2", value: 5.4 },
  { month: "สัปดาห์ 3", value: 4.9 },
  { month: "สัปดาห์ 4", value: 4.5 },
];
