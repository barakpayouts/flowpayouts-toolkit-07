
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useWidgetConfig } from '@/hooks/use-widget-config';

const CardPaymentDetails: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { config } = useWidgetConfig();
  
  return (
    <div className="payout-details-form">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={16} />
          Back to methods
        </button>
        <h2 className="text-xl font-semibold">Card Details</h2>
      </div>
      
      {/* Balance Info Card */}
      <div className="mb-6 p-4 rounded-lg border border-white/20 bg-white/5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm opacity-70">Available Balance</span>
          <span className="font-semibold text-lg">{config.payoutAmount || "$1,250.00"}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="opacity-70">From: {config.companyName || "Acme Inc."}</span>
          <span className="opacity-70">Currency: {config.currency || "USD"}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="form-group">
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <input 
            type="text" 
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none"
            placeholder="XXXX XXXX XXXX XXXX"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Expiry Date</label>
            <input 
              type="text" 
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none"
              placeholder="MM/YY"
            />
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">CVV</label>
            <input 
              type="text" 
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none"
              placeholder="XXX"
            />
          </div>
        </div>
      </div>
      
      <p className="text-xs opacity-70 mt-6 text-center">
        Your information is securely transmitted and protected. Need help? Contact our support team.
      </p>
    </div>
  );
};

export default CardPaymentDetails;
