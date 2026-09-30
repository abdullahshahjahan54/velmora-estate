export type ListingType = 'sale' | 'rent';

export type PropertyType = 
  | 'villa' 
  | 'apartment' 
  | 'house' 
  | 'penthouse' 
  | 'commercial' 
  | 'land';

export interface PropertyLocation {
  city: string;
  state: string;
  country: string;
  address: string;
  neighborhood: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface PropertyAmenity {
  name: string;
  category: 'Comfort' | 'Safety' | 'Outdoor' | 'Luxury';
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  price: number;
  currency: string;
  pricePrefix?: string;
  listingType: ListingType;
  propertyType: PropertyType;
  status: 'active' | 'pending' | 'sold' | 'rented';
  featured: boolean;
  isNew?: boolean;
  location: PropertyLocation;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  garages: number;
  yearBuilt: number;
  furnished: 'Furnished' | 'Unfurnished' | 'Semi-Furnished';
  images: string[];
  floorPlanUrl?: string;
  videoTourUrl?: string;
  description: string;
  features: string[];
  amenities: PropertyAmenity[];
  agentId: string;
  dateListed: string;
  viewsCount: number;
  inquiriesCount: number;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experience: string;
  phone: string;
  email: string;
  whatsapp: string;
  avatar: string;
  bio: string;
  areasServed: string[];
  activeListings: number;
  dealsClosed: number;
  rating: number;
  reviewsCount: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  propertyTypePurchased: string;
  rating: number;
  comment: string;
  avatar: string;
  location: string;
}

export interface Inquiry {
  id: string;
  propertyId?: string;
  propertyTitle?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'inquiry' | 'viewing' | 'valuation' | 'seller_submission';
  date?: string;
  time?: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  favorites: string[];
  comparisons: string[];
  recentlyViewed: string[];
  scheduledVisits: Array<{
    id: string;
    propertyId: string;
    propertyTitle: string;
    date: string;
    time: string;
    status: 'Pending' | 'Confirmed' | 'Completed';
  }>;
}

export interface PropertyFilterState {
  searchQuery: string;
  listingType: 'all' | 'sale' | 'rent';
  propertyType: 'all' | PropertyType;
  city: 'all' | string;
  minPrice: number;
  maxPrice: number;
  bedrooms: 'any' | number;
  bathrooms: 'any' | number;
  minArea: number;
  furnished: 'all' | 'Furnished' | 'Unfurnished' | 'Semi-Furnished';
  amenities: string[];
  featuredOnly: boolean;
  sortBy: 'latest' | 'price-asc' | 'price-desc' | 'popular';
}
