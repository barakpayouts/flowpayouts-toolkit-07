
import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { 
  createAndMountBeneficiaryForm,
  setupBeneficiaryFormEventListeners,
  submitBeneficiaryForm
} from '@/utils/airwallexHelper';

const BankTransferDetails: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { config } = useWidgetConfig();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const elementRef = useRef<any>(null);
  const formId = "airwallex-beneficiary-form";
  
  // Initialize and mount form
  useEffect(() => {
    const setupForm = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log(`Setting up form with container ID: ${formId}`);
        
        // Create and mount form
        const element = await createAndMountBeneficiaryForm(
          formId, 
          config.currency || 'USD',
          config.backgroundColor || '#143745',
          config.accentColor || '#d0e92a'
        );
        
        if (!element) {
          setError('Could not create form. Please try again later.');
          setIsLoading(false);
          return;
        }
        
        // Store reference
        elementRef.current = element;
        
        // Setup event listeners
        setupBeneficiaryFormEventListeners(element);
        
        // Set loading to false
        setIsLoading(false);
      } catch (error) {
        console.error('Error setting up form:', error);
        setError('An error occurred while setting up the payment form.');
        setIsLoading(false);
      }
    };
    
    // Run setup
    setupForm();
    
    // Cleanup on unmount
    return () => {
      if (elementRef.current) {
        try {
          console.log('Unmounting form...');
          elementRef.current.unmount();
        } catch (error) {
          console.error('Error unmounting form:', error);
        }
      }
    };
  }, [config.currency, config.backgroundColor, config.accentColor]);
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!elementRef.current) {
      toast.error('Form not ready. Please try again.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await submitBeneficiaryForm(elementRef.current);
      
      if (result.success) {
        toast.success('Bank details submitted successfully!');
      } else {
        toast.error('Error submitting form. Please check your details and try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleRetry = () => {
    // Reset states
    elementRef.current = null;
    setError(null);
    setIsLoading(true);
    
    // Force re-mount by changing the ID
    const container = document.getElementById('form-container');
    if (container) {
      container.innerHTML = `<div id="${formId}"></div>`;
    }
    
    // Wait a bit then trigger the effect again
    setTimeout(() => {
      const setupForm = async () => {
        try {
          const element = await createAndMountBeneficiaryForm(
            formId, 
            config.currency || 'USD',
            config.backgroundColor || '#143745',
            config.accentColor || '#d0e92a'
          );
          
          if (!element) {
            setError('Could not create form. Please try again later.');
            setIsLoading(false);
            return;
          }
          
          elementRef.current = element;
          setupBeneficiaryFormEventListeners(element);
          setIsLoading(false);
        } catch (error) {
          console.error('Error in retry:', error);
          setError('An error occurred while setting up the payment form.');
          setIsLoading(false);
        }
      };
      
      setupForm();
    }, 1000);
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
      
      {/* Form Container */}
      <div className="space-y-6">
        {/* Show error if there is one */}
        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-white">
            <p className="text-sm">{error}</p>
            <button 
              onClick={handleRetry}
              className="text-xs underline mt-2"
            >
              Try again
            </button>
          </div>
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin mb-4"></div>
            <p className="text-sm opacity-70">Loading payment form...</p>
          </div>
        )}
        
        {/* Form container */}
        <div 
          id="form-container" 
          className="airwallex-form-container"
          style={{ 
            minHeight: "400px", 
            marginBottom: "20px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            padding: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            display: isLoading ? 'none' : 'block'
          }}
        >
          <div id={formId}></div>
        </div>
        
        {/* Submit button */}
        <Button
          variant="purple"
          className="w-full font-semibold mt-6"
          style={{
            background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}DD)`,
            boxShadow: `0 4px 15px ${config.accentColor}40`,
          }}
          onClick={handleSubmit}
          disabled={isLoading || !!error || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Bank Details'}
        </Button>
      </div>
      
      <p className="text-xs opacity-70 mt-6 text-center">
        Your information is securely transmitted and protected. Need help? Contact our support team.
      </p>
    </div>
  );
};

export default BankTransferDetails;
