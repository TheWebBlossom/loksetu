import React from 'react';

export default function Brandmark({ 
  className = "h-10 w-auto", 
  symbolOnly = false,
  inverted = false 
}) {
  const textColor = inverted ? '#FFFFFF' : '#202B26';
  const subtextColor = inverted ? '#EAF7EF' : '#69766F';
  const primaryBrand = '#176B45';

  if (symbolOnly) {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 52 52" 
        className={className} 
        fill="none"
      >
        <rect x="4" y="4" width="44" height="44" rx="12" fill={primaryBrand} />
        <path d="M12 34 C 16 18, 36 18, 40 34" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M18 34 C 21 24, 31 24, 34 34" stroke="#239B68" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="26" cy="16" r="4.5" fill="#F4B942" />
        <line x1="26" y1="34" x2="26" y2="40" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="18" y1="34" x2="18" y2="39" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <line x1="34" y1="34" x2="34" y2="39" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 240 60" 
      className={className} 
      fill="none"
    >
      {/* LokSetu Civic Bridge Emblem */}
      <rect x="4" y="8" width="44" height="44" rx="12" fill={primaryBrand} />
      <path d="M12 38 C 16 22, 36 22, 40 38" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M18 38 C 21 28, 31 28, 34 38" stroke="#239B68" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="26" cy="20" r="4.5" fill="#F4B942" />
      <line x1="26" y1="38" x2="26" y2="44" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="18" y1="38" x2="18" y2="43" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <line x1="34" y1="38" x2="34" y2="43" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      
      {/* Typography */}
      <text x="58" y="32" fontFamily="Inter, -apple-system, sans-serif" fontSize="22" fontWeight="800" fill={textColor} letterSpacing="-0.5">
        Lok<tspan fill={primaryBrand}>Setu</tspan>
      </text>
      <text x="59" y="45" fontFamily="Inter, -apple-system, sans-serif" fontSize="9.5" fontWeight="600" fill={subtextColor} letterSpacing="1.2">
        CIVIC GOVERNANCE PORTAL
      </text>
    </svg>
  );
}
