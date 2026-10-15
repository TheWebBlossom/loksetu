import React from 'react';
import { NavLink, Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';
import { useComplaints } from '../context/ComplaintContext';

export default function Sidebar({ role = 'citizen', activeTab: propTab, onTabChange }) {
  const { user, logout } = useAuth();
  const { complaints } = useComplaints();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = propTab || searchParams.get('tab') || (role === 'admin' ? 'overview' : 'all');

  const handleTabClick = (tabKey, basePath) => {
    if (onTabChange) {
      onTabChange(tabKey);
    }
    if (location.pathname !== basePath) {
      navigate(`${basePath}?tab=${tabKey}`);
    } else {
      setSearchParams({ tab: tabKey });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Dynamic counts for authority
  const assignedCount = complaints.length;
  const inProgressCount = complaints.filter(c => c.status === 'In Progress').length;
  const awaitingCount = complaints.filter(c => c.status === 'Under Review').length;

  if (role === 'authority') {
    return (
      <aside className="w-64 shrink-0 hidden lg:flex flex-col justify-between py-2 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm p-4">
        <div className="space-y-6">
          {/* Header Card */}
          <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-surface-container text-primary shrink-0">
              <span className="material-symbols-outlined text-[22px]">account_balance</span>
            </div>
            <div className="min-w-0">
              <p className="text-label-sm font-label-sm text-outline uppercase tracking-wider">{t('authorityWorkspace')}</p>
              <p className="text-label-md font-label-md font-bold text-on-surface truncate">
                {user?.jurisdiction || 'Rampur GP Console'}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => handleTabClick('all', '/authority/dashboard')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg font-label-lg text-label-lg transition-colors text-left ${
                currentTab === 'all'
                  ? 'bg-primary-container text-on-primary font-semibold shadow-xs' 
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                <span>{t('operationalOverview')}</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
            </button>

            <button
              onClick={() => handleTabClick('assigned', '/authority/dashboard')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-label-lg font-label-lg transition-colors text-left ${
                currentTab === 'assigned' ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
                <span>{t('assignedDockets')}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-surface-container-high text-on-surface">
                {assignedCount}
              </span>
            </button>

            <button
              onClick={() => handleTabClick('in-progress', '/authority/dashboard')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-label-lg font-label-lg transition-colors text-left ${
                currentTab === 'in-progress' ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">engineering</span>
                <span>{t('fieldCrewAction')}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-secondary-fixed text-on-secondary-fixed">
                {inProgressCount}
              </span>
            </button>

            <button
              onClick={() => handleTabClick('awaiting', '/authority/dashboard')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-label-lg font-label-lg transition-colors text-left ${
                currentTab === 'awaiting' ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">verified</span>
                <span>{t('awaitingProofClosure')}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                {awaitingCount}
              </span>
            </button>

            <Link
              to="/public/resolved"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-lg text-label-lg transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">task_alt</span>
              <span>{t('resolvedProofsRegister')}</span>
            </Link>

            <Link
              to="/public/complaints"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-lg text-label-lg transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">public</span>
              <span>{t('publicTransparencyFeed')}</span>
            </Link>
          </nav>

          {/* Quick Action Dispatcher Box */}
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface">
            <div className="flex items-center gap-2 mb-1.5 text-primary font-label-md text-label-md font-semibold">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              <span>{t('wardQuickDispatch')}</span>
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant mb-3">
              {t('quickDispatchDesc')}
            </p>
            <Link
              to="/submit-grievance"
              className="w-full py-2 px-3 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:bg-secondary transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
              <span>{t('logManualComplaint')}</span>
            </Link>
          </div>
        </div>

        {/* Footer Links */}
        <div className="pt-4 border-t border-outline-variant/30 space-y-1">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2 text-error hover:bg-error-container/20 rounded-lg text-label-md font-label-md transition-colors text-left"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>{t('logout')}</span>
          </button>
        </div>
      </aside>
    );
  }

  if (role === 'admin') {
    return (
      <aside className="w-72 bg-surface-container-low border-r border-outline-variant/30 flex flex-col justify-between shrink-0 p-4 space-y-6">
        <div className="space-y-6">
          {/* Authority Context Box */}
          <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-surface-container-high text-primary">
                <span className="material-symbols-outlined text-[22px]">admin_panel_settings</span>
              </div>
              <div>
                <div className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-outline">{t('adminDesk')}</div>
                <div className="font-title-md text-[13px] font-bold text-on-surface leading-tight">{t('stateCentralNode')}</div>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
              <span>Session: #ADM-8841-A</span>
              <span className="text-secondary font-semibold">Active Now</span>
            </div>
          </div>

          {/* Navigation Group */}
          <nav className="space-y-1">
            <div className="px-3 pb-1 font-label-sm text-[11px] uppercase tracking-wider text-outline font-semibold">
              {t('platformManagement')}
            </div>

            <button
              onClick={() => handleTabClick('overview', '/admin/dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-label-lg text-label-lg font-semibold transition-colors text-left ${
                currentTab === 'overview' ? 'bg-primary-container text-on-primary shadow-xs' : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              <span>{t('systemOverview')}</span>
            </button>

            <button
              onClick={() => handleTabClick('users', '/admin/dashboard')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg font-label-lg text-label-lg font-medium transition-colors text-left ${
                currentTab === 'users' ? 'bg-primary-container text-on-primary font-bold shadow-xs' : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">group</span>
                <span>{t('userAccounts')}</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-container-high font-mono text-outline">Manage</span>
            </button>

            <button
              onClick={() => handleTabClick('wards', '/admin/dashboard')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg font-label-lg text-label-lg font-medium transition-colors text-left ${
                currentTab === 'wards' ? 'bg-primary-container text-on-primary font-bold shadow-xs' : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">map</span>
                <span>{t('jurisdictionsWards')}</span>
              </div>
              <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono font-bold">752</span>
            </button>

            <div className="pt-3 px-3 pb-1 font-label-sm text-[11px] uppercase tracking-wider text-outline font-semibold">
              {t('complianceSecurity')}
            </div>

            <button
              onClick={() => handleTabClick('logs', '/admin/dashboard')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg font-label-lg text-label-lg font-medium transition-colors text-left ${
                currentTab === 'logs' ? 'bg-primary-container text-on-primary font-bold shadow-xs' : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">security_update_good</span>
                <span>{t('auditLogsSecurity')}</span>
              </div>
              <span className="h-2 w-2 rounded-full bg-secondary"></span>
            </button>
          </nav>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-outline-variant/30">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2 text-error hover:bg-error-container/20 rounded-lg text-label-md font-label-md transition-colors text-left"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>{t('logout')}</span>
          </button>
        </div>
      </aside>
    );
  }

  // Default: Citizen Sidebar
  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col justify-between py-2">
      <div className="space-y-6">
        {/* Ward Info Micro-Card */}
        <div className="p-3.5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm flex items-center gap-3">
          <div className="p-2 rounded-lg bg-surface-container text-primary shrink-0">
            <span className="material-symbols-outlined text-[22px]">account_balance</span>
          </div>
          <div className="min-w-0">
            <p className="text-label-sm font-label-sm text-outline uppercase tracking-wider">{t('citizenSidebarHeader')}</p>
            <p className="text-label-md font-label-md font-bold text-on-surface truncate">{user?.ward || 'Rampur Ward #4'}</p>
          </div>
        </div>

        {/* Main Navigation Links */}
        <nav className="space-y-1">
          <NavLink
            to="/citizen/dashboard"
            end
            className={({ isActive }) => `flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-label-lg text-label-lg transition-colors ${
              isActive 
                ? 'bg-primary-container text-on-primary font-semibold shadow-sm' 
                : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            <span>{t('operationalOverview')}</span>
          </NavLink>

          <NavLink
            to="/submit-grievance"
            className={({ isActive }) => `flex items-center justify-between px-3.5 py-2.5 rounded-lg font-label-lg text-label-lg transition-colors ${
              isActive 
                ? 'bg-primary-container text-on-primary font-semibold shadow-sm' 
                : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px]">post_add</span>
              <span>{t('submitComplaint')}</span>
            </div>
            <span className="material-symbols-outlined text-outline-variant text-[16px]">chevron_right</span>
          </NavLink>

          <NavLink
            to="/citizen/complaints"
            className={({ isActive }) => `flex items-center justify-between px-3.5 py-2.5 rounded-lg font-label-lg text-label-lg transition-colors ${
              isActive 
                ? 'bg-primary-container text-on-primary font-semibold shadow-sm' 
                : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px]">folder_managed</span>
              <span>{t('myComplaints')}</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-bold text-label-sm">4</span>
          </NavLink>

          <NavLink
            to="/public/complaints"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors font-label-lg text-label-lg"
          >
            <span className="material-symbols-outlined text-[20px]">public</span>
            <span>{t('publicIssuesDir')}</span>
          </NavLink>

          <NavLink
            to="/public/resolved"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors font-label-lg text-label-lg"
          >
            <span className="material-symbols-outlined text-[20px]">verified</span>
            <span>{t('navResolvedProofs')}</span>
          </NavLink>
        </nav>
      </div>

      {/* Sidebar Bottom Cluster */}
      <div className="pt-6 border-t border-outline-variant/30 space-y-2">
        <a 
          href="tel:18005657388"
          className="flex items-center gap-3 px-3.5 py-2 text-on-surface-variant hover:text-primary transition-colors text-label-md font-label-md"
        >
          <span className="material-symbols-outlined text-[18px]">call</span>
          <span>1800-LOK-SETU</span>
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2 text-error hover:bg-error-container/20 rounded-lg transition-colors text-label-md font-label-md text-left"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>{t('logout')}</span>
        </button>
      </div>
    </aside>
  );
}
