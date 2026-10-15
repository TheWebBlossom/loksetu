import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="py-20 text-center max-w-md mx-auto px-4 space-y-4">
      <div className="w-16 h-16 rounded-full bg-surface-container text-primary flex items-center justify-center mx-auto">
        <span className="material-symbols-outlined text-[36px]">travel_explore</span>
      </div>
      <h1 className="text-display-lg-mobile font-bold text-on-surface">404 - Page Not Found</h1>
      <p className="text-body-md text-on-surface-variant leading-relaxed">
        The requested public governance page or docket token does not exist on this node.
      </p>
      <div className="pt-2 flex justify-center gap-3">
        <Link
          to="/"
          className="px-5 py-2.5 rounded-lg bg-primary text-on-primary text-label-md font-semibold hover:bg-secondary transition-colors"
        >
          Return to Portal Home
        </Link>
        <Link
          to="/public/complaints"
          className="px-5 py-2.5 rounded-lg border border-outline-variant text-on-surface text-label-md font-semibold hover:bg-surface-container transition-colors"
        >
          Browse Complaints
        </Link>
      </div>
    </div>
  );
}
