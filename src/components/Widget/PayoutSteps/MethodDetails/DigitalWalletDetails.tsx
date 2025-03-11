
import React from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useWidgetConfig } from '@/hooks/use-widget-config';

const DigitalWalletDetails: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { config } = useWidgetConfig();
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  
  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };
  
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
        <h2 className="text-xl font-semibold">Digital Wallet</h2>
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
        <div 
          className={`wallet-option p-4 rounded-lg ${selectedOption === 'PayPal' ? 'bg-white/10 border-2 border-' + config.accentColor + '60' : 'bg-white/5 border border-white/10'} hover:bg-white/10 transition-colors cursor-pointer`}
          onClick={() => handleSelectOption('PayPal')}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">PayPal</h3>
              <p className="text-sm opacity-70">Fast and secure payments worldwide</p>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedOption === 'PayPal' ? 'bg-' + config.accentColor : 'bg-white/10'}`}>
              {selectedOption === 'PayPal' && <Check size={14} className="text-black" />}
            </div>
          </div>
        </div>
        
        <div 
          className={`wallet-option p-4 rounded-lg ${selectedOption === 'Venmo' ? 'bg-white/10 border-2 border-' + config.accentColor + '60' : 'bg-white/5 border border-white/10'} hover:bg-white/10 transition-colors cursor-pointer`}
          onClick={() => handleSelectOption('Venmo')}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Venmo</h3>
              <p className="text-sm opacity-70">Quick transfers between users</p>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedOption === 'Venmo' ? 'bg-' + config.accentColor : 'bg-white/10'}`}>
              {selectedOption === 'Venmo' && <Check size={14} className="text-black" />}
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-xs opacity-70 mt-6 text-center">
        Your digital wallet preference will be securely saved. Need help? Contact our support team.
      </p>
    </div>
  );
};

export default DigitalWalletDetails;
