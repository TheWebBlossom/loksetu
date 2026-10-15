import React from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const isSuccess = type === 'success';
  const isError = type === 'error';
  const isWarning = type === 'warning';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-modal max-w-md ${
        isSuccess 
          ? 'bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]' 
          : isError 
          ? 'bg-[#FFE4E6] text-[#BE123C] border-[#FECDD3]'
          : 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]'
      }`}>
        <span className="material-symbols-outlined text-[20px]">
          {isSuccess ? 'check_circle' : isError ? 'error' : 'info'}
        </span>
        <span className="text-body-sm font-body-sm font-semibold flex-1">
          {message}
        </span>
        {onClose && (
          <button onClick={onClose} className="p-1 hover:opacity-75 transition-opacity">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
      </div>
    </div>
  );
}
