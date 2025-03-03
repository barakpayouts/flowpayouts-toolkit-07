
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { KYCDocumentType, useWidgetConfig } from '@/hooks/use-widget-config';
import { Button } from '@/components/ui/button';
import VerificationLayout from './VerificationLayout';
import DocumentSelector from './DocumentSelector';
import { Camera, Scan, ScanFace, Check, CheckCheck } from 'lucide-react';

interface KYCVerificationProps {
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
}

const KYCVerification: React.FC<KYCVerificationProps> = ({ 
  onNext,
  onBack,
  isLastStep
}) => {
  const [documentType, setDocumentType] = useState<KYCDocumentType>('passport');
  const [step, setStep] = useState<'select' | 'document' | 'selfie' | 'complete'>('select');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { config } = useWidgetConfig();

  const handleDocumentTypeChange = (type: KYCDocumentType) => {
    setDocumentType(type);
  };
  
  const handleContinue = () => {
    if (step === 'select') {
      setStep('document');
    } else if (step === 'document') {
      setStep('selfie');
    } else if (step === 'selfie') {
      setStep('complete');
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    if (step === 'document') {
      setStep('select');
    } else if (step === 'selfie') {
      setStep('document');
    } else if (step === 'complete') {
      setStep('selfie');
    } else {
      onBack();
    }
  };
  
  return (
    <VerificationLayout
      title={
        step === 'select' ? "Identity Verification" :
        step === 'document' ? `Scan your ${documentType.replace('_', ' ')}` : 
        step === 'selfie' ? "Take a selfie" :
        "Verification Complete"
      }
      description={
        step === 'select' ? "Select your preferred document type for verification" :
        step === 'document' ? "Make sure all information is clearly visible" :
        step === 'selfie' ? "Take a clear photo of your face to verify your identity" :
        "Your identity has been successfully verified"
      }
      onBack={handleBack}
      onNext={handleContinue}
      isLastStep={isLastStep && step === 'complete'}
      isAuthorized={isAuthorized}
      setIsAuthorized={setIsAuthorized}
      buttonText={
        step === 'select' ? "Continue" :
        step === 'document' ? "Continue to Selfie" :
        step === 'selfie' ? "Complete Verification" :
        "Continue"
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {step === 'select' && (
            <div className="space-y-6">
              <p className="text-sm opacity-70">
                Choose the identification document you would like to use for verification:
              </p>
              <DocumentSelector 
                documentType={documentType}
                onDocumentTypeChange={handleDocumentTypeChange}
              />
            </div>
          )}

          {step === 'document' && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 flex flex-col items-center">
                <div className="mb-8 text-center">
                  <p className="text-sm opacity-70 mb-2">
                    Position your {documentType.replace('_', ' ')} within the frame and take a photo
                  </p>
                  
                  <div className="w-full max-w-md h-64 bg-black/20 border-2 border-dashed border-white/30 rounded-lg flex flex-col items-center justify-center mb-6">
                    <Scan 
                      className="mb-4 text-white/50" 
                      size={48}
                      style={{ color: config.accentColor }} 
                    />
                    <p className="text-sm opacity-50">Camera preview will appear here</p>
                  </div>
                  
                  <Button 
                    variant="glass"
                    className="mx-auto flex items-center gap-2 px-6"
                    onClick={() => handleContinue()}
                  >
                    <Camera size={18} />
                    Take Photo
                  </Button>
                </div>
                
                <div className="w-full p-3 bg-white/5 rounded-lg">
                  <h4 className="text-sm font-medium text-white mb-2">Tips for a good scan:</h4>
                  <ul className="text-xs space-y-1 text-white/70">
                    <li className="flex items-center gap-1">
                      <Check size={12} className="text-green-400" />
                      Ensure all text is clearly visible
                    </li>
                    <li className="flex items-center gap-1">
                      <Check size={12} className="text-green-400" />
                      Make sure there's good lighting
                    </li>
                    <li className="flex items-center gap-1">
                      <Check size={12} className="text-green-400" />
                      Avoid glare or reflections
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {step === 'selfie' && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 flex flex-col items-center">
                <div className="mb-8 text-center">
                  <p className="text-sm opacity-70 mb-2">
                    Position your face within the frame and take a selfie
                  </p>
                  
                  <div className="w-full max-w-md h-64 bg-black/20 border-2 border-dashed border-white/30 rounded-lg flex flex-col items-center justify-center mb-6">
                    <ScanFace 
                      className="mb-4 text-white/50" 
                      size={48}
                      style={{ color: config.accentColor }} 
                    />
                    <p className="text-sm opacity-50">Camera preview will appear here</p>
                  </div>
                  
                  <Button 
                    variant="glass"
                    className="mx-auto flex items-center gap-2 px-6"
                    onClick={() => handleContinue()}
                  >
                    <Camera size={18} />
                    Take Selfie
                  </Button>
                </div>
                
                <div className="w-full p-3 bg-white/5 rounded-lg">
                  <h4 className="text-sm font-medium text-white mb-2">Tips for a good selfie:</h4>
                  <ul className="text-xs space-y-1 text-white/70">
                    <li className="flex items-center gap-1">
                      <Check size={12} className="text-green-400" />
                      Look directly at the camera
                    </li>
                    <li className="flex items-center gap-1">
                      <Check size={12} className="text-green-400" />
                      Make sure your face is well-lit
                    </li>
                    <li className="flex items-center gap-1">
                      <Check size={12} className="text-green-400" />
                      Remove glasses or anything covering your face
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {step === 'complete' && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                  <CheckCheck size={40} className="text-green-400" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">Verification Successful</h3>
                <p className="text-sm text-white/70 text-center mb-6">
                  Your identity has been successfully verified. You can now proceed to the next step.
                </p>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-white/5 p-3 rounded-lg text-center">
                    <p className="text-xs text-white/50 mb-1">Document Type</p>
                    <p className="text-sm font-medium capitalize">{documentType.replace('_', ' ')}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg text-center">
                    <p className="text-xs text-white/50 mb-1">Verification Status</p>
                    <p className="text-sm font-medium text-green-400">Approved</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </VerificationLayout>
  );
};

export default KYCVerification;
