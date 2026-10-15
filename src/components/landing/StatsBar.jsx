import React from 'react';
import { DEMO_STATS } from '../../data/mockData';
import { CheckCircle2, Clock, ShieldCheck, MapPin, Smile, AlertCircle } from 'lucide-react';
import DemoBadge from '../common/DemoBadge';

export default function StatsBar() {
  const statCards = [
    {
      label: 'Public Grievances Resolved',
      value: DEMO_STATS.totalResolved,
      description: 'Logged & citizen-certified',
      icon: CheckCircle2,
      trend: '+12% vs last month',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50/70',
      border: 'border-emerald-200'
    },
    {
      label: 'SLA Adherence Rate',
      value: DEMO_STATS.slaAdherence,
      description: 'Closed within charter timeline',
      icon: Clock,
      trend: 'Target: >90%',
      color: 'text-teal-700',
      bg: 'bg-teal-50/70',
      border: 'border-teal-200'
    },
    {
      label: 'Average Resolution Time',
      value: DEMO_STATS.avgResolutionHours,
      description: 'From geo-tag to site completion',
      icon: ShieldCheck,
      trend: '-6 hrs YoY improvement',
      color: 'text-forest-800',
      bg: 'bg-forest-50/70',
      border: 'border-forest-200'
    },
    {
      label: 'Participating Wards',
      value: DEMO_STATS.activeWards,
      description: 'Across 8 municipal corporations',
      icon: MapPin,
      trend: 'Piloted Phase 1',
      color: 'text-forest-900',
      bg: 'bg-gray-50',
      border: 'border-gray-200'
    },
    {
      label: 'Citizen Satisfaction Score',
      value: DEMO_STATS.satisfactionRate,
      description: 'Based on 4★ & 5★ post-fix ratings',
      icon: Smile,
      trend: 'Independent audit',
      color: 'text-amber-800',
      bg: 'bg-amber-50/70',
      border: 'border-amber-200'
    }
  ];

  return (
    <section className="bg-white py-12 border-b border-gray-200/90">
      <div className="civic-container">
        {/* Section Header with Demo Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-forest-900">
                Municipal Performance Transparency Index
              </h3>
              <DemoBadge text="Demo Data Only" variant="prominent" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Sample statistics illustrating ward accountability metrics under citizen charter SLAs.
            </p>
          </div>

          <div className="text-[11px] text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 self-start sm:self-auto">
            Last Synchronized: <span className="font-semibold text-gray-700">{DEMO_STATS.lastUpdated}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className={`p-4 rounded-xl border ${stat.border} ${stat.bg} shadow-2xs flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-gray-600 line-clamp-1">{stat.label}</span>
                    <Icon className={`w-4 h-4 ${stat.color} flex-shrink-0`} />
                  </div>
                  <div className={`text-2xl sm:text-3xl font-extrabold ${stat.color} tracking-tight font-sans`}>
                    {stat.value}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-200/60 text-[11px] text-gray-500">
                  <div className="line-clamp-1">{stat.description}</div>
                  <div className="font-medium text-teal-800 text-[10px] mt-0.5">{stat.trend}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
