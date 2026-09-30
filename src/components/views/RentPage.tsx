import React, { useState } from 'react';
import { Property, PropertyFilterState } from '../../types/property';
import { usePropertyContext } from '../../context/PropertyContext';
import { PropertyCard } from '../property/PropertyCard';
import { PropertyFilters } from '../property/PropertyFilters';
import { Key, ArrowRight, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

interface RentPageProps {
  onSelectProperty: (property: Property) => void;
  onContactAgent: () => void;
  initialType?: string;
}

export const RentPage: React.FC<RentPageProps> = ({ 
  onSelectProperty, 
  onContactAgent,
  initialType 
}) => {
  const { properties } = usePropertyContext();

  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<PropertyFilterState>({
    searchQuery: '',
    listingType: 'rent',
    propertyType: (initialType as any) || 'all',
    city: 'all',
    minPrice: 0,
    maxPrice: 50000,
    bedrooms: 'any',
    bathrooms: 'any',
    minArea: 0,
    furnished: 'all',
    amenities: [],
    featuredOnly: false,
    sortBy: 'latest'
  });

  const forRentProperties = properties.filter(p => {
    if (p.listingType !== 'rent') return false;
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const match = p.title.toLowerCase().includes(q) ||
                    p.location.city.toLowerCase().includes(q) ||
                    p.location.neighborhood.toLowerCase().includes(q) ||
                    p.propertyType.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filters.propertyType !== 'all' && p.propertyType !== filters.propertyType) return false;
    if (filters.city !== 'all' && p.location.city !== filters.city) return false;
    if (p.price > filters.maxPrice) return false;
    if (filters.bedrooms !== 'any' && p.bedrooms < filters.bedrooms) return false;
    if (filters.bathrooms !== 'any' && p.bathrooms < filters.bathrooms) return false;
    if (filters.furnished !== 'all' && p.furnished !== filters.furnished) return false;
    if (filters.amenities.length > 0) {
      const propAmenityNames = p.amenities.map(a => a.name);
      const hasAll = filters.amenities.every(req => propAmenityNames.includes(req));
      if (!hasAll) return false;
    }
    return true;
  });

  const sortedProperties = [...forRentProperties].sort((a, b) => {
    if (filters.sortBy === 'price-asc') return a.price - b.price;
    if (filters.sortBy === 'price-desc') return b.price - a.price;
    if (filters.sortBy === 'popular') return (b.viewsCount || 0) - (a.viewsCount || 0);
    return new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime();
  });

  return (
    <div className="bg-[#FBFBF9] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9C7E44] mb-2">
            Property for Rent · Residential Rentals & Apartments
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191C1E] tracking-tight">
            Rent Property: Luxury Houses & Apartments for Rent
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#545B63] leading-relaxed">
            Discover verified apartments for rent, furnished houses for rent, waterfront villas, and prime corporate rental properties. Turnkey leases with concierge resident services.
          </p>
        </div>

        {/* Filters */}
        <PropertyFilters
          filters={filters}
          onFilterChange={setFilters}
          layout={layout}
          onLayoutChange={setLayout}
          totalResults={sortedProperties.length}
        />

        {/* Listings */}
        {sortedProperties.length > 0 ? (
          <div className={
            layout === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
          }>
            {sortedProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={onSelectProperty}
                layout={layout}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-[#E8E5DF] bg-white p-12 text-center space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#191C1E]">
              No rental properties found for this filter
            </h3>
            <p className="text-xs text-[#545B63] max-w-md mx-auto">
              Expand your search parameters or check back soon as new verified rental listings are added daily.
            </p>
          </div>
        )}

        {/* Rental Tenant Guide */}
        <div className="rounded-2xl border border-[#E8E5DF] bg-[#FAF8F5] p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#9C7E44]">
                Seamless Tenancy
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#191C1E]">
                Why Rent Through Velmora Estates?
              </h3>
              <p className="text-xs text-[#545B63] leading-relaxed">
                We eliminate landlord friction. Our tenant representation safeguards your security deposits, provides verified utility connections, and guarantees 24/7 property management support.
              </p>

              <div className="space-y-2 pt-2 text-xs text-[#191C1E]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#C2A772]" />
                  <span>Fully verified inventory with physical walk-through inspection reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#C2A772]" />
                  <span>Flexible lease terms: 6-month executive stay to multi-year corporate leases</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#C2A772]" />
                  <span>Dedicated property management and white-glove maintenance dispatch</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-8 rounded-xl border border-[#E8E5DF] space-y-4">
              <h4 className="font-serif text-xl font-bold text-[#191C1E]">
                Need a Custom Corporate Relocation?
              </h4>
              <p className="text-xs text-[#545B63]">
                Our executive tenancy desk arranges furnished penthouses and corporate townhouses for international leadership and diplomats.
              </p>
              <button
                onClick={onContactAgent}
                className="inline-flex items-center gap-2 rounded-sm bg-[#191C1E] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2B3037] transition-colors"
              >
                <span>Speak with a Rental Specialist</span>
                <ArrowRight className="h-4 w-4 text-[#C2A772]" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
