import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Brandmark from './Brandmark';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';

export default function Navbar() {
  const { user, currentRole, promptRoleSwitch, logout, isAuthenticated } = useAuth();
  const { t, toggleLanguage, isHindi } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const roleMenuRef = useRef(null);
  const notifMenuRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (roleMenuRef.current && !roleMenuRef.current.contains(event.target)) {
        setRoleDropdownOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSelect = (roleKey) => {
    setRoleDropdownOpen(false);
    if (roleKey === currentRole) {
      // Already this role, just navigate
      if (roleKey === 'citizen') navigate('/citizen/dashboard');
      else if (roleKey === 'authority') navigate('/authority/dashboard');
      else if (roleKey === 'admin') navigate('/admin/dashboard');
      return;
    }

    // Role switch requires authentication!
    promptRoleSwitch(roleKey, (verifiedUser) => {
      if (roleKey === 'citizen') navigate('/citizen/dashboard');
      else if (roleKey === 'authority') navigate('/authority/dashboard');
      else if (roleKey === 'admin') navigate('/admin/dashboard');
    });
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/login');
  };

  // Mock live notifications
  const sampleNotifications = [
    {
      id: 'notif_1',
      title: isHindi ? 'शिकायत LOK-2025-UP-8841 अद्यतन' : 'Docket LOK-2025-UP-8841 Update',
      desc: isHindi ? 'जल निगम फील्ड टीम को कार्य आदेश जारी किया गया।' : 'Field maintenance crew dispatched by Gram Pradhan.',
      time: '10m ago',
      unread: true,
      icon: 'engineering',
      type: 'primary'
    },
    {
      id: 'notif_2',
      title: isHindi ? 'SLA चेतावनी: वार्ड 4' : 'SLA Warning: Ward 4',
      desc: isHindi ? 'नाली सफाई कार्य आदेश में 4 घंटे शेष हैं।' : '4 hours remaining before auto-escalation to BDO.',
      time: '1h ago',
      unread: true,
      icon: 'timer',
      type: 'error'
    },
    {
      id: 'notif_3',
      title: isHindi ? 'निस्तारण प्रमाण सत्यापित' : 'Resolution Proof Verified',
      desc: isHindi ? 'स्ट्रीट लाइट मरम्मत कार्य नागरिक OTP द्वारा बंद हुआ।' : 'Streetlight replacement marked resolved with geo-tagged photo.',
      time: '3h ago',
      unread: false,
      icon: 'verified',
      type: 'secondary'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/30 shadow-xs">
      {/* Top Utility / Civic Apex Bar */}
      <aside className="bg-surface-container-high border-b border-outline-variant/30 text-on-surface-variant text-label-md font-label-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-on-surface font-semibold text-xs">
              <span className="material-symbols-outlined text-primary text-[18px]">account_balance</span>
              <span>{t('govtInitiative')}</span>
            </span>
            <span className="hidden sm:inline-block w-px h-3.5 bg-outline-variant/50"></span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-outline">
              <span className="material-symbols-outlined text-[14px]">call</span>
              {t('helpline')}: <strong>1800-LOK-SETU</strong>
            </span>
          </div>

          {/* Quick Demo Persona Switcher & Language Switcher */}
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] text-outline hidden md:inline">{t('demoPersona')}:</span>
            
            {/* Persona Switcher with credential modal integration */}
            <div className="relative" ref={roleMenuRef}>
              <button
                type="button"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-container border border-outline-variant/50 text-primary hover:bg-surface-container-high transition-colors"
                title="Switch persona (Requires demo password)"
              >
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="max-w-[130px] truncate">{user?.roleLabel || t('verifiedCitizen')}</span>
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-72 bg-surface-container-lowest rounded-xl shadow-modal border border-outline-variant/30 py-2 z-50 text-left animate-in fade-in slide-in-from-top-1">
                  <div className="px-3.5 py-1.5 text-[10px] uppercase font-bold text-outline tracking-wider border-b border-outline-variant/20 mb-1 flex items-center justify-between">
                    <span>{t('selectTestPersona')}</span>
                    <span className="text-primary font-mono text-[9px] flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[11px]">lock</span>
                      Auth Protected
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleRoleSelect('citizen')}
                    className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between hover:bg-surface-container-low transition-colors ${
                      currentRole === 'citizen' ? 'font-bold text-primary bg-primary/5' : 'text-on-surface'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{t('verifiedCitizen')}</div>
                      <div className="text-[11px] text-outline">Rajesh Kumar (Ward 4) · citizen</div>
                    </div>
                    {currentRole === 'citizen' && <span className="material-symbols-outlined text-primary text-[16px]">check</span>}
                  </button>

                  <button
                    onClick={() => handleRoleSelect('authority')}
                    className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between hover:bg-surface-container-low transition-colors ${
                      currentRole === 'authority' ? 'font-bold text-primary bg-primary/5' : 'text-on-surface'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{t('panchayatAuthority')}</div>
                      <div className="text-[11px] text-outline">Shri Ram Singh (Pradhan) · pradhan</div>
                    </div>
                    {currentRole === 'authority' && <span className="material-symbols-outlined text-primary text-[16px]">check</span>}
                  </button>

                  <button
                    onClick={() => handleRoleSelect('admin')}
                    className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between hover:bg-surface-container-low transition-colors ${
                      currentRole === 'admin' ? 'font-bold text-primary bg-primary/5' : 'text-on-surface'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{t('platformAdmin')}</div>
                      <div className="text-[11px] text-outline">S. Roy (State Admin) · admin</div>
                    </div>
                    {currentRole === 'admin' && <span className="material-symbols-outlined text-primary text-[16px]">check</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Language Switcher Button (Issue 1) */}
            <button 
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-on-surface bg-surface-container-low hover:bg-surface-container border border-outline-variant/40 transition-colors cursor-pointer"
              title={isHindi ? "Switch to English" : "हिन्दी में बदलें"}
              aria-label="Toggle Language"
            >
              <span className="material-symbols-outlined text-[15px] text-primary">translate</span>
              <span className="font-medium">{t('langToggle')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brandmark */}
          <Link to="/" className="flex items-center focus:outline-none">
            <Brandmark className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5">
            <NavLink
              to="/public/complaints"
              className={({ isActive }) => `text-label-lg font-label-lg pb-1 transition-colors duration-150 ${
                isActive ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {t('navPublicComplaints')}
            </NavLink>
            <NavLink
              to="/citizen/dashboard"
              className={({ isActive }) => `text-label-lg font-label-lg pb-1 transition-colors duration-150 ${
                isActive ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {t('navCitizenPortal')}
            </NavLink>
            <NavLink
              to="/authority/dashboard"
              className={({ isActive }) => `text-label-lg font-label-lg pb-1 transition-colors duration-150 ${
                isActive ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {t('navAuthorityPortal')}
            </NavLink>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => `text-label-lg font-label-lg pb-1 transition-colors duration-150 ${
                isActive ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {t('navAdminPortal')}
            </NavLink>
            <NavLink
              to="/public/resolved"
              className={({ isActive }) => `text-label-lg font-label-lg pb-1 transition-colors duration-150 ${
                isActive ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {t('navResolvedProofs')}
            </NavLink>
          </nav>

          {/* Trailing Actions */}
          <div className="flex items-center gap-2.5">
            <Link
              to="/citizen/complaints"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-label-md font-label-md text-primary font-medium hover:bg-surface-container-low rounded-lg transition-colors border border-outline-variant/40"
            >
              <span className="material-symbols-outlined text-[18px]">travel_explore</span>
              <span>{t('trackStatus')}</span>
            </Link>

            <Link
              to="/submit-grievance"
              className="inline-flex items-center gap-1.5 bg-primary-container text-on-primary px-3.5 py-1.5 rounded-lg text-label-md font-label-md font-semibold shadow-sm hover:bg-primary transition-all duration-150 active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>{t('fileGrievance')}</span>
            </Link>

            {/* Notification Alert Icon (Issue 6 - Perfect Centering) */}
            <div className="relative" ref={notifMenuRef}>
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                title={t('notifications')}
                aria-label={t('notifications')}
              >
                <span className="material-symbols-outlined text-[20px] leading-none select-none">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface-container-lowest rounded-2xl shadow-modal border border-outline-variant/30 py-3 z-50 text-left animate-in fade-in slide-in-from-top-1">
                  <div className="px-4 pb-2 border-b border-outline-variant/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">notifications_active</span>
                      <span className="font-bold text-sm text-on-surface">{t('notifications')}</span>
                      <span className="px-1.5 py-0.2 rounded-full bg-primary/10 text-primary font-bold text-[10px]">2 New</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs text-primary hover:underline font-semibold"
                    >
                      {t('markAllRead')}
                    </button>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-outline-variant/10">
                    {sampleNotifications.map(n => (
                      <div key={n.id} className={`p-3.5 hover:bg-surface-container-low transition-colors flex gap-3 ${n.unread ? 'bg-primary/5' : ''}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          n.type === 'error' ? 'bg-error-container text-error' : n.type === 'secondary' ? 'bg-secondary-container text-secondary' : 'bg-primary/10 text-primary'
                        }`}>
                          <span className="material-symbols-outlined text-[18px]">{n.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <p className="text-xs font-bold text-on-surface truncate">{n.title}</p>
                            <span className="text-[10px] text-outline shrink-0">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-on-surface-variant line-clamp-2 mt-0.5">{n.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar / User Menu */}
            <div className="relative pl-1 border-l border-outline-variant/30" ref={userMenuRef}>
              {isAuthenticated && user ? (
                <>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-label-sm border border-outline-variant/50 hover:ring-2 hover:ring-primary/20 transition-all cursor-pointer"
                    title={`Logged in: ${user.name} (${user.role})`}
                  >
                    {user.initials || 'US'}
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-modal border border-outline-variant/30 py-2 z-50 text-left animate-in fade-in slide-in-from-top-1">
                      <div className="px-3.5 py-2 border-b border-outline-variant/20">
                        <p className="font-bold text-xs text-on-surface truncate">{user.name}</p>
                        <p className="text-[11px] text-outline truncate">{user.email || user.username}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                          {user.roleLabel || user.role}
                        </span>
                      </div>
                      <Link
                        to={currentRole === 'citizen' ? '/citizen/dashboard' : currentRole === 'authority' ? '/authority/dashboard' : '/admin/dashboard'}
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full px-3.5 py-2 text-xs flex items-center gap-2.5 text-on-surface hover:bg-surface-container-low transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px] text-primary">dashboard</span>
                        <span>{t('operationalOverview')}</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full px-3.5 py-2 text-xs flex items-center gap-2.5 text-error hover:bg-error-container/20 transition-colors border-t border-outline-variant/20 mt-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">logout</span>
                        <span>{t('logout')}</span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-primary border border-outline-variant/40 transition-colors"
                >
                  {t('signIn')}
                </Link>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-on-surface hover:bg-surface-container"
              aria-label="Open mobile navigation"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-outline-variant/30 bg-surface-container-lowest px-4 py-4 space-y-3 shadow-modal animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-body-md text-on-surface hover:bg-surface-container-low"
            >
              {t('navHome')}
            </NavLink>
            <NavLink
              to="/public/complaints"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-body-md text-on-surface hover:bg-surface-container-low"
            >
              {t('navPublicComplaints')}
            </NavLink>
            <NavLink
              to="/citizen/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-body-md text-on-surface hover:bg-surface-container-low"
            >
              {t('navCitizenPortal')}
            </NavLink>
            <NavLink
              to="/citizen/complaints"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-body-md text-on-surface hover:bg-surface-container-low"
            >
              {t('myComplaints')}
            </NavLink>
            <NavLink
              to="/public/resolved"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-body-md text-on-surface hover:bg-surface-container-low"
            >
              {t('navResolvedProofs')}
            </NavLink>
            <NavLink
              to="/authority/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-body-md text-on-surface hover:bg-surface-container-low"
            >
              {t('navAuthorityPortal')}
            </NavLink>
            <NavLink
              to="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-body-md text-on-surface hover:bg-surface-container-low"
            >
              {t('navAdminPortal')}
            </NavLink>
          </nav>

          <div className="pt-3 border-t border-outline-variant/20 flex flex-col gap-2">
            <Link
              to="/submit-grievance"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-primary text-on-primary font-semibold text-label-md"
            >
              {t('fileGrievance')}
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                toggleLanguage();
              }}
              className="w-full text-center py-2 rounded-lg border border-outline-variant text-on-surface font-semibold text-label-md flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">translate</span>
              <span>{isHindi ? 'Switch to English' : 'हिन्दी में बदलें'}</span>
            </button>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-center py-2 rounded-lg bg-error-container text-on-error-container font-semibold text-label-md"
              >
                {t('logout')}
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 rounded-lg border border-outline-variant text-on-surface font-semibold text-label-md"
              >
                {t('signIn')}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
