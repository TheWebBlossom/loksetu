import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { useTranslation } from '../context/LanguageContext';

export default function AdminLayout() {
  const { t, isHindi } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Navbar />

      {/* State Node Sub-Bar */}
      <section className="bg-surface-container-high border-b border-outline-variant/30 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-label-sm font-label-sm text-on-surface-variant gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="font-semibold text-on-surface">
              {isHindi ? "मंच प्रशासनिक कंसोल" : "Platform Administration Console"}
            </span>
            <span className="text-outline">•</span>
            <span className="font-mono text-[11px] text-primary">State Node: UP-NIC Secure Rail-01 (FIPS 140-2)</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="text-secondary font-bold">● {isHindi ? "सिस्टम स्थिति" : "System Health"}: 99.98% Operational</span>
            <span className="text-outline">|</span>
            <span>{isHindi ? "सक्रिय सत्र" : "Active Sessions"}: 18,420</span>
          </div>
        </div>
      </section>

      {/* Main Shell */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6 items-start">
        <Sidebar role="admin" />
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
