import { CreditCard } from 'lucide-react';

export default function BillingPanel() {
  return (
    <div className="p-6 flex flex-col items-center justify-center h-full text-center py-20">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <CreditCard size={32} className="text-gray-400" />
      </div>
      <h2 className="text-lg font-bold text-dark">Free Tier Active</h2>
      <p className="text-sm text-dark-muted max-w-xs mt-2">
        You are currently on the free Developer plan. Upgrade to scale your content.
      </p>
      <button className="mt-6 px-4 py-2 border border-gray-300 text-dark text-sm font-bold rounded hover:bg-gray-50 transition-colors">
        View Plans
      </button>
    </div>
  );
}