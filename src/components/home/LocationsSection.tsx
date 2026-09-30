import React from 'react';
import { EXPLORE_LOCATIONS } from '../../data/mockData';
import { MapPin, ArrowRight } from 'lucide-react';

interface LocationsSectionProps {
  onSelectLocation: (cityName: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onSelectLocation }) => {
  return (
    <section className="py-20 bg-[#FBFBF9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#9C7E44] font-semibold mb-2">
              Prime Destinations
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191C1E]">
              Explore Iconic Locations
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#545B63] max-w-2xl leading-relaxed">
              From waterfront villas in Miami and high-rise penthouses in Manhattan to tranquil residential family estates in Aspen and burgeoning development plots in Dera Ismail Khan.
            </p>
          </div>

          <button
            onClick={() => onSelectLocation('all')}
            className="self-start md:self-auto inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#191C1E] hover:text-[#9C7E44] transition-colors"
          >
            <span>View All Regional Markets</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPLORE_LOCATIONS.map((loc) => (
            <div
              key={loc.name}
              onClick={() => onSelectLocation(loc.name)}
              className="group relative cursor-pointer overflow-hidden rounded-lg border border-[#E8E5DF] bg-white transition-all duration-300 hover:shadow-xl hover:border-[#C2A772]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#ECE8E1]">
                <img
                  src={loc.image}
                  alt={`Real estate properties for sale and rent in ${loc.name}`}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121519]/90 via-[#121519]/40 to-transparent" />
                
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-[#191C1E] rounded-xs tabular-nums">
                  {loc.propertyCount} Properties
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1 text-[11px] text-[#C2A772] font-medium mb-1">
                    <MapPin className="h-3 w-3" />
                    <span>{loc.region}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold tracking-tight">
                    {loc.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#D1D5DB] line-clamp-1">
                    {loc.description}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white flex items-center justify-between text-xs font-medium text-[#191C1E]">
                <span className="text-[#545B63] text-[11px]">Verified Listings & Local Market Insights</span>
                <span className="font-semibold text-[#9C7E44] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
