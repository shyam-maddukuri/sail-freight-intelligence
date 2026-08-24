import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function KPICard({
  title,
  value,
  subtitle,
  unit,
  change,
  trend = 'neutral', // 'up' | 'down' | 'neutral'
  icon: Icon,
  color = 'cyan', // 'cyan' | 'emerald' | 'amber' | 'indigo' | 'blue' | 'rose'
  onClick,
  extra
}) {
  const colorMap = {
    cyan: {
      bgIcon: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
      border: 'hover:border-cyan-500/50',
      glow: 'shadow-cyan-500/10'
    },
    emerald: {
      bgIcon: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      border: 'hover:border-emerald-500/50',
      glow: 'shadow-emerald-500/10'
    },
    amber: {
      bgIcon: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      border: 'hover:border-amber-500/50',
      glow: 'shadow-amber-500/10'
    },
    indigo: {
      bgIcon: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
      border: 'hover:border-indigo-500/50',
      glow: 'shadow-indigo-500/10'
    },
    blue: {
      bgIcon: 'bg-sail-500/15 text-sail-300 border-sail-500/30',
      border: 'hover:border-sail-400/50',
      glow: 'shadow-sail-500/10'
    },
    rose: {
      bgIcon: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      border: 'hover:border-rose-500/50',
      glow: 'shadow-rose-500/10'
    }
  };

  const scheme = colorMap[color] || colorMap.cyan;

  return (
    <div
      onClick={onClick}
      className={`relative bg-[#0d1b36]/85 border border-sail-700/50 rounded-xl p-4 transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''
      } ${scheme.border} shadow-card-dark ${scheme.glow}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <div className="flex items-baseline space-x-1.5 mt-1">
            <span className="text-2xl font-black tracking-tight text-white font-mono">
              {value}
            </span>
            {unit && (
              <span className="text-xs font-medium text-slate-400">
                {unit}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className={`p-2.5 rounded-lg border ${scheme.bgIcon}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 pt-2.5 border-t border-sail-800/80 flex items-center justify-between text-xs">
        {subtitle && (
          <span className="text-slate-400 truncate max-w-[170px] text-[11.5px]">
            {subtitle}
          </span>
        )}

        {change !== undefined && (
          <div
            className={`flex items-center gap-1 font-mono text-[11px] font-semibold px-2 py-0.5 rounded ${
              trend === 'up'
                ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                : trend === 'down'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                : 'bg-sail-800 text-slate-300'
            }`}
          >
            {trend === 'up' && <TrendingUp className="w-3 h-3 text-rose-400" />}
            {trend === 'down' && <TrendingDown className="w-3 h-3 text-emerald-400" />}
            {trend === 'neutral' && <Minus className="w-3 h-3 text-slate-400" />}
            <span>{change}</span>
          </div>
        )}

        {extra}
      </div>
    </div>
  );
}
