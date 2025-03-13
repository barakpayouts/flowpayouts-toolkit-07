import React from 'react';
import { DollarSign, Clock, FileText, Upload, Calendar, X, Download, Lock, FileImage, Eye, FilePlus, Search, Filter, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { usePayoutWidget, PayoutRecord, InvoiceData } from '@/contexts/PayoutWidgetContext';
import { cn, debugLog } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import InvoiceForm from './InvoiceForm';
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed': return 'text-green-500';
    case 'Pending': return 'text-yellow-500';
    case 'Awaiting Approval': return 'text-blue-500';
    default: return 'text-gray-500';
  }
};

const getStatusBgColor = (status: string) => {
  switch (status) {
    case 'Completed':
    case 'Payment Approved':
    case 'Paid': return 'bg-green-100 text-green-800';
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    case 'Awaiting Approval': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPaymentMethodIcon = (method: string) => {
  if (method.toLowerCase().includes('wire')) {
    return '🏦';
  } else if (method.toLowerCase().includes('paypal')) {
    return '💰';
  } else if (method.toLowerCase().includes('payoneer')) {
    return '💳';
  } else if (method.toLowerCase().includes('visa')) {
    return '💳';
  } else if (method.toLowerCase().includes('unionpay')) {
    return '💳';
  } else {
    return '💵';
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
    setIsInvoiceGeneratorOpen,
    companyName
  } = usePayoutWidget();
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [isUploading, setIsUploading] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploadSource, setUploadSource] = React.useState<'computer' | 'google' | null>(null);
  const [showInvoicePreview, setShowInvoicePreview] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [invoiceSearchTerm, setInvoiceSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const enhancedInvoices = React.useMemo(() => {
    const allInvoices = [
      ...uploadedInvoices.map(invoice => ({
        id: invoice.id,
        createdDate: invoice.date,
        scheduleDate: invoice.date,
        invoiceNumber: invoice.invoice,
        reference: "00056",
        paymentMethod: invoice.method || "Bank Transfer",
        vat: "8.25 %",
        status: invoice.status,
        amount: invoice.amount,
        description: invoice.description,
        isUploaded: invoice.isUploaded || false
      })),
      ...payouts.map(payout => ({
        id: payout.id,
        createdDate: payout.date,
        scheduleDate: payout.date,
        invoiceNumber: payout.invoice,
        reference: "00056",
        paymentMethod: payout.method,
        vat: "8.25 %",
        status: payout.status,
        amount: payout.amount,
        description: payout.description,
        isUploaded: false
      }))
    ];

    const sampleInvoices = [
      {
        id: "inv-1",
        createdDate: "01/03/2022",
        scheduleDate: "01/03/2022",
        invoiceNumber: "1456000194",
        reference: "00056",
        paymentMethod: "Wire",
        vat: "8.25 %",
        status: "Payment Approved",
        amount: "$7,500",
        description: "January commission payment",
        isUploaded: false
      },
      {
        id: "inv-2",
        createdDate: "01/03/2022",
        scheduleDate: "01/03/2022",
        invoiceNumber: "5491900054",
        reference: "00056",
        paymentMethod: "PayPal",
        vat: "8.25 %",
        status: "Paid",
        amount: "$3,600",
        description: "February commission payment",
        isUploaded: false
      },
      {
        id: "inv-3",
        createdDate: "01/03/2024",
        scheduleDate: "01/03/2024",
        invoiceNumber: "145600019",
        reference: "00056",
        paymentMethod: "Wire",
        vat: "8.25 %",
        status: "Pending",
        amount: "$3,600,000",
        description: "March commission payment",
        isUploaded: false
      },
      {
        id: "inv-4",
        createdDate: "01/03/2024",
        scheduleDate: "01/03/2024",
        invoiceNumber: "145600020",
        reference: "00056",
        paymentMethod: "PayPal",
        vat: "8.25 %",
        status: "Pending",
        amount: "$3,600,000",
        description: "Q1 performance bonus",
        isUploaded: false
      },
      {
        id: "inv-5",
        createdDate: "01/03/2024",
        scheduleDate: "01/03/2024",
        invoiceNumber: "5491900051",
        reference: "00056",
        paymentMethod: "Payoneer",
        vat: "8.25 %",
        status: "Pending",
        amount: "$3,600,000",
        description: "April commission payment",
        isUploaded: false
      }
    ];

    return [...sampleInvoices, ...allInvoices];
  }, [uploadedInvoices, payouts]);

  const filteredInvoices = React.useMemo(() => {
    return enhancedInvoices.filter(invoice => 
      invoice.invoiceNumber.toLowerCase().includes(invoiceSearchTerm.toLowerCase()) ||
      invoice.reference.toLowerCase().includes(invoiceSearchTerm.toLowerCase()) ||
      invoice.description.toLowerCase().includes(invoiceSearchTerm.toLowerCase())
    );
  }, [enhancedInvoices, invoiceSearchTerm]);

  const paginatedInvoices = React.useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredInvoices.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredInvoices, currentPage, rowsPerPage]);

  const totalPages = React.useMemo(() => 
    Math.ceil(filteredInvoices.length / rowsPerPage), 
    [filteredInvoices, rowsPerPage]
  );

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
    setTimeout(() => {
      setIsInvoiceGeneratorOpen(true);
      debugLog("Opening invoice generator dialog", { isInvoiceGeneratorOpen: true });
    }, 100);
  };

  const handleViewTableInvoice = (invoice: any) => {
    const invoiceData: InvoiceData = {
      id: invoice.id,
      invoice: invoice.invoiceNumber,
      date: invoice.createdDate,
      amount: invoice.amount,
      description: invoice.description,
      status: invoice.status as any,
      method: invoice.paymentMethod,
      isUploaded: invoice.isUploaded
    };
    handleViewInvoice(invoiceData);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
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

          <div className="invoices-list space-y-4">
            <div className="flex flex-col sm:flex-row gap-2 justify-between">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by Invoice #, Reference #" 
                  value={invoiceSearchTerm}
                  onChange={(e) => setInvoiceSearchTerm(e.target.value)}
                  className="pl-9 bg-background/5 border-white/10" 
                />
              </div>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="rounded-md border border-white/10 overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="font-semibold text-white">Created Date</TableHead>
                    <TableHead className="font-semibold text-white">Schedule Date</TableHead>
                    <TableHead className="font-semibold text-white">Invoice #</TableHead>
                    <TableHead className="font-semibold text-white">Reference #</TableHead>
                    <TableHead className="font-semibold text-white">Payment Method</TableHead>
                    <TableHead className="font-semibold text-white">VAT / ST</TableHead>
                    <TableHead className="font-semibold text-white">Status</TableHead>
                    <TableHead className="font-semibold text-white text-right">Amount</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedInvoices.map((invoice) => (
                    <TableRow 
                      key={invoice.id} 
                      className="border-white/10 hover:bg-white/10 cursor-pointer"
                      onClick={() => handleViewTableInvoice(invoice)}
                    >
                      <TableCell className="flex items-center gap-2">
                        <Calendar size={14} className="text-muted-foreground" />
                        {invoice.createdDate}
                      </TableCell>
                      <TableCell>{invoice.scheduleDate}</TableCell>
                      <TableCell>{invoice.invoiceNumber}</TableCell>
                      <TableCell>{invoice.reference}</TableCell>
                      <TableCell>
                        <span className="flex items-center gap-2">
                          <span className="text-lg">{getPaymentMethodIcon(invoice.paymentMethod)}</span>
                          {invoice.paymentMethod}
                        </span>
                      </TableCell>
                      <TableCell>{invoice.vat}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBgColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-medium">{invoice.amount}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <span>Rows per page:</span>
                <select 
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                  className="bg-white/5 border border-white/10 rounded px-2 py-1"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
              
              <div className="text-sm">
                {(currentPage - 1) * rowsPerPage + 1}–{Math.min(currentPage * rowsPerPage, filteredInvoices.length)} of {filteredInvoices.length}
              </div>
              
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(old => Math.max(old - 1, 1))} 
                      className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                      aria-disabled={currentPage === 1}
                      tabIndex={currentPage === 1 ? -1 : 0}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                    let pageNum = i + 1;
                    if (totalPages > 5) {
                      if (currentPage > 3) {
                        if (i === 0) {
                          pageNum = 1;
                        } else if (i === 1) {
                          return (
                            <PaginationItem key="ellipsis-1">
                              <span className="flex h-9 w-9 items-center justify-center">...</span>
                            </PaginationItem>
                          );
                        } else {
                          pageNum = i === 2 ? currentPage : i === 3 ? Math.min(currentPage + 1, totalPages - 1) : totalPages;
                        }
                      }
                    }
                    
                    return (
                      <PaginationItem key={`page-${pageNum}`}>
                        <PaginationLink 
                          onClick={() => setCurrentPage(pageNum)}
                          isActive={pageNum === currentPage}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(old => Math.min(old + 1, totalPages))}
                      className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
                      aria-disabled={currentPage === totalPages}
                      tabIndex={currentPage === totalPages ? -1 : 0}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
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
                    onClick={openInvoiceGenerator}
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
                onClick={openInvoiceGenerator}
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
          className="w-[95%] max-w-[600px] h-[90vh] max-h-[800px] flex flex-col widget-dialog-content overflow-hidden" 
          style={{ 
            background: config.primaryColor,
            borderColor: `${config.accentColor}20` 
          }}
        >
          <DialogHeader className="pb-2">
            <DialogTitle className="text-white flex items-center justify-between">
              <span>Invoice Preview: {selectedInvoice?.invoice}</span>
              <DialogClose className="rounded-full hover:bg-white/10 p-1">
                <X size={18} className="text-white/80" />
              </DialogClose>
            </DialogTitle>
            <DialogDescription className="text-white/80">
              Full preview of invoice document
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-grow overflow-auto mt-2 border border-white/10 rounded-lg bg-white/5">
            <div className="p-6 min-h-full text-white">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">INVOICE</h2>
                  <p className="text-white/90 text-lg">{selectedInvoice?.invoice}</p>
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

              <div className="grid grid-cols-2 gap-6 mb-8 bg-black/20 p-4 rounded-lg">
                <div>
                  <h3 className="text-white/90 font-medium mb-2 border-b border-white/10 pb-1">From</h3>
                  <p className="font-medium text-white">{companyName || "Your Company Name"}</p>
                  <p className="text-white/80">123 Business Street</p>
                  <p className="text-white/80">City, State 12345</p>
                  <p className="text-white/80">contact@yourcompany.com</p>
                </div>
                <div>
                  <h3 className="text-white/90 font-medium mb-2 border-b border-white/10 pb-1">To</h3>
                  <p className="font-medium text-white">Client Company</p>
                  <p className="text-white/80">456 Client Avenue</p>
                  <p className="text-white/80">Client City, State 67890</p>
                  <p className="text-white/80">billing@clientcompany.com</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-white/90 font-medium mb-3 border-b border-white/10 pb-1">Description</h3>
                <div className="border border-white/10 rounded-lg overflow-auto">
                  <table className="w-full text-left">
                    <thead className="bg-black/30 text-white">
                      <tr>
                        <th className="py-2 px-3 font-semibold">Item</th>
                        <th className="py-2 px-3 font-semibold text-center">Quantity</th>
                        <th className="py-2 px-3 font-semibold text-center">Rate</th>
                        <th className="py-2 px-3 font-semibold text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {selectedInvoice?.description?.split(", ").map((desc, index) => (
                        <tr key={index} className="hover:bg-black/10">
                          <td className="py-2 px-3 text-white">{desc}</td>
                          <td className="py-2 px-3 text-white/80 text-center">1</td>
                          <td className="py-2 px-3 text-white/80 text-center">
                            {index === 0 ? selectedInvoice?.amount : "$0.00"}
                          </td>
                          <td className="py-2 px-3 text-white text-right">
                            {index === 0 ? selectedInvoice?.amount : "$0.00"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end mb-8">
                <div className="w-64 bg-black/20 p-4 rounded-lg">
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <p className="text-white/80">Subtotal</p>
                    <p className="text-white">{selectedInvoice?.amount}</p>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <p className="text-white/80">Tax (10%)</p>
                    <p className="text-white">
                      {selectedInvoice?.amount ? 
                        `$${(parseFloat(selectedInvoice.amount.replace(/[^0-9.-]+/g, '')) * 0.1).toFixed(2)}` : 
                        "$0.00"}
                    </p>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <p className="text-white/80">Withholding (5%)</p>
                    <p className="text-white">
                      {selectedInvoice?.amount ? 
                        `-$${(parseFloat(selectedInvoice.amount.replace(/[^0-9.-]+/g, '')) * 0.05).toFixed(2)}` : 
                        "$0.00"}
                    </p>
                  </div>
                  <div className="flex justify-between py-2 mt-2 border-t border-white/10 font-medium">
                    <p className="text-white">Total</p>
                    <p className="text-white">
                      {selectedInvoice?.amount ? 
                        `$${(parseFloat(selectedInvoice.amount.replace(/[^0-9.-]+/g, '')) * 1.05).toFixed(2)}` : 
                        selectedInvoice?.amount}
                    </p>
                  </div>
                </div>
              </div>

              {selectedInvoice?.method && (
                <div className="mt-4 p-4 bg-black/20 rounded-lg mb-6">
                  <p className="text-white/90 font-medium border-b border-white/10 pb-1 mb-2">Payment Method</p>
                  <p className="text-white">{selectedInvoice?.method}</p>
                </div>
              )}

              <div className="mt-6 text-center border-t border-white/10 pt-4 text-white/60 text-sm">
                <p>Thank you for your business!</p>
                <p className="mt-1">Invoice generated by {companyName || "Your Company"} Payment System</p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="mt-4 flex items-center justify-between w-full">
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

      <Dialog open={isInvoiceGeneratorOpen} onOpenChange={setIsInvoiceGeneratorOpen}>
        <DialogContent 
          className="w-[95%] max-w-[800px] widget-dialog-content" 
          style={{ 
            background: config.primaryColor, 
            borderColor: `${config.accentColor}20` 
          }}
          hideCloseButton={true}
        >
          <DialogHeader>
            <DialogTitle className="text-white">Generate New Invoice</DialogTitle>
            <DialogDescription className="text-white/80">
              Create a professional invoice for your client with detailed information
            </DialogDescription>
          </DialogHeader>
          
          <InvoiceForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardTabs;
