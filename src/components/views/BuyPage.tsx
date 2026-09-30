import React, { useState } from 'react';
import { Property, PropertyFilterState } from '../../types/property';
import { usePropertyContext } from '../../context/PropertyContext';
import { PropertyCard } from '../property/PropertyCard';
import { PropertyFilters } from '../property/PropertyFilters';
import { Calculator, ArrowRight, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface BuyPageProps {
  onSelectProperty: (property: Property) => void;
  onContactAgent: () => void;
  initialType?: string;
}

export const BuyPage: React.FC<BuyPageProps> = ({ 
  onSelectProperty, 
  onContactAgent,
  initialType 
}) => {
  const { properties } = usePropertyContext();

  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<PropertyFilterState>({
    searchQuery: '',
    listingType: 'sale',
    propertyType: (initialType as any) || 'all',
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

  // Mortgage Calculator State
  const [mortgageHomePrice, setMortgageHomePrice] = useState(2500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.2);
  const [loanTermYears, setLoanTermYears] = useState(30);

  // Filter properties
  const forSaleProperties = properties.filter(p => {
    if (p.listingType !== 'sale') return false;
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
    if (filters.featuredOnly && !p.featured) return false;
    if (filters.amenities.length > 0) {
      const propAmenityNames = p.amenities.map(a => a.name);
      const hasAll = filters.amenities.every(req => propAmenityNames.includes(req));
      if (!hasAll) return false;
    }
    return true;
  });

  // Sort properties
  const sortedProperties = [...forSaleProperties].sort((a, b) => {
    if (filters.sortBy === 'price-asc') return a.price - b.price;
    if (filters.sortBy === 'price-desc') return b.price - a.price;
    if (filters.sortBy === 'popular') return (b.viewsCount || 0) - (a.viewsCount || 0);
    return new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime();
  });

  // Calculate monthly mortgage payment
  const principal = mortgageHomePrice * (1 - downPaymentPercent / 100);
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;
  const monthlyMortgage = Math.round(
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  ) || 0;

  return (
    <div className="bg-[#FBFBF9] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero Header with rich SEO keywords */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9C7E44] mb-2">
            Properties for Sale · Residential & Commercial
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191C1E] tracking-tight">
            Buy Property: Luxury Homes, Villas & Apartments for Sale
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#545B63] leading-relaxed">
            Discover verified houses for sale, modern apartments, waterfront luxury villas, commercial properties, and prime development land plots. Partner with Velmora Estates for confidential property acquisitions and institutional advisory.
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

        {/* Property Grid / List */}
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
              No properties matched your exact criteria
            </h3>
            <p className="text-xs text-[#545B63] max-w-md mx-auto">
              Try adjusting your price range, selected city, or bedroom filters to explore more available properties for sale.
            </p>
          </div>
        )}

        {/* Real Estate Buying Guide */}
        <div className="rounded-2xl border border-[#E8E5DF] bg-white p-8 sm:p-12 shadow-xs">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9C7E44] mb-1">
              Step-by-Step Advisory
            </p>
            <h2 className="font-serif text-3xl font-bold text-[#191C1E]">
              The Velmora Home & Property Buying Guide
            </h2>
            <p className="text-xs text-[#545B63] mt-2">
              Our 4-stage acquisition protocol protects your equity and guarantees clean title transfer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="border-t-2 border-[#C2A772] pt-4">
              <span className="font-serif text-2xl font-bold text-[#191C1E]">01</span>
              <h4 className="font-serif text-base font-bold text-[#191C1E] mt-2">Target Profile</h4>
              <p className="text-xs text-[#545B63] mt-1">Define architecture, square footage, school districts, and lifestyle demands.</p>
            </div>
            <div className="border-t-2 border-[#C2A772] pt-4">
              <span className="font-serif text-2xl font-bold text-[#191C1E]">02</span>
              <h4 className="font-serif text-base font-bold text-[#191C1E] mt-2">Private Viewings</h4>
              <p className="text-xs text-[#545B63] mt-1">Discreet walkthroughs including off-market listings not published publicly.</p>
            </div>
            <div className="border-t-2 border-[#C2A772] pt-4">
              <span className="font-serif text-2xl font-bold text-[#191C1E]">03</span>
              <h4 className="font-serif text-base font-bold text-[#191C1E] mt-2">Legal & Valuation</h4>
              <p className="text-xs text-[#545B63] mt-1">Deed verification, property valuation comps, and engineering structural audit.</p>
            </div>
            <div className="border-t-2 border-[#C2A772] pt-4">
              <span className="font-serif text-2xl font-bold text-[#191C1E]">04</span>
              <h4 className="font-serif text-base font-bold text-[#191C1E] mt-2">Settlement & Handover</h4>
              <p className="text-xs text-[#545B63] mt-1">Escrow closing, key handover, and turnkey concierge relocation support.</p>
            </div>
          </div>
        </div>

        {/* Interactive Mortgage & Budget Calculator */}
        <div className="rounded-2xl border border-[#E8E5DF] bg-[#FAF8F5] p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9C7E44]">
                <Calculator className="h-4 w-4" />
                <span>Financial Planning</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#191C1E]">
                Mortgage & Investment Budget Estimator
              </h3>
              <p className="text-xs text-[#545B63] leading-relaxed">
                Estimate your monthly financing commitments when purchasing luxury homes, villas, or commercial properties.
              </p>
              
              <div className="rounded-xl bg-[#191C1E] p-6 text-white space-y-2">
                <span className="text-xs text-[#C2A772] uppercase tracking-wider font-semibold">
                  Estimated Monthly Payment
                </span>
                <p className="font-serif text-4xl font-bold text-white tabular-nums">
                  ${monthlyMortgage.toLocaleString()} <span className="text-xs text-[#9FA8B4] font-normal">/ month</span>
                </p>
                <p className="text-[11px] text-[#A6ADB8]">
                  Principal & Interest based on ${mortgageHomePrice.toLocaleString()} purchase price and {downPaymentPercent}% down payment.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-[#E8E5DF] space-y-5">
              
              <div>
                <div className="flex justify-between text-xs font-medium text-[#737A82] mb-1.5">
                  <span>Target Property Price</span>
                  <span className="font-bold text-[#191C1E] tabular-nums">${mortgageHomePrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="30000000"
                  step="100000"
                  value={mortgageHomePrice}
                  onChange={(e) => setMortgageHomePrice(Number(e.target.value))}
                  className="w-full accent-[#C2A772] h-2 bg-[#E8E5DF] rounded-lg cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#737A82] mb-1">Down Payment (%)</label>
                  <input
                    type="number"
                    min="5"
                    max="80"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#737A82] mb-1">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="15"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#737A82] mb-1">Loan Term (Years)</label>
                  <select
                    value={loanTermYears}
                    onChange={(e) => setLoanTermYears(Number(e.target.value))}
                    className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:outline-none"
                  >
                    <option value={15}>15 Years</option>
                    <option value={20}>20 Years</option>
                    <option value={30}>30 Years</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={onContactAgent}
                  className="inline-flex items-center gap-2 rounded-sm bg-[#191C1E] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2B3037] transition-colors"
                >
                  <span>Connect with a Mortgage Specialist</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#C2A772]" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
