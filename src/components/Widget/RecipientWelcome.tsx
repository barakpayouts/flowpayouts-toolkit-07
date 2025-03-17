
import React, { useState } from 'react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { ArrowRight, Wallet, Clock, CheckCircle, FileText, ToggleLeft, ToggleRight } from 'lucide-react';

const RecipientWelcome: React.FC = () => {
  const { handleLogin, handleStartOnboarding } = usePayoutWidget();
  const { config } = useWidgetConfig();
  const [showDemo, setShowDemo] = useState(false);
  
  // Determine if we're in onboarding-only mode or payment mode
  const hasPayoutAmount = showDemo ? false : !!config.payoutAmount;
  
  return (
    <div className="welcome-container">
      {/* Demo toggle - only visible in development/demo mode */}
      <div className="flex justify-end mb-2">
        <button 
          onClick={() => setShowDemo(!showDemo)} 
          className="flex items-center gap-1.5 text-xs opacity-70 hover:opacity-100 transition-opacity bg-white/10 px-3 py-1.5 rounded-full"
        >
          {showDemo ? (
            <>
              <ToggleRight size={14} className="text-payouts-accent" />
              Onboarding Mode
            </>
          ) : (
            <>
              <ToggleLeft size={14} />
              Payment Mode
            </>
          )}
        </button>
      </div>
      
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {hasPayoutAmount ? "Payment Ready" : "Onboarding Required"}
        </h2>
        <p className="text-sm opacity-80">
          <span className="font-medium">{config.companyName || "Acme Inc."}</span> 
          {hasPayoutAmount 
            ? " would like to pay you" 
            : " needs you to complete the onboarding process"
          }
        </p>
        
        {hasPayoutAmount && (
          <div className="mt-4 py-3 px-6 bg-white/10 rounded-lg inline-block">
            <span className="text-2xl font-bold" style={{ color: config.accentColor || '#9b87f5' }}>
              {config.payoutAmount || "$1,250.00"}
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
          <div className="p-2 rounded-full bg-white/10">
            <Wallet size={18} className="text-green-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium">
              {hasPayoutAmount ? "Quick Payment" : "Multiple Payment Methods"}
            </h3>
            <p className="text-xs opacity-70">Choose from multiple payout options</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
          <div className="p-2 rounded-full bg-white/10">
            <Clock size={18} className="text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium">Fast Processing</h3>
            <p className="text-xs opacity-70">Receive your funds quickly and securely</p>
          </div>
        </div>
        
        {!hasPayoutAmount && (
          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
            <div className="p-2 rounded-full bg-white/10">
              <FileText size={18} className="text-orange-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Complete Onboarding</h3>
              <p className="text-xs opacity-70">Set up your account for future payments</p>
            </div>
          </div>
        )}
        
        <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
          <div className="p-2 rounded-full bg-white/10">
            <CheckCircle size={18} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium">Secure Platform</h3>
            <p className="text-xs opacity-70">Your information is protected</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-3">
        <button
          onClick={handleStartOnboarding}
          className="py-3 px-4 rounded-lg font-medium bg-payouts-accent text-payouts-dark hover:bg-payouts-accent/90 transition-colors flex justify-center items-center gap-2"
        >
          {hasPayoutAmount ? "Create Account" : "Start Onboarding"} <ArrowRight size={16} />
        </button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-payouts-dark px-2 text-white/60">or</span>
          </div>
        </div>
        
        <button
          onClick={handleLogin}
          className="py-3 px-4 rounded-lg font-medium bg-white/10 hover:bg-white/20 transition-colors"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default RecipientWelcome;
