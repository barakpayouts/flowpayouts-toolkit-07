
import React, { useState } from 'react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import ProfileInfo from './ProfileInfo';
import BankVerification from './BankVerification';
import TaxForm from './TaxForm';
import BankTransfer from './PayoutMethods/BankTransfer';
import Cryptocurrency from './PayoutMethods/Cryptocurrency';
import DigitalWallet from './PayoutMethods/DigitalWallet';
import PushToCard from './PayoutMethods/PushToCard';
import PrepaidCard from './PayoutMethods/PrepaidCard';
import GiftCard from './PayoutMethods/GiftCard';
import { Check, ChevronRight } from 'lucide-react';
import { toast } from "sonner";

const PayoutWidget = () => {
  const { config } = useWidgetConfig();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Prepare steps based on config
  const steps = [
    ...(config.steps.includes('profile') ? ['profile'] : []),
    ...(config.steps.includes('bank') ? ['bank'] : []),
    ...(config.steps.includes('tax') ? ['tax'] : []),
    'payout', // Always include payout step
  ];
  
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (selectedMethod && currentStep === steps.length - 1) {
      // Handle payout completion
      setShowSuccess(true);
      toast.success("Payout successful!", {
        description: `Your funds will be sent via ${selectedMethod}.`
      });
    }
  };
  
  const handleSelectPayoutMethod = (method: string) => {
    setSelectedMethod(method);
  };

  const handleBackStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Function to get button styling based on config
  const getButtonStyle = () => {
    switch(config.buttonStyle) {
      case 'square':
        return '0px';
      case 'pill':
        return '9999px';
      case 'rounded':
      default:
        return '6px';
    }
  };
  
  const getStepContent = () => {
    const step = steps[currentStep];
    const isLastStep = currentStep === steps.length - 1;
    
    switch (step) {
      case 'profile':
        return (
          <ProfileInfo 
            onNext={handleNextStep} 
            onBack={handleBackStep}
            isLastStep={isLastStep} 
          />
        );
      case 'bank':
        return (
          <BankVerification 
            onNext={handleNextStep} 
            onBack={handleBackStep}
            isLastStep={isLastStep} 
          />
        );
      case 'tax':
        return (
          <TaxForm 
            onNext={handleNextStep} 
            onBack={handleBackStep}
            isLastStep={isLastStep} 
          />
        );
      case 'payout':
        return renderPayoutMethods();
      default:
        return null;
    }
  };
  
  const renderPayoutMethods = () => {
    const payoutComponents: Record<string, React.ReactNode> = {
      bank: <BankTransfer onSelect={() => handleSelectPayoutMethod('Bank Transfer')} />,
      crypto: <Cryptocurrency onSelect={() => handleSelectPayoutMethod('Cryptocurrency')} />,
      digital: <DigitalWallet onSelect={() => handleSelectPayoutMethod('Digital Wallet')} />,
      card: <PushToCard onSelect={() => handleSelectPayoutMethod('Card Payment')} />,
      prepaid: <PrepaidCard onSelect={() => handleSelectPayoutMethod('Prepaid Card')} />,
      gift: <GiftCard onSelect={() => handleSelectPayoutMethod('Gift Card')} />,
    };
    
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Select Payout Method</h2>
        <p className="text-sm mb-4 opacity-70">Choose how you'd like to receive your funds</p>
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
  
  // Generate dynamic CSS variables based on the configuration
  const widgetStyle = {
    '--primary-bg': config.primaryColor,
    '--accent': config.accentColor,
    '--bg-color': config.backgroundColor,
    '--text-color': config.textColor,
    '--border-color': config.borderColor,
    '--border-radius': `${config.borderRadius}px`,
    '--button-radius': getButtonStyle(),
  } as React.CSSProperties;
  
  if (showSuccess) {
    return (
      <div 
        className="widget-container p-6 rounded-xl max-w-md w-full mx-auto"
        style={widgetStyle}
      >
        <div className="success-view text-center p-8">
          <div className="success-icon mb-4 mx-auto">
            <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2">Success!</h2>
          <p className="mb-4">Your payout has been processed via {selectedMethod}.</p>
          <p className="text-sm opacity-70">You will receive a confirmation email shortly.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="widget-container p-6 rounded-xl max-w-md w-full mx-auto shadow-lg"
      style={widgetStyle}
    >
      {config.showProgressBar && steps.length > 1 && (
        <div className="progress-bar-container mb-6">
          <div className="flex justify-between mb-2">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`step-indicator ${index <= currentStep ? 'active' : ''}`}
              >
                {config.showStepNumbers && (
                  <span className="step-number">{index + 1}</span>
                )}
              </div>
            ))}
          </div>
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${(currentStep / (steps.length - 1)) * 100}%`,
                borderRadius: '3px'
              }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="step-content">
        {getStepContent()}
      </div>
      
      {steps[currentStep] === 'payout' && selectedMethod && (
        <button 
          className="confirm-button"
          onClick={handleNextStep}
          style={{
            borderRadius: `var(--button-radius)`,
          }}
        >
          Confirm {selectedMethod} <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default PayoutWidget;
