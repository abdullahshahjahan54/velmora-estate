import React, { useState } from 'react';
import { Property } from '../../types/property';
import { PropertyCard } from '../property/PropertyCard';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedSectionProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onExploreAll: () => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  properties,
  onSelectProperty,
  onExploreAll
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'villa' | 'apartment' | 'penthouse' | 'commercial'>('all');

  const featured = properties.filter(p => p.featured || p.isNew);
  const filtered = activeTab === 'all' 
    ? featured 
    : featured.filter(p => p.propertyType === activeTab);

  return (
    <section className="py-20 lg:py-28 bg-[#FBFBF9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9C7E44] mb-2">
              <Sparkles className="h-3.5 w-3.5 text-[#C2A772]" />
              <span>Curated Real Estate Portfolio</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191C1E] tracking-tight">
              Featured Properties
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#545B63] leading-relaxed">
              Explore our hand-selected luxury homes, apartments, villas, and commercial properties for sale and rent, verified for pristine architectural quality and prime location value.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { label: 'All Featured', value: 'all' },
              { label: 'Villas', value: 'villa' },
              { label: 'Apartments', value: 'apartment' },
              { label: 'Penthouses', value: 'penthouse' },
              { label: 'Commercial', value: 'commercial' },
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.value
                    ? 'bg-[#191C1E] text-white shadow-xs'
                    : 'bg-white border border-[#E8E5DF] text-[#545B63] hover:text-[#191C1E] hover:border-[#191C1E]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.slice(0, 6).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
            />
          ))}
        </div>

        {/* View All CTA Strip */}
        <div className="mt-14 text-center">
          <button
            onClick={onExploreAll}
            className="inline-flex items-center gap-2 rounded-sm border border-[#191C1E] bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#191C1E] hover:bg-[#191C1E] hover:text-white transition-all shadow-xs"
          >
            <span>Explore All Real Estate Listings</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
