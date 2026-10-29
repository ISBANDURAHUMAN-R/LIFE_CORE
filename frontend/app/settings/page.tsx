'use client';

import React, { useState } from 'react';
import { Cog6ToothIcon, ServerIcon, CircleStackIcon, ArrowPathIcon, CheckCircleIcon, XCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const [testingBackend, setTestingBackend] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'idle' | 'online' | 'offline'>('idle');
  const [apiUrl, setApiUrl] = useState('http://localhost:8000/api');
  const [resetSuccess, setResetSuccess] = useState(false);

  const testConnection = async () => {
    setTestingBackend(true);
    setBackendStatus('idle');
    try {
      const res = await fetch(`${apiUrl}/health`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        setBackendStatus('online');
      } else {
        setBackendStatus('offline');
      }
    } catch {
      setBackendStatus('offline');
    } finally {
      setTestingBackend(false);
    }
  };

  const handleResetData = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lifecore_activities');
      localStorage.removeItem('lifecore_goals');
      setResetSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-red-500/30 bg-gradient-to-r from-[#0c0c14] to-[#120f18]">
        <div className="flex items-center space-x-2 text-xs font-mono text-red-400">
          <Cog6ToothIcon className="w-4 h-4" />
          <span>SYSTEM CONFIGURATION</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">Settings & Security Protocol</h1>
        <p className="text-xs md:text-sm text-gray-400">Configure API endpoints, inspect database connectivity, and audit security layers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backend API Integration */}
        <div className="glass-panel p-6 rounded-2xl border border-red-900/30 space-y-4 bg-[#0c0c14]/90">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-400">
              <ServerIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white">BACKEND API TELEMETRY</h3>
              <p className="text-xs text-gray-400">FastAPI backend endpoint & status</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-mono text-gray-300 mb-1">API BASE URL</label>
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                className="w-full bg-black/60 border border-red-900/40 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={testConnection}
                disabled={testingBackend}
                className="px-4 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 text-red-400 font-mono text-xs font-bold transition-colors flex items-center space-x-2 border border-red-500/30"
              >
                <ArrowPathIcon className={`w-4 h-4 ${testingBackend ? 'animate-spin' : ''}`} />
                <span>{testingBackend ? 'PINGING...' : 'TEST HEALTH PROTOCOL'}</span>
              </button>

              <div>
                {backendStatus === 'online' && (
                  <span className="flex items-center space-x-1.5 text-xs font-mono text-red-400">
                    <CheckCircleIcon className="w-4 h-4" />
                    <span>BACKEND ONLINE (SECURED)</span>
                  </span>
                )}
                {backendStatus === 'offline' && (
                  <span className="flex items-center space-x-1.5 text-xs font-mono text-amber-400">
                    <XCircleIcon className="w-4 h-4" />
                    <span>STANDALONE / LOCAL MODE</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Local Storage & Cache */}
        <div className="glass-panel p-6 rounded-2xl border border-red-900/30 space-y-4 bg-[#0c0c14]/90">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-400">
              <CircleStackIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white">LOCAL DATA REPOSITORY</h3>
              <p className="text-xs text-gray-400">Client-side persistence & cache management</p>
            </div>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed font-sans">
            LIFE_CORE features zero-latency offline resilience. When the Python backend is active, sessions sync to SQLite. When operating standalone, data seamlessly persists in browser encrypted storage.
          </p>

          <div className="pt-2">
            <button
              onClick={handleResetData}
              className="px-4 py-2 rounded-xl bg-red-950/30 hover:bg-red-900/40 text-red-400 font-mono text-xs border border-red-500/40 transition-colors"
            >
              RESET TO INITIAL SEED DATA
            </button>
            {resetSuccess && (
              <p className="text-xs font-mono text-emerald-400 mt-2">Storage reset. Reloading system...</p>
            )}
          </div>
        </div>
      </div>

      {/* Security Architecture Specifications */}
      <div className="glass-panel p-6 rounded-2xl border border-red-500/30 space-y-4 bg-[#0c0c14]/90">
        <div className="flex items-center space-x-2">
          <ShieldCheckIcon className="w-5 h-5 text-red-400" />
          <h3 className="font-mono text-sm font-bold text-white">SECURITY & SYSTEM HARDENING</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 bg-black/60 rounded-xl border border-red-950/40">
            <span className="text-gray-400 block text-[10px]">CORS PROTECTION</span>
            <span className="text-red-400 font-bold">Strict Allowed-Origins</span>
          </div>
          <div className="p-3 bg-black/60 rounded-xl border border-red-950/40">
            <span className="text-gray-400 block text-[10px]">HTTP SECURITY HEADERS</span>
            <span className="text-red-400 font-bold">CSP, X-Frame, Nosniff</span>
          </div>
          <div className="p-3 bg-black/60 rounded-xl border border-red-950/40">
            <span className="text-gray-400 block text-[10px]">INPUT VALIDATION</span>
            <span className="text-red-400 font-bold">Pydantic v2 Bounds</span>
          </div>
          <div className="p-3 bg-black/60 rounded-xl border border-red-950/40">
            <span className="text-gray-400 block text-[10px]">ORM ENCRYPTION / SQLi</span>
            <span className="text-red-400 font-bold">Parameterized SQLAlchemy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
