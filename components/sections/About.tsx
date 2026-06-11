'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Tag from '@/components/ui/Tag';
import { techStack, aboutText, certificates } from '@/lib/config';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as [number, number, number, number] },
  },
};

export default function About() {
  const t = useTranslations('about');
  const locale = useLocale() as 'en' | 'tr';
  const bio = aboutText[locale] ?? aboutText.en;

  return (
    <motion.section
      id="about"
      className="px-6 lg:px-16 py-16 max-w-7xl mx-auto w-full"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {/* Section label */}
      <p className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
        01 / About
      </p>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Bio */}
        <div>
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
          <p className="text-muted leading-relaxed text-lg">{bio}</p>
        </div>

        {/* Tech stack */}
        <div>
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
            Tech I work with
          </p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <Tag key={tech} label={tech} />
            ))}
          </div>

          {/* Certificates — sadece dolu olduğunda render et */}
          {certificates.length > 0 && (
            <div className="mt-12">
              <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
                Credentials
              </p>
              <div className="flex flex-col gap-3">
                {certificates.map((cert) => (
                  <div key={cert.title} className="flex items-center justify-between border border-border p-4 hover:border-accent transition-colors duration-200">
                    <div>
                      <p className="font-display font-semibold text-text text-sm">{cert.title}</p>
                      <p className="font-mono text-xs text-muted">{cert.issuer} · {cert.year}</p>
                    </div>
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer"
                        className="font-mono text-xs text-accent hover:underline">
                        View ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
