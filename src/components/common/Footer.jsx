import React from 'react';
import LogoPlaceholder from './LogoPlaceholder';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Heart,
  FileCheck2,
  Clock,
  AlertCircle
} from 'lucide-react';

export default function Footer({ setActivePage }) {
  const handleNav = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-forest-950 text-white border-t border-forest-800 pt-14 pb-8">
      <div className="civic-container">
        {/* Top Ward Emergency Helpline Ribbon */}
        <div className="bg-forest-900/90 border border-forest-800 rounded-2xl p-5 mb-12 shadow-inner">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0 border border-teal-500/30">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-base">24x7 Ward Redressal Central Helpline</h4>
                <p className="text-xs text-forest-300">Toll-free across participating municipal corporations: 1800-LOK-SETU (1800-565-7388)</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs bg-forest-800 px-3 py-1.5 rounded-lg text-forest-200 border border-forest-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-300" />
                <span>Control Room: 24/7 Mon–Sun</span>
              </span>
              <button 
                onClick={() => handleNav('contact')}
                className="text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white px-4 py-1.5 rounded-lg transition-colors shadow-sm"
              >
                Find Your Ward Office
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column Footer Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-forest-800/80">
          {/* Brand & Purpose Column */}
          <div className="lg:col-span-2">
            <LogoPlaceholder size="large" inverted={true} />
            <p className="text-forest-200 text-sm mt-4 leading-relaxed max-w-sm">
              LokSetu (लोकसेतु) is a modern civic-tech platform bridging Indian citizens, ward councillors, and municipal engineers. Built on the principles of the 74th Constitutional Amendment for participatory ward democracy.
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs text-forest-300 bg-forest-900/60 p-2.5 rounded-xl border border-forest-800/60 w-fit">
              <FileCheck2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <span>SLA-Bound Redressal • Public Transparency Ledger</span>
            </div>
          </div>

          {/* Civic Services Column */}
          <div>
            <h5 className="font-bold text-sm text-teal-300 uppercase tracking-wider mb-4">Civic Services</h5>
            <ul className="space-y-2.5 text-sm text-forest-200">
              <li>
                <button onClick={() => handleNav('directory')} className="hover:text-white transition-colors">
                  Solid Waste & Sanitation
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('directory')} className="hover:text-white transition-colors">
                  Potholes & Road Repair
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('directory')} className="hover:text-white transition-colors">
                  Street Lighting & Power
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('directory')} className="hover:text-white transition-colors">
                  Water Supply & Drainage
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('directory')} className="hover:text-white transition-colors">
                  Stormwater & Nalla Desilting
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('directory')} className="hover:text-white transition-colors">
                  Public Parks & Greenery
                </button>
              </li>
            </ul>
          </div>

          {/* Ward Governance Column */}
          <div>
            <h5 className="font-bold text-sm text-teal-300 uppercase tracking-wider mb-4">Ward Governance</h5>
            <ul className="space-y-2.5 text-sm text-forest-200">
              <li>
                <button onClick={() => handleNav('how-it-works')} className="hover:text-white transition-colors">
                  How Grievance Flow Works
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  Citizen Charter & SLAs
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('directory')} className="hover:text-white transition-colors">
                  Public Grievance Directory
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  Ward Sabha Assembly Rules
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  Ward Officer Escalation Matrix
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Template Transparency */}
          <div>
            <h5 className="font-bold text-sm text-teal-300 uppercase tracking-wider mb-4">Trust & Policies</h5>
            <ul className="space-y-2.5 text-sm text-forest-200">
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Citizen Privacy (DPDP Act)
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Terms of Public Service
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  RTI Section 4 Disclosure
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Accessibility Standards
                </span>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  Grievance Ombudsman Desk
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Template Disclaimer Box */}
        <div className="mt-8 p-4 rounded-xl bg-forest-900/60 border border-forest-800 text-xs text-forest-300 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-white">
              Notice: LokSetu Civic Platform UI Template Prototype
            </p>
            <p>
              This website is an interactive frontend user interface design demonstration for the LokSetu civic-tech concept. It contains sample mock data, simulated resolution timelines, and placeholder credentials. Not an official municipal or statutory government portal.
            </p>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="mt-8 pt-6 border-t border-forest-900 flex flex-col sm:flex-row items-center justify-between text-xs text-forest-400 gap-3">
          <p>© 2026 LokSetu Civic Governance Initiative. All UI Template assets reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('home')} className="hover:text-white">Landing</button>
            <span>•</span>
            <button onClick={() => handleNav('directory')} className="hover:text-white">Directory</button>
            <span>•</span>
            <button onClick={() => handleNav('contact')} className="hover:text-white">Contact & Support</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
