
import React, { useState } from 'react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { motion } from 'framer-motion';
import { Check, Lock, Building, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlaidVerificationProps {
  onVerificationComplete: () => void;
}

const PlaidVerification: React.FC<PlaidVerificationProps> = ({
  onVerificationComplete,
}) => {
  const { config } = useWidgetConfig();
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [verificationComplete, setVerificationComplete] = useState(false);
  
  const banks = [
    { id: 'chase', name: 'Chase', logo: 'https://logo.clearbit.com/chase.com' },
    { id: 'boa', name: 'Bank of America', logo: 'https://logo.clearbit.com/bankofamerica.com' },
    { id: 'wells', name: 'Wells Fargo', logo: 'https://logo.clearbit.com/wellsfargo.com' },
    { id: 'citi', name: 'Citibank', logo: 'https://logo.clearbit.com/citibank.com' },
    { id: 'usbank', name: 'US Bank', logo: 'https://logo.clearbit.com/usbank.com' },
    { id: 'capital', name: 'Capital One', logo: 'https://logo.clearbit.com/capitalone.com' },
  ];
  
  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
    setCredentials({
      username: '',
      password: '',
    });
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
      onVerificationComplete();
    }, 1000);
  };
  
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
                  className="w-full p-3 pl-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-transparent transition-all"
                  style={{ 
                    borderRadius: `${config.borderRadius}px`,
                    boxShadow: `0 0 0 0 ${config.accentColor}`,
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
                  className="w-full p-3 pl-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-transparent transition-all"
                  style={{ 
                    borderRadius: `${config.borderRadius}px`,
                    boxShadow: `0 0 0 0 ${config.accentColor}`,
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

export default PlaidVerification;
