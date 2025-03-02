
import React from 'react';
import { BankVerificationMethod } from '@/hooks/use-widget-config';
import { cn } from '@/lib/utils';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { Wallet2, FileText, BarChart, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface VerificationMethodTabsProps {
  verificationMethod: BankVerificationMethod;
  onMethodChange: (method: BankVerificationMethod) => void;
}

const VerificationMethodTabs: React.FC<VerificationMethodTabsProps> = ({
  verificationMethod,
  onMethodChange,
}) => {
  const { config } = useWidgetConfig();
  
  const methods = [
    { id: 'plaid', label: 'Instant Verification', description: 'Connect your bank securely using Plaid', icon: Wallet2 },
    { id: 'statement', label: 'Upload Statement', description: 'Upload a recent bank statement', icon: FileText },
    { id: 'microdeposit', label: 'Micro-Deposits', description: 'Verify with small test deposits', icon: BarChart },
  ];
  
  return (
    <div className="grid grid-cols-3 gap-2 mb-8">
      {methods.map((method) => {
        const Icon = method.icon;
        const isActive = verificationMethod === method.id;
        
        return (
          <motion.button
            key={method.id}
            onClick={() => onMethodChange(method.id as BankVerificationMethod)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex flex-col items-center text-center p-4 rounded-xl transition-all",
              isActive 
                ? "bg-white/10 shadow-lg border border-white/20" 
                : "bg-white/5 hover:bg-white/8 border border-transparent"
            )}
            style={{
              borderColor: isActive ? `${config.accentColor}50` : 'transparent',
              boxShadow: isActive ? `0 4px 20px -5px ${config.accentColor}40` : 'none',
            }}
          >
            <div 
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                isActive ? "bg-gradient-to-br from-white/10 to-white/5" : "bg-white/5"
              )}
              style={{
                boxShadow: isActive ? `0 0 15px ${config.accentColor}30` : 'none',
                border: isActive ? `1px solid ${config.accentColor}40` : '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Icon
                size={24}
                className={cn(
                  "transition-all",
                  isActive ? "text-white" : "text-white/60"
                )}
                style={{
                  color: isActive ? config.accentColor : undefined,
                  filter: isActive ? `drop-shadow(0 0 5px ${config.accentColor}70)` : 'none',
                }}
              />
            </div>
            <div className="space-y-1">
              <h3 className={cn(
                "font-medium text-sm",
                isActive ? "text-white" : "text-white/80"
              )}>
                {method.label}
              </h3>
              <p className="text-xs text-white/60 line-clamp-2">
                {method.description}
              </p>
            </div>
            {isActive && (
              <motion.div 
                className="h-1 w-12 mt-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '50%' }}
                style={{ 
                  background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}50)`,
                }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default VerificationMethodTabs;
