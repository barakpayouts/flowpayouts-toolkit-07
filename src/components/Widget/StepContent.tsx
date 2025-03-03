
import React from 'react';
import ProfileInfo from './ProfileInfo';
import BankVerification from './BankVerification';
import TaxForm from './TaxForm';
import KYCVerification from './KYCVerification';
import { VerificationStep } from '@/hooks/use-widget-config';

interface StepContentProps {
  currentStep: number;
  steps: VerificationStep[];
  onNext: () => void;
  onBack: () => void;
}

const StepContent: React.FC<StepContentProps> = ({ 
  currentStep, 
  steps, 
  onNext, 
  onBack 
}) => {
  const currentStepType = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  
  switch (currentStepType) {
    case 'profile':
      return <ProfileInfo onNext={onNext} onBack={onBack} isLastStep={isLastStep} />;
    case 'bank':
      return <BankVerification onNext={onNext} onBack={onBack} isLastStep={isLastStep} />;
    case 'tax':
      return <TaxForm onNext={onNext} onBack={onBack} isLastStep={isLastStep} />;
    case 'kyc':
      return <KYCVerification onNext={onNext} onBack={onBack} isLastStep={isLastStep} />;
    default:
      return <div>Step content not found</div>;
  }
};

export default StepContent;
