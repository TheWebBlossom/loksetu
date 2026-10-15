import React from 'react';

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon = 'analytics', 
  trend, 
  trendPositive = true,
  variant = 'default',
  badgeText
}) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-sm flex flex-col justify-between hover:bg-surface-container-low/50 transition-all duration-150">
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-label-md font-label-md text-on-surface-variant font-medium line-clamp-1">
          {title}
        </span>
        <div className="p-2 rounded-lg bg-surface-container text-primary shrink-0">
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
      </div>

      <div>
        <div className="text-headline-lg font-headline-lg text-primary tracking-tight font-bold">
          {value}
        </div>
        {subtitle && (
          <p className="text-body-sm font-body-sm text-on-surface-variant mt-1 line-clamp-1">
            {subtitle}
          </p>
        )}
      </div>

      {(trend || badgeText) && (
        <div className="mt-3 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-label-sm font-label-sm">
          {trend && (
            <span className={`inline-flex items-center gap-1 font-semibold ${trendPositive ? 'text-secondary' : 'text-error'}`}>
              <span className="material-symbols-outlined text-[14px]">
                {trendPositive ? 'trending_up' : 'trending_down'}
              </span>
              <span>{trend}</span>
            </span>
          )}
          {badgeText && (
            <span className="text-outline font-medium">
              {badgeText}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
