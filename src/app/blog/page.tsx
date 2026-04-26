import { getAllPosts } from "@/utils/mdx";
import BlogClient from "@/components/sections/BlogClient";
import { blogPosts as fallbackPosts } from "@/data/blogs";

export default function BlogPage() {
  const mdPosts = getAllPosts();
  
  // Merge markdown posts with dummy data
  // We filter out any dummy data that has the same slug as a markdown post
  const combinedPosts = [
    ...mdPosts,
    ...fallbackPosts.filter(p => !mdPosts.some(md => md.slug === p.slug))
  ];

  return <BlogClient posts={combinedPosts as any} />;
}
