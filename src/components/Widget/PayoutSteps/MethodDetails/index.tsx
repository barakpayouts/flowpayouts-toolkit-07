
import React from 'react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import BankTransferDetails from './BankTransferDetails';
import CryptocurrencyDetails from './CryptocurrencyDetails';
import DigitalWalletDetails from './DigitalWalletDetails';
import CardPaymentDetails from './CardPaymentDetails';
import PrepaidCardDetails from './PrepaidCardDetails';
import GiftCardDetails from './GiftCardDetails';

interface MethodDetailsProps {
  onBack: () => void;
}

const MethodDetails: React.FC<MethodDetailsProps> = ({ onBack }) => {
  const { selectedMethod } = usePayoutWidget();
  
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
    default:
      return null;
  }
};

export default MethodDetails;
