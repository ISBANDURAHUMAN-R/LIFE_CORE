'use client';

import React, { useState, useEffect } from 'react';
import { PlayIcon, PauseIcon, ArrowPathIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { api } from '@/lib/api';

type TimerMode = 'deep' | 'pomo' | 'break';

const MODE_DURATIONS: Record<TimerMode, number> = {
  deep: 50 * 60,
  pomo: 25 * 60,
  break: 5 * 60,
};

export default function FocusTimer({ onSessionCompleted }: { onSessionCompleted?: () => void }) {
  const [mode, setMode] = useState<TimerMode>('pomo');
  const [secondsLeft, setSecondsLeft] = useState<number>(MODE_DURATIONS.pomo);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>('Neural Architecture Refinement');
  const [distractions, setDistractions] = useState<number>(0);
  const [completedNotice, setCompletedNotice] = useState<string | null>(null);

  const totalSeconds = MODE_DURATIONS[mode];
  const progressPercent = Math.min(100, Math.max(0, ((totalSeconds - secondsLeft) / totalSeconds) * 100));

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      handleCompleteSession();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft]);

  const switchMode = (newMode: TimerMode) => {
    setIsActive(false);
    setMode(newMode);
    setSecondsLeft(MODE_DURATIONS[newMode]);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(MODE_DURATIONS[mode]);
  };

  const handleCompleteSession = async () => {
    const durationMins = Math.round((totalSeconds - secondsLeft) / 60) || Math.round(totalSeconds / 60);
    try {
      await api.addActivity({
        name: `Focus Session: ${taskName}`,
        category: 'Focus',
        duration_minutes: durationMins,
        energy_cost: mode === 'deep' ? 45 : 25,
        focus_requirement: 85,
        notes: `Distractions recorded: ${distractions}`,
      });
      setCompletedNotice(`Protocol executed: +${durationMins}m Focus logged to kernel!`);
      setTimeout(() => setCompletedNotice(null), 4000);
      if (onSessionCompleted) onSessionCompleted();
    } catch {
      // Ignored
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // SVG Ring calculation
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="glass-panel glass-panel-elevated p-6 rounded-2xl relative overflow-hidden border border-red-500/30 bg-[#0e0e15]/90">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <h3 className="font-mono text-sm tracking-widest text-red-400 font-bold uppercase">Focus Protocol</h3>
        </div>
        <div className="flex space-x-1 bg-black/60 p-1 rounded-xl border border-red-900/40 text-xs font-mono">
          <button
            onClick={() => switchMode('pomo')}
            className={`px-3 py-1 rounded-lg transition-all ${mode === 'pomo' ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/40' : 'text-gray-400 hover:text-white'}`}
          >
            POMO 25m
          </button>
          <button
            onClick={() => switchMode('deep')}
            className={`px-3 py-1 rounded-lg transition-all ${mode === 'deep' ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/40' : 'text-gray-400 hover:text-white'}`}
          >
            DEEP 50m
          </button>
          <button
            onClick={() => switchMode('break')}
            className={`px-3 py-1 rounded-lg transition-all ${mode === 'break' ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/40' : 'text-gray-400 hover:text-white'}`}
          >
            REST 5m
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-2">
        {/* Circular Visual Progress */}
        <div className="relative flex items-center justify-center">
          <svg className="w-48 h-48 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Animated Crimson Red progress circle */}
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="url(#crimsonGradient)"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-500 ease-out"
            />
            <defs>
              <linearGradient id="crimsonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff2a51" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
            </defs>
          </svg>

          {/* Time & State overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-4xl font-extrabold text-white tracking-wider drop-shadow-[0_0_12px_rgba(255,42,81,0.4)]">
              {formatTime(secondsLeft)}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-red-400 mt-1 uppercase">
              {isActive ? 'SYNCHRONIZING' : 'STANDBY'}
            </span>
          </div>
        </div>

        {/* Task details & controls */}
        <div className="flex-1 w-full flex flex-col justify-center space-y-4">
          <div>
            <label className="block text-xs font-mono text-gray-300 mb-1">STRATEGIC TARGET</label>
            <input
              type="text"
              value={taskName}
              maxLength={120}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Define high-impact objective..."
              className="w-full bg-black/60 border border-red-900/40 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 font-sans transition-all"
            />
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTimer}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-5 rounded-xl font-mono text-sm font-bold tracking-wider transition-all duration-200 shadow-lg ${
                isActive
                  ? 'bg-stone-800 hover:bg-stone-700 text-red-400 border border-red-500/40 shadow-red-950/40'
                  : 'bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/35 border border-red-400/40'
              }`}
            >
              {isActive ? (
                <>
                  <PauseIcon className="w-5 h-5" />
                  <span>PAUSE PROTOCOL</span>
                </>
              ) : (
                <>
                  <PlayIcon className="w-5 h-5 fill-current" />
                  <span>INITIATE FOCUS</span>
                </>
              )}
            </button>

            <button
              onClick={resetTimer}
              title="Reset Timer"
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-red-500/30 transition-colors"
            >
              <ArrowPathIcon className="w-5 h-5" />
            </button>

            <button
              onClick={() => setDistractions((d) => d + 1)}
              title="Record Distraction Event"
              className="flex items-center space-x-1.5 px-3 py-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-400 hover:bg-red-900/40 text-xs font-mono transition-colors shadow-sm"
            >
              <ExclamationTriangleIcon className="w-4 h-4" />
              <span>+{distractions}</span>
            </button>
          </div>

          {completedNotice && (
            <div className="flex items-center space-x-2 text-xs font-mono text-red-300 bg-red-950/60 border border-red-500/40 p-2.5 rounded-xl animate-fade-in">
              <CheckCircleIcon className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{completedNotice}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
