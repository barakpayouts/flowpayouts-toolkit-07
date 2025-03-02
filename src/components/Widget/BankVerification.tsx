
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { BankVerificationMethod, useWidgetConfig } from '@/hooks/use-widget-config';
import { Check, Lock, Building, FileText, AlertCircle, ChevronLeft, Wallet2, BarChart, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

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
  const { config } = useWidgetConfig();
  const [verificationMethod, setVerificationMethod] = useState<BankVerificationMethod>('plaid');
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [animating, setAnimating] = useState(false);
  
  const banks = [
    { id: 'chase', name: 'Chase', logo: 'https://logo.clearbit.com/chase.com' },
    { id: 'boa', name: 'Bank of America', logo: 'https://logo.clearbit.com/bankofamerica.com' },
    { id: 'wells', name: 'Wells Fargo', logo: 'https://logo.clearbit.com/wellsfargo.com' },
    { id: 'citi', name: 'Citibank', logo: 'https://logo.clearbit.com/citibank.com' },
    { id: 'usbank', name: 'US Bank', logo: 'https://logo.clearbit.com/usbank.com' },
    { id: 'capital', name: 'Capital One', logo: 'https://logo.clearbit.com/capitalone.com' },
  ];
  
  const methods = [
    { id: 'plaid', label: 'Instant Verification', description: 'Connect your bank securely using Plaid', icon: Wallet2 },
    { id: 'statement', label: 'Upload Statement', description: 'Upload a recent bank statement', icon: FileText },
    { id: 'microdeposit', label: 'Micro-Deposits', description: 'Verify with small test deposits', icon: BarChart },
  ];
  
  const handleMethodChange = (method: BankVerificationMethod) => {
    setAnimating(true);
    setTimeout(() => {
      setVerificationMethod(method);
      setSelectedBank(null);
      setVerificationComplete(false);
      setAnimating(false);
    }, 300);
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
  
  const renderMethodTabs = () => {
    return (
      <div className="grid grid-cols-3 gap-2 mb-8">
        {methods.map((method) => {
          const Icon = method.icon;
          const isActive = verificationMethod === method.id;
          
          return (
            <motion.button
              key={method.id}
              onClick={() => handleMethodChange(method.id as BankVerificationMethod)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex flex-col items-center text-center p-4 rounded-xl transition-all",
                isActive 
                  ? "bg-white/10 shadow-lg border border-white/20" 
                  : "bg-white/5 hover:bg-white/8 border border-transparent"
              )}
              style={{
                borderColor: isActive ? `${config.accentColor}50` : 'transparent',
                boxShadow: isActive ? `0 4px 20px -5px ${config.accentColor}40` : 'none',
              }}
            >
              <div 
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                  isActive ? "bg-gradient-to-br from-white/10 to-white/5" : "bg-white/5"
                )}
                style={{
                  boxShadow: isActive ? `0 0 15px ${config.accentColor}30` : 'none',
                  border: isActive ? `1px solid ${config.accentColor}40` : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <Icon
                  size={24}
                  className={cn(
                    "transition-all",
                    isActive ? "text-white" : "text-white/60"
                  )}
                  style={{
                    color: isActive ? config.accentColor : undefined,
                    filter: isActive ? `drop-shadow(0 0 5px ${config.accentColor}70)` : 'none',
                  }}
                />
              </div>
              <div className="space-y-1">
                <h3 className={cn(
                  "font-medium text-sm",
                  isActive ? "text-white" : "text-white/80"
                )}>
                  {method.label}
                </h3>
                <p className="text-xs text-white/60 line-clamp-2">
                  {method.description}
                </p>
              </div>
              {isActive && (
                <motion.div 
                  className="h-1 w-12 mt-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '50%' }}
                  style={{ 
                    background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}50)`,
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    );
  };
  
  const renderPlaidMethod = () => {
    if (verificationComplete) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8 space-y-6"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", delay: 0.1 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/30 mx-auto flex items-center justify-center"
            style={{
              boxShadow: `0 0 30px ${config.accentColor}40`,
              border: `1px solid ${config.accentColor}50`,
            }}
          >
            <Check className="h-10 w-10" style={{ color: config.accentColor }} strokeWidth={2.5} />
          </motion.div>
          
          <div className="space-y-2">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-semibold text-xl"
            >
              Verification Complete
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/70"
            >
              Your bank account has been successfully verified
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10"
          >
            <p className="text-sm text-white/80 flex items-center justify-center gap-2">
              <Lock size={14} className="text-white/60" />
              Your banking information is secured with end-to-end encryption
            </p>
          </motion.div>
        </motion.div>
      );
    }
    
    if (selectedBank) {
      const bank = banks.find(bank => bank.id === selectedBank);
      
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          <button 
            onClick={() => setSelectedBank(null)}
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white mb-4"
          >
            <ChevronLeft size={16} />
            Back to bank selection
          </button>
          
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="w-14 h-14 rounded-lg flex items-center justify-center bg-white overflow-hidden border-2"
              style={{ borderColor: `${config.accentColor}40` }}
            >
              <img 
                src={bank?.logo} 
                alt={bank?.name}
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${bank?.name}&background=0D8ABC&color=fff`;
                }}
              />
            </div>
            <div>
              <h4 className="text-lg font-medium">{bank?.name}</h4>
              <p className="text-sm text-white/70">Securely connect your account</p>
            </div>
          </div>
          
          <form onSubmit={handleVerify} className="space-y-5">
            <div className="space-y-4 bg-white/5 backdrop-blur-md p-5 rounded-xl border border-white/10">
              <div className="space-y-2">
                <label className="text-sm text-white/80 block">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    className="w-full p-3 pl-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-offset-1 focus:ring-offset-transparent focus:outline-none transition-all"
                    style={{ 
                      borderRadius: `${config.borderRadius}px`,
                      focusRing: config.accentColor 
                    }}
                  />
                  <Building className="absolute left-3 top-3.5 h-5 w-5 text-white/40" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-white/80 block">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full p-3 pl-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-offset-1 focus:ring-offset-transparent focus:outline-none transition-all"
                    style={{ 
                      borderRadius: `${config.borderRadius}px`,
                      focusRing: config.accentColor 
                    }}
                  />
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-white/40" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md p-3 rounded-lg border border-white/10">
              <div className="shrink-0">
                <Lock 
                  size={18} 
                  className="text-white/70"
                  style={{ color: config.accentColor }} 
                />
              </div>
              <p className="text-xs text-white/80">
                Your credentials are encrypted and never stored. This connection is powered by Plaid.
              </p>
            </div>
            
            <Button
              type="submit"
              variant="glow"
              size="wide"
              disabled={!credentials.username || !credentials.password}
              className="w-full"
              style={{
                background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}DD)`,
                color: config.primaryColor,
                boxShadow: `0 4px 15px ${config.accentColor}40`,
              }}
            >
              Connect Account
            </Button>
          </form>
        </motion.div>
      );
    }
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        <h4 className="text-center font-medium text-lg mb-4">Select your bank</h4>
        
        <div className="grid grid-cols-2 gap-3">
          {banks.map(bank => (
            <motion.button
              key={bank.id}
              onClick={() => handleBankSelect(bank.id)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all flex flex-col items-center gap-3"
              style={{ 
                borderRadius: `${config.borderRadius}px`,
              }}
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white overflow-hidden">
                <img 
                  src={bank.logo} 
                  alt={bank.name}
                  className="h-8 w-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${bank.name}&background=0D8ABC&color=fff`;
                  }}
                />
              </div>
              <span className="font-medium">{bank.name}</span>
            </motion.button>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-sm text-white/60 hover:text-white/80 underline">
            Don't see your bank?
          </button>
        </div>
        
        <div className="flex items-center justify-center mt-2 gap-2 text-xs text-white/60 bg-white/5 p-3 rounded-lg">
          <Lock className="h-3 w-3" />
          <p>Secure connection powered by Plaid. Your credentials are never stored.</p>
        </div>
      </motion.div>
    );
  };
  
  const renderStatementMethod = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        <h4 className="text-center font-medium text-lg mb-2">Upload Bank Statement</h4>
        <p className="text-center text-sm text-white/70 mb-4">Upload a recent bank statement for verification</p>
        
        <motion.div 
          whileHover={{ scale: 1.02, boxShadow: `0 10px 25px -5px ${config.accentColor}20` }}
          className="border-2 border-dashed border-white/20 rounded-xl p-10 text-center bg-white/5 backdrop-blur-sm hover:bg-white/8 transition-all cursor-pointer"
          style={{ borderRadius: `${config.borderRadius}px` }}
        >
          <div className="mb-4">
            <motion.div 
              whileHover={{ rotate: [0, -5, 5, -5, 0] }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-white/5 mx-auto flex items-center justify-center"
              style={{
                border: `1px solid ${config.accentColor}30`,
              }}
            >
              <FileText 
                className="h-8 w-8" 
                style={{ color: config.accentColor }}
              />
            </motion.div>
          </div>
          <p className="text-white/70 mb-3">Drag & drop your statement here or</p>
          <Button 
            variant="glass"
            size="default"
            className="mx-auto"
          >
            Browse Files
          </Button>
          <p className="mt-4 text-xs text-white/50">
            Supported formats: PDF, PNG, JPG (Max 10MB)
          </p>
          
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-2">
            <div className="flex items-start gap-3 text-left p-3 bg-white/5 backdrop-blur-sm rounded-lg">
              <div className="shrink-0 mt-0.5">
                <AlertCircle size={16} className="text-white/70" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Requirements</h4>
                <ul className="mt-1 text-xs text-white/70 space-y-1">
                  <li>• Statement must be less than 90 days old</li>
                  <li>• Must show your full name and account details</li>
                  <li>• Must be from a recognized financial institution</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };
  
  const renderMicroDepositMethod = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        <h4 className="text-center font-medium text-lg">Micro-Deposit Verification</h4>
        <p className="text-center text-sm text-white/70 mb-4">We'll send two small deposits to your account for verification</p>
        
        <div className="space-y-5 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <div className="relative">
            <label className="text-sm text-white/80 block mb-1">Account Holder Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-offset-1 focus:ring-offset-transparent focus:outline-none transition-all"
              style={{ 
                borderRadius: `${config.borderRadius}px`,
                focusRing: config.accentColor 
              }}
            />
          </div>
          
          <div className="relative">
            <label className="text-sm text-white/80 block mb-1">Bank Routing Number</label>
            <div className="relative">
              <input
                type="text"
                placeholder="9-digit Routing Number"
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-offset-1 focus:ring-offset-transparent focus:outline-none transition-all"
                style={{ 
                  borderRadius: `${config.borderRadius}px`,
                  focusRing: config.accentColor 
                }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 bg-white/10 px-2 py-1 rounded-md">
                9 digits
              </div>
            </div>
          </div>
          
          <div className="relative">
            <label className="text-sm text-white/80 block mb-1">Account Number</label>
            <input
              type="text"
              placeholder="Account Number"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-offset-1 focus:ring-offset-transparent focus:outline-none transition-all"
              style={{ 
                borderRadius: `${config.borderRadius}px`,
                focusRing: config.accentColor 
              }}
            />
          </div>
          
          <div className="flex items-center gap-3 bg-white/10 p-4 rounded-lg text-sm">
            <AlertCircle size={20} style={{ color: config.accentColor }} />
            <p className="text-white/80 text-sm">
              You'll receive two small deposits in 1-3 business days. Return here to verify these amounts.
            </p>
          </div>
          
          <Button
            variant="glow"
            size="default"
            className="w-full"
            style={{
              background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}DD)`,
              color: config.primaryColor,
              boxShadow: `0 4px 15px ${config.accentColor}40`,
            }}
          >
            Send Micro-Deposits
          </Button>
        </div>
      </motion.div>
    );
  };
  
  return (
    <div className="py-5">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">Bank Account Verification</h2>
        <p className="text-white/70">Choose a method to verify your bank account</p>
      </div>
      
      {renderMethodTabs()}
      
      <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 min-h-[400px]">
        <AnimatePresence mode="wait">
          {!animating && (
            <>
              {verificationMethod === 'plaid' && renderPlaidMethod()}
              {verificationMethod === 'statement' && renderStatementMethod()}
              {verificationMethod === 'microdeposit' && renderMicroDepositMethod()}
            </>
          )}
        </AnimatePresence>
      </div>
      
      <div className="mt-6 bg-white/5 backdrop-blur-md p-5 rounded-xl border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <input
              id="authorize"
              type="checkbox"
              checked={isAuthorized}
              onChange={() => setIsAuthorized(!isAuthorized)}
              className="w-4 h-4 opacity-0 absolute"
            />
            <div 
              className={cn(
                "w-5 h-5 rounded border flex items-center justify-center transition-all",
                isAuthorized 
                  ? "bg-gradient-to-r border-0" 
                  : "bg-white/5 border-white/20"
              )}
              style={{
                background: isAuthorized 
                  ? `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}DD)` 
                  : undefined,
              }}
            >
              {isAuthorized && <Check size={12} className="text-payouts-dark" />}
            </div>
          </div>
          <label 
            htmlFor="authorize"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            I authorize the verification of my bank account
          </label>
        </div>
        
        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-lg mb-5">
          <Lock 
            size={18} 
            style={{ color: config.accentColor }} 
          />
          <p className="text-xs text-white/80">
            Your information is protected with bank-level encryption and will be used solely for verification purposes
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={onBack}
            variant="glass"
            size="default"
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={handleContinue}
            variant="glow"
            size="default"
            disabled={!verificationComplete && verificationMethod === 'plaid'}
            className="flex-1"
            style={{
              background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}DD)`,
              color: config.primaryColor,
              boxShadow: `0 4px 15px ${config.accentColor}40`,
            }}
          >
            {isLastStep ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BankVerification;
