
import React from 'react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import ProfileInfo from './ProfileInfo';
import BankVerification from './BankVerification';
import TaxForm from './TaxForm';
import MethodSelection from './PayoutSteps/MethodSelection';
import MethodDetails from './PayoutSteps/MethodDetails';

const StepContent: React.FC = () => {
  const { currentStep, steps, handleNextStep, handleBackStep } = usePayoutWidget();
  
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
        return (
          <BankVerification 
            onNext={handleNextStep} 
            onBack={handleBackStep}
            isLastStep={isLastStep} 
          />
        );
      case 'tax':
        return (
          <TaxForm 
            onNext={handleNextStep} 
            onBack={handleBackStep}
            isLastStep={isLastStep} 
          />
        );
      case 'payout':
        return <MethodSelection />;
      case 'details':
        return <MethodDetails />;
      default:
        return null;
    }
  };
  
  return (
    <div className="step-content">
      {getStepContent()}
    </div>
  );
};

export default StepContent;
