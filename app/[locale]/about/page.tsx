import Image from 'next/image';
import PageWrapper from '@/components/ui/PageWrapper';
import { aboutText, certificates, timeline, hobbies, languages } from '@/lib/config';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const bio = aboutText[locale as 'en' | 'tr'] ?? aboutText.en;

  return (
    <PageWrapper>
      <main className="px-6 lg:px-16 py-24 max-w-5xl mx-auto">

        {/* Hero block — fotoğraf + bio */}
        <div className="flex flex-col md:flex-row gap-12 mb-24">
          <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-border flex-shrink-0">
            <Image
              src="/images/avatar.png"
              alt="Emre Ercan"
              width={192}
              height={192}
              className="object-cover w-full h-full transition-all duration-500"
            />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-4xl text-text mb-4">
              <span className="bg-accent text-bg px-2" style={{
                boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone',
                lineHeight: '1.15', display: 'inline', paddingTop: '0.1em', paddingBottom: '0.1em'
              }}>
                {locale === 'tr' ? 'Hakkımda' : 'About me'}
              </span>
            </h1>
            <p className="text-text leading-relaxed font-display text-lg max-w-xl">
              {bio}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <section className="mb-24">
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-8">Timeline</p>
          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  {i < timeline.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                </div>
                <div className="pb-8">
                  <p className="font-mono text-xs text-muted mb-1">{item.year}</p>
                  <p className="font-display font-semibold text-text">{item.title}</p>
                  {item.description && (
                    <p className="font-display text-sm text-muted mt-1">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="mb-24">
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-6">Languages</p>
          <div className="flex flex-col gap-6 max-w-sm">
            {languages.map((lang) => (
              <div key={lang.name}>
                <div className="flex justify-between mb-2">
                  <span className="font-display font-semibold text-text text-sm">{lang.name}</span>
                  <span className="font-mono text-xs text-muted">{lang.level}</span>
                </div>
                <div className="w-full h-px bg-border">
                  <div
                    className="h-px bg-accent transition-all duration-700"
                    style={{ width: `${lang.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hobbies */}
        <section className="mb-24">
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-6">Interests & Hobbies</p>
          <div className="flex flex-wrap gap-3">
            {hobbies.map((hobby) => (
              <span key={hobby} className="font-mono text-sm border border-border px-3 py-1.5 text-muted hover:border-accent hover:text-accent transition-colors duration-200">
                {hobby}
              </span>
            ))}
          </div>
        </section>

        {/* Certificates */}
        {certificates.length > 0 && (
          <section>
            <p className="font-mono text-xs text-muted uppercase tracking-widest mb-6">Credentials</p>
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
          </section>
        )}

      </main>
    </PageWrapper>
  );
}
