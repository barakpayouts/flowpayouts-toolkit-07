
import React, { useState, useRef } from 'react';
import { X, Upload, FileText, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { toast } from "sonner";

interface UploadInvoiceProps {
  onClose: () => void;
}

const UploadInvoice: React.FC<UploadInvoiceProps> = ({ onClose }) => {
  const { config } = useWidgetConfig();
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
    // Check file type
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type", {
        description: "Please upload a PDF, JPEG, or PNG file."
      });
      return;
    }
    
    // Check file size (max 5MB)
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
    
    // Simulate upload progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 10;
      if (currentProgress > 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Simulate completion after progress reaches 100%
        setTimeout(() => {
          setUploading(false);
          setUploaded(true);
          
          toast.success("Invoice uploaded successfully", {
            description: "Your invoice has been uploaded and will be processed."
          });
          
          // Close modal after a short delay
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div 
        className="w-full max-w-md p-6 rounded-xl shadow-xl"
        style={{ 
          background: `${config.primaryColor}`,
          border: `1px solid ${config.borderColor}`
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Upload Invoice</h2>
          <Button 
            variant="dark" 
            size="icon" 
            onClick={onClose}
            className="h-8 w-8"
          >
            <X size={16} />
          </Button>
        </div>
        
        {!file ? (
          <div 
            className={`invoice-upload-dropzone ${dragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
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
                <p className="font-medium mb-1">Drop your invoice here</p>
                <p className="text-xs text-white/60">or click to browse files</p>
              </div>
              <p className="text-xs text-white/60 mt-2">
                Supports PDF, JPEG, PNG (max 5MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="invoice-file-preview">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${config.accentColor}20` }}
              >
                <FileText 
                  size={18} 
                  className="invoice-file-preview-icon"
                  style={{ color: config.accentColor }}
                />
              </div>
              <div className="invoice-file-preview-info">
                <p className="invoice-file-preview-name">{file.name}</p>
                <p className="invoice-file-preview-size">{getFileSize(file.size)}</p>
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
                <div className="flex justify-between text-xs">
                  <span>{uploaded ? 'Complete' : 'Uploading...'}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="invoice-upload-progress">
                  <div 
                    className="invoice-upload-progress-bar" 
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
    </div>
  );
};

export default UploadInvoice;
