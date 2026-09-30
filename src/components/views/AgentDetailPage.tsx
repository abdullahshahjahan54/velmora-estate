import React, { useState } from 'react';
import { Agent, Property } from '../../types/property';
import { usePropertyContext } from '../../context/PropertyContext';
import { PropertyCard } from '../property/PropertyCard';
import { 
  ChevronLeft, 
  Phone, 
  Mail, 
  MessageSquare, 
  Star, 
  MapPin, 
  Briefcase, 
  Award, 
  CheckCircle,
  Building2 
} from 'lucide-react';

interface AgentDetailPageProps {
  agent: Agent;
  onBack: () => void;
  onSelectProperty: (property: Property) => void;
}

export const AgentDetailPage: React.FC<AgentDetailPageProps> = ({
  agent,
  onBack,
  onSelectProperty
}) => {
  const { properties, addInquiry } = usePropertyContext();

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState(`Hello ${agent.name}, I would like to consult with you regarding property acquisitions.`);
  const [submitted, setSubmitted] = useState(false);

  // Agent's active listings
  const agentProperties = properties.filter(p => p.agentId === agent.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;

    addInquiry({
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
      message: `Direct Message to ${agent.name}: ${contactMessage}`,
      type: 'inquiry'
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-[#FBFBF9] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Link */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#545B63] hover:text-[#191C1E] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to All Real Estate Agents</span>
        </button>

        {/* Profile Card Header */}
        <div className="rounded-2xl border border-[#E8E5DF] bg-white p-8 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Avatar */}
            <div className="lg:col-span-4 shrink-0 aspect-[4/5] rounded-xl overflow-hidden bg-[#ECE8E1] border border-[#E8E5DF]">
              <img
                src={agent.avatar}
                alt={agent.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#9C7E44]">
                    {agent.title}
                  </span>
                  <div className="flex items-center gap-1.5 text-[#C2A772] text-sm">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-bold text-[#191C1E]">{agent.rating}</span>
                    <span className="text-xs text-[#737A82]">({agent.reviewsCount} Verified Reviews)</span>
                  </div>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191C1E]">
                  {agent.name}
                </h1>
                
                <p className="mt-4 text-xs sm:text-sm text-[#545B63] leading-relaxed">
                  {agent.bio}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 border-y border-[#F0ECE1] py-4 text-center">
                <div>
                  <p className="text-[11px] text-[#737A82] uppercase">Experience</p>
                  <p className="font-serif text-xl font-bold text-[#191C1E] mt-0.5">{agent.experience.split(' ')[0]}</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#737A82] uppercase">Properties Closed</p>
                  <p className="font-serif text-xl font-bold text-[#191C1E] mt-0.5 tabular-nums">{agent.dealsClosed}+</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#737A82] uppercase">Active Listings</p>
                  <p className="font-serif text-xl font-bold text-[#9C7E44] mt-0.5 tabular-nums">{agent.activeListings}</p>
                </div>
              </div>

              {/* Specialization & Areas */}
              <div className="space-y-2 text-xs text-[#545B63]">
                <p>
                  <strong className="text-[#191C1E]">Core Specialization:</strong> {agent.specialization}
                </p>
                <p>
                  <strong className="text-[#191C1E]">Territories & Areas Served:</strong> {agent.areasServed.join(', ')}
                </p>
              </div>

              {/* Direct Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm bg-emerald-700 px-6 py-2.5 text-xs font-semibold text-white hover:bg-emerald-800 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp Direct</span>
                </a>
                <a
                  href={`tel:${agent.phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center gap-2 rounded-sm border border-[#191C1E] px-6 py-2.5 text-xs font-semibold text-[#191C1E] hover:bg-[#191C1E] hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call {agent.phone}</span>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Contact Agent & Active Listings Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Active Listings Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#191C1E]">
              Current Listings by {agent.name} ({agentProperties.length})
            </h3>

            {agentProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {agentProperties.map(property => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onSelect={onSelectProperty}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-xl border border-[#E8E5DF] bg-white text-center text-xs text-[#545B63]">
                {agent.name} currently has exclusive off-market listings available upon verified request.
              </div>
            )}
          </div>

          {/* Contact Agent Form (4 cols) */}
          <div className="lg:col-span-4">
            <div className="rounded-xl border border-[#E8E5DF] bg-white p-6 shadow-sm sticky top-28 space-y-4">
              <h4 className="font-serif text-xl font-bold text-[#191C1E]">
                Direct Advisory Inquiry
              </h4>
              <p className="text-xs text-[#545B63]">
                Send an encrypted message directly to {agent.name}.
              </p>

              {submitted ? (
                <div className="rounded-md bg-emerald-50 border border-emerald-200 p-4 text-center">
                  <p className="text-xs font-semibold text-emerald-800">Message Dispatched!</p>
                  <p className="text-[11px] text-emerald-600 mt-1">
                    {agent.name} will respond to your email or telephone within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#737A82] mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#737A82] mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#737A82] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#737A82] mb-1">Message</label>
                    <textarea
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] px-3 py-2 text-xs text-[#191C1E] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-sm bg-[#191C1E] py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2B3037] transition-colors"
                  >
                    Send Direct Message
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
