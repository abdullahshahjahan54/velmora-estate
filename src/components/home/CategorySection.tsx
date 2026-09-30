import React from 'react';
import { Home, Building, Castle, Key, Landmark, Mountain, TrendingUp, ArrowUpRight } from 'lucide-react';

interface CategorySectionProps {
  onSelectCategory: (category: { propertyType?: string; listingType?: 'sale' | 'rent' }) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      title: 'Houses for Sale',
      desc: 'Exclusive contemporary family homes & suburban manors',
      icon: Home,
      count: '140+ Properties',
      action: { propertyType: 'house', listingType: 'sale' as const }
    },
    {
      title: 'Modern Apartments',
      desc: 'Architectural lofts and turnkey residences in prime urban centers',
      icon: Building,
      count: '95+ Properties',
      action: { propertyType: 'apartment', listingType: 'sale' as const }
    },
    {
      title: 'Luxury Villas',
      desc: 'Waterfront sanctuaries and architectural hillside estates',
      icon: Castle,
      count: '68+ Properties',
      action: { propertyType: 'villa', listingType: 'sale' as const }
    },
    {
      title: 'Houses for Rent',
      desc: 'Turnkey furnished executive residences and garden townhouses',
      icon: Key,
      count: '54+ Rentals',
      action: { propertyType: 'house', listingType: 'rent' as const }
    },
    {
      title: 'Commercial Properties',
      desc: 'Grade-A office towers, retail flagship spaces & medical centers',
      icon: Landmark,
      count: '42+ Listings',
      action: { propertyType: 'commercial', listingType: 'sale' as const }
    },
    {
      title: 'Plots & Land for Sale',
      desc: 'Prime residential land plots, acreage & agricultural ranches',
      icon: Mountain,
      count: '38+ Plots',
      action: { propertyType: 'land', listingType: 'sale' as const }
    },
    {
      title: 'Investment Properties',
      desc: 'High-yield tenanted assets, multi-family & capital growth portfolios',
      icon: TrendingUp,
      count: '80+ Opportunities',
      action: { listingType: 'sale' as const }
    }
  ];

  return (
    <section className="py-20 bg-[#F4F1EA] border-y border-[#E8E5DF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest text-[#9C7E44] font-semibold mb-2">
            Explore By Category
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#191C1E]">
            Find Properties Tailored to Your Ambition
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#545B63]">
            Whether purchasing a modern luxury villa, renting a city apartment, or acquiring institutional commercial real estate, explore curated categories designed for every lifestyle.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isWide = idx === 6; // last card spans on larger screens
            return (
              <div
                key={cat.title}
                onClick={() => onSelectCategory(cat.action)}
                className={`group cursor-pointer rounded-lg border border-[#E8E5DF] bg-white p-6 transition-all duration-300 hover:shadow-xl hover:border-[#C2A772] flex flex-col justify-between ${
                  isWide ? 'sm:col-span-2 lg:col-span-3 xl:col-span-2' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#FAF8F5] text-[#9C7E44] transition-colors group-hover:bg-[#191C1E] group-hover:text-[#C2A772]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs text-[#737A82] tabular-nums font-medium">
                      {cat.count}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#191C1E] transition-colors group-hover:text-[#9C7E44]">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#545B63] leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0ECE1] flex items-center justify-between text-xs font-semibold text-[#191C1E]">
                  <span className="uppercase tracking-wider text-[11px] text-[#737A82] group-hover:text-[#191C1E]">Explore Listings</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FAF8F5] group-hover:bg-[#191C1E] group-hover:text-white transition-colors">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
