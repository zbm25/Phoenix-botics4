import React from "react";

interface LogoProps {
  className?: string; // Optional custom class
  iconSize?: number;  // Optional icon height/width index
  variant?: "light" | "dark"; // Font color theme
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  iconSize = 40,
  variant = "light"
}) => {
  return (
    <div id="phoenix-logo" className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Phoenix Swirling Flame Icon (SVG) */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform transition-transform duration-500 hover:rotate-45"
      >
        <defs>
          <linearGradient id="phoenix-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" /> {/* Brand Gold */}
            <stop offset="50%" stopColor="#ea580c" /> {/* Intense Orange */}
            <stop offset="100%" stopColor="#b91c1c" /> {/* Ember Red */}
          </linearGradient>
          <filter id="subtle-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* 12 Swirling overlapping feather blades forming the phoenix crown vortex */}
        <g filter="url(#subtle-shadow)">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 365) / 12;
            return (
              <path
                key={i}
                d="M 50 12 C 65 12, 75 22, 68 38 C 64 47, 54 50, 48 45 C 44 41, 46 32, 53 28 C 58 25, 60 18, 50 18 C 38 18, 30 28, 35 40 C 31 35, 30 27, 34 20 C 38 13, 44 12, 50 12 Z"
                fill="url(#phoenix-gold-gradient)"
                transform={`rotate(${angle} 50 50)`}
                opacity={0.88 + (i % 3) * 0.05}
              />
            );
          })}
        </g>
        {/* Glowing energetic central negative space */}
        <circle cx="50" cy="50" r="10" fill="transparent" />
      </svg>

      {/* Corporate Modern Typos */}
      <div className="flex flex-col tracking-wider font-display leading-[1.1]">
        <span
          className={`font-extrabold text-xl font-display ${
            variant === "light" ? "text-white" : "text-slate-900"
          }`}
        >
          PHOENIX
        </span>
        <span
          className={`font-semibold text-xs tracking-[0.25em] ${
            variant === "light" ? "text-brand-primary" : "text-brand-primary"
          }`}
        >
          BOTICS
        </span>
      </div>
    </div>
  );
};
