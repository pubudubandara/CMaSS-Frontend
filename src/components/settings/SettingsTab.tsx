import type { LucideIcon } from 'lucide-react';

interface SettingsTabProps {
  id: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
  onClick: (id: string) => void;
}

export default function SettingsTab({ id, label, icon: Icon, active, onClick }: SettingsTabProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
        active
          ? 'bg-primary-light text-primary font-bold'
          : 'text-dark-muted hover:bg-gray-100 hover:text-dark'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}