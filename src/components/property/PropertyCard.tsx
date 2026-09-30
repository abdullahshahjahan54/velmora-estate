import React from 'react';
import { Property } from '../../types/property';
import { usePropertyContext } from '../../context/PropertyContext';
import { Heart, Scale, Bed, Bath, Square, ArrowUpRight, MapPin } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  layout?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onSelect,
  layout = 'grid' 
}) => {
  const { favorites, comparisons, toggleFavorite, toggleComparison, formatPrice } = usePropertyContext();

  const isFavorited = favorites.includes(property.id);
  const isCompared = comparisons.includes(property.id);

  const displayImage = property.images && property.images.length > 0
    ? property.images[0]
    : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

  if (layout === 'list') {
    return (
      <article className="group relative flex flex-col md:flex-row overflow-hidden rounded-lg border border-[#E8E5DF] bg-white transition-all duration-300 hover:shadow-lg hover:border-[#C2A772]/60">
        {/* Media Container */}
        <div className="relative md:w-80 shrink-0 aspect-[16/10] md:aspect-auto overflow-hidden bg-[#ECE8E1]">
          <img
            src={displayImage}
            alt={`${property.title} in ${property.location.city} - Real estate property for ${property.listingType}`}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle natural kicker overlay */}
          <div className="absolute top-3 left-3 bg-[#191C1E]/80 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white">
            {property.listingType === 'sale' ? 'For Sale' : 'For Rent'}
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleComparison(property.id);
              }}
              title={isCompared ? 'Remove from comparison' : 'Compare property'}
              className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all ${
                isCompared 
                  ? 'bg-[#C2A772] text-white shadow-sm' 
                  : 'bg-white/85 text-[#191C1E] hover:bg-white'
              }`}
            >
              <Scale className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(property.id);
              }}
              title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
              className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all ${
                isFavorited 
                  ? 'bg-rose-600 text-white shadow-sm' 
                  : 'bg-white/85 text-[#191C1E] hover:bg-white'
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
          <div>
            {/* Location & Property Type (Clean unboxed text) */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#737A82] mb-1.5">
              <span className="uppercase tracking-wider text-[#9C7E44]">{property.propertyType}</span>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-[#737A82]" />
                <span>{property.location.neighborhood}, {property.location.city}</span>
              </div>
            </div>

            {/* Title */}
            <h3 
              onClick={() => onSelect(property)}
              className="font-serif text-xl font-bold text-[#191C1E] transition-colors group-hover:text-[#9C7E44] cursor-pointer"
            >
              {property.title}
            </h3>

            <p className="mt-2 text-xs text-[#545B63] line-clamp-2 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Specs & Pricing */}
          <div className="mt-5 pt-4 border-t border-[#F0ECE1] flex flex-wrap items-center justify-between gap-4">
            {/* Specs */}
            <div className="flex items-center gap-4 text-xs text-[#545B63]">
              {property.bedrooms > 0 && (
                <div className="flex items-center gap-1.5">
                  <Bed className="h-3.5 w-3.5 text-[#9C7E44]" />
                  <span>{property.bedrooms} Beds</span>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="flex items-center gap-1.5">
                  <Bath className="h-3.5 w-3.5 text-[#9C7E44]" />
                  <span>{property.bathrooms} Baths</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Square className="h-3.5 w-3.5 text-[#9C7E44]" />
                <span className="tabular-nums">{property.areaSqFt.toLocaleString()} Sq Ft</span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center gap-4">
              <div>
                <span className="font-serif text-2xl font-bold text-[#191C1E] tabular-nums">
                  {formatPrice(property.price, property.currency)}
                </span>
                {property.pricePrefix && (
                  <span className="text-xs text-[#737A82] ml-1">{property.pricePrefix}</span>
                )}
              </div>

              <button
                type="button"
                onClick={() => onSelect(property)}
                className="inline-flex items-center gap-1.5 rounded-sm bg-[#191C1E] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2B3037] transition-colors"
              >
                <span>View Details</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#C2A772]" />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Grid Layout
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-[#E8E5DF] bg-white transition-all duration-300 hover:shadow-xl hover:border-[#C2A772]/70">
      {/* Media Box */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECE8E1]">
        <img
          src={displayImage}
          alt={`${property.title} in ${property.location.city} - Real estate property for ${property.listingType}`}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Status indicator (quiet natural tag) */}
        <div className="absolute top-3 left-3 bg-[#191C1E]/80 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white">
          {property.listingType === 'sale' ? 'For Sale' : 'For Rent'}
        </div>

        {property.featured && (
          <div className="absolute top-3 left-24 bg-[#C2A772] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#121519]">
            Featured
          </div>
        )}

        {/* Action icons */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleComparison(property.id);
            }}
            title={isCompared ? 'Remove from comparison' : 'Compare property'}
            className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all ${
              isCompared 
                ? 'bg-[#C2A772] text-white shadow-sm' 
                : 'bg-white/85 text-[#191C1E] hover:bg-white'
            }`}
          >
            <Scale className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
            title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
            className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all ${
              isFavorited 
                ? 'bg-rose-600 text-white shadow-sm' 
                : 'bg-white/85 text-[#191C1E] hover:bg-white'
            }`}
          >
            <Heart className={`h-3.5 w-3.5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Body Box */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Location & Type */}
          <div className="flex items-center gap-2 text-xs font-medium text-[#737A82] mb-1">
            <span className="uppercase tracking-wider text-[#9C7E44]">{property.propertyType}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{property.location.neighborhood}, {property.location.city}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(property)}
            className="font-serif text-lg font-bold text-[#191C1E] transition-colors group-hover:text-[#9C7E44] cursor-pointer line-clamp-1"
          >
            {property.title}
          </h3>

          {/* Pricing */}
          <div className="mt-2.5 flex items-baseline gap-1">
            <span className="font-serif text-2xl font-bold text-[#191C1E] tabular-nums">
              {formatPrice(property.price, property.currency)}
            </span>
            {property.pricePrefix && (
              <span className="text-xs text-[#737A82]">{property.pricePrefix}</span>
            )}
          </div>
        </div>

        {/* Specs & View Button */}
        <div className="mt-4 pt-3.5 border-t border-[#F0ECE1] flex items-center justify-between text-xs text-[#545B63]">
          <div className="flex items-center gap-3">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1" title="Bedrooms">
                <Bed className="h-3.5 w-3.5 text-[#9C7E44]" />
                <span className="tabular-nums">{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1" title="Bathrooms">
                <Bath className="h-3.5 w-3.5 text-[#9C7E44]" />
                <span className="tabular-nums">{property.bathrooms}</span>
              </div>
            )}
            <div className="flex items-center gap-1" title="Area Sq Ft">
              <Square className="h-3.5 w-3.5 text-[#9C7E44]" />
              <span className="tabular-nums">{property.areaSqFt.toLocaleString()} sqft</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelect(property)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#191C1E] hover:text-[#9C7E44] transition-colors"
          >
            <span>View</span>
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </article>
  );
};
