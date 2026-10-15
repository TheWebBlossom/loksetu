import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';

export default function AuthorityLayout() {
  const { user } = useAuth();
  const { t, isHindi } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Navbar />

      {/* Authority Context Banner */}
      <section className="bg-surface-container-high border-b border-outline-variant/40 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-on-surface">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">account_circle</span>
              <span className="font-label-md text-label-md">
                {isHindi ? 'वर्तमान लॉगिन' : 'Logged in as'}: <strong className="font-semibold text-primary">{user?.name || 'Authority'}</strong> ({user?.designation || 'Gram Pradhan'})
              </span>
            </div>
            <span className="text-outline-variant hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              <span>{isHindi ? 'अधिकार क्षेत्र' : 'Jurisdiction'}: <span className="font-semibold text-on-surface">{user?.jurisdiction || 'Rampur Gram Panchayat (Wards 1–7)'}</span></span>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[14px]">shield</span>
              <span>{isHindi ? 'नामित स्थानीय निवारण प्राधिकारी' : 'Designated Local Redressal Authority'}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-on-error-container bg-error-container/60 px-2.5 py-1 rounded border border-error/20 font-label-sm text-label-sm self-start md:self-auto">
            <span className="material-symbols-outlined text-[16px] text-error">lock</span>
            <span>{isHindi ? 'सुरक्षा सूचना: अधिकार क्षेत्र तक सीमित पहुंच' : 'Security notice: Access restricted to authorized jurisdiction'}</span>
          </div>
        </div>
      </section>

      {/* Main Shell */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6 items-start">
        <Sidebar role="authority" />
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
