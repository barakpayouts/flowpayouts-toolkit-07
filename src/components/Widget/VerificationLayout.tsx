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
  showUploadInvoice?: boolean;
  onUploadInvoice?: () => void;
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
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUploadSuccess(file.name);
    }
  };
  
  const handleFileUploadSuccess = (fileName: string) => {
    setUploadedFileName(fileName);
    setFileUploaded(true);
    toast.success("Invoice uploaded successfully", {
      description: `${fileName} has been added to your account`
    });
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleUploadClick = () => {
    // If onUploadInvoice is provided, use that instead
    if (onUploadInvoice) {
      onUploadInvoice();
      return;
    }
    
    // Otherwise, trigger the file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className="py-5">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        {description && <p className="text-white/70">{description}</p>}
      </div>
      
      {/* Hidden file input for direct uploads */}
      {showUploadInvoice && !onUploadInvoice && (
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
          onChange={handleFileChange}
        />
      )}
      
      {/* Show upload button if requested */}
      {showUploadInvoice && !fileUploaded && (
        <div className="mb-6 text-center">
          <Button
            onClick={handleUploadClick}
            variant="glass"
            className="mx-auto flex items-center gap-2"
          >
            <Upload size={16} />
            Upload Invoice
          </Button>
        </div>
      )}
      
      {/* Show success message if file was uploaded */}
      {showUploadInvoice && fileUploaded && !onUploadInvoice && (
        <div className="mb-6 text-center">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4 mx-auto max-w-md">
            <div className="text-center">
              <div className="mx-auto w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mb-3">
                <Check size={20} className="text-white" />
              </div>
              <p className="font-medium">Invoice uploaded successfully!</p>
              
              {uploadedFileName && (
                <div className="mt-4 flex justify-center">
                  <div className="p-3 bg-white/10 rounded-lg w-full max-w-md flex items-center justify-center gap-2">
                    <FileText size={20} className="text-white" />
                    <span className="font-medium truncate">{uploadedFileName}</span>
                  </div>
                </div>
              )}
              
              <Button 
                className="mt-4 py-2 px-4"
                variant="glass"
                size="sm"
                onClick={() => setFileUploaded(false)}
              >
                Upload Another
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {children}
      
      {!hideButtons && (
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
