
import React, { useState, useRef } from 'react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { motion } from 'framer-motion';
import { FileText, AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const StatementVerification: React.FC = () => {
  const { config } = useWidgetConfig();
  const [statementUploaded, setStatementUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };
  
  const uploadFile = (file: File) => {
    setUploadedFileName(file.name);
    setStatementUploaded(true);
    toast.success("Statement uploaded successfully", {
      description: `${file.name} has been added to your account`
    });
    
    // Reset file input for future uploads
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
  };
  
  const handleUploadAnother = () => {
    setStatementUploaded(false);
    setUploadedFileName(null);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
        onChange={handleFileChange}
      />
      
      {statementUploaded ? (
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
          className={`upload-container ${isDragging ? 'bg-white/10' : 'bg-white/5'} border ${isDragging ? 'border-' + config.accentColor : 'border-white/10'} rounded-xl p-8 text-center transition-all cursor-pointer`}
          style={{ borderRadius: `${config.borderRadius}px` }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleChooseFile}
        >
          <div className="mb-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
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
          <p className="text-white/70 mb-3">Drag & drop your statement here</p>
          <p className="text-white/70 mb-3">or</p>
          <Button 
            variant="glass"
            size="default"
            className="mx-auto mb-2"
            onClick={(e) => {
              e.stopPropagation();
              handleChooseFile();
            }}
          >
            Browse Files
          </Button>
          
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
