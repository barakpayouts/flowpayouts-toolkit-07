
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';

const BankTransferDetails: React.FC = () => {
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
        <h2 className="text-xl font-semibold">Bank Transfer Details</h2>
      </div>
      
      <div className="space-y-4">
        <div className="form-group">
          <label className="block text-sm font-medium mb-1">Account Holder Name</label>
          <input 
            type="text" 
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none"
            placeholder="Enter full name"
            value={formData.accountName || ''}
            onChange={(e) => handleFormChange('accountName', e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label className="block text-sm font-medium mb-1">Bank Name</label>
          <input 
            type="text" 
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none"
            placeholder="Enter bank name"
            value={formData.bankName || ''}
            onChange={(e) => handleFormChange('bankName', e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label className="block text-sm font-medium mb-1">Account Number/IBAN</label>
          <input 
            type="text" 
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none"
            placeholder="Enter account number or IBAN"
            value={formData.accountNumber || ''}
            onChange={(e) => handleFormChange('accountNumber', e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label className="block text-sm font-medium mb-1">SWIFT/BIC Code</label>
          <input 
            type="text" 
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none"
            placeholder="Enter SWIFT or BIC code"
            value={formData.swiftCode || ''}
            onChange={(e) => handleFormChange('swiftCode', e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label className="block text-sm font-medium mb-1">Currency</label>
          <select 
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none appearance-none cursor-pointer"
            value={formData.currency || ''}
            onChange={(e) => handleFormChange('currency', e.target.value)}
          >
            <option value="">Select currency</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="block text-sm font-medium mb-1">Country</label>
          <select 
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none appearance-none cursor-pointer"
            value={formData.country || ''}
            onChange={(e) => handleFormChange('country', e.target.value)}
          >
            <option value="">Select country</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
          </select>
        </div>
      </div>
      
      <p className="text-xs opacity-70 mt-6 text-center">
        Your information is securely transmitted and protected. Need help? Contact our support team.
      </p>
    </div>
  );
};

export default BankTransferDetails;
