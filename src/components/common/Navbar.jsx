import React, { useState } from 'react';
import LogoPlaceholder from './LogoPlaceholder';
import { 
  Search, 
  PlusCircle, 
  Menu, 
  X, 
  Globe, 
  PhoneCall, 
  ShieldCheck, 
  FileText,
  User,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenTrackModal, onOpenRegisterComplaintModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'directory', label: 'Public Directory' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'about', label: 'About LokSetu' },
    { id: 'contact', label: 'Contact & Help' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const languages = ['English', 'हिन्दी (Hindi)', 'मराठी (Marathi)', 'தமிழ் (Tamil)', 'ಕನ್ನಡ (Kannada)', 'తెలుగు (Telugu)'];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-civic-border shadow-xs">
      {/* Top Official Civic Strip */}
      <div className="bg-forest-900 text-white text-[11px] sm:text-xs py-1.5 border-b border-forest-800">
        <div className="civic-container flex items-center justify-between gap-2">
          {/* Left: Public Service Affiliation Notice */}
          <div className="flex items-center gap-2 text-forest-200">
            <span className="flex items-center gap-1 font-medium text-teal-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Civic Ward Redressal Initiative</span>
            </span>
            <span className="hidden md:inline text-forest-400">•</span>
            <span className="hidden md:inline text-forest-300">
              Citizen Governance Template Prototype
            </span>
          </div>

          {/* Right: Helpline & Language Picker */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-forest-200">
              <PhoneCall className="w-3 h-3 text-teal-400" />
              <span>Ward Helpline: <strong className="text-white font-semibold">1800-LOK-SETU (1800-565-7388)</strong></span>
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 text-forest-200 hover:text-white transition-colors px-1.5 py-0.5 rounded text-[11px] bg-forest-800/80 border border-forest-700"
              >
                <Globe className="w-3 h-3 text-teal-300" />
                <span>{selectedLang}</span>
                <ChevronDown className="w-2.5 h-2.5 ml-0.5" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-44 bg-white text-forest-900 rounded-lg shadow-elevated border border-gray-200 py-1.5 z-50 text-xs">
                  <div className="px-3 py-1 font-semibold text-[10px] uppercase tracking-wider text-gray-400 border-b border-gray-100">
                    Select Interface Language
                  </div>
                  {languages.map(lang => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang.split(' ')[0]);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-forest-50 hover:text-forest-800 flex items-center justify-between"
                    >
                      <span>{lang}</span>
                      {selectedLang === lang.split(' ')[0] && (
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="civic-container py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <button 
            onClick={() => handleNavClick('home')}
            className="text-left focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-0.5"
          >
            <LogoPlaceholder size="default" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-forest-50 text-forest-900 font-semibold border border-forest-200 shadow-xs'
                      : 'text-civic-text-secondary hover:text-forest-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Quick Track Grievance Button */}
            <button
              onClick={onOpenTrackModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-forest-800 bg-white hover:bg-forest-50 border border-forest-200 rounded-lg transition-all shadow-subtle hover:border-forest-300"
              title="Look up case status by ID"
            >
              <Search className="w-3.5 h-3.5 text-teal-600" />
              <span>Track Complaint</span>
            </button>

            {/* Register Complaint Primary CTA */}
            <button
              onClick={onOpenRegisterComplaintModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-forest-800 hover:bg-forest-900 rounded-lg shadow-sm transition-all border border-forest-700 hover:shadow"
            >
              <PlusCircle className="w-3.5 h-3.5 text-teal-300" />
              <span>Register Complaint</span>
            </button>

            {/* Auth Buttons */}
            <div className="h-6 w-px bg-gray-200 mx-1"></div>

            <button
              onClick={() => handleNavClick('login')}
              className={`text-xs font-medium px-2.5 py-2 rounded-lg transition-colors ${
                activePage === 'login' 
                  ? 'text-teal-700 font-bold bg-teal-50' 
                  : 'text-civic-text-secondary hover:text-forest-900 hover:bg-gray-100'
              }`}
            >
              Citizen Login
            </button>

            <button
              onClick={() => handleNavClick('register')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                activePage === 'register'
                  ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                  : 'text-teal-700 bg-teal-50 border-teal-200 hover:bg-teal-100/70'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenTrackModal}
              className="p-2 text-forest-800 hover:bg-forest-50 rounded-lg border border-gray-200"
              title="Track complaint"
            >
              <Search className="w-4 h-4 text-teal-600" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-forest-900 hover:bg-gray-100 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 shadow-elevated">
          <div className="flex flex-col gap-1">
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-1">
              Main Navigation
            </div>
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                  activePage === item.id
                    ? 'bg-forest-100 text-forest-900 font-bold'
                    : 'text-civic-text-primary hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 pt-3 pb-1">
              Account & Grievance Actions
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegisterComplaintModal();
              }}
              className="w-full text-center py-2.5 text-sm font-semibold text-white bg-forest-800 rounded-lg shadow-sm"
            >
              Register Complaint
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrackModal();
              }}
              className="w-full text-center py-2.5 text-sm font-semibold text-forest-800 bg-forest-50 border border-forest-200 rounded-lg"
            >
              Track Existing Complaint
            </button>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => handleNavClick('login')}
                className="text-center py-2 text-xs font-semibold text-gray-700 bg-gray-100 rounded-lg"
              >
                Citizen Login
              </button>
              <button
                onClick={() => handleNavClick('register')}
                className="text-center py-2 text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 rounded-lg"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Template Quick Screen Switcher Pill Bar (For effortless review of all 8 required screens) */}
      <div className="bg-forest-50/70 border-t border-forest-100 py-1.5 px-3">
        <div className="civic-container flex items-center justify-between gap-2 overflow-x-auto text-[11px] scrollbar-none">
          <div className="flex items-center gap-1.5 flex-shrink-0 text-forest-800 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
            <span className="font-semibold text-forest-900">Template Screens:</span>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {[
              { id: 'home', label: '1. Landing' },
              { id: 'about', label: '2. About' },
              { id: 'how-it-works', label: '3. How It Works' },
              { id: 'directory', label: '4. Public Directory' },
              { id: 'login', label: '5. Login' },
              { id: 'register', label: '6. Registration' },
              { id: 'forgot-password', label: '7. Forgot Password' },
              { id: 'contact', label: '8. Contact & Help' },
            ].map(screen => (
              <button
                key={screen.id}
                onClick={() => handleNavClick(screen.id)}
                className={`px-2 py-0.5 rounded transition-all whitespace-nowrap ${
                  activePage === screen.id
                    ? 'bg-forest-800 text-white font-bold shadow-xs'
                    : 'text-forest-700 hover:bg-forest-100'
                }`}
              >
                {screen.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
