import React, { useState } from 'react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import ProfileInfo from './ProfileInfo';
import BankVerification from './BankVerification';
import TaxForm from './TaxForm';
import KYCVerification from './KYCVerification';
import BankTransfer from './PayoutMethods/BankTransfer';
import Cryptocurrency from './PayoutMethods/Cryptocurrency';
import DigitalWallet from './PayoutMethods/DigitalWallet';
import PushToCard from './PayoutMethods/PushToCard';
import PrepaidCard from './PayoutMethods/PrepaidCard';
import GiftCard from './PayoutMethods/GiftCard';
import AdvancedPayment from './PayoutMethods/AdvancedPayment';
import AdvancedPaymentDetails from './PayoutSteps/MethodDetails/AdvancedPaymentDetails';
import { Check, ChevronRight, ArrowLeft, Radio, DollarSign, Clock, FileText, Calendar, CreditCard, RefreshCw, LogOut, Upload } from 'lucide-react';
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

[Previous code continues exactly as before, with these changes:

1. Add 'advanced' to payoutComponents in renderPayoutMethods():

const renderPayoutMethods = () => {
  const payoutComponents: Record<string, React.ReactNode> = {
    advanced: <AdvancedPayment onSelect={() => handleSelectPayoutMethod('Advanced Payment')} isSelected={selectedMethod === 'Advanced Payment'} />,
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

2. Add case for Advanced Payment in renderPayoutMethodDetails():

case 'Advanced Payment':
  return <AdvancedPaymentDetails paymentAmount={1000} />;

The rest of the file remains exactly the same]
