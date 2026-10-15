import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';
import { DEMO_ACCOUNTS_INFO } from '../data/demoAuth';

export default function RoleSwitchModal() {
  const { roleSwitchModalOpen, pendingTargetRole, cancelRoleSwitch, confirmRoleSwitch } = useAuth();
  const { t, isHindi } = useTranslation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // When modal opens or target changes, preset default demo credentials for easy testing
  useEffect(() => {
    if (roleSwitchModalOpen && pendingTargetRole) {
      setErrorMsg('');
      const defaultAccount = DEMO_ACCOUNTS_INFO.find(a => a.role === pendingTargetRole);
      if (defaultAccount) {
        setUsername(defaultAccount.username);
        setPassword(defaultAccount.password);
      } else {
        setUsername('');
        setPassword('');
      }
    }
  }, [roleSwitchModalOpen, pendingTargetRole]);

  if (!roleSwitchModalOpen) return null;

  const targetAccountInfo = DEMO_ACCOUNTS_INFO.find(a => a.role === pendingTargetRole) || {
    roleName: pendingTargetRole,
    description: 'Requires authorized personnel credentials'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      const result = confirmRoleSwitch(username, password);
      setLoading(false);
      if (!result.success) {
        setErrorMsg(result.error || t('invalidCredentialsMsg'));
      }
    }, 300);
  };

  const handleQuickFill = (acc) => {
    setUsername(acc.username);
    setPassword(acc.password);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-surface-container-lowest rounded-2xl shadow-modal max-w-lg w-full border border-outline-variant/40 overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Header */}
        <div className="p-5 bg-surface-container border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <span className="material-symbols-outlined text-[24px]">lock_reset</span>
            </div>
            <div>
              <h2 className="text-title-md font-bold text-on-surface">
                {t('roleSwitchTitle')}
              </h2>
              <p className="text-body-sm text-on-surface-variant">
                {t('roleSwitchSubtitle')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={cancelRoleSwitch}
            className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Target Persona Highlight */}
        <div className="mx-6 mt-5 p-3.5 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-[22px]">badge</span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-outline block">
                {t('targetRoleLabel')}
              </span>
              <span className="font-bold text-on-surface text-sm">
                {targetAccountInfo.roleName}
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-on-primary">
            {pendingTargetRole?.toUpperCase()}
          </span>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3.5 rounded-lg bg-error-container/80 text-on-error-container text-xs flex items-center gap-2.5 border border-error/30 animate-shake">
              <span className="material-symbols-outlined text-[18px] text-error shrink-0">error</span>
              <p className="font-medium leading-tight">{errorMsg}</p>
            </div>
          )}

          <div>
            <label className="block text-label-md font-semibold text-on-surface mb-1.5">
              {t('enterUsername')}
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-outline">
                account_circle
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. pradhan, admin, or citizen"
                required
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-label-md font-semibold text-on-surface">
                {t('enterPassword')}
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
                <span>{showPassword ? 'Hide' : 'Show'}</span>
              </button>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-outline">
                password
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
          </div>

          {/* Quick Demo Helper */}
          <div className="pt-2">
            <p className="text-[11px] font-bold text-outline uppercase tracking-wider mb-2">
              {t('quickFillDemoCredentials')}:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS_INFO.filter(a => a.role === pendingTargetRole).map(acc => (
                <button
                  key={acc.username}
                  type="button"
                  onClick={() => handleQuickFill(acc)}
                  className="p-2 text-left rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 transition-colors"
                >
                  <div className="font-semibold text-xs text-on-surface truncate">{acc.name}</div>
                  <div className="text-[10px] font-mono text-primary truncate">
                    ID: <strong>{acc.username}</strong>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={cancelRoleSwitch}
              className="px-4 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container text-label-md font-semibold transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-primary text-on-primary text-label-md font-semibold hover:bg-primary/90 transition-all shadow-sm flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                  <span>{t('verifying')}</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">key</span>
                  <span>{t('verifyAndProceed')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
