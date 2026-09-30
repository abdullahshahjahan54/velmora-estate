import React, { useState } from 'react';
import { usePropertyContext } from '../../context/PropertyContext';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  HelpCircle 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addInquiry } = usePropertyContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Property Acquisition Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    addInquiry({
      name,
      email,
      phone,
      message: `Subject: ${subject} | Details: ${message}`,
      type: 'inquiry'
    });

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="bg-[#FBFBF9] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9C7E44] mb-2">
            Client Advisory & Global Concierge
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191C1E] tracking-tight">
            Talk to a Property Expert
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#545B63] leading-relaxed">
            Whether you require a confidential property valuation, are planning a high-value acquisition, or wish to schedule a property viewing, our dedicated property consultants are ready to assist.
          </p>
        </div>

        {/* Contact Grid: Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#E8E5DF] shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-[#191C1E] mb-2">
              Send an Advisory Inquiry
            </h2>
            <p className="text-xs text-[#545B63] mb-6">
              Our real estate company provides responses within two business hours.
            </p>

            {submitted ? (
              <div className="rounded-xl bg-[#FAF8F5] border border-emerald-300 p-8 text-center space-y-3">
                <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-[#191C1E]">
                  Inquiry Dispatched Successfully!
                </h3>
                <p className="text-xs text-[#545B63] max-w-md mx-auto">
                  A certified property consultant has received your inquiry and will reach out via email and phone shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-sm bg-[#191C1E] px-5 py-2 text-xs font-semibold text-white uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Katherine Sterling"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] px-3.5 py-2.5 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="katherine@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] px-3.5 py-2.5 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] px-3.5 py-2.5 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#737A82] mb-1">Inquiry Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] px-3.5 py-2.5 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                    >
                      <option>Property Acquisition Inquiry</option>
                      <option>Sell Property & Valuation</option>
                      <option>Schedule a Property Viewing</option>
                      <option>Commercial Real Estate Investment</option>
                      <option>Luxury Rental Inquiry</option>
                      <option>General Concierge</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#737A82] mb-1">Detailed Message *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us about the property, location, budget range, or questions you have..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] px-3.5 py-2.5 text-xs text-[#191C1E] focus:border-[#C2A772] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-sm bg-[#191C1E] py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2B3037] transition-colors"
                >
                  <Send className="h-4 w-4 text-[#C2A772]" />
                  <span>Send Advisory Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Information & Office Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Headquarters Card */}
            <div className="rounded-2xl border border-[#E8E5DF] bg-[#FAF8F5] p-6 sm:p-8 space-y-4">
              <span className="text-[11px] uppercase tracking-widest text-[#9C7E44] font-semibold">
                Global Headquarters
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#191C1E]">
                Velmora Estates Group
              </h3>
              
              <div className="space-y-3 text-xs text-[#545B63]">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-[#9C7E44] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#191C1E] block">Manhattan Advisory Tower</strong>
                    <span>740 Park Avenue, 18th Floor, New York, NY 10021</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-[#9C7E44] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#191C1E] block">Telephone Desk</strong>
                    <span>+1 (800) 555-8356 / +1 (212) 934-8821</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-[#9C7E44] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#191C1E] block">Electronic Correspondence</strong>
                    <span>advisory@velmoraestates.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-[#9C7E44] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#191C1E] block">Business Hours</strong>
                    <span>Monday – Friday: 9:00 AM – 7:00 PM EST</span>
                    <span className="block text-[11px] text-[#737A82]">Saturday: 10:00 AM – 4:00 PM (Private appointments)</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8E5DF]">
                <a
                  href="https://wa.me/13108492910"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-sm bg-emerald-700 py-2.5 text-xs font-semibold text-white hover:bg-emerald-800 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Connect Instantly on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Regional Desks */}
            <div className="rounded-xl border border-[#E8E5DF] bg-white p-6 space-y-3">
              <h4 className="font-serif text-lg font-bold text-[#191C1E]">
                Regional Representative Desks
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs text-[#545B63]">
                <div className="p-2.5 bg-[#FAF8F5] rounded-md">
                  <p className="font-semibold text-[#191C1E]">Beverly Hills, CA</p>
                  <p className="text-[11px] text-[#737A82]">+1 (310) 849-2910</p>
                </div>
                <div className="p-2.5 bg-[#FAF8F5] rounded-md">
                  <p className="font-semibold text-[#191C1E]">London Mayfair, UK</p>
                  <p className="text-[11px] text-[#737A82]">+44 20 7946 0192</p>
                </div>
                <div className="p-2.5 bg-[#FAF8F5] rounded-md">
                  <p className="font-semibold text-[#191C1E]">Dubai Marina, UAE</p>
                  <p className="text-[11px] text-[#737A82]">+971 4 829 1900</p>
                </div>
                <div className="p-2.5 bg-[#FAF8F5] rounded-md">
                  <p className="font-semibold text-[#191C1E]">Dera Ismail Khan, PK</p>
                  <p className="text-[11px] text-[#737A82]">+92 966 710492</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
