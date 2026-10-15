import React from 'react';
import { COMMUNITY_INITIATIVES } from '../../data/mockData';
import { Users, Vote, Trophy, Calendar, ArrowRight, Sparkles, Shield, HeartHandshake } from 'lucide-react';
import DemoBadge from '../common/DemoBadge';

export default function CommunityImprovement({ onParticipate }) {
  return (
    <section className="py-16 bg-white border-b border-gray-200">
      <div className="civic-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                Grassroots Ward Democracy
              </span>
              <DemoBadge text="Community Beta" />
            </div>
            <h2 className="text-3xl font-extrabold text-forest-950 mt-3 tracking-tight">
              Community Improvement & Ward Sabhas
            </h2>
            <p className="text-sm text-civic-text-secondary mt-1.5 max-w-xl">
              Grievance redressal is just the starting point. LokSetu activates active ward citizenship with participatory budgeting, sanitation leagues, and neighbourhood assemblies.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Empowered by:</span>
            <span className="text-xs font-bold text-forest-900 bg-forest-50 px-2.5 py-1 rounded-md border border-forest-200">
              Ward Committee Rules 2026
            </span>
          </div>
        </div>

        {/* 3 Initiative Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMMUNITY_INITIATIVES.map((init, idx) => (
            <div
              key={idx}
              className="bg-civic-canvas/80 rounded-2xl border border-gray-200 p-6 flex flex-col justify-between hover:shadow-elevated transition-all group hover:border-forest-300"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                    {init.tag}
                  </span>
                  <span className="text-[11px] font-semibold text-gray-500">
                    {init.ward}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 text-base group-hover:text-forest-900 transition-colors">
                  {init.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
                  {init.description}
                </p>

                {/* Date / Timeline */}
                <div className="mt-4 p-3 rounded-xl bg-white border border-gray-200 text-xs flex items-center justify-between text-gray-700">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" />
                    <span>{init.date}</span>
                  </span>
                  <span className="text-[11px] font-bold text-forest-800">
                    {init.stats}
                  </span>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                <button
                  onClick={onParticipate}
                  className="w-full text-center py-2 px-3 text-xs font-bold text-forest-900 bg-white hover:bg-forest-50 border border-forest-200 rounded-xl transition-all shadow-2xs group-hover:bg-forest-800 group-hover:text-white group-hover:border-forest-800"
                >
                  {init.actionText} →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Citizen Engagement Callout Banner */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-forest-900 via-forest-800 to-teal-900 p-8 text-white shadow-elevated relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
              Citizen Governance Partnership
            </span>
            <h3 className="text-2xl font-bold tracking-tight">
              Host a LokSetu Ward Clinic in Your Resident Welfare Association (RWA)
            </h3>
            <p className="text-xs text-forest-200 leading-relaxed">
              We provide volunteer toolkits, municipal escalation guides, and ward committee liaison assistance for resident groups committed to transparent local governance.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button 
                onClick={onParticipate}
                className="px-4 py-2 bg-white text-forest-900 font-bold text-xs rounded-xl hover:bg-forest-50 transition-colors shadow-sm"
              >
                Download RWA Civic Toolkit
              </button>
              <button 
                onClick={onParticipate}
                className="px-4 py-2 bg-forest-700/80 hover:bg-forest-700 text-teal-200 font-semibold text-xs rounded-xl border border-forest-600 transition-colors"
              >
                Request Ward Nodal Officer Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
