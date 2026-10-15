import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useComplaints } from '../context/ComplaintContext';
import StatusBadge from '../components/StatusBadge';
import ProgressTimeline from '../components/ProgressTimeline';
import Modal from '../components/Modal';
import Toast from '../components/Toast';

export default function ComplaintDetailsPage() {
  const { id } = useParams();
  const { getComplaintById, updateComplaintStatus } = useComplaints();
  const navigate = useNavigate();

  const complaint = getComplaintById(id);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  if (!complaint) {
    return (
      <div className="py-16 text-center space-y-4">
        <span className="material-symbols-outlined text-[48px] text-outline">error</span>
        <h2 className="text-headline-md font-bold text-on-surface">Complaint Record Not Found</h2>
        <p className="text-body-sm text-on-surface-variant">The requested tracking token {id} does not exist in the database.</p>
        <Link to="/citizen/complaints" className="inline-block px-5 py-2.5 bg-primary text-on-primary rounded-lg font-semibold text-label-md">
          Return to My Complaints
        </Link>
      </div>
    );
  }

  const handleVerifySignOff = () => {
    updateComplaintStatus(
      complaint.id, 
      'Resolved', 
      'Citizen certified on-site completion. Docket closed.',
      'Citizen Sign-Off'
    );
    setVerifyModalOpen(false);
    setToastMsg(`Grievance ${complaint.id} verified and officially closed!`);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-outline-variant/20">
        <div className="flex items-center gap-2 text-label-md font-label-md text-on-surface-variant">
          <Link to="/citizen/dashboard" className="hover:text-primary flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">account_balance</span>
            <span>Citizen Portal</span>
          </Link>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <Link to="/citizen/complaints" className="hover:text-primary">My Complaints</Link>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <span className="text-primary font-semibold font-mono">{complaint.id}</span>
        </div>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-label-sm font-label-sm">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          <span>National Redressal SLA Monitor Active</span>
        </span>
      </div>

      {/* Main Case Detail Card */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm p-6 sm:p-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-headline-sm font-bold text-primary bg-surface-container px-3 py-1 rounded-lg border border-outline-variant/30">
                {complaint.id}
              </span>
              <StatusBadge status={complaint.status} />
              {complaint.urgency && (
                <span className="text-label-sm font-bold uppercase tracking-wider bg-surface-container-high px-2.5 py-1 rounded-full text-on-surface-variant">
                  {complaint.urgency}
                </span>
              )}
            </div>
            <div className="text-label-sm text-outline mt-1">
              Logged on: {complaint.filedDate} · Citizen: {complaint.citizenName}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { navigator.clipboard?.writeText(complaint.id); setToastMsg('Token copied!'); }}
              className="px-3.5 py-2 rounded-lg border border-outline-variant text-label-sm font-semibold hover:bg-surface-container flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
              <span>Copy Docket ID</span>
            </button>
            <Link
              to="/citizen/complaints"
              className="px-3.5 py-2 rounded-lg bg-surface-container text-on-surface text-label-sm font-semibold hover:bg-surface-container-high"
            >
              ← All Complaints
            </Link>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">
            {complaint.category} · {complaint.department}
          </span>
          <h1 className="text-headline-md font-headline-md font-bold text-on-surface mt-1">
            {complaint.title}
          </h1>
          <p className="text-body-md font-body-md text-on-surface-variant mt-3 leading-relaxed bg-surface-container-low/40 p-4 rounded-xl border border-outline-variant/20">
            {complaint.description}
          </p>
        </div>

        {/* Location & Officer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-body-sm">
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
            <div className="flex items-center gap-1.5 text-primary font-semibold text-label-md mb-1">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
              <span>Location / Ward</span>
            </div>
            <div className="font-semibold text-on-surface">{complaint.ward}</div>
            <div className="text-outline text-label-sm mt-0.5">{complaint.locationDetail}</div>
            <div className="text-label-sm font-mono text-outline mt-1">GPS: {complaint.gpsCoordinates}</div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
            <div className="flex items-center gap-1.5 text-primary font-semibold text-label-md mb-1">
              <span className="material-symbols-outlined text-[18px]">engineering</span>
              <span>Nodal Junior Engineer</span>
            </div>
            <div className="font-semibold text-on-surface">{complaint.assignedOfficer}</div>
            <div className="text-outline text-label-sm mt-0.5 font-mono">{complaint.officerPhone}</div>
            <div className="text-label-sm text-secondary font-medium mt-1">Direct Field Dispatch</div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
            <div className="flex items-center gap-1.5 text-primary font-semibold text-label-md mb-1">
              <span className="material-symbols-outlined text-[18px]">timer</span>
              <span>SLA Target Status</span>
            </div>
            <div className="text-headline-md font-bold text-primary">
              {complaint.status === 'Resolved' ? 'Completed on target' : `${complaint.slaHoursRemaining || 18} Hours`}
            </div>
            <div className="text-outline text-label-sm mt-0.5">{complaint.slaDeadline || 'Within Citizen Charter SLA'}</div>
          </div>
        </div>

        {/* Photographic Evidence */}
        {complaint.evidenceImages && (
          <div>
            <h3 className="font-title-md text-title-md font-bold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">photo_camera</span>
              <span>Geotagged Photographic Proof</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {complaint.evidenceImages.map((src, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-outline-variant/40 aspect-video relative">
                  <img src={src} alt="Evidence photo" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                    Geotag #{i+1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Timeline */}
        <div>
          <h3 className="font-title-md text-title-md font-bold text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">history_edu</span>
            <span>Live Audit Rail &amp; Field Verification Notes</span>
          </h3>
          <ProgressTimeline steps={complaint.timeline} />
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-4">
          {complaint.status !== 'Resolved' ? (
            <button
              onClick={() => setVerifyModalOpen(true)}
              className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-semibold text-label-md hover:bg-secondary transition-colors flex items-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Confirm Resolution via OTP</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-secondary font-bold text-label-lg">
              <span className="material-symbols-outlined text-[24px]">verified</span>
              <span>Citizen Verified &amp; Signed Off</span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <span className="text-body-sm text-outline">Panchayati Raj Grievance Hash #UP-8841</span>
          </div>
        </div>
      </div>

      <Modal
        isOpen={verifyModalOpen}
        onClose={() => setVerifyModalOpen(false)}
        title="Citizen Verification & Closure Sign-off"
        subtitle={`Docket Token: ${complaint.id}`}
      >
        <div className="space-y-4">
          <p className="text-body-sm text-on-surface-variant leading-relaxed">
            As the original complainant, your sign-off is required to officially certify this public works repair. Please enter the 4-digit OTP sent to your registered mobile number.
          </p>

          <div className="p-3 bg-surface-container-low rounded-xl border border-primary/20 text-center">
            <span className="text-label-sm text-outline block mb-1">Demo SMS Passcode:</span>
            <span className="font-mono text-headline-sm font-bold text-primary">5892</span>
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
