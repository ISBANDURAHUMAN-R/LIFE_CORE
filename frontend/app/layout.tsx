import './globals.css';
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';
import Providers from '@/components/Providers';
import { ReactNode } from 'react';

export const metadata = {
  title: 'LIFE_CORE | Elite LifeOS Command Center',
  description: 'Your life. Your system. Your evolution. High-performance command center for deep work, cognitive energy, strategic goals, and intelligence.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark bg-[#050508] text-slate-100 min-h-screen">
      <body className="flex min-h-screen bg-[#050508] text-slate-100 font-sans selection:bg-red-600/35 selection:text-red-100">
        <Providers>
          {/* Desktop sidebar */}
          <div className="hidden md:flex md:w-64 md:flex-col fixed inset-y-0 z-30">
            <Sidebar />
          </div>

          {/* Main content viewport */}
          <main className="flex-1 md:pl-64 pb-20 md:pb-8 p-4 md:p-8 overflow-y-auto min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">
              {children}
            </div>
          </main>

          {/* Mobile bottom nav */}
          <div className="flex md:hidden fixed inset-x-0 bottom-0 z-40 bg-[#09090f]/95 backdrop-blur-xl border-t border-red-500/30 shadow-2xl">
            <BottomNav />
          </div>
        </Providers>
      </body>
    </html>
  );
}
