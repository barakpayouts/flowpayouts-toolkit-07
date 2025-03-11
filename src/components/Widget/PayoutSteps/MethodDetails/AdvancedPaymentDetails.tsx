
import React, { useState } from 'react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Calculator, 
  Clock, 
  Rocket, 
  ArrowLeft, 
  FileText, 
  Wallet, 
  Check 
} from 'lucide-react';
import PrepaidCardAfterAdvance from './PrepaidCardAfterAdvance';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';

interface AdvancedPaymentDetailsProps {
  paymentAmount: number;
  onBack: () => void;
}

type AdvanceType = 'invoice' | 'direct';

const AdvancedPaymentDetails: React.FC<AdvancedPaymentDetailsProps> = ({
  paymentAmount = 1000, // Default value for demo
  onBack,
}) => {
  const { config } = useWidgetConfig();
  const { advancedPayment } = config;
  const { setAdvanceType } = usePayoutWidget();
  
  const [selectedTier, setSelectedTier] = useState(advancedPayment.tiers[0]);
  const [showPrepaidCardSelection, setShowPrepaidCardSelection] = useState(false);
  const [processingAdvance, setProcessingAdvance] = useState(false);
  const [selectedAdvanceType, setSelectedAdvanceType] = useState<AdvanceType | null>(null);

  const handleTierSelect = (tier: typeof selectedTier) => {
    setSelectedTier(tier);
    toast.success("Payment tier selected", {
      description: `You'll receive ${tier.percentage}% of your payment upfront`,
    });
  };

  const calculateFeeAmount = (amount: number, feePercentage: number) => {
    return (amount * feePercentage) / 100;
  };
  
  const handleAdvanceTypeSelect = (type: AdvanceType) => {
    setSelectedAdvanceType(type);
    setAdvanceType(type);
  };

  const handleContinue = () => {
    if (!selectedAdvanceType) {
      toast.error("Please select an advance type", {
        description: "Choose whether this is for invoice factoring or a direct advance",
      });
      return;
    }
    
    setProcessingAdvance(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setProcessingAdvance(false);
      setShowPrepaidCardSelection(true);
    }, 500);
  };

  const handleBackToTiers = () => {
    setShowPrepaidCardSelection(false);
  };

  const handleCompleteProcess = () => {
    const advanceTypeLabel = selectedAdvanceType === 'invoice' ? 'invoice factoring' : 'direct advance';
    toast.success("Advanced payment confirmed!", {
      description: `Your ${selectedTier.percentage}% ${advanceTypeLabel} will be sent to your prepaid card shortly.`,
    });
    onBack();
  };

  if (showPrepaidCardSelection) {
    return (
      <PrepaidCardAfterAdvance 
        paymentAmount={paymentAmount}
        advancePercentage={selectedTier.percentage}
        feePercentage={selectedTier.fee}
        advanceType={selectedAdvanceType || 'direct'}
        onBack={handleBackToTiers}
        onComplete={handleCompleteProcess}
      />
    );
  }

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
          Choose your advanced payment type and how much you'd like to receive
        </p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-md font-medium">Select Advanced Payment Type:</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div
            onClick={() => handleAdvanceTypeSelect('invoice')}
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              selectedAdvanceType === 'invoice'
                ? 'bg-white/10 border-2'
                : 'bg-white/5 border border-white/10'
            }`}
            style={{
              borderColor: selectedAdvanceType === 'invoice' ? `${config.accentColor}60` : undefined,
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${config.accentColor}20, ${config.accentColor}40)`,
                }}
              >
                <FileText 
                  size={20} 
                  className={selectedAdvanceType === 'invoice' ? 'text-' + config.accentColor : 'text-white/60'}
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Invoice Factoring</h4>
                  {selectedAdvanceType === 'invoice' && (
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <Check size={12} className="text-black" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-white/70 mt-1">
                  We purchase your outstanding invoice at a discount and provide funds immediately
                </p>
              </div>
            </div>
          </div>
          
          <div
            onClick={() => handleAdvanceTypeSelect('direct')}
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              selectedAdvanceType === 'direct'
                ? 'bg-white/10 border-2'
                : 'bg-white/5 border border-white/10'
            }`}
            style={{
              borderColor: selectedAdvanceType === 'direct' ? `${config.accentColor}60` : undefined,
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${config.accentColor}20, ${config.accentColor}40)`,
                }}
              >
                <Wallet 
                  size={20} 
                  className={selectedAdvanceType === 'direct' ? 'text-' + config.accentColor : 'text-white/60'}
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Direct Advance</h4>
                  {selectedAdvanceType === 'direct' && (
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <Check size={12} className="text-black" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-white/70 mt-1">
                  Get an advance on your upcoming payouts (repaid from future earnings)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedAdvanceType && (
        <div className="grid gap-4">
          <h3 className="text-md font-medium mt-2">Select Advance Amount:</h3>
          
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
      )}

      <div className="bg-black/20 p-4 rounded-lg text-sm space-y-2">
        <div className="flex items-center gap-2">
          <Calculator size={16} className="text-white/60" />
          <p className="text-white/70">
            {selectedAdvanceType === 'invoice' 
              ? "Invoice factoring fees are calculated based on the invoice value and payment terms" 
              : "Advance fees are calculated based on the advance amount and your payment history"}
          </p>
        </div>
      </div>
      
      <Button 
        onClick={handleContinue}
        className="w-full"
        disabled={processingAdvance || !selectedAdvanceType}
        style={{
          backgroundColor: config.accentColor,
          color: config.backgroundColor
        }}
      >
        {processingAdvance ? "Processing..." : "Continue with Selected Advance"}
      </Button>
    </div>
  );
};

export default AdvancedPaymentDetails;
