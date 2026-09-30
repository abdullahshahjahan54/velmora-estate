import React, { useState } from 'react';
import { PropertyFilterState } from '../../types/property';
import { Search, SlidersHorizontal, RotateCcw, LayoutGrid, List, Check } from 'lucide-react';

interface PropertyFiltersProps {
  filters: PropertyFilterState;
  onFilterChange: (newFilters: PropertyFilterState) => void;
  layout: 'grid' | 'list';
  onLayoutChange: (layout: 'grid' | 'list') => void;
  totalResults: number;
}

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  filters,
  onFilterChange,
  layout,
  onLayoutChange,
  totalResults
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const cities = ['All', 'Beverly Hills', 'Manhattan', 'Miami Beach', 'London', 'Aspen', 'Dera Ismail Khan', 'Dubai'];
  const propertyTypes = [
    { label: 'All Types', value: 'all' },
    { label: 'Luxury Villas', value: 'villa' },
    { label: 'Modern Apartments', value: 'apartment' },
    { label: 'Houses & Homes', value: 'house' },
    { label: 'Penthouses', value: 'penthouse' },
    { label: 'Commercial Real Estate', value: 'commercial' },
    { label: 'Land & Plots', value: 'land' },
  ];

  const amenityOptions = [
    'Swimming Pool',
    'Parking',
    'Garden',
    'Air Conditioning',
    'Security System',
    'Balcony',
    'Furnished',
    'Electricity Backup'
  ];

  const handleReset = () => {
    onFilterChange({
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
    });
  };

  const toggleAmenity = (amenity: string) => {
    const updated = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    onFilterChange({ ...filters, amenities: updated });
  };

  return (
    <div className="space-y-4 rounded-xl border border-[#E8E5DF] bg-white p-5 shadow-sm">
      
      {/* Primary Row: Search Bar & Segmented Buy/Rent Filter */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#737A82]" />
          <input
            type="text"
            placeholder="Search by title, location, keywords (e.g. villa for sale, penthouse, pool)..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] pl-10 pr-4 py-2.5 text-xs text-[#191C1E] placeholder-[#737A82] focus:border-[#C2A772] focus:outline-none focus:ring-1 focus:ring-[#C2A772]"
          />
        </div>

        {/* Buy / Rent / All Segmented Control */}
        <div className="flex items-center gap-1 rounded-lg bg-[#EFECE6] p-1 self-start lg:self-auto">
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, listingType: 'all' })}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              filters.listingType === 'all'
                ? 'bg-white text-[#191C1E] shadow-sm font-semibold'
                : 'text-[#545B63] hover:text-[#191C1E]'
            }`}
          >
            All Listings
          </button>
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, listingType: 'sale' })}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              filters.listingType === 'sale'
                ? 'bg-white text-[#191C1E] shadow-sm font-semibold'
                : 'text-[#545B63] hover:text-[#191C1E]'
            }`}
          >
            Buy Property
          </button>
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, listingType: 'rent' })}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              filters.listingType === 'rent'
                ? 'bg-white text-[#191C1E] shadow-sm font-semibold'
                : 'text-[#545B63] hover:text-[#191C1E]'
            }`}
          >
            Rent Property
          </button>
        </div>

        {/* Toggle Advanced Filters Button */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`flex items-center gap-2 rounded-md border px-3.5 py-2.5 text-xs font-medium transition-colors ${
            showAdvanced
              ? 'border-[#C2A772] bg-[#FAF8F5] text-[#9C7E44]'
              : 'border-[#E8E5DF] text-[#191C1E] hover:border-[#C2A772]'
          }`}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>Filters</span>
          {(filters.city !== 'all' || filters.propertyType !== 'all' || filters.amenities.length > 0 || filters.bedrooms !== 'any' || filters.featuredOnly) && (
            <span className="flex h-2 w-2 rounded-full bg-[#C2A772]" />
          )}
        </button>

      </div>

      {/* Secondary Row: Fast Selectors (Type, Location, Sort, Grid/List) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 pt-3 border-t border-[#F0ECE1]">
        
        {/* Property Type Dropdown */}
        <div>
          <label className="block text-[11px] font-medium text-[#737A82] mb-1">Property Type</label>
          <select
            value={filters.propertyType}
            onChange={(e) => onFilterChange({ ...filters, propertyType: e.target.value as any })}
            className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] px-2.5 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
          >
            {propertyTypes.map((pt) => (
              <option key={pt.value} value={pt.value}>{pt.label}</option>
            ))}
          </select>
        </div>

        {/* City Location */}
        <div>
          <label className="block text-[11px] font-medium text-[#737A82] mb-1">City / Location</label>
          <select
            value={filters.city}
            onChange={(e) => onFilterChange({ ...filters, city: e.target.value })}
            className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] px-2.5 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
          >
            {cities.map((city) => (
              <option key={city} value={city === 'All' ? 'all' : city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-[11px] font-medium text-[#737A82] mb-1">Bedrooms</label>
          <select
            value={filters.bedrooms}
            onChange={(e) => onFilterChange({ ...filters, bedrooms: e.target.value === 'any' ? 'any' : Number(e.target.value) })}
            className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] px-2.5 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
          >
            <option value="any">Any Bedrooms</option>
            <option value="1">1+ Bedrooms</option>
            <option value="2">2+ Bedrooms</option>
            <option value="3">3+ Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-[11px] font-medium text-[#737A82] mb-1">Sort Listings</label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as any })}
            className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] px-2.5 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
          >
            <option value="latest">Latest Listed</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        {/* View Toggle & Reset */}
        <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex items-end justify-between lg:justify-end gap-2">
          <div className="flex items-center rounded-md border border-[#E8E5DF] p-1 bg-[#FBFBF9]">
            <button
              type="button"
              onClick={() => onLayoutChange('grid')}
              title="Grid View"
              className={`p-1.5 rounded transition-colors ${
                layout === 'grid' ? 'bg-white text-[#191C1E] shadow-xs' : 'text-[#737A82] hover:text-[#191C1E]'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onLayoutChange('list')}
              title="List View"
              className={`p-1.5 rounded transition-colors ${
                layout === 'list' ? 'bg-white text-[#191C1E] shadow-xs' : 'text-[#737A82] hover:text-[#191C1E]'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleReset}
            title="Reset Filters"
            className="flex items-center gap-1 rounded-md border border-[#E8E5DF] px-2.5 py-2 text-xs text-[#737A82] hover:text-[#191C1E] hover:border-[#191C1E] transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>

      </div>

      {/* Advanced Expandable Filter Panel */}
      {showAdvanced && (
        <div className="pt-4 border-t border-[#F0ECE1] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Price Max */}
            <div>
              <div className="flex justify-between text-[11px] font-medium text-[#737A82] mb-1">
                <span>Maximum Price</span>
                <span className="text-[#191C1E] font-semibold tabular-nums">
                  ${filters.maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="50000000"
                step="50000"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
                className="w-full accent-[#C2A772] h-1.5 bg-[#E8E5DF] rounded-lg cursor-pointer"
              />
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-[11px] font-medium text-[#737A82] mb-1">Bathrooms</label>
              <select
                value={filters.bathrooms}
                onChange={(e) => onFilterChange({ ...filters, bathrooms: e.target.value === 'any' ? 'any' : Number(e.target.value) })}
                className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] px-2.5 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
              >
                <option value="any">Any Bathrooms</option>
                <option value="1">1+ Bathrooms</option>
                <option value="2">2+ Bathrooms</option>
                <option value="3">3+ Bathrooms</option>
                <option value="4">4+ Bathrooms</option>
              </select>
            </div>

            {/* Furnished Status */}
            <div>
              <label className="block text-[11px] font-medium text-[#737A82] mb-1">Furnishing Status</label>
              <select
                value={filters.furnished}
                onChange={(e) => onFilterChange({ ...filters, furnished: e.target.value as any })}
                className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] px-2.5 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
              >
                <option value="all">All Furnishing Options</option>
                <option value="Furnished">Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>

          </div>

          {/* Amenities Multi-Check */}
          <div>
            <span className="block text-[11px] font-medium text-[#737A82] mb-2">
              Property Features & Amenities
            </span>
            <div className="flex flex-wrap gap-2">
              {amenityOptions.map((amenity) => {
                const isSelected = filters.amenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                      isSelected
                        ? 'border-[#C2A772] bg-[#FAF8F5] text-[#9C7E44]'
                        : 'border-[#E8E5DF] bg-white text-[#545B63] hover:border-[#191C1E]'
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3 text-[#9C7E44]" />}
                    <span>{amenity}</span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, featuredOnly: !filters.featuredOnly })}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                  filters.featuredOnly
                    ? 'border-[#191C1E] bg-[#191C1E] text-white'
                    : 'border-[#E8E5DF] bg-white text-[#545B63] hover:border-[#191C1E]'
                }`}
              >
                {filters.featuredOnly && <Check className="h-3 w-3 text-[#C2A772]" />}
                <span>Featured Properties Only</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Count bar */}
      <div className="pt-2 text-xs text-[#737A82] flex items-center justify-between">
        <span>
          Showing <strong className="text-[#191C1E] font-semibold tabular-nums">{totalResults}</strong> verified real estate properties
        </span>
        {filters.searchQuery && (
          <span className="text-[11px]">
            Filtered by keyword: <em className="text-[#191C1E]">"{filters.searchQuery}"</em>
          </span>
        )}
      </div>

    </div>
  );
};
