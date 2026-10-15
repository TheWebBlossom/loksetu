import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

export default function ComplaintTable({ 
  complaints = [], 
  onActionClick, 
  actionLabel = "Review & Dispatch",
  showOfficer = false 
}) {
  if (!complaints || complaints.length === 0) {
    return (
      <div className="p-8 text-center bg-surface-container-lowest rounded-xl border border-outline-variant/30 text-on-surface-variant">
        <span className="material-symbols-outlined text-[36px] text-outline mb-2">inbox</span>
        <p className="text-body-md font-body-md">No grievances match the specified criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-body-sm font-body-sm border-collapse">
          <thead>
            <tr className="bg-surface-container-high border-b border-outline-variant/30 text-on-surface font-label-md text-label-md">
              <th className="py-3.5 px-4 font-bold">Docket ID</th>
              <th className="py-3.5 px-4 font-bold">Category & Subject</th>
              <th className="py-3.5 px-4 font-bold">Ward / Location</th>
              <th className="py-3.5 px-4 font-bold">SLA Timeline</th>
              <th className="py-3.5 px-4 font-bold">Status</th>
              <th className="py-3.5 px-4 font-bold text-right">Operational Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20 text-on-surface">
            {complaints.map((item) => (
              <tr key={item.id} className="hover:bg-surface-container-low/60 transition-colors">
                {/* ID */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <Link 
                    to={`/citizen/complaints/${item.id}`}
                    className="font-mono text-label-sm font-label-sm font-bold text-primary hover:underline bg-surface-container px-2 py-0.5 rounded border border-outline-variant/30"
                  >
                    {item.id}
                  </Link>
                </td>

                {/* Title & Category */}
                <td className="py-3.5 px-4 max-w-xs">
                  <div className="font-semibold text-on-surface text-label-lg font-label-lg line-clamp-1">
                    {item.title}
                  </div>
                  <div className="text-label-sm font-label-sm text-outline mt-0.5">
                    {item.category}
                  </div>
                </td>

                {/* Location */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="text-label-md font-label-md text-on-surface font-medium">
                    {item.ward}
                  </div>
                  <div className="text-label-sm font-label-sm text-outline">
                    {item.panchayat}
                  </div>
                </td>

                {/* SLA */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  {item.status === 'Resolved' ? (
                    <span className="text-secondary font-semibold text-label-sm">
                      {item.turnaround || 'Resolved'}
                    </span>
                  ) : (
                    <span className="text-primary font-medium text-label-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">timer</span>
                      <span>{item.slaHoursRemaining || 24}h remaining</span>
                    </span>
                  )}
                </td>

                {/* Status */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <StatusBadge status={item.status} size="sm" />
                </td>

                {/* Action button */}
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <button
                    onClick={() => onActionClick && onActionClick(item)}
                    className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-primary border border-primary/20 text-label-sm font-label-sm font-semibold transition-all"
                  >
                    {actionLabel}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
