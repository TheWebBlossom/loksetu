import React from 'react';
import { useTranslation } from '../context/LanguageContext';

export default function StatusBadge({ status, size = 'default', showDot = true }) {
  const { isHindi } = useTranslation();
  const norm = (status || '').toLowerCase().trim();

  let config = {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-200',
    dotColor: 'bg-slate-500',
    label: status || 'Submitted',
    icon: 'schedule'
  };

  if (norm.includes('review') || norm.includes('triage') || norm.includes('pending')) {
    config = {
      bg: 'bg-[#FEF3C7]',
      text: 'text-[#B45309]',
      border: 'border-[#FDE68A]',
      dotColor: 'bg-[#D97706]',
      label: isHindi ? 'समीक्षाधीन' : 'Under Review',
      icon: 'hourglass_top'
    };
  } else if (norm.includes('progress') || norm.includes('field') || norm.includes('active')) {
    config = {
      bg: 'bg-[#EFF6FF]',
      text: 'text-[#1D4ED8]',
      border: 'border-[#BFDBFE]',
      dotColor: 'bg-[#2563EB]',
      label: isHindi ? 'प्रगति पर' : 'In Progress',
      icon: 'engineering'
    };
  } else if (norm.includes('resolve') || norm.includes('closed') || norm.includes('verified')) {
    config = {
      bg: 'bg-[#DCFCE7]',
      text: 'text-[#15803D]',
      border: 'border-[#BBF7D0]',
      dotColor: 'bg-[#16A34A]',
      label: isHindi ? 'निस्तारित' : 'Resolved',
      icon: 'check_circle'
    };
  } else if (norm.includes('escalat') || norm.includes('reject') || norm.includes('critical')) {
    config = {
      bg: 'bg-[#FFE4E6]',
      text: 'text-[#BE123C]',
      border: 'border-[#FECDD3]',
      dotColor: 'bg-[#E11D48]',
      label: isHindi ? 'उच्च स्तर प्रेषित' : 'Escalated',
      icon: 'warning'
    };
  } else {
    config.label = isHindi ? 'दर्ज किया गया' : (status || 'Submitted');
  }

  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-[10px] leading-tight'
    : 'px-2.5 py-1 text-label-sm font-label-sm';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${config.bg} ${config.text} ${config.border} ${sizeClasses}`}>
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor} ${norm.includes('progress') ? 'animate-pulse' : ''}`} />
      )}
      <span className="material-symbols-outlined text-[14px] leading-none">{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
}
