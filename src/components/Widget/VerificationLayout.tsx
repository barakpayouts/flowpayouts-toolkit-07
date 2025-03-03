
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Lock, Upload, FileText, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { toast } from 'sonner';

interface VerificationLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  onBack: () => void;
  onNext: () => void;
  isLastStep: boolean;
  isComplete?: boolean;
  isAuthorized?: boolean;
  setIsAuthorized?: (value: boolean) => void;
  disableNext?: boolean;
  buttonText?: string;
  hideButtons?: boolean;
  showUploadInvoice?: boolean; // Prop to control invoice upload visibility
  onUploadInvoice?: () => void; // New prop for handling invoice upload
}

const VerificationLayout: React.FC<VerificationLayoutProps> = ({
  children,
  title,
  description,
  onBack,
  onNext,
  isLastStep,
  isComplete = false,
  isAuthorized = false,
  setIsAuthorized,
  disableNext = false,
  buttonText,
  hideButtons = false,
  showUploadInvoice = false,
  onUploadInvoice,
}) => {
  const { config } = useWidgetConfig();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [invoiceUploaded, setInvoiceUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Function to handle file upload directly from the component
  const handleUploadClick = () => {
    if (onUploadInvoice) {
      onUploadInvoice(); // Call the provided handler if it exists
    } else {
      // Show file upload UI instead of toast options
      fileInputRef.current?.click();
    }
  };
  
  const handleGoogleDriveUpload = () => {
    // Simulate Google Drive integration
    toast.info("Connecting to Google Drive...");
    setTimeout(() => {
      toast.success("Connected to Google Drive", {
        description: "Select a file from your Google Drive"
      });
      // Simulate file selection after delay
      setTimeout(() => {
        const fileName = "invoice_may2023.pdf";
        setUploadedFileName(fileName);
        setInvoiceUploaded(true);
        toast.success("Invoice uploaded successfully", {
          description: `${fileName} has been added to your invoices`
        });
      }, 1500);
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setInvoiceUploaded(true);
      toast.success("Invoice uploaded successfully", {
        description: `${file.name} has been added to your invoices`
      });
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedFileName(file.name);
      setInvoiceUploaded(true);
      toast.success("Invoice uploaded successfully", {
        description: `${file.name} has been added to your invoices`
      });
    }
  };

  return (
    <div className="py-5">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        {description && <p className="text-white/70">{description}</p>}
      </div>
      
      {/* Hidden file input for invoice upload */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
        onChange={handleFileChange}
      />
      
      {/* Show Upload Invoice UI if enabled */}
      {showUploadInvoice && (
        <div className="invoice-upload-container mb-4">
          {invoiceUploaded ? (
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-3">
                  <Check size={24} className="text-white" />
                </div>
                <p className="font-medium">Invoice uploaded successfully!</p>
                
                {uploadedFileName && (
                  <div className="mt-4 flex justify-center">
                    <div className="p-4 bg-white/10 rounded-lg w-full max-w-md flex items-center justify-center gap-3">
                      <FileText size={24} className="text-white" />
                      <span className="font-medium truncate">{uploadedFileName}</span>
                    </div>
                  </div>
                )}
                
                <p className="text-sm opacity-70 mt-4">Your invoice has been added to your account</p>
                
                <button 
                  className="mt-4 py-2 px-4 rounded text-sm font-medium bg-white/10 hover:bg-white/20 transition-colors"
                  onClick={() => {
                    setInvoiceUploaded(false);
                    setUploadedFileName(null);
                  }}
                >
                  Upload Another Invoice
                </button>
              </div>
            </div>
          ) : (
            <div 
              className={`upload-container ${isDragging ? 'bg-white/10' : 'bg-white/5'} border ${isDragging ? 'border-' + config.accentColor : 'border-white/10'} rounded-lg p-6 text-center transition-all mb-4`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <div className="upload-icon w-20 h-20 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <Upload size={32} className="opacity-70" />
                </div>
                <p className="font-medium mb-2">Drag & drop your invoice here</p>
                <p className="text-sm opacity-70 mb-4">or</p>
                <div className="flex flex-col sm:flex-row justify-center gap-2">
                  <button 
                    className="py-2 px-4 rounded text-sm font-medium" 
                    style={{backgroundColor: config.accentColor, color: 'black'}}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choose From Computer
                  </button>
                  
                  <button 
                    className="py-2 px-4 rounded text-sm font-medium bg-white/10 hover:bg-white/20 transition-colors" 
                    onClick={handleGoogleDriveUpload}
                  >
                    Import From Google Drive
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {children}
      
      {!hideButtons && ( // Only render this section if hideButtons is false
        <div className="mt-6 bg-white/5 backdrop-blur-md p-5 rounded-xl border border-white/10">
          {setIsAuthorized && (
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <input
                  id="authorize"
                  type="checkbox"
                  checked={isAuthorized}
                  onChange={() => setIsAuthorized(!isAuthorized)}
                  className="w-4 h-4 opacity-0 absolute"
                />
                <div 
                  className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center transition-all",
                    isAuthorized 
                      ? "bg-gradient-to-r border-0" 
                      : "bg-white/5 border-white/20"
                  )}
                  style={{
                    background: isAuthorized 
                      ? `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}DD)` 
                      : undefined,
                  }}
                >
                  {isAuthorized && <Lock size={12} className="text-payouts-dark" />}
                </div>
              </div>
              <label 
                htmlFor="authorize"
                className="text-sm font-medium leading-none cursor-pointer"
              >
                I authorize the verification of my bank account
              </label>
            </div>
          )}
          
          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-lg mb-5">
            <Lock 
              size={18} 
              style={{ color: config.accentColor }} 
            />
            <p className="text-xs text-white/80">
              Your information is protected with bank-level encryption and will be used solely for verification purposes
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={onBack}
              variant="dark"
              className="flex-1 text-white font-medium"
            >
              Back
            </Button>
            <Button
              onClick={onNext}
              disabled={disableNext}
              className="flex-1 text-gray-900 font-semibold hover:text-gray-900"
              style={{
                background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}DD)`,
                boxShadow: `0 4px 15px ${config.accentColor}40`,
              }}
            >
              {buttonText || (isLastStep ? 'Complete' : 'Next')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationLayout;
