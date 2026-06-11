import { Link2, Mail, Briefcase } from 'lucide-react';
import { siteConfig, footerQuote } from '@/lib/config';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border px-6 lg:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-4"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <p className="font-mono text-xs text-muted">© {year} {siteConfig.name}</p>

      <p className="text-lg font-bold font-display leading-none text-center sm:text-left">
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
          {footerQuote}
        </span>
      </p>

      <div className="flex items-center gap-5">
        {siteConfig.github && (
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors duration-200"
            aria-label="GitHub"
          >
            <Link2 size={18} />
          </a>
        )}
        {siteConfig.linkedin && (
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Briefcase size={18} />
          </a>
        )}
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-muted hover:text-accent transition-colors duration-200"
          aria-label="Email"
        >
          <Mail size={18} />
        </a>
      </div>
    </footer>
  );
}
