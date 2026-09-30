import React from 'react';
import { Property } from '../../types/property';
import { usePropertyContext } from '../../context/PropertyContext';
import { 
  Scale, 
  Trash2, 
  ArrowRight, 
  Check, 
  X, 
  Bed, 
  Bath, 
  Square, 
  MapPin 
} from 'lucide-react';

interface ComparisonPageProps {
  onSelectProperty: (property: Property) => void;
  onExploreProperties: () => void;
}

export const ComparisonPage: React.FC<ComparisonPageProps> = ({
  onSelectProperty,
  onExploreProperties
}) => {
  const { properties, comparisons, removeFromComparison, clearComparison, formatPrice } = usePropertyContext();

  const comparedProperties = properties.filter(p => comparisons.includes(p.id));

  const standardAmenities = [
    'Swimming Pool',
    'Parking',
    'Garden',
    'Air Conditioning',
    'Security System',
    'Balcony',
    'Electricity Backup',
    'Furnished'
  ];

  if (comparedProperties.length === 0) {
    return (
      <div className="bg-[#FBFBF9] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center space-y-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFECE6] text-[#191C1E] mx-auto">
            <Scale className="h-8 w-8 text-[#9C7E44]" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#191C1E]">
            Property Comparison Matrix
          </h1>
          <p className="text-xs sm:text-sm text-[#545B63] leading-relaxed">
            You haven't added any properties to compare yet. Browse our verified luxury homes, apartments, villas, and commercial real estate and click the scale icon to compare up to 4 properties side-by-side.
          </p>
          <button
            onClick={onExploreProperties}
            className="inline-flex items-center gap-2 rounded-sm bg-[#191C1E] px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2B3037] transition-colors"
          >
            <span>Explore Properties</span>
            <ArrowRight className="h-4 w-4 text-[#C2A772]" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FBFBF9] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#191C1E]">
              Property Comparison Matrix
            </h1>
            <p className="text-xs text-[#545B63] mt-1">
              Comparing {comparedProperties.length} selected real estate properties
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearComparison}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#E8E5DF] bg-white px-3.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear All</span>
            </button>
            <button
              onClick={onExploreProperties}
              className="inline-flex items-center gap-1.5 rounded-sm bg-[#191C1E] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white"
            >
              <span>Add More Properties</span>
            </button>
          </div>
        </div>

        {/* Comparison Table / Matrix */}
        <div className="overflow-x-auto rounded-xl border border-[#E8E5DF] bg-white shadow-sm">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#E8E5DF] bg-[#FAF8F5]">
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[#737A82] w-48">
                  Specification
                </th>
                {comparedProperties.map(property => (
                  <th key={property.id} className="p-4 w-72 align-top">
                    <div className="space-y-3">
                      <div className="relative aspect-[16/10] rounded-md overflow-hidden bg-[#ECE8E1]">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />
                        <button
                          onClick={() => removeFromComparison(property.id)}
                          title="Remove from comparison"
                          className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div>
                        <h4 
                          onClick={() => onSelectProperty(property)}
                          className="font-serif text-sm font-bold text-[#191C1E] hover:text-[#9C7E44] cursor-pointer line-clamp-1"
                        >
                          {property.title}
                        </h4>
                        <p className="font-serif text-lg font-bold text-[#191C1E] mt-1 tabular-nums">
                          {formatPrice(property.price, property.currency)}
                        </p>
                      </div>

                      <button
                        onClick={() => onSelectProperty(property)}
                        className="w-full rounded-sm bg-[#191C1E] py-1.5 text-xs font-semibold text-white uppercase tracking-wider hover:bg-[#2B3037] transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F0ECE1] text-xs text-[#545B63]">
              
              {/* Location */}
              <tr>
                <td className="p-4 font-semibold text-[#191C1E] bg-[#FAF8F5]/50">Location</td>
                {comparedProperties.map(p => (
                  <td key={p.id} className="p-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-[#9C7E44] shrink-0" />
                      <span>{p.location.neighborhood}, {p.location.city}</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Property Type */}
              <tr>
                <td className="p-4 font-semibold text-[#191C1E] bg-[#FAF8F5]/50">Property Type</td>
                {comparedProperties.map(p => (
                  <td key={p.id} className="p-4 uppercase tracking-wider font-medium text-[#191C1E]">
                    {p.propertyType} ({p.listingType === 'sale' ? 'For Sale' : 'For Rent'})
                  </td>
                ))}
              </tr>

              {/* Price / Sq Ft */}
              <tr>
                <td className="p-4 font-semibold text-[#191C1E] bg-[#FAF8F5]/50">Est. Price / Sq Ft</td>
                {comparedProperties.map(p => (
                  <td key={p.id} className="p-4 tabular-nums">
                    ${Math.round(p.price / p.areaSqFt).toLocaleString()} / sq ft
                  </td>
                ))}
              </tr>

              {/* Bedrooms */}
              <tr>
                <td className="p-4 font-semibold text-[#191C1E] bg-[#FAF8F5]/50">Bedrooms</td>
                {comparedProperties.map(p => (
                  <td key={p.id} className="p-4 tabular-nums font-medium text-[#191C1E]">
                    {p.bedrooms > 0 ? `${p.bedrooms} Beds` : 'Studio / Commercial'}
                  </td>
                ))}
              </tr>

              {/* Bathrooms */}
              <tr>
                <td className="p-4 font-semibold text-[#191C1E] bg-[#FAF8F5]/50">Bathrooms</td>
                {comparedProperties.map(p => (
                  <td key={p.id} className="p-4 tabular-nums font-medium text-[#191C1E]">
                    {p.bathrooms} Baths
                  </td>
                ))}
              </tr>

              {/* Total Area */}
              <tr>
                <td className="p-4 font-semibold text-[#191C1E] bg-[#FAF8F5]/50">Interior Area</td>
                {comparedProperties.map(p => (
                  <td key={p.id} className="p-4 tabular-nums font-medium text-[#191C1E]">
                    {p.areaSqFt.toLocaleString()} Sq Ft
                  </td>
                ))}
              </tr>

              {/* Garages */}
              <tr>
                <td className="p-4 font-semibold text-[#191C1E] bg-[#FAF8F5]/50">Parking / Garages</td>
                {comparedProperties.map(p => (
                  <td key={p.id} className="p-4 tabular-nums">
                    {p.garages} Dedicated Bays
                  </td>
                ))}
              </tr>

              {/* Furnished Status */}
              <tr>
                <td className="p-4 font-semibold text-[#191C1E] bg-[#FAF8F5]/50">Furnished Status</td>
                {comparedProperties.map(p => (
                  <td key={p.id} className="p-4 font-medium text-[#9C7E44]">
                    {p.furnished}
                  </td>
                ))}
              </tr>

              {/* Amenities Checklist */}
              {standardAmenities.map(amenity => (
                <tr key={amenity}>
                  <td className="p-4 font-semibold text-[#191C1E] bg-[#FAF8F5]/50">{amenity}</td>
                  {comparedProperties.map(p => {
                    const hasAmenity = p.amenities.some(a => a.name.toLowerCase().includes(amenity.toLowerCase()));
                    return (
                      <td key={p.id} className="p-4">
                        {hasAmenity ? (
                          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                            <Check className="h-4 w-4" />
                            <span>Included</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-[#A6ADB8]">
                            <X className="h-4 w-4" />
                            <span>Not Listed</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
