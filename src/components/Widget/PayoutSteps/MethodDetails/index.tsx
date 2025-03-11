
import React from 'react';
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
  const { selectedMethod, advancedPaymentStage, earlyAccessActivated, selectedAdvanceTier } = usePayoutWidget();
  
  // For Advanced Payment with prepaid card selection stage
  if (advancedPaymentStage && selectedMethod === 'Advanced Payment') {
    return <PrepaidCardAfterAdvance 
      onBack={onBack}
      paymentAmount={1000}
      advancePercentage={selectedAdvanceTier || "70%"}
      feePercentage={selectedAdvanceTier === "70%" ? "1%" : selectedAdvanceTier === "85%" ? "2%" : "3%"}
      onComplete={() => {}}
    />;
  }
  
  // For Early Access with prepaid card selection stage
  if (earlyAccessActivated && selectedMethod === 'Early Access') {
    return <PrepaidCardAfterAdvance 
      onBack={onBack}
      paymentAmount={1500}
      advancePercentage="100%"
      feePercentage="3%"
      onComplete={() => {}}
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
