
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface DigitalWalletProps {
  onNext: () => void;
  onBack: () => void;
}

const DigitalWallet: React.FC<DigitalWalletProps> = ({ onNext, onBack }) => {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  
  const wallets = [
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Fast and secure payments worldwide'
    },
    {
      id: 'venmo',
      name: 'Venmo',
      description: 'Quick transfers between users'
    }
  ];
  
  const handleWalletSelect = (walletId: string) => {
    setSelectedWallet(walletId);
  };
  
  const handleSubmit = () => {
    onNext();
  };
  
  return (
    <div className="py-4 space-y-5 animate-fade-in">
      <div className="text-center">
        <h3 className="text-xl font-semibold">Digital Wallet</h3>
        <p className="text-sm text-white/80 mt-1">Choose your preferred digital wallet</p>
      </div>
      
      <div className="space-y-4">
        {wallets.map(wallet => (
          <div 
            key={wallet.id}
            className={cn(
              "p-4 border rounded-lg transition-all",
              selectedWallet === wallet.id
                ? "border-payouts-accent bg-payouts-accent/10"
                : "border-white/10 hover:bg-white/5"
            )}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{wallet.name}</h4>
                <p className="text-sm text-white/70">{wallet.description}</p>
              </div>
              <button
                onClick={() => handleWalletSelect(wallet.id)}
                className={cn(
                  "px-4 py-1 rounded text-sm transition-all",
                  selectedWallet === wallet.id
                    ? "bg-payouts-accent text-payouts-dark"
                    : "bg-white/10 hover:bg-white/20"
                )}
              >
                {selectedWallet === wallet.id ? "Selected" : "Select"}
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
            disabled={!selectedWallet}
          >
            Continue
          </button>
        </div>
        
        <p className="text-xs text-center text-white/60">
          Your digital wallet preference will be securely saved. Need help? Contact our support team.
        </p>
      </div>
    </div>
  );
};

export default DigitalWallet;
