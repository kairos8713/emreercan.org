import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { client } from '@/lib/sanity';
import { postBySlugQuery, allPostSlugsQuery } from '@/lib/queries';
import type { Post } from '@/types';
import PostBody from '@/components/blog/PostBody';
import Tag from '@/components/ui/Tag';
import PageWrapper from '@/components/ui/PageWrapper';
import { ArrowLeft } from 'lucide-react';
export const dynamic = 'force-dynamic'
// Step 17: ISR — revalidate every 60 seconds
export const revalidate = 60;

interface PostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Step 17: Static params generation
export async function generateStaticParams(): Promise<
  Array<{ locale: string; slug: string }>
> {
  const posts = await client
    .fetch<Array<{ slug: { current: string }; locale: string }>>(allPostSlugsQuery)
    .catch(() => []);

  return posts.map((post) => ({
    locale: post.locale,
    slug: post.slug.current,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await client
    .fetch<Post>(postBySlugQuery(slug, locale))
    .catch(() => null);

  if (!post) return { title: 'Post not found' };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { locale, slug } = await params;

  const post = await client
    .fetch<Post>(postBySlugQuery(slug, locale))
    .catch(() => null);

  if (!post) notFound();

  return (
    <PageWrapper>
      <article className="px-6 lg:px-16 py-32 max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors duration-200 mb-12"
        >
          <ArrowLeft size={14} />
          All posts
        </Link>

        {/* Title */}
        <h1
          className="font-display font-extrabold text-text leading-none mb-6"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
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
            {post.title}
          </span>
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-10 pb-8 border-b border-border">
          <time className="font-mono text-xs text-muted" dateTime={post.publishedAt}>
            {formatDate(post.publishedAt, locale)}
          </time>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        {post.body && post.body.length > 0 ? (
          <PostBody body={post.body} />
        ) : (
          <p className="text-muted">Content coming soon.</p>
        )}
      </article>
    </PageWrapper>
  );
}
