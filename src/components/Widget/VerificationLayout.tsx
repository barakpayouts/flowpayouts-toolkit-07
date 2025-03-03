
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Lock, Upload, FileText } from 'lucide-react';
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
  
  // Function to handle file upload directly from the component
  const handleUploadClick = () => {
    if (onUploadInvoice) {
      onUploadInvoice(); // Call the provided handler if it exists
    } else {
      // Fallback implementation if no handler provided
      showUploadOptions();
    }
  };
  
  // Shows upload options in a toast
  const showUploadOptions = () => {
    toast(
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Upload Invoice</h3>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
        >
          <FileText size={16} />
          From Computer
        </button>
        <button
          onClick={handleGoogleDriveUpload}
          className="text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 22L14.5 2H19.5L9.5 22H4.5Z" fill="#4285F4"/>
            <path d="M14.5 22L19.5 12H24.5L19.5 22H14.5Z" fill="#EA4335"/>
            <path d="M9.5 12L14.5 2L19.5 12L14.5 22L9.5 12Z" fill="#FBBC05"/>
            <path d="M0 12L4.5 2H9.5L5 12L0 12Z" fill="#34A853"/>
          </svg>
          From Google Drive
        </button>
      </div>,
      {
        duration: 5000,
        position: "bottom-center",
      }
    );
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
        toast.success("Invoice uploaded successfully", {
          description: "invoice_may2023.pdf has been added to your invoices"
        });
      }, 1500);
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success("Invoice uploaded successfully", {
        description: `${file.name} has been added to your invoices`
      });
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
      
      {/* Show Upload Invoice button if enabled */}
      {showUploadInvoice && (
        <div className="invoice-upload-container mb-4">
          <button
            onClick={handleUploadClick}
            className="upload-invoice-button w-full"
          >
            <Upload size={18} />
            <span>Upload Invoice</span>
          </button>
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
