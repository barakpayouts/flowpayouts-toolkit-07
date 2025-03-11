
import React, { useState } from 'react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CreditCard, ArrowLeft, Check } from 'lucide-react';

interface PrepaidCardAfterAdvanceProps {
  paymentAmount: number;
  advancePercentage: number;
  feePercentage: number;
  onBack: () => void;
  onComplete: () => void;
}

const PrepaidCardAfterAdvance: React.FC<PrepaidCardAfterAdvanceProps> = ({
  paymentAmount,
  advancePercentage,
  feePercentage,
  onBack,
  onComplete,
}) => {
  const { config } = useWidgetConfig();
  const [isSelected, setIsSelected] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const advanceAmount = (paymentAmount * advancePercentage) / 100;
  const feeAmount = (advanceAmount * feePercentage) / 100;
  const netAmount = advanceAmount - feeAmount;

  const handleConfirm = () => {
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Prepaid card selected", {
        description: `Your ${advancePercentage}% advance will be sent to a prepaid card`,
      });
      onComplete();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={16} />
          Back to advance options
        </button>
        <h2 className="text-xl font-semibold">Select Payout Method</h2>
      </div>
      
      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
        <h3 className="text-lg font-medium mb-2">Advanced Payment Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-white/60">Selected Advance</p>
            <p className="font-medium">{advancePercentage}%</p>
          </div>
          <div>
            <p className="text-white/60">Net Amount</p>
            <p className="font-medium">${netAmount.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-white/60">Fee</p>
            <p className="font-medium">${feeAmount.toFixed(2)} ({feePercentage}%)</p>
          </div>
          <div>
            <p className="text-white/60">Total Advance</p>
            <p className="font-medium">${advanceAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm opacity-80">Please select how you want to receive your advance:</p>
        
        <div 
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
            isSelected ? 'bg-white/10 border-' + config.accentColor + '60' : 'bg-white/5 border-white/10'
          }`}
          onClick={() => setIsSelected(true)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: `${config.accentColor}20`,
                }}
              >
                <CreditCard 
                  size={20} 
                  style={{ color: config.accentColor }}
                />
              </div>
              <div>
                <h3 className="font-medium">Prepaid Card</h3>
                <p className="text-sm opacity-70">Receive your funds on a prepaid card</p>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              isSelected ? 'bg-' + config.accentColor : 'bg-white/10'
            }`}>
              {isSelected && <Check size={14} className="text-black" />}
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-xs opacity-70 mt-2 text-center">
        Your prepaid card will be issued immediately after confirmation
      </p>
      
      <Button 
        onClick={handleConfirm}
        className="w-full"
        disabled={isProcessing}
        style={{
          backgroundColor: config.accentColor,
          color: config.backgroundColor
        }}
      >
        {isProcessing ? "Processing..." : "Confirm Prepaid Card"}
      </Button>
    </div>
  );
};

export default PrepaidCardAfterAdvance;
