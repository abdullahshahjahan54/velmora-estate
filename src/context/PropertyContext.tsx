import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, Agent, Inquiry, UserAccount, PropertyFilterState } from '../types/property';
import { INITIAL_PROPERTIES, INITIAL_AGENTS } from '../data/mockData';

interface PropertyContextType {
  properties: Property[];
  agents: Agent[];
  inquiries: Inquiry[];
  favorites: string[];
  comparisons: string[];
  recentlyViewed: string[];
  currentUser: UserAccount | null;
  toggleFavorite: (propertyId: string) => void;
  toggleComparison: (propertyId: string) => void;
  removeFromComparison: (propertyId: string) => void;
  clearComparison: () => void;
  recordPropertyView: (propertyId: string) => void;
  addInquiry: (inquiryData: Omit<Inquiry, 'id' | 'timestamp' | 'status'>) => Inquiry;
  scheduleViewing: (viewingData: {
    propertyId: string;
    propertyTitle: string;
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    notes?: string;
  }) => void;
  loginUser: (email: string, role?: 'user' | 'admin', name?: string) => void;
  logoutUser: () => void;
  // Admin Property Actions
  addProperty: (property: Omit<Property, 'id' | 'viewsCount' | 'inquiriesCount' | 'dateListed'>) => void;
  updateProperty: (id: string, updatedFields: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  togglePublishStatus: (id: string) => void;
  toggleFeaturedStatus: (id: string) => void;
  // Helper
  formatPrice: (amount: number, currency?: string) => string;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

const LOCAL_STORAGE_PROPERTIES_KEY = 'velmora_properties_v1';
const LOCAL_STORAGE_FAVORITES_KEY = 'velmora_favorites_v1';
const LOCAL_STORAGE_COMPARISONS_KEY = 'velmora_comparisons_v1';
const LOCAL_STORAGE_RECENT_KEY = 'velmora_recent_views_v1';
const LOCAL_STORAGE_INQUIRIES_KEY = 'velmora_inquiries_v1';
const LOCAL_STORAGE_USER_KEY = 'velmora_current_user_v1';

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PROPERTIES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return INITIAL_PROPERTIES;
  });

  const [agents] = useState<Agent[]>(INITIAL_AGENTS);

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY);
      return saved ? JSON.parse(saved) : ['prop-101'];
    } catch {
      return ['prop-101'];
    }
  });

  const [comparisons, setComparisons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_COMPARISONS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_RECENT_KEY);
      return saved ? JSON.parse(saved) : ['prop-101', 'prop-103'];
    } catch {
      return ['prop-101', 'prop-103'];
    }
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_INQUIRIES_KEY);
      return saved ? JSON.parse(saved) : [
        {
          id: 'inq-initial-1',
          propertyId: 'prop-101',
          propertyTitle: 'The Solaris Modern Luxury Villa for Sale',
          name: 'Harrison Sterling',
          email: 'h.sterling@investments.com',
          phone: '+1 (310) 555-0199',
          message: 'Interested in private broker inspection and verification of title deeds.',
          type: 'inquiry',
          timestamp: '2026-03-28 14:32',
          status: 'new'
        }
      ];
    } catch {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      return saved ? JSON.parse(saved) : {
        id: 'user-demo-1',
        name: 'Alexander Cross',
        email: 'alex.cross@velmora-client.com',
        phone: '+1 (415) 890-2100',
        role: 'user',
        favorites: ['prop-101'],
        comparisons: [],
        recentlyViewed: ['prop-101', 'prop-103'],
        scheduledVisits: [
          {
            id: 'visit-1',
            propertyId: 'prop-101',
            propertyTitle: 'The Solaris Modern Luxury Villa for Sale',
            date: '2026-10-05',
            time: '14:00',
            status: 'Confirmed'
          }
        ]
      };
    } catch {
      return null;
    }
  });

  // Persist properties
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PROPERTIES_KEY, JSON.stringify(properties));
    } catch (e) {
      console.warn('Failed to save properties to localStorage', e);
    }
  }, [properties]);

  // Persist favorites
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  // Persist comparisons
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_COMPARISONS_KEY, JSON.stringify(comparisons));
    } catch (e) {
      console.warn('Failed to save comparisons to localStorage', e);
    }
  }, [comparisons]);

  // Persist recently viewed
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_RECENT_KEY, JSON.stringify(recentlyViewed));
    } catch (e) {
      console.warn('Failed to save recent views', e);
    }
  }, [recentlyViewed]);

  // Persist inquiries
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_INQUIRIES_KEY, JSON.stringify(inquiries));
    } catch (e) {
      console.warn('Failed to save inquiries', e);
    }
  }, [inquiries]);

  // Persist user
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      }
    } catch (e) {
      console.warn('Failed to save user', e);
    }
  }, [currentUser]);

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(propertyId);
      const updated = exists ? prev.filter(id => id !== propertyId) : [...prev, propertyId];
      if (currentUser) {
        setCurrentUser(u => u ? { ...u, favorites: updated } : null);
      }
      return updated;
    });
  };

  const toggleComparison = (propertyId: string) => {
    setComparisons(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), propertyId]; // Replace oldest if 4 reached
      }
      return [...prev, propertyId];
    });
  };

  const removeFromComparison = (propertyId: string) => {
    setComparisons(prev => prev.filter(id => id !== propertyId));
  };

  const clearComparison = () => {
    setComparisons([]);
  };

  const recordPropertyView = (propertyId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== propertyId);
      return [propertyId, ...filtered].slice(0, 10);
    });

    setProperties(prev => prev.map(p => {
      if (p.id === propertyId) {
        return { ...p, viewsCount: (p.viewsCount || 0) + 1 };
      }
      return p;
    }));
  };

  const addInquiry = (inquiryData: Omit<Inquiry, 'id' | 'timestamp' | 'status'>): Inquiry => {
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'new'
    };
    setInquiries(prev => [newInquiry, ...prev]);

    if (inquiryData.propertyId) {
      setProperties(prev => prev.map(p => {
        if (p.id === inquiryData.propertyId) {
          return { ...p, inquiriesCount: (p.inquiriesCount || 0) + 1 };
        }
        return p;
      }));
    }
    return newInquiry;
  };

  const scheduleViewing = (viewingData: {
    propertyId: string;
    propertyTitle: string;
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    notes?: string;
  }) => {
    addInquiry({
      propertyId: viewingData.propertyId,
      propertyTitle: viewingData.propertyTitle,
      name: viewingData.name,
      email: viewingData.email,
      phone: viewingData.phone,
      message: `Scheduled Viewing: Date ${viewingData.date} at ${viewingData.time}. Notes: ${viewingData.notes || 'None provided'}`,
      type: 'viewing',
      date: viewingData.date,
      time: viewingData.time
    });

    if (currentUser) {
      setCurrentUser(u => {
        if (!u) return null;
        return {
          ...u,
          scheduledVisits: [
            ...(u.scheduledVisits || []),
            {
              id: `visit-${Date.now()}`,
              propertyId: viewingData.propertyId,
              propertyTitle: viewingData.propertyTitle,
              date: viewingData.date,
              time: viewingData.time,
              status: 'Confirmed'
            }
          ]
        };
      });
    }
  };

  const loginUser = (email: string, role: 'user' | 'admin' = 'user', name?: string) => {
    const accountName = name || (role === 'admin' ? 'Administrator' : email.split('@')[0]);
    setCurrentUser({
      id: `user-${Date.now()}`,
      name: accountName,
      email,
      role,
      favorites,
      comparisons,
      recentlyViewed,
      scheduledVisits: [
        {
          id: 'visit-1',
          propertyId: 'prop-101',
          propertyTitle: 'The Solaris Modern Luxury Villa for Sale',
          date: '2026-10-05',
          time: '14:00',
          status: 'Confirmed'
        }
      ]
    });
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const addProperty = (newProp: Omit<Property, 'id' | 'viewsCount' | 'inquiriesCount' | 'dateListed'>) => {
    const property: Property = {
      ...newProp,
      id: `prop-${Date.now()}`,
      viewsCount: 1,
      inquiriesCount: 0,
      dateListed: new Date().toISOString().split('T')[0]
    };
    setProperties(prev => [property, ...prev]);
  };

  const updateProperty = (id: string, updatedFields: Partial<Property>) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    setFavorites(prev => prev.filter(pid => pid !== id));
    setComparisons(prev => prev.filter(pid => pid !== id));
  };

  const togglePublishStatus = (id: string) => {
    setProperties(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'active' ? 'pending' : 'active';
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const toggleFeaturedStatus = (id: string) => {
    setProperties(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, featured: !p.featured };
      }
      return p;
    }));
  };

  const formatPrice = (amount: number, currency: string = '$') => {
    if (currency === '$') {
      return `$${amount.toLocaleString('en-US')}`;
    }
    return `${currency} ${amount.toLocaleString('en-US')}`;
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        agents,
        inquiries,
        favorites,
        comparisons,
        recentlyViewed,
        currentUser,
        toggleFavorite,
        toggleComparison,
        removeFromComparison,
        clearComparison,
        recordPropertyView,
        addInquiry,
        scheduleViewing,
        loginUser,
        logoutUser,
        addProperty,
        updateProperty,
        deleteProperty,
        togglePublishStatus,
        toggleFeaturedStatus,
        formatPrice
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};
