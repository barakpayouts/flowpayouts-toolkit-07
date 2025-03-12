import React, { useState, useRef } from 'react';
import { X, Upload, FileText, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { toast } from "sonner";
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import { 
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface UploadInvoiceProps {
  onClose: () => void;
  isOpen: boolean;
}

const UploadInvoice: React.FC<UploadInvoiceProps> = ({ onClose, isOpen }) => {
  const { config } = useWidgetConfig();
  const { handleUploadInvoice } = usePayoutWidget();
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type", {
        description: "Please upload a PDF, JPEG, or PNG file."
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Maximum file size is 5MB."
      });
      return;
    }
    
    setFile(file);
  };

  const handleUpload = () => {
    if (!file) return;
    
    setUploading(true);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 10;
      if (currentProgress > 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        setTimeout(() => {
          setUploading(false);
          setUploaded(true);
          
          handleUploadInvoice(file);
          
          toast.success("Invoice uploaded successfully", {
            description: "Your invoice has been uploaded and will be processed."
          });
          
          setTimeout(() => {
            onClose();
          }, 1500);
        }, 500);
      }
      setProgress(currentProgress);
    }, 200);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setProgress(0);
    setUploading(false);
    setUploaded(false);
  };

  const getFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleGoogleDriveUpload = () => {
    toast.info("Google Drive", {
      description: "Connecting to Google Drive...",
    });
    
    setTimeout(() => {
      const mockFile = new File(["dummy content"], "invoice-from-drive.pdf", { type: "application/pdf" });
      setFile(mockFile);
      toast.success("File selected from Google Drive", {
        description: "invoice-from-drive.pdf has been selected"
      });
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent 
        className="widget-dialog-content border-0 p-0 overflow-hidden max-w-md w-full" 
        style={{ 
          background: `${config.primaryColor}`,
          border: `1px solid ${config.borderColor}`
        }}
      >
        <div className="p-6">
          <DialogTitle className="text-xl font-semibold text-white mb-4">
            Upload Invoice
          </DialogTitle>
          <DialogDescription className="text-sm text-white/70 mb-6">
            Upload your invoice to process your payment request
          </DialogDescription>
          
          {!file ? (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div 
                  className="upload-option p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 text-center"
                  onClick={openFileSelector}
                >
                  <div className="p-3 rounded-full bg-white/10">
                    <Upload size={20} style={{ color: config.accentColor }} />
                  </div>
                  <p className="font-medium text-sm text-white">From Computer</p>
                  <p className="text-xs opacity-70 text-white">Upload from your device</p>
                </div>
                
                <div 
                  className="upload-option p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 text-center"
                  onClick={handleGoogleDriveUpload}
                >
                  <div className="p-3 rounded-full bg-white/10">
                    <FileText size={20} style={{ color: config.accentColor }} />
                  </div>
                  <p className="font-medium text-sm text-white">Google Drive</p>
                  <p className="text-xs opacity-70 text-white">Import from Google Drive</p>
                </div>
              </div>
              
              <div 
                className={`upload-area ${dragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={openFileSelector}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center gap-3">
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: `${config.accentColor}20` }}
                  >
                    <Upload 
                      size={24} 
                      style={{ color: config.accentColor }} 
                    />
                  </div>
                  <div>
                    <p className="font-medium mb-1 text-white">Drop your invoice here</p>
                    <p className="text-xs text-white/60">or click to browse files</p>
                  </div>
                  <p className="text-xs text-white/60 mt-2">
                    Supports PDF, JPEG, PNG (max 5MB)
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="file-preview">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${config.accentColor}20` }}
                >
                  <FileText 
                    size={18} 
                    className="file-preview-icon"
                    style={{ color: config.accentColor }}
                  />
                </div>
                <div className="file-preview-info">
                  <p className="file-preview-name text-white">{file.name}</p>
                  <p className="file-preview-size text-white/70">{getFileSize(file.size)}</p>
                </div>
                {!uploading && !uploaded && (
                  <Button 
                    variant="dark" 
                    size="icon" 
                    onClick={handleRemoveFile}
                    className="h-7 w-7 bg-white/10"
                  >
                    <X size={14} />
                  </Button>
                )}
                {uploaded && (
                  <div 
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: config.accentColor }}
                  >
                    <Check size={14} className="text-payouts-dark" />
                  </div>
                )}
              </div>
              
              {(uploading || uploaded) && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-white">
                    <span>{uploaded ? 'Complete' : 'Uploading...'}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="progress-track">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${progress}%`,
                        background: config.accentColor
                      }} 
                    />
                  </div>
                </div>
              )}
              
              {!uploading && !uploaded && (
                <Button 
                  onClick={handleUpload}
                  className="w-full font-semibold"
                  style={{
                    background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}DD)`,
                    color: config.primaryColor,
                  }}
                >
                  <Upload size={16} className="mr-2" />
                  Upload Invoice
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadInvoice;
