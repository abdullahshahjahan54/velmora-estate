import React, { useState } from 'react';
import { Sparkles, MessageCircle, Bot } from 'lucide-react';

interface FloatingActionHubProps {
  onOpenAIAssistant: () => void;
  isAIAssistantOpen: boolean;
}

export const FloatingActionHub: React.FC<FloatingActionHubProps> = ({
  onOpenAIAssistant,
  isAIAssistantOpen,
}) => {
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false);
  const [showAITooltip, setShowAITooltip] = useState(false);

  const whatsappUrl = 'https://wa.me/13108492910?text=Hello%20Velmora%20Estates%2C%20I%20am%20interested%20in%20inquiring%20about%20your%20luxury%20real%20estate%20properties.';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
      
      {/* 1. AI ASSISTANT BUTTON (Positioned directly above WhatsApp) */}
      <div className="relative flex items-center">
        {/* Tooltip */}
        {showAITooltip && !isAIAssistantOpen && (
          <div className="absolute right-16 mr-2 whitespace-nowrap rounded-lg bg-[#191C1E] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xl border border-[#C2A772]/40 animate-in fade-in slide-in-from-right-2 pointer-events-none">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#C2A772]" />
              <span>Velmora AI Property Assistant</span>
            </div>
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-[#191C1E]" />
          </div>
        )}

        <button
          onClick={onOpenAIAssistant}
          onMouseEnter={() => setShowAITooltip(true)}
          onMouseLeave={() => setShowAITooltip(false)}
          aria-label="Open Velmora AI Property Assistant"
          className={`group relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 ${
            isAIAssistantOpen
              ? 'bg-[#C2A772] text-[#121519] scale-105 ring-4 ring-[#C2A772]/30'
              : 'bg-[#191C1E] text-[#C2A772] border-2 border-[#C2A772] hover:bg-[#252B33] hover:scale-110 ring-2 ring-black/10'
          }`}
        >
          {/* Subtle gold luxury ambient glow */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#C2A772]/20 to-[#EADBB6]/20 blur-sm group-hover:opacity-100 opacity-60 transition-opacity" />

          <div className="relative flex flex-col items-center justify-center">
            <Sparkles className="h-5 w-5 text-[#C2A772] transition-transform duration-300 group-hover:rotate-12" />
            <span className="text-[9px] font-bold tracking-tight uppercase mt-0.5 font-sans">
              AI
            </span>
          </div>

          {/* Active status pip */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C2A772] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#C2A772] border-2 border-[#191C1E]"></span>
          </span>
        </button>
      </div>

      {/* 2. WHATSAPP BUTTON (Positioned below AI Assistant on the bottom right) */}
      <div className="relative flex items-center">
        {/* Tooltip */}
        {showWhatsAppTooltip && (
          <div className="absolute right-16 mr-2 whitespace-nowrap rounded-lg bg-[#191C1E] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xl border border-[#25D366]/40 animate-in fade-in slide-in-from-right-2 pointer-events-none">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#25D366]" />
              <span>Chat on WhatsApp · Online</span>
            </div>
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-[#191C1E]" />
          </div>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowWhatsAppTooltip(true)}
          onMouseLeave={() => setShowWhatsAppTooltip(false)}
          aria-label="Direct WhatsApp Chat with Velmora Estates"
          title="Chat on WhatsApp +1 (310) 849-2910"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#20ba5a] active:scale-95 group ring-4 ring-[#25D366]/20"
        >
          {/* Subtle online pulse */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-pulse pointer-events-none" />

          {/* Official WhatsApp SVG Icon */}
          <svg className="h-7 w-7 fill-white transition-transform group-hover:scale-105" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>

          {/* Active online pip */}
          <span className="absolute 1 top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border-2 border-[#25D366]"></span>
          </span>
        </a>
      </div>

    </div>
  );
};
