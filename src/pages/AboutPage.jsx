import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Users, 
  Clock, 
  Scale, 
  CheckCircle2, 
  FileText, 
  HeartHandshake, 
  Award,
  ChevronRight,
  Landmark,
  Eye,
  Lock
} from 'lucide-react';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import DemoBadge from '../components/common/DemoBadge';

export default function AboutPage({ onNavigate, onOpenRegister }) {
  const pillars = [
    {
      title: 'Decentralized Ward Democracy',
      subtitle: 'Rooted in the 74th Amendment',
      description: 'Bringing governance down to the Ward Sabha level. Citizens and elected councillors collaborate directly with municipal field engineers rather than getting lost in remote central headquarters.',
      icon: Landmark
    },
    {
      title: 'Binding Citizen Charter SLAs',
      subtitle: 'Enforced Timelines, Not Empty Promises',
      description: 'Every municipal failure category has a strict, public SLA (24h to 72h). Automated escalation occurs whenever a deadline is approached without documented ground action.',
      icon: Clock
    },
    {
      title: 'Citizen Sign-Off Authority',
      subtitle: 'No Contractor Self-Certification',
      description: 'A municipal work order is never certified as resolved until the citizen who lodged it verifies the fix through SMS/OTP confirmation or photographic inspection.',
      icon: CheckCircle2
    },
    {
      title: 'Open Civic Transparency',
      subtitle: 'Public Accountability Ledger',
      description: 'Every grievance, work order, and turnaround metric is published publicly. Sunlight is the best disinfectant against neglected neighbourhood infrastructure.',
      icon: Eye
    }
  ];

  const slaCharter = [
    { category: 'Hazardous Live Electric Wire / Feeder Box', sla: '4 Hours', escalation: 'AEE Electrical' },
    { category: 'Drinking Water Contamination / Sewage Backflow', sla: '24 Hours', escalation: 'Executive Engineer (Water Board)' },
    { category: 'Streetlight Inoperative / Dark Pockets', sla: '24 Hours', escalation: 'Junior Engineer (Electrical)' },
    { category: 'Garbage Blackspot & Secondary Dump Clearing', sla: '24–48 Hours', escalation: 'Chief Sanitary Inspector' },
    { category: 'Pothole Patching & Road Cavity Repair', sla: '72 Hours', escalation: 'Executive Engineer (Roads/PWD)' },
    { category: 'Stormwater Nalla Blockage & Desilting', sla: '48–72 Hours', escalation: 'Zonal Superintending Engineer' },
    { category: 'Dangerous Fallen Tree / Large Branch Removal', sla: '12 Hours', escalation: 'Superintendent of Gardens' },
  ];

  return (
    <div className="min-h-screen bg-civic-canvas py-12">
      <div className="civic-container">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <button onClick={() => onNavigate('home')} className="hover:text-forest-800">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-forest-900 font-semibold">About LokSetu</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-100 border border-forest-200 px-3 py-1 rounded-full">
                Civic Mission & Governance Framework
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-950 mt-3 tracking-tight">
                About LokSetu (लोकसेतु)
              </h1>
              <p className="text-sm sm:text-base text-civic-text-secondary mt-2 max-w-2xl">
                A public-interest civic technology initiative built to empower Indian citizens, ward committees, and municipal corporations through transparent, time-bound grievance governance.
              </p>
            </div>

            <DemoBadge text="Concept & Architecture Template" variant="prominent" />
          </div>
        </div>

        {/* Hero Narrative Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-card mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl font-bold text-forest-900 tracking-tight">
                The Bridge (सेतु) Between Indian Citizens and Local Ward Administration
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                In most Indian cities, when a citizen encounters a broken streetlight, an open manhole, or an overflowing garbage dump, reporting it often leads to frustration. Grievances get logged into obscure central portals where departments pass responsibility back and forth, contractors declare issues "resolved" without visiting the site, and elected ward councillors lack visibility into real-time ground failures.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>LokSetu changes this dynamic completely.</strong> By aligning with the decentralized mandate of the <strong>74th Constitutional Amendment</strong>, LokSetu anchors every civic issue directly to the citizen's specific Municipal Ward. The platform makes Junior Engineers, Sanitary Inspectors, and Ward Councillors co-custodians of public infrastructure under public scrutiny.
              </p>
            </div>

            <div className="lg:col-span-4 bg-forest-50/80 rounded-xl p-6 border border-forest-200 flex flex-col items-center text-center">
              <LogoPlaceholder size="large" />
              <div className="mt-4 pt-3 border-t border-forest-200/80 w-full text-xs text-forest-800 space-y-1.5">
                <p className="font-bold text-sm">"लोक" (People) + "सेतु" (Bridge)</p>
                <p className="text-gray-600">Connecting neighbourhood voices to municipal action.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Four Foundational Pillars */}
        <div className="mb-14">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-extrabold text-forest-950">The Four Pillars of LokSetu</h3>
            <p className="text-xs text-gray-600 mt-2">
              Designed around accountability, statutory compliance, and democratic citizen participation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-card flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center border border-forest-200 flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 block mb-0.5">
                      {pillar.subtitle}
                    </span>
                    <h4 className="text-base font-bold text-forest-900">{pillar.title}</h4>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Public Citizen Charter & SLA Table */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-card mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-xl font-bold text-forest-900">
                Civic Citizen Charter SLA Benchmarks
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Standard resolution turnaround targets defined for participating urban local bodies.
              </p>
            </div>
            <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1 rounded-lg border border-teal-200 self-start sm:self-auto">
              Automated Escalation Rule
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-forest-50/60 text-forest-900 font-bold">
                  <th className="py-3 px-4">Grievance Category</th>
                  <th className="py-3 px-4">Charter SLA</th>
                  <th className="py-3 px-4">Level 2 Escalation Officer</th>
                  <th className="py-3 px-4">Verification Mandate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {slaCharter.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-900">{item.category}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        {item.sla}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-forest-800">{item.escalation}</td>
                    <td className="py-3 px-4 text-gray-600">Geo-photo + Citizen OTP</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Privacy & Ethical Tech Commitment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-card flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0 border border-teal-200">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Privacy by Design (DPDP Act Compliance)</h4>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                In the public directory, all citizen phone numbers, full residential house numbers, and email addresses are cryptographically masked. Only the general ward boundary and problem description remain public.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-card flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center flex-shrink-0 border border-forest-200">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Non-Partisan Civic Infrastructure</h4>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                LokSetu is designed as a neutral public utility. Grievances are routed strictly on technical municipal jurisdiction, regardless of political affiliation or ward boundaries.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl bg-forest-900 text-white p-8 text-center max-w-3xl mx-auto shadow-elevated">
          <h3 className="text-xl sm:text-2xl font-bold">Experience the LokSetu Interface</h3>
          <p className="text-xs sm:text-sm text-forest-200 mt-2 max-w-lg mx-auto">
            Test the live interactive prototype to understand how complaints flow from citizens to ward offices.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              onClick={onOpenRegister}
              className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-forest-950 font-bold text-xs rounded-xl transition-all shadow-sm"
            >
              Register Sample Grievance
            </button>
            <button
              onClick={() => onNavigate('directory')}
              className="px-5 py-2.5 bg-forest-800 hover:bg-forest-700 text-white font-semibold text-xs rounded-xl border border-forest-700 transition-colors"
            >
              Browse Public Grievance Directory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
