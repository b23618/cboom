// ─── Data Generator: Large realistic Thai business datasets ───

const thaiFirstNames = [
  "สมชัย", "ปนัดดา", "วิทยา", "อนุชา", "มาลี", "กิตติ", "สุดา", "บุญเลิศ",
  "ภาคิน", "ชนาภัทร", "อาทิตย์", "ปวีณา", "ธีรพงษ์", "นรา", "วิภา",
  "สมศักดิ์", "อรุณ", "ปิยะ", "จิราภรณ์", "ณัฐพล", "พิภพ", "อัครเดช",
  "ปรีดา", "สุภาพร", "วรเมธ", "อัจฉรา", "ชยพล", "ดวงใจ", "เอกชัย",
  "ปวันรัตน์", "กมลทิพย์", "สุรชัย", "วาสนา", "อนิรุทธ์", "พรพรรณ",
];

const thaiLastNames = [
  "ใจดี", "ศรีสุข", "พานิช", "ออนไลน์", "ขายดี", "พอเพียง", "รักไทย",
  "มีสุข", "วงศ์ไพศน์", "บุญมี", "แสงทอง", "จันทร์เพ็ญ", "รักษ์ดี",
  "สวยงาม", "เหนือเมฆ", "ส่งสินค้า", "ทองดี", "ใจสู้", "รัตนชัย",
  "บุญเกิด", "สิริสุวรรณ", "เกียรติศักดิ์", "อ่อนนุช", "วงศ์สวัสดิ์",
];

const companyPrefixes = [
  "สยาม", "ไทย", "กรุง", "เชียง", "อีสาน", "ใต้", "กลาง", "เหนือ",
  "พรีเมียม", "สมาร์ท", "ดิจิทัล", "คอมเมิร์ซ", "เทรด", "ซัพพลาย",
  "โกลบอล", "เอเชีย", "พลัส", "เน็กซ์", "โปร", "มาร์ท",
];

const companySuffixes = [
  "เทรดดิ้ง", "คอมเมิร์ซ", "พรีเมียม", "ดิจิทัล", "ซัพพลาย", "เทคโนโลยี",
  "เซอร์วิส", "มาร์เก็ตติ้ง", "ดิสทริบิวชั่น", "อินโนเวชั่น", "กรุ๊ป",
  "เวิร์กซ์", "ฮับ", "พาร์ทเนอร์ส", "โซลูชั่นส์",
];

const cities = [
  "กรุงเทพมหานคร", "นนทบุรี", "ปทุมธานี", "ชลบุรี", "เชียงใหม่",
  "ขอนแก่น", "สงขลา", "นครศรีธรรมราช", "ภูเก็ต", "ระยอง",
  "นครราชสีมา", "อุดรธานี", "พิษณุโลก", "สุราษฎร์ธานี", "เพชรบุรี",
];

const productCategories = ["เสื้อผ้า", "รองเท้า", "กระเป๋า", "หมวก", "เครื่องประดับ", "นาฬิกา", "แว่นตา", "เครื่องสำอาง", "อุปกรณ์อิเล็กทรอนิกส์", "ของใช้ในบ้าน"];
const productAdjectives = ["Premium", "Classic", "Sport", "Casual", "Elegant", "Smart", "Eco", "Luxury", "Daily", "Pro"];
const productTypes = ["เสื้อยืด", "เสื้อโปโล", "กางเกงขายาว", "กางเกงขาสั้น", "รองเท้าผ้าใบ", "รองเท้าแตะ", "กระเป๋าสะพาย", "กระเป๋าผ้า", "หมวกแก๊ป", "หมวกบักเก็ต", "เข็มขัด", "นาฬิกาข้อมือ", "แว่นกันแดด", "ต่างหู", "สร้อยคอ", "เข็มกลัด", "ผ้าพันคอ", "ถุงมือ", "เป็ดกันฝน", "ร่มกันแดด"];
const productColors = ["สีดำ", "สีขาว", "สีน้ำตาล", "สีกรมท่า", "สีเทา", "สีครีม", "สีแดง", "สีเขียว", "สีชมพู", "สีฟ้า", "สีเหลือง", "สีม่วง", "สีส้ม", "สีคามัว", "สีเบจ"];
const channels = ["Shopee", "TikTok Shop", "Lazada"];
const orderStatuses = ["ใหม่", "รอชำระ", "จัดเตรียม", "จัดส่งแล้ว", "สำเร็จ", "ยกเลิก"];
const customerStages = ["ลีดใหม่", "ติดต่อแล้ว", "เสนอราคา", "ปิดการขาย", "ดูแลหลังขาย"];
const customerTypes = ["นิติบุคคล", "บุคคลธรรมดา"];
const leadSources = ["Website", "Facebook Ads", "LINE OA", "Google Ads", "Referral", "TikTok Ads", "Shopee", "Walk-in", "Cold Call", "Email Marketing"];
const employeeDepts = ["ฝ่ายขาย", "การตลาด", "คลังสินค้า", "บัญชี", "ไอที", "ฝ่ายบุคคล", "ปฏิบัติการ", "บริการลูกค้า"];
const employeePositions = [
  "หัวหน้าทีมขาย", "Sales Executive", "Senior Sales", "Digital Marketing Specialist", "Marketing Manager",
  "หัวหน้าคลัง", "เจ้าหน้าที่คลัง", "Accountant", "Senior Accountant", "Full-Stack Developer",
  "Backend Developer", "Frontend Developer", "HR Manager", "HR Specialist", "Operations Manager",
  "Customer Service", "Shift Supervisor", "Cashier", "Store Manager", "Data Analyst",
];
const employeeStatuses = ["ทำงาน", "ลาพัก", "ลากิจ", "ลาป่วย", "ออกงานนอก"];
const invoiceStatuses = ["ออกใบแจ้งหนี้แล้ว", "ชำระแล้ว", "เกินกำหนด", "ฉบับร่าง", "ยกเลิก"];
const expenseCategories = ["ค่าเช่าสำนักงาน", "ค่าโฆษณา", "ค่าจ้างพนักงาน", "ค่าขนส่ง", "ค่าซ่อมบำรุง", "ค่าไฟฟ้า", "ค่าน้ำ", "ค่าอินเทอร์เน็ต", "ค่าซอฟต์แวร์", "ค่าวัสดุสำนักงาน", "ค่าเดินทาง", "ค่าประชุม", "ค่าที่ปรึกษา", "ค่าธรรมเนียมธนาคาร"];
const expenseStatuses = ["อนุมัติแล้ว", "รออนุมัติ", "ปฏิเสธ"];
const warehouseNames = ["คลังกรุงเทพ", "คลังเชียงใหม่", "คลังสงขลา", "คลังขอนแก่น", "คลังชลบุรี"];
const supplierNames = [
  "บจก. ไทย ซัพพลาย", "ห้างหุ้นส่วน อีสาน เทรด", "บริษัท เชียงใหม่ ซัพพลาย",
  "บจก. กรุงเทพ ดิสทริบิวชั่น", "บริษัท ใต้ คอมเมิร์ซ", "บจก. พรีเมียม ซอร์สซิ่ง",
  "บริษัท เอเชีย เทรดดิ้ง", "บจก. โกลบอล ซัพพลายเออร์", "ห้างหุ้นส่วน เหนือ ดิสทริบิวเตอร์",
  "บริษัท สยาม อิมปอร์ต", "บจก. เน็กซ์ เทรด", "บริษัท โปร ซัพพลาย",
];

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const pickN = <T,>(arr: T[], n: number): T[] => {
  const copy = [...arr];
  const result: T[] = [];
  for (let i = 0; i < n && copy.length > 0; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
};

function pad(n: number, len: number) { return String(n).padStart(len, "0"); }

function randomPhone() {
  return `0${rand(2, 9)}${rand(0, 9)}-${rand(100, 999)}-${rand(1000, 9999)}`;
}

function randomEmail(name: string) {
  const slug = name.replace(/[^\u0E00-\u0E7F]/g, "").replace(/\s+/g, "").toLowerCase();
  const domains = ["gmail.com", "hotmail.co.th", "yahoo.com", "outlook.com", "company.co.th"];
  return `${slug}@${pick(domains)}`;
}

// ─── Generate 500+ Customers ──────────────────────────────────
export function generateCustomers(count = 520) {
  const customers: any[] = [];
  for (let i = 1; i <= count; i++) {
    const isCorp = Math.random() > 0.4;
    const name = isCorp
      ? `${pick(["บจก.", "บริษัท", "ห้างหุ้นส่วน"])} ${pick(companyPrefixes)}${pick(companySuffixes)}`
      : `ร้าน ${pick(companyPrefixes)} ${pick(companySuffixes)}`;
    const contact = `คุณ${pick(thaiFirstNames)} ${pick(thaiLastNames)}`;
    const stage = pick(customerStages);
    const value = rand(50, 2500) * 1000;
    const daysAgo = rand(0, 60);
    const lastContact = daysAgo === 0 ? "วันนี้" : daysAgo === 1 ? "1 วันที่แล้ว" : `${daysAgo} วันที่แล้ว`;
    customers.push({
      id: `C-${pad(i, 4)}`,
      name,
      contact,
      phone: randomPhone(),
      email: randomEmail(contact),
      stage,
      value,
      lastContact,
      city: pick(cities),
      type: isCorp ? "นิติบุคคล" : "บุคคลธรรมดา",
      orders: rand(1, 85),
      avgOrder: rand(5, 120) * 1000,
      satisfaction: rand(65, 99),
      notes: "",
    });
  }
  return customers;
}

// ─── Generate 300+ Products ───────────────────────────────────
export function generateProducts(count = 320) {
  const products: any[] = [];
  for (let i = 1; i <= count; i++) {
    const category = pick(productCategories);
    const name = `${pick(productTypes)} ${pick(productAdjectives)} ${pick(productColors)}`;
    const cost = rand(30, 800);
    const price = Math.ceil(cost * (1.3 + Math.random() * 1.5) / 10) * 10;
    const stock = rand(0, 500);
    const status = stock === 0 ? "สินค้าหมด" : stock < 20 ? "ใกล้หมด" : "พร้อมขาย";
    products.push({
      sku: `SKU-${pad(1000 + i, 4)}`,
      name,
      category,
      cost,
      price,
      stock,
      shopee: Math.floor(stock * 0.35),
      tiktok: Math.floor(stock * 0.25),
      lazada: Math.floor(stock * 0.30),
      status,
      sold: rand(0, 2000),
      rating: (3.5 + Math.random() * 1.5).toFixed(1),
    });
  }
  return products;
}

// ─── Generate 2000+ Orders ────────────────────────────────────
export function generateOrders(count = 2100, customers: any[], products: any[]) {
  const orders: any[] = [];
  const statuses = ["ใหม่", "รอชำระ", "จัดเตรียม", "จัดส่งแล้ว", "สำเร็จ", "สำเร็จ", "สำเร็จ", "ยกเลิก"];
  for (let i = 1; i <= count; i++) {
    const channel = pick(channels);
    const prefix = channel === "Shopee" ? "SH" : channel === "TikTok Shop" ? "TT" : "LZ";
    const customer = pick(customers);
    const itemCount = rand(1, 15);
    const amount = itemCount * rand(150, 2500);
    const status = pick(statuses);
    const daysAgo = rand(0, 90);
    const date = new Date(2026, 6, 11 - daysAgo);
    const dateStr = date.toISOString().slice(0, 10);
    const minsAgo = daysAgo === 0 ? rand(1, 600) : -1;
    const time = minsAgo > 0
      ? minsAgo < 60 ? `${minsAgo} นาทีที่แล้ว` : `${Math.floor(minsAgo / 60)} ชั่วโมงที่แล้ว`
      : `${daysAgo} วันที่แล้ว`;
    orders.push({
      id: `${prefix}-${pad(8000 + i, 4)}`,
      channel,
      customer: customer.name,
      customerId: customer.id,
      amount,
      status,
      time,
      date: dateStr,
      items: itemCount,
      address: customer.city,
      paymentMethod: pick(["บัตรเครดิต", "โอนผ่านธนาคาร", "เก็บเงินปลายทาง", "TrueMoney", "ShopeePay", "QR PromptPay"]),
      shipping: pick(["Kerry Express", "Flash Express", "J&T Express", "Thailand Post", "Ninja Van"]),
      tracking: rand(0, 1) ? `TH${rand(100000000, 999999999)}` : "—",
    });
  }
  return orders.sort((a, b) => b.date.localeCompare(a.date));
}

// ─── Generate 50+ Employees ───────────────────────────────────
export function generateEmployees(count = 56) {
  const employees: any[] = [];
  for (let i = 1; i <= count; i++) {
    const name = `คุณ${pick(thaiFirstNames)} ${pick(thaiLastNames)}`;
    const dept = pick(employeeDepts);
    const salary = rand(180, 80) * 1000;
    const joinYear = rand(2021, 2026);
    const joinMonth = rand(1, 12);
    const joinDay = rand(1, 28);
    employees.push({
      id: `EMP-${pad(i, 3)}`,
      name,
      dept,
      position: pick(employeePositions),
      salary,
      status: pick(employeeStatuses),
      phone: randomPhone(),
      email: `${name.replace("คุณ", "").replace(/\s+/g, ".").toLowerCase()}@cboom.in.th`,
      joinDate: `${joinYear}-${pad(joinMonth, 2)}-${pad(joinDay, 2)}`,
      leaveDays: rand(0, 10),
      performance: rand(60, 98),
    });
  }
  return employees;
}

// ─── Generate 40+ Suppliers ───────────────────────────────────
export function generateSuppliers(count = 45) {
  const suppliers: any[] = [];
  for (let i = 1; i <= count; i++) {
    const name = `${pick(["บจก.", "บริษัท", "ห้างหุ้นส่วน"])} ${pick(companyPrefixes)}${pick(companySuffixes)}`;
    suppliers.push({
      id: `SUP-${pad(i, 3)}`,
      name,
      contact: `คุณ${pick(thaiFirstNames)} ${pick(thaiLastNames)}`,
      phone: randomPhone(),
      email: randomEmail(name),
      city: pick(cities),
      category: pick(productCategories),
      totalPO: rand(5, 120),
      totalValue: rand(100, 5000) * 1000,
      leadTime: rand(3, 30),
      rating: (3 + Math.random() * 2).toFixed(1),
      status: pick(["ใช้งาน", "ใช้งาน", "ใช้งาน", "รอการอนุมัติ", "ปิดการใช้งาน"]),
    });
  }
  return suppliers;
}

// ─── Generate 1000+ Invoices ──────────────────────────────────
export function generateInvoices(count = 1050, customers: any[]) {
  const invoices: any[] = [];
  for (let i = 1; i <= count; i++) {
    const customer = pick(customers);
    const amount = rand(10, 500) * 1000;
    const tax = Math.round(amount * 0.07);
    const total = amount + tax;
    const daysAgo = rand(0, 180);
    const date = new Date(2026, 6, 11 - daysAgo);
    const dueDate = new Date(date.getTime() + 15 * 86400000);
    const status = pick(["ชำระแล้ว", "ชำระแล้ว", "ชำระแล้ว", "ออกใบแจ้งหนี้แล้ว", "เกินกำหนด", "ฉบับร่าง", "ยกเลิก"]);
    invoices.push({
      id: `INV-2026-${pad(i, 4)}`,
      customer: customer.name,
      customerId: customer.id,
      date: date.toISOString().slice(0, 10),
      dueDate: dueDate.toISOString().slice(0, 10),
      amount,
      tax,
      total,
      status,
      paymentMethod: pick(["โอนผ่านธนาคาร", "เช็ค", "เงินสด", "บัตรเครดิต", "QR PromptPay"]),
    });
  }
  return invoices.sort((a, b) => b.date.localeCompare(a.date));
}

// ─── Generate Quotations ──────────────────────────────────────
export function generateQuotations(count = 180, customers: any[]) {
  const quotes: any[] = [];
  for (let i = 1; i <= count; i++) {
    const customer = pick(customers);
    const amount = rand(20, 800) * 1000;
    const daysAgo = rand(0, 60);
    const date = new Date(2026, 6, 11 - daysAgo);
    quotes.push({
      id: `QT-2026-${pad(i, 4)}`,
      customer: customer.name,
      customerId: customer.id,
      date: date.toISOString().slice(0, 10),
      validUntil: new Date(date.getTime() + 30 * 86400000).toISOString().slice(0, 10),
      amount,
      status: pick(["รอตอบกลับ", "ส่งแล้ว", "อนุมัติ", "ปฏิเสธ", "หมดอายุ"]),
      salesperson: `คุณ${pick(thaiFirstNames)} ${pick(thaiLastNames)}`,
    });
  }
  return quotes.sort((a, b) => b.date.localeCompare(a.date));
}

// ─── Generate Purchase Orders ─────────────────────────────────
export function generatePurchaseOrders(count = 120, suppliers: any[], products: any[]) {
  const pos: any[] = [];
  for (let i = 1; i <= count; i++) {
    const supplier = pick(suppliers);
    const product = pick(products);
    const qty = rand(50, 2000);
    const unitCost = product.cost;
    const total = qty * unitCost;
    const daysAgo = rand(0, 90);
    const date = new Date(2026, 6, 11 - daysAgo);
    pos.push({
      id: `PO-2026-${pad(i, 4)}`,
      supplier: supplier.name,
      supplierId: supplier.id,
      product: product.name,
      sku: product.sku,
      qty,
      unitCost,
      total,
      status: pick(["รออนุมัติ", "อนุมัติแล้ว", "สั่งซื้อแล้ว", "รับเข้าบางส่วน", "รับเข้าครบแล้ว", "ยกเลิก"]),
      date: date.toISOString().slice(0, 10),
      expectedDate: new Date(date.getTime() + supplier.leadTime * 86400000).toISOString().slice(0, 10),
      warehouse: pick(warehouseNames),
    });
  }
  return pos.sort((a, b) => b.date.localeCompare(a.date));
}

// ─── Generate Expenses ────────────────────────────────────────
export function generateExpenses(count = 200) {
  const expenses: any[] = [];
  for (let i = 1; i <= count; i++) {
    const daysAgo = rand(0, 180);
    const date = new Date(2026, 6, 11 - daysAgo);
    const amount = rand(5, 200) * 1000;
    expenses.push({
      id: `EXP-2026-${pad(i, 4)}`,
      category: pick(expenseCategories),
      date: date.toISOString().slice(0, 10),
      amount,
      vendor: pick(supplierNames),
      status: pick(["อนุมัติแล้ว", "อนุมัติแล้ว", "รออนุมัติ", "ปฏิเสธ"]),
      paymentMethod: pick(["โอนผ่านธนาคาร", "เงินสด", "เช็ค", "บัตรเครดิต"]),
      approvedBy: `คุณ${pick(thaiFirstNames)} ${pick(thaiLastNames)}`,
    });
  }
  return expenses.sort((a, b) => b.date.localeCompare(a.date));
}

// ─── Generate Leads ───────────────────────────────────────────
export function generateLeads(count = 200) {
  const leads: any[] = [];
  for (let i = 1; i <= count; i++) {
    const name = `คุณ${pick(thaiFirstNames)} ${pick(thaiLastNames)}`;
    const daysAgo = rand(0, 30);
    const date = new Date(2026, 6, 11 - daysAgo);
    leads.push({
      id: `L-${pad(i, 4)}`,
      name,
      source: pick(leadSources),
      score: rand(30, 99),
      stage: pick(["ลีดใหม่", "ลีดใหม่", "ติดต่อแล้ว", "ติดต่อแล้ว", "เสนอราคา", "ปิดการขาย"]),
      assignedTo: pick(["ทีมขาย A", "ทีมขาย B", "ทีมขาย C"]),
      date: date.toISOString().slice(0, 10),
      phone: randomPhone(),
      email: randomEmail(name),
      estimatedValue: rand(50, 2000) * 1000,
    });
  }
  return leads.sort((a, b) => b.date.localeCompare(a.date));
}

// ─── Generate Opportunities ───────────────────────────────────
export function generateOpportunities(count = 80, customers: any[]) {
  const opps: any[] = [];
  for (let i = 1; i <= count; i++) {
    const customer = pick(customers);
    const amount = rand(100, 3000) * 1000;
    const daysAgo = rand(0, 45);
    const date = new Date(2026, 6, 11 - daysAgo);
    opps.push({
      id: `OPP-${pad(i, 4)}`,
      customer: customer.name,
      customerId: customer.id,
      amount,
      stage: pick(["ค้นหาลูกค้า", "ติดต่อ", "เสนอราคา", "เจรจา", "ปิดการขาย", "ได้รับ"]),
      probability: rand(10, 95),
      expectedClose: new Date(date.getTime() + 30 * 86400000).toISOString().slice(0, 10),
      salesperson: `คุณ${pick(thaiFirstNames)} ${pick(thaiLastNames)}`,
    });
  }
  return opps.sort((a, b) => b.amount - a.amount);
}

// ─── Generate Stock Movements ─────────────────────────────────
export function generateStockMovements(count = 300, products: any[]) {
  const movements: any[] = [];
  const types = ["รับเข้า", "หยิบออก", "ส่งออก", "โอนย้าย", "ปรับปรุง", "ตรวจนับ"];
  for (let i = 1; i <= count; i++) {
    const product = pick(products);
    const type = pick(types);
    const qty = type === "รับเข้า" ? rand(50, 1000) : rand(1, 100);
    const daysAgo = rand(0, 30);
    const date = new Date(2026, 6, 11 - daysAgo);
    movements.push({
      id: `MOV-${pad(i, 5)}`,
      sku: product.sku,
      product: product.name,
      type,
      qty: type === "รับเข้า" ? qty : -qty,
      warehouse: pick(warehouseNames),
      reference: `REF-${pad(rand(1000, 9999), 4)}`,
      date: date.toISOString().slice(0, 10),
      user: `คุณ${pick(thaiFirstNames)} ${pick(thaiLastNames)}`,
    });
  }
  return movements.sort((a, b) => b.date.localeCompare(a.date));
}

// ─── Generate Returns ─────────────────────────────────────────
export function generateReturns(count = 60, orders: any[]) {
  const returns: any[] = [];
  const reasons = ["สินค้าไม่ตรงตามที่สั่ง", "สินค้าเสีย", "เปลี่ยนใจ", "สินค้ามีตำหนิ", "ส่งผิดชิ้น", "ขนาดไม่พอดี"];
  for (let i = 1; i <= count; i++) {
    const order = pick(orders);
    const daysAgo = rand(0, 60);
    const date = new Date(2026, 6, 11 - daysAgo);
    returns.push({
      id: `RET-${pad(i, 4)}`,
      orderId: order.id,
      customer: order.customer,
      channel: order.channel,
      amount: order.amount,
      reason: pick(reasons),
      status: pick(["รอตรวจสอบ", "อนุมัติ", "คืนเงินแล้ว", "ปฏิเสธ", "รับคืนแล้ว"]),
      date: date.toISOString().slice(0, 10),
    });
  }
  return returns.sort((a, b) => b.date.localeCompare(a.date));
}

// ─── Generate Settlements ─────────────────────────────────────
export function generateSettlements(count = 100) {
  const settlements: any[] = [];
  for (let i = 1; i <= count; i++) {
    const channel = pick(channels);
    const gross = rand(10, 500) * 1000;
    const fee = Math.round(gross * (channel === "Shopee" ? 0.04 : channel === "TikTok Shop" ? 0.05 : 0.03));
    const net = gross - fee;
    const daysAgo = rand(0, 90);
    const date = new Date(2026, 6, 11 - daysAgo);
    settlements.push({
      id: `STL-${pad(i, 4)}`,
      channel,
      period: `${date.getFullYear()}-${pad(date.getMonth() + 1, 2)}`,
      gross,
      fee,
      net,
      orders: rand(10, 200),
      status: pick(["เรียบร้อย", "เรียบร้อย", "รอดำเนินการ", "เกินกำหนด"]),
      date: date.toISOString().slice(0, 10),
    });
  }
  return settlements.sort((a, b) => b.date.localeCompare(a.date));
}

// ─── Generate API Logs ────────────────────────────────────────
export function generateApiLogs(count = 200) {
  const logs: any[] = [];
  const endpoints = ["/api/v1/orders", "/api/v1/products", "/api/v1/customers", "/api/v1/invoices", "/api/v1/webhooks", "/api/v1/payments"];
  const methods = ["GET", "POST", "PUT", "DELETE"];
  for (let i = 1; i <= count; i++) {
    const minsAgo = rand(1, 2880);
    const date = new Date(Date.now() - minsAgo * 60000);
    const success = Math.random() > 0.05;
    logs.push({
      id: `LOG-${pad(i, 5)}`,
      method: pick(methods),
      endpoint: pick(endpoints),
      status: success ? pick([200, 200, 201, 200]) : pick([400, 401, 403, 404, 500]),
      responseTime: rand(20, 800),
      ip: `${rand(1, 255)}.${rand(1, 255)}.${rand(1, 255)}.${rand(1, 255)}`,
      time: date.toTimeString().slice(0, 8),
      date: date.toISOString().slice(0, 10),
    });
  }
  return logs.sort((a, b) => b.time.localeCompare(a.time));
}

// ─── Generate Daily Sales for POS ─────────────────────────────
export function generatePOSSales(count = 500) {
  const sales: any[] = [];
  for (let i = 1; i <= count; i++) {
    const daysAgo = rand(0, 30);
    const date = new Date(2026, 6, 11 - daysAgo);
    const amount = rand(100, 5000);
    sales.push({
      id: `POS-${pad(i, 5)}`,
      date: date.toISOString().slice(0, 10),
      time: `${pad(rand(8, 21), 2)}:${pad(rand(0, 59), 2)}`,
      amount,
      items: rand(1, 20),
      paymentMethod: pick(["เงินสด", "QR PromptPay", "บัตรเครดิต", "TrueMoney", "LINE Pay"]),
      cashier: `คุณ${pick(thaiFirstNames)} ${pick(thaiLastNames)}`,
      status: pick(["สำเร็จ", "สำเร็จ", "สำเร็จ", "ยกเลิก"]),
    });
  }
  return sales.sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
}

// ─── Generate Payroll Records ─────────────────────────────────
export function generatePayroll(employees: any[]) {
  return employees.map((emp, i) => ({
    id: `PAY-2026-07-${pad(i + 1, 3)}`,
    employee: emp.name,
    employeeId: emp.id,
    dept: emp.dept,
    baseSalary: emp.salary,
    overtime: rand(0, 8000),
    bonus: rand(0, 15000),
    deductions: rand(500, 5000),
    socialSecurity: 750,
    tax: Math.round(emp.salary * 0.05),
    net: emp.salary + rand(0, 8000) + rand(0, 15000) - rand(500, 5000) - 750 - Math.round(emp.salary * 0.05),
    status: pick(["จ่ายแล้ว", "จ่ายแล้ว", "รออนุมัติ"]),
    month: "2026-07",
  }));
}

// ─── Generate Leave Requests ──────────────────────────────────
export function generateLeaveRequests(employees: any[], count = 40) {
  const leaves: any[] = [];
  const types = ["ลาพักร้อน", "ลากิจ", "ลาป่วย", "ลาคลอด", "ลาบวช"];
  for (let i = 1; i <= count; i++) {
    const emp = pick(employees);
    const days = rand(1, 10);
    const daysAgo = rand(0, 60);
    const start = new Date(2026, 6, 11 - daysAgo);
    const end = new Date(start.getTime() + days * 86400000);
    leaves.push({
      id: `LV-${pad(i, 4)}`,
      employee: emp.name,
      employeeId: emp.id,
      dept: emp.dept,
      type: pick(types),
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
      days,
      reason: pick(["เรื่องส่วนตัว", "เจ็บป่วย", "เดินทาง", "พักผ่อน", "กิจธุระครอบครัว"]),
      status: pick(["อนุมัติ", "อนุมัติ", "รออนุมัติ", "ปฏิเสธ"]),
    });
  }
  return leaves;
}

// ─── Generate Recruitment ─────────────────────────────────────
export function generateRecruitment(count = 25) {
  const jobs = [
    "Sales Executive", "Digital Marketing Specialist", "Full-Stack Developer", "Accountant",
    "Warehouse Manager", "Customer Service", "Data Analyst", "HR Specialist",
    "Backend Developer", "Store Manager", "Operations Manager", "Content Creator",
  ];
  const recruitment: any[] = [];
  for (let i = 1; i <= count; i++) {
    recruitment.push({
      id: `JOB-${pad(i, 3)}`,
      title: pick(jobs),
      dept: pick(employeeDepts),
      applicants: rand(5, 80),
      interviewed: rand(0, 15),
      offered: rand(0, 3),
      status: pick(["เปิดรับ", "เปิดรับ", "ปิดรับ", "รอสัมภาษณ์", "เสร็จสิ้น"]),
      postedDate: `2026-07-${pad(rand(1, 10), 2)}`,
      salaryRange: `${rand(20, 40)}K - ${rand(45, 80)}K`,
    });
  }
  return recruitment;
}

// ─── Generate Training Records ────────────────────────────────
export function generateTraining(count = 20) {
  const courses = [
    "Sales Techniques Masterclass", "Digital Marketing 101", "Excel Advanced",
    "Leadership & Management", "Customer Service Excellence", "Product Knowledge",
    "Safety in Warehouse", "Thai Labor Law", "Financial Planning", "Negotiation Skills",
    "Time Management", "Presentation Skills", "Data Visualization", "SEO Fundamentals",
  ];
  const training: any[] = [];
  for (let i = 1; i <= count; i++) {
    training.push({
      id: `TRN-${pad(i, 3)}`,
      course: pick(courses),
      trainer: `คุณ${pick(thaiFirstNames)} ${pick(thaiLastNames)}`,
      participants: rand(5, 30),
      completed: rand(3, 28),
      date: `2026-07-${pad(rand(1, 10), 2)}`,
      duration: pick(["2 ชั่วโมง", "4 ชั่วโมง", "1 วัน", "2 วัน", "3 วัน"]),
      status: pick(["จัดแล้ว", "กำลังอบรม", "วางแผน", "เสร็จสิ้น"]),
    });
  }
  return training;
}

// ─── Generate Cycle Counts ────────────────────────────────────
export function generateCycleCounts(count = 50, products: any[]) {
  const counts: any[] = [];
  for (let i = 1; i <= count; i++) {
    const product = pick(products);
    const systemQty = product.stock;
    const actualQty = Math.max(0, systemQty + rand(-5, 5));
    const diff = actualQty - systemQty;
    counts.push({
      id: `CC-${pad(i, 4)}`,
      sku: product.sku,
      product: product.name,
      warehouse: pick(warehouseNames),
      systemQty,
      actualQty,
      diff,
      status: diff === 0 ? "ตรง" : diff > 0 ? "เกิน" : "ขาด",
      date: `2026-07-${pad(rand(1, 10), 2)}`,
      counter: `คุณ${pick(thaiFirstNames)} ${pick(thaiLastNames)}`,
    });
  }
  return counts;
}

// ─── Generate Income Records ──────────────────────────────────
export function generateIncome(count = 150, customers: any[]) {
  const income: any[] = [];
  for (let i = 1; i <= count; i++) {
    const customer = pick(customers);
    const amount = rand(10, 500) * 1000;
    const daysAgo = rand(0, 180);
    const date = new Date(2026, 6, 11 - daysAgo);
    income.push({
      id: `INC-2026-${pad(i, 4)}`,
      source: pick(["ยอดขายสินค้า", "ค่าบริการ", "ค่าสมาชิก", "ค่าคอมมิชชั่น", "ดอกเบี้ย", "อื่นๆ"]),
      customer: customer.name,
      amount,
      date: date.toISOString().slice(0, 10),
      method: pick(["โอนผ่านธนาคาร", "เงินสด", "เช็ค", "QR PromptPay"]),
      status: pick(["รับแล้ว", "รับแล้ว", "รอรับ"]),
    });
  }
  return income.sort((a, b) => b.date.localeCompare(a.date));
}

// ─── Generate Payments ────────────────────────────────────────
export function generatePayments(count = 300, invoices: any[]) {
  const payments: any[] = [];
  for (let i = 1; i <= count; i++) {
    const inv = pick(invoices);
    const daysAgo = rand(0, 120);
    const date = new Date(2026, 6, 11 - daysAgo);
    payments.push({
      id: `PMT-2026-${pad(i, 4)}`,
      invoiceId: inv.id,
      customer: inv.customer,
      amount: inv.total,
      date: date.toISOString().slice(0, 10),
      method: pick(["โอนผ่านธนาคาร", "เงินสด", "เช็ค", "บัตรเครดิต", "QR PromptPay"]),
      status: pick(["สำเร็จ", "สำเร็จ", "สำเร็จ", "รอยืนยัน", "ล้มเหลว"]),
      reference: `TXN${rand(100000000, 999999999)}`,
    });
  }
  return payments.sort((a, b) => b.date.localeCompare(a.date));
}

// ─── Generate General Ledger ──────────────────────────────────
export function generateLedger(count = 200) {
  const accounts = [
    { code: "1000", name: "เงินสด", type: "สินทรัพย์" },
    { code: "1100", name: "ลูกหนี้การค้า", type: "สินทรัพย์" },
    { code: "1200", name: "สินค้าคงคลัง", type: "สินทรัพย์" },
    { code: "1500", name: "ครุภัณฑ์", type: "สินทรัพย์" },
    { code: "2000", name: "เจ้าหนี้การค้า", type: "หนี้สิน" },
    { code: "2100", name: "ภาษีซื้อ", type: "หนี้สิน" },
    { code: "3000", name: "ทุนเรือนหุ้น", type: "ส่วนของผู้ถือหุ้น" },
    { code: "4000", name: "รายได้จากการขาย", type: "รายได้" },
    { code: "5000", name: "ต้นทุนสินค้าขาย", type: "ค่าใช้จ่าย" },
    { code: "6000", name: "ค่าใช้จ่ายบริหาร", type: "ค่าใช้จ่าย" },
    { code: "7000", name: "ค่าใช้จ่ายขาย", type: "ค่าใช้จ่าย" },
  ];
  const ledger: any[] = [];
  for (let i = 1; i <= count; i++) {
    const account = pick(accounts);
    const daysAgo = rand(0, 90);
    const date = new Date(2026, 6, 11 - daysAgo);
    const debit = Math.random() > 0.5 ? rand(10, 500) * 1000 : 0;
    const credit = debit === 0 ? rand(10, 500) * 1000 : 0;
    ledger.push({
      id: `GL-${pad(i, 5)}`,
      date: date.toISOString().slice(0, 10),
      accountCode: account.code,
      accountName: account.name,
      accountType: account.type,
      description: pick(["บันทึกการขาย", "รับชำระเงิน", "จ่ายเจ้าหนี้", "ซื้อสินค้า", "จ่ายเงินเดือน", "ค่าใช้จ่ายส่วนกลาง", "ปรับปรุงสต๊อก", "ค่าโฆษณา"]),
      debit,
      credit,
      reference: `REF-${pad(rand(1000, 9999), 4)}`,
    });
  }
  return ledger.sort((a, b) => b.date.localeCompare(a.date));
}

// ─── Generate Realtime Event Templates ────────────────────────
export const realtimeEventTemplates = [
  { type: "order", title: (id: string, ch: string) => `ออเดอร์ใหม่จาก ${ch} #${id}`, category: "order" },
  { type: "payment", title: (id: string) => `ได้รับชำระ ${id}`, category: "success" },
  { type: "stock", title: (sku: string) => `สต๊อก ${sku} ใกล้หมด`, category: "warning" },
  { type: "ai", title: (text: string) => `AI แนะนำ: ${text}`, category: "ai" },
  { type: "shipping", title: (id: string) => `จัดส่ง #${id} สำเร็จ`, category: "success" },
  { type: "lead", title: (name: string) => `ลีดใหม่: ${name}`, category: "order" },
];

// ─── Generate Daily Chart Data (30 days) ──────────────────────
export function generateDailySalesData() {
  const data: any[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date(2026, 6, 11 - i);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseRevenue = isWeekend ? 80000 : 130000;
    const revenue = baseRevenue + rand(-20000, 40000);
    const orders = Math.floor(revenue / 380) + rand(-10, 20);
    data.push({
      date: date.toISOString().slice(5, 10),
      day: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"][dayOfWeek],
      revenue,
      orders,
      profit: Math.round(revenue * 0.35),
      customers: Math.floor(orders * 0.7) + rand(-5, 15),
    });
  }
  return data;
}

// ─── Generate Hourly Sales (today) ────────────────────────────
export function generateHourlySales() {
  const data: any[] = [];
  for (let h = 8; h <= 21; h++) {
    const isPeak = h >= 11 && h <= 14 || h >= 17 && h <= 20;
    const baseAmount = isPeak ? 12000 : 5000;
    data.push({
      hour: `${pad(h, 2)}:00`,
      amount: baseAmount + rand(-2000, 5000),
      orders: Math.floor((baseAmount + rand(-2000, 5000)) / 380),
    });
  }
  return data;
}
