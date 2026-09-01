import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  city: string;
  readTime: string;
  image: string;
};

export type Post = PostMeta & {
  contentHtml: string;
};

function mapFrontmatter(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: typeof data.title === "string" ? data.title : "",
    description: typeof data.description === "string" ? data.description : "",
    date: typeof data.date === "string" ? data.date : "",
    category: typeof data.category === "string" ? data.category : "",
    tags: Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === "string") : [],
    city: typeof data.city === "string" ? data.city : "",
    readTime: typeof data.readTime === "string" ? data.readTime : "",
    image: typeof data.image === "string" ? data.image : "",
  };
}

export function getSortedPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory).filter((name) => name.endsWith(".md"));
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return mapFrontmatter(slug, data);
  });

  return posts.sort((a, b) => {
    if (a.date === b.date) return a.title.localeCompare(b.title);
    return a.date < b.date ? 1 : -1;
  });
}

export function getAllPostSlugs(): string[] {
  return getSortedPosts().map((post) => post.slug);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    ...mapFrontmatter(slug, data),
    contentHtml,
  };
}
