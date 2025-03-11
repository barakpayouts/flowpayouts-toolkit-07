
import React, { useState, useEffect } from 'react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { CreditCard, ArrowLeft, Check, Mail } from 'lucide-react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';

interface PrepaidCardAfterAdvanceProps {
  paymentAmount: number;
  advancePercentage: number;
  feePercentage: number;
  onBack: () => void;
  onComplete?: () => void;
}

type CardType = 'Visa' | 'Mastercard';

const PrepaidCardAfterAdvance: React.FC<PrepaidCardAfterAdvanceProps> = ({
  paymentAmount,
  advancePercentage,
  feePercentage,
  onBack,
  onComplete,
}) => {
  const { config } = useWidgetConfig();
  const { 
    setPrepaidCardEmail, 
    setSelectedAdvanceTier, 
    setShowDashboard, 
    setOnboardingCompleted,
    showDashboard
  } = usePayoutWidget();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCardType, setSelectedCardType] = useState<CardType>('Visa');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [navigateToDashboard, setNavigateToDashboard] = useState(false);

  const advanceAmount = (paymentAmount * advancePercentage) / 100;
  const feeAmount = (advanceAmount * feePercentage) / 100;
  const netAmount = advanceAmount - feeAmount;

  // Effect to handle navigation after state is updated
  useEffect(() => {
    if (navigateToDashboard) {
      console.log("PrepaidCardAfterAdvance: Attempting to navigate to dashboard");
      // Force navigation to dashboard
      setShowDashboard(true);
      setOnboardingCompleted(true);
      
      // Reset the flag
      setNavigateToDashboard(false);
      
      // Call the onComplete callback
      if (onComplete) {
        console.log("PrepaidCardAfterAdvance: Calling onComplete callback");
        onComplete();
      }
    }
  }, [navigateToDashboard, setShowDashboard, setOnboardingCompleted, onComplete]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleConfirm = () => {
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setEmailError('');
    setIsProcessing(true);
    
    // Save the email to context
    setPrepaidCardEmail(email);
    
    // Make sure the tier is set based on percentage
    console.log("Setting advance tier with percentage:", advancePercentage);
    if (advancePercentage === 70) {
      setSelectedAdvanceTier('70%');
    } else if (advancePercentage === 85) {
      setSelectedAdvanceTier('85%');
    } else if (advancePercentage === 100) {
      setSelectedAdvanceTier('100%');
    }
    
    // First attempt to navigate directly
    setShowDashboard(true);
    setOnboardingCompleted(true);
    
    // Set flag to trigger the useEffect for a second attempt at navigation
    setNavigateToDashboard(true);
    
    // Show success toast but don't delay navigation
    toast.success("Prepaid card confirmed", {
      description: `Your ${advancePercentage}% advance will be sent to your ${selectedCardType} prepaid card. Details will be sent to ${email}`,
    });
    
    console.log("handleConfirm: Navigation attempts completed, dashboard should show");
    setIsProcessing(false);
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
        
        <div className="p-4 rounded-lg border border-white/10 bg-white/5">
          <div 
            className="flex items-center justify-between"
          >
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
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="mt-4">
            <p className="text-sm mb-2">Select Card Provider:</p>
            <div className="grid grid-cols-2 gap-3">
              <div 
                className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedCardType === 'Visa' 
                    ? 'bg-white/10 border-' + config.accentColor + '60' 
                    : 'bg-white/5 border-white/10'
                }`}
                onClick={() => setSelectedCardType('Visa')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">Visa</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    selectedCardType === 'Visa' ? 'bg-' + config.accentColor : 'bg-white/10'
                  }`}>
                    {selectedCardType === 'Visa' && <Check size={12} className="text-black" />}
                  </div>
                </div>
              </div>
              
              <div 
                className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedCardType === 'Mastercard' 
                    ? 'bg-white/10 border-' + config.accentColor + '60' 
                    : 'bg-white/5 border-white/10'
                }`}
                onClick={() => setSelectedCardType('Mastercard')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">Mastercard</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    selectedCardType === 'Mastercard' ? 'bg-' + config.accentColor : 'bg-white/10'
                  }`}>
                    {selectedCardType === 'Mastercard' && <Check size={12} className="text-black" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-white/60" />
              <label htmlFor="email" className="text-sm">Email for card details:</label>
            </div>
            <Input 
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              className={`bg-white/10 border-white/20 text-white ${emailError ? 'border-red-500' : ''}`}
            />
            {emailError && (
              <p className="text-xs text-red-400">{emailError}</p>
            )}
            <p className="text-xs opacity-70">
              Card details and activation instructions will be sent to this email
            </p>
          </div>
        </div>
      </div>
      
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
