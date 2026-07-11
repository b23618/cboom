import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

const site = "https://cboom.in.th";

export async function GET(context) {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const sortedPosts = posts.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );

  return rss({
    title: "CBoom — Business Automation Platform",
    description: "บทความและคู่มือเกี่ยวกับ CBoom แพลตฟอร์มบริหารธุรกิจอัตโนมัติ",
    site: context.site ?? site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>th</language>`,
  });
}
