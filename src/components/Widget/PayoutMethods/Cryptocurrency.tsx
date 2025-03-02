
import React, { useState } from 'react';

interface CryptocurrencyProps {
  onNext: () => void;
  onBack: () => void;
}

const Cryptocurrency: React.FC<CryptocurrencyProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    network: '',
    walletAddress: ''
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
    return formData.network && formData.walletAddress;
  };
  
  return (
    <div className="py-4 space-y-5 animate-fade-in">
      <div className="text-center">
        <h3 className="text-xl font-semibold">Cryptocurrency</h3>
        <p className="text-sm text-white/80 mt-1">Enter your cryptocurrency wallet details</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-white/80 block mb-2">Blockchain Network</label>
          <select
            name="network"
            value={formData.network}
            onChange={handleInputChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
          >
            <option value="" disabled>Select network</option>
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
            <option value="solana">Solana</option>
          </select>
        </div>
        
        <div>
          <label className="text-sm text-white/80 block mb-2">Wallet Address</label>
          <input
            type="text"
            name="walletAddress"
            value={formData.walletAddress}
            onChange={handleInputChange}
            placeholder="Enter your wallet address"
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
          />
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
            Save Crypto Payout Details
          </button>
        </div>
        
        <p className="text-xs text-center text-white/60">
          Your information is securely transmitted and protected. Need help? Contact our support team.
        </p>
      </form>
    </div>
  );
};

export default Cryptocurrency;
