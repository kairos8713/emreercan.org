'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import type { Post } from '@/types';
import Tag from '@/components/ui/Tag';

interface BlogPreviewProps {
  posts: Post[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const t = useTranslations('blog');
  const locale = useLocale();

  return (
    <motion.section
      id="blog-preview"
      className="px-6 lg:px-16 py-16 max-w-7xl mx-auto w-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Section label */}
      <p className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
        03 / Blog
      </p>

      <div className="flex items-end justify-between mb-10">
        <h2 className="text-5xl font-bold font-display leading-none" style={{ margin: "0", marginBottom: "1rem" }}>
          <span
            className="bg-accent text-bg px-2"
            style={{
              boxDecorationBreak: 'clone',
              WebkitBoxDecorationBreak: 'clone',
              lineHeight: '1.15',
              display: 'inline',
              paddingTop: '0.1em',
              paddingBottom: '0.1em',

            }}
          >
            {t('title')}
          </span>
        </h2>
        <Link
          href={`/${locale}/blog`}
          className="font-mono text-sm text-muted hover:text-accent transition-colors duration-200 flex items-center gap-1.5"
        >
          {t('allPosts')} <ArrowRight size={14} />
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted font-mono text-sm">Posts coming soon.</p>
      ) : (
        <div className="flex flex-col divide-y divide-border">
          {posts.map((post, i) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group py-6 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <span className="font-mono text-xs text-muted shrink-0 w-28">
                {formatDate(post.publishedAt)}
              </span>
              <Link
                href={`/${locale}/blog/${post.slug.current}`}
                className="flex-1 min-w-0"
              >
                <h3 className="font-display font-bold text-lg text-text group-hover:text-accent transition-colors duration-200 relative inline-block">
                  {post.title}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                </h3>
              </Link>
              <div className="flex flex-wrap gap-1.5 shrink-0">
                {post.tags?.slice(0, 2).map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
              <Link
                href={`/${locale}/blog/${post.slug.current}`}
                className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 shrink-0"
                aria-label={`Read ${post.title}`}
              >
                <ArrowRight size={16} />
              </Link>
            </motion.article>
          ))}
        </div>
      )}
    </motion.section>
  );
}
