import React from 'react';
import { 
  BadgeCheck, 
  Users, 
  Compass, 
  ShieldCheck, 
  LineChart, 
  LockKeyhole 
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: 'Verified Property Listings',
      desc: 'Every home, villa, apartment, and plot undergoes strict legal title verification, physical inspection, and accurate photographic documentation before listing.',
      icon: BadgeCheck
    },
    {
      title: 'Professional Real Estate Agents',
      desc: 'Our certified real estate advisors bring decades of local market mastery, discreet client representation, and high-stakes negotiation acumen.',
      icon: Users
    },
    {
      title: 'Personalized Property Search',
      desc: 'Bespoke acquisition matching aligned with your architectural tastes, lifestyle demands, school catchments, and long-term capital goals.',
      icon: Compass
    },
    {
      title: 'Trusted Property Consultants',
      desc: 'Impartial valuation, structural diligence, tax structuring, and tenancy advisory backing both private families and sovereign institutions.',
      icon: ShieldCheck
    },
    {
      title: 'Expert Market Knowledge',
      desc: 'Proprietary neighborhood analytics, price-per-square-foot trend forecasts, and rental yield underwriting across global prime markets.',
      icon: LineChart
    },
    {
      title: 'Secure Property Transactions',
      desc: 'End-to-end escrow facilitation, legal contract vetting, and anti-fraud protocols ensuring complete peace of mind through settlement.',
      icon: LockKeyhole
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-[#9C7E44] font-semibold mb-2">
            The Velmora Distinction
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191C1E]">
            Why Discerning Clients Choose Velmora Estates
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#545B63] leading-relaxed">
            As an elite real estate agency, we bridge architectural elegance with financial rigor. Discover how our advisory standards protect your legacy and streamline property transactions.
          </p>
        </div>

        {/* 6 Pillars Asymmetric Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative rounded-lg border border-[#E8E5DF] bg-[#FBFBF9] p-8 transition-all duration-300 hover:border-[#C2A772] hover:bg-white hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white border border-[#E8E5DF] text-[#191C1E] transition-colors group-hover:bg-[#191C1E] group-hover:text-[#C2A772]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-serif text-2xl font-bold text-[#E0DDD5] group-hover:text-[#C2A772]/60 tabular-nums">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#191C1E] mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#545B63] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Animated Statistics Strip */}
        <div className="mt-20 rounded-xl bg-[#191C1E] p-8 sm:p-12 text-white">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            
            <div className="pt-4 lg:pt-0">
              <p className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#C2A772] tabular-nums">
                500+
              </p>
              <p className="text-xs uppercase tracking-wider text-[#A6ADB8] mt-2 font-medium">
                Properties Listed
              </p>
              <p className="text-[11px] text-[#737A82] mt-0.5">Across 8 global metros</p>
            </div>

            <div className="pt-4 lg:pt-0">
              <p className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#C2A772] tabular-nums">
                350+
              </p>
              <p className="text-xs uppercase tracking-wider text-[#A6ADB8] mt-2 font-medium">
                Happy Clients
              </p>
              <p className="text-[11px] text-[#737A82] mt-0.5">High-net-worth families & funds</p>
            </div>

            <div className="pt-4 lg:pt-0">
              <p className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#C2A772] tabular-nums">
                200+
              </p>
              <p className="text-xs uppercase tracking-wider text-[#A6ADB8] mt-2 font-medium">
                Properties Sold
              </p>
              <p className="text-[11px] text-[#737A82] mt-0.5">$650M+ total volume settled</p>
            </div>

            <div className="pt-4 lg:pt-0">
              <p className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#C2A772] tabular-nums">
                50+
              </p>
              <p className="text-xs uppercase tracking-wider text-[#A6ADB8] mt-2 font-medium">
                Professional Agents
              </p>
              <p className="text-[11px] text-[#737A82] mt-0.5">Licensed property consultants</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
