import React from 'react';
import { type AssessmentCategory, CATEGORIES, CATEGORY_ORDER } from '../../data/talentQuestions';

interface TalentRadarChartProps {
  scores: Record<AssessmentCategory, number>; // 0 - 100
  isDark?: boolean;
  maxWidth?: number;
  className?: string;
}

export const TalentRadarChart: React.FC<TalentRadarChartProps> = ({
  scores,
  isDark = true,
  maxWidth = 380,
  className = '',
}) => {
  const size = 380;
  const center = size / 2;
  const radius = 130;
  const levels = [25, 50, 75, 100];
  const numAxes = CATEGORY_ORDER.length; // 8

  // Helper untuk menghitung koordinat polar ke kartesius
  const getCoordinates = (index: number, valuePercentage: number, maxRadius: number) => {
    // Mulai dari atas (-90 deg atau -pi/2)
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const r = (valuePercentage / 100) * maxRadius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Polygon poin data pengguna
  const points = CATEGORY_ORDER.map((cat, idx) => {
    const val = scores[cat] || 0;
    const { x, y } = getCoordinates(idx, val, radius);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={`flex flex-col items-center justify-center p-1 ${className}`}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        style={{ maxWidth: `${maxWidth}px` }}
        className="w-full h-auto overflow-visible select-none"
      >
        <defs>
          <linearGradient id="radarFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center ambient glow */}
        <circle cx={center} cy={center} r={radius} fill="url(#centerGlow)" />

        {/* Concentric grid rings (25%, 50%, 75%, 100%) */}
        {levels.map((lvl) => {
          const ringPoints = CATEGORY_ORDER.map((_, idx) => {
            const { x, y } = getCoordinates(idx, lvl, radius);
            return `${x},${y}`;
          }).join(' ');

          return (
            <g key={lvl}>
              <polygon
                points={ringPoints}
                fill="none"
                stroke={isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}
                strokeWidth="1"
                strokeDasharray={lvl === 100 ? 'none' : '3,3'}
              />
              {/* Level label */}
              <text
                x={center + 4}
                y={center - (lvl / 100) * radius + 3}
                fill={isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(15, 23, 42, 0.4)'}
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {lvl}%
              </text>
            </g>
          );
        })}

        {/* Axis radial lines */}
        {CATEGORY_ORDER.map((cat, idx) => {
          const { x, y } = getCoordinates(idx, 100, radius);
          return (
            <line
              key={cat}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke={isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(15, 23, 42, 0.12)'}
              strokeWidth="1"
            />
          );
        })}

        {/* User score polygon */}
        <polygon
          points={points}
          fill="url(#radarFillGrad)"
          stroke="#f59e0b"
          strokeWidth="2.5"
          className="transition-all duration-700 ease-out"
        />

        {/* Data points & Category Labels */}
        {CATEGORY_ORDER.map((cat, idx) => {
          const score = scores[cat] || 0;
          const { x, y } = getCoordinates(idx, score, radius);
          const labelCoord = getCoordinates(idx, 126, radius);
          const info = CATEGORIES[cat];

          // Penyesuaian anchor teks berdasarkan posisi X
          let textAnchor: 'middle' | 'start' | 'end' = 'middle';
          if (labelCoord.x > center + 25) textAnchor = 'start';
          else if (labelCoord.x < center - 25) textAnchor = 'end';

          return (
            <g key={cat} className="group">
              {/* Score dot */}
              <circle
                cx={x}
                cy={y}
                r="4.5"
                fill="#f59e0b"
                stroke={isDark ? '#0d0f15' : '#ffffff'}
                strokeWidth="2"
                className="transition-all duration-500 hover:scale-150 cursor-pointer"
              />

              {/* Category label */}
              <text
                x={labelCoord.x}
                y={labelCoord.y - 4}
                textAnchor={textAnchor}
                fill={isDark ? '#e2e8f0' : '#1e293b'}
                fontSize="10"
                fontWeight="700"
                className="transition-colors group-hover:fill-amber-400"
              >
                {info.name}
              </text>
              <text
                x={labelCoord.x}
                y={labelCoord.y + 8}
                textAnchor={textAnchor}
                fill="#f59e0b"
                fontSize="10"
                fontWeight="800"
                fontFamily="monospace"
              >
                {score}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
