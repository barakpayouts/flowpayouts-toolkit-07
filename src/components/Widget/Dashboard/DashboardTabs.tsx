
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import PayoutList from './PayoutList';
import TeamMembers from './TeamMembers';
import AccountSettings from './AccountSettings';
import { History, Upload, Settings, Users, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardTabs: React.FC = () => {
  const { 
    setIsInvoiceUploadOpen, 
    uploadedInvoices,
    handleViewInvoice
  } = usePayoutWidget();
  const [activeTab, setActiveTab] = useState("history");
  
  const handleUploadClick = () => {
    setIsInvoiceUploadOpen(true);
  };
  
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
            <Button
              onClick={handleUploadClick}
              className="flex items-center text-sm bg-payouts-accent text-payouts-dark px-3 py-1.5 rounded hover:bg-payouts-accent-light transition-colors"
            >
              <Upload size={16} className="mr-1" />
              Upload
            </Button>
          </div>
          
          {uploadedInvoices.length > 0 ? (
            <div className="space-y-3">
              {uploadedInvoices.map((invoice) => (
                <div 
                  key={invoice.id}
                  className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-between"
                  onClick={() => handleViewInvoice(invoice)}
                >
                  <div className="flex items-center">
                    <div className="mr-3 p-2 bg-white/10 rounded-full">
                      <FileText size={16} />
                    </div>
                    <div>
                      <p className="font-medium">{invoice.invoice}</p>
                      <p className="text-sm opacity-70">{invoice.date} • {invoice.amount}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    invoice.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                    invoice.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-lg border border-white/10 text-center">
              <p className="text-sm mb-2 text-white">Upload invoices to get paid faster</p>
              <p className="text-xs opacity-70 text-white">
                Upload your invoices to request advanced payments or to keep track of your payment history
              </p>
              <Button
                onClick={handleUploadClick}
                className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors text-white"
              >
                Upload Your First Invoice
              </Button>
            </div>
          )}
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
