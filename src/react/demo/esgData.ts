// ─── ESG / Carbon Management Data ─────────────────────────────
// Realistic Thai business ESG datasets

export const formatTHB = (n: number) => "฿" + n.toLocaleString("en-US");
export const formatCO2 = (n: number) => `${n.toLocaleString("en-US", { maximumFractionDigits: 1 })} tCO₂e`;

// ─── Company Info ─────────────────────────────────────────────
export const esgCompany = {
  name: "บริษัท ซีบูม แมนูแฟคเจอริ่ง จำกัด",
  industry: "การผลิตและโลจิสติกส์",
  employees: 320,
  branches: 5,
  revenue: 850000000,
  fiscalYear: "2026",
  reportingPeriod: "ม.ค. - ธ.ค. 2026",
};

// ─── Branches ─────────────────────────────────────────────────
export const esgBranches = [
  { id: "BKK", name: "สำนักงานใหญ่ กรุงเทพ", type: "สำนักงาน", area: 2500, employees: 85, electricity: 45000, fuel: 1200, water: 1800, waste: 120, co2: 285.6 },
  { id: "BKK-F", name: "โรงงานนครปฐม", type: "โรงงาน", area: 15000, employees: 145, electricity: 280000, fuel: 8500, water: 12500, waste: 450, co2: 1842.3 },
  { id: "CNX", name: "คลังเชียงใหม่", type: "คลังสินค้า", area: 8000, employees: 42, electricity: 95000, fuel: 3200, water: 4200, waste: 85, co2: 612.8 },
  { id: "SKA", name: "ศูนย์กระจายสงขลา", type: "คลังสินค้า", area: 6500, employees: 38, electricity: 78000, fuel: 4100, water: 3100, waste: 65, co2: 528.4 },
  { id: "KKN", name: "โรงงานขอนแก่น", type: "โรงงาน", area: 12000, employees: 110, electricity: 195000, fuel: 6200, water: 8800, waste: 280, co2: 1245.7 },
];

// ─── Carbon KPIs ──────────────────────────────────────────────
export const carbonKPIs = {
  totalEmission: 4514.8, // tCO2e
  currentMonth: 386.2,
  currentYear: 2745.5,
  scope1: 1685.2, // Direct emissions (fuel, fleet, gas)
  scope2: 1820.4, // Indirect (electricity)
  scope3: 1009.2, // Other indirect (suppliers, travel, shipping)
  carbonIntensity: 5.31, // tCO2e per million THB
  energyConsumption: 697500, // kWh
  waterConsumption: 30400, // m³
  wasteTotal: 1000, // kg
  renewableEnergy: 18.5, // %
  netZeroProgress: 24, // %
  reductionTarget: 30, // % by 2030
  baselineYear: 2024,
  baselineEmission: 5842.0,
};

// ─── Monthly Carbon Data ──────────────────────────────────────
export const monthlyCarbonData = [
  { month: "ม.ค.", scope1: 142.5, scope2: 158.3, scope3: 82.1, total: 382.9 },
  { month: "ก.พ.", scope1: 138.2, scope2: 152.7, scope3: 78.5, total: 369.4 },
  { month: "มี.ค.", scope1: 145.8, scope2: 165.4, scope3: 85.3, total: 396.5 },
  { month: "เม.ย.", scope1: 152.1, scope2: 178.9, scope3: 88.7, total: 419.7 },
  { month: "พ.ค.", scope1: 148.6, scope2: 172.3, scope3: 84.2, total: 405.1 },
  { month: "มิ.ย.", scope1: 143.2, scope2: 168.5, scope3: 81.6, total: 393.3 },
  { month: "ก.ค.", scope1: 139.8, scope2: 162.7, scope3: 79.8, total: 382.3 },
  { month: "ส.ค.", scope1: 141.5, scope2: 164.1, scope3: 80.5, total: 386.1 },
  { month: "ก.ย.", scope1: 145.2, scope2: 169.8, scope3: 83.2, total: 398.2 },
  { month: "ต.ค.", scope1: 148.7, scope2: 174.5, scope3: 85.9, total: 409.1 },
  { month: "พ.ย.", scope1: 143.8, scope2: 167.2, scope3: 82.4, total: 393.4 },
  { month: "ธ.ค.", scope1: 135.8, scope2: 156.0, scope3: 77.0, total: 368.8 },
];

// ─── Yearly Carbon ────────────────────────────────────────────
export const yearlyCarbonData = [
  { year: "2022", scope1: 1920.5, scope2: 2150.8, scope3: 1180.3, total: 5251.6 },
  { year: "2023", scope1: 1820.4, scope2: 2010.5, scope3: 1120.7, total: 4951.6 },
  { year: "2024", scope1: 1750.2, scope2: 1950.3, scope3: 1090.5, total: 4791.0 },
  { year: "2025", scope1: 1690.8, scope2: 1880.6, scope3: 1045.2, total: 4616.6 },
  { year: "2026", scope1: 1685.2, scope2: 1820.4, scope3: 1009.2, total: 4514.8 },
];

// ─── Scope Breakdown ──────────────────────────────────────────
export const scopeBreakdown = [
  { name: "Scope 1 - การเผาไหม้", value: 985.4, color: "#ef4444" },
  { name: "Scope 1 - ยานพาหนะ", value: 412.6, color: "#f97316" },
  { name: "Scope 1 - แก๊สเคมี", value: 287.2, color: "#eab308" },
  { name: "Scope 2 - ไฟฟ้า", value: 1820.4, color: "#3b82f6" },
  { name: "Scope 3 - ซัพพลายเออร์", value: 485.3, color: "#8b5cf6" },
  { name: "Scope 3 - การเดินทาง", value: 215.8, color: "#a855f7" },
  { name: "Scope 3 - ขนส่งสินค้า", value: 308.1, color: "#ec4899" },
];

// ─── Energy Trend ─────────────────────────────────────────────
export const energyTrendData = [
  { month: "ม.ค.", electricity: 58000, renewable: 8500, cost: 290000 },
  { month: "ก.พ.", electricity: 55200, renewable: 8200, cost: 276000 },
  { month: "มี.ค.", electricity: 61200, renewable: 9100, cost: 306000 },
  { month: "เม.ย.", electricity: 64800, renewable: 9800, cost: 324000 },
  { month: "พ.ค.", electricity: 62500, renewable: 9500, cost: 312500 },
  { month: "มิ.ย.", electricity: 60800, renewable: 9200, cost: 304000 },
  { month: "ก.ค.", electricity: 59200, renewable: 8900, cost: 296000 },
  { month: "ส.ค.", electricity: 60100, renewable: 9100, cost: 300500 },
  { month: "ก.ย.", electricity: 61800, renewable: 9400, cost: 309000 },
  { month: "ต.ค.", electricity: 63500, renewable: 9700, cost: 317500 },
  { month: "พ.ย.", electricity: 61200, renewable: 9300, cost: 306000 },
  { month: "ธ.ค.", electricity: 57300, renewable: 8600, cost: 286500 },
];

// ─── Electricity Records ──────────────────────────────────────
export const electricityRecords = [
  { id: "EL-001", branch: "โรงงานนครปฐม", month: "กรกฎาคม 2026", meterStart: 885200, meterEnd: 912400, usage: 27200, unit: "kWh", rate: 4.8218, cost: 131153, co2: 15.14, status: "บันทึกแล้ว" },
  { id: "EL-002", branch: "โรงงานขอนแก่น", month: "กรกฎาคม 2026", meterStart: 620100, meterEnd: 643800, usage: 23700, unit: "kWh", rate: 4.8218, cost: 114277, co2: 13.19, status: "บันทึกแล้ว" },
  { id: "EL-003", branch: "สำนักงานใหญ่ กรุงเทพ", month: "กรกฎาคม 2026", meterStart: 145200, meterEnd: 157800, usage: 12600, unit: "kWh", rate: 4.8218, cost: 60755, co2: 7.01, status: "บันทึกแล้ว" },
  { id: "EL-004", branch: "คลังเชียงใหม่", month: "กรกฎาคม 2026", meterStart: 320400, meterEnd: 338900, usage: 18500, unit: "kWh", rate: 4.8218, cost: 89203, co2: 10.29, status: "บันทึกแล้ว" },
  { id: "EL-005", branch: "ศูนย์กระจายสงขลา", month: "กรกฎาคม 2026", meterStart: 278500, meterEnd: 294200, usage: 15700, unit: "kWh", rate: 4.8218, cost: 75702, co2: 8.73, status: "บันทึกแล้ว" },
  { id: "EL-006", branch: "โรงงานนครปฐม", month: "มิถุนายน 2026", meterStart: 858600, meterEnd: 885200, usage: 26600, unit: "kWh", rate: 4.7955, cost: 127560, co2: 14.80, status: "บันทึกแล้ว" },
  { id: "EL-007", branch: "โรงงานขอนแก่น", month: "มิถุนายน 2026", meterStart: 597200, meterEnd: 620100, usage: 22900, unit: "kWh", rate: 4.7955, cost: 109817, co2: 12.74, status: "บันทึกแล้ว" },
  { id: "EL-008", branch: "สำนักงานใหญ่ กรุงเทพ", month: "มิถุนายน 2026", meterStart: 133100, meterEnd: 145200, usage: 12100, unit: "kWh", rate: 4.7955, cost: 58026, co2: 6.73, status: "บันทึกแล้ว" },
  { id: "EL-009", branch: "คลังเชียงใหม่", month: "มิถุนายน 2026", meterStart: 302800, meterEnd: 320400, usage: 17600, unit: "kWh", rate: 4.7955, cost: 84401, co2: 9.79, status: "บันทึกแล้ว" },
  { id: "EL-010", branch: "ศูนย์กระจายสงขลา", month: "มิถุนายน 2026", meterStart: 263400, meterEnd: 278500, usage: 15100, unit: "kWh", rate: 4.7955, cost: 72412, co2: 8.40, status: "บันทึกแล้ว" },
];

// ─── Fuel Records ─────────────────────────────────────────────
export const fuelTypes = [
  { type: "ดีเซล", unit: "ลิตร", factor: 2.68, pricePerUnit: 32.50, totalUsage: 18500, co2: 49.58, cost: 601250 },
  { type: "เบนซิน 95", unit: "ลิตร", factor: 2.31, pricePerUnit: 37.20, totalUsage: 8200, co2: 18.94, cost: 305040 },
  { type: "LPG", unit: "กก.", factor: 3.02, pricePerUnit: 18.50, totalUsage: 4200, co2: 12.68, cost: 77700 },
  { type: "ก๊าซธรรมชาติ", unit: "m³", factor: 2.02, pricePerUnit: 15.80, totalUsage: 6800, co2: 13.74, cost: 107440 },
  { type: "น้ำมันเตา", unit: "ลิตร", factor: 3.17, pricePerUnit: 22.00, totalUsage: 3200, co2: 10.14, cost: 70400 },
];

export const fuelRecords = [
  { id: "FL-001", branch: "โรงงานนครปฐม", fuelType: "ดีเซล", usage: 8500, unit: "ลิตร", co2: 22.78, cost: 276250, date: "2026-07-15", status: "บันทึกแล้ว" },
  { id: "FL-002", branch: "โรงงานขอนแก่น", fuelType: "ดีเซล", usage: 6200, unit: "ลิตร", co2: 16.62, cost: 201500, date: "2026-07-15", status: "บันทึกแล้ว" },
  { id: "FL-003", branch: "โรงงานนครปฐม", fuelType: "LPG", usage: 2800, unit: "กก.", co2: 8.46, cost: 51800, date: "2026-07-12", status: "บันทึกแล้ว" },
  { id: "FL-004", branch: "สำนักงานใหญ่ กรุงเทพ", fuelType: "เบนซิน 95", usage: 1200, unit: "ลิตร", co2: 2.77, cost: 44640, date: "2026-07-10", status: "บันทึกแล้ว" },
  { id: "FL-005", branch: "คลังเชียงใหม่", fuelType: "ดีเซล", usage: 3200, unit: "ลิตร", co2: 8.58, cost: 104000, date: "2026-07-14", status: "บันทึกแล้ว" },
  { id: "FL-006", branch: "ศูนย์กระจายสงขลา", fuelType: "ดีเซล", usage: 4100, unit: "ลิตร", co2: 10.99, cost: 133250, date: "2026-07-13", status: "บันทึกแล้ว" },
  { id: "FL-007", branch: "โรงงานนครปฐม", fuelType: "ก๊าซธรรมชาติ", usage: 6800, unit: "m³", co2: 13.74, cost: 107440, date: "2026-07-08", status: "บันทึกแล้ว" },
  { id: "FL-008", branch: "โรงงานขอนแก่น", fuelType: "น้ำมันเตา", usage: 3200, unit: "ลิตร", co2: 10.14, cost: 70400, date: "2026-07-05", status: "บันทึกแล้ว" },
];

// ─── Fleet ────────────────────────────────────────────────────
export const fleetVehicles = [
  { id: "V-001", plate: "กข-1234 กรุงเทพ", type: "รถบรรทุก 10 ล้อ", brand: "Isuzu FRR334", fuel: "ดีเซล", mileage: 45200, fuelUsage: 3200, co2: 8.58, lastService: "2026-06-15", status: "ใช้งาน" },
  { id: "V-002", plate: "กข-5678 กรุงเทพ", type: "รถบรรทุก 10 ล้อ", brand: "Hino 500", fuel: "ดีเซล", mileage: 38500, fuelUsage: 2800, co2: 7.50, lastService: "2026-06-20", status: "ใช้งาน" },
  { id: "V-003", plate: "ขค-9012 นครปฐม", type: "รถบรรทุก 6 ล้อ", brand: "Mitsubishi Fuso", fuel: "ดีเซล", mileage: 28800, fuelUsage: 1900, co2: 5.09, lastService: "2026-05-28", status: "ใช้งาน" },
  { id: "V-004", plate: "ขค-3456 นครปฐม", type: "รถยนต์ EV", brand: "BYD T3", fuel: "ไฟฟ้า", mileage: 18500, fuelUsage: 0, co2: 0, lastService: "2026-06-10", status: "ใช้งาน" },
  { id: "V-005", plate: "ชน-7890 เชียงใหม่", type: "รถตู้ขนาดเล็ก", brand: "Toyota Hilux", fuel: "ดีเซล", mileage: 32100, fuelUsage: 2100, co2: 5.63, lastService: "2026-06-05", status: "ใช้งาน" },
  { id: "V-006", plate: "ชน-2345 เชียงใหม่", type: "รถยนต์ EV", brand: "BYD Atto 3", fuel: "ไฟฟ้า", mileage: 12800, fuelUsage: 0, co2: 0, lastService: "2026-06-25", status: "ใช้งาน" },
  { id: "V-007", plate: "สก-6789 สงขลา", type: "รถบรรทุก 10 ล้อ", brand: "Isuzu FVR340", fuel: "ดีเซล", mileage: 51000, fuelUsage: 3600, co2: 9.65, lastService: "2026-05-15", status: "ซ่อมบำรุง" },
  { id: "V-008", plate: "ขด-0123 ขอนแก่น", type: "รถบรรทุก 6 ล้อ", brand: "Nissan Diesel", fuel: "ดีเซล", mileage: 41500, fuelUsage: 2500, co2: 6.70, lastService: "2026-06-18", status: "ใช้งาน" },
  { id: "V-009", plate: "กข-4567 กรุงเทพ", type: "รถยนต์ EV", brand: "Tesla Model 3", fuel: "ไฟฟ้า", mileage: 8200, fuelUsage: 0, co2: 0, lastService: "2026-06-30", status: "ใช้งาน" },
  { id: "V-010", plate: "ขค-8901 นครปฐม", type: "Forklift", brand: "Toyota 8FBE15", fuel: "ไฟฟ้า", mileage: 0, fuelUsage: 0, co2: 0, lastService: "2026-06-12", status: "ใช้งาน" },
];

// ─── Water ────────────────────────────────────────────────────
export const waterRecords = [
  { id: "WT-001", branch: "โรงงานนครปฐม", month: "กรกฎาคม 2026", usage: 5200, unit: "m³", cost: 156000, co2: 1.35, status: "บันทึกแล้ว" },
  { id: "WT-002", branch: "โรงงานขอนแก่น", month: "กรกฎาคม 2026", usage: 3800, unit: "m³", cost: 114000, co2: 0.99, status: "บันทึกแล้ว" },
  { id: "WT-003", branch: "สำนักงานใหญ่ กรุงเทพ", month: "กรกฎาคม 2026", usage: 850, unit: "m³", cost: 25500, co2: 0.22, status: "บันทึกแล้ว" },
  { id: "WT-004", branch: "คลังเชียงใหม่", month: "กรกฎาคม 2026", usage: 1800, unit: "m³", cost: 54000, co2: 0.47, status: "บันทึกแล้ว" },
  { id: "WT-005", branch: "ศูนย์กระจายสงขลา", month: "กรกฎาคม 2026", usage: 1350, unit: "m³", cost: 40500, co2: 0.35, status: "บันทึกแล้ว" },
];

export const waterTrendData = [
  { month: "ม.ค.", usage: 28500, cost: 855000 },
  { month: "ก.พ.", usage: 26800, cost: 804000 },
  { month: "มี.ค.", usage: 29200, cost: 876000 },
  { month: "เม.ย.", usage: 31500, cost: 945000 },
  { month: "พ.ค.", usage: 30200, cost: 906000 },
  { month: "มิ.ย.", usage: 28800, cost: 864000 },
  { month: "ก.ค.", usage: 13000, cost: 390000 },
];

// ─── Waste ────────────────────────────────────────────────────
export const wasteTypes = [
  { type: "ขยะทั่วไป", amount: 420, unit: "kg", co2: 0.84, disposal: "ฝังกลบ", cost: 12600 },
  { type: "ขยะอันตราย", amount: 85, unit: "kg", co2: 0.26, disposal: "กำจัดพิเศษ", cost: 25500 },
  { type: "พลาสติก", amount: 180, unit: "kg", co2: 0.36, disposal: "รีไซเคิล", cost: 3600 },
  { type: "กระดาษ", amount: 220, unit: "kg", co2: 0.22, disposal: "รีไซเคิล", cost: 2200 },
  { type: "โลหะ", amount: 95, unit: "kg", co2: 0.10, disposal: "รีไซเคิล", cost: 1900 },
  { type: "อินทรีย์", amount: 150, unit: "kg", co2: 0.30, disposal: "ทำปุ๋ย", cost: 1500 },
];

export const wasteTrendData = [
  { month: "ม.ค.", general: 38, hazardous: 8, recyclable: 42, total: 88 },
  { month: "ก.พ.", general: 35, hazardous: 7, recyclable: 38, total: 80 },
  { month: "มี.ค.", general: 42, hazardous: 9, recyclable: 45, total: 96 },
  { month: "เม.ย.", general: 45, hazardous: 10, recyclable: 48, total: 103 },
  { month: "พ.ค.", general: 40, hazardous: 8, recyclable: 41, total: 89 },
  { month: "มิ.ย.", general: 38, hazardous: 7, recyclable: 39, total: 84 },
  { month: "ก.ค.", general: 42, hazardous: 8, recyclable: 43, total: 93 },
];

// ─── Business Travel ──────────────────────────────────────────
export const travelRecords = [
  { id: "TR-001", employee: "คุณสมชัย ใจดี", purpose: "ประชุมลูกค้า จ.เชียงใหม่", mode: "รถยนต์", distance: 720, unit: "กม.", co2: 0.12, cost: 3500, date: "2026-07-08", status: "อนุมัติ" },
  { id: "TR-002", employee: "คุณปนัดดา ศรีสุข", purpose: "ประชุมสาขา จ.ขอนแก่น", mode: "เครื่องบิน", distance: 850, unit: "กม.", co2: 0.18, cost: 8500, date: "2026-07-10", status: "อนุมัติ" },
  { id: "TR-003", employee: "คุณวิทยา พานิช", purpose: "ตรวจสอบโรงงาน นครปฐม", mode: "รถยนต์", distance: 55, unit: "กม.", co2: 0.01, cost: 500, date: "2026-07-12", status: "อนุมัติ" },
  { id: "TR-004", employee: "คุณมาลี ขายดี", purpose: "งานแสดงสินค้า กรุงเทพ", mode: "BTS", distance: 28, unit: "กม.", co2: 0.003, cost: 120, date: "2026-07-14", status: "อนุมัติ" },
  { id: "TR-005", employee: "คุณกิตติ พอเพียง", purpose: "ประชุมซัพพลายเออร์ จ.สงขลา", mode: "เครื่องบิน", distance: 950, unit: "กม.", co2: 0.20, cost: 9200, date: "2026-07-16", status: "รออนุมัติ" },
  { id: "TR-006", employee: "คุณอนุชา ออนไลน์", purpose: "ฝึกอบรม กรุงเทพ", mode: "รถยนต์", distance: 45, unit: "กม.", co2: 0.01, cost: 400, date: "2026-07-18", status: "อนุมัติ" },
];

// ─── Suppliers ESG ────────────────────────────────────────────
export const supplierESG = [
  { id: "SUP-001", name: "บจก. สยาม พลาสติก", category: "วัตถุดิบ", esgScore: 72, carbonFootprint: 85.2, status: "ประเมินแล้ว", lastAudit: "2026-05-10" },
  { id: "SUP-002", name: "บมจ. เชียงใหม่ ซัพพลาย", category: "บรรจุภัณฑ์", esgScore: 68, carbonFootprint: 62.5, status: "ประเมินแล้ว", lastAudit: "2026-04-22" },
  { id: "SUP-003", name: "ห้างหุ้นส่วน ไทยโลจิสติกส์", category: "ขนส่ง", esgScore: 55, carbonFootprint: 142.8, status: "ประเมินแล้ว", lastAudit: "2026-06-05" },
  { id: "SUP-004", name: "บจก. กรุงเทพ เคมีภัณฑ์", category: "เคมีภัณฑ์", esgScore: 48, carbonFootprint: 108.3, status: "รอประเมิน", lastAudit: "—" },
  { id: "SUP-005", name: "บมจ. อีสาน แพ็คเกจิ้ง", category: "บรรจุภัณฑ์", esgScore: 81, carbonFootprint: 45.6, status: "ประเมินแล้ว", lastAudit: "2026-05-28" },
  { id: "SUP-006", name: "ห้างหุ้นส่วน ใต้ ทรานสปอร์ต", category: "ขนส่ง", esgScore: 62, carbonFootprint: 98.4, status: "ประเมินแล้ว", lastAudit: "2026-06-12" },
  { id: "SUP-007", name: "บจก. นวัตกรรม ยังไงร์", category: "วัตถุดิบ", esgScore: 89, carbonFootprint: 28.9, status: "ประเมินแล้ว", lastAudit: "2026-07-01" },
  { id: "SUP-008", name: "บมจ. กรีน เอนเนอร์ยี่", category: "พลังงาน", esgScore: 95, carbonFootprint: 12.2, status: "ประเมินแล้ว", lastAudit: "2026-07-03" },
];

// ─── Carbon by Department ──────────────────────────────────────
export const carbonByDepartment = [
  { dept: "การผลิต", co2: 1842.3, pct: 40.8 },
  { dept: "คลังสินค้า", co2: 1141.2, pct: 25.3 },
  { dept: "โลจิสติกส์", co2: 685.4, pct: 15.2 },
  { dept: "สำนักงาน", co2: 425.8, pct: 9.4 },
  { dept: "ฝ่ายขาย", co2: 248.6, pct: 5.5 },
  { dept: "ฝ่ายบุคคล", co2: 171.5, pct: 3.8 },
];

// ─── Carbon by Branch ─────────────────────────────────────────
export const carbonByBranch = [
  { branch: "โรงงานนครปฐม", co2: 1842.3, pct: 40.8 },
  { branch: "โรงงานขอนแก่น", co2: 1245.7, pct: 27.6 },
  { branch: "คลังเชียงใหม่", co2: 612.8, pct: 13.6 },
  { branch: "ศูนย์กระจายสงขลา", co2: 528.4, pct: 11.7 },
  { branch: "สำนักงานใหญ่ กรุงเทพ", co2: 285.6, pct: 6.3 },
];

// ─── Reduction Projects ───────────────────────────────────────
export const reductionProjects = [
  { id: "RP-001", name: "ติดตั้ง Solar Panel ที่โรงงานนครปฐม", category: "พลังงานหมุนเวียน", targetReduction: 320, currentReduction: 185, progress: 58, budget: 4500000, spent: 2800000, status: "กำลังดำเนิน", startDate: "2026-01-15", endDate: "2026-12-31" },
  { id: "RP-002", name: "เปลี่ยนหลอดไฟเป็น LED ทุกสาขา", category: "ประหยัดพลังงาน", targetReduction: 85, currentReduction: 85, progress: 100, budget: 850000, spent: 820000, status: "เสร็จสิ้น", startDate: "2025-10-01", endDate: "2026-03-31" },
  { id: "RP-003", name: "เปลี่ยนรถบรรทุกเป็น EV 3 คัน", category: "ยานพาหนะ", targetReduction: 42, currentReduction: 28, progress: 67, budget: 6800000, spent: 4500000, status: "กำลังดำเนิน", startDate: "2026-02-01", endDate: "2026-09-30" },
  { id: "RP-004", name: "ระบบรีไซเคิลน้ำเสีย", category: "การจัดการน้ำ", targetReduction: 15, currentReduction: 0, progress: 0, budget: 2200000, spent: 0, status: "วางแผน", startDate: "2026-08-01", endDate: "2027-03-31" },
  { id: "RP-005", name: "ระบบบริหารพลังงาน ISO 50001", category: "การจัดการพลังงาน", targetReduction: 120, currentReduction: 45, progress: 38, budget: 1200000, spent: 480000, status: "กำลังดำเนิน", startDate: "2026-03-01", endDate: "2026-12-31" },
  { id: "RP-006", name: "ปลูกต้นไม้ 10,000 ต้น", category: "การดูดซับคาร์บอน", targetReduction: 50, currentReduction: 22, progress: 44, budget: 500000, spent: 220000, status: "กำลังดำเนิน", startDate: "2026-04-01", endDate: "2027-04-30" },
];

// ─── ESG Documents ────────────────────────────────────────────
export const esgDocuments = [
  { id: "DOC-001", name: "ใบเสร็จค่าไฟฟ้า กรกฎาคม 2026.pdf", type: "ใบเสร็จค่าไฟฟ้า", branch: "โรงงานนครปฐม", size: "2.4 MB", uploadedBy: "คุณสมชัย", date: "2026-07-10", status: "ตรวจสอบแล้ว" },
  { id: "DOC-002", name: "ใบเสร็จเชื้อเพลิง กรกฎาคม 2026.pdf", type: "ใบเสร็จเชื้อเพลิง", branch: "โรงงานนครปฐม", size: "1.8 MB", uploadedBy: "คุณวิทยา", date: "2026-07-15", status: "ตรวจสอบแล้ว" },
  { id: "DOC-003", name: "ใบรับรอง ISO 14064-1.pdf", type: "ใบรับรอง", branch: "สำนักงานใหญ่", size: "850 KB", uploadedBy: "คุณกิตติ", date: "2026-06-20", status: "ตรวจสอบแล้ว" },
  { id: "DOC-004", name: "นโยบาย ESG 2026.pdf", type: "นโยบาย ESG", branch: "สำนักงานใหญ่", size: "1.2 MB", uploadedBy: "คุณปนัดดา", date: "2026-01-05", status: "ตรวจสอบแล้ว" },
  { id: "DOC-005", name: "รายงานการตรวจวัดมิเตอร์ Q2.pdf", type: "รายงานการตรวจวัด", branch: "ทุกสาขา", size: "3.5 MB", uploadedBy: "คุณมาลี", date: "2026-07-01", status: "รอตรวจสอบ" },
  { id: "DOC-006", name: "ใบรับรอง ISO 50001.pdf", type: "ใบรับรอง", branch: "โรงงานนครปฐม", size: "720 KB", uploadedBy: "คุณกิตติ", date: "2026-05-15", status: "ตรวจสอบแล้ว" },
  { id: "DOC-007", name: "เอกสารการตรวจสอบซัพพลายเออร์.pdf", type: "การตรวจสอบ", branch: "สำนักงานใหญ่", size: "2.1 MB", uploadedBy: "คุณอนุชา", date: "2026-06-28", status: "ตรวจสอบแล้ว" },
  { id: "DOC-008", name: "รายงานขยะและการกำจัด.pdf", type: "รายงานขยะ", branch: "โรงงานขอนแก่น", size: "1.5 MB", uploadedBy: "คุณสมชัย", date: "2026-07-05", status: "รอตรวจสอบ" },
];

// ─── ESG Targets ──────────────────────────────────────────────
export const esgTargets = [
  { id: "T-001", scope: "Scope 1", target: 30, baseline: 1920.5, current: 1685.2, unit: "tCO₂e", year: 2030, progress: 12.2 },
  { id: "T-002", scope: "Scope 2", target: 35, baseline: 2150.8, current: 1820.4, unit: "tCO₂e", year: 2030, progress: 15.4 },
  { id: "T-003", scope: "Scope 3", target: 25, baseline: 1180.3, current: 1009.2, unit: "tCO₂e", year: 2030, progress: 14.5 },
  { id: "T-004", scope: "พลังงานหมุนเวียน", target: 40, baseline: 5, current: 18.5, unit: "%", year: 2030, progress: 38.9 },
  { id: "T-005", scope: "Net Zero", target: 100, baseline: 5251.6, current: 4514.8, unit: "tCO₂e", year: 2050, progress: 14.0 },
];

// ─── ESG Notifications ────────────────────────────────────────
export const esgNotifications = [
  { id: 1, title: "การปล่อยก๊าซเรือนกระจกเดือนนี้ลดลง 5.2%", type: "success", time: "2 ชม.ที่แล้ว" },
  { id: 2, title: "โรงงานนครปฐม ใช้ไฟฟ้าเกินเป้าหมาย 8%", type: "warning", time: "5 ชม.ที่แล้ว" },
  { id: 3, title: "Solar Panel ลดการปล่อย CO₂ ได้ 185 tCO₂e", type: "success", time: "1 วันที่แล้ว" },
  { id: 4, title: "ซัพพลายเออร์ใหม่รอประเมิน ESG Score", type: "warning", time: "2 วันที่แล้ว" },
  { id: 5, title: "รายงาน ESG ไตรมาส 2 พร้อมส่ง", type: "report", time: "3 วันที่แล้ว" },
];

// ─── AI ESG Insights ──────────────────────────────────────────
export const esgAIInsights = [
  { title: "แนวโน้มการลดการปล่อย", value: "-14%", desc: "ลดลงจากปี 2024 และกำลังจะบรรลุเป้าหมาย 2030" },
  { title: "สาขาที่ปล่อย CO₂ สูงสุด", value: "นครปฐม", desc: "คิดเป็น 40.8% ของการปล่อยทั้งหมด ควรติดตั้ง Solar เพิ่ม" },
  { title: "พลังงานหมุนเวียน", value: "18.5%", desc: "เพิ่มขึ้น 13.5% จากปีที่แล้ว เป้าหมาย 40% ภายในปี 2030" },
  { title: "โอกาสประหยัดพลังงาน", value: "฿1.2M/ปี", desc: "เปลี่ยนมอเตอร์เก่าเป็น Inverter ที่โรงงานขอนแก่น" },
];

// ─── Emission Factors ─────────────────────────────────────────
export const emissionFactors = [
  { source: "ไฟฟ้า (PEA/MEA)", factor: 0.557, unit: "kgCO₂/kWh", scope: "Scope 2" },
  { source: "ดีเซล", factor: 2.68, unit: "kgCO₂/ลิตร", scope: "Scope 1" },
  { source: "เบนซิน 95", factor: 2.31, unit: "kgCO₂/ลิตร", scope: "Scope 1" },
  { source: "LPG", factor: 3.02, unit: "kgCO₂/กก.", scope: "Scope 1" },
  { source: "ก๊าซธรรมชาติ", factor: 2.02, unit: "kgCO₂/m³", scope: "Scope 1" },
  { source: "น้ำมันเตา", factor: 3.17, unit: "kgCO₂/ลิตร", scope: "Scope 1" },
  { source: "น้ำประปา", factor: 0.26, unit: "kgCO₂/m³", scope: "Scope 3" },
  { source: "การเดินทางรถยนต์", factor: 0.171, unit: "kgCO₂/กม.", scope: "Scope 3" },
  { source: "การเดินทางเครื่องบิน", factor: 0.255, unit: "kgCO₂/กม.", scope: "Scope 3" },
  { source: "ขยะฝังกลบ", factor: 2.0, unit: "kgCO₂/กก.", scope: "Scope 3" },
  { source: "พลาสติก", factor: 2.0, unit: "kgCO₂/กก.", scope: "Scope 3" },
  { source: "กระดาษ", factor: 1.0, unit: "kgCO₂/กก.", scope: "Scope 3" },
];
