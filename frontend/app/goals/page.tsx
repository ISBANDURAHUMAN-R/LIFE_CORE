'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, Goal } from '@/lib/api';
import { FlagIcon, PlusIcon, CheckBadgeIcon, CalendarIcon, TrophyIcon } from '@heroicons/react/24/outline';

export default function GoalsPage() {
  const queryClient = useQueryClient();
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const [title, setTitle] = useState('');
  const [targetHours, setTargetHours] = useState(20);
  const [deadlineDays, setDeadlineDays] = useState(30);

  const { data: goals = [], isLoading } = useQuery<Goal[]>({
    queryKey: ['goals'],
    queryFn: () => api.getGoals(),
  });

  const addMutation = useMutation({
    mutationFn: (newGoal: Omit<Goal, 'id' | 'created_at'>) => api.addGoal(newGoal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      setShowAddModal(false);
      setTitle('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const deadline = new Date(Date.now() + deadlineDays * 86400000).toISOString();
    addMutation.mutate({
      title: title.trim(),
      target_minutes: targetHours * 60,
      deadline,
    });
  };

  const totalTargetHours = Math.round(goals.reduce((s, g) => s + g.target_minutes, 0) / 60);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-red-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0c0c14] to-[#120f18]">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-red-400">
            <FlagIcon className="w-4 h-4" />
            <span>OBJECTIVE ENGINE</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">Strategic Goals & Milestones</h1>
          <p className="text-xs md:text-sm text-gray-400">High-leverage targets with deliberate execution quotas and deadlines.</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="glass-panel-elevated px-4 py-2 rounded-xl text-right border border-red-500/30 bg-black/60">
            <span className="text-[10px] font-mono text-gray-400 block">TOTAL COMMITTED</span>
            <span className="text-lg font-mono font-bold text-red-400 drop-shadow-[0_0_8px_rgba(255,42,81,0.5)]">
              {totalTargetHours}h Target
            </span>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold tracking-wider shadow-lg shadow-red-600/30 border border-red-400/40 transition-all"
          >
            <PlusIcon className="w-4 h-4 stroke-[2.5]" />
            <span>CREATE GOAL</span>
          </button>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {goals.map((goal) => {
          const targetMins = goal.target_minutes || 600;
          const progressMins = goal.progress_minutes || Math.round(targetMins * 0.65);
          const pct = Math.min(100, Math.round((progressMins / targetMins) * 100));
          const daysLeft = Math.max(1, Math.round((new Date(goal.deadline).getTime() - Date.now()) / (1000 * 3600 * 24)));

          const isNearComplete = pct >= 80;

          return (
            <div key={goal.id} className="glass-panel glass-panel-interactive p-6 rounded-2xl border border-red-900/30 space-y-4 bg-[#0c0c14]/90">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                    isNearComplete 
                      ? 'bg-red-950/80 text-rose-300 border-red-500/50' 
                      : 'bg-red-950/40 text-red-400 border-red-500/30'
                  }`}>
                    {isNearComplete ? 'FINAL SPRINT' : 'ACTIVE CRUCIBLE'}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2 leading-tight">{goal.title}</h3>
                </div>
                <div className="text-right font-mono">
                  <span className="text-2xl font-bold text-red-400 drop-shadow-[0_0_8px_rgba(255,42,81,0.5)]">
                    {pct}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="w-full bg-black/60 rounded-full h-2.5 overflow-hidden border border-red-950">
                  <div
                    style={{ width: `${pct}%` }}
                    className="bg-gradient-to-r from-red-700 via-red-500 to-rose-400 h-2.5 rounded-full shadow-lg shadow-red-600/40 transition-all duration-700"
                  />
                </div>
                <div className="flex justify-between text-xs font-mono text-gray-400 pt-1">
                  <span>{Math.round(progressMins / 60)}h logged</span>
                  <span>Target: {Math.round(targetMins / 60)}h</span>
                </div>
              </div>

              {/* Deadline & Meta */}
              <div className="pt-3 border-t border-red-950/40 flex items-center justify-between text-xs font-mono">
                <span className="flex items-center space-x-1.5 text-gray-400">
                  <CalendarIcon className="w-4 h-4 text-red-400" />
                  <span>Due in {daysLeft} days</span>
                </span>
                <span className="text-gray-500 text-[10px]">
                  Created {new Date(goal.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel glass-panel-elevated p-6 rounded-2xl max-w-md w-full border border-red-500/50 shadow-2xl shadow-red-950/50 relative animate-fade-in bg-[#0e0e15]">
            <div className="flex items-center justify-between pb-3 border-b border-red-900/40 mb-4">
              <h3 className="font-mono font-bold text-base text-white flex items-center space-x-2">
                <FlagIcon className="w-5 h-5 text-red-400" />
                <span>ESTABLISH STRATEGIC GOAL</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white font-mono">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">GOAL / MILESTONE TITLE</label>
                <input
                  type="text"
                  required
                  maxLength={120}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Master Rust Concurrency & Systems"
                  className="w-full bg-black/60 border border-red-900/40 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">TARGET DELIBERATE PRACTICE (HOURS)</label>
                <input
                  type="number"
                  min="5"
                  max="1000"
                  value={targetHours}
                  onChange={(e) => setTargetHours(parseInt(e.target.value) || 20)}
                  className="w-full bg-black/60 border border-red-900/40 rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">HORIZON (DAYS UNTIL DEADLINE)</label>
                <input
                  type="number"
                  min="3"
                  max="365"
                  value={deadlineDays}
                  onChange={(e) => setDeadlineDays(parseInt(e.target.value) || 30)}
                  className="w-full bg-black/60 border border-red-900/40 rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-gray-400 hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={addMutation.isLoading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold shadow-lg shadow-red-600/30"
                >
                  {addMutation.isLoading ? 'COMMITTING...' : 'COMMIT GOAL'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
