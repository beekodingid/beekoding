import React, { useState } from 'react';
import {
  type AssessmentCategory,
  CATEGORIES,
  CATEGORY_ORDER,
} from '../../data/talentQuestions';
import { TalentRadarChart } from '../talent/TalentRadarChart';
import { BarChart3, Radar } from 'lucide-react';

// ==========================================
// 1. GRAFIK DONUT: DISTRIBUSI JENJANG & USIA
// ==========================================

interface SchoolLevelDonutChartProps {
  juniorCount: number;
  middleCount: number;
  teensCount: number;
  totalStudents: number;
  isDark: boolean;
}

export const SchoolLevelDonutChart: React.FC<SchoolLevelDonutChartProps> = ({
  juniorCount,
  middleCount,
  teensCount,
  totalStudents,
  isDark,
}) => {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  const radius = 68;
  const strokeWidth = 22;
  const circumference = 2 * Math.PI * radius;

  // Persentase masing-masing segmen
  const juniorPct = totalStudents > 0 ? juniorCount / totalStudents : 0;
  const middlePct = totalStudents > 0 ? middleCount / totalStudents : 0;
  const teensPct = totalStudents > 0 ? teensCount / totalStudents : 0;

  const juniorDash = juniorPct * circumference;
  const middleDash = middlePct * circumference;
  const teensDash = teensPct * circumference;

  // Offsets
  const juniorOffset = 0;
  const middleOffset = juniorDash;
  const teensOffset = juniorDash + middleDash;

  const tiersData = [
    {
      id: 'junior',
      label: 'Junior Explorer',
      sublabel: 'Usia 6 - 9 Thn • TK B & SD 1-3',
      count: juniorCount,
      pct: Math.round(juniorPct * 100),
      color: '#f59e0b', // amber
      bgBadge: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
    },
    {
      id: 'middle',
      label: 'Intermediate Coder',
      sublabel: 'Usia 10 - 12 Thn • SD 4-6',
      count: middleCount,
      pct: Math.round(middlePct * 100),
      color: '#3b82f6', // blue
      bgBadge: 'bg-blue-500/15 text-blue-500 border-blue-500/30',
    },
    {
      id: 'teens',
      label: 'Teens Innovator',
      sublabel: 'Usia 13 - 17 Thn • SMP & SMA',
      count: teensCount,
      pct: Math.round(teensPct * 100),
      color: '#8b5cf6', // purple
      bgBadge: 'bg-purple-500/15 text-purple-500 border-purple-500/30',
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Donut SVG Circle */}
      <div className="relative flex items-center justify-center shrink-0 w-48 h-48 sm:w-52 sm:h-52">
        <svg
          viewBox="0 0 180 180"
          className="w-full h-full -rotate-90 transform overflow-visible select-none"
        >
          {/* Background circle track */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="transparent"
            stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
            strokeWidth={strokeWidth}
          />

          {totalStudents > 0 ? (
            <>
              {/* Segmen 1: Junior Explorer (Amber) */}
              <circle
                cx="90"
                cy="90"
                r={radius}
                fill="transparent"
                stroke="#f59e0b"
                strokeWidth={hoveredTier === 'junior' ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${juniorDash} ${circumference}`}
                strokeDashoffset={-juniorOffset}
                className="transition-all duration-500 cursor-pointer"
                onMouseEnter={() => setHoveredTier('junior')}
                onMouseLeave={() => setHoveredTier(null)}
              />

              {/* Segmen 2: Intermediate Coder (Blue) */}
              <circle
                cx="90"
                cy="90"
                r={radius}
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth={hoveredTier === 'middle' ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${middleDash} ${circumference}`}
                strokeDashoffset={-middleOffset}
                className="transition-all duration-500 cursor-pointer"
                onMouseEnter={() => setHoveredTier('middle')}
                onMouseLeave={() => setHoveredTier(null)}
              />

              {/* Segmen 3: Teens Innovator (Purple) */}
              <circle
                cx="90"
                cy="90"
                r={radius}
                fill="transparent"
                stroke="#8b5cf6"
                strokeWidth={hoveredTier === 'teens' ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${teensDash} ${circumference}`}
                strokeDashoffset={-teensOffset}
                className="transition-all duration-500 cursor-pointer"
                onMouseEnter={() => setHoveredTier('teens')}
                onMouseLeave={() => setHoveredTier(null)}
              />
            </>
          ) : null}
        </svg>

        {/* Center Label inside Donut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-3xl font-black tracking-tight leading-none text-amber-500">
            {totalStudents}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
            Total Siswa
          </span>
          {hoveredTier && (
            <span className="text-[10px] font-extrabold text-slate-300 capitalize animate-fadeIn mt-0.5">
              {hoveredTier}
            </span>
          )}
        </div>
      </div>

      {/* Legend & Breakdown Cards */}
      <div className="flex-1 w-full space-y-2.5">
        {tiersData.map((tier) => {
          const isHovered = hoveredTier === tier.id;
          return (
            <div
              key={tier.id}
              onMouseEnter={() => setHoveredTier(tier.id)}
              onMouseLeave={() => setHoveredTier(null)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                isHovered
                  ? isDark
                    ? 'bg-slate-800 border-amber-500/50 shadow-md'
                    : 'bg-amber-50/70 border-amber-400 shadow-sm'
                  : isDark
                  ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: tier.color }}
                  />
                  <span className="font-bold">{tier.label}</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-extrabold text-sm" style={{ color: tier.color }}>
                    {tier.count} siswa
                  </span>
                  <span className="text-[11px] text-slate-400">({tier.pct}%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                <span>{tier.sublabel}</span>
              </div>

              {/* Progress bar track */}
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${tier.pct}%`,
                    backgroundColor: tier.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// 2. GRAFIK BATANG & RADAR: PILAR BAKAT
// ==========================================

interface PillarAnalyticsChartProps {
  pillarDominance: Record<string, number>;
  pillarAverageScores: Record<AssessmentCategory, number>;
  totalStudents: number;
  isDark: boolean;
}

export const PillarAnalyticsChart: React.FC<PillarAnalyticsChartProps> = ({
  pillarDominance,
  pillarAverageScores,
  totalStudents,
  isDark,
}) => {
  const [chartMode, setChartMode] = useState<'bar' | 'radar'>('bar');
  const [metricType, setMetricType] = useState<'frequency' | 'score'>('frequency');

  // Cari nilai maksimum untuk penskalaan bar
  const maxFrequency = Math.max(1, ...Object.values(pillarDominance));

  return (
    <div className="space-y-4">
      {/* Chart Control Bar: Toggle Bar vs Radar, and Frequency vs Score */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-dashed border-slate-200 dark:border-slate-800">
        {/* Toggle Mode: Bar Chart vs Radar Chart */}
        <div
          className={`inline-flex rounded-xl border p-0.5 ${
            isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-300 shadow-sm'
          }`}
        >
          <button
            type="button"
            onClick={() => setChartMode('bar')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              chartMode === 'bar'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Grafik Batang</span>
          </button>

          <button
            type="button"
            onClick={() => setChartMode('radar')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              chartMode === 'radar'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Radar className="w-3.5 h-3.5" />
            <span>Radar Agregat</span>
          </button>
        </div>

        {/* Metrik Toggle (Hanya untuk Bar Chart) */}
        {chartMode === 'bar' && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold">Tampilkan:</span>
            <select
              value={metricType}
              onChange={(e) => setMetricType(e.target.value as any)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-white'
                  : 'bg-white border-slate-300 text-slate-800'
              }`}
            >
              <option value="frequency">Top 3 Kekuatan (Frekuensi)</option>
              <option value="score">Rata-rata Skor (0 - 100%)</option>
            </select>
          </div>
        )}
      </div>

      {/* Chart Display Container */}
      {chartMode === 'bar' ? (
        <div className="space-y-3 pt-1">
          {/* Scale Axis Line */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 border-b pb-1 border-slate-200 dark:border-slate-800">
            <span>Pilar Kecerdasan (8 Dimensi)</span>
            <span>
              {metricType === 'frequency'
                ? `Skala: 0 s/d ${maxFrequency} siswa`
                : 'Skala: 0 s/d 100% skor rata-rata'}
            </span>
          </div>

          {CATEGORY_ORDER.map((catKey) => {
            const cat = CATEGORIES[catKey];
            const frequency = pillarDominance[catKey] || 0;
            const avgScore = pillarAverageScores[catKey] || 0;

            // Hitung lebar bar berdasarkan metrik yang aktif
            const barPct =
              metricType === 'frequency'
                ? maxFrequency > 0
                  ? (frequency / maxFrequency) * 100
                  : 0
                : avgScore;

            return (
              <div key={catKey} className="group text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="font-bold">{cat.name}</span>
                    <span className="text-[10px] text-slate-400 hidden sm:inline">
                      • {cat.shortDesc.slice(0, 32)}...
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono shrink-0">
                    {metricType === 'frequency' ? (
                      <>
                        <span className="font-extrabold text-sm" style={{ color: cat.color }}>
                          {frequency}x
                        </span>
                        <span className="text-[10px] text-slate-400">
                          (
                          {totalStudents > 0
                            ? Math.round((frequency / totalStudents) * 100)
                            : 0}
                          %)
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="font-extrabold text-sm" style={{ color: cat.color }}>
                          {avgScore}
                        </span>
                        <span className="text-[10px] text-slate-400">/100</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Animated Horizontal Bar */}
                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out group-hover:brightness-110"
                    style={{
                      width: `${Math.max(4, barPct)}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Radar Chart Agregat Rata-rata 8 Pilar */
        <div className="flex flex-col items-center justify-center p-2">
          <TalentRadarChart scores={pillarAverageScores} isDark={isDark} />
          <p className="text-[11px] text-slate-400 text-center mt-2">
            Visualisasi radar di atas menampilkan rata-rata indeks kecerdasan dari seluruh siswa
            yang terdaftar di Beekoding.
          </p>
        </div>
      )}
    </div>
  );
};
