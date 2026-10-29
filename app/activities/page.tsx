'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, Activity } from '@/lib/api';
import { 
  ClipboardDocumentListIcon, 
  PlusIcon, 
  TrashIcon, 
  FunnelIcon,
  ClockIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

const CATEGORIES = ['All', 'Engineering', 'Health', 'Learning', 'Operations', 'Focus'];

export default function ActivitiesPage() {
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Engineering');
  const [duration, setDuration] = useState(45);
  const [energy, setEnergy] = useState(50);
  const [focus, setFocus] = useState(75);
  const [notes, setNotes] = useState('');

  const { data: activities = [], isLoading } = useQuery<Activity[]>({
    queryKey: ['activities'],
    queryFn: () => api.getActivities(),
  });

  const addMutation = useMutation({
    mutationFn: (act: Omit<Activity, 'id' | 'date'>) => api.addActivity(act),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      setShowAddModal(false);
      setName('');
      setNotes('');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.deleteActivity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const filtered = selectedCategory === 'All' 
    ? activities 
    : activities.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());

  const totalMinutes = activities.reduce((sum, a) => sum + a.duration_minutes, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addMutation.mutate({
      name: name.trim(),
      category,
      duration_minutes: duration,
      energy_cost: energy,
      focus_requirement: focus,
      notes: notes.trim() || undefined,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-red-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0c0c14] to-[#120f18]">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-red-400">
            <ClipboardDocumentListIcon className="w-4 h-4" />
            <span>NEURAL CHRONICLE</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">Activities & Session Logs</h1>
          <p className="text-xs md:text-sm text-gray-400">Record, filter, and audit deliberate work blocks executed in your system.</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="glass-panel-elevated px-4 py-2 rounded-xl text-right border border-red-500/30 bg-black/60">
            <span className="text-[10px] font-mono text-gray-400 block">TOTAL LOGGED</span>
            <span className="text-lg font-mono font-bold text-red-400 drop-shadow-[0_0_8px_rgba(255,42,81,0.5)]">
              {Math.round(totalMinutes / 60)}h {totalMinutes % 60}m
            </span>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold tracking-wider shadow-lg shadow-red-600/30 border border-red-400/40 transition-all"
          >
            <PlusIcon className="w-4 h-4 stroke-[2.5]" />
            <span>RECORD ACTIVITY</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <FunnelIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mr-1" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/40 border border-red-400'
                : 'glass-panel text-gray-400 hover:text-white hover:border-red-500/30'
            }`}
          >
            {cat} {cat === 'All' ? `(${activities.length})` : ''}
          </button>
        ))}
      </div>

      {/* Activities Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((act) => (
          <div key={act.id} className="glass-panel glass-panel-interactive p-5 rounded-2xl border border-red-900/30 flex flex-col justify-between space-y-4 bg-[#0c0c14]/90">
            <div>
              <div className="flex items-start justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-950/60 text-red-300 border border-red-500/30 font-semibold">
                  {act.category}
                </span>
                <button
                  onClick={() => deleteMutation.mutate(act.id)}
                  title="Delete Activity"
                  className="text-gray-500 hover:text-red-400 transition-colors p-1"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-base font-bold text-white mt-2.5 leading-snug">{act.name}</h3>
              {act.notes && (
                <p className="text-xs text-gray-400 mt-1 italic">&ldquo;{act.notes}&rdquo;</p>
              )}
            </div>

            <div className="pt-3 border-t border-red-950/40 space-y-2">
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="bg-black/60 p-2 rounded-lg border border-red-950/40">
                  <span className="text-[10px] text-gray-400 block">DURATION</span>
                  <span className="font-bold text-white">{act.duration_minutes}m</span>
                </div>
                <div className="bg-black/60 p-2 rounded-lg border border-red-950/40">
                  <span className="text-[10px] text-gray-400 block">ENERGY</span>
                  <span className="font-bold text-rose-400">-{act.energy_cost}%</span>
                </div>
                <div className="bg-black/60 p-2 rounded-lg border border-red-950/40">
                  <span className="text-[10px] text-gray-400 block">FOCUS</span>
                  <span className="font-bold text-red-400">{act.focus_requirement}%</span>
                </div>
              </div>

              <div className="text-[10px] font-mono text-gray-500 text-right">
                {new Date(act.date).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full glass-panel p-12 text-center rounded-2xl border border-red-900/30 space-y-2">
            <ClipboardDocumentListIcon className="w-10 h-10 text-gray-600 mx-auto" />
            <h3 className="text-white font-mono font-bold">NO ACTIVITIES RECORDED</h3>
            <p className="text-xs text-gray-400">No session logged in category &ldquo;{selectedCategory}&rdquo;.</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel glass-panel-elevated p-6 rounded-2xl max-w-lg w-full border border-red-500/50 shadow-2xl shadow-red-950/50 relative animate-fade-in bg-[#0e0e15]">
            <div className="flex items-center justify-between pb-3 border-b border-red-900/40 mb-4">
              <h3 className="font-mono font-bold text-base text-white flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>RECORD NEW SESSION</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white font-mono">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">ACTIVITY TITLE</label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Memory Profiling & Optimization"
                  className="w-full bg-black/60 border border-red-900/40 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">CATEGORY</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-black/60 border border-red-900/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Health">Health</option>
                    <option value="Learning">Learning</option>
                    <option value="Operations">Operations</option>
                    <option value="Focus">Focus</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">DURATION (MINUTES)</label>
                  <input
                    type="number"
                    min="5"
                    max="600"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value) || 30)}
                    className="w-full bg-black/60 border border-red-900/40 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                  <span>ENERGY EXPENDITURE</span>
                  <span className="text-rose-400">{energy}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={energy}
                  onChange={(e) => setEnergy(parseInt(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                  <span>FOCUS INTENSITY</span>
                  <span className="text-red-400">{focus}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={focus}
                  onChange={(e) => setFocus(parseInt(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">NOTES (OPTIONAL)</label>
                <textarea
                  value={notes}
                  maxLength={1000}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Key outputs, milestones achieved, reflections..."
                  rows={2}
                  className="w-full bg-black/60 border border-red-900/40 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-red-500"
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
                  {addMutation.isLoading ? 'SAVING...' : 'SAVE SESSION'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
