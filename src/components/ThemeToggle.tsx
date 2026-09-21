import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center gap-2 p-1 rounded-full border transition-all duration-300 ${
        isDark
          ? 'bg-[#181d2a] border-amber-500/30 text-amber-300 hover:border-amber-400'
          : 'bg-amber-50 border-amber-300 text-amber-800 hover:border-amber-500'
      } ${className}`}
      aria-label={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
      title={isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
    >
      {/* Sliding track pill */}
      <div
        className={`flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 shadow-md ${
          isDark
            ? 'translate-x-0 bg-amber-500 text-slate-950 shadow-amber-500/30'
            : 'translate-x-6 bg-amber-400 text-slate-950 shadow-amber-400/40'
        }`}
      >
        {isDark ? (
          <Moon className="w-4 h-4 fill-slate-950 stroke-slate-950" />
        ) : (
          <Sun className="w-4 h-4 text-slate-950 stroke-[2.5]" />
        )}
      </div>

      {/* Background Icons to show both modes in track */}
      <div className="flex items-center justify-between w-12 px-1 text-[11px] font-bold select-none absolute inset-0 pointer-events-none">
        <span className={`transition-opacity ${isDark ? 'opacity-0' : 'opacity-70 text-amber-700'}`}>
          <Moon className="w-3.5 h-3.5" />
        </span>
        <span className={`transition-opacity ${isDark ? 'opacity-70 text-amber-400' : 'opacity-0'}`}>
          <Sun className="w-3.5 h-3.5" />
        </span>
      </div>

      {showLabel && (
        <span className="text-xs font-bold pr-2 select-none">
          {isDark ? 'Gelap' : 'Terang'}
        </span>
      )}
    </button>
  );
};
