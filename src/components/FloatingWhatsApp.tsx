import React from 'react';
import { siteConfig } from '../data/content';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3">
      {/* Speech bubble / tooltip on hover & floating mascot */}
      <div className="hidden sm:flex flex-col items-end gap-1">
        <div className="px-3.5 py-1.5 rounded-2xl rounded-br-none bg-[#181d2a] border border-amber-500/40 text-xs font-bold text-amber-300 shadow-2xl backdrop-blur-md flex items-center gap-1.5">
          <span>Ada pertanyaan? Tanya Si Lebah yuk!</span>
          <span className="text-sm">🐝</span>
        </div>
      </div>

      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat dengan Beekoding via WhatsApp"
        className="relative group"
      >
        {/* Cute Mascot sitting on top of the button */}
        <div className="absolute -top-7 -left-3 z-10 pointer-events-none group-hover:-translate-y-1.5 transition-transform duration-300">
          <img
            src="/bee-mascot.png"
            alt="Mascot"
            className="w-10 h-10 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* WhatsApp Button */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all duration-300 relative border-2 border-amber-400/40">
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-300 border-2 border-[#0d0f15]" />
          <MessageCircle className="w-7 h-7 fill-slate-950 stroke-none" />
        </div>
      </a>
    </div>
  );
};
