import React, { useState, useRef, useEffect } from 'react';
import { usePropertyContext } from '../../context/PropertyContext';
import { Property } from '../../types/property';
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  ArrowUpRight, 
  Building2, 
  RotateCcw,
  MessageSquare,
  HelpCircle,
  PhoneCall
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  recommendedProperties?: Property[];
  timestamp: string;
}

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProperty: (property: Property) => void;
  onOpenWhatsApp: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  onSelectProperty,
  onOpenWhatsApp,
}) => {
  const { properties, agents, formatPrice } = usePropertyContext();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `Welcome to Velmora Estates. I am your personal AI Real Estate Concierge. How may I assist your property journey today?
      
You can ask me to:
• Search luxury villas, apartments, or penthouses by budget and location
• Inquire about commercial real estate investment opportunities
• Explore plots for sale in Dera Ismail Khan or estates in Beverly Hills & London
• Estimate mortgage payments and property valuations`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  // Suggested prompt pills
  const samplePrompts = [
    'Show modern luxury villas for sale',
    'Apartments for rent in Dubai & London',
    'Commercial properties for investment',
    'Properties in Dera Ismail Khan',
    'What properties are under $10M?',
  ];

  // Client-side fallback matching logic for rich responses
  const generateLocalAIResponse = (userText: string): { reply: string; matched: Property[] } => {
    const text = userText.toLowerCase();
    let matched: Property[] = [];
    let reply = '';

    // Check for specific queries
    if (text.includes('villa') || text.includes('villas')) {
      matched = properties.filter(p => p.propertyType === 'villa');
      reply = `I have located ${matched.length} exceptional modern luxury villas currently featured in our portfolio, offering private swimming pools, panoramic views, and bespoke architectural finishes:`;
    } else if (text.includes('rent') || text.includes('rental') || text.includes('renting')) {
      matched = properties.filter(p => p.listingType === 'rent');
      reply = `We feature ${matched.length} verified turnkey residential properties for rent, with flexible lease terms and dedicated concierge services:`;
    } else if (text.includes('commercial') || text.includes('invest') || text.includes('investment')) {
      matched = properties.filter(p => p.propertyType === 'commercial' || p.price >= 15000000);
      reply = `For institutional real estate investment and capital growth, here are our premier trophy assets and commercial developments:`;
    } else if (text.includes('dera ismail khan') || text.includes('dik') || text.includes('khan') || text.includes('pakistan')) {
      matched = properties.filter(p => p.location.city.toLowerCase().includes('dera ismail khan'));
      reply = `In Dera Ismail Khan, Velmora Estates represents prime executive residential plots and contemporary 4-bedroom family villas with complete utilities and clear legal titles:`;
    } else if (text.includes('beverly hills') || text.includes('california')) {
      matched = properties.filter(p => p.location.city.toLowerCase().includes('beverly hills'));
      reply = `In Beverly Hills, we represent architectural hillside estates and contemporary family residences in Trousdale Estates and Canyon Crest:`;
    } else if (text.includes('penthouse') || text.includes('manhattan') || text.includes('new york')) {
      matched = properties.filter(p => p.propertyType === 'penthouse' || p.location.city.toLowerCase().includes('new york'));
      reply = `Here are our crown multi-level sky penthouses offering panoramic skyline and park vistas:`;
    } else if (text.includes('valuation') || text.includes('worth') || text.includes('sell')) {
      reply = `To calculate your property's valuation, Velmora Estates utilizes recent comparable transactions, built-up square footage, and architectural finish quality. You can use our interactive **Property Valuation Tool** on the Sell Property page, or I can connect you directly with Senior Managing Director Eleanor Vance.`;
    } else if (text.includes('agent') || text.includes('advisor') || text.includes('contact')) {
      reply = `Our team of 50+ licensed real estate agents includes specialists in luxury residential estates (Eleanor Vance), commercial capital markets (Julian Sterling), urban penthouses (Sophia Al-Mansoor), and agricultural/land development (Marcus Thornton). Would you like to connect directly on WhatsApp?`;
    } else {
      matched = properties.slice(0, 3);
      reply = `Thank you for your inquiry. Based on our current global real estate listings, here are top featured properties tailored for discerning buyers and investors:`;
    }

    return { reply, matched: matched.slice(0, 3) };
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // 1. Try server-side Gemini API endpoint
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-4).map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Also check if any properties match the query to show visual cards
        const { matched } = generateLocalAIResponse(textToSend);

        const aiMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          recommendedProperties: matched.length > 0 ? matched : undefined,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Fallback to local intelligent real estate matcher
        const { reply, matched } = generateLocalAIResponse(textToSend);
        const aiMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: reply,
          recommendedProperties: matched.length > 0 ? matched : undefined,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch {
      // Fallback
      const { reply, matched } = generateLocalAIResponse(textToSend);
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: reply,
        recommendedProperties: matched.length > 0 ? matched : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        role: 'assistant',
        content: 'Conversation reset. How can I help you find your next property or assist with your real estate investments?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-50 flex flex-col w-full sm:w-[440px] h-full sm:h-[620px] rounded-none sm:rounded-2xl border border-[#E8E5DF] bg-white shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5">
      
      {/* Header */}
      <div className="bg-[#191C1E] text-white p-4 flex items-center justify-between border-b border-[#2C323B] shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[#C2A772] text-[#121519] shadow-sm">
            <Bot className="h-5 w-5" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-serif text-base font-bold text-white tracking-wide">
                Velmora AI Concierge
              </h3>
              <span className="text-[10px] uppercase tracking-wider bg-[#C2A772]/20 text-[#C2A772] border border-[#C2A772]/30 px-1.5 py-0.2 rounded font-semibold">
                Online
              </span>
            </div>
            <p className="text-[11px] text-[#A6ADB8]">
              Intelligent Real Estate & Property Advisory
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleResetChat}
            title="Reset Chat"
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#A6ADB8] hover:text-white hover:bg-white/10 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onClose}
            aria-label="Close Assistant"
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#A6ADB8] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FBFBF9] text-xs">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-end gap-2 max-w-[90%]">
              {msg.role === 'assistant' && (
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#191C1E] text-[#C2A772] text-[10px] font-bold">
                  <Sparkles className="h-3 w-3" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl shadow-xs leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-[#191C1E] text-white rounded-br-none'
                    : 'bg-white border border-[#E8E5DF] text-[#191C1E] rounded-bl-none'
                }`}
              >
                {msg.content}

                {/* Recommended Property Cards */}
                {msg.recommendedProperties && msg.recommendedProperties.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#F0ECE1] space-y-2">
                    <p className="font-semibold text-[11px] text-[#9C7E44] uppercase tracking-wider">
                      Featured Recommendations:
                    </p>
                    <div className="space-y-2">
                      {msg.recommendedProperties.map(prop => (
                        <div
                          key={prop.id}
                          onClick={() => {
                            onSelectProperty(prop);
                            onClose();
                          }}
                          className="group cursor-pointer rounded-lg border border-[#E8E5DF] bg-[#FAF8F5] p-2 hover:border-[#C2A772] hover:bg-white transition-all flex items-center gap-2.5"
                        >
                          <img
                            src={prop.images[0]}
                            alt=""
                            className="h-12 w-16 object-cover rounded shrink-0 border border-[#E8E5DF]"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-serif font-bold text-xs text-[#191C1E] truncate group-hover:text-[#9C7E44]">
                              {prop.title}
                            </p>
                            <p className="text-[10px] text-[#737A82] truncate">
                              {prop.location.city} · {prop.bedrooms > 0 ? `${prop.bedrooms} Beds` : prop.propertyType}
                            </p>
                            <p className="font-semibold text-xs text-[#191C1E] tabular-nums mt-0.5">
                              {formatPrice(prop.price, prop.currency)}
                            </p>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-[#737A82] group-hover:text-[#191C1E] shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <span className="text-[9px] text-[#737A82] mt-1 px-1 tabular-nums">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-[#737A82]">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#191C1E] text-[#C2A772]">
              <Sparkles className="h-3 w-3 animate-spin" />
            </div>
            <div className="bg-white border border-[#E8E5DF] px-3 py-2 rounded-xl text-[11px] text-[#545B63] flex items-center gap-1.5">
              <span>Velmora AI is evaluating properties...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-3 py-2 bg-white border-t border-[#F0ECE1] overflow-x-auto scrollbar-none flex items-center gap-1.5">
        {samplePrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(p)}
            className="shrink-0 px-2.5 py-1 rounded-full bg-[#F4F1EA] text-[#545B63] hover:bg-[#191C1E] hover:text-white transition-colors text-[10px] font-medium"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-[#E8E5DF] shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about properties, valuations, locations..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 rounded-lg border border-[#E8E5DF] bg-[#FBFBF9] px-3.5 py-2.5 text-xs text-[#191C1E] placeholder-[#737A82] focus:border-[#C2A772] focus:outline-none"
          />

          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#191C1E] text-[#C2A772] hover:bg-[#2B3037] disabled:opacity-40 transition-colors shrink-0 shadow-sm"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-2 flex items-center justify-between text-[10px] text-[#737A82] px-1">
          <span>Official Velmora Estates Intelligence</span>
          <button
            onClick={onOpenWhatsApp}
            className="text-emerald-700 hover:underline flex items-center gap-1 font-medium"
          >
            <span>Talk to human broker on WhatsApp</span>
          </button>
        </div>
      </div>

    </div>
  );
};
