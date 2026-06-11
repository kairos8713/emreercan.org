'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import { siteConfig, heroTagline } from '@/lib/config';

export default function Hero() {
  const locale = useLocale() as 'en' | 'tr';
  const tagline = heroTagline[locale] ?? heroTagline.en;
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
  }, []);

  const fadeUp = prefersReduced
    ? {}
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="relative min-h-screen flex flex-col px-6 lg:px-16 pt-24 pb-12">
      {/* Available for work badge */}
      {siteConfig.availableForWork && (
        <motion.div
          className="flex items-center gap-2 self-start"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span
            className="w-2 h-2 rounded-full pulse-dot"
            style={{ backgroundColor: '#22c55e' }}
          />
          <span className="font-mono text-xs text-muted uppercase tracking-widest">
            {locale === 'tr' ? 'Yeni projeler için müsaitim' : 'Available for work'}
          </span>
        </motion.div>
      )}

      {/* Main hero text */}
      <div className="flex-1 flex flex-col justify-center py-16">
        <h1 className="font-display font-extrabold text-text leading-none text-[clamp(2rem,5vw,5rem)]">
          <AnimatedText text={`${tagline.line1}\n${tagline.line2}`} delay={0.15} />
        </h1>

        <div
          className="font-display font-bold text-text mt-6"
          style={{ fontSize: 'clamp(1.4rem, 3.5vw, 3rem)', lineHeight: 1.15 }}
        >
          <AnimatedText text={tagline.sub} delay={0.35} />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="self-end flex items-center gap-2 text-muted"
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}
