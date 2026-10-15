import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../../data/mockData';
import { MapPin, UserCheck, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';

const iconMap = {
  MapPin: MapPin,
  UserCheck: UserCheck,
  Wrench: Wrench,
  CheckCircle2: CheckCircle2,
};

export default function HowItWorksPreview({ onLearnMore, onOpenRegister }) {
  return (
    <section className="py-16 bg-civic-canvas border-b border-gray-200">
      <div className="civic-container">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            Transparent Redressal Lifecycle
          </span>
          <h2 className="text-3xl font-extrabold text-forest-950 mt-3 tracking-tight">
            From Street Hazard to Citizen Sign-off
          </h2>
          <p className="text-sm text-civic-text-secondary mt-2.5 leading-relaxed">
            Every grievance moves through a transparent, audited 4-step civic workflow. Ward officers are accountable to binding SLAs, and only you can sign off on closure.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = iconMap[step.icon] || MapPin;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between relative group hover:border-forest-300"
              >
                {/* Step Number Watermark */}
                <span className="absolute top-4 right-5 text-3xl font-extrabold text-gray-200 group-hover:text-forest-100 transition-colors font-mono">
                  {step.step}
                </span>

                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center border border-forest-100 mb-5 group-hover:bg-forest-800 group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Subtitle / Department */}
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 block mb-1">
                    {step.subtitle}
                  </span>

                  {/* Title */}
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-forest-900 transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Highlights list */}
                <div className="mt-5 pt-4 border-t border-gray-100 space-y-1.5">
                  {step.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 flex-shrink-0"></span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Row */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onLearnMore}
            className="inline-flex items-center gap-2 text-xs font-bold text-forest-900 bg-white hover:bg-forest-50 border border-forest-200 px-5 py-2.5 rounded-xl transition-all shadow-2xs"
          >
            <span>Read Detailed SLA Charter & Escalation Rules</span>
            <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
          </button>

          <button
            onClick={onOpenRegister}
            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 px-5 py-2.5 rounded-xl transition-all shadow-2xs"
          >
            <span>Test Grievance Filing Now</span>
          </button>
        </div>
      </div>
    </section>
  );
}
