import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import ComplaintTable from '../components/ComplaintTable';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import { useComplaints } from '../context/ComplaintContext';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';

export default function AuthorityDashboardPage() {
  const { complaints, updateComplaintStatus } = useComplaints();
  const { user } = useAuth();
  const { t, isHindi } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab state synchronized with URL search parameter
  const activeTab = searchParams.get('tab') || 'all';

  const setActiveTab = (newTab) => {
    setSearchParams({ tab: newTab });
  };

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Modal and Action State
  const [selectedCase, setSelectedCase] = useState(null);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [statusUpdateChoice, setStatusUpdateChoice] = useState('In Progress');
  const [officerNote, setOfficerNote] = useState('');
  const [assignedEngineer, setAssignedEngineer] = useState('Er. Sandeep Patel (Junior Engineer)');
  const [assignedCrew, setAssignedCrew] = useState('Sanitation Team Alpha');
  const [resolutionPhoto, setResolutionPhoto] = useState('https://images.unsplash.com/photo-1541888946425-d0fbb1861563?auto=format&fit=crop&w=600&q=80');
  const [resolutionRemarks, setResolutionRemarks] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  // Dynamic metrics computed from real complaints state
  const totalAssigned = complaints.length;
  const inProgressCount = complaints.filter(c => c.status === 'In Progress').length;
  const awaitingProofCount = complaints.filter(c => c.status === 'Under Review').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;

  // Filter complaints according to active tab, search, category, and priority
  const filteredComplaints = useMemo(() => {
    return complaints.filter(c => {
      // Tab filter
      if (activeTab === 'in-progress' && c.status !== 'In Progress') return false;
      if (activeTab === 'awaiting' && c.status !== 'Under Review') return false;
      if (activeTab === 'resolved' && c.status !== 'Resolved') return false;
      if (activeTab === 'assigned' && c.status === 'Resolved') return false;

      // Category filter
      if (categoryFilter !== 'All' && c.category !== categoryFilter) return false;

      // Priority filter
      if (priorityFilter !== 'All' && c.urgency !== priorityFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesId = c.id?.toLowerCase().includes(query);
        const matchesTitle = c.title?.toLowerCase().includes(query);
        const matchesCitizen = c.citizenName?.toLowerCase().includes(query) || c.citizenMasked?.toLowerCase().includes(query);
        const matchesLocation = c.locationDetail?.toLowerCase().includes(query) || c.ward?.toLowerCase().includes(query);
        const matchesDesc = c.description?.toLowerCase().includes(query);
        if (!matchesId && !matchesTitle && !matchesCitizen && !matchesLocation && !matchesDesc) {
          return false;
        }
      }

      return true;
    });
  }, [complaints, activeTab, categoryFilter, priorityFilter, searchQuery]);

  const handleOpenAction = (complaint) => {
    setSelectedCase(complaint);
    setStatusUpdateChoice(complaint.status === 'Submitted' ? 'In Progress' : complaint.status === 'In Progress' ? 'Under Review' : 'Resolved');
    setOfficerNote(`Inspected by ${user?.name || 'Gram Pradhan'}. Work order instructions logged.`);
    setAssignedEngineer(complaint.assignedOfficer || 'Er. Sandeep Patel (Junior Engineer)');
    setAssignedCrew(complaint.assignedCrew || 'Sanitation Team Alpha');
    setResolutionRemarks(complaint.resolutionNote || 'Field repair completed with statutory engineering sign-off.');
    setActionModalOpen(true);
  };

  const handleExecuteAction = () => {
    if (selectedCase) {
      updateComplaintStatus(
        selectedCase.id,
        statusUpdateChoice,
        officerNote,
        `${user?.name || 'Gram Pradhan'} (${user?.designation || 'Authority Head'})`,
        {
          assignedOfficer: assignedEngineer,
          assignedCrew: assignedCrew,
          resolutionEvidence: statusUpdateChoice === 'Resolved' ? resolutionPhoto : selectedCase.resolutionEvidence,
          resolutionNote: resolutionRemarks
        }
      );
      setActionModalOpen(false);
      setToastMsg(`Docket ${selectedCase.id} successfully updated to "${statusUpdateChoice}".`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Jurisdictional Node Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              Gram Panchayat Redressal Hub
            </span>
            <span className="text-outline text-xs font-mono">Jurisdiction: {user?.jurisdiction || 'Wards 1–7'}</span>
          </div>
          <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface tracking-tight">
            {t('panchayatOpsConsole')}
          </h1>
          <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
            {t('opsConsoleSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1.5 rounded-lg bg-surface-container text-primary font-mono text-label-sm font-semibold border border-outline-variant/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            Node: RAMPUR-GP-01
          </span>
        </div>
      </div>

      {/* 4 Operations Metric Cards (Dynamic From Context) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('totalAssignedDockets')}
          value={totalAssigned.toString()}
          subtitle="Active dockets in Rampur GP"
          icon="assignment_turned_in"
          badgeText="Queue Active"
        />
        <StatCard
          title={t('inProgressFieldAction')}
          value={inProgressCount.toString()}
          subtitle={t('activeMaintenanceCrews')}
          icon="engineering"
          trend="Field Active"
          trendPositive={true}
        />
        <StatCard
          title={t('awaitingProofClosure')}
          value={awaitingProofCount.toString()}
          subtitle={t('awaitingProofAudit')}
          icon="verified"
          badgeText="Action Required"
        />
        <StatCard
          title={t('wardSlaAdherence')}
          value="96.8%"
          subtitle="Statutory SLA Compliance"
          icon="timer"
          trend="+2.1% MoM"
          trendPositive={true}
        />
      </div>

      {/* Tabs and Filter Bar */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-4 shadow-sm space-y-4">
        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/20 pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-label-md font-label-md scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors font-semibold text-xs sm:text-sm cursor-pointer ${
                activeTab === 'all' 
                  ? 'bg-primary text-on-primary shadow-xs' 
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {t('allAssigned')} ({totalAssigned})
            </button>
            <button
              onClick={() => setActiveTab('in-progress')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors font-semibold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'in-progress' 
                  ? 'bg-secondary-fixed text-on-secondary-fixed shadow-xs' 
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span>{t('inProgress')} ({inProgressCount})</span>
            </button>
            <button
              onClick={() => setActiveTab('awaiting')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors font-semibold text-xs sm:text-sm cursor-pointer ${
                activeTab === 'awaiting' 
                  ? 'bg-tertiary-fixed text-on-tertiary-fixed shadow-xs' 
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {t('awaitingProof')} ({awaitingProofCount})
            </button>
            <button
              onClick={() => setActiveTab('resolved')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors font-semibold text-xs sm:text-sm cursor-pointer ${
                activeTab === 'resolved' 
                  ? 'bg-secondary text-on-secondary shadow-xs' 
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {t('resolved')} ({resolvedCount})
            </button>
          </div>

          <span className="text-label-sm font-label-sm text-outline">
            Showing {filteredComplaints.length} of {totalAssigned} dockets
          </span>
        </div>

        {/* Search & Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
          <div className="sm:col-span-6 relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-outline">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchDockets')}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full py-2 px-3 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:border-primary outline-none"
            >
              <option value="All">{t('allCategories')}</option>
              <option value="Drinking Water Supply">Drinking Water Supply</option>
              <option value="Sanitation & Drainage">Sanitation & Drainage</option>
              <option value="Rural Road Maintenance">Rural Road Maintenance</option>
              <option value="Street Lighting">Street Lighting</option>
              <option value="Solid Waste Management">Solid Waste Management</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full py-2 px-3 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:border-primary outline-none"
            >
              <option value="All">{t('allPriorities')}</option>
              <option value="Critical">Critical Emergency</option>
              <option value="High Priority">High Priority</option>
              <option value="Standard Priority">Standard Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Operations Complaints Table */}
      <div className="space-y-4">
        {filteredComplaints.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-12 text-center space-y-3">
            <span className="material-symbols-outlined text-[48px] text-outline">inbox</span>
            <p className="text-on-surface font-semibold">{t('noRecordsFound')}</p>
            <p className="text-outline text-xs">Try clearing the search query or changing active filter tabs.</p>
            <button
              onClick={() => { setSearchQuery(''); setCategoryFilter('All'); setPriorityFilter('All'); }}
              className="px-3.5 py-1.5 rounded-lg border border-outline-variant text-xs font-semibold hover:bg-surface-container"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <ComplaintTable
            complaints={filteredComplaints}
            onActionClick={handleOpenAction}
            actionLabel={t('assignCrewAction')}
            showOfficer={true}
          />
        )}
      </div>

      {/* Authority Action Modal */}
      {selectedCase && (
        <Modal
          isOpen={actionModalOpen}
          onClose={() => setActionModalOpen(false)}
          title={isHindi ? "पंचायत संचालन एवं कार्य आदेश प्रेषण" : "Panchayat Operations & Work Order Dispatch"}
          subtitle={`Docket ${selectedCase.id} · ${selectedCase.category}`}
        >
          <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
            {/* Docket Summary Micro-Card */}
            <div className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/30 text-body-sm space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-primary">{selectedCase.id}</span>
                <StatusBadge status={selectedCase.status} size="sm" />
              </div>
              <strong className="text-on-surface font-semibold block text-sm">{selectedCase.title}</strong>
              <p className="text-xs text-on-surface-variant">{selectedCase.description}</p>
              <div className="text-[11px] text-outline pt-1 flex flex-wrap items-center gap-3">
                <span>Citizen: <strong>{selectedCase.citizenName}</strong></span>
                <span>Ward: <strong>{selectedCase.ward}</strong></span>
                <span>SLA: <strong>{selectedCase.slaHoursRemaining}h remaining</strong></span>
              </div>
            </div>

            {/* Status Update Choice */}
            <div>
              <label className="block text-label-md font-semibold text-on-surface mb-1">
                {t('updateStatusLabel')}
              </label>
              <select
                value={statusUpdateChoice}
                onChange={(e) => setStatusUpdateChoice(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface text-sm focus:border-primary outline-none"
              >
                <option value="In Progress">In Progress (Dispatch Field Repair Crew)</option>
                <option value="Under Review">Under Review (Require Further Site Survey)</option>
                <option value="Resolved">Resolved (Submit Resolution Proof &amp; Close)</option>
                <option value="Escalated">Escalate to Block Development Officer (BDO)</option>
              </select>
            </div>

            {/* Assign Engineer & Crew */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-label-sm font-semibold text-on-surface mb-1">
                  Designated Junior Engineer
                </label>
                <select
                  value={assignedEngineer}
                  onChange={(e) => setAssignedEngineer(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface text-xs focus:border-primary outline-none"
                >
                  <option value="Er. Sandeep Patel (Junior Engineer, Jal Nigam)">Er. Sandeep Patel (Junior Engineer, Jal Nigam)</option>
                  <option value="Er. R. K. Sharma (Assistant Engineer, PWD)">Er. R. K. Sharma (Assistant Engineer, PWD)</option>
                  <option value="Er. Meena Verma (Sanitation Inspector)">Er. Meena Verma (Sanitation Inspector)</option>
                </select>
              </div>

              <div>
                <label className="block text-label-sm font-semibold text-on-surface mb-1">
                  {t('fieldCrewTeam')}
                </label>
                <select
                  value={assignedCrew}
                  onChange={(e) => setAssignedCrew(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface text-xs focus:border-primary outline-none"
                >
                  <option value="Sanitation Team Alpha">Sanitation Team Alpha</option>
                  <option value="Jal Nigam Emergency Pipe Crew">Jal Nigam Emergency Pipe Crew</option>
                  <option value="Rural Road Patch Repair Squad">Rural Road Patch Repair Squad</option>
                  <option value="Gram Vidyut Sahayak Lighting Crew">Gram Vidyut Sahayak Lighting Crew</option>
                </select>
              </div>
            </div>

            {/* Officer Notes */}
            <div>
              <label className="block text-label-sm font-semibold text-on-surface mb-1">
                {t('officerNotesLabel')}
              </label>
              <textarea
                rows={2}
                value={officerNote}
                onChange={(e) => setOfficerNote(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface text-xs focus:border-primary outline-none resize-none"
                placeholder="Document instructions, dispatched machinery, and deadline..."
              />
            </div>

            {/* Resolution Proof Attachment if status is Resolved */}
            {statusUpdateChoice === 'Resolved' && (
              <div className="p-3 rounded-xl bg-secondary-container/20 border border-secondary/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    {t('uploadResolutionProof')}
                  </span>
                  <span className="text-[10px] text-outline font-mono">Geo-Tagged JPG/PNG</span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={resolutionPhoto}
                    alt="Resolution evidence preview"
                    className="w-20 h-16 rounded-lg object-cover border border-outline-variant shadow-xs shrink-0"
                  />
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      value={resolutionPhoto}
                      onChange={(e) => setResolutionPhoto(e.target.value)}
                      placeholder="Image URL for completion proof"
                      className="w-full px-2.5 py-1 text-xs rounded border border-outline-variant bg-surface-container-lowest outline-none"
                    />
                    <p className="text-[10px] text-outline">Verified closure photo required by statutory citizen charter.</p>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-on-surface mb-1">
                    {t('resolutionRemarks')}
                  </label>
                  <input
                    type="text"
                    value={resolutionRemarks}
                    onChange={(e) => setResolutionRemarks(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-outline-variant bg-surface-container-lowest outline-none"
                    placeholder="E.g. Main valve repaired, flow tested with 40 PSI pressure."
                  />
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex justify-end gap-2.5 pt-3 border-t border-outline-variant/20">
              <button
                type="button"
                onClick={() => setActionModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-outline-variant text-on-surface text-xs font-semibold hover:bg-surface-container transition-colors"
              >
                {t('cancel')}
              </button>
              <button
                type="button"
                onClick={handleExecuteAction}
                className="px-5 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">save</span>
                <span>{t('saveAndDispatch')}</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      <Toast message={toastMsg} onClose={() => setToastMsg('')} />
    </div>
  );
}
