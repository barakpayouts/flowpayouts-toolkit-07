
import React from 'react';
import { LogOut } from 'lucide-react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import NotificationsPanel from './Notifications/NotificationsPanel';

const DashboardHeader: React.FC = () => {
  const { handleLogout } = usePayoutWidget();
  
  return (
    <div className="dashboard-header mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Payouts Dashboard</h2>
        <div className="flex items-center gap-3">
          <NotificationsPanel />
          <button 
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm opacity-70 hover:opacity-100 transition-all hover:text-red-400"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <p className="text-sm opacity-70 mt-1">
        Manage your payouts and payment methods
      </p>
    </div>
  );
};

export default DashboardHeader;
