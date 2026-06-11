import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { client } from '@/lib/sanity';
import { allPostsQuery } from '@/lib/queries';
import type { Post } from '@/types';
import PageWrapper from '@/components/ui/PageWrapper';
import BlogClient from './BlogClient';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  const posts = await client
    .fetch<Post[]>(allPostsQuery(locale))
    .catch(() => [] as Post[]);

  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tags ?? []))
  ).sort();

  return (
    <PageWrapper>
      <div className="px-6 lg:px-16 py-32 max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
            Writing
          </p>
          <h1 className="font-display font-extrabold text-text leading-none mb-4"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
            {t('title')}
          </h1>
          <p className="text-muted text-lg">{t('subtitle')}</p>
        </header>

        <BlogClient posts={posts} allTags={allTags} />
      </div>
    </PageWrapper>
  );
}
