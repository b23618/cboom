# สถิติในบทความบล็อกที่ยังไม่มีแหล่งอ้างอิง

รายการสำหรับให้ทีมคอนเทนต์ตรวจ ใส่แหล่ง (ชื่อ + ปี + ลิงก์) เปลี่ยนเป็นตัวอย่างที่ระบุว่าเป็นสมมติ หรือลบออก
ไม่ได้ตรวจกับแหล่งภายนอก: ค้นไม่พบที่มาของตัวเลขเหล่านี้ จึงถือว่าไม่มีแหล่งจนกว่าจะมีคนยืนยัน

ไฟล์อยู่ใน `src/content/blog/` เลขบรรทัดอ้างอิงตามสถานะปัจจุบัน

## ตัวเลขหัวข้อที่ไม่มีแหล่งอ้างอิง

| ไฟล์ | บรรทัด | ตัวเลข |
|------|--------|--------|
| ai-for-business.md | 96–101 | 72% / 54% / 48% / 3.5x / 67% ของ SME ไทยไม่ใช้ AI / 40% |
| crm-guide.md | 92–96 | 74% / 65% / 47% / 3x / 29% |
| erp-guide.md | 103–107 | 79% / 63% / 54% / 42% / 67% |
| inventory-management-guide.md | 111–115 | 43% / 35% / 28% / 25% / 67% |
| warehouse-management-system.md | 99–104 | 62% / 38% / 45% / 28% / 3x / 99.5% (เทียบ 85%) |
| marketplace-multi-channel-management.md | 76–79 | 73% / 45% / 38% / 61% (อ้าง "การสำรวจพฤติกรรมผู้บริโภคออนไลน์ในไทย" ไม่ระบุแหล่ง) |
| pos-guide.md | 114–118 | 78% / 65% / 52% / 43% / 37% |
| shopee-api-guide.md | 111–114 | 82% / 67% / 91% / 3.2x |
| tiktok-shop-api-guide.md | 122–126 | 300% ใน 2 ปี / 45% / 78% / 62% / 3.5x |
| business-automation-platform.md | 399 | สต๊อกแม่นยำ 99.5% |

## อ้างแหล่งแต่ยังไม่ได้ยืนยัน

- customer-management-system.md:81 และ customer-loyalty-system.md:75 — "HBR: ต้นทุนหาลูกค้าใหม่สูงกว่า 5–25 เท่า"
- customer-loyalty-system.md:79 — "Bain & Company: ลูกค้าซื้อซ้ำใช้จ่ายมากกว่า 67%"
- crm-increase-sales.md:65 — Salesforce 29% / 34% (แก้ถ้อยคำแล้ว แต่ยืนยันได้แค่จากเว็บอื่น ควรหารายงานต้นฉบับ)
- business-automation-platform.md:127 — "งานวิจัยพบว่าคีย์ข้อมูลมือผิดพลาด 1–4%" ไม่ระบุงานวิจัย
- crm-guide.md:276 — แก้เป็น MIT 21 เท่าแล้ว ควรใส่ชื่อผู้วิจัยและปี
- lead-management-system.md:252 — "80% ของการขายต้องติดตาม 5 ครั้งขึ้นไป" ไม่ระบุแหล่ง
- marketplace-crm.md:261, marketplace-integration.md:562 — "กำไรเพิ่ม 20%" / "ยอดขายหน้าร้านเพิ่ม 20%" (ตรวจว่าเป็นตัวอย่างสมมติหรือผลจริง)

## ข้อมูลเทคนิคที่ยืนยันไม่ได้

- shopee-api-guide.md:41, 166, 843 — Rate limit "2,000 requests/ชม. ต่อร้านค้า"
- tiktok-shop-api-guide.md:43, 91, 179 — Rate limit "1,000–10,000 req/ชม. ตาม Plan"
- tiktok-shop-api-guide.md — endpoint และการสร้าง Signature ในโค้ดตัวอย่างเป็นแบบย่อ (เพิ่มหมายเหตุเตือนแล้ว) ควรเทียบกับเอกสาร Partner Center
- crm-comparison-thailand.md:118–125 — ตารางเทียบ Salesforce / HubSpot / Zoho (ภาษาไทย ราคา LINE OA Shopee TikTok VAT)

## คำอ้างเรื่อง CBoom ที่ต้องให้ทีมผลิตภัณฑ์ยืนยัน

- e-tax-invoice-software.md:276,311 / payroll-system-sme.md:269,304 / accounting-system-sme.md:321,356 — ฟีเจอร์ e-Tax, เงินเดือน+ประกันสังคม+ภาษี, ภ.ง.ด. เทียบกับ `src/pages/accounting.astro` และ `src/pages/hr.astro` ที่ยังไม่แสดงฟีเจอร์เหล่านี้
- ประโยค "AES-256 / Data Center ไทย / PDPA / ISO 27001" ใน business-automation-platform, ai-for-business, crm-guide, crm-vs-erp, erp-guide, marketplace-multi-channel-management, warehouse-management-system
