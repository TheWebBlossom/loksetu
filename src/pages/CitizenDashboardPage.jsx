import React from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { useComplaints } from '../context/ComplaintContext';
import { useTranslation } from '../context/LanguageContext';

export default function CitizenDashboardPage() {
  const { user } = useAuth();
  const { complaints } = useComplaints();
  const { t, isHindi } = useTranslation();

  // Citizen complaints
  const myComplaints = complaints.slice(0, 4);
  const featured = complaints.find(c => c.id === 'LOK-2025-UP-8841') || complaints[0];

  const inProgressCount = complaints.filter(c => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-label-sm font-label-sm text-secondary font-bold uppercase tracking-wider bg-secondary-container px-2.5 py-0.5 rounded-full">
              {t('citizenVerifiedProfile')}
            </span>
            <span className="text-outline text-label-sm font-mono">ID: {user?.aadharMasked || 'AADHAR-***-9021'}</span>
          </div>
          <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface tracking-tight mt-1">
            {t('welcomeBack')}, {user?.name || 'Citizen'}
          </h1>
          <p className="text-body-sm font-body-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
            <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
            <span>{user?.ward || 'Ward 4 (Chak Haswa)'}, {user?.panchayat || 'Rampur GP'} ({user?.district || 'Fatehpur'}, {user?.state || 'Uttar Pradesh'})</span>
          </p>
        </div>

        <Link
          to="/submit-grievance"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-container text-on-primary rounded-lg text-label-lg font-label-lg font-semibold shadow-sm hover:bg-primary transition-all active:scale-95 self-start sm:self-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>{t('submitComplaint')}</span>
        </Link>
      </div>

      {/* 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('myRegisteredGrievances')}
          value={myComplaints.length.toString()}
          subtitle={t('allTimeLoggedDockets')}
          icon="folder_managed"
          badgeText="Verified"
        />
        <StatCard
          title={t('inProgressFieldAction')}
          value={inProgressCount.toString()}
          subtitle={t('activeWorkOrders')}
          icon="engineering"
          trend="Within SLA"
          trendPositive={true}
        />
        <StatCard
          title={t('resolvedWithProof')}
          value={resolvedCount.toString()}
          subtitle={t('citizenOtpVerified')}
          icon="verified"
          trend="100% Satisfied"
          trendPositive={true}
        />
        <StatCard
          title={t('gramPanchayatSlaRate')}
          value="96.2%"
          subtitle="Rampur GP timely resolution"
          icon="timer"
          badgeText={t('slaBenchmark')}
        />
      </div>

      {/* ACTIVE GRIEVANCE SPOTLIGHT CARD */}
      {featured && (
        <div className="bg-surface-container-lowest rounded-xl border border-primary/20 shadow-sm p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-outline-variant/20">
            <div className="flex items-center gap-3">
              <span className="font-mono text-label-md font-label-md font-bold text-primary bg-surface-container px-2.5 py-1 rounded border border-outline-variant/30">
                {featured.id}
              </span>
              <StatusBadge status={featured.status} />
              <span className="text-label-sm font-label-sm bg-surface-container-low px-2 py-0.5 rounded text-on-surface-variant">
                {featured.category}
              </span>
            </div>

            <span className="text-label-sm font-label-sm text-primary font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">timer</span>
              <span>{featured.slaHoursRemaining} {t('hoursRemaining')}</span>
            </span>
          </div>

          <div>
            <h3 className="text-title-md font-title-md font-bold text-on-surface text-lg">
              {featured.title}
            </h3>
            <p className="text-body-sm font-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
              {featured.description}
            </p>
          </div>

          {/* Location & Assigned Nodal Officer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/20 text-body-sm">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">location_on</span>
              <div>
                <span className="text-label-sm text-outline block">Reported Landmark</span>
                <span className="font-semibold text-on-surface">{featured.locationDetail}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">person</span>
              <div>
                <span className="text-label-sm text-outline block">Assigned Junior Engineer</span>
                <span className="font-semibold text-on-surface">{featured.assignedOfficer}</span>
                <span className="text-outline text-label-sm block">{featured.officerPhone}</span>
              </div>
            </div>
          </div>

          {/* Mini Stepper Preview */}
          <div className="pt-2">
            <h4 className="text-label-sm font-label-sm text-outline uppercase tracking-wider font-semibold mb-3">
              Live Progress Step
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-label-sm">
              <div className="p-2 rounded-lg bg-secondary text-on-secondary font-semibold">1. Registered</div>
              <div className="p-2 rounded-lg bg-secondary text-on-secondary font-semibold">2. Triage &amp; Routed</div>
              <div className="p-2 rounded-lg bg-secondary text-on-secondary font-semibold">3. Site Inspected</div>
              <div className="p-2 rounded-lg bg-primary text-on-primary font-bold animate-pulse">4. Field Repair</div>
              <div className="p-2 rounded-lg bg-surface-container text-outline">5. Citizen Sign-off</div>
            </div>
          </div>

          <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between">
            <span className="text-label-sm font-label-sm text-outline">
              Last status update: {featured.timeline?.[featured.timeline.length - 2]?.date || 'Today, 11:00 AM'}
            </span>
            <Link
              to={`/citizen/complaints/${featured.id}`}
              className="inline-flex items-center gap-1.5 text-label-md font-label-md font-bold text-primary hover:text-secondary cursor-pointer"
            >
              <span>View Full Audit Rail &amp; Photo Logs</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      )}

      {/* RECENT DOCKETS LIST */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
          <h3 className="font-title-md text-title-md font-bold text-on-surface">
            {t('myComplaints')}
          </h3>
          <Link
            to="/citizen/complaints"
            className="text-label-sm font-label-sm font-bold text-primary hover:underline cursor-pointer"
          >
            View All Dockets ({myComplaints.length})
          </Link>
        </div>

        <div className="divide-y divide-outline-variant/20">
          {myComplaints.map((c) => (
            <div key={c.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-container-low/40 px-2 rounded-lg transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-label-sm font-bold text-primary">{c.id}</span>
                  <StatusBadge status={c.status} size="sm" />
                  <span className="text-label-sm text-outline">{c.category}</span>
                </div>
                <h4 className="font-semibold text-on-surface text-body-sm line-clamp-1">{c.title}</h4>
              </div>

              <Link
                to={`/citizen/complaints/${c.id}`}
                className="px-3 py-1.5 rounded-lg border border-outline-variant text-label-sm font-label-sm font-semibold hover:bg-surface-container text-primary self-start sm:self-auto shrink-0 cursor-pointer"
              >
                Inspect Case File →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
