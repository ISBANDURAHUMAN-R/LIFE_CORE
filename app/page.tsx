'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, DashboardData, Activity } from '@/lib/api';
import ResourceCard from '@/components/ResourceCard';
import FocusTimer from '@/components/FocusTimer';
import { 
  ClockIcon, 
  BoltIcon, 
  FlagIcon, 
  FireIcon, 
  ChartBarSquareIcon,
  PlusIcon,
  CheckCircleIcon,
  SparklesIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [showQuickLog, setShowQuickLog] = useState<boolean>(false);

  // Quick log form state
  const [actName, setActName] = useState<string>('');
  const [actCategory, setActCategory] = useState<string>('Engineering');
  const [actDuration, setActDuration] = useState<number>(45);
  const [actEnergy, setActEnergy] = useState<number>(40);
  const [actFocus, setActFocus] = useState<number>(75);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const { data: dashboard, isLoading, refetch } = useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: () => api.getDashboard(),
  });

  const addActivityMutation = useMutation({
    mutationFn: (newAct: Omit<Activity, 'id' | 'date'>) => api.addActivity(newAct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      setShowQuickLog(false);
      setActName('');
    },
  });

  const handleQuickLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actName.trim()) return;
    addActivityMutation.mutate({
      name: actName.trim(),
      category: actCategory,
      duration_minutes: actDuration,
      energy_cost: actEnergy,
      focus_requirement: actFocus,
    });
  };

  const weeklyData = dashboard?.weekly_progress || [
    { day: 'Mon', focus: 160, energy: 82, productivity: 86 },
    { day: 'Tue', focus: 210, energy: 78, productivity: 92 },
    { day: 'Wed', focus: 190, energy: 85, productivity: 89 },
    { day: 'Thu', focus: 240, energy: 70, productivity: 94 },
    { day: 'Fri', focus: 180, energy: 75, productivity: 88 },
    { day: 'Sat', focus: 130, energy: 90, productivity: 80 },
    { day: 'Sun', focus: 150, energy: 88, productivity: 85 },
  ];

  const maxFocus = Math.max(...weeklyData.map((d) => d.focus), 250);

  return (
    <div className="space-y-6">
      {/* Top Header / Status bar */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-red-500/30 bg-gradient-to-r from-[#0c0c14] via-[#120f18] to-[#0c0c14] shadow-xl shadow-red-950/20">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono tracking-widest text-red-400 uppercase bg-red-950/40 px-2.5 py-0.5 rounded border border-red-500/40 font-bold">
              LIFE_CORE OS // APEX PROTOCOL
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-[11px] font-mono text-red-400 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block animate-ping" />
              <span className="font-semibold">{dashboard?.system_status || 'SECURED // APEX READY'}</span>
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mt-1.5">
            Command Center
          </h1>
          <p className="text-xs md:text-sm text-gray-400">
            Real-time biometric telemetry, deep focus cadence, strategic milestones, and predictive intelligence.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="glass-panel-elevated px-4 py-2 rounded-xl border border-red-500/30 text-right bg-black/60">
            <div className="text-[10px] font-mono text-gray-400">TELEMETRY CLOCK (UTC)</div>
            <div className="text-lg font-mono font-bold text-red-400 drop-shadow-[0_0_8px_rgba(255,42,81,0.5)]">
              {currentTime || '00:00:00'}
            </div>
          </div>
          <button
            onClick={() => setShowQuickLog(true)}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold tracking-wider transition-all shadow-lg shadow-red-600/30 border border-red-400/40"
          >
            <PlusIcon className="w-4 h-4 stroke-[2.5]" />
            <span>RECORD SESSION</span>
          </button>
        </div>
      </div>

      {/* Resource Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResourceCard
          title="Daily Focus Output"
          value={`${dashboard?.focus_minutes_today || 230}m`}
          subtitle="Target: 300m / day"
          trend="+18%"
          trendUp={true}
          accentColor="crimson"
          icon={<ClockIcon className="w-6 h-6 text-red-400" />}
        />
        <ResourceCard
          title="Cognitive Reserve"
          value={`${dashboard?.energy_level || 84}%`}
          subtitle="Recovery rate: +12%/h"
          trend="+4%"
          trendUp={true}
          accentColor="ruby"
          icon={<BoltIcon className="w-6 h-6 text-rose-400" />}
        />
        <ResourceCard
          title="Productivity Index"
          value={`${dashboard?.productivity_score || 92}/100`}
          subtitle="Top 5% cadence"
          trend="+6 pts"
          trendUp={true}
          accentColor="red"
          icon={<ChartBarSquareIcon className="w-6 h-6 text-red-500" />}
        />
        <ResourceCard
          title="Discipline Streak"
          value={`${dashboard?.streak_days || 14} Days`}
          subtitle="All protocols compliant"
          trend="Record Pace"
          trendUp={true}
          accentColor="amber"
          icon={<FireIcon className="w-6 h-6 text-amber-400" />}
        />
      </div>

      {/* Main Grid: Interactive Focus Timer + Weekly Trajectory Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Focus Timer (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <FocusTimer onSessionCompleted={() => refetch()} />

          {/* Neural Quick Tips / Insights */}
          <div className="glass-panel p-5 rounded-2xl border border-red-900/30 space-y-3 bg-[#0c0c14]/90">
            <div className="flex items-center space-x-2 text-xs font-mono text-red-400 font-bold">
              <SparklesIcon className="w-4 h-4 text-red-400" />
              <span>COGNITIVE BIO-TELEMETRY</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              Flow state peak detected between 08:30 and 11:45. Your distraction resistance index is currently <strong className="text-red-400">94.2%</strong>. Recommended next protocol: Deploy a 50-minute deep focus block on core system architecture.
            </p>
          </div>
        </div>

        {/* Right Column: Weekly Performance Chart & Activity Telemetry (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Weekly Performance Bar Chart */}
          <div className="glass-panel p-6 rounded-2xl border border-red-900/30 space-y-4 bg-[#0c0c14]/90">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-mono flex items-center space-x-2">
                  <span>WEEKLY FOCUS CYCLES</span>
                  <span className="text-[10px] bg-red-950/60 text-red-400 px-2 py-0.5 rounded font-mono border border-red-500/30">
                    7-DAY TELEMETRY
                  </span>
                </h3>
                <p className="text-xs text-gray-400">Total deliberate practice minutes dedicated to leverage objectives</p>
              </div>
              <div className="flex items-center space-x-4 text-xs font-mono">
                <span className="flex items-center space-x-1.5 text-red-400">
                  <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-red-600 to-rose-400" />
                  <span>Focus (mins)</span>
                </span>
                <span className="flex items-center space-x-1.5 text-rose-300">
                  <span className="w-2.5 h-2.5 rounded-sm bg-rose-500/40" />
                  <span>Energy %</span>
                </span>
              </div>
            </div>

            {/* Custom Responsive Futuristic Red Bar Chart */}
            <div className="h-52 flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-red-900/20">
              {weeklyData.map((d) => {
                const heightPct = Math.round((d.focus / maxFocus) * 100);
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                    {/* Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-black/90 border border-red-500/50 text-red-300 px-2 py-1 rounded text-[10px] font-mono pointer-events-none whitespace-nowrap z-20 shadow-xl shadow-red-950/40">
                      {d.day}: {d.focus}m • Energy: {d.energy}%
                    </div>
                    {/* Focus bar with crimson gradient & red aura */}
                    <div className="w-full max-w-[36px] bg-black/60 border border-red-950/40 rounded-t-lg relative flex flex-col justify-end overflow-hidden h-full">
                      <div
                        style={{ height: `${heightPct}%` }}
                        className="w-full bg-gradient-to-t from-red-900 via-red-600 to-rose-500 rounded-t-lg transition-all duration-500 group-hover:brightness-125 shadow-lg shadow-red-600/30"
                      />
                    </div>
                    <span className="text-[11px] font-mono text-gray-400 mt-2 group-hover:text-red-400 transition-colors">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strategic Objectives Grid */}
          <div className="glass-panel p-6 rounded-2xl border border-red-900/30 space-y-4 bg-[#0c0c14]/90">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-mono flex items-center space-x-2">
                  <FlagIcon className="w-4 h-4 text-red-400" />
                  <span>STRATEGIC OBJECTIVES</span>
                </h3>
                <p className="text-xs text-gray-400">Active milestones and deliberate target completion</p>
              </div>
              <span className="text-xs font-mono text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-500/30">
                {dashboard?.goals?.length || 4} ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(dashboard?.goals || []).map((goal) => {
                const targetMins = goal.target_minutes || 600;
                const progressMins = goal.progress_minutes || Math.round(targetMins * 0.65);
                const pct = Math.min(100, Math.round((progressMins / targetMins) * 100));

                return (
                  <div key={goal.id} className="p-3.5 rounded-xl bg-black/50 border border-red-900/30 hover:border-red-500/50 transition-all space-y-2">
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-medium text-white line-clamp-1">{goal.title}</span>
                      <span className="text-[10px] font-mono text-red-400 bg-red-950/50 px-1.5 py-0.5 rounded border border-red-500/30">
                        {pct}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden border border-red-950">
                      <div
                        style={{ width: `${pct}%` }}
                        className="bg-gradient-to-r from-red-600 via-rose-500 to-red-400 h-1.5 rounded-full transition-all duration-500 shadow-sm shadow-red-500/50"
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                      <span>{Math.round(progressMins / 60)}h / {Math.round(targetMins / 60)}h</span>
                      <span>Due: {new Date(goal.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Log Stream */}
      <div className="glass-panel p-6 rounded-2xl border border-red-900/30 space-y-4 bg-[#0c0c14]/90">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="w-5 h-5 text-red-400" />
            <h3 className="text-base font-bold text-white font-mono">ACTIVITY TELEMETRY STREAM</h3>
          </div>
          <button
            onClick={() => setShowQuickLog(true)}
            className="text-xs font-mono text-red-400 hover:text-red-300 transition-colors flex items-center space-x-1"
          >
            <span>+ Quick Log</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-red-900/30 text-gray-400 font-mono text-[11px]">
                <th className="py-2.5 px-3">ACTIVITY</th>
                <th className="py-2.5 px-3">CATEGORY</th>
                <th className="py-2.5 px-3">DURATION</th>
                <th className="py-2.5 px-3">ENERGY COST</th>
                <th className="py-2.5 px-3">FOCUS REQ</th>
                <th className="py-2.5 px-3">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-950/30 font-sans">
              {(dashboard?.recent_activities || []).map((act) => (
                <tr key={act.id} className="hover:bg-red-950/15 transition-colors">
                  <td className="py-3 px-3 font-medium text-white flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-sm shadow-red-500/80" />
                    <span>{act.name}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-950/50 text-red-300 border border-red-500/30">
                      {act.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-gray-300">{act.duration_minutes}m</td>
                  <td className="py-3 px-3 font-mono text-rose-400">-{act.energy_cost}%</td>
                  <td className="py-3 px-3 font-mono text-red-300">{act.focus_requirement}%</td>
                  <td className="py-3 px-3 font-mono text-gray-500 text-[10px]">
                    {new Date(act.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Log Activity Modal */}
      {showQuickLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel glass-panel-elevated p-6 rounded-2xl max-w-md w-full border border-red-500/50 shadow-2xl shadow-red-950/50 relative animate-fade-in bg-[#0e0e15]">
            <div className="flex items-center justify-between pb-3 border-b border-red-900/30 mb-4">
              <h3 className="font-mono font-bold text-base text-white flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>RECORD PROTOCOL SESSION</span>
              </h3>
              <button
                onClick={() => setShowQuickLog(false)}
                className="text-gray-400 hover:text-white font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleQuickLog} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">ACTIVITY TITLE</label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={actName}
                  onChange={(e) => setActName(e.target.value)}
                  placeholder="e.g. Distributed Consensus Engine"
                  className="w-full bg-black/60 border border-red-900/40 rounded-xl px-3.5 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500 font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">CATEGORY</label>
                  <select
                    value={actCategory}
                    onChange={(e) => setActCategory(e.target.value)}
                    className="w-full bg-black/60 border border-red-900/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Health">Health</option>
                    <option value="Learning">Learning</option>
                    <option value="Operations">Operations</option>
                    <option value="Deep Work">Deep Work</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">DURATION (MINUTES)</label>
                  <input
                    type="number"
                    min="5"
                    max="480"
                    value={actDuration}
                    onChange={(e) => setActDuration(parseInt(e.target.value) || 30)}
                    className="w-full bg-black/60 border border-red-900/40 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                  <span>ENERGY EXPENDITURE</span>
                  <span className="text-red-400">{actEnergy}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={actEnergy}
                  onChange={(e) => setActEnergy(parseInt(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                  <span>FOCUS INTENSITY</span>
                  <span className="text-red-400">{actFocus}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={actFocus}
                  onChange={(e) => setActFocus(parseInt(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowQuickLog(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-gray-400 hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={addActivityMutation.isLoading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold shadow-lg shadow-red-600/30"
                >
                  {addActivityMutation.isLoading ? 'COMMITTING...' : 'COMMIT LOG'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
