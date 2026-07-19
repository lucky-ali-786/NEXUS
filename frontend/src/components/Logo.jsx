import React from 'react'

function Logo({ width = '64px', height, className = '' }) {
  const h = height || width
  return (
    <svg
      width={width}
      height={h}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Blogger logo"
      className={className}
    >
      <title>Blogger</title>
      <defs>
        <linearGradient id="blogGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="50%" stopColor="#FF8E53" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <filter id="blogShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.25"/>
        </filter>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="#F0F4FF" opacity="0.8"/>
      <circle cx="50" cy="50" r="46" fill="url(#blogGradient)" opacity="0.1"/>

      {/* Main book/page icon */}
      <g filter="url(#blogShadow)">
        {/* Left page */}
        <rect x="28" y="25" width="18" height="50" rx="2" fill="url(#blogGradient)" opacity="0.9"/>
        
        {/* Right page */}
        <rect x="54" y="25" width="18" height="50" rx="2" fill="url(#accentGradient)" opacity="0.9"/>

        {/* Spine */}
        <rect x="46" y="25" width="8" height="50" rx="1" fill="#333" opacity="0.3"/>
      </g>

      {/* Lines on left page */}
      <g stroke="white" strokeWidth="1.5" opacity="0.7" strokeLinecap="round">
        <line x1="32" y1="32" x2="42" y2="32" />
        <line x1="32" y1="38" x2="42" y2="38" />
        <line x1="32" y1="44" x2="40" y2="44" />
        <line x1="32" y1="50" x2="42" y2="50" />
        <line x1="32" y1="56" x2="40" y2="56" />
        <line x1="32" y1="62" x2="42" y2="62" />
      </g>

      {/* Lines on right page */}
      <g stroke="white" strokeWidth="1.5" opacity="0.7" strokeLinecap="round">
        <line x1="58" y1="32" x2="68" y2="32" />
        <line x1="58" y1="38" x2="68" y2="38" />
        <line x1="58" y1="44" x2="66" y2="44" />
        <line x1="58" y1="50" x2="68" y2="50" />
        <line x1="58" y1="56" x2="66" y2="56" />
        <line x1="58" y1="62" x2="68" y2="62" />
      </g>

      {/* Accent dot with animation */}
      <circle cx="72" cy="28" r="3.5" fill="url(#accentGradient)" filter="url(#glow)">
        <animate
          attributeName="r"
          values="3.5;5;3.5"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Pen/pencil accent */}
      <g opacity="0.8">
        <rect x="76" y="68" width="2" height="8" rx="1" fill="url(#accentGradient)"/>
        <circle cx="77" cy="76" r="1.5" fill="url(#blogGradient)"/>
      </g>

    </svg>
  )
}

export default Logo