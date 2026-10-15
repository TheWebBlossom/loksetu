import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  SlidersHorizontal, 
  Grid, 
  List, 
  ChevronRight,
  Sparkles,
  ArrowUpDown,
  Building,
  RotateCcw
} from 'lucide-react';
import { PUBLIC_COMPLAINTS, SERVICE_CATEGORIES, WARDS_LIST } from '../data/mockData';
import ComplaintCard from '../components/complaints/ComplaintCard';
import DemoBadge from '../components/common/DemoBadge';

export default function ComplaintDirectoryPage({ 
  onInspectCase, 
  onOpenRegister, 
  initialCategory = 'all',
  onNavigate 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedWard, setSelectedWard] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Filter complaints
  const filteredComplaints = useMemo(() => {
    return PUBLIC_COMPLAINTS.filter(item => {
      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        item.id.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.ward.toLowerCase().includes(query) ||
        item.officer.toLowerCase().includes(query);

      // Category match
      const matchesCategory = selectedCategory === 'all' || 
        item.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        selectedCategory.toLowerCase().includes(item.category.toLowerCase());

      // Status match
      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;

      // Ward match
      const matchesWard = selectedWard === 'all' || item.ward.includes(selectedWard);

      return matchesSearch && matchesCategory && matchesStatus && matchesWard;
    }).sort((a, b) => {
      if (sortBy === 'upvotes') return (b.upvotes || 0) - (a.upvotes || 0);
      if (sortBy === 'oldest') return a.id.localeCompare(b.id);
      return b.id.localeCompare(a.id); // newest by ID
    });
  }, [searchQuery, selectedCategory, selectedStatus, selectedWard, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedWard('all');
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-civic-canvas py-10">
      <div className="civic-container">
        {/* Breadcrumb & Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <button onClick={() => onNavigate('home')} className="hover:text-forest-800">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-forest-900 font-semibold">Public Grievance Directory</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-100 border border-forest-200 px-3 py-1 rounded-full">
                Open Civic Transparency Portal
              </span>
              <h1 className="text-3xl font-extrabold text-forest-950 mt-3 tracking-tight">
                Ward Grievance Redressal Directory
              </h1>
              <p className="text-sm text-civic-text-secondary mt-1 max-w-xl">
                Browse publicly logged neighbourhood issues across wards. Audit resolution progress, inspect officer assignments, and endorse issues affecting your locality.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <DemoBadge text="Public Demo Feed" variant="prominent" />
              <button
                onClick={onOpenRegister}
                className="px-4 py-2.5 bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex-shrink-0"
              >
                + Lodge New Issue
              </button>
            </div>
          </div>
        </div>

        {/* Filter & Search Control Panel */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-card mb-8 space-y-4">
          {/* Row 1: Search Bar & View Mode Toggle */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Search by Keyword, Complaint ID (LS-2026-...), Ward, or Officer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50/50 focus:bg-white transition-all shadow-2xs"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-xs text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-forest-900 shadow-2xs font-bold' : 'text-gray-500 hover:text-gray-800'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    viewMode === 'list' ? 'bg-white text-forest-900 shadow-2xs font-bold' : 'text-gray-500 hover:text-gray-800'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Reset button */}
              {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all' || selectedWard !== 'all') && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Category, Status, Ward, and Sorting Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-gray-100 text-xs">
            {/* Category Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                Civic Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium text-xs"
              >
                <option value="all">All Service Categories ({PUBLIC_COMPLAINTS.length})</option>
                {SERVICE_CATEGORIES.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                Resolution Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium text-xs"
              >
                <option value="all">All Statuses</option>
                <option value="Resolved">Resolved (Citizen Verified)</option>
                <option value="In Progress">In Progress (Field Action)</option>
                <option value="Under Review">Under Review (Initial Triage)</option>
              </select>
            </div>

            {/* Ward Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                Jurisdiction Ward
              </label>
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium text-xs"
              >
                <option value="all">All Municipal Wards</option>
                {WARDS_LIST.map(w => (
                  <option key={w.id} value={w.name.split('—')[0].trim()}>{w.name}</option>
                ))}
              </select>
            </div>

            {/* Sorting */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                Sort Directory
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium text-xs"
              >
                <option value="newest">Most Recent Grievances</option>
                <option value="upvotes">Most Citizen Endorsements</option>
                <option value="oldest">Complaint ID Sequence</option>
              </select>
            </div>
          </div>
        </div>

        {/* Directory Results Header */}
        <div className="flex items-center justify-between mb-4 text-xs text-gray-600">
          <div>
            Showing <strong className="text-forest-900">{filteredComplaints.length}</strong> public grievances
            {selectedCategory !== 'all' && <span> in <span className="font-semibold text-teal-800">{selectedCategory}</span></span>}
            {selectedStatus !== 'all' && <span> with status <span className="font-semibold text-forest-800">{selectedStatus}</span></span>}
          </div>

          <span className="text-[11px] text-gray-500">
            Click any grievance to view step-by-step case timeline
          </span>
        </div>

        {/* Directory Results Display */}
        {filteredComplaints.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredComplaints.map(item => (
                <ComplaintCard
                  key={item.id}
                  complaint={item}
                  onViewTimeline={() => onInspectCase(item.id)}
                />
              ))}
            </div>
          ) : (
            /* List View */
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-card divide-y divide-gray-100">
              {filteredComplaints.map(item => (
                <div 
                  key={item.id}
                  onClick={() => onInspectCase(item.id)}
                  className="p-4 hover:bg-forest-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-forest-900 bg-forest-50 px-2 py-0.5 rounded border border-forest-200">
                        {item.id}
                      </span>
                      <span className="text-[11px] font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        item.status === 'Resolved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'In Progress'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-sky-100 text-sky-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-gray-900 text-sm group-hover:text-forest-900">
                      {item.title}
                    </h4>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-teal-600" />
                        {item.ward}, {item.city}
                      </span>
                      <span>Nodal Officer: {item.officer}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end md:self-auto">
                    <span className="text-xs font-semibold text-gray-500">
                      {item.upvotes} endorsements
                    </span>
                    <button className="px-3.5 py-1.5 bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs">
                      Audit File →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* Empty state */
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto shadow-card space-y-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">No Matching Complaints Found</h3>
            <p className="text-xs text-gray-500">
              Try adjusting your search terms or clearing selected category and status filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-4 py-2 bg-forest-800 text-white text-xs font-semibold rounded-xl"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
