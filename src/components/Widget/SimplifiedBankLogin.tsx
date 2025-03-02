
import React from 'react';
import { cn } from '@/lib/utils';
import { Lock, Building, ArrowLeft, CreditCard } from 'lucide-react';

interface SimplifiedBankLoginProps {
  className?: string;
}

const SimplifiedBankLogin: React.FC<SimplifiedBankLoginProps> = ({ className }) => {
  return (
    <div className={cn("py-4 text-white", className)}>
      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold">Connect Your Bank</h3>
        <p className="text-xs text-white/80 mt-1">Enter your online banking credentials</p>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 transition-all">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-10 w-10 bg-payouts-dark/50 rounded-full flex items-center justify-center">
            <CreditCard size={20} className="text-payouts-accent" />
          </div>
          <div>
            <p className="font-medium text-sm">Chase Bank</p>
            <p className="text-xs text-white/60">secure.chase.com</p>
          </div>
        </div>
        
        <form className="space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 pl-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all text-sm"
            />
            <Building className="absolute left-2 top-2.5 h-4 w-4 text-white/40" />
          </div>
          
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 pl-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all text-sm"
            />
            <Lock className="absolute left-2 top-2.5 h-4 w-4 text-white/40" />
          </div>
          
          <div className="flex items-center justify-center gap-1 text-[10px] text-white/60 bg-white/5 p-2 rounded">
            <Lock className="h-3 w-3" />
            <p>Your credentials are encrypted and never stored</p>
          </div>
        </form>
      </div>
      
      <div className="mt-4 px-2">
        <div className="flex space-x-2">
          <button
            className="bg-white/10 hover:bg-white/20 text-white text-xs rounded py-2 flex-1 flex items-center justify-center gap-1"
          >
            <ArrowLeft size={12} />
            Back
          </button>
          <button
            className="bg-payouts-accent text-payouts-dark hover:bg-payouts-accent/90 text-xs rounded py-2 flex-1 flex items-center justify-center gap-1 font-medium"
          >
            Connect Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimplifiedBankLogin;
