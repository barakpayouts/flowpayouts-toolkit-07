
import React from 'react';
import { DollarSign, Clock, FileText, Upload, Calendar, X, Download, Lock, FileImage, Eye, FilePlus } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { usePayoutWidget, PayoutRecord, InvoiceData } from '@/contexts/PayoutWidgetContext';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

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
  const { 
    payouts, 
    uploadedInvoices, 
    handleUploadInvoice, 
    handleViewInvoice, 
    handleDownloadInvoice,
    isInvoiceDetailOpen,
    setIsInvoiceDetailOpen,
    selectedInvoice,
    setSelectedInvoice,
    isInvoiceUploadOpen,
    setIsInvoiceUploadOpen,
    isInvoiceGeneratorOpen,
    setIsInvoiceGeneratorOpen
  } = usePayoutWidget();
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [isUploading, setIsUploading] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploadSource, setUploadSource] = React.useState<'computer' | 'google' | null>(null);
  const [showInvoicePreview, setShowInvoicePreview] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadSource('computer');
    }
  };

  const simulateUpload = () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + Math.random() * 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            handleUploadInvoice(selectedFile);
            setIsUploading(false);
            setSelectedFile(null);
            setUploadSource(null);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const handleGoogleDriveUpload = () => {
    setUploadSource('google');
    toast.info("Google Drive", {
      description: "Connecting to Google Drive...",
    });
    
    setTimeout(() => {
      const mockFile = new File(["dummy content"], "invoice-from-drive.pdf", { type: "application/pdf" });
      setSelectedFile(mockFile);
      toast.success("File selected from Google Drive", {
        description: "invoice-from-drive.pdf has been selected"
      });
    }, 1500);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleViewPayoutDetails = (payout: PayoutRecord) => {
    const invoice: InvoiceData = {
      id: payout.id,
      invoice: payout.invoice,
      date: payout.date,
      amount: payout.amount,
      description: payout.description,
      status: payout.status,
      method: payout.method
    };
    handleViewInvoice(invoice);
  };

  const handleViewInvoicePreview = () => {
    setShowInvoicePreview(true);
    toast.info("Opening invoice preview", {
      description: "Loading invoice preview..."
    });
  };

  const openInvoiceGenerator = () => {
    setIsInvoiceUploadOpen(false);
    setIsInvoiceGeneratorOpen(true);
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
              <div 
                key={payout.id} 
                className="payout-item p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => handleViewPayoutDetails(payout)}
              >
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
              <div 
                key={payout.id} 
                className="payout-item p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => handleViewPayoutDetails(payout)}
              >
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
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => setIsInvoiceUploadOpen(true)}
            >
              <Upload size={14} />
              <span>Upload Invoice</span>
            </Button>
          </div>

          <div className="invoices-list space-y-3">
            {uploadedInvoices.map(invoice => (
              <div 
                key={invoice.id} 
                className="invoice-item p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => handleViewInvoice(invoice)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{invoice.invoice}</p>
                      {invoice.isUploaded && (
                        <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>
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
                  </div>
                </div>
              </div>
            ))}
            
            {payouts.map(payout => (
              <div 
                key={payout.id} 
                className="invoice-item p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => handleViewPayoutDetails(payout)}
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

      <Dialog open={isInvoiceUploadOpen} onOpenChange={setIsInvoiceUploadOpen}>
        <DialogContent 
          className="w-[90%] max-w-[360px] widget-dialog-content" 
          style={{ 
            background: config.primaryColor, 
            borderColor: `${config.accentColor}20` 
          }}
        >
          <DialogHeader>
            <DialogTitle>Upload Invoice</DialogTitle>
            <DialogDescription>
              Upload an invoice from your computer or Google Drive
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6 space-y-4">
            {!selectedFile ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div 
                    className="upload-option p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 text-center"
                    onClick={openFileDialog}
                  >
                    <div className="p-3 rounded-full bg-white/10">
                      <FileImage size={20} style={{ color: config.accentColor }} />
                    </div>
                    <p className="font-medium text-sm">From Computer</p>
                    <p className="text-xs opacity-70">Upload from your device</p>
                  </div>
                  
                  <div 
                    className="upload-option p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 text-center"
                    onClick={handleGoogleDriveUpload}
                  >
                    <div className="p-3 rounded-full bg-white/10">
                      <FileText size={20} style={{ color: config.accentColor }} />
                    </div>
                    <p className="font-medium text-sm">Google Drive</p>
                    <p className="text-xs opacity-70">Import from Google Drive</p>
                  </div>
                  
                  <div 
                    className="upload-option p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 text-center"
                    onClick={() => openInvoiceGenerator()}
                  >
                    <div className="p-3 rounded-full bg-white/10">
                      <FilePlus size={20} style={{ color: config.accentColor }} />
                    </div>
                    <p className="font-medium text-sm">Generate New</p>
                    <p className="text-xs opacity-70">Create a new invoice</p>
                  </div>
                </div>
                
                <input 
                  type="file"
                  id="invoice-upload-input"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                />
                
                <div className="p-4 bg-white/5 rounded-lg border border-white/10 mt-6">
                  <p className="text-sm opacity-80 mb-3">Supported file types</p>
                  <div className="flex items-center gap-2">
                    <span className="bg-white/10 text-xs px-2 py-1 rounded">PDF</span>
                    <span className="bg-white/10 text-xs px-2 py-1 rounded">JPG</span>
                    <span className="bg-white/10 text-xs px-2 py-1 rounded">PNG</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="p-3 rounded-full bg-white/10 flex-shrink-0">
                    <FileText size={20} style={{ color: config.accentColor }} />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-sm">{selectedFile.name}</p>
                    <p className="text-xs opacity-70">
                      {(selectedFile.size / 1024).toFixed(1)} KB • {uploadSource === 'google' ? 'Google Drive' : 'Local file'}
                    </p>
                  </div>
                  <Button 
                    variant="dark" 
                    size="icon" 
                    className="flex-shrink-0 h-8 w-8"
                    onClick={() => {
                      setSelectedFile(null);
                      setUploadSource(null);
                    }}
                  >
                    <X size={14} />
                  </Button>
                </div>
                
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{Math.round(uploadProgress)}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter className="mt-6">
            <div className="flex gap-2 w-full">
              <Button 
                variant="dark" 
                className="flex-1"
                onClick={() => setIsInvoiceUploadOpen(false)}
              >
                Cancel
              </Button>
              
              {selectedFile && (
                <Button 
                  className="flex-1 text-gray-900 font-semibold hover:text-gray-900"
                  style={{
                    background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}DD)`,
                    boxShadow: `0 4px 15px ${config.accentColor}40`,
                  }}
                  disabled={!selectedFile || isUploading}
                  onClick={simulateUpload}
                >
                  {isUploading ? 'Uploading...' : 'Upload Invoice'}
                </Button>
              )}
            </div>
            
            {!selectedFile && (
              <Button 
                className="w-full mt-2 flex items-center justify-center gap-2 text-gray-900 font-semibold hover:text-gray-900"
                style={{
                  background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}DD)`,
                  boxShadow: `0 4px 15px ${config.accentColor}40`,
                }}
                onClick={() => openInvoiceGenerator()}
              >
                <FilePlus size={16} />
                <span>Generate New Invoice</span>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isInvoiceDetailOpen} onOpenChange={setIsInvoiceDetailOpen}>
        <DialogContent 
          className="w-[90%] max-w-[360px] widget-dialog-content" 
          style={{ 
            background: config.primaryColor, 
            borderColor: `${config.accentColor}20` 
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-white">
              {selectedInvoice?.method ? 'Payout Details' : 'Invoice'} {selectedInvoice?.invoice}
            </DialogTitle>
            <DialogDescription className="text-white/80">
              {selectedInvoice?.method ? 'Transaction details' : 'Invoice details'} for {selectedInvoice?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="invoice-details mt-4 space-y-4">
            <div className="invoice-preview p-6 bg-black/20 rounded-lg border border-white/10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-white">
                    {selectedInvoice?.method ? 'PAYOUT TRANSACTION' : 'INVOICE'}
                  </h3>
                  <p className="text-sm text-white">{selectedInvoice?.invoice}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white">Date</p>
                  <p className="font-medium text-white">{selectedInvoice?.date}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-white mb-1">Description</p>
                <p className="font-medium text-white">{selectedInvoice?.description}</p>
              </div>
              
              {selectedInvoice?.method && (
                <div className="mb-6">
                  <p className="text-sm text-white mb-1">Payment Method</p>
                  <p className="font-medium text-white">{selectedInvoice?.method}</p>
                </div>
              )}
              
              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <p className="text-white">Subtotal</p>
                  <p className="text-white">{selectedInvoice?.amount}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-white">Tax (0%)</p>
                  <p className="text-white">$0.00</p>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t border-white/10">
                  <p className="text-white">Total</p>
                  <p className="text-white">{selectedInvoice?.amount}</p>
                </div>
              </div>
              
              <div className="mt-4 bg-black/20 p-3 rounded border border-white/10">
                <p className="text-sm text-white mb-1">Status</p>
                <p className={`font-medium ${getStatusColor(selectedInvoice?.status || '')}`}>
                  {selectedInvoice?.status}
                </p>
                
                {selectedInvoice?.isUploaded && (
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <p className="text-xs text-blue-400">
                      This invoice was uploaded by you
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex sm:justify-between">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1 text-white border-white/20 hover:bg-white/10"
                onClick={handleDownloadInvoice}
              >
                <Download size={14} />
                <span>Download PDF</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1 text-white border-white/20 hover:bg-white/10"
                onClick={handleViewInvoicePreview}
              >
                <Eye size={14} />
                <span>View Invoice</span>
              </Button>
            </div>
            <DialogClose asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="text-white border-white/20 hover:bg-white/10"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showInvoicePreview} onOpenChange={setShowInvoicePreview}>
        <DialogContent 
          className="w-[90%] max-w-[360px] h-[80vh] max-h-[600px] flex flex-col widget-dialog-content" 
          style={{ 
            background: config.primaryColor,
            borderColor: `${config.accentColor}20` 
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-white">
              Invoice Preview: {selectedInvoice?.invoice}
            </DialogTitle>
            <DialogDescription className="text-white/80">
              Full preview of invoice document
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-grow overflow-auto mt-2 border border-white/10 rounded-lg">
            <div className="p-8 min-h-full bg-white/5 text-white">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">INVOICE</h2>
                  <p className="text-white/80 text-lg">{selectedInvoice?.invoice}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/80 mb-1">Date Issued</p>
                  <p className="text-white font-medium">{selectedInvoice?.date}</p>
                  <div className="mt-2 py-1 px-3 inline-block rounded-md" style={{
                    backgroundColor: selectedInvoice?.status === 'Completed' 
                      ? 'rgba(22, 163, 74, 0.2)' 
                      : selectedInvoice?.status === 'Pending' 
                        ? 'rgba(202, 138, 4, 0.2)' 
                        : 'rgba(37, 99, 235, 0.2)',
                    color: selectedInvoice?.status === 'Completed' 
                      ? '#4ade80' 
                      : selectedInvoice?.status === 'Pending' 
                        ? '#fcd34d' 
                        : '#93c5fd',
                  }}>
                    {selectedInvoice?.status}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-white/80 font-medium mb-2">From</h3>
                  <p className="font-medium text-white">Your Company Name</p>
                  <p className="text-white/80">123 Business Street</p>
                  <p className="text-white/80">City, State 12345</p>
                  <p className="text-white/80">contact@yourcompany.com</p>
                </div>
                <div>
                  <h3 className="text-white/80 font-medium mb-2">To</h3>
                  <p className="font-medium text-white">Client Company</p>
                  <p className="text-white/80">456 Client Avenue</p>
                  <p className="text-white/80">Client City, State 67890</p>
                  <p className="text-white/80">billing@clientcompany.com</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-white/80 font-medium mb-3">Description</h3>
                <div className="border border-white/10 rounded-lg overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-black/30 text-white">
                      <tr>
                        <th className="py-3 px-4">Item</th>
                        <th className="py-3 px-4">Quantity</th>
                        <th className="py-3 px-4">Rate</th>
                        <th className="py-3 px-4 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      <tr>
                        <td className="py-3 px-4 text-white">{selectedInvoice?.description}</td>
                        <td className="py-3 px-4 text-white/80">1</td>
                        <td className="py-3 px-4 text-white/80">{selectedInvoice?.amount}</td>
                        <td className="py-3 px-4 text-white text-right">{selectedInvoice?.amount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between py-2">
                    <p className="text-white/80">Subtotal</p>
                    <p className="text-white">{selectedInvoice?.amount}</p>
                  </div>
                  <div className="flex justify-between py-2">
                    <p className="text-white/80">Tax (0%)</p>
                    <p className="text-white">$0.00</p>
                  </div>
                  <div className="flex justify-between py-2 border-t border-white/10 font-medium">
                    <p className="text-white">Total</p>
                    <p className="text-white">{selectedInvoice?.amount}</p>
                  </div>
                </div>
              </div>

              {selectedInvoice?.method && (
                <div className="mt-8 p-4 bg-black/20 rounded-lg">
                  <p className="text-white/80 font-medium">Payment Method</p>
                  <p className="text-white">{selectedInvoice?.method}</p>
                </div>
              )}

              <div className="mt-8 text-center text-white/60 text-sm">
                <p>Thank you for your business!</p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="mt-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDownloadInvoice}
              className="gap-1 text-white border-white/20 hover:bg-white/10"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </Button>
            <Button 
              onClick={() => setShowInvoicePreview(false)}
              style={{
                backgroundColor: config.accentColor,
                color: "black"
              }}
              size="sm"
            >
              Close Preview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardTabs;
