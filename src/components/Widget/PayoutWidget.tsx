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

const PayoutWidget: React.FC = () => {
  const { config } = useWidgetConfig();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleSelectPayoutMethod = (method: string) => {
    setSelectedMethod(method);
  };

  const renderStepContent = () => {
    if (config.steps.length === 0) {
      return renderPayoutMethods();
    }

    switch (activeStep) {
      case 0:
        return <ProfileInfo />;
      case 1:
        return <BankVerification />;
      case 2:
        return <TaxForm />;
      case 3:
        return <KYCVerification />;
      case 4:
        return renderPayoutMethods();
      default:
        return null;
    }
  };

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

  const renderPayoutMethodDetails = () => {
    switch (selectedMethod) {
      case 'Bank Transfer':
        return <p>Bank Transfer Details</p>;
      case 'Cryptocurrency':
        return <p>Cryptocurrency Details</p>;
      case 'Digital Wallet':
        return <p>Digital Wallet Details</p>;
        case 'Advanced Payment':
          return <AdvancedPaymentDetails paymentAmount={1000} />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (activeStep < config.steps.length) {
      setActiveStep(activeStep + 1);
    } else {
      toast.success("All steps completed!", {
        description: "You've finished all the required steps."
      });
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const currentStep = config.steps.length > 0 ? config.steps[activeStep] : 'payout';

  return (
    <div className="p-6 rounded-lg">
      {config.showProgressBar && (
        <div className="mb-4">
          <progress className="progress w-full" value={(activeStep / config.steps.length) * 100} max="100"></progress>
        </div>
      )}

      {config.showStepNumbers && config.steps.length > 0 && (
        <div className="flex items-center justify-between mb-4">
          <button onClick={handleBack} disabled={activeStep === 0} className="btn btn-sm btn-ghost">
            <ArrowLeft size={16} />
            Back
          </button>
          <span className="text-sm opacity-70">Step {activeStep + 1} of {config.steps.length}</span>
          <button onClick={handleNext} disabled={activeStep === config.steps.length - 1} className="btn btn-sm btn-primary">
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {renderStepContent()}

      {selectedMethod && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-4">Method Details</h2>
          {renderPayoutMethodDetails()}
        </div>
      )}
    </div>
  );
};

export default PayoutWidget;
