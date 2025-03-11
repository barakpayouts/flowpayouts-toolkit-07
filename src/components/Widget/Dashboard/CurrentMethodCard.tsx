
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';

const CurrentMethodCard: React.FC = () => {
  const { 
    selectedMethod, 
    selectedDetailOption, 
    handleChangePayoutMethod, 
    selectedAdvanceTier,
    prepaidCardEmail
  } = usePayoutWidget();
  
  const getDisplayMethod = () => {
    if (selectedMethod === 'Advanced Payment' && selectedAdvanceTier) {
      return `Advanced Payment (${selectedAdvanceTier})${prepaidCardEmail ? ' - Visa Prepaid' : ''}`;
    } else if (selectedMethod === 'Early Access') {
      return `Early Access${prepaidCardEmail ? ' - Mastercard Prepaid' : ''}`;
    } else {
      return `${selectedMethod}${selectedDetailOption ? ` (${selectedDetailOption})` : ''}`;
    }
  };
  
  return (
    <div className="current-method-card p-4 rounded-lg bg-white/5 border border-white/10 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm opacity-70">Current Payout Method</h3>
          <p className="font-medium text-base mt-1">{getDisplayMethod()}</p>
        </div>
        <button 
          onClick={handleChangePayoutMethod}
          className="flex items-center gap-1 text-sm bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-md"
        >
          <RefreshCw size={14} />
          <span>Change</span>
        </button>
      </div>
    </div>
  );
};

export default CurrentMethodCard;
