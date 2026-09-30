import React, { useState } from 'react';
import { Search, MapPin, Building, ArrowRight, DollarSign } from 'lucide-react';
import heroVilla from '../../assets/images/hero_luxury_villa_1790786780485.jpg';

interface HeroSectionProps {
  onSearch: (searchParams: {
    listingType: 'sale' | 'rent';
    city: string;
    propertyType: string;
    minPrice: number;
    maxPrice: number;
    bedrooms: string;
    bathrooms: string;
  }) => void;
  onExploreClick: () => void;
  onListClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onExploreClick,
  onListClick
}) => {
  const [listingType, setListingType] = useState<'sale' | 'rent'>('sale');
  const [city, setCity] = useState('all');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [bedrooms, setBedrooms] = useState('any');
  const [bathrooms, setBathrooms] = useState('any');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let minPrice = 0;
    let maxPrice = 100000000;

    if (priceRange === 'under-1m') {
      maxPrice = 1000000;
    } else if (priceRange === '1m-5m') {
      minPrice = 1000000;
      maxPrice = 5000000;
    } else if (priceRange === '5m-15m') {
      minPrice = 5000000;
      maxPrice = 15000000;
    } else if (priceRange === '15m-plus') {
      minPrice = 15000000;
    }

    onSearch({
      listingType,
      city,
      propertyType,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms
    });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* Background Cinematic Image with measured gradient scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroVilla}
          alt="Modern luxury villa for sale with infinity pool and panoramic views"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center brightness-[0.78]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121519] via-[#121519]/50 to-[#121519]/40" />
      </div>

      {/* Main Content & Search */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col items-center text-center">
        
        {/* Subtle Pre-header */}
        <p className="text-xs uppercase tracking-[0.25em] text-[#C2A772] font-semibold mb-4">
          Velmora Estates · Premier Global Real Estate Agency
        </p>

        {/* Marquee Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl text-balance leading-[1.1]">
          Discover Exceptional Properties. Find Your Place.
        </h1>

        {/* Supporting Copy */}
        <p className="mt-5 text-sm sm:text-base md:text-lg text-[#E0E2EC] max-w-2xl leading-relaxed text-balance">
          Explore premium homes, apartments, villas, commercial properties, and investment opportunities with Velmora Estates.
        </p>

        {/* Quick CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 rounded-sm bg-[#C2A772] px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#121519] hover:bg-[#D5BC8A] shadow-md transition-all hover:scale-[1.02]"
          >
            <span>Explore Properties</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={onListClick}
            className="inline-flex items-center gap-2 rounded-sm border border-white/40 bg-white/10 backdrop-blur-md px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition-all"
          >
            <span>List Your Property</span>
          </button>
        </div>

        {/* Advanced Property Search Box */}
        <div className="mt-12 w-full max-w-5xl rounded-xl bg-white/95 p-4 sm:p-6 backdrop-blur-md shadow-2xl border border-white/20 text-left">
          <form onSubmit={handleSearchSubmit}>
            
            {/* Buy / Rent Tabs */}
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[#E8E5DF]">
              <button
                type="button"
                onClick={() => setListingType('sale')}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all ${
                  listingType === 'sale'
                    ? 'bg-[#191C1E] text-white shadow-sm'
                    : 'text-[#545B63] hover:text-[#191C1E]'
                }`}
              >
                Buy Properties
              </button>
              <button
                type="button"
                onClick={() => setListingType('rent')}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all ${
                  listingType === 'rent'
                    ? 'bg-[#191C1E] text-white shadow-sm'
                    : 'text-[#545B63] hover:text-[#191C1E]'
                }`}
              >
                Rent Properties
              </button>
              <span className="ml-auto text-xs text-[#737A82] hidden sm:inline">
                Verified luxury listings updated daily
              </span>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Location */}
              <div>
                <label className="block text-[11px] font-medium text-[#737A82] mb-1.5 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-[#9C7E44]" />
                  <span>Location</span>
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] px-3 py-2.5 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                >
                  <option value="all">All Locations</option>
                  <option value="Beverly Hills">Beverly Hills, CA</option>
                  <option value="Manhattan">Manhattan, NY</option>
                  <option value="Miami Beach">Miami Beach, FL</option>
                  <option value="London">London, UK</option>
                  <option value="Aspen">Aspen, CO</option>
                  <option value="Dubai">Dubai, UAE</option>
                  <option value="Dera Ismail Khan">Dera Ismail Khan, PK</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-[11px] font-medium text-[#737A82] mb-1.5 flex items-center gap-1">
                  <Building className="h-3 w-3 text-[#9C7E44]" />
                  <span>Property Type</span>
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] px-3 py-2.5 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                >
                  <option value="all">All Property Types</option>
                  <option value="villa">Luxury Villas</option>
                  <option value="apartment">Modern Apartments</option>
                  <option value="house">Houses & Homes</option>
                  <option value="penthouse">Sky Penthouses</option>
                  <option value="commercial">Commercial Real Estate</option>
                  <option value="land">Plots & Land</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-[11px] font-medium text-[#737A82] mb-1.5 flex items-center gap-1">
                  <DollarSign className="h-3 w-3 text-[#9C7E44]" />
                  <span>Price Range</span>
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] px-3 py-2.5 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                >
                  <option value="all">Any Price</option>
                  <option value="under-1m">Under $1,000,000</option>
                  <option value="1m-5m">$1,000,000 – $5,000,000</option>
                  <option value="5m-15m">$5,000,000 – $15,000,000</option>
                  <option value="15m-plus">$15,000,000+</option>
                </select>
              </div>

              {/* Bedrooms & Bathrooms combined selector */}
              <div>
                <label className="block text-[11px] font-medium text-[#737A82] mb-1.5">
                  Rooms
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] px-2 py-2.5 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                  >
                    <option value="any">Beds: Any</option>
                    <option value="2">2+ Beds</option>
                    <option value="3">3+ Beds</option>
                    <option value="4">4+ Beds</option>
                    <option value="5">5+ Beds</option>
                  </select>
                  <select
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] px-2 py-2.5 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                  >
                    <option value="any">Baths: Any</option>
                    <option value="2">2+ Baths</option>
                    <option value="3">3+ Baths</option>
                    <option value="4">4+ Baths</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Submit Action */}
            <div className="mt-5 pt-4 border-t border-[#F0ECE1] flex items-center justify-between">
              <span className="text-[11px] text-[#737A82] hidden md:inline">
                Instant search across 500+ verified listings in premier global markets
              </span>
              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-sm bg-[#191C1E] px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2B3037] shadow-sm transition-all"
              >
                <Search className="h-4 w-4 text-[#C2A772]" />
                <span>Find Property</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};
