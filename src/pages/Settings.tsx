import { useState } from 'react';
import { 
  Key, CreditCard, User
} from 'lucide-react';
import SettingsTab from '../components/settings/SettingsTab';
import APIKeysPanel from '../components/settings/APIKeysPanel';
import ProfilePanel from '../components/settings/ProfilePanel';
import BillingPanel from '../components/settings/BillingPanel';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-6xl mx-auto flex gap-8">
      
      {/* 1. Settings Sidebar (Navigation) */}
      <aside className="w-64 flex-shrink-0">
        <h1 className="text-2xl font-bold text-dark mb-6">Settings</h1>
        <nav className="space-y-1">
          <SettingsTab 
            id="profile" 
            label="General Profile" 
            icon={User} 
            active={activeTab === 'profile'} 
            onClick={setActiveTab} 
          />
          <SettingsTab 
            id="api-keys" 
            label="API Keys" 
            icon={Key} 
            active={activeTab === 'api-keys'} 
            onClick={setActiveTab} 
          />
          <SettingsTab 
            id="billing" 
            label="Billing & Usage" 
            icon={CreditCard} 
            active={activeTab === 'billing'} 
            onClick={setActiveTab} 
          />
        </nav>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 bg-white border border-border rounded-lg shadow-sm min-h-[500px]">
        {activeTab === 'api-keys' && <APIKeysPanel />}
        {activeTab === 'profile' && <ProfilePanel />}
        {activeTab === 'billing' && <BillingPanel />}
        {/* Add other panels as needed */}
      </div>

    </div>
  );
}

// --- Sub-Components ---