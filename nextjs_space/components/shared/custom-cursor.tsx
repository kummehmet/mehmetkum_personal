'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Masaüstünde özel imleç. Görünürlük CSS ile sınırlanır:
 * `.cursor-layer` yalnızca pointer:fine ve hareket azaltma kapalıyken görünür.
 */
export function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 26, stiffness: 260, mass: 0.5 });
  const ringY = useSpring(y, { damping: 26, stiffness: 260, mass: 0.5 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest('a, button, [data-cursor="hover"]')));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [x, y]);

  return (
    <div className="cursor-layer pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute -left-5 -top-5 h-10 w-10 rounded-full border border-white/40"
        animate={{ scale: hovering ? 1.7 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
      <motion.div
        style={{ x, y }}
        className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-fire"
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
