import React, { ReactNode } from 'react';

interface ResourceCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  trendUp?: boolean;
  icon: ReactNode;
  accentColor?: 'red' | 'crimson' | 'ruby' | 'amber' | 'emerald';
}

export default function ResourceCard({
  title,
  value,
  subtitle,
  trend,
  trendUp = true,
  icon,
  accentColor = 'crimson',
}: ResourceCardProps) {
  const accentClasses = {
    red: 'from-red-600/20 via-red-950/20 to-black/40 border-red-500/40 text-red-400 group-hover:border-red-400/80 shadow-red-600/20',
    crimson: 'from-rose-600/20 via-red-950/20 to-black/40 border-rose-500/40 text-rose-400 group-hover:border-rose-400/80 shadow-rose-600/20',
    ruby: 'from-red-800/25 via-stone-900/40 to-black/40 border-red-600/40 text-red-300 group-hover:border-red-500/80 shadow-red-700/20',
    amber: 'from-amber-600/20 via-orange-950/20 to-black/40 border-amber-500/40 text-amber-400 group-hover:border-amber-400/80 shadow-amber-600/20',
    emerald: 'from-emerald-600/20 via-teal-950/20 to-black/40 border-emerald-500/40 text-emerald-400 group-hover:border-emerald-400/80 shadow-emerald-600/20',
  }[accentColor];

  return (
    <div className={`group glass-panel glass-panel-interactive p-5 rounded-2xl border bg-gradient-to-br transition-all duration-300 relative overflow-hidden ${accentClasses}`}>
      {/* Background radial crimson accent glow */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-red-600 opacity-15 blur-2xl pointer-events-none" />

      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">{title}</span>
          <span className="text-2xl lg:text-3xl font-bold tracking-tight text-white font-mono">{value}</span>
          {subtitle && (
            <span className="text-xs text-gray-400 mt-1 font-sans">{subtitle}</span>
          )}
        </div>
        <div className="p-3 rounded-xl bg-black/60 border border-white/10 group-hover:border-red-500/40 group-hover:scale-110 transition-all duration-200">
          {icon}
        </div>
      </div>

      {trend && (
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
          <span className={`font-mono font-medium flex items-center space-x-1 ${trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
            <span>{trendUp ? '▲' : '▼'}</span>
            <span>{trend}</span>
          </span>
          <span className="text-gray-500 font-mono text-[10px]">vs previous cycle</span>
        </div>
      )}
    </div>
  );
}
