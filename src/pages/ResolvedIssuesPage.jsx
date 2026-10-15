import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useComplaints } from '../context/ComplaintContext';

export default function ResolvedIssuesPage() {
  const { complaints } = useComplaints();
  const [activeCategory, setActiveCategory] = useState('all');

  const resolvedCases = complaints.filter(c => c.status === 'Resolved');
  const filteredCases = activeCategory === 'all' 
    ? resolvedCases 
    : resolvedCases.filter(c => c.category === activeCategory);

  return (
    <div className="space-y-10 pb-16">
      {/* Sub-Nav Context Ribbon */}
      <div className="bg-surface-container-high border-b border-outline-variant/30 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-body-sm font-body-sm text-on-surface-variant gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-label-sm font-semibold">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>Live Public Audit</span>
            </span>
            <span className="text-outline">/</span>
            <span>Resolution Proofs &amp; Panchayati Raj Redressal Ledger</span>
          </div>

          <div className="flex items-center gap-4 text-label-md font-label-md">
            <span className="flex items-center gap-1 text-on-surface">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span>Decentralized Photo Geotag Verification Active</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* HERO IMPACT BANNER */}
        <section className="bg-surface-container-lowest rounded-xl border border-primary/10 p-6 md:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute -right-16 -top-16 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[320px] text-primary">account_balance</span>
          </div>

          <div className="max-w-3xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-container border border-outline-variant/40 text-primary font-label-md text-label-md">
              <span className="material-symbols-outlined text-[16px]">policy</span>
              <span>Panchayat Pradhan &amp; Executive Engineer Mandatory Dual Sign-off</span>
            </div>
            <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight font-bold">
              Verifiable Public Accountability: Solved Issues with Photographic Proof
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
              Every closed grievance requires mandatory before-and-after photo verification certified by the jurisdictional Panchayat Pradhan or Ward Executive Engineer. No contractor self-certification is permitted.
            </p>
          </div>

          {/* 4 Community Impact Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-outline-variant/20 relative z-10">
            <div className="bg-surface-container-low/70 rounded-xl p-5 border border-outline-variant/30 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-label-md font-label-md text-on-surface-variant font-medium">Verified Resolutions</span>
                <span className="p-2 rounded-lg bg-secondary-container/60 text-secondary">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                </span>
              </div>
              <div className="mt-4">
                <div className="text-headline-lg font-headline-lg text-primary tracking-tight font-bold">41,850</div>
                <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">Total Issues Resolved with Proof</p>
              </div>
            </div>

            <div className="bg-surface-container-low/70 rounded-xl p-5 border border-outline-variant/30 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-label-md font-label-md text-on-surface-variant font-medium">Satisfaction Rate</span>
                <span className="p-2 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed-variant">
                  <span className="material-symbols-outlined text-[20px]">thumb_up</span>
                </span>
              </div>
              <div className="mt-4">
                <div className="text-headline-lg font-headline-lg text-primary tracking-tight font-bold">98.2%</div>
                <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">Citizen Satisfaction on Verification</p>
              </div>
            </div>

            <div className="bg-surface-container-low/70 rounded-xl p-5 border border-outline-variant/30 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-label-md font-label-md text-on-surface-variant font-medium">Public Funds Audited</span>
                <span className="p-2 rounded-lg bg-primary-fixed text-on-primary-fixed-variant">
                  <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                </span>
              </div>
              <div className="mt-4">
                <div className="text-headline-lg font-headline-lg text-primary tracking-tight font-bold">₹4.2 Cr</div>
                <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">Community Works Audited</p>
              </div>
            </div>

            <div className="bg-surface-container-low/70 rounded-xl p-5 border border-outline-variant/30 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-label-md font-label-md text-on-surface-variant font-medium">Avg Redressal Speed</span>
                <span className="p-2 rounded-lg bg-surface-container-highest text-on-surface">
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                </span>
              </div>
              <div className="mt-4">
                <div className="text-headline-lg font-headline-lg text-primary tracking-tight font-bold">28.4 hrs</div>
                <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">Average Turnaround Time</p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-label-md font-label-md scrollbar-none">
          {['all', 'Power & Electricity', 'Stormwater Drains', 'Rural Roadways & PWD', 'Panchayat Sanitation', 'Public Safety & Encroachment'].map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-xl border transition-all whitespace-nowrap ${
                activeCategory === c
                  ? 'bg-primary text-on-primary font-bold shadow-xs border-primary'
                  : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/40 hover:bg-surface-container'
              }`}
            >
              {c === 'all' ? 'All Verified Categories' : c}
            </button>
          ))}
        </div>

        {/* BEFORE & AFTER SHOWCASE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCases.map((item) => (
            <div
              key={item.id}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col justify-between hover:border-primary/40 transition-all"
            >
              <div>
                {/* Header Strip */}
                <div className="p-5 pb-3 border-b border-outline-variant/20 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-label-sm font-bold text-primary bg-surface-container px-2.5 py-0.5 rounded border border-outline-variant/30">
                      {item.id}
                    </span>
                    <span className="text-label-sm font-semibold text-secondary bg-secondary-container px-2 py-0.5 rounded-full">
                      ✓ {item.turnaround || 'Resolved in SLA'}
                    </span>
                  </div>

                  {item.fundsAudited && (
                    <span className="text-label-sm font-mono text-outline font-semibold">
                      Audited Fund: {item.fundsAudited}
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <span className="text-label-sm text-outline uppercase tracking-wider block">
                      {item.category} · {item.panchayat}
                    </span>
                    <h3 className="font-title-md text-title-md font-bold text-on-surface mt-0.5">
                      {item.title}
                    </h3>
                  </div>

                  {/* Before / After Image Split Gallery */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative rounded-lg overflow-hidden border border-error/20 aspect-video group">
                      <img 
                        src={item.beforeImage || 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f9?auto=format&fit=crop&w=600&q=80'} 
                        alt="Before fix" 
                        className="w-full h-full object-cover" 
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-error text-on-error text-[10px] font-bold uppercase tracking-wider">
                        Before Fix
                      </span>
                    </div>

                    <div className="relative rounded-lg overflow-hidden border border-secondary/20 aspect-video group">
                      <img 
                        src={item.afterImage || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80'} 
                        alt="After fix" 
                        className="w-full h-full object-cover" 
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-secondary text-on-secondary text-[10px] font-bold uppercase tracking-wider">
                        After Fix (Certified)
                      </span>
                    </div>
                  </div>

                  {/* Dual Sign-off Certification */}
                  <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/30 text-label-sm text-on-surface-variant flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                      <span>Certified by: <strong>{item.officer || 'Shri Ram Singh (Gram Pradhan)'}</strong></span>
                    </div>
                    <span className="text-outline text-[11px] font-mono">OTP Signed</span>
                  </div>

                  {/* Citizen Testimonial */}
                  {item.citizenComment && (
                    <div className="p-3.5 rounded-lg bg-surface-container-lowest border border-outline-variant/20 text-body-sm text-on-surface italic">
                      "{item.citizenComment}"
                      <div className="mt-1 flex items-center gap-1 not-italic font-sans text-label-sm text-secondary font-bold">
                        <span>★ 5.0 Resident Verification Rating</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Action */}
              <div className="p-4 bg-surface-container-low/40 border-t border-outline-variant/20 flex items-center justify-between">
                <span className="text-label-sm text-outline font-mono">
                  Resolved on: {item.resolvedDate || 'Recent'}
                </span>
                <Link
                  to={`/citizen/complaints/${item.id}`}
                  className="text-label-md font-bold text-primary hover:text-secondary inline-flex items-center gap-1"
                >
                  <span>Inspect Audit File</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
