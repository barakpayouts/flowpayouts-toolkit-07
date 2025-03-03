
import React, { useState, useRef } from 'react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { motion } from 'framer-motion';
import { FileText, AlertCircle, Upload, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import VerificationLayout from './VerificationLayout';

const StatementVerification: React.FC = () => {
  const { config } = useWidgetConfig();
  const [invoiceUploaded, setInvoiceUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUploadSuccess(file.name);
    }
  };
  
  const handleFileUploadSuccess = (fileName: string) => {
    setUploadedFileName(fileName);
    setInvoiceUploaded(true);
    toast.success("Statement uploaded successfully", {
      description: `${fileName} has been added to your account`
    });
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
        const fileName = "statement_may2023.pdf";
        handleFileUploadSuccess(fileName);
      }, 1500);
    }, 1000);
  };
  
  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
      handleFileUploadSuccess(file.name);
    }
  };
  
  const handleUploadAnother = () => {
    setInvoiceUploaded(false);
    setUploadedFileName(null);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Hidden file input for statement upload */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
        onChange={handleFileChange}
      />
      
      {invoiceUploaded ? (
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-3">
              <Check size={24} className="text-white" />
            </div>
            <p className="font-medium">Statement uploaded successfully!</p>
            
            {uploadedFileName && (
              <div className="mt-4 flex justify-center">
                <div className="p-4 bg-white/10 rounded-lg w-full max-w-md flex items-center justify-center gap-3">
                  <FileText size={24} className="text-white" />
                  <span className="font-medium truncate">{uploadedFileName}</span>
                </div>
              </div>
            )}
            
            <p className="text-sm opacity-70 mt-4">Your statement has been added to your account</p>
            
            <Button 
              className="mt-4 py-2 px-4"
              variant="glass"
              onClick={handleUploadAnother}
            >
              Upload Another Statement
            </Button>
          </div>
        </div>
      ) : (
        <div 
          className={`upload-container ${isDragging ? 'bg-white/10' : 'bg-white/5'} border ${isDragging ? 'border-' + config.accentColor : 'border-white/10'} rounded-xl p-10 text-center transition-all hover:bg-white/8 cursor-pointer`}
          style={{ borderRadius: `${config.borderRadius}px` }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="mb-4">
            <motion.div 
              whileHover={{ rotate: [0, -5, 5, -5, 0] }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-white/5 mx-auto flex items-center justify-center"
              style={{
                border: `1px solid ${config.accentColor}30`,
              }}
            >
              <FileText 
                className="h-8 w-8" 
                style={{ color: config.accentColor }}
              />
            </motion.div>
          </div>
          <p className="text-white/70 mb-3">Drag & drop your statement here or</p>
          <div className="flex flex-col sm:flex-row justify-center gap-2">
            <Button 
              variant="glass"
              size="default"
              className="mx-auto"
              onClick={handleChooseFile}
            >
              Choose From Computer
            </Button>
            
            <Button 
              variant="glass"
              size="default"
              className="mx-auto"
              onClick={handleGoogleDriveUpload}
            >
              Import From Google Drive
            </Button>
          </div>
          <p className="mt-4 text-xs text-white/50">
            Supported formats: PDF, PNG, JPG (Max 10MB)
          </p>
          
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-2">
            <div className="flex items-start gap-3 text-left p-3 bg-white/5 backdrop-blur-sm rounded-lg">
              <div className="shrink-0 mt-0.5">
                <AlertCircle size={16} className="text-white/70" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Requirements</h4>
                <ul className="mt-1 text-xs text-white/70 space-y-1">
                  <li>• Statement must be less than 90 days old</li>
                  <li>• Must show your full name and account details</li>
                  <li>• Must be from a recognized financial institution</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default StatementVerification;
