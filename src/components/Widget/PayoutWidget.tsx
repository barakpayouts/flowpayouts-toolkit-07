
import React, { useState, useEffect } from 'react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { PayoutWidgetProvider } from '@/contexts/PayoutWidgetContext';
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
import MethodDetails from './PayoutSteps/MethodDetails';
import Dashboard from './Dashboard/Dashboard';
import LoginScreen from './LoginScreen';
import { Check, ChevronRight, ArrowLeft } from 'lucide-react';
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const PayoutWidget: React.FC = () => {
  const { config } = useWidgetConfig();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showMethodDetails, setShowMethodDetails] = useState<boolean>(false);
  const [requiresBankVerification, setRequiresBankVerification] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [showLoginScreen, setShowLoginScreen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [advancedPaymentStage, setAdvancedPaymentStage] = useState(false);
  const [selectedAdvanceTier, setSelectedAdvanceTier] = useState<string | null>(null);
  const [prepaidCardEmail, setPrepaidCardEmail] = useState('');

  useEffect(() => {
    console.log("PayoutWidget state updated:", { 
      showDashboard, 
      onboardingCompleted, 
      selectedMethod,
      prepaidCardEmail
    });
  }, [showDashboard, onboardingCompleted, selectedMethod, prepaidCardEmail]);

  const handleSelectPayoutMethod = (method: string) => {
    setSelectedMethod(method);
    setRequiresBankVerification(method === 'Bank Transfer');
    setShowMethodDetails(true);
    
    if (method !== 'Advanced Payment') {
      setAdvancedPaymentStage(false);
      setSelectedAdvanceTier(null);
    }
    
  };
  
  const handleNext = () => {
    if (activeStep < getSteps().length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setOnboardingCompleted(true);
      setShowDashboard(true);
      toast.success("All steps completed!", {
        description: "You've finished all the required steps."
      });
    }
  };

  const handleBack = () => {
    if (showDashboard) {
      setShowDashboard(false);
      return;
    }
    
    if (showMethodDetails) {
      setShowMethodDetails(false);
      return;
    }
    
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginScreen(false);
    setOnboardingCompleted(true);
    setSelectedMethod('Digital Wallet');
    setShowDashboard(true);
    toast.success("Welcome back!", {
      description: "You've been logged in successfully."
    });
  };
  
  const handleStartOnboarding = () => {
    setShowLoginScreen(false);
    setActiveStep(0);
    setOnboardingCompleted(false);
    setShowDashboard(false);
    setIsLoggedIn(true);
  };
  
  const getSteps = () => {
    const baseSteps = [...config.steps];
    let steps = [...baseSteps];
    
    if (!steps.includes('payout')) {
      steps.push('payout');
    }
    
    const payoutIndex = steps.findIndex(step => step === 'payout');
    
    if (requiresBankVerification && selectedMethod && payoutIndex !== -1) {
      const beforePayout = steps.slice(0, payoutIndex + 1);
      const afterPayout = steps.slice(payoutIndex + 1);
      
      if (!steps.includes('bank')) {
        steps = [...beforePayout, 'bank', ...afterPayout];
      }
    }
    
    return steps;
  };

  const renderStepContent = () => {
    if (showLoginScreen) {
      return <LoginScreen />;
    }
    
    if (showDashboard) {
      console.log("PayoutWidget: Rendering Dashboard component");
      return <Dashboard onBack={() => setShowDashboard(false)} />;
    }
    
    const steps = getSteps();
    
    if (steps.length === 0) {
      if (showMethodDetails && selectedMethod) {
        return <MethodDetails onBack={() => setShowMethodDetails(false)} />;
      }
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
        if (showMethodDetails && selectedMethod) {
          return <MethodDetails onBack={() => setShowMethodDetails(false)} />;
        }
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
        
        <div className="mb-6 p-4 rounded-lg border border-white/20 bg-white/5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm opacity-70">Available Balance</span>
            <span className="font-semibold text-lg">{config.payoutAmount || "$1,250.00"}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="opacity-70">From: {config.companyName || "Acme Inc."}</span>
            <span className="opacity-70">Currency: {config.currency || "USD"}</span>
          </div>
        </div>
        
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
    if (steps.length === 0 || showDashboard) return null;
    
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
    if (steps.length === 0 || showDashboard) return null;
    
    return (
      <div className="widget-footer">
        <button 
          onClick={handleBack} 
          disabled={activeStep === 0 && !showMethodDetails} 
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
          disabled={(currentStep === 'payout' && !selectedMethod && !showMethodDetails)}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <PayoutWidgetProvider value={{ 
      selectedMethod,
      setSelectedMethod,
      showDashboard,
      setShowDashboard,
      onboardingCompleted, 
      setOnboardingCompleted,
      handleNext,
      isLoggedIn,
      setIsLoggedIn,
      advancedPaymentStage,
      setAdvancedPaymentStage,
      selectedAdvanceTier,
      setSelectedAdvanceTier,
      prepaidCardEmail,
      setPrepaidCardEmail,
      handleLogin,
      handleStartOnboarding,
      companyName: config.companyName || "Acme Inc.", // Add companyName from config
    }}>
      <div className="widget-frame">
        {!showLoginScreen && renderHeader()}
        
        {!showLoginScreen && renderStepCircles()}
        
        <div className="widget-content">
          {renderStepContent()}
        </div>
        
        {!showLoginScreen && !showDashboard && renderFooter()}
      </div>
    </PayoutWidgetProvider>
  );
};

export default PayoutWidget;
