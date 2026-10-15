import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import ComplaintCard from '../components/ComplaintCard';
import { useComplaints } from '../context/ComplaintContext';
import { useTranslation } from '../context/LanguageContext';
import { SERVICE_CATEGORIES } from '../data/mockComplaints';

export default function HomePage() {
  const { complaints } = useComplaints();
  const { t, isHindi } = useTranslation();
  const [quickSearch, setQuickSearch] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/public/complaints?q=${encodeURIComponent(quickSearch.trim())}`);
    } else {
      navigate('/public/complaints');
    }
  };

  const resolvedShowcase = complaints.filter(c => c.status === 'Resolved').slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Actions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Civic Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/50 text-primary text-label-sm font-label-sm shadow-xs">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-semibold uppercase tracking-wider">
                  {isHindi ? 'डिजिटल पंचायती राज एवं वार्ड सुशासन मंच' : 'Digital Panchayati Raj & Ward Governance Platform'}
                </span>
                <span className="hidden sm:inline text-outline">• 73rd &amp; 74th Amendment Mandate</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-display-lg-mobile sm:text-display-lg font-bold text-primary tracking-tight leading-[1.15]">
                {isHindi ? 'पारदर्शी स्थानीय शासन।' : 'Transparent Local Governance.'} <br />
                <span className="text-secondary">{isHindi ? 'त्वरित नागरिक शिकायत निवारण।' : 'Rapid Grievance Redressal.'}</span>
              </h1>

              {/* Subtext */}
              <p className="text-body-md sm:text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                {isHindi 
                  ? 'एक एकीकृत डिजिटल सेतु जो नागरिकों को सीधे उनके अधिकार क्षेत्र के ग्राम प्रधान और वार्ड इंजीनियरों से जोड़ता है। नागरिक समस्याएं दर्ज करें और फोटो प्रमाण सहित समाधान ट्रैक करें।'
                  : 'A unified digital bridge connecting citizens directly with their jurisdictional Gram Panchayat Pradhan and Ward Junior Engineers. Lodge public issues, track real-time field work orders, and verify fixes with mandatory before-and-after photo evidence.'}
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  to="/submit-grievance"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg font-semibold rounded-lg shadow-sm transition-all duration-150 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px]">add_circle</span>
                  <span>{t('fileGrievance')}</span>
                </Link>

                <Link
                  to="/public/complaints"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-lg text-label-lg font-semibold rounded-lg border border-outline-variant/40 shadow-xs transition-all duration-150"
                >
                  <span className="material-symbols-outlined text-[20px]">travel_explore</span>
                  <span>{t('navPublicComplaints')}</span>
                </Link>
              </div>

              {/* Quick Docket Search Bar */}
              <div className="pt-2">
                <form 
                  onSubmit={handleSearchSubmit}
                  className="flex items-center bg-surface-container-lowest p-1.5 rounded-xl border border-outline-variant/50 shadow-sm max-w-lg focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all"
                >
                  <span className="material-symbols-outlined text-outline text-[20px] ml-3 mr-2">search</span>
                  <input
                    type="text"
                    value={quickSearch}
                    onChange={(e) => setQuickSearch(e.target.value)}
                    placeholder={isHindi ? "शिकायत संख्या (उदा. LOK-2025-UP-8841) या स्थान दर्ज करें..." : "Enter Docket ID (e.g. LOK-2025-UP-8841) or locality..."}
                    className="w-full text-body-sm font-body-sm bg-transparent border-none focus:ring-0 outline-none text-on-surface placeholder:text-outline"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-on-primary text-label-sm font-label-sm font-semibold rounded-lg hover:bg-secondary transition-colors shrink-0 cursor-pointer"
                  >
                    {t('trackStatus')}
                  </button>
                </form>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-outline-variant/20 text-label-sm font-label-sm text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
                  <span>Mandatory Dual Sign-off</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">timer</span>
                  <span>24h–72h Binding SLAs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">lock</span>
                  <span>100% DPDP Privacy</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Audit Ticker Card */}
            <div className="lg:col-span-5">
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-surface-container text-primary">
                      <span className="material-symbols-outlined text-[20px]">hub</span>
                    </span>
                    <div>
                      <h3 className="font-title-md text-title-md font-bold text-on-surface">Live Ward Audit Rail</h3>
                      <p className="text-label-sm font-label-sm text-outline">Real-time redressal logs</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono bg-secondary-container/60 text-on-secondary-container px-2 py-0.5 rounded-full font-bold">
                    ● Real-Time Feed
                  </span>
                </div>

                {/* Micro Cards */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/20 text-body-sm">
                    <div className="flex items-center justify-between text-label-sm mb-1">
                      <span className="font-mono font-bold text-primary">LOK-2025-UP-8841</span>
                      <span className="text-[#1D4ED8] bg-[#EFF6FF] px-2 py-0.2 rounded font-semibold text-[10px]">
                        In Progress (Field Crew)
                      </span>
                    </div>
                    <p className="font-semibold text-on-surface text-label-md line-clamp-1">
                      Submersible motor replacement underway on Main Gali Standpost
                    </p>
                    <div className="mt-2 flex items-center justify-between text-label-sm text-outline">
                      <span>Rampur GP, Ward 4</span>
                      <span className="text-primary font-medium">18h SLA remaining</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/20 text-body-sm">
                    <div className="flex items-center justify-between text-label-sm mb-1">
                      <span className="font-mono font-bold text-primary">LOK-2025-UP-8812</span>
                      <span className="text-[#15803D] bg-[#DCFCE7] px-2 py-0.2 rounded font-semibold text-[10px]">
                        ✓ Resolved in 22 hrs
                      </span>
                    </div>
                    <p className="font-semibold text-on-surface text-label-md line-clamp-1">
                      Solar High-Mast Streetlight restored at Weekly Haat Bazaar
                    </p>
                    <div className="mt-2 flex items-center justify-between text-label-sm text-outline">
                      <span>Rampur GP, Ward 1</span>
                      <span className="text-secondary font-bold">★ 5.0 Citizen Rating</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/20 text-body-sm">
                    <div className="flex items-center justify-between text-label-sm mb-1">
                      <span className="font-mono font-bold text-primary">LOK-2025-UP-8839</span>
                      <span className="text-[#B45309] bg-[#FEF3C7] px-2 py-0.2 rounded font-semibold text-[10px]">
                        Under Review (Pradhan Desk)
                      </span>
                    </div>
                    <p className="font-semibold text-on-surface text-label-md line-clamp-1">
                      Deep drainage pit near Anganwadi center barricaded
                    </p>
                    <div className="mt-2 flex items-center justify-between text-label-sm text-outline">
                      <span>Rampur GP, Ward 2</span>
                      <span className="text-error font-medium">Critical Priority</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <Link
                    to="/public/complaints"
                    className="inline-flex items-center gap-1 text-label-md font-label-md font-bold text-primary hover:text-secondary"
                  >
                    <span>View all public complaints in live directory</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEMONSTRATIVE CIVIC STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Verified Resolutions"
            value="41,850"
            subtitle="Closed with mandatory photo proof"
            icon="verified"
            trend="+12.4% this quarter"
            badgeText="Audited"
          />
          <StatCard
            title="Citizen Charter SLA Compliance"
            value="94.6%"
            subtitle="Closed within statutory deadline"
            icon="timer"
            trend="Target >90%"
            badgeText="State Average"
          />
          <StatCard
            title="Average Redressal Speed"
            value="36.4 hrs"
            subtitle="From citizen logging to field fix"
            icon="bolt"
            trend="-8 hrs vs 2024"
            badgeText="Fastest"
          />
          <StatCard
            title="Active Gram Panchayats"
            value="198 Wards"
            subtitle="Across Fatehpur & Central UP"
            icon="account_balance"
            trend="Phase 1 Active"
            badgeText="Panchayati Raj"
          />
        </div>
      </section>

      {/* CORE MUNICIPAL SERVICE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-label-sm font-label-sm text-primary font-bold uppercase tracking-wider bg-surface-container px-3 py-1 rounded-full border border-outline-variant/30">
              Statutory Civic Mandates
            </span>
            <h2 className="text-headline-lg font-headline-lg text-primary font-bold tracking-tight mt-2">
              Public Service Categories
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant mt-1">
              Aligned with the 12th Schedule of the Constitution with guaranteed Citizen Charter SLAs.
            </p>
          </div>

          <Link
            to="/public/complaints"
            className="inline-flex items-center gap-1 text-label-lg font-label-lg font-bold text-primary hover:text-secondary"
          >
            <span>Browse All Grievances by Category</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICE_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/public/complaints?category=${encodeURIComponent(cat.name)}`}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-6 shadow-sm hover:border-primary/50 hover:bg-surface-container-low/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-container text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors overflow-hidden shrink-0">
                    <span className="material-symbols-outlined text-[24px] leading-none select-none">{cat.icon}</span>
                  </div>
                  <span className="text-label-sm font-label-sm bg-surface-container px-2.5 py-1 rounded-full text-on-surface-variant font-semibold">
                    SLA: {cat.sla}
                  </span>
                </div>
                <h3 className="font-title-md text-title-md font-bold text-on-surface group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
                  Clearance, maintenance, technical inspection, and emergency dispatch.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-label-sm font-label-sm">
                <span className="text-outline font-medium">{cat.count} active dockets</span>
                <span className="text-primary font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                  View Cases →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-surface-container-low py-16 border-y border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-label-sm font-label-sm text-secondary font-bold uppercase tracking-wider bg-secondary-container px-3 py-1 rounded-full">
              Procedural Transparency
            </span>
            <h2 className="text-headline-xl font-headline-xl text-primary font-bold tracking-tight">
              From Street Hazard to Dual Verified Sign-off
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Every complaint is bound to a legally monitored Citizen Charter SLA with photographic evidence required before case closure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/30 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-label-lg">
                1
              </div>
              <h3 className="font-title-md text-title-md font-bold text-on-surface">1. Geo-tagged Lodge</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                Citizen snaps photo proof. GPS coordinates auto-lock your exact Gram Panchayat ward and issue tracking docket ID.
              </p>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/30 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-label-lg">
                2
              </div>
              <h3 className="font-title-md text-title-md font-bold text-on-surface">2. Pradhan &amp; JE Assignment</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                Assigned directly to the jurisdictional Gram Pradhan and Junior Engineer with active SMS countdown timer.
              </p>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/30 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-label-lg">
                3
              </div>
              <h3 className="font-title-md text-title-md font-bold text-on-surface">3. Field Crew Action</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                Municipal maintenance vans and technical repair crews deploy on site. Materials and work order logs are published live.
              </p>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/30 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-label-lg">
                4
              </div>
              <h3 className="font-title-md text-title-md font-bold text-on-surface">4. Photo Verification Closure</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                Closed only after mandatory before/after photo upload and citizen OTP sign-off. If unsatisfied, auto-escalates to Ombudsman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RESOLVED GRIEVANCES EVIDENCE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-label-sm font-label-sm text-secondary font-bold uppercase tracking-wider bg-secondary-container px-3 py-1 rounded-full">
              Audit Transparency
            </span>
            <h2 className="text-headline-lg font-headline-lg text-primary font-bold tracking-tight mt-2">
              Publicly Resolved Grievances
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant mt-1">
              Verified outcomes with before-and-after photographic evidence certified by Gram Pradhans.
            </p>
          </div>

          <Link
            to="/public/resolved"
            className="inline-flex items-center gap-1 text-label-lg font-label-lg font-bold text-primary hover:text-secondary"
          >
            <span>Explore Resolution Proofs Gallery</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resolvedShowcase.map((item) => (
            <ComplaintCard key={item.id} complaint={item} />
          ))}
        </div>
      </section>

      {/* BOTTOM CTA STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary via-[#176B45] to-[#104F33] text-on-primary rounded-xl p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-white/10 text-tertiary-fixed text-label-sm font-label-sm font-semibold border border-white/20">
              Grassroots Civic Democracy
            </span>
            <h3 className="text-headline-lg font-headline-lg font-bold">
              Ready to File or Track a Neighbourhood Grievance?
            </h3>
            <p className="text-surface-variant text-body-md leading-relaxed">
              Every citizen report counts. Hold local authorities accountable under the Digital Panchayati Raj Act with guaranteed turnaround.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/submit-grievance"
              className="px-6 py-3 rounded-lg bg-surface-container-lowest text-primary font-label-lg font-bold shadow-sm hover:bg-surface-container transition-all"
            >
              Submit Grievance
            </Link>
            <Link
              to="/citizen/dashboard"
              className="px-6 py-3 rounded-lg border border-white/40 text-on-primary font-label-lg font-semibold hover:bg-white/10 transition-all"
            >
              Citizen Sign-In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
