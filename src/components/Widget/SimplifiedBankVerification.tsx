
import React from 'react';
import { cn } from '@/lib/utils';
import { BankVerificationMethod } from '@/hooks/use-widget-config';
import { Check, Lock, Building, FileText, CreditCard } from 'lucide-react';

interface SimplifiedBankVerificationProps {
  onNext?: () => void;
  onBack?: () => void;
  isLastStep?: boolean;
  className?: string;
}

const SimplifiedBankVerification: React.FC<SimplifiedBankVerificationProps> = ({ 
  onNext,
  onBack,
  isLastStep = false,
  className
}) => {
  return (
    <div className={cn("py-4 text-white", className)}>
      <div className="mb-6 text-center">
        <h3 className="text-lg font-semibold">Bank Account Verification</h3>
        <p className="text-xs text-white/80 mt-1">Verify your bank account to receive payments</p>
      </div>
      
      <div className="flex border-b border-white/10 mb-4">
        <button
          className="flex-1 pb-2 text-xs font-medium text-center transition-all border-b-2 border-payouts-accent text-white"
        >
          Plaid Connect
        </button>
        <button
          className="flex-1 pb-2 text-xs font-medium text-center transition-all text-white/60 hover:text-white/80"
        >
          Statement
        </button>
        <button
          className="flex-1 pb-2 text-xs font-medium text-center transition-all text-white/60 hover:text-white/80"
        >
          Micro-Deposits
        </button>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10 transition-all">
        <h4 className="text-center text-sm font-medium mb-3">Select your bank</h4>
        
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'chase', name: 'Chase', logo: '🏦' },
            { id: 'boa', name: 'Bank of America', logo: '🏦' },
            { id: 'wells', name: 'Wells Fargo', logo: '🏦' },
            { id: 'citi', name: 'Citibank', logo: '🏦' }
          ].map(bank => (
            <button
              key={bank.id}
              className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all text-center flex flex-col items-center gap-1"
            >
              <span className="text-xl">{bank.logo}</span>
              <span className="text-xs">{bank.name}</span>
            </button>
          ))}
        </div>
        
        <div className="flex items-center justify-center mt-4 gap-1 text-[10px] text-white/60">
          <Lock className="h-3 w-3" />
          <p>Secure connection powered by Plaid</p>
        </div>
      </div>
      
      <div className="mt-4 px-2">
        <div className="flex space-x-2">
          <button
            className="bg-white/10 hover:bg-white/20 text-white text-xs rounded py-2 flex-1 flex items-center justify-center gap-1"
          >
            Back
          </button>
          <button
            className="bg-payouts-accent text-payouts-dark hover:bg-payouts-accent/90 text-xs rounded py-2 flex-1 flex items-center justify-center gap-1 font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimplifiedBankVerification;
