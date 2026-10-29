'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  ClipboardDocumentListIcon, 
  FlagIcon, 
  ChartBarIcon, 
  Cog6ToothIcon, 
  LightBulbIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, tag: 'CORE' },
  { name: 'Activities', href: '/activities', icon: ClipboardDocumentListIcon, tag: 'LOG' },
  { name: 'Goals', href: '/goals', icon: FlagIcon, tag: 'OBJ' },
  { name: 'What‑If Simulation', href: '/whatif', icon: LightBulbIcon, tag: 'SIM' },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon, tag: 'DATA' },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon, tag: 'CFG' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full w-full glass-panel border-r border-red-500/20 flex flex-col justify-between p-5 relative overflow-hidden bg-[#09090f]/90">
      {/* Background ambient crimson glow */}
      <div className="absolute top-0 left-0 w-36 h-36 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-36 h-36 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Header / Logo */}
        <div className="flex items-center space-x-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 flex items-center justify-center shadow-lg shadow-red-600/30 border border-red-400/40">
            <BoltIcon className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold tracking-wider text-lg text-white font-mono">LIFE_CORE</span>
              <span className="text-[10px] bg-red-500/20 text-red-400 font-mono px-1.5 py-0.5 rounded border border-red-500/40">v1.1</span>
            </div>
            <p className="text-xs text-gray-400 font-mono tracking-widest">NEURAL LIFEOS</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 border ${
                  active
                    ? 'bg-gradient-to-r from-red-600/25 via-rose-600/20 to-red-900/10 border-red-500/50 text-red-400 shadow-lg shadow-red-600/20'
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5 hover:border-red-500/20'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${active ? 'text-red-400 stroke-2' : 'text-gray-400 group-hover:text-red-400'}`} />
                  <span className="font-medium text-sm tracking-wide">{item.name}</span>
                </div>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded transition-colors ${
                  active ? 'bg-red-500/25 text-red-300 border border-red-500/40' : 'text-gray-600 group-hover:text-gray-400'
                }`}>
                  {item.tag}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer System Status */}
      <div className="pt-4 border-t border-red-500/20">
        <div className="glass-panel-elevated p-3.5 rounded-xl border border-red-500/30">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-mono text-gray-400">KERNEL PROTOCOL</span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-red-600" />
            </span>
          </div>
          <div className="flex justify-between items-baseline text-xs">
            <span className="text-gray-300 font-medium">STATUS</span>
            <span className="font-mono text-red-400 font-bold">SECURED 99.8%</span>
          </div>
          <div className="w-full bg-gray-900 rounded-full h-1.5 mt-2 overflow-hidden border border-red-950">
            <div className="bg-gradient-to-r from-red-600 via-rose-500 to-red-400 h-1.5 rounded-full w-[99.8%] shadow-sm shadow-red-500/50" />
          </div>
        </div>
      </div>
    </aside>
  );
}
