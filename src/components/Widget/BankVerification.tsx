
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BankVerificationMethod, useWidgetConfig } from '@/hooks/use-widget-config';
import VerificationLayout from './VerificationLayout';
import VerificationMethodTabs from './VerificationMethodTabs';
import PlaidVerification from './PlaidVerification';
import StatementVerification from './StatementVerification';
import MicroDepositVerification from './MicroDepositVerification';

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
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [animating, setAnimating] = useState(false);
  
  const handleMethodChange = (method: BankVerificationMethod) => {
    setAnimating(true);
    setTimeout(() => {
      setVerificationMethod(method);
      setVerificationComplete(false);
      setAnimating(false);
    }, 300);
  };
  
  const handleVerificationComplete = () => {
    setVerificationComplete(true);
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
  
  return (
    <VerificationLayout
      title="Bank Account Verification"
      description="Verify your bank account for transfers"
      onBack={onBack}
      onNext={handleContinue}
      isLastStep={isLastStep}
      isAuthorized={isAuthorized}
      setIsAuthorized={setIsAuthorized}
      disableNext={!verificationComplete && verificationMethod === 'plaid'}
    >
      <VerificationMethodTabs
        verificationMethod={verificationMethod}
        onMethodChange={handleMethodChange}
      />
      
      <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 min-h-[400px]">
        <AnimatePresence mode="wait">
          {!animating && (
            <>
              {verificationMethod === 'plaid' && (
                <PlaidVerification onVerificationComplete={handleVerificationComplete} />
              )}
              {verificationMethod === 'statement' && <StatementVerification />}
              {verificationMethod === 'microdeposit' && <MicroDepositVerification />}
            </>
          )}
        </AnimatePresence>
      </div>
    </VerificationLayout>
  );
};

export default BankVerification;
