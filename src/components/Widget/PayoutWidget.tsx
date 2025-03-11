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
import BankTransferDetails from './PayoutSteps/MethodDetails/BankTransferDetails';
import CryptocurrencyDetails from './PayoutSteps/MethodDetails/CryptocurrencyDetails';
import DigitalWalletDetails from './PayoutSteps/MethodDetails/DigitalWalletDetails';
import CardPaymentDetails from './PayoutSteps/MethodDetails/CardPaymentDetails';
import PrepaidCardDetails from './PayoutSteps/MethodDetails/PrepaidCardDetails';
import GiftCardDetails from './PayoutSteps/MethodDetails/GiftCardDetails';
import { Check, ChevronRight, ArrowLeft, Radio, DollarSign, Clock, FileText, Calendar, CreditCard, RefreshCw, LogOut, Upload } from 'lucide-react';
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const PayoutWidget: React.FC = () => {
  const { config } = useWidgetConfig();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  // This flag will be used to determine if bank verification should be added to steps
  const [requiresBankVerification, setRequiresBankVerification] = useState(false);

  const handleSelectPayoutMethod = (method: string) => {
    setSelectedMethod(method);
    // Only require bank verification if Bank Transfer is selected
    setRequiresBankVerification(method === 'Bank Transfer');
  };
  
  const handleNext = () => {
    if (activeStep < getSteps().length - 1) {
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
  
  // Get dynamic steps based on selected payout method
  const getSteps = () => {
    // Start with basic steps from config
    const baseSteps = [...config.steps];
    
    // Create a new array to store our final steps
    let steps = [...baseSteps];
    
    // Find the index of the payout step
    const payoutIndex = steps.findIndex(step => step === 'payout');
    
    // If Bank Transfer is selected and bank verification is required, 
    // add the bank verification step IMMEDIATELY AFTER the payout step
    if (requiresBankVerification && selectedMethod && payoutIndex !== -1) {
      // Make sure we're inserting at the right position - right after payout but before tax
      const beforePayout = steps.slice(0, payoutIndex + 1);
      const afterPayout = steps.slice(payoutIndex + 1);
      
      // Only add bank if it's not already in the steps
      if (!steps.includes('bank')) {
        steps = [...beforePayout, 'bank', ...afterPayout];
      }
    }
    
    return steps;
  };

  const renderStepContent = () => {
    const steps = getSteps();
    
    if (steps.length === 0) {
      return renderPayoutMethods();
    }

    const currentStep = steps[activeStep];
    const isLastStep = activeStep === steps.length - 1;
    
    switch (currentStep) {
      case 'profile':
        return <ProfileInfo 
          onNext={handleNext} 
          onBack={handleBack} 
          isLastStep={isLastStep} 
        />;
      case 'bank':
        return <BankVerification 
          onNext={handleNext} 
          onBack={handleBack} 
          isLastStep={isLastStep} 
        />;
      case 'tax':
        return <TaxForm 
          onNext={handleNext} 
          onBack={handleBack} 
          isLastStep={isLastStep} 
        />;
      case 'kyc':
        return <KYCVerification 
          onNext={handleNext} 
          onBack={handleBack} 
          isLastStep={isLastStep} 
        />;
      case 'payout':
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
        
        {selectedMethod && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Method Details</h3>
            {renderPayoutMethodDetails()}
            
            <button 
              onClick={handleNext}
              className="w-full mt-4 p-3 rounded-lg font-medium transition-all"
              style={{
                backgroundColor: config.accentColor,
                color: config.primaryColor,
              }}
            >
              Continue with {selectedMethod}
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderPayoutMethodDetails = () => {
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
      case 'Advanced Payment':
        return <AdvancedPaymentDetails paymentAmount={1000} />;
      case 'Early Access':
        return <EarlyAccessDetails paymentAmount={1500} />;
      default:
        return null;
    }
  };

  const steps = getSteps();
  const currentStep = steps.length > 0 ? steps[activeStep] : 'payout';
  
  const renderHeader = () => {
    return (
      <div className="widget-header">
        <div className="widget-header-pills">
          {config.recipientType && (
            <span className="widget-header-pill">
              {config.recipientType === 'vendor' && '🏢'}
              {config.recipientType === 'insured' && '🛡️'}
              {config.recipientType === 'individual' && '👤'}
              {config.recipientType === 'business' && '💼'}
              {config.recipientType === 'contractor' && '🔧'}
              <span className="capitalize">{config.recipientType}</span>
            </span>
          )}
          
          {steps.length > 0 && steps.includes('profile') && (
            <span className="widget-header-pill">Profile</span>
          )}
          
          {steps.length > 0 && steps.includes('kyc') && (
            <span className="widget-header-pill">KYC</span>
          )}
          
          {steps.length > 0 && steps.includes('bank') && (
            <span className="widget-header-pill">Bank</span>
          )}
          
          {steps.length > 0 && steps.includes('tax') && (
            <span className="widget-header-pill">Tax</span>
          )}
          
          <span className="widget-header-pill">Methods: {config.payoutMethods.length}</span>
        </div>
      </div>
    );
  };
  
  const renderStepCircles = () => {
    if (steps.length === 0) return null;
    
    return (
      <div className="step-circles">
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "step-circle",
              index === activeStep && "active",
              index < activeStep && "completed"
            )}
          >
            {index < activeStep ? (
              <Check size={14} />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  const renderFooter = () => {
    if (steps.length === 0) return null;
    
    return (
      <div className="widget-footer">
        <button 
          onClick={handleBack} 
          disabled={activeStep === 0} 
          className="step-nav-button"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        
        <div className="text-xs opacity-60">
          Step {activeStep + 1} of {steps.length}
        </div>
        
        <button 
          onClick={handleNext} 
          className="primary-button"
          // Disable next button on payout method step if no method is selected
          disabled={currentStep === 'payout' && !selectedMethod}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="widget-frame">
      {renderHeader()}
      
      {renderStepCircles()}
      
      <div className="widget-content">
        {renderStepContent()}
      </div>
      
      {renderFooter()}
    </div>
  );
};

export default PayoutWidget;
