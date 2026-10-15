import React from 'react';
import { Link } from 'react-router-dom';
import Brandmark from './Brandmark';

export default function Footer() {
  return (
    <footer className="bg-surface-container-high border-t border-outline-variant/30 text-on-surface-variant pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Emergency Ribbon */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-5 mb-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">call</span>
            </div>
            <div>
              <h4 className="font-bold text-on-surface text-label-lg font-label-lg">
                24x7 National Panchayati Raj Grievance Helpline
              </h4>
              <p className="text-body-sm font-body-sm text-outline">
                Toll-free across rural local bodies &amp; urban wards: <strong>1800-LOK-SETU (1800-565-7388)</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-label-sm font-label-sm bg-surface-container px-3 py-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span>Central Control Room Active</span>
            </span>
            <Link
              to="/public/complaints"
              className="px-4 py-1.5 rounded-lg bg-primary text-on-primary text-label-sm font-label-sm font-semibold hover:bg-secondary transition-colors"
            >
              Search Open Dockets
            </Link>
          </div>
        </div>

        {/* 4-Column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-outline-variant/20">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Brandmark className="h-10 w-auto" />
            <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed max-w-sm">
              LokSetu (लोकसेतु) is India's dedicated public grievance redressal architecture connecting citizens directly with their jurisdictional Gram Panchayat Pradhan and Ward Engineers under the 74th &amp; 73rd Constitutional Amendments.
            </p>
            <div className="flex items-center gap-2 text-label-sm font-label-sm text-outline">
              <span className="material-symbols-outlined text-primary text-[16px]">verified_user</span>
              <span>Digital India Certified Public Stack · ISO 27001 Certified</span>
            </div>
          </div>

          {/* Civic Services */}
          <div>
            <h5 className="font-bold text-label-md font-label-md text-on-surface uppercase tracking-wider mb-3">
              Civic Services
            </h5>
            <ul className="space-y-2 text-body-sm font-body-sm text-on-surface-variant">
              <li>
                <Link to="/public/complaints" className="hover:text-primary transition-colors">
                  Drinking Water Supply
                </Link>
              </li>
              <li>
                <Link to="/public/complaints" className="hover:text-primary transition-colors">
                  Rural Roadways &amp; PWD
                </Link>
              </li>
              <li>
                <Link to="/public/complaints" className="hover:text-primary transition-colors">
                  Panchayat Sanitation
                </Link>
              </li>
              <li>
                <Link to="/public/complaints" className="hover:text-primary transition-colors">
                  Street Lighting &amp; Power
                </Link>
              </li>
              <li>
                <Link to="/public/complaints" className="hover:text-primary transition-colors">
                  Stormwater Drains (Nallas)
                </Link>
              </li>
            </ul>
          </div>

          {/* Citizen Portals */}
          <div>
            <h5 className="font-bold text-label-md font-label-md text-on-surface uppercase tracking-wider mb-3">
              Citizen Portals
            </h5>
            <ul className="space-y-2 text-body-sm font-body-sm text-on-surface-variant">
              <li>
                <Link to="/submit-grievance" className="hover:text-primary transition-colors">
                  File a Grievance
                </Link>
              </li>
              <li>
                <Link to="/citizen/complaints" className="hover:text-primary transition-colors">
                  My Complaints &amp; Tracking
                </Link>
              </li>
              <li>
                <Link to="/public/resolved" className="hover:text-primary transition-colors">
                  Resolved Proofs Gallery
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-primary transition-colors">
                  Citizen Identification / Login
                </Link>
              </li>
              <li>
                <Link to="/authority/dashboard" className="hover:text-primary transition-colors">
                  Panchayat Authority Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div>
            <h5 className="font-bold text-label-md font-label-md text-on-surface uppercase tracking-wider mb-3">
              Trust &amp; Governance
            </h5>
            <ul className="space-y-2 text-body-sm font-body-sm text-on-surface-variant">
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  DPDP Act Privacy Standards
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  RTI Section 4 Disclosures
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  Citizen Charter Redressal SLAs
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  Ombudsman Escalation Matrix
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-label-sm font-label-sm text-outline">
          <p>© 2025–2026 LokSetu Civic Governance Initiative. Built for live public administration.</p>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-on-surface">Home</Link>
            <span>•</span>
            <Link to="/public/complaints" className="hover:text-on-surface">Directory</Link>
            <span>•</span>
            <Link to="/public/resolved" className="hover:text-on-surface">Evidence Proofs</Link>
            <span>•</span>
            <Link to="/admin/dashboard" className="hover:text-on-surface">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
