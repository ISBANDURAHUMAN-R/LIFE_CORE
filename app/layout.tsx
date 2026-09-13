import './globals.css';
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-background text-white min-h-screen">
      <head />
      <body className="flex min-h-screen">
        <QueryClientProvider client={queryClient}>
          {/* Desktop sidebar */}
          <div className="hidden md:flex md:w-64">
            <Sidebar />
          </div>
          {/* Main content */}
          <main className="flex-1 p-6 overflow-y-auto">
            {children}
          </main>
          {/* Mobile bottom nav */}
          <div className="flex md:hidden fixed inset-x-0 bottom-0 bg-surface glass shadow-glass">
            <BottomNav />
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
