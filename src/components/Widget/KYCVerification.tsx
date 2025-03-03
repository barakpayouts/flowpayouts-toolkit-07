import React, { useState, useRef, useEffect } from 'react';
import VerificationLayout from './VerificationLayout';
import { useWidgetConfig, KYCDocumentType } from '@/hooks/use-widget-config';
import { Check, Camera, FileText, Upload, Image, X } from 'lucide-react';
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
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [documentPreview, setDocumentPreview] = useState<string | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [streamActive, setStreamActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [currentStep]);
  
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setStreamActive(false);
      setCameraActive(false);
    }
  };
  
  const handleSelectDocument = (document: KYCDocumentType) => {
    setSelectedDocument(document);
  };
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };
  
  const handleFileUpload = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload JPG, PNG, or PDF");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 5MB");
      return;
    }
    
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setDocumentPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setDocumentPreview('pdf');
    }
    
    toast.success("Document uploaded successfully");
    setDocumentUploaded(true);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };
  
  const startCamera = async () => {
    try {
      setCameraError(null);
      
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera access is not supported by this browser");
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play()
              .then(() => {
                console.log("Camera started successfully");
                setCameraActive(true);
                setStreamActive(true);
                toast.success("Camera started successfully");
              })
              .catch((error) => {
                console.error("Error playing video:", error);
                setCameraError("Error playing video: " + error.message);
                toast.error("Error starting camera: " + error.message);
              });
          }
        };
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      let errorMessage = "Could not access camera";
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          errorMessage = "Camera permission denied. Please allow camera access and try again.";
        } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
          errorMessage = "No camera found on this device.";
        } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
          errorMessage = "Camera is already in use by another application.";
        } else if (error.name === 'OverconstrainedError') {
          errorMessage = "Camera doesn't meet the required constraints.";
        }
      }
      
      setCameraError(errorMessage);
      toast.error(errorMessage);
    }
  };
  
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current && streamActive) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        context.setTransform(1, 0, 0, 1, 0, 0);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        
        stopCamera();
        
        setSelfiePreview(dataUrl);
        setSelfieUploaded(true);
        
        toast.success("Selfie captured successfully");
      }
    }
  };
  
  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setSelfiePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      
      toast.success("Selfie captured successfully");
      setSelfieUploaded(true);
    }
  };
  
  const handleBack = () => {
    if (currentStep === 'selfie') {
      stopCamera();
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
      stopCamera();
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
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileSelect} 
          className="hidden" 
          accept="image/*,application/pdf"
        />
        
        <div 
          className={`upload-container ${isDragging ? 'bg-white/10' : 'bg-white/5'} border ${isDragging ? 'border-' + config.accentColor : 'border-white/10'} rounded-lg p-6 text-center transition-all`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {documentUploaded ? (
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-3">
                <Check size={24} className="text-white" />
              </div>
              <p className="font-medium">Document uploaded successfully!</p>
              
              {documentPreview && (
                <div className="mt-4 flex justify-center">
                  {documentPreview === 'pdf' ? (
                    <div className="p-4 bg-white/10 rounded-lg w-40 h-32 flex items-center justify-center">
                      <FileText size={48} className="text-white" />
                    </div>
                  ) : (
                    <img 
                      src={documentPreview} 
                      alt="Document Preview" 
                      className="max-w-full max-h-40 rounded-lg border border-white/20" 
                    />
                  )}
                </div>
              )}
              
              <p className="text-sm opacity-70 mt-4">Your document has been uploaded and is being processed.</p>
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
                onClick={() => fileInputRef.current?.click()}
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
        <input 
          type="file" 
          ref={cameraInputRef} 
          onChange={handleCameraCapture} 
          className="hidden" 
          accept="image/*" 
          capture="user"
        />
        
        <div className="upload-container bg-white/5 border border-white/10 rounded-lg p-6 text-center">
          {selfieUploaded ? (
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-3">
                <Check size={24} className="text-white" />
              </div>
              <p className="font-medium">Selfie captured successfully!</p>
              
              {selfiePreview && (
                <div className="mt-4 flex justify-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-white/20">
                    <img 
                      src={selfiePreview} 
                      alt="Selfie Preview" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              )}
              
              <p className="text-sm opacity-70 mt-4">Your selfie has been uploaded and is being verified.</p>
              
              <button 
                className="mt-4 py-2 px-4 rounded text-sm font-medium bg-white/10 hover:bg-white/20 transition-colors"
                onClick={() => {
                  setSelfieUploaded(false);
                  setSelfiePreview(null);
                }}
              >
                Retake Selfie
              </button>
            </div>
          ) : cameraActive ? (
            <div className="text-center">
              <div className="relative mx-auto mb-4">
                <div className="camera-feed w-full max-w-xs mx-auto rounded-xl overflow-hidden border-2 border-white/30 aspect-[3/4] relative">
                  <video 
                    ref={videoRef} 
                    className="w-full h-full object-cover mirror"
                    autoPlay
                    playsInline
                    muted
                    style={{ transform: 'scaleX(-1)' }}
                  ></video>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-48 border-2 border-dashed border-white/70 rounded-full"></div>
                  </div>
                </div>
                
                <canvas ref={canvasRef} className="hidden"></canvas>
              </div>
              
              {streamActive && (
                <div className="space-y-2">
                  <p className="text-sm opacity-70 mb-2">Center your face in the circle and keep a neutral expression</p>
                  <div className="flex justify-center space-x-3">
                    <button 
                      className="py-2 px-4 rounded text-sm font-medium bg-white/10 hover:bg-white/20 transition-colors"
                      onClick={stopCamera}
                    >
                      Cancel
                    </button>
                    
                    <button 
                      className="py-2 px-4 rounded text-sm font-medium" 
                      style={{backgroundColor: config.accentColor, color: 'black'}}
                      onClick={capturePhoto}
                    >
                      Take Photo
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <div className="relative">
                <div className="camera-preview w-52 h-52 rounded-full bg-black/40 flex items-center justify-center mx-auto mb-4 overflow-hidden border-2 border-dashed border-white/30">
                  <Camera size={48} className="opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-36 h-36 border-2 border-dashed border-white/50 rounded-full"></div>
                  </div>
                </div>
              </div>
              <p className="font-medium mb-2">Position your face in the frame</p>
              <p className="text-sm opacity-70 mb-4">Make sure your face is well-lit and clearly visible</p>
              
              {cameraError && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 text-white rounded-lg text-sm">
                  <p className="font-medium mb-1">Camera Error</p>
                  <p>{cameraError}</p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row justify-center gap-2">
                <button 
                  className="py-2 px-4 rounded text-sm font-medium" 
                  style={{backgroundColor: config.accentColor, color: 'black'}}
                  onClick={startCamera}
                >
                  Open Camera
                </button>
                
                <button 
                  className="py-2 px-4 rounded text-sm font-medium bg-white/10 hover:bg-white/20 transition-colors" 
                  onClick={() => cameraInputRef.current?.click()}
                >
                  Upload Selfie
                </button>
              </div>
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
