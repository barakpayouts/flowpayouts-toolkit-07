
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { BankVerificationMethod } from '@/hooks/use-widget-config';

interface BankVerificationProps {
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
}

const BankVerification: React.FC<BankVerificationProps> = ({ 
  onNext,
  onBack,
  isLastStep
}) => {
  const [verificationMethod, setVerificationMethod] = useState<BankVerificationMethod>('plaid');
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  const banks = [
    { id: 'chase', name: 'Chase' },
    { id: 'boa', name: 'Bank of America' },
    { id: 'wells', name: 'Wells Fargo' },
    { id: 'citi', name: 'Citibank' },
    { id: 'usbank', name: 'US Bank' },
    { id: 'capital', name: 'Capital One' },
  ];
  
  const handleMethodChange = (method: BankVerificationMethod) => {
    setVerificationMethod(method);
    setSelectedBank(null);
    setVerificationComplete(false);
  };
  
  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
    setCredentials({
      username: '',
      password: '',
    });
    setVerificationComplete(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate verification process
    setTimeout(() => {
      setVerificationComplete(true);
    }, 1000);
  };
  
  const handleContinue = () => {
    if (isLastStep) {
      // Handle final submission
      onNext();
    } else {
      // Proceed to next step
      onNext();
    }
  };
  
  const renderPlaidMethod = () => {
    if (verificationComplete) {
      return (
        <div className="text-center py-6 space-y-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-payouts-accent/20 mx-auto flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-payouts-accent">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3 className="font-semibold text-lg">Verification Complete</h3>
          <p className="text-sm text-white/70">Your bank account has been successfully verified</p>
        </div>
      );
    }
    
    if (selectedBank) {
      const bankName = banks.find(bank => bank.id === selectedBank)?.name || '';
      
      return (
        <form onSubmit={handleVerify} className="space-y-4 animate-fade-in">
          <h4 className="text-center font-medium">Connect to {bankName}</h4>
          <p className="text-center text-sm text-white/70">Enter your {bankName} online banking credentials</p>
          
          <div>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              placeholder="Username"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
            />
          </div>
          
          <div>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
            />
          </div>
          
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setSelectedBank(null)}
              className="btn-secondary py-2 flex-1"
            >
              Back
            </button>
            <button
              type="submit"
              className="btn-primary py-2 flex-1"
              disabled={!credentials.username || !credentials.password}
            >
              Connect
            </button>
          </div>
          
          <p className="text-xs text-center text-white/60 mt-4">
            Secure connection powered by Plaid. Your credentials are never stored.
          </p>
        </form>
      );
    }
    
    return (
      <div className="animate-fade-in">
        <h4 className="text-center font-medium mb-4">Select your institution</h4>
        <p className="text-center text-sm text-white/70 mb-4">Connect your bank account securely using Plaid</p>
        
        <div className="grid grid-cols-2 gap-3">
          {banks.map(bank => (
            <button
              key={bank.id}
              onClick={() => handleBankSelect(bank.id)}
              className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-center"
            >
              {bank.name}
            </button>
          ))}
        </div>
        
        <p className="text-xs text-center text-white/60 mt-6">
          Secure connection powered by Plaid. Your credentials are never stored.
        </p>
      </div>
    );
  };
  
  const renderStatementMethod = () => {
    return (
      <div className="space-y-4 animate-fade-in">
        <h4 className="text-center font-medium">Upload Bank Statement</h4>
        <p className="text-center text-sm text-white/70">Upload a recent bank statement for verification</p>
        
        <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-white/50">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
          <p className="text-sm text-white/70">Drag & drop files here or</p>
          <button className="mt-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all text-sm">
            Browse Files
          </button>
          <p className="mt-2 text-xs text-white/50">Supported formats: PDF, PNG, JPG (Max 10MB)</p>
        </div>
      </div>
    );
  };
  
  const renderMicroDepositMethod = () => {
    return (
      <div className="space-y-4 animate-fade-in">
        <h4 className="text-center font-medium">Micro-Deposit Verification</h4>
        <p className="text-center text-sm text-white/70">We'll send two small deposits to your account for verification</p>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm text-white/80 block mb-1">Account Holder Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="text-sm text-white/80 block mb-1">Bank Routing Number</label>
            <input
              type="text"
              placeholder="9-digit Routing Number"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="text-sm text-white/80 block mb-1">Account Number</label>
            <input
              type="text"
              placeholder="Account Number"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
            />
          </div>
          
          <p className="text-xs text-white/60">
            You'll receive two small deposits in 1-3 business days. Return here to verify these amounts.
          </p>
          
          <button className="btn-primary w-full py-2">
            Send Micro-Deposits
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="py-4">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold">Bank Account Verification</h3>
        <p className="text-sm text-white/80 mt-1">Verify your bank account using one of these methods</p>
      </div>
      
      <div className="flex border-b border-white/10 mb-6">
        <button
          onClick={() => handleMethodChange('plaid')}
          className={cn(
            "flex-1 pb-2 text-sm font-medium text-center transition-all",
            verificationMethod === 'plaid' 
              ? "border-b-2 border-payouts-accent text-white" 
              : "text-white/60 hover:text-white/80"
          )}
        >
          plaid
        </button>
        <button
          onClick={() => handleMethodChange('statement')}
          className={cn(
            "flex-1 pb-2 text-sm font-medium text-center transition-all",
            verificationMethod === 'statement' 
              ? "border-b-2 border-payouts-accent text-white" 
              : "text-white/60 hover:text-white/80"
          )}
        >
          statement
        </button>
        <button
          onClick={() => handleMethodChange('microdeposit')}
          className={cn(
            "flex-1 pb-2 text-sm font-medium text-center transition-all",
            verificationMethod === 'microdeposit' 
              ? "border-b-2 border-payouts-accent text-white" 
              : "text-white/60 hover:text-white/80"
          )}
        >
          micro deposit
        </button>
      </div>
      
      {verificationMethod === 'plaid' && renderPlaidMethod()}
      {verificationMethod === 'statement' && renderStatementMethod()}
      {verificationMethod === 'microdeposit' && renderMicroDepositMethod()}
      
      <div className="mt-6">
        <div className="flex items-center mb-4">
          <input
            id="authorize"
            type="checkbox"
            checked={isAuthorized}
            onChange={() => setIsAuthorized(!isAuthorized)}
            className="w-4 h-4 rounded border-white/20 text-payouts-accent focus:ring-payouts-accent"
          />
          <label htmlFor="authorize" className="ml-2 text-sm text-white/80">
            I authorize the verification of my bank account
          </label>
        </div>
        
        <p className="text-xs text-white/60 mb-4">
          Your information is protected and will be used solely for verification purposes
        </p>
        
        <div className="flex space-x-3">
          <button
            onClick={onBack}
            className="btn-secondary flex-1 py-2"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            className="btn-primary flex-1 py-2"
            disabled={!verificationComplete && verificationMethod === 'plaid'}
          >
            {isLastStep ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankVerification;
