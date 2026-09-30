import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Target, 
  Eye, 
  Award, 
  Users, 
  Compass, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import heroVilla from '../../assets/images/hero_luxury_villa_1790786780485.jpg';
import penthouseInterior from '../../assets/images/penthouse_interior_1790786816033.jpg';

interface AboutPageProps {
  onExploreProperties: () => void;
  onContactTeam: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onExploreProperties,
  onContactTeam
}) => {
  return (
    <div className="bg-[#FBFBF9] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Hero Banner */}
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9C7E44]">
            About Velmora Estates · Established 2012
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#191C1E] tracking-tight leading-[1.15]">
            “A Better Way to Find Your Next Property.”
          </h1>
          <p className="text-sm sm:text-base text-[#545B63] leading-relaxed">
            Velmora Estates was founded on a simple conviction: modern real estate transactions should be transparent, architecturally rigorous, and tailored to the client's long-term legacy.
          </p>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5 text-xs sm:text-sm text-[#545B63] leading-relaxed">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#191C1E]">
              Redefining Real Estate Brokerage & Property Investment
            </h2>
            <p>
              As an international real estate agency, Velmora Estates represents private families, sovereign investors, and corporate leaders across prime residential and commercial real estate markets. We combine discrete white-glove advisory with proprietary market intelligence to evaluate properties for sale, houses for rent, luxury villas, and high-yield commercial properties.
            </p>
            <p>
              Whether assisting first-time luxury homebuyers in finding their dream home or underwriting a 40,000-square-foot office tower for institutional property investment, our licensed property consultants deliver uncompromising integrity and precision.
            </p>
            <div className="pt-2 flex items-center gap-6">
              <div>
                <p className="font-serif text-3xl font-bold text-[#191C1E] tabular-nums">$650M+</p>
                <p className="text-xs text-[#737A82]">Settled Transaction Volume</p>
              </div>
              <div className="h-8 w-px bg-[#E8E5DF]" />
              <div>
                <p className="font-serif text-3xl font-bold text-[#191C1E] tabular-nums">99.4%</p>
                <p className="text-xs text-[#737A82]">Client Satisfaction Rate</p>
              </div>
              <div className="h-8 w-px bg-[#E8E5DF]" />
              <div>
                <p className="font-serif text-3xl font-bold text-[#191C1E] tabular-nums">8</p>
                <p className="text-xs text-[#737A82]">Global Metro Desks</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[#E8E5DF]">
            <img
              src={penthouseInterior}
              alt="Velmora Estates luxury property advisory"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Mission & Vision Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-[#E8E5DF] bg-white p-8 sm:p-10 shadow-xs space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#FAF8F5] text-[#9C7E44]">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#191C1E]">
              Our Mission
            </h3>
            <p className="text-xs sm:text-sm text-[#545B63] leading-relaxed">
              To empower individuals, families, and institutions to make informed, value-accretive real estate decisions by delivering verified property listings, transparent property valuations, and discreet transactional execution.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E8E5DF] bg-white p-8 sm:p-10 shadow-xs space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#FAF8F5] text-[#9C7E44]">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#191C1E]">
              Our Vision
            </h3>
            <p className="text-xs sm:text-sm text-[#545B63] leading-relaxed">
              To remain the most trusted global real estate company for luxury homes, modern apartments, villas for sale, and commercial property investments — renowned for ethical conduct, architectural discernment, and client longevity.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="rounded-2xl border border-[#E8E5DF] bg-[#FAF8F5] p-8 sm:p-12">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9C7E44]">
              Guiding Principles
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#191C1E] mt-1">
              Core Values That Drive Velmora Estates
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-[#545B63]">
            <div className="p-5 bg-white rounded-xl border border-[#E8E5DF]">
              <h4 className="font-serif text-lg font-bold text-[#191C1E] mb-2">Absolute Integrity</h4>
              <p>We treat every client's capital with fiduciary care. Unvarnished structural inspection reports and honest valuations always precede commissions.</p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-[#E8E5DF]">
              <h4 className="font-serif text-lg font-bold text-[#191C1E] mb-2">Architectural Excellence</h4>
              <p>We champion timeless materials, exceptional engineering, and sustainable residential real estate over transient cosmetic trends.</p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-[#E8E5DF]">
              <h4 className="font-serif text-lg font-bold text-[#191C1E] mb-2">Discretion & Privacy</h4>
              <p>Over a third of our ultra-luxury transactions are confidential off-market agreements. High-profile clients trust our strict non-disclosure culture.</p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-[#E8E5DF]">
              <h4 className="font-serif text-lg font-bold text-[#191C1E] mb-2">Data-Driven Underwriting</h4>
              <p>We combine historical cap rates, neighborhood demographic shifts, and infrastructure projections to evaluate investment properties.</p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-[#E8E5DF]">
              <h4 className="font-serif text-lg font-bold text-[#191C1E] mb-2">Client Longevity</h4>
              <p>We build relationships that span generations, managing portfolios across primary residences, vacation villas, and commercial real estate.</p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-[#E8E5DF]">
              <h4 className="font-serif text-lg font-bold text-[#191C1E] mb-2">Global Connectivity</h4>
              <p>With advisory desks spanning North America, Europe, the Middle East, and South Asia, our clients access cross-border opportunities seamlessly.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h3 className="font-serif text-3xl font-bold text-[#191C1E]">
            Ready to Experience the Velmora Difference?
          </h3>
          <p className="text-xs text-[#545B63] max-w-md mx-auto">
            Schedule a private consultation with our senior property consultants today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onExploreProperties}
              className="inline-flex items-center gap-2 rounded-sm bg-[#191C1E] px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2B3037] transition-colors"
            >
              <span>Explore Listings</span>
              <ArrowRight className="h-4 w-4 text-[#C2A772]" />
            </button>
            <button
              onClick={onContactTeam}
              className="inline-flex items-center gap-2 rounded-sm border border-[#191C1E] bg-white px-8 py-3 text-xs font-semibold uppercase tracking-wider text-[#191C1E] hover:bg-[#191C1E] hover:text-white transition-colors"
            >
              <span>Talk to a Property Expert</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
