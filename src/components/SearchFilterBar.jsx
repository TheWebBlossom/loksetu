import React from 'react';
import { SERVICE_CATEGORIES } from '../data/mockComplaints';

export default function SearchFilterBar({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  selectedStatus, 
  setSelectedStatus,
  onReset
}) {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-4 sm:p-5 shadow-sm space-y-4">
      {/* Search Input Row */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </div>
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Complaint ID (e.g. LOK-2025-UP-8841), locality, or issue keywords..."
          className="w-full pl-10 pr-24 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
        {searchQuery && (
          <div className="absolute inset-y-0 right-2 flex items-center">
            <button
              onClick={() => setSearchQuery('')}
              className="px-2.5 py-1 text-label-sm font-label-sm text-on-surface-variant hover:bg-surface-container rounded-md"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Filter Row: Category & Status Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-outline-variant/20">
        <div>
          <label className="block text-label-sm font-label-sm text-outline uppercase tracking-wider mb-1">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="all">All Public Utilities</option>
            {SERVICE_CATEGORIES.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-label-sm font-label-sm text-outline uppercase tracking-wider mb-1">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Submitted">Submitted (New)</option>
            <option value="Under Review">Under Review</option>
            <option value="In Progress">In Progress (Field Work)</option>
            <option value="Resolved">Resolved (Verified)</option>
            <option value="Escalated">Escalated</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={onReset}
            className="w-full h-10 px-4 rounded-lg border border-outline-variant hover:bg-surface-container-low text-on-surface-variant font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            <span>Reset Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}
