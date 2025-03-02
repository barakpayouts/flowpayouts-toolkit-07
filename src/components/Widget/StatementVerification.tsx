
import React from 'react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { motion } from 'framer-motion';
import { FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StatementVerification: React.FC = () => {
  const { config } = useWidgetConfig();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h4 className="text-center font-medium text-lg mb-2">Upload Bank Statement</h4>
      <p className="text-center text-sm text-white/70 mb-4">Upload a recent bank statement for verification</p>
      
      <motion.div 
        whileHover={{ scale: 1.02, boxShadow: `0 10px 25px -5px ${config.accentColor}20` }}
        className="border-2 border-dashed border-white/20 rounded-xl p-10 text-center bg-white/5 backdrop-blur-sm hover:bg-white/8 transition-all cursor-pointer"
        style={{ borderRadius: `${config.borderRadius}px` }}
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
        <Button 
          variant="glass"
          size="default"
          className="mx-auto"
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
      </motion.div>
    </motion.div>
  );
};

export default StatementVerification;
