import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MDXComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 mt-12 first:mt-0" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-10" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3 mt-8" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-xl md:text-2xl font-semibold text-white mb-3 mt-6" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-base md:text-lg text-neutral-300 mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link
      href={href || '#'}
      className="text-purple-400 hover:text-purple-300 underline transition-colors"
      {...props}
    >
      {children}
    </Link>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside text-neutral-300 mb-4 space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside text-neutral-300 mb-4 space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-base md:text-lg leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-purple-500 bg-purple-500/5 pl-6 py-4 my-6 italic text-neutral-300"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-neutral-800 text-purple-300 px-2 py-1 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 overflow-x-auto mb-6 text-sm"
      {...props}
    >
      {children}
    </pre>
  ),
  img: ({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (typeof src === 'string') {
      return (
        <div className="my-8 rounded-lg overflow-hidden">
          <Image
            src={src}
            alt={alt || ''}
            width={1200}
            height={600}
            className="w-full h-auto"
          />
        </div>
      );
    }
    return (
      <div className="my-8 rounded-lg overflow-hidden">
        <img
          src={(src as unknown) as string}
          alt={alt || ''}
          className="w-full h-auto"
        />
      </div>
    );
  },
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="border-neutral-800 my-8" {...props} />
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-neutral-800" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="border border-neutral-800 bg-neutral-900 px-4 py-2 text-left text-white font-semibold" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-neutral-800 px-4 py-2 text-neutral-300" {...props}>
      {children}
    </td>
  ),
};

export default MDXComponents;
