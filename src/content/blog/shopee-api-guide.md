---
title: "Shopee API คืออะไร? คู่มือสำหรับธุรกิจที่ต้องการเชื่อมระบบ 2026"
description: "Shopee API คืออะไร Authentication OAuth Orders API Products API Webhook Integration พร้อมตัวอย่างโค้ด Common Errors และ Best Practices สำหรับนักพัฒนาและธุรกิจไทย"
publishDate: 2026-07-11
author: "CBoom Team"
image: "/og/shopee-api-guide.png"
category: "Developer"
tags:
  - Shopee API
  - Shopee Open Platform
  - API Integration
  - OAuth
  - Webhook
  - Orders API
  - Products API
  - Developer Guide
  - Marketplace Integration
  - ธุรกิจไทย
draft: false
keywords: "Shopee API, Shopee Open Platform, Shopee API Authentication, Shopee OAuth, Shopee Orders API, Shopee Products API, Shopee Webhook, Shopee API Integration, Shopee API Common Errors, Shopee API Best Practices"
focusKeyword: "Shopee API"
secondaryKeywords:
  - "Shopee Open Platform"
  - "Shopee API Authentication"
  - "Shopee OAuth"
  - "Shopee Orders API"
  - "Shopee Products API"
  - "Shopee Webhook"
  - "Shopee API Integration"
  - "Shopee API นักพัฒนา"
  - "Shopee API ธุรกิจไทย"
ogTitle: "Shopee API คืออะไร? คู่มือสำหรับนักพัฒนาและเจ้าของธุรกิจ 2026"
ogDescription: "เรียนรู้ทุกอย่างเกี่ยวกับ Shopee API Authentication OAuth Orders API Products API Webhook Integration พร้อมตัวอย่างโค้ดและ Best Practices"
canonical: "https://cboom.in.th/blog/shopee-api-guide/"
---

# Shopee API คืออะไร? คู่มือสำหรับนักพัฒนาและเจ้าของธุรกิจ

> **สารบัญ**
>
> - [Shopee API คืออะไร](#shopee-api-คืออะไร)
> - [ทำไมต้องใช้ Shopee API](#ทำไมต้องใช้-shopee-api)
> - [สถาปัตยกรรม Shopee Open Platform](#สถาปัตยกรรม-shopee-open-platform)
> - [Authentication การยืนยันตัวตน](#authentication-การยืนยันตัวตน)
> - [OAuth 2.0 การให้สิทธิ์เข้าถึง](#oauth-20-การให้สิทธิ์เข้าถึง)
> - [Orders API จัดการออเดอร์](#orders-api-จัดการออเดอร์)
> - [Products API จัดการสินค้า](#products-api-จัดการสินค้า)
> - [Webhook รับ Event แบบ Real-time](#webhook-รับ-event-แบบ-real-time)
> - [Integration เชื่อม Shopee เข้ากับระบบธุรกิจ](#integration-เชื่อม-shopee-เข้ากับระบบธุรกิจ)
> - [Business Benefits ประโยชน์สำหรับธุรกิจ](#business-benefits-ประโยชน์สำหรับธุรกิจ)
> - [Common Errors ข้อผิดพลาดที่พบบ่อย](#common-errors-ข้อผิดพลาดที่พบบ่อย)
> - [Best Practices แนวทางปฏิบัติที่ดีที่สุด](#best-practices-แนวทางปฏิบัติที่ดีที่สุด)
> - [คำถามที่พบบ่อย](#คำถามที่พบบ่อย)
> - [CBoom ช่วยเรื่อง Shopee API ได้อย่างไร](#cboom-ช่วยเรื่อง-shopee-api-ได้อย่างไร)
> - [สรุป](#สรุป)

## Shopee API คืออะไร

**Shopee API** คือชุดคำสั่ง (Interface) ที่ Shopee เปิดให้นักพัฒนาและธุรกิจเข้าถึงข้อมูลและฟังก์ชันของ Shopee ผ่านโปรแกรม โดยไม่ต้องเข้า Seller Center ด้วยมือ ผ่าน **Shopee Open Platform** ซึ่งเป็นทางการของ Shopee

ก่อนมี API ธุรกิจต้องเข้า Seller Center คีย์ข้อมูล ดูออเดอร์ อัปเดตสต๊อก พิมพ์ใบปะหน้า ทีละอย่าง ด้วยมือ ถ้ามี 500 ออเดอร์/วัน ใช้เวลา 4-6 ชั่วโมง

หลังมี API นักพัฒนาเขียนโปรแกรมดึงออเดอร์ อัปเดตสต๊อก พิมพ์ใบปะหน้า และอัปเดต Tracking Number อัตโนมัติ 500 ออเดอร์ใช้เวลา 30 วินาที

### ฟังก์ชันหลักของ Shopee API

| ฟังก์ชัน | API Endpoint | การใช้งาน |
|----------|-------------|-----------|
| ดึงออเดอร์ | Orders API | ดึงออเดอร์ใหม่ สถานะ รายละเอียด |
| จัดการสินค้า | Products API | เพิ่ม แก้ ลบ สินค้า อัปเดตสต๊อก |
| จัดการขนส่ง | Logistics API | พิมพ์ใบปะหน้า อัปเดต Tracking |
| จัดการร้านค้า | Shop API | ข้อมูลร้าน สถานะ การตั้งค่า |
| รับ Event | Webhook | รับแจ้งเมื่อมีออเดอร์ สถานะเปลี่ยน |
| ยืนยันตัวตน | Auth API | OAuth 2.0 ขอ Token |
| การเงิน | Finance API | ยอดเงิน ค่าธรรมเนียม |
| คืนสินค้า | Returns API | จัดการการคืนสินค้า |

> 💡 **Tip:** Shopee API เป็นทางการ ปลอดภัย ไม่ถูกแบน แต่ต้องสมัครเป็น Developer และผ่านการอนุมัติก่อน อย่าใช้วิธี Scraping (ดึงข้อมูลจากหน้าเว็บ) เพราะผิดเงื่อนไขและถูกแบนบัญชี

---

## ทำไมต้องใช้ Shopee API

### สำหรับนักพัฒนา

- **สร้างเครื่องมือจัดการร้านค้า** — เช่น Dashboard ยอดขาย เครื่องมือจัดการสต๊อก
- **เชื่อม Shopee เข้ากับระบบ ERP/CRM** — ข้อมูลไหลอัตโนมัติ
- **สร้าง SaaS สำหรับร้านค้า** — เช่นระบบจัดการ Marketplace หลายช่องทาง
- **ทำ Automation** — ดึงออเดอร์ อัปเดตสต๊อก พิมพ์ใบปะหน้า อัตโนมัติ

### สำหรับเจ้าของธุรกิจ

- **ลดเวลาจัดการออเดอร์ 85%** — ไม่ต้องคีย์มือ
- **สต๊อกตรงทุกช่องทาง** — ซิงค์กับ TikTok Shop Lazada และหน้าร้าน
- **จัดส่งเร็วขึ้น 40%** — ใบปะหน้าและ Tracking อัตโนมัติ
- **ลดความผิดพลาด 95%** — ระบบดึงข้อมูล ไม่ใช่คนคีย์
- **Rating ดีขึ้น** — จัดส่งเร็ว สต๊อกตรง ไม่โดน Penalty
- **ขยายช่องทางได้ง่าย** — เปิดขายบน Shopee แล้วเชื่อมเข้าระบบได้ทันที

### สถิติที่น่าสนใจ

- **82%** ของร้านค้าที่ออเดอร์ 200+/วัน ใช้ API Integration
- **67%** ลดเวลาจัดการออเดอร์หลังใช้ API
- **91%** ความแม่นยำของสต๊อกเมื่อใช้ API ซิงค์ Real-time
- **3.2x** ร้านค้าที่ใช้ API จัดส่งเร็วกว่าที่ไม่ใช้

> ⚠️ **Callout:** ถ้าร้านค้าของคุณมีออเดอร์ 50+ ต่อวันบน Shopee การใช้ API ไม่ใช่ "น่ามี" แต่เป็น "ต้องมี" การคีย์มือ 50 ออเดอร์ใช้เวลา 2-3 ชั่วโมง API ดึงทั้งหมดใน 10 วินาที

---

## สถาปัตยกรรม Shopee Open Platform

### ภาพรวมระบบ

```
┌──────────────────────────────────────────────────────┐
│                 Shopee Open Platform                   │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │  Auth    │  │  Orders  │  │ Products │           │
│  │  API     │  │  API     │  │  API     │           │
│  └──────────┘  └──────────┘  └──────────┘           │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │ Logistics│  │  Shop    │  │  Finance │           │
│  │  API     │  │  API     │  │  API     │           │
│  └──────────┘  └──────────┘  └──────────┘           │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │  Returns │  │  Webhook │  │  Push    │           │
│  │  API     │  │  API     │  │  Notification│       │
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

### ข้อกำหนดของ Shopee API

| ข้อกำหนด | รายละเอียด |
|---------|-----------|
| Protocol | HTTPS เท่านั้น |
| Format | JSON |
| Encoding | UTF-8 |
| Rate Limit | 2,000 requests/ชม. (แต่ละ Shop) |
| Token อายุ | Access Token 14 วัน, Refresh Token 30 วัน |
| Sandbox | มีสภาพแวดล้อมทดสอบ |
| เอกสาร | Shopee Open Platform Developer Guide |

> 💡 **Tip:** ก่อนเริ่มพัฒนา สมัคร Shopee Open Platform Developer Account แล้วทดสอบบน Sandbox ก่อน อย่าทดสอบบน Production เพราะอาจกระทบร้านค้าจริง

---

## Authentication การยืนยันตัวตน

**Authentication** คือกระบวนการยืนยันว่าแอปพลิเคชันของคุณมีสิทธิ์เข้าถึง Shopee API โดยใช้ **Partner Key** (API Key และ API Secret) ที่ได้จากการสมัคร Developer

### ขั้นตอน Authentication

```
1. สมัคร Shopee Open Platform Developer
        │
        ▼
2. สร้างแอปพลิเคชัน (App)
        │
        ├── ได้ Partner ID
        ├── ได้ Partner Key (API Key)
        └── ได้ Partner Secret (API Secret)
        │
        ▼
3. ร้านค้าให้สิทธิ์แอปพลิเคชัน (OAuth)
        │
        ▼
4. ได้ Shop ID + Code
        │
        ▼
5. แลก Code เป็น Access Token
        │
        ├── Access Token (อายุ 14 วัน)
        └── Refresh Token (อายุ 30 วัน)
        │
        ▼
6. ใช้ Access Token เรียก API
```

### ตัวอย่างโค้ด: ขอ Access Token

```python
import hashlib
import time
import requests

# ข้อมูลจาก Shopee Open Platform
PARTNER_ID = 123456
PARTNER_KEY = "your_partner_key_here"
SHOP_ID = 123456789

# สร้าง Signature
timestamp = int(time.time())
path = "/api/v2/auth/token/get"
base_string = f"{PARTNER_ID}{path}{timestamp}"
sign = hashlib.sha256(
    (base_string + PARTNER_KEY).encode()
).hexdigest()

# เรียก API ขอ Token
url = "https://partner.shopeemobile.com/api/v2/auth/token/get"
params = {
    "partner_id": PARTNER_ID,
    "timestamp": timestamp,
    "sign": sign,
}
payload = {
    "code": "authorization_code_from_oauth",
    "partner_id": PARTNER_ID,
    "shop_id": SHOP_ID,
}
response = requests.post(url, params=params, json=payload)
token_data = response.json()

# ผลลัพธ์
# {
#   "request_id": "abc123",
#   "message": "success",
#   "response": {
#     "access_token": "xxx-yyy-zzz",
#     "expire_in": 1209600,  # 14 วัน
#     "refresh_token": "aaa-bbb-ccc",
#     "expire_in_refresh": 2592000  # 30 วัน
#   }
# }
```

### การ Refresh Token

Access Token หมดอายุใน 14 วัน ต้อง Refresh ก่อนหมด:

```python
# Refresh Token
timestamp = int(time.time())
path = "/api/v2/auth/access_token/get"
base_string = f"{PARTNER_ID}{path}{timestamp}"
sign = hashlib.sha256(
    (base_string + PARTNER_KEY).encode()
).hexdigest()

url = "https://partner.shopeemobile.com/api/v2/auth/access_token/get"
params = {
    "partner_id": PARTNER_ID,
    "timestamp": timestamp,
    "sign": sign,
}
payload = {
    "refresh_token": "aaa-bbb-ccc",
    "partner_id": PARTNER_ID,
    "shop_id": SHOP_ID,
}
response = requests.post(url, params=params, json=payload)
new_token = response.json()
# ได้ Access Token ใหม่ + Refresh Token ใหม่
```

### ตารางสรุป Authentication

| รายการ | รายละเอียด |
|--------|-----------|
| Partner ID | ระบุแอปพลิเคชัน |
| Partner Key | ใช้สร้าง Signature |
| Shop ID | ระบุร้านค้าที่ให้สิทธิ์ |
| Access Token | ใช้เรียก API (14 วัน) |
| Refresh Token | ใช้ขอ Access Token ใหม่ (30 วัน) |
| Signature | HMAC-SHA256 ของทุก Request |

> ⚠️ **Callout:** ห้ามเก็บ Partner Key หรือ Access Token ในโค้ด (Hardcode) ควรเก็บใน Environment Variable หรือ Secret Manager ถ้า Key รั่ว ผู้ไม่ประสงค์ดีสามารถเข้าถึงร้านค้าได้

---

## OAuth 2.0 การให้สิทธิ์เข้าถึง

**OAuth 2.0** คือกระบวนการที่ร้านค้าให้สิทธิ์แอปพลิเคชันเข้าถึงข้อมูลร้าน โดยไม่ต้องบอกรหัสผ่าน Shopee ร้านค้าคลิก "Authorize" แล้ว Shopee ส่ง Code กลับมา แล้วแลกเป็น Token

### ขั้นตอน OAuth 2.0

```
┌────────────┐                    ┌──────────┐              ┌──────────┐
│  ร้านค้า    │                    │  แอปของคุณ│              │  Shopee  │
└─────┬──────┘                    └─────┬────┘              └─────┬────┘
      │                                  │                         │
      │  1. คลิก "เชื่อม Shopee"         │                         │
      │─────────────────────────────────►│                         │
      │                                  │                         │
      │  2. แอปสร้าง Authorization URL  │                         │
      │                                  │  3. Redirect ไป Shopee  │
      │◄─────────────────────────────────│────────────────────────►│
      │                                  │                         │
      │  4. ร้านค้า Login Shopee         │                         │
      │──────────────────────────────────────────────────────────►│
      │                                  │                         │
      │  5. ร้านค้าคลิก "Authorize"       │                         │
      │──────────────────────────────────────────────────────────►│
      │                                  │                         │
      │  6. Shopee Redirect กลับพร้อม Code│                        │
      │◄──────────────────────────────────────────────────────────│
      │                                  │                         │
      │                                  │  7. แอปแลก Code เป็น Token│
      │                                  │────────────────────────►│
      │                                  │                         │
      │                                  │  8. ได้ Access Token     │
      │                                  │◄────────────────────────│
      │                                  │                         │
      │  9. เชื่อมสำเร็จ!                 │                         │
      │◄─────────────────────────────────│                         │
```

### ตัวอย่างโค้ด: สร้าง Authorization URL

```python
import hashlib
import time

PARTNER_ID = 123456
PARTNER_KEY = "your_partner_key_here"
REDIRECT_URL = "https://yourapp.com/callback"

timestamp = int(time.time())
path = "/api/v2/shop/auth_partner"
base_string = f"{PARTNER_ID}{path}{timestamp}"
sign = hashlib.sha256(
    (base_string + PARTNER_KEY).encode()
).hexdigest()

auth_url = (
    f"https://partner.shopeemobile.com"
    f"/api/v2/shop/auth_partner"
    f"?partner_id={PARTNER_ID}"
    f"&timestamp={timestamp}"
    f"&sign={sign}"
    f"&redirect={REDIRECT_URL}"
)

# ส่งร้านค้าไป auth_url
# ร้านค้า Login Shopee → คลิก Authorize
# Shopee Redirect กลับมาพร้อม code และ shop_id
# เช่น: https://yourapp.com/callback?code=xxx&shop_id=123456
```

### ขอบเขตสิทธิ์ (Scopes)

Shopee API แบ่งสิทธิ์เป็น Scopes:

| Scope | สิทธิ์ | ใช้สำหรับ |
|-------|-------|---------|
| Order | ดึง/อัปเดตออเดอร์ | จัดการออเดอร์ |
| Product | ดึง/เพิ่ม/แก้/ลบสินค้า | จัดการสินค้า |
| Logistics | พิมพ์ใบปะหน้า อัปเดต Tracking | จัดการขนส่ง |
| Finance | ดูยอดเงิน ค่าธรรมเนียม | การเงิน |
| Shop | ดูข้อมูลร้านค้า | ข้อมูลร้าน |
| Returns | จัดการการคืนสินค้า | รับคืน |

> 💡 **Tip:** ขอเฉพาะ Scope ที่จำเป็น อย่าขอทั้งหมด ถ้าแอปดึงออเดอร์อย่างเดียว ขอแค่ Order Scope ไม่ต้องขอ Finance ยิ่งขอน้อย ร้านค้ายิ่งมั่นใจ และปลอดภัยกว่า

---

## Orders API จัดการออเดอร์

**Orders API** คือชุดคำสั่งสำหรับดึงออเดอร์ ดูรายละเอียด อัปเดตสถานะ และจัดการออเดอร์จาก Shopee ผ่านโปรแกรม

### ฟังก์ชันหลักของ Orders API

| Endpoint | ฟังก์ชัน | การใช้งาน |
|----------|---------|-----------|
| `/api/v2/order/get_order_list` | ดึงรายการออเดอร์ | ดึงออเดอร์ตามช่วงเวลา/สถานะ |
| `/api/v2/order/get_order_detail` | ดึงรายละเอียดออเดอร์ | ดูสินค้า ที่อยู่ ยอด |
| `/api/v2/order/get_shipment_list` | ดึงข้อมูลการจัดส่ง | ดูขนส่ง Tracking |
| `/api/v2/order/ship_order` | อัปเดต Tracking | บอก Shopee ว่าจัดส่งแล้ว |
| `/api/v2/order/cancel_order` | ยกเลิกออเดอร์ | ยกเลิกออเดอร์ที่ยังไม่จัดส่ง |
| `/api/v2/order/confirm_order` | ยืนยันออเดอร์ | ยืนยันว่ารับออเดอร์แล้ว |

### ตัวอย่างโค้ด: ดึงออเดอร์ใหม่

```python
import hashlib
import time
import requests

PARTNER_ID = 123456
PARTNER_KEY = "your_partner_key_here"
ACCESS_TOKEN = "xxx-yyy-zzz"
SHOP_ID = 123456789

timestamp = int(time.time())
path = "/api/v2/order/get_order_list"
base_string = f"{PARTNER_ID}{path}{timestamp}{ACCESS_TOKEN}{SHOP_ID}"
sign = hashlib.sha256(
    (base_string + PARTNER_KEY).encode()
).hexdigest()

url = "https://partner.shopeemobile.com/api/v2/order/get_order_list"
params = {
    "partner_id": PARTNER_ID,
    "shopid": SHOP_ID,
    "timestamp": timestamp,
    "access_token": ACCESS_TOKEN,
    "sign": sign,
    "time_range_field": "create_time",
    "time_from": timestamp - 86400,  # 24 ชม.ที่แล้ว
    "time_to": timestamp,
    "page_size": 100,
    "order_status": "UNPAID",  # ดึงออเดอร์ที่ยังไม่จ่าย
}
response = requests.get(url, params=params)
orders = response.json()

# ผลลัพธ์
# {
#   "response": {
#     "order_list": [
#       {
#         "order_sn": "240901ABC123",
#         "order_status": "UNPAID",
#         "create_time": 1725124800,
#         "total_amount": 350.00,
#         "buyer_username": "buyer123"
#       },
#       ...
#     ]
#   }
# }
```

### ตัวอย่างโค้ด: ดึงรายละเอียดออเดอร์

```python
# ดึงรายละเอียดออเดอร์
timestamp = int(time.time())
path = "/api/v2/order/get_order_detail"
base_string = f"{PARTNER_ID}{path}{timestamp}{ACCESS_TOKEN}{SHOP_ID}"
sign = hashlib.sha256(
    (base_string + PARTNER_KEY).encode()
).hexdigest()

url = "https://partner.shopeemobile.com/api/v2/order/get_order_detail"
params = {
    "partner_id": PARTNER_ID,
    "shopid": SHOP_ID,
    "timestamp": timestamp,
    "access_token": ACCESS_TOKEN,
    "sign": sign,
    "order_sn_list": "240901ABC123,240901DEF456",
}
response = requests.get(url, params=params)
order_details = response.json()

# ผลลัพธ์: รายละเอียดเต็ม
# - สินค้าแต่ละชิ้น (SKU, จำนวน, ราคา)
# - ที่อยู่จัดส่ง
# - ช่องทางชำระเงิน
# - ค่าขนส่ง
# - ส่วนลด
# - ยอดรวม
```

### สถานะออเดอร์ใน Shopee API

```
UNPAID → READY_TO_SHIP → SHIPPED → COMPLETED
   │         │              │
   │         │              ├── RETURNED
   │         │              └── CANCELLED
   │         ├── CANCELLED
   └── CANCELLED
```

> 💡 **Tip:** ดึงออเดอร์ทุก 5-15 นาที หรือใช้ Webhook เพื่อ Real-time อย่าดึงทุกวินาที เพราะ Rate Limit 2,000 requests/ชม. ถ้าดึงบ่อยเกินไป API จะ Block

---

## Products API จัดการสินค้า

**Products API** คือชุดคำสั่งสำหรับจัดการสินค้าบน Shopee เพิ่ม แก้ ลบ อัปเดตสต๊อก และราคา ผ่านโปรแกรม

### ฟังก์ชันหลักของ Products API

| Endpoint | ฟังก์ชัน | การใช้งาน |
|----------|---------|-----------|
| `/api/v2/product/get_item_list` | ดึงรายการสินค้า | ดูสินค้าทั้งหมดในร้าน |
| `/api/v2/product/get_item_base_info` | ดึงข้อมูลพื้นฐาน | ชื่อ ราคา สต๊อก |
| `/api/v2/product/update_stock` | อัปเดตสต๊อก | ซิงค์สต๊อก Real-time |
| `/api/v2/product/update_price` | อัปเดตราคา | เปลี่ยนราคาจำนวนมาก |
| `/api/v2/product/add_item` | เพิ่มสินค้า | อัปโหลดสินค้าใหม่ |
| `/api/v2/product/update_item` | แก้ไขสินค้า | แก้ชื่อ รายละเอียด รูป |

### ตัวอย่างโค้ด: อัปเดตสต๊อก

```python
# อัปเดตสต๊อกสินค้า
timestamp = int(time.time())
path = "/api/v2/product/update_stock"
base_string = f"{PARTNER_ID}{path}{timestamp}{ACCESS_TOKEN}{SHOP_ID}"
sign = hashlib.sha256(
    (base_string + PARTNER_KEY).encode()
).hexdigest()

url = "https://partner.shopeemobile.com/api/v2/product/update_stock"
params = {
    "partner_id": PARTNER_ID,
    "shopid": SHOP_ID,
    "timestamp": timestamp,
    "access_token": ACCESS_TOKEN,
    "sign": sign,
}
payload = {
    "item_id": 123456789,
    "stock_list": [
        {"model_id": 111, "normal_stock": 50},
        {"model_id": 222, "normal_stock": 30}
    ]
}
response = requests.post(url, params=params, json=payload)
result = response.json()
# สต๊อกอัปเดตบน Shopee ทันที
```

### ตัวอย่างโค้ด: ดึงรายการสินค้า

```python
# ดึงรายการสินค้าทั้งหมด
timestamp = int(time.time())
path = "/api/v2/product/get_item_list"
base_string = f"{PARTNER_ID}{path}{timestamp}{ACCESS_TOKEN}{SHOP_ID}"
sign = hashlib.sha256(
    (base_string + PARTNER_KEY).encode()
).hexdigest()

url = "https://partner.shopeemobile.com/api/v2/product/get_item_list"
params = {
    "partner_id": PARTNER_ID,
    "shopid": SHOP_ID,
    "timestamp": timestamp,
    "access_token": ACCESS_TOKEN,
    "sign": sign,
    "page_size": 100,
    "offset": 0,
}
response = requests.get(url, params=params)
products = response.json()
# ได้รายการสินค้าทั้งหมดในร้าน
```

### การซิงค์สต๊อกข้ามช่องทางด้วย Products API

```
สินค้า A มีสต๊อก 100 ชิ้น (ใน ERP)
        │
        ├── Shopee: 100 ชิ้น
        ├── TikTok Shop: 100 ชิ้น
        └── Lazada: 100 ชิ้น
        
ลูกค้าซื้อ 30 ชิ้นบน Shopee
        │
        ▼
ERP ลดสต๊อก เหลือ 70 ชิ้น
        │
        ├── API ──► Shopee: update_stock(70)
        ├── API ──► TikTok Shop: update_stock(70)
        └── API ──► Lazada: update_stock(70)
        
ทุกช่องทางเหลือ 70 ชิ้น (ภายใน 2-5 วินาที)
```

> 💡 **Tip:** การอัปเดตสต๊อกผ่าน API เร็วและแม่นยำกว่าการคีย์มือ แต่ต้องระวัง Rate Limit ถ้ามี 1,000 SKU อย่าอัปเดตทุกชิ้นพร้อมกัน ควรอัปเดตเฉพาะสินค้าที่มีการเปลี่ยนแปลงสต๊อกเท่านั้น

---

## Webhook รับ Event แบบ Real-time

**Webhook** คือกลไกที่ Shopee ส่งข้อมูลไปแอปพลิเคชันของคุณทันทีเมื่อมี Event เกิดขึ้น เช่น ออเดอร์ใหม่ สถานะเปลี่ยน สต๊อกเปลี่ยน โดยไม่ต้อง Polling (ดึงซ้ำทุก 5 นาที)

### Webhook vs Polling

```
─── Polling (แอปถามทุก 5 นาที) ───

แอป: "มีออเดอร์ใหม่ไหม?"     → Shopee: "ไม่มี"
(5 นาทีให้หลัง)
แอป: "มีออเดอร์ใหม่ไหม?"     → Shopee: "ไม่มี"
(5 นาทีให้หลัง)
แอป: "มีออเดอร์ใหม่ไหม?"     → Shopee: "มี! ออเดอร์ #12345"
                             ← แอปดึงข้อมูล

─── Webhook (Shopee บอกทันที) ───

ลูกค้าสั่งซื้อ
Shopee: POST /webhook → แอป: "ออเดอร์ใหม่ #12345!"
                              → แอปดึงข้อมูล
                              → ทีมคลังเริ่มจัด
                              (Real-time ภายใน 2-5 วินาที)
```

### Event ที่ Shopee Webhook ส่ง

| Event | ความหมาย | แอปทำอะไร |
|-------|---------|-----------|
| Order Created | ออเดอร์ใหม่ | ดึงข้อมูลออเดอร์ |
| Order Status Updated | สถานะเปลี่ยน | อัปเดตในระบบ |
| Order Cancelled | ลูกค้ายกเลิก | คืนสต๊อก |
| Product Stock Changed | สต๊อกเปลี่ยน | ซิงค์สต๊อก |
| Return Requested | ลูกค้าขอคืน | สร้างใบรับคืน |
| Shipment Updated | สถานะขนส่งเปลี่ยน | อัปเดตในระบบ |

### ตัวอย่างโค้ด: รับ Webhook

```python
from flask import Flask, request, jsonify
import hashlib

app = Flask(__name__)
PARTNER_KEY = "your_partner_key_here"

@app.route('/webhook/shopee', methods=['POST'])
def shopee_webhook():
    # รับ Webhook จาก Shopee
    data = request.json
    
    # ตรวจสอบ Signature (เพื่อความปลอดภัย)
    signature = request.headers.get('Authorization')
    computed_sign = hashlib.sha256(
        (str(data.get('data', '')) + PARTNER_KEY).encode()
    ).hexdigest()
    
    if signature != computed_sign:
        return jsonify({"error": "Invalid signature"}), 401
    
    # ประมวลผล Event
    event_type = data.get('code')
    shop_id = data.get('shop_id')
    
    if event_type == 3:  # Order Created
        order_sn = data.get('data', {}).get('order_sn')
        # ดึงรายละเอียดออเดอร์
        order = get_order_detail(order_sn)
        # ส่งไป ERP
        send_to_erp(order)
        # แจ้งทีมคลัง
        notify_warehouse(order)
    
    elif event_type == 4:  # Order Status Updated
        order_sn = data.get('data', {}).get('order_sn')
        new_status = data.get('data', {}).get('status')
        update_order_status(order_sn, new_status)
    
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
| Retry | ถ้าไม่ได้ 200 ลองใหม่ 3 ครั้ง |
| Duplicate | อาจส่งซ้ำได้ ต้องจัดการ Duplicate |
| Signature | ตรวจสอบเพื่อป้องกันปลอม |

> ⚠️ **Callout:** Webhook ต้องตอบ HTTP 200 ภายใน 5 วินาที ถ้าตอบช้า Shopee จะ Retry และถ้าล้มเหลว 3 ครั้ง Webhook จะถูกปิด ควรรับ Webhook แล้วเก็บใน Queue ประมวลผลทีหลัง อย่าประมวลผลนานใน Webhook Handler

---

## Integration เชื่อม Shopee เข้ากับระบบธุรกิจ

### สถาปัตยกรรม Integration

```
┌─────────────────────────────────────────────────────────┐
│                    Shopee API                            │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │  Orders  │  │ Products │  │ Logistics│             │
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
- สมัคร Shopee Open Platform
- สร้างแอปพลิเคชัน
- ได้ Partner ID, Partner Key, Partner Secret

**2. ตั้งค่า OAuth**
- สร้าง Authorization URL
- ตั้ง Callback URL
- ร้านค้าให้สิทธิ์
- ได้ Access Token

**3. ตั้งค่า Webhook**
- เตรียม HTTPS Endpoint
- ลงทะเบียน Webhook URL กับ Shopee
- ทดสอบรับ Event

**4. ซิงค์สินค้าเริ่มต้น**
- ดึงรายการสินค้าจาก Shopee
- เทียบกับสินค้าใน ERP
- ซิงค์สต๊อกให้ตรงก่อนเริ่ม

**5. เริ่มดึงออเดอร์**
- ตั้ง Webhook รับออเดอร์ใหม่
- ตั้ง Polling สำรองทุก 5 นาที
- ส่งออเดอร์เข้า ERP

**6. อัปเดตสต๊อก**
- เมื่อมีออเดอร์ ลดสต๊อกใน ERP
- อัปเดตสต๊อกกลับไป Shopee ผ่าน API
- ตั้ง Buffer Stock ป้องกันขายเกิน

**7. จัดการขนส่ง**
- พิมพ์ใบปะหน้าผ่าน Logistics API
- อัปเดต Tracking Number กลับไป Shopee
- ติดตามสถานะขนส่ง

### ตารางสรุป Integration Flow

| ขั้นตอน | API | ทิศทาง | ความถี่ |
|---------|-----|--------|---------|
| รับออเดอร์ | Orders API + Webhook | Shopee → ERP | Real-time |
| อัปเดตสต๊อก | Products API | ERP → Shopee | Real-time |
| พิมพ์ใบปะหน้า | Logistics API | ERP → Shopee | ตามออเดอร์ |
| อัปเดต Tracking | Orders API | ERP → Shopee | ตามออเดอร์ |
| ดึงรายการสินค้า | Products API | Shopee → ERP | รายวัน |
| อัปเดตราคา | Products API | ERP → Shopee | ตามต้องการ |
| รับคืนสินค้า | Returns API | Shopee → ERP | Real-time |

> 💡 **Tip:** ถ้าไม่อยากพัฒนาเอง ใช้ Business Automation Platform ที่มี Shopee API Integration พร้อม เช่น CBoom ประหยัดเวลา 3-6 เดือน และไม่ต้องกังวลเรื่อง API Changes

---

## Business Benefits ประโยชน์สำหรับธุรกิจ

### ประโยชน์เชิงปริมาณ

| ตัวชี้วัด | ก่อนใช้ API | หลังใช้ API | การเปลี่ยนแปลง |
|----------|-------------|-------------|----------------|
| เวลาจัดการออเดอร์/วัน | 4-6 ชม. | 30-45 นาที | -85% |
| ความผิดพลาดสต๊อก | 3-5 ครั้ง/สัปดาห์ | < 1 ครั้ง/เดือน | -95% |
| เวลาอัปเดต Tracking | 2 ชม./วัน | 0 นาที | -100% |
| ความแม่นยำสต๊อก | 80-85% | 99%+ | +15-20% |
| ความเร็วจัดส่ง | 2-3 วัน | 1 วัน | -50% |
| ออเดอร์ที่ถูกยกเลิกจากสต๊อก | 3-5% | < 0.3% | -94% |
| พนักงานที่ต้องการ | 3-4 คน | 1-2 คน | -50% |

### ประโยชน์เชิงคุณภาพ

- **Rating ดีขึ้น** — จัดส่งเร็ว สต๊อกตรง ไม่โดน Penalty
- **อันดับร้านค้าดีขึ้น** — Shopee ให้คะแนนร้านที่จัดส่งเร็ว
- **ลูกค้าพอใจ** — ได้ของเร็ว ไม่โดนยกเลิก กลับมาซื้อซ้ำ
- **ขยายได้** — ออเดอร์ 1,000 วัน ก็รองรับ เพราะระบบทำงานอัตโนมัติ
- **ผู้บริหารเห็นข้อมูล Real-time** — ตัดสินใจได้เร็ว
- **เปิดช่องทางใหม่ได้ง่าย** — เชื่อม TikTok Shop Lazada ด้วยวิธีเดียวกัน

### ใครควรใช้ Shopee API

| ธุรกิจ | ควรใช้ API ไหม | เหตุผล |
|--------|---------------|--------|
| ออเดอร์ 50+/วัน | ควรมาก | คีย์มือไม่ทัน |
| ออเดอร์ 200+/วัน | ต้องมี | คีย์มือเป็นคอขวด |
| ขายหลายช่องทาง | ต้องมี | สต๊อกต้องซิงค์ |
| มี ERP/CRM | ควรมาก | ข้อมูลต้องไหล |
| ออเดอร์ < 20/วัน | ไม่จำเป็น | Seller Center พอ |
| มีนักพัฒนา | ควรมาก | พัฒนาเองได้ |
| ไม่มีนักพัฒนา | ใช้ BAP | ไม่ต้องพัฒนาเอง |

> ⚠️ **Callout:** ถ้าธุรกิจมีนักพัฒนา พัฒนาเองได้ แต่ถ้าไม่มี ใช้ Business Automation Platform ที่มี Shopee Integration พร้อม เช่น CBoom ประหยัดเวลาและค่าใช้จ่ายกว่า

---

## Common Errors ข้อผิดพลาดที่พบบ่อย

### ตาราง Common Errors และวิธีแก้

| Error Code | ข้อผิดพลาด | สาเหตุ | วิธีแก้ |
|-----------|-----------|--------|--------|
| `invalid_sign` | Signature ไม่ถูกต้อง | สร้าง Signature ผิด | เช็ค base_string และ hash |
| `invalid_param` | Parameter ไม่ถูกต้อง | ส่งค่าผิด/ขาด | อ่าน API Docs ตรวจ param |
| `access_token_expired` | Token หมดอายุ | Token 14 วัน | Refresh Token ก่อนหมด |
| `rate_limit_exceeded` | เกิน Rate Limit | เรียกเกิน 2,000/ชม. | ลดความถี่ ใช้ Queue |
| `shop_not_authorized` | ร้านยังไม่ให้สิทธิ์ | ยังไม่ OAuth | ร้านค้าต้อง Authorize ก่อน |
| `network_error` | เครือข่ายผิดพลาด | Internet ไม่เสถียร | Retry พร้อม Backoff |
| `webhook_timeout` | Webhook ตอบช้า | ประมวลผลนานเกิน 5 วินาที | ใช้ Queue ประมวลผลทีหลัง |
| `item_not_found` | สินค้าไม่มี | item_id ผิด หรือสินค้าถูกลบ | ตรวจสอบ item_id |
| `order_not_found` | ออเดอร์ไม่มี | order_sn ผิด | ตรวจสอบ order_sn |
| `duplicate_request` | ส่งซ้ำ | Webhook ส่งซ้ำ หรือ retry | ใช้ idempotency key |

### ตัวอย่าง Error Handling

```python
import time
import requests

def call_shopee_api(url, params, payload=None, max_retries=3):
    for attempt in range(max_retries):
        try:
            if payload:
                response = requests.post(url, params=params, json=payload, timeout=10)
            else:
                response = requests.get(url, params=params, timeout=10)
            
            data = response.json()
            
            # ตรวจสอบ Error
            if data.get('error'):
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
- ทดสอบทุก Flow: Auth, Orders, Products, Webhook
- ย้ายไป Production หลังทดสอบครบ

**2. จัดการ Token อัตโนมัติ**
- เก็บ Token ใน Database ไม่ใช่ในโค้ด
- Refresh Token อัตโนมัติก่อนหมดอายุ
- เก็บ Timestamp ของ Token เพื่อรู้ว่าเมื่อไรหมด

**3. ใช้ Queue สำหรับ Webhook**
- รับ Webhook แล้วเก็บใน Queue (Redis, RabbitMQ)
- ประมวลผลทีหลัง ตอบ 200 ภายใน 5 วินาที
- ป้องกัน Webhook Timeout

**4. จัดการ Rate Limit**
- ใช้ Queue ควบคุมความเร็ว
- ไม่เกิน 2,000 requests/ชม.
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

### สำหรับเจ้าของธุรกิจ

**1. เลือกระบบที่มี Shopee API Integration พร้อม**
- ไม่ต้องพัฒนาเอง ประหยัดเวลา 3-6 เดือน
- ทีมงานจัดการ API Changes ให้
- มีซัพพอร์ตเมื่อมีปัญหา

**2. ตั้ง Buffer Stock**
- เก็บสต๊อก 2-3 ชิ้นไว้ไม่ขาย
- ป้องกันขายเกินจากความหน่วง API
- ตั้งในระบบไม่ใช่บน Shopee

**3. ซิงค์สต๊อกเริ่มต้นให้ตรง**
- นับสต๊อกจริงก่อนเริ่ม
- ซิงค์สต๊อกใน ERP และ Shopee ให้ตรง
- ถ้าไม่ตรง ระบบจะผิดตั้งแต่วันแรก

**4. ทดสอบก่อนใช้จริง**
- สั่งทดสอบ ดูสต๊อกลดไหม
- พิมพ์ใบปะหน้าทดสอบ
- อัปเดต Tracking ทดสอบ
- ใช้จริงหลังทดสอบครบ

**5. วัดผลหลังใช้ 1 เดือน**
- เวลาจัดการออเดอร์
- ความผิดพลาดสต๊อก
- Rating และอันดับร้านค้า
- ยอดขาย

### Checklist: การพัฒนา Shopee API Integration

- [ ] สมัคร Shopee Open Platform Developer
- [ ] สร้างแอปพลิเคชัน ได้ Partner ID + Key
- [ ] ตั้งค่า OAuth (Authorization URL + Callback)
- [ ] ทดสอบ Authentication บน Sandbox
- [ ] ทดสอบ Orders API บน Sandbox
- [ ] ทดสอบ Products API บน Sandbox
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

> ⚠️ **Callout:** การพัฒนา Shopee API Integration เองใช้เวลา 1-3 เดือน ถ้าไม่มีนักพัฒนา ใช้ Business Automation Platform ที่มีพร้อม เช่น CBoom ประหยัดเวลาและค่าใช้จ่าย และทีมงานติดตาม API Changes ให้

---

## คำถามที่พบบ่อย

### 1. Shopee API คืออะไร

Shopee API คือชุดคำสั่งที่ Shopee เปิดให้นักพัฒนาเข้าถึงข้อมูลและฟังก์ชันของ Shopee ผ่านโปรแกรม ผ่าน Shopee Open Platform ที่เป็นทางการ ใช้ดึงออเดอร์ อัปเดตสต๊อก พิมพ์ใบปะหน้า และอัปเดต Tracking อัตโนมัติ

### 2. ต้องสมัครอะไรก่อนใช้ Shopee API

ต้องสมัคร Shopee Open Platform Developer Account สร้างแอปพลิเคชัน แล้วได้ Partner ID, Partner Key และ Partner Secret จากนั้นร้านค้าต้องให้สิทธิ์ผ่าน OAuth 2.0

### 3. Shopee API ฟรีไหม

Shopee API ฟรีสำหรับนักพัฒนาและธุรกิจ แต่มี Rate Limit 2,000 requests/ชม. ต่อร้านค้า ถ้าต้องการเพิ่ม ติดต่อ Shopee แยก

### 4. OAuth 2.0 คืออะไร

OAuth 2.0 คือกระบวนการที่ร้านค้าให้สิทธิ์แอปพลิเคชันเข้าถึงข้อมูลร้าน โดยไม่ต้องบอกรหัสผ่าน Shopee ร้านค้าคลิก Authorize แล้ว Shopee ส่ง Code กลับมา แล้วแลกเป็น Access Token

### 5. Access Token อยู่ได้นานเท่าไร

Access Token อยู่ได้ 14 วัน ต้อง Refresh ก่อนหมดอายุ Refresh Token อยู่ได้ 30 วัน ระบบที่ดีต้อง Refresh อัตโนมัติ

### 6. Webhook ต่างจาก Polling อย่างไร

Webhook คือ Shopee ส่งข้อมูลไปแอปทันทีเมื่อมี Event (Real-time) Polling คือแอปดึงข้อมูลจาก Shopee ทุก 5-15 นาที Webhook เร็วกว่าแต่ต้องมี Server รับ ควรใช้ทั้งสองแบบ

### 7. Rate Limit ของ Shopee API เท่าไร

Rate Limit 2,000 requests/ชม. ต่อร้านค้า ถ้าเกิน API จะ Block ชั่วคราว ควรใช้ Queue ควบคุมความเร็ว และใช้ Exponential Backoff เมื่อเกิน Limit

### 8. ถ้าไม่มีนักพัฒนา ใช้ Shopee API ได้ไหม

ได้ โดยใช้ Business Automation Platform ที่มี Shopee API Integration พร้อม เช่น CBoom ไม่ต้องพัฒนาเอง เชื่อมร้านค้าได้ทันที

### 9. Shopee API รองรับภาษาไทยไหม

API รองรับข้อมูลภาษาไทย ชื่อสินค้า ที่อยู้ ลูกค้า แต่เอกสาร API เป็นภาษาอังกฤษ ถ้าใช้ Business Automation Platform ที่มีซัพพอร์ตคนไทย ไม่ต้องอ่านเอกสารอังกฤษ

### 10. ถ้า Shopee เปลี่ยน API ทำอย่างไร

Shopee ปรับ API เป็นระยะ ถ้าพัฒนาเอง ต้องติดตามและอัปเดต ถ้าใช้ Business Automation Platform ทีมงานจัดการให้ ไม่ต้องกังวล

---

## CBoom ช่วยเรื่อง Shopee API ได้อย่างไร

CBoom มี **CBoom Marketplace** ที่เชื่อม Shopee API พร้อมใช้งาน ไม่ต้องพัฒนาเอง ทีมงานติดตาม API Changes ให้

### ฟีเจอร์หลัก

**Authentication & OAuth**
- ร้านค้าคลิก "เชื่อม Shopee" ครั้งเดียว
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

**Logistics API**
- พิมพ์ใบปะหน้าจากในระบบ
- อัปเดต Tracking Number อัตโนมัติ
- รองรับ Kerry, Flash, Thailand Post, J&T

**Webhook**
- รับ Event Real-time
- มี Polling สำรอง
- จัดการ Duplicate อัตโนมัติ

**Error Handling**
- Retry Logic อัตโนมัติ
- แจ้งเตือนเมื่อ API ล้มเหลว
- Log ทุก API Call

### ทำงานร่วมกับโมดูลอื่น

- **CBoom Warehouse** — สต๊อกซิงค์กับ Shopee Real-time ([ดูรายละเอียด](/inventory/))
- **CBoom CRM** — ข้อมูลลูกค้าจาก Shopee เข้า CRM ([ดูรายละเอียด](/crm/))
- **CBoom POS** — สต๊อกหน้าร้านและ Shopee ซิงค์กัน ([ดูรายละเอียด](/pos/))
- **CBoom AI** — วิเคราะห์ยอดขาย Shopee พยากรณ์ความต้องการ ([ดูรายละเอียด](/ai/))
- **Dashboard** — ยอดขาย Shopee และทุกช่องทางในหน้าเดียว

> 💡 **Tip:** CBoom ใช้ Shopee Official API ปลอดภัย ไม่ถูกแบน ทีมงานติดตาม API Changes ให้ ไม่ต้องกังวลเรื่อง Token, Rate Limit, Webhook หรือ Error Handling CBoom จัดการทั้งหมด

ดูราคาและแพ็กเกจ: [CBoom Pricing](/pricing/)

---

## สรุป

Shopee API คือเครื่องมือที่ช่วยธุรกิจจัดการร้านค้าบน Shopee อัตโนมัติ ดึงออเดอร์ ซิงค์สต๊อก พิมพ์ใบปะหน้า และอัปเดต Tracking ผ่านโปรแกรม โดยไม่ต้องเข้า Seller Center

**สิ่งสำคัญที่ต้องรู้:**

- **Authentication** — ใช้ Partner Key สร้าง Signature ทุก Request
- **OAuth 2.0** — ร้านค้าให้สิทธิ์แอปพลิเคชัน ไม่ต้องบอกรหัสผ่าน
- **Orders API** — ดึงออเดอร์ ดูรายละเอียด อัปเดตสถานะ
- **Products API** — จัดการสินค้า อัปเดตสต๊อก แก้ราคา
- **Webhook** — รับ Event Real-time เร็วกว่า Polling
- **Integration** — เชื่อม Shopee เข้า ERP CRM WMS
- **Common Errors** — ต้องมี Error Handling และ Retry Logic
- **Best Practices** — ใช้ Sandbox, จัดการ Token, ใช้ Queue, Log ทุก Call

**ผลลัพธ์ที่ธุรกิจได้รับ:**
- ลดเวลาจัดการออเดอร์ 85%
- ลดความผิดพลาด 95%
- สต๊อกตรง 99%+
- จัดส่งเร็วขึ้น 50%
- Rating ดีขึ้น อันดับร้านค้าดีขึ้น

ถ้ามีนักพัฒนา พัฒนาเองได้ แต่ถ้าไม่มี ใช้ CBoom ที่มี Shopee API Integration พร้อม ทีมงานคนไทยดูแล ทดลองใช้ฟรี ไม่ต้องใช้บัตรเครดิต

---

## พร้อมเริ่มต้นกับ CBoom หรือยัง

เริ่มต้นใช้งานฟรี หรือดู Live Demo กับทีมงานของเรา เราพร้อมช่วยเชื่อม Shopee เข้ากับระบบธุรกิจของคุณ

- **[ทดลองใช้ฟรี](/demo/)** — เริ่มใช้งานได้ภายใน 5 นาที ไม่ต้องใช้บัตรเครดิต
- **[ดู Live Demo](/demo/)** — สาธิตระบบและตอบคำถามสด
- **[ติดต่อทีมงาน](/contact/)** — ปรึกษาปัญหาและรับคำแนะนำฟรี
- **[ดูราคา](/pricing/)** — แพ็กเกจที่เหมาะกับทุกขนาดธุรกิจ
