
import React, { useState } from 'react';
import { ArrowLeft, Check, Mail } from 'lucide-react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';

type CardOption = 'Visa Prepaid' | 'Mastercard Prepaid';

const PrepaidCardDetails: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { config } = useWidgetConfig();
  const { handleSelectDetailOption, handleNextStep } = usePayoutWidget();
  const [selectedOption, setSelectedOption] = useState<CardOption | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleSelectOption = (option: CardOption) => {
    setSelectedOption(option);
    handleSelectDetailOption(option);
  };
  
  const handleContinue = () => {
    if (!selectedOption) {
      toast.error("Please select a card type", {
        description: "You need to select a card type to continue"
      });
      return;
    }
    
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setEmailError('');
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Prepaid card details saved", {
        description: `Your ${selectedOption} details will be sent to ${email}`
      });
      
      // Trigger the next step in the flow to show the dashboard
      handleNextStep();
    }, 1000);
  };
  
  return (
    <div className="payout-details-form space-y-6">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={16} />
          Back to methods
        </button>
        <h2 className="text-xl font-semibold">Prepaid Card</h2>
      </div>
      
      {/* Balance Info Card */}
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
      
      <div className="space-y-4">
        <h3 className="text-md font-medium">Select Card Provider:</h3>
        
        <div 
          className={`card-option p-4 rounded-lg ${selectedOption === 'Visa Prepaid' ? 'bg-white/10 border-2 border-' + config.accentColor + '60' : 'bg-white/5 border border-white/10'} hover:bg-white/10 transition-colors cursor-pointer`}
          onClick={() => handleSelectOption('Visa Prepaid')}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Visa Prepaid</h3>
              <p className="text-sm opacity-70">Use Visa prepaid cards for flexible spending</p>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedOption === 'Visa Prepaid' ? 'bg-' + config.accentColor : 'bg-white/10'}`}>
              {selectedOption === 'Visa Prepaid' && <Check size={14} className="text-black" />}
            </div>
          </div>
        </div>
        
        <div 
          className={`card-option p-4 rounded-lg ${selectedOption === 'Mastercard Prepaid' ? 'bg-white/10 border-2 border-' + config.accentColor + '60' : 'bg-white/5 border border-white/10'} hover:bg-white/10 transition-colors cursor-pointer`}
          onClick={() => handleSelectOption('Mastercard Prepaid')}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Mastercard Prepaid</h3>
              <p className="text-sm opacity-70">Use Mastercard prepaid cards for flexible spending</p>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedOption === 'Mastercard Prepaid' ? 'bg-' + config.accentColor : 'bg-white/10'}`}>
              {selectedOption === 'Mastercard Prepaid' && <Check size={14} className="text-black" />}
            </div>
          </div>
        </div>
        
        <div className="space-y-2 mt-4">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-white/60" />
            <label htmlFor="card-email" className="text-sm">Email for card details:</label>
          </div>
          <Input 
            id="card-email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError('');
            }}
            className={`bg-white/10 border-white/20 text-white ${emailError ? 'border-red-500' : ''}`}
          />
          {emailError && (
            <p className="text-xs text-red-400">{emailError}</p>
          )}
          <p className="text-xs opacity-70">
            Card details and activation instructions will be sent to this email
          </p>
        </div>
      </div>
      
      <Button 
        onClick={handleContinue}
        className="w-full mt-4"
        disabled={isProcessing}
        style={{
          backgroundColor: config.accentColor,
          color: config.backgroundColor
        }}
      >
        {isProcessing ? "Processing..." : "Continue"}
      </Button>
      
      <p className="text-xs opacity-70 mt-6 text-center">
        Your information is securely transmitted and protected. Need help? Contact our support team.
      </p>
    </div>
  );
};

export default PrepaidCardDetails;
