
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, Shield, ArrowRight } from 'lucide-react';

interface SimplifiedBankSuccessProps {
  className?: string;
}

const SimplifiedBankSuccess: React.FC<SimplifiedBankSuccessProps> = ({ className }) => {
  return (
    <div className={cn("py-8 text-white flex flex-col items-center justify-center", className)}>
      <div className="mb-6 text-center">
        <div className="w-16 h-16 rounded-full bg-payouts-accent/20 mx-auto flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-payouts-accent" strokeWidth={3} />
        </div>
        <h3 className="text-lg font-semibold">Verification Complete</h3>
        <p className="text-xs text-white/80 mt-1">Your bank account has been successfully verified</p>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 w-full max-w-xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 bg-payouts-dark/50 rounded-full flex items-center justify-center shrink-0">
            <Shield className="h-4 w-4 text-payouts-accent" />
          </div>
          <div>
            <p className="font-medium text-sm">Chase Bank ●●●● 1234</p>
            <p className="text-xs text-white/60">Checking Account</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-2 bg-white/10 rounded text-xs">
          <Check className="h-3 w-3 text-payouts-accent" />
          <p className="text-white/80">Account verified and ready for payouts</p>
        </div>
      </div>
      
      <div className="mt-6 w-full px-6">
        <button
          className="bg-payouts-accent text-payouts-dark hover:bg-payouts-accent/90 text-sm rounded-lg py-2 w-full flex items-center justify-center gap-1 font-medium"
        >
          Continue to Tax Information
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default SimplifiedBankSuccess;
