
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
import { Check, ChevronRight, ArrowLeft, Radio, DollarSign, Clock, FileText, Calendar, CreditCard, RefreshCw, LogOut } from 'lucide-react';
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const PayoutWidget = () => {
  const { config } = useWidgetConfig();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showMethodDetails, setShowMethodDetails] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  // New state for detailed selection options
  const [selectedDetailOption, setSelectedDetailOption] = useState<string | null>(null);
  // New state to track if the user has completed onboarding
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  // State for demo/simulation purposes
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Demo payout data
  const payouts = [
    { 
      id: 'p1', 
      amount: '$1,250.00', 
      date: 'May 15, 2023', 
      status: 'Completed', 
      method: 'Bank Transfer',
      invoice: 'INV-2023-05-01',
      description: 'April commission payment'
    },
    { 
      id: 'p2', 
      amount: '$890.75', 
      date: 'Jun 12, 2023', 
      status: 'Completed', 
      method: 'Bank Transfer',
      invoice: 'INV-2023-06-01',
      description: 'May commission payment'
    },
    { 
      id: 'p3', 
      amount: '$1,475.50', 
      date: 'Jul 15, 2023', 
      status: 'Completed', 
      method: 'Digital Wallet (PayPal)',
      invoice: 'INV-2023-07-01',
      description: 'June commission payment'
    },
    { 
      id: 'p4', 
      amount: '$2,100.00', 
      date: 'Aug 15, 2023', 
      status: 'Pending', 
      method: 'Digital Wallet (PayPal)',
      invoice: 'INV-2023-08-01',
      description: 'July commission payment'
    },
    { 
      id: 'p5', 
      amount: '$1,890.25', 
      date: 'Sep 15, 2023', 
      status: 'Awaiting Approval', 
      method: 'Digital Wallet (PayPal)',
      invoice: 'INV-2023-09-01',
      description: 'August commission payment'
    },
  ];
  
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
      // For methods that need a specific option to be selected
      if ((selectedMethod === 'Digital Wallet' || selectedMethod === 'Prepaid Card' || selectedMethod === 'Gift Card') 
          && !selectedDetailOption) {
        toast.error("Please select an option to continue", {
          description: `You need to select a specific ${selectedMethod.toLowerCase()} option.`
        });
        return;
      }
      
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
          setOnboardingCompleted(true);
          toast.success("Payout successful!", {
            description: `Your funds will be sent via ${selectedMethod}${selectedDetailOption ? ` (${selectedDetailOption})` : ''}.`
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
      setOnboardingCompleted(true);
      toast.success("Payout successful!", {
        description: `Your funds will be sent via ${selectedMethod}${selectedDetailOption ? ` (${selectedDetailOption})` : ''}.`
      });
    }
  };
  
  const handleSelectPayoutMethod = (method: string) => {
    setSelectedMethod(method);
    // Reset the detail option when changing method
    setSelectedDetailOption(null);
  };

  const handleBackStep = () => {
    if (steps[currentStep] === 'details') {
      // Go back to payout method selection
      setSelectedMethod(null);
      setSelectedDetailOption(null);
      setCurrentStep(steps.indexOf('payout'));
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSelectDetailOption = (option: string) => {
    setSelectedDetailOption(option);
  };
  
  const handleStartOnboarding = () => {
    setCurrentStep(0);
    setOnboardingCompleted(false);
    setShowSuccess(false);
    setIsLoggedIn(true);
  };
  
  const handleLogin = () => {
    // Simulate login
    setIsLoggedIn(true);
    setOnboardingCompleted(true); // Assuming user has completed onboarding before
    setSelectedMethod('Digital Wallet');
    setSelectedDetailOption('PayPal');
    toast.success("Welcome back!", {
      description: "You've been logged in successfully."
    });
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setOnboardingCompleted(false);
    toast.info("You've been logged out", {
      description: "See you again soon!"
    });
  };
  
  const handleChangePayoutMethod = () => {
    setCurrentStep(steps.indexOf('payout'));
    setOnboardingCompleted(false);
    setShowSuccess(false);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-500';
      case 'Pending': return 'text-yellow-500';
      case 'Awaiting Approval': return 'text-blue-500';
      default: return 'text-gray-500';
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
    // Updated method mappings with radio button indicators
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
              <div 
                className={`wallet-option p-4 rounded-lg ${selectedDetailOption === 'PayPal' ? 'bg-white/10 border-2 border-' + config.accentColor + '60' : 'bg-white/5 border border-white/10'} hover:bg-white/10 transition-colors cursor-pointer`}
                onClick={() => handleSelectDetailOption('PayPal')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">PayPal</h3>
                    <p className="text-sm opacity-70">Fast and secure payments worldwide</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedDetailOption === 'PayPal' ? 'bg-' + config.accentColor : 'bg-white/10'}`}>
                    {selectedDetailOption === 'PayPal' && <Check size={14} className="text-black" />}
                  </div>
                </div>
              </div>
              
              <div 
                className={`wallet-option p-4 rounded-lg ${selectedDetailOption === 'Venmo' ? 'bg-white/10 border-2 border-' + config.accentColor + '60' : 'bg-white/5 border border-white/10'} hover:bg-white/10 transition-colors cursor-pointer`}
                onClick={() => handleSelectDetailOption('Venmo')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Venmo</h3>
                    <p className="text-sm opacity-70">Quick transfers between users</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedDetailOption === 'Venmo' ? 'bg-' + config.accentColor : 'bg-white/10'}`}>
                    {selectedDetailOption === 'Venmo' && <Check size={14} className="text-black" />}
                  </div>
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
                  value={formData.cardNumber || ''}
                  onChange={(e) => handleFormChange('cardNumber', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block text-sm font-medium mb-1">Expiry Date</label>
                  <input 
                    type="text" 
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none"
                    placeholder="MM/YY"
                    value={formData.expiryDate || ''}
                    onChange={(e) => handleFormChange('expiryDate', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium mb-1">CVV</label>
                  <input 
                    type="text" 
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/30 focus:outline-none"
                    placeholder="XXX"
                    value={formData.cvv || ''}
                    onChange={(e) => handleFormChange('cvv', e.target.value)}
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
              <div 
                className={`card-option p-4 rounded-lg ${selectedDetailOption === 'Visa Prepaid' ? 'bg-white/10 border-2 border-' + config.accentColor + '60' : 'bg-white/5 border border-white/10'} hover:bg-white/10 transition-colors cursor-pointer`}
                onClick={() => handleSelectDetailOption('Visa Prepaid')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Visa Prepaid</h3>
                    <p className="text-sm opacity-70">Use prepaid cards for flexible spending</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedDetailOption === 'Visa Prepaid' ? 'bg-' + config.accentColor : 'bg-white/10'}`}>
                    {selectedDetailOption === 'Visa Prepaid' && <Check size={14} className="text-black" />}
                  </div>
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
              <div 
                className={`gift-option p-4 rounded-lg ${selectedDetailOption === 'Amazon' ? 'bg-white/10 border-2 border-' + config.accentColor + '60' : 'bg-white/5 border border-white/10'} hover:bg-white/10 transition-colors cursor-pointer`}
                onClick={() => handleSelectDetailOption('Amazon')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Amazon</h3>
                    <p className="text-sm opacity-70">Receive payments as Amazon gift cards</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedDetailOption === 'Amazon' ? 'bg-' + config.accentColor : 'bg-white/10'}`}>
                    {selectedDetailOption === 'Amazon' && <Check size={14} className="text-black" />}
                  </div>
                </div>
              </div>
              
              <div 
                className={`gift-option p-4 rounded-lg ${selectedDetailOption === 'Walmart' ? 'bg-white/10 border-2 border-' + config.accentColor + '60' : 'bg-white/5 border border-white/10'} hover:bg-white/10 transition-colors cursor-pointer`}
                onClick={() => handleSelectDetailOption('Walmart')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Walmart</h3>
                    <p className="text-sm opacity-70">Receive payments as Walmart gift cards</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedDetailOption === 'Walmart' ? 'bg-' + config.accentColor : 'bg-white/10'}`}>
                    {selectedDetailOption === 'Walmart' && <Check size={14} className="text-black" />}
                  </div>
                </div>
              </div>
              
              <div 
                className={`gift-option p-4 rounded-lg ${selectedDetailOption === 'Target' ? 'bg-white/10 border-2 border-' + config.accentColor + '60' : 'bg-white/5 border border-white/10'} hover:bg-white/10 transition-colors cursor-pointer`}
                onClick={() => handleSelectDetailOption('Target')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Target</h3>
                    <p className="text-sm opacity-70">Receive payments as Target gift cards</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedDetailOption === 'Target' ? 'bg-' + config.accentColor : 'bg-white/10'}`}>
                    {selectedDetailOption === 'Target' && <Check size={14} className="text-black" />}
                  </div>
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
  
  const renderDashboard = () => {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Payouts Dashboard</h2>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm opacity-70 hover:opacity-100 transition-all hover:text-red-400"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
          <p className="text-sm opacity-70 mt-1">
            Manage your payouts and payment methods
          </p>
        </div>
        
        <div className="current-method-card p-4 rounded-lg bg-white/5 border border-white/10 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm opacity-70">Current Payout Method</h3>
              <p className="font-medium text-base mt-1">{selectedMethod}{selectedDetailOption ? ` (${selectedDetailOption})` : ''}</p>
            </div>
            <button 
              onClick={handleChangePayoutMethod}
              className="flex items-center gap-1 text-sm bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-md"
            >
              <RefreshCw size={14} />
              <span>Change</span>
            </button>
          </div>
        </div>
        
        <div className="dashboard-tabs mb-6">
          <Tabs defaultValue="payouts" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-4 bg-white/5 border-b border-white/10 rounded-none p-0">
              <TabsTrigger 
                value="payouts" 
                className={cn(
                  "data-[state=active]:bg-transparent data-[state=active]:border-b-2",
                  "data-[state=active]:border-b-[" + config.accentColor + "]",
                  "data-[state=active]:shadow-none rounded-none py-3"
                )}
              >
                <div className="flex items-center gap-2">
                  <DollarSign size={16} />
                  <span>Payouts</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="pending" 
                className={cn(
                  "data-[state=active]:bg-transparent data-[state=active]:border-b-2",
                  "data-[state=active]:border-b-[" + config.accentColor + "]",
                  "data-[state=active]:shadow-none rounded-none py-3"
                )}
              >
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>Pending</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="invoices" 
                className={cn(
                  "data-[state=active]:bg-transparent data-[state=active]:border-b-2",
                  "data-[state=active]:border-b-[" + config.accentColor + "]",
                  "data-[state=active]:shadow-none rounded-none py-3"
                )}
              >
                <div className="flex items-center gap-2">
                  <FileText size={16} />
                  <span>Invoices</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="payouts" className="mt-0">
              <div className="payouts-list space-y-3">
                {payouts.filter(p => p.status === 'Completed').map(payout => (
                  <div key={payout.id} className="payout-item p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{payout.amount}</p>
                        <p className="text-sm opacity-70">{payout.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar size={14} className="opacity-60" />
                          <span className="text-xs opacity-70">{payout.date}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`text-sm font-medium ${getStatusColor(payout.status)}`}>
                          {payout.status}
                        </span>
                        <div className="flex items-center gap-1 mt-1">
                          <CreditCard size={14} className="opacity-60" />
                          <span className="text-xs opacity-70">{payout.method}</span>
                        </div>
                        <div className="text-xs opacity-70 mt-1">
                          Invoice: {payout.invoice}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="mt-0">
              <div className="pending-list space-y-3">
                {payouts.filter(p => p.status !== 'Completed').map(payout => (
                  <div key={payout.id} className="payout-item p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{payout.amount}</p>
                        <p className="text-sm opacity-70">{payout.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar size={14} className="opacity-60" />
                          <span className="text-xs opacity-70">{payout.date}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`text-sm font-medium ${getStatusColor(payout.status)}`}>
                          {payout.status}
                        </span>
                        <div className="flex items-center gap-1 mt-1">
                          <CreditCard size={14} className="opacity-60" />
                          <span className="text-xs opacity-70">{payout.method}</span>
                        </div>
                        <div className="text-xs opacity-70 mt-1">
                          Invoice: {payout.invoice}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="invoices" className="mt-0">
              <div className="invoices-list space-y-3">
                {payouts.map(payout => (
                  <div key={payout.id} className="invoice-item p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{payout.invoice}</p>
                        <p className="text-sm opacity-70">{payout.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar size={14} className="opacity-60" />
                          <span className="text-xs opacity-70">{payout.date}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-medium">{payout.amount}</span>
                        <span className={`text-sm ${getStatusColor(payout.status)}`}>
                          {payout.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  };
  
  const renderLoginScreen = () => {
    return (
      <div className="login-container text-center">
        <h2 className="text-xl font-semibold mb-6">Welcome to Payouts</h2>
        <p className="text-sm opacity-70 mb-8">Login or create a new account to manage your payouts</p>
        
        <div className="flex flex-col gap-4">
          <button
            onClick={handleLogin}
            className="py-3 px-4 rounded-lg font-medium bg-white/10 hover:bg-white/20 transition-colors"
          >
            Login (Simulation)
          </button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-payouts-dark px-2 text-white/60">or</span>
            </div>
          </div>
          
          <button
            onClick={handleStartOnboarding}
            className="py-3 px-4 rounded-lg font-medium"
            style={{
              backgroundColor: config.accentColor,
              color: config.primaryColor,
            }}
          >
            Create Account
          </button>
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
    '--button-radius': config.buttonStyle === 'rounded' ? '6px' : 
                       config.buttonStyle === 'pill' ? '9999px' : '0px',
  } as React.CSSProperties;
  
  if (onboardingCompleted) {
    return (
      <div 
        className="widget-container p-6 rounded-xl max-w-md w-full mx-auto shadow-lg"
        style={widgetStyle}
      >
        {renderDashboard()}
      </div>
    );
  }
  
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
          <p className="mb-4">Your payout has been processed via {selectedMethod}{selectedDetailOption ? ` (${selectedDetailOption})` : ''}.</p>
          <p className="text-sm opacity-70">You will receive a confirmation email shortly.</p>
          
          <button
            onClick={() => setOnboardingCompleted(true)}
            className="mt-6 py-3 px-6 rounded-lg font-medium"
            style={{
              backgroundColor: config.accentColor,
              color: config.primaryColor,
              borderRadius: `var(--button-radius)`,
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  if (!isLoggedIn) {
    return (
      <div 
        className="widget-container p-6 rounded-xl max-w-md w-full mx-auto shadow-lg"
        style={widgetStyle}
      >
        {renderLoginScreen()}
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
