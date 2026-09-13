import { ReactNode } from 'react';

interface ResourceCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export default function ResourceCard({ title, value, icon }: ResourceCardProps) {
  return (
    <div className="glass p-4 rounded-xl flex items-center space-x-4 shadow-glass">
      <div className="text-primary text-3xl">{icon}</div>
      <div className="flex flex-col">
        <span className="text-gray-400 text-sm">{title}</span>
        <span className="text-xl font-medium text-white">{value}</span>
      </div>
    </div>
  );
}
