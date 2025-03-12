
import React, { useState, useRef, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import { Upload, FilePlus, FileText } from "lucide-react";
import InvoiceGenerator from './InvoiceGenerator';

interface UploadInvoiceProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: (fileName: string) => void;
}

const UploadInvoice = ({ isOpen, onClose, onSuccess }: UploadInvoiceProps) => {
  const { 
    isInvoiceUploadOpen, 
    setIsInvoiceUploadOpen, 
    handleUploadInvoice,
    isInvoiceGeneratorOpen,
    setIsInvoiceGeneratorOpen
  } = usePayoutWidget();
  
  // Use either the props or the context values
  const dialogOpen = isOpen !== undefined ? isOpen : isInvoiceUploadOpen;
  const setDialogOpen = onClose ? 
    (value: boolean) => !value && onClose() : 
    setIsInvoiceUploadOpen;
  
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleSubmit = () => {
    if (file) {
      handleUploadInvoice(file);
      if (onSuccess) {
        onSuccess(file.name);
      }
      setFile(null);
    }
  };
  
  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openInvoiceGenerator = () => {
    setDialogOpen(false);
    setIsInvoiceGeneratorOpen(true);
  };
  
  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="widget-dialog-content">
          <DialogHeader>
            <DialogTitle>Invoice Upload</DialogTitle>
            <DialogDescription>
              Upload an invoice to request payment or generate a new invoice
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div 
              className={`upload-option p-4 border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors ${!file ? 'border-white/20' : 'border-white/10'}`}
              onClick={handleUploadClick}
            >
              <Upload size={32} className="mb-2 text-white/70" />
              <p className="font-medium">Upload Existing Invoice</p>
              <p className="text-xs text-white/70 mt-1">Upload PDF, JPG, or PNG files</p>
            </div>
            
            <div 
              className={`upload-option p-4 border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors border-white/20`}
              onClick={openInvoiceGenerator}
            >
              <FileText size={32} className="mb-2 text-white/70" />
              <p className="font-medium">Generate New Invoice</p>
              <p className="text-xs text-white/70 mt-1">Create a detailed invoice for your services</p>
            </div>
          </div>
          
          {!file ? (
            <div 
              className={`upload-area mt-4 ${isDragging ? 'dragging' : ''}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleUploadClick}
            >
              <FilePlus size={32} className="mx-auto mb-2 text-white/70" />
              <p className="font-medium">Drag and drop file here</p>
              <p className="text-sm text-white/70 mt-1">or click to browse</p>
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>
          ) : (
            <div className="file-preview">
              <div className="file-preview-icon">
                <FileText size={24} />
              </div>
              <div className="file-preview-name">
                {file.name}
              </div>
              <button className="file-preview-remove" onClick={handleRemoveFile}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={!file}
              className="ml-2"
            >
              Upload Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <InvoiceGenerator />
    </>
  );
};

export default UploadInvoice;
