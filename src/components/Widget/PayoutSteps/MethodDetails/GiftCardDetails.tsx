
import React from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import { useWidgetConfig } from '@/hooks/use-widget-config';

const GiftCardDetails: React.FC = () => {
  const { handleBackStep, handleSelectDetailOption, selectedDetailOption } = usePayoutWidget();
  const { config } = useWidgetConfig();
  
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
        <h2 className="text-xl font-semibold">Gift Card</h2>
      </div>
      
      <div className="space-y-4">
        <div 
          className={`gift-option p-4 rounded-lg ${selectedDetailOption === 'Amazon' ? 'bg-white/10 border-2 border-' + config.accentColor + '60' : 'bg-white/5 border border-white/10'} hover:bg-white/10 transition-colors cursor-pointer`}
          onClick={() => handleSelectDetailOption('Amazon')}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Amazon</h3>
              <p className="text-sm opacity-70">Receive payments as Amazon gift cards</p>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedDetailOption === 'Amazon' ? 'bg-' + config.accentColor : 'bg-white/10'}`}>
              {selectedDetailOption === 'Amazon' && <Check size={14} className="text-black" />}
            </div>
          </div>
        </div>
        
        <div 
          className={`gift-option p-4 rounded-lg ${selectedDetailOption === 'Walmart' ? 'bg-white/10 border-2 border-' + config.accentColor + '60' : 'bg-white/5 border border-white/10'} hover:bg-white/10 transition-colors cursor-pointer`}
          onClick={() => handleSelectDetailOption('Walmart')}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Walmart</h3>
              <p className="text-sm opacity-70">Receive payments as Walmart gift cards</p>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedDetailOption === 'Walmart' ? 'bg-' + config.accentColor : 'bg-white/10'}`}>
              {selectedDetailOption === 'Walmart' && <Check size={14} className="text-black" />}
            </div>
          </div>
        </div>
        
        <div 
          className={`gift-option p-4 rounded-lg ${selectedDetailOption === 'Target' ? 'bg-white/10 border-2 border-' + config.accentColor + '60' : 'bg-white/5 border border-white/10'} hover:bg-white/10 transition-colors cursor-pointer`}
          onClick={() => handleSelectDetailOption('Target')}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Target</h3>
              <p className="text-sm opacity-70">Receive payments as Target gift cards</p>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedDetailOption === 'Target' ? 'bg-' + config.accentColor : 'bg-white/10'}`}>
              {selectedDetailOption === 'Target' && <Check size={14} className="text-black" />}
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-xs opacity-70 mt-6 text-center">
        Your gift card preference will be securely saved. Need help? Contact our support team.
      </p>
    </div>
  );
};

export default GiftCardDetails;
