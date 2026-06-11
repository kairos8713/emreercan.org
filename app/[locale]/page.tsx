import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { client } from '@/lib/sanity';
import { allProjectsQuery, latestPostsQuery } from '@/lib/queries';
import type { Project, Post } from '@/types';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import BlogPreview from '@/components/sections/BlogPreview';
import PageWrapper from '@/components/ui/PageWrapper';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  return {
    title: t('greeting'),
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  const [projects, posts] = await Promise.all([
    client.fetch<Project[]>(allProjectsQuery).catch(() => [] as Project[]),
    client.fetch<Post[]>(latestPostsQuery(locale, 3)).catch(() => [] as Post[]),
  ]);

  return (
    <PageWrapper>
      <Hero />
      <About />
      <Projects projects={projects} />
      <BlogPreview posts={posts} />
    </PageWrapper>
  );
}
