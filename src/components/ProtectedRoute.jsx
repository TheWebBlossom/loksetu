import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';

export default function ProtectedRoute({ allowedRoles = [], children }) {
  const { user, isAuthenticated, currentRole, promptRoleSwitch } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // If unauthenticated, redirect to login page
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role is not authorized for this route
  if (allowedRoles.length > 0 && !allowedRoles.includes(currentRole)) {
    const handleSwitchToRequiredRole = () => {
      promptRoleSwitch(allowedRoles[0], () => {
        // Will be redirected
      });
    };

    const handleReturnToMyDashboard = () => {
      if (currentRole === 'authority') navigate('/authority/dashboard');
      else if (currentRole === 'admin') navigate('/admin/dashboard');
      else navigate('/citizen/dashboard');
    };

    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-8 shadow-sm text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-error-container text-on-error-container mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-[36px] text-error">lock_person</span>
          </div>
          <div>
            <h2 className="text-headline-sm font-bold text-on-surface">Access Restricted</h2>
            <p className="text-body-sm text-on-surface-variant mt-1.5">
              This area requires <strong>{allowedRoles.join(' / ')}</strong> authorization. You are currently logged in as a <strong>{user.roleLabel || currentRole}</strong>.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleSwitchToRequiredRole}
              className="px-4 py-2.5 rounded-lg bg-primary text-on-primary font-semibold text-label-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">vpn_key</span>
              <span>Authenticate for Role</span>
            </button>
            <button
              onClick={handleReturnToMyDashboard}
              className="px-4 py-2.5 rounded-lg border border-outline-variant text-on-surface font-semibold text-label-md hover:bg-surface-container transition-colors"
            >
              Go to My Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
