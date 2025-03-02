
import React from 'react';
import { DollarSign, Clock, FileText, Upload } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { usePayoutWidget, PayoutRecord, InvoiceData } from '@/contexts/PayoutWidgetContext';
import PayoutList from './PayoutList';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';

const DashboardTabs: React.FC = () => {
  const { config } = useWidgetConfig();
  const { 
    payouts, 
    setIsInvoiceUploadOpen, 
    handleViewInvoice, 
    uploadedInvoices 
  } = usePayoutWidget();
  
  // Convert payouts to invoice data format for viewing
  const payoutToInvoice = (payout: PayoutRecord): InvoiceData => ({
    id: payout.id,
    invoice: payout.invoice,
    date: payout.date,
    amount: payout.amount,
    description: payout.description,
    status: payout.status
  });
  
  return (
    <div className="dashboard-tabs mb-6">
      <Tabs defaultValue="payouts" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-4 bg-white/5 border-b border-white/10 rounded-none p-0">
          <TabsTrigger 
            value="payouts" 
            className={cn(
              "data-[state=active]:bg-transparent data-[state=active]:border-b-2",
              "data-[state=active]:border-b-[" + config.accentColor + "]",
              "data-[state=active]:shadow-none rounded-none py-3"
            )}
          >
            <div className="flex items-center gap-2">
              <DollarSign size={16} />
              <span>Payouts</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="pending" 
            className={cn(
              "data-[state=active]:bg-transparent data-[state=active]:border-b-2",
              "data-[state=active]:border-b-[" + config.accentColor + "]",
              "data-[state=active]:shadow-none rounded-none py-3"
            )}
          >
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Pending</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="invoices" 
            className={cn(
              "data-[state=active]:bg-transparent data-[state=active]:border-b-2",
              "data-[state=active]:border-b-[" + config.accentColor + "]",
              "data-[state=active]:shadow-none rounded-none py-3"
            )}
          >
            <div className="flex items-center gap-2">
              <FileText size={16} />
              <span>Invoices</span>
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="payouts" className="mt-0">
          <PayoutList 
            payouts={payouts.filter(p => p.status === 'Completed')} 
            handleViewInvoice={(payout) => handleViewInvoice(payoutToInvoice(payout))}
          />
        </TabsContent>
        
        <TabsContent value="pending" className="mt-0">
          <PayoutList 
            payouts={payouts.filter(p => p.status !== 'Completed')} 
            handleViewInvoice={(payout) => handleViewInvoice(payoutToInvoice(payout))}
          />
        </TabsContent>
        
        <TabsContent value="invoices" className="mt-0">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium">Your Invoices</h3>
            <Button 
              size="sm" 
              variant="glass"
              onClick={() => setIsInvoiceUploadOpen(true)}
              className="flex items-center gap-1"
            >
              <Upload size={14} />
              <span>Upload Invoice</span>
            </Button>
          </div>
          
          <div className="invoices-list space-y-3">
            {payouts.map(payout => (
              <div 
                key={payout.id} 
                className="invoice-item p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => handleViewInvoice(payoutToInvoice(payout))}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{payout.invoice}</p>
                    <p className="text-sm opacity-70">{payout.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar size={14} className="opacity-60" />
                      <span className="text-xs opacity-70">{payout.date}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">{payout.amount}</span>
                    <span className={`text-sm ${getStatusColor(payout.status)}`}>
                      {payout.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {uploadedInvoices.map(invoice => (
              <div 
                key={invoice.id} 
                className="invoice-item p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => handleViewInvoice(invoice)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{invoice.invoice}</p>
                    <p className="text-sm opacity-70">{invoice.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar size={14} className="opacity-60" />
                      <span className="text-xs opacity-70">{invoice.date}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">{invoice.amount}</span>
                    <span className={`text-sm ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                    {invoice.isUploaded && (
                      <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full mt-1">
                        Uploaded
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
