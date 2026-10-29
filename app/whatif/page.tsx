'use client';

import React, { useState, useEffect } from 'react';
import { api, SimulationResult } from '@/lib/api';
import { LightBulbIcon, SparklesIcon, ShieldExclamationIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

export default function WhatIfPage() {
  const [focusHours, setFocusHours] = useState<number>(4.5);
  const [sleepHours, setSleepHours] = useState<number>(7.5);
  const [consistency, setConsistency] = useState<number>(85);
  const [weeksAhead, setWeeksAhead] = useState<number>(6);

  const [simulation, setSimulation] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const runSim = async () => {
    setLoading(true);
    try {
      const res = await api.simulate({
        daily_focus_hours: focusHours,
        sleep_hours: sleepHours,
        habit_consistency_pct: consistency,
        weeks_ahead: weeksAhead,
      });
      setSimulation(res);
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runSim();
  }, [focusHours, sleepHours, consistency, weeksAhead]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-red-500/30 bg-gradient-to-r from-[#0c0c14] to-[#120f18]">
        <div className="flex items-center space-x-2 text-xs font-mono text-red-400">
          <LightBulbIcon className="w-4 h-4" />
          <span>PREDICTIVE COGNITIVE ENGINE</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">What‑If Protocol Simulator</h1>
        <p className="text-xs md:text-sm text-gray-400">
          Simulate life parameters. Calculate burnout risk, forecast neural capability compounding, and test workload hypotheses before committing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-red-900/30 space-y-6 bg-[#0c0c14]/90">
          <h2 className="font-mono text-sm font-bold text-white flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>HYPOTHESIS PARAMETERS</span>
          </h2>

          {/* Daily Focus Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-300">DAILY DEEP FOCUS</span>
              <span className="text-red-400 font-bold">{focusHours} Hours / day</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={focusHours}
              onChange={(e) => setFocusHours(parseFloat(e.target.value))}
              className="w-full accent-red-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>1h (Light)</span>
              <span>5h (Intense)</span>
              <span>10h (Extreme)</span>
            </div>
          </div>

          {/* Sleep Hours Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-300">NIGHTLY SLEEP DURATION</span>
              <span className="text-rose-400 font-bold">{sleepHours} Hours / night</span>
            </div>
            <input
              type="range"
              min="4"
              max="10"
              step="0.5"
              value={sleepHours}
              onChange={(e) => setSleepHours(parseFloat(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>4h (Severe Deficit)</span>
              <span>7.5h (Optimal)</span>
              <span>10h (Maximum Recovery)</span>
            </div>
          </div>

          {/* Habit Consistency Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-300">HABIT COMPLIANCE RATE</span>
              <span className="text-red-500 font-bold">{consistency}% Consistent</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              step="5"
              value={consistency}
              onChange={(e) => setConsistency(parseInt(e.target.value))}
              className="w-full accent-red-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>30% (Sporadic)</span>
              <span>85% (High Discipline)</span>
              <span>100% (Machine)</span>
            </div>
          </div>

          {/* Forecast Horizon */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-300">FORECAST HORIZON</span>
              <span className="text-amber-400 font-bold">{weeksAhead} Weeks</span>
            </div>
            <input
              type="range"
              min="2"
              max="12"
              step="1"
              value={weeksAhead}
              onChange={(e) => setWeeksAhead(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>2 Weeks</span>
              <span>6 Weeks</span>
              <span>12 Weeks (Quarterly)</span>
            </div>
          </div>

          <div className="pt-2 border-t border-red-950/40">
            <button
              onClick={runSim}
              className="w-full py-2.5 rounded-xl bg-red-950/30 hover:bg-red-900/40 text-red-400 text-xs font-mono font-bold border border-red-500/40 transition-colors shadow-sm"
            >
              {loading ? 'RECOMPUTING TENSORS...' : 'REFRESH SIMULATION'}
            </button>
          </div>
        </div>

        {/* Results & Projections (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Simulation Gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-panel p-4 rounded-xl border border-red-900/30 text-center bg-[#0c0c14]/90">
              <span className="text-[10px] font-mono text-gray-400 block mb-1">BURNOUT RISK</span>
              <span className={`text-2xl font-mono font-bold ${
                (simulation?.burnout_risk_score || 0) < 35 
                  ? 'text-emerald-400' 
                  : ((simulation?.burnout_risk_score || 0) < 70 ? 'text-amber-400' : 'text-red-500 drop-shadow-[0_0_8px_rgba(255,42,81,0.6)]')
              }`}>
                {simulation?.burnout_risk_score || 0}%
              </span>
              <span className="text-[10px] font-mono block mt-1 text-gray-400">
                STATUS: {simulation?.burnout_risk_level || 'LOW'}
              </span>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-red-900/30 text-center bg-[#0c0c14]/90">
              <span className="text-[10px] font-mono text-gray-400 block mb-1">SKILL GAIN INDEX</span>
              <span className="text-2xl font-mono font-bold text-red-400 drop-shadow-[0_0_8px_rgba(255,42,81,0.5)]">
                +{simulation?.projected_skill_level || 0} pts
              </span>
              <span className="text-[10px] font-mono block mt-1 text-gray-400">
                COMPOUND RATE
              </span>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-red-900/30 text-center bg-[#0c0c14]/90">
              <span className="text-[10px] font-mono text-gray-400 block mb-1">GOAL PROBABILITY</span>
              <span className="text-2xl font-mono font-bold text-rose-400">
                {simulation?.projected_goal_completion_pct || 0}%
              </span>
              <span className="text-[10px] font-mono block mt-1 text-gray-400">
                COMPLETION INDEX
              </span>
            </div>
          </div>

          {/* AI Recommendation Alert */}
          <div className="glass-panel glass-panel-elevated p-5 rounded-2xl border border-red-500/40 space-y-2 bg-gradient-to-r from-[#120f18] to-[#0c0c14]">
            <div className="flex items-center space-x-2 text-xs font-mono text-red-400 font-bold">
              <SparklesIcon className="w-4 h-4 text-red-400" />
              <span>COGNITIVE DIRECTIVE</span>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed font-sans">
              {simulation?.recommendation}
            </p>
          </div>

          {/* Trajectory Timeline Bar Visualizer */}
          <div className="glass-panel p-6 rounded-2xl border border-red-900/30 space-y-4 bg-[#0c0c14]/90">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm font-bold text-white flex items-center space-x-2">
                <ArrowTrendingUpIcon className="w-4 h-4 text-red-400" />
                <span>PROJECTED OUTPUT TRAJECTORY</span>
              </h3>
              <div className="flex space-x-3 text-[10px] font-mono">
                <span className="text-red-400">■ Output Units</span>
                <span className="text-rose-400">■ Fatigue Risk</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {(simulation?.trajectory || []).map((t) => (
                <div key={t.week} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-300 font-bold">{t.week}</span>
                    <span className="text-gray-400">
                      Output: <strong className="text-red-400">{t.output_units}</strong> • Burnout: <strong className={t.burnout_risk > 60 ? 'text-red-500' : 'text-emerald-400'}>{t.burnout_risk}%</strong>
                    </span>
                  </div>
                  <div className="w-full bg-black/60 rounded-full h-2 flex overflow-hidden border border-red-950/40">
                    <div
                      style={{ width: `${Math.min(100, (t.output_units / (focusHours * 7 * weeksAhead)) * 100)}%` }}
                      className="bg-gradient-to-r from-red-800 via-red-600 to-rose-400 h-2 rounded-l-full"
                    />
                    <div
                      style={{ width: `${t.burnout_risk * 0.4}%` }}
                      className="bg-red-950/80 h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
