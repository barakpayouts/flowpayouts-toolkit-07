
import React from 'react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MicroDepositVerification: React.FC = () => {
  const { config } = useWidgetConfig();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h4 className="text-center font-medium text-lg">Micro-Deposit Verification</h4>
      <p className="text-center text-sm text-white/70 mb-4">We'll send two small deposits to your account for verification</p>
      
      <div className="space-y-5 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
        <div className="relative">
          <label className="text-sm text-white/80 block mb-1">Account Holder Name</label>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-transparent transition-all"
            style={{ 
              borderRadius: `${config.borderRadius}px`,
              boxShadow: `0 0 0 0 ${config.accentColor}`,
            }}
          />
        </div>
        
        <div className="relative">
          <label className="text-sm text-white/80 block mb-1">Bank Routing Number</label>
          <div className="relative">
            <input
              type="text"
              placeholder="9-digit Routing Number"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-transparent transition-all"
              style={{ 
                borderRadius: `${config.borderRadius}px`,
                boxShadow: `0 0 0 0 ${config.accentColor}`,
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 bg-white/10 px-2 py-1 rounded-md">
              9 digits
            </div>
          </div>
        </div>
        
        <div className="relative">
          <label className="text-sm text-white/80 block mb-1">Account Number</label>
          <input
            type="text"
            placeholder="Account Number"
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-transparent transition-all"
            style={{ 
              borderRadius: `${config.borderRadius}px`,
              boxShadow: `0 0 0 0 ${config.accentColor}`,
            }}
          />
        </div>
        
        <div className="flex items-center gap-3 bg-white/10 p-4 rounded-lg text-sm">
          <AlertCircle size={20} style={{ color: config.accentColor }} />
          <p className="text-white/80 text-sm">
            You'll receive two small deposits in 1-3 business days. Return here to verify these amounts.
          </p>
        </div>
        
        <Button
          variant="purple"
          className="w-full font-semibold"
          style={{
            background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}DD)`,
            boxShadow: `0 4px 15px ${config.accentColor}40`,
          }}
        >
          Send Micro-Deposits
        </Button>
      </div>
    </motion.div>
  );
};

export default MicroDepositVerification;
