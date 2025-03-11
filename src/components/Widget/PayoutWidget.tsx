
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
import EarlyAccess from './PayoutMethods/EarlyAccess';
import AdvancedPaymentDetails from './PayoutSteps/MethodDetails/AdvancedPaymentDetails';
import EarlyAccessDetails from './PayoutSteps/MethodDetails/EarlyAccessDetails';
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
  
  const handleNext = () => {
    if (activeStep < config.steps.length - 1) {
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

  const renderStepContent = () => {
    if (config.steps.length === 0) {
      return renderPayoutMethods();
    }

    const isLastStep = activeStep === config.steps.length - 1;
    
    switch (activeStep) {
      case 0:
        return <ProfileInfo 
          onNext={handleNext} 
          onBack={handleBack} 
          isLastStep={isLastStep} 
        />;
      case 1:
        return <BankVerification 
          onNext={handleNext} 
          onBack={handleBack} 
          isLastStep={isLastStep} 
        />;
      case 2:
        return <TaxForm 
          onNext={handleNext} 
          onBack={handleBack} 
          isLastStep={isLastStep} 
        />;
      case 3:
        return <KYCVerification 
          onNext={handleNext} 
          onBack={handleBack} 
          isLastStep={isLastStep} 
        />;
      case 4:
        return renderPayoutMethods();
      default:
        return null;
    }
  };

  const renderPayoutMethods = () => {
    const payoutComponents: Record<string, React.ReactNode> = {
      advanced: <AdvancedPayment onSelect={() => handleSelectPayoutMethod('Advanced Payment')} isSelected={selectedMethod === 'Advanced Payment'} />,
      early: <EarlyAccess onSelect={() => handleSelectPayoutMethod('Early Access')} isSelected={selectedMethod === 'Early Access'} />,
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
      case 'Early Access':
        return <EarlyAccessDetails paymentAmount={1500} />;
      default:
        return null;
    }
  };

  const currentStep = config.steps.length > 0 ? config.steps[activeStep] : 'payout';

  return (
    <div className="p-4 rounded-lg max-w-md mx-auto">
      {config.showProgressBar && config.steps.length > 0 && (
        <div className="mb-4 flex justify-center">
          <div className="flex space-x-2">
            {config.steps.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                  index <= activeStep 
                    ? 'bg-payouts-accent text-payouts-dark' 
                    : 'bg-white/10 text-white/60'
                }`}
              >
                {index < activeStep ? (
                  <Check size={14} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {config.showStepNumbers && config.steps.length > 0 && (
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={handleBack} 
            disabled={activeStep === 0} 
            className={`text-sm flex items-center ${
              activeStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:underline'
            }`}
          >
            <ArrowLeft size={16} className="mr-1" />
            Back
          </button>
          <span className="text-xs opacity-70">Step {activeStep + 1} of {config.steps.length}</span>
          <button 
            onClick={handleNext} 
            disabled={activeStep === config.steps.length - 1} 
            className={`text-sm flex items-center ${
              activeStep === config.steps.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:underline'
            }`}
          >
            Next
            <ChevronRight size={16} className="ml-1" />
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
