import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import ProgressTimeline from '../components/ProgressTimeline';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import { useComplaints } from '../context/ComplaintContext';

export default function MyComplaintsPage() {
  const { complaints, updateComplaintStatus } = useComplaints();
  const [selectedId, setSelectedId] = useState('LOK-2025-UP-8841');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // all | In Progress | Under Review | Resolved
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  // Filter complaints
  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = !searchQuery || 
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.ward.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = activeFilter === 'all' || c.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const selectedComplaint = complaints.find(c => c.id === selectedId) || complaints[0];

  const handleCopyId = (id) => {
    navigator.clipboard?.writeText(id);
    setToastMsg(`Complaint ID ${id} copied to clipboard!`);
  };

  const handleVerifySignOff = () => {
    updateComplaintStatus(
      selectedComplaint.id, 
      'Resolved', 
      'Citizen validated field rectification via 4-digit OTP. 5★ satisfaction recorded.',
      'Citizen (Rajesh Kumar)'
    );
    setVerifyModalOpen(false);
    setToastMsg(`Grievance ${selectedComplaint.id} verified and officially closed!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-outline-variant/20">
        <div className="flex items-center gap-2 text-label-md font-label-md text-on-surface-variant">
          <Link to="/citizen/dashboard" className="hover:text-primary flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">account_balance</span>
            <span>Citizen Portal</span>
          </Link>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <span className="text-primary font-semibold">My Complaints &amp; Tracking</span>
        </div>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-label-sm font-label-sm">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          <span>National Citizen Redressal SLA Active</span>
        </span>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Complaint Management List (5 Cols) */}
        <section className="lg:col-span-5 space-y-4">
          <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/30 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">folder_managed</span>
                <span>My Registered Grievances</span>
              </h2>
              <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-bold">
                {filteredComplaints.length} Dockets
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID (e.g. LOK-2025-UP-8841) or keyword..."
                className="block w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant/50 rounded-lg text-body-sm font-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-label-sm font-label-sm scrollbar-none">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-2.5 py-1 rounded-md transition-colors shrink-0 ${
                  activeFilter === 'all' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                All ({complaints.length})
              </button>
              <button
                onClick={() => setActiveFilter('In Progress')}
                className={`px-2.5 py-1 rounded-md transition-colors shrink-0 flex items-center gap-1 ${
                  activeFilter === 'In Progress' ? 'bg-secondary-container text-on-secondary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span>In Progress</span>
              </button>
              <button
                onClick={() => setActiveFilter('Under Review')}
                className={`px-2.5 py-1 rounded-md transition-colors shrink-0 ${
                  activeFilter === 'Under Review' ? 'bg-tertiary-fixed text-on-tertiary-fixed font-bold' : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                Under Review
              </button>
              <button
                onClick={() => setActiveFilter('Resolved')}
                className={`px-2.5 py-1 rounded-md transition-colors shrink-0 ${
                  activeFilter === 'Resolved' ? 'bg-secondary text-on-secondary font-bold' : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                Resolved
              </button>
            </div>
          </div>

          {/* Complaints Scroll Stack */}
          <div className="space-y-3 max-h-[720px] overflow-y-auto pr-1">
            {filteredComplaints.map((item) => {
              const isSelected = selectedComplaint?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-primary bg-primary/[0.03] ring-2 ring-primary/20 shadow-sm' 
                      : 'border-outline-variant/30 bg-surface-container-lowest hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-label-sm font-bold text-primary bg-surface-container px-2 py-0.5 rounded">
                      {item.id}
                    </span>
                    <StatusBadge status={item.status} size="sm" />
                  </div>

                  <h3 className="font-semibold text-on-surface text-body-sm line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="mt-2.5 pt-2 border-t border-outline-variant/20 flex items-center justify-between text-label-sm text-outline">
                    <span>{item.ward}</span>
                    <span className="text-primary font-medium">{item.slaDeadline || 'Within SLA'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* RIGHT COLUMN: Complaint Details & Live Audit Rail (7 Cols) */}
        {selectedComplaint && (
          <section className="lg:col-span-7 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm p-6 space-y-6">
            {/* Docket Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-3">
                <span className="font-mono text-headline-sm font-bold text-primary bg-surface-container px-3 py-1 rounded-lg border border-outline-variant/30">
                  {selectedComplaint.id}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyId(selectedComplaint.id)}
                  className="p-1 rounded text-outline hover:text-primary hover:bg-surface-container"
                  title="Copy Reference ID"
                >
                  <span className="material-symbols-outlined text-[18px]">content_copy</span>
                </button>
                <StatusBadge status={selectedComplaint.status} />
              </div>

              {selectedComplaint.urgency && (
                <span className="text-label-sm font-bold uppercase tracking-wider bg-surface-container-high px-2.5 py-1 rounded-full text-on-surface-variant">
                  {selectedComplaint.urgency}
                </span>
              )}
            </div>

            {/* Subject & Category */}
            <div>
              <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">
                {selectedComplaint.category} · {selectedComplaint.department}
              </span>
              <h2 className="text-headline-sm font-headline-sm font-bold text-on-surface mt-1">
                {selectedComplaint.title}
              </h2>
              <p className="text-body-md font-body-md text-on-surface-variant mt-2 leading-relaxed">
                {selectedComplaint.description}
              </p>
            </div>

            {/* SLA Clock & Officer Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* SLA Banner */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
                <div className="flex items-center gap-2 text-primary font-semibold text-label-md mb-1">
                  <span className="material-symbols-outlined text-[18px]">timer</span>
                  <span>Citizen Charter SLA Countdown</span>
                </div>
                <div className="text-headline-md font-bold text-primary">
                  {selectedComplaint.status === 'Resolved' ? 'Completed on target' : `${selectedComplaint.slaHoursRemaining || 18} Hours Remaining`}
                </div>
                <p className="text-label-sm text-outline mt-0.5">
                  Statutory SLA: {selectedComplaint.slaTotalHours || 48} Hours max turnaround
                </p>
              </div>

              {/* Nodal Officer Card */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
                <div className="flex items-center gap-2 text-primary font-semibold text-label-md mb-1">
                  <span className="material-symbols-outlined text-[18px]">engineering</span>
                  <span>Assigned Field Engineer</span>
                </div>
                <div className="font-semibold text-on-surface text-body-md">
                  {selectedComplaint.assignedOfficer}
                </div>
                <p className="text-label-sm text-outline mt-0.5 font-mono">
                  {selectedComplaint.officerPhone}
                </p>
              </div>
            </div>

            {/* Photo Evidence Section */}
            {selectedComplaint.evidenceImages && selectedComplaint.evidenceImages.length > 0 && (
              <div>
                <h4 className="font-title-md text-title-md font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">photo_camera</span>
                  <span>Geotagged Photographic Evidence</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedComplaint.evidenceImages.map((img, idx) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden border border-outline-variant/40 aspect-video">
                      <img src={img} alt="Evidence" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                        {idx === 0 ? 'Site Inspection' : 'Defect Capture'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Live Audit Rail (Timeline) */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">history_edu</span>
                  <span>Live Redressal Audit Rail</span>
                </h4>
                <span className="text-label-sm text-outline font-mono">
                  Geo-hash: 25.9281° N, 80.8124° E
                </span>
              </div>

              <ProgressTimeline steps={selectedComplaint.timeline} />
            </div>

            {/* Citizen Actions Bar */}
            <div className="pt-4 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-3">
              {selectedComplaint.status !== 'Resolved' ? (
                <button
                  type="button"
                  onClick={() => setVerifyModalOpen(true)}
                  className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-semibold text-label-md hover:bg-secondary transition-all flex items-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Validate Fix &amp; Sign Off (OTP)</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 text-secondary font-semibold text-label-md">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>Docket Permanently Certified &amp; Closed</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => handleCopyId(selectedComplaint.id)}
                className="px-4 py-2 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container text-label-md font-medium"
              >
                Share Case Token
              </button>
            </div>
          </section>
        )}
      </div>

      {/* Citizen Sign-Off OTP Modal */}
      <Modal
        isOpen={verifyModalOpen}
        onClose={() => setVerifyModalOpen(false)}
        title="Citizen Verification & Closure Sign-off"
        subtitle={`Docket Token: ${selectedComplaint?.id}`}
      >
        <div className="space-y-4">
          <p className="text-body-sm text-on-surface-variant leading-relaxed">
            As the original complainant, your sign-off is required to officially certify this public works repair. Please enter the 4-digit OTP sent to your registered mobile number.
          </p>

          <div className="p-3 bg-surface-container-low rounded-xl border border-primary/20 text-center">
            <span className="text-label-sm text-outline block mb-1">Demo SMS Passcode:</span>
            <span className="font-mono text-headline-sm font-bold text-primary">5892</span>
          </div>

          <div>
            <label className="block text-label-md font-semibold text-on-surface mb-1">Enter 4-Digit Code</label>
            <input
              type="text"
              maxLength={4}
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              placeholder="5892"
              className="w-full text-center tracking-widest font-mono text-headline-sm py-2 rounded-lg border border-outline-variant focus:border-primary outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setVerifyModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-outline-variant text-on-surface text-label-md font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleVerifySignOff}
              className="px-5 py-2 rounded-lg bg-primary text-on-primary text-label-md font-semibold hover:bg-secondary"
            >
              Confirm Closure &amp; Rate
            </button>
          </div>
        </div>
      </Modal>

      <Toast message={toastMsg} onClose={() => setToastMsg('')} />
    </div>
  );
}
