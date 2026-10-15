import React, { useState } from 'react';
import { X, Upload, MapPin, CheckCircle, ShieldAlert, AlertCircle, Sparkles, Building, ArrowRight } from 'lucide-react';
import { SERVICE_CATEGORIES, WARDS_LIST } from '../../data/mockData';
import DemoBadge from './DemoBadge';

export default function RegisterGrievanceModal({ isOpen, onClose }) {
  const [selectedWard, setSelectedWard] = useState(WARDS_LIST[0].id);
  const [selectedCategory, setSelectedCategory] = useState(SERVICE_CATEGORIES[0].id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('Standard');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `LS-2026-${selectedWard.split('-')[0]}-${randomNum}`;
    setGeneratedId(newId);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl w-full max-w-2xl shadow-elevated border border-gray-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-forest-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/30">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Register Civic Grievance</h3>
              <p className="text-xs text-forest-300">Directly Routed to Ward Committee & Nodal Engineer</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-forest-300 hover:text-white hover:bg-forest-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Submission Success State */
          <div className="p-8 text-center space-y-6 flex-1 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <DemoBadge text="Demo Ticket Created" variant="prominent" />
              <h3 className="text-xl font-bold text-gray-900 mt-2">Grievance Successfully Registered</h3>
              <p className="text-xs text-gray-600 max-w-md mx-auto mt-1">
                Your issue has been logged into the ward queue and assigned an SLA countdown. You would receive SMS updates on field progress.
              </p>
            </div>

            {/* Generated Ticket Box */}
            <div className="bg-forest-50 border border-forest-200 rounded-xl p-5 max-w-md mx-auto text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">Complaint Reference ID:</span>
                <span className="font-mono font-bold text-forest-900 text-sm bg-white px-2 py-0.5 rounded border border-forest-200">
                  {generatedId}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Jurisdiction Ward:</span>
                <span className="font-semibold text-gray-800">
                  {WARDS_LIST.find(w => w.id === selectedWard)?.name}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Initial Redressal SLA:</span>
                <span className="font-bold text-teal-700">48 Hours</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Junior Engineer:</span>
                <span className="text-gray-700">
                  {WARDS_LIST.find(w => w.id === selectedWard)?.officer}
                </span>
              </div>
            </div>

            <div className="text-xs text-gray-500 max-w-sm mx-auto">
              Note: This is a prototype frontend demonstration. No actual government database was modified.
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          /* Grievance Input Form */
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Prototype Form:</strong> Fill out the details below to test the civic registration workflow. Realistic Indian wards and civic categories are pre-configured.
              </span>
            </div>

            {/* Ward Selector */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Select Your Municipal Ward
              </label>
              <div className="relative">
                <select
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  className="w-full text-xs rounded-xl border border-gray-300 py-2.5 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none font-medium"
                >
                  {WARDS_LIST.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                      {ward.name} — {ward.city} ({ward.officer})
                    </option>
                  ))}
                </select>
                <MapPin className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Service Category */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Civic Grievance Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs rounded-xl border border-gray-300 py-2.5 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              >
                {SERVICE_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.hindiName}) — SLA: {cat.avgSLA}
                  </option>
                ))}
              </select>
            </div>

            {/* Complaint Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Issue Summary / Location Landmark
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Broken pavement slabs outside Govt Primary School gate"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs rounded-xl border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Detailed Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Detailed Description & Specific Hazard
              </label>
              <textarea
                rows={3}
                required
                placeholder="Describe the issue, time since it occurred, and nearby landmark to assist field workers..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs rounded-xl border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              ></textarea>
            </div>

            {/* Urgency & Photo Attachment Placeholders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Citizen Urgency Level
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Standard', 'Priority', 'Critical'].map((level) => (
                    <button
                      type="button"
                      key={level}
                      onClick={() => setUrgency(level)}
                      className={`py-2 text-[11px] rounded-lg border font-semibold transition-all ${
                        urgency === level
                          ? 'bg-forest-800 text-white border-forest-800'
                          : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Geo-tagged Photo Proof
                </label>
                <div className="border border-dashed border-gray-300 rounded-xl p-2.5 text-center bg-gray-50/60 hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4 text-teal-600" />
                  <span className="text-[11px] text-gray-600 font-medium">Attach Photo / Geo-snap</span>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-forest-800 hover:bg-forest-900 rounded-xl transition-all shadow-sm"
              >
                Submit Grievance
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
