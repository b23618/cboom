import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

const site = "https://cboom.in.th";

// Keep in sync with the product pages in src/pages/ and plans in src/components/Pricing.astro.
const pages = [
  ["CRM", "/crm/", "ระบบจัดการลูกค้า Lead และ Sales Pipeline"],
  ["Marketplace", "/marketplace/", "เชื่อม Shopee, TikTok Shop, Lazada ดึงออเดอร์และซิงค์สต๊อก"],
  ["AI", "/ai/", "AI ช่วยวิเคราะห์ข้อมูลและทำงานอัตโนมัติ"],
  ["ESG", "/esg/", "ติดตามและรายงานคาร์บอนและ ESG"],
  ["ราคา", "/pricing/", "Starter ฿990/เดือน (3 ผู้ใช้), Growth ฿2,900/เดือน (10 ผู้ใช้), Enterprise เริ่มต้น ฿9,900/เดือน (ผู้ใช้ไม่จำกัด, เปิด API ของตัวเองได้)"],
  ["ติดต่อ", "/contact/", "ติดต่อฝ่ายขายและขอทดลองใช้"],
] as const;

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );

  const body = [
    "# CBoom",
    "",
    "> CBoom คือ Business Automation Platform สำหรับธุรกิจไทย รวม CRM, Marketplace, Warehouse, POS, AI, ESG Dashboard และ Automation ไว้ในระบบเดียว เชื่อมต่อ Shopee, TikTok Shop และ Lazada",
    "",
    "เนื้อหาเป็นภาษาไทย ชื่อผลิตภัณฑ์และฟีเจอร์เป็นภาษาอังกฤษ",
    "",
    "## ผลิตภัณฑ์และราคา",
    "",
    ...pages.map(([name, path, desc]) => `- [${name}](${site}${path}): ${desc}`),
    "",
    "## บทความและคู่มือ",
    "",
    ...posts.map((p) => `- [${p.data.title}](${site}/blog/${p.id}/): ${p.data.description}`),
    "",
    "## อื่น ๆ",
    "",
    `- [Sitemap](${site}/sitemap-index.xml)`,
    `- [RSS](${site}/rss.xml)`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
