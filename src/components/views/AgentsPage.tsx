import React, { useState } from 'react';
import { Agent, Property } from '../../types/property';
import { usePropertyContext } from '../../context/PropertyContext';
import { 
  Users, 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle,
  Briefcase 
} from 'lucide-react';

interface AgentsPageProps {
  onSelectAgent: (agent: Agent) => void;
  onSelectProperty: (property: Property) => void;
}

export const AgentsPage: React.FC<AgentsPageProps> = ({ 
  onSelectAgent,
  onSelectProperty 
}) => {
  const { agents } = usePropertyContext();
  const [filterSpecialization, setFilterSpecialization] = useState('all');

  const specializations = [
    { label: 'All Real Estate Agents', value: 'all' },
    { label: 'Luxury Residential & Waterfront', value: 'Luxury' },
    { label: 'Commercial Real Estate & Capital', value: 'Commercial' },
    { label: 'Urban Apartments & Penthouses', value: 'Apartments' },
    { label: 'Plots, Land & Country Estates', value: 'Land' },
  ];

  const filteredAgents = specializations.find(s => s.value === filterSpecialization)?.value === 'all'
    ? agents
    : agents.filter(a => a.specialization.toLowerCase().includes(filterSpecialization.toLowerCase()));

  return (
    <div className="bg-[#FBFBF9] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9C7E44] mb-2">
            Real Estate Agents & Property Consultants
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191C1E] tracking-tight">
            Meet Our Premier Real Estate Professionals
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#545B63] leading-relaxed">
            Our licensed property consultants and real estate professionals provide unmatched market intelligence, discreet client advocacy, and end-to-end transaction management across global residential and commercial properties.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {specializations.map(spec => (
            <button
              key={spec.value}
              onClick={() => setFilterSpecialization(spec.value)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                filterSpecialization === spec.value
                  ? 'bg-[#191C1E] text-white shadow-xs font-semibold'
                  : 'bg-white border border-[#E8E5DF] text-[#545B63] hover:border-[#191C1E] hover:text-[#191C1E]'
              }`}
            >
              {spec.label}
            </button>
          ))}
        </div>

        {/* Agents Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredAgents.map(agent => (
            <div
              key={agent.id}
              className="group rounded-xl border border-[#E8E5DF] bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#C2A772] hover:shadow-lg flex flex-col sm:flex-row gap-6"
            >
              {/* Avatar Media */}
              <div className="relative shrink-0 sm:w-48 aspect-[3/4] sm:aspect-auto overflow-hidden rounded-lg bg-[#ECE8E1]">
                <img
                  src={agent.avatar}
                  alt={`${agent.name} - Real Estate Agent`}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5 bg-[#191C1E]/80 backdrop-blur-sm text-white px-2 py-0.5 text-[10px] font-semibold rounded-xs">
                  {agent.dealsClosed}+ Closed
                </div>
              </div>

              {/* Bio & Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9C7E44]">
                      {agent.experience}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-[#C2A772]">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span className="font-bold text-[#191C1E] tabular-nums">{agent.rating}</span>
                      <span className="text-[10px] text-[#737A82]">({agent.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#191C1E]">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-[#737A82] mb-3">{agent.title}</p>

                  <p className="text-xs text-[#545B63] line-clamp-3 leading-relaxed mb-4">
                    {agent.bio}
                  </p>

                  <div className="space-y-1.5 text-xs text-[#545B63] border-t border-[#F0ECE1] pt-3">
                    <p className="text-[11px]">
                      <strong className="text-[#191C1E]">Specialization:</strong> {agent.specialization}
                    </p>
                    <p className="text-[11px] truncate">
                      <strong className="text-[#191C1E]">Areas Served:</strong> {agent.areasServed.join(', ')}
                    </p>
                    <p className="text-[11px]">
                      <strong className="text-[#191C1E]">Active Listings:</strong> {agent.activeListings} verified properties
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-5 pt-4 border-t border-[#F0ECE1] grid grid-cols-2 gap-2">
                  <a
                    href={`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-sm bg-emerald-700 py-2 text-xs font-semibold text-white hover:bg-emerald-800 transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <button
                    onClick={() => onSelectAgent(agent)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-sm bg-[#191C1E] py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2B3037] transition-colors"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="h-3 w-3 text-[#C2A772]" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Standards Banner */}
        <div className="rounded-2xl border border-[#E8E5DF] bg-[#FAF8F5] p-8 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <CheckCircle className="h-6 w-6 text-[#C2A772] mx-auto mb-2" />
              <h4 className="font-serif text-lg font-bold text-[#191C1E]">Certified & Licensed</h4>
              <p className="text-xs text-[#545B63] mt-1">Accredited by international real estate regulatory councils.</p>
            </div>
            <div>
              <CheckCircle className="h-6 w-6 text-[#C2A772] mx-auto mb-2" />
              <h4 className="font-serif text-lg font-bold text-[#191C1E]">Strict Confidentiality</h4>
              <p className="text-xs text-[#545B63] mt-1">Non-disclosure agreements executed for every high-value negotiation.</p>
            </div>
            <div>
              <CheckCircle className="h-6 w-6 text-[#C2A772] mx-auto mb-2" />
              <h4 className="font-serif text-lg font-bold text-[#191C1E]">Comprehensive Diligence</h4>
              <p className="text-xs text-[#545B63] mt-1">Full structural, title deed, and zoning verification before contracting.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
