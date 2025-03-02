
import React from 'react';
import DashboardHeader from './DashboardHeader';
import CurrentMethodCard from './CurrentMethodCard';
import DashboardTabs from './DashboardTabs';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <CurrentMethodCard />
      <DashboardTabs />
    </div>
  );
};

export default Dashboard;
