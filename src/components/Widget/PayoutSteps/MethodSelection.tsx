
import React from 'react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import BankTransfer from '../PayoutMethods/BankTransfer';
import Cryptocurrency from '../PayoutMethods/Cryptocurrency';
import DigitalWallet from '../PayoutMethods/DigitalWallet';
import PushToCard from '../PayoutMethods/PushToCard';
import PrepaidCard from '../PayoutMethods/PrepaidCard';
import GiftCard from '../PayoutMethods/GiftCard';
import { useWidgetConfig } from '@/hooks/use-widget-config';

const MethodSelection: React.FC = () => {
  const { handleSelectPayoutMethod, selectedMethod } = usePayoutWidget();
  const { config } = useWidgetConfig();

  // Method mappings with radio button indicators
  const payoutComponents: Record<string, React.ReactNode> = {
    bank: <BankTransfer onSelect={() => handleSelectPayoutMethod('Bank Transfer')} isSelected={selectedMethod === 'Bank Transfer'} />,
    crypto: <Cryptocurrency onSelect={() => handleSelectPayoutMethod('Cryptocurrency')} isSelected={selectedMethod === 'Cryptocurrency'} />,
    digital: <DigitalWallet onSelect={() => handleSelectPayoutMethod('Digital Wallet')} isSelected={selectedMethod === 'Digital Wallet'} />,
    card: <PushToCard onSelect={() => handleSelectPayoutMethod('Card Payment')} isSelected={selectedMethod === 'Card Payment'} />,
    prepaid: <PrepaidCard onSelect={() => handleSelectPayoutMethod('Prepaid Card')} isSelected={selectedMethod === 'Prepaid Card'} />,
    gift: <GiftCard onSelect={() => handleSelectPayoutMethod('Gift Card')} isSelected={selectedMethod === 'Gift Card'} />,
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Payout Method</h2>
      <p className="text-sm mb-4 opacity-70">Choose how you'd like to receive your funds (select one)</p>
      <div className="grid grid-cols-1 gap-3 mt-4">
        {config.payoutMethods.map((method) => (
          <div key={method}>
            {payoutComponents[method]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MethodSelection;
