'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/lib/config';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = () => {
    const nextLocale = locale === 'en' ? 'tr' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath || `/${nextLocale}`);
    setMenuOpen(false);
  };

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: locale === 'tr' ? 'Hakkımda' : 'About' },
    { href: `/${locale}/blog`, label: t('blog') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          backgroundColor: scrolled ? 'rgba(10,10,10,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="font-display font-bold text-xl transition-opacity hover:opacity-70"
            style={{ color: 'var(--accent)' }}
          >
            {siteConfig.shortName}
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs text-muted hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <button
              id="locale-switcher"
              onClick={switchLocale}
              className="font-mono text-xs px-3 py-1.5 rounded border border-border text-muted hover:border-accent hover:text-accent transition-all duration-200"
            >
              {locale === 'en' ? 'TR' : 'EN'}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-text"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            id="mobile-menu-open"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col bg-bg"
          >
            <div className="flex justify-between items-center h-16 px-6">
              <Link
                href={`/${locale}`}
                className="font-display font-bold text-xl"
                style={{ color: 'var(--accent)' }}
                onClick={() => setMenuOpen(false)}
              >
                {siteConfig.shortName}
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-text"
                aria-label="Close menu"
                id="mobile-menu-close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-10 gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    className="font-display font-bold text-4xl hover:text-accent transition-colors duration-200 text-text"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
                onClick={switchLocale}
                className="self-start font-mono text-sm px-4 py-2 border border-border text-muted rounded hover:border-accent hover:text-accent transition-all duration-200"
              >
                Switch to {locale === 'en' ? 'Turkish / TR' : 'English / EN'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
