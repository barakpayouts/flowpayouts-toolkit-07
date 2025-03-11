
import React, { useState } from 'react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calculator, Clock, Rocket, ArrowLeft } from 'lucide-react';

interface AdvancedPaymentDetailsProps {
  paymentAmount: number;
  onBack: () => void;
}

const AdvancedPaymentDetails: React.FC<AdvancedPaymentDetailsProps> = ({
  paymentAmount = 1000, // Default value for demo
  onBack,
}) => {
  const { config } = useWidgetConfig();
  const { advancedPayment } = config;
  const [selectedTier, setSelectedTier] = useState(advancedPayment.tiers[0]);

  const handleTierSelect = (tier: typeof selectedTier) => {
    setSelectedTier(tier);
    toast.success("Payment tier selected", {
      description: `You'll receive ${tier.percentage}% of your payment upfront`,
    });
  };

  const calculateFeeAmount = (amount: number, feePercentage: number) => {
    return (amount * feePercentage) / 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={16} />
          Back to methods
        </button>
        <h2 className="text-xl font-semibold">Advanced Payment</h2>
      </div>
      
      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
        <h3 className="text-lg font-medium mb-2">Available Payment: ${paymentAmount}</h3>
        <p className="text-sm text-white/70">
          Choose how much of your payment you'd like to receive in advance
        </p>
      </div>

      <div className="grid gap-4">
        {advancedPayment.tiers.map((tier, index) => {
          const advanceAmount = (paymentAmount * tier.percentage) / 100;
          const feeAmount = calculateFeeAmount(advanceAmount, tier.fee);

          return (
            <div
              key={index}
              onClick={() => handleTierSelect(tier)}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedTier === tier
                  ? 'bg-white/10 border-2'
                  : 'bg-white/5 border border-white/10'
              }`}
              style={{
                borderColor: selectedTier === tier ? `${config.accentColor}60` : undefined,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Rocket
                    size={18}
                    className={selectedTier === tier ? 'text-' + config.accentColor : 'text-white/60'}
                  />
                  <h4 className="font-medium">{tier.percentage}% Advance</h4>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={14} className="text-white/60" />
                  <span className="text-white/60">
                    {tier.minDays === 0 ? 'Instant' : `${tier.minDays} day${tier.minDays > 1 ? 's' : ''}`}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">You'll receive</p>
                  <p className="font-medium">${advanceAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-white/60">Fee</p>
                  <p className="font-medium">${feeAmount.toFixed(2)} ({tier.fee}%)</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-black/20 p-4 rounded-lg text-sm space-y-2">
        <div className="flex items-center gap-2">
          <Calculator size={16} className="text-white/60" />
          <p className="text-white/70">
            Fees are calculated based on the advance amount and your payment history
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdvancedPaymentDetails;
