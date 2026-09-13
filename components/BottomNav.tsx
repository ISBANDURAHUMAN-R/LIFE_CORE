import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, ClipboardListIcon, FlagIcon, LightBulbIcon, ChartBarIcon, CogIcon } from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Activities', href: '/activities', icon: ClipboardListIcon },
  { name: 'Goals', href: '/goals', icon: FlagIcon },
  { name: 'What‑If', href: '/whatif', icon: LightBulbIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="flex justify-around items-center h-full bg-surface glass">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center py-1 transition-colors 
              ${active ? 'text-primary' : 'text-gray-400 hover:text-gray-200'}
            `}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
