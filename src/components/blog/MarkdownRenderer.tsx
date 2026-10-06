import React from 'react';

interface MarkdownRendererProps {
  content: string;
  isDark?: boolean;
}

/**
 * Helper untuk mem-parse format inline (Bold, Italic, Inline Code, Link)
 */
function renderInlineFormatting(text: string): React.ReactNode {
  // Regex memecah inline tokens:
  // 1. Link [text](url)
  // 2. Bold+Italic ***text***
  // 3. Bold **text**
  // 4. Italic *text* atau _text_
  // 5. Inline Code `code`
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;

  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // 1. Link [Label](https://...)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-500 dark:text-amber-400 underline underline-offset-2 hover:brightness-125 transition-all font-semibold"
        >
          {linkMatch[1]}
        </a>
      );
    }

    // 2. Bold + Italic ***text***
    if (part.startsWith('***') && part.endsWith('***') && part.length >= 6) {
      const inner = part.slice(3, -3);
      return (
        <strong key={index} className="font-extrabold italic text-amber-600 dark:text-amber-300">
          {renderInlineFormatting(inner)}
        </strong>
      );
    }

    // 3. Bold **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const inner = part.slice(2, -2);
      return (
        <strong key={index} className="font-black text-slate-900 dark:text-white">
          {renderInlineFormatting(inner)}
        </strong>
      );
    }

    // 4. Italic *text*
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <em key={index} className="italic text-slate-800 dark:text-slate-200">
          {renderInlineFormatting(inner)}
        </em>
      );
    }

    // 5. Inline code `text`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-300 font-mono text-xs border border-amber-500/20 font-semibold"
        >
          {inner}
        </code>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

/**
 * Komponen MarkdownRenderer untuk artikel blog dan preview live editor
 */
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  // Normalisasi baris
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const elements: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  let codeLanguage = '';

  let listBuffer: { type: 'ul' | 'ol'; items: string[] } | null = null;
  let paragraphBuffer: string[] = [];

  const flushParagraph = (key: string) => {
    if (paragraphBuffer.length === 0) return;
    const text = paragraphBuffer.join(' ').trim();
    paragraphBuffer = [];
    if (!text) return;

    elements.push(
      <p key={`p-${key}`} className="leading-relaxed text-slate-700 dark:text-slate-300 text-sm sm:text-base">
        {renderInlineFormatting(text)}
      </p>
    );
  };

  const flushList = (key: string) => {
    if (!listBuffer) return;
    const { type, items } = listBuffer;
    listBuffer = null;

    if (type === 'ul') {
      elements.push(
        <ul key={`ul-${key}`} className="space-y-1.5 my-3 pl-5 list-disc text-slate-700 dark:text-slate-300 text-sm sm:text-base">
          {items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {renderInlineFormatting(item)}
            </li>
          ))}
        </ul>
      );
    } else {
      elements.push(
        <ol key={`ol-${key}`} className="space-y-1.5 my-3 pl-5 list-decimal text-slate-700 dark:text-slate-300 text-sm sm:text-base">
          {items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {renderInlineFormatting(item)}
            </li>
          ))}
        </ol>
      );
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // 1. Code Block Handle
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        // End of code block
        inCodeBlock = false;
        const codeText = codeBlockLines.join('\n');
        elements.push(
          <div key={`code-${i}`} className="my-4 rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-950 text-slate-100 shadow-lg">
            {codeLanguage && (
              <div className="px-4 py-1.5 bg-slate-900 border-b border-slate-800 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                {codeLanguage}
              </div>
            )}
            <pre className="p-4 overflow-x-auto font-mono text-xs sm:text-sm text-amber-300 leading-relaxed">
              <code>{codeText}</code>
            </pre>
          </div>
        );
        codeBlockLines = [];
        codeLanguage = '';
      } else {
        // Start of code block
        flushParagraph(`before-code-${i}`);
        flushList(`before-code-${i}`);
        inCodeBlock = true;
        codeLanguage = trimmed.replace('```', '').trim();
        codeBlockLines = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(rawLine);
      continue;
    }

    // 2. Baris Kosong -> pemisah paragraf / list
    if (!trimmed) {
      flushParagraph(`empty-${i}`);
      flushList(`empty-${i}`);
      continue;
    }

    // 3. Horizontal Rule
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      flushParagraph(`hr-${i}`);
      flushList(`hr-${i}`);
      elements.push(
        <hr key={`hr-${i}`} className="my-6 border-t border-amber-500/20" />
      );
      continue;
    }

    // 4. Headings (#, ##, ###, ####)
    if (trimmed.startsWith('# ')) {
      flushParagraph(`h1-${i}`);
      flushList(`h1-${i}`);
      elements.push(
        <h1
          key={`h1-${i}`}
          className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-slate-950 dark:text-white pt-4 pb-2 border-b border-amber-500/20"
        >
          {renderInlineFormatting(trimmed.substring(2))}
        </h1>
      );
      continue;
    }

    if (trimmed.startsWith('## ')) {
      flushParagraph(`h2-${i}`);
      flushList(`h2-${i}`);
      elements.push(
        <h2
          key={`h2-${i}`}
          className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-amber-400 pt-5 pb-1"
        >
          {renderInlineFormatting(trimmed.substring(3))}
        </h2>
      );
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushParagraph(`h3-${i}`);
      flushList(`h3-${i}`);
      elements.push(
        <h3
          key={`h3-${i}`}
          className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-amber-600 dark:text-amber-300 pt-3"
        >
          {renderInlineFormatting(trimmed.substring(4))}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith('#### ')) {
      flushParagraph(`h4-${i}`);
      flushList(`h4-${i}`);
      elements.push(
        <h4
          key={`h4-${i}`}
          className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 pt-2"
        >
          {renderInlineFormatting(trimmed.substring(5))}
        </h4>
      );
      continue;
    }

    // 5. Blockquote
    if (trimmed.startsWith('> ')) {
      flushParagraph(`quote-${i}`);
      flushList(`quote-${i}`);
      elements.push(
        <blockquote
          key={`quote-${i}`}
          className="p-4 my-3 rounded-2xl bg-amber-500/10 border-l-4 border-amber-500 text-sm sm:text-base italic text-slate-800 dark:text-slate-200"
        >
          {renderInlineFormatting(trimmed.substring(2))}
        </blockquote>
      );
      continue;
    }

    // 6. Unordered List (- atau *)
    const ulMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (ulMatch) {
      flushParagraph(`ul-before-${i}`);
      if (listBuffer && listBuffer.type !== 'ul') {
        flushList(`switch-ul-${i}`);
      }
      if (!listBuffer) {
        listBuffer = { type: 'ul', items: [] };
      }
      listBuffer.items.push(ulMatch[1]);
      continue;
    }

    // 7. Ordered List (1. atau 2.)
    const olMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      flushParagraph(`ol-before-${i}`);
      if (listBuffer && listBuffer.type !== 'ol') {
        flushList(`switch-ol-${i}`);
      }
      if (!listBuffer) {
        listBuffer = { type: 'ol', items: [] };
      }
      listBuffer.items.push(olMatch[1]);
      continue;
    }

    // 8. Teks Paragraf Biasa
    if (listBuffer) {
      flushList(`end-list-${i}`);
    }
    paragraphBuffer.push(trimmed);
  }

  // Flush remaining buffers
  flushParagraph('final');
  flushList('final');

  return <div className="space-y-4 markdown-rendered-content">{elements}</div>;
};
