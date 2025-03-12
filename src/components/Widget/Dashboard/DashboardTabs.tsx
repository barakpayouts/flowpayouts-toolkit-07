
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import PayoutList from './PayoutList';
import UploadInvoice from './UploadInvoice';
import TeamMembers from './TeamMembers';
import AccountSettings from './AccountSettings';
import { History, Upload, Settings, Users } from 'lucide-react';

const DashboardTabs: React.FC = () => {
  const { setIsInvoiceUploadOpen } = usePayoutWidget();
  const [activeTab, setActiveTab] = useState("history");
  
  return (
    <div className="dashboard-tabs-container mt-6">
      <Tabs 
        defaultValue="history" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="history" className="data-[state=active]:bg-white/20">
            <History size={16} className="mr-2" />
            <span className="hidden sm:inline">History</span>
          </TabsTrigger>
          <TabsTrigger value="invoices" className="data-[state=active]:bg-white/20">
            <Upload size={16} className="mr-2" />
            <span className="hidden sm:inline">Invoices</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-white/20">
            <Users size={16} className="mr-2" />
            <span className="hidden sm:inline">Team</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-white/20">
            <Settings size={16} className="mr-2" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="space-y-4">
          <PayoutList />
        </TabsContent>
        
        <TabsContent value="invoices" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Invoices</h3>
            <button
              onClick={() => setIsInvoiceUploadOpen(true)}
              className="flex items-center text-sm bg-payouts-accent text-payouts-dark px-3 py-1.5 rounded hover:bg-payouts-accent-light transition-colors"
            >
              <Upload size={16} className="mr-1" />
              Upload
            </button>
          </div>
          
          <div className="p-4 rounded-lg border border-white/10 text-center">
            <p className="text-sm mb-2">Upload invoices to get paid faster</p>
            <p className="text-xs opacity-70">
              Upload your invoices to request advanced payments or to keep track of your payment history
            </p>
            <button
              onClick={() => setIsInvoiceUploadOpen(true)}
              className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors"
            >
              Upload Your First Invoice
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="team">
          <TeamMembers />
        </TabsContent>
        
        <TabsContent value="settings">
          <AccountSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
