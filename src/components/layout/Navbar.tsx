import React, { useState } from 'react';
import { usePropertyContext } from '../../context/PropertyContext';
import { 
  Building2, 
  Heart, 
  Scale, 
  User, 
  Menu, 
  X, 
  PlusCircle, 
  ShieldCheck,
  ChevronDown,
  LogOut
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenAuth }) => {
  const { favorites, comparisons, currentUser, logoutUser } = usePropertyContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'Properties', view: 'properties' },
    { label: 'Buy', view: 'buy' },
    { label: 'Rent', view: 'rent' },
    { label: 'Sell Property', view: 'sell' },
    { label: 'Agents', view: 'agents' },
    { label: 'About', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: string, param?: string) => {
    onNavigate(view, param);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E8E5DF] bg-[#FBFBF9]/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Single element wordmark brand mark */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#191C1E] text-[#C2A772] transition-transform duration-300 group-hover:scale-105">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#191C1E] transition-colors group-hover:text-[#9C7E44]">
              Velmora Estates
            </span>
          </div>
        </button>

        {/* Zone 2: 4-8 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] font-medium tracking-wide uppercase text-[#545B63]">
          {navLinks.map((link) => {
            const isActive = currentView === link.view;
            return (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`relative py-2 transition-colors hover:text-[#191C1E] ${
                  isActive ? 'text-[#191C1E] font-semibold' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#C2A772]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Comparison, Favorites, Auth, List CTA) */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Comparison quick action */}
          <button
            onClick={() => handleNavClick('compare')}
            title="Compare Properties"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#191C1E] hover:bg-[#EFECE6] transition-colors"
          >
            <Scale className="h-4 w-4" />
            {comparisons.length > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C2A772] text-[10px] font-bold text-white tabular-nums">
                {comparisons.length}
              </span>
            )}
          </button>

          {/* Favorites quick action */}
          <button
            onClick={() => handleNavClick('dashboard', 'favorites')}
            title="Saved Favorite Properties"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#191C1E] hover:bg-[#EFECE6] transition-colors"
          >
            <Heart className="h-4 w-4" />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#191C1E] text-[10px] font-bold text-white tabular-nums">
                {favorites.length}
              </span>
            )}
          </button>

          {/* User Account / Sign In */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 rounded-lg border border-[#E8E5DF] bg-white px-3 py-1.5 text-xs font-medium text-[#191C1E] hover:border-[#C2A772] transition-colors"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#191C1E] text-white text-[10px] font-bold">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.name}</span>
                {currentUser.role === 'admin' && (
                  <span className="text-[10px] uppercase tracking-wider text-[#9C7E44] font-semibold">Admin</span>
                )}
                <ChevronDown className="h-3.5 w-3.5 text-[#737A82]" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg border border-[#E8E5DF] bg-white p-2 shadow-xl z-50">
                  <div className="px-3 py-2 border-b border-[#F0ECE1]">
                    <p className="text-xs font-semibold text-[#191C1E]">{currentUser.name}</p>
                    <p className="text-[11px] text-[#737A82] truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-[#545B63] hover:bg-[#FBFBF9] hover:text-[#191C1E] rounded-md transition-colors"
                  >
                    <User className="h-4 w-4 text-[#9C7E44]" />
                    User Dashboard
                  </button>
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-[#545B63] hover:bg-[#FBFBF9] hover:text-[#191C1E] rounded-md transition-colors"
                  >
                    <ShieldCheck className="h-4 w-4 text-[#9C7E44]" />
                    Admin Portal
                  </button>
                  <button
                    onClick={() => {
                      logoutUser();
                      setUserDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#191C1E] hover:text-[#9C7E44] transition-colors whitespace-nowrap"
            >
              <User className="h-3.5 w-3.5" />
              Sign In
            </button>
          )}

          {/* List Your Property CTA */}
          <button
            onClick={() => handleNavClick('sell')}
            className="flex items-center gap-1.5 rounded-sm bg-[#191C1E] px-4 py-2.5 text-xs font-semibold tracking-wide uppercase text-white shadow-sm hover:bg-[#2B3037] transition-all whitespace-nowrap"
          >
            <PlusCircle className="h-3.5 w-3.5 text-[#C2A772]" />
            <span className="hidden sm:inline">List Your Property</span>
            <span className="sm:hidden">List</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-md text-[#191C1E] hover:bg-[#EFECE6] transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E5DF] bg-[#FBFBF9] px-6 py-6 shadow-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`text-left text-base font-medium py-1.5 transition-colors ${
                  currentView === link.view ? 'text-[#9C7E44] font-bold' : 'text-[#191C1E]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-4 border-t border-[#E8E5DF] flex flex-col gap-3">
              {!currentUser && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-sm border border-[#191C1E] text-xs font-semibold uppercase tracking-wider text-[#191C1E]"
                >
                  <User className="h-4 w-4" />
                  Sign In / Register
                </button>
              )}
              <button
                onClick={() => handleNavClick('admin')}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-sm bg-[#EFECE6] text-xs font-semibold uppercase tracking-wider text-[#191C1E]"
              >
                <ShieldCheck className="h-4 w-4 text-[#9C7E44]" />
                Admin Dashboard
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
