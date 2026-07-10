import rss from "@astrojs/rss";

const site = "https://cboom.in.th";

const posts = [
  {
    title: "CBoom คืออะไร? แพลตฟอร์มบริหารธุรกิจอัตโนมัติครบวงจร",
    description: "รู้จัก CBoom แพลตฟอร์มที่รวม CRM, Marketplace, AI, Dashboard และระบบอัตโนมัติไว้ในระบบเดียว",
    pubDate: new Date("2025-01-15"),
    link: "/",
  },
  {
    title: "วิธีเชื่อมต่อ Shopee, TikTok Shop และ Lazada กับ CBoom",
    description: "คู่มือเชื่อมต่อ Marketplace 3 ช่องทางเข้ากับ CBoom ดึงออเดอร์และซิงค์สต๊อกอัตโนมัติ",
    pubDate: new Date("2025-02-01"),
    link: "/marketplace/",
  },
  {
    title: "AI ช่วยพยากรณ์ยอดขายและแนะนำการตัดสินใจให้ธุรกิจคุณ",
    description: "รู้จัก CBoom AI ผู้ช่วยอัจฉริยะที่วิเคราะห์ยอดขาย พยากรณ์เทรนด์ และแนะนำการเติมสต๊อก",
    pubDate: new Date("2025-02-15"),
    link: "/ai/",
  },
  {
    title: "ระบบ CRM สำหรับทีมขาย: จัดการลูกค้าและ Pipeline ในที่เดียว",
    description: "วิธีใช้ CBoom CRM จัดการลีด ลูกค้า และดีลใน Pipeline เดียว ช่วยให้ทีมขายทำงานสอดคล้องกัน",
    pubDate: new Date("2025-03-01"),
    link: "/crm/",
  },
  {
    title: "รายงาน ESG และคาร์บอนฟุตพริ้นท์: จัดทำได้ง่ายกว่าที่คิด",
    description: "CBoom ESG ช่วยติดตามคาร์บอนฟุตพริ้นท์และสร้างรายงานความยั่งยืนที่พร้อมใช้งาน",
    pubDate: new Date("2025-03-15"),
    link: "/esg/",
  },
];

export async function GET(context) {
  return rss({
    title: "CBoom — Business Automation Platform",
    description: "ข่าวสารและบทความเกี่ยวกับ CBoom แพลตฟอร์มบริหารธุรกิจอัตโนมัติ",
    site: context.site ?? site,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: post.pubDate,
      link: post.link,
    })),
    customData: `<language>th</language>`,
  });
}
