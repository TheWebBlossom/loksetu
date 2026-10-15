import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ThumbsUp, 
  User, 
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';

export default function ComplaintCard({ complaint, onViewTimeline }) {
  const [upvotes, setUpvotes] = useState(complaint.upvotes || 12);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const handleUpvote = (e) => {
    e.stopPropagation();
    if (!hasUpvoted) {
      setUpvotes(upvotes + 1);
      setHasUpvoted(true);
    } else {
      setUpvotes(upvotes - 1);
      setHasUpvoted(false);
    }
  };

  const isResolved = complaint.status === 'Resolved';
  const isInProgress = complaint.status === 'In Progress';

  return (
    <div 
      className="bg-white rounded-2xl border border-gray-200/90 shadow-card hover:shadow-elevated transition-all p-5 flex flex-col justify-between group hover:border-forest-300"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-xs font-bold text-forest-900 bg-forest-50 px-2.5 py-0.5 rounded-md border border-forest-100">
              {complaint.id}
            </span>
            <span className="text-[11px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
              {complaint.category}
            </span>
          </div>

          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
            isResolved
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : isInProgress
              ? 'bg-amber-50 text-amber-800 border border-amber-200'
              : 'bg-sky-50 text-sky-800 border border-sky-200'
          }`}>
            {isResolved && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
            {isInProgress && <Clock className="w-3 h-3 text-amber-600 animate-spin" />}
            {!isResolved && !isInProgress && <AlertCircle className="w-3 h-3 text-sky-600" />}
            <span>{complaint.status}</span>
          </span>
        </div>

        {/* Title */}
        <h4 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-forest-800 transition-colors">
          {complaint.title}
        </h4>

        {/* Description Excerpt */}
        <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
          {complaint.description}
        </p>

        {/* Ward & Location */}
        <div className="mt-3.5 pt-3 border-t border-gray-100 flex flex-col gap-1.5 text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
            <span className="font-medium text-gray-800 truncate">{complaint.ward}, {complaint.city}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <User className="w-3.5 h-3.5 text-forest-700 flex-shrink-0" />
            <span className="truncate">Nodal Officer: {complaint.officer}</span>
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
        {/* Upvote / Endorse Counter */}
        <button
          onClick={handleUpvote}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            hasUpvoted
              ? 'bg-teal-50 text-teal-700 border border-teal-200 shadow-2xs'
              : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200'
          }`}
          title="Endorse this grievance to highlight priority for Ward Sabha"
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${hasUpvoted ? 'text-teal-600 fill-teal-600' : 'text-gray-400'}`} />
          <span>{upvotes}</span>
          <span className="text-[10px] text-gray-400 hidden sm:inline">citizens</span>
        </button>

        {/* View Case File & Timeline CTA */}
        <button
          onClick={() => onViewTimeline(complaint)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-forest-800 hover:text-teal-700 transition-colors py-1 px-1.5 rounded"
        >
          <span>Audit Timeline</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
