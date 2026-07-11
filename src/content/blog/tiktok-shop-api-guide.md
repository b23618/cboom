---
title: "TikTok Shop API คืออะไร? วิธีเชื่อมต่อกับระบบ ERP และ CRM 2026"
description: "TikTok Shop API คืออะไร วิธีเชื่อมต่อ OAuth Orders Products Shipping Webhook Automation พร้อมตัวอย่างโค้ด Common Errors และ Best Practices สำหรับนักพัฒนาและธุรกิจไทย"
publishDate: 2025-09-05
author: "CBoom Team"
image: "/og/tiktok-shop-api-guide.png"
category: "Developer"
tags:
  - TikTok Shop API
  - TikTok Shop Open API
  - API Integration
  - OAuth
  - Webhook
  - Orders API
  - Products API
  - Shipping API
  - Automation
  - ERP Integration
draft: false
keywords: "TikTok Shop API, TikTok Shop Open API, TikTok Shop API Authentication, TikTok Shop OAuth, TikTok Shop Orders API, TikTok Shop Products API, TikTok Shop Shipping API, TikTok Shop Webhook, TikTok Shop API Integration, TikTok Shop API นักพัฒนา"
focusKeyword: "TikTok Shop API"
secondaryKeywords:
  - "TikTok Shop Open API"
  - "TikTok Shop API Authentication"
  - "TikTok Shop OAuth"
  - "TikTok Shop Orders API"
  - "TikTok Shop Products API"
  - "TikTok Shop Shipping API"
  - "TikTok Shop Webhook"
  - "TikTok Shop API Integration"
  - "TikTok Shop API ERP CRM"
ogTitle: "TikTok Shop API คืออะไร? วิธีเชื่อมต่อกับระบบ ERP และ CRM 2026"
ogDescription: "เรียนรู้ทุกอย่างเกี่ยวกับ TikTok Shop API OAuth Orders Products Shipping Webhook Automation พร้อมตัวอย่างโค้ดและ Best Practices"
canonical: "https://cboom.in.th/blog/tiktok-shop-api-guide/"
---

# TikTok Shop API คืออะไร? วิธีเชื่อมต่อกับระบบ ERP และ CRM

> **สารบัญ**
>
> - [TikTok Shop API คืออะไร](#tiktok-shop-api-คืออะไร)
> - [ทำไมต้องใช้ TikTok Shop API](#ทำไมต้องใช้-tiktok-shop-api)
> - [สถาปัตยกรรม TikTok Shop Open API](#สถาปัตยกรรม-tiktok-shop-open-api)
> - [OAuth 2.0 การให้สิทธิ์เข้าถึง](#oauth-20-การให้สิทธิ์เข้าถึง)
> - [Orders API จัดการออเดอร์](#orders-api-จัดการออเดอร์)
> - [Products API จัดการสินค้า](#products-api-จัดการสินค้า)
> - [Shipping API จัดการขนส่ง](#shipping-api-จัดการขนส่ง)
> - [Webhook รับ Event แบบ Real-time](#webhook-รับ-event-แบบ-real-time)
> - [Automation ทำงานอัตโนมัติ](#automation-ทำงานอัตโนมัติ)
> - [Integration เชื่อม TikTok Shop เข้ากับ ERP และ CRM](#integration-เชื่อม-tiktok-shop-เข้ากับ-erp-และ-crm)
> - [Common Errors ข้อผิดพลาดที่พบบ่อย](#common-errors-ข้อผิดพลาดที่พบบ่อย)
> - [Best Practices แนวทางปฏิบัติที่ดีที่สุด](#best-practices-แนวทางปฏิบัติที่ดีที่สุด)
> - [คำถามที่พบบ่อย](#คำถามที่พบบ่อย)
> - [CBoom ช่วยเรื่อง TikTok Shop API ได้อย่างไร](#cboom-ช่วยเรื่อง-tiktok-shop-api-ได้อย่างไร)
> - [สรุป](#สรุป)

## TikTok Shop API คืออะไร

**TikTok Shop API** คือชุดคำสั่ง (Interface) ที่ TikTok Shop เปิดให้นักพัฒนาและธุรกิจเข้าถึงข้อมูลและฟังก์ชันของ TikTok Shop ผ่านโปรแกรม โดยไม่ต้องเข้า Seller Center คีย์ด้วยมือ ผ่าน **TikTok Shop Open API** ที่เป็นทางการ

TikTok Shop เติบโตเร็วที่สุดในไทย ยอดขายเพิ่ม 300% ใน 2 ปี ร้านค้าที่ขายบน TikTok Shop ต้องจัดการออเดอร์ สต๊อก และขนส่ง ถ้ามีออเดอร์เยอะ การคีย์มือไม่ทัน TikTok Shop API ช่วยให้ทั้งหมดอัตโนมัติ

### ฟังก์ชันหลักของ TikTok Shop API

| ฟังก์ชัน | API Group | การใช้งาน |
|----------|-----------|-----------|
| จัดการออเดอร์ | Orders API | ดึงออเดอร์ ดูรายละเอียด ยืนยัน ยกเลิก |
| จัดการสินค้า | Products API | เพิ่ม แก้ ลบ สินค้า อัปเดตสต๊อก |
| จัดการขนส่ง | Shipping API | พิมพ์ใบปะหน้า อัปเดต Tracking |
| ยืนยันตัวตน | Auth API | OAuth 2.0 ขอ Token |
| รับ Event | Webhook | รับแจ้งเมื่อมีออเดอร์ สถานะเปลี่ยน |
| จัดการร้านค้า | Shop API | ข้อมูลร้าน สถานะ การตั้งค่า |
| การเงิน | Finance API | ยอดเงิน ค่าธรรมเนียม การชำระ |
| โลจิสติกส์ | Logistics API | เลือกขนส่ง คำนวณค่าขนส่ง |

### TikTok Shop API vs Shopee API

| เกณฑ์ | TikTok Shop API | Shopee API |
|-------|-----------------|------------|
| Protocol | HTTPS, JSON | HTTPS, JSON |
| Auth | OAuth 2.0 | OAuth 2.0 |
| Rate Limit | 1,000-10,000 req/ชม. (ตาม Plan) | 2,000 req/ชม. |
| Token อายุ | Access Token 14 วัน | Access Token 14 วัน |
| Sandbox | มี | มี |
| Webhook | รองรับ | รองรับ |
| เอกสาร | TikTok Shop Developer Docs | Shopee Open Platform Docs |
| ภาษาเอกสาร | อังกฤษ | อังกฤษ |

> 💡 **Tip:** TikTok Shop API มีโครงสร้างคล้าย Shopee API แต่มีความแตกต่างในรายละเอียด เช่น Rate Limit, Endpoint URL, และ Signature Method ถ้าเคยพัฒนา Shopee API มาแล้ว ปรับใช้กับ TikTok Shop API ได้เร็ว แต่ต้องอ่าน Docs ของ TikTok Shop แยก

---

## ทำไมต้องใช้ TikTok Shop API

### สำหรับนักพัฒนา

- **สร้างเครื่องมือจัดการร้านค้า** — Dashboard ยอดขาย เครื่องมือจัดการสต๊อก
- **เชื่อม TikTok Shop เข้ากับ ERP/CRM** — ข้อมูลไหลอัตโนมัติ
- **สร้าง SaaS สำหรับร้านค้า** — ระบบจัดการ Marketplace หลายช่องทาง
- **ทำ Automation** — ดึงออเดอร์ อัปเดตสต๊อก พิมพ์ใบปะหน้า อัตโนมัติ

### สำหรับเจ้าของธุรกิจ

- **TikTok Shop เติบโตเร็วที่สุด** — ยอดขายเพิ่ม 300% ใน 2 ปี ต้องมีระบบรองรับ
- **ลดเวลาจัดการออเดอร์ 85%** — ไม่ต้องคีย์มือ
- **สต๊อกตรงทุกช่องทาง** — ซิงค์กับ Shopee Lazada และหน้าร้าน
- **จัดส่งเร็วขึ้น 40%** — ใบปะหน้าและ Tracking อัตโนมัติ
- **ลดความผิดพลาด 95%** — ระบบดึงข้อมูล ไม่ใช่คนคีย์
- **Rating ดีขึ้น** — จัดส่งเร็ว สต๊อกตรง ไม่โดน Penalty

### สถิติที่น่าสนใจ

- **300%** ยอดขาย TikTok Shop ในไทยเติบโตใน 2 ปี
- **45%** ของร้านค้า TikTok Shop มีออเดอร์ 100+/วัน
- **78%** ของร้านค้าที่ใช้ API บอกว่าประสิทธิภาพเพิ่มขึ้น
- **62%** ลดเวลาจัดการออเดอร์หลังใช้ API
- **3.5x** ร้านค้าที่ใช้ API จัดส่งเร็วกว่าที่ไม่ใช้

> ⚠️ **Callout:** TikTok Shop เป็นช่องทางที่เติบโตเร็วที่สุดในไทย ถ้าธุรกิจของคุณขายบน TikTok Shop และมีออเดอร์ 50+ ต่อวัน การใช้ API ไม่ใช่ตัวเลือก แต่เป็นสิ่งจำเป็น เพราะคีย์มือไม่ทันและผิดพลาดสูง

---

## สถาปัตยกรรม TikTok Shop Open API

### ภาพรวมระบบ

```
┌──────────────────────────────────────────────────────┐
│              TikTok Shop Open API                      │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │  Auth    │  │  Orders  │  │ Products │           │
│  │  API     │  │  API     │  │  API     │           │
│  └──────────┘  └──────────┘  └──────────┘           │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │ Shipping │  │  Shop    │  │  Finance │           │
│  │  API     │  │  API     │  │  API     │           │
│  └──────────┘  └──────────┘  └──────────┘           │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │ Logistics│  │  Webhook │  │  Fulfillment│         │
│  │  API     │  │  API     │  │  API     │           │
│  └──────────┘  └──────────┘  └──────────┘           │
└───────────────────────┬──────────────────────────────┘
                        │
                   REST API (HTTPS)
                        │
┌───────────────────────▼───────────────────────────────┐
│              แอปพลิเคชันของคุณ                        │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │  ERP     │  │  CRM     │  │  WMS     │           │
│  └──────────┘  └──────────┘  └──────────┘           │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │  POS     │  │ Dashboard│  │ Automation│          │
│  └──────────┘  └──────────┘  └──────────┘           │
└──────────────────────────────────────────────────────┘
```

### ข้อกำหนดของ TikTok Shop API

| ข้อกำหนด | รายละเอียด |
|---------|-----------|
| Protocol | HTTPS เท่านั้น |
| Format | JSON |
| Encoding | UTF-8 |
| Base URL | `https://open-api.tiktokglobalshop.com` |
| Rate Limit | ขึ้นอยู่กับ Plan (1,000-10,000 req/ชม.) |
| Token อายุ | Access Token 14 วัน, Refresh Token 30 วัน |
| Signature | HMAC-SHA256 |
| Sandbox | มีสภาพแวดล้อมทดสอบ |
| App Type | Shop App หรือ Multi-Shop App |

### ประเภทแอปพลิเคชัน

| ประเภท | การใช้งาน | เหมาะสำหรับ |
|--------|-----------|------------|
| Shop App | ร้านค้าเดียว | ธุรกิจที่มีร้านเดียว |
| Multi-Shop App | หลายร้านค้า | SaaS, Agency, BAP |

> 💡 **Tip:** ถ้าสร้าง SaaS หรือ Business Automation Platform สมัคร Multi-Shop App เพื่อให้ร้านค้าหลายร้านใช้งานได้ ถ้าใช้กับร้านตัวเอง 1 ร้าน Shop App พอ

---

## OAuth 2.0 การให้สิทธิ์เข้าถึง

**OAuth 2.0** คือกระบวนการที่ร้านค้าให้สิทธิ์แอปพลิเคชันเข้าถึงข้อมูลร้าน TikTok Shop โดยไม่ต้องบอกรหัสผ่าน ร้านค้าคลิก "Authorize" แล้ว TikTok Shop ส่ง Authorization Code กลับมา แล้วแลกเป็น Access Token

### ขั้นตอน OAuth 2.0

```
┌────────────┐                    ┌──────────┐              ┌──────────────┐
│  ร้านค้า    │                    │  แอปของคุณ│              │  TikTok Shop │
└─────┬──────┘                    └─────┬────┘              └──────┬───────┘
      │                                  │                          │
      │  1. คลิก "เชื่อม TikTok Shop"    │                          │
      │─────────────────────────────────►│                          │
      │                                  │                          │
      │  2. แอปสร้าง Auth URL           │                          │
      │                                  │  3. Redirect ไป TikTok   │
      │◄─────────────────────────────────│─────────────────────────►│
      │                                  │                          │
      │  4. ร้านค้า Login TikTok Shop    │                          │
      │────────────────────────────────────────────────────────────►│
      │                                  │                          │
      │  5. ร้านค้าคลิก "Authorize"       │                          │
      │────────────────────────────────────────────────────────────►│
      │                                  │                          │
      │  6. TikTok Redirect กลับพร้อม Code│                         │
      │◄────────────────────────────────────────────────────────────│
      │                                  │                          │
      │                                  │  7. แลก Code เป็น Token   │
      │                                  │─────────────────────────►│
      │                                  │                          │
      │                                  │  8. ได้ Access Token      │
      │                                  │◄─────────────────────────│
      │                                  │                          │
      │  9. เชื่อมสำเร็จ!                 │                          │
      │◄─────────────────────────────────│                          │
```

### ตัวอย่างโค้ด: สร้าง Authorization URL

```python
import hashlib
import time

APP_KEY = "your_app_key_here"
APP_SECRET = "your_app_secret_here"
REDIRECT_URI = "https://yourapp.com/callback"

# TikTok Shop OAuth URL
auth_url = (
    f"https://services.tiktokshop.com"
    f"/auth/v2/authorize"
    f"?app_key={APP_KEY}"
    f"&state=random_state_string"
    f"&redirect_uri={REDIRECT_URI}"
)

# ส่งร้านค้าไป auth_url
# ร้านค้า Login TikTok Shop → คลิก Authorize
# TikTok Redirect กลับมาพร้อม code และ state
# เช่น: https://yourapp.com/callback?code=xxx&state=random_state_string
```

### ตัวอย่างโค้ด: แลก Code เป็น Access Token

```python
import hashlib
import time
import requests

APP_KEY = "your_app_key_here"
APP_SECRET = "your_app_secret_here"
AUTH_CODE = "authorization_code_from_oauth"

# สร้าง Signature
timestamp = int(time.time())
path = "/api/v2/token/get"
sign_string = f"{path}&app_key={APP_KEY}&timestamp={timestamp}"
sign = hashlib.sha256(
    (sign_string + APP_SECRET).encode()
).hexdigest()

# เรียก API ขอ Token
url = "https://open-api.tiktokglobalshop.com/api/v2/token/get"
params = {
    "app_key": APP_KEY,
    "timestamp": timestamp,
    "sign": sign,
    "code": AUTH_CODE,
    "grant_type": "authorized_code",
}
response = requests.get(url, params=params)
token_data = response.json()

# ผลลัพธ์
# {
#   "data": {
#     "access_token": "xxx-yyy-zzz",
#     "token_type": "Bearer",
#     "expires_in": 1209600,  # 14 วัน
#     "refresh_token": "aaa-bbb-ccc",
#     "refresh_expires_in": 2592000,  # 30 วัน
#     "open_id": "shop_open_id_here"
#   }
# }
```

### ตัวอย่างโค้ด: Refresh Token

```python
# Refresh Token เมื่อ Access Token ใกล้หมดอายุ
timestamp = int(time.time())
path = "/api/v2/token/refresh"
sign_string = f"{path}&app_key={APP_KEY}&timestamp={timestamp}"
sign = hashlib.sha256(
    (sign_string + APP_SECRET).encode()
).hexdigest()

url = "https://open-api.tiktokglobalshop.com/api/v2/token/refresh"
params = {
    "app_key": APP_KEY,
    "timestamp": timestamp,
    "sign": sign,
    "refresh_token": "aaa-bbb-ccc",
    "grant_type": "refresh_token",
}
response = requests.get(url, params=params)
new_token = response.json()
# ได้ Access Token ใหม่ + Refresh Token ใหม่
```

### ขอบเขตสิทธิ์ (Scopes)

| Scope | สิทธิ์ | ใช้สำหรับ |
|-------|-------|---------|
| Order | ดึง/อัปเดตออเดอร์ | จัดการออเดอร์ |
| Product | ดึง/เพิ่ม/แก้/ลบสินค้า | จัดการสินค้า |
| Shipping | พิมพ์ใบปะหน้า อัปเดต Tracking | จัดการขนส่ง |
| Finance | ดูยอดเงิน ค่าธรรมเนียม | การเงิน |
| Shop | ดูข้อมูลร้านค้า | ข้อมูลร้าน |

> ⚠️ **Callout:** ห้ามเก็บ App Secret หรือ Access Token ในโค้ด (Hardcode) ควรเก็บใน Environment Variable หรือ Secret Manager ถ้า Secret รั่ว ผู้ไม่ประสงค์ดีสามารถเข้าถึงร้านค้าได้

---

## Orders API จัดการออเดอร์

**Orders API** คือชุดคำสั่งสำหรับดึงออเดอร์ ดูรายละเอียด ยืนยัน และจัดการออเดอร์จาก TikTok Shop ผ่านโปรแกรม

### ฟังก์ชันหลักของ Orders API

| Endpoint | ฟังก์ชัน | การใช้งาน |
|----------|---------|-----------|
| `/order/search` | ค้นหาออเดอร์ | ดึงออเดอร์ตามช่วงเวลา/สถานะ |
| `/order/detail` | ดึงรายละเอียดออเดอร์ | ดูสินค้า ที่อยู่ ยอด |
| `/order/confirm` | ยืนยันออเดอร์ | ยืนยันว่ารับออเดอร์แล้ว |
| `/order/cancel` | ยกเลิกออเดอร์ | ยกเลิกออเดอร์ที่ยังไม่จัดส่ง |
| `/order/fulfill` | อัปเดตการจัดส่ง | บอก TikTok ว่าจัดส่งแล้ว |
| `/order/package` | ดึงข้อมูลพัสดุ | ดูพัสดุแต่ละชิ้น |

### ตัวอย่างโค้ด: ค้นหาออเดอร์

```python
import hashlib
import time
import requests

APP_KEY = "your_app_key_here"
APP_SECRET = "your_app_secret_here"
ACCESS_TOKEN = "xxx-yyy-zzz"
SHOP_ID = "123456789"

# สร้าง Signature
timestamp = int(time.time())
path = "/order/search"
sign_string = f"{path}&app_key={APP_KEY}&timestamp={timestamp}"
sign = hashlib.sha256(
    (sign_string + APP_SECRET).encode()
).hexdigest()

url = "https://open-api.tiktokglobalshop.com/order/search"
headers = {
    "Content-Type": "application/json",
    "x-tts-access-token": ACCESS_TOKEN,
}
params = {
    "app_key": APP_KEY,
    "timestamp": timestamp,
    "sign": sign,
    "shop_id": SHOP_ID,
}
payload = {
    "page_size": 50,
    "search_type": 1,  # 1 = ตามเวลาสร้าง
    "create_time_start": timestamp - 86400,  # 24 ชม.ที่แล้ว
    "create_time_end": timestamp,
    "order_status": 100,  # 100 = UNPAID
}
response = requests.post(url, headers=headers, params=params, json=payload)
orders = response.json()

# ผลลัพธ์
# {
#   "data": {
#     "orders": [
#       {
#         "id": "576460752303423489",
#         "status": 100,
#         "create_time": 1725124800,
#         "total_amount": 350.00,
#         "currency": "THB"
#       },
#       ...
#     ],
#     "total_count": 42,
#     "page_size": 50
#   }
# }
```

### ตัวอย่างโค้ด: ดึงรายละเอียดออเดอร์

```python
# ดึงรายละเอียดออเดอร์
timestamp = int(time.time())
path = "/order/detail"
sign_string = f"{path}&app_key={APP_KEY}&timestamp={timestamp}"
sign = hashlib.sha256(
    (sign_string + APP_SECRET).encode()
).hexdigest()

url = "https://open-api.tiktokglobalshop.com/order/detail"
headers = {
    "Content-Type": "application/json",
    "x-tts-access-token": ACCESS_TOKEN,
}
params = {
    "app_key": APP_KEY,
    "timestamp": timestamp,
    "sign": sign,
    "shop_id": SHOP_ID,
}
payload = {
    "order_ids": ["576460752303423489", "576460752303423490"]
}
response = requests.post(url, headers=headers, params=params, json=payload)
order_details = response.json()

# ผลลัพธ์: รายละเอียดเต็ม
# - สินค้าแต่ละชิ้น (SKU, จำนวน, ราคา)
# - ที่อยู่จัดส่ง
# - ช่องทางชำระเงิน
# - ค่าขนส่ง
# - ส่วนลด
# - ยอดรวม
```

### สถานะออเดอร์ใน TikTok Shop API

```
UNPAID (100) → AWAITING_SHIP (120) → AWAITING_COLLECTION (140)
                                          │
                                          ▼
                                     IN_TRANSIT (160)
                                          │
                                          ├── DELIVERED (170)
                                          │       │
                                          │       ▼
                                          │  COMPLETED (180)
                                          │
                                          └── RETURNED (190)

ยกเลิก: CANCELLED (200) — ได้ทุกสถานะก่อน DELIVERED
```

### ตารางสถานะออเดอร์

| Status Code | สถานะ | ความหมาย | แอปทำอะไร |
|-------------|--------|---------|-----------|
| 100 | UNPAID | ลูกค้ายังไม่จ่าย | รอ |
| 120 | AWAITING_SHIP | จ่ายแล้ว รอจัดส่ง | เตรียมของ พิมพ์ใบปะหน้า |
| 140 | AWAITING_COLLECTION | รอขนส่งมารับ | ส่งให้ขนส่ง |
| 160 | IN_TRANSIT | กำลังขนส่ง | อัปเดตในระบบ |
| 170 | DELIVERED | ส่งถึงแล้ว | อัปเดตในระบบ |
| 180 | COMPLETED | เสร็จสิ้น | ส่งเข้าบัญชี |
| 190 | RETURNED | คืนสินค้า | รับคืน คืนสต๊อก |
| 200 | CANCELLED | ยกเลิก | คืนสต๊อก |

> 💡 **Tip:** ดึงออเดอร์ทุก 5-15 นาที หรือใช้ Webhook เพื่อ Real-time อย่าดึงทุกวินาที เพราะ Rate Limit ถ้าดึงบ่อยเกินไป API จะ Block

---

## Products API จัดการสินค้า

**Products API** คือชุดคำสั่งสำหรับจัดการสินค้าบน TikTok Shop เพิ่ม แก้ ลบ อัปเดตสต๊อก และราคา ผ่านโปรแกรม

### ฟังก์ชันหลักของ Products API

| Endpoint | ฟังก์ชัน | การใช้งาน |
|----------|---------|-----------|
| `/products/search` | ค้นหาสินค้า | ดูสินค้าทั้งหมดในร้าน |
| `/products/details` | ดึงข้อมูลสินค้า | ชื่อ ราคา สต๊อก รูป |
| `/products/stock` | อัปเดตสต๊อก | ซิงค์สต๊อก Real-time |
| `/products/price` | อัปเดตราคา | เปลี่ยนราคาจำนวนมาก |
| `/products/create` | เพิ่มสินค้า | อัปโหลดสินค้าใหม่ |
| `/products/edit` | แก้ไขสินค้า | แก้ชื่อ รายละเอียด รูป |

### ตัวอย่างโค้ด: อัปเดตสต๊อก

```python
# อัปเดตสต๊อกสินค้า
timestamp = int(time.time())
path = "/products/stock"
sign_string = f"{path}&app_key={APP_KEY}&timestamp={timestamp}"
sign = hashlib.sha256(
    (sign_string + APP_SECRET).encode()
).hexdigest()

url = "https://open-api.tiktokglobalshop.com/products/stock"
headers = {
    "Content-Type": "application/json",
    "x-tts-access-token": ACCESS_TOKEN,
}
params = {
    "app_key": APP_KEY,
    "timestamp": timestamp,
    "sign": sign,
    "shop_id": SHOP_ID,
}
payload = {
    "skus": [
        {"sku_id": "sku_123", "stock_quantity": 50},
        {"sku_id": "sku_456", "stock_quantity": 30}
    ]
}
response = requests.post(url, headers=headers, params=params, json=payload)
result = response.json()
# สต๊อกอัปเดตบน TikTok Shop ทันที
```

### ตัวอย่างโค้ด: ค้นหาสินค้า

```python
# ค้นหาสินค้าทั้งหมดในร้าน
timestamp = int(time.time())
path = "/products/search"
sign_string = f"{path}&app_key={APP_KEY}&timestamp={timestamp}"
sign = hashlib.sha256(
    (sign_string + APP_SECRET).encode()
).hexdigest()

url = "https://open-api.tiktokglobalshop.com/products/search"
headers = {
    "Content-Type": "application/json",
    "x-tts-access-token": ACCESS_TOKEN,
}
params = {
    "app_key": APP_KEY,
    "timestamp": timestamp,
    "sign": sign,
    "shop_id": SHOP_ID,
}
payload = {
    "page_size": 50,
    "page_number": 1,
    "status": "PUBLISHED",  # สินค้าที่เผยแพร่แล้ว
}
response = requests.post(url, headers=headers, params=params, json=payload)
products = response.json()
# ได้รายการสินค้าทั้งหมดในร้าน
```

### การซิงค์สต๊อกข้ามช่องทางด้วย Products API

```
สินค้า A มีสต๊อก 100 ชิ้น (ใน ERP)
        │
        ├── TikTok Shop: 100 ชิ้น
        ├── Shopee: 100 ชิ้น
        └── Lazada: 100 ชิ้น
        
ลูกค้าซื้อ 30 ชิ้นบน TikTok Shop
        │
        ▼
ERP ลดสต๊อก เหลือ 70 ชิ้น
        │
        ├── API ──► TikTok Shop: update_stock(70)
        ├── API ──► Shopee: update_stock(70)
        └── API ──► Lazada: update_stock(70)
        
ทุกช่องทางเหลือ 70 ชิ้น (ภายใน 2-5 วินาที)
```

> 💡 **Tip:** การอัปเดตสต๊อกผ่าน API เร็วและแม่นยำกว่าการคีย์มือ แต่ต้องระวัง Rate Limit ถ้ามี 1,000 SKU อย่าอัปเดตทุกชิ้นพร้อมกัน ควรอัปเดตเฉพาะสินค้าที่มีการเปลี่ยนแปลงสต๊อกเท่านั้น

---

## Shipping API จัดการขนส่ง

**Shipping API** คือชุดคำสั่งสำหรับจัดการขนส่งบน TikTok Shop พิมพ์ใบปะหน้า เลือกขนส่ง และอัปเดต Tracking Number ผ่านโปรแกรม

### ฟังก์ชันหลักของ Shipping API

| Endpoint | ฟังก์ชัน | การใช้งาน |
|----------|---------|-----------|
| `/fulfillment/shipping_document` | พิมพ์ใบปะหน้า | สร้างใบปะหน้า PDF |
| `/fulfillment/package` | ดึงข้อมูลพัสดุ | ดูพัสดุแต่ละชิ้น |
| `/fulfillment/ship` | อัปเดต Tracking | บอก TikTok ว่าจัดส่งแล้ว |
| `/logistics/search` | ค้นหาขนส่ง | ดูขนส่งที่รองรับ |
| `/logistics/detail` | รายละเอียดขนส่ง | ราคา เวลา พื้นที่ |

### ตัวอย่างโค้ด: พิมพ์ใบปะหน้า

```python
# สร้างใบปะหน้า (Shipping Label)
timestamp = int(time.time())
path = "/fulfillment/shipping_document"
sign_string = f"{path}&app_key={APP_KEY}&timestamp={timestamp}"
sign = hashlib.sha256(
    (sign_string + APP_SECRET).encode()
).hexdigest()

url = "https://open-api.tiktokglobalshop.com/fulfillment/shipping_document"
headers = {
    "Content-Type": "application/json",
    "x-tts-access-token": ACCESS_TOKEN,
}
params = {
    "app_key": APP_KEY,
    "timestamp": timestamp,
    "sign": sign,
    "shop_id": SHOP_ID,
}
payload = {
    "order_id": "576460752303423489",
    "document_type": "SHIPPING_LABEL",
    "document_format": "PDF",
}
response = requests.post(url, headers=headers, params=params, json=payload)
label_data = response.json()
# ได้ URL ดาวน์โหลดใบปะหน้า PDF
```

### ตัวอย่างโค้ด: อัปเดต Tracking Number

```python
# อัปเดต Tracking Number เมื่อจัดส่งแล้ว
timestamp = int(time.time())
path = "/fulfillment/ship"
sign_string = f"{path}&app_key={APP_KEY}&timestamp={timestamp}"
sign = hashlib.sha256(
    (sign_string + APP_SECRET).encode()
).hexdigest()

url = "https://open-api.tiktokglobalshop.com/fulfillment/ship"
headers = {
    "Content-Type": "application/json",
    "x-tts-access-token": ACCESS_TOKEN,
}
params = {
    "app_key": APP_KEY,
    "timestamp": timestamp,
    "sign": sign,
    "shop_id": SHOP_ID,
}
payload = {
    "order_id": "576460752303423489",
    "package_id": "package_123",
    "tracking_number": "TH123456789",
    "tracking_provider": "KERRY",
}
response = requests.post(url, headers=headers, params=params, json=payload)
result = response.json()
# TikTok Shop อัปเดตสถานะเป็น IN_TRANSIT
```

### ขนส่งที่รองรับในไทย

| ขนส่ง | Provider Code | การใช้งาน |
|-------|---------------|-----------|
| Kerry Express | KERRY | ทั่วประเทศ |
| Flash Express | FLASH | ทั่วประเทศ |
| Thailand Post | THP | ทั่วประเทศ |
| J&T Express | JT | ทั่วประเทศ |
| DHL | DHL | ระหว่างประเทศ |
| Ninja Van | NINJA | ทั่วประเทศ |

### ขั้นตอนการจัดส่งผ่าน API

```
ออเดอร์ AWAITING_SHIP
        │
        ▼
1. ดึงข้อมูลพัสดุ (Package API)
        │
        ▼
2. พิมพ์ใบปะหน้า (Shipping Document API)
        │
        ├── ดาวน์โหลด PDF
        └── พิมพ์ด้วยเครื่องพิมพ์
        │
        ▼
3. แปะใบปะหน้า ส่งให้ขนส่ง
        │
        ▼
4. อัปเดต Tracking Number (Ship API)
        │
        ├── TikTok อัปเดตสถานะเป็น IN_TRANSIT
        ├── ลูกค้าได้รับแจ้ง
        └── ERP อัปเดตสถานะ
        │
        ▼
5. รอขนส่งส่งถึง → DELIVERED → COMPLETED
```

> 💡 **Tip:** การพิมพ์ใบปะหน้าและอัปเดต Tracking ผ่าน API ลดเวลาจาก 2 ชม./วัน เหลือ 0 นาที ระบบทำอัตโนมัติทุกออเดอร์ พนักงานแค่แปะใบปะหน้าและส่งขนส่ง

---

## Webhook รับ Event แบบ Real-time

**Webhook** คือกลไกที่ TikTok Shop ส่งข้อมูลไปแอปพลิเคชันของคุณทันทีเมื่อมี Event เกิดขึ้น เช่น ออเดอร์ใหม่ สถานะเปลี่ยน สต๊อกเปลี่ยน โดยไม่ต้อง Polling

### Webhook vs Polling

```
─── Polling (แอปถามทุก 5 นาที) ───

แอป: "มีออเดอร์ใหม่ไหม?"     → TikTok: "ไม่มี"
(5 นาทีให้หลัง)
แอป: "มีออเดอร์ใหม่ไหม?"     → TikTok: "ไม่มี"
(5 นาทีให้หลัง)
แอป: "มีออเดอร์ใหม่ไหม?"     → TikTok: "มี! ออเดอร์ #12345"
                             ← แอปดึงข้อมูล

─── Webhook (TikTok บอกทันที) ───

ลูกค้าสั่งซื้อ
TikTok: POST /webhook → แอป: "ออเดอร์ใหม่ #12345!"
                              → แอปดึงข้อมูล
                              → ทีมคลังเริ่มจัด
                              (Real-time ภายใน 2-5 วินาที)
```

### Event ที่ TikTok Shop Webhook ส่ง

| Event Type | ความหมาย | แอปทำอะไร |
|------------|---------|-----------|
| ORDER_CREATED | ออเดอร์ใหม่ | ดึงข้อมูลออเดอร์ |
| ORDER_STATUS_CHANGED | สถานะเปลี่ยน | อัปเดตในระบบ |
| ORDER_CANCELLED | ลูกค้ายกเลิก | คืนสต๊อก |
| PRODUCT_STOCK_CHANGED | สต๊อกเปลี่ยน | ซิงค์สต๊อก |
| RETURN_REQUESTED | ลูกค้าขอคืน | สร้างใบรับคืน |
| SHIPMENT_UPDATED | สถานะขนส่งเปลี่ยน | อัปเดตในระบบ |
| PACKAGE_UPDATED | พัสดุอัปเดต | อัปเดต Tracking |

### ตัวอย่างโค้ด: รับ Webhook

```python
from flask import Flask, request, jsonify
import hashlib
import json

app = Flask(__name__)
APP_SECRET = "your_app_secret_here"

@app.route('/webhook/tiktok', methods=['POST'])
def tiktok_webhook():
    # รับ Webhook จาก TikTok Shop
    raw_body = request.get_data()
    data = json.loads(raw_body)
    
    # ตรวจสอบ Signature (เพื่อความปลอดภัย)
    signature = request.headers.get('x-tts-signature')
    computed_sign = hashlib.sha256(
        (raw_body.decode() + APP_SECRET).encode()
    ).hexdigest()
    
    if signature != computed_sign:
        return jsonify({"error": "Invalid signature"}), 401
    
    # ประมวลผล Event
    event_type = data.get('type')
    shop_id = data.get('shop_id')
    
    if event_type == "ORDER_CREATED":
        order_id = data.get('data', {}).get('order_id')
        # ดึงรายละเอียดออเดอร์
        order = get_order_detail(order_id)
        # ส่งไป ERP
        send_to_erp(order)
        # แจ้งทีมคลัง
        notify_warehouse(order)
    
    elif event_type == "ORDER_STATUS_CHANGED":
        order_id = data.get('data', {}).get('order_id')
        new_status = data.get('data', {}).get('status')
        update_order_status(order_id, new_status)
    
    elif event_type == "ORDER_CANCELLED":
        order_id = data.get('data', {}).get('order_id')
        # คืนสต๊อก
        restock_order(order_id)
    
    # ต้องตอบ 200 ภายใน 5 วินาที
    return jsonify({"success": True}), 200

if __name__ == '__main__':
    app.run(port=5000)
```

### ข้อกำหนดของ Webhook

| ข้อกำหนด | รายละเอียด |
|---------|-----------|
| URL | HTTPS เท่านั้น (Public URL) |
| Response | ตอบ HTTP 200 ภายใน 5 วินาที |
| Retry | ถ้าไม่ได้ 200 ลองใหม่ตามนโยบาย |
| Duplicate | อาจส่งซ้ำได้ ต้องจัดการ Duplicate |
| Signature | ตรวจสอบ x-tts-signature เพื่อป้องกันปลอม |
| Content-Type | application/json |

> ⚠️ **Callout:** Webhook ต้องตอบ HTTP 200 ภายใน 5 วินาที ถ้าตอบช้า TikTok จะ Retry และถ้าล้มเหลวซ้ำ Webhook จะถูกปิด ควรรับ Webhook แล้วเก็บใน Queue ประมวลผลทีหลัง อย่าประมวลผลนานใน Webhook Handler

---

## Automation ทำงานอัตโนมัติ

**Automation** คือการใช้ TikTok Shop API ร่วมกับระบบธุรกิจ เพื่อทำงานซ้ำซากแทนคน โดยอัตโนมัติ ลดเวลา ลดความผิดพลาด และเพิ่มความเร็ว

### งานที่ Automation ทำได้

#### ดึงออเดอร์อัตโนมัติ
```
Webhook แจ้งออเดอร์ใหม่
        │
        ▼
ดึงรายละเอียดออเดอร์ (Orders API)
        │
        ▼
ส่งเข้า ERP
        │
        ├── สร้างใบสั่งขาย
        ├── ลดสต๊อก
        └── ส่งเข้า CRM
        │
        ▼
แจ้งทีมคลัง (LINE/Email)
```

#### ซิงค์สต๊อกอัตโนมัติ
```
สต๊อกใน ERP เปลี่ยน
        │
        ▼
คำนวณสต๊อกใหม่
        │
        ├── TikTok Shop: update_stock()
        ├── Shopee: update_stock()
        └── Lazada: update_stock()
        │
        ▼
ทุกช่องทางสต๊อกตรง (ภายใน 2-5 วินาที)
```

#### จัดส่งอัตโนมัติ
```
ออเดอร์ AWAITING_SHIP
        │
        ▼
พิมพ์ใบปะหน้า (Shipping API)
        │
        ▼
อัปเดต Tracking Number (Ship API)
        │
        ├── TikTok อัปเดตสถานะ IN_TRANSIT
        ├── ลูกค้าได้รับแจ้ง
        └── ERP อัปเดตสถานะ
```

#### อัปเดตราคาอัตโนมัติ
```
ราคาใน ERP เปลี่ยน
        │
        ▼
อัปเดตราคาบน TikTok Shop (Products API)
        │
        ▼
ราคาตรงทุกช่องทาง
```

### ตัวอย่างโค้ด: Automation Flow แบบเต็ม

```python
import time
import hashlib
import requests
from queue import Queue
from threading import Thread

# Queue สำหรับเก็บ Webhook Events
event_queue = Queue()

def webhook_handler(data):
    """รับ Webhook แล้วเก็บใน Queue"""
    event_queue.put(data)
    return {"success": True}

def process_events():
    """ประมวลผล Events จาก Queue"""
    while True:
        event = event_queue.get()
        event_type = event.get('type')
        
        if event_type == "ORDER_CREATED":
            order_id = event['data']['order_id']
            
            # 1. ดึงรายละเอียดออเดอร์
            order = get_order_detail(order_id)
            
            # 2. ส่งเข้า ERP
            erp_result = send_to_erp(order)
            
            # 3. ลดสต๊อกใน ERP
            for item in order['items']:
                erp.reduce_stock(item['sku'], item['quantity'])
            
            # 4. ซิงค์สต๊อกกลับไป TikTok Shop
            for item in order['items']:
                new_stock = erp.get_stock(item['sku'])
                update_tiktok_stock(item['sku'], new_stock)
                # ซิงค์ Shopee และ Lazada ด้วย
                update_shopee_stock(item['sku'], new_stock)
                update_lazada_stock(item['sku'], new_stock)
            
            # 5. แจ้งทีมคลัง
            notify_warehouse(order)
        
        elif event_type == "ORDER_STATUS_CHANGED":
            order_id = event['data']['order_id']
            new_status = event['data']['status']
            
            if new_status == 120:  # AWAITING_SHIP
                # พิมพ์ใบปะหน้าอัตโนมัติ
                label = print_shipping_label(order_id)
                # อัปเดต Tracking อัตโนมัติ
                update_tracking(order_id)
        
        elif event_type == "ORDER_CANCELLED":
            order_id = event['data']['order_id']
            # คืนสต๊อก
            restock_order(order_id)
            # ซิงค์สต๊อกกลับ
            sync_all_channels_stock()

# เริ่ม Worker Thread
worker = Thread(target=process_events, daemon=True)
worker.start()
```

### ตารางสรุป Automation

| งาน | ก่อน Automation | หลัง Automation | ลดลง |
|-----|-----------------|-----------------|------|
| ดึงออเดอร์ | คีย์มือ 2 ชม./วัน | 0 นาที | -100% |
| ซิงค์สต๊อก | คีย์มือ 1 ชม./วัน | 0 นาที | -100% |
| พิมพ์ใบปะหน้า | คีย์มือ 1 ชม./วัน | 0 นาที | -100% |
| อัปเดต Tracking | คีย์มือ 1 ชม./วัน | 0 นาที | -100% |
| อัปเดตราคา | คีย์มือ 30 นาที/ครั้ง | 0 นาที | -100% |
| ความผิดพลาด | 3-5% | < 0.1% | -98% |

> 💡 **Tip:** เริ่ม Automation จากงานที่ทำซ้ำทุกวัน มีกฎชัดเจน เช่น ดึงออเดอร์ ซิงค์สต๊อก พิมพ์ใบปะหน้า งานที่ต้องใช้ความคิดสร้างสรรค์หรือความสัมพันธ์ ยังคงให้คนทำ

---

## Integration เชื่อม TikTok Shop เข้ากับ ERP และ CRM

### สถาปัตยกรรม Integration

```
┌─────────────────────────────────────────────────────────┐
│                 TikTok Shop Open API                     │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │  Orders  │  │ Products │  │ Shipping │             │
│  │  API     │  │  API     │  │  API     │             │
│  └─────┬────┘  └─────┬────┘  └─────┬────┘             │
│        │             │             │                    │
│        └─────────────┼─────────────┘                    │
│                      │                                   │
│                ┌─────▼─────┐                            │
│                │  Webhook  │                            │
│                └─────┬─────┘                            │
└──────────────────────┼──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│              Integration Layer                          │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │  Auth    │  │  Sync    │  │  Error   │            │
│  │ Manager  │  │ Engine   │  │ Handler  │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │  Queue   │  │  Retry   │  │  Logger  │            │
│  │  Manager │  │  Logic   │  │          │            │
│  └──────────┘  └──────────┘  └──────────┘            │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│              ระบบธุรกิจ                                  │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │  ERP     │  │  CRM     │  │  WMS     │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │  POS     │  │ Dashboard│  │ Automation│           │
│  └──────────┘  └──────────┘  └──────────┘            │
└────────────────────────────────────────────────────────┘
```

### ขั้นตอนการทำ Integration

**1. สมัคร Developer และสร้าง App**
- สมัคร TikTok Shop Developer Center
- สร้างแอปพลิเคชัน (Shop App หรือ Multi-Shop App)
- ได้ App Key และ App Secret

**2. ตั้งค่า OAuth**
- สร้าง Authorization URL
- ตั้ง Callback URL
- ร้านค้าให้สิทธิ์
- ได้ Access Token

**3. ตั้งค่า Webhook**
- เตรียม HTTPS Endpoint
- ลงทะเบียน Webhook URL กับ TikTok Shop
- ทดสอบรับ Event

**4. ซิงค์สินค้าเริ่มต้น**
- ดึงรายการสินค้าจาก TikTok Shop
- เทียบกับสินค้าใน ERP
- ซิงค์สต๊อกให้ตรงก่อนเริ่ม

**5. เริ่มดึงออเดอร์**
- ตั้ง Webhook รับออเดอร์ใหม่
- ตั้ง Polling สำรองทุก 5 นาที
- ส่งออเดอร์เข้า ERP

**6. อัปเดตสต๊อก**
- เมื่อมีออเดอร์ ลดสต๊อกใน ERP
- อัปเดตสต๊อกกลับไป TikTok Shop ผ่าน API
- ตั้ง Buffer Stock ป้องกันขายเกิน

**7. จัดการขนส่ง**
- พิมพ์ใบปะหน้าผ่าน Shipping API
- อัปเดต Tracking Number กลับไป TikTok Shop
- ติดตามสถานะขนส่ง

### Integration กับ ERP

| ขั้นตอน | API | ทิศทาง | ความถี่ |
|---------|-----|--------|---------|
| รับออเดอร์ | Orders API + Webhook | TikTok → ERP | Real-time |
| อัปเดตสต๊อก | Products API | ERP → TikTok | Real-time |
| พิมพ์ใบปะหน้า | Shipping API | ERP → TikTok | ตามออเดอร์ |
| อัปเดต Tracking | Shipping API | ERP → TikTok | ตามออเดอร์ |
| บันทึกบัญชี | Finance API | TikTok → ERP | รายวัน |
| อัปเดตราคา | Products API | ERP → TikTok | ตามต้องการ |

### Integration กับ CRM

| ขั้นตอน | ข้อมูล | ทิศทาง | การใช้งาน |
|---------|-------|--------|-----------|
| ข้อมูลลูกค้า | ชื่อ เบอร์ ที่อยู่ | TikTok → CRM | สร้าง Profile |
| ประวัติการซื้อ | สินค้า ยอด วันที่ | TikTok → CRM | วิเคราะห์พฤติกรรม |
| สะสมแต้ม | ยอดซื้อ → แต้ม | TikTok → CRM | สมาชิก |
| ส่งโปร | กลุ่มลูกค้า | CRM → TikTok | การตลาด |
| แบ่งกลุ่มลูกค้า | พฤติกรรม | CRM | ส่งตรงกลุ่ม |

> 💡 **Tip:** ถ้าไม่อยากพัฒนาเอง ใช้ Business Automation Platform ที่มี TikTok Shop API Integration พร้อม เช่น CBoom ประหยัดเวลา 3-6 เดือน และไม่ต้องกังวลเรื่อง API Changes

---

## Common Errors ข้อผิดพลาดที่พบบ่อย

### ตาราง Common Errors และวิธีแก้

| Error Code | ข้อผิดพลาด | สาเหตุ | วิธีแก้ |
|-----------|-----------|--------|--------|
| `invalid_sign` | Signature ไม่ถูกต้อง | สร้าง Signature ผิด | เช็ค sign_string และ hash |
| `invalid_param` | Parameter ไม่ถูกต้อง | ส่งค่าผิด/ขาด | อ่าน API Docs ตรวจ param |
| `access_token_expired` | Token หมดอายุ | Token 14 วัน | Refresh Token ก่อนหมด |
| `rate_limit_exceeded` | เกิน Rate Limit | เรียกเกิน Limit | ลดความถี่ ใช้ Queue |
| `shop_not_authorized` | ร้านยังไม่ให้สิทธิ์ | ยังไม่ OAuth | ร้านค้าต้อง Authorize ก่อน |
| `network_error` | เครือข่ายผิดพลาด | Internet ไม่เสถียร | Retry พร้อม Backoff |
| `webhook_timeout` | Webhook ตอบช้า | ประมวลผลนานเกิน 5 วินาที | ใช้ Queue ประมวลผลทีหลัง |
| `product_not_found` | สินค้าไม่มี | product_id ผิด หรือสินค้าถูกลบ | ตรวจสอบ product_id |
| `order_not_found` | ออเดอร์ไม่มี | order_id ผิด | ตรวจสอบ order_id |
| `invalid_status_transition` | เปลี่ยนสถานะไม่ได้ | สถานะปัจจุบันไม่อนุญาต | เช็คสถานะก่อนเปลี่ยน |

### ตัวอย่าง Error Handling

```python
import time
import requests

def call_tiktok_api(url, headers, params, payload=None, max_retries=3):
    for attempt in range(max_retries):
        try:
            if payload:
                response = requests.post(
                    url, headers=headers, params=params, 
                    json=payload, timeout=10
                )
            else:
                response = requests.get(
                    url, headers=headers, params=params, 
                    timeout=10
                )
            
            data = response.json()
            
            # ตรวจสอบ Error
            if data.get('code') and data['code'] != 0:
                error_msg = data.get('message', 'Unknown error')
                
                if 'access_token_expired' in error_msg:
                    # Token หมดอายุ → Refresh
                    refresh_access_token()
                    continue  # ลองใหม่
                
                elif 'rate_limit_exceeded' in error_msg:
                    # เกิน Rate Limit → รอแล้วลองใหม่
                    wait_time = 2 ** attempt  # Exponential backoff
                    time.sleep(wait_time)
                    continue
                
                else:
                    # Error อื่น ๆ
                    log_error(error_msg)
                    return None
            
            return data  # สำเร็จ
        
        except requests.exceptions.Timeout:
            # Timeout → ลองใหม่
            time.sleep(2 ** attempt)
            continue
        
        except requests.exceptions.ConnectionError:
            # Network Error → ลองใหม่
            time.sleep(2 ** attempt)
            continue
    
    # ลองครบแล้วไม่สำเร็จ
    log_error(f"API call failed after {max_retries} retries")
    return None
```

> 💡 **Tip:** ทุก API Call ต้องมี Error Handling และ Retry Logic อย่า assume ว่า API จะสำเร็จเสมอ เครือข่ายอาจล่ม Token อาจหมดอายุ Rate Limit อาจเกิน ระบบที่ดีต้องจัดการทั้งหมดนี้อัตโนมัติ

---

## Best Practices แนวทางปฏิบัติที่ดีที่สุด

### สำหรับนักพัฒนา

**1. ใช้ Sandbox ก่อน Production**
- ทดสอบบน Sandbox Environment
- ทดสอบทุก Flow: Auth, Orders, Products, Shipping, Webhook
- ย้ายไป Production หลังทดสอบครบ

**2. จัดการ Token อัตโนมัติ**
- เก็บ Token ใน Database ไม่ใช่ในโค้ด
- Refresh Token อัตโนมัติก่อนหมดอายุ (14 วัน)
- เก็บ Timestamp ของ Token เพื่อรู้ว่าเมื่อไรหมด

**3. ใช้ Queue สำหรับ Webhook**
- รับ Webhook แล้วเก็บใน Queue (Redis, RabbitMQ)
- ประมวลผลทีหลัง ตอบ 200 ภายใน 5 วินาที
- ป้องกัน Webhook Timeout

**4. จัดการ Rate Limit**
- ใช้ Queue ควบคุมความเร็ว
- ไม่เกิน Limit ตาม Plan
- ใช้ Exponential Backoff เมื่อเกิน Limit

**5. ใช้ Idempotency Key**
- ป้องกัน Duplicate เมื่อ Webhook ส่งซ้ำ
- เก็บ request_id ที่ประมวลผลแล้ว
- ถ้าเจอซ้ำ ข้ามไป

**6. Log ทุก API Call**
- Log request, response, timestamp
- ใช้ตรวจสอบเมื่อมีปัญหา
- เก็บ Log อย่างน้อย 30 วัน

**7. Monitor Webhook Health**
- ตรวจสอบว่า Webhook ยังรับได้
- แจ้งเตือนเมื่อ Webhook ล้มเหลว
- ตั้ง Polling สำรองเมื่อ Webhook หาย

**8. ติดตาม API Changes**
- TikTok Shop ปรับ API เป็นระยะ
- ติดตาม Developer Docs และ Changelog
- อัปเดตโค้ดทันทีเมื่อมี Change

### สำหรับเจ้าของธุรกิจ

**1. เลือกระบบที่มี TikTok Shop API Integration พร้อม**
- ไม่ต้องพัฒนาเอง ประหยัดเวลา 3-6 เดือน
- ทีมงานจัดการ API Changes ให้
- มีซัพพอร์ตเมื่อมีปัญหา

**2. ตั้ง Buffer Stock**
- เก็บสต๊อก 2-3 ชิ้นไว้ไม่ขาย
- ป้องกันขายเกินจากความหน่วง API
- ตั้งในระบบไม่ใช่บน TikTok Shop

**3. ซิงค์สต๊อกเริ่มต้นให้ตรง**
- นับสต๊อกจริงก่อนเริ่ม
- ซิงค์สต๊อกใน ERP และ TikTok Shop ให้ตรง
- ถ้าไม่ตรง ระบบจะผิดตั้งแต่วันแรก

**4. ทดสอบก่อนใช้จริง**
- สั่งทดสอบ ดูสต๊อกลดไหม
- พิมพ์ใบปะหน้าทดสอบ
- อัปเดต Tracking ทดสอบ
- ใช้จริงหลังทดสอบครบ

### Checklist: การพัฒนา TikTok Shop API Integration

- [ ] สมัคร TikTok Shop Developer Center
- [ ] สร้างแอปพลิเคชัน ได้ App Key + Secret
- [ ] เลือกประเภท: Shop App หรือ Multi-Shop App
- [ ] ตั้งค่า OAuth (Authorization URL + Callback)
- [ ] ทดสอบ Authentication บน Sandbox
- [ ] ทดสอบ Orders API บน Sandbox
- [ ] ทดสอบ Products API บน Sandbox
- [ ] ทดสอบ Shipping API บน Sandbox
- [ ] ตั้งค่า Webhook Endpoint (HTTPS)
- [ ] ทดสอบ Webhook รับ Event
- [ ] ทำ Error Handling + Retry Logic
- [ ] ทำ Token Refresh อัตโนมัติ
- [ ] ทำ Rate Limit Management
- [ ] ทำ Logging ทุก API Call
- [ ] ซิงค์สินค้าเริ่มต้น
- [ ] ทดสอบ End-to-End บน Sandbox
- [ ] ย้ายไป Production
- [ ] ทดสอบอีกครั้งบน Production
- [ ] ตั้ง Buffer Stock
- [ ] ฝึกทีมงาน
- [ ] ตั้ง KPI และวัดผล

> ⚠️ **Callout:** การพัฒนา TikTok Shop API Integration เองใช้เวลา 1-3 เดือน ถ้าไม่มีนักพัฒนา ใช้ Business Automation Platform ที่มีพร้อม เช่น CBoom ประหยัดเวลาและค่าใช้จ่าย และทีมงานติดตาม API Changes ให้

---

## คำถามที่พบบ่อย

### 1. TikTok Shop API คืออะไร

TikTok Shop API คือชุดคำสั่งที่ TikTok Shop เปิดให้นักพัฒนาเข้าถึงข้อมูลและฟังก์ชันของ TikTok Shop ผ่านโปรแกรม ผ่าน TikTok Shop Open API ที่เป็นทางการ ใช้ดึงออเดอร์ อัปเดตสต๊อก พิมพ์ใบปะหน้า และอัปเดต Tracking อัตโนมัติ

### 2. TikTok Shop API ต่างจาก Shopee API อย่างไร

โครงสร้างคล้ายกัน แต่ต่างในรายละเอียด เช่น Base URL, Signature Method, Rate Limit, และ Endpoint ถ้าเคยพัฒนา Shopee API ปรับใช้กับ TikTok Shop API ได้เร็ว แต่ต้องอ่าน Docs แยก

### 3. ต้องสมัครอะไรก่อนใช้ TikTok Shop API

ต้องสมัคร TikTok Shop Developer Center สร้างแอปพลิเคชัน (Shop App หรือ Multi-Shop App) แล้วได้ App Key และ App Secret จากนั้นร้านค้าต้องให้สิทธิ์ผ่าน OAuth 2.0

### 4. TikTok Shop API ฟรีไหม

TikTok Shop API ฟรีสำหรับนักพัฒนา แต่มี Rate Limit ตาม Plan (1,000-10,000 req/ชม.) ถ้าต้องการเพิ่ม ติดต่อ TikTok Shop แยก

### 5. Access Token อยู่ได้นานเท่าไร

Access Token อยู่ได้ 14 วัน ต้อง Refresh ก่อนหมดอายุ Refresh Token อยู่ได้ 30 วัน ระบบที่ดีต้อง Refresh อัตโนมัติ

### 6. Webhook ต่างจาก Polling อย่างไร

Webhook คือ TikTok Shop ส่งข้อมูลไปแอปทันทีเมื่อมี Event (Real-time) Polling คือแอปดึงข้อมูลจาก TikTok Shop ทุก 5-15 นาที Webhook เร็วกว่าแต่ต้องมี Server รับ ควรใช้ทั้งสองแบบ

### 7. Rate Limit ของ TikTok Shop API เท่าไร

Rate Limit ขึ้นอยู่กับ Plan (1,000-10,000 req/ชม.) ถ้าเกิน API จะ Block ชั่วคราว ควรใช้ Queue ควบคุมความเร็ว และใช้ Exponential Backoff เมื่อเกิน Limit

### 8. ถ้าไม่มีนักพัฒนา ใช้ TikTok Shop API ได้ไหม

ได้ โดยใช้ Business Automation Platform ที่มี TikTok Shop API Integration พร้อม เช่น CBoom ไม่ต้องพัฒนาเอง เชื่อมร้านค้าได้ทันที

### 9. TikTok Shop API รองรับขนส่งอะไรบ้างในไทย

รองรับ Kerry Express, Flash Express, Thailand Post, J&T Express, DHL, และ Ninja Van ผ่าน Shipping API สามารถพิมพ์ใบปะหน้าและอัปเดต Tracking อัตโนมัติ

### 10. ถ้า TikTok Shop เปลี่ยน API ทำอย่างไร

TikTok Shop ปรับ API เป็นระยะ ถ้าพัฒนาเอง ต้องติดตามและอัปเดต ถ้าใช้ Business Automation Platform ทีมงานจัดการให้ ไม่ต้องกังวล

---

## CBoom ช่วยเรื่อง TikTok Shop API ได้อย่างไร

CBoom มี **CBoom Marketplace** ที่เชื่อม TikTok Shop API พร้อมใช้งาน ไม่ต้องพัฒนาเอง ทีมงานติดตาม API Changes ให้

### ฟีเจอร์หลัก

**Authentication & OAuth**
- ร้านค้าคลิก "เชื่อม TikTok Shop" ครั้งเดียว
- CBoom จัดการ Token อัตโนมัติ
- Refresh Token ก่อนหมดอายุ

**Orders API**
- ดึงออเดอร์ Real-time ผ่าน Webhook
- Polling สำรองทุก 5 นาที
- ออเดอร์เข้า ERP อัตโนมัติ

**Products API**
- ซิงค์สต๊อก Real-time
- อัปเดตราคาจำนวนมาก
- ซิงค์สินค้าใหม่อัตโนมัติ

**Shipping API**
- พิมพ์ใบปะหน้าจากในระบบ
- อัปเดต Tracking Number อัตโนมัติ
- รองรับ Kerry, Flash, Thailand Post, J&T, Ninja Van

**Webhook**
- รับ Event Real-time
- มี Polling สำรอง
- จัดการ Duplicate อัตโนมัติ

**Automation**
- ดึงออเดอร์อัตโนมัติ
- ซิงค์สต๊อกอัตโนมัติ
- พิมพ์ใบปะหน้าอัตโนมัติ
- อัปเดต Tracking อัตโนมัติ

**Error Handling**
- Retry Logic อัตโนมัติ
- แจ้งเตือนเมื่อ API ล้มเหลว
- Log ทุก API Call

### ทำงานร่วมกับโมดูลอื่น

- **CBoom Warehouse** — สต๊อกซิงค์กับ TikTok Shop Real-time ([ดูรายละเอียด](/inventory/))
- **CBoom CRM** — ข้อมูลลูกค้าจาก TikTok Shop เข้า CRM ([ดูรายละเอียด](/crm/))
- **CBoom POS** — สต๊อกหน้าร้านและ TikTok Shop ซิงค์กัน ([ดูรายละเอียด](/pos/))
- **CBoom AI** — วิเคราะห์ยอดขาย TikTok Shop พยากรณ์ความต้องการ ([ดูรายละเอียด](/ai/))
- **Dashboard** — ยอดขาย TikTok Shop และทุกช่องทางในหน้าเดียว

> 💡 **Tip:** CBoom ใช้ TikTok Shop Official API ปลอดภัย ไม่ถูกแบน ทีมงานติดตาม API Changes ให้ ไม่ต้องกังวลเรื่อง Token, Rate Limit, Webhook หรือ Error Handling CBoom จัดการทั้งหมด

ดูราคาและแพ็กเกจ: [CBoom Pricing](/pricing/)

---

## สรุป

TikTok Shop API คือเครื่องมือที่ช่วยธุรกิจจัดการร้านค้าบน TikTok Shop อัตโนมัติ ดึงออเดอร์ ซิงค์สต๊อก พิมพ์ใบปะหน้า และอัปเดต Tracking ผ่านโปรแกรม โดยไม่ต้องเข้า Seller Center

**สิ่งสำคัญที่ต้องรู้:**

- **OAuth 2.0** — ร้านค้าให้สิทธิ์แอปพลิเคชัน ไม่ต้องบอกรหัสผ่าน
- **Orders API** — ดึงออเดอร์ ดูรายละเอียด ยืนยัน ยกเลิก
- **Products API** — จัดการสินค้า อัปเดตสต๊อก แก้ราคา
- **Shipping API** — พิมพ์ใบปะหน้า อัปเดต Tracking เลือกขนส่ง
- **Webhook** — รับ Event Real-time เร็วกว่า Polling
- **Automation** — ดึงออเดอร์ ซิงค์สต๊อก พิมพ์ใบปะหน้า อัตโนมัติ
- **Integration** — เชื่อม TikTok Shop เข้า ERP CRM WMS
- **Common Errors** — ต้องมี Error Handling และ Retry Logic
- **Best Practices** — ใช้ Sandbox, จัดการ Token, ใช้ Queue, Log ทุก Call

**ผลลัพธ์ที่ธุรกิจได้รับ:**
- ลดเวลาจัดการออเดอร์ 85%
- ลดความผิดพลาด 95%
- สต๊อกตรง 99%+
- จัดส่งเร็วขึ้น 40%
- Rating ดีขึ้น อันดับร้านค้าดีขึ้น

ถ้ามีนักพัฒนา พัฒนาเองได้ แต่ถ้าไม่มี ใช้ CBoom ที่มี TikTok Shop API Integration พร้อม ทีมงานคนไทยดูแล ทดลองใช้ฟรี ไม่ต้องใช้บัตรเครดิต

---

## พร้อมเริ่มต้นกับ CBoom หรือยัง

เริ่มต้นใช้งานฟรี หรือดู Live Demo กับทีมงานของเรา เราพร้อมช่วยเชื่อม TikTok Shop เข้ากับระบบธุรกิจของคุณ

- **[ทดลองใช้ฟรี](/demo/)** — เริ่มใช้งานได้ภายใน 5 นาที ไม่ต้องใช้บัตรเครดิต
- **[ดู Live Demo](/demo/)** — สาธิตระบบและตอบคำถามสด
- **[ติดต่อทีมงาน](/contact/)** — ปรึกษาปัญหาและรับคำแนะนำฟรี
- **[ดูราคา](/pricing/)** — แพ็กเกจที่เหมาะกับทุกขนาดธุรกิจ
