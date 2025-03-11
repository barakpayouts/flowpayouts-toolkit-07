
import React, { useEffect } from 'react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import BankTransferDetails from './BankTransferDetails';
import CryptocurrencyDetails from './CryptocurrencyDetails';
import DigitalWalletDetails from './DigitalWalletDetails';
import CardPaymentDetails from './CardPaymentDetails';
import PrepaidCardDetails from './PrepaidCardDetails';
import GiftCardDetails from './GiftCardDetails';
import AdvancedPaymentDetails from './AdvancedPaymentDetails';
import EarlyAccessDetails from './EarlyAccessDetails';
import PrepaidCardAfterAdvance from './PrepaidCardAfterAdvance';

interface MethodDetailsProps {
  onBack: () => void;
}

const MethodDetails: React.FC<MethodDetailsProps> = ({ onBack }) => {
  const { 
    selectedMethod, 
    advancedPaymentStage, 
    earlyAccessActivated, 
    selectedAdvanceTier, 
    setShowDashboard, 
    setOnboardingCompleted,
    showDashboard 
  } = usePayoutWidget();
  
  // Log when the component renders and the showDashboard state
  useEffect(() => {
    console.log("MethodDetails rendered, showDashboard:", showDashboard);
  }, [showDashboard]);
  
  // Parse the advance percentage to a number
  const getAdvancePercentage = (tier: string | null): number => {
    if (!tier) return 70;
    return parseInt(tier.replace('%', ''));
  };
  
  // Get the fee percentage as a number based on the tier
  const getFeePercentage = (tier: string | null): number => {
    if (!tier) return 1;
    const percentage = parseInt(tier.replace('%', ''));
    if (percentage === 70) return 1;
    if (percentage === 85) return 2;
    return 3;
  };
  
  // This function forces navigation to the dashboard with multiple approaches
  const handleCompleteProcess = () => {
    console.log("MethodDetails: handleCompleteProcess called - navigating to dashboard");
    
    // Direct approach - immediately set the state
    setShowDashboard(true);
    setOnboardingCompleted(true);
    
    // Backup approach - set state again in the next tick
    setTimeout(() => {
      console.log("MethodDetails: Inside timeout - setting dashboard state again");
      setShowDashboard(true);
      setOnboardingCompleted(true);
    }, 0);
  };
  
  // For Advanced Payment with prepaid card selection stage
  if (advancedPaymentStage && selectedMethod === 'Advanced Payment') {
    return <PrepaidCardAfterAdvance 
      onBack={onBack}
      paymentAmount={1000}
      advancePercentage={getAdvancePercentage(selectedAdvanceTier)}
      feePercentage={getFeePercentage(selectedAdvanceTier)}
      onComplete={handleCompleteProcess}
    />;
  }
  
  // For Early Access with prepaid card selection stage
  if (earlyAccessActivated && selectedMethod === 'Early Access') {
    return <PrepaidCardAfterAdvance 
      onBack={onBack}
      paymentAmount={1500}
      advancePercentage={100}
      feePercentage={3}
      onComplete={handleCompleteProcess}
    />;
  }
  
  // Render the appropriate form based on the selected method
  switch (selectedMethod) {
    case 'Bank Transfer':
      return <BankTransferDetails onBack={onBack} />;
    case 'Cryptocurrency':
      return <CryptocurrencyDetails onBack={onBack} />;
    case 'Digital Wallet':
      return <DigitalWalletDetails onBack={onBack} />;
    case 'Card Payment':
      return <CardPaymentDetails onBack={onBack} />;
    case 'Prepaid Card':
      return <PrepaidCardDetails onBack={onBack} />;
    case 'Gift Card':
      return <GiftCardDetails onBack={onBack} />;
    case 'Advanced Payment':
      return <AdvancedPaymentDetails paymentAmount={1000} onBack={onBack} />;
    case 'Early Access':
      return <EarlyAccessDetails paymentAmount={1500} onBack={onBack} />;
    default:
      return (
        <div className="p-4 rounded-lg bg-white/10 border border-white/20">
          <h3 className="text-xl mb-4">Method Details</h3>
          <p>No method selected or unknown method type.</p>
          <button 
            onClick={onBack}
            className="mt-4 flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition-colors"
          >
            Back to methods
          </button>
        </div>
      );
  }
};

export default MethodDetails;
