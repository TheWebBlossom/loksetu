import React from 'react';

export default function EmptyState({ 
  icon = 'search_off', 
  title = "No Grievances Found", 
  description = "No items match your active filters. Try broadening your search or resetting categories.",
  actionText,
  onAction
}) {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-10 text-center max-w-md mx-auto my-6 space-y-3 shadow-sm">
      <div className="w-14 h-14 rounded-full bg-surface-container text-outline flex items-center justify-center mx-auto">
        <span className="material-symbols-outlined text-[28px]">{icon}</span>
      </div>
      <h3 className="font-title-md text-title-md font-bold text-on-surface">
        {title}
      </h3>
      <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <div className="pt-2">
          <button
            onClick={onAction}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-sm font-label-sm font-semibold hover:bg-secondary transition-colors"
          >
            {actionText}
          </button>
        </div>
      )}
    </div>
  );
}
