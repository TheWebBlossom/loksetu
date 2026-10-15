import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  ChevronRight,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';
import { FAQS, WARDS_LIST } from '../data/mockData';
import DemoBadge from '../components/common/DemoBadge';

export default function ContactHelpPage({ onNavigate, onOpenRegister }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedWardFilter, setSelectedWardFilter] = useState('');
  const [inquirySent, setInquirySent] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: 'Aditi Sharma',
    email: 'aditi.sharma@example.com',
    ward: 'Ward 42 — Mayur Vihar',
    subject: 'Ward Committee Assembly Schedule Inquiry',
    message: 'Could you please confirm the date and public participation venue for the upcoming Ward Sabha meeting for Ward 42?'
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
  };

  const filteredWards = WARDS_LIST.filter(w => 
    !selectedWardFilter || 
    w.name.toLowerCase().includes(selectedWardFilter.toLowerCase()) ||
    w.city.toLowerCase().includes(selectedWardFilter.toLowerCase()) ||
    w.officer.toLowerCase().includes(selectedWardFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-civic-canvas py-12">
      <div className="civic-container">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <button onClick={() => onNavigate('home')} className="hover:text-forest-800">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-forest-900 font-semibold">Helpdesk & Contact</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-100 border border-forest-200 px-3 py-1 rounded-full">
                Citizen Support & Grievance Redressal
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-950 mt-3 tracking-tight">
                Ward Helpdesk & Citizen Assistance
              </h1>
              <p className="text-sm sm:text-base text-civic-text-secondary mt-1.5 max-w-xl">
                Connect directly with your designated Municipal Ward Office, locate control room phone lines, or file an institutional escalation inquiry.
              </p>
            </div>

            <DemoBadge text="Civic Directory & FAQ" variant="prominent" />
          </div>
        </div>

        {/* 3 Contact Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Toll Free Helpline */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-card flex flex-col justify-between hover:border-forest-300 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center border border-forest-200 mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">Central Helpline</span>
              <h3 className="text-lg font-bold text-gray-900 mt-1">1800-LOK-SETU</h3>
              <p className="text-xs text-gray-500 mt-0.5">(1800-565-7388) Toll-Free Nationwide</p>
              <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                Operated 24x7 for urgent civic safety hazards (live electric wires, deep uncovered manholes, drinking water crisis).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 text-xs font-semibold text-forest-800 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>Available in 12 Regional Languages</span>
            </div>
          </div>

          {/* WhatsApp Grievance Bot */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-card flex flex-col justify-between hover:border-forest-300 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200 mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">Citizen WhatsApp Bot</span>
              <h3 className="text-lg font-bold text-gray-900 mt-1">+91 91520 20260</h3>
              <p className="text-xs text-gray-500 mt-0.5">Automated Municipal Assistant</p>
              <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                Send a photograph and location pin on WhatsApp to instantly generate a registered Complaint ID without logging into the portal.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 text-xs font-semibold text-forest-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              <span>Instant AI Geo-tag Routing</span>
            </div>
          </div>

          {/* Ward Ombudsman & Lokayukta Desk */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-card flex flex-col justify-between hover:border-forest-300 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200 mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Statutory Oversight</span>
              <h3 className="text-lg font-bold text-gray-900 mt-1">Ward Ombudsman Desk</h3>
              <p className="text-xs text-gray-500 mt-0.5">ombudsman@loksetu.gov.in</p>
              <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                For persistent SLA breaches, contractor irregularities, or rejected closures that require judicial inquiry under Municipal Acts.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 text-xs font-semibold text-forest-800 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-amber-600" />
              <span>Independent Vigilance Wing</span>
            </div>
          </div>
        </div>

        {/* Section: Municipal Ward Directory Lookup */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-card mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-forest-900">
                Municipal Ward Office Locator & Control Rooms
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Direct contact details for on-duty Junior Engineers and Ward Health Officers across active pilot zones.
              </p>
            </div>

            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Search city, ward, or officer..."
                value={selectedWardFilter}
                onChange={(e) => setSelectedWardFilter(e.target.value)}
                className="w-full text-xs rounded-xl border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-forest-50/70 text-forest-900 font-bold">
                  <th className="py-3 px-4">Ward Designation</th>
                  <th className="py-3 px-4">Municipal Corporation</th>
                  <th className="py-3 px-4">Designated Nodal Officer</th>
                  <th className="py-3 px-4">Ward Control Room Line</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {filteredWards.map((w) => (
                  <tr key={w.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-gray-900">
                      {w.name}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">{w.city}</td>
                    <td className="py-3.5 px-4 font-medium text-forest-800">{w.officer}</td>
                    <td className="py-3.5 px-4 font-mono text-teal-800 font-semibold">{w.helpline}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={onOpenRegister}
                        className="text-[11px] font-bold text-forest-800 hover:text-teal-700 underline"
                      >
                        Lodge in this Ward →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Two Column Layout: FAQ Accordion & Contact Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* FAQ Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                Frequently Asked Questions
              </span>
              <h3 className="text-2xl font-bold text-forest-950 mt-2.5">
                Common Citizen Inquiries
              </h3>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm text-gray-900 hover:text-forest-900 transition-colors"
                    >
                      <span className="flex-1">{faq.q}</span>
                      <div className="w-6 h-6 rounded-full bg-forest-50 text-forest-800 flex items-center justify-center flex-shrink-0">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Inquiry Form Column (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-card">
              <div className="mb-5">
                <h3 className="text-lg font-bold text-forest-950">
                  Send a Message to Ward Helpdesk
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Have a suggestion or need guidance on Ward Committee rules? Submit an inquiry below.
                </p>
              </div>

              {inquirySent ? (
                <div className="p-6 text-center space-y-3 bg-forest-50/70 rounded-2xl border border-forest-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">Inquiry Dispatched (Demo)</h4>
                  <p className="text-xs text-gray-600">
                    Your inquiry has been routed to the <strong>Ward 42 Liaison Desk</strong>. Ticket ref: #INQ-2026-9021.
                  </p>
                  <button
                    onClick={() => setInquirySent(false)}
                    className="mt-2 text-xs font-semibold text-teal-800 underline"
                  >
                    Send another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full text-xs rounded-xl border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full text-xs rounded-xl border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Municipal Ward</label>
                    <input
                      type="text"
                      value={contactForm.ward}
                      onChange={(e) => setContactForm({ ...contactForm, ward: e.target.value })}
                      className="w-full text-xs rounded-xl border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full text-xs rounded-xl border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Message Description</label>
                    <textarea
                      rows={3}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full text-xs rounded-xl border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-3.5 h-3.5 text-teal-300" />
                    <span>Send Message to Ward Desk</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
