import React from 'react';
import { RESOLVED_STORIES } from '../../data/mockData';
import { CheckCircle2, Clock, Star, MapPin, User, ArrowRight, ShieldCheck, Camera } from 'lucide-react';
import DemoBadge from '../common/DemoBadge';

export default function ResolvedGrievances({ onInspectCase, onBrowseAll }) {
  return (
    <section className="py-16 bg-civic-canvas border-b border-gray-200">
      <div className="civic-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                Transparency In Action
              </span>
              <DemoBadge text="Audited Closures (Demo)" />
            </div>
            <h2 className="text-3xl font-extrabold text-forest-950 mt-3 tracking-tight">
              Publicly Resolved Grievances
            </h2>
            <p className="text-sm text-civic-text-secondary mt-1.5 max-w-xl">
              Completed cases certified by resident verification. Inspect photographic work evidence and official turnaround logs.
            </p>
          </div>

          <button
            onClick={onBrowseAll}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors self-start md:self-auto"
          >
            <span>Search Full Resolution Registry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Case Study Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {RESOLVED_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl border border-gray-200/90 shadow-card hover:shadow-elevated transition-all p-6 flex flex-col justify-between group hover:border-emerald-300"
            >
              <div>
                {/* Top ID & Turnaround */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs font-bold text-forest-900 bg-forest-50 px-2 py-0.5 rounded border border-forest-200">
                    {story.id}
                  </span>

                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{story.turnaround}</span>
                  </span>
                </div>

                {/* Category & Title */}
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  {story.category}
                </span>
                <h3 className="font-bold text-gray-900 text-sm mt-1 leading-snug group-hover:text-forest-900 transition-colors">
                  {story.title}
                </h3>

                {/* Ward & Officer */}
                <div className="mt-3 py-2 border-y border-gray-100 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                    <span className="truncate">{story.ward}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                    <User className="w-3.5 h-3.5 text-forest-700 flex-shrink-0" />
                    <span className="truncate">{story.officer}</span>
                  </div>
                </div>

                {/* Before & After Simulation Box */}
                <div className="mt-4 bg-gray-50 rounded-xl p-3 border border-gray-200/70 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
                      Issue
                    </span>
                    <span className="text-gray-600 text-[11px] leading-tight">
                      {story.beforeSummary}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
                      Fix
                    </span>
                    <span className="text-gray-700 font-medium text-[11px] leading-tight">
                      {story.afterSummary}
                    </span>
                  </div>
                </div>

                {/* Citizen Quote */}
                <div className="mt-4 p-3 rounded-xl bg-forest-50/50 border border-forest-100 text-xs">
                  <div className="flex items-center gap-1 mb-1 text-amber-500">
                    {[...Array(story.citizenRating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[11px] font-bold text-gray-700 ml-1">Citizen Feedback</span>
                  </div>
                  <p className="text-[11px] text-gray-600 italic">
                    "{story.citizenComment}"
                  </p>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-gray-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span>OTP Verified Close</span>
                </span>

                <button
                  onClick={() => onInspectCase(story.id)}
                  className="font-bold text-forest-800 hover:text-teal-700 flex items-center gap-1 text-xs"
                >
                  <span>Audit Case File</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
