import React from 'react';
import { INITIAL_TESTIMONIALS } from '../../data/mockData';
import { Agent } from '../../types/property';
import { Star, ArrowRight, Phone, Mail, Award, MessageCircle } from 'lucide-react';

interface SocialProofAndCTAProps {
  agents: Agent[];
  onSelectAgent: (agent: Agent) => void;
  onExploreProperties: () => void;
  onContactAgent: () => void;
}

export const SocialProofAndCTA: React.FC<SocialProofAndCTAProps> = ({
  agents,
  onSelectAgent,
  onExploreProperties,
  onContactAgent
}) => {
  return (
    <div className="space-y-24 py-12">
      
      {/* 1. Client Testimonials */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest text-[#9C7E44] font-semibold mb-2">
            Client Success Stories
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#191C1E]">
            Endorsed by Discerning Property Buyers & Investors
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#545B63]">
            Read how our certified property consultants and real estate agents have negotiated and secured life-defining properties across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="rounded-lg border border-[#E8E5DF] bg-white p-7 shadow-xs flex flex-col justify-between hover:border-[#C2A772] transition-colors"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-[#C2A772] mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs italic leading-relaxed text-[#545B63]">
                  "{t.comment}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#F0ECE1] flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.clientName}
                  referrerPolicy="no-referrer"
                  className="h-11 w-11 rounded-full object-cover border border-[#E8E5DF]"
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#191C1E]">
                    {t.clientName}
                  </h4>
                  <p className="text-[11px] text-[#737A82]">{t.clientRole}</p>
                  <p className="text-[10px] text-[#9C7E44] font-medium mt-0.5">{t.propertyTypePurchased}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Real Estate Agents Showcase */}
      <section className="bg-[#FAF8F5] py-20 border-y border-[#E8E5DF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#9C7E44] font-semibold mb-2">
                Advisory Leadership
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#191C1E]">
                Meet Our Premier Real Estate Agents
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#545B63] max-w-2xl">
                Our property consultants provide tailored market valuation, confidential deal brokerage, and turnkey representation for buyers, sellers, and tenants.
              </p>
            </div>

            <button
              onClick={onContactAgent}
              className="self-start md:self-auto inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#191C1E] hover:text-[#9C7E44] transition-colors"
            >
              <span>View All 50+ Agents</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="group rounded-lg border border-[#E8E5DF] bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#C2A772] flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#ECE8E1]">
                    <img
                      src={agent.avatar}
                      alt={`${agent.name} - Real Estate Agent & Property Consultant at Velmora Estates`}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-[#191C1E]/80 backdrop-blur-sm text-white px-2 py-0.5 text-[10px] font-semibold rounded-xs">
                      {agent.activeListings} Active Listings
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif text-lg font-bold text-[#191C1E] group-hover:text-[#9C7E44] transition-colors">
                      {agent.name}
                    </h3>
                    <p className="text-[11px] text-[#737A82] line-clamp-1">{agent.title}</p>
                    
                    <div className="mt-3 pt-3 border-t border-[#F0ECE1] space-y-1.5 text-xs text-[#545B63]">
                      <p className="text-[11px]">
                        <strong className="text-[#191C1E]">Specialization:</strong> {agent.specialization}
                      </p>
                      <p className="text-[11px]">
                        <strong className="text-[#191C1E]">Experience:</strong> {agent.experience}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onSelectAgent(agent)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-sm border border-[#191C1E] bg-white py-2 text-xs font-semibold uppercase tracking-wider text-[#191C1E] hover:bg-[#191C1E] hover:text-white transition-colors"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Final Conversion CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#191C1E] text-white p-10 sm:p-16 lg:p-20 text-center">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C2A772] font-semibold">
              Begin Your Journey Today
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              “Your Next Property Could Be Closer Than You Think.”
            </h2>
            <p className="text-xs sm:text-sm text-[#A6ADB8] max-w-xl mx-auto leading-relaxed">
              Whether you are searching for your dream home, seeking high-yielding real estate investment opportunities, or ready to sell a luxury property, our dedicated property consultants are ready to assist.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onExploreProperties}
                className="inline-flex items-center gap-2 rounded-sm bg-[#C2A772] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#121519] hover:bg-[#D5BC8A] shadow-md transition-all hover:scale-[1.02]"
              >
                <span>Explore Properties</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={onContactAgent}
                className="inline-flex items-center gap-2 rounded-sm border border-white/30 bg-white/10 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition-all"
              >
                <span>Contact an Agent</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
