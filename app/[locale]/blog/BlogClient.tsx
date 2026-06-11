'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { Post } from '@/types';
import PostCard from '@/components/blog/PostCard';
import Tag from '@/components/ui/Tag';

interface BlogClientProps {
  posts: Post[];
  allTags: string[];
}

export default function BlogClient({ posts, allTags }: BlogClientProps) {
  const t = useTranslations('blog');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.tags?.includes(activeTag))
    : posts;

  return (
    <>
      {/* Tag filter */}
      {allTags.length > 0 && (
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Tag
            label={t('all')}
            active={activeTag === null}
            onClick={() => setActiveTag(null)}
          />
          {allTags.map((tag) => (
            <Tag
              key={tag}
              label={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            />
          ))}
        </motion.div>
      )}

      {/* Post list */}
      <div>
        {filtered.length === 0 ? (
          <p className="text-muted font-mono text-sm py-8">No posts yet.</p>
        ) : (
          filtered.map((post, i) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))
        )}
      </div>
    </>
  );
}
