
import React, { useState } from 'react';

interface BankTransferProps {
  onNext: () => void;
  onBack: () => void;
}

const BankTransfer: React.FC<BankTransferProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    swiftCode: '',
    currency: '',
    country: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };
  
  const isFormComplete = () => {
    return (
      formData.accountHolderName &&
      formData.bankName &&
      formData.accountNumber &&
      formData.swiftCode &&
      formData.currency &&
      formData.country
    );
  };
  
  return (
    <div className="py-4 space-y-5 animate-fade-in">
      <div className="text-center">
        <h3 className="text-xl font-semibold">Bank Transfer</h3>
        <p className="text-sm text-white/80 mt-1">Enter your bank account details</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleInputChange}
            placeholder="Account Holder Name"
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
          />
        </div>
        
        <div>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleInputChange}
            placeholder="Bank Name"
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
          />
        </div>
        
        <div>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
            placeholder="Account Number/IBAN"
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
          />
        </div>
        
        <div>
          <input
            type="text"
            name="swiftCode"
            value={formData.swiftCode}
            onChange={handleInputChange}
            placeholder="SWIFT/BIC Code"
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
          />
        </div>
        
        <div>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
          >
            <option value="" disabled>Select currency</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
          </select>
        </div>
        
        <div>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
          >
            <option value="" disabled>Select country</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
          </select>
        </div>
        
        <div className="flex space-x-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="btn-secondary flex-1 py-2"
          >
            Back
          </button>
          <button
            type="submit"
            className="btn-primary flex-1 py-2"
            disabled={!isFormComplete()}
          >
            Save Bank Details
          </button>
        </div>
        
        <p className="text-xs text-center text-white/60">
          Your information is securely transmitted and protected. Need help? Contact our support team.
        </p>
      </form>
    </div>
  );
};

export default BankTransfer;
