import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  ListOrdered,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  X,
  Compass,
} from 'lucide-react';

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  items: TocItem[];
  activeId?: string;
  onItemClick: (id: string) => void;
  readingProgress?: number;
}

/**
 * Hook to track which heading is currently in viewport (ScrollSpy)
 */
export function useScrollSpy(headingIds: string[]) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!headingIds || headingIds.length === 0) return;

    const handleScroll = () => {
      const headingElements = headingIds
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((item): item is { id: string; el: HTMLElement } => Boolean(item.el));

      if (headingElements.length === 0) return;

      // Bottom of page detection -> highlight last item
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveId(headingElements[headingElements.length - 1].id);
        return;
      }

      // Viewport threshold offset (accounting for sticky navbar ~72px)
      const threshold = 140;
      let current = headingElements[0].id;

      for (const item of headingElements) {
        const rect = item.el.getBoundingClientRect();
        if (rect.top <= threshold) {
          current = item.id;
        } else {
          break;
        }
      }

      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headingIds]);

  return activeId;
}

/**
 * 1. Inline Collapsible Table of Contents (for mobile & in-content view)
 */
export const InlineTableOfContents: React.FC<
  TableOfContentsProps & { isOpen: boolean; onToggleOpen: () => void }
> = ({ items, activeId, onItemClick, isOpen, onToggleOpen }) => {
  const { isDark } = useTheme();

  if (items.length <= 1) return null;

  return (
    <div
      className={`rounded-2xl border transition-all overflow-hidden ${
        isDark
          ? 'bg-[#121622]/90 border-amber-500/25 shadow-md shadow-black/20'
          : 'bg-gradient-to-br from-amber-500/5 via-yellow-500/5 to-white border-amber-200/90 shadow-xs'
      }`}
    >
      <button
        type="button"
        onClick={onToggleOpen}
        className="w-full px-5 py-3.5 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-amber-500/5 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-500">
            <ListOrdered className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
              Daftar Isi Artikel
            </span>
            <span className="ml-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              ({items.length} bab pembahasan)
            </span>
          </div>
        </div>
        <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1 text-xs font-semibold">
          <span>{isOpen ? 'Tutup' : 'Buka'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-4 pt-1 border-t border-amber-500/15 animate-fadeIn">
          <nav className="space-y-1 text-xs sm:text-sm">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onItemClick(item.id)}
                  className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-all flex items-start gap-2 group cursor-pointer ${
                    item.level === 3
                      ? 'pl-6 text-slate-600 dark:text-slate-400'
                      : 'font-semibold text-slate-800 dark:text-slate-200'
                  } ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold border-l-2 border-amber-500'
                      : 'hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400'
                  }`}
                >
                  <span
                    className={`text-xs mt-0.5 font-mono ${
                      isActive ? 'text-amber-500 font-bold' : 'text-slate-400'
                    }`}
                  >
                    {item.level === 2 ? '•' : '–'}
                  </span>
                  <span className="group-hover:translate-x-0.5 transition-transform line-clamp-1">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
};

/**
 * 2. Sticky Desktop Sidebar Table of Contents (Visible on large screens)
 */
export const StickySidebarTableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  activeId,
  onItemClick,
  readingProgress = 0,
}) => {
  const { isDark } = useTheme();

  if (items.length <= 1) return null;

  return (
    <aside
      className={`hidden xl:block w-72 flex-shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-1 rounded-2xl border p-4 transition-all ${
        isDark
          ? 'bg-[#121622]/80 border-amber-500/20 shadow-xl shadow-black/20 backdrop-blur-md'
          : 'bg-white/90 border-amber-200/80 shadow-md shadow-amber-500/5 backdrop-blur-md'
      }`}
    >
      {/* Header with Reading Progress */}
      <div className="pb-3 mb-3 border-b border-amber-500/15 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-amber-500/15 text-amber-500 flex items-center justify-center">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-black font-['Space_Grotesk'] text-slate-900 dark:text-white uppercase tracking-wider">
            Daftar Isi
          </span>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500">
          {Math.round(readingProgress)}%
        </span>
      </div>

      {/* Chapter List with Active ScrollSpy Indicator */}
      <nav className="space-y-1 text-xs">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onItemClick(item.id)}
              className={`w-full text-left py-1.5 px-2 rounded-lg transition-all flex items-start gap-2 group cursor-pointer ${
                item.level === 3 ? 'pl-5 text-[11px]' : 'text-xs'
              } ${
                isActive
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold border-l-2 border-amber-500 shadow-xs'
                  : isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-amber-50'
              }`}
            >
              <span
                className={`text-[10px] mt-0.5 font-mono ${
                  isActive ? 'text-amber-500' : 'text-slate-400 opacity-60'
                }`}
              >
                {item.level === 2 ? '•' : '–'}
              </span>
              <span
                className={`line-clamp-2 transition-transform ${
                  isActive ? 'translate-x-0.5' : 'group-hover:translate-x-0.5'
                }`}
              >
                {item.title}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Quick Action Footer */}
      <div className="pt-3 mt-3 border-t border-amber-500/15 flex items-center justify-between text-[11px] text-slate-400">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:text-amber-500 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <ArrowUp className="w-3 h-3" />
          <span>Ke Atas</span>
        </button>
        <span className="text-[10px] opacity-70">{items.length} bagian</span>
      </div>
    </aside>
  );
};

/**
 * 3. Mobile Table of Contents Modal/Drawer (Opens via floating action button)
 */
export const MobileTocModal: React.FC<
  TableOfContentsProps & { isOpen: boolean; onClose: () => void }
> = ({ items, activeId, onItemClick, isOpen, onClose }) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div
        className={`w-full sm:max-w-md max-h-[80vh] flex flex-col rounded-t-3xl sm:rounded-3xl border shadow-2xl overflow-hidden transition-all animate-slideUp ${
          isDark ? 'bg-[#111520] border-amber-500/30' : 'bg-white border-amber-200'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center">
              <ListOrdered className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
                Daftar Isi Artikel
              </h3>
              <p className="text-[10px] text-slate-400">Pilih bab untuk langsung melompat ke bagian tersebut</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 overflow-y-auto space-y-1.5">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onItemClick(item.id);
                  onClose();
                }}
                className={`w-full text-left py-2 px-3 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer ${
                  item.level === 3 ? 'pl-6 text-xs' : 'text-xs font-semibold'
                } ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold border-l-2 border-amber-500'
                    : isDark
                    ? 'text-slate-300 hover:bg-slate-800'
                    : 'text-slate-700 hover:bg-amber-50'
                }`}
              >
                <span className="text-amber-500 mt-0.5 text-xs font-mono">
                  {item.level === 2 ? '•' : '–'}
                </span>
                <span className="line-clamp-2">{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
