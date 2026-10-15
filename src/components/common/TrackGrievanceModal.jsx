import React, { useState } from 'react';
import { X, Search, Clock, CheckCircle2, AlertTriangle, ShieldCheck, User, MapPin, ChevronRight, ArrowRight } from 'lucide-react';
import { PUBLIC_COMPLAINTS } from '../../data/mockData';
import DemoBadge from './DemoBadge';

export default function TrackGrievanceModal({ isOpen, onClose, onSelectComplaint }) {
  const [searchId, setSearchId] = useState('');
  const [foundCase, setFoundCase] = useState(PUBLIC_COMPLAINTS[0]);
  const [hasSearched, setHasSearched] = useState(true);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e?.preventDefault();
    const query = searchId.trim().toUpperCase();
    if (!query) return;

    const matched = PUBLIC_COMPLAINTS.find(c => c.id.toUpperCase().includes(query));
    if (matched) {
      setFoundCase(matched);
      setHasSearched(true);
    } else {
      setFoundCase(null);
      setHasSearched(true);
    }
  };

  const handleQuickSelect = (complaint) => {
    setSearchId(complaint.id);
    setFoundCase(complaint);
    setHasSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl w-full max-w-2xl shadow-elevated border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-forest-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/30">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Track Grievance Status</h3>
              <p className="text-xs text-forest-300">Public Ward Grievance Redressal Audit Trail</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-forest-300 hover:text-white hover:bg-forest-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-6 border-b border-gray-100 bg-forest-50/40">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Complaint ID (e.g., LS-2026-DL-08492)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-2xs font-mono uppercase"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold rounded-xl transition-all shadow-2xs"
            >
              Check Status
            </button>
          </form>

          {/* Quick preset chips */}
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-gray-500 font-medium">Try Sample Case IDs:</span>
            {PUBLIC_COMPLAINTS.slice(0, 3).map(c => (
              <button
                key={c.id}
                onClick={() => handleQuickSelect(c)}
                className={`text-[11px] font-mono px-2 py-0.5 rounded-md border transition-all ${
                  foundCase?.id === c.id 
                    ? 'bg-teal-50 text-teal-800 border-teal-300 font-bold' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {c.id} ({c.status})
              </button>
            ))}
          </div>
        </div>

        {/* Case File Details Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {foundCase ? (
            <div className="space-y-6">
              {/* Top Case Summary Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-forest-900 text-sm">{foundCase.id}</span>
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      foundCase.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : foundCase.status === 'In Progress'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-sky-100 text-sky-800 border border-sky-300'
                    }`}>
                      ● {foundCase.status}
                    </span>
                  </div>
                  <DemoBadge text="Live Audit Trail (Demo)" />
                </div>

                <h4 className="font-bold text-gray-900 text-base mt-2.5">{foundCase.title}</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{foundCase.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-gray-100 text-xs">
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                    <span><strong>Location:</strong> {foundCase.ward}, {foundCase.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <User className="w-3.5 h-3.5 text-forest-700 flex-shrink-0" />
                    <span><strong>Nodal Officer:</strong> {foundCase.officer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span><strong>SLA Benchmark:</strong> {foundCase.slaRemaining}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                    <span><strong>Division:</strong> {foundCase.assignedDept}</span>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Case Progress Timeline */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center justify-between">
                  <span>Redressal Progress Audit</span>
                  <span className="text-[11px] text-teal-700 font-semibold lowercase">citizen-audited</span>
                </h5>

                <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-gray-200">
                  {foundCase.timeline?.map((step, idx) => {
                    const isDone = step.status === 'completed';
                    const isCurrent = step.status === 'in-progress';
                    return (
                      <div key={idx} className="relative flex items-start gap-4 text-xs">
                        {/* Status Icon Indicator */}
                        <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                          isDone 
                            ? 'bg-emerald-600 border-white text-white shadow-xs' 
                            : isCurrent
                            ? 'bg-amber-500 border-white text-white animate-pulse shadow-xs'
                            : 'bg-gray-100 border-gray-300 text-gray-400'
                        }`}>
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
                        </div>

                        {/* Step Details */}
                        <div className="flex-1 bg-gray-50/70 p-3 rounded-xl border border-gray-200/80">
                          <div className="flex items-center justify-between gap-2">
                            <span className={`font-semibold ${isDone ? 'text-forest-900' : isCurrent ? 'text-amber-900 font-bold' : 'text-gray-500'}`}>
                              {step.step}
                            </span>
                            <span className="text-[10px] text-gray-500 font-medium">{step.date}</span>
                          </div>
                          <p className="text-[11px] text-gray-600 mt-1">{step.note}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Citizen Verification Note */}
              <div className="bg-forest-50 border border-forest-200 rounded-xl p-3.5 text-xs text-forest-800 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Citizen Redressal Guarantee:</strong> Case resolution status cannot be unilaterally signed off by contractors. The original complainant is notified by SMS to certify satisfactory completion.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-800">No Grievance Record Found</h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                No active grievance matched "{searchId}". Please verify the complaint ID from your SMS confirmation or click one of the sample cases above.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-3.5 border-t border-gray-200 flex items-center justify-between">
          <span className="text-[11px] text-gray-500">
            Powered by LokSetu Open Civic Transparency Ledger
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
