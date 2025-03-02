
import React from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import { useWidgetConfig } from '@/hooks/use-widget-config';

const PrepaidCardDetails: React.FC = () => {
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
        <h2 className="text-xl font-semibold">Prepaid Card</h2>
      </div>
      
      <div className="space-y-4">
        <div 
          className={`card-option p-4 rounded-lg ${selectedDetailOption === 'Visa Prepaid' ? 'bg-white/10 border-2 border-' + config.accentColor + '60' : 'bg-white/5 border border-white/10'} hover:bg-white/10 transition-colors cursor-pointer`}
          onClick={() => handleSelectDetailOption('Visa Prepaid')}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Visa Prepaid</h3>
              <p className="text-sm opacity-70">Use prepaid cards for flexible spending</p>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedDetailOption === 'Visa Prepaid' ? 'bg-' + config.accentColor : 'bg-white/10'}`}>
              {selectedDetailOption === 'Visa Prepaid' && <Check size={14} className="text-black" />}
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-xs opacity-70 mt-6 text-center">
        Your information is securely transmitted and protected. Need help? Contact our support team.
      </p>
    </div>
  );
};

export default PrepaidCardDetails;
