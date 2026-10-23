'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Footer'daki dev tipografi — scroll ile yavaşça ortaya çıkar.
 */
export function FooterType({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.p
        style={{ opacity, y }}
        aria-hidden="true"
        className="select-none whitespace-nowrap text-center font-display text-[18vw] font-bold leading-[0.85] tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.22)]"
      >
        {text}
      </motion.p>
    </div>
  );
}
