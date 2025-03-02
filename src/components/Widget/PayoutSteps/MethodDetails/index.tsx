
import React from 'react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import BankTransferDetails from './BankTransferDetails';
import CryptocurrencyDetails from './CryptocurrencyDetails';
import DigitalWalletDetails from './DigitalWalletDetails';
import CardPaymentDetails from './CardPaymentDetails';
import PrepaidCardDetails from './PrepaidCardDetails';
import GiftCardDetails from './GiftCardDetails';

const MethodDetails: React.FC = () => {
  const { selectedMethod } = usePayoutWidget();
  
  // Render the appropriate form based on the selected method
  switch (selectedMethod) {
    case 'Bank Transfer':
      return <BankTransferDetails />;
    case 'Cryptocurrency':
      return <CryptocurrencyDetails />;
    case 'Digital Wallet':
      return <DigitalWalletDetails />;
    case 'Card Payment':
      return <CardPaymentDetails />;
    case 'Prepaid Card':
      return <PrepaidCardDetails />;
    case 'Gift Card':
      return <GiftCardDetails />;
    default:
      return null;
  }
};

export default MethodDetails;
