
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { BankVerificationMethod } from '@/hooks/use-widget-config';
import { Check, Lock, Building, FileText, AlertCircle } from 'lucide-react';

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
    { id: 'chase', name: 'Chase', logo: '🏦' },
    { id: 'boa', name: 'Bank of America', logo: '🏦' },
    { id: 'wells', name: 'Wells Fargo', logo: '🏦' },
    { id: 'citi', name: 'Citibank', logo: '🏦' },
    { id: 'usbank', name: 'US Bank', logo: '🏦' },
    { id: 'capital', name: 'Capital One', logo: '🏦' },
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
            <Check className="h-8 w-8 text-payouts-accent" strokeWidth={3} />
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
          
          <div className="relative">
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              placeholder="Username"
              className="w-full p-3 pl-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
            />
            <Building className="absolute left-3 top-3.5 h-4 w-4 text-white/40" />
          </div>
          
          <div className="relative">
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full p-3 pl-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
            />
            <Lock className="absolute left-3 top-3.5 h-4 w-4 text-white/40" />
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
          
          <div className="flex items-center justify-center mt-4 gap-2 text-xs text-white/60">
            <Lock className="h-3 w-3" />
            <p>Secure connection powered by Plaid. Your credentials are never stored.</p>
          </div>
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
              className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all text-center flex flex-col items-center gap-2"
            >
              <span className="text-2xl">{bank.logo}</span>
              <span>{bank.name}</span>
            </button>
          ))}
        </div>
        
        <div className="flex items-center justify-center mt-6 gap-2 text-xs text-white/60">
          <Lock className="h-3 w-3" />
          <p>Secure connection powered by Plaid. Your credentials are never stored.</p>
        </div>
      </div>
    );
  };
  
  const renderStatementMethod = () => {
    return (
      <div className="space-y-4 animate-fade-in">
        <h4 className="text-center font-medium">Upload Bank Statement</h4>
        <p className="text-center text-sm text-white/70">Upload a recent bank statement for verification</p>
        
        <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer">
          <div className="mb-4">
            <div className="w-16 h-16 rounded-full bg-white/10 mx-auto flex items-center justify-center">
              <FileText className="h-8 w-8 text-white/70" />
            </div>
          </div>
          <p className="text-sm text-white/70">Drag & drop files here or</p>
          <button className="mt-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all text-sm font-medium">
            Browse Files
          </button>
          <p className="mt-3 text-xs text-white/50">Supported formats: PDF, PNG, JPG (Max 10MB)</p>
        </div>
      </div>
    );
  };
  
  const renderMicroDepositMethod = () => {
    return (
      <div className="space-y-4 animate-fade-in">
        <h4 className="text-center font-medium">Micro-Deposit Verification</h4>
        <p className="text-center text-sm text-white/70">We'll send two small deposits to your account for verification</p>
        
        <div className="space-y-4 bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
          <div className="relative">
            <label className="text-sm text-white/80 block mb-1">Account Holder Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
            />
          </div>
          
          <div className="relative">
            <label className="text-sm text-white/80 block mb-1">Bank Routing Number</label>
            <input
              type="text"
              placeholder="9-digit Routing Number"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
            />
            <div className="absolute right-3 top-9 text-xs text-white/40 bg-white/10 px-2 py-1 rounded">
              9 digits
            </div>
          </div>
          
          <div className="relative">
            <label className="text-sm text-white/80 block mb-1">Account Number</label>
            <input
              type="text"
              placeholder="Account Number"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2 bg-white/10 p-3 rounded-lg text-sm">
            <AlertCircle className="h-4 w-4 text-payouts-accent" />
            <p className="text-white/80">
              You'll receive two small deposits in 1-3 business days. Return here to verify these amounts.
            </p>
          </div>
          
          <button className="btn-primary w-full py-3 flex items-center justify-center gap-2">
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
          Plaid Connect
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
          Statement Upload
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
          Micro-Deposits
        </button>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-white/10 transition-all">
        {verificationMethod === 'plaid' && renderPlaidMethod()}
        {verificationMethod === 'statement' && renderStatementMethod()}
        {verificationMethod === 'microdeposit' && renderMicroDepositMethod()}
      </div>
      
      <div className="mt-6 bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
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
        
        <div className="flex items-center gap-2 bg-white/10 p-3 rounded-lg mb-4">
          <Lock className="h-4 w-4 text-payouts-accent" />
          <p className="text-xs text-white/80">
            Your information is protected with bank-level encryption and will be used solely for verification purposes
          </p>
        </div>
        
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
