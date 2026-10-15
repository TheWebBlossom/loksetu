import React from 'react';

/**
 * Placeholder logo component as specified in design requirements.
 * Avoids inventing an official government emblem; uses a clean, geometric civic-tech crest.
 */
export default function LogoPlaceholder({ size = 'default', showSubtitle = true, inverted = false }) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  const textColor = inverted ? 'text-white' : 'text-forest-900';
  const subtextColor = inverted ? 'text-forest-200' : 'text-civic-text-secondary';
  const tagColor = inverted ? 'bg-forest-800/80 text-teal-300 border-forest-700' : 'bg-forest-100 text-forest-800 border-forest-200';

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Civic Crest Geometric Placeholder */}
      <div 
        className={`relative flex items-center justify-center rounded-xl transition-transform ${
          isLarge ? 'w-12 h-12' : isSmall ? 'w-8 h-8' : 'w-10 h-10'
        } ${inverted ? 'bg-gradient-to-br from-teal-500 to-forest-800 text-white shadow-md' : 'bg-gradient-to-br from-forest-800 to-forest-900 text-white shadow-subtle'}`}
        title="LokSetu Logo Placeholder (Template Design)"
      >
        {/* Abstract Bridge & Pillar Civic Symbol */}
        <svg 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className={`${isLarge ? 'w-7 h-7' : isSmall ? 'w-5 h-5' : 'w-6 h-6'} text-white`}
        >
          {/* Bridge Arch */}
          <path 
            d="M5 23C7.5 17 11.5 14 16 14C20.5 14 24.5 17 27 23" 
            stroke="currentColor" 
            strokeWidth="2.4" 
            strokeLinecap="round" 
          />
          {/* Horizontal Pathway / Setu Deck */}
          <path 
            d="M4 11H28" 
            stroke="#14B8A6" 
            strokeWidth="2.4" 
            strokeLinecap="round" 
          />
          {/* Vertical Pillars */}
          <path d="M10 11V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 8V14" stroke="#5EEAD4" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M22 11V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Citizen Assembly Base Arc */}
          <circle cx="16" cy="6" r="2" fill="#5EEAD4" />
        </svg>

        {/* Small "PH" or "Demo" watermark dot */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-teal-400 border-2 border-white ring-1 ring-forest-900"></span>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className={`font-extrabold tracking-tight font-sans ${textColor} ${
            isLarge ? 'text-2xl leading-none' : isSmall ? 'text-lg leading-none' : 'text-xl leading-none'
          }`}>
            LokSetu
          </span>
          <span className="text-xs font-semibold px-1.5 py-0.5 rounded border text-[10px] tracking-wide uppercase font-sans border-teal-200 bg-teal-50 text-teal-800">
            UI Template
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`text-[11px] font-medium tracking-wide font-sans ${subtextColor}`}>
              लोकसेतु • Ward Governance
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
