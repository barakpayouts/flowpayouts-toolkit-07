import React, { useState } from 'react';
import { DollarSign, Clock, FileText, Upload, Calendar, X, Download, Lock } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { usePayoutWidget, PayoutRecord, InvoiceData } from '@/contexts/PayoutWidgetContext';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

// Function to determine status color based on payment status
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed': return 'text-green-500';
    case 'Pending': return 'text-yellow-500';
    case 'Awaiting Approval': return 'text-blue-500';
    default: return 'text-gray-500';
  }
};

const DashboardTabs: React.FC = () => {
  const { config } = useWidgetConfig();
  const { payouts } = usePayoutWidget();
  const [selectedInvoice, setSelectedInvoice] = useState<PayoutRecord | null>(null);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [fileUploadName, setFileUploadName] = useState<string | null>(null);

  const handleInvoiceClick = (invoice: PayoutRecord) => {
    setSelectedInvoice(invoice);
    setInvoiceDialogOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileUploadName(file.name);
      // Simulating upload success
      setTimeout(() => {
        toast.success("Invoice uploaded successfully", {
          description: `${file.name} has been uploaded and is being processed.`
        });
        setFileUploadName(null);
      }, 1500);
    }
  };

  return (
    <div className="dashboard-tabs mb-6">
      <Tabs defaultValue="payouts" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-4 bg-white/5 border-b border-white/10 rounded-none p-0">
          <TabsTrigger 
            value="payouts" 
            className={cn(
              "data-[state=active]:bg-transparent data-[state=active]:border-b-2",
              `data-[state=active]:border-b-[${config.accentColor}]`,
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
              `data-[state=active]:border-b-[${config.accentColor}]`,
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
              `data-[state=active]:border-b-[${config.accentColor}]`,
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
          <div className="payouts-list space-y-3">
            {payouts.filter(p => p.status === 'Completed').map(payout => (
              <div key={payout.id} className="payout-item p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{payout.amount}</p>
                    <p className="text-sm opacity-70">{payout.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar size={14} className="opacity-60" />
                      <span className="text-xs opacity-70">{payout.date}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-sm font-medium ${getStatusColor(payout.status)}`}>
                      {payout.status}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar size={14} className="opacity-60" />
                      <span className="text-xs opacity-70">{payout.method}</span>
                    </div>
                    <div className="text-xs opacity-70 mt-1">
                      Invoice: {payout.invoice}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-0">
          <div className="pending-list space-y-3">
            {payouts.filter(p => p.status !== 'Completed').map(payout => (
              <div key={payout.id} className="payout-item p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{payout.amount}</p>
                    <p className="text-sm opacity-70">{payout.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar size={14} className="opacity-60" />
                      <span className="text-xs opacity-70">{payout.date}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-sm font-medium ${getStatusColor(payout.status)}`}>
                      {payout.status}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar size={14} className="opacity-60" />
                      <span className="text-xs opacity-70">{payout.method}</span>
                    </div>
                    <div className="text-xs opacity-70 mt-1">
                      Invoice: {payout.invoice}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="invoices" className="mt-0">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium">Your Invoices</h3>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload size={14} />
                  <span>Upload Invoice</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Upload New Invoice</h4>
                  <p className="text-sm opacity-70">Upload a PDF or image of your invoice</p>
                  
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-white/5 border-white/20 hover:bg-white/10">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {fileUploadName ? (
                          <div className="text-center">
                            <p className="mb-2 text-sm text-gray-300">{fileUploadName}</p>
                            <p className="text-xs text-gray-400">Uploading...</p>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-300"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-400">PDF, PNG, JPG or JPEG (MAX. 10MB)</p>
                          </>
                        )}
                      </div>
                      <input 
                        id="dropzone-file" 
                        type="file" 
                        className="hidden" 
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="invoices-list space-y-3">
            {payouts.map(payout => (
              <div 
                key={payout.id} 
                className="invoice-item p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => handleInvoiceClick(payout)}
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
          </div>
        </TabsContent>
      </Tabs>

      {/* Invoice Detail Dialog */}
      <Dialog open={invoiceDialogOpen} onOpenChange={setInvoiceDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invoice {selectedInvoice?.invoice}</DialogTitle>
            <DialogDescription>
              Invoice details for {selectedInvoice?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="invoice-details mt-4 space-y-4">
            <div className="invoice-preview p-6 bg-white/5 rounded-lg border border-white/10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-1">INVOICE</h3>
                  <p className="text-sm opacity-70">{selectedInvoice?.invoice}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-70">Date</p>
                  <p className="font-medium">{selectedInvoice?.date}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm opacity-70 mb-1">Description</p>
                <p className="font-medium">{selectedInvoice?.description}</p>
              </div>
              
              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <p className="opacity-70">Subtotal</p>
                  <p>{selectedInvoice?.amount}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="opacity-70">Tax (0%)</p>
                  <p>$0.00</p>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t border-white/10">
                  <p>Total</p>
                  <p>{selectedInvoice?.amount}</p>
                </div>
              </div>
              
              <div className="mt-4 bg-white/5 p-3 rounded border border-white/10">
                <p className="text-sm opacity-70 mb-1">Payment Method</p>
                <p className="font-medium">{selectedInvoice?.method}</p>
                <p className="text-sm opacity-70 mt-2">Status: <span className={getStatusColor(selectedInvoice?.status || '')}>{selectedInvoice?.status}</span></p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" size="sm" className="gap-1">
              <Download size={14} />
              <span>Download PDF</span>
            </Button>
            <DialogClose asChild>
              <Button variant="secondary" size="sm">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardTabs;
