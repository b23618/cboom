// ─── Thai Business Demo Data ─────────────────────────────────

import {
  generateCustomers, generateProducts, generateOrders, generateEmployees,
  generateSuppliers, generateInvoices, generateQuotations, generatePurchaseOrders,
  generateExpenses, generateLeads, generateOpportunities, generateStockMovements,
  generateReturns, generateSettlements, generateApiLogs, generatePOSSales,
  generatePayroll, generateLeaveRequests, generateRecruitment, generateTraining,
  generateCycleCounts, generateIncome, generatePayments, generateLedger,
  generateDailySalesData, generateHourlySales,
} from "./dataGen";

export const formatTHB = (n: number) => "฿" + n.toLocaleString("en-US");

// ─── Large Generated Datasets ─────────────────────────────────
export const allCustomers = generateCustomers(520);
export const allProducts = generateProducts(320);
export const allOrders = generateOrders(2100, allCustomers, allProducts);
export const allEmployees = generateEmployees(56);
export const allSuppliers = generateSuppliers(45);
export const allInvoices = generateInvoices(1050, allCustomers);
export const allQuotations = generateQuotations(180, allCustomers);
export const allPurchaseOrders = generatePurchaseOrders(120, allSuppliers, allProducts);
export const allExpenses = generateExpenses(200);
export const allLeads = generateLeads(200);
export const allOpportunities = generateOpportunities(80, allCustomers);
export const allStockMovements = generateStockMovements(300, allProducts);
export const allReturns = generateReturns(60, allOrders);
export const allSettlements = generateSettlements(100);
export const allApiLogs = generateApiLogs(200);
export const allPOSSales = generatePOSSales(500);
export const allPayroll = generatePayroll(allEmployees);
export const allLeaveRequests = generateLeaveRequests(allEmployees, 40);
export const allRecruitment = generateRecruitment(25);
export const allTraining = generateTraining(20);
export const allCycleCounts = generateCycleCounts(50, allProducts);
export const allIncome = generateIncome(150, allCustomers);
export const allPayments = generatePayments(300, allInvoices);
export const allLedger = generateLedger(200);
export const dailySalesData = generateDailySalesData();
export const hourlySalesData = generateHourlySales();

export const thaiCustomers = [
  { id: "C-001", name: "บจก. สยามเทรดดิ้ง", contact: "คุณสมชัย ใจดี", phone: "02-123-4567", email: "somchai@siamtrade.co.th", stage: "เสนอราคา", value: 850000, lastContact: "2 วันที่แล้ว", city: "กรุงเทพมหานคร", type: "นิติบุคคล" },
  { id: "C-002", name: "ร้าน ก้าวหน้า คอมเมิร์ซ", contact: "คุณปนัดดา ศรีสุข", phone: "02-234-5678", email: "panadda@kaona.co", stage: "ติดต่อแล้ว", value: 320000, lastContact: "1 วันที่แล้ว", city: "กรุงเทพมหานคร", type: "บุคคลธรรมดา" },
  { id: "C-003", name: "โรงงาน ไทยพรีเมียม", contact: "คุณวิทยา พานิช", phone: "038-345-6789", email: "wittaya@thaipremium.co.th", stage: "ปิดการขาย", value: 1200000, lastContact: "3 วันที่แล้ว", city: "ชลบุรี", type: "นิติบุคคล" },
  { id: "C-004", name: "Smart Retail Co., Ltd.", contact: "คุณอนุชา ออนไลน์", phone: "02-456-7890", email: "anucha@smartretail.co.th", stage: "ลีดใหม่", value: 150000, lastContact: "วันนี้", city: "กรุงเทพมหานคร", type: "นิติบุคคล" },
  { id: "C-005", name: "แม่ค้าออนไลน์ ไทยแลนด์", contact: "คุณมาลี ขายดี", phone: "081-234-5678", email: "malee@maekhaonline.co", stage: "เสนอราคา", value: 430000, lastContact: "5 วันที่แล้ว", city: "นนทบุรี", type: "บุคคลธรรมดา" },
  { id: "C-006", name: "บริษัท ไทยสมาร์ท คอมเมิร์ซ", contact: "คุณกิตติ พอเพียง", phone: "02-567-8901", email: "kitti@thaismart.co.th", stage: "ปิดการขาย", value: 680000, lastContact: "1 สัปดาห์ที่แล้ว", city: "กรุงเทพมหานคร", type: "นิติบุคคล" },
  { id: "C-007", name: "ร้าน สบาย มาร์เก็ต", contact: "คุณสุดา รักไทย", phone: "074-678-9012", email: "suda@sabai.market", stage: "ติดต่อแล้ว", value: 220000, lastContact: "4 วันที่แล้ว", city: "สงขลา", type: "บุคคลธรรมดา" },
  { id: "C-008", name: "บจก. อีสาน พรีเมียม", contact: "คุณบุญเลิศ มีสุข", phone: "043-789-0123", email: "boonlert@isanpremium.co.th", stage: "ลีดใหม่", value: 540000, lastContact: "วันนี้", city: "ขอนแก่น", type: "นิติบุคคล" },
  { id: "C-009", name: "ร้าน นรา ไลฟ์สไตล์", contact: "คุณนรา สวยงาม", phone: "073-890-1234", email: "nara@naralifestyle.co", stage: "เสนอราคา", value: 380000, lastContact: "2 วันที่แล้ว", city: "นครศรีธรรมราช", type: "บุคคลธรรมดา" },
  { id: "C-010", name: "บริษัท เชียงใหม่ ดิจิทัล", contact: "คุณพิภพ เหนือเมฆ", phone: "053-901-2345", email: "pipop@chiangmaidigital.co.th", stage: "ติดต่อแล้ว", value: 920000, lastContact: "3 วันที่แล้ว", city: "เชียงใหม่", type: "นิติบุคคล" },
];

export const thaiLeads = [
  { id: "L-001", name: "คุณภาคิน วงศ์ไพศน์", source: "Website", score: 85, stage: "ลีดใหม่", assignedTo: "ทีมขาย A", date: "2026-07-10" },
  { id: "L-002", name: "คุณชนาภัทร บุญมี", source: "Facebook Ads", score: 72, stage: "ติดต่อแล้ว", assignedTo: "ทีมขาย B", date: "2026-07-09" },
  { id: "L-003", name: "คุณอาทิตย์ แสงทอง", source: "LINE OA", score: 90, stage: "เสนอราคา", assignedTo: "ทีมขาย A", date: "2026-07-08" },
  { id: "L-004", name: "คุณปวีณา จันทร์เพ็ญ", source: "Google Ads", score: 65, stage: "ลีดใหม่", assignedTo: "ทีมขาย C", date: "2026-07-10" },
  { id: "L-005", name: "คุณธีรพงษ์ รักษ์ดี", source: "Referral", score: 88, stage: "ติดต่อแล้ว", assignedTo: "ทีมขาย B", date: "2026-07-07" },
];

export const thaiProducts = [
  { sku: "SKU-2291", name: "เสื้อยืด Cotton Premium สีดำ", category: "เสื้อผ้า", cost: 120, price: 390, stock: 45, shopee: 18, tiktok: 12, lazada: 15, status: "พร้อมขาย" },
  { sku: "SKU-1101", name: "รองเท้าผ้าใบ Sport ขาว", category: "รองเท้า", cost: 350, price: 890, stock: 8, shopee: 3, tiktok: 2, lazada: 3, status: "ใกล้หมด" },
  { sku: "SKU-3302", name: "กระเป๋าผ้า Canvas สีครีม", category: "กระเป๋า", cost: 80, price: 290, stock: 120, shopee: 40, tiktok: 35, lazada: 45, status: "พร้อมขาย" },
  { sku: "SKU-4408", name: "หมวกแก๊ป UV Protect กรมท่า", category: "หมวก", cost: 50, price: 199, stock: 0, shopee: 0, tiktok: 0, lazada: 0, status: "สินค้าหมด" },
  { sku: "SKU-5520", name: "เข็มขัดหนังแท้ สีน้ำตาล", category: "เครื่องประดับ", cost: 150, price: 450, stock: 67, shopee: 22, tiktok: 18, lazada: 27, status: "พร้อมขาย" },
  { sku: "SKU-6610", name: "นาฬิกาข้อมือ Sport Digital", category: "นาฬิกา", cost: 280, price: 690, stock: 34, shopee: 12, tiktok: 10, lazada: 12, status: "พร้อมขาย" },
  { sku: "SKU-7720", name: "แว่นกันแดด Polarized ดำ", category: "แว่นตา", cost: 90, price: 350, stock: 15, shopee: 5, tiktok: 5, lazada: 5, status: "ใกล้หมด" },
  { sku: "SKU-8830", name: "กระเป๋าสะพายข้าง หนัง PU", category: "กระเป๋า", cost: 200, price: 590, stock: 88, shopee: 30, tiktok: 25, lazada: 33, status: "พร้อมขาย" },
];

export const thaiOrders = [
  { id: "SH-8821", channel: "Shopee", customer: "คุณสมชาย ใจดี", amount: 1850, status: "ใหม่", time: "1 นาทีที่แล้ว", items: 3, address: "กรุงเทพมหานคร" },
  { id: "TT-4521", channel: "TikTok Shop", customer: "คุณสุดา รักไทย", amount: 2400, status: "จัดส่งแล้ว", time: "5 นาทีที่แล้ว", items: 2, address: "นนทบุรี" },
  { id: "LZ-3092", channel: "Lazada", customer: "บจก. สยามเทรด", amount: 15200, status: "รอชำระ", time: "12 นาทีที่แล้ว", items: 12, address: "กรุงเทพมหานคร" },
  { id: "SH-8820", channel: "Shopee", customer: "คุณวิภา ส่งสินค้า", amount: 980, status: "ใหม่", time: "18 นาทีที่แล้ว", items: 1, address: "ชลบุรี" },
  { id: "TT-4520", channel: "TikTok Shop", customer: "คุณกิตติ พอเพียง", amount: 3200, status: "จัดส่งแล้ว", time: "25 นาทีที่แล้ว", items: 4, address: "กรุงเทพมหานคร" },
  { id: "LZ-3091", channel: "Lazada", customer: "คุณมาลี ขายดี", amount: 1750, status: "รอชำระ", time: "35 นาทีที่แล้ว", items: 2, address: "สงขลา" },
  { id: "SH-8819", channel: "Shopee", customer: "คุณอนุชา ออนไลน์", amount: 4200, status: "จัดส่งแล้ว", time: "45 นาทีที่แล้ว", items: 5, address: "เชียงใหม่" },
  { id: "TT-4519", channel: "TikTok Shop", customer: "คุณนรา สวยงาม", amount: 890, status: "ใหม่", time: "1 ชั่วโมงที่แล้ว", items: 1, address: "นครศรีธรรมราช" },
];

export const thaiEmployees = [
  { id: "EMP-001", name: "คุณสมชัย ใจดี", dept: "ฝ่ายขาย", position: "หัวหน้าทีมขาย", salary: 45000, status: "ทำงาน", phone: "081-123-4567", email: "somchai@cboom.in.th", joinDate: "2023-01-15" },
  { id: "EMP-002", name: "คุณปนัดดา ศรีสุข", dept: "การตลาด", position: "Digital Marketing Specialist", salary: 35000, status: "ทำงาน", phone: "082-234-5678", email: "panadda@cboom.in.th", joinDate: "2023-03-20" },
  { id: "EMP-003", name: "คุณวิทยา พานิช", dept: "คลังสินค้า", position: "หัวหน้าคลัง", salary: 30000, status: "ลาพัก", phone: "083-345-6789", email: "wittaya@cboom.in.th", joinDate: "2022-06-10" },
  { id: "EMP-004", name: "คุณอนุชา ออนไลน์", dept: "ฝ่ายขาย", position: "Sales Executive", salary: 28000, status: "ทำงาน", phone: "084-456-7890", email: "anucha@cboom.in.th", joinDate: "2024-01-05" },
  { id: "EMP-005", name: "คุณมาลี ขายดี", dept: "บัญชี", position: "Accountant", salary: 32000, status: "ทำงาน", phone: "085-567-8901", email: "malee@cboom.in.th", joinDate: "2023-07-15" },
  { id: "EMP-006", name: "คุณกิตติ พอเพียง", dept: "ไอที", position: "Full-Stack Developer", salary: 55000, status: "ทำงาน", phone: "086-678-9012", email: "kitti@cboom.in.th", joinDate: "2022-11-01" },
  { id: "EMP-007", name: "คุณสุดา รักไทย", dept: "ฝ่ายขาย", position: "Sales Executive", salary: 28000, status: "ลากิจ", phone: "087-789-0123", email: "suda@cboom.in.th", joinDate: "2024-02-10" },
  { id: "EMP-008", name: "คุณบุญเลิศ มีสุข", dept: "คลังสินค้า", position: "เจ้าหน้าที่คลัง", salary: 22000, status: "ทำงาน", phone: "088-890-1234", email: "boonlert@cboom.in.th", joinDate: "2023-09-01" },
];

export const thaiInvoices = [
  { id: "INV-2026-001", customer: "บจก. สยามเทรดดิ้ง", date: "2026-07-10", dueDate: "2026-07-25", amount: 850000, tax: 59500, total: 909500, status: "ออกใบแจ้งหนี้แล้ว" },
  { id: "INV-2026-002", customer: "โรงงาน ไทยพรีเมียม", date: "2026-07-08", dueDate: "2026-07-23", amount: 1200000, tax: 84000, total: 1284000, status: "ชำระแล้ว" },
  { id: "INV-2026-003", customer: "ร้าน ก้าวหน้า คอมเมิร์ซ", date: "2026-07-05", dueDate: "2026-07-20", amount: 320000, tax: 22400, total: 342400, status: "เกินกำหนด" },
  { id: "INV-2026-004", customer: "Smart Retail Co., Ltd.", date: "2026-07-03", dueDate: "2026-07-18", amount: 150000, tax: 10500, total: 160500, status: "ออกใบแจ้งหนี้แล้ว" },
  { id: "INV-2026-005", customer: "แม่ค้าออนไลน์ ไทยแลนด์", date: "2026-07-01", dueDate: "2026-07-16", amount: 430000, tax: 30100, total: 460100, status: "ชำระแล้ว" },
];

export const thaiExpenses = [
  { id: "EXP-001", category: "ค่าเช่าสำนักงาน", date: "2026-07-01", amount: 65000, vendor: "บจก. พร็อพเพอร์ตี้ ไทย", status: "อนุมัติแล้ว" },
  { id: "EXP-002", category: "ค่าโฆษณา", date: "2026-07-05", amount: 45000, vendor: "Meta Platforms Thailand", status: "อนุมัติแล้ว" },
  { id: "EXP-003", category: "ค่าจ้างพนักงาน", date: "2026-07-01", amount: 385000, vendor: "พนักงาน CBoom", status: "อนุมัติแล้ว" },
  { id: "EXP-004", category: "ค่าขนส่ง", date: "2026-07-08", amount: 18500, vendor: " Kerry Express", status: "รออนุมัติ" },
  { id: "EXP-005", category: "ค่าซ่อมบำรุง", date: "2026-07-10", amount: 8200, vendor: "ไทย เทคนิค เซอร์วิส", status: "รออนุมัติ" },
];

export const thaiWarehouseItems = [
  { id: "RCV-001", po: "PO-2026-001", supplier: "บจก. ไทย ซัพพลาย", product: "เสื้อยืด Cotton Premium", qty: 500, status: "รับเข้าแล้ว", date: "2026-07-10", warehouse: "คลังกรุงเทพ" },
  { id: "RCV-002", po: "PO-2026-002", supplier: "ห้างหุ้นส่วน อีสาน เทรด", product: "รองเท้าผ้าใบ Sport", qty: 300, status: "รอรับ", date: "2026-07-11", warehouse: "คลังกรุงเทพ" },
  { id: "RCV-003", po: "PO-2026-003", supplier: "บริษัท เชียงใหม่ ซัพพลาย", product: "กระเป๋าผ้า Canvas", qty: 800, status: "รับเข้าแล้ว", date: "2026-07-09", warehouse: "คลังเชียงใหม่" },
];

export const thaiPickings = [
  { id: "PK-001", order: "SH-8821", product: "เสื้อยืด Cotton Premium", qty: 3, picker: "คุณบุญเลิศ", status: "หยิบแล้ว", date: "2026-07-10" },
  { id: "PK-002", order: "TT-4521", product: "รองเท้าผ้าใบ Sport", qty: 2, picker: "คุณวิทยา", status: "กำลังหยิบ", date: "2026-07-10" },
  { id: "PK-003", order: "LZ-3092", product: "กระเป๋าผ้า Canvas", qty: 12, picker: "คุณบุญเลิศ", status: "รอหยิบ", date: "2026-07-10" },
];

export const thaiProjects = [
  { id: "PRJ-001", name: "พัฒนา Mobile App CBoom", client: "ภายใน", progress: 65, status: "กำลังดำเนิน", deadline: "2026-08-30", team: 5, priority: "สูง" },
  { id: "PRJ-002", name: "เชื่อมต่อ TikTok Shop API", client: "ภายใน", progress: 90, status: "ใกล้เสร็จ", deadline: "2026-07-20", team: 3, priority: "สูง" },
  { id: "PRJ-003", name: "ย้ายระบบไป Cloud", client: "ภายใน", progress: 40, status: "กำลังดำเนิน", deadline: "2026-09-15", team: 4, priority: "ปานกลาง" },
  { id: "PRJ-004", name: "ออกแบบรายงาน ESG", client: "ภายใน", progress: 20, status: "เริ่มต้น", deadline: "2026-10-01", team: 2, priority: "ต่ำ" },
];

export const thaiProjectTasks = [
  { id: "TSK-001", title: "ออกแบบ UI Dashboard ใหม่", project: "PRJ-001", assignee: "คุณกิตติ", status: "ทำเสร็จ", priority: "สูง", dueDate: "2026-07-15" },
  { id: "TSK-002", title: "เขียน API Documentation", project: "PRJ-002", assignee: "คุณกิตติ", status: "กำลังทำ", priority: "ปานกลาง", dueDate: "2026-07-18" },
  { id: "TSK-003", title: "ตั้งค่า AWS EC2", project: "PRJ-003", assignee: "คุณกิตติ", status: "กำลังทำ", priority: "สูง", dueDate: "2026-07-25" },
  { id: "TSK-004", title: "รวบรวมข้อมูล Carbon", project: "PRJ-004", assignee: "คุณปนัดดา", status: "ต้องทำ", priority: "ต่ำ", dueDate: "2026-08-01" },
  { id: "TSK-005", title: "ทดสอบ OAuth Flow", project: "PRJ-002", assignee: "คุณอนุชา", status: "ทำเสร็จ", priority: "สูง", dueDate: "2026-07-12" },
  { id: "TSK-006", title: "ออกแบบ Database Schema", project: "PRJ-001", assignee: "คุณกิตติ", status: "กำลังทำ", priority: "สูง", dueDate: "2026-07-20" },
];

export const reportData = [
  { month: "ม.ค.", revenue: 3200000, orders: 8200, profit: 480000, customers: 320 },
  { month: "ก.พ.", revenue: 3850000, orders: 9800, profit: 580000, customers: 410 },
  { month: "มี.ค.", revenue: 4100000, orders: 10500, profit: 620000, customers: 480 },
  { month: "เม.ย.", revenue: 3650000, orders: 9100, profit: 520000, customers: 390 },
  { month: "พ.ค.", revenue: 4800000, orders: 12300, profit: 720000, customers: 550 },
  { month: "มิ.ย.", revenue: 5200000, orders: 13800, profit: 810000, customers: 620 },
];

export const kpiData = [
  { label: "ยอดขายวันนี้", value: 128450, prefix: "฿", change: 18.2, up: true, icon: "trending-up", color: "text-green-500" },
  { label: "ออเดอร์วันนี้", value: 342, prefix: "", change: 9.4, up: true, icon: "shopping-cart", color: "text-blue-500" },
  { label: "GMV", value: 1850000, prefix: "฿", change: 15.7, up: true, icon: "dollar-sign", color: "text-purple-500" },
  { label: "กำไรขั้นต้น", value: 642000, prefix: "฿", change: 12.3, up: true, icon: "pie-chart", color: "text-cyan-500" },
  { label: "กำไรสุทธิ", value: 385000, prefix: "฿", change: 8.1, up: true, icon: "wallet", color: "text-indigo-500" },
  { label: "ยอดขาย vs เป้าหมาย", value: 87, prefix: "", suffix: "%", change: 5.2, up: true, icon: "target", color: "text-amber-500" },
  { label: "ลูกค้าใหม่", value: 87, prefix: "", change: 4.1, up: true, icon: "user-plus", color: "text-pink-500" },
  { label: "รอดำเนินการ", value: 23, prefix: "", change: -12, up: false, icon: "clock", color: "text-orange-500" },
];

export const channelData = [
  { name: "Shopee", orders: 156, pct: 46, color: "bg-orange-500" },
  { name: "TikTok Shop", orders: 112, pct: 33, color: "bg-pink-500" },
  { name: "Lazada", orders: 74, pct: 21, color: "bg-blue-500" },
];

export const pipelineStages = [
  { stage: "ลีดใหม่", count: 142, pct: 100, color: "bg-blue-500" },
  { stage: "ติดต่อแล้ว", count: 98, pct: 69, color: "bg-cyan-500" },
  { stage: "เสนอราคา", count: 54, pct: 38, color: "bg-amber-500" },
  { stage: "ปิดการขาย", count: 31, pct: 22, color: "bg-green-500" },
];

export const notifications = [
  { id: 1, title: "ออเดอร์ใหม่จาก Shopee #SH-8821", type: "order", time: "1 นาทีที่แล้ว" },
  { id: 2, title: "AI แนะนำเติมสต๊อก SKU-2291", type: "ai", time: "8 นาทีที่แล้ว" },
  { id: 3, title: "สต๊อกสินค้า SKU-1101 เหลือน้อย", type: "warning", time: "20 นาทีที่แล้ว" },
  { id: 4, title: "รายงานยอดขายรายสัปดาห์พร้อมแล้ว", type: "report", time: "1 ชั่วโมงที่แล้ว" },
  { id: 5, title: "คุณอนุชา ปิดการขาย ฿850,000", type: "success", time: "2 ชั่วโมงที่แล้ว" },
  { id: 6, title: "ใบแจ้งหนี้ INV-2026-003 เกินกำหนด", type: "warning", time: "3 ชั่วโมงที่แล้ว" },
];

export const aiInsights = [
  { title: "พยากรณ์ยอดขาย", value: "+22%", desc: "สัปดาห์หน้า คาดว่ายอดขายเพิ่มขึ้น 22% จากเทรนด์ปัจจุบัน", icon: "trending-up" },
  { title: "สินค้าควรเติมสต๊อก", value: "5 รายการ", desc: "SKU-2291, SKU-1101 และอีก 3 รายการใกล้หมดสต๊อก", icon: "package" },
  { title: "ลูกค้าเสี่ยงสูง", value: "3 ราย", desc: "ลูกค้าที่ไม่ได้สั่งซื้อนานกว่า 30 วัน ควรติดตาม", icon: "alert-circle" },
  { title: "ช่องทางที่มีศักยภาพ", value: "TikTok Shop", desc: "การเติบโต 45% ในไตรมาสนี้ แนะนำเพิ่มงบโฆษณา", icon: "target" },
];

export const integrationsConnected = [
  { name: "Shopee", category: "Marketplace", status: "เชื่อมต่อแล้ว", lastSync: "2 นาทีที่แล้ว", color: "bg-orange-500", icon: "shopping-bag" },
  { name: "TikTok Shop", category: "Marketplace", status: "เชื่อมต่อแล้ว", lastSync: "1 นาทีที่แล้ว", color: "bg-pink-500", icon: "music" },
  { name: "Lazada", category: "Marketplace", status: "เชื่อมต่อแล้ว", lastSync: "5 นาทีที่แล้ว", color: "bg-blue-500", icon: "shopping-cart" },
  { name: "LINE OA", category: "Communication", status: "เชื่อมต่อแล้ว", lastSync: "10 นาทีที่แล้ว", color: "bg-green-500", icon: "message-circle" },
  { name: "Google Sheets", category: "Productivity", status: "เชื่อมต่อแล้ว", lastSync: "1 ชั่วโมงที่แล้ว", color: "bg-emerald-500", icon: "file-spreadsheet" },
];

export const integrationsAvailable = [
  { name: "Shopify", category: "E-Commerce", color: "bg-green-600", icon: "shopping-bag" },
  { name: "WooCommerce", category: "E-Commerce", color: "bg-purple-600", icon: "shopping-cart" },
  { name: "Magento", category: "E-Commerce", color: "bg-orange-600", icon: "store" },
  { name: "Facebook Shops", category: "Social Commerce", color: "bg-blue-600", icon: "facebook" },
];

export const automationWorkflows = [
  { id: "WF-001", name: "ออเดอร์ใหม่ → สร้างลูกค้า → หักสต๊อก → ใบแจ้งหนี้ → LINE Notify", trigger: "ออเดอร์ใหม่", actions: 5, status: "เปิดใช้งาน", runs: 1248 },
  { id: "WF-002", name: "สต๊อกต่ำ → แจ้งเตือน → สร้าง PO", trigger: "สต๊อกต่ำกว่ากำหนด", actions: 3, status: "เปิดใช้งาน", runs: 42 },
  { id: "WF-003", name: "ชำระเงินแล้ว → อัปเดตออเดอร์ → ส่งใบเสร็จ", trigger: "ชำระเงินสำเร็จ", actions: 3, status: "เปิดใช้งาน", runs: 856 },
  { id: "WF-004", name: "สิ้นเดือน → สร้างรายงาน → ส่งอีเมล", trigger: "ตามเวลา (สิ้นเดือน)", actions: 2, status: "ปิดใช้งาน", runs: 6 },
];

export const automationFlow = [
  { step: 1, label: "ออเดอร์ใหม่", type: "trigger", icon: "shopping-cart" },
  { step: 2, label: "สร้างลูกค้า", type: "action", icon: "user-plus" },
  { step: 3, label: "หักสต๊อก", type: "action", icon: "package" },
  { step: 4, label: "สร้างใบแจ้งหนี้", type: "action", icon: "file-text" },
  { step: 5, label: "ส่ง LINE Notify", type: "action", icon: "message-circle" },
  { step: 6, label: "แจ้งทีมขาย", type: "action", icon: "bell" },
];

export const webhookLogs = [
  { id: "WH-001", event: "order.created", source: "Shopee", status: "สำเร็จ", time: "2026-07-10 10:32", response: "200 OK" },
  { id: "WH-002", event: "order.shipped", source: "TikTok Shop", status: "สำเร็จ", time: "2026-07-10 10:28", response: "200 OK" },
  { id: "WH-003", event: "product.stock_updated", source: "Lazada", status: "สำเร็จ", time: "2026-07-10 10:15", response: "200 OK" },
  { id: "WH-004", event: "order.cancelled", source: "Shopee", status: "ล้มเหลว", time: "2026-07-10 09:45", response: "500 Error" },
  { id: "WH-005", event: "settlement.completed", source: "TikTok Shop", status: "สำเร็จ", time: "2026-07-10 09:30", response: "200 OK" },
];

export const posProducts = [
  { barcode: "8851234567890", name: "น้ำดื่ม Singha 600ml", price: 7, stock: 120, category: "เครื่องดื่ม" },
  { barcode: "8851234567891", name: "ขนมปัง ฟาร์มเฮ้าส์", price: 35, stock: 45, category: "เบเกอรี่" },
  { barcode: "8851234567892", name: "นมสด โรงเรียน 200ml", price: 12, stock: 80, category: "นม" },
  { barcode: "8851234567893", name: "ไข่ไก่ เบอร์ 2 แผง 10 ฟอง", price: 45, stock: 30, category: "อาหารสด" },
  { barcode: "8851234567894", name: "ชาเขียว โออิชิ 300ml", price: 15, stock: 60, category: "เครื่องดื่ม" },
  { barcode: "8851234567895", name: "ข้าวสาร หอมมะลิ 5kg", price: 250, stock: 15, category: "ข้าว" },
  { barcode: "8851234567896", name: "น้ำมันพืช คนอร์ 1L", price: 79, stock: 25, category: "น้ำมัน" },
  { barcode: "8851234567897", name: "ซอสปรุงรส แม็กกี้ 200g", price: 29, stock: 50, category: "ปรุงรส" },
];

export const hrDepartments = [
  { name: "ฝ่ายขาย", head: "คุณสมชัย ใจดี", count: 12, budget: 420000 },
  { name: "การตลาด", head: "คุณปนัดดา ศรีสุข", count: 5, budget: 180000 },
  { name: "คลังสินค้า", head: "คุณวิทยา พานิช", count: 8, budget: 240000 },
  { name: "บัญชี", head: "คุณมาลี ขายดี", count: 3, budget: 120000 },
  { name: "ไอที", head: "คุณกิตติ พอเพียง", count: 4, budget: 280000 },
];

export const hrAttendance = [
  { id: "ATT-001", name: "คุณสมชัย ใจดี", date: "2026-07-10", checkIn: "08:45", checkOut: "18:02", status: "ปกติ", hours: 9.28 },
  { id: "ATT-002", name: "คุณปนัดดา ศรีสุข", date: "2026-07-10", checkIn: "09:02", checkOut: "18:15", status: "ปกติ", hours: 9.22 },
  { id: "ATT-003", name: "คุณวิทยา พานิช", date: "2026-07-10", checkIn: "—", checkOut: "—", status: "ลาพัก", hours: 0 },
  { id: "ATT-004", name: "คุณอนุชา ออนไลน์", date: "2026-07-10", checkIn: "08:30", checkOut: "17:45", status: "ปกติ", hours: 9.25 },
  { id: "ATT-005", name: "คุณสุดา รักไทย", date: "2026-07-10", checkIn: "—", checkOut: "—", status: "ลากิจ", hours: 0 },
];

export const settingsUsers = [
  { id: "U-001", name: "คุณสมชัย ใจดี", email: "somchai@cboom.in.th", role: "Admin", status: "ใช้งาน", lastLogin: "วันนี้ 10:32" },
  { id: "U-002", name: "คุณปนัดดา ศรีสุข", email: "panadda@cboom.in.th", role: "Manager", status: "ใช้งาน", lastLogin: "วันนี้ 09:15" },
  { id: "U-003", name: "คุณวิทยา พานิช", email: "wittaya@cboom.in.th", role: "Staff", status: "ใช้งาน", lastLogin: "เมื่อวาน 17:30" },
  { id: "U-004", name: "คุณอนุชา ออนไลน์", email: "anucha@cboom.in.th", role: "Sales", status: "ใช้งาน", lastLogin: "วันนี้ 08:45" },
  { id: "U-005", name: "คุณมาลี ขายดี", email: "malee@cboom.in.th", role: "Accountant", status: "ใช้งาน", lastLogin: "วันนี้ 08:30" },
];

export const auditLogs = [
  { id: "LOG-001", user: "คุณสมชัย ใจดี", action: "เข้าสู่ระบบ", module: "Auth", time: "2026-07-10 10:32:15", ip: "110.169.42.1" },
  { id: "LOG-002", user: "คุณปนัดดา ศรีสุข", action: "แก้ไขโปรโมชั่น", module: "Marketplace", time: "2026-07-10 09:45:22", ip: "110.169.42.2" },
  { id: "LOG-003", user: "คุณมาลี ขายดี", action: "สร้างใบแจ้งหนี้", module: "Accounting", time: "2026-07-10 09:20:10", ip: "110.169.42.5" },
  { id: "LOG-004", user: "คุณกิตติ พอเพียง", action: "อัปเดต API Keys", module: "Settings", time: "2026-07-10 08:50:33", ip: "110.169.42.6" },
  { id: "LOG-005", user: "System", action: "ซิงค์สต๊อก Shopee", module: "Marketplace", time: "2026-07-10 08:30:00", ip: "—" },
];
