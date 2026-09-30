import React, { useState } from 'react';
import { Property } from '../../types/property';
import { usePropertyContext } from '../../context/PropertyContext';
import { PropertyCard } from '../property/PropertyCard';
import { 
  Heart, 
  Scale, 
  Clock, 
  Calendar, 
  MessageSquare, 
  User, 
  ArrowRight, 
  Trash2, 
  Search,
  Building2,
  CheckCircle2
} from 'lucide-react';

interface UserDashboardPageProps {
  onSelectProperty: (property: Property) => void;
  onExploreProperties: () => void;
  onContactAgent: () => void;
  initialTab?: string;
}

export const UserDashboardPage: React.FC<UserDashboardPageProps> = ({
  onSelectProperty,
  onExploreProperties,
  onContactAgent,
  initialTab = 'favorites'
}) => {
  const { 
    properties, 
    favorites, 
    comparisons, 
    recentlyViewed, 
    inquiries, 
    currentUser, 
    formatPrice,
    toggleFavorite 
  } = usePropertyContext();

  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Profile Form state
  const [profileName, setProfileName] = useState(currentUser?.name || 'Alexander Cross');
  const [profileEmail, setProfileEmail] = useState(currentUser?.email || 'alexander@client.com');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '+1 (415) 890-2100');
  const [profileSaved, setProfileSaved] = useState(false);

  const favoriteProperties = properties.filter(p => favorites.includes(p.id));
  const comparedProperties = properties.filter(p => comparisons.includes(p.id));
  const recentProperties = properties.filter(p => recentlyViewed.includes(p.id));

  const scheduledVisits = currentUser?.scheduledVisits || [
    {
      id: 'visit-1',
      propertyId: 'prop-101',
      propertyTitle: 'The Solaris Modern Luxury Villa for Sale',
      date: '2026-10-05',
      time: '14:00',
      status: 'Confirmed'
    }
  ];

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 4000);
  };

  return (
    <div className="bg-[#FBFBF9] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* User Welcome Card */}
        <div className="rounded-2xl border border-[#E8E5DF] bg-white p-8 sm:p-10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#191C1E] text-white text-2xl font-serif font-bold">
              {profileName.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9C7E44]">
                Verified Client Portal
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#191C1E]">
                Welcome Back, {profileName}
              </h1>
              <p className="text-xs text-[#737A82]">{profileEmail}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExploreProperties}
              className="inline-flex items-center gap-2 rounded-sm bg-[#191C1E] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2B3037] transition-colors"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="h-4 w-4 text-[#C2A772]" />
            </button>
          </div>
        </div>

        {/* Dashboard Tabs & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Tabs (3 cols) */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-[#E8E5DF] bg-white p-2 shadow-xs space-y-1">
              {[
                { id: 'favorites', label: 'Saved Favorites', icon: Heart, count: favoriteProperties.length },
                { id: 'comparisons', label: 'Compared Properties', icon: Scale, count: comparedProperties.length },
                { id: 'recent', label: 'Recently Viewed', icon: Clock, count: recentProperties.length },
                { id: 'visits', label: 'Scheduled Viewings', icon: Calendar, count: scheduledVisits.length },
                { id: 'inquiries', label: 'Sent Inquiries', icon: MessageSquare, count: inquiries.length },
                { id: 'profile', label: 'Profile Settings', icon: User },
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#191C1E] text-white font-semibold'
                        : 'text-[#545B63] hover:bg-[#FAF8F5] hover:text-[#191C1E]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`h-4 w-4 ${isActive ? 'text-[#C2A772]' : 'text-[#737A82]'}`} />
                      <span>{tab.label}</span>
                    </div>
                    {typeof tab.count === 'number' && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full tabular-nums ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#EFECE6] text-[#191C1E]'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Display Pane (9 cols) */}
          <div className="lg:col-span-9">
            
            {/* 1. Saved Favorites Tab */}
            {activeTab === 'favorites' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-bold text-[#191C1E]">
                    Your Saved Favorite Properties ({favoriteProperties.length})
                  </h2>
                </div>

                {favoriteProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoriteProperties.map(property => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onSelect={onSelectProperty}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-[#E8E5DF] bg-white p-12 text-center space-y-4">
                    <Heart className="h-10 w-10 text-[#C2A772] mx-auto opacity-50" />
                    <p className="font-serif text-xl font-bold text-[#191C1E]">No Favorites Saved Yet</p>
                    <p className="text-xs text-[#545B63] max-w-sm mx-auto">
                      Click the heart icon on any property card to save homes, apartments, and villas here for quick access.
                    </p>
                    <button
                      onClick={onExploreProperties}
                      className="inline-flex items-center gap-2 rounded-sm bg-[#191C1E] px-6 py-2.5 text-xs font-semibold text-white uppercase tracking-wider"
                    >
                      Browse Properties
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 2. Compared Properties Tab */}
            {activeTab === 'comparisons' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-bold text-[#191C1E]">
                    Selected Properties for Comparison ({comparedProperties.length})
                  </h2>
                </div>

                {comparedProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {comparedProperties.map(property => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onSelect={onSelectProperty}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-[#E8E5DF] bg-white p-12 text-center space-y-4">
                    <Scale className="h-10 w-10 text-[#C2A772] mx-auto opacity-50" />
                    <p className="font-serif text-xl font-bold text-[#191C1E]">No Properties in Comparison Matrix</p>
                    <p className="text-xs text-[#545B63] max-w-sm mx-auto">
                      Click the scale comparison icon on any property to evaluate specifications side-by-side.
                    </p>
                    <button
                      onClick={onExploreProperties}
                      className="inline-flex items-center gap-2 rounded-sm bg-[#191C1E] px-6 py-2.5 text-xs font-semibold text-white uppercase tracking-wider"
                    >
                      Explore Properties
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 3. Recently Viewed Tab */}
            {activeTab === 'recent' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-[#191C1E]">
                  Recently Viewed Properties ({recentProperties.length})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentProperties.map(property => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onSelect={onSelectProperty}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 4. Scheduled Property Visits Tab */}
            {activeTab === 'visits' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-[#191C1E]">
                  Scheduled Property Viewings ({scheduledVisits.length})
                </h2>

                <div className="space-y-4">
                  {scheduledVisits.map((visit, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-[#E8E5DF] bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                            {visit.status}
                          </span>
                          <span className="text-xs text-[#737A82]">Viewing ID: #{visit.id}</span>
                        </div>
                        <h4 className="font-serif text-lg font-bold text-[#191C1E]">
                          {visit.propertyTitle}
                        </h4>
                        <p className="text-xs text-[#545B63] flex items-center gap-4">
                          <span><strong>Date:</strong> {visit.date}</span>
                          <span><strong>Time:</strong> {visit.time}</span>
                        </p>
                      </div>

                      <button
                        onClick={onContactAgent}
                        className="inline-flex items-center gap-1.5 rounded-sm border border-[#191C1E] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#191C1E] hover:bg-[#191C1E] hover:text-white transition-colors"
                      >
                        Contact Assigned Agent
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Sent Inquiries Tab */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-[#191C1E]">
                  Your Sent Inquiries ({inquiries.length})
                </h2>

                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="rounded-xl border border-[#E8E5DF] bg-white p-6 shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#9C7E44] uppercase tracking-wider">
                          {inq.type}
                        </span>
                        <span className="text-[#737A82] tabular-nums">{inq.timestamp}</span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-[#191C1E]">
                        {inq.propertyTitle || 'General Advisory Inquiry'}
                      </h4>
                      <p className="text-xs text-[#545B63] bg-[#FAF8F5] p-3 rounded-md italic">
                        "{inq.message}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Profile Settings Tab */}
            {activeTab === 'profile' && (
              <div className="rounded-xl border border-[#E8E5DF] bg-white p-8 shadow-xs space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#191C1E]">
                    Personal & Advisory Profile
                  </h2>
                  <p className="text-xs text-[#545B63] mt-1">
                    Manage your contact credentials and acquisition preferences.
                  </p>
                </div>

                {profileSaved && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Profile settings updated successfully.</span>
                  </div>
                )}

                <form onSubmit={handleProfileSave} className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] px-3.5 py-2 text-xs text-[#191C1E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Email Address</label>
                    <input
                      type="email"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] px-3.5 py-2 text-xs text-[#191C1E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Primary Telephone</label>
                    <input
                      type="tel"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] px-3.5 py-2 text-xs text-[#191C1E] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-sm bg-[#191C1E] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2B3037] transition-colors"
                  >
                    <span>Save Profile Changes</span>
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
