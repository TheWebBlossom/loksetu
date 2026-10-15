import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { useComplaints } from '../context/ComplaintContext';

export default function ComplaintCard({ complaint, onSelect, isSelected = false }) {
  const { upvoteComplaint } = useComplaints();

  const handleUpvote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    upvoteComplaint(complaint.id);
  };

  return (
    <div 
      onClick={() => onSelect && onSelect(complaint)}
      className={`bg-surface-container-lowest rounded-xl p-5 border transition-all duration-150 cursor-pointer ${
        isSelected 
          ? 'border-primary ring-2 ring-primary/20 shadow-sm bg-primary/[0.02]' 
          : 'border-outline-variant/30 hover:border-outline-variant hover:shadow-sm'
      }`}
    >
      {/* Top Badges Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-label-sm font-label-sm font-bold text-primary bg-surface-container px-2 py-0.5 rounded border border-outline-variant/30">
            {complaint.id}
          </span>
          <span className="text-label-sm font-label-sm text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded">
            {complaint.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {complaint.urgency && (
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              complaint.urgency.includes('Critical') 
                ? 'bg-error-container text-on-error-container' 
                : 'bg-surface-container-high text-on-surface-variant'
            }`}>
              {complaint.urgency}
            </span>
          )}
          <StatusBadge status={complaint.status} size="sm" />
        </div>
      </div>

      {/* Complaint Title */}
      <h3 className="font-title-md text-title-md font-bold text-on-surface hover:text-primary transition-colors leading-snug">
        {complaint.title}
      </h3>

      {/* Description Snippet */}
      <p className="text-body-sm font-body-sm text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">
        {complaint.description}
      </p>

      {/* Location & Metadata Bar */}
      <div className="mt-4 pt-3 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-2 text-label-sm font-label-sm text-on-surface-variant">
        <div className="flex items-center gap-1.5 text-on-surface">
          <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
          <span>{complaint.panchayat}, {complaint.ward}</span>
        </div>

        {complaint.slaHoursRemaining !== undefined && complaint.status !== 'Resolved' && (
          <div className="flex items-center gap-1 text-primary font-medium">
            <span className="material-symbols-outlined text-[14px]">timer</span>
            <span>{complaint.slaHoursRemaining}h SLA remaining</span>
          </div>
        )}

        {complaint.status === 'Resolved' && complaint.turnaround && (
          <div className="flex items-center gap-1 text-secondary font-semibold">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            <span>{complaint.turnaround}</span>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="mt-4 pt-3 border-t border-outline-variant/15 flex items-center justify-between gap-2">
        <button
          onClick={handleUpvote}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-label-sm font-label-sm font-semibold text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors border border-outline-variant/30"
          title="Endorse this grievance"
        >
          <span className="material-symbols-outlined text-[16px]">thumb_up</span>
          <span>{complaint.upvotes || 0} Citizens Endorsed</span>
        </button>

        <Link
          to={`/citizen/complaints/${complaint.id}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-label-sm font-label-sm font-bold text-primary hover:text-secondary transition-colors"
        >
          <span>Track Audit Rail</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </Link>
      </div>
    </div>
  );
}
