
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Lock, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
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
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Function to handle upload button click
  const handleUploadClick = () => {
    if (onUploadInvoice) {
      onUploadInvoice();
    } else {
      console.log("Opening upload dialog");
      setShowUploadDialog(true);
    }
  };
  
  // Function to handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFileName(files[0].name);
      toast.success("File selected", {
        description: `Selected ${files[0].name}`
      });
    }
  };
  
  // Function to trigger file input click
  const handleChooseFile = () => {
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
      
      {/* Show upload button if requested */}
      {showUploadInvoice && (
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
      
      {/* Simple Upload Invoice Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="bg-payouts-dark border-white/10 text-white max-w-md w-[90%]">
          <DialogHeader>
            <DialogTitle>Upload Invoice</DialogTitle>
            <DialogDescription className="text-white/70">
              Select an invoice document to upload for processing
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
            {selectedFileName ? (
              <div className="flex flex-col items-center">
                <div className="bg-white/10 p-3 rounded-md text-white mb-3 max-w-full overflow-hidden text-ellipsis">
                  <span className="font-medium">{selectedFileName}</span>
                </div>
                <Button 
                  variant="outline"
                  className="bg-white/10 border-white/20 hover:bg-white/20"
                  onClick={() => setSelectedFileName(null)}
                >
                  Select a different file
                </Button>
              </div>
            ) : (
              <>
                <Upload className="mx-auto h-12 w-12 text-white/50 mb-4" />
                <p className="text-sm text-white/70 mb-4">
                  Drag and drop your invoice here, or click to browse
                </p>
                <input 
                  type="file" 
                  className="hidden" 
                  id="invoice-upload" 
                  accept=".pdf,.jpg,.jpeg,.png" 
                  onChange={handleFileSelect}
                  ref={fileInputRef}
                />
                <Button 
                  variant="outline"
                  className="bg-white/10 border-white/20 hover:bg-white/20"
                  onClick={handleChooseFile}
                  type="button"
                >
                  Select File
                </Button>
                <p className="text-xs text-white/50 mt-4">
                  Supported formats: PDF, JPG, PNG (Max size: 10MB)
                </p>
              </>
            )}
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button 
              variant="dark"
              onClick={() => setShowUploadDialog(false)}
            >
              Cancel
            </Button>
            <Button
              style={{
                background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}DD)`,
              }}
              className="text-payouts-dark font-medium"
              onClick={() => {
                if (selectedFileName) {
                  toast.success("File uploaded successfully", {
                    description: `Uploaded ${selectedFileName}`
                  });
                  setShowUploadDialog(false);
                  setSelectedFileName(null);
                }
              }}
              disabled={!selectedFileName}
            >
              Upload
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VerificationLayout;
