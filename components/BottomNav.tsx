'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  ClipboardDocumentListIcon, 
  FlagIcon, 
  LightBulbIcon, 
  ChartBarIcon, 
  Cog6ToothIcon 
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Core', href: '/', icon: HomeIcon },
  { name: 'Activities', href: '/activities', icon: ClipboardDocumentListIcon },
  { name: 'Goals', href: '/goals', icon: FlagIcon },
  { name: 'What‑If', href: '/whatif', icon: LightBulbIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-around items-center h-16 w-full px-2 py-1 bg-[#09090f]/95 border-t border-red-500/30">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all duration-150 ${
              active ? 'text-red-400 font-bold' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Icon className={`h-5 w-5 ${active ? 'text-red-400 stroke-2 drop-shadow-[0_0_8px_rgba(255,42,81,0.6)]' : 'text-gray-400'}`} />
            <span className="text-[10px] font-mono mt-0.5">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
