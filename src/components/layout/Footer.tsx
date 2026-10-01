import React from 'react';
import { Building2, Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#E8E5DF] bg-[#121519] text-[#E0E2EC]">
      {/* Top Value Strip */}
      <div className="border-b border-[#222831] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div>
              <p className="font-serif text-2xl text-white font-medium">
                Find Your Place. Build Your Future.
              </p>
              <p className="text-xs text-[#9FA8B4] mt-1">
                Velmora Estates – Premier real estate agency for luxury homes, modern apartments, villas & investment properties.
              </p>
            </div>
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 sm:items-center justify-end">
              <button
                onClick={() => onNavigate('properties')}
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#C2A772] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#121519] hover:bg-[#D5BC8A] transition-colors"
              >
                <span>Explore Property Listings</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#3C424C] bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:border-[#C2A772] hover:text-[#C2A772] transition-colors"
              >
                <span>Schedule a Property Viewing</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#C2A772] text-[#121519]">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Velmora Estates
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#9FA8B4] max-w-md">
              Velmora Estates is a premier full-service real estate company specializing in luxury homes for sale, apartments for rent, bespoke residential villas, commercial real estate acquisitions, and prime land plots. We connect discerning buyers with exceptional properties worldwide.
            </p>
            <div className="pt-2 space-y-2 text-xs text-[#C6CCD6]">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#C2A772] shrink-0" />
                <span>740 Park Avenue, 18th Floor, New York, NY 10021</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#C2A772] shrink-0" />
                <span>+1 (800) 555-8356 / +1 (212) 934-8821</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#C2A772] shrink-0" />
                <span>advisory@velmoraestates.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#C2A772] shrink-0" />
                <span>Mon – Fri: 9:00 AM – 7:00 PM EST (Saturday by appointment)</span>
              </div>
            </div>

            {/* Official Social Media Channels (Instagram, TikTok, Facebook, YouTube, WhatsApp, LinkedIn, X, Pinterest) */}
            <div className="pt-4 border-t border-[#222831]">
              <span className="block text-[11px] uppercase tracking-wider text-[#A6ADB8] font-semibold mb-3">
                Follow Velmora Estates Worldwide
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram @VelmoraEstates"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1E232B] text-[#D1D5DB] border border-[#2E3541] hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white hover:border-transparent transition-all shadow-sm group"
                >
                  <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  title="TikTok @VelmoraEstates"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1E232B] text-[#D1D5DB] border border-[#2E3541] hover:bg-[#000000] hover:text-[#00F2FE] hover:border-[#FE2C55] transition-all shadow-sm group"
                >
                  <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.33 6.33 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.33 6.33 0 0 0 6.33-6.34V8.58a8.28 8.28 0 0 0 5.08 1.75V6.89a4.85 4.85 0 0 1-1.3-.2z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Facebook /VelmoraEstates"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1E232B] text-[#D1D5DB] border border-[#2E3541] hover:bg-[#1877F2] hover:text-white hover:border-transparent transition-all shadow-sm group"
                >
                  <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  title="YouTube @VelmoraEstates"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1E232B] text-[#D1D5DB] border border-[#2E3541] hover:bg-[#FF0000] hover:text-white hover:border-transparent transition-all shadow-sm group"
                >
                  <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/13108492910?text=Hello%20Velmora%20Estates%2C%20I%20am%20interested%20in%20inquiring%20about%20your%20luxury%20real%20estate%20properties."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp Direct +1 (310) 849-2910"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1E232B] text-[#D1D5DB] border border-[#2E3541] hover:bg-[#25D366] hover:text-white hover:border-transparent transition-all shadow-sm group"
                >
                  <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn Velmora Estates"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1E232B] text-[#D1D5DB] border border-[#2E3541] hover:bg-[#0A66C2] hover:text-white hover:border-transparent transition-all shadow-sm group"
                >
                  <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* X / Twitter */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  title="X (Twitter) @VelmoraEstates"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1E232B] text-[#D1D5DB] border border-[#2E3541] hover:bg-[#000000] hover:text-white hover:border-[#4B5563] transition-all shadow-sm group"
                >
                  <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Pinterest */}
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                  title="Pinterest Velmora Luxury Living"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1E232B] text-[#D1D5DB] border border-[#2E3541] hover:bg-[#E60023] hover:text-white hover:border-transparent transition-all shadow-sm group"
                >
                  <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.369-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Properties Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Properties for Sale
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9FA8B4]">
              <li>
                <button onClick={() => onNavigate('buy', 'villa')} className="hover:text-white transition-colors">
                  Luxury Villas for Sale
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('buy', 'house')} className="hover:text-white transition-colors">
                  Houses for Sale
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('buy', 'penthouse')} className="hover:text-white transition-colors">
                  Modern Penthouse Apartments
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('buy', 'commercial')} className="hover:text-white transition-colors">
                  Commercial Real Estate
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('buy', 'land')} className="hover:text-white transition-colors">
                  Land & Plots for Sale
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('properties')} className="hover:text-white transition-colors">
                  All Real Estate Listings
                </button>
              </li>
            </ul>
          </div>

          {/* Rental & Services Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Rentals & Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9FA8B4]">
              <li>
                <button onClick={() => onNavigate('rent', 'apartment')} className="hover:text-white transition-colors">
                  Apartments for Rent
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('rent', 'house')} className="hover:text-white transition-colors">
                  Houses for Rent
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sell')} className="hover:text-white transition-colors">
                  Sell Your Property
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sell')} className="hover:text-white transition-colors">
                  Property Valuation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Property Management
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('buy')} className="hover:text-white transition-colors">
                  Property Investment Advisory
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Advisors */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Real Estate Agents
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9FA8B4]">
              <li>
                <button onClick={() => onNavigate('agents')} className="hover:text-white transition-colors">
                  Our Real Estate Agents
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('agents')} className="hover:text-white transition-colors">
                  Property Consultants
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About Velmora Estates
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compare')} className="hover:text-white transition-colors">
                  Property Comparison Matrix
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-white transition-colors">
                  Admin Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Talk to a Property Expert
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* SEO Keywords Natural Bar */}
        <div className="mt-12 pt-8 border-t border-[#222831] text-[11px] text-[#6E7785] leading-relaxed">
          <p>
            <strong className="text-[#9FA8B4]">Popular Real Estate Searches:</strong>{' '}
            <span>properties for sale</span> · <span>houses for sale</span> · <span>homes for sale</span> · <span>luxury homes</span> · <span>luxury properties</span> · <span>apartments for sale</span> · <span>apartments for rent</span> · <span>houses for rent</span> · <span>commercial property</span> · <span>commercial real estate</span> · <span>residential property</span> · <span>real estate investment</span> · <span>investment properties</span> · <span>land for sale</span> · <span>plots for sale</span> · <span>villas for sale</span> · <span>modern apartments</span> · <span>real estate agents</span> · <span>property consultants</span> · <span>buy property</span> · <span>sell property</span> · <span>rent property</span> · <span>property valuation</span> · <span>schedule a property viewing</span>.
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E7785] gap-4">
          <p>© {new Date().getFullYear()} Velmora Estates. All rights reserved. Equal Housing Opportunity.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Fair Housing Act</span>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline decoration-[#C2A772] underline-offset-4"
              title="View XML Sitemap"
            >
              Sitemap (XML)
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
