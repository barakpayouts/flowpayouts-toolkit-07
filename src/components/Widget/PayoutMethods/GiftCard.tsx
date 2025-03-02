
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface GiftCardProps {
  onNext: () => void;
  onBack: () => void;
}

const GiftCard: React.FC<GiftCardProps> = ({ onNext, onBack }) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  
  const giftCards = [
    {
      id: 'amazon',
      name: 'Amazon',
      description: 'Receive payments as Amazon gift cards'
    },
    {
      id: 'walmart',
      name: 'Walmart',
      description: 'Receive payments as Walmart gift cards'
    },
    {
      id: 'target',
      name: 'Target',
      description: 'Receive payments as Target gift cards'
    }
  ];
  
  const handleCardSelect = (cardId: string) => {
    setSelectedCard(cardId);
  };
  
  const handleSubmit = () => {
    onNext();
  };
  
  return (
    <div className="py-4 space-y-5 animate-fade-in">
      <div className="text-center">
        <h3 className="text-xl font-semibold">Gift Card</h3>
        <p className="text-sm text-white/80 mt-1">Choose your preferred gift card option</p>
      </div>
      
      <div className="space-y-4">
        {giftCards.map(card => (
          <div 
            key={card.id}
            className={cn(
              "p-4 border rounded-lg transition-all",
              selectedCard === card.id
                ? "border-payouts-accent bg-payouts-accent/10"
                : "border-white/10 hover:bg-white/5"
            )}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{card.name}</h4>
                <p className="text-sm text-white/70">{card.description}</p>
              </div>
              <button
                onClick={() => handleCardSelect(card.id)}
                className={cn(
                  "px-4 py-1 rounded text-sm transition-all",
                  selectedCard === card.id
                    ? "bg-payouts-accent text-payouts-dark"
                    : "bg-white/10 hover:bg-white/20"
                )}
              >
                {selectedCard === card.id ? "Selected" : `Select ${card.name}`}
              </button>
            </div>
          </div>
        ))}
        
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
          Your gift card preference will be securely saved. Need help? Contact our support team.
        </p>
      </div>
    </div>
  );
};

export default GiftCard;
