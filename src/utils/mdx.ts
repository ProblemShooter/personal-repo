import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content/blogs');

export type BlogPostFrontmatter = {
  title: string;
  date: string;
  readTime: string;
  preview: string;
  tags: string[];
  category: string;
  color: string;
};

export type BlogPost = BlogPostFrontmatter & {
  slug: string;
  content: string;
};

export function getAllPosts(): BlogPost[] {
  // Check if directory exists, if not, return empty array
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      return {
        slug,
        ...(matterResult.data as BlogPostFrontmatter),
        content: matterResult.content,
      };
    });

  // Sort posts by date (this is a simple string sort, you might want to parse dates for accuracy)
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) return undefined;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    slug,
    ...(matterResult.data as BlogPostFrontmatter),
    content: matterResult.content,
  };
}
