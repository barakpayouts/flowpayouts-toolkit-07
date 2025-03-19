
import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { 
  initializeAirwallex,
  createBeneficiaryForm,
  createBeneficiaryFormConfig,
  mountAirwallexElement
} from '@/utils/airwallexHelper';

const BankTransferDetails: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { config } = useWidgetConfig();
  const beneficiaryFormRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFormLoading, setIsFormLoading] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  useEffect(() => {
    let isMounted = true;
    let mountRetryTimer: ReturnType<typeof setTimeout>;
    
    const initializeForm = async () => {
      try {
        if (!isMounted) return;
        
        console.log('Starting Airwallex form initialization');
        setIsFormLoading(true);
        setFormError(null);
        
        // 1. Initialize the Airwallex SDK
        const initialized = await initializeAirwallex();
        if (!initialized) {
          setFormError('Failed to initialize payment system. Please try again later.');
          setIsFormLoading(false);
          return;
        }
        
        // 2. Create the form configuration
        const formConfig = createBeneficiaryFormConfig(
          config.currency || 'USD',
          config.backgroundColor || '#143745',
          config.accentColor || '#d0e92a'
        );
        
        console.log('Form config created:', formConfig);
        
        // 3. Create the Airwallex element
        const element = await createBeneficiaryForm(formConfig);
        if (!element) {
          setFormError('Failed to create payment form. Please try again later.');
          setIsFormLoading(false);
          return;
        }
        
        // Store the element reference
        beneficiaryFormRef.current = element;
        
        // 4. Ensure container is ready and mount after a delay
        mountRetryTimer = setTimeout(() => {
          if (!isMounted) return;
          
          try {
            // Create a mounting point ID that's guaranteed to be unique
            const mountId = `beneficiary-root-${Date.now()}`;
            
            // Make sure the container exists
            if (!containerRef.current) {
              console.error('Form container ref not found');
              setFormError('Form container not found. Please refresh and try again.');
              setIsFormLoading(false);
              return;
            }
            
            // Clear any existing content
            containerRef.current.innerHTML = '';
            
            // Create a fresh mount point
            const mountPoint = document.createElement('div');
            mountPoint.id = mountId;
            containerRef.current.appendChild(mountPoint);
            
            console.log(`Created mount point with ID: #${mountId}`);
            
            // Wait a bit more for the DOM to update before mounting
            setTimeout(() => {
              if (!isMounted) return;
              
              try {
                console.log(`Attempting to mount to #${mountId}`);
                // Mount the element
                element.mount(`#${mountId}`);
                console.log(`Successfully mounted to #${mountId}`);
                setIsFormLoading(false);
              } catch (error) {
                console.error('Error mounting element:', error);
                
                // If we still have retries left, try again
                if (retryCount < 3) {
                  setRetryCount(prev => prev + 1);
                  // Try again after a delay
                  setTimeout(initializeForm, 1000);
                } else {
                  setFormError('Error mounting payment form. Please refresh the page and try again.');
                  setIsFormLoading(false);
                }
              }
            }, 500);
          } catch (error) {
            console.error('Error preparing mount point:', error);
            setFormError('Error preparing form. Please try again later.');
            setIsFormLoading(false);
          }
        }, 1000);
        
      } catch (error) {
        if (!isMounted) return;
        console.error('Error initializing Airwallex form:', error);
        setFormError('Failed to initialize payment form. Please try again later.');
        setIsFormLoading(false);
      }
    };
    
    // Initialize the form when the component mounts
    initializeForm();
    
    // Cleanup when component unmounts
    return () => {
      isMounted = false;
      if (mountRetryTimer) clearTimeout(mountRetryTimer);
      
      if (beneficiaryFormRef.current) {
        try {
          beneficiaryFormRef.current.unmount();
          console.log('Unmounted Airwallex form');
        } catch (error) {
          console.error('Error unmounting Airwallex form:', error);
        }
      }
    };
  }, [config.accentColor, config.backgroundColor, config.currency, retryCount]);
  
  const handleRefresh = () => {
    setRetryCount(prev => prev + 1);
    setFormError(null);
  };
  
  const handleSubmit = async () => {
    if (!beneficiaryFormRef.current) {
      toast.error('Form not initialized. Please refresh and try again.');
      return;
    }
    
    try {
      console.log('Submitting Airwallex form');
      const submitResult = await beneficiaryFormRef.current.submit();
      console.log('Form submission result:', submitResult);
      toast.success('Bank details submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('There was an error submitting your details. Please try again.');
    }
  };
  
  return (
    <div className="payout-details-form">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={16} />
          Back to methods
        </button>
        <h2 className="text-xl font-semibold">Bank Transfer Details</h2>
      </div>
      
      {/* Balance Info Card */}
      <div className="mb-6 p-4 rounded-lg border border-white/20 bg-white/5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm opacity-70">Available Balance</span>
          <span className="font-semibold text-lg">{config.payoutAmount || "$1,250.00"}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="opacity-70">From: {config.companyName || "Acme Inc."}</span>
          <span className="opacity-70">Currency: {config.currency || "USD"}</span>
        </div>
      </div>
      
      {/* Airwallex Form Integration */}
      <div className="space-y-6">
        {formError && (
          <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-white">
            <p className="text-sm">{formError}</p>
            <button 
              onClick={handleRefresh}
              className="text-xs underline mt-2"
            >
              Try again
            </button>
          </div>
        )}
        
        {isFormLoading && (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin mb-4"></div>
            <p className="text-sm opacity-70">Loading payment form...</p>
          </div>
        )}
        
        <div
          ref={containerRef}
          id="beneficiary-form-container"
          className="airwallex-form-container"
          style={{ 
            minHeight: "400px", 
            marginBottom: "20px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            padding: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            display: isFormLoading ? 'none' : 'block'
          }}
        />
        
        <Button
          variant="purple"
          className="w-full font-semibold mt-6"
          style={{
            background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}DD)`,
            boxShadow: `0 4px 15px ${config.accentColor}40`,
          }}
          onClick={handleSubmit}
          disabled={isFormLoading || !!formError}
        >
          Submit Bank Details
        </Button>
      </div>
      
      <p className="text-xs opacity-70 mt-6 text-center">
        Your information is securely transmitted and protected. Need help? Contact our support team.
      </p>
    </div>
  );
};

export default BankTransferDetails;
