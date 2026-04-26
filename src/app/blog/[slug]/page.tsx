import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/utils/mdx";
import { blogPosts as fallbackPosts } from "@/data/blogs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/utils/cn";
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  const posts = getAllPosts();
  const mdSlugs = posts.map((post) => ({ slug: post.slug }));
  const fallbackSlugs = fallbackPosts
    .filter(p => !posts.some(md => md.slug === p.slug))
    .map(p => ({ slug: p.slug }));
    
  return [...mdSlugs, ...fallbackSlugs];
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post = getPostBySlug(slug);

  if (!post) {
    // Fallback to dummy data
    post = fallbackPosts.find((p) => p.slug === slug) as any;
  }

  if (!post) {
    notFound();
  }

  return (
    <article className="pt-32 pb-24 flex flex-col items-start w-full max-w-4xl mx-auto px-6">
      <Link 
        href="/blog" 
        className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors font-jetbrains text-sm mb-12"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      <div className="w-full flex flex-col mb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="bg-primary/10 text-primary font-jetbrains text-xs font-bold px-3 py-1 uppercase rounded-full border border-primary/20">
            {post.category}
          </span>
          <span className="font-jetbrains text-xs text-foreground/50">
            {post.date} • {post.readTime}
          </span>
        </div>

        <h1 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold text-heading uppercase tracking-tight leading-tight mb-8">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-2 mb-12">
          {post.tags.map(tag => (
            <span key={tag} className="border border-white/10 px-3 py-1.5 text-xs font-jetbrains text-foreground/70 uppercase bg-white/[0.02]">
              {tag}
            </span>
          ))}
        </div>

        {/* Decorative Divider */}
        <div className={cn("w-full h-1 relative overflow-hidden mb-12 rounded", post.color || 'bg-primary/10 border-primary/50')}>
          <div className="absolute inset-0 opacity-50 bg-current"></div>
        </div>

        <div className="prose prose-invert prose-primary prose-lg max-w-none font-jetbrains text-foreground/80 leading-relaxed">
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Bottom Back Button */}
      <div className="w-full mt-8 pt-12 border-t border-white/10 flex justify-center">
        <Link 
          href="/blog" 
          className="flex items-center gap-2 bg-primary text-black font-jetbrains font-bold px-8 py-4 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,212,255,0.4)] uppercase"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blog Section
        </Link>
      </div>
    </article>
  );
}
