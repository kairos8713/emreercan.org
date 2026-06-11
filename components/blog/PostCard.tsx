'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import type { Post } from '@/types';
import Tag from '@/components/ui/Tag';

interface PostCardProps {
  post: Post;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function PostCard({ post }: PostCardProps) {
  const locale = useLocale();

  return (
    <article className="group flex flex-col sm:flex-row sm:items-center gap-4 py-6 border-b border-border">
      {/* Date */}
      <time
        dateTime={post.publishedAt}
        className="font-mono text-xs text-muted shrink-0 w-28"
      >
        {formatDate(post.publishedAt)}
      </time>

      {/* Title */}
      <Link
        href={`/${locale}/blog/${post.slug.current}`}
        className="flex-1 min-w-0"
        id={`post-${post.slug.current}`}
      >
        <h2 className="font-display font-bold text-xl text-text group-hover:text-accent transition-colors duration-200 relative inline-block">
          {post.title}
          <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
        </h2>
      </Link>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 shrink-0">
        {post.tags?.slice(0, 3).map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>

      {/* Arrow */}
      <Link
        href={`/${locale}/blog/${post.slug.current}`}
        className="text-muted group-hover:text-accent group-hover:translate-x-1.5 transition-all duration-200 shrink-0"
        aria-label={`Read ${post.title}`}
      >
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}
