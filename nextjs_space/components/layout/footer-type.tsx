'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AshMark } from '@/components/lusion/ash-mark';

/**
 * Footer'daki dev tipografi — scroll ile hafifçe belirginleşen, küllü kabartma işaret.
 */
export function FooterType({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0.03, 0.11]);
  const y = useTransform(scrollYProgress, [0, 1], [12, -12]);

  return (
    <div ref={ref} className="relative">
      <motion.div style={{ opacity, y }} aria-hidden="true">
        <AshMark text={text} variant="dark" className="h-[clamp(2.2rem,6.4vw,7rem)]" />
      </motion.div>
    </div>
  );
}
