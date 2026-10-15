import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import { useComplaints } from '../context/ComplaintContext';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';

export default function AdminDashboardPage() {
  const { complaints, resetComplaints } = useComplaints();
  const { user: currentUser, users, addUser, updateUser, deleteUser, resetUsers } = useAuth();
  const { t, isHindi } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active Tab synchronized with URL search params
  const activeAdminTab = searchParams.get('tab') || 'overview';
  const setActiveAdminTab = (tab) => setSearchParams({ tab });

  const [toastMsg, setToastMsg] = useState('');
  const [resetModalOpen, setResetModalOpen] = useState(false);

  // User Management State
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Add User Modal State
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    username: '',
    password: '',
    role: 'citizen',
    email: '',
    mobile: '',
    ward: 'Ward 4 (Chak Haswa)',
    jurisdiction: 'Ward 4 (Chak Haswa)',
    designation: '',
    status: 'Active'
  });
  const [addUserError, setAddUserError] = useState('');

  // Edit User Modal State
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Delete User Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const mockAuditLogs = [
    { timestamp: '15 Oct 2025, 14:12:05', event: 'SLA Escalation Triggered', entity: 'LOK-2025-UP-8860', user: 'SYSTEM_AUTOROUTE', ip: '10.24.180.12', status: 'WARN' },
    { timestamp: '15 Oct 2025, 13:45:22', event: 'Citizen OTP Verification Success', entity: 'LOK-2025-UP-8812', user: 'usr_citizen_01', ip: '192.168.4.11', status: 'INFO' },
    { timestamp: '15 Oct 2025, 12:30:10', event: 'Work Order Dispatched by Pradhan', entity: 'LOK-2025-UP-8841', user: 'usr_authority_01', ip: '10.24.180.45', status: 'INFO' },
    { timestamp: '15 Oct 2025, 11:15:00', event: 'Node Security Key Rotation', entity: 'UP-NIC-RAIL-01', user: 'SYSTEM_DAEMON', ip: '127.0.0.1', status: 'SECURE' },
    { timestamp: '15 Oct 2025, 09:20:18', event: 'New Citizen Enrollment Registered', entity: 'CID-UP-8942', user: 'usr_citizen_02', ip: '192.168.4.88', status: 'INFO' },
  ];

  const handleExportLogs = () => {
    setToastMsg('Platform audit log export dispatched: #AUDIT-2025-Q4.csv generated.');
  };

  const handleResetData = () => {
    resetComplaints();
    resetUsers();
    setResetModalOpen(false);
    setToastMsg('Complaints and demo users restored to clean default seed data.');
  };

  // Filtered Users List
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      if (roleFilter !== 'All' && u.role !== roleFilter) return false;
      if (statusFilter !== 'All' && u.status !== statusFilter) return false;
      if (userSearch.trim()) {
        const query = userSearch.toLowerCase();
        const matchesName = u.name?.toLowerCase().includes(query);
        const matchesUsername = u.username?.toLowerCase().includes(query);
        const matchesEmail = u.email?.toLowerCase().includes(query);
        const matchesWard = u.ward?.toLowerCase().includes(query) || u.jurisdiction?.toLowerCase().includes(query);
        if (!matchesName && !matchesUsername && !matchesEmail && !matchesWard) return false;
      }
      return true;
    });
  }, [users, roleFilter, statusFilter, userSearch]);

  // Handle Add User
  const handleOpenAddUser = () => {
    setNewUserData({
      name: '',
      username: '',
      password: '',
      role: 'citizen',
      email: '',
      mobile: '',
      ward: 'Ward 4 (Chak Haswa)',
      jurisdiction: 'Ward 4 (Chak Haswa)',
      designation: '',
      status: 'Active'
    });
    setAddUserError('');
    setAddUserModalOpen(true);
  };

  const handleSaveAddUser = (e) => {
    e.preventDefault();
    setAddUserError('');

    if (!newUserData.name.trim() || !newUserData.username.trim() || !newUserData.password.trim()) {
      setAddUserError('Name, username/demo ID, and password are required.');
      return;
    }

    const result = addUser(newUserData);
    if (!result.success) {
      setAddUserError(result.error);
      return;
    }

    setAddUserModalOpen(false);
    setToastMsg(`User "${newUserData.name}" (${newUserData.username}) created successfully.`);
  };

  // Handle Edit User
  const handleOpenEditUser = (userToEdit) => {
    setEditingUser({ ...userToEdit });
    setEditUserModalOpen(true);
  };

  const handleSaveEditUser = (e) => {
    e.preventDefault();
    if (!editingUser) return;

    updateUser(editingUser.id, {
      name: editingUser.name,
      role: editingUser.role,
      ward: editingUser.ward,
      jurisdiction: editingUser.jurisdiction || editingUser.ward,
      designation: editingUser.designation,
      status: editingUser.status,
      email: editingUser.email,
      mobile: editingUser.mobile
    });

    setEditUserModalOpen(false);
    setToastMsg(`User profile for "${editingUser.name}" updated successfully.`);
  };

  // Handle Delete User
  const handleOpenDelete = (target) => {
    setUserToDelete(target);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;

    const result = deleteUser(userToDelete.id);
    if (!result.success) {
      setToastMsg(`Failed to delete: ${result.error}`);
      setDeleteModalOpen(false);
      return;
    }

    setDeleteModalOpen(false);
    setToastMsg(`User account "${userToDelete.name}" (${userToDelete.username}) deleted.`);
    setUserToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Platform Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-label-sm font-label-sm text-primary font-bold uppercase tracking-wider bg-surface-container px-2.5 py-0.5 rounded-full border border-outline-variant/30">
              {t('superAdminConsole')}
            </span>
            <span className="text-outline text-label-sm font-mono">Session #ADM-8841-A</span>
          </div>
          <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface tracking-tight mt-1">
            Platform Administration &amp; Governance
          </h1>
          <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
            {t('superAdminSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportLogs}
            className="px-3.5 py-2 rounded-lg border border-outline-variant hover:bg-surface-container text-label-sm font-label-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">download_for_offline</span>
            <span>{t('exportAuditTrail')}</span>
          </button>
          <button
            onClick={() => setResetModalOpen(true)}
            className="px-3.5 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container text-error text-label-sm font-label-sm font-semibold flex items-center gap-1.5 transition-colors border border-outline-variant/40 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            <span>{t('resetDemoDb')}</span>
          </button>
        </div>
      </div>

      {/* 4 Super-Admin Platform Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('totalRegisteredCitizens')}
          value="1,248,910"
          subtitle="Aadhaar / Voter ID verified"
          icon="group"
          trend="+18,420 this month"
          badgeText="State Census"
        />
        <StatCard
          title={t('connectedLocalBodies')}
          value="752 Wards"
          subtitle="Gram Panchayats &amp; Urban Wards"
          icon="map"
          trend="100% Online"
          trendPositive={true}
        />
        <StatCard
          title={t('concurrentActiveSessions')}
          value="18,420"
          subtitle="Real-time citizen &amp; officer traffic"
          icon="wifi_tethering"
          badgeText="Active Rail"
        />
        <StatCard
          title={t('platformUptimeFips')}
          value="99.98%"
          subtitle="TLS 1.3 Certified State Rail"
          icon="vital_signs"
          trend="FIPS 140-2"
          trendPositive={true}
        />
      </div>

      {/* Tab Selector */}
      <div className="flex border-b border-outline-variant/30 gap-2 overflow-x-auto text-label-md font-label-md">
        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`pb-3 px-3 transition-colors flex items-center gap-2 cursor-pointer ${
            activeAdminTab === 'overview'
              ? 'text-primary font-bold border-b-2 border-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">dashboard</span>
          <span>{t('systemOverview')}</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('users')}
          className={`pb-3 px-3 transition-colors flex items-center gap-2 cursor-pointer ${
            activeAdminTab === 'users'
              ? 'text-primary font-bold border-b-2 border-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">group</span>
          <span>{t('userAccounts')} ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('wards')}
          className={`pb-3 px-3 transition-colors flex items-center gap-2 cursor-pointer ${
            activeAdminTab === 'wards'
              ? 'text-primary font-bold border-b-2 border-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">map</span>
          <span>{t('jurisdictionsWards')} (752)</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('logs')}
          className={`pb-3 px-3 transition-colors flex items-center gap-2 cursor-pointer ${
            activeAdminTab === 'logs'
              ? 'text-primary font-bold border-b-2 border-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">security_update_good</span>
          <span>{t('auditLogsSecurity')}</span>
        </button>
      </div>

      {/* TAB CONTENT: System Overview */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          {/* Node Health Banner */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-secondary-container text-secondary">
                  <span className="material-symbols-outlined text-[24px]">cloud_done</span>
                </div>
                <div>
                  <h3 className="font-title-md text-title-md font-bold text-on-surface">State Cloud Infrastructure Status</h3>
                  <p className="text-label-sm text-outline">UP-NIC Secure Rail Primary Node · Northern Disaster Recovery Active</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-secondary text-on-secondary text-label-sm font-bold">
                ● All Nodes Operational
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-body-sm">
              <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="text-label-sm text-outline block">{t('databaseLatency')}</span>
                <strong className="text-headline-sm font-bold text-primary font-mono">14ms</strong>
                <p className="text-[11px] text-outline mt-0.5">PostgreSQL Multi-AZ Cluster</p>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="text-label-sm text-outline block">{t('autoEscalationCron')}</span>
                <strong className="text-headline-sm font-bold text-secondary font-mono">Running (60s)</strong>
                <p className="text-[11px] text-outline mt-0.5">SLA Deadline Watchdog</p>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="text-label-sm text-outline block">{t('dpdpMaskingEngine')}</span>
                <strong className="text-headline-sm font-bold text-primary font-mono">Enforced (SHA-256)</strong>
                <p className="text-[11px] text-outline mt-0.5">Zero Plaintext PII on Public Feeds</p>
              </div>
            </div>
          </div>

          {/* Active Complaints Snapshot */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <h3 className="font-title-md text-title-md font-bold text-on-surface">
                {t('liveStateLedger')} ({complaints.length} Dockets in Database)
              </h3>
              <span className="text-label-sm text-outline">Synchronized across 752 local bodies</span>
            </div>

            <div className="divide-y divide-outline-variant/20">
              {complaints.slice(0, 5).map(c => (
                <div key={c.id} className="py-3 flex flex-wrap items-center justify-between gap-3 text-body-sm">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-label-sm font-bold text-primary">{c.id}</span>
                      <StatusBadge status={c.status} size="sm" />
                      <span className="text-label-sm text-outline font-medium">{c.category}</span>
                    </div>
                    <p className="font-semibold text-on-surface text-label-md line-clamp-1">{c.title}</p>
                  </div>

                  <div className="text-right text-label-sm text-outline">
                    <div>{c.ward}, {c.panchayat}</div>
                    <div className="font-mono text-primary font-medium">{c.filedDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: User Management (Issue 4) */}
      {activeAdminTab === 'users' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Top User Management Bar */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-title-lg font-bold text-on-surface">
                {isHindi ? "उपयोगकर्ता एवं भूमिका प्रबंधन" : "Demo User & Access Management"}
              </h2>
              <p className="text-body-sm text-on-surface-variant mt-0.5">
                {isHindi
                  ? "नागरिक, ग्राम प्रधान और प्रशासनिक खातों को जोड़ें, संपादित करें अथवा हटाएं। यह सीधे LocalStorage में सुरक्षित होता है।"
                  : "Create, edit, or delete demo users for citizen, authority, and admin personas. Persisted in LocalStorage."}
              </p>
            </div>

            <button
              onClick={handleOpenAddUser}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-on-primary font-semibold text-sm hover:bg-primary/90 transition-all shadow-sm active:scale-95 cursor-pointer self-start md:self-auto"
            >
              <span className="material-symbols-outlined text-[20px]">person_add</span>
              <span>{t('addUserButton')}</span>
            </button>
          </div>

          {/* User Search & Filters */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-4 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6 relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-outline">
                search
              </span>
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder={t('searchUsers')}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none"
              />
            </div>

            <div className="sm:col-span-3">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full py-2 px-3 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:border-primary outline-none"
              >
                <option value="All">{t('allRoles')}</option>
                <option value="citizen">Citizen Resident</option>
                <option value="authority">Ward / Panchayat Authority</option>
                <option value="admin">Platform Administrator</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full py-2 px-3 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:border-primary outline-none"
              >
                <option value="All">{t('allStatuses')}</option>
                <option value="Active">{t('active')}</option>
                <option value="Suspended">{t('suspended')}</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-surface-container text-on-surface border-b border-outline-variant/30 text-xs font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">User &amp; Demo ID</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Ward / Jurisdiction</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Created Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 text-on-surface">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-outline">
                        No users found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs shrink-0">
                              {u.initials || u.name?.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-on-surface truncate">{u.name}</p>
                              <p className="text-xs text-outline font-mono">
                                ID: <strong className="text-primary">{u.username}</strong>
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            u.role === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : u.role === 'authority'
                              ? 'bg-secondary-container text-on-secondary-container'
                              : 'bg-primary/10 text-primary'
                          }`}>
                            <span className="material-symbols-outlined text-[14px]">
                              {u.role === 'admin' ? 'admin_panel_settings' : u.role === 'authority' ? 'badge' : 'person'}
                            </span>
                            <span>{u.role.toUpperCase()}</span>
                          </span>
                        </td>

                        <td className="py-3 px-4 text-xs text-on-surface-variant">
                          <div className="font-medium text-on-surface">{u.ward || u.jurisdiction || 'General'}</div>
                          {u.designation && <div className="text-[11px] text-outline truncate">{u.designation}</div>}
                        </td>

                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${
                            u.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            <span>{u.status || 'Active'}</span>
                          </span>
                        </td>

                        <td className="py-3 px-4 text-xs text-outline font-mono">
                          {u.registeredDate || '01 Jan 2025'}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenEditUser(u)}
                              className="p-1.5 rounded-lg text-outline hover:text-primary hover:bg-surface-container transition-colors"
                              title={t('editUser')}
                            >
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                            <button
                              onClick={() => handleOpenDelete(u)}
                              disabled={u.isProtected || u.username === 'admin'}
                              className={`p-1.5 rounded-lg transition-colors ${
                                u.isProtected || u.username === 'admin'
                                  ? 'text-outline/40 cursor-not-allowed'
                                  : 'text-outline hover:text-error hover:bg-error-container/20 cursor-pointer'
                              }`}
                              title={u.isProtected ? 'Protected Root Admin' : t('deleteUser')}
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Security Logs */}
      {activeAdminTab === 'logs' && (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
            <div>
              <h3 className="font-title-md text-title-md font-bold text-on-surface">Immutable System Audit Logs</h3>
              <p className="text-label-sm text-outline">Cryptographically hashed security and jurisdictional event trail.</p>
            </div>
            <button
              onClick={handleExportLogs}
              className="px-3 py-1.5 rounded-lg bg-surface-container text-label-sm font-semibold hover:bg-surface-container-high cursor-pointer"
            >
              Download CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-sm border-collapse font-mono text-label-sm">
              <thead>
                <tr className="bg-surface-container-high text-on-surface border-b border-outline-variant/30">
                  <th className="py-2.5 px-3">Timestamp (IST)</th>
                  <th className="py-2.5 px-3">Event Type</th>
                  <th className="py-2.5 px-3">Target Entity</th>
                  <th className="py-2.5 px-3">Actor Token</th>
                  <th className="py-2.5 px-3">Origin IP</th>
                  <th className="py-2.5 px-3">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-on-surface">
                {mockAuditLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low/50">
                    <td className="py-2.5 px-3 text-outline">{log.timestamp}</td>
                    <td className="py-2.5 px-3 font-semibold text-on-surface font-sans">{log.event}</td>
                    <td className="py-2.5 px-3 text-primary font-bold">{log.entity}</td>
                    <td className="py-2.5 px-3 text-outline">{log.user}</td>
                    <td className="py-2.5 px-3 text-outline">{log.ip}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        log.status === 'WARN' 
                          ? 'bg-amber-100 text-amber-800' 
                          : log.status === 'SECURE' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Wards */}
      {activeAdminTab === 'wards' && (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
            <h3 className="font-title-md text-title-md font-bold text-on-surface">Jurisdictional Wards &amp; Local Body Registry</h3>
            <span className="text-label-sm text-outline">752 Active Municipal &amp; GP Nodes</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-2">
              <span className="text-label-sm text-primary font-bold uppercase">Fatehpur District</span>
              <h4 className="font-title-md font-bold text-on-surface">Rampur Gram Panchayat</h4>
              <p className="text-body-sm text-outline">Wards 1–7 · Pradhan: Shri Ram Singh</p>
              <span className="inline-block text-[11px] font-mono bg-surface-container px-2 py-0.5 rounded text-secondary font-bold">
                {complaints.length} Active Dockets · 96.8% SLA
              </span>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-2">
              <span className="text-label-sm text-primary font-bold uppercase">Fatehpur District</span>
              <h4 className="font-title-md font-bold text-on-surface">Chak Haswa Ward 04</h4>
              <p className="text-body-sm text-outline">Urban Ward · Engineer: Er. Sandeep Patel</p>
              <span className="inline-block text-[11px] font-mono bg-surface-container px-2 py-0.5 rounded text-secondary font-bold">
                8 Active Dockets · 94.2% SLA
              </span>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-2">
              <span className="text-label-sm text-primary font-bold uppercase">Kanpur Nagar</span>
              <h4 className="font-title-md font-bold text-on-surface">Bhitargaon GP Cluster</h4>
              <p className="text-body-sm text-outline">Wards 1–12 · Pradhan Desk Active</p>
              <span className="inline-block text-[11px] font-mono bg-surface-container px-2 py-0.5 rounded text-secondary font-bold">
                19 Active Dockets · 97.4% SLA
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ADD USER MODAL */}
      <Modal
        isOpen={addUserModalOpen}
        onClose={() => setAddUserModalOpen(false)}
        title={t('addUserButton')}
        subtitle="Create a new demo user with instant authentication privileges"
      >
        <form onSubmit={handleSaveAddUser} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          {addUserError && (
            <div className="p-3 rounded-lg bg-error-container text-on-error-container text-xs flex items-center gap-2 border border-error/30">
              <span className="material-symbols-outlined text-[16px] text-error">error</span>
              <span className="font-medium">{addUserError}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              {t('fullName')} *
            </label>
            <input
              type="text"
              value={newUserData.name}
              onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
              placeholder="e.g. Anand Kumar"
              required
              className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                {t('usernameOrId')} *
              </label>
              <input
                type="text"
                value={newUserData.username}
                onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })}
                placeholder="e.g. anand.kumar"
                required
                className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                {t('password')} *
              </label>
              <input
                type="text"
                value={newUserData.password}
                onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                placeholder="e.g. Demo@123"
                required
                className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                {t('role')} *
              </label>
              <select
                value={newUserData.role}
                onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none"
              >
                <option value="citizen">Citizen Resident</option>
                <option value="authority">Ward / Panchayat Authority</option>
                <option value="admin">Platform Administrator</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                {t('accountStatus')}
              </label>
              <select
                value={newUserData.status}
                onChange={(e) => setNewUserData({ ...newUserData, status: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none"
              >
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              {t('wardOrDept')}
            </label>
            <input
              type="text"
              value={newUserData.ward}
              onChange={(e) => setNewUserData({ ...newUserData, ward: e.target.value, jurisdiction: e.target.value })}
              placeholder="e.g. Ward 3 (Ganga Nagar) or Rampur GP"
              className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                value={newUserData.mobile}
                onChange={(e) => setNewUserData({ ...newUserData, mobile: e.target.value })}
                placeholder="e.g. 98111 22233"
                className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={newUserData.email}
                onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                placeholder="e.g. user@loksetu.gov.in"
                className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-4 border-t border-outline-variant/30">
            <button
              type="button"
              onClick={() => setAddUserModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-outline-variant text-xs font-semibold hover:bg-surface-container"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm cursor-pointer"
            >
              {t('saveUser')}
            </button>
          </div>
        </form>
      </Modal>

      {/* EDIT USER MODAL */}
      {editingUser && (
        <Modal
          isOpen={editUserModalOpen}
          onClose={() => setEditUserModalOpen(false)}
          title={t('editUser')}
          subtitle={`Editing profile for: ${editingUser.name} (${editingUser.username})`}
        >
          <form onSubmit={handleSaveEditUser} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                {t('fullName')}
              </label>
              <input
                type="text"
                value={editingUser.name}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                required
                className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  {t('role')}
                </label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none"
                >
                  <option value="citizen">Citizen Resident</option>
                  <option value="authority">Ward / Panchayat Authority</option>
                  <option value="admin">Platform Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  {t('accountStatus')}
                </label>
                <select
                  value={editingUser.status || 'Active'}
                  onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                {t('wardOrDept')}
              </label>
              <input
                type="text"
                value={editingUser.ward || ''}
                onChange={(e) => setEditingUser({ ...editingUser, ward: e.target.value, jurisdiction: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary outline-none"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-4 border-t border-outline-variant/30">
              <button
                type="button"
                onClick={() => setEditUserModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-outline-variant text-xs font-semibold hover:bg-surface-container"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* DELETE CONFIRMATION MODAL (Issue 4 Safeguards) */}
      {userToDelete && (
        <Modal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title={t('confirmDelete')}
          subtitle={`Account: ${userToDelete.name} (${userToDelete.username})`}
        >
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-error-container/40 border border-error/30 text-body-sm space-y-1.5">
              <p className="font-semibold text-on-error-container">
                {t('deleteWarningText')}
              </p>
              <div className="text-xs text-outline font-mono">
                Role: <strong>{userToDelete.role}</strong> · ID: <strong>{userToDelete.id}</strong>
              </div>
            </div>

            {/* Safeguard warnings */}
            {userToDelete.isProtected || userToDelete.username === 'admin' ? (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-amber-700">security</span>
                <span>{t('protectedAdminNotice')}</span>
              </div>
            ) : currentUser && userToDelete.id === currentUser.id ? (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-amber-700">warning</span>
                <span>{t('selfDeleteNotice')}</span>
              </div>
            ) : null}

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-outline-variant text-xs font-semibold hover:bg-surface-container"
              >
                {t('cancel')}
              </button>
              <button
                type="button"
                disabled={userToDelete.isProtected || userToDelete.username === 'admin' || (currentUser && userToDelete.id === currentUser.id)}
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-lg bg-error text-on-error text-xs font-semibold hover:bg-red-700 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {t('deleteUser')}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Reset Data Confirmation Modal */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="Reset Demo Database"
        subtitle="Restore initial mock grievances and users"
      >
        <div className="space-y-4">
          <p className="text-body-sm text-on-surface-variant leading-relaxed">
            This will clear any newly submitted complaints or custom users from LocalStorage and restore the default state with seed complaints and seed users (`citizen`, `pradhan`, `engineer`, `admin`).
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setResetModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-outline-variant text-on-surface text-label-md"
            >
              Cancel
            </button>
            <button
              onClick={handleResetData}
              className="px-5 py-2 rounded-lg bg-error text-on-error text-label-md font-semibold hover:bg-red-700 cursor-pointer"
            >
              Confirm Reset
            </button>
          </div>
        </div>
      </Modal>

      <Toast message={toastMsg} onClose={() => setToastMsg('')} />
    </div>
  );
}
