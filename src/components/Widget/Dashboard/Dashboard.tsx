
import React, { useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import CurrentMethodCard from './CurrentMethodCard';
import DashboardTabs from './DashboardTabs';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';

interface DashboardProps {
  onBack?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const { handleBackStep, showDashboard, advanceType } = usePayoutWidget();
  
  // Log when Dashboard renders to confirm it's being shown
  useEffect(() => {
    console.log("Dashboard component mounted, showDashboard:", showDashboard);
    if (advanceType) {
      console.log("Advance type:", advanceType);
    }
  }, [showDashboard, advanceType]);
  
  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <CurrentMethodCard />
      <DashboardTabs />
      
      {onBack && (
        <button
          onClick={onBack || handleBackStep}
          className="mt-6 w-full py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-sm"
        >
          Back
        </button>
      )}
    </div>
  );
};

export default Dashboard;
