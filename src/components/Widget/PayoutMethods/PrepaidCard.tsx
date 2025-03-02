
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface PrepaidCardProps {
  onNext: () => void;
  onBack: () => void;
}

const PrepaidCard: React.FC<PrepaidCardProps> = ({ onNext, onBack }) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  
  const handleCardSelect = (cardId: string) => {
    setSelectedCard(cardId);
  };
  
  const handleSubmit = () => {
    onNext();
  };
  
  return (
    <div className="py-4 space-y-5 animate-fade-in">
      <div className="text-center">
        <h3 className="text-xl font-semibold">Prepaid Card</h3>
        <p className="text-sm text-white/80 mt-1">Choose your preferred prepaid card option</p>
      </div>
      
      <div className="space-y-4">
        <div 
          className={cn(
            "p-4 border rounded-lg transition-all",
            selectedCard === 'visa'
              ? "border-payouts-accent bg-payouts-accent/10"
              : "border-white/10 hover:bg-white/5"
          )}
        >
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Visa Prepaid</h4>
              <p className="text-sm text-white/70">Use prepaid cards for flexible spending</p>
            </div>
            <button
              onClick={() => handleCardSelect('visa')}
              className={cn(
                "px-4 py-1 rounded text-sm transition-all",
                selectedCard === 'visa'
                  ? "bg-payouts-accent text-payouts-dark"
                  : "bg-white/10 hover:bg-white/20"
              )}
            >
              {selectedCard === 'visa' ? "Selected" : "Select"}
            </button>
          </div>
        </div>
        
        <div className="flex space-x-3 pt-4">
          <button
            onClick={onBack}
            className="btn-secondary flex-1 py-2"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="btn-primary flex-1 py-2"
            disabled={!selectedCard}
          >
            Continue
          </button>
        </div>
        
        <p className="text-xs text-center text-white/60">
          Your prepaid card selection will be saved for future payouts. Need help? Contact our support team.
        </p>
      </div>
    </div>
  );
};

export default PrepaidCard;
