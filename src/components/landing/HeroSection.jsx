import React, { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Users
} from 'lucide-react';
import DemoBadge from '../common/DemoBadge';

export default function HeroSection({ onOpenRegister, onOpenTrack, onBrowseDirectory }) {
  const [quickTrackQuery, setQuickTrackQuery] = useState('');

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    onOpenTrack(quickTrackQuery || 'LS-2026-DL-08492');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-forest-50/70 via-white to-civic-canvas pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-gray-200/80 bg-civic-grid">
      {/* Decorative ambient civic aura */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-forest-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="civic-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Civic Badge / Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-100 text-forest-900 border border-forest-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider">
                Ward Democracy & Grievance Redressal
              </span>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded-full text-forest-800 font-semibold border border-forest-200">
                74th Constitutional Vision
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest-950 tracking-tight leading-[1.12]">
              Your Voice. <br />
              <span className="text-forest-800">Your Ward.</span> <br />
              <span className="text-teal-700 underline decoration-teal-300 decoration-wavy decoration-2">
                Your LokSetu.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-civic-text-secondary leading-relaxed max-w-xl">
              An open, transparent bridge connecting Indian citizens with their Ward Councillors and Municipal Junior Engineers. Log neighborhood grievances, enforce SLA deadlines, and verify field resolutions with public audit trails.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onOpenRegister}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-forest-800 hover:bg-forest-900 text-white font-bold text-sm rounded-xl shadow-card hover:shadow-elevated transition-all border border-forest-700 active:scale-[0.98]"
              >
                <PlusCircle className="w-4 h-4 text-teal-300" />
                <span>Register Complaint</span>
              </button>

              <button
                onClick={() => onOpenTrack('LS-2026-DL-08492')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-forest-50 text-forest-900 font-bold text-sm rounded-xl shadow-subtle hover:shadow border border-forest-200 transition-all active:scale-[0.98]"
              >
                <Search className="w-4 h-4 text-teal-600" />
                <span>Track Complaint Status</span>
              </button>
            </div>

            {/* Fast Inline Lookup Form */}
            <div className="pt-2">
              <form 
                onSubmit={handleQuickSubmit}
                className="flex items-center bg-white p-1.5 rounded-xl border border-gray-300 shadow-2xs max-w-lg focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500"
              >
                <Search className="w-4 h-4 text-gray-400 ml-3 mr-2" />
                <input
                  type="text"
                  placeholder="Enter Complaint ID (e.g. LS-2026-DL-08492)"
                  value={quickTrackQuery}
                  onChange={(e) => setQuickTrackQuery(e.target.value)}
                  className="w-full text-xs bg-transparent focus:outline-none text-gray-800 font-mono"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg transition-colors flex-shrink-0"
                >
                  Quick Audit
                </button>
              </form>
            </div>

            {/* Three Pillar Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span className="font-semibold text-gray-700 text-[11px] sm:text-xs">Citizen OTP Sign-Off</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-forest-700 flex-shrink-0" />
                <span className="font-semibold text-gray-700 text-[11px] sm:text-xs">24h–72h Binding SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span className="font-semibold text-gray-700 text-[11px] sm:text-xs">Public Ward Ledger</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Ward Governance Pulse Widget */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-elevated p-6 relative">
              {/* Top Banner */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-forest-100 text-forest-800 flex items-center justify-center font-bold text-xs">
                    WS
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-forest-900 leading-tight">Live Ward Redressal Feed</h3>
                    <p className="text-[11px] text-gray-500">Real-time civic action ticker</p>
                  </div>
                </div>

                <DemoBadge text="Sample Simulation" />
              </div>

              {/* Sample Ward Cards Ticker */}
              <div className="space-y-3">
                {/* Active Grievance Card */}
                <div className="p-3.5 rounded-xl bg-forest-50/60 border border-forest-100 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                    <span className="font-mono font-bold text-forest-900">LS-2026-DL-08492</span>
                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                      ✓ Resolved in 41 hrs
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-800 text-xs">Bitumen crater patch-up near Mother Dairy Junction</h4>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-teal-600" /> Ward 42, Mayur Vihar
                    </span>
                    <span className="text-gray-500">Er. Rajesh Tyagi (JE)</span>
                  </div>
                </div>

                {/* In Progress Grievance Card */}
                <div className="p-3.5 rounded-xl bg-amber-50/40 border border-amber-200 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                    <span className="font-mono font-bold text-amber-900">LS-2026-KA-09144</span>
                    <span className="text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded-full">
                      ● Work Order Dispatched
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-800 text-xs">Garbage secondary dump clearing & lime sanitization</h4>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-teal-600" /> Ward 112, Indiranagar
                    </span>
                    <span className="text-teal-700 font-medium">14h SLA Remaining</span>
                  </div>
                </div>

                {/* Citizen Verification Card */}
                <div className="p-3.5 rounded-xl bg-sky-50/40 border border-sky-200 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                    <span className="font-mono font-bold text-sky-900">LS-2026-MH-07312</span>
                    <span className="text-sky-700 font-bold bg-sky-100 px-2 py-0.5 rounded-full">
                      ★ Citizen Rating: 5/5
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-800 text-xs">Streetlight feeder cable repair on SV Road</h4>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-teal-600" /> Ward 68, Bandra West
                    </span>
                    <span className="text-gray-500">BEST Linesman Wing</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Directory Link */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-500 font-medium">
                  Showing 3 of 18,482 demo cases
                </span>
                <button
                  onClick={onBrowseDirectory}
                  className="text-xs font-bold text-forest-800 hover:text-teal-700 flex items-center gap-1 transition-colors"
                >
                  <span>Explore Directory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
