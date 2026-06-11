'use client';

import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface PostBodyProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-display font-extrabold text-text">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display font-bold" style={{ color: 'var(--accent)' }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display font-semibold text-text">{children}</h3>
    ),
    normal: ({ children }) => <p className="text-muted">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-4 italic text-muted" style={{ borderColor: 'var(--accent)' }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline underline-offset-4 hover:text-accent-dim transition-colors"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="font-mono bg-card px-1.5 py-0.5 rounded text-accent text-sm">
        {children}
      </code>
    ),
    strong: ({ children }) => <strong className="text-text font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${value.asset._ref
              .replace('image-', '')
              .replace(/-(\w+)$/, '.$1')}`}
            alt={value.alt ?? ''}
            className="rounded-lg w-full"
          />
          {value.caption && (
            <figcaption className="text-center font-mono text-xs text-muted mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => (
      <div className="my-6">
        <SyntaxHighlighter
          language={value?.language ?? 'typescript'}
          style={vscDarkPlus}
          customStyle={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
          }}
        >
          {value?.code ?? ''}
        </SyntaxHighlighter>
      </div>
    ),
  },
};

export default function PostBody({ body }: PostBodyProps) {
  return (
    <div className="prose">
      <PortableText value={body} components={components} />
    </div>
  );
}
