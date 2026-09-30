import React, { useState, useEffect } from 'react';
import { Property, PropertyFilterState } from '../../types/property';
import { usePropertyContext } from '../../context/PropertyContext';
import { PropertyCard } from '../property/PropertyCard';
import { PropertyFilters } from '../property/PropertyFilters';
import { updateSEO } from '../../utils/seo';

interface PropertiesPageProps {
  onSelectProperty: (property: Property) => void;
  initialFilters?: Partial<PropertyFilterState>;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  onSelectProperty,
  initialFilters
}) => {
  const { properties } = usePropertyContext();

  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<PropertyFilterState>({
    searchQuery: '',
    listingType: 'all',
    propertyType: 'all',
    city: 'all',
    minPrice: 0,
    maxPrice: 60000000,
    bedrooms: 'any',
    bathrooms: 'any',
    minArea: 0,
    furnished: 'all',
    amenities: [],
    featuredOnly: false,
    sortBy: 'latest',
    ...initialFilters
  });

  useEffect(() => {
    updateSEO({
      title: 'Properties for Sale & Rent | Real Estate Listings Velmora',
      description: 'Explore verified real estate listings, properties for sale, property for rent, homes for sale, apartments for rent and commercial properties with Velmora Estates.',
      keywords: 'properties for sale, property for rent, homes for sale, apartments for rent, commercial properties, real estate listings, villas for sale'
    });
  }, []);

  // Update filters if initialFilters changes
  useEffect(() => {
    if (initialFilters) {
      setFilters(prev => ({ ...prev, ...initialFilters }));
    }
  }, [initialFilters]);

  const filteredProperties = properties.filter(p => {
    if (filters.listingType !== 'all' && p.listingType !== filters.listingType) return false;
    if (filters.propertyType !== 'all' && p.propertyType !== filters.propertyType) return false;
    if (filters.city !== 'all' && p.location.city.toLowerCase() !== filters.city.toLowerCase()) return false;
    if (p.price > filters.maxPrice) return false;
    if (filters.bedrooms !== 'any' && p.bedrooms < filters.bedrooms) return false;
    if (filters.bathrooms !== 'any' && p.bathrooms < filters.bathrooms) return false;
    if (filters.furnished !== 'all' && p.furnished !== filters.furnished) return false;
    if (filters.featuredOnly && !p.featured) return false;
    
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const match = p.title.toLowerCase().includes(q) ||
                    p.location.city.toLowerCase().includes(q) ||
                    p.location.neighborhood.toLowerCase().includes(q) ||
                    p.propertyType.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (filters.amenities.length > 0) {
      const propAmenityNames = p.amenities.map(a => a.name);
      const hasAll = filters.amenities.every(req => propAmenityNames.includes(req));
      if (!hasAll) return false;
    }

    return true;
  });

  // Sort
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (filters.sortBy === 'price-asc') return a.price - b.price;
    if (filters.sortBy === 'price-desc') return b.price - a.price;
    if (filters.sortBy === 'popular') return (b.viewsCount || 0) - (a.viewsCount || 0);
    return new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime();
  });

  return (
    <div className="bg-[#FBFBF9] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Heading & SEO Text */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9C7E44] mb-2">
            Velmora Estates Real Estate Marketplace
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191C1E] tracking-tight">
            Properties for Sale & Rent
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#545B63] leading-relaxed">
            Browse verified real estate listings including luxury properties for sale, contemporary property for rent, architect-designed homes for sale, turnkey apartments for rent, and prime institutional commercial properties. Refine by location, price, bedroom count, and luxury amenities.
          </p>
        </div>

        {/* Filter Toolbar */}
        <PropertyFilters
          filters={filters}
          onFilterChange={setFilters}
          layout={layout}
          onLayoutChange={setLayout}
          totalResults={sortedProperties.length}
        />

        {/* Results */}
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
          <div className="rounded-xl border border-[#E8E5DF] bg-white p-16 text-center space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#191C1E]">
              No properties match your current search
            </h3>
            <p className="text-xs text-[#545B63] max-w-md mx-auto">
              Please reset some of your filter criteria or search for a broader term such as "villa", "penthouse", or "Beverly Hills".
            </p>
            <button
              onClick={() => setFilters({
                searchQuery: '',
                listingType: 'all',
                propertyType: 'all',
                city: 'all',
                minPrice: 0,
                maxPrice: 60000000,
                bedrooms: 'any',
                bathrooms: 'any',
                minArea: 0,
                furnished: 'all',
                amenities: [],
                featuredOnly: false,
                sortBy: 'latest'
              })}
              className="inline-flex items-center gap-2 rounded-sm bg-[#191C1E] px-6 py-2.5 text-xs font-semibold uppercase text-white"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
