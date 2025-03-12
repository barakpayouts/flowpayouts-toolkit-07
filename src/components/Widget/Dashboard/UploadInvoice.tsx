
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

interface UploadInvoiceProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (fileName: string) => void;
}

const UploadInvoice: React.FC<UploadInvoiceProps> = ({ isOpen, onClose, onSuccess }) => {
  const { config } = useWidgetConfig();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
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
      setFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = () => {
    if (file && onSuccess) {
      onSuccess(file.name);
    } else {
      onClose();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-background border-white/10 p-6 max-w-md mx-auto">
        <DialogTitle className="text-xl font-semibold mb-2">Upload Invoice</DialogTitle>
        <DialogDescription className="text-sm text-white/60 mb-4">
          Upload your invoice file (PDF, PNG, JPEG) to request payment
        </DialogDescription>
        
        <div
          className={`border-2 border-dashed p-8 rounded-lg text-center ${
            isDragging ? 'border-primary bg-primary/5' : 'border-white/20'
          } transition-colors`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="py-4">
              <div className="flex items-center justify-between mb-2 p-2 bg-white/5 rounded">
                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                <button 
                  onClick={() => setFile(null)}
                  className="text-white/60 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-sm text-white/60">
                File selected. Click "Upload" to submit.
              </p>
            </div>
          ) : (
            <>
              <Upload className="w-10 h-10 mx-auto mb-3 text-white/40" />
              <p className="mb-2 font-medium">Drag and drop file here</p>
              <p className="text-sm mb-4 text-white/60">or</p>
              <label className="cursor-pointer">
                <span 
                  className="px-4 py-2 rounded text-sm font-medium"
                  style={{ 
                    backgroundColor: `${config.accentColor}10`, 
                    color: config.accentColor,
                    border: `1px solid ${config.accentColor}30`
                  }}
                >
                  Browse Files
                </span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                />
              </label>
              <p className="mt-4 text-xs text-white/40">
                Supported formats: PDF, PNG, JPG, JPEG
              </p>
            </>
          )}
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-white/20 text-white/70 hover:bg-white/5"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!file}
            style={{ 
              backgroundColor: config.accentColor,
              color: config.backgroundColor
            }}
          >
            Upload
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadInvoice;
