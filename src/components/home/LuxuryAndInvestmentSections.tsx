import React from 'react';
import { Property } from '../../types/property';
import { ArrowRight, Crown, TrendingUp, ShieldAlert, BarChart3, CheckCircle2 } from 'lucide-react';
import villaOcean from '../../assets/images/villa_ocean_modern_1790786799763.jpg';
import commercialTower from '../../assets/images/commercial_tower_1790786832178.jpg';

interface LuxuryAndInvestmentSectionsProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onExploreLuxury: () => void;
  onExploreInvestment: () => void;
}

export const LuxuryAndInvestmentSections: React.FC<LuxuryAndInvestmentSectionsProps> = ({
  properties,
  onSelectProperty,
  onExploreLuxury,
  onExploreInvestment
}) => {
  const luxuryPicks = properties.filter(p => p.price >= 10000000).slice(0, 2);

  return (
    <div className="space-y-24 py-12">
      
      {/* 1. Luxury Properties Section (Cinematic Charcoal) */}
      <section className="relative overflow-hidden bg-[#121519] text-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Editorial column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C2A772]/30 bg-[#C2A772]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#C2A772]">
                <Crown className="h-3.5 w-3.5" />
                <span>The Velmora Signature Collection</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Luxury Homes & Premium Properties
              </h2>
              <p className="text-xs sm:text-sm text-[#A6ADB8] leading-relaxed">
                Step into a world of architectural grandeur. Our Signature Collection encompasses trophy waterfront estates, historic architectural villas, and crown sky penthouses configured with world-class finishes and uncompromising privacy.
              </p>
              
              <ul className="space-y-3 text-xs text-[#E0E2EC]">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#C2A772] shrink-0" />
                  <span>Confidential off-market acquisitions and sovereign representation</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#C2A772] shrink-0" />
                  <span>Curated private tours via helicopter, yacht, or luxury chauffeur</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#C2A772] shrink-0" />
                  <span>Global portfolio wealth preservation and bespoke asset advisory</span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  onClick={onExploreLuxury}
                  className="inline-flex items-center gap-2 rounded-sm bg-[#C2A772] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#121519] hover:bg-[#D5BC8A] transition-colors"
                >
                  <span>Explore Luxury Properties</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Visual Feature showcase */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative rounded-xl overflow-hidden border border-white/10 group cursor-pointer aspect-[3/4]" onClick={onExploreLuxury}>
                <img
                  src={villaOcean}
                  alt="Modern beachfront luxury villa with panoramic ocean view"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[11px] uppercase tracking-wider text-[#C2A772] font-semibold">Waterfront Sanctuary</span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-1">Azure Horizon Ocean Villa</h3>
                  <p className="text-xs text-[#CBD1DC] mt-1">Miami Beach · $14,200,000</p>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6">
                <div className="rounded-xl border border-white/10 bg-[#191D23] p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#C2A772] uppercase tracking-wider">Private Advisory</span>
                    <span className="text-xs text-[#737A82]">Discreet</span>
                  </div>
                  <h4 className="font-serif text-xl font-bold text-white">
                    Looking for off-market residential real estate?
                  </h4>
                  <p className="text-xs text-[#A6ADB8] leading-relaxed">
                    Over 35% of our prime residential transactions occur confidentially without public internet syndication. Connect with a senior director.
                  </p>
                  <button
                    onClick={onExploreLuxury}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C2A772] hover:text-white transition-colors"
                  >
                    <span>Request Confidential Dossier</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="rounded-xl border border-[#C2A772]/20 bg-gradient-to-br from-[#1E232B] to-[#121519] p-6">
                  <p className="text-xs text-[#A6ADB8]">Average Sold Portfolio Value</p>
                  <p className="font-serif text-4xl font-bold text-white mt-1 tabular-nums">$16.8M</p>
                  <p className="text-[11px] text-[#C2A772] mt-2">
                    Ranked #1 in Client Discretion & Settlement Precision
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. Property Investment Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#E8E5DF] bg-[#FAF8F5] p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual preview */}
            <div className="lg:col-span-6 relative rounded-xl overflow-hidden shadow-lg border border-[#E8E5DF]">
              <img
                src={commercialTower}
                alt="Contemporary commercial glass tower corporate property investment"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#191C1E] text-white px-3 py-1.5 text-xs font-semibold rounded-xs">
                Commercial Real Estate & Institutional Portfolios
              </div>
            </div>

            {/* Content & Metrics */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9C7E44]">
                <TrendingUp className="h-4 w-4 text-[#C2A772]" />
                <span>Capital Growth & Wealth Advisory</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191C1E] tracking-tight">
                Invest in Property With Confidence.
              </h2>

              <p className="text-xs sm:text-sm text-[#545B63] leading-relaxed">
                Real estate investment remains the bedrock of enduring family wealth and stable corporate capital allocation. From high-cap-rate commercial real estate and prime rental properties to land parcels poised for exponential urban expansion, Velmora Estates provides institutional underwriting.
              </p>

              {/* Investment features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="border-l-2 border-[#C2A772] pl-3">
                  <h4 className="font-semibold text-xs text-[#191C1E]">Commercial Real Estate</h4>
                  <p className="text-[11px] text-[#737A82] mt-0.5">Grade-A tenanted towers with 10+ year weighted leases.</p>
                </div>
                <div className="border-l-2 border-[#C2A772] pl-3">
                  <h4 className="font-semibold text-xs text-[#191C1E]">High-Yield Rental Properties</h4>
                  <p className="text-[11px] text-[#737A82] mt-0.5">Turnkey residential apartments generating steady monthly cashflow.</p>
                </div>
                <div className="border-l-2 border-[#C2A772] pl-3">
                  <h4 className="font-semibold text-xs text-[#191C1E]">Long-Term Property Investment</h4>
                  <p className="text-[11px] text-[#737A82] mt-0.5">Strategic plots and land for sale in high-growth transit corridors.</p>
                </div>
                <div className="border-l-2 border-[#C2A772] pl-3">
                  <h4 className="font-semibold text-xs text-[#191C1E]">Valuation & Diligence</h4>
                  <p className="text-[11px] text-[#737A82] mt-0.5">Rigorous rent-roll audits, DCF yield modeling, and structural inspection.</p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onExploreInvestment}
                  className="inline-flex items-center gap-2 rounded-sm bg-[#191C1E] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2B3037] transition-colors"
                >
                  <span>Explore Investment Opportunities</span>
                  <ArrowRight className="h-4 w-4 text-[#C2A772]" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
