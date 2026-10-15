import React from 'react';
import { Sparkles, Info } from 'lucide-react';

export default function DemoBadge({ text = "Sample Demo Data", variant = "subtle" }) {
  if (variant === "prominent") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
        <span>{text}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
      <Info className="w-3 h-3 text-gray-500" />
      <span>{text}</span>
    </span>
  );
}
