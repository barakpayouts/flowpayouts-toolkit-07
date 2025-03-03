
import React, { useState } from 'react';
import VerificationLayout from './VerificationLayout';
import { useWidgetConfig, KYCDocumentType } from '@/hooks/use-widget-config';
import { Check, Camera, FileText, Upload } from 'lucide-react';
import { toast } from "sonner";

const KYCVerification: React.FC<{
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
}> = ({ onNext, onBack, isLastStep }) => {
  const { config } = useWidgetConfig();
  const [selectedDocument, setSelectedDocument] = useState<KYCDocumentType | null>(null);
  const [documentUploaded, setDocumentUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentStep, setCurrentStep] = useState<'document-select' | 'document-upload' | 'selfie'>('document-select');
  
  const handleSelectDocument = (document: KYCDocumentType) => {
    setSelectedDocument(document);
  };
  
  const handleDocumentUpload = () => {
    // Simulate document upload
    toast.success("Document uploaded successfully");
    setDocumentUploaded(true);
    setCurrentStep('selfie');
  };
  
  const handleSelfieUpload = () => {
    // Simulate selfie upload
    toast.success("Selfie captured successfully");
    setSelfieUploaded(true);
  };
  
  const handleBack = () => {
    if (currentStep === 'selfie') {
      setCurrentStep('document-upload');
    } else if (currentStep === 'document-upload') {
      setCurrentStep('document-select');
    } else {
      onBack();
    }
  };
  
  const handleNext = () => {
    if (currentStep === 'document-select' && selectedDocument) {
      setCurrentStep('document-upload');
    } else if (currentStep === 'document-upload' && documentUploaded) {
      setCurrentStep('selfie');
    } else if (currentStep === 'selfie' && selfieUploaded) {
      onNext();
    } else {
      toast.error("Please complete the current step first");
    }
  };
  
  let title, description, content, buttonText;
  
  if (currentStep === 'document-select') {
    title = "Identity Verification";
    description = "Select a valid government-issued photo ID for verification";
    buttonText = "Continue";
    
    content = (
      <div className="space-y-4">
        <div 
          className={`document-option p-4 rounded-lg ${selectedDocument === 'passport' ? 'bg-white/10 border-2 border-' + config.accentColor + '60' : 'bg-white/5 border border-white/10'} hover:bg-white/10 transition-colors cursor-pointer`}
          onClick={() => handleSelectDocument('passport')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText size={24} className="opacity-70" />
              <div>
                <h3 className="font-medium">Passport</h3>
                <p className="text-xs opacity-70">International travel document</p>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedDocument === 'passport' ? 'bg-' + config.accentColor : 'bg-white/10'}`}>
              {selectedDocument === 'passport' && <Check size={14} className="text-black" />}
            </div>
          </div>
        </div>
        
        <div 
          className={`document-option p-4 rounded-lg ${selectedDocument === 'id' ? 'bg-white/10 border-2 border-' + config.accentColor + '60' : 'bg-white/5 border border-white/10'} hover:bg-white/10 transition-colors cursor-pointer`}
          onClick={() => handleSelectDocument('id')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText size={24} className="opacity-70" />
              <div>
                <h3 className="font-medium">ID Card</h3>
                <p className="text-xs opacity-70">National or state-issued identification card</p>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedDocument === 'id' ? 'bg-' + config.accentColor : 'bg-white/10'}`}>
              {selectedDocument === 'id' && <Check size={14} className="text-black" />}
            </div>
          </div>
        </div>
        
        <div 
          className={`document-option p-4 rounded-lg ${selectedDocument === 'driver_license' ? 'bg-white/10 border-2 border-' + config.accentColor + '60' : 'bg-white/5 border border-white/10'} hover:bg-white/10 transition-colors cursor-pointer`}
          onClick={() => handleSelectDocument('driver_license')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText size={24} className="opacity-70" />
              <div>
                <h3 className="font-medium">Driver's License</h3>
                <p className="text-xs opacity-70">Driving permit with photo identification</p>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedDocument === 'driver_license' ? 'bg-' + config.accentColor : 'bg-white/10'}`}>
              {selectedDocument === 'driver_license' && <Check size={14} className="text-black" />}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (currentStep === 'document-upload') {
    title = `Upload Your ${selectedDocument === 'passport' ? 'Passport' : selectedDocument === 'id' ? 'ID Card' : 'Driver\'s License'}`;
    description = "Make sure all details are clearly visible";
    buttonText = documentUploaded ? "Continue to Selfie" : "Upload Document";
    
    content = (
      <div className="space-y-4">
        <div className="upload-container bg-white/5 border border-white/10 rounded-lg p-6 text-center">
          {documentUploaded ? (
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-3">
                <Check size={24} className="text-white" />
              </div>
              <p className="font-medium">Document uploaded successfully!</p>
              <p className="text-sm opacity-70 mt-2">Your document has been uploaded and is being processed.</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="upload-icon w-20 h-20 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Upload size={32} className="opacity-70" />
              </div>
              <p className="font-medium mb-2">Drag & drop your document here</p>
              <p className="text-sm opacity-70 mb-4">or</p>
              <button 
                className="py-2 px-4 rounded text-sm font-medium" 
                style={{backgroundColor: config.accentColor, color: 'black'}}
                onClick={handleDocumentUpload}
              >
                Choose File
              </button>
            </div>
          )}
        </div>
        <div className="text-sm opacity-70">
          <p className="mb-1">Requirements:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>High-quality, color image</li>
            <li>All four corners visible</li>
            <li>No glare or shadows</li>
            <li>File size under 5MB (JPG, PNG, PDF)</li>
          </ul>
        </div>
      </div>
    );
  } else if (currentStep === 'selfie') {
    title = "Take a Selfie";
    description = "We need to verify that you match your ID photo";
    buttonText = selfieUploaded ? "Complete Verification" : "Capture Selfie";
    
    content = (
      <div className="space-y-4">
        <div className="upload-container bg-white/5 border border-white/10 rounded-lg p-6 text-center">
          {selfieUploaded ? (
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-3">
                <Check size={24} className="text-white" />
              </div>
              <p className="font-medium">Selfie captured successfully!</p>
              <p className="text-sm opacity-70 mt-2">Your selfie has been uploaded and is being verified.</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="camera-icon w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Camera size={32} className="opacity-70" />
              </div>
              <p className="font-medium mb-2">Position your face in the frame</p>
              <p className="text-sm opacity-70 mb-4">Make sure your face is well-lit and clearly visible</p>
              <button 
                className="py-2 px-4 rounded text-sm font-medium" 
                style={{backgroundColor: config.accentColor, color: 'black'}}
                onClick={handleSelfieUpload}
              >
                Take Selfie
              </button>
            </div>
          )}
        </div>
        <div className="text-sm opacity-70">
          <p className="mb-1">Tips for a good selfie:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Find good lighting</li>
            <li>Remove glasses or other face coverings</li>
            <li>Neutral expression (no smiling)</li>
            <li>Face the camera directly</li>
          </ul>
        </div>
      </div>
    );
  }
  
  return (
    <VerificationLayout
      title={title}
      description={description}
      onBack={handleBack}
      onNext={handleNext}
      isLastStep={currentStep === 'selfie' && selfieUploaded && isLastStep}
      isAuthorized={isAuthorized}
      setIsAuthorized={setIsAuthorized}
      buttonText={buttonText}
    >
      {content}
    </VerificationLayout>
  );
};

export default KYCVerification;
