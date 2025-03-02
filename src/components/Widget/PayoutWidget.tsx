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
import { Check, ChevronRight, ArrowLeft } from 'lucide-react';
import { toast } from "sonner";

const PayoutWidget = () => {
  const { config } = useWidgetConfig();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showMethodDetails, setShowMethodDetails] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  
  // Prepare steps based on config
  const steps = [
    ...(config.steps.includes('profile') ? ['profile'] : []),
    'payout', // Select payout method
    'details', // Enter details for selected method
    ...(config.steps.includes('bank') ? ['bank'] : []),
    ...(config.steps.includes('tax') ? ['tax'] : []),
  ];
  
  const handleNextStep = () => {
    // If we're at payout step and have selected a method, go to details step
    if (steps[currentStep] === 'payout' && selectedMethod) {
      setCurrentStep(currentStep + 1);
    } 
    // If we're at details step
    else if (steps[currentStep] === 'details') {
      // If we have Bank Transfer and there's a bank verification step, go to it
      if (selectedMethod === 'Bank Transfer' && steps.includes('bank')) {
        // Find the index of bank step
        const bankStepIndex = steps.indexOf('bank');
        setCurrentStep(bankStepIndex);
      } 
      // Otherwise skip to the next step after details (could be tax or end)
      else {
        // If we're at details and there's a next step (not bank), go to it
        const nextStepIndex = currentStep + 1;
        if (nextStepIndex < steps.length) {
          setCurrentStep(nextStepIndex);
        } else {
          // If there are no more steps, show success
          setShowSuccess(true);
          toast.success("Payout successful!", {
            description: `Your funds will be sent via ${selectedMethod}.`
          });
        }
      }
    }
    // For other steps (profile, bank, tax), just go to the next step
    else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step completed, show success
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
    if (steps[currentStep] === 'details') {
      // Go back to payout method selection
      setSelectedMethod(null);
      setCurrentStep(steps.indexOf('payout'));
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
        // Only render bank verification if bank transfer was selected
        if (selectedMethod === 'Bank Transfer') {
          return (
            <BankVerification 
              onNext={handleNextStep} 
              onBack={handleBackStep}
              isLastStep={isLastStep} 
            />
          );
        } else {
          // Skip this step automatically
          handleNextStep();
          return null;
        }
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
      case 'details':
        return renderPayoutMethodDetails();
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
  
  const renderPayoutMethodDetails = () => {
    // Render the appropriate form based on the selected method
    switch (selectedMethod) {
      case 'Bank Transfer':
        return (
          <div className="payout-details-form">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={handleBackStep}
                className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                <ArrowLeft size={16} />
                Back to methods
              </button>
              <h2 className="text-xl font-semibold">Bank Transfer Details</h2>
            </div>
            
            <div className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium mb-1">Account Holder Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none"
                  placeholder="Enter full name"
                  value={formData.accountName || ''}
                  onChange={(e) => handleFormChange('accountName', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium mb-1">Bank Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none"
                  placeholder="Enter bank name"
                  value={formData.bankName || ''}
                  onChange={(e) => handleFormChange('bankName', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium mb-1">Account Number/IBAN</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none"
                  placeholder="Enter account number or IBAN"
                  value={formData.accountNumber || ''}
                  onChange={(e) => handleFormChange('accountNumber', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium mb-1">SWIFT/BIC Code</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none"
                  placeholder="Enter SWIFT or BIC code"
                  value={formData.swiftCode || ''}
                  onChange={(e) => handleFormChange('swiftCode', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium mb-1">Currency</label>
                <select 
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none appearance-none cursor-pointer"
                  value={formData.currency || ''}
                  onChange={(e) => handleFormChange('currency', e.target.value)}
                >
                  <option value="">Select currency</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium mb-1">Country</label>
                <select 
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none appearance-none cursor-pointer"
                  value={formData.country || ''}
                  onChange={(e) => handleFormChange('country', e.target.value)}
                >
                  <option value="">Select country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
            </div>
            
            <p className="text-xs opacity-70 mt-6 text-center">
              Your information is securely transmitted and protected. Need help? Contact our support team.
            </p>
          </div>
        );
        
      case 'Cryptocurrency':
        return (
          <div className="payout-details-form">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={handleBackStep}
                className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                <ArrowLeft size={16} />
                Back to methods
              </button>
              <h2 className="text-xl font-semibold">Cryptocurrency Details</h2>
            </div>
            
            <div className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium mb-1">Blockchain Network</label>
                <select 
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none appearance-none cursor-pointer"
                  value={formData.network || ''}
                  onChange={(e) => handleFormChange('network', e.target.value)}
                >
                  <option value="">Select network</option>
                  <option value="BTC">Bitcoin</option>
                  <option value="ETH">Ethereum</option>
                  <option value="POLY">Polygon</option>
                  <option value="SOL">Solana</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium mb-1">Wallet Address</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none"
                  placeholder="Enter your wallet address"
                  value={formData.walletAddress || ''}
                  onChange={(e) => handleFormChange('walletAddress', e.target.value)}
                />
              </div>
            </div>
            
            <p className="text-xs opacity-70 mt-6 text-center">
              Your information is securely transmitted and protected. Need help? Contact our support team.
            </p>
          </div>
        );
        
      case 'Digital Wallet':
        return (
          <div className="payout-details-form">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={handleBackStep}
                className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                <ArrowLeft size={16} />
                Back to methods
              </button>
              <h2 className="text-xl font-semibold">Digital Wallet</h2>
            </div>
            
            <div className="space-y-4">
              <div className="wallet-option p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">PayPal</h3>
                    <p className="text-sm opacity-70">Fast and secure payments worldwide</p>
                  </div>
                  <button className="px-4 py-1 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20">
                    Select
                  </button>
                </div>
              </div>
              
              <div className="wallet-option p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Venmo</h3>
                    <p className="text-sm opacity-70">Quick transfers between users</p>
                  </div>
                  <button className="px-4 py-1 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20">
                    Select
                  </button>
                </div>
              </div>
            </div>
            
            <p className="text-xs opacity-70 mt-6 text-center">
              Your digital wallet preference will be securely saved. Need help? Contact our support team.
            </p>
          </div>
        );
        
      case 'Card Payment':
        return (
          <div className="payout-details-form">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={handleBackStep}
                className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                <ArrowLeft size={16} />
                Back to methods
              </button>
              <h2 className="text-xl font-semibold">Card Details</h2>
            </div>
            
            <div className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium mb-1">Card Number</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none"
                  placeholder="XXXX XXXX XXXX XXXX"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block text-sm font-medium mb-1">Expiry Date</label>
                  <input 
                    type="text" 
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none"
                    placeholder="MM/YY"
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium mb-1">CVV</label>
                  <input 
                    type="text" 
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none"
                    placeholder="XXX"
                  />
                </div>
              </div>
            </div>
            
            <p className="text-xs opacity-70 mt-6 text-center">
              Your information is securely transmitted and protected. Need help? Contact our support team.
            </p>
          </div>
        );
        
      case 'Prepaid Card':
        return (
          <div className="payout-details-form">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={handleBackStep}
                className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                <ArrowLeft size={16} />
                Back to methods
              </button>
              <h2 className="text-xl font-semibold">Prepaid Card</h2>
            </div>
            
            <div className="space-y-4">
              <div className="card-option p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Visa Prepaid</h3>
                    <p className="text-sm opacity-70">Use prepaid cards for flexible spending</p>
                  </div>
                  <button className="px-4 py-1 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20">
                    Select
                  </button>
                </div>
              </div>
            </div>
            
            <p className="text-xs opacity-70 mt-6 text-center">
              Your information is securely transmitted and protected. Need help? Contact our support team.
            </p>
          </div>
        );
        
      case 'Gift Card':
        return (
          <div className="payout-details-form">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={handleBackStep}
                className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                <ArrowLeft size={16} />
                Back to methods
              </button>
              <h2 className="text-xl font-semibold">Gift Card</h2>
            </div>
            
            <div className="space-y-4">
              <div className="gift-option p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Amazon</h3>
                    <p className="text-sm opacity-70">Receive payments as Amazon gift cards</p>
                  </div>
                  <button className="px-4 py-1 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20">
                    Select Amazon
                  </button>
                </div>
              </div>
              
              <div className="gift-option p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Walmart</h3>
                    <p className="text-sm opacity-70">Receive payments as Walmart gift cards</p>
                  </div>
                  <button className="px-4 py-1 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20">
                    Select Walmart
                  </button>
                </div>
              </div>
              
              <div className="gift-option p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Target</h3>
                    <p className="text-sm opacity-70">Receive payments as Target gift cards</p>
                  </div>
                  <button className="px-4 py-1 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20">
                    Select Target
                  </button>
                </div>
              </div>
            </div>
            
            <p className="text-xs opacity-70 mt-6 text-center">
              Your gift card preference will be securely saved. Need help? Contact our support team.
            </p>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  // Generate dynamic CSS variables based on the configuration
  const widgetStyle = {
    '--primary-bg': config.primaryColor,
    '--accent': config.accentColor,
    '--bg-color': config.backgroundColor,
    '--text-color': config.textColor,
    '--border-color': config.borderColor,
    '--border-radius': `${config.borderRadius}px`,
    '--button-radius': config.buttonStyle === 'rounded' ? '6px' : 
                       config.buttonStyle === 'pill' ? '9999px' : '0px',
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
            {steps.map((step, index) => {
              // Skip the details step in progress bar to avoid confusion
              if (step === 'details') return null;
              
              // Adjust the index for comparison with currentStep
              const displayIndex = index <= steps.indexOf('details') && currentStep > steps.indexOf('details') ? 
                index : index - (steps.includes('details') ? 1 : 0);
                
              return (
                <div 
                  key={index}
                  className={`step-indicator ${index <= currentStep ? 'active' : ''}`}
                >
                  {config.showStepNumbers && (
                    <span className="step-number">{displayIndex + 1}</span>
                  )}
                </div>
              );
            }).filter(Boolean)}
          </div>
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${(currentStep / (steps.length - (steps.includes('details') ? 2 : 1))) * 100}%`,
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
          className="confirm-button mt-6 w-full py-3 font-medium flex items-center justify-center"
          onClick={handleNextStep}
          style={{
            borderRadius: `var(--button-radius)`,
            backgroundColor: config.accentColor,
            color: config.primaryColor,
          }}
        >
          {`Continue with ${selectedMethod}`} <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      )}
      
      {steps[currentStep] === 'details' && (
        <button 
          className="confirm-button mt-6 w-full py-3 font-medium flex items-center justify-center"
          onClick={handleNextStep}
          style={{
            borderRadius: `var(--button-radius)`,
            backgroundColor: config.accentColor,
            color: config.primaryColor,
          }}
        >
          {`Save ${selectedMethod} Details`} <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default PayoutWidget;
