
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';

const CardPaymentDetails: React.FC = () => {
  const { handleBackStep, handleFormChange, formData } = usePayoutWidget();
  
  return (
    <div className="payout-details-form">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={handleBackStep}
          className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={16} />
          Back to methods
        </button>
        <h2 className="text-xl font-semibold">Card Details</h2>
      </div>
      
      <div className="space-y-4">
        <div className="form-group">
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <input 
            type="text" 
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none"
            placeholder="XXXX XXXX XXXX XXXX"
            value={formData.cardNumber || ''}
            onChange={(e) => handleFormChange('cardNumber', e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Expiry Date</label>
            <input 
              type="text" 
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none"
              placeholder="MM/YY"
              value={formData.expiryDate || ''}
              onChange={(e) => handleFormChange('expiryDate', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">CVV</label>
            <input 
              type="text" 
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none"
              placeholder="XXX"
              value={formData.cvv || ''}
              onChange={(e) => handleFormChange('cvv', e.target.value)}
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
