'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, DashboardData } from '@/lib/api';
import { ChartBarIcon, ArrowTrendingUpIcon, ShieldCheckIcon, CpuChipIcon } from '@heroicons/react/24/outline';

export default function AnalyticsPage() {
  const { data: dashboard } = useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: () => api.getDashboard(),
  });

  const categories = [
    { name: 'Engineering & Code', percentage: 42, color: 'bg-red-500', textColor: 'text-red-400' },
    { name: 'Cognitive & Systems', percentage: 28, color: 'bg-rose-500', textColor: 'text-rose-400' },
    { name: 'Health & Aerobic', percentage: 18, color: 'bg-amber-500', textColor: 'text-amber-400' },
    { name: 'Strategy & Ops', percentage: 12, color: 'bg-stone-500', textColor: 'text-stone-300' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-red-500/30 bg-gradient-to-r from-[#0c0c14] to-[#120f18]">
        <div className="flex items-center space-x-2 text-xs font-mono text-red-400">
          <ChartBarIcon className="w-4 h-4" />
          <span>DEEP TELEMETRY</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">Life Analytics & Performance</h1>
        <p className="text-xs md:text-sm text-gray-400">
          Synthesized intelligence across cognitive load, time allocation, habit momentum, and deep work efficiency.
        </p>
      </div>

      {/* Top 3 Diagnostic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-red-900/30 space-y-2 bg-[#0c0c14]/90">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400">
            <span>FLOW STATE RATIO</span>
            <CpuChipIcon className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-3xl font-mono font-bold text-white drop-shadow-[0_0_8px_rgba(255,42,81,0.4)]">
            82.4%
          </div>
          <p className="text-xs text-gray-400">Percentage of logged hours completed in uninterrupted high-focus blocks.</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-red-900/30 space-y-2 bg-[#0c0c14]/90">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400">
            <span>DISTRACTION LATENCY</span>
            <ShieldCheckIcon className="w-5 h-5 text-rose-400" />
          </div>
          <div className="text-3xl font-mono font-bold text-rose-400">0.4 / hr</div>
          <p className="text-xs text-gray-400">Average unplanned interruption events per 60 minutes of deep work.</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-red-900/30 space-y-2 bg-[#0c0c14]/90">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400">
            <span>MOMENTUM MULTIPLIER</span>
            <ArrowTrendingUpIcon className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-3xl font-mono font-bold text-red-500 drop-shadow-[0_0_8px_rgba(255,42,81,0.5)]">
            9.4 / 10
          </div>
          <p className="text-xs text-gray-400">Compounding habit multiplier based on 14-day streak continuity.</p>
        </div>
      </div>

      {/* Time Allocation Breakdown */}
      <div className="glass-panel p-6 rounded-2xl border border-red-900/30 space-y-6 bg-[#0c0c14]/90">
        <div>
          <h3 className="font-mono text-base font-bold text-white">ENERGY & TIME ALLOCATION</h3>
          <p className="text-xs text-gray-400">Distribution of deliberate effort across life domains</p>
        </div>

        {/* Multi-segmented Bar */}
        <div className="w-full bg-black/60 rounded-full h-4 flex overflow-hidden shadow-inner border border-red-950">
          {categories.map((c) => (
            <div
              key={c.name}
              style={{ width: `${c.percentage}%` }}
              className={`${c.color} h-4 transition-all duration-700 hover:opacity-80`}
              title={`${c.name}: ${c.percentage}%`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c) => (
            <div key={c.name} className="p-3.5 rounded-xl bg-black/50 border border-red-950/40 space-y-1">
              <div className="flex items-center space-x-2">
                <span className={`w-2.5 h-2.5 rounded-full ${c.color}`} />
                <span className="text-xs font-medium text-gray-300">{c.name}</span>
              </div>
              <div className={`text-xl font-mono font-bold ${c.textColor}`}>{c.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
