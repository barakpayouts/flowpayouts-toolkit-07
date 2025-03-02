
import React, { useState } from 'react';

interface PushToCardProps {
  onNext: () => void;
  onBack: () => void;
}

const PushToCard: React.FC<PushToCardProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      formData.cardNumber.length >= 16 &&
      formData.expiryDate &&
      formData.cvv.length >= 3
    );
  };
  
  return (
    <div className="py-4 space-y-5 animate-fade-in">
      <div className="text-center">
        <h3 className="text-xl font-semibold">Push to Card</h3>
        <p className="text-sm text-white/80 mt-1">Enter your card details for fast payments</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            placeholder="Card Number"
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
            maxLength={19}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              placeholder="Expiry Date (MM/YY)"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
              maxLength={5}
            />
          </div>
          
          <div>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              placeholder="CVV"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
              maxLength={4}
            />
          </div>
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
            Save Card Details
          </button>
        </div>
        
        <p className="text-xs text-center text-white/60">
          Your information is securely transmitted and protected. Need help? Contact our support team.
        </p>
      </form>
    </div>
  );
};

export default PushToCard;
