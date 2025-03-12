
import React, { useState, useRef } from 'react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { motion } from 'framer-motion';
import { FileText, AlertCircle, Check, FileImage, X, Upload, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

const StatementVerification: React.FC = () => {
  const { config } = useWidgetConfig();
  const [statementUploaded, setStatementUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSource, setUploadSource] = useState<'computer' | 'google' | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadSource('computer');
    }
  };
  
  const uploadFile = (file: File) => {
    setUploadedFileName(file.name);
    setStatementUploaded(true);
    setUploadDialogOpen(false);
    toast.success("Statement uploaded successfully", {
      description: `${file.name} has been added to your account`
    });
    
    // Reset file input for future uploads
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Reset upload state
    setSelectedFile(null);
    setUploadSource(null);
    setUploadProgress(0);
    setIsUploading(false);
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
  
  const handleGoogleDriveUpload = () => {
    // Simulate Google Drive selection
    setUploadSource('google');
    toast.info("Google Drive", {
      description: "Connecting to Google Drive...",
    });
    
    // Simulate file selection after a delay
    setTimeout(() => {
      const mockFile = new File(["dummy content"], "invoice-from-drive.pdf", { type: "application/pdf" });
      setSelectedFile(mockFile);
      toast.success("File selected from Google Drive", {
        description: "invoice-from-drive.pdf has been selected"
      });
    }, 1500);
  };
  
  const simulateUpload = () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + Math.random() * 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            uploadFile(selectedFile);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
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
        <div className="text-center">
          <Button
            onClick={() => {
              console.log("Opening statement upload dialog");
              setUploadDialogOpen(true);
            }}
            className="flex items-center gap-2"
            variant="glass"
          >
            <UploadCloud size={18} />
            Upload Statement
          </Button>
          
          <p className="mt-4 text-sm text-white/70">
            Upload your statement to verify your identity and account details
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
      
      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent 
          className="sm:max-w-md bg-payouts-dark border-white/10 text-white"
        >
          <DialogHeader>
            <DialogTitle className="text-white">Upload Statement</DialogTitle>
            <DialogDescription className="text-white/70">
              Upload a statement from your computer or Google Drive
            </DialogDescription>
          </DialogHeader>
          
          {!selectedFile ? (
            <div 
              className={`upload-container ${isDragging ? 'bg-white/10' : 'bg-white/5'} border ${isDragging ? 'border-' + config.accentColor : 'border-white/10'} rounded-xl p-8 text-center transition-all mt-4`}
              style={{ borderRadius: `${config.borderRadius}px` }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="mb-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-white/5 mx-auto flex items-center justify-center"
                  style={{
                    border: `1px solid ${config.accentColor}30`,
                  }}
                >
                  <Upload 
                    className="h-8 w-8" 
                    style={{ color: config.accentColor }}
                  />
                </motion.div>
              </div>
              <p className="text-white mb-3">Drag & drop your statement here</p>
              <p className="text-white/70 mb-3">or</p>
              
              <div className="flex gap-3 justify-center">
                <Button 
                  variant="glass"
                  size="default"
                  className="mx-auto"
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    }
                  }}
                >
                  Choose File
                </Button>
                
                <Button 
                  variant="glass"
                  size="default"
                  className="mx-auto"
                  onClick={handleGoogleDriveUpload}
                >
                  Google Drive
                </Button>
              </div>
              
              <p className="mt-4 text-xs text-white/50">
                Supported formats: PDF, PNG, JPG (Max 10MB)
              </p>
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="p-3 rounded-full bg-white/10 flex-shrink-0">
                  <FileText size={20} style={{ color: config.accentColor }} />
                </div>
                <div className="flex-grow">
                  <p className="font-medium text-sm text-white">{selectedFile.name}</p>
                  <p className="text-xs text-white/70">
                    {(selectedFile.size / 1024).toFixed(1)} KB • {uploadSource === 'google' ? 'Google Drive' : 'Local file'}
                  </p>
                </div>
                <Button 
                  variant="dark" 
                  size="icon" 
                  className="flex-shrink-0 h-8 w-8"
                  onClick={() => {
                    setSelectedFile(null);
                    setUploadSource(null);
                  }}
                >
                  <X size={14} />
                </Button>
              </div>
              
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-white">
                    <span>Uploading...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </div>
          )}
          
          <DialogFooter className="mt-6">
            <div className="flex gap-2 w-full">
              <Button 
                variant="dark" 
                className="flex-1 text-white"
                onClick={() => setUploadDialogOpen(false)}
              >
                Cancel
              </Button>
              
              <Button 
                className="flex-1 text-gray-900 font-semibold hover:text-gray-900"
                style={{
                  background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}DD)`,
                  boxShadow: `0 4px 15px ${config.accentColor}40`,
                }}
                disabled={!selectedFile || isUploading}
                onClick={simulateUpload}
              >
                {isUploading ? 'Uploading...' : 'Upload Statement'}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default StatementVerification;
