import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, ClipboardListIcon, FlagIcon, ChartBarIcon, CogIcon, LightBulbIcon } from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Activities', href: '/activities', icon: ClipboardListIcon },
  { name: 'Goals', href: '/goals', icon: FlagIcon },
  { name: 'What‑If', href: '/whatif', icon: LightBulbIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="h-full w-full bg-surface glass p-4 flex flex-col space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center space-x-3 p-2 rounded-md transition-colors 
              ${active ? 'bg-primary bg-opacity-20 text-primary' : 'text-gray-300 hover:bg-white hover:bg-opacity-10'}
            `}
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
