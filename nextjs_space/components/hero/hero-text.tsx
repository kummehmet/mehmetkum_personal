'use client';

import { motion, useReducedMotion } from 'framer-motion';

function splitLetters(text: string) {
  let index = 0;
  return text.split(' ').map((word) => {
    const chars = Array.from(word).map((char) => ({ char, index: index++ }));
    index += 1;
    return chars;
  });
}

export function HeroText({ text, className = '' }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const words = splitLetters(text);

  return (
    <h1 className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <span
            key={`word-${wordIndex}`}
            className="inline-block overflow-hidden pb-[0.08em] align-bottom"
          >
            {word.map(({ char, index }) => (
              <motion.span
                key={`${char}-${index}`}
                className="inline-block"
                initial={reduce ? false : { y: '112%' }}
                animate={{ y: '0%' }}
                transition={{
                  delay: reduce ? 0 : 0.25 + index * 0.035,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
            {wordIndex < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
          </span>
        ))}
      </span>
    </h1>
  );
}
