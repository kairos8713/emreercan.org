import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link2, Briefcase, Mail } from 'lucide-react';
import PageWrapper from '@/components/ui/PageWrapper';
import { siteConfig } from '@/lib/config';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('title'),
    description: t('body'),
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <PageWrapper>
      <div className="px-6 lg:px-16 min-h-screen flex flex-col justify-center py-32 max-w-4xl mx-auto">
        {/* Label */}
        <p className="font-mono text-xs text-muted uppercase tracking-widest mb-8">
          Contact
        </p>

        {/* Big headline */}
        <h1
          className="font-display font-extrabold text-text leading-tight mb-6"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 0.95 }}
        >
          {t('headline')}
        </h1>

        <p className="text-muted text-xl max-w-xl mb-12 leading-relaxed">
          {t('body')}
        </p>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            id="contact-email"
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-3 font-mono text-sm px-6 py-3 rounded border border-accent text-accent hover:bg-accent hover:text-bg transition-all duration-200"
          >
            <Mail size={16} />
            {t('email')}
          </a>

          <a
            id="contact-github"
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-mono text-sm px-6 py-3 rounded border border-border text-muted hover:border-accent hover:text-accent transition-all duration-200"
          >
            <Link2 size={16} />
            {t('github')}
          </a>

          {siteConfig.linkedin && (
            <a
              id="contact-linkedin"
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-mono text-sm px-6 py-3 rounded border border-border text-muted hover:border-accent hover:text-accent transition-all duration-200"
            >
              <Briefcase size={16} />
              {t('linkedin')}
            </a>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
