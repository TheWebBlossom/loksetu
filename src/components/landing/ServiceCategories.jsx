import React from 'react';
import { SERVICE_CATEGORIES } from '../../data/mockData';
import { 
  Trash2, 
  Construction, 
  Lightbulb, 
  Droplets, 
  Waves, 
  Trees, 
  Dog, 
  Footprints,
  Clock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const iconMap = {
  Trash2: Trash2,
  Construction: Construction,
  Lightbulb: Lightbulb,
  Droplets: Droplets,
  Waves: Waves,
  Trees: Trees,
  Dog: Dog,
  Footprints: Footprints,
};

export default function ServiceCategories({ onSelectCategory, onOpenRegister }) {
  return (
    <section className="py-16 bg-white border-b border-gray-200">
      <div className="civic-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-50 border border-forest-200 px-3 py-1 rounded-full">
              Municipal Services Jurisdiction
            </span>
            <h2 className="text-3xl font-extrabold text-forest-950 mt-3 tracking-tight">
              Public Service Categories
            </h2>
            <p className="text-sm text-civic-text-secondary mt-1.5 max-w-xl">
              Categorized in adherence to the 12th Schedule of the Constitution (Urban Local Body statutory duties) with binding Citizen Charter SLAs.
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('all')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors self-start md:self-auto"
          >
            <span>View All Grievances by Category</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICE_CATEGORIES.map((category) => {
            const Icon = iconMap[category.icon] || Trash2;
            return (
              <div
                key={category.id}
                onClick={() => onSelectCategory(category.name)}
                className="bg-civic-canvas/70 hover:bg-white rounded-2xl border border-gray-200/90 p-5 shadow-card hover:shadow-elevated transition-all cursor-pointer flex flex-col justify-between group hover:border-forest-300"
              >
                <div>
                  {/* Top Bar with Icon and SLA Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="text-[11px] font-semibold text-gray-500 bg-white px-2 py-0.5 rounded-md border border-gray-200 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-teal-600" />
                      <span>SLA: {category.avgSLA}</span>
                    </span>
                  </div>

                  {/* Title & Hindi Terminology */}
                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-forest-900 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-[11px] font-medium text-forest-600 font-sans mt-0.5">
                    {category.hindiName}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-gray-600 mt-2.5 leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                </div>

                {/* Bottom Stats and Action */}
                <div className="mt-5 pt-3 border-t border-gray-200/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-[11px] text-gray-500">
                    <span className="font-bold text-forest-800">{category.activeCases}</span>
                    <span>active in wards</span>
                  </div>

                  <span className="text-teal-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-semibold text-[11px]">
                    Browse Cases →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cannot find category banner */}
        <div className="mt-10 bg-forest-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-elevated">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Need to lodge an issue not listed above?</h4>
              <p className="text-xs text-forest-200 mt-0.5">
                LokSetu's Ward Auto-Classifier intelligently routes any public civic failure to the relevant municipal engineer.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenRegister}
            className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-forest-950 font-bold text-xs rounded-xl transition-all shadow-sm flex-shrink-0"
          >
            Log General Ward Issue
          </button>
        </div>
      </div>
    </section>
  );
}
