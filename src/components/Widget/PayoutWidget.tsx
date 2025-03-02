
import React, { useState, useEffect } from 'react';
import GlassMorphism from '../ui/GlassMorphism';
import { useWidgetConfig, VerificationStep } from '@/hooks/use-widget-config';
import ProfileInfo from './ProfileInfo';
import BankVerification from './BankVerification';
import TaxForm from './TaxForm';
import BankTransfer from './PayoutMethods/BankTransfer';
import Cryptocurrency from './PayoutMethods/Cryptocurrency';
import DigitalWallet from './PayoutMethods/DigitalWallet';
import PushToCard from './PayoutMethods/PushToCard';
import PrepaidCard from './PayoutMethods/PrepaidCard';
import GiftCard from './PayoutMethods/GiftCard';
import { cn } from '@/lib/utils';

interface PayoutWidgetProps {
  className?: string;
  defaultStep?: VerificationStep;
  onComplete?: () => void;
}

const PayoutWidget: React.FC<PayoutWidgetProps> = ({
  className,
  defaultStep = 'profile',
  onComplete
}) => {
  const { config, getCssVariables } = useWidgetConfig();
  const [currentStep, setCurrentStep] = useState<VerificationStep>(defaultStep);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedPayoutMethod, setSelectedPayoutMethod] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Set initial step index
  useEffect(() => {
    const stepIndex = config.steps.indexOf(currentStep);
    setCurrentStepIndex(stepIndex >= 0 ? stepIndex : 0);
  }, [currentStep, config.steps]);
  
  // Set current step based on steps configuration
  useEffect(() => {
    if (config.steps.length > 0 && !config.steps.includes(currentStep)) {
      setCurrentStep(config.steps[0]);
    }
  }, [config.steps, currentStep]);
  
  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < config.steps.length) {
      setCurrentStep(config.steps[nextIndex]);
      setCurrentStepIndex(nextIndex);
    } else {
      handleSubmit();
    }
  };
  
  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(config.steps[prevIndex]);
      setCurrentStepIndex(prevIndex);
    }
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
      
      // Call onComplete callback if provided
      if (onComplete) {
        onComplete();
      }
    }, 1500);
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 'profile':
        return (
          <ProfileInfo 
            onNext={handleNext} 
            onComplete={handleSubmit}
            isLastStep={config.steps.length === 1} 
          />
        );
      case 'bank':
        if (selectedPayoutMethod === 'bank') {
          return (
            <BankVerification 
              onNext={handleNext} 
              onBack={handleBack}
              isLastStep={currentStepIndex === config.steps.length - 1} 
            />
          );
        } else {
          return renderPayoutMethodSelection();
        }
      case 'tax':
        return (
          <TaxForm 
            onNext={handleNext} 
            onBack={handleBack}
            isLastStep={currentStepIndex === config.steps.length - 1} 
          />
        );
      default:
        return null;
    }
  };
  
  const renderPayoutMethodSelection = () => {
    // Render appropriate component based on selected method
    switch (selectedPayoutMethod) {
      case 'bank':
        return <BankTransfer onNext={handleNext} onBack={() => setSelectedPayoutMethod(null)} />;
      case 'crypto':
        return <Cryptocurrency onNext={handleNext} onBack={() => setSelectedPayoutMethod(null)} />;
      case 'digital':
        return <DigitalWallet onNext={handleNext} onBack={() => setSelectedPayoutMethod(null)} />;
      case 'card':
        return <PushToCard onNext={handleNext} onBack={() => setSelectedPayoutMethod(null)} />;
      case 'prepaid':
        return <PrepaidCard onNext={handleNext} onBack={() => setSelectedPayoutMethod(null)} />;
      case 'gift':
        return <GiftCard onNext={handleNext} onBack={() => setSelectedPayoutMethod(null)} />;
      default:
        // Show payout method selection
        return (
          <div className="space-y-6 py-4">
            <h3 className="text-xl font-semibold text-center">Select Payment Method</h3>
            <p className="text-center text-sm text-white/80">Choose your preferred payment method</p>
            
            <div className="grid grid-cols-1 gap-3 mt-6">
              {config.payoutMethods.includes('bank') && (
                <button
                  onClick={() => setSelectedPayoutMethod('bank')}
                  className="flex items-center p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-payouts-accent/20 flex items-center justify-center mr-3">
                    <span className="text-payouts-accent">🏦</span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium">Bank Transfer</h4>
                    <p className="text-sm text-white/70">Direct deposit to your bank account</p>
                  </div>
                </button>
              )}
              
              {config.payoutMethods.includes('crypto') && (
                <button
                  onClick={() => setSelectedPayoutMethod('crypto')}
                  className="flex items-center p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-payouts-accent/20 flex items-center justify-center mr-3">
                    <span className="text-payouts-accent">₿</span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium">Cryptocurrency</h4>
                    <p className="text-sm text-white/70">Bitcoin, Ethereum, and more</p>
                  </div>
                </button>
              )}
              
              {config.payoutMethods.includes('digital') && (
                <button
                  onClick={() => setSelectedPayoutMethod('digital')}
                  className="flex items-center p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-payouts-accent/20 flex items-center justify-center mr-3">
                    <span className="text-payouts-accent">💳</span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium">Digital Wallet</h4>
                    <p className="text-sm text-white/70">PayPal, Venmo, and more</p>
                  </div>
                </button>
              )}
              
              {config.payoutMethods.includes('card') && (
                <button
                  onClick={() => setSelectedPayoutMethod('card')}
                  className="flex items-center p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-payouts-accent/20 flex items-center justify-center mr-3">
                    <span className="text-payouts-accent">💲</span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium">Push to Card</h4>
                    <p className="text-sm text-white/70">Instant card transfer</p>
                  </div>
                </button>
              )}
              
              {config.payoutMethods.includes('prepaid') && (
                <button
                  onClick={() => setSelectedPayoutMethod('prepaid')}
                  className="flex items-center p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-payouts-accent/20 flex items-center justify-center mr-3">
                    <span className="text-payouts-accent">💰</span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium">Prepaid Card</h4>
                    <p className="text-sm text-white/70">Virtual or physical prepaid card</p>
                  </div>
                </button>
              )}
              
              {config.payoutMethods.includes('gift') && (
                <button
                  onClick={() => setSelectedPayoutMethod('gift')}
                  className="flex items-center p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-payouts-accent/20 flex items-center justify-center mr-3">
                    <span className="text-payouts-accent">🎁</span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium">Gift Card</h4>
                    <p className="text-sm text-white/70">Amazon, Walmart, and more</p>
                  </div>
                </button>
              )}
            </div>
            
            {currentStepIndex > 0 && (
              <div className="flex justify-center mt-6">
                <button 
                  onClick={handleBack}
                  className="btn-secondary py-2 px-4"
                >
                  Back
                </button>
              </div>
            )}
          </div>
        );
    }
  };
  
  const renderCompletionScreen = () => (
    <div className="py-10 text-center space-y-6 animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-payouts-accent/20 mx-auto flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-payouts-accent">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <h3 className="text-2xl font-bold">Verification Complete!</h3>
      <p className="text-white/70">
        Your information has been successfully saved. You're all set to receive payments.
      </p>
      <button 
        className="btn-primary py-2 px-6 mx-auto mt-6"
        onClick={() => window.location.reload()}
      >
        Done
      </button>
    </div>
  );
  
  const renderProgressBar = () => {
    if (!config.showProgressBar) return null;
    
    return (
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-payouts-accent transition-all duration-500 ease-out"
          style={{ 
            width: `${((currentStepIndex + 1) / config.steps.length) * 100}%` 
          }}
        />
      </div>
    );
  };
  
  const renderStepIndicators = () => {
    if (!config.showStepNumbers) return null;
    
    return (
      <div className="flex justify-center space-x-4 mb-6">
        {config.steps.map((step, index) => (
          <div 
            key={step}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all",
              index < currentStepIndex ? "bg-payouts-accent text-payouts-dark" : 
              index === currentStepIndex ? "border-2 border-payouts-accent text-white" : 
              "bg-white/10 text-white/50"
            )}
          >
            {index + 1}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <GlassMorphism 
      className={cn(
        "w-full max-w-md overflow-hidden transition-all duration-300",
        className
      )}
      hoverEffect={false}
    >
      <div style={getCssVariables()}>
        <div className="p-6">
          {renderProgressBar()}
          
          <div className="flex justify-between items-center mb-6 mt-4">
            <h2 className="text-xl font-bold">Complete Your Verification</h2>
          </div>
          
          {renderStepIndicators()}
          
          {isCompleted ? renderCompletionScreen() : renderStepContent()}
          
          <div className="text-center mt-6 text-xs text-white/60">
            Your information is securely transmitted and protected.
          </div>
        </div>
      </div>
    </GlassMorphism>
  );
};

export default PayoutWidget;
