import React from 'react';

export default function ProgressTimeline({ steps = [] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:inset-y-2 before:left-[11px] before:w-0.5 before:bg-outline-variant/40">
      {steps.map((step, idx) => {
        const isCompleted = step.status === 'completed';
        const isInProgress = step.status === 'in-progress';
        const isPending = step.status === 'pending';

        return (
          <div key={idx} className="relative flex items-start gap-4">
            {/* Circle Node Indicator */}
            <div 
              className={`absolute -left-6 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-surface-container-lowest transition-all ${
                isCompleted 
                  ? 'bg-secondary text-on-secondary shadow-xs' 
                  : isInProgress
                  ? 'bg-primary text-on-primary ring-primary/20 animate-pulse'
                  : 'bg-surface-container-high text-outline border border-outline-variant'
              }`}
            >
              {isCompleted ? (
                <span className="material-symbols-outlined text-[14px]">check</span>
              ) : isInProgress ? (
                <span className="material-symbols-outlined text-[14px]">autorenew</span>
              ) : (
                <span>{idx + 1}</span>
              )}
            </div>

            {/* Step Card Details */}
            <div className={`flex-1 p-3.5 rounded-xl border transition-all ${
              isInProgress 
                ? 'bg-primary/5 border-primary/20 shadow-xs' 
                : 'bg-surface-container-lowest border-outline-variant/30'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`text-label-lg font-label-lg font-semibold ${
                  isInProgress ? 'text-primary font-bold' : isCompleted ? 'text-on-surface' : 'text-outline'
                }`}>
                  {step.step}
                </span>
                
                {step.date && (
                  <span className="text-label-sm font-label-sm text-outline font-mono">
                    {step.date}
                  </span>
                )}
              </div>

              {step.actor && (
                <div className="mt-1 flex items-center gap-1.5 text-label-sm font-label-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px] text-primary">person</span>
                  <span>{step.actor}</span>
                </div>
              )}

              {step.note && (
                <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant leading-relaxed bg-surface-container-low/60 p-2.5 rounded-lg border border-outline-variant/20">
                  {step.note}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
