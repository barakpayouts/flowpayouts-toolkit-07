
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, X, FileUp, Check, AlertCircle } from 'lucide-react';
import { toast } from "sonner";

interface UploadInvoiceProps {
  onClose: () => void;
  onUploadSuccess?: () => void;
}

const UploadInvoice: React.FC<UploadInvoiceProps> = ({ onClose, onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFileSelected(droppedFile);
    }
  };

  const handleFileSelected = (selectedFile: File) => {
    // Check if file is PDF or image
    const fileType = selectedFile.type;
    if (!fileType.includes('pdf') && !fileType.includes('image')) {
      toast.error("Invalid file type", {
        description: "Please upload a PDF or image file"
      });
      return;
    }
    
    // Check file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Maximum file size is 5MB"
      });
      return;
    }
    
    setFile(selectedFile);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          toast.success("Invoice uploaded successfully", {
            description: "Your invoice has been submitted for review"
          });
          if (onUploadSuccess) onUploadSuccess();
          onClose();
        }, 500);
      }
    }, 300);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-payouts-dark/95 backdrop-blur-md p-6 rounded-lg border border-white/10 shadow-lg w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">Upload Invoice</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="text-white/70 hover:text-white hover:bg-white/10"
        >
          <X size={18} />
        </Button>
      </div>
      
      <div 
        onDragOver={handleDragOver} 
        onDragLeave={handleDragLeave} 
        onDrop={handleDrop}
        onClick={!file ? triggerFileInput : undefined}
        className={`border-2 border-dashed rounded-lg p-8 mb-4 transition-all cursor-pointer flex flex-col items-center justify-center
          ${isDragging ? 'border-payouts-accent bg-payouts-accent/10' : 'border-white/20 hover:border-white/40 bg-white/5'}
          ${file ? 'py-4' : 'py-8'}`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept=".pdf,.jpg,.jpeg,.png" 
        />
        
        {!file ? (
          <>
            <Upload size={32} className="text-white/60 mb-3" />
            <p className="text-white font-medium mb-1">Drag & drop or click to upload</p>
            <p className="text-white/60 text-sm text-center">
              Supported formats: PDF, JPG, PNG (Max size: 5MB)
            </p>
          </>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg mb-3">
              <div className="flex items-center gap-3">
                <FileUp size={20} className="text-payouts-accent" />
                <div className="truncate max-w-[200px]">
                  <p className="text-white font-medium truncate">{file.name}</p>
                  <p className="text-white/60 text-xs">
                    {(file.size / 1024).toFixed(0)} KB
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="text-white/70 hover:text-white hover:bg-white/10 h-8 w-8"
              >
                <X size={16} />
              </Button>
            </div>
            
            <div className="text-center text-white/70 text-sm">
              {isUploading ? 'Uploading...' : 'File ready to upload'}
            </div>
            
            {isUploading && (
              <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                <div 
                  className="bg-payouts-accent h-2 rounded-full transition-all" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-3 text-sm text-white/70 mb-4">
        <AlertCircle size={16} />
        <span>All invoices are reviewed before being processed</span>
      </div>
      
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={onClose} 
          className="flex-1 border-white/20 text-white hover:bg-white/10"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleUpload} 
          disabled={!file || isUploading}
          className="flex-1 bg-payouts-accent text-payouts-dark hover:bg-payouts-accent/90 flex items-center gap-2"
        >
          {isUploading ? (
            <>Uploading... {uploadProgress}%</>
          ) : (
            <>
              <Upload size={16} />
              Upload Invoice
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default UploadInvoice;
