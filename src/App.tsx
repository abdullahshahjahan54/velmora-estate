/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PropertyProvider, usePropertyContext } from './context/PropertyContext';
import { Property, Agent, PropertyFilterState } from './types/property';
import { updateSEO } from './utils/seo';

// Layout
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Modals & Floating Tools
import { AuthModal } from './components/modals/AuthModal';
import { FloatingActionHub } from './components/common/FloatingActionHub';
import { AIAssistantModal } from './components/ai/AIAssistantModal';

// Home Sections
import { HeroSection } from './components/home/HeroSection';
import { FeaturedSection } from './components/home/FeaturedSection';
import { CategorySection } from './components/home/CategorySection';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { LocationsSection } from './components/home/LocationsSection';
import { LuxuryAndInvestmentSections } from './components/home/LuxuryAndInvestmentSections';
import { SocialProofAndCTA } from './components/home/SocialProofAndCTA';

// Dedicated Views
import { PropertiesPage } from './components/views/PropertiesPage';
import { PropertyDetailsView } from './components/property/PropertyDetailsView';
import { BuyPage } from './components/views/BuyPage';
import { RentPage } from './components/views/RentPage';
import { SellPropertyPage } from './components/views/SellPropertyPage';
import { AgentsPage } from './components/views/AgentsPage';
import { AgentDetailPage } from './components/views/AgentDetailPage';
import { AboutPage } from './components/views/AboutPage';
import { ContactPage } from './components/views/ContactPage';
import { ComparisonPage } from './components/views/ComparisonPage';
import { UserDashboardPage } from './components/views/UserDashboardPage';
import { AdminDashboardPage } from './components/views/AdminDashboardPage';

function VelmoraAppContent() {
  const { properties, agents } = usePropertyContext();

  // Navigation State
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [propertyFilterParam, setPropertyFilterParam] = useState<Partial<PropertyFilterState> | undefined>(undefined);
  const [dashboardTab, setDashboardTab] = useState<string>('favorites');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  // Sync route and SEO on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (currentView === 'home') {
      updateSEO({
        title: 'Velmora Estates – Luxury Real Estate, Homes & Villas for Sale',
        description: 'Discover premium homes, luxury villas, modern apartments, and commercial property for sale and rent with Velmora Estates. Find your place. Build your future.',
        keywords: 'real estate, real estate agency, property for sale, luxury homes, apartments for rent, villas for sale, commercial property, real estate investment'
      });
    } else if (currentView === 'properties') {
      updateSEO({
        title: 'Properties for Sale & Rent | Real Estate Listings Velmora',
        description: 'Browse verified real estate listings including luxury homes for sale, apartments for rent, modern villas, and commercial real estate.',
        keywords: 'properties for sale, property for rent, homes for sale, apartments for rent, commercial properties, real estate listings'
      });
    } else if (currentView === 'buy') {
      updateSEO({
        title: 'Buy Property: Luxury Homes & Villas for Sale | Velmora Estates',
        description: 'Find houses for sale, modern apartments, luxury villas, and prime plots for sale. Partner with our licensed real estate agents.',
        keywords: 'property for sale, houses for sale, homes for sale, apartments for sale, villas for sale, land for sale, buy property'
      });
    } else if (currentView === 'rent') {
      updateSEO({
        title: 'Rent Property: Luxury Apartments & Houses for Rent | Velmora',
        description: 'Explore apartments for rent, furnished houses for rent, and prime commercial rental properties. Schedule a property viewing today.',
        keywords: 'property for rent, houses for rent, apartments for rent, villas for rent, commercial property for rent, residential rentals'
      });
    } else if (currentView === 'sell') {
      updateSEO({
        title: 'Sell Your Property & Valuation | Velmora Estates Agency',
        description: 'List your property with Velmora Estates. Get an instant property valuation and reach qualified global luxury buyers.',
        keywords: 'sell property, list property, property listing, property valuation, real estate agent'
      });
    } else if (currentView === 'agents') {
      updateSEO({
        title: 'Real Estate Agents & Property Consultants | Velmora Estates',
        description: 'Meet our certified real estate agents and property consultants providing tailored valuation, discreet brokerage, and client representation.',
        keywords: 'real estate agents, property consultants, real estate company, property experts'
      });
    } else if (currentView === 'about') {
      updateSEO({
        title: 'About Velmora Estates – “A Better Way to Find Your Next Property”',
        description: 'Learn about Velmora Estates, our mission, architectural integrity, client-focused approach, and property investment expertise.',
        keywords: 'real estate company, property consultants, real estate expertise, property management'
      });
    } else if (currentView === 'contact') {
      updateSEO({
        title: 'Contact Velmora Estates | Talk to a Property Expert',
        description: 'Contact Velmora Estates to schedule a property viewing, request a property valuation, or consult with our real estate specialists.',
        keywords: 'schedule a property viewing, real estate agents, property valuation, property search'
      });
    } else if (currentView === 'compare') {
      updateSEO({
        title: 'Property Comparison Matrix | Velmora Estates',
        description: 'Compare real estate properties side-by-side: price, location, bedrooms, bathrooms, area, and luxury amenities.',
        keywords: 'compare properties, real estate listings, luxury properties'
      });
    }
  }, [currentView]);

  // Navigation Handler
  const handleNavigate = (view: string, param?: string) => {
    if (view === 'dashboard') {
      if (param) setDashboardTab(param);
      setCurrentView('dashboard');
      return;
    }

    if (view === 'buy' && param) {
      setPropertyFilterParam({ propertyType: param as any, listingType: 'sale' });
      setCurrentView('buy');
      return;
    }

    if (view === 'rent' && param) {
      setPropertyFilterParam({ propertyType: param as any, listingType: 'rent' });
      setCurrentView('rent');
      return;
    }

    setPropertyFilterParam(undefined);
    setCurrentView(view);
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setCurrentView('property-detail');
  };

  const handleSelectAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setCurrentView('agent-detail');
  };

  // Hero Search trigger
  const handleHeroSearch = (searchParams: {
    listingType: 'sale' | 'rent';
    city: string;
    propertyType: string;
    minPrice: number;
    maxPrice: number;
    bedrooms: string;
    bathrooms: string;
  }) => {
    setPropertyFilterParam({
      listingType: searchParams.listingType,
      city: searchParams.city,
      propertyType: searchParams.propertyType as any,
      minPrice: searchParams.minPrice,
      maxPrice: searchParams.maxPrice,
      bedrooms: searchParams.bedrooms === 'any' ? 'any' : Number(searchParams.bedrooms),
      bathrooms: searchParams.bathrooms === 'any' ? 'any' : Number(searchParams.bathrooms)
    });
    setCurrentView('properties');
  };

  // Category select trigger
  const handleCategorySelect = (cat: { propertyType?: string; listingType?: 'sale' | 'rent' }) => {
    if (cat.listingType === 'rent') {
      setPropertyFilterParam({ propertyType: (cat.propertyType as any) || 'all', listingType: 'rent' });
      setCurrentView('rent');
    } else {
      setPropertyFilterParam({ propertyType: (cat.propertyType as any) || 'all', listingType: 'sale' });
      setCurrentView('buy');
    }
  };

  // Location select trigger
  const handleLocationSelect = (cityName: string) => {
    setPropertyFilterParam({ city: cityName });
    setCurrentView('properties');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#191C1E]">
      
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME */}
        {currentView === 'home' && (
          <>
            <HeroSection
              onSearch={handleHeroSearch}
              onExploreClick={() => setCurrentView('properties')}
              onListClick={() => setCurrentView('sell')}
            />

            <FeaturedSection
              properties={properties}
              onSelectProperty={handleSelectProperty}
              onExploreAll={() => setCurrentView('properties')}
            />

            <CategorySection
              onSelectCategory={handleCategorySelect}
            />

            <WhyChooseUs />

            <LocationsSection
              onSelectLocation={handleLocationSelect}
            />

            <LuxuryAndInvestmentSections
              properties={properties}
              onSelectProperty={handleSelectProperty}
              onExploreLuxury={() => {
                setPropertyFilterParam({ minPrice: 10000000, listingType: 'sale' });
                setCurrentView('properties');
              }}
              onExploreInvestment={() => {
                setPropertyFilterParam({ propertyType: 'commercial' });
                setCurrentView('properties');
              }}
            />

            <SocialProofAndCTA
              agents={agents}
              onSelectAgent={handleSelectAgent}
              onExploreProperties={() => setCurrentView('properties')}
              onContactAgent={() => setCurrentView('agents')}
            />
          </>
        )}

        {/* VIEW 2: PROPERTIES MARKETPLACE */}
        {currentView === 'properties' && (
          <PropertiesPage
            onSelectProperty={handleSelectProperty}
            initialFilters={propertyFilterParam}
          />
        )}

        {/* VIEW 3: PROPERTY DETAILS */}
        {currentView === 'property-detail' && selectedProperty && (
          <PropertyDetailsView
            property={selectedProperty}
            onBack={() => setCurrentView('properties')}
            onSelectProperty={handleSelectProperty}
            onSelectAgent={handleSelectAgent}
          />
        )}

        {/* VIEW 4: BUY PROPERTY */}
        {currentView === 'buy' && (
          <BuyPage
            onSelectProperty={handleSelectProperty}
            onContactAgent={() => setCurrentView('contact')}
            initialType={propertyFilterParam?.propertyType}
          />
        )}

        {/* VIEW 5: RENT PROPERTY */}
        {currentView === 'rent' && (
          <RentPage
            onSelectProperty={handleSelectProperty}
            onContactAgent={() => setCurrentView('contact')}
            initialType={propertyFilterParam?.propertyType}
          />
        )}

        {/* VIEW 6: SELL PROPERTY */}
        {currentView === 'sell' && (
          <SellPropertyPage
            onPropertyListed={(id) => {
              const prop = properties.find(p => p.id === id);
              if (prop) handleSelectProperty(prop);
            }}
            onContactExpert={() => setCurrentView('contact')}
          />
        )}

        {/* VIEW 7: AGENTS DIRECTORY */}
        {currentView === 'agents' && (
          <AgentsPage
            onSelectAgent={handleSelectAgent}
            onSelectProperty={handleSelectProperty}
          />
        )}

        {/* VIEW 8: AGENT DETAIL */}
        {currentView === 'agent-detail' && selectedAgent && (
          <AgentDetailPage
            agent={selectedAgent}
            onBack={() => setCurrentView('agents')}
            onSelectProperty={handleSelectProperty}
          />
        )}

        {/* VIEW 9: ABOUT */}
        {currentView === 'about' && (
          <AboutPage
            onExploreProperties={() => setCurrentView('properties')}
            onContactTeam={() => setCurrentView('contact')}
          />
        )}

        {/* VIEW 10: CONTACT */}
        {currentView === 'contact' && (
          <ContactPage />
        )}

        {/* VIEW 11: COMPARISON */}
        {currentView === 'compare' && (
          <ComparisonPage
            onSelectProperty={handleSelectProperty}
            onExploreProperties={() => setCurrentView('properties')}
          />
        )}

        {/* VIEW 12: USER DASHBOARD */}
        {currentView === 'dashboard' && (
          <UserDashboardPage
            onSelectProperty={handleSelectProperty}
            onExploreProperties={() => setCurrentView('properties')}
            onContactAgent={() => setCurrentView('contact')}
            initialTab={dashboardTab}
          />
        )}

        {/* VIEW 13: ADMIN DASHBOARD */}
        {currentView === 'admin' && (
          <AdminDashboardPage
            onSelectProperty={handleSelectProperty}
            onExitAdmin={() => setCurrentView('home')}
          />
        )}

      </main>

      {/* Footer (hidden inside admin for focused management) */}
      {currentView !== 'admin' && (
        <Footer onNavigate={handleNavigate} />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Floating Action Hub: Working WhatsApp Logo on Bottom Right & AI Assistant right above it */}
      <FloatingActionHub
        isAIAssistantOpen={aiAssistantOpen}
        onOpenAIAssistant={() => setAiAssistantOpen(!aiAssistantOpen)}
      />

      {/* AI Assistant Chat Concierge Modal */}
      <AIAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        onSelectProperty={handleSelectProperty}
        onOpenWhatsApp={() => {
          window.open('https://wa.me/13108492910?text=Hello%20Velmora%20Estates%2C%20I%20am%20interested%20in%20inquiring%20about%20your%20luxury%20real%20estate%20properties.', '_blank');
        }}
      />

    </div>
  );
}

export default function App() {
  return (
    <PropertyProvider>
      <VelmoraAppContent />
    </PropertyProvider>
  );
}
