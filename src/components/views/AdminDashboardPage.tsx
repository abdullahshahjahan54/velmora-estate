import React, { useState } from 'react';
import { Property, PropertyType, ListingType } from '../../types/property';
import { usePropertyContext } from '../../context/PropertyContext';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  Star, 
  CheckCircle, 
  Building2, 
  Search, 
  TrendingUp, 
  Users, 
  FileText, 
  X,
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react';
import heroVilla from '../../assets/images/hero_luxury_villa_1790786780485.jpg';

interface AdminDashboardPageProps {
  onSelectProperty: (property: Property) => void;
  onExitAdmin: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onSelectProperty,
  onExitAdmin
}) => {
  const { 
    properties, 
    agents, 
    inquiries, 
    addProperty, 
    updateProperty, 
    deleteProperty, 
    togglePublishStatus, 
    toggleFeaturedStatus,
    formatPrice 
  } = usePropertyContext();

  const [activeTab, setActiveTab] = useState<'listings' | 'inquiries' | 'add'>('listings');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending'>('all');

  // Edit modal state
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // New Property Form State
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState<number>(4500000);
  const [newCity, setNewCity] = useState('Beverly Hills');
  const [newAddress, setNewAddress] = useState('200 Crescent Boulevard');
  const [newType, setNewType] = useState<PropertyType>('villa');
  const [newListingType, setNewListingType] = useState<ListingType>('sale');
  const [newBeds, setNewBeds] = useState(5);
  const [newBaths, setNewBaths] = useState(6);
  const [newArea, setNewArea] = useState(6500);
  const [newDesc, setNewDesc] = useState('');
  const [newAgentId, setNewAgentId] = useState('agent-1');

  // Dashboard Statistics
  const totalProperties = properties.length;
  const activeListings = properties.filter(p => p.status === 'active').length;
  const pendingListings = properties.filter(p => p.status === 'pending').length;
  const rentalProperties = properties.filter(p => p.listingType === 'rent').length;
  const saleProperties = properties.filter(p => p.listingType === 'sale').length;
  const totalInquiries = inquiries.filter(i => i.type === 'inquiry').length;
  const viewingRequests = inquiries.filter(i => i.type === 'viewing').length;

  const filteredProperties = properties.filter(p => {
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.location.city.toLowerCase().includes(q);
    }
    return true;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    addProperty({
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: newTitle,
      seoTitle: `${newTitle} | Velmora Estates`,
      metaDescription: newDesc || `Luxury ${newType} in ${newCity}.`,
      price: Number(newPrice),
      currency: '$',
      listingType: newListingType,
      propertyType: newType,
      status: 'active',
      featured: true,
      isNew: true,
      location: {
        city: newCity,
        state: 'CA',
        country: 'USA',
        address: newAddress,
        neighborhood: newCity,
        coordinates: { lat: 34.0, lng: -118.0 }
      },
      bedrooms: Number(newBeds),
      bathrooms: Number(newBaths),
      areaSqFt: Number(newArea),
      garages: 2,
      yearBuilt: 2025,
      furnished: 'Furnished',
      images: [heroVilla],
      description: newDesc || `Prime architectural luxury ${newType} in ${newCity}.`,
      features: ['Infinity Pool', 'Smart Home Lutron Controls', 'Custom Millwork'],
      amenities: [
        { name: 'Swimming Pool', category: 'Outdoor' },
        { name: 'Parking', category: 'Comfort' },
        { name: 'Air Conditioning', category: 'Comfort' }
      ],
      agentId: newAgentId
    });

    // Reset
    setNewTitle('');
    setNewDesc('');
    setActiveTab('listings');
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;
    updateProperty(editingProperty.id, editingProperty);
    setEditingProperty(null);
  };

  return (
    <div className="bg-[#FAF8F5] py-10 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Admin Header */}
        <div className="rounded-2xl border border-[#E8E5DF] bg-[#191C1E] p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#C2A772] text-[#121519]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C2A772]">
                Administrative Management Suite
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Velmora Estates Executive Portal
              </h1>
              <p className="text-xs text-[#A6ADB8]">
                Logged in as Senior Managing Administrator · System Version 2026.4
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('add')}
              className="inline-flex items-center gap-2 rounded-sm bg-[#C2A772] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#121519] hover:bg-[#D5BC8A] transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Property</span>
            </button>
            <button
              onClick={onExitAdmin}
              className="inline-flex items-center gap-2 rounded-sm border border-white/30 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
            >
              <span>Back to Public Site</span>
            </button>
          </div>
        </div>

        {/* 8 Statistics KPIs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="rounded-xl border border-[#E8E5DF] bg-white p-4 shadow-xs">
            <span className="text-[10px] uppercase text-[#737A82] block">Total Properties</span>
            <p className="font-serif text-2xl font-bold text-[#191C1E] mt-1 tabular-nums">{totalProperties}</p>
          </div>
          <div className="rounded-xl border border-[#E8E5DF] bg-white p-4 shadow-xs">
            <span className="text-[10px] uppercase text-[#737A82] block">Active Listings</span>
            <p className="font-serif text-2xl font-bold text-emerald-700 mt-1 tabular-nums">{activeListings}</p>
          </div>
          <div className="rounded-xl border border-[#E8E5DF] bg-white p-4 shadow-xs">
            <span className="text-[10px] uppercase text-[#737A82] block">Pending Reviews</span>
            <p className="font-serif text-2xl font-bold text-amber-700 mt-1 tabular-nums">{pendingListings}</p>
          </div>
          <div className="rounded-xl border border-[#E8E5DF] bg-white p-4 shadow-xs">
            <span className="text-[10px] uppercase text-[#737A82] block">For Sale</span>
            <p className="font-serif text-2xl font-bold text-[#191C1E] mt-1 tabular-nums">{saleProperties}</p>
          </div>
          <div className="rounded-xl border border-[#E8E5DF] bg-white p-4 shadow-xs">
            <span className="text-[10px] uppercase text-[#737A82] block">For Rent</span>
            <p className="font-serif text-2xl font-bold text-[#191C1E] mt-1 tabular-nums">{rentalProperties}</p>
          </div>
          <div className="rounded-xl border border-[#E8E5DF] bg-white p-4 shadow-xs">
            <span className="text-[10px] uppercase text-[#737A82] block">Total Agents</span>
            <p className="font-serif text-2xl font-bold text-[#191C1E] mt-1 tabular-nums">{agents.length}</p>
          </div>
          <div className="rounded-xl border border-[#E8E5DF] bg-white p-4 shadow-xs">
            <span className="text-[10px] uppercase text-[#737A82] block">Inquiries</span>
            <p className="font-serif text-2xl font-bold text-[#9C7E44] mt-1 tabular-nums">{totalInquiries}</p>
          </div>
          <div className="rounded-xl border border-[#E8E5DF] bg-white p-4 shadow-xs">
            <span className="text-[10px] uppercase text-[#737A82] block">Viewings</span>
            <p className="font-serif text-2xl font-bold text-blue-700 mt-1 tabular-nums">{viewingRequests}</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-3 border-b border-[#E8E5DF] pb-2">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === 'listings'
                ? 'border-b-2 border-[#191C1E] text-[#191C1E]'
                : 'text-[#737A82] hover:text-[#191C1E]'
            }`}
          >
            Property Management ({filteredProperties.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === 'inquiries'
                ? 'border-b-2 border-[#191C1E] text-[#191C1E]'
                : 'text-[#737A82] hover:text-[#191C1E]'
            }`}
          >
            Inquiries & Viewing Requests ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === 'add'
                ? 'border-b-2 border-[#191C1E] text-[#191C1E]'
                : 'text-[#737A82] hover:text-[#191C1E]'
            }`}
          >
            + Add Property Form
          </button>
        </div>

        {/* TAB 1: LISTINGS MANAGEMENT */}
        {activeTab === 'listings' && (
          <div className="space-y-4">
            
            {/* Filter toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#737A82]" />
                <input
                  type="text"
                  placeholder="Filter by title or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-[#E8E5DF] bg-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium ${
                    filterStatus === 'all' ? 'bg-[#191C1E] text-white' : 'bg-white border border-[#E8E5DF] text-[#545B63]'
                  }`}
                >
                  All Status
                </button>
                <button
                  onClick={() => setFilterStatus('active')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium ${
                    filterStatus === 'active' ? 'bg-emerald-700 text-white' : 'bg-white border border-[#E8E5DF] text-[#545B63]'
                  }`}
                >
                  Active Only
                </button>
                <button
                  onClick={() => setFilterStatus('pending')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium ${
                    filterStatus === 'pending' ? 'bg-amber-700 text-white' : 'bg-white border border-[#E8E5DF] text-[#545B63]'
                  }`}
                >
                  Pending Only
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-[#E8E5DF] bg-white shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#E8E5DF] bg-[#FAF8F5] text-[#737A82] uppercase text-[10px] tracking-wider">
                    <th className="p-3.5">Property</th>
                    <th className="p-3.5">Type & Channel</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Location</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Featured</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0ECE1] text-[#191C1E]">
                  {filteredProperties.map(property => (
                    <tr key={property.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                      <td className="p-3.5 flex items-center gap-3">
                        <img
                          src={property.images[0]}
                          alt=""
                          referrerPolicy="no-referrer"
                          className="h-10 w-14 rounded object-cover border border-[#E8E5DF]"
                        />
                        <div>
                          <p 
                            onClick={() => onSelectProperty(property)}
                            className="font-semibold text-xs text-[#191C1E] hover:text-[#9C7E44] cursor-pointer line-clamp-1"
                          >
                            {property.title}
                          </p>
                          <span className="text-[10px] text-[#737A82]">ID: {property.id}</span>
                        </div>
                      </td>

                      <td className="p-3.5 uppercase font-medium text-[11px]">
                        {property.propertyType} · {property.listingType}
                      </td>

                      <td className="p-3.5 font-bold tabular-nums">
                        {formatPrice(property.price, property.currency)}
                      </td>

                      <td className="p-3.5 text-[#545B63]">
                        {property.location.city}
                      </td>

                      <td className="p-3.5">
                        <button
                          onClick={() => togglePublishStatus(property.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                            property.status === 'active'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {property.status === 'active' ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          <span className="capitalize">{property.status}</span>
                        </button>
                      </td>

                      <td className="p-3.5">
                        <button
                          onClick={() => toggleFeaturedStatus(property.id)}
                          className={`p-1.5 rounded transition-colors ${
                            property.featured ? 'text-[#C2A772] hover:text-[#191C1E]' : 'text-[#D1D5DB] hover:text-[#C2A772]'
                          }`}
                          title="Toggle Featured"
                        >
                          <Star className={`h-4 w-4 ${property.featured ? 'fill-current' : ''}`} />
                        </button>
                      </td>

                      <td className="p-3.5 text-right space-x-1">
                        <button
                          onClick={() => setEditingProperty(property)}
                          className="p-1.5 rounded text-[#545B63] hover:text-[#191C1E] hover:bg-[#EFECE6] transition-colors"
                          title="Edit Property"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProperty(property.id)}
                          className="p-1.5 rounded text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Property"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: INQUIRIES & VIEWING REQUESTS */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#191C1E]">
              Client Inquiries & Property Viewing Requests
            </h3>

            <div className="overflow-x-auto rounded-xl border border-[#E8E5DF] bg-white shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#E8E5DF] bg-[#FAF8F5] text-[#737A82] uppercase text-[10px] tracking-wider">
                    <th className="p-3.5">Date & Time</th>
                    <th className="p-3.5">Client Contact</th>
                    <th className="p-3.5">Property</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Message / Request</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0ECE1]">
                  {inquiries.map(inq => (
                    <tr key={inq.id} className="hover:bg-[#FAF8F5]/50">
                      <td className="p-3.5 tabular-nums text-[#737A82]">{inq.timestamp}</td>
                      <td className="p-3.5">
                        <strong className="text-[#191C1E] block">{inq.name}</strong>
                        <span className="text-[#545B63]">{inq.email} · {inq.phone}</span>
                      </td>
                      <td className="p-3.5 font-medium text-[#191C1E]">
                        {inq.propertyTitle || 'General Advisory'}
                      </td>
                      <td className="p-3.5">
                        <span className="capitalize px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E8E5DF] font-semibold text-[11px] text-[#9C7E44]">
                          {inq.type}
                        </span>
                      </td>
                      <td className="p-3.5 max-w-xs text-[#545B63] italic">
                        "{inq.message}"
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                          {inq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ADD PROPERTY FORM */}
        {activeTab === 'add' && (
          <div className="rounded-2xl border border-[#E8E5DF] bg-white p-8 shadow-xs">
            <h3 className="font-serif text-2xl font-bold text-[#191C1E] mb-6">
              Add New Property to Marketplace
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#737A82] mb-1">Property Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Bel Air Hillside Modern Luxury Villa for Sale"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#737A82] mb-1">Listing Channel</label>
                  <select
                    value={newListingType}
                    onChange={(e) => setNewListingType(e.target.value as any)}
                    className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#737A82] mb-1">Price ($ USD) *</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#737A82] mb-1">Property Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs focus:outline-none"
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
                  <label className="block text-xs font-medium text-[#737A82] mb-1">City / Location</label>
                  <select
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="Beverly Hills">Beverly Hills, CA</option>
                    <option value="Manhattan">Manhattan, NY</option>
                    <option value="Miami Beach">Miami Beach, FL</option>
                    <option value="London">London, UK</option>
                    <option value="Aspen">Aspen, CO</option>
                    <option value="Dubai">Dubai, UAE</option>
                    <option value="Dera Ismail Khan">Dera Ismail Khan, PK</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#737A82] mb-1">Assigned Agent</label>
                  <select
                    value={newAgentId}
                    onChange={(e) => setNewAgentId(e.target.value)}
                    className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs focus:outline-none"
                  >
                    {agents.map(a => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#737A82] mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={newBeds}
                    onChange={(e) => setNewBeds(Number(e.target.value))}
                    className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#737A82] mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={newBaths}
                    onChange={(e) => setNewBaths(Number(e.target.value))}
                    className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#737A82] mb-1">Area (Sq Ft)</label>
                  <input
                    type="number"
                    value={newArea}
                    onChange={(e) => setNewArea(Number(e.target.value))}
                    className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#737A82] mb-1">Full Description</label>
                <textarea
                  rows={4}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs focus:outline-none"
                  placeholder="Architectural features, views, grounds, interior finishes..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-sm bg-[#191C1E] px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2B3037] transition-colors"
              >
                <Building2 className="h-4 w-4 text-[#C2A772]" />
                <span>Publish New Listing to Marketplace</span>
              </button>
            </form>
          </div>
        )}

        {/* Edit Property Modal */}
        {editingProperty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="relative w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setEditingProperty(null)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="font-serif text-2xl font-bold text-[#191C1E]">
                Edit Property #{editingProperty.id}
              </h3>

              <form onSubmit={handleEditSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#737A82] mb-1">Title</label>
                  <input
                    type="text"
                    value={editingProperty.title}
                    onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
                    className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Price ($ USD)</label>
                    <input
                      type="number"
                      value={editingProperty.price}
                      onChange={(e) => setEditingProperty({ ...editingProperty, price: Number(e.target.value) })}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">City</label>
                    <input
                      type="text"
                      value={editingProperty.location.city}
                      onChange={(e) => setEditingProperty({
                        ...editingProperty,
                        location: { ...editingProperty.location, city: e.target.value }
                      })}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Bedrooms</label>
                    <input
                      type="number"
                      value={editingProperty.bedrooms}
                      onChange={(e) => setEditingProperty({ ...editingProperty, bedrooms: Number(e.target.value) })}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Bathrooms</label>
                    <input
                      type="number"
                      value={editingProperty.bathrooms}
                      onChange={(e) => setEditingProperty({ ...editingProperty, bathrooms: Number(e.target.value) })}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Area (Sq Ft)</label>
                    <input
                      type="number"
                      value={editingProperty.areaSqFt}
                      onChange={(e) => setEditingProperty({ ...editingProperty, areaSqFt: Number(e.target.value) })}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#737A82] mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editingProperty.description}
                    onChange={(e) => setEditingProperty({ ...editingProperty, description: e.target.value })}
                    className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProperty(null)}
                    className="px-4 py-2 rounded-sm border text-xs font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-sm bg-[#191C1E] text-white text-xs font-semibold uppercase tracking-wider"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
