import React, { useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ComplaintCard from '../components/ComplaintCard';
import { useComplaints } from '../context/ComplaintContext';
import { SERVICE_CATEGORIES } from '../data/mockComplaints';

export default function PublicComplaintsPage() {
  const { complaints } = useComplaints();
  const location = useLocation();

  // Parse query params if any
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'all';
  const initialQuery = queryParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  const filtered = useMemo(() => {
    return complaints.filter(item => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        item.id.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.ward.toLowerCase().includes(q);

      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchStatus = selectedStatus === 'all' || item.status === selectedStatus;
      const matchDistrict = selectedDistrict === 'all' || item.district.toLowerCase() === selectedDistrict.toLowerCase();

      return matchSearch && matchCat && matchStatus && matchDistrict;
    });
  }, [complaints, searchQuery, selectedCategory, selectedStatus, selectedDistrict]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedDistrict('all');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* SUB-HEADER / HERO TRANSPARENCY BAR */}
      <section className="bg-surface-container-low border-b border-outline-variant/20 pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant mb-3">
            <span>LokSetu Public Audit</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Community Complaints Directory</span>
            <span className="inline-flex items-center gap-1 ml-3 px-2 py-0.5 rounded-full bg-secondary-container/60 text-on-secondary-container text-label-sm font-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span>Public Unauthenticated Access</span>
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-headline-xl font-headline-xl text-on-surface tracking-tight font-bold">
                Public Complaints Directory
              </h1>
              <p className="text-body-md font-body-md text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
                Live public ledger of verified civic issues across Gram Panchayats and Municipal Wards. Monitor redressal speeds, inspection reports, and departmental accountability.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-surface-container-lowest px-3.5 py-2 rounded-lg border border-outline-variant/30 text-body-sm font-body-sm shadow-xs self-start md:self-auto">
              <span className="material-symbols-outlined text-secondary text-[20px]">policy</span>
              <span className="text-on-surface-variant">Live Ledger Hash: <code className="font-mono text-on-surface font-semibold">#LOK-SYNC-2025-Q4</code></span>
            </div>
          </div>

          {/* PROMINENT PRIVACY BANNER */}
          <div className="mt-6 rounded-xl bg-surface-container-lowest border border-outline-variant/40 p-4 shadow-sm flex items-start sm:items-center gap-3.5">
            <div className="p-2 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed shrink-0">
              <span className="material-symbols-outlined text-[22px]">privacy_tip</span>
            </div>
            <div className="flex-1">
              <p className="text-body-md font-body-md text-on-surface">
                <strong className="font-bold text-on-surface">Public Transparency Ledger:</strong> Citizen names, phone numbers, and private attachments are strictly redacted to protect complainant identity under DPDP guidelines.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-label-sm font-label-sm text-on-surface-variant bg-surface-container-low px-2.5 py-1.5 rounded-md border border-outline-variant/20 whitespace-nowrap">
              <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
              <span>DPDP Compliant (Sec 8)</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH & FILTERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-5 shadow-sm space-y-4">
          {/* Top Row: Search */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined text-[22px]">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search complaints by ID, locality, or keyword..."
              className="w-full pl-11 pr-24 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {searchQuery && (
              <div className="absolute inset-y-0 right-1.5 flex items-center">
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-3 py-1.5 bg-surface-container text-on-surface rounded-md text-label-md font-label-md hover:bg-surface-container-high transition-colors"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            {/* Category */}
            <div>
              <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block mb-1">
                Civic Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-label-lg font-label-lg text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="all">All Service Categories</option>
                {SERVICE_CATEGORIES.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block mb-1">
                Status Filter
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-label-lg font-label-lg text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="all">All Statuses</option>
                <option value="In Progress">In Progress (Field Work)</option>
                <option value="Under Review">Under Review</option>
                <option value="Resolved">Resolved (Certified)</option>
                <option value="Escalated">Escalated</option>
              </select>
            </div>

            {/* District */}
            <div>
              <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block mb-1">
                District / Region
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-label-lg font-label-lg text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="all">All Districts</option>
                <option value="fatehpur">Fatehpur, UP</option>
                <option value="lucknow">Lucknow, UP</option>
                <option value="kanpur">Kanpur Nagar, UP</option>
              </select>
            </div>

            {/* Reset */}
            <div className="flex items-end">
              <button
                onClick={handleReset}
                className="w-full h-10 px-4 rounded-lg border border-outline-variant hover:bg-surface-container text-on-surface-variant font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Directory Results List Header */}
        <div className="flex items-center justify-between text-label-md font-label-md text-on-surface-variant">
          <span>
            Displaying <strong className="text-on-surface font-bold">{filtered.length}</strong> public dockets
          </span>
          <span className="text-outline text-label-sm">
            Audited under Citizen Charter Act
          </span>
        </div>

        {/* Complaints Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(item => (
              <ComplaintCard key={item.id} complaint={item} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-surface-container-lowest rounded-xl border border-outline-variant/30 text-on-surface-variant space-y-3">
            <span className="material-symbols-outlined text-[48px] text-outline">search_off</span>
            <h3 className="font-title-md text-title-md font-bold text-on-surface">No Public Grievances Found</h3>
            <p className="text-body-sm text-outline">Try adjusting your search terms or clearing selected filters.</p>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-sm font-semibold"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
