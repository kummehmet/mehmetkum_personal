import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function ArticleBody({ content }: { content: string }) {
  return (
    <div className="article-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="mt-14 font-display text-2xl font-bold tracking-[-0.02em] text-white md:text-3xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-10 font-display text-xl font-bold tracking-[-0.02em] text-white">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mt-5 text-[15px] leading-[1.85] text-white/70 md:text-base">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mt-5 space-y-2 text-[15px] leading-relaxed text-white/70 md:text-base">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-5 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-white/70 md:text-base">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="marker:text-fire marker:font-mono">{children}</li>
          ),
          strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
          em: ({ children }) => <em className="text-white/80">{children}</em>,
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-fire underline decoration-fire/40 underline-offset-4 transition-colors hover:decoration-fire"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-10 border-l-2 border-fire bg-white/[0.03] px-6 py-5 font-display text-lg italic leading-relaxed text-white/85 md:text-xl">
              {children}
            </blockquote>
          ),
          pre: ({ children }) => (
            <pre className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-[#0b0b0f] p-5 text-[13px] leading-relaxed text-white/80">
              {children}
            </pre>
          ),
          code: ({ children, className }) => {
            const isBlock = Boolean(className);
            if (!isBlock) {
              return (
                <code className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em] text-fire">
                  {children}
                </code>
              );
            }
            return <code className={`font-mono ${className ?? ''}`}>{children}</code>;
          },
          hr: () => <hr className="my-12 border-white/10" />,
          img: ({ src, alt }) => (
            <img src={typeof src === 'string' ? src : ''} alt={alt ?? ''} className="mt-8 rounded-2xl" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
