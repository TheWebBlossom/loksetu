import React, { useState } from 'react';
import { 
  MapPin, 
  UserCheck, 
  Wrench, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ArrowRight, 
  Clock, 
  Phone,
  MessageSquare,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import DemoBadge from '../components/common/DemoBadge';

export default function HowItWorksPage({ onOpenRegister, onNavigate }) {
  const [activeStep, setActiveStep] = useState(0);

  const detailedSteps = [
    {
      num: '01',
      title: 'Geo-Tagged Grievance Lodging',
      subtitle: 'Fast, verified citizen submission',
      summary: 'Report street-level failures in less than 60 seconds with exact GPS coordinates and photo evidence.',
      details: [
        'Geo-boundary detector locks the exact municipal ward without needing you to memorize ward numbers.',
        'Intelligent classifier categorizes the issue into statutory departments (Sanitation, Roads, Electricity, Water).',
        'System checks for duplicate grievances filed by nearby residents and bundles them together to amplify urgency.',
        'Generates a unique tracking token (e.g. LS-2026-DL-08492) and sends instant SMS confirmation.'
      ],
      userAction: 'Citizen logs photo & landmark on portal or WhatsApp helpline',
      systemResponse: 'Ticket created, duplicate check cleared, SMS sent',
      icon: MapPin,
      badge: 'Step 1: Input'
    },
    {
      num: '02',
      title: 'Ward Officer Assignment & SLA Clock',
      subtitle: 'Immediate statutory accountability',
      summary: 'Your ticket is mapped to the designated Junior Engineer (JE) or Sanitary Inspector responsible for your ward lane.',
      details: [
        'Designated Junior Engineer receives push dispatch notification with exact GPS location pin.',
        'SLA countdown begins based on municipal Citizen Charter (e.g., 24h for streetlights, 72h for road cavities).',
        'Public dashboard displays the name and official contact of the assigned field engineer.',
        'Officer conducts preliminary site survey or coordinates with municipal contractors.'
      ],
      userAction: 'Track assigned officer name & phone on public directory',
      systemResponse: 'SLA countdown started; WhatsApp alert dispatched to Ward JE',
      icon: UserCheck,
      badge: 'Step 2: Dispatch'
    },
    {
      num: '03',
      title: 'Field Execution & Contractor Mobilization',
      subtitle: 'On-ground repair action',
      summary: 'Municipal maintenance vehicles and ground crews deploy to remediate the reported hazard.',
      details: [
        'Field crew mobilizes specialized equipment (asphalt cold-mix truck, suction jetting machine, sky-lift crane).',
        'Material requisition logs and contractor job codes are tagged to the ticket ID.',
        'If work requires road digging permission or inter-agency clearance, a temporary milestone update is posted.',
        'SLA breach warnings trigger automated escalations to the Assistant Executive Engineer (AEE).'
      ],
      userAction: 'View live milestone updates and contractor dispatch notes',
      systemResponse: 'Field logs uploaded; milestone timestamp recorded',
      icon: Wrench,
      badge: 'Step 3: Action'
    },
    {
      num: '04',
      title: 'Resolution Proof & Geotagged Photo Audit',
      subtitle: 'Strict documentation standards',
      summary: 'The field officer cannot simply click "Resolved". They must submit verified evidence.',
      details: [
        'Ward officer uploads geotagged, timestamped "After" photograph matching the original camera angle.',
        'Sanitary or electrical compliance checklist must be completed in the field app.',
        'System compares GPS radius to prevent fraudulent off-site closures.',
        'Case status moves to "Pending Citizen Sign-off" and generates an authentication OTP.'
      ],
      userAction: 'Complainant receives SMS alert with link to view "After" photos',
      systemResponse: 'Evidence logged; 48-hour citizen review window opens',
      icon: Camera,
      badge: 'Step 4: Evidence'
    },
    {
      num: '05',
      title: 'Citizen Sign-Off & Public Ledger Closure',
      subtitle: 'Democracy in the driver’s seat',
      summary: 'Only the citizen has the authority to permanently close the grievance case file.',
      details: [
        'Citizen inspects the repair site and validates via OTP or clicks "Confirm Satisfactory Fix".',
        'Citizen rates resolution quality from 1 to 5 stars and leaves an optional public review.',
        'If the repair is shoddy or incomplete, citizen clicks "Reject Resolution" with photo proof.',
        'Rejected resolutions automatically escalate to the Zonal Ward Ombudsman for inquiry.'
      ],
      userAction: 'Citizen enters 4-digit OTP or rejects with note',
      systemResponse: 'Public ledger updated; Ward satisfaction metrics recalculated',
      icon: CheckCircle2,
      badge: 'Step 5: Sign-Off'
    }
  ];

  const escalationMatrix = [
    { level: 'Level 1: Ward Field Staff', title: 'Junior Engineer (JE) / Sanitary Inspector (SI)', timeframe: 'Within Initial SLA (24h–72h)', role: 'Initial inspection & field rectification' },
    { level: 'Level 2: Ward Supervisory Officer', title: 'Assistant Executive Engineer (AEE)', timeframe: 'On SLA Breach (+24h)', role: 'Supervisory intervention & contractor fine notice' },
    { level: 'Level 3: Zonal Executive', title: 'Superintending Engineer / Zonal Deputy Commissioner', timeframe: 'Unresolved for 5+ Days', role: 'Direct disciplinary review & budget reallocation' },
    { level: 'Level 4: Municipal Ombudsman', title: 'Ward Committee Ombudsman & Lokayukta Desk', timeframe: 'Citizen Dispute / Second Rejection', role: 'Independent statutory investigation' },
  ];

  return (
    <div className="min-h-screen bg-civic-canvas py-12">
      <div className="civic-container">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <button onClick={() => onNavigate('home')} className="hover:text-forest-800">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-forest-900 font-semibold">How It Works</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                Step-by-Step Municipal Workflow
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-950 mt-3 tracking-tight">
                How LokSetu Resolves Grievances
              </h1>
              <p className="text-sm sm:text-base text-civic-text-secondary mt-2 max-w-2xl">
                A transparent, SLA-bound journey from citizen reporting to on-site execution and verified closure.
              </p>
            </div>

            <DemoBadge text="Interactive Process Model" variant="prominent" />
          </div>
        </div>

        {/* Interactive Step Switcher Bar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card mb-8">
          <div className="flex items-center justify-between overflow-x-auto gap-2 pb-2 sm:pb-0 scrollbar-none">
            {detailedSteps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeStep === idx
                    ? 'bg-forest-800 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-forest-50 hover:text-forest-900'
                }`}
              >
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-mono ${
                  activeStep === idx ? 'bg-teal-500 text-forest-950' : 'bg-gray-100 text-gray-700'
                }`}>
                  {s.num}
                </span>
                <span>{s.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Step Deep Dive Card */}
        {(() => {
          const current = detailedSteps[activeStep];
          const StepIcon = current.icon;
          return (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-card mb-12 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Info */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200">
                      Stage {current.num} of 05
                    </span>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {current.subtitle}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
                    {current.title}
                  </h2>

                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    {current.summary}
                  </p>

                  {/* Bullet points */}
                  <div className="pt-2 space-y-2.5">
                    {current.details.map((point, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-gray-600 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interaction bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-gray-100 text-xs">
                    <div className="bg-forest-50/70 p-3 rounded-xl border border-forest-100">
                      <span className="font-bold text-forest-900 block mb-0.5">Citizen Experience:</span>
                      <span className="text-gray-600">{current.userAction}</span>
                    </div>
                    <div className="bg-teal-50/70 p-3 rounded-xl border border-teal-100">
                      <span className="font-bold text-teal-900 block mb-0.5">Municipal System Action:</span>
                      <span className="text-gray-600">{current.systemResponse}</span>
                    </div>
                  </div>
                </div>

                {/* Right Step Visual Card */}
                <div className="lg:col-span-4 bg-civic-canvas rounded-2xl border border-gray-200 p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-forest-800 text-white flex items-center justify-center mb-4 shadow-sm">
                      <StepIcon className="w-7 h-7 text-teal-300" />
                    </div>

                    <h4 className="font-bold text-forest-900 text-sm">{current.badge}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Statutory audit timestamp recorded in municipal server log.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                    <button
                      onClick={() => setActiveStep(prev => (prev > 0 ? prev - 1 : detailedSteps.length - 1))}
                      className="text-xs font-semibold text-gray-600 hover:text-forest-900"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={() => setActiveStep(prev => (prev < detailedSteps.length - 1 ? prev + 1 : 0))}
                      className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                    >
                      <span>Next Stage</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Escalation Hierarchy Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-card mb-12">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
              SLA Breach Accountability
            </span>
            <h3 className="text-2xl font-bold text-forest-900 mt-3">
              The 4-Tier Municipal Escalation Matrix
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1.5">
              If a complaint is delayed or unaddressed, LokSetu’s statutory auto-escalation moves the case up the municipal hierarchy without requiring manual citizen petitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {escalationMatrix.map((item, idx) => (
              <div 
                key={idx}
                className="bg-civic-canvas/80 rounded-xl border border-gray-200 p-5 flex flex-col justify-between hover:border-forest-300 transition-all"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 block mb-1">
                    {item.level}
                  </span>
                  <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                  <div className="mt-2 text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 w-fit">
                    {item.timeframe}
                  </div>
                  <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
                    {item.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl bg-forest-900 text-white p-8 text-center max-w-3xl mx-auto shadow-elevated">
          <h3 className="text-xl sm:text-2xl font-bold">Ready to Lodge a Ward Issue?</h3>
          <p className="text-xs sm:text-sm text-forest-200 mt-2 max-w-lg mx-auto">
            Experience our 1-minute grievance registration and track its live SLA countdown.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <button
              onClick={onOpenRegister}
              className="px-6 py-2.5 bg-teal-500 hover:bg-teal-400 text-forest-950 font-bold text-xs rounded-xl transition-all shadow-sm"
            >
              Register Grievance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
