import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';
import Brandmark from '../components/Brandmark';
import { DEMO_ACCOUNTS_INFO } from '../data/demoAuth';

export default function LoginPage() {
  const { login, isAuthenticated, currentRole } = useAuth();
  const { t, toggleLanguage, isHindi } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('citizen');
  const [password, setPassword] = useState('Citizen@123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || null;

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      const result = login(username, password);
      setLoading(false);

      if (!result.success) {
        setErrorMsg(result.error || t('invalidCredentialsMsg'));
        return;
      }

      const loggedUser = result.user;
      // Redirect based on role or intended destination
      if (from) {
        navigate(from, { replace: true });
      } else if (loggedUser.role === 'authority') {
        navigate('/authority/dashboard', { replace: true });
      } else if (loggedUser.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/citizen/dashboard', { replace: true });
      }
    }, 400);
  };

  const handleQuickFill = (account) => {
    setUsername(account.username);
    setPassword(account.password);
    setErrorMsg('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Top Breadcrumb & Language Switcher */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-outline-variant/20">
        <div className="flex items-center gap-2 text-label-md font-label-md text-outline">
          <span className="material-symbols-outlined text-[18px]">account_balance</span>
          <Link to="/" className="hover:text-primary">{t('brandName')} Civic Portal</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-semibold">{t('signIn')}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-surface-container border border-outline-variant/40 text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">translate</span>
            <span>{t('langToggle')}</span>
          </button>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-primary/10 text-primary border border-primary/20">
            <span className="material-symbols-outlined text-[14px]">verified_user</span>
            <span>256-Bit SSL Demo Sandbox</span>
          </span>
        </div>
      </div>

      {/* Split Bento Card Structure */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-primary/15 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* LEFT COLUMN: Civic Trust Hero Panel */}
        <section className="lg:col-span-5 bg-gradient-to-br from-[#005131] via-[#176B45] to-[#104F33] text-on-primary p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none text-on-primary">
            <span className="material-symbols-outlined text-[260px]">account_balance</span>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 text-label-sm font-label-sm">
              <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">assured_workload</span>
              <span className="tracking-wide">Citizens' Rights &amp; Redressal Charter</span>
            </div>

            <div className="mb-4">
              <Brandmark className="h-10 w-auto brightness-0 invert" />
            </div>

            <h1 className="text-headline-md sm:text-headline-lg font-bold text-on-primary mb-3 leading-snug">
              {isHindi ? 'लोकतांत्रिक शासन, पारदर्शी व उत्तरदायी' : 'Democracy at Your Fingertips. Transparent & Accountable.'}
            </h1>
            <p className="text-white/80 text-body-sm sm:text-body-md mb-6 leading-relaxed">
              {isHindi 
                ? 'स्थानीय शासन में सीधे भाग लेने, नागरिक समस्याओं को दर्ज करने और ग्राम पंचायत के कार्यों की लाइव निगरानी के लिए लॉगिन करें।'
                : 'Sign in with your verified demo identity to inspect ward dockets, dispatch repair crews, or monitor Gram Panchayat public works in real time.'}
            </p>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="material-symbols-outlined text-[20px] text-secondary-fixed shrink-0 mt-0.5">hub</span>
                <div>
                  <h2 className="text-label-md font-semibold text-white">Direct Gram Panchayat Redressal</h2>
                  <p className="text-[12px] text-white/70">Automatic statutory routing to designated ward authority and junior engineers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="material-symbols-outlined text-[20px] text-secondary-fixed shrink-0 mt-0.5">photo_camera</span>
                <div>
                  <h2 className="text-label-md font-semibold text-white">Verifiable Geo-tagged Proofs</h2>
                  <p className="text-[12px] text-white/70">Complaints require photographic evidence before closure approval.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="material-symbols-outlined text-[20px] text-secondary-fixed shrink-0 mt-0.5">admin_panel_settings</span>
                <div>
                  <h2 className="text-label-md font-semibold text-white">Role-Based Access Governance</h2>
                  <p className="text-[12px] text-white/70">Rigorous role verification protecting citizen privacy and statutory actions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/15 flex items-center justify-between text-white/60 text-[11px] font-mono">
            <span>UP-NIC State Rail Node</span>
            <span>Ver. 2.4.0 (TLS 1.3)</span>
          </div>
        </section>

        {/* RIGHT COLUMN: Authentication Form & Demo Accounts */}
        <section className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-surface-container-lowest">
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary mb-2">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                <span>Demo Authentication Portal</span>
              </div>
              <h2 className="text-headline-sm font-bold text-on-surface">
                {t('loginTitle')}
              </h2>
              <p className="text-body-sm text-on-surface-variant mt-1">
                {t('loginSubtitle')}
              </p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-error-container text-on-error-container text-xs flex items-center gap-2.5 border border-error/30 animate-in fade-in">
                <span className="material-symbols-outlined text-[18px] text-error shrink-0">error</span>
                <p className="font-semibold leading-tight">{errorMsg}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1.5">
                  {isHindi ? 'उपयोगकर्ता पहचान (यूज़रनेम / मोबाइल / ईमेल)' : 'Demo User ID / Mobile / Username'}
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-outline">
                    badge
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. citizen, pradhan, or admin"
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-label-md font-semibold text-on-surface">
                    {t('password')}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                    <span>{showPassword ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-outline">
                    key
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-lg bg-primary text-on-primary font-semibold text-label-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                    <span>{t('verifying')}</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">login</span>
                    <span>{t('signInButton')}</span>
                  </>
                )}
              </button>
            </form>

            {/* DEMO ACCOUNTS CHEATSHEET (Required by prompt) */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-outline flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-primary">key</span>
                  {t('demoCredentialsCheatsheet')}
                </span>
                <span className="text-[10px] text-outline">1-Click Auto-Fill</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DEMO_ACCOUNTS_INFO.map(account => (
                  <button
                    key={account.username}
                    type="button"
                    onClick={() => handleQuickFill(account)}
                    className="p-3 text-left rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 transition-all hover:border-primary/40 group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-on-surface group-hover:text-primary transition-colors">
                        {account.roleName}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-bold">
                        {account.role}
                      </span>
                    </div>
                    <div className="text-[11px] text-on-surface-variant font-medium mt-1 truncate">
                      {account.name}
                    </div>
                    <div className="text-[10px] font-mono text-outline mt-1 flex items-center justify-between">
                      <span>ID: <strong className="text-on-surface">{account.username}</strong></span>
                      <span>Pass: <strong className="text-on-surface">{account.password}</strong></span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-outline-variant/30 flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
            <span>{t('needAccount')}</span>
            <Link to="/register" className="font-bold text-primary hover:underline">
              {t('registerNow')}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
