import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

function mapFrontmatter(slug, data) {
  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    category: data.category || '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    city: data.city || '',
    readTime: data.readTime || '',
    image: data.image || '',
  };
}

export function getSortedPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory).filter((name) => name.endsWith('.md'));
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return mapFrontmatter(slug, data);
  });

  return posts.sort((a, b) => {
    if (a.date === b.date) return a.title.localeCompare(b.title);
    return a.date < b.date ? 1 : -1;
  });
}

export function getAllPostSlugs() {
  return getSortedPosts().map((post) => post.slug);
}

export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    ...mapFrontmatter(slug, data),
    contentHtml,
  };
}
