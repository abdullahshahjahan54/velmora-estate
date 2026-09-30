import React, { useState } from 'react';
import { usePropertyContext } from '../../context/PropertyContext';
import { PropertyType, ListingType } from '../../types/property';
import { 
  Building2, 
  UploadCloud, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Calculator,
  HelpCircle 
} from 'lucide-react';
import heroVilla from '../../assets/images/hero_luxury_villa_1790786780485.jpg';

interface SellPropertyPageProps {
  onPropertyListed?: (newPropId: string) => void;
  onContactExpert: () => void;
}

export const SellPropertyPage: React.FC<SellPropertyPageProps> = ({ 
  onPropertyListed,
  onContactExpert 
}) => {
  const { addProperty } = usePropertyContext();

  // Submission Form State
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [propertyTitle, setPropertyTitle] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('villa');
  const [listingType, setListingType] = useState<ListingType>('sale');
  const [city, setCity] = useState('Beverly Hills');
  const [neighborhood, setNeighborhood] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState<number>(3500000);
  const [bedrooms, setBedrooms] = useState<number>(4);
  const [bathrooms, setBathrooms] = useState<number>(5);
  const [areaSqFt, setAreaSqFt] = useState<number>(4200);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Selected Amenities
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Swimming Pool', 'Parking', 'Security System', 'Air Conditioning'
  ]);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Valuation Estimator Tool State
  const [valCity, setValCity] = useState('Beverly Hills');
  const [valArea, setValArea] = useState(3500);
  const [valBeds, setValBeds] = useState(4);
  const [valCondition, setValCondition] = useState('luxury');

  const amenityList = [
    'Swimming Pool', 'Parking', 'Security System', 'Air Conditioning', 
    'Garden', 'Balcony', 'Electricity Backup', 'Water Supply', 'Furnished', 'CCTV'
  ];

  const toggleAmenity = (name: string) => {
    setSelectedAmenities(prev =>
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  // Instant valuation calculation logic
  const calculateValuation = () => {
    let baseRate = 850; // default per sqft
    if (valCity === 'Manhattan') baseRate = 1800;
    if (valCity === 'Beverly Hills') baseRate = 1600;
    if (valCity === 'Miami Beach') baseRate = 1200;
    if (valCity === 'London') baseRate = 1900;
    if (valCity === 'Aspen') baseRate = 1500;
    if (valCity === 'Dera Ismail Khan') baseRate = 75; // PKR to USD normalized

    let multiplier = 1.0;
    if (valCondition === 'ultra-luxury') multiplier = 1.35;
    if (valCondition === 'renovated') multiplier = 1.15;
    if (valCondition === 'standard') multiplier = 0.95;

    const estimatedValue = Math.round(valArea * baseRate * multiplier);
    return estimatedValue;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyTitle || !ownerName || !ownerEmail) return;

    setSubmitting(true);

    setTimeout(() => {
      // Add property to context
      addProperty({
        slug: propertyTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: propertyTitle,
        seoTitle: `${propertyTitle} | Properties for Sale Velmora`,
        metaDescription: description || `Discover ${propertyTitle} in ${city}. Verified luxury real estate listing.`,
        price: Number(price),
        currency: '$',
        listingType,
        propertyType,
        status: 'pending', // Pending review as required!
        featured: false,
        isNew: true,
        location: {
          city,
          state: 'State',
          country: 'USA',
          address: address || 'Private Residential Drive',
          neighborhood: neighborhood || city,
          coordinates: { lat: 34.0, lng: -118.0 }
        },
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        areaSqFt: Number(areaSqFt),
        garages: 2,
        yearBuilt: 2024,
        furnished: 'Furnished',
        images: imageUrl ? [imageUrl, heroVilla] : [heroVilla],
        description: description || `Exceptional ${propertyType} offering refined architecture and prime location in ${city}.`,
        features: [
          'High Ceilings & Bespoke Finishes',
          'Automated Climate & Security Control',
          'Private Dedicated Parking Garage'
        ],
        amenities: selectedAmenities.map(name => ({ name, category: 'Comfort' })),
        agentId: 'agent-1'
      });

      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="bg-[#FBFBF9] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header with strong SEO keywords */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9C7E44] mb-2">
            Sell Property · Real Estate Agency Representation
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191C1E] tracking-tight">
            List Your Property With Velmora Estates
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#545B63] leading-relaxed">
            Reach qualified global buyers and institutional investors. Our real estate agents and property consultants utilize confidential syndication, architectural photography, and private wealth networks to maximize your property valuation.
          </p>
        </div>

        {/* Property Valuation Tool Banner */}
        <div className="rounded-2xl border border-[#E8E5DF] bg-[#FAF8F5] p-8 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9C7E44]">
                <Calculator className="h-4 w-4" />
                <span>Instant Property Valuation</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#191C1E]">
                What Is Your Property Worth in Today's Market?
              </h3>
              <p className="text-xs text-[#545B63] leading-relaxed">
                Use our automated valuation model based on recent verified property transactions and localized price-per-square-foot benchmarks.
              </p>

              <div className="rounded-xl bg-[#191C1E] p-5 text-white">
                <span className="text-xs text-[#C2A772] uppercase font-semibold">
                  Estimated Valuation Range
                </span>
                <p className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1 tabular-nums">
                  ${calculateValuation().toLocaleString()}
                </p>
                <p className="text-[11px] text-[#A6ADB8] mt-1">
                  Based on {valArea.toLocaleString()} sq ft in {valCity}. For an official appraisal, our certified consultants offer complimentary on-site diligence.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-[#E8E5DF] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#737A82] mb-1">Location City</label>
                <select
                  value={valCity}
                  onChange={(e) => setValCity(e.target.value)}
                  className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:outline-none"
                >
                  <option value="Beverly Hills">Beverly Hills, CA</option>
                  <option value="Manhattan">Manhattan, NY</option>
                  <option value="Miami Beach">Miami Beach, FL</option>
                  <option value="London">London, UK</option>
                  <option value="Aspen">Aspen, CO</option>
                  <option value="Dera Ismail Khan">Dera Ismail Khan, PK</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#737A82] mb-1">Built-Up Area (Sq Ft)</label>
                <input
                  type="number"
                  value={valArea}
                  onChange={(e) => setValArea(Number(e.target.value))}
                  className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#737A82] mb-1">Bedrooms</label>
                <select
                  value={valBeds}
                  onChange={(e) => setValBeds(Number(e.target.value))}
                  className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:outline-none"
                >
                  <option value={2}>2 Bedrooms</option>
                  <option value={3}>3 Bedrooms</option>
                  <option value={4}>4 Bedrooms</option>
                  <option value={5}>5+ Bedrooms</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#737A82] mb-1">Architectural Standard</label>
                <select
                  value={valCondition}
                  onChange={(e) => setValCondition(e.target.value)}
                  className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:outline-none"
                >
                  <option value="ultra-luxury">Ultra-Luxury / Trophy Asset</option>
                  <option value="luxury">Modern Luxury Standard</option>
                  <option value="renovated">Recently Renovated</option>
                  <option value="standard">Standard Residential</option>
                </select>
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="button"
                  onClick={onContactExpert}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-sm border border-[#191C1E] bg-[#FBFBF9] py-2 text-xs font-semibold uppercase tracking-wider text-[#191C1E] hover:bg-[#191C1E] hover:text-white transition-colors"
                >
                  <span>Request Full Professional Valuation Dossier</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Main Listing Submission Form */}
        <div className="rounded-2xl border border-[#E8E5DF] bg-white p-8 sm:p-12 shadow-sm">
          <div className="max-w-2xl mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#191C1E]">
              Submit Your Property for Listing
            </h2>
            <p className="text-xs text-[#545B63] mt-2">
              Complete the property specification form below. Once received, our real estate agents will schedule a professional walkthrough and prepare high-resolution marketing materials.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-xl bg-[#FAF8F5] border border-[#C2A772] p-8 text-center space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 mx-auto">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#191C1E]">
                Property Submission Received!
              </h3>
              <p className="text-xs text-[#545B63] max-w-lg mx-auto">
                Thank you, {ownerName}. Your property "{propertyTitle}" has been added to our system and is marked as <strong className="text-[#9C7E44]">Pending Review</strong>.
              </p>
              <div className="rounded-md bg-white p-4 max-w-md mx-auto border border-[#E8E5DF] text-xs text-[#737A82]">
                <ShieldCheck className="h-5 w-5 text-[#C2A772] mx-auto mb-1" />
                <strong>Notice:</strong> Your property will be reviewed by our team before publication to ensure title integrity and premium presentation.
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="inline-flex items-center gap-2 rounded-sm bg-[#191C1E] px-6 py-2.5 text-xs font-semibold uppercase text-white"
              >
                Submit Another Property
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-8">
              
              {/* Owner Information */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9C7E44] mb-3 pb-1 border-b border-[#F0ECE1]">
                  1. Owner & Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Owner Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Richard Vanderbilt"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="richard@estate.com"
                      value={ownerEmail}
                      onChange={(e) => setOwnerEmail(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={ownerPhone}
                      onChange={(e) => setOwnerPhone(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9C7E44] mb-3 pb-1 border-b border-[#F0ECE1]">
                  2. Property Specification
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Property Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Modern Luxury 4 Bedroom Villa for Sale"
                      value={propertyTitle}
                      onChange={(e) => setPropertyTitle(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Listing Type *</label>
                    <select
                      value={listingType}
                      onChange={(e) => setListingType(e.target.value as ListingType)}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    >
                      <option value="sale">For Sale</option>
                      <option value="rent">For Rent</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Property Type *</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    >
                      <option value="villa">Luxury Villa</option>
                      <option value="apartment">Modern Apartment</option>
                      <option value="house">House / Family Home</option>
                      <option value="penthouse">Sky Penthouse</option>
                      <option value="commercial">Commercial Real Estate</option>
                      <option value="land">Plots & Land</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Expected Price ($ USD) *</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Bedrooms</label>
                    <input
                      type="number"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(Number(e.target.value))}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Bathrooms</label>
                    <input
                      type="number"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(Number(e.target.value))}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">City / Location *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Beverly Hills / Dera Ismail Khan / London"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Neighborhood / Sector</label>
                    <input
                      type="text"
                      placeholder="e.g. Trousdale / Defense Colony"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Built-Up Area (Sq Ft) *</label>
                    <input
                      type="number"
                      required
                      value={areaSqFt}
                      onChange={(e) => setAreaSqFt(Number(e.target.value))}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Description & Media */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9C7E44] mb-3 pb-1 border-b border-[#F0ECE1]">
                  3. Description & Amenities
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Property Description</label>
                    <textarea
                      rows={4}
                      placeholder="Detail the architectural style, recent renovations, views, custom kitchen, or grounds..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>

                  <div>
                    <span className="block text-xs font-medium text-[#737A82] mb-2">Select Included Amenities</span>
                    <div className="flex flex-wrap gap-2">
                      {amenityList.map((a) => {
                        const isSelected = selectedAmenities.includes(a);
                        return (
                          <button
                            key={a}
                            type="button"
                            onClick={() => toggleAmenity(a)}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                              isSelected
                                ? 'border-[#C2A772] bg-[#FAF8F5] text-[#9C7E44]'
                                : 'border-[#E8E5DF] bg-white text-[#545B63] hover:border-[#191C1E]'
                            }`}
                          >
                            {a}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">
                      Property Image URL (Optional - or leave blank to use Velmora studio showcase photography)
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.example.com/property-photo.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Review Statement & Submit */}
              <div className="pt-4 border-t border-[#F0ECE1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-[#737A82] flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#9C7E44] shrink-0" />
                  <span>“Your property will be reviewed by our team before publication.”</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#191C1E] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2B3037] disabled:opacity-50 transition-colors"
                >
                  <Building2 className="h-4 w-4 text-[#C2A772]" />
                  <span>{submitting ? 'Submitting...' : 'Submit Property for Listing'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
