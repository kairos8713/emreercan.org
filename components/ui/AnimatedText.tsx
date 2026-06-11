'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] as [number, number, number, number] },
  },
};

export default function AnimatedText({ text, className, delay = 0 }: AnimatedTextProps) {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
  }, []);

  const words = text.split(' ');

  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      style={{ display: 'inline' }}
      variants={container}
      initial="hidden"
      animate="show"
      transition={{ delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={item}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
