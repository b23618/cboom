export async function GET({ params, site }) {
  const { slug } = params;
  const baseUrl = site?.href ?? "https://cboom.in.th";

  const titles = {
    home: { title: "CBoom", subtitle: "Business Automation Platform" },
    crm: { title: "CBoom CRM", subtitle: "Sales CRM" },
    marketplace: { title: "CBoom Marketplace", subtitle: "Shopee, TikTok, Lazada" },
    ai: { title: "CBoom AI", subtitle: "AI Business Assistant" },
    esg: { title: "CBoom ESG", subtitle: "Sustainability Reports" },
    pricing: { title: "CBoom Pricing", subtitle: "Plans for every business" },
    contact: { title: "Contact CBoom", subtitle: "Book a Demo" },
    demo: { title: "CBoom Demo", subtitle: "Interactive Dashboard" },
    accounting: { title: "CBoom Accounting", subtitle: "Automated Accounting" },
    hr: { title: "CBoom HR", subtitle: "HR Management" },
    inventory: { title: "CBoom Inventory", subtitle: "Warehouse Management" },
  };

  const data = titles[slug] ?? titles.home;

  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0f0d" />
      <stop offset="100%" style="stop-color:#14532d" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#22c55e" />
      <stop offset="100%" style="stop-color:#16a34a" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect x="0" y="0" width="1200" height="8" fill="url(#accent)" />
  <circle cx="950" cy="400" r="200" fill="#16a34a" opacity="0.08" />
  <circle cx="200" cy="150" r="150" fill="#22c55e" opacity="0.06" />
  <text x="80" y="280" font-family="Inter, sans-serif" font-size="72" font-weight="800" fill="#ffffff">${data.title}</text>
  <text x="80" y="350" font-family="Inter, sans-serif" font-size="32" font-weight="400" fill="#86efac">${data.subtitle}</text>
  <rect x="80" y="400" width="180" height="48" rx="24" fill="#16a34a" />
  <text x="170" y="430" font-family="Inter, sans-serif" font-size="18" font-weight="600" fill="#ffffff" text-anchor="middle">Free Trial</text>
  <text x="80" y="540" font-family="Inter, sans-serif" font-size="20" fill="#6b7280">${baseUrl}</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}

export function getStaticPaths() {
  return [
    { params: { slug: "home" } },
    { params: { slug: "crm" } },
    { params: { slug: "marketplace" } },
    { params: { slug: "ai" } },
    { params: { slug: "esg" } },
    { params: { slug: "pricing" } },
    { params: { slug: "contact" } },
    { params: { slug: "demo" } },
    { params: { slug: "accounting" } },
    { params: { slug: "hr" } },
    { params: { slug: "inventory" } },
  ];
}
