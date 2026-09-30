import React, { useState, useEffect } from 'react';
import { Property, Agent } from '../../types/property';
import { usePropertyContext } from '../../context/PropertyContext';
import { updateSEO } from '../../utils/seo';
import { PropertyCard } from './PropertyCard';
import { 
  Heart, 
  Scale, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  ShieldCheck, 
  Check, 
  Phone, 
  Mail, 
  MessageSquare, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X,
  Compass,
  ArrowRight,
  Sparkles,
  Building,
  Car
} from 'lucide-react';

interface PropertyDetailsViewProps {
  property: Property;
  onBack: () => void;
  onSelectProperty: (property: Property) => void;
  onSelectAgent: (agent: Agent) => void;
}

export const PropertyDetailsView: React.FC<PropertyDetailsViewProps> = ({
  property,
  onBack,
  onSelectProperty,
  onSelectAgent
}) => {
  const { 
    properties, 
    agents, 
    favorites, 
    comparisons, 
    toggleFavorite, 
    toggleComparison, 
    formatPrice, 
    recordPropertyView,
    addInquiry,
    scheduleViewing 
  } = usePropertyContext();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'floorplan' | 'location'>('overview');
  
  // Inquiry Form State
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState(`Hello, I am interested in ${property.title} (ID: ${property.id}). Please provide further information.`);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Schedule Viewing Form State
  const [viewingDate, setViewingDate] = useState('2026-10-15');
  const [viewingTime, setViewingTime] = useState('11:00 AM');
  const [viewingName, setViewingName] = useState('');
  const [viewingPhone, setViewingPhone] = useState('');
  const [viewingEmail, setViewingEmail] = useState('');
  const [viewingSubmitted, setViewingSubmitted] = useState(false);

  const [copiedLink, setCopiedLink] = useState(false);

  const agent = agents.find(a => a.id === property.agentId) || agents[0];
  const isFavorited = favorites.includes(property.id);
  const isCompared = comparisons.includes(property.id);

  // Record view & update SEO
  useEffect(() => {
    recordPropertyView(property.id);
    updateSEO({
      title: `${property.title} | Velmora Estates`,
      description: property.metaDescription,
      keywords: `property for sale, ${property.propertyType} for sale, luxury real estate, ${property.location.city} properties, ${property.title}`,
      ogType: 'article',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "SingleFamilyResidence",
        "name": property.title,
        "description": property.description,
        "numberOfRooms": property.bedrooms,
        "numberOfBathroomsTotal": property.bathrooms,
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": property.areaSqFt,
          "unitCode": "FTK"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": property.location.address,
          "addressLocality": property.location.city,
          "addressRegion": property.location.state,
          "addressCountry": property.location.country
        },
        "offers": {
          "@type": "Offer",
          "price": property.price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [property.id]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail) return;

    addInquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      name: inquiryName,
      email: inquiryEmail,
      phone: inquiryPhone,
      message: inquiryMessage,
      type: 'inquiry'
    });

    setInquirySubmitted(true);
    setTimeout(() => setInquirySubmitted(false), 6000);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewingName || !viewingPhone || !viewingDate) return;

    scheduleViewing({
      propertyId: property.id,
      propertyTitle: property.title,
      name: viewingName,
      email: viewingEmail || 'client@velmora.com',
      phone: viewingPhone,
      date: viewingDate,
      time: viewingTime,
      notes: 'Scheduled via Property Details portal'
    });

    setViewingSubmitted(true);
    setTimeout(() => setViewingSubmitted(false), 6000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const similarProperties = properties
    .filter(p => p.id !== property.id && (p.propertyType === property.propertyType || p.listingType === property.listingType))
    .slice(0, 3);

  const images = property.images && property.images.length > 0 ? property.images : [property.images[0]];

  return (
    <div className="bg-[#FBFBF9] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between py-4 border-b border-[#E8E5DF] mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#545B63] hover:text-[#191C1E] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Property Listings</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#E8E5DF] bg-white px-3 py-1.5 text-xs font-medium text-[#191C1E] hover:border-[#191C1E] transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={() => toggleComparison(property.id)}
              className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                isCompared
                  ? 'border-[#C2A772] bg-[#FAF8F5] text-[#9C7E44]'
                  : 'border-[#E8E5DF] bg-white text-[#191C1E] hover:border-[#191C1E]'
              }`}
            >
              <Scale className="h-3.5 w-3.5" />
              <span>{isCompared ? 'Compared' : 'Compare'}</span>
            </button>
            <button
              onClick={() => toggleFavorite(property.id)}
              className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                isFavorited
                  ? 'border-rose-300 bg-rose-50 text-rose-600'
                  : 'border-[#E8E5DF] bg-white text-[#191C1E] hover:border-[#191C1E]'
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${isFavorited ? 'fill-current' : ''}`} />
              <span>{isFavorited ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Title & Price Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#737A82] mb-2">
              <span className="uppercase tracking-wider text-[#9C7E44] font-semibold">{property.listingType === 'sale' ? 'For Sale' : 'For Rent'}</span>
              <span>·</span>
              <span className="uppercase tracking-wider">{property.propertyType}</span>
              <span>·</span>
              <span className="text-[#9FA8B4]">Property ID: {property.id}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191C1E] tracking-tight">
              {property.title}
            </h1>

            <div className="mt-2.5 flex items-center gap-2 text-xs sm:text-sm text-[#545B63]">
              <MapPin className="h-4 w-4 text-[#9C7E44]" />
              <span>{property.location.address}, {property.location.neighborhood}, {property.location.city}, {property.location.state}</span>
            </div>
          </div>

          <div className="lg:text-right">
            <span className="text-xs text-[#737A82] uppercase tracking-wider block mb-1">
              Asking Price
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191C1E] tabular-nums">
                {formatPrice(property.price, property.currency)}
              </span>
              {property.pricePrefix && (
                <span className="text-sm font-medium text-[#737A82]">{property.pricePrefix}</span>
              )}
            </div>
            <p className="text-[11px] text-[#737A82] mt-1 tabular-nums">
              Est. ${Math.round(property.price / property.areaSqFt).toLocaleString()} / sq ft
            </p>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="space-y-3 mb-10">
          <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden rounded-xl border border-[#E8E5DF] bg-[#ECE8E1]">
            <img
              src={images[activeImageIndex]}
              alt={`${property.title} - View ${activeImageIndex + 1}`}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition-all duration-500"
            />

            {/* Gallery Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-[#191C1E] hover:bg-white transition-all shadow-md"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-[#191C1E] hover:bg-white transition-all shadow-md"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Lightbox Trigger */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-md bg-[#191C1E]/80 backdrop-blur-md px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#191C1E] transition-all"
            >
              <Maximize2 className="h-3.5 w-3.5 text-[#C2A772]" />
              <span>Full Screen Gallery ({images.length})</span>
            </button>
          </div>

          {/* Thumbnails row */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[16/10] w-28 shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                    activeImageIndex === idx ? 'border-[#C2A772] scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="max-w-6xl w-full max-h-[85vh] flex flex-col items-center">
              <img
                src={images[activeImageIndex]}
                alt="Full size view"
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto object-contain rounded-lg"
              />
              <div className="mt-4 flex items-center gap-4 text-white text-xs">
                <span>Image {activeImageIndex + 1} of {images.length}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                    className="px-3 py-1 rounded bg-white/20 hover:bg-white/30"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                    className="px-3 py-1 rounded bg-white/20 hover:bg-white/30"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Key Quick Specs Bar (Single row unboxed discipline) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 p-5 rounded-xl border border-[#E8E5DF] bg-white shadow-xs mb-10 text-center">
          <div className="border-r border-[#F0ECE1] last:border-none">
            <p className="text-[11px] uppercase tracking-wider text-[#737A82]">Bedrooms</p>
            <p className="font-serif text-2xl font-bold text-[#191C1E] mt-0.5 tabular-nums">
              {property.bedrooms > 0 ? property.bedrooms : 'Studio'}
            </p>
          </div>
          <div className="border-r border-[#F0ECE1] last:border-none">
            <p className="text-[11px] uppercase tracking-wider text-[#737A82]">Bathrooms</p>
            <p className="font-serif text-2xl font-bold text-[#191C1E] mt-0.5 tabular-nums">
              {property.bathrooms}
            </p>
          </div>
          <div className="border-r border-[#F0ECE1] last:border-none">
            <p className="text-[11px] uppercase tracking-wider text-[#737A82]">Interior Area</p>
            <p className="font-serif text-2xl font-bold text-[#191C1E] mt-0.5 tabular-nums">
              {property.areaSqFt.toLocaleString()} sqft
            </p>
          </div>
          <div className="border-r border-[#F0ECE1] last:border-none">
            <p className="text-[11px] uppercase tracking-wider text-[#737A82]">Garages / Parking</p>
            <p className="font-serif text-2xl font-bold text-[#191C1E] mt-0.5 tabular-nums">
              {property.garages} Bays
            </p>
          </div>
          <div className="border-r border-[#F0ECE1] last:border-none">
            <p className="text-[11px] uppercase tracking-wider text-[#737A82]">Year Built</p>
            <p className="font-serif text-2xl font-bold text-[#191C1E] mt-0.5 tabular-nums">
              {property.yearBuilt}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-[#737A82]">Furnished</p>
            <p className="font-serif text-xl font-bold text-[#9C7E44] mt-0.5">
              {property.furnished}
            </p>
          </div>
        </div>

        {/* Main Content Layout: Left 8 cols, Right 4 cols (Forms & Agent) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column (8 cols): Description, Amenities, Floorplan, Neighborhood */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Nav Tabs for details */}
            <div className="flex items-center gap-6 border-b border-[#E8E5DF] text-xs font-semibold uppercase tracking-wider">
              {[
                { id: 'overview', label: 'Property Overview' },
                { id: 'features', label: 'Amenities & Features' },
                { id: 'floorplan', label: 'Floor Plan' },
                { id: 'location', label: 'Neighborhood & Map' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 transition-colors relative ${
                    activeTab === tab.id ? 'text-[#191C1E] font-bold' : 'text-[#737A82] hover:text-[#191C1E]'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#C2A772]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#191C1E] mb-3">
                    Detailed Architectural Description
                  </h3>
                  <p className="text-sm leading-relaxed text-[#545B63] whitespace-pre-line">
                    {property.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0ECE1]">
                  <h4 className="font-serif text-xl font-bold text-[#191C1E] mb-4">
                    Key Highlights & Bespoke Finishes
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#545B63]">
                        <Check className="h-4 w-4 text-[#9C7E44] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Features & Amenities */}
            {activeTab === 'features' && (
              <div className="space-y-6">
                <h3 className="font-serif text-2xl font-bold text-[#191C1E]">
                  Verified Property Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3.5 rounded-lg border border-[#E8E5DF] bg-white shadow-xs"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FAF8F5] text-[#9C7E44]">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#191C1E]">{amenity.name}</p>
                        <p className="text-[10px] text-[#737A82]">{amenity.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Floor Plan */}
            {activeTab === 'floorplan' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-bold text-[#191C1E]">
                    Architectural Layout & Spatial Plan
                  </h3>
                  <span className="text-xs text-[#737A82] tabular-nums">
                    Scale: 1:100 Metric / Imperial
                  </span>
                </div>
                <div className="rounded-xl border border-[#E8E5DF] bg-white p-6 shadow-xs flex flex-col items-center">
                  <img
                    src={property.floorPlanUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'}
                    alt={`Floor plan for ${property.title}`}
                    referrerPolicy="no-referrer"
                    className="max-h-96 w-auto object-contain rounded-md"
                  />
                  <p className="mt-4 text-xs text-[#737A82] text-center max-w-md">
                    Full architectural CAD and high-resolution PDF blueprints available to verified buyers upon broker NDA.
                  </p>
                </div>
              </div>
            )}

            {/* Tab: Location & Interactive Map */}
            {activeTab === 'location' && (
              <div className="space-y-6">
                <h3 className="font-serif text-2xl font-bold text-[#191C1E]">
                  Neighborhood Context & Location
                </h3>
                <div className="rounded-xl border border-[#E8E5DF] bg-white p-4 shadow-xs">
                  {/* Simulated interactive map canvas */}
                  <div className="relative aspect-[16/9] w-full rounded-lg bg-[#EAE7E0] overflow-hidden flex items-center justify-center border border-[#DDD]">
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#C2A772_1px,transparent_1px)] [background-size:16px_16px]" />
                    
                    {/* Simulated Map Markers */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#191C1E] text-[#C2A772] shadow-2xl animate-bounce">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div className="mt-2 bg-white px-3 py-1 rounded shadow-md text-xs font-bold text-[#191C1E]">
                        {property.title}
                      </div>
                    </div>

                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-md text-xs shadow-sm space-y-1">
                      <p className="font-bold text-[#191C1E]">{property.location.neighborhood}</p>
                      <p className="text-[#545B63]">{property.location.city}, {property.location.state}</p>
                      <p className="text-[10px] text-[#9C7E44] font-mono">
                        LAT: {property.location.coordinates.lat} / LNG: {property.location.coordinates.lng}
                      </p>
                    </div>
                  </div>

                  {/* Neighborhood Points of Interest */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
                    <div className="p-3 bg-[#FAF8F5] rounded-md">
                      <span className="text-[#737A82] block text-[10px] uppercase">International Airport</span>
                      <strong className="text-[#191C1E]">18 Minutes</strong>
                    </div>
                    <div className="p-3 bg-[#FAF8F5] rounded-md">
                      <span className="text-[#737A82] block text-[10px] uppercase">Private Schools</span>
                      <strong className="text-[#191C1E]">0.8 Miles</strong>
                    </div>
                    <div className="p-3 bg-[#FAF8F5] rounded-md">
                      <span className="text-[#737A82] block text-[10px] uppercase">Marina / Coast</span>
                      <strong className="text-[#191C1E]">5 Minutes</strong>
                    </div>
                    <div className="p-3 bg-[#FAF8F5] rounded-md">
                      <span className="text-[#737A82] block text-[10px] uppercase">Fine Dining & Retail</span>
                      <strong className="text-[#191C1E]">Walking Distance</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column (4 cols): Agent Card, Schedule Viewing, Send Inquiry */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Agent Profile Card */}
            <div className="rounded-xl border border-[#E8E5DF] bg-white p-6 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-[#9C7E44] font-semibold block mb-3">
                Listing Real Estate Agent
              </span>

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  referrerPolicy="no-referrer"
                  className="h-16 w-16 rounded-full object-cover border border-[#E8E5DF]"
                />
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#191C1E]">
                    {agent.name}
                  </h4>
                  <p className="text-xs text-[#737A82]">{agent.title}</p>
                  <p className="text-[11px] text-[#9C7E44] font-medium mt-0.5">{agent.experience}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#545B63] pt-3 border-t border-[#F0ECE1]">
                <div className="flex items-center justify-between">
                  <span>Direct Phone:</span>
                  <strong className="text-[#191C1E]">{agent.phone}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Official Email:</span>
                  <strong className="text-[#191C1E] truncate max-w-[170px]">{agent.email}</strong>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="mt-5 grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-sm bg-emerald-700 py-2.5 text-xs font-semibold text-white hover:bg-emerald-800 transition-colors"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={() => onSelectAgent(agent)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-sm border border-[#191C1E] bg-white py-2.5 text-xs font-semibold text-[#191C1E] hover:bg-[#191C1E] hover:text-white transition-colors"
                >
                  <span>View Profile</span>
                </button>
              </div>
            </div>

            {/* Schedule a Property Viewing Box */}
            <div className="rounded-xl border border-[#E8E5DF] bg-[#FAF8F5] p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-4 w-4 text-[#9C7E44]" />
                <h4 className="font-serif text-lg font-bold text-[#191C1E]">
                  Schedule a Property Viewing
                </h4>
              </div>
              <p className="text-xs text-[#545B63] mb-4">
                Arrange a confidential, private walkthrough with our property consultants.
              </p>

              {viewingSubmitted ? (
                <div className="rounded-md bg-emerald-50 border border-emerald-200 p-4 text-center">
                  <p className="text-xs font-semibold text-emerald-800">Viewing Scheduled Successfully!</p>
                  <p className="text-[11px] text-emerald-600 mt-1">
                    Agent {agent.name} will contact you shortly to confirm access arrangements.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleScheduleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-medium text-[#737A82] mb-1">Date</label>
                      <input
                        type="date"
                        required
                        value={viewingDate}
                        onChange={(e) => setViewingDate(e.target.value)}
                        className="w-full rounded-md border border-[#E8E5DF] bg-white px-2.5 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#737A82] mb-1">Time</label>
                      <select
                        value={viewingTime}
                        onChange={(e) => setViewingTime(e.target.value)}
                        className="w-full rounded-md border border-[#E8E5DF] bg-white px-2.5 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                      >
                        <option>10:00 AM</option>
                        <option>11:30 AM</option>
                        <option>02:00 PM</option>
                        <option>04:00 PM</option>
                        <option>06:00 PM (Sunset)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#737A82] mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Roosevelt"
                      value={viewingName}
                      onChange={(e) => setViewingName(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] bg-white px-3 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#737A82] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={viewingPhone}
                      onChange={(e) => setViewingPhone(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] bg-white px-3 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-sm bg-[#191C1E] py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2B3037] transition-colors"
                  >
                    Schedule a Viewing
                  </button>
                </form>
              )}
            </div>

            {/* Quick Inquiry Form */}
            <div className="rounded-xl border border-[#E8E5DF] bg-white p-6 shadow-sm">
              <h4 className="font-serif text-lg font-bold text-[#191C1E] mb-2">
                Send Property Inquiry
              </h4>
              <p className="text-xs text-[#545B63] mb-4">
                Have questions regarding legal deeds, financing, or property valuation?
              </p>

              {inquirySubmitted ? (
                <div className="rounded-md bg-emerald-50 border border-emerald-200 p-4 text-center">
                  <p className="text-xs font-semibold text-emerald-800">Inquiry Received!</p>
                  <p className="text-[11px] text-emerald-600 mt-1">
                    Our property consultants will respond within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#737A82] mb-1">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] px-3 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#737A82] mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] px-3 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#737A82] mb-1">Phone</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] px-3 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#737A82] mb-1">Message</label>
                    <textarea
                      rows={3}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] px-3 py-2 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-sm bg-[#C2A772] py-2.5 text-xs font-semibold uppercase tracking-wider text-[#121519] hover:bg-[#D5BC8A] transition-colors"
                  >
                    Send Property Inquiry
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#E8E5DF]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#9C7E44] font-semibold mb-1">
                  Curated Recommendations
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#191C1E]">
                  Similar Properties You May Like
                </h3>
              </div>
              <button
                onClick={onBack}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#191C1E] hover:text-[#9C7E44]"
              >
                <span>View All Properties</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map(sim => (
                <PropertyCard
                  key={sim.id}
                  property={sim}
                  onSelect={onSelectProperty}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
